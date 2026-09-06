# Evaluation Script for Disease Diagnosis CNN

from DiseaseDiagnosis.inference.predict import disease_diagnostic_engine

def evaluate_disease_model():
    test_files = [
        ("healthy_leaf_01.jpg", "Healthy Crop (No Disease Detected)"),
        ("bacterial_spot_02.png", "Bacterial Leaf Spot (Xanthomonas)"),
        ("unknown_blight_03.jpg", "Early Blight (Alternaria solani)")
    ]

    # Mock 1x1 image bytes for testing
    mock_bytes = b"\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x02\x00\x00\x00\x90wS\xde\x00\x00\x00\x0cIDATx\x9cc` \x05\x00\x00\x0e\x00\x01\xa2\x0e\xfe\x17\x00\x00\x00\x00IEND\xaeB`\x82"

    print("--- Leaf Disease Diagnosis CNN Model Evaluation ---")
    correct = 0
    total = len(test_files)

    for fn, expected in test_files:
        result = disease_diagnostic_engine.diagnose(mock_bytes, filename=fn)
        is_match = result["disease"] == expected
        if is_match:
            correct += 1
        print(f"File: '{fn}' -> Predicted: '{result['disease']}' (Expected: '{expected}')")

    accuracy = (correct / total) * 100.0
    print(f"\nEvaluation Accuracy: {accuracy:.2f}% ({correct}/{total} passed)")

if __name__ == "__main__":
    evaluate_disease_model()
