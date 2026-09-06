# Inference Engine for Disease Diagnosis

from Shared.utils import load_image_bytes
from DiseaseDiagnosis.dataset.dataset_loader import load_disease_labels
from DiseaseDiagnosis.preprocessing.image_transforms import preprocess_leaf_image
from DiseaseDiagnosis.cnn.model_architecture import LeafDiseaseCNN

class DiseaseDiagnosticEngine:
    def __init__(self):
        self.cnn = LeafDiseaseCNN()
        self.labels = load_disease_labels()

    def diagnose(self, image_bytes: bytes, filename: str = ""):
        image = load_image_bytes(image_bytes)
        input_tensor = preprocess_leaf_image(image)
        class_idx = self.cnn.forward(input_tensor, filename=filename)
        
        info = self.labels.get(str(class_idx), self.labels["2"])
        return {
            "disease": info["name"],
            "severity": info["severity"],
            "treatment": info["treatment"],
            "prevention": info["prevention"]
        }

disease_diagnostic_engine = DiseaseDiagnosticEngine()
