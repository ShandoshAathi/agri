#ifndef WIFI_H
#define WIFI_H

#include "Arduino.h"

class IPAddress {
public:
    const char* toString() const { return "192.168.1.100"; }
};

class WiFiClass {
public:
    void begin(const char* ssid, const char* passphrase);
    int status();
    IPAddress localIP();
    void disconnect();
};

extern WiFiClass WiFi;

class WiFiClient {
public:
    bool connect(const char *host, uint16_t port);
    void stop();
    bool connected();
};

#endif
