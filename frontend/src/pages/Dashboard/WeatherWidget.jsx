import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Wind, 
  Compass, 
  Droplets, 
  MapPin, 
  Navigation, 
  CloudRain, 
  X, 
  Search, 
  Check, 
  LocateFixed, 
  SlidersHorizontal,
  Map as MapIcon 
} from 'lucide-react';
import { 
  fetchLiveWeather, 
  detectUserLocation, 
  COIMBATORE_AREA_PRESETS, 
  searchLocations, 
  saveUserLocation, 
  getFallbackLocation 
} from '../../services/weatherService';
import { FarmMapPicker } from '../../components/FarmMapPicker';
import { useLanguage } from '../../context/LanguageContext';
import { 
  ComposedChart, 
  Area, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid 
} from 'recharts';

export const WeatherWidget = () => {
  const { t } = useLanguage();
  const [chartHorizon, setChartHorizon] = useState('24h');
  const [showTemp, setShowTemp] = useState(true);
  const [showHumidity, setShowHumidity] = useState(true);
  const [showRain, setShowRain] = useState(true);
  const [weather, setWeather] = useState({
    temp: 28.6,
    humidity: 65,
    windSpeed: 12,
    pressure: 1014,
    condition: 'Partly Cloudy',
    rainMm: 0,
    city: 'Coimbatore',
    state: 'Tamil Nadu'
  });
  
  const [location, setLocation] = useState(() => {
    const cached = localStorage.getItem('agrisense_user_location');
    return cached ? JSON.parse(cached) : getFallbackLocation();
  });
  
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showMapPicker, setShowMapPicker] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [customAreaName, setCustomAreaName] = useState('');

  const loadLiveWeather = async (lat, lon) => {
    setLoading(true);
    const data = await fetchLiveWeather(lat, lon);
    setWeather(data);
    setLoading(false);
  };

  const handleAutoLocate = async () => {
    setLoading(true);
    const loc = await detectUserLocation();
    setLocation(loc);
    await loadLiveWeather(loc.lat, loc.lon);
    setLoading(false);
  };

  const handleSelectPreset = async (preset) => {
    const loc = {
      lat: preset.lat,
      lon: preset.lon,
      area: preset.name,
      city: 'Coimbatore',
      state: 'Tamil Nadu',
      country: 'IN',
      formatted: preset.formatted,
      accuracyText: 'Pinpoint Preset',
      timestamp: new Date().toISOString()
    };
    saveUserLocation(loc);
    setLocation(loc);
    await loadLiveWeather(loc.lat, loc.lon);
    setShowModal(false);
  };

  const handleSearchSubmit = async (e) => {
    e?.preventDefault();
    if (!searchQuery.trim()) return;
    setSearching(true);
    const results = await searchLocations(searchQuery);
    setSearchResults(results);
    setSearching(false);
  };

  const handleSelectSearchResult = async (item) => {
    const loc = {
      lat: item.lat,
      lon: item.lon,
      area: item.area,
      city: item.city,
      state: item.state,
      country: 'IN',
      formatted: item.formatted,
      accuracyText: 'Search Pinpoint',
      timestamp: new Date().toISOString()
    };
    saveUserLocation(loc);
    setLocation(loc);
    await loadLiveWeather(loc.lat, loc.lon);
    setShowModal(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleCustomSave = async () => {
    if (!customAreaName.trim()) return;
    const loc = {
      ...location,
      area: customAreaName.trim(),
      formatted: `${customAreaName.trim()}, Coimbatore, Tamil Nadu`,
      accuracyText: 'User Verified Area'
    };
    saveUserLocation(loc);
    setLocation(loc);
    await loadLiveWeather(loc.lat, loc.lon);
    setShowModal(false);
    setCustomAreaName('');
  };

  useEffect(() => {
    const handleLocationUpdate = (e) => {
      if (e.detail) {
        setLocation(e.detail);
        loadLiveWeather(e.detail.lat, e.detail.lon);
      }
    };
    window.addEventListener('agrisense_location_updated', handleLocationUpdate);

    // Initial load
    const cached = localStorage.getItem('agrisense_user_location');
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        setLocation(parsed);
        loadLiveWeather(parsed.lat, parsed.lon);
        return () => window.removeEventListener('agrisense_location_updated', handleLocationUpdate);
      } catch {}
    }

    detectUserLocation().then(loc => {
      setLocation(loc);
      loadLiveWeather(loc.lat, loc.lon);
    });

    return () => window.removeEventListener('agrisense_location_updated', handleLocationUpdate);
  }, []);

  return (
    <>
      <div className="space-y-6 font-sans">
        {/* Main Weather Overview Card */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm space-y-4 eco-card">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center space-x-2 font-['Manrope',_sans-serif]">
              <Sun className="w-5 h-5 text-amber-500" />
              <span>{t('Local Microclimate Weather')}</span>
            </h3>
            
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowModal(true)}
                className="text-xs text-slate-700 font-extrabold flex items-center space-x-1.5 bg-stone-100 hover:bg-stone-200/80 px-3 py-1.5 rounded-xl transition-all cursor-pointer border border-stone-200"
                title="Click to refine location / select Coimbatore area"
              >
                <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                <span className="truncate max-w-[220px]">{location.formatted}</span>
                <SlidersHorizontal className="w-3 h-3 text-stone-500 ml-1" />
              </button>
              
              <button
                onClick={handleAutoLocate}
                disabled={loading}
                className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 transition-colors cursor-pointer border border-emerald-200/60"
                title="Auto-Detect GPS Location"
              >
                <Navigation className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* Location Precision Badge */}
          {location.accuracyText && (
            <div className="flex items-center justify-between text-[11px] text-stone-500 px-1 pt-0.5 border-b border-stone-100 pb-3">
              <span className="flex items-center space-x-1.5 font-medium">
                <LocateFixed className="w-3 h-3 text-emerald-600" />
                <span>{t(location.accuracyText)}</span>
              </span>
              <span className="font-mono text-[10px] text-stone-400">
                {location.lat?.toFixed(4)}°N, {location.lon?.toFixed(4)}°E
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="flex items-center space-x-4 p-4 bg-amber-50/60 border border-amber-200/60 rounded-2xl">
              <div className="p-3 bg-amber-100 rounded-2xl border border-amber-200 shrink-0">
                {weather.rainMm > 0 ? (
                  <CloudRain className="w-8 h-8 text-blue-600" />
                ) : (
                  <Sun className="w-8 h-8 text-amber-600" />
                )}
              </div>
              <div>
                <div className="text-3xl font-black text-slate-900 font-['Manrope',_sans-serif]">
                  {weather.temp}°C
                </div>
                <div className="text-xs text-slate-600 font-bold">
                  {t(weather.condition)}
                </div>
              </div>
            </div>

            <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">{t('Humidity')}</span>
                <span className="text-xl font-black text-stone-900">{weather.humidity}%</span>
                <span className="text-[10px] text-emerald-700 font-semibold block">{t('Moisture Comfort')}</span>
              </div>
              <Droplets className="w-7 h-7 text-blue-500 opacity-80" />
            </div>

            <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">{t('Wind')}</span>
                <span className="text-xl font-black text-stone-900">{weather.windSpeed} km/h</span>
                <span className="text-[10px] text-stone-600 font-semibold block">NE • {t('Gentle Breeze')}</span>
              </div>
              <Wind className="w-7 h-7 text-teal-600 opacity-80" />
            </div>

            <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">{t('Barometer')}</span>
                <span className="text-xl font-black text-stone-900">{weather.pressure} hPa</span>
                <span className="text-[10px] text-emerald-700 font-semibold block">{t('Pressure Trend')}: {t('Stable')}</span>
              </div>
              <Compass className="w-7 h-7 text-indigo-500 opacity-80" />
            </div>
          </div>
        </div>

        {/* Individual Detailed Weather Parameters Cards Grid */}
        <div className="space-y-3">
          <h3 className="text-sm font-black text-stone-900 uppercase tracking-wider font-['Manrope',_sans-serif]">
            {t('Individual Weather Parameter Cards')}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* 1. Temperature & Heat Index */}
            <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-3 eco-card">
              <div className="flex items-center justify-between text-xs text-stone-600 font-bold border-b border-stone-100 pb-2">
                <span className="flex items-center space-x-2">
                  <Sun className="w-4 h-4 text-amber-500" />
                  <span>{t('Temperature & Heat Index')}</span>
                </span>
                <span className="px-2 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 font-bold text-[10px] rounded-full">{t('Normal')}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-[10px] text-stone-500 block">{t('Feels Like')}</span>
                  <span className="font-extrabold text-stone-900 text-sm">{(weather.temp + 1.2).toFixed(1)}°C</span>
                </div>
                <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-[10px] text-stone-500 block">{t('Dew Point')}</span>
                  <span className="font-extrabold text-stone-900 text-sm">19.4°C</span>
                </div>
                <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200 col-span-2 flex justify-between items-center">
                  <span className="text-[10px] text-stone-500">{t('Min / Max Temp')}</span>
                  <span className="font-bold text-stone-800">22.5°C / 31.0°C</span>
                </div>
              </div>
            </div>

            {/* 2. Relative Humidity & Evapotranspiration */}
            <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-3 eco-card">
              <div className="flex items-center justify-between text-xs text-stone-600 font-bold border-b border-stone-100 pb-2">
                <span className="flex items-center space-x-2">
                  <Droplets className="w-4 h-4 text-blue-500" />
                  <span>{t('Relative Humidity')}</span>
                </span>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-900 border border-blue-300 font-bold text-[10px] rounded-full">{t('Optimal')}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-[10px] text-stone-500 block">{t('Humidity')}</span>
                  <span className="font-extrabold text-stone-900 text-sm">{weather.humidity}%</span>
                </div>
                <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-[10px] text-stone-500 block">{t('Evapotranspiration (ET0)')}</span>
                  <span className="font-extrabold text-stone-900 text-sm">4.5 mm/day</span>
                </div>
                <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200 col-span-2 flex justify-between items-center">
                  <span className="text-[10px] text-stone-500">{t('Vapor Pressure Deficit')}</span>
                  <span className="font-bold text-stone-800">1.25 kPa</span>
                </div>
              </div>
            </div>

            {/* 3. Wind & Gust Dynamics */}
            <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-3 eco-card">
              <div className="flex items-center justify-between text-xs text-stone-600 font-bold border-b border-stone-100 pb-2">
                <span className="flex items-center space-x-2">
                  <Wind className="w-4 h-4 text-teal-600" />
                  <span>{t('Wind & Gust Dynamics')}</span>
                </span>
                <span className="px-2 py-0.5 bg-teal-100 text-teal-900 border border-teal-300 font-bold text-[10px] rounded-full">NE 45°</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-[10px] text-stone-500 block">{t('Wind Speed')}</span>
                  <span className="font-extrabold text-stone-900 text-sm">{weather.windSpeed} km/h</span>
                </div>
                <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-[10px] text-stone-500 block">{t('Wind Gust')}</span>
                  <span className="font-extrabold text-stone-900 text-sm">18.2 km/h</span>
                </div>
                <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200 col-span-2 flex justify-between items-center">
                  <span className="text-[10px] text-stone-500">{t('Beaufort Scale')}</span>
                  <span className="font-bold text-stone-800">Level 3 ({t('Gentle Breeze')})</span>
                </div>
              </div>
            </div>

            {/* 4. Barometric Pressure */}
            <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-3 eco-card">
              <div className="flex items-center justify-between text-xs text-stone-600 font-bold border-b border-stone-100 pb-2">
                <span className="flex items-center space-x-2">
                  <Compass className="w-4 h-4 text-indigo-500" />
                  <span>{t('Barometric Pressure')}</span>
                </span>
                <span className="px-2 py-0.5 bg-indigo-100 text-indigo-900 border border-indigo-300 font-bold text-[10px] rounded-full">1014 hPa</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-[10px] text-stone-500 block">{t('Pressure Trend')}</span>
                  <span className="font-extrabold text-emerald-800 text-sm">↑ {t('Stable')}</span>
                </div>
                <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-[10px] text-stone-500 block">{t('Elevation')}</span>
                  <span className="font-extrabold text-stone-900 text-sm">411 m ASL</span>
                </div>
                <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200 col-span-2 flex justify-between items-center">
                  <span className="text-[10px] text-stone-500">{t('Sea Level Pressure')}</span>
                  <span className="font-bold text-stone-800">1016.2 hPa</span>
                </div>
              </div>
            </div>

            {/* 5. Solar Radiation & UV Index */}
            <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-3 eco-card">
              <div className="flex items-center justify-between text-xs text-stone-600 font-bold border-b border-stone-100 pb-2">
                <span className="flex items-center space-x-2">
                  <Sun className="w-4 h-4 text-amber-500" />
                  <span>{t('Solar Radiation & UV')}</span>
                </span>
                <span className="px-2 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 font-bold text-[10px] rounded-full">UV Index 6</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-[10px] text-stone-500 block">{t('Solar Radiation')}</span>
                  <span className="font-extrabold text-stone-900 text-sm">680 W/m²</span>
                </div>
                <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-[10px] text-stone-500 block">{t('Sunlight Duration')}</span>
                  <span className="font-extrabold text-stone-900 text-sm">8.5 hrs</span>
                </div>
                <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200 col-span-2 flex justify-between items-center">
                  <span className="text-[10px] text-stone-500">{t('Sunrise / Sunset')}</span>
                  <span className="font-bold text-stone-800">06:08 AM / 06:42 PM</span>
                </div>
              </div>
            </div>

            {/* 6. Precipitation & Rain Risk */}
            <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-3 eco-card">
              <div className="flex items-center justify-between text-xs text-stone-600 font-bold border-b border-stone-100 pb-2">
                <span className="flex items-center space-x-2">
                  <CloudRain className="w-4 h-4 text-blue-500" />
                  <span>{t('Precipitation & Rain Risk')}</span>
                </span>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-[10px] rounded-full">15% {t('Rain')}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-[10px] text-stone-500 block">{t('Rain Probability')}</span>
                  <span className="font-extrabold text-stone-900 text-sm">15%</span>
                </div>
                <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200">
                  <span className="text-[10px] text-stone-500 block">{t('24h Rain Accumulation')}</span>
                  <span className="font-extrabold text-stone-900 text-sm">{weather.rainMm} mm</span>
                </div>
                <div className="p-2.5 bg-stone-50 rounded-xl border border-stone-200 col-span-2 flex justify-between items-center">
                  <span className="text-[10px] text-stone-500">{t('Soil Saturation Impact')}</span>
                  <span className="font-bold text-emerald-800">{t('Drip Irrigation Recommended')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Weather Analytics Chart Suite */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-5 eco-card font-sans">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100 pb-4">
            <div>
              <h3 className="text-sm font-black text-stone-900 uppercase tracking-wider font-['Manrope',_sans-serif]">
                {t('Interactive Weather Analytics Chart')}
              </h3>
              <p className="text-xs text-stone-500 font-medium">{t('Hover over any data point for detailed microclimate readings.')}</p>
            </div>

            {/* Time Horizon Switcher & Metric Toggles */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200 text-xs font-bold">
                <button
                  onClick={() => setChartHorizon('24h')}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${chartHorizon === '24h' ? 'bg-emerald-800 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'}`}
                >
                  {t('24 Hours')}
                </button>
                <button
                  onClick={() => setChartHorizon('7d')}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${chartHorizon === '7d' ? 'bg-emerald-800 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'}`}
                >
                  {t('7 Days')}
                </button>
                <button
                  onClick={() => setChartHorizon('30d')}
                  className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${chartHorizon === '30d' ? 'bg-emerald-800 text-white shadow-xs' : 'text-stone-600 hover:text-stone-900'}`}
                >
                  {t('30 Days')}
                </button>
              </div>

              <div className="flex items-center space-x-1.5 text-xs font-bold bg-stone-50 p-1.5 rounded-xl border border-stone-200">
                <button
                  onClick={() => setShowTemp(!showTemp)}
                  className={`px-2.5 py-0.5 rounded-lg border text-[11px] transition-all cursor-pointer ${showTemp ? 'bg-amber-100 text-amber-900 border-amber-300' : 'bg-stone-100 text-stone-400 border-stone-200'}`}
                >
                  🌡️ {t('Temperature')}
                </button>
                <button
                  onClick={() => setShowHumidity(!showHumidity)}
                  className={`px-2.5 py-0.5 rounded-lg border text-[11px] transition-all cursor-pointer ${showHumidity ? 'bg-teal-100 text-teal-900 border-teal-300' : 'bg-stone-100 text-stone-400 border-stone-200'}`}
                >
                  💧 {t('Humidity')}
                </button>
                <button
                  onClick={() => setShowRain(!showRain)}
                  className={`px-2.5 py-0.5 rounded-lg border text-[11px] transition-all cursor-pointer ${showRain ? 'bg-blue-100 text-blue-900 border-blue-300' : 'bg-stone-100 text-stone-400 border-stone-200'}`}
                >
                  🌧️ {t('Rain')}
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Recharts Composed Chart */}
          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={
                  chartHorizon === '24h' ? [
                    { time: '00:00', temp: 21.2, humidity: 78, rain: 0 },
                    { time: '03:00', temp: 20.1, humidity: 82, rain: 0 },
                    { time: '06:00', temp: 22.4, humidity: 75, rain: 5 },
                    { time: '09:00', temp: 25.8, humidity: 68, rain: 10 },
                    { time: '12:00', temp: 29.3, humidity: 58, rain: 15 },
                    { time: '15:00', temp: 31.0, humidity: 52, rain: 20 },
                    { time: '18:00', temp: 27.5, humidity: 62, rain: 10 },
                    { time: '21:00', temp: 24.1, humidity: 72, rain: 5 },
                  ] : chartHorizon === '7d' ? [
                    { time: t('Mon'), temp: 31, humidity: 65, rain: 10 },
                    { time: t('Tue'), temp: 32, humidity: 60, rain: 15 },
                    { time: t('Wed'), temp: 30, humidity: 72, rain: 35 },
                    { time: t('Thu'), temp: 28, humidity: 80, rain: 60 },
                    { time: t('Fri'), temp: 29, humidity: 70, rain: 20 },
                    { time: t('Sat'), temp: 31, humidity: 64, rain: 10 },
                    { time: t('Sun'), temp: 32, humidity: 58, rain: 5 },
                  ] : [
                    { time: 'Week 1', temp: 29.5, humidity: 68, rain: 25 },
                    { time: 'Week 2', temp: 30.8, humidity: 62, rain: 15 },
                    { time: 'Week 3', temp: 28.2, humidity: 76, rain: 80 },
                    { time: 'Week 4', temp: 27.4, humidity: 81, rain: 110 },
                  ]
                }
              >
                <defs>
                  <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
                <XAxis dataKey="time" stroke="#78716c" fontSize={11} fontWeight="bold" />
                <YAxis yAxisId="left" stroke="#78716c" fontSize={11} />
                <YAxis yAxisId="right" orientation="right" stroke="#3b82f6" fontSize={11} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-stone-900 text-stone-100 p-3 rounded-2xl shadow-xl border border-stone-700 text-xs space-y-1.5 font-sans">
                          <div className="font-extrabold text-lime-400 border-b border-stone-700 pb-1 flex justify-between gap-4">
                            <span>{t('Selected Period')}: {label}</span>
                          </div>
                          {payload.map((entry, index) => (
                            <div key={index} className="flex justify-between items-center space-x-4">
                              <span className="text-stone-400 font-medium">{t(entry.name)}:</span>
                              <span className="font-extrabold text-white">
                                {entry.value} {entry.name === 'temp' ? '°C' : '%'}
                              </span>
                            </div>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                {showRain && <Bar yAxisId="right" dataKey="rain" name="Rain" fill="#3b82f6" opacity={0.6} radius={[6, 6, 0, 0]} />}
                {showTemp && <Area yAxisId="left" type="monotone" dataKey="temp" name="temp" stroke="#f59e0b" strokeWidth={3} fill="url(#tempGradient)" />}
                {showHumidity && <Line yAxisId="left" type="monotone" dataKey="humidity" name="humidity" stroke="#0d9488" strokeWidth={2.5} dot={{ r: 4 }} />}
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 7-Day Agronomic Weather Forecast Grid */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-4 eco-card">
          <h3 className="text-xs font-black text-stone-900 uppercase tracking-wider font-['Manrope',_sans-serif]">
            {t('7-Day Agronomic Forecast')}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-xs">
            {[
              { day: 'Mon', high: 31, low: 22, rain: 10, cond: 'Partly Cloudy' },
              { day: 'Tue', high: 32, low: 23, rain: 15, cond: 'Sunny' },
              { day: 'Wed', high: 30, low: 22, rain: 35, cond: 'Light Rain' },
              { day: 'Thu', high: 28, low: 21, rain: 60, cond: 'Showers' },
              { day: 'Fri', high: 29, low: 22, rain: 20, cond: 'Partly Cloudy' },
              { day: 'Sat', high: 31, low: 23, rain: 10, cond: 'Sunny' },
              { day: 'Sun', high: 32, low: 24, rain: 5, cond: 'Clear' },
            ].map((f, i) => (
              <div key={i} className="p-3 bg-stone-50 border border-stone-200 rounded-xl space-y-1 text-center">
                <span className="font-extrabold text-stone-900 block text-xs">{t(f.day)}</span>
                <span className="text-[10px] text-stone-500 font-medium block truncate">{t(f.cond)}</span>
                <span className="text-xs font-black text-stone-800 block">{f.high}° / {f.low}°</span>
                <span className="text-[10px] text-blue-600 font-bold block">{f.rain}% {t('Rain')}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Location Refinement & Area Selector Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl border border-stone-200 shadow-2xl max-w-lg w-full p-6 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 bg-rose-50 rounded-xl border border-rose-100 text-rose-600">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-stone-900 text-base">Optimize Location Accuracy</h3>
                  <p className="text-xs text-stone-500">Pinpoint your exact area in Coimbatore or search custom locations</p>
                </div>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="p-2 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Current Active Location Card */}
            <div className="p-3.5 bg-emerald-50/80 border border-emerald-200/80 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">Current Active Location</span>
                <span className="font-black text-stone-900 text-sm block">{location.formatted}</span>
                <span className="text-[11px] text-stone-500 font-mono">GPS: {location.lat?.toFixed(4)}°, {location.lon?.toFixed(4)}° • {location.accuracyText || 'High Precision'}</span>
              </div>
              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={() => setShowMapPicker(true)}
                  className="px-3 py-2 bg-stone-900 hover:bg-stone-800 text-lime-300 font-bold rounded-xl text-xs flex items-center space-x-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <MapIcon className="w-3.5 h-3.5 text-lime-400" />
                  <span>Pin on Map</span>
                </button>
                <button
                  onClick={handleAutoLocate}
                  disabled={loading}
                  className="px-3 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs flex items-center space-x-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <Navigation className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                  <span>{loading ? 'Locating...' : 'Auto-GPS'}</span>
                </button>
              </div>
            </div>

            {/* Coimbatore Area Presets */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-stone-800 uppercase tracking-wider block flex items-center justify-between">
                <span>Coimbatore Neighborhood Presets</span>
                <span className="text-[10px] text-stone-400 font-normal">Click to set pinpoint coords</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {COIMBATORE_AREA_PRESETS.map((preset) => {
                  const isSelected = location.formatted?.includes(preset.name) || (Math.abs(location.lat - preset.lat) < 0.005 && Math.abs(location.lon - preset.lon) < 0.005);
                  return (
                    <button
                      key={preset.name}
                      onClick={() => handleSelectPreset(preset)}
                      className={`p-2.5 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                        isSelected 
                          ? 'bg-stone-900 text-lime-300 border-stone-900 shadow-sm' 
                          : 'bg-stone-50 hover:bg-stone-100 text-stone-800 border-stone-200'
                      }`}
                    >
                      <span className="truncate">{preset.name}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-lime-400 shrink-0 ml-1" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Live Location Search */}
            <div className="space-y-2 pt-2 border-t border-stone-100">
              <label className="text-xs font-extrabold text-stone-800 uppercase tracking-wider block">
                Search Any Area / Village Name
              </label>
              <form onSubmit={handleSearchSubmit} className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g. Peelamedu, Gandhipuram, Saravanampatti..."
                    className="w-full pl-9 pr-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-emerald-600"
                  />
                </div>
                <button
                  type="submit"
                  disabled={searching}
                  className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  {searching ? 'Searching...' : 'Search'}
                </button>
              </form>

              {/* Search Results Dropdown */}
              {searchResults.length > 0 && (
                <div className="space-y-1 max-h-40 overflow-y-auto border border-stone-200 rounded-xl p-1 bg-stone-50">
                  {searchResults.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectSearchResult(item)}
                      className="w-full text-left p-2 rounded-lg hover:bg-emerald-100 text-xs text-stone-800 flex items-center justify-between transition-colors"
                    >
                      <div>
                        <span className="font-bold block">{item.area}</span>
                        <span className="text-[10px] text-stone-500 truncate block">{item.formatted}</span>
                      </div>
                      <span className="text-[10px] font-mono text-stone-400">{item.lat.toFixed(3)}, {item.lon.toFixed(3)}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Manual Custom Area Name Override */}
            <div className="space-y-2 pt-2 border-t border-stone-100">
              <label className="text-xs font-extrabold text-stone-800 uppercase tracking-wider block">
                Manual Area Label Override
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customAreaName}
                  onChange={(e) => setCustomAreaName(e.target.value)}
                  placeholder="Enter exact area (e.g. RS Puram West Ag Hub)"
                  className="flex-1 px-3 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-900 focus:outline-none focus:border-emerald-600"
                />
                <button
                  onClick={handleCustomSave}
                  disabled={!customAreaName.trim()}
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Apply Label
                </button>
              </div>
            </div>

            {/* Footer Close */}
            <div className="pt-3 border-t border-stone-100 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs rounded-xl transition-colors cursor-pointer"
              >
                Close Location Tuner
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Map Pin Dropper Modal */}
      {showMapPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-4xl max-h-[95vh] overflow-y-auto">
            <FarmMapPicker
              initialLat={location.lat}
              initialLon={location.lon}
              initialArea={location.formatted || 'Coimbatore, Tamil Nadu'}
              onSave={async (locData) => {
                setLocation(locData);
                await loadLiveWeather(locData.lat, locData.lon);
                setShowMapPicker(false);
                setShowModal(false);
              }}
              onClose={() => setShowMapPicker(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};


