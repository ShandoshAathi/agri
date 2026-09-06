from fastapi import APIRouter

router = APIRouter()

@router.get("/current")
def get_current_weather():
    return {
        "temperature": 28.5,
        "humidity": 65.0,
        "rain_probability": 15,
        "wind_speed_kmh": 12.4,
        "condition": "Partly Cloudy"
    }

@router.get("/forecast")
def get_weather_forecast():
    return [
        {"day": "Today", "high": 31, "low": 24, "condition": "Partly Cloudy", "rain": "15%"},
        {"day": "Tomorrow", "high": 29, "low": 23, "condition": "Heavy Rain", "rain": "85%"},
        {"day": "Friday", "high": 30, "low": 22, "condition": "Sunny", "rain": "5%"}
    ]
