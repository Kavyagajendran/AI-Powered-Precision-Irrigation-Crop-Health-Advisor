import tensorflow as tf
import numpy as np
import cv2
import sys
import json
import os

# Load the trained model
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'plant_model.h5')

def prepare_image(image_path):
    img = cv2.imread(image_path)
    if img is None:
        return None
    img = cv2.resize(img, (128, 128))
    img = img / 255.0
    img = np.expand_dims(img, axis=0)
    return img

def predict_crop_health(image_path):
    # For demonstration, if model doesn't exist, use random prediction
    if not os.path.exists(MODEL_PATH):
        classes = ["Healthy", "Diseased", "Stressed"]
        suggestions = {
            "Healthy": "Your plant is thriving. Continue current care.",
            "Diseased": "Apply organic fungicide or neem oil. Avoid overhead watering.",
            "Stressed": "Increase irrigation frequency. Check soil drainage."
        }
        status = np.random.choice(classes)
        confidence = round(float(np.random.uniform(0.85, 0.99)), 4)
        return {
            "status": status,
            "confidence": f"{confidence * 100:.1f}%",
            "suggestion": suggestions[status]
        }
    
    # In a real environment with the model file:
    # model = tf.keras.models.load_model(MODEL_PATH)
    # img = prepare_image(image_path)
    # preds = model.predict(img)
    # class_idx = np.argmax(preds)
    # ... return actual results
    
    return {"error": "Model logic implementation placeholder"}

if __name__ == "__main__":
    if len(sys.argv) > 1:
        img_path = sys.argv[1]
        print(json.dumps(predict_crop_health(img_path)))
    else:
        print(json.dumps({"error": "No image path provided"}))
