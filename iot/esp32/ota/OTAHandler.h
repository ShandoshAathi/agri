#ifndef OTA_HANDLER_H
#define OTA_HANDLER_H

#include <ArduinoOTA.h>

class ESPOTAHandler {
public:
    ESPOTAHandler();
    void begin(const char* hostname = "AgriSense-Node");
    void handle();
};

#endif
