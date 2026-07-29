import random
from datetime import datetime

class TelemetryService:
    def __init__(self):
        self.state = {
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

    def get_current(self, farm_id: str):
        return { **self.state, "farm_id": farm_id }

    def set_pump(self, action: str):
        self.state["pump_status"] = action
        return action

telemetry_service = TelemetryService()
