import React, { useState } from 'react';
import { useAuth, initialUsers } from '../context/AuthContext';
import { 
  Sparkles, 
  Shield, 
  UserCheck, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight,
  HelpCircle,
  X
} from 'lucide-react';

export const Login = ({ onNavigateToDashboard, onNavigateToRegister }) => {
  const { login } = useAuth();

  const [email, setEmail] = useState(initialUsers.manager.email);
  const [password, setPassword] = useState('password123');
  const [selectedRole, setSelectedRole] = useState('manager'); // 'manager' or 'farmer'
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password, selectedRole);
    onNavigateToDashboard();
  };

  const handleQuickLogin = (roleType) => {
    setSelectedRole(roleType);
    const preset = initialUsers[roleType];
    setEmail(preset.email);
    setPassword('password123');
    login(preset.email, 'password123', roleType);
    onNavigateToDashboard();
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setResetSent(true);
    setTimeout(() => {
      setResetSent(false);
      setShowForgotModal(false);
      setResetEmail('');
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-teal-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md glass-panel p-8 rounded-3xl shadow-2xl border border-slate-800 relative z-10">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 mx-auto mb-3 shadow-lg shadow-emerald-500/30">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-emerald-400" />
            </div>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
            Welcome to AgriSense AI
          </h2>
          <p className="text-xs text-slate-400 mt-1">Select your account role to sign in to your dashboard</p>
        </div>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-900/90 rounded-2xl border border-slate-800 mb-6">
          <button
            type="button"
            onClick={() => {
              setSelectedRole('manager');
              setEmail(initialUsers.manager.email);
            }}
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
            onClick={() => {
              setSelectedRole('farmer');
              setEmail(initialUsers.farmer.email);
            }}
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full glass-input rounded-xl pl-10 pr-4 py-2.5 text-xs"
                placeholder="name@agrisense.io"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-300">Password</label>
              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="text-[11px] text-emerald-400 hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full glass-input rounded-xl pl-10 pr-10 py-2.5 text-xs"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 hover:from-emerald-400 hover:to-cyan-400 shadow-lg shadow-emerald-500/25 transition-all flex items-center justify-center space-x-2 mt-2"
          >
            <span>Sign In to Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Demo Credentials Assistant */}
        <div className="mt-6 pt-4 border-t border-slate-800 text-center">
          <p className="text-[11px] text-slate-400 mb-2">Quick Demo Access:</p>
          <div className="flex space-x-2 justify-center">
            <button
              onClick={() => handleQuickLogin('manager')}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 hover:border-emerald-500/40 hover:text-emerald-400 transition-all"
            >
              Manager Demo
            </button>
            <button
              onClick={() => handleQuickLogin('farmer')}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-300 hover:border-emerald-500/40 hover:text-emerald-400 transition-all"
            >
              Farmer Demo
            </button>
          </div>
        </div>

        <div className="mt-4 text-center">
          <p className="text-xs text-slate-400">
            Don't have an account?{' '}
            <button onClick={onNavigateToRegister} className="text-emerald-400 font-semibold hover:underline">
              Register here
            </button>
          </p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="glass-panel p-6 rounded-2xl w-full max-w-sm border border-slate-800 relative">
            <button
              onClick={() => setShowForgotModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-200"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-base font-bold text-slate-100 mb-1">Reset Your Password</h3>
            <p className="text-xs text-slate-400 mb-4">Enter your email address and we will send you a recovery link.</p>

            {resetSent ? (
              <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-center">
                <p className="text-xs text-emerald-300 font-semibold">Password reset link sent to your email!</p>
              </div>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-3">
                <input
                  type="email"
                  required
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="w-full glass-input rounded-xl px-3 py-2 text-xs"
                  placeholder="Enter registered email"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-all"
                >
                  Send Reset Link
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
