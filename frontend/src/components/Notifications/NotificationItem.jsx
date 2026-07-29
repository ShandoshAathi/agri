import React from 'react';
import { Bell } from 'lucide-react';

export const NotificationItem = ({ title, message, time }) => {
  return (
    <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl flex items-start space-x-3 text-xs">
      <Bell className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
      <div className="flex-1">
        <div className="font-bold text-slate-200">{title}</div>
        <div className="text-slate-400">{message}</div>
      </div>
      <span className="text-[10px] text-slate-500">{time}</span>
    </div>
  );
};
