import React, { useState } from 'react';
import { Sprout, Lock, Mail, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const Login = ({ onNavigateToDashboard, onNavigateToRegister, onNavigateToForgot }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('manager@agrisense.io');
  const [password, setPassword] = useState('password123');
  const [role, setRole] = useState('manager');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all credentials.');
      return;
    }
    login({ email, role, name: role === 'manager' ? 'Dr. Sarah Jenkins' : 'Elena Rostova' });
    onNavigateToDashboard();
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex p-3 bg-emerald-950/80 border border-emerald-800/60 rounded-xl text-emerald-400">
            <Sprout className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-100">Welcome Back</h2>
          <p className="text-sm text-slate-400">Sign in to manage your smart farm & IoT nodes</p>
        </div>

        {error && (
          <div className="p-3 bg-rose-950/80 border border-rose-800/60 rounded-xl text-rose-400 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Select User Role</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => { setRole('manager'); setEmail('manager@agrisense.io'); }}
                className={`py-2 px-3 text-xs font-semibold rounded-xl border flex items-center justify-center space-x-2 transition-all ${
                  role === 'manager'
                    ? 'bg-emerald-950/80 border-emerald-500 text-emerald-400'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Farm Manager</span>
              </button>

              <button
                type="button"
                onClick={() => { setRole('farmer'); setEmail('farmer@agrisense.io'); }}
                className={`py-2 px-3 text-xs font-semibold rounded-xl border flex items-center justify-center space-x-2 transition-all ${
                  role === 'farmer'
                    ? 'bg-emerald-950/80 border-emerald-500 text-emerald-400'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>Farmer</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                placeholder="name@agrisense.io"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-400">Password</label>
              {onNavigateToForgot && (
                <button
                  type="button"
                  onClick={onNavigateToForgot}
                  className="text-xs text-emerald-400 hover:underline"
                >
                  Forgot?
                </button>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-950/50 flex items-center justify-center space-x-2 transition-all"
          >
            <span>Sign In to Platform</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-500">
          Don't have an account?{' '}
          <button onClick={onNavigateToRegister} className="text-emerald-400 hover:underline font-semibold">
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};
