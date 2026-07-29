/*
 * AgriSense AI - ESP32 12V Drip Irrigation Relay Pump Controller
 */

#include <WiFi.h>
#include <PubSubClient.h>

const char* ssid = "AgriSense_Farm_Mesh";
const char* password = "SmartFarmingKey2026";
const char* mqtt_server = "broker.hivemq.com";

#define RELAY_PIN 26

WiFiClient espClient;
PubSubClient client(espClient);

void callback(char* topic, byte* payload, unsigned int length) {
  String message = "";
  for (int i = 0; i < length; i++) {
    message += (char)payload[i];
  }
  
  if (message == "PUMP_ON") {
    digitalWrite(RELAY_PIN, HIGH);
    Serial.println("Pump Relay ACTIVATED [ON]");
  } else if (message == "PUMP_OFF") {
    digitalWrite(RELAY_PIN, LOW);
    Serial.println("Pump Relay DEACTIVATED [OFF]");
  }
}

void setup() {
  Serial.begin(115200);
  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, LOW);

  WiFi.begin(ssid, password);
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
}

void loop() {
  if (!client.connected()) {
    if (client.connect("ESP32_PumpRelay_01")) {
      client.subscribe("agrisense/esp32/pump/control");
    }
  }
  client.loop();
}
