import React from 'react';
import { AlertCircle, ArrowLeft } from 'lucide-react';

export const NotFound404 = ({ onGoHome }) => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
      <AlertCircle className="w-16 h-16 text-rose-500 animate-bounce" />
      <h2 className="text-3xl font-extrabold text-slate-100">404 - Page Not Found</h2>
      <p className="text-sm text-slate-400 max-w-md">The telemetry view or plot specification you are looking for does not exist.</p>
      {onGoHome && (
        <button onClick={onGoHome} className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center space-x-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Dashboard</span>
        </button>
      )}
    </div>
  );
};
