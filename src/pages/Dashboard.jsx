import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useFarm } from '../context/FarmContext';
import { useTelemetry } from '../context/TelemetryContext';
import { InteractiveFarmMap } from '../components/map/InteractiveFarmMap';
import { Tractor, Activity, Sprout, Scan, Droplets, AlertTriangle, CheckCircle, Thermometer, Zap, TrendingUp, Compass, Upload } from 'lucide-react';

export const Dashboard = ({ setCurrentPage }) => {
  const { role, user } = useAuth();
  const { farms, selectedFarm, notifications } = useFarm();
  const { telemetry, togglePump } = useTelemetry();

  const dashFileInputRef = useRef(null);
  const [dashDragging, setDashDragging] = useState(false);
  const [dashDiagnosis, setDashDiagnosis] = useState({
    disease: 'Late Blight',
    confidence: '97%',
    affectedArea: '65%',
    severityGrade: 'High Severity',
    severityColor: 'rose',
    url: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a28?auto=format&fit=crop&q=80&w=400',
    treatmentSteps: [
      'Remove infected leaves',
      'Use Copper based fungicide',
      'Maintain proper spacing'
    ]
  });

  const handleDashFileUpload = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setDashDiagnosis({
        disease: 'Early Leaf Blight',
        confidence: '95%',
        affectedArea: '48%',
        severityGrade: 'Moderate Severity',
        severityColor: 'amber',
        url: e.target.result,
        treatmentSteps: [
          'Prune yellowing canopy leaves',
          'Apply Neem bio-fungicide spray',
          'Avoid overhead sprinkler watering'
        ]
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Header */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h2 className="text-2xl font-bold text-slate-100">
              Welcome back, <span className="text-emerald-400">{user.name}</span>
            </h2>
            <span className="px-2.5 py-1 text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full capitalize">
              Role: {role === 'manager' ? 'Farm Manager' : 'Crop Specialist Farmer'}
            </span>
          </div>
          <p className="text-xs text-slate-400">
            {role === 'manager' 
              ? `Overseeing ${farms.length} registered farms across 4 agricultural sectors.` 
              : `Assigned focus: ${selectedFarm.name} (${selectedFarm.crop})`}
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setCurrentPage('monitoring')}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-900 border border-slate-700 hover:border-emerald-500/50 text-slate-200 transition-all flex items-center space-x-2"
          >
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>Live Sensors</span>
          </button>
          <button
            onClick={() => setCurrentPage('irrigation')}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 hover:from-emerald-400 hover:to-teal-400 transition-all flex items-center space-x-2 shadow-lg shadow-emerald-500/20"
          >
            <Droplets className="w-4 h-4" />
            <span>Irrigation Controls</span>
          </button>
        </div>
      </div>

      {/* Quick Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">Soil Moisture</p>
            <h3 className="text-2xl font-extrabold text-emerald-400 mt-1">{telemetry.soilMoisture}%</h3>
            <p className="text-[10px] text-slate-400 mt-0.5">Target Range: 35% - 75%</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <Droplets className="w-6 h-6 text-emerald-400" />
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">Air Temperature</p>
            <h3 className="text-2xl font-extrabold text-teal-300 mt-1">{telemetry.temperature}°C</h3>
            <p className="text-[10px] text-slate-400 mt-0.5">DHT22 Ambient Sensor</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center">
            <Thermometer className="w-6 h-6 text-teal-300" />
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">Soil pH Balance</p>
            <h3 className="text-2xl font-extrabold text-cyan-300 mt-1">{telemetry.soilPh}</h3>
            <p className="text-[10px] text-emerald-400 mt-0.5">Optimal for {selectedFarm.crop}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
            <Activity className="w-6 h-6 text-cyan-300" />
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 font-medium">Smart Pump Status</p>
            <div className="flex items-center space-x-2 mt-1">
              <h3 className={`text-2xl font-extrabold ${telemetry.pumpStatus === 'ON' ? 'text-emerald-400 animate-pulse' : 'text-slate-400'}`}>
                {telemetry.pumpStatus}
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                {telemetry.mode}
              </span>
            </div>
            <button 
              onClick={togglePump} 
              className="text-[10px] text-emerald-400 hover:underline mt-1 font-semibold block"
            >
              Toggle Pump Relay
            </button>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <Zap className="w-6 h-6 text-amber-400" />
          </div>
        </div>
      </div>

      {/* Main Section Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Farm Status Details */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-slate-100 flex items-center space-x-2">
                <Tractor className="w-5 h-5 text-emerald-400" />
                <span>{selectedFarm.name} Overview</span>
              </h3>
              <p className="text-xs text-slate-400">{selectedFarm.location} • {selectedFarm.size}</p>
            </div>
            <span className="px-3 py-1 text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
              Health Score: {selectedFarm.healthScore}%
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400">Current Crop</span>
              <p className="text-sm font-semibold text-slate-200">{selectedFarm.crop}</p>
            </div>
            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400">Soil Classification</span>
              <p className="text-sm font-semibold text-slate-200">{selectedFarm.soilType}</p>
            </div>
            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400">IoT Gateway Nodes</span>
              <p className="text-sm font-semibold text-emerald-400">{selectedFarm.deviceCount} Active ESP32 Nodes</p>
            </div>
          </div>

          {/* Quick Action Navigation Grid */}
          <div className="pt-2">
            <p className="text-xs font-semibold text-slate-300 mb-3">Quick AI & Management Actions</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <button
                onClick={() => setCurrentPage('recommendation')}
                className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 hover:border-emerald-500/50 text-left transition-all group"
              >
                <Sprout className="w-5 h-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-bold text-slate-200">AI Crop Advisor</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Get optimal crop & yield advice</p>
              </button>

              <button
                onClick={() => setCurrentPage('diagnosis')}
                className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 hover:border-emerald-500/50 text-left transition-all group"
              >
                <Scan className="w-5 h-5 text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-bold text-slate-200">Disease Diagnosis</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Upload leaf image for AI scan</p>
              </button>

              <button
                onClick={() => setCurrentPage('analytics')}
                className="p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/80 hover:border-emerald-500/50 text-left transition-all group"
              >
                <TrendingUp className="w-5 h-5 text-teal-300 mb-2 group-hover:scale-110 transition-transform" />
                <p className="text-xs font-bold text-slate-200">Analytics & Trends</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Water usage & temp graphs</p>
              </button>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Top 3 Suitable Crops & Disease Diagnosis Cards */}
        <div className="space-y-4">
          {/* Top 3 Suitable Crops Card (matching Screenshot Top Right) */}
          <div className="bg-white rounded-3xl p-5 shadow-xl border border-slate-100 text-slate-900">
            <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-3">Top 3 Suitable Crops</h4>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-xs font-black text-slate-900">Maize</p>
                <p className="text-xs font-extrabold text-emerald-600 mt-0.5">87%</p>
              </div>
              <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-xs font-black text-slate-900">Wheat</p>
                <p className="text-xs font-extrabold text-emerald-600 mt-0.5">76%</p>
              </div>
              <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-xs font-black text-slate-900">Cotton</p>
                <p className="text-xs font-extrabold text-emerald-600 mt-0.5">65%</p>
              </div>
            </div>
          </div>

          {/* Disease Diagnosis Widget Card (matching Screenshot Right Side) */}
          <div className="bg-white rounded-[32px] p-6 shadow-2xl text-slate-900 border border-slate-100 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Disease Diagnosis</h3>
              <button
                onClick={() => setCurrentPage('diagnosis')}
                className="text-xs font-extrabold text-emerald-600 hover:text-emerald-700 flex items-center space-x-1"
              >
                <span>View History</span>
              </button>
            </div>

            {/* Clickable & Drag-Drop Upload Area */}
            <button
              type="button"
              onClick={() => dashFileInputRef.current?.click()}
              onDragEnter={(e) => { e.preventDefault(); e.stopPropagation(); setDashDragging(true); }}
              onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setDashDragging(true); }}
              onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); setDashDragging(false); }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setDashDragging(false);
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                  handleDashFileUpload(e.dataTransfer.files[0]);
                }
              }}
              className={`w-full py-6 px-4 rounded-2xl border-2 border-dashed transition-all cursor-pointer text-center block ${
                dashDragging
                  ? 'border-emerald-500 bg-emerald-50 scale-[1.01]'
                  : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/70 hover:border-emerald-400'
              }`}
            >
              <div className="flex flex-col items-center justify-center space-y-1.5">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-0.5">
                  <Upload className="w-5 h-5" />
                </div>
                <p className="text-xs font-black text-slate-800">
                  {dashDragging ? 'Drop Image Here Now' : 'Click to upload or drag & drop'}
                </p>
                <p className="text-[10px] font-medium text-slate-400">JPG, PNG, WebP (Max 5MB)</p>
              </div>

              <input
                ref={dashFileInputRef}
                type="file"
                accept="image/*,video/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleDashFileUpload(e.target.files[0]);
                  }
                }}
                className="w-0 h-0 opacity-0 absolute -z-10"
              />
            </button>

            {/* DIAGNOSIS RESULT Section */}
            <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 block">DIAGNOSIS RESULT</span>
                  <h4 className="text-2xl font-black text-slate-900 mt-0.5">{dashDiagnosis.disease}</h4>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-black ${
                  dashDiagnosis.severityColor === 'rose' || dashDiagnosis.severityGrade?.includes('High')
                    ? 'bg-rose-100 text-rose-600'
                    : 'bg-amber-100 text-amber-700'
                }`}>
                  {dashDiagnosis.severityGrade}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 py-1.5 border-y border-slate-200/60 text-xs">
                <div>
                  <span className="text-slate-400 font-semibold block">Confidence</span>
                  <span className="text-base font-black text-rose-600">{dashDiagnosis.confidence}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">Affected Area</span>
                  <span className="text-base font-black text-slate-900">{dashDiagnosis.affectedArea}</span>
                </div>
              </div>

              <div className="flex items-start space-x-3 pt-1">
                <img src={dashDiagnosis.url} alt="Plant diagnosis" className="w-14 h-14 rounded-xl object-cover border border-slate-200 shrink-0" />
                <div>
                  <h5 className="text-[11px] font-black text-slate-900 mb-1 uppercase tracking-wider">Treatment Steps</h5>
                  <div className="space-y-1 text-[11px] text-slate-700 font-medium">
                    {dashDiagnosis.treatmentSteps.map((step, idx) => (
                      <div key={idx} className="flex items-center space-x-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spatial Field Map & Contour Grid Widget */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
            <Compass className="w-5 h-5 text-emerald-400" />
            <span>Active Sector Spatial Contour Map ({selectedFarm.name})</span>
          </h3>
          <button
            onClick={() => setCurrentPage('farms')}
            className="text-xs font-semibold text-emerald-400 hover:underline"
          >
            Full Map Editor & Boundary Tools →
          </button>
        </div>
        <InteractiveFarmMap farm={selectedFarm} height="500px" allowEdit={false} />
      </div>
    </div>
  );
};
