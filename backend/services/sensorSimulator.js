const SensorData = require('../models/SensorData');

const simulateData = async () => {
    try {
        const soilMoisture = Math.floor(Math.random() * (80 - 10 + 1)) + 10; // 10% to 80%
        const temperature = Math.floor(Math.random() * (40 - 15 + 1)) + 15; // 15C to 40C
        const humidity = Math.floor(Math.random() * (90 - 30 + 1)) + 30; // 30% to 90%

        const newData = new SensorData({
            soilMoisture,
            temperature,
            humidity
        });

        await newData.save();
        // Keep only last 100 records to prevent memory bloat in the simulator
        const count = await SensorData.countDocuments();
        if (count > 100) {
            const oldest = await SensorData.findOne().sort({ timestamp: 1 });
            await SensorData.findByIdAndDelete(oldest._id);
        }
    } catch (err) {
        console.error('Sensor Simulation Error:', err);
    }
};

const startSimulator = (interval = 5000) => {
    console.log('Starting sensor simulator...');
    setInterval(simulateData, interval);
};

module.exports = { startSimulator };
