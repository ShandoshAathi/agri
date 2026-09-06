#include <Arduino.h>
#include "soil_moisture.h"

SoilMoistureSensor::SoilMoistureSensor(uint8_t pin) : pin(pin) {}

void SoilMoistureSensor::begin() {
    pinMode(pin, INPUT);
}

float SoilMoistureSensor::readPercentage() {
    int rawValue = analogRead(pin);
    float moisturePct = map(rawValue, 4095, 1500, 0, 100);
    return max(0.0f, min(100.0f, moisturePct));
}
