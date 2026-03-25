import React from 'react';
import { Card, Form, Alert } from 'react-bootstrap';
import { Droplets, AlertCircle, CheckCircle2 } from 'lucide-react';

const IrrigationConfig = ({ threshold, setThreshold, status }) => {
  const isRequired = status?.status === 'Irrigation Required';

  return (
    <Card className="border-0 shadow-sm">
      <Card.Header className="bg-white border-bottom py-3 d-flex align-items-center justify-content-between">
        <h5 className="mb-0 fw-bold">Irrigation Logic</h5>
        <Droplets className={isRequired ? 'text-danger' : 'text-success'} size={20} />
      </Card.Header>
      <Card.Body>
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <Form.Label className="small text-muted mb-0 fw-bold text-uppercase">Moisture Threshold</Form.Label>
            <span className="h5 fw-bold text-primary mb-0">{threshold}%</span>
          </div>
          <Form.Range 
            min="0" 
            max="100" 
            value={threshold} 
            onChange={(e) => setThreshold(e.target.value)}
          />
        </div>

        <Alert variant={isRequired ? 'danger' : 'success'} className="border-0 shadow-sm d-flex align-items-start">
          {isRequired ? (
            <AlertCircle className="me-2 flex-shrink-0" size={18} />
          ) : (
            <CheckCircle2 className="me-2 flex-shrink-0" size={18} />
          )}
          <div>
            <div className="fw-bold small text-uppercase mb-1">{status?.status || 'Analyzing...'}</div>
            <p className="small mb-0 opacity-75">
              {status?.recommendation || 'Synthesis in progress...'}
            </p>
          </div>
        </Alert>
      </Card.Body>
    </Card>
  );
};

export default IrrigationConfig;
