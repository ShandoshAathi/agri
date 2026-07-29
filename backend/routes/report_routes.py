from fastapi import APIRouter

router = APIRouter()

@router.get("/analytics")
def get_analytics():
    return {
        "water_saved_liters": 14250,
        "yield_increase_percent": 18.5,
        "ai_prediction_accuracy": 96.2,
        "active_iot_nodes": 10
    }
