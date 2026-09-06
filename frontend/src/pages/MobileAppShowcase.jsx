import React, { useState } from 'react';
import { Sprout, Lock, ArrowLeft, Eye, Bell, Droplets, Thermometer, Activity, AlertTriangle, Layers, ChevronRight, TrendingUp, Upload, User, Phone, Sliders, Zap, Grid } from 'lucide-react';

export const MobileAppShowcase = ({ _onNavigateToDashboard }) => {
  const [activeTab, setActiveTab] = useState('all_screens'); // 'all_screens', or 1 to 15
  const [role, setRole] = useState('manager');
  const [_autoIrrigation, _setAutoIrrigation] = useState(true);
  const [_notificationsToggle, _setNotificationsToggle] = useState(true);
  const [_selectedLanguage, _setSelectedLanguage] = useState('English');

  // iOS Header Component
  const MobileHeader = ({ title, showBack = false, rightAction = null }) => (
    <div className="bg-[#FAF7F2] border-b border-stone-200/90 px-4 py-3 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
      <div className="flex items-center space-x-2">
        {showBack && (
          <button className="p-1 text-stone-700 hover:text-stone-900 rounded-full hover:bg-stone-200/60 transition-all">
            <ArrowLeft className="w-5 h-5 text-emerald-900" />
          </button>
        )}
        <span className="font-extrabold text-stone-900 text-sm font-['Manrope',_sans-serif]">{title}</span>
      </div>
      {rightAction}
    </div>
  );

  // iOS Status Bar
  const StatusBar = () => (
    <div className="bg-[#FAF7F2] px-5 pt-2 pb-1 flex items-center justify-between text-[11px] font-extrabold text-stone-800 border-b border-stone-200/60">
      <span>9:41</span>
      <div className="flex items-center space-x-1.5 text-emerald-950">
        <svg className="w-3.5 h-3.5 fill-current text-emerald-900" viewBox="0 0 24 24"><path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 18.2C2.9 16.5 2 14.36 2 12 2 6.48 6.48 2 12 2s10 4.48 10 10c0 2.36-.9 4.5-2.35 6.2l-.62-.59C20.26 16.07 21 14.12 21 12c0-4.97-4.03-9-9-9z"/></svg>
        <span className="text-[10px] font-black text-emerald-900">5G</span>
        <div className="w-5 h-2.5 rounded-xs border border-emerald-900 p-0.5 flex items-center">
          <div className="w-full h-full bg-emerald-800 rounded-2xs" />
        </div>
      </div>
    </div>
  );

  // Bottom Navigation Bar
  const BottomNav = ({ active = 'home', onChange }) => (
    <div className="bg-[#FAF7F2] border-t border-stone-200/90 px-2 py-2 flex items-center justify-around text-[10px] font-bold text-stone-600 sticky bottom-0 z-30">
      <button 
        onClick={() => onChange && onChange('home')} 
        className={`flex flex-col items-center space-y-0.5 cursor-pointer transition-all ${active === 'home' ? 'text-emerald-950 font-black bg-lime-300/60 px-2.5 py-1 rounded-full border border-lime-400/50 shadow-2xs' : 'hover:text-stone-900'}`}
      >
        <Sprout className="w-4.5 h-4.5 text-emerald-800" />
        <span>Home</span>
      </button>
      <button 
        onClick={() => onChange && onChange('crops')} 
        className={`flex flex-col items-center space-y-0.5 cursor-pointer transition-all ${active === 'crops' ? 'text-emerald-950 font-black bg-lime-300/60 px-2.5 py-1 rounded-full border border-lime-400/50 shadow-2xs' : 'hover:text-stone-900'}`}
      >
        <Layers className="w-4.5 h-4.5 text-emerald-800" />
        <span>Crops</span>
      </button>
      <button 
        onClick={() => onChange && onChange('sensors')} 
        className={`flex flex-col items-center space-y-0.5 cursor-pointer transition-all ${active === 'sensors' ? 'text-emerald-950 font-black bg-lime-300/60 px-2.5 py-1 rounded-full border border-lime-400/50 shadow-2xs' : 'hover:text-stone-900'}`}
      >
        <Activity className="w-4.5 h-4.5 text-emerald-800" />
        <span>Sensors</span>
      </button>
      <button 
        onClick={() => onChange && onChange('analytics')} 
        className={`flex flex-col items-center space-y-0.5 cursor-pointer transition-all ${active === 'analytics' ? 'text-emerald-950 font-black bg-lime-300/60 px-2.5 py-1 rounded-full border border-lime-400/50 shadow-2xs' : 'hover:text-stone-900'}`}
      >
        <TrendingUp className="w-4.5 h-4.5 text-emerald-800" />
        <span>Analytics</span>
      </button>
      <button 
        onClick={() => onChange && onChange('more')} 
        className={`flex flex-col items-center space-y-0.5 cursor-pointer transition-all ${active === 'more' ? 'text-emerald-950 font-black bg-lime-300/60 px-2.5 py-1 rounded-full border border-lime-400/50 shadow-2xs' : 'hover:text-stone-900'}`}
      >
        <Sliders className="w-4.5 h-4.5 text-emerald-800" />
        <span>More</span>
      </button>
    </div>
  );

  // Screen 1: Splash Screen
  const Screen1 = () => (
    <div className="bg-gradient-to-b from-[#14532D] via-[#15803D] to-[#0A381C] text-white min-h-[640px] h-full flex flex-col items-center justify-between p-6 rounded-[32px] overflow-hidden shadow-xl border border-emerald-900/50">
      <div className="w-full flex justify-between text-xs text-emerald-200 font-medium">
        <span>9:41</span>
        <span>5G</span>
      </div>

      <div className="flex flex-col items-center text-center space-y-4 my-auto">
        <div className="relative p-5 rounded-full border-2 border-emerald-400/40 bg-emerald-900/40 backdrop-blur-md shadow-2xl">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-300/40 flex items-center justify-center">
            <Sprout className="w-12 h-12 text-emerald-300" />
          </div>
        </div>

        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold font-['Manrope',_sans-serif] tracking-tight">AgriSense AI</h1>
          <p className="text-xs text-emerald-200 font-medium">Smart Agriculture Better Future</p>
        </div>
      </div>

      <div className="flex flex-col items-center space-y-2 pb-6">
        <div className="w-6 h-6 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin" />
        <span className="text-xs text-emerald-300 font-medium">Loading...</span>
      </div>
    </div>
  );

  // Screen 2: Login Screen
  const Screen2 = () => (
    <div className="bg-[#FAF7F2] text-stone-900 min-h-[640px] h-full flex flex-col justify-between p-5 rounded-[32px] overflow-hidden border border-stone-200 shadow-xl font-sans">
      <StatusBar />
      
      <div className="flex items-center justify-between my-2">
        <ArrowLeft className="w-5 h-5 text-stone-600" />
        <div className="flex items-center space-x-1 text-emerald-900 font-extrabold text-sm">
          <Sprout className="w-5 h-5 text-lime-600" />
          <span>AgriSense AI</span>
        </div>
        <div className="w-5" />
      </div>

      <div className="text-center my-2 space-y-1">
        <h2 className="text-xl font-black text-stone-900 font-['Manrope',_sans-serif]">Welcome Back! 👋</h2>
        <p className="text-xs text-stone-500 font-medium">Login to continue</p>
      </div>

      {/* Role Selector */}
      <div className="bg-stone-200/80 p-1 rounded-xl grid grid-cols-2 gap-1 text-xs font-bold my-2">
        <button 
          onClick={() => setRole('manager')} 
          className={`py-2 rounded-lg transition-all ${role === 'manager' ? 'bg-[#14532D] text-[#BEF264] shadow-xs' : 'text-stone-700'}`}
        >
          Farm Manager
        </button>
        <button 
          onClick={() => setRole('farmer')} 
          className={`py-2 rounded-lg transition-all ${role === 'farmer' ? 'bg-[#14532D] text-[#BEF264] shadow-xs' : 'text-stone-700'}`}
        >
          Farmer
        </button>
      </div>

      {/* Inputs */}
      <div className="space-y-3 my-2">
        <div>
          <label className="block text-[11px] font-bold text-stone-700 mb-1">Email or Phone Number</label>
          <div className="relative">
            <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            <input 
              type="text" 
              defaultValue="manager@agrisense.io" 
              className="w-full bg-white border border-stone-300 rounded-xl py-2.5 pl-9 pr-3 text-xs text-stone-900 focus:outline-none focus:border-emerald-700"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-bold text-stone-700 mb-1">Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            <input 
              type="password" 
              defaultValue="••••••••" 
              className="w-full bg-white border border-stone-300 rounded-xl py-2.5 pl-9 pr-9 text-xs text-stone-900 focus:outline-none focus:border-emerald-700"
            />
            <Eye className="w-4 h-4 text-stone-400 absolute right-3 top-3" />
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px]">
          <label className="flex items-center space-x-1.5 cursor-pointer text-stone-600 font-medium">
            <input type="checkbox" defaultChecked className="rounded border-stone-300 text-emerald-800 focus:ring-emerald-700" />
            <span>Remember Me</span>
          </label>
          <span className="text-emerald-800 font-bold cursor-pointer">Forgot Password?</span>
        </div>

        <button className="w-full py-3 bg-[#14532D] hover:bg-emerald-900 text-[#BEF264] font-black text-xs rounded-xl shadow-md transition-all border border-lime-400/30">
          Login
        </button>
      </div>

      <div className="text-center text-[10px] text-stone-400 my-1 font-semibold">or continue with</div>

      <div className="flex justify-center space-x-3 my-2">
        <button className="w-10 h-10 rounded-full border border-stone-300 bg-white flex items-center justify-center shadow-xs">
          <svg className="w-4 h-4" viewBox="0 0 24 24"><path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.3 8.9 5 12 5z"/><path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/><path fill="#FBBC05" d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.6 7.4C.6 9.4 0 11.6 0 14s.6 4.6 1.6 6.6l3.7-2.9z"/><path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.3-6.7-5.3L1.6 16C3.5 19.8 7.4 23 12 23z"/></svg>
        </button>
        <button className="w-10 h-10 rounded-full border border-stone-300 bg-white flex items-center justify-center shadow-xs">
          <Phone className="w-4 h-4 text-emerald-800" />
        </button>
      </div>

      <div className="text-center text-xs text-stone-600 font-medium mt-2">
        Don't have an account? <span className="text-emerald-800 font-extrabold cursor-pointer">Register</span>
      </div>
    </div>
  );

  // Screen 3: Dashboard Overview
  const Screen3 = () => (
    <div className="bg-slate-50 text-slate-800 min-h-[640px] h-full flex flex-col justify-between rounded-[32px] overflow-hidden border border-slate-200 shadow-xl">
      <StatusBar />
      
      <div className="p-4 space-y-3 overflow-y-auto">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xs font-bold text-slate-900">Good Morning, Rajesh Kumar 👋</h3>
            <p className="text-[10px] text-slate-500">22 May 2025</p>
          </div>
          <div className="flex items-center space-x-2">
            <Bell className="w-4 h-4 text-slate-600" />
            <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">RK</div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl px-3 py-2 flex items-center justify-between text-xs font-medium">
          <span>Green Valley Farm</span>
          <ChevronRight className="w-4 h-4 text-slate-400 rotate-90" />
        </div>

        {/* 4 Stat Badges */}
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-2">
            <span className="text-[9px] text-emerald-700 block">Total Farms</span>
            <span className="text-sm font-extrabold text-emerald-900">08</span>
            <span className="text-[9px] text-emerald-600 block">Active</span>
          </div>
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-2">
            <span className="text-[9px] text-blue-700 block">Sensors</span>
            <span className="text-sm font-extrabold text-blue-900">24</span>
            <span className="text-[9px] text-blue-600 block">Online</span>
          </div>
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-2">
            <span className="text-[9px] text-amber-700 block">Irrigation</span>
            <span className="text-sm font-extrabold text-amber-900">05</span>
            <span className="text-[9px] text-amber-600 block">Running</span>
          </div>
          <div className="bg-rose-50 border border-rose-100 rounded-xl p-2">
            <span className="text-[9px] text-rose-700 block">Alerts</span>
            <span className="text-sm font-extrabold text-rose-900">07</span>
            <span className="text-[9px] text-rose-600 block">Active</span>
          </div>
        </div>

        {/* Live Overview 2x2 */}
        <div className="space-y-1.5">
          <span className="text-[11px] font-bold text-slate-700">Live Overview</span>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white border border-slate-200 p-2.5 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 block">Temperature</span>
                <span className="text-xs font-bold text-slate-900">26.6°C</span>
              </div>
              <Thermometer className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="bg-white border border-slate-200 p-2.5 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 block">Humidity</span>
                <span className="text-xs font-bold text-slate-900">65%</span>
              </div>
              <Droplets className="w-5 h-5 text-blue-500" />
            </div>
            <div className="bg-white border border-slate-200 p-2.5 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 block">Soil Moisture</span>
                <span className="text-xs font-bold text-slate-900">68%</span>
              </div>
              <Sprout className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="bg-white border border-slate-200 p-2.5 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-500 block">pH Level</span>
                <span className="text-xs font-bold text-slate-900">6.8</span>
              </div>
              <Activity className="w-5 h-5 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Today's Summary */}
        <div className="bg-white border border-slate-200 rounded-xl p-3 space-y-2">
          <span className="text-[11px] font-bold text-slate-800 block">Today's Summary</span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex justify-between text-[11px] text-slate-600"><span>Irrigation Duration</span><span className="font-bold">2h 35m</span></div>
            <div className="flex justify-between text-[11px] text-slate-600"><span>Water Used</span><span className="font-bold">4,250 L</span></div>
            <div className="flex justify-between text-[11px] text-slate-600"><span>Rainfall</span><span className="font-bold">0 mm</span></div>
            <div className="flex justify-between text-[11px] text-slate-600"><span>Energy Used</span><span className="font-bold">2.4 kWh</span></div>
          </div>
        </div>
      </div>

      <BottomNav active="home" />
    </div>
  );

  // Screen 4: Farm Selection Manager
  const Screen4 = () => (
    <div className="bg-slate-50 text-slate-800 min-h-[640px] h-full flex flex-col justify-between rounded-[32px] overflow-hidden border border-slate-200 shadow-xl">
      <StatusBar />
      <MobileHeader title="My Farms" rightAction={<button className="px-2.5 py-1 bg-emerald-600 text-white text-[10px] font-bold rounded-lg">+ Add New Farm</button>} />

      <div className="p-4 space-y-3 overflow-y-auto">
        <p className="text-[11px] text-slate-500">Select a farm to continue</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <div className="h-20 bg-emerald-800 relative">
              <img src="/splash_background.png" alt="Farm" className="w-full h-full object-cover opacity-80" />
              <span className="absolute top-2 right-2 bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">Active</span>
            </div>
            <div className="p-2">
              <h4 className="text-xs font-bold text-slate-900">Green Valley Farm</h4>
              <p className="text-[10px] text-slate-500">Coimbatore, TN</p>
              <span className="text-[10px] font-semibold text-emerald-600 mt-1 block">12.5 Acres</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs">
            <div className="h-20 bg-teal-800 relative">
              <img src="/splash_background.png" alt="Farm" className="w-full h-full object-cover opacity-80" />
              <span className="absolute top-2 right-2 bg-emerald-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">Active</span>
            </div>
            <div className="p-2">
              <h4 className="text-xs font-bold text-slate-900">Sunrise Farm</h4>
              <p className="text-[10px] text-slate-500">Erode, TN</p>
              <span className="text-[10px] font-semibold text-emerald-600 mt-1 block">8.7 Acres</span>
            </div>
          </div>
        </div>
      </div>

      <BottomNav active="crops" />
    </div>
  );

  // Screen 5: Farm Dashboard
  const Screen5 = () => (
    <div className="bg-slate-50 text-slate-800 min-h-[640px] h-full flex flex-col justify-between rounded-[32px] overflow-hidden border border-slate-200 shadow-xl">
      <StatusBar />
      <div className="p-4 space-y-3 overflow-y-auto">
        <div className="bg-gradient-to-r from-emerald-800 to-green-700 text-white p-3 rounded-2xl flex justify-between items-center shadow-sm">
          <div>
            <h3 className="text-xs font-bold">Green Valley Farm</h3>
            <p className="text-[10px] text-emerald-200">Coimbatore, Tamil Nadu</p>
          </div>
          <div className="text-right">
            <span className="text-base font-extrabold">28.6°C</span>
            <span className="text-[9px] block text-emerald-200">Partly Cloudy</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-1.5 text-center text-[10px] font-semibold">
          <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-2xs">Sensors</div>
          <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-2xs">Irrigation</div>
          <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-2xs">AI Insights</div>
          <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-2xs">Disease Scan</div>
        </div>

        <div className="bg-white border border-slate-200 p-3 rounded-2xl space-y-2">
          <span className="text-xs font-bold text-slate-800 block">Live Sensor Readings</span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 bg-slate-50 rounded-xl"><span>Soil Moisture</span><span className="font-bold block text-emerald-600">32% Normal</span></div>
            <div className="p-2 bg-slate-50 rounded-xl"><span>Temperature</span><span className="font-bold block text-emerald-600">28.6°C Normal</span></div>
          </div>
        </div>
      </div>
      <BottomNav active="home" />
    </div>
  );

  // Screen 6: Live Sensor Monitoring
  const Screen6 = () => (
    <div className="bg-slate-50 text-slate-800 min-h-[640px] h-full flex flex-col justify-between rounded-[32px] overflow-hidden border border-slate-200 shadow-xl">
      <StatusBar />
      <MobileHeader title="Live Sensor Monitoring" showBack />
      <div className="p-4 space-y-3 overflow-y-auto">
        <div className="flex justify-between items-center text-xs">
          <span className="text-slate-500">Real-time data from farm</span>
          <span className="font-bold text-emerald-600">All Sensors v</span>
        </div>

        <div className="bg-white border border-slate-200 p-3 rounded-xl space-y-1">
          <div className="flex justify-between text-xs font-bold"><span>Temperature</span><span className="text-emerald-600">28.6°C</span></div>
          <div className="h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-[10px] text-emerald-700">Sparkline Graph</div>
        </div>
      </div>
      <BottomNav active="sensors" />
    </div>
  );

  // Screen 7: Smart Irrigation
  const Screen7 = () => (
    <div className="bg-slate-50 text-slate-800 min-h-[640px] h-full flex flex-col justify-between rounded-[32px] overflow-hidden border border-slate-200 shadow-xl">
      <StatusBar />
      <MobileHeader title="Smart Irrigation" showBack />
      <div className="p-4 space-y-4 overflow-y-auto">
        <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-2xl flex items-center justify-between">
          <div>
            <span className="text-[10px] text-emerald-700 font-semibold block">Pump Status</span>
            <span className="text-sm font-bold text-emerald-900">ON - Running</span>
          </div>
          <Zap className="w-6 h-6 text-emerald-600" />
        </div>

        <div className="flex items-center justify-between text-xs bg-slate-200 p-1 rounded-xl font-semibold">
          <span className="px-4 py-1.5 rounded-lg text-slate-600">Manual</span>
          <span className="px-4 py-1.5 rounded-lg bg-emerald-600 text-white shadow-xs">Automatic</span>
        </div>

        <div className="bg-white border border-slate-200 p-3 rounded-2xl space-y-2">
          <div className="flex justify-between text-xs font-bold"><span>Moisture Threshold</span><span>35%</span></div>
          <input type="range" defaultValue="35" className="w-full accent-emerald-600" />
        </div>

        <button className="w-full py-3 bg-rose-600 text-white font-bold text-xs rounded-xl shadow-md">Stop Irrigation</button>
      </div>
      <BottomNav active="more" />
    </div>
  );

  // Screen 8: AI Crop Recommendation
  const Screen8 = () => (
    <div className="bg-slate-50 text-slate-800 min-h-[640px] h-full flex flex-col justify-between rounded-[32px] overflow-hidden border border-slate-200 shadow-xl">
      <StatusBar />
      <MobileHeader title="AI Crop Recommendation" showBack />
      <div className="p-4 space-y-3 overflow-y-auto">
        <div className="bg-white border border-emerald-200 p-4 rounded-2xl space-y-2 shadow-xs">
          <span className="text-[10px] font-bold text-emerald-600 uppercase">Best Recommended Crop</span>
          <h3 className="text-xl font-extrabold text-slate-900">Rice</h3>
          <span className="text-xs font-semibold text-emerald-700 block">96% Confidence • High yield expected</span>
        </div>

        <div className="bg-white border border-slate-200 p-3 rounded-2xl space-y-2 text-xs font-medium">
          <span className="font-bold text-slate-800 block">Other Suitable Crops</span>
          <div className="flex justify-between border-b border-slate-100 pb-1"><span>Maize</span><span className="font-bold text-emerald-600">92%</span></div>
          <div className="flex justify-between border-b border-slate-100 pb-1"><span>Groundnut</span><span className="font-bold text-emerald-600">82%</span></div>
          <div className="flex justify-between"><span>Sorghum</span><span className="font-bold text-emerald-600">85%</span></div>
        </div>

        <button className="w-full py-2.5 bg-emerald-600 text-white font-bold text-xs rounded-xl">View Detailed Report</button>
      </div>
      <BottomNav active="crops" />
    </div>
  );

  // Screen 9: Disease Diagnosis
  const Screen9 = () => (
    <div className="bg-slate-50 text-slate-800 min-h-[640px] h-full flex flex-col justify-between rounded-[32px] overflow-hidden border border-slate-200 shadow-xl">
      <StatusBar />
      <MobileHeader title="Disease Diagnosis" showBack />
      <div className="p-4 space-y-3 overflow-y-auto">
        <div className="border-2 border-dashed border-emerald-300 bg-emerald-50/50 p-6 rounded-2xl text-center space-y-2">
          <Upload className="w-8 h-8 text-emerald-600 mx-auto" />
          <span className="text-xs font-bold text-slate-800 block">Upload Leaf Image</span>
          <button className="px-4 py-1.5 bg-emerald-600 text-white text-xs font-semibold rounded-lg">Choose Image</button>
        </div>
      </div>
      <BottomNav active="crops" />
    </div>
  );

  // Screen 10: Analytics & Reports
  const Screen10 = () => (
    <div className="bg-slate-50 text-slate-800 min-h-[640px] h-full flex flex-col justify-between rounded-[32px] overflow-hidden border border-slate-200 shadow-xl">
      <StatusBar />
      <MobileHeader title="Analytics & Reports" showBack />
      <div className="p-4 space-y-3 overflow-y-auto">
        <div className="grid grid-cols-2 gap-2 text-xs font-bold text-center">
          <div className="bg-white p-2 rounded-xl border border-slate-200">Water Used<span className="block text-emerald-600 font-extrabold text-sm">12,450 L</span></div>
          <div className="bg-white p-2 rounded-xl border border-slate-200">Duration<span className="block text-emerald-600 font-extrabold text-sm">18h 45m</span></div>
        </div>
      </div>
      <BottomNav active="analytics" />
    </div>
  );

  // Screen 11: Notifications
  const Screen11 = () => (
    <div className="bg-slate-50 text-slate-800 min-h-[640px] h-full flex flex-col justify-between rounded-[32px] overflow-hidden border border-slate-200 shadow-xl">
      <StatusBar />
      <MobileHeader title="Notifications" showBack />
      <div className="p-4 space-y-2 overflow-y-auto">
        <div className="bg-white border border-slate-200 p-2.5 rounded-xl text-xs flex items-center space-x-2">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <div><span className="font-bold block">Low Soil Moisture in Farm A</span><span className="text-[10px] text-slate-400">10 min ago</span></div>
        </div>
      </div>
      <BottomNav active="more" />
    </div>
  );

  // Screen 12: Profile
  const Screen12 = () => (
    <div className="bg-slate-50 text-slate-800 min-h-[640px] h-full flex flex-col justify-between rounded-[32px] overflow-hidden border border-slate-200 shadow-xl">
      <StatusBar />
      <div className="p-4 space-y-4 overflow-y-auto text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-600 text-white text-xl font-bold flex items-center justify-center mx-auto shadow-md">A</div>
        <div><h3 className="font-bold text-slate-900 text-sm">Aathi</h3><p className="text-xs text-slate-500">Green Valley Farm</p></div>
      </div>
      <BottomNav active="more" />
    </div>
  );

  // Screen 13: Settings
  const Screen13 = () => (
    <div className="bg-slate-50 text-slate-800 min-h-[640px] h-full flex flex-col justify-between rounded-[32px] overflow-hidden border border-slate-200 shadow-xl">
      <StatusBar />
      <MobileHeader title="Settings" showBack />
      <div className="p-4 space-y-2 overflow-y-auto text-xs font-semibold">
        <div className="bg-white p-3 rounded-xl border border-slate-200 flex justify-between"><span>Account Settings</span><ChevronRight className="w-4 h-4 text-slate-400" /></div>
        <div className="bg-white p-3 rounded-xl border border-slate-200 flex justify-between"><span>Notification Settings</span><ChevronRight className="w-4 h-4 text-slate-400" /></div>
        <button className="w-full py-3 bg-rose-50 text-rose-600 border border-rose-200 rounded-xl font-bold">Logout</button>
      </div>
      <BottomNav active="more" />
    </div>
  );

  // Screen 14: Farm Management Manager
  const Screen14 = () => (
    <div className="bg-slate-50 text-slate-800 min-h-[640px] h-full flex flex-col justify-between rounded-[32px] overflow-hidden border border-slate-200 shadow-xl">
      <StatusBar />
      <MobileHeader title="Farm Management" showBack rightAction={<button className="px-2 py-1 bg-emerald-600 text-white text-[10px] font-bold rounded-lg">+ Add Farm</button>} />
      <div className="p-4 space-y-2 overflow-y-auto">
        <div className="bg-white p-3 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
          <div><span className="font-bold block">Green Valley Farm</span><span className="text-[10px] text-slate-500">12.5 Acres</span></div>
          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 font-bold text-[9px] rounded-full">Active</span>
        </div>
      </div>
      <BottomNav active="more" />
    </div>
  );

  // Screen 15: Farmer Management Manager
  const Screen15 = () => (
    <div className="bg-slate-50 text-slate-800 min-h-[640px] h-full flex flex-col justify-between rounded-[32px] overflow-hidden border border-slate-200 shadow-xl">
      <StatusBar />
      <MobileHeader title="Farmer Management" showBack rightAction={<button className="px-2 py-1 bg-emerald-600 text-white text-[10px] font-bold rounded-lg">+ Add Farmer</button>} />
      <div className="p-4 space-y-2 overflow-y-auto">
        <div className="bg-white p-3 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
          <div><span className="font-bold block">Suresh Babu</span><span className="text-[10px] text-slate-500">Green Valley Farm</span></div>
          <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 font-bold text-[9px] rounded-full">Active</span>
        </div>
      </div>
      <BottomNav active="more" />
    </div>
  );

  const screens = [
    { id: 1, title: '1. Splash Screen', Component: Screen1 },
    { id: 2, title: '2. Login Screen', Component: Screen2 },
    { id: 3, title: '3. Dashboard (Overview)', Component: Screen3 },
    { id: 4, title: '4. Farm Selection (Manager)', Component: Screen4 },
    { id: 5, title: '5. Farm Dashboard', Component: Screen5 },
    { id: 6, title: '6. Live Sensor Monitoring', Component: Screen6 },
    { id: 7, title: '7. Smart Irrigation', Component: Screen7 },
    { id: 8, title: '8. AI Crop Recommendation', Component: Screen8 },
    { id: 9, title: '9. Disease Diagnosis', Component: Screen9 },
    { id: 10, title: '10. Analytics & Reports', Component: Screen10 },
    { id: 11, title: '11. Notifications', Component: Screen11 },
    { id: 12, title: '12. Profile', Component: Screen12 },
    { id: 13, title: '13. Settings', Component: Screen13 },
    { id: 14, title: '14. Farm Management (Manager)', Component: Screen14 },
    { id: 15, title: '15. Farmer Management (Manager)', Component: Screen15 }
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-stone-900 font-sans p-4 sm:p-8">
      {/* Header Toolbar */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-stone-300/80 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-stone-900 font-['Manrope',_sans-serif] flex items-center space-x-2">
            <Sprout className="w-6 h-6 text-emerald-800" />
            <span>AgriSense AI — Complete 15 Screens Mobile App Showcase</span>
          </h2>
          <p className="text-xs text-stone-600 mt-1 font-medium">
            Warm Eco-Modern Organic Design System (Option 3) • 15 High-Fidelity App Mockups
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-stone-200/80 p-1.5 rounded-2xl border border-stone-300">
          <button
            onClick={() => setActiveTab('all_screens')}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center space-x-2 cursor-pointer ${
              activeTab === 'all_screens' ? 'bg-[#14532D] text-[#BEF264] shadow-md border border-lime-400/40' : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            <Grid className="w-4 h-4 text-lime-400" />
            <span>All 15 Screens Grid View</span>
          </button>
        </div>
      </div>

      {/* Screen Selector Tabs */}
      <div className="max-w-7xl mx-auto flex items-center space-x-2 overflow-x-auto pb-4 mb-6">
        <button
          onClick={() => setActiveTab('all_screens')}
          className={`px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer ${
            activeTab === 'all_screens' ? 'bg-[#14532D] text-[#BEF264] border border-lime-400/40' : 'bg-stone-200/70 border border-stone-300 text-stone-700 hover:text-stone-900'
          }`}
        >
          All 15 Screens
        </button>
        {screens.map(s => (
          <button
            key={s.id}
            onClick={() => setActiveTab(s.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeTab === s.id ? 'bg-[#14532D] text-[#BEF264] font-extrabold border border-lime-400/40 shadow-xs' : 'bg-stone-200/70 border border-stone-300 text-stone-700 hover:text-stone-900'
            }`}
          >
            {s.title}
          </button>
        ))}
      </div>

      {/* Main Grid View of All 15 Screens */}
      {activeTab === 'all_screens' && (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {screens.map(s => {
            const Comp = s.Component;
            return (
              <div key={s.id} className="space-y-2 flex flex-col items-center">
                <div className="w-full max-w-[280px] h-[540px] rounded-[32px] border-4 border-stone-800 shadow-2xl overflow-hidden relative scale-100">
                  <Comp />
                </div>
                <span className="text-xs font-bold text-stone-800 text-center">{s.title}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Single Selected Screen View */}
      {activeTab !== 'all_screens' && (
        <div className="max-w-md mx-auto flex flex-col items-center space-y-4">
          <div className="w-full max-w-[340px] h-[640px] rounded-[36px] border-8 border-stone-800 shadow-2xl overflow-hidden relative">
            {React.createElement(screens.find(s => s.id === activeTab).Component)}
          </div>
          <span className="text-sm font-black text-emerald-900">{screens.find(s => s.id === activeTab).title}</span>
        </div>
      )}
    </div>
  );
};
