#include "SensorDrivers.h"

SensorDrivers::SensorDrivers() 
    : dht(DHTPIN), 
      moistureSensor(SOIL_MOISTURE_PIN), 
      phSensor(SOIL_PH_PIN), 
      rainSensor(RAIN_SENSOR_PIN), 
      waterLevelSensor(TRIG_PIN, ECHO_PIN), 
      pumpRelay(RELAY_PIN) {}

void SensorDrivers::begin() {
    dht.begin();
    moistureSensor.begin();
    phSensor.begin();
    rainSensor.begin();
    waterLevelSensor.begin();
    pumpRelay.begin();
}

TelemetryData SensorDrivers::readAll() {
    TelemetryData data;
    data.temperature = dht.readTemperature();
    data.humidity = dht.readHumidity();
    data.soil_moisture = moistureSensor.readPercentage();
    data.soil_ph = phSensor.readPH();
    data.rain_detected = rainSensor.isRainDetected();
    data.water_tank_level = waterLevelSensor.readLevelPercentage();
    return data;
}

PumpRelay& SensorDrivers::getPump() {
    return pumpRelay;
}
