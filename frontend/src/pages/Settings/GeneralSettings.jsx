import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  Sliders, 
  Sparkles, 
  Bell, 
  Key, 
  Save, 
  CheckCircle, 
  Copy, 
  Check, 
  Eye, 
  EyeOff, 
  Gauge, 
  Thermometer, 
  Droplets,
  CloudSun,
  Server,
  Navigation,
  MapPin,
  RotateCcw,
  Scale,
  FileCheck,
  Download,
  RefreshCw,
  PhoneCall,
  MessageSquare,
  Zap,
  Send,
  CheckCircle2,
  User,
  Shield,
  Monitor,
  Sprout,
  CloudRain,
  ShieldAlert,
  Clock,
  Cpu,
  Wifi,
  Palette,
  HardDrive,
  HelpCircle,
  Info,
  Lock,
  Search
} from 'lucide-react';
import { 
  getWeatherApiKey, 
  setWeatherApiKey, 
  detectUserLocation, 
  fetchLiveWeather,
  COIMBATORE_AREA_PRESETS,
  saveUserLocation
} from '../../services/weatherService';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { TermsModal } from '../../components/TermsModal';
import { LanguageSelector } from '../../components/LanguageSelector';

export const GeneralSettings = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const rightPanelRef = React.useRef(null);

  // Navigation State: 17 Main Categories & Active Sub-Tab
  const [activeCategory, setActiveCategory] = useState('account');
  const [activeSubTab, setActiveSubTab] = useState('personal');

  const handleCategorySelect = (catId, subTabId = null) => {
    setActiveCategory(catId);
    if (subTabId) {
      setActiveSubTab(subTabId);
    }
    if (rightPanelRef.current) {
      rightPanelRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  const [searchQuery, setSearchQuery] = useState('');

  // Toast Notifications State
  const [savedToast, setSavedToast] = useState(false);
  const [resetToast, setResetToast] = useState(false);
  const [exportToast, setExportToast] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  // Account State
  const [name, setName] = useState(user?.name || 'Aathi (Lead Farmer)');
  const [email, setEmail] = useState(user?.email || 'farmer@agrisense.io');
  const [phone, setPhone] = useState('98422 12345');
  const [secPhone, setSecPhone] = useState('94431 88990');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordToast, setPasswordToast] = useState(false);

  // Farm State
  const [farmName, setFarmName] = useState('Green Valley Organics');
  const [cropType, setCropType] = useState('Tomato & Maize');
  const [soilType, setSoilType] = useState('Red Loamy Soil');
  const [targetYield, setTargetYield] = useState('12.5 Tons / Acre');

  // Irrigation & Automation State
  const [irrigationMode, setIrrigationMode] = useState('auto');
  const [moistureMin, setMoistureMin] = useState(30);
  const [moistureMax, setMoistureMax] = useState(70);
  const [rainBypass, setRainBypass] = useState(true);
  const [tankCutoff, setTankCutoff] = useState(15);
  const [maxRuntime, setMaxRuntime] = useState(45); // minutes

  // Sensor Alert Boundaries State
  const [tempMin, setTempMin] = useState(12);
  const [tempMax, setTempMax] = useState(38);
  const [humidityMin, setHumidityMin] = useState(40);
  const [humidityMax, setHumidityMax] = useState(85);
  const [phMin, setPhMin] = useState(5.5);
  const [phMax, setPhMax] = useState(7.5);

  // AI & Devices State
  const [aiModel, setAiModel] = useState('v2.4');
  const [confidenceThreshold, setConfidenceThreshold] = useState(85);
  const [mqttBroker, setMqttBroker] = useState('mqtts://telemetry.agrisense.io:8883');
  const [weatherKey, setWeatherKey] = useState(() => getWeatherApiKey());
  const [showWeatherKey, setShowWeatherKey] = useState(false);
  const [copiedWeatherKey, setCopiedWeatherKey] = useState(false);
  const [weatherTestStatus, setWeatherTestStatus] = useState(null);

  // Appearance & Units State
  const [tempUnit, setTempUnit] = useState('celsius');
  const [moistureUnit, setMoistureUnit] = useState('vwc');
  const [landUnit, setLandUnit] = useState('acres');
  const [timezone, setTimezone] = useState('ist');
  const [clockFormat, setClockFormat] = useState('12h');
  const [themeMode, setThemeMode] = useState('glassmorphism');
  const [layoutDensity, setLayoutDensity] = useState('comfortable');

  // WhatsApp & Emergency Alerts State
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [alertDryRun, setAlertDryRun] = useState(true);
  const [alertHeat, setAlertHeat] = useState(true);
  const [alertPh, setAlertPh] = useState(true);
  const [alertRain, setAlertRain] = useState(true);
  const [testAlertPayload, setTestAlertPayload] = useState(null);

  // Location Tracker State
  const [locStatus, setLocStatus] = useState(() => {
    const cached = localStorage.getItem('agrisense_user_location');
    return cached ? JSON.parse(cached) : { formatted: 'Coimbatore, Tamil Nadu', lat: 11.0168, lon: 76.9558 };
  });
  const [locLoading, setLocLoading] = useState(false);

  useEffect(() => {
    const handleLocUpdate = (e) => {
      if (e.detail) setLocStatus(e.detail);
    };
    window.addEventListener('agrisense_location_updated', handleLocUpdate);
    return () => window.removeEventListener('agrisense_location_updated', handleLocUpdate);
  }, []);

  // Save All Settings Handler
  const handleSaveAll = (e) => {
    e?.preventDefault();
    setWeatherApiKey(weatherKey);
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 3000);
  };

  // Change Password Handler
  const handleChangePassword = (e) => {
    e.preventDefault();
    if (newPassword && newPassword === confirmPassword) {
      setPasswordToast(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => setPasswordToast(false), 3000);
    }
  };

  // Reset to Defaults
  const handleResetDefaults = () => {
    setTempUnit('celsius');
    setMoistureUnit('vwc');
    setLandUnit('acres');
    setTimezone('ist');
    setPhMin(5.5);
    setPhMax(7.5);
    setMoistureMin(30);
    setMoistureMax(70);
    setTempMax(38);
    setAiModel('v2.4');
    setConfidenceThreshold(85);
    setThemeMode('glassmorphism');
    setResetToast(true);
    setTimeout(() => setResetToast(false), 3000);
  };

  // Export JSON Config
  const handleExportConfig = () => {
    const configData = {
      app: 'AgriSense AI Platform',
      version: 'v2.4',
      exportTimestamp: new Date().toISOString(),
      user: { name, email, phone },
      farm: { farmName, cropType, soilType, targetYield },
      settings: {
        tempUnit, moistureUnit, landUnit, timezone,
        moistureMin, moistureMax, phMin, phMax, tempMin, tempMax,
        aiModel, confidenceThreshold, irrigationMode, rainBypass, tankCutoff, maxRuntime
      },
      location: locStatus
    };
    const blob = new Blob([JSON.stringify(configData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `agrisense_config_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setExportToast(true);
    setTimeout(() => setExportToast(false), 3000);
  };

  const handleCopyWeatherKey = () => {
    navigator.clipboard.writeText(weatherKey);
    setCopiedWeatherKey(true);
    setTimeout(() => setCopiedWeatherKey(false), 2000);
  };

  const handleDetectGps = async () => {
    setLocLoading(true);
    const loc = await detectUserLocation();
    setLocStatus(loc);
    setLocLoading(false);
  };

  const handleSelectPreset = (preset) => {
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
    setLocStatus(loc);
  };

  const handleTestWeatherApi = async () => {
    setWeatherTestStatus('Testing API Key...');
    const result = await fetchLiveWeather(locStatus.lat || 11.0168, locStatus.lon || 76.9558);
    if (result.success) {
      setWeatherTestStatus(`Connected! Temp: ${result.temp}°C, Weather: ${result.condition} in ${result.city}`);
    } else {
      setWeatherTestStatus('Connected using micro-climate fallback engine.');
    }
  };

  const handleSendTestAlert = (type = 'whatsapp') => {
    setTestAlertPayload({
      type,
      recipient: phone,
      body: `🚨 [AgriSense AI Alert]: Critical Water Tank Dry-Run Warning on Field-02 (${locStatus.formatted}). Soil Moisture: 28% (< 35% Threshold). Drip Pump Activated Automatically.`
    });
  };

  // 17 Main Categories Definition with Icons & Sub-Tabs
  const SETTINGS_CATEGORIES = [
    {
      id: 'account',
      title: 'Account',
      icon: User,
      subTabs: [
        { id: 'personal', label: 'Personal Information' },
        { id: 'password', label: 'Password' },
        { id: 'sessions', label: 'Sessions' }
      ]
    },
    {
      id: 'farm',
      title: 'Farm',
      icon: Sprout,
      subTabs: [
        { id: 'farm_info', label: 'Farm Information' },
        { id: 'crop_info', label: 'Crop Information' },
        { id: 'farm_pref', label: 'Farm Preferences' }
      ]
    },
    {
      id: 'irrigation',
      title: 'Irrigation',
      icon: Droplets,
      subTabs: [
        { id: 'irr_mode', label: 'Manual / Automatic' },
        { id: 'irr_moisture', label: 'Moisture Threshold' },
        { id: 'irr_rain', label: 'Rain Condition' },
        { id: 'irr_tank', label: 'Tank Protection' },
        { id: 'irr_runtime', label: 'Maximum Runtime' }
      ]
    },
    {
      id: 'sensors',
      title: 'Sensors',
      icon: Sliders,
      subTabs: [
        { id: 'sen_temp', label: 'Temperature' },
        { id: 'sen_humidity', label: 'Humidity' },
        { id: 'sen_moisture', label: 'Soil Moisture' },
        { id: 'sen_ph', label: 'Soil pH' }
      ]
    },
    {
      id: 'automation',
      title: 'Automation',
      icon: Zap,
      subTabs: [
        { id: 'auto_irr', label: 'Irrigation Rules' },
        { id: 'auto_alert', label: 'Alert Rules' }
      ]
    },
    {
      id: 'ai',
      title: 'AI',
      icon: Sparkles,
      subTabs: [
        { id: 'ai_crop', label: 'Crop Recommendation' },
        { id: 'ai_disease', label: 'Disease Diagnosis' }
      ]
    },
    {
      id: 'devices',
      title: 'Devices',
      icon: Cpu,
      subTabs: [
        { id: 'dev_iot', label: 'IoT Devices' },
        { id: 'dev_conn', label: 'Connection' }
      ]
    },
    { id: 'notifications', title: 'Notifications', icon: Bell },
    { id: 'language', title: 'Language', icon: Globe },
    { id: 'units', title: 'Units', icon: Gauge },
    { id: 'date_time', title: 'Date & Time', icon: Clock },
    { id: 'appearance', title: 'Appearance', icon: Palette },
    { id: 'privacy_security', title: 'Privacy & Security', icon: Shield },
    { id: 'data_export', title: 'Data & Export', icon: HardDrive },
    { id: 'help_support', title: 'Help & Support', icon: HelpCircle },
    { id: 'about', title: 'About', icon: Info }
  ];

  // Filter Categories by Search Query
  const filteredCategories = searchQuery.trim() === ''
    ? SETTINGS_CATEGORIES
    : SETTINGS_CATEGORIES.filter(cat => 
        t(cat.title).toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.subTabs?.some(sub => t(sub.label).toLowerCase().includes(searchQuery.toLowerCase()))
      );

  const currentCategoryObj = SETTINGS_CATEGORIES.find(c => c.id === activeCategory) || SETTINGS_CATEGORIES[0];

  return (
    <div className="flex flex-col h-[calc(100vh-125px)] overflow-hidden space-y-4 font-sans">
      {/* Toast Notifications */}
      {savedToast && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-900 text-lime-300 px-4 py-3 rounded-2xl shadow-2xl border border-lime-400/40 flex items-center space-x-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle className="w-5 h-5 text-lime-400" />
          <span className="font-bold text-xs">{t('Save All System Settings & API Keys')} ✓</span>
        </div>
      )}

      {passwordToast && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-950 text-emerald-300 px-4 py-3 rounded-2xl shadow-2xl border border-emerald-400/40 flex items-center space-x-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="font-bold text-xs">{t('Password')} Changed Successfully! ✓</span>
        </div>
      )}

      {resetToast && (
        <div className="fixed top-20 right-6 z-50 bg-amber-950 text-amber-300 px-4 py-3 rounded-2xl shadow-2xl border border-amber-400/40 flex items-center space-x-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <RefreshCw className="w-5 h-5 text-amber-400" />
          <span className="font-bold text-xs">{t('Reset to Factory Defaults')} ✓</span>
        </div>
      )}

      {exportToast && (
        <div className="fixed top-20 right-6 z-50 bg-stone-900 text-teal-300 px-4 py-3 rounded-2xl shadow-2xl border border-teal-400/40 flex items-center space-x-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <Download className="w-5 h-5 text-teal-400" />
          <span className="font-bold text-xs">{t('Export Farm Config (.JSON)')} ✓</span>
        </div>
      )}

      {/* Header Banner - Fixed Height Top Bar */}
      <div className="shrink-0 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white border border-stone-200 p-4.5 rounded-3xl shadow-xs">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-emerald-950 text-lime-400 rounded-2xl border border-emerald-800 shadow-sm">
            <Sliders className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-xl font-black text-stone-900 font-['Manrope',_sans-serif]">
              {t('Settings')}
            </h2>
            <p className="text-xs text-stone-500 font-medium">
              Comprehensive 16-Category Farm Telemetry, AI Engine & Account Preferences
            </p>
          </div>
        </div>

        {/* Global Settings Search & Utilities */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative min-w-[180px]">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter settings..." 
              className="w-full glass-input py-1.5 pl-8 pr-3 text-xs font-semibold text-stone-900 placeholder-stone-400 rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700"
            />
          </div>

          <button
            type="button"
            onClick={handleResetDefaults}
            className="px-3 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-xl text-xs flex items-center space-x-1.5 transition-all cursor-pointer border border-stone-300"
            title="Reset Defaults"
          >
            <RefreshCw className="w-3.5 h-3.5 text-stone-600" />
            <span className="hidden sm:inline">{t('Reset to Factory Defaults')}</span>
          </button>

          <button
            type="button"
            onClick={handleExportConfig}
            className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-950 font-bold rounded-xl text-xs flex items-center space-x-1.5 transition-all cursor-pointer border border-emerald-300"
            title="Export JSON"
          >
            <Download className="w-3.5 h-3.5 text-emerald-800" />
            <span>{t('Export Farm Config (.JSON)')}</span>
          </button>
        </div>
      </div>

      {/* Main 2-Part Grid: Both Screens Move Completely Independently */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 flex-1 min-h-0 overflow-hidden">
        {/* Screen 1: Independent Scrollable Category Selector Sidebar */}
        <div 
          className="md:col-span-4 lg:col-span-3 h-full overflow-y-auto pr-2 space-y-1.5 scrollbar-thin bg-white/70 backdrop-blur-md p-2.5 rounded-3xl border border-stone-200 shadow-xs shrink-0 touch-pan-y"
          style={{ WebkitOverflowScrolling: 'touch', overscrollBehaviorY: 'contain' }}
        >
          {filteredCategories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.id;

            return (
              <div key={cat.id} className="space-y-1">
                <button
                  onClick={() => {
                    const firstSub = cat.subTabs && cat.subTabs.length > 0 ? cat.subTabs[0].id : null;
                    handleCategorySelect(cat.id, firstSub);
                  }}
                  className={`w-full p-3 rounded-2xl font-extrabold text-xs flex items-center justify-between transition-all cursor-pointer select-none ${
                    isSelected
                      ? 'bg-emerald-950 text-lime-300 shadow-md border border-emerald-800'
                      : 'bg-white hover:bg-stone-100 text-stone-700 border border-stone-200'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className={`w-4 h-4 ${isSelected ? 'text-lime-300' : 'text-emerald-800'}`} />
                    <span>{t(cat.title)}</span>
                  </div>
                  {cat.subTabs && (
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-md ${isSelected ? 'bg-emerald-900 text-lime-300' : 'bg-stone-100 text-stone-500'}`}>
                      {cat.subTabs.length}
                    </span>
                  )}
                </button>

                {/* Sub-Tabs Accordion Menu */}
                {isSelected && cat.subTabs && (
                  <div className="pl-6 space-y-1 border-l-2 border-emerald-800 ml-4 py-1">
                    {cat.subTabs.map((sub) => {
                      const isSubActive = activeSubTab === sub.id;
                      return (
                        <button
                          key={sub.id}
                          onClick={() => handleCategorySelect(cat.id, sub.id)}
                          className={`w-full text-left px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all cursor-pointer block select-none ${
                            isSubActive
                              ? 'bg-emerald-800 text-lime-300 shadow-2xs font-black'
                              : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                          }`}
                        >
                          • {t(sub.label)}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Screen 2: Independent Scrollable Right Content Form Panel */}
        <div 
          ref={rightPanelRef}
          className="md:col-span-8 lg:col-span-9 h-full overflow-y-auto pr-3 space-y-6 scrollbar-thin pb-28 touch-pan-y"
          style={{ WebkitOverflowScrolling: 'touch', overscrollBehaviorY: 'contain' }}
        >
          <form onSubmit={handleSaveAll} className="space-y-6">
            {/* 1. Account Section */}
            {activeCategory === 'account' && (
              <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm space-y-6 eco-card font-sans">
                <div className="border-b border-stone-200 pb-3 flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-black text-stone-900 flex items-center space-x-2">
                      <User className="w-4.5 h-4.5 text-emerald-800" />
                      <span>{t('Account')} — {t(activeSubTab === 'personal' ? 'Personal Information' : activeSubTab === 'password' ? 'Password' : 'Sessions')}</span>
                    </h3>
                    <p className="text-xs text-stone-500 font-medium">Manage user credentials, security credentials, and active browser sessions.</p>
                  </div>
                </div>

                {/* Sub-Tab 1.1: Personal Information */}
                {activeSubTab === 'personal' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-stone-700 font-bold mb-1.5">Full Name</label>
                      <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        className="w-full glass-input py-2.5 px-3 rounded-xl font-bold text-stone-900 border border-stone-300 focus:outline-none focus:border-emerald-700" 
                      />
                    </div>

                    <div>
                      <label className="block text-stone-700 font-bold mb-1.5">Email Address</label>
                      <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="w-full glass-input py-2.5 px-3 rounded-xl font-bold text-stone-900 border border-stone-300 focus:outline-none focus:border-emerald-700" 
                      />
                    </div>

                    <div>
                      <label className="block text-stone-700 font-bold mb-1.5">{t('Primary Farmer Phone Number')}</label>
                      <input 
                        type="tel" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        className="w-full glass-input py-2.5 px-3 rounded-xl font-mono font-bold text-stone-900 border border-stone-300 focus:outline-none focus:border-emerald-700" 
                      />
                    </div>

                    <div>
                      <label className="block text-stone-700 font-bold mb-1.5">User Role & Title</label>
                      <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-950 font-bold flex items-center justify-between">
                        <span>Lead Farmer / Agronomist</span>
                        <span className="px-2 py-0.5 bg-emerald-800 text-lime-300 text-[10px] font-black rounded-md">VERIFIED</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Sub-Tab 1.2: Password */}
                {activeSubTab === 'password' && (
                  <div className="space-y-4 text-xs max-w-md">
                    <div>
                      <label className="block text-stone-700 font-bold mb-1.5">Current Password</label>
                      <input 
                        type="password" 
                        value={currentPassword} 
                        onChange={(e) => setCurrentPassword(e.target.value)} 
                        placeholder="••••••••" 
                        className="w-full glass-input py-2.5 px-3 rounded-xl font-mono text-stone-900 border border-stone-300 focus:outline-none focus:border-emerald-700" 
                      />
                    </div>

                    <div>
                      <label className="block text-stone-700 font-bold mb-1.5">New Password</label>
                      <input 
                        type="password" 
                        value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)} 
                        placeholder="••••••••" 
                        className="w-full glass-input py-2.5 px-3 rounded-xl font-mono text-stone-900 border border-stone-300 focus:outline-none focus:border-emerald-700" 
                      />
                    </div>

                    <div>
                      <label className="block text-stone-700 font-bold mb-1.5">Confirm New Password</label>
                      <input 
                        type="password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        placeholder="••••••••" 
                        className="w-full glass-input py-2.5 px-3 rounded-xl font-mono text-stone-900 border border-stone-300 focus:outline-none focus:border-emerald-700" 
                      />
                    </div>

                    <button 
                      type="button" 
                      onClick={handleChangePassword} 
                      className="px-4 py-2.5 bg-emerald-950 text-lime-300 font-black rounded-xl text-xs hover:bg-emerald-900 transition-all cursor-pointer shadow-md"
                    >
                      Update Security Password
                    </button>
                  </div>
                )}

                {/* Sub-Tab 1.3: Sessions */}
                {activeSubTab === 'sessions' && (
                  <div className="space-y-3 text-xs">
                    <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Monitor className="w-5 h-5 text-emerald-800" />
                        <div>
                          <h4 className="font-bold text-stone-900">Chrome on Windows 11 (Current Device)</h4>
                          <p className="text-[10px] text-stone-500">IP: 157.48.21.90 • Location: Coimbatore, Tamil Nadu</p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 bg-emerald-800 text-lime-300 text-[10px] font-black rounded-md">ACTIVE NOW</span>
                    </div>

                    <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <PhoneCall className="w-5 h-5 text-stone-500" />
                        <div>
                          <h4 className="font-bold text-stone-900">AgriSense Android App v2.4</h4>
                          <p className="text-[10px] text-stone-500">Last Active: 2 hours ago • Pixel 7 Pro</p>
                        </div>
                      </div>
                      <button type="button" className="text-rose-600 font-bold hover:underline cursor-pointer">Revoke</button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 2. Farm Section */}
            {activeCategory === 'farm' && (
              <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm space-y-6 eco-card font-sans">
                <div className="border-b border-stone-200 pb-3">
                  <h3 className="text-base font-black text-stone-900 flex items-center space-x-2">
                    <Sprout className="w-4.5 h-4.5 text-emerald-800" />
                    <span>{t('Farm')} — {t(activeSubTab === 'farm_info' ? 'Farm Information' : activeSubTab === 'crop_info' ? 'Crop Information' : 'Farm Preferences')}</span>
                  </h3>
                  <p className="text-xs text-stone-500 font-medium">Configure land parcel details, soil composition, and target yield parameters.</p>
                </div>

                {activeSubTab === 'farm_info' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-stone-700 font-bold mb-1.5">Farm Property Name</label>
                      <input 
                        type="text" 
                        value={farmName} 
                        onChange={(e) => setFarmName(e.target.value)} 
                        className="w-full glass-input py-2.5 px-3 rounded-xl font-bold text-stone-900 border border-stone-300" 
                      />
                    </div>
                    <div>
                      <label className="block text-stone-700 font-bold mb-1.5">Registered Location</label>
                      <input 
                        type="text" 
                        value={locStatus.formatted} 
                        disabled 
                        className="w-full bg-stone-100 py-2.5 px-3 rounded-xl font-bold text-stone-700 border border-stone-300" 
                      />
                    </div>
                  </div>
                )}

                {activeSubTab === 'crop_info' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block text-stone-700 font-bold mb-1.5">Active Primary Crops</label>
                      <select 
                        value={cropType} 
                        onChange={(e) => setCropType(e.target.value)}
                        className="w-full glass-input py-2.5 px-3 rounded-xl font-bold text-stone-900 border border-stone-300"
                      >
                        <option value="Tomato & Maize">Tomato & Maize (High Yield)</option>
                        <option value="Sugarcane & Paddy">Sugarcane & Paddy</option>
                        <option value="Coconut & Banana">Coconut & Banana</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-stone-700 font-bold mb-1.5">Soil Type Classification</label>
                      <select 
                        value={soilType} 
                        onChange={(e) => setSoilType(e.target.value)}
                        className="w-full glass-input py-2.5 px-3 rounded-xl font-bold text-stone-900 border border-stone-300"
                      >
                        <option value="Red Loamy Soil">Red Loamy Soil</option>
                        <option value="Black Clay Soil">Black Clay Soil</option>
                        <option value="Alluvial Soil">Alluvial Soil</option>
                        <option value="Sandy Loam">Sandy Loam</option>
                      </select>
                    </div>
                  </div>
                )}

                {activeSubTab === 'farm_pref' && (
                  <div className="space-y-4 text-xs">
                    <div>
                      <label className="block text-stone-700 font-bold mb-1.5">Seasonal Target Yield</label>
                      <input 
                        type="text" 
                        value={targetYield} 
                        onChange={(e) => setTargetYield(e.target.value)} 
                        className="w-full glass-input py-2.5 px-3 rounded-xl font-bold text-stone-900 border border-stone-300" 
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 3. Irrigation Section */}
            {activeCategory === 'irrigation' && (
              <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm space-y-6 eco-card font-sans">
                <div className="border-b border-stone-200 pb-3">
                  <h3 className="text-base font-black text-stone-900 flex items-center space-x-2">
                    <Droplets className="w-4.5 h-4.5 text-emerald-800" />
                    <span>{t('Irrigation')} Controls & Pump Protection</span>
                  </h3>
                  <p className="text-xs text-stone-500 font-medium">Automatic drip pump thresholds, rain bypass logic, and motor dry-run protection.</p>
                </div>

                <div className="space-y-4 text-xs">
                  {/* Manual / Automatic Mode */}
                  <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-stone-900 text-xs">{t('Manual / Automatic')} Mode</h4>
                      <p className="text-[11px] text-stone-500">Allow AI to turn drip pumps ON/OFF based on soil moisture sensors.</p>
                    </div>
                    <select 
                      value={irrigationMode} 
                      onChange={(e) => setIrrigationMode(e.target.value)}
                      className="px-3 py-1.5 bg-emerald-950 text-lime-300 font-bold rounded-xl text-xs cursor-pointer border border-emerald-800"
                    >
                      <option value="auto">Automatic AI Mode</option>
                      <option value="manual">Manual Override</option>
                    </select>
                  </div>

                  {/* Moisture Threshold Sliders */}
                  <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl space-y-2">
                    <div className="flex justify-between font-extrabold text-stone-900">
                      <span>{t('Moisture Threshold')} Range</span>
                      <span className="text-emerald-800 font-mono font-black">{moistureMin}% - {moistureMax}% VWC</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] text-stone-500 font-bold block mb-1">Start Pump Below</label>
                        <input 
                          type="range" min="15" max="45" 
                          value={moistureMin} onChange={(e) => setMoistureMin(Number(e.target.value))} 
                          className="w-full accent-emerald-800 cursor-pointer"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-stone-500 font-bold block mb-1">Stop Pump Above</label>
                        <input 
                          type="range" min="50" max="90" 
                          value={moistureMax} onChange={(e) => setMoistureMax(Number(e.target.value))} 
                          className="w-full accent-emerald-800 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Rain Condition Bypass */}
                  <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-2xl flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-stone-900">{t('Rain Condition')} Smart Bypass</h4>
                      <p className="text-[11px] text-stone-500">Automatically suspend irrigation if rain probability &gt; 60%.</p>
                    </div>
                    <input 
                      type="checkbox" checked={rainBypass} onChange={(e) => setRainBypass(e.target.checked)}
                      className="w-4 h-4 accent-emerald-800 cursor-pointer"
                    />
                  </div>

                  {/* Tank Protection & Max Runtime */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-2xl space-y-1">
                      <label className="font-bold text-stone-900 block">{t('Tank Protection')} Cutoff Level</label>
                      <div className="flex items-center space-x-2">
                        <input 
                          type="number" min="5" max="30" value={tankCutoff} onChange={(e) => setTankCutoff(Number(e.target.value))}
                          className="w-20 glass-input py-1 px-2.5 rounded-lg font-mono font-bold text-stone-900 border border-stone-300"
                        />
                        <span className="text-stone-500 font-bold">% Water Level</span>
                      </div>
                    </div>

                    <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-2xl space-y-1">
                      <label className="font-bold text-stone-900 block">{t('Maximum Runtime')} Per Cycle</label>
                      <div className="flex items-center space-x-2">
                        <input 
                          type="number" min="15" max="120" value={maxRuntime} onChange={(e) => setMaxRuntime(Number(e.target.value))}
                          className="w-20 glass-input py-1 px-2.5 rounded-lg font-mono font-bold text-stone-900 border border-stone-300"
                        />
                        <span className="text-stone-500 font-bold">Minutes Max</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. Sensors Section */}
            {activeCategory === 'sensors' && (
              <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm space-y-6 eco-card font-sans">
                <div className="border-b border-stone-200 pb-3">
                  <h3 className="text-base font-black text-stone-900 flex items-center space-x-2">
                    <Sliders className="w-4.5 h-4.5 text-emerald-800" />
                    <span>{t('Sensors')} Telemetry Calibration & Thresholds</span>
                  </h3>
                  <p className="text-xs text-stone-500 font-medium">Define safety boundaries for air temperature, humidity, soil moisture, and pH probes.</p>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl space-y-2">
                    <div className="flex justify-between font-extrabold text-stone-900">
                      <span>Air {t('Temperature')} Safety Range</span>
                      <span className="text-emerald-800 font-mono font-black">{tempMin}°C - {tempMax}°C</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] text-stone-500 font-bold block mb-1">Frost Warning Below</label>
                        <input type="range" min="0" max="20" value={tempMin} onChange={(e) => setTempMin(Number(e.target.value))} className="w-full accent-emerald-800 cursor-pointer" />
                      </div>
                      <div>
                        <label className="text-[10px] text-stone-500 font-bold block mb-1">Heat Stress Warning Above</label>
                        <input type="range" min="30" max="50" value={tempMax} onChange={(e) => setTempMax(Number(e.target.value))} className="w-full accent-emerald-800 cursor-pointer" />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl space-y-2">
                    <div className="flex justify-between font-extrabold text-stone-900">
                      <span>{t('Soil pH')} Danger Boundaries</span>
                      <span className="text-emerald-800 font-mono font-black">{phMin} pH - {phMax} pH</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] text-stone-500 font-bold block mb-1">Acidic Limit Below</label>
                        <input type="range" min="4.5" max="6.5" step="0.1" value={phMin} onChange={(e) => setPhMin(Number(e.target.value))} className="w-full accent-emerald-800 cursor-pointer" />
                      </div>
                      <div>
                        <label className="text-[10px] text-stone-500 font-bold block mb-1">Alkaline Limit Above</label>
                        <input type="range" min="6.8" max="9.0" step="0.1" value={phMax} onChange={(e) => setPhMax(Number(e.target.value))} className="w-full accent-emerald-800 cursor-pointer" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 5. Automation Section */}
            {activeCategory === 'automation' && (
              <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm space-y-6 eco-card font-sans">
                <div className="border-b border-stone-200 pb-3">
                  <h3 className="text-base font-black text-stone-900 flex items-center space-x-2">
                    <Zap className="w-4.5 h-4.5 text-amber-500" />
                    <span>{t('Automation')} — {t('Irrigation Rules')} & {t('Alert Rules')}</span>
                  </h3>
                  <p className="text-xs text-stone-500 font-medium">Smart conditional rules engine for autonomous farm execution.</p>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-4 bg-emerald-50/80 border border-emerald-200 rounded-2xl flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-stone-900">Rule 01: Low Moisture + High Temp Trigger</h4>
                      <p className="text-[11px] text-stone-600">IF Moisture &lt; 30% AND Air Temp &gt; 35°C THEN Run Valve-01 for 30m.</p>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-800 text-lime-300 font-black text-[10px] rounded-lg">ACTIVE</span>
                  </div>

                  <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl flex items-center justify-between">
                    <div>
                      <h4 className="font-extrabold text-stone-900">Rule 02: Night Time Off-Peak Irrigation</h4>
                      <p className="text-[11px] text-stone-500">IF Time between 10:00 PM - 4:00 AM THEN Run Drip Lines at 80% flow.</p>
                    </div>
                    <span className="px-2.5 py-1 bg-stone-200 text-stone-700 font-bold text-[10px] rounded-lg">ENABLED</span>
                  </div>
                </div>
              </div>
            )}

            {/* 6. AI Section */}
            {activeCategory === 'ai' && (
              <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm space-y-6 eco-card font-sans">
                <div className="border-b border-stone-200 pb-3">
                  <h3 className="text-base font-black text-stone-900 flex items-center space-x-2">
                    <Sparkles className="w-4.5 h-4.5 text-emerald-800" />
                    <span>{t('AI')} Engine — {t('Crop Recommendation')} & {t('Disease Diagnosis')}</span>
                  </h3>
                  <p className="text-xs text-stone-500 font-medium">Neural machine learning models for yield optimization and leaf disease diagnosis.</p>
                </div>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-stone-700 font-bold mb-1.5">{t('AI Recommendation Model Version')}</label>
                    <select 
                      value={aiModel} onChange={(e) => setAiModel(e.target.value)}
                      className="w-full glass-input py-2.5 px-3 rounded-xl font-semibold border border-stone-300"
                    >
                      <option value="v2.4">AgriSense Neural Crop Engine v2.4 (Latest • High Accuracy)</option>
                      <option value="v2.0">AgriSense Legacy Model v2.0</option>
                    </select>
                  </div>

                  <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl space-y-2">
                    <div className="flex justify-between font-extrabold text-stone-900">
                      <span>{t('Minimum Match Confidence Score')}</span>
                      <span className="text-emerald-800 font-mono font-black">&gt; {confidenceThreshold}%</span>
                    </div>
                    <input type="range" min="70" max="98" value={confidenceThreshold} onChange={(e) => setConfidenceThreshold(Number(e.target.value))} className="w-full accent-emerald-800 cursor-pointer" />
                  </div>
                </div>
              </div>
            )}

            {/* 7. Devices Section */}
            {activeCategory === 'devices' && (
              <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm space-y-6 eco-card font-sans">
                <div className="border-b border-stone-200 pb-3">
                  <h3 className="text-base font-black text-stone-900 flex items-center space-x-2">
                    <Cpu className="w-4.5 h-4.5 text-emerald-800" />
                    <span>{t('Devices')} — {t('IoT Devices')} & {t('Connection')}</span>
                  </h3>
                  <p className="text-xs text-stone-500 font-medium">Hardware nodes, ESP32 microcontrollers, and MQTT broker endpoints.</p>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-stone-700 font-bold mb-1.5">{t('MQTT Telemetry Broker URL')}</label>
                    <input 
                      type="text" value={mqttBroker} onChange={(e) => setMqttBroker(e.target.value)}
                      className="w-full glass-input py-2.5 px-3 rounded-xl font-mono text-stone-900 border border-stone-300"
                    />
                  </div>

                  <div className="p-3.5 bg-stone-50 border border-stone-200 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Wifi className="w-4 h-4 text-emerald-600" />
                      <div>
                        <h4 className="font-bold text-stone-900">Field Node-01 (ESP32 LoRa Gateway)</h4>
                        <p className="text-[10px] text-stone-500">Signal: -68 dBm • Battery: 94% • Firmware: v1.8</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-black rounded-md">CONNECTED</span>
                  </div>
                </div>
              </div>
            )}

            {/* 8. Notifications Section */}
            {activeCategory === 'notifications' && (
              <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm space-y-6 eco-card font-sans">
                <div className="border-b border-stone-200 pb-3">
                  <h3 className="text-base font-black text-stone-900 flex items-center space-x-2">
                    <Bell className="w-4.5 h-4.5 text-emerald-800" />
                    <span>{t('Notifications')} & Dispatch Channels</span>
                  </h3>
                  <p className="text-xs text-stone-500 font-medium">Configure SMS, WhatsApp emergency dispatch, and dry-run alerts.</p>
                </div>

                <div className="p-4 bg-gradient-to-r from-emerald-50/70 to-white border border-emerald-200 rounded-2xl space-y-3 text-xs">
                  <div className="font-black text-emerald-950 flex items-center space-x-2">
                    <PhoneCall className="w-4 h-4 text-emerald-800" />
                    <span>{t('WhatsApp & SMS Emergency Alerts')}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-stone-700 block mb-1">{t('Primary Farmer Phone Number')}</label>
                      <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full glass-input py-2 px-3 rounded-xl font-mono font-bold text-stone-900 border border-stone-300" />
                    </div>
                    <div>
                      <label className="font-bold text-stone-700 block mb-1">{t('Secondary Emergency Contact')}</label>
                      <input type="tel" value={secPhone} onChange={(e) => setSecPhone(e.target.value)} className="w-full glass-input py-2 px-3 rounded-xl font-mono font-bold text-stone-900 border border-stone-300" />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 pt-2">
                    <button type="button" onClick={() => handleSendTestAlert('whatsapp')} className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center space-x-1 cursor-pointer">
                      <Send className="w-3.5 h-3.5" />
                      <span>{t('Send Test WhatsApp Alert')}</span>
                    </button>
                  </div>

                  {testAlertPayload && (
                    <div className="p-3 bg-white border border-emerald-300 rounded-xl text-xs font-mono">
                      📲 [{testAlertPayload.type.toUpperCase()}] {testAlertPayload.body}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 9. Language Section */}
            {activeCategory === 'language' && (
              <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm space-y-6 eco-card font-sans">
                <div className="border-b border-stone-200 pb-3">
                  <h3 className="text-base font-black text-stone-900 flex items-center space-x-2">
                    <Globe className="w-4.5 h-4.5 text-emerald-800" />
                    <span>{t('Language')} & Regional Translations</span>
                  </h3>
                  <p className="text-xs text-stone-500 font-medium">Select your preferred Indian regional language for real-time app translation.</p>
                </div>
                <LanguageSelector variant="grid" />
              </div>
            )}

            {/* 10. Units Section */}
            {activeCategory === 'units' && (
              <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm space-y-6 eco-card font-sans">
                <div className="border-b border-stone-200 pb-3">
                  <h3 className="text-base font-black text-stone-900 flex items-center space-x-2">
                    <Gauge className="w-4.5 h-4.5 text-emerald-800" />
                    <span>{t('Units')} & Agronomic Metrics</span>
                  </h3>
                  <p className="text-xs text-stone-500 font-medium">Select measurement scales for temperature, moisture, land area, and timezones.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-stone-700 font-bold mb-1.5">{t('Temperature Scale')}</label>
                    <select value={tempUnit} onChange={(e) => setTempUnit(e.target.value)} className="w-full glass-input py-2.5 px-3 rounded-xl font-semibold border border-stone-300 cursor-pointer">
                      <option value="celsius">Celsius (°C)</option>
                      <option value="fahrenheit">Fahrenheit (°F)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-700 font-bold mb-1.5">{t('Soil Moisture Metric')}</label>
                    <select value={moistureUnit} onChange={(e) => setMoistureUnit(e.target.value)} className="w-full glass-input py-2.5 px-3 rounded-xl font-semibold border border-stone-300 cursor-pointer">
                      <option value="vwc">Volumetric Water Content (%)</option>
                      <option value="cb">Soil Water Tension (Centibars)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-700 font-bold mb-1.5">{t('Land Area Measurement')}</label>
                    <select value={landUnit} onChange={(e) => setLandUnit(e.target.value)} className="w-full glass-input py-2.5 px-3 rounded-xl font-semibold border border-stone-300 cursor-pointer">
                      <option value="acres">Acres (Ac)</option>
                      <option value="hectares">Hectares (Ha)</option>
                      <option value="sqm">Square Meters (m²)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* 11. Date & Time Section */}
            {activeCategory === 'date_time' && (
              <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm space-y-6 eco-card font-sans">
                <div className="border-b border-stone-200 pb-3">
                  <h3 className="text-base font-black text-stone-900 flex items-center space-x-2">
                    <Clock className="w-4.5 h-4.5 text-emerald-800" />
                    <span>{t('Date & Time')} Configuration</span>
                  </h3>
                  <p className="text-xs text-stone-500 font-medium">Configure regional timezone, clock format, and date representation.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-stone-700 font-bold mb-1.5">{t('System Timezone')}</label>
                    <select value={timezone} onChange={(e) => setTimezone(e.target.value)} className="w-full glass-input py-2.5 px-3 rounded-xl font-semibold border border-stone-300 cursor-pointer">
                      <option value="ist">Indian Standard Time (IST, UTC+5:30)</option>
                      <option value="utc">Universal Time Coordinated (UTC)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-700 font-bold mb-1.5">Clock Representation</label>
                    <select value={clockFormat} onChange={(e) => setClockFormat(e.target.value)} className="w-full glass-input py-2.5 px-3 rounded-xl font-semibold border border-stone-300 cursor-pointer">
                      <option value="12h">12-Hour Clock (11:16 PM)</option>
                      <option value="24h">24-Hour Clock (23:16)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* 12. Appearance Section */}
            {activeCategory === 'appearance' && (
              <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm space-y-6 eco-card font-sans">
                <div className="border-b border-stone-200 pb-3">
                  <h3 className="text-base font-black text-stone-900 flex items-center space-x-2">
                    <Palette className="w-4.5 h-4.5 text-emerald-800" />
                    <span>{t('Appearance')} & Theme Customization</span>
                  </h3>
                  <p className="text-xs text-stone-500 font-medium">Visual UI styling, glassmorphism density, and high-contrast sunlight visibility mode.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block text-stone-700 font-bold mb-1.5">UI Visual Theme</label>
                    <select value={themeMode} onChange={(e) => setThemeMode(e.target.value)} className="w-full glass-input py-2.5 px-3 rounded-xl font-semibold border border-stone-300 cursor-pointer">
                      <option value="glassmorphism">Eco Glassmorphism (Default)</option>
                      <option value="high_contrast">High-Contrast Outdoor Sunlight Mode</option>
                      <option value="dark_emerald">Dark Emerald Night Mode</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-stone-700 font-bold mb-1.5">Card Layout Density</label>
                    <select value={layoutDensity} onChange={(e) => setLayoutDensity(e.target.value)} className="w-full glass-input py-2.5 px-3 rounded-xl font-semibold border border-stone-300 cursor-pointer">
                      <option value="comfortable">Comfortable Spacing</option>
                      <option value="compact">Compact Data Density</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* 13. Privacy & Security Section */}
            {activeCategory === 'privacy_security' && (
              <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm space-y-6 eco-card font-sans">
                <div className="border-b border-stone-200 pb-3">
                  <h3 className="text-base font-black text-stone-900 flex items-center space-x-2">
                    <Shield className="w-4.5 h-4.5 text-emerald-800" />
                    <span>{t('Privacy & Security')} Settings</span>
                  </h3>
                  <p className="text-xs text-stone-500 font-medium">Encryption standards, two-factor authentication, and telemetry ownership.</p>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Lock className="w-5 h-5 text-emerald-800" />
                      <div>
                        <h4 className="font-extrabold text-stone-900">256-Bit SSL/TLS End-to-End Encryption</h4>
                        <p className="text-[11px] text-stone-600">All sensor telemetry and farm coordinates are strictly encrypted.</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-800 text-lime-300 font-black text-[10px] rounded-md">ENFORCED</span>
                  </div>
                </div>
              </div>
            )}

            {/* 14. Data & Export Section */}
            {activeCategory === 'data_export' && (
              <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm space-y-6 eco-card font-sans">
                <div className="border-b border-stone-200 pb-3">
                  <h3 className="text-base font-black text-stone-900 flex items-center space-x-2">
                    <HardDrive className="w-4.5 h-4.5 text-emerald-800" />
                    <span>{t('Data & Export')} Management</span>
                  </h3>
                  <p className="text-xs text-stone-500 font-medium">Backup configurations, export telemetry logs, and manage storage.</p>
                </div>

                <div className="flex items-center space-x-3 pt-2">
                  <button type="button" onClick={handleExportConfig} className="px-4 py-2.5 bg-emerald-950 text-lime-300 font-black rounded-xl text-xs flex items-center space-x-2 cursor-pointer shadow-md">
                    <Download className="w-4 h-4" />
                    <span>{t('Export Farm Config (.JSON)')}</span>
                  </button>

                  <button type="button" onClick={handleResetDefaults} className="px-4 py-2.5 bg-stone-100 text-stone-800 font-bold rounded-xl text-xs flex items-center space-x-2 cursor-pointer border border-stone-300">
                    <RefreshCw className="w-4 h-4 text-stone-600" />
                    <span>{t('Reset to Factory Defaults')}</span>
                  </button>
                </div>
              </div>
            )}

            {/* 15. Help & Support Section */}
            {activeCategory === 'help_support' && (
              <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm space-y-6 eco-card font-sans">
                <div className="border-b border-stone-200 pb-3">
                  <h3 className="text-base font-black text-stone-900 flex items-center space-x-2">
                    <HelpCircle className="w-4.5 h-4.5 text-emerald-800" />
                    <span>{t('Help & Support')} Knowledgebase</span>
                  </h3>
                  <p className="text-xs text-stone-500 font-medium">Farmer documentation, video tutorials, and direct agronomist support hotline.</p>
                </div>

                <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl space-y-2 text-xs">
                  <h4 className="font-black text-stone-900">🌾 Need Agronomist Expert Support?</h4>
                  <p className="text-stone-600">Contact AgriSense AI Farmer Hotline: <strong>1800-425-AGRI (24/7 Free Call)</strong></p>
                </div>
              </div>
            )}

            {/* 16. About Section */}
            {activeCategory === 'about' && (
              <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm space-y-6 eco-card font-sans">
                <div className="border-b border-stone-200 pb-3">
                  <h3 className="text-base font-black text-stone-900 flex items-center space-x-2">
                    <Info className="w-4.5 h-4.5 text-emerald-800" />
                    <span>{t('About')} AgriSense AI Platform</span>
                  </h3>
                  <p className="text-xs text-stone-500 font-medium">System version, active licenses, and legal terms agreement.</p>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl space-y-1">
                    <div className="font-extrabold text-stone-900 text-sm">AgriSense AI Smart Agriculture Platform</div>
                    <div className="text-stone-500">Version 2.4.0 (Build 2026.08.21 • Production Release)</div>
                    <div className="text-[11px] text-emerald-800 font-bold pt-1">© 2026 AgriSense AI Technologies. All Rights Reserved.</div>
                  </div>

                  <button type="button" onClick={() => setShowTermsModal(true)} className="px-4 py-2 bg-stone-900 text-lime-300 font-bold text-xs rounded-xl flex items-center space-x-2 cursor-pointer">
                    <Scale className="w-4 h-4 text-lime-400" />
                    <span>{t('Review Terms & Conditions')}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Bottom Save Bar */}
            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-lime-300 font-extrabold rounded-2xl shadow-lg hover:shadow-xl flex items-center space-x-2 transition-all cursor-pointer border border-lime-400/30"
              >
                <Save className="w-4.5 h-4.5 text-lime-400" />
                <span>{t('Save All System Settings & API Keys')}</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Terms Modal */}
      <TermsModal isOpen={showTermsModal} onClose={() => setShowTermsModal(false)} />
    </div>
  );
};
