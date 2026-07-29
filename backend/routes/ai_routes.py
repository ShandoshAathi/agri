from fastapi import APIRouter, File, UploadFile
from schemas.payload import CropRecommendPayload
from controllers.ai_controller import ai_controller

router = APIRouter()

@router.post("/crop-recommendation")
def recommend_crop(payload: CropRecommendPayload):
    return ai_controller.recommend(payload)

@router.post("/disease-diagnosis")
async def diagnose_disease(file: UploadFile = File(...)):
    contents = await file.read()
    return ai_controller.diagnose(contents, file.filename)
