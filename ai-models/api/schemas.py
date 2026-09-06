# Pydantic Schemas for AI Service REST API

from pydantic import BaseModel, Field
from typing import List, Optional

class CropRecommendationRequest(BaseModel):
    ph: float = Field(..., ge=0.0, le=14.0, example=6.5)
    moisture: float = Field(..., ge=0.0, le=100.0, example=45.0)
    temperature: float = Field(..., example=26.4)
    humidity: float = Field(..., example=72.0)
    rainfall: Optional[float] = Field(default=150.0, example=180.0)
    N: Optional[float] = Field(default=50.0, example=60.0)
    P: Optional[float] = Field(default=50.0, example=45.0)
    K: Optional[float] = Field(default=50.0, example=50.0)

class AlternativeCrop(BaseModel):
    name: str
    confidence: float
    yield_est: str = Field(alias="yield")

    class Config:
        populate_by_name = True

class CropRecommendationResponse(BaseModel):
    best_crop: str
    confidence: float
    expected_yield: str
    water_requirement: str
    alternative_crops: List[AlternativeCrop]
    tips: List[str]

class DiseaseDiagnosisResponse(BaseModel):
    disease: str
    severity: str
    treatment: str
    prevention: str
