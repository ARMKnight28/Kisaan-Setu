from database import Base
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from datetime import datetime


class Farmer(Base):
    __tablename__ = "farmers"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    phone = Column(String, unique=True, index=True, nullable=False)
    location = Column(String, nullable=True)
    address = Column(String, nullable=True)
    state = Column(String, nullable=True)
    district = Column(String, nullable=True)
    auth_token = Column(String, nullable=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    bookings = relationship("SlotBooking", back_populates="farmer")


class Mandi(Base):
    __tablename__ = "mandis"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    location = Column(String, nullable=False)
    daily_capacity_quintals = Column(Integer, default=500)

    bookings = relationship("SlotBooking", back_populates="mandi")


class SlotBooking(Base):
    __tablename__ = "slot_bookings"

    id = Column(Integer, primary_key=True, index=True)
    farmer_id = Column(Integer, ForeignKey("farmers.id"))
    mandi_id = Column(Integer, ForeignKey("mandis.id"))
    crop_type = Column(String, nullable=False)
    quantity_quintals = Column(Integer, nullable=False)
    slot_date = Column(String, nullable=False)
    slot_time = Column(String, nullable=True)
    gate_pass_id = Column(String, nullable=True, index=True)
    vehicle = Column(String, default="Tractor Trolley")
    status = Column(String, default="Confirmed")
    created_at = Column(DateTime, default=datetime.utcnow)

    farmer = relationship("Farmer", back_populates="bookings")
    mandi = relationship("Mandi", back_populates="bookings")