from fastapi import APIRouter, WebSocket, WebSocketDisconnect, HTTPException
from pydantic import BaseModel
import asyncio
import json
import random
from datetime import datetime

router = APIRouter()

class PumpControlRequest(BaseModel):
    action: str  # 'ON' or 'OFF'
    mode: str = "Manual"

CURRENT_TELEMETRY = {
    "farm_id": "farm-01",
    "soil_moisture": 42.5,
    "temperature": 26.4,
    "humidity": 64.0,
    "soil_ph": 6.5,
    "rain_detected": False,
    "water_tank_level": 78.0,
    "pump_status": "OFF",
    "last_updated": datetime.now().isoformat()
}

@router.get("/telemetry/{farm_id}")
def get_telemetry(farm_id: str):
    return {
        **CURRENT_TELEMETRY,
        "farm_id": farm_id,
        "history": [
            {"time": "08:00", "moisture": 38.0, "temp": 22.1, "humidity": 70},
            {"time": "10:00", "moisture": 40.2, "temp": 24.5, "humidity": 68},
            {"time": "12:00", "moisture": 42.5, "temp": 26.4, "humidity": 64},
            {"time": "14:00", "moisture": 41.8, "temp": 27.2, "humidity": 61},
        ]
    }

@router.post("/pump/{farm_id}")
def control_pump(farm_id: str, request: PumpControlRequest):
    if request.action not in ["ON", "OFF"]:
        raise HTTPException(status_code=400, detail="Invalid pump action. Must be ON or OFF.")
    
    CURRENT_TELEMETRY["pump_status"] = request.action
    CURRENT_TELEMETRY["last_updated"] = datetime.now().isoformat()
    return {
        "status": "success",
        "farm_id": farm_id,
        "pump_status": request.action,
        "message": f"Drip irrigation pump turned {request.action} successfully."
    }

@router.websocket("/ws/telemetry")
async def websocket_telemetry(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            # Simulate real-time sensor fluctuation
            moisture = round(CURRENT_TELEMETRY["soil_moisture"] + random.uniform(-0.5, 0.5), 1)
            temp = round(CURRENT_TELEMETRY["temperature"] + random.uniform(-0.2, 0.2), 1)
            humidity = round(CURRENT_TELEMETRY["humidity"] + random.uniform(-0.4, 0.4), 1)
            
            payload = {
                "farm_id": CURRENT_TELEMETRY["farm_id"],
                "soil_moisture": max(10, min(90, moisture)),
                "temperature": max(15, min(45, temp)),
                "humidity": max(30, min(95, humidity)),
                "soil_ph": CURRENT_TELEMETRY["soil_ph"],
                "rain_detected": CURRENT_TELEMETRY["rain_detected"],
                "water_tank_level": CURRENT_TELEMETRY["water_tank_level"],
                "pump_status": CURRENT_TELEMETRY["pump_status"],
                "timestamp": datetime.now().strftime("%H:%M:%S")
            }
            await websocket.send_text(json.dumps(payload))
            await asyncio.sleep(2)
    except WebSocketDisconnect:
        pass
