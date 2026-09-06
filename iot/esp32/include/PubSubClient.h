#ifndef PUBSUBCLIENT_H
#define PUBSUBCLIENT_H

#include "Arduino.h"
#include "WiFi.h"

typedef void (*MQTT_CALLBACK_SIGNATURE)(char*, uint8_t*, unsigned int);

class PubSubClient {
public:
    PubSubClient();
    PubSubClient(WiFiClient& client);
    PubSubClient& setServer(const char* domain, uint16_t port);
    PubSubClient& setCallback(MQTT_CALLBACK_SIGNATURE callback);
    bool connect(const char* id);
    bool publish(const char* topic, const char* payload);
    bool subscribe(const char* topic);
    bool loop();
    bool connected();
};

#endif
