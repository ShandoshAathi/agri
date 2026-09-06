import React, { useState } from 'react';
import { 
  Sprout, 
  Lock, 
  Mail, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  UserCheck, 
  Eye, 
  EyeOff, 
  Globe, 
  Check, 
  Monitor, 
  Laptop as LaptopIcon, 
  Tablet as TabletIcon, 
  Smartphone,
  Leaf,
  LayoutGrid
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Login = ({ onNavigateToDashboard, onNavigateToRegister, onNavigateToForgot, onNavigateToSplash }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('manager@agrisense.io');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('manager'); // 'manager' is default
  const [rememberMe, setRememberMe] = useState(true);
  const [language, setLanguage] = useState('English');
  const [error, setError] = useState('');
  const [deviceMode, setDeviceMode] = useState('full'); // 'full', 'grid', 'desktop', 'laptop', 'tablet', 'mobile'

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter your email/mobile and password.');
      return;
    }
    setError('');
    login({ email, role, name: role === 'manager' ? 'Dr. Sarah Jenkins' : 'Elena Rostova' });
    if (onNavigateToDashboard) onNavigateToDashboard();
  };

  // Centered Frosted Glass Authentication Card with 35px Backdrop Blur
  const renderLoginCard = () => (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-8 bg-slate-950 font-['Inter',_sans-serif] selection:bg-emerald-500/30 overflow-hidden">
      {/* Ambient Background & Soft Leaf Glass Decorators */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/splash_background.png" 
          alt="AgriSense AI Background" 
          className="w-full h-full object-cover object-center filter brightness-[0.70] contrast-105"
        />
        <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[4px]" />
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-950/60 to-emerald-950/40" />
      </div>

      {/* Decorative Bottom Corner Soft Green Leaf Illustrations & Subtle Glass Accents */}
      <div className="absolute bottom-4 left-4 z-10 pointer-events-none opacity-25 hidden lg:block transform -rotate-12">
        <div className="p-4 rounded-3xl bg-emerald-500/10 backdrop-blur-md border border-emerald-500/20 shadow-xl">
          <Leaf className="w-24 h-24 text-emerald-400 filter drop-shadow-[0_0_12px_rgba(52,211,153,0.4)]" />
        </div>
      </div>
      <div className="absolute bottom-4 right-4 z-10 pointer-events-none opacity-25 hidden lg:block transform rotate-12">
        <div className="p-4 rounded-3xl bg-teal-500/10 backdrop-blur-md border border-teal-500/20 shadow-xl">
          <Leaf className="w-28 h-28 text-teal-300 filter drop-shadow-[0_0_14px_rgba(45,212,191,0.4)]" />
        </div>
      </div>

      {/* Main Centered Frosted Glass Authentication Card */}
      <div className="relative z-20 w-full max-w-[460px] bg-slate-900/65 backdrop-blur-[35px] border border-white/20 rounded-[32px] p-6 sm:p-9 shadow-[0_25px_60px_rgba(0,0,0,0.6)] text-slate-100 my-auto transition-all">
        
        {/* Top Control Header inside Card */}
        <div className="flex items-center justify-between mb-6">
          <button
            type="button"
            onClick={onNavigateToSplash || onNavigateToDashboard}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-slate-200 hover:text-white transition-all flex items-center justify-center cursor-pointer shadow-sm active:scale-95"
            title="Back to Landing Page"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {/* Language Selector Dropdown */}
          <div className="relative inline-flex items-center space-x-1.5 bg-white/10 border border-white/15 rounded-full px-3 py-1.5 text-xs font-semibold text-slate-200 hover:text-white transition-all shadow-sm">
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent text-xs text-slate-100 focus:outline-none cursor-pointer pr-1"
            >
              <option value="English" className="bg-slate-900 text-slate-100">English (US)</option>
              <option value="Spanish" className="bg-slate-900 text-slate-100">Español</option>
              <option value="French" className="bg-slate-900 text-slate-100">Français</option>
              <option value="German" className="bg-slate-900 text-slate-100">Deutsch</option>
            </select>
          </div>
        </div>

        {/* AgriSense AI Branding Header */}
        <div className="text-center space-y-3 mb-6">
          <div className="inline-flex p-3.5 rounded-2xl bg-gradient-to-tr from-[#2E7D32] via-[#43A047] to-[#66BB6A] shadow-xl shadow-emerald-950/60 ring-1 ring-white/30">
            <Sprout className="w-8 h-8 text-white filter drop-shadow-md" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Manrope',_sans-serif] tracking-tight">
              Welcome Back! 👋
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">
              Login to continue to AgriSense AI
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-500/20 border border-rose-500/40 rounded-2xl text-rose-300 text-xs font-semibold text-center animate-fade-in">
            {error}
          </div>
        )}

        {/* Segmented Role Selector */}
        <div className="bg-slate-950/70 p-1.5 rounded-2xl border border-white/15 grid grid-cols-2 gap-1.5 mb-5 shadow-inner">
          <button
            type="button"
            onClick={() => { setRole('manager'); setEmail('manager@agrisense.io'); }}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
              role === 'manager'
                ? 'bg-gradient-to-r from-[#2E7D32] to-[#43A047] text-white shadow-md shadow-emerald-950/60 ring-1 ring-white/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Farm Manager</span>
          </button>

          <button
            type="button"
            onClick={() => { setRole('farmer'); setEmail('farmer@agrisense.io'); }}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center space-x-2 transition-all cursor-pointer ${
              role === 'farmer'
                ? 'bg-gradient-to-r from-[#2E7D32] to-[#43A047] text-white shadow-md shadow-emerald-950/60 ring-1 ring-white/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Farmer</span>
          </button>
        </div>

        {/* Modern Rounded Input Fields */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 ml-1">
              Email Address or Mobile Number
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950/60 border border-white/15 rounded-2xl py-3 pl-11 pr-4 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all shadow-inner"
                placeholder="name@agrisense.io or +1 555-0192"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5 ml-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950/60 border border-white/15 rounded-2xl py-3 pl-11 pr-11 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all shadow-inner"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-slate-400 hover:text-slate-200 transition-all cursor-pointer"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Remember Me Checkbox & Forgot Password Link */}
          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center space-x-2 cursor-pointer select-none text-slate-300">
              <div 
                onClick={() => setRememberMe(!rememberMe)}
                className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all ${
                  rememberMe ? 'bg-emerald-600 border-emerald-500 text-white shadow-sm' : 'border-slate-600 bg-slate-950/70'
                }`}
              >
                {rememberMe && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <span className="font-medium">Remember Me</span>
            </label>

            <button
              type="button"
              onClick={onNavigateToForgot}
              className="font-semibold text-emerald-400 hover:text-emerald-300 hover:underline transition-all cursor-pointer"
            >
              Forgot Password?
            </button>
          </div>

          {/* Large Green Gradient Login Button */}
          <button
            type="submit"
            className="w-full py-3.5 text-sm font-bold text-white bg-gradient-to-r from-[#2E7D32] via-[#43A047] to-[#66BB6A] hover:opacity-95 rounded-2xl shadow-xl shadow-emerald-950/70 ring-1 ring-white/20 flex items-center justify-center space-x-2 transition-all transform hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
          >
            <span>Login to AgriSense AI</span>
            <ArrowRight className="w-4.5 h-4.5" />
          </button>
        </form>

        {/* Social Login Divider */}
        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-white/15 w-full" />
          <span className="bg-slate-900/90 px-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider absolute">
            or continue with
          </span>
        </div>

        {/* Social Login Buttons: Google, Apple, Microsoft */}
        <div className="grid grid-cols-3 gap-3">
          {/* Google */}
          <button
            type="button"
            onClick={handleSubmit}
            className="py-2.5 px-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center space-x-2 text-xs font-bold text-slate-200 transition-all cursor-pointer active:scale-95 shadow-sm"
            title="Sign in with Google"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.3 8.9 5 12 5z"/>
              <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"/>
              <path fill="#FBBC05" d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.6 7.4C.6 9.4 0 11.6 0 14s.6 4.6 1.6 6.6l3.7-2.9z"/>
              <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.3-6.7-5.3L1.6 16C3.5 19.8 7.4 23 12 23z"/>
            </svg>
            <span className="hidden sm:inline">Google</span>
          </button>

          {/* Apple */}
          <button
            type="button"
            onClick={handleSubmit}
            className="py-2.5 px-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center space-x-2 text-xs font-bold text-slate-200 transition-all cursor-pointer active:scale-95 shadow-sm"
            title="Sign in with Apple"
          >
            <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.32c.67-.82 1.12-1.96.99-3.1-.96.04-2.13.64-2.82 1.45-.62.72-1.16 1.88-1.01 3 .08 0 2.16-.5 2.84-1.35z"/>
            </svg>
            <span className="hidden sm:inline">Apple</span>
          </button>

          {/* Microsoft */}
          <button
            type="button"
            onClick={handleSubmit}
            className="py-2.5 px-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center space-x-2 text-xs font-bold text-slate-200 transition-all cursor-pointer active:scale-95 shadow-sm"
            title="Sign in with Microsoft"
          >
            <svg className="w-4 h-4" viewBox="0 0 23 23">
              <path fill="#F35325" d="M1 1h10v10H1z"/>
              <path fill="#81BC06" d="M12 1h10v10H12z"/>
              <path fill="#05A6F0" d="M1 12h10v10H1z"/>
              <path fill="#FFBA08" d="M12 12h10v10H12z"/>
            </svg>
            <span className="hidden sm:inline">Microsoft</span>
          </button>
        </div>

        {/* Footer Link */}
        <div className="text-center text-xs text-slate-300 pt-2">
          Don't have an account?{' '}
          <button 
            type="button"
            onClick={onNavigateToRegister} 
            className="text-emerald-400 hover:text-emerald-300 font-extrabold hover:underline transition-all cursor-pointer ml-1"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Device Preview Selector Toolbar */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-3 z-50 shadow-md">
        <div className="flex items-center space-x-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          <span className="text-xs sm:text-sm font-bold text-slate-200 tracking-wide font-['Manrope',_sans-serif]">
            AgriSense AI — Multi-Device Responsive Demonstration
          </span>
        </div>

        <div className="flex items-center flex-wrap justify-center gap-1.5 bg-slate-950 p-1 rounded-2xl border border-slate-800">
          <button
            onClick={() => setDeviceMode('full')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
              deviceMode === 'full' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Responsive Full</span>
          </button>

          <button
            onClick={() => setDeviceMode('grid')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
              deviceMode === 'grid' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>All Devices Showcase Grid</span>
          </button>

          <button
            onClick={() => setDeviceMode('desktop')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
              deviceMode === 'desktop' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop (2560px)</span>
          </button>

          <button
            onClick={() => setDeviceMode('laptop')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
              deviceMode === 'laptop' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LaptopIcon className="w-3.5 h-3.5" />
            <span>Laptop (1440px)</span>
          </button>

          <button
            onClick={() => setDeviceMode('tablet')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
              deviceMode === 'tablet' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <TabletIcon className="w-3.5 h-3.5" />
            <span>Tablet (768px)</span>
          </button>

          <button
            onClick={() => setDeviceMode('mobile')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${
              deviceMode === 'mobile' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile (390px)</span>
          </button>
        </div>
      </div>

      {/* Main Viewport Workspace Container */}
      <div className="flex-1 flex justify-center items-center overflow-auto p-4 sm:p-8 bg-slate-950">
        {deviceMode === 'full' && (
          <div className="w-full h-full min-h-screen">
            {renderLoginCard()}
          </div>
        )}

        {/* Simultaneous All Devices Showcase Grid */}
        {deviceMode === 'grid' && (
          <div className="w-full max-w-7xl py-6 space-y-8">
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-extrabold text-white font-['Manrope',_sans-serif]">
                Simultaneous Responsive Demonstration Across 4 Form Factors
              </h3>
              <p className="text-xs text-slate-400">
                Demonstrating identical glassmorphism authentication card, input styling, and layout adaptation across Desktop, Laptop, Tablet, and Mobile.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start justify-items-center">
              {/* 1. Desktop Frame (2560px scaled) */}
              <div className="w-full max-w-[620px] h-[520px] rounded-2xl border-4 border-slate-800 shadow-2xl overflow-hidden relative bg-slate-900">
                <div className="bg-slate-900 h-6 border-b border-slate-800 px-4 flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-[10px] text-slate-300 font-mono mx-auto">1. UltraWide Desktop Monitor (2560 x 1440)</span>
                </div>
                <div className="h-[calc(100%-1.5rem)] overflow-auto transform origin-top-left scale-[0.80] w-[125%] h-[125%]">
                  {renderLoginCard()}
                </div>
              </div>

              {/* 2. Laptop Frame (1440px scaled) */}
              <div className="w-full max-w-[620px] h-[520px] rounded-2xl border-4 border-slate-800 shadow-2xl overflow-hidden relative bg-slate-900">
                <div className="bg-slate-900 h-6 border-b border-slate-800 px-4 flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500" />
                  <div className="w-3 h-3 rounded-full bg-amber-500" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-[10px] text-slate-300 font-mono mx-auto">2. MacBook Pro Laptop (1440 x 900 Retina)</span>
                </div>
                <div className="h-[calc(100%-1.5rem)] overflow-auto transform origin-top-left scale-[0.85] w-[117%] h-[117%]">
                  {renderLoginCard()}
                </div>
              </div>

              {/* 3. Tablet Frame (768px scaled) */}
              <div className="w-full max-w-[480px] h-[560px] rounded-3xl border-8 border-slate-800 shadow-2xl overflow-hidden relative bg-slate-900">
                <div className="bg-slate-900 h-6 border-b border-slate-800 flex items-center justify-center">
                  <div className="w-12 h-1.5 rounded-full bg-slate-700" />
                </div>
                <div className="h-[calc(100%-1.5rem)] overflow-auto transform origin-top-left scale-[0.82] w-[122%] h-[122%]">
                  {renderLoginCard()}
                </div>
              </div>

              {/* 4. Mobile Frame (390px scaled) */}
              <div className="w-full max-w-[360px] h-[560px] rounded-[36px] border-8 border-slate-800 shadow-2xl overflow-hidden relative bg-slate-900">
                <div className="bg-slate-900 h-7 border-b border-slate-800 flex items-center justify-center relative">
                  <div className="w-16 h-3.5 bg-slate-950 rounded-full" />
                </div>
                <div className="h-[calc(100%-1.75rem)] overflow-auto transform origin-top-left scale-[0.88] w-[113%] h-[113%]">
                  {renderLoginCard()}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Single Device Viewports */}
        {deviceMode === 'desktop' && (
          <div className="w-[1280px] h-[760px] max-w-full rounded-2xl border-4 border-slate-800 shadow-2xl overflow-hidden relative scale-95">
            <div className="bg-slate-900 h-6 border-b border-slate-800 px-4 flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-[10px] text-slate-300 font-mono mx-auto">Desktop Monitor (2560 x 1440 HiDPI Display)</span>
            </div>
            <div className="h-[calc(100%-1.5rem)] overflow-auto">
              {renderLoginCard()}
            </div>
          </div>
        )}

        {deviceMode === 'laptop' && (
          <div className="w-[1024px] h-[690px] max-w-full rounded-2xl border-4 border-slate-800 shadow-2xl overflow-hidden relative scale-95">
            <div className="bg-slate-900 h-6 border-b border-slate-800 px-4 flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-rose-500" />
              <div className="w-3 h-3 rounded-full bg-amber-500" />
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-[10px] text-slate-300 font-mono mx-auto">MacBook Pro Laptop (1440 x 900 Retina)</span>
            </div>
            <div className="h-[calc(100%-1.5rem)] overflow-auto">
              {renderLoginCard()}
            </div>
          </div>
        )}

        {deviceMode === 'tablet' && (
          <div className="w-[768px] h-[920px] max-w-full rounded-3xl border-8 border-slate-800 shadow-2xl overflow-hidden relative scale-90">
            <div className="bg-slate-900 h-6 border-b border-slate-800 flex items-center justify-center">
              <div className="w-12 h-1.5 rounded-full bg-slate-700" />
            </div>
            <div className="h-[calc(100%-1.5rem)] overflow-auto">
              {renderLoginCard()}
            </div>
          </div>
        )}

        {deviceMode === 'mobile' && (
          <div className="w-[390px] h-[820px] max-w-full rounded-[40px] border-8 border-slate-800 shadow-2xl overflow-hidden relative scale-95">
            <div className="bg-slate-900 h-7 border-b border-slate-800 flex items-center justify-center relative">
              <div className="w-20 h-4 bg-slate-950 rounded-full" />
            </div>
            <div className="h-[calc(100%-1.75rem)] overflow-auto">
              {renderLoginCard()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
