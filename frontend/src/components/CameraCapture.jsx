import React, { useRef, useState, useCallback } from 'react';
import { Camera, RefreshCw, X } from 'lucide-react';
import { Button, Modal } from 'react-bootstrap';

const CameraCapture = ({ onCapture, onClose }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);

  const startCamera = async () => {
    try {
      const constraints = {
        video: { facingMode: 'environment' } // Prefer back camera on mobile
      };
      const newStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(newStream);
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
      }
    } catch (err) {
      setError('Could not access camera. Please check permissions.');
      console.error('Camera access error:', err);
    }
  };

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  }, [stream]);

  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      canvas.toBlob((blob) => {
        const file = new File([blob], 'captured_plant.jpg', { type: 'image/jpeg' });
        onCapture(file);
        stopCamera();
        onClose();
      }, 'image/jpeg');
    }
  };

  React.useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, []);

  return (
    <Modal show onHide={onClose} centered size="lg">
      <Modal.Header closeButton className="border-0">
        <Modal.Title className="fw-bold">Capture Plant Image</Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-0 bg-dark overflow-hidden position-relative" style={{ minHeight: '400px' }}>
        {error ? (
          <div className="text-white p-4 text-center">
            <p>{error}</p>
            <Button variant="outline-light" onClick={startCamera}>Retry</Button>
          </div>
        ) : (
          <>
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              className="w-100 h-100 object-fit-contain"
              style={{ maxHeight: '70vh' }}
            />
            <div className="position-absolute bottom-0 start-0 end-0 p-4 d-flex justify-content-center gap-3">
              <Button 
                variant="light" 
                className="rounded-circle p-3 shadow" 
                onClick={capturePhoto}
              >
                <Camera size={32} />
              </Button>
              <Button 
                variant="outline-light" 
                className="rounded-circle p-3" 
                onClick={startCamera}
              >
                <RefreshCw size={24} />
              </Button>
            </div>
          </>
        )}
        <canvas ref={canvasRef} className="d-none" />
      </Modal.Body>
    </Modal>
  );
};

export default CameraCapture;
