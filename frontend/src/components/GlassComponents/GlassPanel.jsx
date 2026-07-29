import React from 'react';

export const GlassPanel = ({ children, className = "" }) => {
  return (
    <div className={`glass-panel p-6 rounded-2xl ${className}`}>
      {children}
    </div>
  );
};
