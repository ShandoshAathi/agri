import React from 'react';
import { Loader2 } from 'lucide-react';

export const SpinnerLoader = ({ text = "Loading..." }) => {
  return (
    <div className="flex items-center justify-center space-x-2 text-xs text-slate-400 p-4">
      <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
      <span>{text}</span>
    </div>
  );
};
