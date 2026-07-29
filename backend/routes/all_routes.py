from fastapi import APIRouter, File, UploadFile
from schemas.payload import UserLoginPayload, UserRegisterPayload, FarmCreatePayload, CropRecommendPayload, PumpControlPayload
from controllers.auth_controller import auth_controller
from controllers.farm_controller import farm_controller
from controllers.ai_controller import ai_controller
from services.telemetry_service import telemetry_service
from mqtt.client import mqtt_client

auth_router = APIRouter()
farm_router = APIRouter()
telemetry_router = APIRouter()
ai_router = APIRouter()
irrigation_router = APIRouter()
report_router = APIRouter()

@auth_router.post("/login")
def login(payload: UserLoginPayload):
    return auth_controller.login(payload)

@auth_router.post("/register")
def register(payload: UserRegisterPayload):
    return auth_controller.register(payload)

@farm_router.get("/")
def get_farms():
    return farm_controller.get_all()

@farm_router.post("/")
def create_farm(payload: FarmCreatePayload):
    return farm_controller.create(payload)

@telemetry_router.get("/telemetry/{farm_id}")
def get_telemetry(farm_id: str):
    return telemetry_service.get_current(farm_id)

@telemetry_router.post("/pump/{farm_id}")
def control_pump(farm_id: str, payload: PumpControlPayload):
    status = telemetry_service.set_pump(payload.action)
    mqtt_client.publish_pump_command(payload.action)
    return {"status": "success", "farm_id": farm_id, "pump_status": status}

@ai_router.post("/crop-recommendation")
def crop_recommendation(payload: CropRecommendPayload):
    return ai_controller.recommend(payload)

@ai_router.post("/disease-diagnosis")
async def disease_diagnosis(file: UploadFile = File(...)):
    contents = await file.read()
    return ai_controller.diagnose(contents, file.filename)

@irrigation_router.get("/rules")
def get_rules():
    return {"min_moisture_threshold": 35.0, "rain_override_enabled": True}

@report_router.get("/analytics")
def get_analytics():
    return {"water_saved_liters": 14250, "yield_increase_percent": 18.5, "ai_accuracy": 96.2}
