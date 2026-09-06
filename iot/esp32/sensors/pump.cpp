#include "pump.h"

PumpRelay::PumpRelay(uint8_t pin) : pin(pin), active(false) {}

void PumpRelay::begin() {
    pinMode(pin, OUTPUT);
    digitalWrite(pin, LOW);
    active = false;
}

void PumpRelay::turnOn() {
    digitalWrite(pin, HIGH);
    active = true;
}

void PumpRelay::turnOff() {
    digitalWrite(pin, LOW);
    active = false;
}

bool PumpRelay::isActive() {
    return active;
}
