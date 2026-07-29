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
