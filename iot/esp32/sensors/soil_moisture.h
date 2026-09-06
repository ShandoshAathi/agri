#ifndef SOIL_MOISTURE_DRIVER_H
#define SOIL_MOISTURE_DRIVER_H

#include <Arduino.h>

class SoilMoistureSensor {
private:
    uint8_t pin;
public:
    SoilMoistureSensor(uint8_t pin);
    void begin();
    float readPercentage();
};

#endif
