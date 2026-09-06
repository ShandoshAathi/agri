from fastapi import APIRouter

router = APIRouter()

@router.get("/summary")
def get_analytics_summary():
    return {
        "water_saved_liters": 14250,
        "yield_increase_percent": 18.5,
        "ai_prediction_accuracy": 96.2,
        "active_iot_nodes": 10
    }

@router.get("/water-usage")
def get_water_usage():
    return [
        {"day": "Mon", "liters": 450},
        {"day": "Tue", "liters": 380},
        {"day": "Wed", "liters": 510},
        {"day": "Thu", "liters": 420},
        {"day": "Fri", "liters": 390}
    ]
