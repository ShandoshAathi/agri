from schemas.payload import FarmCreatePayload

class FarmController:
    def __init__(self):
        self.farms = [
            {"id": "farm-01", "name": "Green Valley Estate", "location": "Salinas Valley, CA", "crop": "Tomato (Hybrid Rome)", "size_acres": 45.5, "soil_type": "Loamy Soil", "health_score": 94, "manager": "Dr. Sarah Jenkins", "farmer": "Elena Rostova"},
            {"id": "farm-02", "name": "Sunlight Acres", "location": "Fresno, CA", "crop": "Maize / Sweet Corn", "size_acres": 80.0, "soil_type": "Sandy Clay Loam", "health_score": 88, "manager": "Dr. Sarah Jenkins", "farmer": "Carlos Mendez"},
            {"id": "farm-03", "name": "Riverbend Organic Farm", "location": "Sacramento, CA", "crop": "Potato (Kufri Jyoti)", "size_acres": 28.2, "soil_type": "Silt Loam", "health_score": 96, "manager": "Dr. Sarah Jenkins", "farmer": "Amara Patel"},
        ]

    def get_all(self):
        return self.farms

    def create(self, payload: FarmCreatePayload):
        new_farm = {
            "id": f"farm-0{len(self.farms)+1}",
            "name": payload.name,
            "location": payload.location,
            "crop": payload.crop,
            "size_acres": payload.size_acres,
            "soil_type": payload.soil_type,
            "health_score": 90,
            "manager": "Dr. Sarah Jenkins",
            "farmer": payload.farmer_id or "Unassigned"
        }
        self.farms.append(new_farm)
        return new_farm

farm_controller = FarmController()
