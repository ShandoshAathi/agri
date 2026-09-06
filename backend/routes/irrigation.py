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

@router.post("/rules")
def update_irrigation_rules(rules: dict):
    return {"status": "updated", "rules": rules}

@router.get("/schedule")
def get_irrigation_schedule():
    return [
        {"slot": "Morning", "time": "06:00 AM", "duration_mins": 30, "target_zone": "Zone A"},
        {"slot": "Evening", "time": "06:00 PM", "duration_mins": 25, "target_zone": "Zone B"}
    ]
