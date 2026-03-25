const SensorData = require('../models/SensorData');

exports.getLatestSensorData = async (req, res) => {
    try {
        const data = await SensorData.findOne().sort({ timestamp: -1 });
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getHistoricalData = async (req, res) => {
    try {
        const data = await SensorData.find().sort({ timestamp: 1 }).limit(50);
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getIrrigationStatus = async (req, res) => {
    try {
        const threshold = req.query.threshold || 25; // Default moisture threshold
        const data = await SensorData.findOne().sort({ timestamp: -1 });
        
        if (!data) {
            return res.json({ status: 'Calculating...', recommendation: 'Waiting for data' });
        }

        const isLow = data.soilMoisture < threshold;
        res.json({
            soilMoisture: data.soilMoisture,
            threshold: parseInt(threshold),
            status: isLow ? 'Irrigation Required' : 'No Irrigation Needed',
            recommendation: isLow ? 'Alert: Moisture levels are low. Please start irrigation.' : 'Moisture levels are sufficient.'
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

exports.detectCropDisease = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No image file provided' });
        }

        const imagePath = req.file.path;
        
        // Prepare form data for Flask API
        const form = new FormData();
        form.append('image', fs.createReadStream(imagePath));

        // Call Flask AI API
        const response = await axios.post('http://localhost:5001/predict', form, {
            headers: {
                ...form.getHeaders()
            }
        });

        // Delete uploaded file after processing
        fs.unlink(imagePath, (err) => {
            if (err) console.error('Error deleting file:', err);
        });

        res.json(response.data);

    } catch (err) {
        console.error('AI API Error:', err.message);
        res.status(500).json({ 
            message: 'AI service unavailable or error occurred',
            error: err.message 
        });
    }
};
