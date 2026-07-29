from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class IrrigationRuleUpdate(BaseModel):
    min_moisture_threshold: float
    max_moisture_threshold: float
    rain_override_enabled: bool
    water_tank_safety_cutoff: float

IRRIGATION_CONFIG = {
    "min_moisture_threshold": 35.0,
    "max_moisture_threshold": 75.0,
    "rain_override_enabled": True,
    "water_tank_safety_cutoff": 20.0,
    "auto_mode": True,
    "active_schedule": "06:00 AM - 08:00 AM"
}

@router.get("/rules")
def get_irrigation_rules():
    return IRRIGATION_CONFIG

@router.post("/rules")
def update_irrigation_rules(payload: IrrigationRuleUpdate):
    IRRIGATION_CONFIG.update(payload.model_dump())
    return {
        "status": "success",
        "message": "Irrigation automation rules updated successfully",
        "config": IRRIGATION_CONFIG
    }
