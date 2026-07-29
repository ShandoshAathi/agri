import React from 'react';
import { 
  Sprout, 
  Cpu, 
  ShieldCheck, 
  ArrowRight, 
  TrendingUp, 
  Droplets,
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';

export const Splash = ({ onGetStarted, onLogin }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500/30">
      {/* Top Navbar */}
      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-gradient-to-tr from-emerald-600 to-teal-500 rounded-xl shadow-lg shadow-emerald-900/30">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                AgriSense AI
              </span>
              <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                Smart Agriculture Platform
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={onLogin}
              className="px-5 py-2.5 text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              Sign In
            </button>
            <button 
              onClick={onGetStarted}
              className="px-6 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl shadow-lg shadow-emerald-900/40 hover:from-emerald-500 hover:to-teal-500 transition-all transform hover:-translate-y-0.5"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 text-xs font-semibold">
              <Sparkles className="w-4 h-4" />
              <span>Next-Gen Precision Smart Farming</span>
            </div>

            <h1 className="text-4xl lg:text-6xl font-extrabold text-slate-100 tracking-tight leading-tight">
              Optimize Yields with <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Real-Time IoT & AI
              </span>
            </h1>

            <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
              Monitor microclimates, run automated drip irrigation, diagnose leaf pathogens with computer vision, and receive AI crop recommendations tailored to your soil pH.
            </p>

            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={onGetStarted}
                className="px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl shadow-xl shadow-emerald-950/50 hover:from-emerald-500 hover:to-teal-500 flex items-center justify-center space-x-3 transition-all"
              >
                <span>Launch Demo Dashboard</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-tr from-slate-900 via-slate-900/90 to-slate-850 p-6 rounded-2xl border border-slate-800 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center space-x-3">
                  <Activity className="w-5 h-5 text-emerald-400" />
                  <span className="font-semibold text-slate-200">ESP32 Live Telemetry Node</span>
                </div>
                <span className="px-2.5 py-1 text-xs font-medium text-emerald-400 bg-emerald-950/80 rounded-full border border-emerald-800/60">
                  Connected
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="text-slate-400 text-xs font-medium">Soil Moisture</div>
                  <div className="text-2xl font-bold text-emerald-400 mt-1">42.5%</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="text-slate-400 text-xs font-medium">Temperature</div>
                  <div className="text-2xl font-bold text-teal-400 mt-1">26.4°C</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="text-slate-400 text-xs font-medium">Soil pH</div>
                  <div className="text-2xl font-bold text-cyan-400 mt-1">6.5</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
                  <div className="text-slate-400 text-xs font-medium">Water Tank</div>
                  <div className="text-2xl font-bold text-blue-400 mt-1">78.0%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
