const filesToCheck = [
    'express',
    'mongoose',
    'cors',
    'mongodb-memory-server',
    './routes/api',
    './services/sensorSimulator',
    './services/serialService',
    'fs',
    'path',
    'axios',
    'form-data',
    'multer',
    'serialport',
    '@serialport/parser-readline'
];

filesToCheck.forEach(file => {
    try {
        require(file);
        console.log(`✅ ${file} is accessible`);
    } catch (err) {
        console.log(`❌ ${file} FAILED: ${err.message}`);
    }
});
