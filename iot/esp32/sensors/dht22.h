#ifndef DHT22_DRIVER_H
#define DHT22_DRIVER_H

#include <Arduino.h>
#include <DHT.h>

class DHT22Sensor {
private:
    DHT dht;
    uint8_t pin;
public:
    DHT22Sensor(uint8_t pin);
    void begin();
    float readTemperature();
    float readHumidity();
};

#endif
