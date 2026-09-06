#ifndef ARDUINO_OTA_H
#define ARDUINO_OTA_H

#include "Arduino.h"

typedef int ota_error_t;

typedef void (*ota_callback_t)();
typedef void (*ota_progress_callback_t)(unsigned int, unsigned int);
typedef void (*ota_error_callback_t)(ota_error_t);

class ArduinoOTAMClass {
public:
    void setHostname(const char* hostname);
    void onStart(ota_callback_t fn);
    void onEnd(ota_callback_t fn);
    void onProgress(ota_progress_callback_t fn);
    void onError(ota_error_callback_t fn);
    void begin();
    void handle();
};

extern ArduinoOTAMClass ArduinoOTA;

#endif
