import React from 'react';

export const SelectInput = ({ label, value, onChange, options = [] }) => {
  return (
    <div className="space-y-1">
      {label && <label className="block text-xs font-semibold text-slate-400">{label}</label>}
      <select
        value={value}
        onChange={onChange}
        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
      >
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
};
