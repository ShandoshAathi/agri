from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from services.telemetry_service import telemetry_service
from websocket.manager import ws_manager
import asyncio
import json

router = APIRouter()

@router.get("/telemetry/{farm_id}")
def get_telemetry(farm_id: str):
    return telemetry_service.get_current(farm_id)

@router.get("/history/{farm_id}")
def get_sensor_history(farm_id: str):
    return [
        {"timestamp": "2026-08-05T10:00:00Z", "soil_moisture": 42.1, "temperature": 28.4, "humidity": 64.0, "soil_ph": 6.8},
        {"timestamp": "2026-08-05T10:05:00Z", "soil_moisture": 41.8, "temperature": 28.6, "humidity": 63.5, "soil_ph": 6.8}
    ]

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
