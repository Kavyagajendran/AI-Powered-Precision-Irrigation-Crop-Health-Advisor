import React from 'react';
import { Card } from 'react-bootstrap';

const SensorCard = ({ title, value, unit, icon: Icon, variant }) => {
  return (
    <Card className="border-0 shadow-sm h-100">
      <Card.Body className="d-flex align-items-center p-4">
        <div className={`p-3 rounded-circle bg-light border border-${variant} me-4 text-${variant}`}>
          <Icon size={32} />
        </div>
        <div>
          <p className="text-secondary text-uppercase small fw-bold mb-1 tracking-wider">{title}</p>
          <div className="d-flex align-items-baseline">
            <h3 className="h2 fw-bold mb-0 me-1">{value}</h3>
            <span className="text-muted">{unit}</span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SensorCard;
