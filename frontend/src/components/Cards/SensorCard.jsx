import React from 'react';


export const SensorCard = ({ title, value, unit, status, icon: Icon, color = "text-emerald-400" }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
      <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
        <span className="flex items-center space-x-2">
          {Icon && <Icon className={`w-4 h-4 ${color}`} />}
          <span>{title}</span>
        </span>
        {status && <span className={color}>{status}</span>}
      </div>
      <div className="text-3xl font-extrabold text-slate-100">{value}{unit}</div>
    </div>
  );
};
