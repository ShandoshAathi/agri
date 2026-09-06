from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_notifications():
    return [
        {"id": "notif-01", "type": "Warning", "title": "Low Soil Moisture", "message": "Zone A moisture dropped below 30%", "timestamp": "2026-08-05T09:30:00Z"},
        {"id": "notif-02", "type": "Info", "title": "Automated Drip Started", "message": "Pump relay activated for 20 mins", "timestamp": "2026-08-05T08:00:00Z"}
    ]
