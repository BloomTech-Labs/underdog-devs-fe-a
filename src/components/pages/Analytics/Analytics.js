import React from 'react';
import Graph from './Graph';
import './Analytics.css';

const Analytics = () => {
  return (
    <div>
      <div>
        <h1>Analytics</h1>
      </div>
      <div className="analytics">
        <Graph />
      </div>
    </div>
  );
};

export default Analytics;
