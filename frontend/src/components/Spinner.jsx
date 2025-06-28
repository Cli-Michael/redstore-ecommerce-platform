import React from 'react';

const Spinner = () => {
  return (
    <div style={spinnerStyle}>
      <div style={spinnerAnimation}>
        <div style={circleStyle}></div>
      </div>
      <p>Loading...</p>
    </div>
  );
};

const spinnerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  fontSize: '20px',
  fontWeight: 'bold',
  marginTop: '100px',
};

const spinnerAnimation = {
  border: '6px solid #f3f3f3',
  borderTop: '6px solid #3498db',
  borderRadius: '50%',
  width: '50px',
  height: '50px',
  animation: 'spin 2s linear infinite',
};

const circleStyle = {
  width: '50px',
  height: '50px',
  borderRadius: '50%',
  border: '5px solid #ddd',
  borderTop: '5px solid #3498db',
  animation: 'spin 1s linear infinite',
};

export default Spinner;
