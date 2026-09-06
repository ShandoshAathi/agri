#include <Arduino.h>
#include "WiFiManager.h"

ESPWiFiManager::ESPWiFiManager() {}

void ESPWiFiManager::connect(const char* ssid, const char* password) {
    Serial.print("Connecting to Wi-Fi: ");
    Serial.println(ssid);
    WiFi.begin(ssid, password);
    int attempts = 0;
    while (WiFi.status() != WL_CONNECTED && attempts < 20) {
        delay(500);
        Serial.print(".");
        attempts++;
    }
    if (WiFi.status() == WL_CONNECTED) {
        Serial.println("\nWi-Fi Connected successfully!");
        Serial.print("IP Address: ");
        Serial.println(WiFi.localIP());
    } else {
        Serial.println("\nWi-Fi Connection Failed.");
    }
}

bool ESPWiFiManager::isConnected() {
    return (WiFi.status() == WL_CONNECTED);
}
