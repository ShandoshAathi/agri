from pydantic import BaseModel
from typing import Optional

class UserLoginPayload(BaseModel):
    email: str
    password: str

class UserRegisterPayload(BaseModel):
    name: str
    email: str
    password: str
    role: str

class FarmCreatePayload(BaseModel):
    name: str
    location: str
    crop: str
    size_acres: float
    soil_type: str
    farmer_id: Optional[str] = None

class CropRecommendPayload(BaseModel):
    ph: float
    moisture: float
    temp: float
    humidity: float
    rainfall: float
    season: str = "Monsoon/Kharif"

class PumpControlPayload(BaseModel):
    action: str
    mode: str = "Manual"
