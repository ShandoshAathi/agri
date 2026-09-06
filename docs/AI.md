# AgriSense AI - Artificial Intelligence Engines

AgriSense AI incorporates two machine learning engines: an agricultural Crop Recommendation engine and a Computer Vision Leaf Disease Diagnostic engine.

---

## 1. Crop Recommendation Engine

- **Architecture**: Decision Tree / Random Forest Classifier.
- **Inputs**: Soil Nitrogen (N), Phosphorus (P), Potassium (K), Soil pH, Soil Moisture, Ambient Temperature, Humidity, and Seasonal Rainfall.
- **Output**: Ranked list of recommended crops, confidence score (%), expected yield per acre, water requirements, and tailored cultivation tips.
- **Directory**: `ai-models/CropRecommendation/`

### Feature Preprocessing
- `scaler.py`: Z-score normalization for continuous environmental variables.
- `encoder.py`: Label encoding for categorical crop types.

---

## 2. Disease Diagnosis Vision Engine

- **Architecture**: Convolutional Neural Network (CNN).
- **Inputs**: High-resolution leaf photograph byte stream (JPEG, PNG, WebP).
- **Output**: Identified plant pathogen, infection severity percentage rating, chemical treatment recommendations, and prevention guidance.
- **Directory**: `ai-models/DiseaseDiagnosis/`

### Image Preprocessing
- `image_transforms.py`: Resizing input images to 224x224 RGB tensors with float32 normalization `[0.0, 1.0]`.
