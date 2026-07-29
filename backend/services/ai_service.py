import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))
from ai_models.crop_recommendation.predict import crop_ai
from ai_models.disease_diagnosis.predict import disease_ai

class AIService:
    def predict_crop(self, ph: float, moisture: float, temp: float, humidity: float, rainfall: float, season: str):
        return crop_ai.predict(ph=ph, moisture=moisture, temp=temp, humidity=humidity, rainfall=rainfall, season=season)

    def diagnose_leaf(self, contents: bytes, filename: str):
        return disease_ai.analyze_image(contents, filename=filename)

ai_service = AIService()
