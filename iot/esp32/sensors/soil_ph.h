#ifndef SOIL_PH_DRIVER_H
#define SOIL_PH_DRIVER_H

#include <Arduino.h>

class SoilPHSensor {
private:
    uint8_t pin;
public:
    SoilPHSensor(uint8_t pin);
    void begin();
    float readPH();
};

#endif
