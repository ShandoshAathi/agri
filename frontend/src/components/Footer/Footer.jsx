import React from 'react';
import { Sprout } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950 py-6 px-6 text-center text-xs text-slate-500">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Sprout className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold text-slate-400">AgriSense AI Platform v1.0</span>
        </div>
        <span>© 2026 AgriSense Precision Farming. All rights reserved.</span>
      </div>
    </footer>
  );
};
