const fs = require('fs');
const path = require('path');

console.log('Starting server.js diagnostic load...');
let express, mongoose, cors, MongoMemoryServer, apiRoutes, startSimulator, startSerial;

try {
    express = require('express');
    console.log('✅ express loaded');
    mongoose = require('mongoose');
    console.log('✅ mongoose loaded');
    cors = require('cors');
    console.log('✅ cors loaded');
    const mms = require('mongodb-memory-server');
    MongoMemoryServer = mms.MongoMemoryServer;
    console.log('✅ mongodb-memory-server loaded');
    apiRoutes = require('./routes/api');
    console.log('✅ apiRoutes loaded');
    const ss = require('./services/sensorSimulator');
    startSimulator = ss.startSimulator;
    console.log('✅ sensorSimulator loaded');
    const ser = require('./services/serialService');
    startSerial = ser.startSerial;
    console.log('✅ serialService loaded');
} catch (err) {
    console.error('❌ REQUIRE FAILED:', err.message);
    process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ensure uploads directory exists
if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads');
}

// MongoDB Connection (Using In-Memory Server)
const connectDB = async () => {
    try {
        const mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        await mongoose.connect(mongoUri);
        console.log('MongoDB Memory Server connected:', mongoUri);
        
        // Start Sensor Simulator or Serial reader
        startSimulator();
        startSerial();
    } catch (err) {
        console.error('MongoDB Connection Error:', err);
        process.exit(1);
    }
};

connectDB();

// Routes
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
    res.send('Smart Agriculture API is running...');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
