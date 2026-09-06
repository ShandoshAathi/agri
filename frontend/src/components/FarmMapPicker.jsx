import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  MapPin, 
  Navigation, 
  Search, 
  Layers, 
  Check, 
  Locate, 
  Compass,
  Crosshair,
  X
} from 'lucide-react';
import { 
  reverseGeocode, 
  searchLocations, 
  COIMBATORE_AREA_PRESETS, 
  saveUserLocation,
  detectUserLocation
} from '../services/weatherService';

// Custom SVG Leaflet Pin Icon
const createCustomIcon = () => {
  return L.divIcon({
    className: 'custom-farm-pin',
    html: `
      <div style="position: relative; width: 36px; height: 36px; display: flex; items-center: center; justify-content: center;">
        <div style="position: absolute; width: 36px; height: 36px; background-color: rgba(16, 185, 129, 0.25); border-radius: 50%; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
        <div style="position: relative; width: 30px; height: 30px; background: linear-gradient(135deg, #10b981, #047857); border: 2.5px solid #ffffff; border-radius: 50%; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white;">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
        </div>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18]
  });
};

export const FarmMapPicker = ({ initialLat = 11.0168, initialLon = 76.9558, initialArea = 'Coimbatore, Tamil Nadu', onSave, onClose }) => {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerInstanceRef = useRef(null);

  const [lat, setLat] = useState(initialLat);
  const [lon, setLon] = useState(initialLon);
  const [formattedArea, setFormattedArea] = useState(initialArea);
  const [layerType, setLayerType] = useState('street'); // 'street' | 'satellite'
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [locating, setLocating] = useState(false);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [lat, lon],
        zoom: 13,
        zoomControl: false
      });

      // Add Zoom Control to Top Right
      L.control.zoom({ position: 'topright' }).addTo(map);

      // Tile Layer: OpenStreetMap Streets
      const streetLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
      });

      streetLayer.addTo(map);
      mapInstanceRef.current = map;

      // Add Marker
      const marker = L.marker([lat, lon], {
        draggable: true,
        icon: createCustomIcon()
      }).addTo(map);

      markerInstanceRef.current = marker;

      // Marker Drag Event
      marker.on('dragend', async (e) => {
        const newPos = e.target.getLatLng();
        updatePosition(newPos.lat, newPos.lng, false);
      });

      // Map Click Event
      map.on('click', async (e) => {
        updatePosition(e.latlng.lat, e.latlng.lng, true);
      });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Change Map Tile Layer (Street vs Satellite)
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    // Remove existing tile layers
    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    if (layerType === 'satellite') {
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19,
        attribution: '&copy; Mapcn Satellite &copy; Esri & OpenStreetMap'
      }).addTo(map);
    } else if (layerType === 'dark') {
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 20,
        attribution: '&copy; Mapcn Dark Telemetry &copy; OpenStreetMap'
      }).addTo(map);
    } else {
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 20,
        attribution: '&copy; Mapcn Voyager &copy; OpenStreetMap & CARTO'
      }).addTo(map);
    }
  }, [layerType]);

  // Update position & reverse geocode
  const updatePosition = async (newLat, newLon, moveMarker = true) => {
    setLat(newLat);
    setLon(newLon);

    if (moveMarker && markerInstanceRef.current) {
      markerInstanceRef.current.setLatLng([newLat, newLon]);
    }
    if (moveMarker && mapInstanceRef.current) {
      mapInstanceRef.current.panTo([newLat, newLon]);
    }

    const geoResult = await reverseGeocode(newLat, newLon);
    if (geoResult?.formatted) {
      setFormattedArea(geoResult.formatted);
    }
  };

  // Handle Manual Lat/Lon Change
  const handleManualLatChange = (e) => {
    const val = parseFloat(e.target.value);
    setLat(e.target.value);
    if (!isNaN(val) && val >= -90 && val <= 90) {
      updatePosition(val, lon, true);
    }
  };

  const handleManualLonChange = (e) => {
    const val = parseFloat(e.target.value);
    setLon(e.target.value);
    if (!isNaN(val) && val >= -180 && val <= 180) {
      updatePosition(lat, val, true);
    }
  };

  // Handle Current GPS Detection
  const handleDetectGPS = async () => {
    setLocating(true);
    const loc = await detectUserLocation();
    if (loc?.lat && loc?.lon) {
      updatePosition(loc.lat, loc.lon, true);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setZoom(15);
      }
    }
    setLocating(false);
  };

  // Handle Search Submission
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearching(true);
    const results = await searchLocations(searchQuery);
    setSearchResults(results);
    setSearching(false);
  };

  const handleSelectSearchResult = (result) => {
    updatePosition(result.lat, result.lon, true);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setZoom(15);
    }
    setSearchQuery('');
    setSearchResults([]);
  };

  // Handle Preset Click
  const handleSelectPreset = (preset) => {
    updatePosition(preset.lat, preset.lon, true);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setZoom(15);
    }
  };

  // Save Pinpoint Location
  const handleSaveLocation = () => {
    const locData = {
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      formatted: formattedArea,
      area: formattedArea.split(',')[0],
      accuracyText: 'Interactive Map Pinpoint',
      timestamp: new Date().toISOString()
    };
    saveUserLocation(locData);
    if (onSave) onSave(locData);
    if (onClose) onClose();
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden font-sans space-y-0 max-w-4xl w-full mx-auto flex flex-col">
      {/* Header Bar */}
      <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center space-x-2.5">
          <div className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-100 text-sm">Interactive Farm Map Pin Dropper</h3>
            <p className="text-[11px] text-slate-400">Click anywhere on the map or drag the pin to set precise farm location</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Layer Toggle */}
          <div className="bg-slate-900 p-0.5 rounded-xl border border-slate-800 flex items-center text-[11px]">
            <button
              onClick={() => setLayerType('street')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                layerType === 'street' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Street
            </button>
            <button
              onClick={() => setLayerType('satellite')}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                layerType === 'satellite' ? 'bg-emerald-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Satellite
            </button>
          </div>

          <button
            onClick={handleDetectGPS}
            disabled={locating}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 font-bold rounded-xl text-xs flex items-center space-x-1.5 border border-slate-700 transition-all cursor-pointer"
          >
            <Navigation className={`w-3.5 h-3.5 ${locating ? 'animate-spin' : ''}`} />
            <span>{locating ? 'GPS...' : 'My GPS'}</span>
          </button>

          {/* Clean Single X Close Button */}
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-rose-950/80 text-stone-300 hover:text-rose-400 border border-slate-700 hover:border-rose-500/40 transition-all cursor-pointer flex items-center space-x-1 shadow-md ml-1"
              title="Close"
            >
              <X className="w-5 h-5 text-rose-400" />
              <span className="text-xs font-bold text-rose-300 hidden sm:inline">Close</span>
            </button>
          )}
        </div>
      </div>

      {/* Search & Coimbatore Presets Toolbar */}
      <div className="p-3 bg-slate-900 border-b border-slate-800 space-y-2">
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search area, landmark, or village in Coimbatore..."
              className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
            />
          </div>
          <button
            type="submit"
            disabled={searching}
            className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-xl text-xs cursor-pointer hover:brightness-110"
          >
            {searching ? 'Searching...' : 'Search'}
          </button>
        </form>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="p-1 bg-slate-950 border border-slate-800 rounded-xl max-h-36 overflow-y-auto space-y-1">
            {searchResults.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectSearchResult(item)}
                className="w-full text-left p-2 rounded-lg hover:bg-emerald-500/20 text-xs text-slate-200 flex items-center justify-between transition-colors"
              >
                <div>
                  <span className="font-bold block text-emerald-400">{item.area}</span>
                  <span className="text-[10px] text-slate-400 truncate block">{item.formatted}</span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">{item.lat.toFixed(3)}, {item.lon.toFixed(3)}</span>
              </button>
            ))}
          </div>
        )}

        {/* Coimbatore Presets Quick Ribbon */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 scrollbar-none text-[10px]">
          <span className="text-slate-500 font-bold uppercase tracking-wider shrink-0 mr-1 flex items-center">
            <Compass className="w-3 h-3 text-emerald-400 mr-1" />
            Coimbatore Presets:
          </span>
          {COIMBATORE_AREA_PRESETS.map((preset) => (
            <button
              key={preset.name}
              onClick={() => handleSelectPreset(preset)}
              className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 hover:border-emerald-500/50 text-slate-300 hover:text-emerald-400 shrink-0 transition-all font-semibold cursor-pointer"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Map View Container */}
      <div className="relative w-full h-[360px] bg-slate-950">
        <div ref={mapContainerRef} className="w-full h-full z-0" />
        
        {/* Map Center Instruction Banner */}
        <div className="absolute top-3 left-3 z-10 bg-slate-950/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 text-[11px] text-slate-300 flex items-center space-x-1.5 shadow-lg">
          <Crosshair className="w-3.5 h-3.5 text-emerald-400" />
          <span>Click map or drag pin to locate your plot</span>
        </div>
      </div>

      {/* Manual Entry Coordinates & Footer Controls */}
      <div className="p-4 bg-slate-950 border-t border-slate-800 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Detected Area Label</label>
            <input
              type="text"
              value={formattedArea}
              onChange={(e) => setFormattedArea(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-100 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Manual Latitude (°N)</label>
            <input
              type="number"
              step="any"
              value={lat}
              onChange={handleManualLatChange}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-emerald-300 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">Manual Longitude (°E)</label>
            <input
              type="number"
              step="any"
              value={lon}
              onChange={handleManualLonChange}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-teal-300 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] text-slate-500 font-mono">
            GPS Pin: {Number(lat).toFixed(5)}° N, {Number(lon).toFixed(5)}° E
          </span>

          <div className="flex items-center space-x-2">
            {onClose && (
              <button
                onClick={onClose}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-400 font-bold rounded-xl text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
            )}
            <button
              onClick={handleSaveLocation}
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-slate-950 font-extrabold rounded-xl text-xs shadow-lg shadow-emerald-500/20 hover:brightness-110 flex items-center space-x-1.5 transition-all cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Confirm & Lock Farm Location</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
