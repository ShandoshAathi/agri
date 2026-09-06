# AgriSense AI - Python IoT Telemetry Simulator

import time
import json
import random
import argparse

def generate_telemetry_payload(device_id="ESP32-NODE-SIMULATOR"):
    return {
        "device_id": device_id,
        "temperature": round(random.uniform(22.0, 34.0), 1),
        "humidity": round(random.uniform(50.0, 85.0), 1),
        "soil_moisture": round(random.uniform(30.0, 65.0), 1),
        "soil_ph": round(random.uniform(6.0, 7.2), 1),
        "rain_detected": random.choice([True, False, False, False]),
        "water_tank_level": round(random.uniform(60.0, 95.0), 1),
        "timestamp": int(time.time())
    }

def run_simulator(broker="broker.hivemq.com", port=1883, farm_id="farm_01", interval=3, dry_run=False):
    topic = f"agrisense/esp32/telemetry/{farm_id}"
    print(f"[IoT Telemetry Simulator Started]")
    print(f" Target Broker: {broker}:{port}")
    print(f" Target Topic : {topic}")
    print(f" Interval     : {interval} seconds")
    print(f" Mode         : {'Dry Run (Console Only)' if dry_run else 'Live MQTT Publish'}\n")

    client = None
    if not dry_run:
        try:
            import paho.mqtt.client as mqtt
            client = mqtt.Client(client_id="AgriSense_Python_Simulator")
            client.connect(broker, port, 60)
            client.loop_start()
            print("Connected to MQTT Broker successfully.\n")
        except Exception as e:
            print(f"Failed to connect to MQTT broker: {e}. Falling back to dry-run.\n")
            dry_run = True

    try:
        count = 0
        while True:
            payload = generate_telemetry_payload()
            json_str = json.dumps(payload)
            count += 1
            print(f"[{count}] Publishing -> {json_str}")

            if client and not dry_run:
                client.publish(topic, json_str)

            if dry_run and count >= 3:
                print("Dry run completed 3 sample iterations.")
                break

            time.sleep(interval)
    except KeyboardInterrupt:
        print("\nSimulator stopped by user.")
    finally:
        if client:
            client.loop_stop()
            client.disconnect()

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="AgriSense IoT Telemetry Simulator")
    parser.add_argument("--broker", default="broker.hivemq.com", help="MQTT Broker host")
    parser.add_argument("--port", type=int, default=1883, help="MQTT Broker port")
    parser.add_argument("--farm-id", default="farm_01", help="Target Farm ID")
    parser.add_argument("--interval", type=int, default=3, help="Sampling interval in seconds")
    parser.add_argument("--dry-run", action="store_true", help="Run 3 iterations without publishing to broker")
    args = parser.parse_args()

    run_simulator(
        broker=args.broker,
        port=args.port,
        farm_id=args.farm_id,
        interval=args.interval,
        dry_run=args.dry_run
    )
