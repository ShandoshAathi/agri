import React from 'react';
import { Settings } from 'lucide-react';

export const NotificationSettings = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
        <Settings className="w-5 h-5 text-emerald-400" />
        <h3 className="text-base font-bold text-slate-100">Alert Preferences</h3>
      </div>

      <div className="space-y-3 text-xs">
        <div className="flex items-center justify-between p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
          <span className="font-semibold text-slate-200">Push Notifications for Pump Triggers</span>
          <input type="checkbox" defaultChecked className="accent-emerald-500 w-4 h-4" />
        </div>
        <div className="flex items-center justify-between p-3 bg-slate-950/60 border border-slate-800 rounded-xl">
          <span className="font-semibold text-slate-200">Email Summaries for AI Disease Scans</span>
          <input type="checkbox" defaultChecked className="accent-emerald-500 w-4 h-4" />
        </div>
      </div>
    </div>
  );
};
