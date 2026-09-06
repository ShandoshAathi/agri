import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, Tractor, Activity, Sprout, Scan, Droplets, BarChart3, FileText, Bell, Settings, User, ChevronRight } from 'lucide-react';

export const Sidebar = ({ currentPage, setCurrentPage, collapsed, setCollapsed }) => {
  const { role } = useAuth();

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, category: 'Overview' },
    { id: 'farms', label: 'Farm Management', icon: Tractor, category: 'Management', managerOnly: true },
    { id: 'monitoring', label: 'Live IoT Monitoring', icon: Activity, category: 'Sensors & Hardware' },
    { id: 'recommendation', label: 'AI Crop Assistant', icon: Sprout, category: 'AI Intelligence' },
    { id: 'diagnosis', label: 'Disease Diagnosis', icon: Scan, category: 'AI Intelligence' },
    { id: 'irrigation', label: 'Smart Irrigation', icon: Droplets, category: 'Automation' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, category: 'Insights' },
    { id: 'reports', label: 'Reports & Export', icon: FileText, category: 'Insights' },
    { id: 'notifications', label: 'Alerts Center', icon: Bell, category: 'System' },
    { id: 'profile', label: 'User Profile', icon: User, category: 'Account' },
    { id: 'settings', label: 'System Settings', icon: Settings, category: 'System' },
  ];

  const filteredItems = navigationItems.filter(item => !item.managerOnly || role === 'manager');

  return (
    <aside className={`transition-all duration-300 ease-in-out glass-panel border-r border-slate-800/80 flex flex-col justify-between ${
      collapsed ? 'w-20' : 'w-64'
    }`}>
      {/* Navigation List */}
      <div className="p-3 space-y-1">
        {filteredItems.map((item, _index) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl transition-all font-medium text-sm ${
                isActive
                  ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/10 border border-emerald-500/40 text-emerald-300 font-semibold shadow-lg shadow-emerald-950/40'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 hover:border-slate-700/50 border border-transparent'
              }`}
            >
              <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
              {!collapsed && (
                <div className="flex-1 text-left flex items-center justify-between">
                  <span>{item.label}</span>
                  {item.category === 'AI Intelligence' && (
                    <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      AI
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer Collapse Toggle */}
      <div className="p-3 border-t border-slate-800/80">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center p-2 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 text-slate-400 hover:text-emerald-400 transition-all"
        >
          <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${collapsed ? '' : 'rotate-180'}`} />
        </button>
      </div>
    </aside>
  );
};
