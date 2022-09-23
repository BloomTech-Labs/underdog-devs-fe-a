import React from 'react';
import TechStackGraph from './TechStackGraph';
import './Analytics.css';

const Analytics = () => {
  return (
    <>
      <div className="analyticsHeader">
        <h1>Analytics</h1>
      </div>
      <div className="analytics">
        <TechStackGraph />
      </div>
    </>
  );
};

export default Analytics;
