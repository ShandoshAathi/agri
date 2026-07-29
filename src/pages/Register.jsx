import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Sparkles, 
  Shield, 
  UserCheck, 
  User, 
  Mail, 
  Lock, 
  Tractor,
  ArrowRight
} from 'lucide-react';

export const Register = ({ onNavigateToDashboard, onNavigateToLogin }) => {
  const { login } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('manager');
  const [farmName, setFarmName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password, selectedRole);
    onNavigateToDashboard();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md glass-panel p-8 rounded-3xl shadow-2xl border border-slate-800 relative z-10">
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 mx-auto mb-3 shadow-lg shadow-emerald-500/30">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
            Create AgriSense Account
          </h2>
          <p className="text-xs text-slate-400 mt-1">Join the AI-powered smart agriculture ecosystem</p>
        </div>

        {/* Role Selector */}
        <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-900/90 rounded-2xl border border-slate-800 mb-5">
          <button
            type="button"
            onClick={() => setSelectedRole('manager')}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
              selectedRole === 'manager'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Farm Manager</span>
          </button>
          <button
            type="button"
            onClick={() => setSelectedRole('farmer')}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 ${
              selectedRole === 'farmer'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Farmer</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full glass-input rounded-xl pl-10 pr-4 py-2 text-xs"
                placeholder="Dr. Arthur Vance"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full glass-input rounded-xl pl-10 pr-4 py-2 text-xs"
                placeholder="name@agrisense.io"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              {selectedRole === 'manager' ? 'Initial Farm Name' : 'Assigned Farm Code'}
            </label>
            <div className="relative">
              <Tractor className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="text"
                required
                value={farmName}
                onChange={(e) => setFarmName(e.target.value)}
                className="w-full glass-input rounded-xl pl-10 pr-4 py-2 text-xs"
                placeholder={selectedRole === 'manager' ? 'e.g., Green Valley Sector 4' : 'e.g., FARM-KEY-882'}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full glass-input rounded-xl pl-10 pr-4 py-2 text-xs"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 hover:from-emerald-400 hover:to-cyan-400 shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center space-x-2 mt-2"
          >
            <span>Register & Start</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-xs text-slate-400">
            Already registered?{' '}
            <button onClick={onNavigateToLogin} className="text-emerald-400 font-semibold hover:underline">
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
