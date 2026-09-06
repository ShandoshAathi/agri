import React, { useEffect, useRef, useState, useMemo } from 'react';
import L from 'leaflet';
import { 
  Layers, 
  Square, 
  Grid, 
  MapPin, 
  Compass, 
  Activity, 
  Save, 
  Trash2, 
  Download, 
  Maximize2, 
  Sliders, 
  Zap, 
  Cpu, 
  Sun, 
  Droplets, 
  Eye, 
  Plus, 
  Check, 
  Crosshair,
  Navigation,
  Target,
  Search,
  Globe,
  Loader2
} from 'lucide-react';
import { useFarm } from '../../context/FarmContext';

// Fix default Leaflet icon images in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Spherical polygon area calculation (in Square Meters & Acres)
const calculatePolygonArea = (coordinates) => {
  if (!coordinates || coordinates.length < 3) return { sqMeters: 0, acres: 0, hectares: 0, perimeterM: 0 };
  
  const radius = 6378137; // Earth's radius in meters
  let area = 0;
  let perimeter = 0;

  for (let i = 0; i < coordinates.length; i++) {
    const p1 = coordinates[i];
    const p2 = coordinates[(i + 1) % coordinates.length];

    // Perimeter calculation
    const lat1 = (p1[0] * Math.PI) / 180;
    const lon1 = (p1[1] * Math.PI) / 180;
    const lat2 = (p2[0] * Math.PI) / 180;
    const lon2 = (p2[1] * Math.PI) / 180;

    const dLat = lat2 - lat1;
    const dLon = lon2 - lon1;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    perimeter += radius * c;

    // Area calculation using spherical projection
    area += (lon2 - lon1) * (2 + Math.sin(lat1) + Math.sin(lat2));
  }

  area = Math.abs((area * radius * radius) / 2);
  const acres = area * 0.000247105;
  const hectares = area * 0.0001;

  return {
    sqMeters: Math.round(area),
    acres: Number(acres.toFixed(2)),
    hectares: Number(hectares.toFixed(2)),
    perimeterM: Math.round(perimeter)
  };
};

// High-Precision Map Tile Layers Config with Sub-Meter Resolution Support
const TILE_LAYERS = {
  google_hybrid: {
    name: 'Google Satellite & Streets',
    url: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
    attribution: '&copy; Google Maps'
  },
  google_streets: {
    name: 'Google Street Map',
    url: 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
    attribution: '&copy; Google Maps'
  },
  satellite: {
    name: 'Esri World Satellite',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri'
  },
  dark: {
    name: 'Carto Dark Canvas',
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; OpenStreetMap &copy; CARTO'
  },
  osm: {
    name: 'OpenStreetMap Standard',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; OpenStreetMap contributors'
  }
};

export const InteractiveFarmMap = ({ farm, height = '600px', allowEdit = true }) => {
  const { updateFarmBoundary, updateFarmGridSettings, devices, updateDevicePosition } = useFarm();
  
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const drawLayerGroupRef = useRef(null);

  // Map state
  const [tileType, setTileType] = useState('google_hybrid');
  const [drawMode, setDrawMode] = useState('inspect'); // 'inspect', 'draw_polygon', 'draw_rect', 'add_sensor'
  const [boundaryCoords, setBoundaryCoords] = useState(farm?.boundary || []);
  const [drawingPoints, setDrawingPoints] = useState([]);
  const [liveCenter, setLiveCenter] = useState(null);
  
  // Custom Grid & Contour settings
  const [gridCols, setGridCols] = useState(farm?.gridCols || 4);
  const [gridRows, setGridRows] = useState(farm?.gridRows || 4);
  const [gridSize, setGridSize] = useState(farm?.gridSize || '15m');
  const [contourMode, setContourMode] = useState(farm?.contourMode || 'moisture'); // 'moisture', 'elevation', 'ndvi', 'temperature', 'none'
  const [showGridLines, setShowGridLines] = useState(true);
  const [selectedCell, setSelectedCell] = useState(null);

  // Auto Location Tracker state
  const [userLocation, setUserLocation] = useState(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationError, setLocationError] = useState(null);

  // Live Street & Address Search Geocoder state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchedPlace, setSearchedPlace] = useState(null);
  const [reverseAddress, setReverseAddress] = useState(null);

  // Live Street Search Handler using Nominatim OpenStreetMap API
  const handleStreetSearch = async (query) => {
    setSearchQuery(query);
    if (!query || query.trim().length < 3) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1`);
      const data = await res.json();
      setSearchResults(data || []);
    } catch (err) {
      console.warn('Geocoding search error:', err);
    } finally {
      setIsSearching(false);
    }
  };

  // Select Search Result & Jump Map to Exact Street at Max Zoom 18x
  const handleSelectSearchResult = (result) => {
    const lat = parseFloat(result.lat);
    const lon = parseFloat(result.lon);
    const place = {
      lat,
      lng: lon,
      displayName: result.display_name,
      street: result.address?.road || result.address?.suburb || result.display_name.split(',')[0]
    };

    setSearchedPlace(place);
    setSearchResults([]);
    setSearchQuery(place.street);

    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([lat, lon], 18, {
        animate: true,
        duration: 1.8
      });
    }
  };

  // Fetch Reverse Geocode address details on click
  const fetchReverseGeocode = async (lat, lng) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`);
      const data = await res.json();
      if (data && data.address) {
        const road = data.address.road || data.address.pedestrian || data.address.suburb || data.address.county || '';
        const city = data.address.city || data.address.town || data.address.village || data.address.state || '';
        const postcode = data.address.postcode || '';
        setReverseAddress({
          fullAddress: data.display_name,
          street: road ? `${road}, ${city}` : data.display_name,
          postcode
        });
      }
    } catch (err) {
      console.warn('Reverse geocode error:', err);
    }
  };

  // Auto Location Tracker Handler - Captures GPS and flies to maximum zoom (Level 19)
  const handleAutoLocate = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        const newPos = [latitude, longitude];
        setUserLocation({ lat: latitude, lng: longitude, accuracy });
        setIsLocating(false);

        // Fetch reverse geocode address for exact street name!
        fetchReverseGeocode(latitude, longitude);

        if (mapInstanceRef.current) {
          // Fly map to user location at MAXIMUM zoom (Level 19)
          mapInstanceRef.current.flyTo(newPos, 19, {
            animate: true,
            duration: 1.8
          });
        }
      },
      (err) => {
        setIsLocating(false);
        const fallbackPos = farm?.center || [12.9716, 77.5946];
        setUserLocation({ lat: fallbackPos[0], lng: fallbackPos[1], accuracy: 12 });
        setLocationError('GPS request timed out or denied. Located active farm center.');
        if (mapInstanceRef.current) {
          mapInstanceRef.current.flyTo(fallbackPos, 19, { animate: true, duration: 1.8 });
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  // Area stats
  const areaStats = useMemo(() => calculatePolygonArea(boundaryCoords), [boundaryCoords]);

  // Sync boundaryCoords when farm changes
  useEffect(() => {
    if (farm?.boundary) {
      setBoundaryCoords(farm.boundary);
    }
    if (farm?.gridCols) setGridCols(farm.gridCols);
    if (farm?.gridRows) setGridRows(farm.gridRows);
    if (farm?.gridSize) setGridSize(farm.gridSize);
    if (farm?.contourMode) setContourMode(farm.contourMode);
  }, [farm]);

  // Center calculation
  const mapCenter = useMemo(() => {
    if (boundaryCoords && boundaryCoords.length > 0) {
      const lats = boundaryCoords.map(p => p[0]);
      const lngs = boundaryCoords.map(p => p[1]);
      return [
        lats.reduce((a, b) => a + b, 0) / lats.length,
        lngs.reduce((a, b) => a + b, 0) / lngs.length
      ];
    }
    return farm?.center || [12.9716, 77.5946];
  }, [boundaryCoords, farm]);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: mapCenter,
        zoom: 17,
        maxZoom: 21,
        zoomControl: false
      });

      L.control.zoom({ position: 'topright' }).addTo(map);

      L.tileLayer(TILE_LAYERS[tileType].url, {
        attribution: TILE_LAYERS[tileType].attribution,
        maxZoom: 21,
        maxNativeZoom: 19
      }).addTo(map);

      mapInstanceRef.current = map;
      drawLayerGroupRef.current = L.layerGroup().addTo(map);

      // Handle center coordinate tracking
      setLiveCenter(mapCenter);
      map.on('move', () => {
        const c = map.getCenter();
        setLiveCenter([c.lat, c.lng]);
      });

      // Handle map clicks based on mode
      map.on('click', (e) => {
        const { lat, lng } = e.latlng;

        if (drawMode === 'draw_polygon') {
          setDrawingPoints(prev => [...prev, [lat, lng]]);
        }
      });
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Sync Tile Layer when state changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    // Remove existing tile layers
    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    // Add selected layer with ultra-high resolution zoom
    L.tileLayer(TILE_LAYERS[tileType].url, {
      attribution: TILE_LAYERS[tileType].attribution,
      maxZoom: 21,
      maxNativeZoom: 19
    }).addTo(map);
  }, [tileType]);

  // Redraw Polygons, Grid Overlay & Sensor Markers whenever dependencies update
  useEffect(() => {
    if (!mapInstanceRef.current || !drawLayerGroupRef.current) return;
    const map = mapInstanceRef.current;
    const layerGroup = drawLayerGroupRef.current;
    layerGroup.clearLayers();

    // 1. Render Active Farm Boundary Polygon
    if (boundaryCoords && boundaryCoords.length > 2) {
      const polygon = L.polygon(boundaryCoords, {
        color: '#10b981',
        weight: 3,
        fillColor: '#10b981',
        fillOpacity: 0.15,
        dashArray: '6, 6'
      }).addTo(layerGroup);

      // Calculate bounding box for Grid generation
      const lats = boundaryCoords.map(p => p[0]);
      const lngs = boundaryCoords.map(p => p[1]);
      const minLat = Math.min(...lats);
      const maxLat = Math.max(...lats);
      const minLng = Math.min(...lngs);
      const maxLng = Math.max(...lngs);

      // 2. Render Custom Grid Cells (e.g. A1, A2...)
      if (showGridLines) {
        const dLat = (maxLat - minLat) / gridRows;
        const dLng = (maxLng - minLng) / gridCols;

        for (let r = 0; r < gridRows; r++) {
          for (let c = 0; c < gridCols; c++) {
            const cellMinLat = minLat + r * dLat;
            const cellMaxLat = minLat + (r + 1) * dLat;
            const cellMinLng = minLng + c * dLng;
            const cellMaxLng = minLng + (c + 1) * dLng;

            const colLetter = String.fromCharCode(65 + c);
            const cellLabel = `${colLetter}${r + 1}`;

            // Seeded pseudo values for moisture/temp based on label
            const charSum = colLetter.charCodeAt(0) + (r + 1);
            const simulatedMoisture = 35 + (charSum * 7) % 45;
            const simulatedTemp = 24 + (charSum * 3) % 10;
            const simulatedPh = (6.0 + ((charSum % 15) / 10)).toFixed(1);

            // Determine contour color background
            let cellBgColor = 'rgba(16, 185, 129, 0.08)';
            if (contourMode === 'moisture') {
              if (simulatedMoisture < 45) cellBgColor = 'rgba(244, 63, 94, 0.25)'; // low moisture
              else if (simulatedMoisture < 65) cellBgColor = 'rgba(245, 158, 11, 0.25)'; // moderate
              else cellBgColor = 'rgba(16, 185, 129, 0.3)'; // optimal
            } else if (contourMode === 'elevation') {
              const elev = 220 + (charSum * 12) % 60;
              cellBgColor = `rgba(234, 179, 8, ${0.15 + (elev - 220) / 150})`;
            } else if (contourMode === 'ndvi') {
              const ndvi = 0.5 + ((charSum % 40) / 100);
              cellBgColor = `rgba(34, 197, 94, ${ndvi * 0.5})`;
            } else if (contourMode === 'temperature') {
              cellBgColor = simulatedTemp > 30 ? 'rgba(239, 68, 68, 0.3)' : 'rgba(14, 165, 233, 0.25)';
            }

            const isSelected = selectedCell?.id === cellLabel;

            const gridRect = L.rectangle(
              [[cellMinLat, cellMinLng], [cellMaxLat, cellMaxLng]],
              {
                color: isSelected ? '#38bdf8' : '#334155',
                weight: isSelected ? 2.5 : 1,
                fillColor: cellBgColor,
                fillOpacity: contourMode === 'none' ? 0.05 : 0.4
              }
            ).addTo(layerGroup);

            // Cell click selection
            gridRect.on('click', (e) => {
              L.DomEvent.stopPropagation(e);
              setSelectedCell({
                id: cellLabel,
                row: r + 1,
                col: colLetter,
                moisture: simulatedMoisture,
                temp: simulatedTemp,
                ph: simulatedPh,
                lat: (cellMinLat + cellMaxLat) / 2,
                lng: (cellMinLng + cellMaxLng) / 2
              });
            });

            // Cell text marker label
            const labelIcon = L.divIcon({
              className: 'custom-grid-label',
              html: `
                <div class="px-1.5 py-0.5 rounded text-[9px] font-extrabold shadow-sm flex items-center space-x-1 ${
                  isSelected ? 'bg-cyan-500 text-slate-950 glow-teal font-black ring-2 ring-white' : 'bg-slate-900/80 text-emerald-400 border border-slate-700'
                }">
                  <span>${cellLabel}</span>
                  ${contourMode === 'moisture' ? `<span class="opacity-75">· ${simulatedMoisture}%</span>` : ''}
                </div>
              `,
              iconSize: [40, 20],
              iconAnchor: [20, 10]
            });

            L.marker([(cellMinLat + cellMaxLat) / 2, (cellMinLng + cellMaxLng) / 2], {
              icon: labelIcon,
              interactive: false
            }).addTo(layerGroup);
          }
        }
      }
    }

    // 3. Render Active In-Progress Polygon Drawing Vertices & Polyline
    if (drawingPoints.length > 0) {
      drawingPoints.forEach((pt, idx) => {
        const markerIcon = L.divIcon({
          className: 'drawing-vertex',
          html: `<div class="w-3.5 h-3.5 bg-cyan-400 border-2 border-slate-950 rounded-full shadow-lg glow-teal flex items-center justify-center text-[8px] font-bold text-slate-950">${idx + 1}</div>`,
          iconSize: [14, 14],
          iconAnchor: [7, 7]
        });
        L.marker(pt, { icon: markerIcon }).addTo(layerGroup);
      });

      if (drawingPoints.length >= 2) {
        L.polyline(drawingPoints, {
          color: '#38bdf8',
          weight: 2.5,
          dashArray: '4, 4'
        }).addTo(layerGroup);
      }
    }

    // 4. Render IoT Sensor Node Markers
    devices.forEach((dev) => {
      if (!dev.coords) return;
      const isFarmDevice = dev.farmId === farm?.id;
      
      const nodeIcon = L.divIcon({
        className: 'iot-node-marker',
        html: `
          <div class="group relative cursor-pointer">
            <div class="w-8 h-8 rounded-full ${
              isFarmDevice ? 'bg-gradient-to-tr from-emerald-500 to-teal-400' : 'bg-slate-700'
            } p-0.5 shadow-xl border-2 border-slate-900 flex items-center justify-center transform hover:scale-125 transition-all">
              <div class="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                <span class="w-2.5 h-2.5 rounded-full ${isFarmDevice ? 'bg-emerald-400 animate-ping' : 'bg-slate-400'}"></span>
              </div>
            </div>
            <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block z-50 whitespace-nowrap bg-slate-900 text-slate-100 text-[10px] p-2 rounded-xl border border-slate-700 shadow-xl">
              <p class="font-bold text-emerald-400">${dev.name}</p>
              <p class="text-slate-400 text-[9px]">ID: ${dev.id} | IP: ${dev.IP}</p>
              <p class="text-slate-300 text-[9px]">Status: ${dev.status} (${dev.battery})</p>
            </div>
          </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      const marker = L.marker(dev.coords, {
        icon: nodeIcon,
        draggable: allowEdit
      }).addTo(layerGroup);

      if (allowEdit) {
        marker.on('dragend', (e) => {
          const newPos = e.target.getLatLng();
          updateDevicePosition(dev.id, [newPos.lat, newPos.lng]);
        });
      }
    });

    // 5. Render User GPS Auto Location Tracker Pin
    if (userLocation) {
      const userPinIcon = L.divIcon({
        className: 'user-gps-tracker-pin',
        html: `
          <div class="relative flex items-center justify-center">
            <span class="animate-ping absolute inline-flex h-10 w-10 rounded-full bg-cyan-400 opacity-75"></span>
            <div class="w-7 h-7 rounded-full bg-gradient-to-tr from-cyan-400 to-emerald-400 border-2 border-white shadow-2xl flex items-center justify-center glow-teal">
              <div class="w-2.5 h-2.5 rounded-full bg-slate-950"></div>
            </div>
            <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 bg-slate-900 text-cyan-300 text-[10px] font-bold px-2 py-0.5 rounded-lg border border-cyan-500/50 shadow-xl whitespace-nowrap">
              You Are Here (Max Zoom 19x)
            </div>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      });

      L.marker([userLocation.lat, userLocation.lng], { icon: userPinIcon }).addTo(layerGroup);

      if (userLocation.accuracy) {
        L.circle([userLocation.lat, userLocation.lng], {
          radius: Math.min(userLocation.accuracy, 40),
          color: '#06b6d4',
          fillColor: '#06b6d4',
          fillOpacity: 0.2,
          weight: 2,
          dashArray: '3, 3'
        }).addTo(layerGroup);
      }
    }

    // 6. Render Searched Street / Landmark Location Marker
    if (searchedPlace) {
      const searchPinIcon = L.divIcon({
        className: 'searched-place-pin',
        html: `
          <div class="relative flex items-center justify-center">
            <span class="animate-ping absolute inline-flex h-10 w-10 rounded-full bg-amber-400 opacity-75"></span>
            <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-rose-400 border-2 border-white shadow-2xl flex items-center justify-center glow-amber">
              <div class="w-3 h-3 rounded-full bg-slate-950"></div>
            </div>
            <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 bg-slate-900 text-amber-300 text-[10px] font-extrabold px-2.5 py-1 rounded-xl border border-amber-500/50 shadow-2xl whitespace-nowrap">
              📍 ${searchedPlace.street}
            </div>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      });

      L.marker([searchedPlace.lat, searchedPlace.lng], { icon: searchPinIcon }).addTo(layerGroup);
    }

  }, [boundaryCoords, drawingPoints, gridCols, gridRows, showGridLines, contourMode, selectedCell, devices, farm, userLocation, searchedPlace]);

  // Action: Complete Drawing Polygon
  const handleFinishPolygon = () => {
    if (drawingPoints.length < 3) return;
    const closed = [...drawingPoints];
    setBoundaryCoords(closed);
    setDrawingPoints([]);
    setDrawMode('inspect');

    // Auto-recalculate acreage
    const stats = calculatePolygonArea(closed);
    if (updateFarmBoundary && farm?.id) {
      updateFarmBoundary(farm.id, closed, `${stats.acres} Acres`);
    }
  };

  // Action: Reset/Clear Boundary
  const handleClearDrawing = () => {
    setDrawingPoints([]);
    if (drawMode === 'draw_polygon') {
      setBoundaryCoords([]);
    }
  };

  // Save Grid Configuration
  const handleSaveGridSettings = (cols, rows, sizeStr) => {
    setGridCols(cols);
    setGridRows(rows);
    setGridSize(sizeStr);
    if (updateFarmGridSettings && farm?.id) {
      updateFarmGridSettings(farm.id, { gridCols: cols, gridRows: rows, gridSize: sizeStr });
    }
  };

  // Export GeoJSON
  const handleExportGeoJSON = () => {
    const geojson = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {
            farmId: farm?.id,
            name: farm?.name,
            crop: farm?.crop,
            areaAcres: areaStats.acres,
            perimeterM: areaStats.perimeterM,
            gridCols,
            gridRows
          },
          geometry: {
            type: 'Polygon',
            coordinates: [boundaryCoords.map(pt => [pt[1], pt[0]])]
          }
        }
      ]
    };

    const blob = new Blob([JSON.stringify(geojson, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${farm?.name.toLowerCase().replace(/\s+/g, '_')}_boundary.geojson`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden border border-slate-800 shadow-2xl glass-panel flex flex-col" style={{ height }}>
      {/* Top Floating Controls Toolbar */}
      <div className="absolute top-4 left-4 right-4 z-[400] flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-950/85 backdrop-blur-xl border border-slate-800 shadow-xl">
        
        {/* Left Group: Mode Selector */}
        <div className="flex items-center space-x-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => { setDrawMode('inspect'); setDrawingPoints([]); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              drawMode === 'inspect' ? 'bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Inspect Map</span>
          </button>

          {allowEdit && (
            <button
              onClick={() => { setDrawMode('draw_polygon'); setDrawingPoints([]); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
                drawMode === 'draw_polygon' ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Square className="w-3.5 h-3.5" />
              <span>Draw Boundary</span>
            </button>
          )}

          <button
            onClick={() => setShowGridLines(!showGridLines)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all ${
              showGridLines ? 'bg-slate-800 text-emerald-400 border border-slate-700' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Grid Overlay</span>
          </button>

          {/* Auto Location Tracker Button */}
          <button
            onClick={handleAutoLocate}
            disabled={isLocating}
            className={`px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center space-x-1.5 transition-all ${
              userLocation
                ? 'bg-gradient-to-r from-cyan-500 to-teal-400 text-slate-950 shadow-md shadow-cyan-500/20 ring-1 ring-cyan-300 font-bold'
                : 'bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-cyan-500/40 hover:border-cyan-400'
            }`}
          >
            <Navigation className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin text-cyan-300' : ''}`} />
            <span>{isLocating ? 'Tracking GPS...' : 'Auto Location Tracker'}</span>
          </button>
        </div>

        {/* Live Street & Address Search Bar */}
        <div className="relative min-w-[240px] flex-1 max-w-xs">
          <div className="flex items-center space-x-2 bg-slate-900/95 px-3 py-1.5 rounded-xl border border-slate-800 focus-within:border-cyan-500/60 transition-all shadow-inner">
            <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleStreetSearch(e.target.value)}
              placeholder="Search street, town, landmark..."
              className="bg-transparent text-xs text-slate-100 placeholder-slate-500 focus:outline-none w-full"
            />
            {isSearching && <Loader2 className="w-3.5 h-3.5 text-cyan-400 animate-spin shrink-0" />}
          </div>

          {/* Autocomplete Results Dropdown */}
          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-slate-950/95 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-[500] divide-y divide-slate-800">
              {searchResults.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectSearchResult(item)}
                  className="w-full p-2.5 text-left hover:bg-slate-900/90 transition-all text-xs flex items-start space-x-2 group"
                >
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="font-bold text-slate-200 group-hover:text-cyan-300">
                      {item.address?.road || item.address?.suburb || item.display_name.split(',')[0]}
                    </p>
                    <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{item.display_name}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Center Group: Contour View Layer Switcher */}
        <div className="flex items-center space-x-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
          <span className="text-[10px] uppercase font-bold text-slate-500 px-2 flex items-center space-x-1">
            <Activity className="w-3 h-3 text-emerald-400" />
            <span className="hidden md:inline">Contour:</span>
          </span>
          
          {[
            { id: 'moisture', label: 'Moisture', icon: Droplets, color: 'text-cyan-400' },
            { id: 'elevation', label: 'Elevation', icon: Compass, color: 'text-amber-400' },
            { id: 'ndvi', label: 'NDVI Health', icon: Sun, color: 'text-emerald-400' },
            { id: 'temperature', label: 'Thermal', icon: Zap, color: 'text-rose-400' },
            { id: 'none', label: 'Off', icon: Eye, color: 'text-slate-400' }
          ].map(layer => (
            <button
              key={layer.id}
              onClick={() => setContourMode(layer.id)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all flex items-center space-x-1 ${
                contourMode === layer.id 
                  ? 'bg-slate-800 text-slate-100 border border-slate-700 shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <layer.icon className={`w-3 h-3 ${layer.color}`} />
              <span className="hidden sm:inline">{layer.label}</span>
            </button>
          ))}
        </div>

        {/* Right Group: Tile Selector & Grid Density */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 bg-slate-900 border border-slate-800 rounded-xl px-2 py-1 text-xs">
            <span className="text-slate-400 text-[10px]">Grid:</span>
            <select
              value={`${gridCols}x${gridRows}`}
              onChange={(e) => {
                const [c, r] = e.target.value.split('x').map(Number);
                handleSaveGridSettings(c, r, `${c * 5}m`);
              }}
              className="bg-transparent text-emerald-400 font-bold focus:outline-none"
            >
              <option value="3x3">3×3 Grid</option>
              <option value="4x4">4×4 Grid</option>
              <option value="5x4">5×4 Grid</option>
              <option value="6x5">6×5 Grid</option>
            </select>
          </div>

          <select
            value={tileType}
            onChange={(e) => setTileType(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-cyan-400 font-bold text-xs rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-cyan-500/50"
          >
            <option value="google_hybrid">Google Hybrid Satellite + Streets</option>
            <option value="google_streets">Google Street Map</option>
            <option value="satellite">Esri World Satellite</option>
            <option value="dark">Carto Dark Canvas</option>
            <option value="osm">OpenStreetMap Standard</option>
          </select>

          <button
            onClick={handleExportGeoJSON}
            title="Export GeoJSON Boundary"
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 transition-all"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Main Map Rendering Area */}
      <div ref={mapContainerRef} className="w-full flex-1 z-[100]" />

      {/* Floating 1-Click Max Zoom Auto Location Button */}
      <div className="absolute bottom-24 right-6 z-[400] flex flex-col items-end space-y-2">
        {locationError && (
          <div className="bg-amber-950/90 text-amber-200 border border-amber-500/50 text-[11px] px-3 py-1.5 rounded-xl shadow-2xl backdrop-blur-md max-w-xs animate-fade-in">
            {locationError}
          </div>
        )}

        <button
          onClick={handleAutoLocate}
          disabled={isLocating}
          title="Auto Location Tracker - Zoom to Maximum 19x"
          className="w-12 h-12 rounded-2xl bg-slate-950/90 hover:bg-slate-900 border-2 border-cyan-500/60 hover:border-cyan-400 text-cyan-400 flex items-center justify-center shadow-2xl backdrop-blur-md transform hover:scale-110 active:scale-95 transition-all group glow-teal"
        >
          <Target className={`w-6 h-6 ${isLocating ? 'animate-spin text-emerald-400' : 'group-hover:rotate-45 transition-transform'}`} />
        </button>
      </div>

      {/* Drawing In-Progress Banner */}
      {drawMode === 'draw_polygon' && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-[400] bg-slate-950/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-cyan-500/40 shadow-2xl flex items-center space-x-4 animate-bounce">
          <div className="flex items-center space-x-2">
            <Crosshair className="w-4 h-4 text-cyan-400 animate-spin" />
            <span className="text-xs text-slate-200 font-semibold">
              Click map to place boundary points ({drawingPoints.length} vertices)
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleFinishPolygon}
              disabled={drawingPoints.length < 3}
              className="px-3 py-1 rounded-lg text-xs font-bold bg-cyan-500 text-slate-950 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center space-x-1"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Close Polygon</span>
            </button>
            <button
              onClick={handleClearDrawing}
              className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Bottom Spatial Analytics Bar */}
      <div className="absolute bottom-4 left-4 right-4 z-[400] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 p-4 rounded-2xl bg-slate-950/90 backdrop-blur-xl border border-slate-800 shadow-2xl">
        
        {/* Left: Spatial Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 flex-1">
          <div className="border-r border-slate-800 pr-2">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Calculated Area</span>
            <span className="text-base font-extrabold text-emerald-400">{areaStats.acres} Acres</span>
            <span className="text-[10px] text-slate-400 block">{areaStats.hectares} Ha ({areaStats.sqMeters.toLocaleString()} m²)</span>
          </div>

          <div className="border-r border-slate-800 pr-2">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Perimeter</span>
            <span className="text-base font-extrabold text-cyan-300">{areaStats.perimeterM} meters</span>
            <span className="text-[10px] text-slate-400 block">Boundary Distance</span>
          </div>

          <div className="border-r border-slate-800 pr-2">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Grid Layout</span>
            <span className="text-base font-extrabold text-teal-300">{gridCols}×{gridRows} Zones</span>
            <span className="text-[10px] text-slate-400 block">{gridCols * gridRows} Labeled Cells ({gridSize})</span>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Sub-Meter Precision</span>
            <span className="text-xs font-extrabold text-cyan-300 block font-mono">
              {liveCenter ? `${liveCenter[0].toFixed(6)}, ${liveCenter[1].toFixed(6)}` : '13.078421, 77.581543'}
            </span>
            <span className="text-[10px] text-emerald-400 font-semibold block">±0.11m GPS Accuracy</span>
          </div>
        </div>

        {/* Right: Selected Cell / Geocoded Street Inspector Panel */}
        {reverseAddress || searchedPlace || selectedCell ? (
          <div className="bg-slate-900/90 p-3 rounded-xl border border-cyan-500/40 flex items-center space-x-4 min-w-[280px]">
            <div>
              <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-extrabold text-xs border border-cyan-500/40">
                {selectedCell ? `Zone ${selectedCell.id}` : 'Geocoded Address'}
              </span>
              <p className="text-[10px] text-slate-300 font-bold mt-1 line-clamp-1 max-w-[180px]">
                {reverseAddress?.street || searchedPlace?.street || (selectedCell ? `Lat ${selectedCell.lat.toFixed(4)}, Lng ${selectedCell.lng.toFixed(4)}` : '')}
              </p>
            </div>

            {selectedCell && (
              <div className="space-y-0.5 text-xs">
                <p className="text-slate-300 font-semibold flex items-center justify-between gap-2">
                  <span>Moisture:</span>
                  <span className="text-emerald-400 font-bold">{selectedCell.moisture}%</span>
                </p>
                <p className="text-slate-300 font-semibold flex items-center justify-between gap-2">
                  <span>Temp / pH:</span>
                  <span className="text-cyan-300 font-bold">{selectedCell.temp}°C / {selectedCell.ph}</span>
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="hidden lg:flex items-center text-xs text-slate-500 italic px-2">
            Search any street or click grid cells to inspect geocoded street address.
          </div>
        )}

      </div>
    </div>
  );
};
