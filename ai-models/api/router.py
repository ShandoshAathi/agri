# FastAPI Sub-Router for AI Models Service

from fastapi import APIRouter, File, UploadFile, HTTPException
from api.schemas import CropRecommendationRequest, CropRecommendationResponse, DiseaseDiagnosisResponse
from CropRecommendation.prediction.predict import crop_predictor
from DiseaseDiagnosis.inference.predict import disease_diagnostic_engine

ai_models_router = APIRouter()

@ai_models_router.post("/crop-recommendation", response_model=CropRecommendationResponse)
def get_crop_recommendation(payload: CropRecommendationRequest):
    try:
        res = crop_predictor.predict(
            ph=payload.ph,
            moisture=payload.moisture,
            temp=payload.temperature,
            humidity=payload.humidity,
            rainfall=payload.rainfall,
            N=payload.N,
            P=payload.P,
            K=payload.K
        )
        return res
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@ai_models_router.post("/disease-diagnosis", response_model=DiseaseDiagnosisResponse)
async def get_disease_diagnosis(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        res = disease_diagnostic_engine.diagnose(contents, filename=file.filename)
        return res
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
