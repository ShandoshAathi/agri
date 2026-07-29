from fastapi import APIRouter
from fastapi.responses import JSONResponse
import datetime

router = APIRouter()

@router.get("/analytics")
def get_analytics_summary():
    return {
        "water_saved_liters": 14250,
        "yield_increase_percent": 18.5,
        "ai_prediction_accuracy": 96.2,
        "active_iot_nodes": 10,
        "total_farms": 3,
        "monthly_trend": [
            {"month": "Jan", "water": 12000, "yield": 22},
            {"month": "Feb", "water": 14500, "yield": 25},
            {"month": "Mar", "water": 13800, "yield": 24},
            {"month": "Apr", "water": 16200, "yield": 28},
            {"month": "May", "water": 17900, "yield": 31},
            {"month": "Jun", "water": 18500, "yield": 33}
        ]
    }

@router.get("/export")
def export_reports(format: str = "json"):
    report_data = {
        "generated_at": datetime.datetime.now().isoformat(),
        "platform": "AgriSense AI Smart Farming Platform",
        "summary": {
            "farms_monitored": 3,
            "sensor_telemetry_events": 48290,
            "irrigation_cycles_triggered": 142,
            "disease_scans_conducted": 38
        },
        "farms": [
            {"id": "farm-01", "name": "Green Valley Estate", "crop": "Tomato (Hybrid Rome)", "health": "94%"},
            {"id": "farm-02", "name": "Sunlight Acres", "crop": "Maize / Sweet Corn", "health": "88%"},
            {"id": "farm-03", "name": "Riverbend Organic Farm", "crop": "Potato (Kufri Jyoti)", "health": "96%"}
        ]
    }
    return JSONResponse(content=report_data)
