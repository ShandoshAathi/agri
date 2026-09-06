# Feature Scaler for Crop Telemetry Features

class CropFeatureScaler:
    def __init__(self):
        self.means = []
        self.stds = []

    def fit(self, X):
        num_features = len(X[0])
        self.means = [sum(row[i] for row in X) / len(X) for i in range(num_features)]
        self.stds = [
            (sum((row[i] - self.means[i]) ** 2 for row in X) / len(X)) ** 0.5 or 1.0
            for i in range(num_features)
        ]
        return self

    def transform(self, X):
        return [
            [(row[i] - self.means[i]) / self.stds[i] for i in range(len(row))]
            for row in X
        ]
