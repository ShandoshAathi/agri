import React from 'react';
import { Bell, AlertTriangle, CheckCircle, Info } from 'lucide-react';

export const NotificationList = () => {
  const alerts = [
    { type: 'warning', title: 'Low Soil Moisture Alert', msg: 'Block A moisture dropped below 35%. Auto-irrigation triggered.', time: '10 mins ago' },
    { type: 'success', title: 'Irrigation Cycle Complete', msg: 'Plot 2 drip irrigation completed (450 Liters delivered).', time: '1 hour ago' },
    { type: 'info', title: 'AI Model Scan Complete', msg: 'Leaf scan classified as Early Blight. Copper spray advised.', time: '3 hours ago' },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
      <div className="flex items-center space-x-2 border-b border-slate-800 pb-3">
        <Bell className="w-5 h-5 text-emerald-400" />
        <h3 className="text-base font-bold text-slate-100">System Notification Feed</h3>
      </div>

      <div className="space-y-3">
        {alerts.map((a, idx) => (
          <div key={idx} className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl flex items-start space-x-3 text-xs">
            {a.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />}
            {a.type === 'success' && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />}
            {a.type === 'info' && <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />}
            <div className="flex-1 space-y-0.5">
              <div className="font-bold text-slate-200">{a.title}</div>
              <div className="text-slate-400">{a.msg}</div>
            </div>
            <span className="text-slate-500 text-[10px]">{a.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
