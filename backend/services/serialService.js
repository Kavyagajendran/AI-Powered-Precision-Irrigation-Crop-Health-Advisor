const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const SensorData = require('../models/SensorData');

const startSerial = () => {
    // List of common serial ports for Arduino (Windows/Linux/Mac)
    // In a real environment, the user might need to specify the port
    const portPath = 'COM3'; // Example for Windows

    try {
        const port = new SerialPort({
            path: portPath,
            baudRate: 9600,
            autoOpen: false
        });

        const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

        port.open((err) => {
            if (err) {
                console.warn(`Could not open serial port ${portPath}: ${err.message}. Running in simulation mode.`);
                return;
            }
            console.log(`Connected to Arduino on port ${portPath}`);
        });

        parser.on('data', async (data) => {
            console.log('Received serial data:', data);
            const [moisture, temp, humidity, pump] = data.split(',');

            if (moisture && temp && humidity) {
                const newData = new SensorData({
                    soilMoisture: parseInt(moisture),
                    temperature: parseFloat(temp),
                    humidity: parseFloat(humidity),
                    pumpStatus: pump === '1'
                });
                await newData.save();
                console.log('Saved data from serial');
            }
        });

        port.on('error', (err) => {
            console.error('Serial Port Error:', err.message);
        });

    } catch (err) {
        console.warn('SerialPort not available or error occurred. Please ensure Arduino is connected.');
    }
};

module.exports = { startSerial };
