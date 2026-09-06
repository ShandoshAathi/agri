#ifndef RAIN_SENSOR_DRIVER_H
#define RAIN_SENSOR_DRIVER_H

#include <Arduino.h>

class RainSensor {
private:
    uint8_t pin;
public:
    RainSensor(uint8_t pin);
    void begin();
    bool isRainDetected();
};

#endif
