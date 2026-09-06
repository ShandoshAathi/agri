import React, { useState } from 'react';
import { 
  Sprout, 
  Lock, 
  Mail, 
  ArrowRight, 
  ArrowLeft,
  Eye, 
  EyeOff, 
  Globe, 
  X,
  Droplets,
  Thermometer,
  Calendar,
  CheckCircle2,
  Users
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { LanguageSelector } from '../../components/LanguageSelector';
import { TermsModal } from '../../components/TermsModal';
import farmBg from '../../assets/farm_bg.jpg';

export const Login = ({ onNavigateToDashboard, onNavigateToRegister, onNavigateToForgot, onNavigateToSplash }) => {
  const { login } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [email, setEmail] = useState('farmer@agrisense.io');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('farmer');
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [showTermsModal, setShowTermsModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter your email/mobile and password.');
      return;
    }
    setError('');
    login({ email, role, name: role === 'manager' ? 'Dr. Arthur Vance' : 'Elena Rostova' });
    if (onNavigateToDashboard) onNavigateToDashboard();
  };

  return (
    <div className="h-screen max-h-screen w-full relative font-sans text-stone-950 flex items-center justify-center p-2 sm:p-4 lg:p-6 overflow-hidden select-none">
      
      {/* Full Viewport Background Agriculture Palmyra Tree Image */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <img 
          src={farmBg} 
          alt="Tamil Nadu Agriculture Field & Palmyra Trees"
          className="w-full h-full object-cover object-center transform scale-105"
        />
        <div className="absolute inset-0 bg-stone-900/10" />
      </div>

      {/* Main Floating Non-Scrollable Layout */}
      <div className="relative z-20 w-full max-w-[1240px] h-[calc(100vh-1.5rem)] max-h-[96vh] flex flex-col lg:flex-row gap-4 lg:gap-6 my-auto overflow-hidden">

        {/* LEFT PANEL: Phone-Curved Glass Card */}
        <div className="w-full lg:w-[48%] xl:w-[44%] h-full bg-white/30 backdrop-blur-md rounded-[36px] p-4 sm:p-6 lg:p-8 flex flex-col justify-between overflow-y-auto border border-white/70 shadow-2xl my-auto">
          
          {/* Top Bar */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={onNavigateToSplash || onNavigateToRegister || onNavigateToDashboard}
                className="p-2 rounded-full bg-white/80 hover:bg-white text-stone-950 transition-all cursor-pointer border border-white/90 shadow-md"
                title="Back"
              >
                <ArrowLeft className="w-4 h-4 text-stone-950" />
              </button>

              {/* Pill Logo Badge */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-white/90 bg-white/80 text-stone-950 text-xs font-black font-mono tracking-wide shadow-md">
                <Sprout className="w-4 h-4 text-emerald-800" />
                <span className="text-stone-950 font-black">AgriSense AI 🌱</span>
              </div>

              {/* Language Selector */}
              <LanguageSelector variant="pill" />
            </div>

            {/* Header: Title & Subtitle */}
            <div className="space-y-1 pt-2">
              <h1 className="text-2xl sm:text-3xl xl:text-4xl font-black text-stone-950 tracking-tight font-['Manrope',_sans-serif] drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">
                {t('Welcome Back')}
              </h1>
              <p className="text-xs sm:text-sm text-stone-950 font-black drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">
                {t('Sign in to monitor real-time IoT sensors & AI crop health')}
              </p>
            </div>

            {error && (
              <div className="p-2.5 bg-rose-100/95 border border-rose-300 rounded-xl text-rose-950 text-xs font-black text-center shadow-md">
                {t(error)}
              </div>
            )}

            {/* Segmented Role Switcher Pills */}
            <div className="grid grid-cols-2 gap-2 bg-white/50 p-1 rounded-full border border-white/80 shadow-md">
              <button
                type="button"
                onClick={() => { setRole('manager'); setEmail('manager@agrisense.io'); }}
                className={`py-2.5 px-3 rounded-full text-xs font-black transition-all cursor-pointer ${
                  role === 'manager'
                    ? 'bg-stone-950 text-white shadow-xl'
                    : 'text-stone-950 hover:bg-white/60 font-black'
                }`}
              >
                👨‍💼 {t('Farm Manager')}
              </button>

              <button
                type="button"
                onClick={() => { setRole('farmer'); setEmail('farmer@agrisense.io'); }}
                className={`py-2.5 px-3 rounded-full text-xs font-black transition-all cursor-pointer ${
                  role === 'farmer'
                    ? 'bg-stone-950 text-white shadow-xl'
                    : 'text-stone-950 hover:bg-white/60 font-black'
                }`}
              >
                👨‍🌾 {t('Lead Farmer')}
              </button>
            </div>

            {/* Ultra-Clear Crystal Inputs */}
            <form onSubmit={handleSubmit} className="space-y-3 pt-1">
              <div>
                <label className="block text-xs font-black text-stone-950 mb-1 pl-3 uppercase tracking-wider drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
                  {t('Email or Phone Number')}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/90 border border-white/90 rounded-full py-3 px-5 text-xs sm:text-sm font-black text-stone-950 placeholder:text-stone-700 focus:outline-none focus:bg-white focus:ring-2 focus:ring-amber-400 shadow-md transition-all"
                    placeholder="email@agrisense.io"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-stone-950 mb-1 pl-3 uppercase tracking-wider drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
                  {t('Password')}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/90 border border-white/90 rounded-full py-3 pl-5 pr-12 text-xs sm:text-sm font-black text-stone-950 placeholder:text-stone-700 focus:outline-none focus:bg-white focus:ring-2 focus:ring-amber-400 shadow-md transition-all"
                    placeholder="••••••••••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 text-stone-950 hover:text-emerald-950 transition-colors"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Checkbox & Forgot Password Link */}
              <div className="flex items-center justify-between text-xs px-2 pt-0.5">
                <label className="flex items-center space-x-2 cursor-pointer select-none text-stone-950 font-black drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
                  <input 
                    type="checkbox" 
                    checked={rememberMe} 
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-white/90 text-amber-500 focus:ring-amber-400 w-4 h-4 accent-amber-500 cursor-pointer" 
                  />
                  <span className="text-stone-950 font-black">{t('Remember Me')}</span>
                </label>

                <button
                  type="button"
                  onClick={onNavigateToForgot}
                  className="font-black text-stone-950 hover:text-emerald-950 hover:underline cursor-pointer drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]"
                >
                  {t('Forgot Password?')}
                </button>
              </div>

              {/* Solid Yellow Rounded Pill Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#FACC15] hover:bg-[#F59E0B] text-stone-950 font-black text-sm shadow-xl hover:shadow-2xl transition-all cursor-pointer transform hover:scale-[1.01] active:scale-[0.99] mt-2 border border-amber-300"
              >
                {t('Login')}
              </button>

              {/* Secondary Option directly under Login button */}
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={onNavigateToRegister}
                  className="w-full py-3 rounded-full bg-white/80 hover:bg-white text-stone-950 font-black text-xs shadow-md border border-white/90 transition-all cursor-pointer hover:shadow-lg flex items-center justify-center space-x-1"
                >
                  <span>{t("Don't have an account?")}</span>
                  <span className="text-emerald-950 font-black underline ml-1">{t('Sign up / Create Account')} →</span>
                </button>
              </div>
            </form>
          </div>

          {/* Footer Row */}
          <div className="flex items-center justify-between text-xs text-stone-950 font-black pt-3 border-t border-stone-900/20">
            <span className="text-stone-950 font-black drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
              AgriSense AI 🌱
            </span>

            <button
              type="button"
              onClick={() => setShowTermsModal(true)}
              className="text-stone-950 hover:text-emerald-950 hover:underline cursor-pointer font-black drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]"
            >
              {t('Terms & Conditions')}
            </button>
          </div>
        </div>

        {/* RIGHT PANEL: Floating Crextio Glass Widgets */}
        <div className="hidden lg:flex w-full lg:w-[52%] xl:w-[56%] h-full relative my-auto overflow-hidden">
          
          {/* FLOATING GLASS WIDGET 1: Top Yellow Badge */}
          <div className="absolute top-6 left-6 z-20 space-y-2 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="bg-[#FACC15] text-stone-950 px-4 py-2 rounded-2xl shadow-xl border border-amber-300/60 flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-stone-950 animate-pulse" />
              <div className="text-xs font-black">
                <div>Sector 4 Irrigation Review</div>
                <div className="text-[10px] font-bold text-stone-900">09:30am - 10:00am</div>
              </div>
            </div>
            <div className="bg-stone-950/90 backdrop-blur-md text-stone-200 px-3.5 py-1.5 rounded-xl shadow-md text-xs font-mono border border-stone-700/60 ml-4">
              09:30am - 10:00am
            </div>
          </div>

          {/* FLOATING GLASS WIDGET 2: Middle Calendar Row & Team Avatars */}
          <div className="absolute right-6 top-1/4 z-20 space-y-3 flex flex-col items-end">
            
            {/* Avatar Stack */}
            <div className="flex -space-x-2 overflow-hidden bg-white/30 backdrop-blur-md p-1.5 rounded-full border border-white/40 shadow-xl">
              <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150" alt="Specialist" />
              <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150" alt="Farmer" />
              <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" alt="Manager" />
            </div>

            {/* Glass Calendar Bar */}
            <div className="bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl p-3.5 text-stone-950 shadow-2xl text-center">
              <div className="grid grid-cols-7 gap-2.5 text-[11px] font-black uppercase tracking-wider text-stone-900 pb-1">
                <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
              </div>
              <div className="grid grid-cols-7 gap-2.5 text-xs font-black font-mono">
                <span className="opacity-80">22</span>
                <span className="opacity-80">23</span>
                <span className="opacity-80">24</span>
                <span className="bg-stone-950 text-white rounded-lg py-0.5 px-1 shadow-md">25</span>
                <span>26</span>
                <span>27</span>
                <span>28</span>
              </div>
            </div>
          </div>

          {/* FLOATING GLASS WIDGET 3: Bottom Left Card (Daily Telemetry Sync) */}
          <div className="absolute bottom-6 left-6 z-20 bg-white/95 backdrop-blur-lg p-4 rounded-2xl border border-white shadow-2xl max-w-xs space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-black text-stone-950">Daily Telemetry Sync</h4>
                <p className="text-[10px] text-stone-600 font-bold">12:00pm - 01:00pm</p>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex -space-x-1">
                <div className="w-6 h-6 rounded-full bg-emerald-700 text-white text-[10px] font-black flex items-center justify-center border-2 border-white">AV</div>
                <div className="w-6 h-6 rounded-full bg-amber-600 text-white text-[10px] font-black flex items-center justify-center border-2 border-white">ER</div>
                <div className="w-6 h-6 rounded-full bg-teal-700 text-white text-[10px] font-black flex items-center justify-center border-2 border-white font-mono">+4</div>
              </div>
              <span className="text-[10px] font-extrabold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded-xl border border-emerald-300">
                IoT Active
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Terms & Conditions Modal */}
      <TermsModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
      />
    </div>
  );
};
