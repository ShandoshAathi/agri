#include "OTAHandler.h"

ESPOTAHandler::ESPOTAHandler() {}

void ESPOTAHandler::begin(const char* hostname) {
    ArduinoOTA.setHostname(hostname);
    ArduinoOTA.onStart([]() {
        Serial.println("Start updating firmware via OTA...");
    });
    ArduinoOTA.onEnd([]() {
        Serial.println("\nFirmware update completed!");
    });
    ArduinoOTA.onProgress([](unsigned int progress, unsigned int total) {
        Serial.printf("OTA Progress: %u%%\r", (progress / (total / 100)));
    });
    ArduinoOTA.onError([](ota_error_t error) {
        Serial.printf("OTA Error[%u]: ", error);
    });
    ArduinoOTA.begin();
}

void ESPOTAHandler::handle() {
    ArduinoOTA.handle();
}
