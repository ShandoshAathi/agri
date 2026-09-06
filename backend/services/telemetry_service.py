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
        # Simulate slight dynamic microclimate fluctuations for dummy IoT mode
        delta_moisture = 0.5 if self.state["pump_status"] == "ON" else -0.1
        self.state["soil_moisture"] = round(max(15.0, min(95.0, self.state["soil_moisture"] + delta_moisture)), 1)
        self.state["temperature"] = round(26.0 + random.uniform(-0.8, 0.8), 1)
        self.state["humidity"] = round(64.0 + random.uniform(-2.0, 2.0), 1)
        self.state["soil_ph"] = round(6.5 + random.uniform(-0.05, 0.05), 2)
        self.state["last_updated"] = datetime.now().isoformat()
        return { **self.state, "farm_id": farm_id }

    def set_pump(self, action: str):
        self.state["pump_status"] = action
        return action

telemetry_service = TelemetryService()

