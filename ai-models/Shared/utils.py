# AgriSense AI Shared Utilities

import io
import logging
from PIL import Image

logging.basicConfig(level=logging.INFO, format="[%(asctime)s] %(levelname)s - %(name)s: %(message)s")
logger = logging.getLogger("AgriSense-AI")

def load_image_bytes(image_bytes: bytes) -> Image.Image:
    """Helper to convert raw image bytes into a PIL Image."""
    try:
        image = Image.open(io.BytesIO(image_bytes))
        return image.convert("RGB")
    except Exception as e:
        logger.error(f"Failed to decode image bytes: {e}")
        raise ValueError("Invalid image file provided.")

def validate_soil_telemetry(ph: float, moisture: float, temp: float, humidity: float):
    """Validates telemetry bounds."""
    if not (0.0 <= ph <= 14.0):
        raise ValueError("pH must be between 0.0 and 14.0")
    if not (0.0 <= moisture <= 100.0):
        raise ValueError("Moisture percentage must be between 0 and 100")
    return True
