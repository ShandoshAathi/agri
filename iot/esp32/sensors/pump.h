#ifndef PUMP_DRIVER_H
#define PUMP_DRIVER_H

#include <Arduino.h>

class PumpRelay {
private:
    uint8_t pin;
    bool active;
public:
    PumpRelay(uint8_t pin);
    void begin();
    void turnOn();
    void turnOff();
    bool isActive();
};

#endif
