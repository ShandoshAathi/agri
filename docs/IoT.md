# AgriSense AI - IoT Hardware & Telemetry Architecture

## Hardware Platform
- **Microcontroller**: ESP32-WROOM-32 (240MHz Dual Core, Integrated Wi-Fi & BLE).
- **Communication Protocol**: MQTT over TCP/IP (`broker.hivemq.com:1883`).

## Firmware Structure (`iot/esp32/`)
- `firmware/`: Main sketch entry point (`main.ino`), pin configuration (`PinMap.h`), and credentials (`config.h`).
- `wifi/`: Wi-Fi connection manager (`WiFiManager.cpp`).
- `sensors/`: Modular C++ drivers for `dht22.cpp`, `soil_moisture.cpp`, `soil_ph.cpp`, `rain_sensor.cpp`, `water_level.cpp`, and `pump.cpp`.
- `relay/`: Solenoid drip irrigation relay controller (`RelayController.cpp`).
- `mqtt/`: Payload serializer & topic subscriber (`MQTTClient.cpp`).
- `ota/`: Wireless firmware update handler (`OTAHandler.cpp`).

## Python Telemetry Simulator (`iot/simulator/`)
Used for end-to-end testing without physical microcontrollers:
```bash
python iot/simulator/telemetry_simulator.py --broker broker.hivemq.com --interval 3
```
Dry-run mode:
```bash
python iot/simulator/telemetry_simulator.py --dry-run
```
