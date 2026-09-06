#include "RelayController.h"
#include <Arduino.h>

RelayController::RelayController() : state(false) {}

void RelayController::begin() {
    pinMode(RELAY_PIN, OUTPUT);
    digitalWrite(RELAY_PIN, LOW);
    state = false;
}

void RelayController::turnOn() {
    digitalWrite(RELAY_PIN, HIGH);
    state = true;
    Serial.println("Solenoid Pump Relay [ACTIVATED]");
}

void RelayController::turnOff() {
    digitalWrite(RELAY_PIN, LOW);
    state = false;
    Serial.println("Solenoid Pump Relay [DEACTIVATED]");
}

bool RelayController::getState() {
    return state;
}
