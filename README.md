# AI-Powered Precision Irrigation & Crop Health Advisor

A complete full-stack smart agriculture system integrating Arduino hardware, MERN stack web application, and AI-based crop disease detection.

## 🚀 Features

- **Real-time Farm Monitoring**: Live dashboard showing soil moisture, temperature, and humidity.
- **Smart Irrigation**: Automated pump control based on soil moisture thresholds.
- **AI Crop Health Advisor**: Image-based disease detection using CNN models (via Flask API).
- **Interactive Analytics**: Historical trend charts for environmental data.
- **Alert System**: Immediate notifications for critical soil conditions.

## 📂 Project Structure

- `hardware/`: Arduino `.ino` file for sensor integration and pump control.
- `backend/`: Node.js Express server with MongoDB integration.
- `frontend/`: React-based dashboard with premium UI.
- `ai-model/`: Python scripts for model training and Flask API for predictions.

## 🛠️ Setup Instructions

### 1. Hardware Setup (Arduino Uno)
- **Soil Moisture Sensor**: Connect to A0.
- **DHT11 (Temp/Humidity)**: Connect to Pin 2.
- **Relay Module**: Connect to Pin 8.
- **Water Pump**: Connect to Relay (COM/NO).
- **Upload**: Open `hardware/arduino_code.ino` in Arduino IDE and upload to your board.

### 2. AI Model & Flask API
1. Navigate to `ai-model/`.
2. Install dependencies: `pip install flask tensorflow opencv-python numpy werkzeug`.
3. (Optional) Run `python train_model.py` to generate the initial model.
4. Start the Flask API: `python flask_api.py` (Runs on port 5001).

### 3. Backend (Node.js)
1. Navigate to `backend/`.
2. Install dependencies: `npm install`.
3. Start the server: `npm start` (Runs on port 5000).
   - Note: Uses `mongodb-memory-server` for easy testing; update `server.js` with your MongoDB URI for production.

### 4. Frontend (React)
1. Navigate to `frontend/`.
2. Install dependencies: `npm install`.
3. Start the application: `npm run dev`.
4. Open `http://localhost:5173` in your browser.

## 📱 How to Use
1. **Dashboard**: View live sensor telemetry from your Arduino (or simulation).
2. **Irrigation**: Set your moisture threshold; the pump will activate automatically.
3. **Crop Health**: Click "Take Photo" or "Upload" to analyze a plant leaf. The AI will provide a status, confidence score, and care suggestion.

## 📝 License
MIT License
