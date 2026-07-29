from config.settings import settings

class MQTTClient:
    def __init__(self):
        self.broker = settings.MQTT_BROKER
        self.port = settings.MQTT_PORT

    def publish_pump_command(self, action: str):
        return {"status": "published", "topic": settings.MQTT_TOPIC_PUMP, "command": action}

mqtt_client = MQTTClient()
