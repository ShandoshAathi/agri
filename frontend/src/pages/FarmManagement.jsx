import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { 
  Tractor, 
  Plus, 
  MapPin, 
  X,
  Map as MapIcon,
  Crosshair
} from 'lucide-react';
import { detectUserLocation } from '../services/weatherService';
import { FarmMapPicker } from '../components/FarmMapPicker';

export const FarmManagement = () => {
  const { farms, addFarm, setSelectedFarmId } = useFarm();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showMapPickerModal, setShowMapPickerModal] = useState(false);

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [crop, setCrop] = useState('');
  const [size, setSize] = useState('');
  const [farmer, setFarmer] = useState('Elena Rostova');
  const [soilType, _setSoilType] = useState('Loamy Soil');

  const handleCreateFarm = (e) => {
    e.preventDefault();
    addFarm({
      name,
      location,
      crop,
      size: `${size} Acres`,
      assignedFarmer: farmer,
      status: 'Optimal',
      soilType,
      established: new Date().toISOString().split('T')[0]
    });
    setShowAddModal(false);
    setName('');
    setLocation('');
    setCrop('');
    setSize('');
  };

  const handleMapSave = (locData) => {
    setLocation(locData.formatted || `${locData.lat.toFixed(4)}°N, ${locData.lon.toFixed(4)}°E`);
    setShowMapPickerModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center space-x-2">
            <Tractor className="w-6 h-6 text-emerald-400" />
            <span>Farm Management & Interactive Mapping</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">Manage farm sectors, assign crop specialists, and pinpoint exact field coordinates on the interactive map.</p>
        </div>
        <div className="flex items-center space-x-2 self-start sm:self-auto">
          <button
            onClick={() => setShowMapPickerModal(true)}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-slate-700 hover:border-emerald-500/50 transition-all flex items-center space-x-2 cursor-pointer shadow-md"
          >
            <MapIcon className="w-4 h-4 text-emerald-400" />
            <span>Open Interactive Map</span>
          </button>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 hover:from-emerald-400 hover:to-teal-400 transition-all flex items-center space-x-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Farm</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {farms.map((farm) => (
          <div key={farm.id} className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 hover:border-emerald-500/40 transition-all">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">Sector ID: {farm.id}</span>
                <h3 className="text-lg font-bold text-slate-100">{farm.name}</h3>
                <p className="text-xs text-slate-400 flex items-center space-x-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" />
                  <span>{farm.location}</span>
                </p>
              </div>
              <span className="px-3 py-1 text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
                Score: {farm.healthScore}%
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Primary Crop</span>
                <span className="font-semibold text-slate-200">{farm.crop}</span>
              </div>
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Assigned Farmer</span>
                <span className="font-semibold text-emerald-300">{farm.assignedFarmer}</span>
              </div>
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Land Area</span>
                <span className="font-semibold text-slate-200">{farm.size}</span>
              </div>
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <span className="text-slate-500 text-[10px] block">IoT ESP32 Nodes</span>
                <span className="font-semibold text-teal-300">{farm.deviceCount} Connected</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-slate-400">Established: {farm.established}</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    setLocation(farm.location);
                    setShowMapPickerModal(true);
                  }}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 hover:border-emerald-500/50 transition-all flex items-center space-x-1 cursor-pointer"
                  title="Pinpoint this farm on map"
                >
                  <Crosshair className="w-3.5 h-3.5 text-rose-400" />
                  <span>Pin Map</span>
                </button>
                <button
                  onClick={() => setSelectedFarmId(farm.id)}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-slate-700 hover:border-emerald-500/50 transition-all cursor-pointer"
                >
                  Set Active Focus →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Farm Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="glass-panel p-6 rounded-3xl w-full max-w-md border border-slate-800 relative">
            <button onClick={() => setShowAddModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-200">
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-bold text-slate-100 mb-1">Create New Farm Sector</h3>
            <p className="text-xs text-slate-400 mb-4">Register a new agricultural plot into the AgriSense AI network.</p>

            <form onSubmit={handleCreateFarm} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Farm Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full glass-input rounded-xl px-3 py-2 text-xs"
                  placeholder="e.g. Golden Harvest Plot B"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-300">Location / Sector</label>
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => setShowMapPickerModal(true)}
                      className="text-[10px] text-teal-400 font-bold hover:underline flex items-center space-x-1 cursor-pointer"
                    >
                      <MapIcon className="w-3 h-3 text-teal-400" />
                      <span>Pin on Map</span>
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        const loc = await detectUserLocation();
                        if (loc?.formatted) setLocation(loc.formatted);
                      }}
                      className="text-[10px] text-emerald-400 font-bold hover:underline flex items-center space-x-1 cursor-pointer"
                    >
                      <MapPin className="w-3.5 h-3.5 text-rose-400" />
                      <span>Auto-GPS</span>
                    </button>
                  </div>
                </div>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full glass-input rounded-xl px-3 py-2 text-xs"
                  placeholder="e.g. RS Puram Sector B, Coimbatore"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Crop Type</label>
                  <input
                    type="text"
                    required
                    value={crop}
                    onChange={(e) => setCrop(e.target.value)}
                    className="w-full glass-input rounded-xl px-3 py-2 text-xs"
                    placeholder="e.g. Tomatoes"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Size (Acres)</label>
                  <input
                    type="number"
                    required
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="w-full glass-input rounded-xl px-3 py-2 text-xs"
                    placeholder="12.5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Assigned Farmer</label>
                <select
                  value={farmer}
                  onChange={(e) => setFarmer(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-xl px-3 py-2 text-xs"
                >
                  <option value="Elena Rostova">Elena Rostova</option>
                  <option value="Marcus Sterling">Marcus Sterling</option>
                  <option value="Sophia Chen">Sophia Chen</option>
                  <option value="David Kalu">David Kalu</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 hover:from-emerald-400 hover:to-teal-400 transition-all mt-2 cursor-pointer"
              >
                Create Farm
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Interactive Map Pin Dropper Modal */}
      {showMapPickerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-4xl max-h-[95vh] overflow-y-auto">
            <FarmMapPicker
              initialArea={location || 'Coimbatore, Tamil Nadu'}
              onSave={handleMapSave}
              onClose={() => setShowMapPickerModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

