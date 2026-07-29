import React from 'react';
import { 
  Sparkles, 
  Activity, 
  Sprout, 
  Scan, 
  Droplets, 
  ArrowRight,
  Cpu
} from 'lucide-react';

export const SplashLanding = ({ onGetStarted, onLogin }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between relative overflow-hidden">
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-teal-600/20 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '1s' }}></div>

      <nav className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-lg shadow-emerald-500/30">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
            AgriSense AI
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={onLogin}
            className="px-5 py-2 rounded-xl text-sm font-semibold text-slate-300 hover:text-emerald-400 transition-all border border-slate-800 hover:border-emerald-500/40"
          >
            Sign In
          </button>
          <button
            onClick={onGetStarted}
            className="px-5 py-2 rounded-xl text-sm font-bold bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 hover:from-emerald-400 hover:to-teal-400 shadow-lg shadow-emerald-500/25 transition-all flex items-center space-x-2"
          >
            <span>Launch Platform</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6 pt-12 pb-16 text-center z-10 flex flex-col items-center">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold mb-6">
          <Cpu className="w-4 h-4 text-emerald-400 animate-spin" style={{ animationDuration: '8s' }} />
          <span>Next-Generation AI & ESP32 IoT Smart Farming Engine</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-100 tracking-tight leading-tight mb-6">
          Empowering Agriculture through <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            Real-Time IoT & Artificial Intelligence
          </span>
        </h1>

        <p className="text-slate-400 text-base md:text-lg max-w-2xl mb-8 leading-relaxed">
          Monitor micro-climates in real time, automate precision drip irrigation, receive AI crop recommendations, and diagnose leaf diseases early—all in one unified platform.
        </p>

        <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <button
            onClick={onGetStarted}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl text-base font-bold bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 hover:from-emerald-400 hover:to-cyan-400 shadow-xl shadow-emerald-500/30 transition-all flex items-center justify-center space-x-3"
          >
            <span>Explore Demo System</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16 w-full text-left">
          <div className="glass-card p-6 rounded-2xl">
            <Activity className="w-8 h-8 text-emerald-400 mb-4" />
            <h3 className="text-base font-bold text-slate-100 mb-1">Live IoT Monitoring</h3>
            <p className="text-xs text-slate-400">ESP32 telemetry stream for soil moisture, temp, pH, rain, and water tank levels.</p>
          </div>

          <div className="glass-card p-6 rounded-2xl">
            <Sprout className="w-8 h-8 text-teal-400 mb-4" />
            <h3 className="text-base font-bold text-slate-100 mb-1">AI Crop Advisory</h3>
            <p className="text-xs text-slate-400">ML models analyze micro-climate & soil parameters to suggest optimal crops & yield.</p>
          </div>

          <div className="glass-card p-6 rounded-2xl">
            <Scan className="w-8 h-8 text-cyan-400 mb-4" />
            <h3 className="text-base font-bold text-slate-100 mb-1">Leaf Disease Scan</h3>
            <p className="text-xs text-slate-400">Computer vision model diagnoses crop pathogens instantly with treatment guides.</p>
          </div>

          <div className="glass-card p-6 rounded-2xl">
            <Droplets className="w-8 h-8 text-amber-400 mb-4" />
            <h3 className="text-base font-bold text-slate-100 mb-1">Smart Drip Automation</h3>
            <p className="text-xs text-slate-400">Automated pump relays based on sensor thresholds & rain detection algorithms.</p>
          </div>
        </div>
      </div>

      <footer className="w-full border-t border-slate-900 py-6 text-center text-xs text-slate-500 z-10">
        © 2026 AgriSense AI Platform. All rights reserved. Designed for Farm Managers & Farmers.
      </footer>
    </div>
  );
};
