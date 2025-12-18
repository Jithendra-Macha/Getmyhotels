from sqlalchemy import Column, Integer, String, Float, ForeignKey, Boolean, Text
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=True) # Nullable for guest users
    hashed_password = Column(String, nullable=True) # Nullable for social login/guest
    first_name = Column(String, nullable=True)
    last_name = Column(String, nullable=True)
    phone_number = Column(String, nullable=True)
    provider = Column(String, default="local") # local, google, facebook, apple
    is_guest = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)

    bookings = relationship("Booking", back_populates="user")

class Hotel(Base):
    __tablename__ = "hotels"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    location = Column(String, index=True)
    description = Column(Text)
    rating = Column(Float)
    image_url = Column(String)
    price_per_night = Column(Float) # Base price for display

    rooms = relationship("Room", back_populates="hotel")

class Room(Base):
    __tablename__ = "rooms"

    id = Column(Integer, primary_key=True, index=True)
    hotel_id = Column(Integer, ForeignKey("hotels.id"))
    name = Column(String) # e.g., "Deluxe Room", "King Suite"
    capacity = Column(Integer)
    price = Column(Float)
    available = Column(Boolean, default=True)

    hotel = relationship("Hotel", back_populates="rooms")
    bookings = relationship("Booking", back_populates="room")

class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    room_id = Column(Integer, ForeignKey("rooms.id"))
    check_in_date = Column(String)
    check_out_date = Column(String)
    total_price = Column(Float)
    guest_name = Column(String)
    guest_email = Column(String)

    user = relationship("User", back_populates="bookings")
    room = relationship("Room", back_populates="bookings")
