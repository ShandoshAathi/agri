/*
 * AgriSense AI - Unified ESP32 Main Firmware
 */

#include "config.h"
#include "PinMap.h"
#include "../wifi/WiFiManager.h"
#include "../sensors/SensorDrivers.h"
#include "../relay/RelayController.h"
#include "../mqtt/MQTTClient.h"
#include "../ota/OTAHandler.h"

ESPWiFiManager wifiManager;
SensorDrivers sensors;
RelayController relay;
ESPMQTTClient mqttClient;
ESPOTAHandler otaHandler;

unsigned long lastPublishTime = 0;
const unsigned long publishInterval = 3000; // Publish telemetry every 3 seconds

void mqttCallback(char* topic, byte* payload, unsigned int length) {
    String msg = "";
    for (unsigned int i = 0; i < length; i++) {
        msg += (char)payload[i];
    }
    Serial.printf("[MQTT RX] Topic: %s | Payload: %s\n", topic, msg.c_str());
    if (msg == "PUMP_ON") {
        relay.turnOn();
    } else if (msg == "PUMP_OFF") {
        relay.turnOff();
    }
}

void setup() {
    Serial.begin(115200);
    Serial.println("Initializing AgriSense ESP32 Gateway Node...");

    wifiManager.connect(WIFI_SSID, WIFI_PASS);
    sensors.begin();
    relay.begin();
    mqttClient.setup(MQTT_SERVER, MQTT_PORT, mqttCallback);
    otaHandler.begin("AgriSense-ESP32-Node");
}

void loop() {
    if (wifiManager.isConnected()) {
        if (mqttClient.connect(DEVICE_ID)) {
            mqttClient.subscribe(PUMP_CONTROL_TOPIC);
        }
        mqttClient.loop();
        otaHandler.handle();

        unsigned long currentMillis = millis();
        if (currentMillis - lastPublishTime >= publishInterval) {
            lastPublishTime = currentMillis;
            TelemetryData data = sensors.readAll();
            mqttClient.publishTelemetry(TELEMETRY_TOPIC, data);
            Serial.println("[MQTT TX] Telemetry published.");
        }
    }
}
