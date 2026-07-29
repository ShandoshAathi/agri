import React from 'react';

export const RangeInput = ({ label, min = 0, max = 100, step = 1, value, onChange }) => {
  return (
    <div className="space-y-1">
      {label && <label className="block text-xs font-semibold text-slate-400">{label} ({value})</label>}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className="w-full accent-emerald-500"
      />
    </div>
  );
};
