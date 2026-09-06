import React from 'react';
import { useFarm } from '../context/FarmContext';
import { Bell, AlertTriangle, CheckCircle, Activity, Trash2 } from 'lucide-react';

export const Notifications = () => {
  const { notifications, markNotificationRead, clearAllNotifications } = useFarm();

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center space-x-2">
            <Bell className="w-6 h-6 text-emerald-400" />
            <span>Farm Notifications & Alert Center</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">Real-time alerts triggered by threshold anomalies, pump activities, and AI disease scans.</p>
        </div>

        <button
          onClick={clearAllNotifications}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 border border-slate-700 text-slate-300 hover:text-rose-400 transition-all flex items-center space-x-2 self-start sm:self-auto"
        >
          <Trash2 className="w-4 h-4" />
          <span>Clear All Alerts</span>
        </button>
      </div>

      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3">
        {notifications.length === 0 ? (
          <p className="text-xs text-slate-400 text-center py-8">All clear! No pending notifications or hardware alerts.</p>
        ) : (
          notifications.map(item => (
            <div
              key={item.id}
              onClick={() => markNotificationRead(item.id)}
              className={`p-4 rounded-2xl border text-xs cursor-pointer transition-all flex items-start justify-between ${
                item.read ? 'bg-slate-900/40 border-slate-800/80 opacity-60' : 'bg-slate-900/80 border-slate-700 text-slate-200'
              }`}
            >
              <div className="flex items-start space-x-3">
                {item.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />}
                {item.type === 'alert' && <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />}
                {item.type === 'success' && <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
                {item.type === 'info' && <Activity className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />}
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm">{item.title}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">{item.farm}</span>
                  </div>
                  <p className="text-slate-400 text-xs mt-1">{item.message}</p>
                </div>
              </div>
              <span className="text-[11px] text-slate-500 shrink-0">{item.time}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
