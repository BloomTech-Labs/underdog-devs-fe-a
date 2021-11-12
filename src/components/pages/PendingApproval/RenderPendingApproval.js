import React from 'react';
import { Link } from 'react-router-dom';

const RenderPendingApproval = props => (
  <div>
    <p>
      <Link to="/">Home</Link>
    </p>
    <p>
      <Link to="/admindashboard">Back to dashboard</Link>
    </p>
  </div>
);

export default RenderPendingApproval;
