import React from 'react';
import TechStackGraph from './TechStackGraph';
import './Analytics.css';

const Analytics = () => {
  return (
    <div>
      <div className="analyticsHeader">
        <h1>Analytics</h1>
      </div>
      <div className="analytics">
        <TechStackGraph />
      </div>
    </div>
  );
};

export default Analytics;
