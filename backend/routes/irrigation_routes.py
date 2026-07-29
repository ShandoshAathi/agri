from fastapi import APIRouter

router = APIRouter()

@router.get("/rules")
def get_irrigation_rules():
    return {
        "min_moisture_threshold": 35.0,
        "max_moisture_threshold": 75.0,
        "rain_override_enabled": True,
        "water_tank_safety_cutoff": 20.0
    }
