from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def get_settings():
    return {
        "telemetry_interval_sec": 5,
        "mqtt_broker": "broker.hivemq.com",
        "mqtt_port": 1883,
        "alert_notifications_enabled": True,
        "dark_mode_default": True
    }

@router.post("/")
def update_settings(new_settings: dict):
    return {"status": "success", "updated_settings": new_settings}
