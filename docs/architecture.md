# AgriSense AI - System Architecture

AgriSense AI is an end-to-end precision agriculture platform integrating Internet of Things (IoT) hardware telemetry, Artificial Intelligence predictive models, and real-time Web dashboard interfaces.

```
       ┌────────────────────────────────────────────────────────┐
       │                 React 19 + Vite Frontend               │
       │     (Tailwind CSS v4 + Recharts + Lucide Icons)       │
       └───────────────────────────┬────────────────────────────┘
                                   │ REST / WebSockets
                                   ▼
       ┌────────────────────────────────────────────────────────┐
       │                  FastAPI Backend Server                │
       │              (REST & WebSocket Routers)                │
       └──────────────┬──────────────────────────┬──────────────┘
                      │                          │
        Inference Call│                          │ MQTT / SQL
                      ▼                          ▼
     ┌────────────────────────┐      ┌─────────────────────────┐
     │   AI Models Package    │      │  Supabase PostgreSQL DB │
     │  (Crop Recommendation  │      │  + HiveMQ MQTT Broker   │
     │  & Leaf CV Pathogen)   │      └────────────▲────────────┘
     └────────────────────────┘                   │ MQTT Publish
                                                  │
                                     ┌────────────┴────────────┐
                                     │  ESP32 IoT Mesh Nodes   │
                                     │ (DHT22, Soil, Relay)    │
                                     └─────────────────────────┘
```

## Core Modules
1. **Frontend**: React 19 single-page application built with Vite, Tailwind CSS v4, dynamic glassmorphism UI, Recharts interactive data visualizers, and HTML5 audio player.
2. **Backend**: Modular FastAPI REST server handling auth, farm management, sensor streaming, and relay activation.
3. **AI Models Microservice**:
   - **Crop Recommendation**: Scikit-Learn Decision Tree classifier trained on soil NPK, pH, moisture, and microclimate parameters.
   - **Disease Diagnosis**: Computer Vision CNN classifier analyzing plant leaf image uploads for disease detection and severity rating.
4. **IoT Telemetry Hardware**: ESP32 microcontrollers communicating with an MQTT broker (HiveMQ) for live 2-second telemetry streaming and automated solenoid pump relay control.
5. **Database**: PostgreSQL / Supabase storing time-series sensor telemetry logs, farm manager profiles, crop advice, and diagnostic reports.
