from fastapi import APIRouter, File, UploadFile, Form, HTTPException
from pydantic import BaseModel
from typing import Optional
import sys
import os

# Ensure ai-models is in python path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))
from ai_models.crop_recommendation.predict import crop_ai
from ai_models.disease_diagnosis.predict import disease_ai

router = APIRouter()

class CropRecommendationRequest(BaseModel):
    ph: float
    moisture: float
    temp: float
    humidity: float
    rainfall: float
    season: str = "Monsoon/Kharif"

@router.post("/crop-recommendation")
def recommend_crop(request: CropRecommendationRequest):
    try:
        prediction = crop_ai.predict(
            ph=request.ph,
            moisture=request.moisture,
            temp=request.temp,
            humidity=request.humidity,
            rainfall=request.rainfall,
            season=request.season
        )
        return {
            "status": "success",
            "inputs": request.model_dump(),
            "recommendation": prediction
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/disease-diagnosis")
async def diagnose_disease(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        result = disease_ai.analyze_image(contents, filename=file.filename)
        return {
            "status": "success",
            "filename": file.filename,
            "diagnosis": result
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
