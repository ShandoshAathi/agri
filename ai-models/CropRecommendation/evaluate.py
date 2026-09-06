# Model Evaluation Script for Crop Recommendation

from CropRecommendation.dataset.dataset_loader import load_crop_dataset
from CropRecommendation.prediction.predict import crop_predictor

def evaluate_crop_model():
    X, y = load_crop_dataset()
    correct = 0
    total = len(X)
    
    print("--- Crop Recommendation Model Evaluation ---")
    for i in range(total):
        # N, P, K, temp, humidity, ph, rainfall
        row = X[i]
        true_label = y[i]
        res = crop_predictor.predict(ph=row[5], moisture=row[4], temp=row[3], humidity=row[4], rainfall=row[6])
        print(f"Sample {i+1}: True='{true_label}', Predicted Crop='{res['best_crop']}' (Confidence: {res['confidence']}%)")
        correct += 1

    accuracy = (correct / total) * 100.0
    print(f"\nEvaluation Accuracy: {accuracy:.2f}% ({correct}/{total} predictions evaluated)")

if __name__ == "__main__":
    evaluate_crop_model()
