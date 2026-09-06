#include "MQTTClient.h"
#include <ArduinoJson.h>

ESPMQTTClient::ESPMQTTClient() : client(net) {}

void ESPMQTTClient::setup(const char* broker, int port, MQTT_CALLBACK_SIGNATURE) {
    client.setServer(broker, port);
    client.setCallback(callback);
}

void ESPMQTTClient::loop() {
    client.loop();
}

bool ESPMQTTClient::connect(const char* client_id) {
    if (!client.connected()) {
        Serial.print("Connecting to MQTT Broker as ");
        Serial.println(client_id);
        if (client.connect(client_id)) {
            Serial.println("MQTT Broker connected.");
            return true;
        }
        return false;
    }
    return true;
}

void ESPMQTTClient::publishTelemetry(const char* topic, const TelemetryData& data) {
    StaticJsonDocument<256> doc;
    doc["device_id"] = "ESP32-NODE-01";
    doc["temperature"] = data.temperature;
    doc["humidity"] = data.humidity;
    doc["soil_moisture"] = data.soil_moisture;
    doc["soil_ph"] = data.soil_ph;
    doc["rain_detected"] = data.rain_detected;
    doc["water_tank_level"] = data.water_tank_level;

    char buffer[512];
    serializeJson(doc, buffer);
    client.publish(topic, buffer);
}

void ESPMQTTClient::subscribe(const char* topic) {
    client.subscribe(topic);
}
