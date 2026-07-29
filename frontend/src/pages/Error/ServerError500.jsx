import React from 'react';
import { ServerCrash, RefreshCw } from 'lucide-react';

export const ServerError500 = ({ onRetry }) => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
      <ServerCrash className="w-16 h-16 text-amber-500" />
      <h2 className="text-3xl font-extrabold text-slate-100">500 - Gateway Error</h2>
      <p className="text-sm text-slate-400 max-w-md">An unexpected error occurred while communicating with the FastAPI backend server.</p>
      {onRetry && (
        <button onClick={onRetry} className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center space-x-2">
          <RefreshCw className="w-4 h-4" />
          <span>Retry Connection</span>
        </button>
      )}
    </div>
  );
};
