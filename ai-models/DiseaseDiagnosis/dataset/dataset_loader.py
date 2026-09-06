# Dataset Loader for Leaf Disease Pathogens

import os
import json

LABELS_PATH = os.path.join(os.path.dirname(__file__), "labels.json")

def load_disease_labels(filepath: str = LABELS_PATH):
    """Loads disease labels mapping."""
    with open(filepath, "r", encoding="utf-8") as f:
        return json.load(f)

if __name__ == "__main__":
    labels = load_disease_labels()
    print(f"Loaded {len(labels)} disease classes.")
