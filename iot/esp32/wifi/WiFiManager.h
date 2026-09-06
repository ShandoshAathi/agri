#ifndef WIFI_MANAGER_H
#define WIFI_MANAGER_H

#include <Arduino.h>
#include <WiFi.h>

class ESPWiFiManager {
public:
    ESPWiFiManager();
    void connect(const char* ssid, const char* password);
    bool isConnected();
};

#endif
