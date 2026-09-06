import React, { useEffect, useRef, useState, createContext, useContext } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Locate, Maximize2, Minimize2, Layers, Search, Compass, Activity } from 'lucide-react';
import { MAPCN_PROVIDERS } from '../MapcnMap';

const MapContext = createContext(null);

export const useMapContext = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error('useMapContext must be used within a <Map> component');
  }
  return context;
};

export const Map = ({ 
  center = [11.0168, 76.9558], 
  zoom = 12, 
  provider = 'mapcn_satellite',
  className = '', 
  children,
  ...props 
}) => {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const tileLayerRef = useRef(null);

  const [currentProvider, setCurrentProvider] = useState(provider);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [mapReady, setMapReady] = useState(false);

  // Normalize center: [lng, lat] or [lat, lng]
  const centerLat = Array.isArray(center) ? (center[0] < 90 && center[0] > -90 ? center[0] : center[1]) : 11.0168;
  const centerLng = Array.isArray(center) ? (center[1] < 180 && center[1] > -180 ? center[1] : center[0]) : 76.9558;

  useEffect(() => {
    if (!containerRef.current) return;

    if (!mapRef.current) {
      const map = L.map(containerRef.current, {
        center: [centerLat, centerLng],
        zoom: zoom,
        zoomControl: false,
        attributionControl: false
      });

      const providerSpec = MAPCN_PROVIDERS[currentProvider] || MAPCN_PROVIDERS.mapcn_satellite;
      const tileLayer = L.tileLayer(providerSpec.url, {
        attribution: providerSpec.attribution,
        maxZoom: providerSpec.maxZoom,
        subdomains: providerSpec.subdomains || 'abc'
      }).addTo(map);

      tileLayerRef.current = tileLayer;
      mapRef.current = map;
      setMapReady(true);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current) return;
    const providerSpec = MAPCN_PROVIDERS[currentProvider] || MAPCN_PROVIDERS.mapcn_satellite;

    if (tileLayerRef.current) {
      mapRef.current.removeLayer(tileLayerRef.current);
    }

    const newLayer = L.tileLayer(providerSpec.url, {
      attribution: providerSpec.attribution,
      maxZoom: providerSpec.maxZoom,
      subdomains: providerSpec.subdomains || 'abc'
    }).addTo(mapRef.current);

    tileLayerRef.current = newLayer;
  }, [currentProvider]);

  const value = {
    map: mapRef.current,
    containerRef,
    currentProvider,
    setCurrentProvider,
    isFullScreen,
    setIsFullScreen,
    mapReady
  };

  return (
    <MapContext.Provider value={value}>
      <div 
        className={`relative w-full h-full min-h-[300px] overflow-hidden bg-slate-900 font-sans ${isFullScreen ? 'fixed inset-0 z-50 rounded-none h-screen' : ''} ${className}`}
        {...props}
      >
        <div ref={containerRef} className="w-full h-full z-10" />
        {mapReady && children}
      </div>
    </MapContext.Provider>
  );
};

export const MapControls = ({ showProviderSelector = true, showLocate = true, showFullscreen = true }) => {
  const { map, currentProvider, setCurrentProvider, isFullScreen, setIsFullScreen } = useMapContext();
  const [locating, setLocating] = useState(false);

  const handleLocate = () => {
    if (!navigator.geolocation || !map) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        map.flyTo([pos.coords.latitude, pos.coords.longitude], 15, { duration: 1.5 });
        setLocating(false);
      },
      () => setLocating(false)
    );
  };

  return (
    <div className="absolute top-3 right-3 z-[450] flex items-center space-x-2 pointer-events-auto">
      {/* Mapcn Branding Badge */}
      <div className="hidden sm:flex items-center space-x-1.5 bg-emerald-950/90 text-lime-300 px-2.5 py-1.5 rounded-xl border border-emerald-700/60 shadow-lg text-[10px] font-black font-mono backdrop-blur-md">
        <Activity className="w-3.5 h-3.5 text-lime-400 animate-pulse" />
        <span>MAPCN.DEV</span>
      </div>

      {/* Layer Provider Selector */}
      {showProviderSelector && (
        <select 
          value={currentProvider} 
          onChange={(e) => setCurrentProvider(e.target.value)} 
          className="bg-stone-900/90 text-lime-300 text-xs font-bold py-1.5 px-2.5 rounded-xl border border-emerald-800 backdrop-blur-md cursor-pointer shadow-md focus:outline-none"
        >
          {Object.keys(MAPCN_PROVIDERS).map((key) => (
            <option key={key} value={key}>
              {MAPCN_PROVIDERS[key].name}
            </option>
          ))}
        </select>
      )}

      {/* GPS Locate Button */}
      {showLocate && (
        <button
          type="button"
          onClick={handleLocate}
          disabled={locating}
          className="p-2 bg-emerald-800 hover:bg-emerald-700 text-lime-300 rounded-xl shadow-md border border-emerald-600 cursor-pointer transition-all"
          title="Locate Current Position"
        >
          <Locate className={`w-3.5 h-3.5 ${locating ? 'animate-spin' : ''}`} />
        </button>
      )}

      {/* Fullscreen Toggle */}
      {showFullscreen && (
        <button
          type="button"
          onClick={() => setIsFullScreen(!isFullScreen)}
          className="p-2 bg-stone-900/90 hover:bg-stone-800 text-lime-300 rounded-xl shadow-md border border-stone-700 cursor-pointer transition-all"
          title="Toggle Fullscreen"
        >
          {isFullScreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
        </button>
      )}
    </div>
  );
};

export const MapMarker = ({ position, title, popup, children }) => {
  const { map } = useMapContext();
  const markerRef = useRef(null);

  useEffect(() => {
    if (!map || !position) return;

    const lat = position[0];
    const lng = position[1];

    const marker = L.marker([lat, lng], {
      icon: L.divIcon({
        className: 'mapcn-ui-pin',
        html: `
          <div style="position: relative; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;">
            <div style="position: absolute; width: 32px; height: 32px; background-color: rgba(16, 185, 129, 0.3); border-radius: 50%; animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
            <div style="position: relative; width: 24px; height: 24px; background: linear-gradient(135deg, #10b981, #047857); border: 2px solid #ffffff; border-radius: 50%; box-shadow: 0 8px 12px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; color: white;">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      })
    }).addTo(map);

    if (popup) {
      marker.bindPopup(popup);
    }

    markerRef.current = marker;

    return () => {
      if (map && markerRef.current) {
        map.removeLayer(markerRef.current);
      }
    };
  }, [map, position, popup]);

  return null;
};
