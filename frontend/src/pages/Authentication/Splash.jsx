import React, { useState, useEffect } from 'react';
import { Sprout, Sparkles, ArrowRight, ChevronRight, ShieldCheck } from 'lucide-react';

export const Splash = ({ onGetStarted, onLogin }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 12);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (progress >= 100 && onGetStarted) {
      const autoRedirectTimer = setTimeout(() => {
        onGetStarted();
      }, 150);
      return () => clearTimeout(autoRedirectTimer);
    }
  }, [progress, onGetStarted]);

  const getLoadingMessage = (p) => {
    if (p < 30) return "Initializing ESP32 Telemetry Sensors...";
    if (p < 65) return "Connecting IoT Mesh Gateway...";
    if (p < 95) return "Loading AI Predictive Models...";
    return "AgriSense AI System Ready!";
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between items-center text-slate-900 font-sans selection:bg-emerald-200 overflow-hidden bg-white">
      {/* Sunlit Farm Fullscreen Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/sunlit_farm_bg.png" 
          alt="Sunlit Farm Background" 
          className="w-full h-full object-cover object-center scale-105 filter brightness-105 contrast-105 transition-all duration-1000"
        />
        {/* Soft Ambient White Top Gradient for Header Readability */}
        <div className="absolute inset-x-0 top-0 h-64 sm:h-80 bg-gradient-to-b from-white via-white/90 to-transparent z-10 pointer-events-none" />
        {/* Soft Emerald Bottom Gradient for Card Contrast */}
        <div className="absolute inset-x-0 bottom-0 h-72 sm:h-96 bg-gradient-to-t from-emerald-950/70 via-emerald-950/30 to-transparent z-10 pointer-events-none" />
      </div>

      {/* Top Header Navigation Bar */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-6 pt-6 flex items-center justify-between">
        {/* Brand Logo & Title */}
        <div className="flex items-center space-x-3 cursor-pointer" onClick={onLogin}>
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-800 p-2 shadow-lg shadow-emerald-900/20 flex items-center justify-center border border-white/80">
            <Sprout className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight font-['Manrope',_sans-serif] text-[#1A5328]">
              AgriSense <span className="text-[#73BA28]">AI</span>
            </h1>
            <p className="text-[11px] font-bold text-[#64748B] tracking-wide">
              Smart Farming Assistant
            </p>
          </div>
        </div>

        {/* Top Right Actions */}
        <div className="flex items-center space-x-3">
          {onLogin && (
            <button 
              onClick={onLogin}
              className="px-4 py-2 rounded-xl text-xs font-extrabold text-slate-800 bg-white/80 hover:bg-white border border-slate-200 backdrop-blur-md shadow-xs transition-all cursor-pointer"
            >
              Sign In
            </button>
          )}
          {onGetStarted && (
            <button 
              onClick={onGetStarted}
              className="hidden sm:flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-black text-emerald-950 bg-[#4ADE80] hover:bg-emerald-300 shadow-md transition-all transform hover:scale-105 cursor-pointer"
            >
              <span>Explore Platform</span>
              <ArrowRight className="w-4 h-4 text-emerald-950" />
            </button>
          )}
        </div>
      </header>

      {/* Center Hero Branding Section */}
      <main className="relative z-20 flex flex-col items-center justify-center text-center px-6 my-auto space-y-4 max-w-3xl">
        {/* Custom 3-Leaf Gradient Emblem */}
        <div className="relative group p-2">
          <svg viewBox="0 0 64 64" fill="none" className="w-20 h-20 sm:w-24 sm:h-24 filter drop-shadow-xl transform hover:scale-105 transition-transform duration-500">
            <path d="M32 8C32 8 44 20 44 36C44 44 38.5 50 32 52C25.5 50 20 44 20 36C20 20 32 8 32 8Z" fill="url(#leafCenterHero)" />
            <path d="M28 36C28 36 15 31 9 40C3 48 9 55 16 55C23 55 28 47 28 36Z" fill="url(#leafLeftHero)" />
            <path d="M36 36C36 36 49 31 55 40C61 48 55 55 48 55C41 55 36 47 36 36Z" fill="url(#leafRightHero)" />
            <path d="M32 52V58" stroke="#154D27" strokeWidth="3" strokeLinecap="round" />
            <defs>
              <linearGradient id="leafCenterHero" x1="32" y1="8" x2="32" y2="52" gradientUnits="userSpaceOnUse">
                <stop stopColor="#4ADE80" />
                <stop offset="1" stopColor="#154D27" />
              </linearGradient>
              <linearGradient id="leafLeftHero" x1="9" y1="31" x2="28" y2="55" gradientUnits="userSpaceOnUse">
                <stop stopColor="#22C55E" />
                <stop offset="1" stopColor="#14532D" />
              </linearGradient>
              <linearGradient id="leafRightHero" x1="55" y1="31" x2="36" y2="55" gradientUnits="userSpaceOnUse">
                <stop stopColor="#86EFAC" />
                <stop offset="1" stopColor="#15803D" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight font-['Manrope',_sans-serif]">
            <span className="text-[#1A5328]">AgriSense</span> <span className="text-[#73BA28]">AI</span>
          </h1>
          <p className="text-sm sm:text-lg font-bold text-[#475569] tracking-wide max-w-xl mx-auto">
            Smart Agriculture. Smarter Decisions. Better Future.
          </p>
        </div>
      </main>

      {/* Bottom Frosted Translucent Card with Telemetry Progress */}
      <footer className="relative z-20 w-full max-w-md mx-auto px-6 pb-8 sm:pb-12">
        <div className="bg-[#1F5C35]/85 backdrop-blur-2xl border border-white/20 rounded-[32px] p-6 sm:p-7 shadow-2xl text-center text-white space-y-4 font-sans">
          
          <div className="inline-flex p-2.5 rounded-2xl bg-white/10 border border-white/20 shadow-xs mb-1">
            <Sprout className="w-6 h-6 text-white" />
          </div>

          <div className="space-y-0.5">
            <h3 className="text-xl sm:text-2xl font-bold tracking-wide font-['Manrope',_sans-serif] text-white">
              Smart Farming
            </h3>
            <p className="text-base sm:text-xl font-semibold text-emerald-100">
              Better Future
            </p>
          </div>

          {/* Dynamic Loading Status Text */}
          <div className="flex items-center justify-between text-xs font-bold text-emerald-200 px-1 pt-1">
            <span className="flex items-center space-x-1.5 text-[11px] font-semibold text-emerald-100">
              <Sparkles className="w-3.5 h-3.5 text-lime-300 animate-spin" />
              <span>{getLoadingMessage(progress)}</span>
            </span>
            <span className="font-mono font-black text-lime-300">{progress}%</span>
          </div>

          {/* Animated Green Progress Bar */}
          <div className="w-full bg-black/30 rounded-full h-2 overflow-hidden p-0.5 border border-white/10">
            <div 
              className="bg-[#4ADE80] h-full rounded-full transition-all duration-300 shadow-sm shadow-emerald-400/50"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Action Button */}
          <div className="pt-1">
            <button 
              onClick={onGetStarted} 
              className={`w-full py-3 text-xs font-black rounded-2xl shadow-xl flex items-center justify-center space-x-2 transition-all transform cursor-pointer ${
                progress === 100 
                  ? 'bg-[#4ADE80] hover:bg-emerald-300 text-emerald-950 border border-lime-400 scale-105 shadow-lime-400/30 animate-pulse' 
                  : 'bg-[#4ADE80]/90 hover:bg-emerald-300 text-emerald-950 border border-lime-400/80'
              }`}
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 text-emerald-950" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
