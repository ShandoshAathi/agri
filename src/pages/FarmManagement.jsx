import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { InteractiveFarmMap } from '../components/map/InteractiveFarmMap';
import { Tractor, Plus, MapPin, X, Layers, Compass, Grid, Activity } from 'lucide-react';

export const FarmManagement = () => {
  const { farms, selectedFarm, selectedFarmId, setSelectedFarmId, addFarm } = useFarm();
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState('map'); // 'map' or 'cards'
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

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel p-6 rounded-3xl border border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center space-x-2">
            <Tractor className="w-6 h-6 text-emerald-400" />
            <span>Farm Management & Spatial Analyst</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Draw custom field contours, select farm area boundaries, configure zone grids, and monitor IoT density.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* Tab View Switcher */}
          <div className="flex items-center space-x-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('map')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                activeTab === 'map' ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Spatial Map</span>
            </button>
            <button
              onClick={() => setActiveTab('cards')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                activeTab === 'cards' ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Sectors List</span>
            </button>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 hover:from-emerald-400 hover:to-teal-400 transition-all flex items-center space-x-2 shadow-lg shadow-emerald-500/20 self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Farm</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Map Tab */}
      {activeTab === 'map' && (
        <div className="space-y-4">
          {/* Active Farm Selector Bar */}
          <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center space-x-3">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Select Active Farm Sector:</span>
              <div className="flex flex-wrap gap-2">
                {farms.map(f => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFarmId(f.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      f.id === selectedFarmId
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md glow-emerald'
                        : 'bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {f.name} ({f.crop})
                  </button>
                ))}
              </div>
            </div>

            <div className="text-xs text-slate-400 flex items-center space-x-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>Current Sector: <strong className="text-slate-100">{selectedFarm.name}</strong> ({selectedFarm.size})</span>
            </div>
          </div>

          {/* Interactive Map Component */}
          <InteractiveFarmMap farm={selectedFarm} height="650px" allowEdit={true} />
        </div>
      )}

      {/* Farms Cards Grid */}
      {(activeTab === 'cards' || activeTab === 'map') && (
        <div className="space-y-3 pt-2">
          <h3 className="text-lg font-bold text-slate-200 flex items-center space-x-2">
            <Layers className="w-5 h-5 text-emerald-400" />
            <span>All Registered Farm Plots ({farms.length})</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {farms.map((farm) => (
              <div 
                key={farm.id} 
                className={`glass-panel p-6 rounded-3xl border transition-all ${
                  farm.id === selectedFarmId 
                    ? 'border-emerald-500/60 shadow-xl shadow-emerald-500/10 bg-slate-900/90' 
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
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
                  <button
                    onClick={() => {
                      setSelectedFarmId(farm.id);
                      setActiveTab('map');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      farm.id === selectedFarmId
                        ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400'
                        : 'bg-slate-900 hover:bg-slate-800 text-emerald-400 border-slate-700 hover:border-emerald-500/50'
                    }`}
                  >
                    {farm.id === selectedFarmId ? 'Active Focus' : 'Set Active & Open Map →'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal for Farm Creation */}
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
                <label className="block text-xs font-semibold text-slate-300 mb-1">Location / Sector</label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full glass-input rounded-xl px-3 py-2 text-xs"
                  placeholder="e.g. South Ridge Block 4"
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
                className="w-full py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 hover:from-emerald-400 hover:to-teal-400 transition-all mt-2"
              >
                Create Farm
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
