# AgriSense AI Shared Configurations

import os

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

CROP_RECOMMENDATION_DIR = os.path.join(BASE_DIR, "CropRecommendation")
DISEASE_DIAGNOSIS_DIR = os.path.join(BASE_DIR, "DiseaseDiagnosis")

CROP_MODEL_PATH = os.path.join(CROP_RECOMMENDATION_DIR, "models", "crop_model.pkl")
DISEASE_MODEL_PATH = os.path.join(DISEASE_DIAGNOSIS_DIR, "models", "disease_cnn.pkl")

DEFAULT_IMAGE_SIZE = (224, 224)
SUPPORTED_IMAGE_FORMATS = [".jpg", ".jpeg", ".png", ".webp"]
