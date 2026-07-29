# Domain Data Models
from pydantic import BaseModel
from typing import Optional, List

class User(BaseModel):
    id: str
    name: str
    email: str
    role: str  # 'manager' or 'farmer'
    phone: Optional[str] = None
    avatar: Optional[str] = None

class Farm(BaseModel):
    id: str
    name: str
    location: str
    crop: str
    size_acres: float
    soil_type: str
    health_score: int = 90
    manager: str
    farmer: str

class TelemetryData(BaseModel):
    farm_id: str
    soil_moisture: float
    temperature: float
    humidity: float
    soil_ph: float
    rain_detected: bool
    water_tank_level: float
    pump_status: str
