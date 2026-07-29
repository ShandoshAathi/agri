from services.ai_service import ai_service
from schemas.payload import CropRecommendPayload

class AIController:
    def recommend(self, payload: CropRecommendPayload):
        res = ai_service.predict_crop(
            ph=payload.ph,
            moisture=payload.moisture,
            temp=payload.temp,
            humidity=payload.humidity,
            rainfall=payload.rainfall,
            season=payload.season
        )
        return {"status": "success", "recommendation": res}

    def diagnose(self, contents: bytes, filename: str):
        res = ai_service.diagnose_leaf(contents, filename)
        return {"status": "success", "filename": filename, "diagnosis": res}

ai_controller = AIController()
