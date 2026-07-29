from fastapi import APIRouter
from routes.auth_routes import router as auth_router
from routes.farm_routes import router as farm_router
from routes.telemetry_routes import router as telemetry_router
from routes.ai_routes import router as ai_router
from routes.irrigation_routes import router as irrigation_router
from routes.report_routes import router as report_router

api_v1_router = APIRouter()

api_v1_router.include_router(auth_router, prefix="/auth", tags=["Authentication"])
api_v1_router.include_router(farm_router, prefix="/farms", tags=["Farms Management"])
api_v1_router.include_router(telemetry_router, prefix="/iot", tags=["IoT Telemetry"])
api_v1_router.include_router(ai_router, prefix="/ai", tags=["AI Advisor"])
api_v1_router.include_router(irrigation_router, prefix="/irrigation", tags=["Irrigation Automation"])
api_v1_router.include_router(report_router, prefix="/reports", tags=["Reports & Analytics"])
