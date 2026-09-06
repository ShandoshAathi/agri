from fastapi import APIRouter
from schemas.payload import PumpControlPayload
from services.telemetry_service import telemetry_service
from mqtt.client import mqtt_client

router = APIRouter()

@router.get("/")
def get_devices():
    return [
        {"device_id": "esp32-node-01", "type": "Sensor Hub", "status": "Online", "battery": 94},
        {"device_id": "esp32-pump-relay", "type": "Pump Relay", "status": "Online", "relay_state": "OFF"}
    ]

@router.post("/pump/{farm_id}")
def control_pump(farm_id: str, payload: PumpControlPayload):
    status = telemetry_service.set_pump(payload.action)
    mqtt_client.publish_pump_command(payload.action)
    return {"status": "success", "farm_id": farm_id, "pump_status": status, "mode": payload.mode}
