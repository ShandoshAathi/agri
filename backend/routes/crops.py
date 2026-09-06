from fastapi import APIRouter
from schemas.payload import CropRecommendPayload
from controllers.ai_controller import ai_controller

router = APIRouter()

@router.post("/recommendation")
def recommend_crop(payload: CropRecommendPayload):
    return ai_controller.recommend(payload)
