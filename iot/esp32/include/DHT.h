#ifndef DHT_H
#define DHT_H

#include "Arduino.h"

#define DHT22 22
#define DHT11 11

class DHT {
public:
    DHT(uint8_t pin = 0, uint8_t type = 0);
    void begin();
    float readTemperature(bool S = false);
    float readHumidity();
};

#endif
