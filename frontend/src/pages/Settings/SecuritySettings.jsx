import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const SecuritySettings = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
        <ShieldCheck className="w-5 h-5 text-emerald-400" />
        <h3 className="text-base font-bold text-slate-100">Account Security</h3>
      </div>

      <div className="space-y-3 text-xs">
        <div className="flex items-center justify-between p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
          <span className="font-semibold text-slate-200">Two-Factor Authentication (2FA)</span>
          <span className="text-emerald-400 font-bold">Enabled</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
          <span className="font-semibold text-slate-200">JWT Token Expiry</span>
          <span className="text-slate-400">24 Hours</span>
        </div>
      </div>
    </div>
  );
};
