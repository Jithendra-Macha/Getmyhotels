from pydantic import BaseModel
from typing import List, Optional

class UserBase(BaseModel):
    email: Optional[str] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone_number: Optional[str] = None

class UserCreate(UserBase):
    password: Optional[str] = None
    provider: str = "local"
    is_guest: bool = False

class UserLogin(BaseModel):
    email: str
    password: str

class User(UserBase):
    id: int
    is_active: bool = True
    is_superuser: bool = False
    
    class Config:
        orm_mode = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

class HotelBase(BaseModel):
    name: str
    location: str
    description: str
    rating: float
    image_url: str
    price_per_night: float

class HotelCreate(HotelBase):
    pass

from typing import List, Optional, Union

# ... (lines 1-44)

class Hotel(HotelBase):
    id: Union[int, str]
    amenities: List[str] = []
    payment_options: List[str] = []
    coordinates: Optional[dict] = None
    
    class Config:
        orm_mode = True

class RoomBase(BaseModel):
    name: str
    capacity: int
    price: float
    available: bool

class RoomCreate(RoomBase):
    pass

class Room(RoomBase):
    id: Union[int, str]
    hotel_id: Union[int, str]

    class Config:
        orm_mode = True

class BookingBase(BaseModel):
    check_in_date: str
    check_out_date: str
    guest_name: str
    guest_email: str

class BookingCreate(BookingBase):
    room_id: int

class Booking(BookingBase):
    id: int
    user_id: Optional[int] = None
    room_id: int
    total_price: float
    status: str
    rating: int
    
    # helper fields for frontend
    hotel_name: Optional[str] = None
    hotel_location: Optional[str] = None
    hotel_image: Optional[str] = None

    class Config:
        orm_mode = True

class HotelDetail(Hotel):
    long_description: Optional[str] = None
    amenities: List[str] = []
    images: List[str] = []
    rooms: List[Room] = []

class AIPlanRequest(BaseModel):
    prompt: str

class SearchHistoryBase(BaseModel):
    location: str
    check_in: str
    check_out: str
    guests: int

class SearchHistoryCreate(SearchHistoryBase):
    pass

class SearchHistory(SearchHistoryBase):
    id: int
    user_id: Optional[int] = None
    created_at: Optional[str] = None

    class Config:
        orm_mode = True
