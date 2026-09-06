import React from 'react';
import { 
  LayoutDashboard, 
  Tractor, 
  Activity, 
  Sprout, 
  Scan, 
  Droplets, 
  BarChart3, 
  FileText, 
  Bell, 
  Settings, 
  Smartphone,
  CloudSun,
  Cpu,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Sidebar = ({ currentPage, setCurrentPage }) => {
  const { t } = useLanguage();

  const navigationItems = [
    { id: 'dashboard', label: t('nav_dashboard'), icon: LayoutDashboard },
    { id: 'farms', label: t('nav_farms'), icon: Tractor },
    { id: 'monitoring', label: t('nav_sensors'), icon: Activity },
    { id: 'irrigation', label: t('nav_irrigation'), icon: Droplets },
    { id: 'recommendation', label: t('nav_recommendation'), icon: Sparkles, badge: 'AI' },
    { id: 'diagnosis', label: t('nav_diagnosis'), icon: Scan },
    { id: 'analytics', label: t('nav_analytics'), icon: BarChart3 },
    { id: 'reports', label: t('nav_reports'), icon: FileText },
    { id: 'notifications', label: t('nav_notifications'), icon: Bell, count: 3 },
    { id: 'weather', label: t('nav_weather'), icon: CloudSun },
    { id: 'devices', label: t('nav_devices'), icon: Cpu },
    { id: 'settings', label: t('nav_settings'), icon: Settings },
    { id: 'mobile_showcase', label: t('nav_mobile_showcase'), icon: Smartphone, badge: 'UI' },
  ];

  const activeItem = navigationItems.find(item => item.id === currentPage) || navigationItems[0];

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 max-w-[95vw] font-sans">
      {/* Active Page Name Mention on Top of the Floating Slide Card */}
      <div className="absolute -top-7 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-900/90 text-emerald-400 text-[10px] font-extrabold shadow-xl border border-slate-700/60 backdrop-blur-md flex items-center space-x-1.5 z-40 transition-all pointer-events-none whitespace-nowrap">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="tracking-wider uppercase font-black">{activeItem.label}</span>
      </div>

      {/* Ambient Soft Glow Behind Dock */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/25 via-lime-400/20 to-teal-500/25 blur-2xl rounded-full scale-110 pointer-events-none -z-10" />

      {/* Apple Glassmorphic Floating Dock Bar */}
      <nav className="glass-dock-panel rounded-3xl p-2 flex items-center space-x-1.5 overflow-x-auto scrollbar-none relative z-10">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <div key={item.id} className="relative group flex flex-col items-center">
              {/* Apple macOS Hover Tooltip */}
              <div className="absolute -top-11 left-1/2 -translate-x-1/2 px-3 py-1 rounded-xl bg-slate-900/90 text-white text-[11px] font-extrabold shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-50 border border-slate-700/50 backdrop-blur-md scale-95 group-hover:scale-100">
                {item.label}
              </div>

              {/* Dock Icon Button */}
              <button
                onClick={() => setCurrentPage(item.id)}
                className={`relative p-3 rounded-2xl transition-all duration-300 transform cursor-pointer flex items-center justify-center ${
                  isActive
                    ? 'bg-gradient-to-tr from-emerald-600 to-emerald-500 text-white shadow-lg shadow-emerald-600/35 scale-110 -translate-y-1.5'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/90 hover:scale-125 hover:-translate-y-2 hover:shadow-md'
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />

                {/* Badge Indicator */}
                {item.badge && !isActive && (
                  <span className="absolute -top-1 -right-1 text-[8px] font-black px-1.5 py-0.5 rounded-full bg-emerald-600 text-white shadow-xs">
                    {item.badge}
                  </span>
                )}

                {/* Notification Count Badge */}
                {item.count && !isActive && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 text-[9px] font-black rounded-full bg-rose-500 text-white flex items-center justify-center border-2 border-white shadow-xs">
                    {item.count}
                  </span>
                )}
              </button>

              {/* Apple Active App Glowing Indicator Dot */}
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shadow-emerald-500/80 shadow-xs absolute -bottom-1" />
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};
