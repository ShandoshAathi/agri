#include "rain_sensor.h"

RainSensor::RainSensor(uint8_t pin) : pin(pin) {}

void RainSensor::begin() {
    pinMode(pin, INPUT);
}

bool RainSensor::isRainDetected() {
    return (digitalRead(pin) == LOW); // LOW indicates water bridge detected on sensor board
}
