import React, { useState } from 'react';
import { Save, X } from 'lucide-react';

export const EditFarm = ({ farm, onClose, onSave }) => {
  const [name, setName] = useState(farm?.name || '');
  const [crop, setCrop] = useState(farm?.crop || '');
  const [acres, setAcres] = useState(farm?.acres || 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) onSave({ ...farm, name, crop, acres: Number(acres) });
    if (onClose) onClose();
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl max-w-lg mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-100">Edit Plot Specifications</h3>
        {onClose && (
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Plot Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Active Crop</label>
          <input
            type="text"
            value={crop}
            onChange={(e) => setCrop(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Acres</label>
          <input
            type="number"
            value={acres}
            onChange={(e) => setAcres(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg flex items-center justify-center space-x-2 transition-all"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </form>
    </div>
  );
};
