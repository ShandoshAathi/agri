import React from 'react';
import { 
  LayoutDashboard, 
  Sprout, 
  Activity, 
  Sparkles, 
  ShieldCheck, 
  Droplets, 
  BarChart3, 
  Bell, 
  User, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export const Sidebar = ({ currentPage, setCurrentPage, collapsed, setCollapsed }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'farms', label: 'Farms & Plots', icon: Sprout },
    { id: 'monitoring', label: 'Live Telemetry', icon: Activity },
    { id: 'recommendation', label: 'Crop Advisor AI', icon: Sparkles },
    { id: 'diagnosis', label: 'Leaf CV Diagnosis', icon: ShieldCheck },
    { id: 'irrigation', label: 'Smart Irrigation', icon: Droplets },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'notifications', label: 'Alerts & Logs', icon: Bell },
    { id: 'profile', label: 'User Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className={`bg-slate-950/90 border-r border-slate-800/80 transition-all duration-300 flex flex-col ${
      collapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="p-4 flex items-center justify-between border-b border-slate-800/60">
        {!collapsed && <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Navigation</span>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-100 mx-auto"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      <div className="flex-1 py-4 space-y-1 px-2 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-emerald-600/90 to-teal-600/90 text-white shadow-lg shadow-emerald-950/50'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              {!collapsed && <span>{item.label}</span>}
            </button>
          );
        })}
      </div>
    </aside>
  );
};
