from fastapi import APIRouter
from routes.auth import router as auth_router
from routes.users import router as users_router
from routes.farms import router as farms_router
from routes.farmers import router as farmers_router
from routes.sensors import router as sensors_router
from routes.devices import router as devices_router
from routes.irrigation import router as irrigation_router
from routes.crops import router as crops_router
from routes.disease import router as disease_router
from routes.analytics import router as analytics_router
from routes.notifications import router as notifications_router
from routes.reports import router as reports_router
from routes.weather import router as weather_router
from routes.settings import router as settings_router

api_v1_router = APIRouter()

api_v1_router.include_router(auth_router, prefix="/auth", tags=["Authentication"])
api_v1_router.include_router(users_router, prefix="/users", tags=["Users Management"])
api_v1_router.include_router(farms_router, prefix="/farms", tags=["Farms Management"])
api_v1_router.include_router(farmers_router, prefix="/farmers", tags=["Farmers Management"])
api_v1_router.include_router(sensors_router, prefix="/sensors", tags=["Sensors & Telemetry"])
api_v1_router.include_router(sensors_router, prefix="/iot", tags=["IoT Telemetry (Legacy Alias)"])
api_v1_router.include_router(devices_router, prefix="/devices", tags=["Devices & Pumps"])
api_v1_router.include_router(irrigation_router, prefix="/irrigation", tags=["Irrigation Automation"])
api_v1_router.include_router(crops_router, prefix="/crops", tags=["Crop AI"])
api_v1_router.include_router(crops_router, prefix="/ai", tags=["AI Advisor (Legacy Alias)"])
api_v1_router.include_router(disease_router, prefix="/disease", tags=["Disease Diagnosis"])
api_v1_router.include_router(analytics_router, prefix="/analytics", tags=["Analytics"])
api_v1_router.include_router(notifications_router, prefix="/notifications", tags=["Notifications"])
api_v1_router.include_router(reports_router, prefix="/reports", tags=["Reports"])
api_v1_router.include_router(weather_router, prefix="/weather", tags=["Weather"])
api_v1_router.include_router(settings_router, prefix="/settings", tags=["Settings"])
