import React from 'react';
import { Sprout, Bell, User, ShieldCheck, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useFarm } from '../../context/FarmContext';

export const Header = ({ currentPage, setCurrentPage }) => {
  const { user, role, switchRole, logout } = useAuth();
  const { farms, activeFarm, setActiveFarm } = useFarm();

  return (
    <header className="h-16 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="p-2 bg-gradient-to-tr from-emerald-600 to-teal-500 rounded-xl text-white">
            <Sprout className="w-5 h-5" />
          </div>
          <span className="font-bold text-slate-100 text-lg bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
            AgriSense AI
          </span>
        </div>

        {farms && farms.length > 0 && (
          <select
            value={activeFarm?.id || ''}
            onChange={(e) => {
              const selected = farms.find(f => f.id === e.target.value);
              if (selected) setActiveFarm(selected);
            }}
            className="bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-200 py-1.5 px-3 rounded-xl focus:outline-none focus:border-emerald-500"
          >
            {farms.map(f => (
              <option key={f.id} value={f.id}>{f.name} ({f.crop})</option>
            ))}
          </select>
        )}
      </div>

      <div className="flex items-center space-x-3">
        <button
          onClick={switchRole}
          className="px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-300 rounded-xl flex items-center space-x-1.5"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Role: {role === 'manager' ? 'Farm Manager' : 'Farmer'}</span>
        </button>

        <button 
          onClick={logout}
          className="p-2 bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 rounded-xl text-xs"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
