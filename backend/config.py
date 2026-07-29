import os

class Settings:
    PROJECT_NAME: str = "AgriSense AI"
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "https://your-supabase-project.supabase.co")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "your-supabase-anon-key")
    JWT_SECRET: str = os.getenv("JWT_SECRET", "super-secret-agrisense-jwt-key")
    MQTT_BROKER: str = os.getenv("MQTT_BROKER", "broker.hivemq.com")
    MQTT_PORT: int = int(os.getenv("MQTT_PORT", 1883))
    MQTT_TOPIC_TELEMETRY: str = "agrisense/esp32/telemetry/+"
    MQTT_TOPIC_PUMP: str = "agrisense/esp32/pump/control"

settings = Settings()
