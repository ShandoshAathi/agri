# Label Encoder for Crop Categories

class CropLabelEncoder:
    def __init__(self):
        self.classes_ = []
        self.class_to_idx = {}
        self.idx_to_class = {}

    def fit(self, labels):
        unique_labels = sorted(list(set(labels)))
        self.classes_ = unique_labels
        self.class_to_idx = {label: i for i, label in enumerate(unique_labels)}
        self.idx_to_class = {i: label for i, label in enumerate(unique_labels)}
        return self

    def transform(self, labels):
        return [self.class_to_idx[l] for l in labels]

    def inverse_transform(self, indices):
        return [self.idx_to_class[i] for i in indices]
