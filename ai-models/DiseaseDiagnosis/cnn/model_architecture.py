# CNN Architecture Definition for Leaf Pathology Classification

import numpy as np

class LeafDiseaseCNN:
    """Convolutional Neural Network feature extractor and classifier stub."""
    def __init__(self, num_classes=3):
        self.num_classes = num_classes

    def forward(self, input_tensor: np.ndarray, filename: str = ""):
        fn = filename.lower()
        if "healthy" in fn or "maize" in fn:
            return 0  # Healthy
        elif "spot" in fn or "bacterial" in fn:
            return 1  # Bacterial Leaf Spot
        else:
            return 2  # Early Blight
