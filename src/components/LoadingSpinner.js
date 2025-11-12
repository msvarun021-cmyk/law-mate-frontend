import React from 'react';
import './LoadingSpinner.css'; // We will create this next

const LoadingSpinner = ({ large = false }) => {
  return (
    <div className={`spinner-container ${large ? 'large' : ''}`}>
      <div className="loading-spinner"></div>
    </div>
  );
};

export default LoadingSpinner;