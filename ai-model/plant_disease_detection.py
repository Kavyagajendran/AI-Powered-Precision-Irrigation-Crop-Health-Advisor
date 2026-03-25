import sys
import json
import random

def detect_disease(image_path):
    # This is a stub for the AI model
    # In a real scenario, you would use TensorFlow/PyTorch here
    
    conditions = [
        {"status": "Healthy", "confidence": "98.5%", "suggestion": "Your plant is thriving. Continue current care."},
        {"status": "Diseased (Powdery Mildew)", "confidence": "94.2%", "suggestion": "Apply organic fungicide or neem oil. Avoid overhead watering."},
        {"status": "Stressed (Dehydration)", "confidence": "88.9%", "suggestion": "Increase irrigation frequency. Check soil drainage."},
        {"status": "Diseased (Blight)", "confidence": "91.0%", "suggestion": "Remove infected parts immediately. Apply balanced fertilizer to boost immunity."}
    ]
    
    # Simulate processing time
    # import time; time.sleep(1)
    
    result = random.choice(conditions)
    return result

if __name__ == "__main__":
    if len(sys.argv) > 1:
        image_path = sys.argv[1]
        prediction = detect_disease(image_path)
        print(json.dumps(prediction))
    else:
        print(json.dumps({"error": "No image path provided"}))
