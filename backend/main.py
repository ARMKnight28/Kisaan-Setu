from datetime import datetime
import os
import random
from typing import Optional, List
import uuid
from database import Base, engine, get_db, supabase
from fastapi import Depends, FastAPI, HTTPException, Header, Query
from fastapi.middleware.cors import CORSMiddleware
import models
from pydantic import BaseModel
from sqlalchemy import func
from sqlalchemy.orm import Session

# Ensure tables are created in local database
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Kisaan Setu API",
    description="FastAPI Backend with Supabase Data Persistence for National Agricultural Procurement"
)

# CORS middleware for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ----------------------------------------------------
# Pydantic Request / Response Schemas
# ----------------------------------------------------
class FarmerRegisterRequest(BaseModel):
    full_name: str
    mobile_number: str
    home_address: Optional[str] = ""
    state: Optional[str] = ""
    district: Optional[str] = ""


class FarmerCreate(BaseModel):
    name: str
    phone: str
    location: str


class MandiCreate(BaseModel):
    name: str
    location: str
    daily_capacity_quintals: int
    latitude: float = 29.6857
    longitude: float = 76.9905


class SlotBookingCreate(BaseModel):
    farmer_id: Optional[int] = None
    farmer_name: Optional[str] = None
    mobile_number: Optional[str] = None
    home_address: Optional[str] = None
    mandi_id: Optional[int] = None
    mandi_name: Optional[str] = None
    crop_type: str
    quantity_quintals: int
    slot_date: str
    slot_time: Optional[str] = "11:00 AM - 01:00 PM"
    vehicle: Optional[str] = "Tractor Trolley"
    auth_token: Optional[str] = None


class StatusUpdate(BaseModel):
    status: str


# ----------------------------------------------------
# Core Routes
# ----------------------------------------------------
@app.get("/")
def home():
    return {
        "message": "Welcome to Kisaan Setu API",
        "supabase_connected": supabase is not None,
        "docs_url": "/docs"
    }


# ----------------------------------------------------
# 1. Farmer Registration & Profile Management
# ----------------------------------------------------
@app.post("/api/farmers/register")
def register_farmer_profile(
    payload: FarmerRegisterRequest,
    db: Session = Depends(get_db)
):
    """
    Accepts farmer registration details (full_name, mobile_number, home_address, state, district).
    Saves/upserts into Supabase 'farmers' or 'profiles' table and local SQLite/Postgres.
    Returns saved record with auth token.
    """
    auth_token = f"ks_tok_{uuid.uuid4().hex[:16]}"
    now_iso = datetime.utcnow().isoformat()

    farmer_data = {
        "full_name": payload.full_name,
        "mobile_number": payload.mobile_number,
        "home_address": payload.home_address,
        "state": payload.state,
        "district": payload.district,
        "auth_token": auth_token,
        "updated_at": now_iso
    }

    supabase_synced = False
    supabase_record = None

    # 1. Save or upsert into Supabase
    if supabase:
        try:
            # Try 'farmers' table first
            res = supabase.table("farmers").upsert(
                farmer_data,
                on_conflict="mobile_number"
            ).execute()
            if res.data:
                supabase_record = res.data[0]
                supabase_synced = True
        except Exception as err1:
            print(f"Supabase 'farmers' table upsert info: {err1}")
            # Try 'profiles' table if schema uses 'profiles'
            try:
                res = supabase.table("profiles").upsert(
                    farmer_data,
                    on_conflict="mobile_number"
                ).execute()
                if res.data:
                    supabase_record = res.data[0]
                    supabase_synced = True
            except Exception as err2:
                print(f"Supabase 'profiles' table upsert info: {err2}")

    # 2. Sync to local database
    existing_farmer = (
        db.query(models.Farmer)
        .filter(models.Farmer.phone == payload.mobile_number)
        .first()
    )

    location_str = (
        f"{payload.district}, {payload.state}"
        if payload.district
        else payload.state or "India"
    )

    if existing_farmer:
        existing_farmer.name = payload.full_name
        existing_farmer.address = payload.home_address
        existing_farmer.state = payload.state
        existing_farmer.district = payload.district
        existing_farmer.location = location_str
        existing_farmer.auth_token = auth_token
        farmer_obj = existing_farmer
    else:
        farmer_obj = models.Farmer(
            name=payload.full_name,
            phone=payload.mobile_number,
            location=location_str,
            address=payload.home_address,
            state=payload.state,
            district=payload.district,
            auth_token=auth_token,
        )
        db.add(farmer_obj)

    db.commit()
    db.refresh(farmer_obj)

    return {
        "status": "success",
        "message": "Farmer registered successfully",
        "auth_token": auth_token,
        "farmer_id": farmer_obj.id,
        "supabase_synced": supabase_synced,
        "profile": {
            "id": farmer_obj.id,
            "full_name": payload.full_name,
            "mobile_number": payload.mobile_number,
            "home_address": payload.home_address,
            "state": payload.state,
            "district": payload.district,
            "auth_token": auth_token,
        },
    }


@app.get("/api/farmers/me")
def get_farmer_profile(
    authorization: Optional[str] = Header(None),
    x_farmer_token: Optional[str] = Header(None),
    x_farmer_phone: Optional[str] = Header(None),
    token: Optional[str] = Query(None),
    mobile: Optional[str] = Query(None),
    farmer_id: Optional[int] = Query(None),
    db: Session = Depends(get_db)
):
    """
    Fetch user profile data based on session token / mobile number / UUID / ID.
    Queries Supabase first if available, otherwise retrieves from local DB.
    """
    # Resolve token from Authorization header or parameters
    resolved_token = token or x_farmer_token
    if not resolved_token and authorization and authorization.startswith("Bearer "):
        resolved_token = authorization.split("Bearer ")[1].strip()

    resolved_phone = mobile or x_farmer_phone

    # 1. Attempt query from Supabase
    if supabase:
        for tbl in ["farmers", "profiles"]:
            try:
                query = supabase.table(tbl).select("*")
                if resolved_token:
                    res = query.eq("auth_token", resolved_token).execute()
                    if res.data:
                        r = res.data[0]
                        return {
                            "status": "success",
                            "source": f"supabase:{tbl}",
                            "profile": {
                                "id": r.get("id"),
                                "full_name": r.get("full_name") or r.get("name"),
                                "mobile_number": r.get("mobile_number") or r.get("phone"),
                                "home_address": r.get("home_address") or r.get("address", ""),
                                "state": r.get("state", ""),
                                "district": r.get("district", ""),
                                "auth_token": r.get("auth_token"),
                            },
                        }
                if resolved_phone:
                    res = query.or_(f"mobile_number.eq.{resolved_phone},phone.eq.{resolved_phone}").execute()
                    if res.data:
                        r = res.data[0]
                        return {
                            "status": "success",
                            "source": f"supabase:{tbl}",
                            "profile": {
                                "id": r.get("id"),
                                "full_name": r.get("full_name") or r.get("name"),
                                "mobile_number": r.get("mobile_number") or r.get("phone"),
                                "home_address": r.get("home_address") or r.get("address", ""),
                                "state": r.get("state", ""),
                                "district": r.get("district", ""),
                                "auth_token": r.get("auth_token"),
                            },
                        }
            except Exception as e:
                print(f"Supabase lookup in {tbl} info: {e}")

    # 2. Local database fallback lookup
    farmer = None
    if resolved_token:
        farmer = db.query(models.Farmer).filter(models.Farmer.auth_token == resolved_token).first()
    if not farmer and resolved_phone:
        farmer = db.query(models.Farmer).filter(models.Farmer.phone == resolved_phone).first()
    if not farmer and farmer_id:
        farmer = db.query(models.Farmer).filter(models.Farmer.id == farmer_id).first()
    if not farmer:
        # Default to latest registered farmer for demonstration convenience
        farmer = db.query(models.Farmer).order_by(models.Farmer.id.desc()).first()

    if not farmer:
        raise HTTPException(status_code=404, detail="Farmer profile not found")

    return {
        "status": "success",
        "source": "database",
        "profile": {
            "id": farmer.id,
            "full_name": farmer.name,
            "mobile_number": farmer.phone,
            "home_address": farmer.address or "",
            "state": farmer.state or "",
            "district": farmer.district or "",
            "location": farmer.location or "",
            "auth_token": farmer.auth_token or "",
        },
    }


# Legacy farmer registration endpoint for compatibility
@app.post("/api/farmers")
def register_farmer(farmer: FarmerCreate, db: Session = Depends(get_db)):
    existing = (
        db.query(models.Farmer)
        .filter(models.Farmer.phone == farmer.phone)
        .first()
    )
    if existing:
        return existing
    new_farmer = models.Farmer(
        name=farmer.name, phone=farmer.phone, location=farmer.location
    )
    db.add(new_farmer)
    db.commit()
    db.refresh(new_farmer)
    return new_farmer


# ----------------------------------------------------
# 2. Mandi Procurement Hubs
# ----------------------------------------------------
@app.post("/api/mandis")
def create_mandi(mandi: MandiCreate, db: Session = Depends(get_db)):
    db_mandi = models.Mandi(
        name=mandi.name,
        location=mandi.location,
        daily_capacity_quintals=mandi.daily_capacity_quintals,
    )
    db.add(db_mandi)
    db.commit()
    db.refresh(db_mandi)
    return db_mandi


@app.get("/api/mandis")
def get_mandis(db: Session = Depends(get_db)):
    mandis = db.query(models.Mandi).all()
    if not mandis:
        # Seed default demonstration mandis if empty
        default_mandis = [
            ("Nashik Main APMC Yard (Panchavati Market)", "Nashik", 1500),
            ("Lasalgaon APMC Market (Onion & Grain Hub)", "Nashik", 2000),
            ("Pimpalgaon Baswant APMC Yard", "Nashik", 1200),
            ("Ahilyanagar APMC Central Market Yard", "Ahilyanagar", 1000),
            ("Karnal Grain Mandi, Yard No. 2", "Karnal", 1800),
        ]
        for name, loc, cap in default_mandis:
            m = models.Mandi(name=name, location=loc, daily_capacity_quintals=cap)
            db.add(m)
        db.commit()
        mandis = db.query(models.Mandi).all()

    result = []
    for m in mandis:
        total_booked = (
            db.query(func.sum(models.SlotBooking.quantity_quintals))
            .filter(models.SlotBooking.mandi_id == m.id)
            .scalar()
            or 0
        )
        result.append({
            "id": m.id,
            "name": m.name,
            "location": m.location,
            "daily_capacity_quintals": m.daily_capacity_quintals,
            "total_booked_quintals": total_booked,
            "remaining_capacity": max(0, m.daily_capacity_quintals - total_booked),
            "distance_km": 12.5,
        })
    return result


# ----------------------------------------------------
# 3. Slot Booking & Gate Pass Generation
# ----------------------------------------------------
@app.post("/api/slots/book")
def book_slot(booking: SlotBookingCreate, db: Session = Depends(get_db)):
    """
    Carries forward verified profile details and selected crop/mandi values
    to issue a validated Gate Pass and record the booking in both local DB and Supabase.
    """
    # 1. Resolve or create farmer profile
    farmer = None
    if booking.farmer_id:
        farmer = db.query(models.Farmer).filter(models.Farmer.id == booking.farmer_id).first()
    if not farmer and booking.mobile_number:
        farmer = db.query(models.Farmer).filter(models.Farmer.phone == booking.mobile_number).first()
    if not farmer and booking.farmer_name:
        loc_str = booking.home_address or "Local District"
        farmer = models.Farmer(
            name=booking.farmer_name,
            phone=booking.mobile_number or f"98{random.randint(10000000, 99999999)}",
            location=loc_str,
            address=booking.home_address,
            auth_token=booking.auth_token,
        )
        db.add(farmer)
        db.commit()
        db.refresh(farmer)
    elif not farmer:
        farmer = db.query(models.Farmer).first()

    # 2. Resolve or create mandi hub
    mandi = None
    if booking.mandi_id:
        mandi = db.query(models.Mandi).filter(models.Mandi.id == booking.mandi_id).first()
    if not mandi and booking.mandi_name:
        mandi = db.query(models.Mandi).filter(models.Mandi.name == booking.mandi_name).first()
        if not mandi:
            mandi = models.Mandi(
                name=booking.mandi_name,
                location=booking.mandi_name,
                daily_capacity_quintals=1500,
            )
            db.add(mandi)
            db.commit()
            db.refresh(mandi)
    if not mandi:
        mandi = db.query(models.Mandi).first()
        if not mandi:
            mandi = models.Mandi(
                name="Nashik Main APMC Yard (Panchavati Market)",
                location="Nashik",
                daily_capacity_quintals=1500,
            )
            db.add(mandi)
            db.commit()
            db.refresh(mandi)

    # 3. Check capacity limits
    total_booked = (
        db.query(func.sum(models.SlotBooking.quantity_quintals))
        .filter(
            models.SlotBooking.mandi_id == mandi.id,
            models.SlotBooking.slot_date == booking.slot_date,
        )
        .scalar()
        or 0
    )

    if total_booked + booking.quantity_quintals > mandi.daily_capacity_quintals:
        remaining = max(0, mandi.daily_capacity_quintals - total_booked)
        raise HTTPException(
            status_code=400,
            detail=(
                f"Capacity exceeded for {booking.slot_date}. Remaining: {remaining} Quintals."
            ),
        )

    # 4. Generate unique Gate Pass ID
    pass_number = random.randint(1000, 9999)
    gate_pass_id = f"KS-2026-{pass_number}"

    new_booking = models.SlotBooking(
        farmer_id=farmer.id if farmer else 1,
        mandi_id=mandi.id,
        crop_type=booking.crop_type,
        quantity_quintals=booking.quantity_quintals,
        slot_date=booking.slot_date,
        slot_time=booking.slot_time or "11:00 AM - 01:00 PM",
        gate_pass_id=gate_pass_id,
        vehicle=booking.vehicle or "Tractor Trolley",
        status="Confirmed",
    )
    db.add(new_booking)
    db.commit()
    db.refresh(new_booking)

    # 5. Sync to Supabase if connected
    if supabase:
        try:
            supabase.table("slot_bookings").insert({
                "gate_pass_id": gate_pass_id,
                "farmer_id": farmer.id if farmer else None,
                "farmer_name": farmer.name if farmer else booking.farmer_name,
                "mobile_number": farmer.phone if farmer else booking.mobile_number,
                "mandi_name": mandi.name,
                "crop_type": booking.crop_type,
                "quantity_quintals": booking.quantity_quintals,
                "slot_date": booking.slot_date,
                "slot_time": booking.slot_time or "11:00 AM - 01:00 PM",
                "vehicle": booking.vehicle or "Tractor Trolley",
                "status": "Confirmed",
            }).execute()
        except Exception as e:
            print(f"Supabase slot_bookings sync notice: {e}")

    # Simulated SMS notification
    farmer_phone = farmer.phone if farmer else booking.mobile_number or "Farmer"
    sms_status = f"SMS sent to {farmer_phone} for Gate Pass #{gate_pass_id} on {booking.slot_date}"

    return {
        "status": "Success",
        "message": "Slot successfully booked and Gate Pass generated!",
        "gate_pass_id": gate_pass_id,
        "booking_details": {
            "id": new_booking.id,
            "gate_pass_id": gate_pass_id,
            "farmer_id": new_booking.farmer_id,
            "farmer_name": farmer.name if farmer else booking.farmer_name,
            "farmer_phone": farmer.phone if farmer else booking.mobile_number,
            "mandi_name": mandi.name,
            "crop_type": new_booking.crop_type,
            "quantity_quintals": new_booking.quantity_quintals,
            "slot_date": new_booking.slot_date,
            "slot_time": new_booking.slot_time,
            "vehicle": new_booking.vehicle,
            "status": new_booking.status,
            "created_at": new_booking.created_at.isoformat() if new_booking.created_at else None,
        },
        "sms_notification": sms_status,
    }


@app.get("/api/slots")
def get_all_slots(db: Session = Depends(get_db)):
    slots = db.query(models.SlotBooking).order_by(models.SlotBooking.id.desc()).all()
    result = []
    for slot in slots:
        farmer = (
            db.query(models.Farmer)
            .filter(models.Farmer.id == slot.farmer_id)
            .first()
        )
        mandi = (
            db.query(models.Mandi)
            .filter(models.Mandi.id == slot.mandi_id)
            .first()
        )
        result.append({
            "id": slot.id,
            "gate_pass_id": slot.gate_pass_id or f"KS-2026-{slot.id}",
            "farmer_name": farmer.name if farmer else "Unknown",
            "farmer_phone": farmer.phone if farmer else "N/A",
            "mandi_name": mandi.name if mandi else "Unknown",
            "crop_type": slot.crop_type,
            "quantity_quintals": slot.quantity_quintals,
            "slot_date": slot.slot_date,
            "slot_time": slot.slot_time or "11:00 AM - 01:00 PM",
            "vehicle": slot.vehicle or "Tractor Trolley",
            "status": slot.status,
        })
    return result


@app.patch("/api/slots/{slot_id}/status")
def update_slot_status(
    slot_id: int, payload: StatusUpdate, db: Session = Depends(get_db)
):
    slot = (
        db.query(models.SlotBooking)
        .filter(models.SlotBooking.id == slot_id)
        .first()
    )
    if not slot:
        raise HTTPException(status_code=404, detail="Token/Pass not found")
    slot.status = payload.status
    db.commit()
    db.refresh(slot)

    # Sync status update to Supabase
    if supabase and slot.gate_pass_id:
        try:
            supabase.table("slot_bookings").update({"status": payload.status}).eq("gate_pass_id", slot.gate_pass_id).execute()
        except Exception as e:
            print(f"Supabase status sync notice: {e}")

    return {"message": "Status updated successfully", "slot": slot}