#ifndef WATER_LEVEL_DRIVER_H
#define WATER_LEVEL_DRIVER_H

#include <Arduino.h>

class WaterLevelSensor {
private:
    uint8_t trigPin;
    uint8_t echoPin;
public:
    WaterLevelSensor(uint8_t trigPin, uint8_t echoPin);
    void begin();
    float readLevelPercentage();
};

#endif
