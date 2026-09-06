# AgriSense AI - ESP32 IoT Hardware Architecture

## System Overview
The AgriSense AI IoT layer uses ESP32-WROOM-32 microcontrollers for real-time microclimate sensing, soil telemetry monitoring, and smart drip pump relay actuation.

## Hardware Bill of Materials (BOM)
| Component | Function | Interface / Pin |
|---|---|---|
| ESP32-WROOM-32 | Node Gateway & Controller | Wi-Fi / BLE / Dual Core |
| DHT22 | Ambient Temp & Relative Humidity | GPIO 4 (Digital Input) |
| Capacitive Soil Moisture v1.2 | Volumetric Soil Water Content | GPIO 34 (ADC Input) |
| Soil pH Probe (Analog) | Soil Acidity & Alkalinity | GPIO 35 (ADC Input) |
| Rain Drop Sensor Module | Digital Precipitation Detection | GPIO 32 (Digital Input) |
| HC-SR04 Ultrasonic Sensor | Water Tank Level Distance | TRIG: GPIO 5, ECHO: GPIO 18 |
| 5V/12V Relay Module | Drip Irrigation Solenoid Pump | GPIO 26 (Digital Output) |

## Pinout Configuration (PinMap.h)
- `DHTPIN`: GPIO 4
- `SOIL_MOISTURE_PIN`: GPIO 34
- `SOIL_PH_PIN`: GPIO 35
- `RAIN_SENSOR_PIN`: GPIO 32
- `TRIG_PIN`: GPIO 5
- `ECHO_PIN`: GPIO 18
- `RELAY_PIN`: GPIO 26
