#ifndef MQTT_CLIENT_H
#define MQTT_CLIENT_H

#include <PubSubClient.h>
#include <WiFi.h>
#include "../sensors/SensorDrivers.h"

class ESPMQTTClient {
private:
    WiFiClient net;
    PubSubClient client;
public:
    ESPMQTTClient();
    void setup(const char* broker, int port, MQTT_CALLBACK_SIGNATURE);
    void loop();
    bool connect(const char* client_id);
    void publishTelemetry(const char* topic, const TelemetryData& data);
    void subscribe(const char* topic);
};

#endif
