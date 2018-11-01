import React from 'react';
import { Link } from 'react-router-dom';

function ChartNotFound() {
  return (
    <div className="chart-not-found">
      <h3>Chart not found.</h3>
      <Link to="/lists">Go to charts.</Link>
    </div>
  );
}

export default ChartNotFound;
