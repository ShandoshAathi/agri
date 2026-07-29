import React from 'react';

export const TextInput = ({ label, type = "text", value, onChange, placeholder = "", required = false }) => {
  return (
    <div className="space-y-1">
      {label && <label className="block text-xs font-semibold text-slate-400">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
      />
    </div>
  );
};
