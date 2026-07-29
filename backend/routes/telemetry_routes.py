from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from schemas.payload import PumpControlPayload
from services.telemetry_service import telemetry_service
from mqtt.client import mqtt_client
from websocket.manager import ws_manager
import asyncio
import json

router = APIRouter()

@router.get("/telemetry/{farm_id}")
def get_telemetry(farm_id: str):
    return telemetry_service.get_current(farm_id)

@router.post("/pump/{farm_id}")
def control_pump(farm_id: str, payload: PumpControlPayload):
    status = telemetry_service.set_pump(payload.action)
    mqtt_client.publish_pump_command(payload.action)
    return {"status": "success", "farm_id": farm_id, "pump_status": status}

@router.websocket("/ws/telemetry")
async def websocket_endpoint(websocket: WebSocket):
    await ws_manager.connect(websocket)
    try:
        while True:
            data = telemetry_service.get_current("farm-01")
            await websocket.send_text(json.dumps(data))
            await asyncio.sleep(2)
    except WebSocketDisconnect:
        ws_manager.disconnect(websocket)
