# Dataset Loader for Crop Recommendation

import os
import csv

DATASET_PATH = os.path.join(os.path.dirname(__file__), "sample_crop_data.csv")

def load_crop_dataset(filepath: str = DATASET_PATH):
    """Loads sample crop dataset into feature matrix X and targets y."""
    X = []
    y = []
    with open(filepath, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        for row in reader:
            features = [
                float(row["N"]),
                float(row["P"]),
                float(row["K"]),
                float(row["temperature"]),
                float(row["humidity"]),
                float(row["ph"]),
                float(row["rainfall"]),
            ]
            X.append(features)
            y.append(row["label"])
    return X, y

if __name__ == "__main__":
    X, y = load_crop_dataset()
    print(f"Loaded {len(X)} records with features: {len(X[0])}")
