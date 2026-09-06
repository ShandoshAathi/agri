import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  MapPin, 
  Layers, 
  Navigation, 
  Search, 
  Maximize2, 
  Minimize2, 
  Locate, 
  Compass, 
  Droplets, 
  Zap, 
  ShieldCheck, 
  Activity, 
  Crosshair,
  CheckCircle,
  RefreshCw
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { reverseGeocode, searchLocations } from '../services/weatherService';

// Mapcn Open Source Tile Layer Specifications
export const MAPCN_PROVIDERS = {
  mapcn_voyager: {
    name: 'Mapcn Voyager (Agronomic)',
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://mapcn.dev">Mapcn Open GIS Platform</a> &copy; OpenStreetMap &copy; CARTO',
    maxZoom: 20,
    subdomains: 'abcd'
  },
  mapcn_satellite: {
    name: 'Mapcn Satellite (High-Res)',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; <a href="https://mapcn.dev">Mapcn Satellite Engine</a> &copy; Esri & OpenStreetMap',
    maxZoom: 19
  },
  mapcn_dark: {
    name: 'Mapcn Dark Emerald',
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://mapcn.dev">Mapcn Dark Telemetry</a> &copy; OpenStreetMap',
    maxZoom: 20,
    subdomains: 'abcd'
  },
  mapcn_topo: {
    name: 'Mapcn Terrain (Elevation)',
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://mapcn.dev">Mapcn Topo Engine</a> &copy; OpenTopoMap',
    maxZoom: 17,
    subdomains: 'abc'
  },
  mapcn_osm: {
    name: 'Mapcn Standard OSM',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://mapcn.dev">Mapcn Open GIS</a> &copy; OpenStreetMap',
    maxZoom: 19,
    subdomains: 'abc'
  }
};

// Custom Mapcn Pin Marker Generator
const createMapcnMarker = (farm) => {
  const isPumpOn = farm.pumpStatus === 'RUNNING';
  const pulseColor = isPumpOn ? '#10b981' : '#a855f7';
  const bgGradient = isPumpOn ? 'linear-gradient(135deg, #059669, #047857)' : 'linear-gradient(135deg, #7e22ce, #6b21a8)';

  return L.divIcon({
    className: 'mapcn-custom-pin',
    html: `
      <div style="position: relative; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center;">
        <div style="position: absolute; width: 44px; height: 44px; background-color: ${pulseColor}33; border-radius: 50%; animation: ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
        <div style="position: relative; width: 34px; height: 34px; background: ${bgGradient}; border: 2.5px solid #ffffff; border-radius: 50%; box-shadow: 0 12px 20px -4px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; color: white;">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z"/><circle cx="12" cy="10" r="3"/></svg>
        </div>
        <div style="position: absolute; bottom: -6px; background: #0f172a; color: #a3e635; font-size: 9px; font-weight: 900; padding: 1px 5px; border-radius: 6px; border: 1px solid #334155; white-space: nowrap; box-shadow: 0 4px 6px rgba(0,0,0,0.3);">
          ${farm.moisture}% VWC
        </div>
      </div>
    `,
    iconSize: [44, 44],
    iconAnchor: [22, 22]
  });
};

export const MapcnMap = ({ 
  farms = [], 
  selectedFarm = null, 
  onSelectFarm, 
  onLocationUpdate,
  height = '500px',
  interactive = true 
}) => {
  const { t } = useLanguage();
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayerRef = useRef(null);
  const markersGroupRef = useRef(null);
  const polygonGroupRef = useRef(null);

  const [providerKey, setProviderKey] = useState('mapcn_satellite');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [locating, setLocating] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [activeFarm, setActiveFarm] = useState(selectedFarm || farms[0]);

  // Center Coordinates (Default Coimbatore)
  const defaultLat = activeFarm?.lat || 11.0168;
  const defaultLng = activeFarm?.lng || 76.9558;

  // Initialize Mapcn Map Engine
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [defaultLat, defaultLng],
        zoom: 13,
        zoomControl: false,
        attributionControl: false
      });

      // Add Mapcn Default Tile Layer
      const initialProvider = MAPCN_PROVIDERS[providerKey];
      const tileLayer = L.tileLayer(initialProvider.url, {
        attribution: initialProvider.attribution,
        maxZoom: initialProvider.maxZoom,
        subdomains: initialProvider.subdomains || 'abc'
      }).addTo(map);

      tileLayerRef.current = tileLayer;
      markersGroupRef.current = L.layerGroup().addTo(map);
      polygonGroupRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;

      // Add Custom Top-Right Zoom Control
      L.control.zoom({ position: 'topright' }).addTo(map);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Handle Mapcn Provider Change
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const provider = MAPCN_PROVIDERS[providerKey];

    if (tileLayerRef.current) {
      mapInstanceRef.current.removeLayer(tileLayerRef.current);
    }

    const newTileLayer = L.tileLayer(provider.url, {
      attribution: provider.attribution,
      maxZoom: provider.maxZoom,
      subdomains: provider.subdomains || 'abc'
    }).addTo(mapInstanceRef.current);

    tileLayerRef.current = newTileLayer;
  }, [providerKey]);

  // Render Farm Markers & Sector Polygons
  useEffect(() => {
    if (!mapInstanceRef.current || !markersGroupRef.current) return;

    markersGroupRef.current.clearLayers();
    polygonGroupRef.current?.clearLayers();

    farms.forEach((farm) => {
      if (!farm.lat || !farm.lng) return;

      const marker = L.marker([farm.lat, farm.lng], {
        icon: createMapcnMarker(farm)
      });

      // Interactive Popup
      const popupHtml = `
        <div style="font-family: sans-serif; padding: 4px; max-width: 220px;">
          <div style="font-weight: 900; font-size: 13px; color: #0f172a; margin-bottom: 4px;">${farm.name}</div>
          <div style="font-size: 11px; color: #64748b; margin-bottom: 6px;">📍 ${farm.location || 'Coimbatore'}</div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; background: #f8fafc; padding: 6px; border-radius: 8px; font-size: 10px; font-weight: 700; margin-bottom: 8px;">
            <div>💧 Soil Moisture: <span style="color: #059669;">${farm.moisture}%</span></div>
            <div>🧪 Soil pH: <span style="color: #7c3aed;">${farm.ph}</span></div>
            <div>🌡️ Air Temp: <span>${farm.temp}°C</span></div>
            <div>⚡ Drip Motor: <span style="color: ${farm.pumpStatus === 'RUNNING' ? '#059669' : '#dc2626'};">${farm.pumpStatus}</span></div>
          </div>
          <div style="font-size: 10px; color: #475569; font-weight: 700;">🌾 Crop: ${farm.crop} (${farm.acres})</div>
        </div>
      `;

      marker.bindPopup(popupHtml);
      marker.on('click', () => {
        setActiveFarm(farm);
        if (onSelectFarm) onSelectFarm(farm);
      });

      markersGroupRef.current.addLayer(marker);

      // Draw Sector Boundaries (Simulated Polyline/Polygon for field sector)
      if (farm.lat && farm.lng && polygonGroupRef.current) {
        const offset = 0.003;
        const bounds = [
          [farm.lat - offset, farm.lng - offset],
          [farm.lat + offset, farm.lng - offset],
          [farm.lat + offset, farm.lng + offset],
          [farm.lat - offset, farm.lng + offset]
        ];

        const polygon = L.polygon(bounds, {
          color: farm.pumpStatus === 'RUNNING' ? '#10b981' : '#a855f7',
          weight: 2,
          fillColor: farm.pumpStatus === 'RUNNING' ? '#10b981' : '#a855f7',
          fillOpacity: 0.15,
          dashArray: '4, 4'
        });

        polygonGroupRef.current.addLayer(polygon);
      }
    });

    if (selectedFarm && selectedFarm.lat && selectedFarm.lng && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([selectedFarm.lat, selectedFarm.lng], 14, { duration: 1.2 });
      setActiveFarm(selectedFarm);
    }
  }, [farms, selectedFarm]);

  // Search Locations via OpenStreetMap Nominatim API
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearching(true);
    const results = await searchLocations(searchQuery);
    setSearchResults(results);
    setSearching(false);
  };

  const handleSelectSearchResult = (res) => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([res.lat, res.lon], 15, { duration: 1.5 });
    }

    if (onLocationUpdate) {
      onLocationUpdate({
        lat: res.lat,
        lon: res.lon,
        area: res.formatted,
        formatted: res.formatted
      });
    }

    setSearchResults([]);
    setSearchQuery(res.formatted);
  };

  // GPS Locate Current Location
  const handleLocateMe = () => {
    if (!navigator.geolocation) return;
    setLocating(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        if (mapInstanceRef.current) {
          mapInstanceRef.current.flyTo([latitude, longitude], 15, { duration: 1.5 });
        }

        const geo = await reverseGeocode(latitude, longitude);
        if (onLocationUpdate) {
          onLocationUpdate({
            lat: latitude,
            lon: longitude,
            area: geo.formatted,
            formatted: geo.formatted
          });
        }
        setLocating(false);
      },
      (err) => {
        console.error('Geolocation error:', err);
        setLocating(false);
      }
    );
  };

  return (
    <div className={`relative rounded-3xl overflow-hidden border border-stone-300 shadow-md font-sans bg-stone-900 ${isFullScreen ? 'fixed inset-0 z-50 rounded-none h-screen' : ''}`} style={{ height: isFullScreen ? '100vh' : height }}>
      {/* Top Glassmorphic Mapcn Header Control Bar */}
      <div className="absolute top-3 left-3 right-3 z-[400] flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        {/* Mapcn Platform Branding Badge */}
        <div className="pointer-events-auto bg-emerald-950/90 text-lime-300 px-3 py-1.5 rounded-2xl border border-emerald-700/60 shadow-xl backdrop-blur-md flex items-center space-x-2">
          <Activity className="w-4 h-4 text-lime-400 animate-pulse" />
          <span className="text-xs font-black tracking-wide font-mono">MAPCN.DEV GIS ENGINE</span>
          <span className="px-1.5 py-0.5 bg-emerald-800 text-lime-200 text-[9px] font-bold rounded-md uppercase">OPEN-SOURCE</span>
        </div>

        {/* Controls: Search, Provider Selector, FullScreen */}
        <div className="pointer-events-auto flex items-center space-x-2">
          {/* Search Box */}
          <form onSubmit={handleSearch} className="relative">
            <input 
              type="text" 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              placeholder="Search place on Mapcn..." 
              className="glass-input text-xs font-bold text-stone-900 bg-white/90 backdrop-blur-md py-1.5 pl-8 pr-3 rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700 shadow-sm w-44 sm:w-60" 
            />
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-2" />
          </form>

          {/* Mapcn Tile Provider Selector */}
          <div className="relative">
            <select 
              value={providerKey} 
              onChange={(e) => setProviderKey(e.target.value)} 
              className="bg-stone-900/90 text-lime-300 text-xs font-bold py-1.5 px-3 rounded-xl border border-emerald-800 backdrop-blur-md cursor-pointer shadow-md focus:outline-none"
            >
              {Object.keys(MAPCN_PROVIDERS).map((key) => (
                <option key={key} value={key}>
                  {MAPCN_PROVIDERS[key].name}
                </option>
              ))}
            </select>
          </div>

          {/* GPS Locate Me Button */}
          <button 
            type="button" 
            onClick={handleLocateMe} 
            disabled={locating}
            className="p-2 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl shadow-md border border-emerald-500 cursor-pointer transition-all"
            title="Locate Farm GPS"
          >
            <Locate className={`w-4 h-4 ${locating ? 'animate-spin' : ''}`} />
          </button>

          {/* FullScreen Toggle */}
          <button 
            type="button" 
            onClick={() => setIsFullScreen(!isFullScreen)} 
            className="p-2 bg-stone-900/90 hover:bg-stone-800 text-lime-300 rounded-xl shadow-md border border-stone-700 cursor-pointer transition-all"
            title="Toggle Fullscreen"
          >
            {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Search Results Dropdown Overlay */}
      {searchResults.length > 0 && (
        <div className="absolute top-14 left-3 z-[500] bg-white border border-stone-300 rounded-2xl shadow-2xl p-2 w-72 max-h-60 overflow-y-auto space-y-1 font-sans text-xs">
          {searchResults.map((res, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelectSearchResult(res)}
              className="w-full text-left p-2 hover:bg-emerald-50 rounded-xl font-medium text-stone-800 transition-all flex items-start space-x-2"
            >
              <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>{res.formatted}</span>
            </button>
          ))}
        </div>
      )}

      {/* Leaflet Map Canvas Container */}
      <div ref={mapContainerRef} className="w-full h-full z-10" />

      {/* Bottom Telemetry Card Overlay */}
      {activeFarm && (
        <div className="absolute bottom-3 left-3 right-3 z-[400] bg-stone-950/85 backdrop-blur-md border border-stone-800 p-3.5 rounded-2xl text-white shadow-2xl flex flex-wrap items-center justify-between gap-3 font-sans">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-900/80 text-lime-400 rounded-xl border border-emerald-700">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-black text-lime-300 flex items-center space-x-2">
                <span>{activeFarm.name}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-emerald-950 text-lime-400 border border-emerald-800">{activeFarm.coords}</span>
              </div>
              <div className="text-[11px] text-stone-400 font-medium">📍 {activeFarm.location} • {activeFarm.crop} ({activeFarm.acres})</div>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-xs font-bold font-mono">
            <div className="flex items-center space-x-1.5 bg-stone-900/90 px-2.5 py-1 rounded-xl border border-stone-800">
              <Droplets className="w-3.5 h-3.5 text-emerald-400" />
              <span>{activeFarm.moisture}% VWC</span>
            </div>

            <div className="flex items-center space-x-1.5 bg-stone-900/90 px-2.5 py-1 rounded-xl border border-stone-800">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span className={activeFarm.pumpStatus === 'RUNNING' ? 'text-emerald-400' : 'text-rose-400'}>{activeFarm.pumpStatus}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
