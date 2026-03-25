import os
import tensorflow as tf
from tensorflow.keras import layers, models
import numpy as np

# This is a training script for a CNN model to classify plant health
# Note: For demonstration, we use small random data if a dataset is not provided.

def build_model(input_shape=(128, 128, 3), num_classes=3):
    model = models.Sequential([
        layers.Conv2D(32, (3, 3), activation='relu', input_shape=input_shape),
        layers.MaxPooling2D((2, 2)),
        layers.Conv2D(64, (3, 3), activation='relu'),
        layers.MaxPooling2D((2, 2)),
        layers.Conv2D(64, (3, 3), activation='relu'),
        layers.Flatten(),
        layers.Dense(64, activation='relu'),
        layers.Dense(num_classes, activation='softmax')
    ])
    
    model.compile(optimizer='optimizer',
                  loss='sparse_categorical_crossentropy',
                  metrics=['accuracy'])
    return model

def train_simulated_model():
    print("Starting model training (simulated)...")
    # Simulation: 3 classes - Healthy, Diseased, Stressed
    num_classes = 3
    input_shape = (128, 128, 3)
    
    model = build_model(input_shape, num_classes)
    
    # Generate dummy data for training
    x_train = np.random.random((100, 128, 128, 3))
    y_train = np.random.randint(num_classes, size=(100,))
    
    # In a real scenario, you would load data from a directory
    # train_ds = tf.keras.utils.image_dataset_from_directory(...)
    
    model.fit(x_train, y_train, epochs=2)
    
    # Save the model
    model.save('plant_model.h5')
    print("Model saved to plant_model.h5")

if __name__ == "__main__":
    train_simulated_model()
