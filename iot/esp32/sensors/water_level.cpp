#include "water_level.h"

WaterLevelSensor::WaterLevelSensor(uint8_t trigPin, uint8_t echoPin) : trigPin(trigPin), echoPin(echoPin) {}

void WaterLevelSensor::begin() {
    pinMode(trigPin, OUTPUT);
    pinMode(echoPin, INPUT);
}

float WaterLevelSensor::readLevelPercentage() {
    digitalWrite(trigPin, LOW);
    delayMicroseconds(2);
    digitalWrite(trigPin, HIGH);
    delayMicroseconds(10);
    digitalWrite(trigPin, LOW);
    
    long duration = pulseIn(echoPin, HIGH, 30000);
    float distanceCm = duration * 0.034 / 2.0;
    
    // Assuming tank depth is 50cm
    float fillPercentage = (1.0f - (distanceCm / 50.0f)) * 100.0f;
    return max(0.0f, min(100.0f, fillPercentage));
}
