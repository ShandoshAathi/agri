import React, { useState } from 'react';
import { Plus, X, Sprout, MapPin } from 'lucide-react';
import { useFarm } from '../../context/FarmContext';

export const AddFarm = ({ onClose }) => {
  const { addFarm } = useFarm();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [crop, setCrop] = useState('Tomato');
  const [acres, setAcres] = useState(25);
  const [soilType, setSoilType] = useState('Loamy Soil');

  const handleSubmit = (e) => {
    e.preventDefault();
    addFarm({ name, location, crop, acres: Number(acres), soilType, farmer: 'Elena Rostova', healthScore: 92 });
    if (onClose) onClose();
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl max-w-lg mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
          <Plus className="w-5 h-5 text-emerald-400" />
          <span>Register New Farm Plot</span>
        </h3>
        {onClose && (
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-200">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Farm / Plot Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
            placeholder="e.g. Sunny Ridge Block B"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Geographic Location</label>
          <input
            type="text"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
            placeholder="e.g. Salinas Valley, CA"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Primary Crop</label>
            <input
              type="text"
              required
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Area (Acres)</label>
            <input
              type="number"
              required
              value={acres}
              onChange={(e) => setAcres(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Soil Classification</label>
          <select
            value={soilType}
            onChange={(e) => setSoilType(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
          >
            <option value="Loamy Soil">Loamy Soil</option>
            <option value="Sandy Clay Loam">Sandy Clay Loam</option>
            <option value="Silt Loam">Silt Loam</option>
            <option value="Clay Soil">Clay Soil</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl shadow-lg transition-all"
        >
          Add Plot to System
        </button>
      </form>
    </div>
  );
};
