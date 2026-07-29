from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

class FarmCreate(BaseModel):
    name: str
    location: str
    crop: str
    size_acres: float
    soil_type: str
    farmer_id: Optional[str] = None

MOCK_FARMS = [
    {
        "id": "farm-01",
        "name": "Green Valley Estate",
        "location": "Salinas Valley, CA",
        "crop": "Tomato (Hybrid Rome)",
        "size_acres": 45.5,
        "soil_type": "Loamy Soil",
        "health_score": 94,
        "status": "Optimal",
        "manager": "Dr. Sarah Jenkins",
        "farmer": "Elena Rostova",
        "device_count": 3
    },
    {
        "id": "farm-02",
        "name": "Sunlight Acres",
        "location": "Fresno, CA",
        "crop": "Maize / Sweet Corn",
        "size_acres": 80.0,
        "soil_type": "Sandy Clay Loam",
        "health_score": 88,
        "status": "Attention Needed",
        "manager": "Dr. Sarah Jenkins",
        "farmer": "Carlos Mendez",
        "device_count": 5
    },
    {
        "id": "farm-03",
        "name": "Riverbend Organic Farm",
        "location": "Sacramento, CA",
        "crop": "Potato (Kufri Jyoti)",
        "size_acres": 28.2,
        "soil_type": "Silt Loam",
        "health_score": 96,
        "status": "Optimal",
        "manager": "Dr. Sarah Jenkins",
        "farmer": "Amara Patel",
        "device_count": 2
    }
]

@router.get("/")
def get_farms():
    return MOCK_FARMS

@router.post("/")
def create_farm(payload: FarmCreate):
    new_farm = {
        "id": f"farm-0{len(MOCK_FARMS) + 1}",
        "name": payload.name,
        "location": payload.location,
        "crop": payload.crop,
        "size_acres": payload.size_acres,
        "soil_type": payload.soil_type,
        "health_score": 90,
        "status": "Optimal",
        "manager": "Dr. Sarah Jenkins",
        "farmer": payload.farmer_id or "Unassigned",
        "device_count": 1
    }
    MOCK_FARMS.append(new_farm)
    return new_farm

@router.put("/{farm_id}/assign")
def assign_farmer(farm_id: str, farmer_name: str):
    for farm in MOCK_FARMS:
        if farm["id"] == farm_id:
            farm["farmer"] = farmer_name
            return farm
    raise HTTPException(status_code=404, detail="Farm not found")
