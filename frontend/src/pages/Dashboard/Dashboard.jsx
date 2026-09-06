import React from 'react';
import { Overview } from './Overview';

export const Dashboard = ({ setCurrentPage }) => {
  return (
    <div className="space-y-6 font-sans">
      <Overview setCurrentPage={setCurrentPage} />
    </div>
  );
};
