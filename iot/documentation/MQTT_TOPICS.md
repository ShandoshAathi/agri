# AgriSense AI - MQTT Messaging Specification

## Broker Configuration
- **Default Host**: `broker.hivemq.com` / `localhost`
- **Default Port**: `1883` (TCP) / `8883` (TLS)

## Topics Table

| Direction | Topic | Payload Format | QoS | Description |
|---|---|---|---|---|
| ESP32 -> Broker | `agrisense/esp32/telemetry/{farm_id}` | JSON | 1 | Real-time sensor readings stream |
| Broker -> ESP32 | `agrisense/esp32/pump/control` | Plaintext | 1 | Direct relay control (`PUMP_ON` / `PUMP_OFF`) |
| ESP32 -> Broker | `agrisense/esp32/status` | JSON | 0 | Device heartbeat & LWT status |

## Example Telemetry Payload
```json
{
  "device_id": "ESP32-NODE-01",
  "temperature": 26.4,
  "humidity": 72.0,
  "soil_moisture": 42.5,
  "soil_ph": 6.5,
  "rain_detected": false,
  "water_tank_level": 82.5
}
```
