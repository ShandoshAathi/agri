import React from 'react';
import { Sprout, Bell, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Navbar = ({ onSearch }) => {
  const { user } = useAuth();
  return (
    <nav className="h-16 bg-slate-950/80 border-b border-slate-800/80 px-6 flex items-center justify-between backdrop-blur-md">
      <div className="flex items-center space-x-3">
        <Sprout className="w-6 h-6 text-emerald-400" />
        <span className="font-bold text-slate-100 text-lg bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
          AgriSense AI
        </span>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search farm plots, telemetry..."
            onChange={(e) => onSearch && onSearch(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-xl py-2 pl-9 pr-4 focus:outline-none focus:border-emerald-500 w-64"
          />
        </div>

        <button className="p-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 hover:text-white">
          <Bell className="w-4 h-4" />
        </button>

        <div className="flex items-center space-x-2 border-l border-slate-800 pl-4">
          <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
            {user?.name?.[0] || 'U'}
          </div>
          <span className="text-xs font-semibold text-slate-200 hidden sm:inline">{user?.name || 'Manager'}</span>
        </div>
      </div>
    </nav>
  );
};
