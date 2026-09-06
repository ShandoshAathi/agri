from fastapi import APIRouter
from schemas.payload import FarmCreatePayload
from controllers.farm_controller import farm_controller

router = APIRouter()

@router.get("/")
def get_farms():
    return farm_controller.get_all()

@router.post("/")
def create_farm(payload: FarmCreatePayload):
    return farm_controller.create(payload)

@router.get("/{farm_id}")
def get_farm(farm_id: str):
    farms = farm_controller.get_all()
    for farm in farms:
        if farm.get("id") == farm_id:
            return farm
    return {"id": farm_id, "name": "Green Acres", "location": "Sector 4", "crop": "Wheat", "size_acres": 12.5, "soil_type": "Loam"}
