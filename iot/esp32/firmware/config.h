#ifndef CONFIG_H
#define CONFIG_H

// Network & Broker Credentials
constexpr const char* WIFI_SSID = "AgriSense_Farm_Mesh";
constexpr const char* WIFI_PASS = "SmartFarmingKey2026";
constexpr const char* MQTT_SERVER = "broker.hivemq.com";
constexpr int MQTT_PORT = 1883;

// Gateway Identifier & Topics
constexpr const char* DEVICE_ID = "ESP32-NODE-01";
constexpr const char* TELEMETRY_TOPIC = "agrisense/esp32/telemetry/farm_01";
constexpr const char* PUMP_CONTROL_TOPIC = "agrisense/esp32/pump/control";

#endif

