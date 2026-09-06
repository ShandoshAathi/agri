import React from 'react';


export const AnalyticsCard = ({ title, value, change }) => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-2">
      <span className="text-xs text-slate-400 font-semibold block uppercase">{title}</span>
      <div className="text-2xl font-bold text-slate-100">{value}</div>
      {change && <div className="text-xs text-emerald-400 font-medium">{change} vs last month</div>}
    </div>
  );
};
