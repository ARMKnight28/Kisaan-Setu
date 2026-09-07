from datetime import datetime
import os
from database import Base, engine, get_db
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import models
from pydantic import BaseModel
from sqlalchemy import func
from sqlalchemy.orm import Session

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Kisaan Setu API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
  farmer_id: int
  mandi_id: int
  crop_type: str
  quantity_quintals: int
  slot_date: str


class StatusUpdate(BaseModel):
  status: str


@app.get("/")
def home():
  return {"message": "Welcome to Kisaan Setu API"}


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
        "distance_km": 12.5,  # Simulated distance from farmer location
    })
  return result


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


@app.post("/api/slots/book")
def book_slot(booking: SlotBookingCreate, db: Session = Depends(get_db)):
  mandi = (
      db.query(models.Mandi).filter(models.Mandi.id == booking.mandi_id).first()
  )
  if not mandi:
    raise HTTPException(status_code=404, detail="Mandi not found")

  total_booked = (
      db.query(func.sum(models.SlotBooking.quantity_quintals))
      .filter(
          models.SlotBooking.mandi_id == booking.mandi_id,
          models.SlotBooking.slot_date == booking.slot_date,
      )
      .scalar()
      or 0
  )

  if total_booked + booking.quantity_quintals > mandi.daily_capacity_quintals:
    raise HTTPException(
        status_code=400,
        detail=(
            f"Capacity exceeded for {booking.slot_date}. Remaining:"
            f" {mandi.daily_capacity_quintals - total_booked} Quintals."
        ),
    )

  new_booking = models.SlotBooking(
      farmer_id=booking.farmer_id,
      mandi_id=booking.mandi_id,
      crop_type=booking.crop_type,
      quantity_quintals=booking.quantity_quintals,
      slot_date=booking.slot_date,
  )
  db.add(new_booking)
  db.commit()
  db.refresh(new_booking)

  # Simulated MSG91 SMS Dispatch
  sms_status = (
      f"SMS sent to Farmer for Token #{new_booking.id} on Date"
      f" {booking.slot_date}"
  )

  return {
      "status": "Success",
      "message": "Slot successfully booked!",
      "booking_details": new_booking,
      "sms_notification": sms_status,
  }


@app.get("/api/slots")
def get_all_slots(db: Session = Depends(get_db)):
  slots = db.query(models.SlotBooking).all()
  result = []
  for slot in slots:
    farmer = (
        db.query(models.Farmer)
        .filter(models.Farmer.id == slot.farmer_id)
        .first()
    )
    mandi = (
        db.query(models.Mandi).filter(models.Mandi.id == slot.mandi_id).first()
    )
    result.append({
        "id": slot.id,
        "farmer_name": farmer.name if farmer else "Unknown",
        "farmer_phone": farmer.phone if farmer else "N/A",
        "mandi_name": mandi.name if mandi else "Unknown",
        "crop_type": slot.crop_type,
        "quantity_quintals": slot.quantity_quintals,
        "slot_date": slot.slot_date,
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
    raise HTTPException(status_code=404, detail="Token not found")
  slot.status = payload.status
  db.commit()
  db.refresh(slot)
  return {"message": "Status updated successfully", "slot": slot}