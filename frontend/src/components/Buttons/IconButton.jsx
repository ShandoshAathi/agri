import React from 'react';

export const IconButton = ({ icon: Icon, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white rounded-xl transition-all ${className}`}
    >
      {Icon && <Icon className="w-4 h-4" />}
    </button>
  );
};
