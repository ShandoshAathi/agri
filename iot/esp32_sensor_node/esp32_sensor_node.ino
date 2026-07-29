/*
 * AgriSense AI - ESP32 Multi-Sensor Telemetry Gateway Node
 */

#include <WiFi.h>
#include <PubSubClient.h>
#include <DHT.h>
#include <ArduinoJson.h>

const char* ssid = "AgriSense_Farm_Mesh";
const char* password = "SmartFarmingKey2026";
const char* mqtt_server = "broker.hivemq.com";
const int mqtt_port = 1883;

#define DHTPIN 4
#define DHTTYPE DHT22
#define SOIL_MOISTURE_PIN 34
#define SOIL_PH_PIN 35
#define RAIN_SENSOR_PIN 32
#define TRIG_PIN 5
#define ECHO_PIN 18

DHT dht(DHTPIN, DHTTYPE);
WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  Serial.begin(115200);
  dht.begin();
  pinMode(RAIN_SENSOR_PIN, INPUT);
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);

  WiFi.begin(ssid, password);
  client.setServer(mqtt_server, mqtt_port);
}

void loop() {
  if (!client.connected()) {
    if (client.connect("ESP32_AgriNode_01")) {
      Serial.println("Connected to AgriSense MQTT Broker!");
    }
  }
  client.loop();

  float temp = dht.readTemperature();
  float humidity = dht.readHumidity();
  int rawMoisture = analogRead(SOIL_MOISTURE_PIN);
  float moisture = map(rawMoisture, 4095, 1500, 0, 100);
  int rainVal = digitalRead(RAIN_SENSOR_PIN);
  bool rainDetected = (rainVal == LOW);

  StaticJsonDocument<256> doc;
  doc["device_id"] = "ESP32-NODE-01";
  doc["temperature"] = temp;
  doc["humidity"] = humidity;
  doc["soil_moisture"] = moisture;
  doc["soil_ph"] = 6.4;
  doc["rain_detected"] = rainDetected;
  doc["water_tank_level"] = 82.5;

  char jsonBuffer[512];
  serializeJson(doc, jsonBuffer);

  client.publish("agrisense/esp32/telemetry/farm_01", jsonBuffer);

  delay(3000);
}
