#include "dht22.h"

DHT22Sensor::DHT22Sensor(uint8_t pin) : pin(pin), dht(pin, DHT22) {}

void DHT22Sensor::begin() {
    dht.begin();
}

float DHT22Sensor::readTemperature() {
    float t = dht.readTemperature();
    return isnan(t) ? 25.0f : t;
}

float DHT22Sensor::readHumidity() {
    float h = dht.readHumidity();
    return isnan(h) ? 60.0f : h;
}
