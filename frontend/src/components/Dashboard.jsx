import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Thermometer, Droplets, Wind, AlertCircle, Cpu, Zap, Activity } from 'lucide-react';
import { Container, Row, Col, Navbar, Nav, Card, Badge, Alert } from 'react-bootstrap';
import SensorCard from './SensorCard';
import TrendChart from './TrendChart';
import IrrigationConfig from './IrrigationConfig';
import DiseaseDetection from './DiseaseDetection';

const Dashboard = () => {
  const [latestData, setLatestData] = useState(null);
  const [history, setHistory] = useState([]);
  const [irrigationStatus, setIrrigationStatus] = useState(null);
  const [threshold, setThreshold] = useState(30);

  const fetchData = async () => {
    try {
      const sensorRes = await axios.get('http://localhost:5000/api/sensor-data');
      setLatestData(sensorRes.data);

      const historyRes = await axios.get('http://localhost:5000/api/history');
      setHistory(historyRes.data);

      const irrigationRes = await axios.get(`http://localhost:5000/api/irrigation-status?threshold=${threshold}`);
      setIrrigationStatus(irrigationRes.data);
    } catch (err) {
      console.error('Data Fetch Error:', err);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [threshold]);

  return (
    <div className="bg-light min-vh-100 pb-5">
      {/* Premium Navbar */}
      <Navbar bg="white" expand="lg" className="mb-4 shadow-sm py-3 border-0">
        <Container>
          <Navbar.Brand href="#home" className="d-flex align-items-center fw-bold text-success fs-3">
            <Cpu className="me-2 text-primary" size={32} />
            Agri<span className="text-primary">Advisor</span> AI
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center gap-3">
              <div className="d-flex align-items-center text-muted small fw-medium">
                <Activity size={16} className="me-1 text-success" />
                System Healthy
              </div>
              <Badge bg="success" pill className="px-3 py-2 shadow-sm">
                <span className="d-inline-block rounded-circle bg-white me-2 pulse-dot" style={{width: '8px', height: '8px'}}></span>
                Live Feed
              </Badge>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        {/* Header Section */}
        <Row className="mb-4">
          <Col md={12}>
            <div className="p-4 bg-white rounded-4 shadow-sm border-0 mb-4 overflow-hidden position-relative">
              <div className="position-absolute top-0 end-0 p-5 mt-n5 me-n5 opacity-10">
                <Wind size={200} className="text-primary" />
              </div>
              <h1 className="fw-black text-dark mb-2">Smart Farm Dashboard</h1>
              <p className="text-muted fs-5 mb-0">Harnessing AI for precision irrigation and optimal crop yield.</p>
            </div>
          </Col>
        </Row>

        {/* Dynamic Alerts */}
        {latestData?.soilMoisture < threshold && (
          <Alert variant="danger" className="p-4 rounded-4 border-0 shadow-sm d-flex align-items-center mb-4 floating-alert">
            <div className="bg-danger text-white p-3 rounded-circle me-3 shadow">
              <AlertCircle size={32} />
            </div>
            <div>
              <h4 className="fw-bold mb-1">Critical: Moisture Depletion</h4>
              <p className="mb-0 fs-6">Soil moisture is at <strong>{latestData.soilMoisture}%</strong>. This is below your <strong>{threshold}%</strong> safety threshold. Irrigation recommended.</p>
            </div>
          </Alert>
        )}

        {/* Global Stats Grid */}
        <Row className="g-4 mb-4">
          <Col md={3}>
            <SensorCard 
              title="Soil Moisture" 
              value={latestData?.soilMoisture || '--'} 
              unit="%" 
              icon={Droplets} 
              variant="primary"
            />
          </Col>
          <Col md={3}>
            <SensorCard 
              title="Temperature" 
              value={latestData?.temperature || '--'} 
              unit="°C" 
              icon={Thermometer} 
              variant="warning"
            />
          </Col>
          <Col md={3}>
            <SensorCard 
              title="Humidity" 
              value={latestData?.humidity || '--'} 
              unit="%" 
              icon={Wind} 
              variant="info"
            />
          </Col>
          <Col md={3}>
            <Card className="border-0 shadow-sm h-100 rounded-4 overflow-hidden">
              <Card.Body className="d-flex align-items-center p-4">
                <div className={`p-3 rounded-4 me-3 shadow-sm ${latestData?.pumpStatus ? 'bg-success text-white' : 'bg-light text-muted'}`}>
                  <Zap size={32} className={latestData?.pumpStatus ? 'animate-pulse' : ''} />
                </div>
                <div>
                  <div className="small text-muted text-uppercase fw-bold ls-wide mb-1">Water Pump</div>
                  <h3 className="mb-0 fw-black text-dark">{latestData?.pumpStatus ? 'ACTIVE' : 'STANDBY'}</h3>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Analytics & Tools */}
        <Row className="g-4">
          <Col lg={8}>
            <Card className="border-0 shadow-sm mb-4 rounded-4 overflow-hidden">
              <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h5 className="fw-bold m-0 d-flex align-items-center">
                    <Activity className="me-2 text-primary" size={20} />
                    Environmental Analytics
                  </h5>
                </div>
                <TrendChart 
                  data={history} 
                  dataKey="soilMoisture" 
                  color="#0d6efd" 
                  title="Soil Moisture Analysis (%)" 
                  unit="%" 
                />
              </Card.Body>
            </Card>
            
            <Row className="g-4">
              <Col md={6}>
                <Card className="border-0 shadow-sm rounded-4 h-100">
                  <Card.Body className="p-4">
                    <TrendChart 
                      data={history} 
                      dataKey="temperature" 
                      color="#ffc107" 
                      title="Temp Dynamics (°C)" 
                      unit="°C" 
                    />
                  </Card.Body>
                </Card>
              </Col>
              <Col md={6}>
                <Card className="border-0 shadow-sm rounded-4 h-100">
                  <Card.Body className="p-4">
                    <TrendChart 
                      data={history} 
                      dataKey="humidity" 
                      color="#0dcaf0" 
                      title="Humidity Fluctuations (%)" 
                      unit="%" 
                    />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>

          <Col lg={4}>
            <div className="d-flex flex-column gap-4">
              <IrrigationConfig 
                threshold={threshold} 
                setThreshold={setThreshold} 
                status={irrigationStatus} 
              />
              <DiseaseDetection />
            </div>
          </Col>
        </Row>
      </Container>
      
      <style>{`
        .fw-black { font-weight: 900; }
        .ls-wide { letter-spacing: 0.05em; }
        .rounded-4 { border-radius: 1.25rem !important; }
        .pulse-dot { animation: pulse 2s infinite; }
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }
        .floating-alert { animation: slideIn 0.5s ease-out; }
        @keyframes slideIn {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
