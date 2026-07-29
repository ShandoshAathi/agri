import React, { useState } from 'react';

export const FarmForm = ({ onSubmit, initialData = {} }) => {
  const [name, setName] = useState(initialData.name || '');
  const [crop, setCrop] = useState(initialData.crop || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit({ name, crop });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-xs">
      <div>
        <label className="block text-slate-400 font-semibold mb-1">Farm Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-slate-100"
        />
      </div>
      <div>
        <label className="block text-slate-400 font-semibold mb-1">Crop Type</label>
        <input
          type="text"
          value={crop}
          onChange={(e) => setCrop(e.target.value)}
          className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 px-3 text-slate-100"
        />
      </div>
      <button type="submit" className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl">
        Save Details
      </button>
    </form>
  );
};
