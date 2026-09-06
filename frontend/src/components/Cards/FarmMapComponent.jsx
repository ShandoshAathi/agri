import React, { useState } from 'react';
import { 
  MapPin, 
  Search,
  Maximize2, 
  X, 
  Navigation,
  ExternalLink,
  Share2,
  Bookmark,
  Send,
  Layers,
  Globe,
  UserCheck,
  Droplets,
  FlaskConical,
  Power,
  Sprout,
  Filter,
  Edit3,
  Crosshair,
  CheckCircle,
  Save
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { FarmMapPicker } from '../FarmMapPicker';
import { MapcnMap } from '../MapcnMap';

export const FARM_LOCATIONS = [
  {
    id: 'farm_mgr_01',
    name: 'Green Valley Sector 4 - North Field',
    roleCategory: 'manager',
    inCharge: 'Dr. Arthur Vance',
    roleLabel: 'Manager Controlled',
    roleBg: 'bg-amber-100 text-amber-900 border-amber-300',
    crop: 'Basmati Rice',
    acres: '12.5 Acres',
    location: 'Coimbatore, Tamil Nadu',
    coords: '11.0168° N, 76.9558° E',
    lat: 11.0168,
    lng: 76.9558,
    moisture: 45,
    ph: 6.5,
    temp: 26,
    pumpStatus: 'RUNNING',
    pinColor: 'bg-emerald-600',
    borderColor: 'border-emerald-300',
    top: '32%',
    left: '35%'
  },
  {
    id: 'farm_mgr_02',
    name: 'Sunrise Organic Farm - Plot B',
    roleCategory: 'manager',
    inCharge: 'Dr. Arthur Vance',
    roleLabel: 'Manager Controlled',
    roleBg: 'bg-amber-100 text-amber-900 border-amber-300',
    crop: 'Hybrid Tomato',
    acres: '8.2 Acres',
    location: 'Madurai, Tamil Nadu',
    coords: '9.9252° N, 78.1198° E',
    lat: 9.9252,
    lng: 78.1198,
    moisture: 38,
    ph: 6.8,
    temp: 29,
    pumpStatus: 'OFF',
    pinColor: 'bg-purple-600',
    borderColor: 'border-purple-300',
    top: '58%',
    left: '68%'
  },
  {
    id: 'farm_frm_01',
    name: "Aathi's Paddy & Drip Sector",
    roleCategory: 'farmer',
    inCharge: 'Aathi (Lead Farmer)',
    roleLabel: 'Farmer Assigned',
    roleBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    crop: 'Basmati Rice 1121',
    acres: '5.5 Acres',
    location: 'Thanjavur, Tamil Nadu',
    coords: '10.7905° N, 78.7047° E',
    lat: 10.7905,
    lng: 78.7047,
    moisture: 62,
    ph: 6.2,
    temp: 30,
    pumpStatus: 'RUNNING',
    pinColor: 'bg-lime-500',
    borderColor: 'border-lime-300',
    top: '42%',
    left: '48%'
  },
  {
    id: 'farm_frm_02',
    name: 'Polypore Polyhouse Plot 1',
    roleCategory: 'farmer',
    inCharge: 'Elena Rostova',
    roleLabel: 'Farmer Assigned',
    roleBg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    crop: 'Sweet Corn (Sugar 75)',
    acres: '3.8 Acres',
    location: 'Salem, Tamil Nadu',
    coords: '11.6643° N, 78.1460° E',
    lat: 11.6643,
    lng: 78.1460,
    moisture: 40,
    ph: 6.4,
    temp: 27,
    pumpStatus: 'OFF',
    pinColor: 'bg-blue-600',
    borderColor: 'border-blue-300',
    top: '70%',
    left: '26%'
  }
];

export const FarmMapComponent = ({ onSelectFarm }) => {
  const { t } = useLanguage();
  const { role, user } = useAuth();

  const [farmsList, setFarmsList] = useState(FARM_LOCATIONS);
  const [mapType, setMapType] = useState('satellite'); // 'satellite' | 'hybrid' | 'roadmap'
  const [filterScope, setFilterScope] = useState('auto'); // 'auto' | 'all'
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showInfoWindow, setShowInfoWindow] = useState(true);

  // Modals for Manual Entry & Pin Location
  const [showPinModal, setShowPinModal] = useState(false);
  const [showManualModal, setShowManualModal] = useState(false);

  // Form State for Manual Entry Modal
  const [manualLat, setManualLat] = useState('');
  const [manualLng, setManualLng] = useState('');
  const [manualAreaName, setManualAreaName] = useState('');

  // Toast Banner State
  const [toastMessage, setToastMessage] = useState(null);

  const userRole = role || 'manager';

  // Strict role-based plot filtering matching application auth state
  const roleControlledFarms = farmsList.filter(farm => {
    if (filterScope === 'all') return true;
    return farm.roleCategory === userRole;
  });

  const [selectedFarm, setSelectedFarm] = useState(() => roleControlledFarms[0] || farmsList[0]);

  // Update farm location coordinates and sync state
  const updateFarmCoordinates = (targetId, newLat, newLng, newLocationLabel) => {
    const latNum = parseFloat(newLat);
    const lngNum = parseFloat(newLng);
    const coordsStr = `${latNum.toFixed(4)}° N, ${lngNum.toFixed(4)}° E`;
    const locationStr = newLocationLabel || selectedFarm.location;

    setFarmsList(prev => prev.map(f => {
      if (f.id === targetId) {
        return {
          ...f,
          lat: latNum,
          lng: lngNum,
          coords: coordsStr,
          location: locationStr
        };
      }
      return f;
    }));

    setSelectedFarm(prev => ({
      ...prev,
      lat: latNum,
      lng: lngNum,
      coords: coordsStr,
      location: locationStr
    }));

    setToastMessage(`Pinned coordinates updated for ${selectedFarm.name} (${coordsStr})`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleOpenManualModal = () => {
    setManualLat(selectedFarm.lat.toString());
    setManualLng(selectedFarm.lng.toString());
    setManualAreaName(selectedFarm.location);
    setShowManualModal(true);
  };

  const handleSaveManualEntry = (e) => {
    e.preventDefault();
    if (!manualLat || !manualLng) return;
    updateFarmCoordinates(selectedFarm.id, manualLat, manualLng, manualAreaName);
    setShowManualModal(false);
  };

  const handleSavePinMap = (locData) => {
    updateFarmCoordinates(selectedFarm.id, locData.lat, locData.lon, locData.formatted || locData.area);
    setShowPinModal(false);
  };

  const targetLocation = `${selectedFarm.lat},${selectedFarm.lng}`;
  const googleMapModeParam = mapType === 'satellite' ? 'k' : mapType === 'hybrid' ? 'h' : 'm';
  const googleEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(targetLocation)}&t=${googleMapModeParam}&z=15&ie=UTF8&iwloc=&output=embed`;
  const googleDirectUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(targetLocation)}`;

  return (
    <>
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-950 text-lime-300 px-4 py-3 rounded-2xl shadow-2xl border border-lime-400/40 flex items-center space-x-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle className="w-5 h-5 text-lime-400 shrink-0" />
          <span className="font-bold text-xs">{toastMessage}</span>
        </div>
      )}

      {/* Dashboard Glassmorphic Eco-Card Matching Application UI */}
      <div className="glass-card p-5 space-y-4 font-sans eco-card w-full overflow-hidden border border-stone-200/90 shadow-sm">
        {/* Top Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-stone-200/80 pb-3">
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-base font-black text-slate-900 font-['Manrope',_sans-serif] flex items-center space-x-2">
                <Navigation className="w-4.5 h-4.5 text-emerald-800" />
                <span>{t('Farm Map')}</span>
              </h3>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border shadow-2xs ${
                userRole === 'manager' 
                  ? 'bg-amber-500/10 text-amber-900 border-amber-500/20' 
                  : 'bg-emerald-500/10 text-emerald-800 border-emerald-500/20'
              }`}>
                {userRole === 'manager' ? '👨‍💼 Manager GIS Control' : '👨‍🌾 Farmer Assigned GIS Plot'}
              </span>
            </div>
            <p className="text-[11px] text-stone-500 font-medium mt-0.5">
              Showing {roleControlledFarms.length} plot(s) for <strong className="text-stone-900">{user?.name || (userRole === 'manager' ? 'Manager' : 'Farmer')}</strong>
            </p>
          </div>

          {/* Header Action Tools */}
          <div className="flex items-center flex-wrap gap-2">
            {/* 1. Pin Location Button (Farmer & Manager) */}
            <button
              type="button"
              onClick={() => setShowPinModal(true)}
              className="px-3 py-1.5 rounded-xl bg-emerald-950 hover:bg-emerald-900 text-lime-300 border border-lime-400/30 font-extrabold text-[11px] flex items-center space-x-1.5 shadow-xs transition-all cursor-pointer"
              title="Drag or click pin on interactive map to set location"
            >
              <Crosshair className="w-3.5 h-3.5 text-lime-400" />
              <span>Pin Location</span>
            </button>

            {/* 2. Manual Lat/Lon Entry Button (Farmer & Manager) */}
            <button
              type="button"
              onClick={handleOpenManualModal}
              className="px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-100 border border-stone-700 font-extrabold text-[11px] flex items-center space-x-1.5 shadow-xs transition-all cursor-pointer"
              title="Manually enter Latitude and Longitude degrees"
            >
              <Edit3 className="w-3.5 h-3.5 text-amber-400" />
              <span>Manual Lat/Lon</span>
            </button>

            {/* Map Mode Switcher */}
            <div className="flex items-center bg-stone-100/90 p-1 rounded-xl border border-stone-200 text-xs">
              <button
                type="button"
                onClick={() => setMapType('satellite')}
                className={`px-2.5 py-1 rounded-lg font-extrabold text-[10px] transition-all cursor-pointer ${
                  mapType === 'satellite' ? 'bg-emerald-950 text-lime-300 shadow-2xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Satellite HD
              </button>
              <button
                type="button"
                onClick={() => setMapType('hybrid')}
                className={`px-2.5 py-1 rounded-lg font-extrabold text-[10px] transition-all cursor-pointer ${
                  mapType === 'hybrid' ? 'bg-emerald-800 text-white shadow-2xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Hybrid GIS
              </button>
              <button
                type="button"
                onClick={() => setMapType('roadmap')}
                className={`px-2.5 py-1 rounded-lg font-extrabold text-[10px] transition-all cursor-pointer ${
                  mapType === 'roadmap' ? 'bg-white text-emerald-900 border border-stone-200 shadow-2xs' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Map
              </button>
            </div>

            {/* Scope Toggle */}
            <button
              type="button"
              onClick={() => setFilterScope(prev => prev === 'auto' ? 'all' : 'auto')}
              className={`px-2.5 py-1.5 rounded-xl border font-black text-[10px] transition-all cursor-pointer ${
                filterScope === 'auto'
                  ? 'bg-stone-900 text-white border-stone-800'
                  : 'bg-stone-100 text-stone-700 border-stone-300'
              }`}
            >
              {filterScope === 'auto' ? 'My Plots' : 'All Plots'}
            </button>

            {/* Fullscreen Modal Expand */}
            <button
              type="button"
              onClick={() => setIsFullScreen(true)}
              className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer border border-stone-200"
              title="Expand Full GIS Satellite Map"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Plot Selector Chips Bar */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {roleControlledFarms.map(f => {
            const isSelected = selectedFarm.id === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => {
                  setSelectedFarm(f);
                  setShowInfoWindow(true);
                }}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-extrabold whitespace-nowrap transition-all cursor-pointer flex items-center space-x-1.5 border ${
                  isSelected 
                    ? 'bg-emerald-950 text-lime-300 border-emerald-800 shadow-2xs' 
                    : 'bg-white/80 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                <MapPin className={`w-3 h-3 ${isSelected ? 'text-lime-300' : 'text-emerald-700'}`} />
                <span>{f.name.split('-')[0]}</span>
                <span className="opacity-75 font-normal">({f.acres})</span>
              </button>
            );
          })}
        </div>

        {/* Live Interactive Mapcn GIS Mapping Engine */}
        <div className="relative w-full rounded-2xl overflow-hidden shadow-inner bg-slate-900">
          <MapcnMap 
            farms={roleControlledFarms} 
            selectedFarm={selectedFarm} 
            onSelectFarm={(farm) => setSelectedFarm(farm)} 
            onLocationUpdate={(locData) => {
              updateFarmCoordinates(selectedFarm.id, locData.lat, locData.lon, locData.formatted);
            }}
            height="460px"
          />
        </div>

          {/* Bottom Glass Telemetry Drawer Matching App Design */}
          {showInfoWindow && selectedFarm && (
            <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-sm bg-white/95 backdrop-blur-xl border border-stone-200/90 rounded-2xl p-3.5 shadow-2xl z-30 font-sans animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div className="flex items-center justify-between border-b border-stone-200 pb-2 mb-2">
                <div className="flex items-center space-x-2 min-w-0">
                  <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider border truncate ${selectedFarm.roleBg}`}>
                    {selectedFarm.roleLabel}
                  </span>
                  <span className="text-[10px] text-stone-500 font-bold font-mono truncate">{selectedFarm.coords}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowInfoWindow(false)}
                  className="p-1 rounded-md text-stone-400 hover:text-stone-700 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <h4 className="font-black text-stone-900 text-xs font-['Manrope',_sans-serif] leading-snug">
                    {selectedFarm.name}
                  </h4>
                  <button
                    onClick={() => setShowPinModal(true)}
                    className="text-[10px] text-emerald-700 font-extrabold hover:underline flex items-center space-x-0.5"
                  >
                    <Crosshair className="w-3 h-3" />
                    <span>Re-pin</span>
                  </button>
                </div>
                <div className="flex items-center space-x-3 text-[11px] text-stone-600">
                  <span className="font-bold flex items-center space-x-1">
                    <UserCheck className="w-3.5 h-3.5 text-emerald-700" />
                    <span>In-Charge: <strong className="text-stone-900">{selectedFarm.inCharge}</strong></span>
                  </span>
                </div>
                <div className="flex items-center space-x-3 text-[11px] text-stone-500 font-medium">
                  <span>{selectedFarm.crop}</span>
                  <span>•</span>
                  <span>{selectedFarm.acres}</span>
                  <span>•</span>
                  <span className="text-stone-700 font-bold">{selectedFarm.location}</span>
                </div>

                {/* Telemetry Chips */}
                <div className="grid grid-cols-3 gap-1.5 pt-2 text-[10px]">
                  <div className="bg-emerald-50 border border-emerald-200/80 p-1.5 rounded-xl text-center">
                    <span className="text-stone-500 block font-medium">Moisture</span>
                    <span className="font-extrabold text-emerald-900">{selectedFarm.moisture}%</span>
                  </div>
                  <div className="bg-purple-50 border border-purple-200/80 p-1.5 rounded-xl text-center">
                    <span className="text-stone-500 block font-medium">Soil pH</span>
                    <span className="font-extrabold text-purple-900">{selectedFarm.ph} pH</span>
                  </div>
                  <div className={`p-1.5 rounded-xl text-center border ${
                    selectedFarm.pumpStatus === 'RUNNING' 
                      ? 'bg-emerald-900 text-lime-300 border-emerald-700' 
                      : 'bg-stone-100 text-rose-600 border-stone-300'
                  }`}>
                    <span className="block font-medium opacity-80">Pump</span>
                    <span className="font-black">{selectedFarm.pumpStatus}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!showInfoWindow && (
            <button
              onClick={() => setShowInfoWindow(true)}
              className="absolute bottom-3 left-3 z-20 px-3 py-1.5 rounded-xl bg-white/95 text-stone-900 text-[10px] font-black shadow-md border border-stone-300 cursor-pointer"
            >
              Show Telemetry Info
            </button>
          )}
        </div>

      {/* Manual Entry Lat/Lon Modal */}
      {showManualModal && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowManualModal(false);
          }}
        >
          <div className="bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl max-w-md w-full p-6 space-y-4 font-sans text-slate-100">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-slate-100">Manual Lat/Lon Entry</h3>
                  <p className="text-xs text-slate-400">{userRole === 'manager' ? 'Manager GIS Control' : 'Farmer GIS Plot Edit'}</p>
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setShowManualModal(false)}
                className="px-2.5 py-1 rounded-xl bg-slate-800 hover:bg-rose-950/80 text-stone-300 hover:text-rose-400 border border-slate-700 hover:border-rose-500/40 transition-all cursor-pointer flex items-center space-x-1"
                title="Close"
              >
                <X className="w-4 h-4 text-rose-400" />
                <span className="text-xs font-bold text-rose-300">Close</span>
              </button>
            </div>

            <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs">
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Selected Target Plot</span>
              <span className="font-extrabold text-emerald-400 text-sm block">{selectedFarm.name}</span>
              <span className="text-[11px] text-slate-400 font-mono">Assigned: {selectedFarm.inCharge} • {selectedFarm.acres}</span>
            </div>

            <form onSubmit={handleSaveManualEntry} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Area / Location Label</label>
                <input
                  type="text"
                  required
                  value={manualAreaName}
                  onChange={(e) => setManualAreaName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                  placeholder="e.g. RS Puram Sector B, Coimbatore"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Latitude (°N)</label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={manualLat}
                    onChange={(e) => setManualLat(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-emerald-400 focus:outline-none focus:border-emerald-500"
                    placeholder="11.0168"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Longitude (°E)</label>
                  <input
                    type="number"
                    step="any"
                    required
                    value={manualLng}
                    onChange={(e) => setManualLng(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-teal-400 focus:outline-none focus:border-emerald-500"
                    placeholder="76.9558"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowManualModal(false)}
                  className="px-4 py-2 bg-slate-950 hover:bg-slate-800 text-slate-400 font-bold text-xs rounded-xl transition-colors cursor-pointer flex items-center space-x-1"
                >
                  <X className="w-3.5 h-3.5 text-rose-400" />
                  <span>Cancel</span>
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg hover:brightness-110 flex items-center space-x-1.5 transition-all cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Update Location</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Interactive Map Pin Dropper Modal */}
      {showPinModal && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowPinModal(false);
          }}
        >
          <div className="w-full max-w-4xl max-h-[95vh] overflow-y-auto">
            <FarmMapPicker
              initialLat={selectedFarm.lat}
              initialLon={selectedFarm.lng}
              initialArea={selectedFarm.location}
              onSave={handleSavePinMap}
              onClose={() => setShowPinModal(false)}
            />
          </div>
        </div>
      )}

      {/* Fullscreen GIS Satellite Modal */}
      {isFullScreen && (
        <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-2xl flex flex-col p-4 font-sans animate-in fade-in duration-200">
          <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-xl mb-3 text-white">
            <div className="flex items-center space-x-2">
              <Navigation className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-black text-white font-['Manrope',_sans-serif]">AgriSense Full-Screen GIS Satellite Explorer</h3>
            </div>
            <button
              type="button"
              onClick={() => setIsFullScreen(false)}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer border border-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative flex-1 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900">
            <MapcnMap 
              farms={roleControlledFarms} 
              selectedFarm={selectedFarm} 
              onSelectFarm={(farm) => setSelectedFarm(farm)} 
              onLocationUpdate={(locData) => {
                updateFarmCoordinates(selectedFarm.id, locData.lat, locData.lon, locData.formatted);
              }}
              height="100%"
            />
          </div>
        </div>
      )}
    </>
  );
};
