#ifndef SENSOR_DRIVERS_H
#define SENSOR_DRIVERS_H

#include "../firmware/PinMap.h"
#include "dht22.h"
#include "soil_moisture.h"
#include "soil_ph.h"
#include "rain_sensor.h"
#include "water_level.h"
#include "pump.h"

struct TelemetryData {
    float temperature;
    float humidity;
    float soil_moisture;
    float soil_ph;
    bool rain_detected;
    float water_tank_level;
};

class SensorDrivers {
private:
    DHT22Sensor dht;
    SoilMoistureSensor moistureSensor;
    SoilPHSensor phSensor;
    RainSensor rainSensor;
    WaterLevelSensor waterLevelSensor;
    PumpRelay pumpRelay;
public:
    SensorDrivers();
    void begin();
    TelemetryData readAll();
    PumpRelay& getPump();
};

#endif
