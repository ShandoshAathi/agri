# AgriSense AI – AI and IoT-Based Smart Farming Platform

AgriSense AI is an intelligent digital farming platform that integrates Artificial Intelligence, Internet of Things (IoT), Automation, Data Analytics, and Responsive Web Technologies into a single unified application.

---

## 🌟 Key Features

- **Real-Time IoT Telemetry**: Microclimate monitoring (Soil Moisture, Temperature, Humidity, Soil pH, Rain Detection, Water Tank Level) via ESP32 nodes.
- **AI Crop Recommendation**: Machine Learning recommendation engine based on soil pH, moisture, micro-climates, and seasonal rainfall.
- **AI Disease Diagnosis**: Computer Vision leaf scanner identifying plant pathogens with severity ratings and treatment guidance.
- **Smart Drip Irrigation**: Automated solenoid pump relay triggers with rain sensor overrides.
- **Role-Based Management**: Dedicated views for Farm Managers (multi-farm oversight) and Farmers (assigned farm management).
- **Analytics & Exports**: Dynamic Recharts visualizers with export support for PDF, Excel (.xlsx), and CSV.

---

## 🛠️ Project Structure

```
AgriSense-AI/
│
├── README.md                 # Project Overview & Quickstart Guide
├── LICENSE                   # MIT Open Source License
├── .gitignore                # Git exclusions
├── docker-compose.yml        # Multi-container orchestration (FastAPI + React + Supabase)
├── package.json              # Node.js dependencies
├── vite.config.js            # Vite build configuration
├── tailwind.config.js        # Tailwind CSS v4 design system
├── .env                      # Environment Variables
│
├── frontend/                 # React + Vite Application
│   └── src/
│       ├── components/       # Header, Sidebar, Glassmorphic UI components
│       ├── context/          # AuthContext, FarmContext, TelemetryContext
│       ├── pages/            # 11 Modules (Auth, Dashboard, IoT, AI, Irrigation...)
│       └── services/         # REST & WebSocket API clients
│
├── backend/                  # FastAPI Backend Server
│   ├── main.py               # REST API entrypoint
│   ├── config.py             # Settings
│   └── database/             # PostgreSQL schema
│
├── ai-models/                # ML Crop Advisor & Vision Disease Scanner
│   ├── crop_recommendation/  # Scikit-learn inference script
│   └── disease_diagnosis/    # OpenCV leaf classification model
│
├── iot/                      # ESP32 C++ Arduino Firmware
│   ├── esp32_sensor_node/    # Multi-sensor node MQTT publisher
│   └── esp32_relay_pump/    # 12V Drip Pump Relay subscriber
│
├── database/                 # Supabase PostgreSQL SQL DDL
├── docs/                     # System architecture & API documentation
├── assets/                   # Screenshots & architectural diagrams
└── deployment/               # Vercel & Docker deployment configs
```

---

## 🚀 Quickstart Guide

### 1. Run Frontend Dev Server
```bash
npm install
npm run dev
```

### 2. Run Backend API Server
```bash
cd backend
pip install -r requirements.txt
python main.py
```
Backend API interactive documentation available at: `http://localhost:8000/docs`
