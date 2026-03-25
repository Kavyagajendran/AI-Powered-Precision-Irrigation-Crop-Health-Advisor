import React, { useState } from 'react';
import axios from 'axios';
import { Upload, Microscope, CheckCircle2, AlertTriangle, ShieldAlert, Camera as CameraIcon } from 'lucide-react';
import { Card, Button, Spinner, Row, Col, Badge } from 'react-bootstrap';
import CameraCapture from './CameraCapture';

const DiseaseDetection = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [showCamera, setShowCamera] = useState(false);

  const processImage = async (selectedFile) => {
    if (!selectedFile) return;

    setFile(URL.createObjectURL(selectedFile));
    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const res = await axios.post('http://localhost:5000/api/upload-crop-image', formData);
      setResult(res.data);
    } catch (err) {
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = (e) => {
    processImage(e.target.files[0]);
  };

  return (
    <Card className="border-0 shadow-sm">
      <Card.Header className="bg-white border-bottom py-3">
        <div className="d-flex align-items-center justify-content-between">
          <h5 className="mb-0 fw-bold">Crop Health AI</h5>
          <Microscope className="text-primary" size={20} />
        </div>
      </Card.Header>
      <Card.Body>
        <div className="d-flex gap-2 mb-3">
          <Button 
            variant="primary" 
            className="flex-grow-1 d-flex align-items-center justify-content-center gap-2"
            onClick={() => setShowCamera(true)}
          >
            <CameraIcon size={18} /> Take Photo
          </Button>
          <Button 
            variant="outline-primary" 
            className="flex-grow-1 d-flex align-items-center justify-content-center gap-2"
            onClick={() => document.getElementById('leaf-upload').click()}
          >
            <Upload size={18} /> Upload
          </Button>
        </div>

        <div 
          className="border border-2 border-dashed rounded-3 p-4 mb-4 text-center bg-light position-relative overflow-hidden"
          style={{ height: '180px' }}
        >
          {file ? (
            <img src={file} alt="Preview" className="w-100 h-100 object-fit-cover position-absolute top-0 start-0" />
          ) : (
            <div className="d-flex flex-column align-items-center justify-content-center h-100">
              <Microscope className="text-muted mb-2" size={32} />
              <p className="small text-muted mb-0">Plant image preview</p>
            </div>
          )}
          <input 
            id="leaf-upload" 
            type="file" 
            className="d-none" 
            accept="image/*" 
            onChange={handleUpload}
          />
        </div>

        {showCamera && (
          <CameraCapture 
            onCapture={processImage} 
            onClose={() => setShowCamera(false)} 
          />
        )}

        {loading ? (
          <div className="text-center py-3">
            <Spinner animation="border" variant="primary" size="sm" className="mb-2" />
            <p className="small text-primary fw-bold mb-0">Analyzing Plant Health...</p>
          </div>
        ) : result ? (
          <div className="p-3 border rounded-3 bg-light">
            <div className="d-flex align-items-center mb-3">
               {result.status.includes('Healthy') ? (
                 <CheckCircle2 className="text-success me-2" size={24} />
               ) : result.status.includes('Stressed') ? (
                 <AlertTriangle className="text-warning me-2" size={24} />
               ) : (
                 <ShieldAlert className="text-danger me-2" size={24} />
               )}
               <h6 className="mb-0 fw-bold">{result.status}</h6>
            </div>
            
            <Row className="g-2">
              <Col xs={6}>
                <div className="small text-muted text-uppercase fw-bold mb-1">Confidence</div>
                <Badge bg="info" className="fs-6 px-3">{result.confidence}</Badge>
              </Col>
              <Col xs={12} className="mt-3">
                <div className="small text-muted text-uppercase fw-bold mb-1">Recommendation</div>
                <p className="small mb-0 text-dark" style={{ borderLeft: '3px solid #0d6efd', paddingLeft: '10px' }}>
                  {result.suggestion}
                </p>
              </Col>
            </Row>
          </div>
        ) : (
          <div className="text-center py-3">
            <p className="small text-muted fst-italic mb-0">No image analyzed yet.</p>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default DiseaseDetection;
