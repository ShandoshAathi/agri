import React from 'react';

export const GlassCard = ({ children, className = "" }) => {
  return (
    <div className={`glass-card p-5 rounded-2xl ${className}`}>
      {children}
    </div>
  );
};
