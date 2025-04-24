import React from 'react';

const HealthCheck = () => {
  return (
    <div className="health-check">
      <h2>Health Check</h2>
      <p>Status: OK</p>
      <p>Timestamp: {new Date().toISOString()}</p>
    </div>
  );
};

export default HealthCheck;
