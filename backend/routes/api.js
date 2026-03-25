const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');
const multer = require('multer');
const path = require('path');

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

router.get('/sensor-data', apiController.getLatestSensorData);
router.get('/history', apiController.getHistoricalData);
router.get('/irrigation-status', apiController.getIrrigationStatus);
router.post('/upload-crop-image', upload.single('image'), apiController.detectCropDisease);

module.exports = router;
