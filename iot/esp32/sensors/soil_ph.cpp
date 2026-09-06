#include "soil_ph.h"

SoilPHSensor::SoilPHSensor(uint8_t pin) : pin(pin) {}

void SoilPHSensor::begin() {
    pinMode(pin, INPUT);
}

float SoilPHSensor::readPH() {
    int rawValue = analogRead(pin);
    float voltage = rawValue * (3.3 / 4095.0);
    float phValue = 3.5 * voltage; // Calibrated linear pH conversion formula
    return max(3.0f, min(9.0f, phValue));
}
