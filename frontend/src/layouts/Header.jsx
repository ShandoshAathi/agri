import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useFarm } from '../context/FarmContext';
import { useTelemetry } from '../context/TelemetryContext';
import { 
  Bell, 
  Shield, 
  UserCheck, 
  CheckCircle, 
  AlertTriangle, 
  Activity, 
  ChevronDown, 
  LogOut,
  Sparkles,
  Layers
} from 'lucide-react';

export const Header = ({ _currentPage, setCurrentPage }) => {
  const { user, role, switchRole, logout } = useAuth();
  const { farms, selectedFarmId, setSelectedFarmId, notifications, markNotificationRead } = useFarm();
  const { telemetry } = useTelemetry();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 px-4 lg:px-6 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentPage('dashboard')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent leading-none">
              AgriSense AI
            </h1>
            <p className="text-[11px] text-slate-400 font-medium tracking-wide">Smart IoT Ecosystem</p>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-2 pl-4 border-l border-slate-800">
          <Layers className="w-4 h-4 text-emerald-400" />
          <select
            value={selectedFarmId}
            onChange={(e) => setSelectedFarmId(e.target.value)}
            className="bg-slate-900/80 text-sm text-slate-200 border border-slate-700/60 rounded-lg px-3 py-1.5 focus:outline-none focus:border-emerald-500 cursor-pointer"
          >
            {farms.map(farm => (
              <option key={farm.id} value={farm.id}>
                {farm.name} ({farm.crop})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="hidden lg:flex items-center space-x-3 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30">
        <div className="flex items-center space-x-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-semibold text-emerald-300">ESP32 Mesh Live</span>
        </div>
        <span className="text-slate-600">|</span>
        <div className="flex items-center space-x-2 text-xs text-slate-300">
          <span>Soil Moisture: <strong className="text-emerald-400">{telemetry.soilMoisture}%</strong></span>
          <span>Temp: <strong className="text-teal-300">{telemetry.temperature}°C</strong></span>
          <span>Pump: <strong className={telemetry.pumpStatus === 'ON' ? 'text-emerald-400 font-bold animate-pulse' : 'text-slate-400'}>{telemetry.pumpStatus}</strong></span>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-700/80">
          <button
            onClick={() => switchRole('manager')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
              role === 'manager' 
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 shadow-md font-bold' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Manager</span>
          </button>
          <button
            onClick={() => switchRole('farmer')}
            className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1.5 ${
              role === 'farmer' 
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 shadow-md font-bold' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Farmer</span>
          </button>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl bg-slate-900/80 border border-slate-700/60 text-slate-300 hover:text-emerald-400 transition-all hover:border-emerald-500/50"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white font-bold text-[10px] flex items-center justify-center border-2 border-slate-950">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 md:w-96 glass-panel rounded-2xl p-4 shadow-2xl z-50 border border-slate-700/80">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="font-semibold text-slate-100 flex items-center space-x-2">
                  <Bell className="w-4 h-4 text-emerald-400" />
                  <span>Farm Alerts & Activity</span>
                </h3>
                <span className="text-xs text-slate-400">{unreadCount} new</span>
              </div>
              <div className="py-2 max-h-72 overflow-y-auto space-y-2">
                {notifications.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-4">No notifications</p>
                ) : (
                  notifications.map(item => (
                    <div 
                      key={item.id} 
                      onClick={() => markNotificationRead(item.id)}
                      className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                        item.read 
                          ? 'bg-slate-900/40 border-slate-800/60 opacity-60' 
                          : 'bg-slate-800/80 border-slate-700 text-slate-200'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {item.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />}
                        {item.type === 'alert' && <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />}
                        {item.type === 'success' && <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />}
                        {item.type === 'info' && <Activity className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />}
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold">{item.title}</span>
                            <span className="text-[10px] text-slate-400">{item.time}</span>
                          </div>
                          <p className="text-slate-400 text-[11px] mt-0.5">{item.message}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <button 
                onClick={() => { setCurrentPage('notifications'); setShowNotifications(false); }} 
                className="w-full text-center text-xs text-emerald-400 hover:text-emerald-300 font-medium pt-2 border-t border-slate-800/80 block"
              >
                View all notifications →
              </button>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center space-x-2 p-1.5 rounded-xl bg-slate-900/80 border border-slate-700/60 hover:border-emerald-500/50 transition-all"
          >
            <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-lg object-cover border border-emerald-500/40" />
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-slate-200 leading-tight">{user.name}</p>
              <p className="text-[10px] text-emerald-400 capitalize">{role}</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-56 glass-panel rounded-2xl p-2 shadow-2xl z-50 border border-slate-700/80">
              <div className="p-2 border-b border-slate-800">
                <p className="text-xs font-bold text-slate-100">{user.name}</p>
                <p className="text-[11px] text-slate-400">{user.email}</p>
                <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30 capitalize">
                  Role: {role}
                </span>
              </div>
              <button
                onClick={() => { setCurrentPage('profile'); setShowProfileMenu(false); }}
                className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-slate-800/80 hover:text-emerald-400 rounded-lg transition-all"
              >
                View Profile
              </button>
              <button
                onClick={() => { setCurrentPage('settings'); setShowProfileMenu(false); }}
                className="w-full text-left px-3 py-2 text-xs text-slate-300 hover:bg-slate-800/80 hover:text-emerald-400 rounded-lg transition-all"
              >
                System Settings
              </button>
              <button
                onClick={() => { logout(); setCurrentPage('login'); setShowProfileMenu(false); }}
                className="w-full text-left px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all flex items-center space-x-2"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
