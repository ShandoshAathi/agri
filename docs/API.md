# AgriSense AI - REST & WebSocket API Documentation

## Base URL
- **Production**: `https://api.agrisense.io/api/v1`
- **Development**: `http://localhost:8000/api/v1`

---

## Endpoint Modules Overview

| Submodule | Prefix | Description |
|---|---|---|
| Authentication | `/auth` | User login & registration |
| Users | `/users` | Profile retrieval & account management |
| Farms | `/farms` | Farm creation, listing & manager overview |
| Telemetry / Sensors | `/sensors` | Live ESP32 MQTT telemetry readings |
| Devices & Pumps | `/devices` | Solenoid drip pump state controls |
| Irrigation | `/irrigation` | Automated rule settings & drip logs |
| Crop AI | `/crops` | Machine Learning crop recommendation |
| Disease AI | `/disease` | Computer Vision leaf pathogen diagnosis |
| Analytics | `/analytics` | Historical water savings & yield metrics |
| Notifications | `/notifications` | Telemetry threshold warning alerts |
| Reports | `/reports` | Export PDF, CSV, and Excel reports |
| Weather | `/weather` | Microclimate weather forecasts |
| Settings | `/settings` | User and system configuration preferences |

---

## Endpoint Details

### 1. Authentication
#### `POST /auth/login`
- **Request**: `{"email": "alex@agrisense.io", "password": "securepassword"}`
- **Response**: `{"access_token": "jwt_token_here", "user": {"name": "Alex Morgan", "role": "Farm Manager"}}`

#### `POST /auth/register`
- **Request**: `{"email": "john@agrisense.io", "password": "pass", "full_name": "John Doe", "role": "Farmer"}`

---

### 2. AI Recommendation & Diagnosis
#### `POST /crops/crop-recommendation`
- **Request**:
```json
{
  "ph": 6.5,
  "moisture": 42.5,
  "temperature": 26.4,
  "humidity": 72.0,
  "rainfall": 150.0
}
```
- **Response**:
```json
{
  "best_crop": "Tomato (Hybrid Rome)",
  "confidence": 96.4,
  "expected_yield": "28.5 Tons / Acre",
  "water_requirement": "Moderate (Drip Recommended)",
  "alternative_crops": [
    {"name": "Bell Pepper", "confidence": 91.2, "yield": "22.0 Tons / Acre"}
  ],
  "tips": [
    "Maintain soil pH between 6.0 and 6.8 for maximum nutrient absorption."
  ]
}
```

#### `POST /disease/disease-diagnosis`
- **Request**: Multipart Form-Data (`file: image.jpg`)
- **Response**:
```json
{
  "disease": "Early Blight (Alternaria solani)",
  "severity": "Moderate (55%)",
  "treatment": "Apply copper-based fungicide spray twice weekly.",
  "prevention": "Avoid overhead sprinkler watering; remove bottom infected leaves."
}
```
