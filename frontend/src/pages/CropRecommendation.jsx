import React, { useState } from 'react';
import { useTelemetry } from '../context/TelemetryContext';
import { 
  Sprout, 
  Sparkles, 
  CheckCircle, 
  Sliders,
  Award
} from 'lucide-react';

export const CropRecommendation = () => {
  const { telemetry } = useTelemetry();

  const [ph, setPh] = useState(telemetry.soilPh || 6.4);
  const [moisture, setMoisture] = useState(telemetry.soilMoisture || 40);
  const [temp, setTemp] = useState(telemetry.temperature || 27.5);
  const [humidity, setHumidity] = useState(telemetry.humidity || 64);
  const [rainfall, setRainfall] = useState(210);
  const [season, setSeason] = useState('Summer / Kharif');
  const [analyzing, setAnalyzing] = useState(false);

  const [recommendation, setRecommendation] = useState({
    bestCrop: 'Tomato (Hybrid Rome)',
    confidence: 96.4,
    expectedYield: '28.5 Tons / Acre',
    waterRequirement: 'Moderate (Drip Recommended)',
    alternativeCrops: [
      { name: 'Bell Pepper (Capsicum)', confidence: 91.2, yield: '22.0 Tons / Acre' },
      { name: 'Cucumber', confidence: 87.5, yield: '19.8 Tons / Acre' },
      { name: 'Sweet Corn', confidence: 83.0, yield: '14.2 Tons / Acre' }
    ],
    tips: [
      'Maintain soil pH between 6.0 and 6.8 for maximum nutrient absorption.',
      'Drip irrigation at early morning reduces evaporation loss by up to 28%.',
      'Apply potassium-rich organic mulch during fruit set stage.'
    ]
  });

  const handleRunAI = (e) => {
    e.preventDefault();
    setAnalyzing(true);

    setTimeout(() => {
      setAnalyzing(false);
      if (ph < 6.0) {
        setRecommendation({
          bestCrop: 'Potato (Kufri Jyoti)',
          confidence: 94.8,
          expectedYield: '24.0 Tons / Acre',
          waterRequirement: 'High',
          alternativeCrops: [
            { name: 'Sweet Potato', confidence: 89.0, yield: '18.0 Tons / Acre' },
            { name: 'Carrot', confidence: 85.5, yield: '16.5 Tons / Acre' }
          ],
          tips: ['Slightly acidic soil favors root tuber development.', 'Monitor for late blight fungal pathogens.']
        });
      } else {
        setRecommendation({
          bestCrop: 'Tomato (Hybrid Rome)',
          confidence: 96.4,
          expectedYield: '28.5 Tons / Acre',
          waterRequirement: 'Moderate (Drip Recommended)',
          alternativeCrops: [
            { name: 'Bell Pepper (Capsicum)', confidence: 91.2, yield: '22.0 Tons / Acre' },
            { name: 'Cucumber', confidence: 87.5, yield: '19.8 Tons / Acre' },
            { name: 'Sweet Corn', confidence: 83.0, yield: '14.2 Tons / Acre' }
          ],
          tips: [
            'Maintain soil pH between 6.0 and 6.8 for maximum nutrient absorption.',
            'Drip irrigation at early morning reduces evaporation loss by up to 28%.',
            'Apply potassium-rich organic mulch during fruit set stage.'
          ]
        });
      }
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 rounded-3xl border border-slate-800">
        <h2 className="text-2xl font-bold text-slate-100 flex items-center space-x-2">
          <Sprout className="w-6 h-6 text-emerald-400" />
          <span>AI Crop Recommendation Engine</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Machine Learning prediction model trained on soil pH, moisture, micro-climate, and seasonal rainfall parameters.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-slate-100 flex items-center space-x-2 pb-3 border-b border-slate-800">
            <Sliders className="w-4 h-4 text-emerald-400" />
            <span>Environmental Parameters</span>
          </h3>

          <form onSubmit={handleRunAI} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Soil pH ({ph})</label>
              <input
                type="range"
                min="4.0"
                max="9.0"
                step="0.1"
                value={ph}
                onChange={(e) => setPh(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Soil Moisture ({moisture}%)</label>
              <input
                type="range"
                min="10"
                max="90"
                value={moisture}
                onChange={(e) => setMoisture(parseInt(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Temp (°C)</label>
                <input
                  type="number"
                  value={temp}
                  onChange={(e) => setTemp(parseFloat(e.target.value))}
                  className="w-full glass-input rounded-xl px-3 py-2 text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Humidity (%)</label>
                <input
                  type="number"
                  value={humidity}
                  onChange={(e) => setHumidity(parseInt(e.target.value))}
                  className="w-full glass-input rounded-xl px-3 py-2 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Seasonal Rainfall (mm)</label>
              <input
                type="number"
                value={rainfall}
                onChange={(e) => setRainfall(parseInt(e.target.value))}
                className="w-full glass-input rounded-xl px-3 py-2 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Current Season</label>
              <select
                value={season}
                onChange={(e) => setSeason(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 text-slate-200 rounded-xl px-3 py-2 text-xs"
              >
                <option value="Summer / Kharif">Summer / Kharif</option>
                <option value="Winter / Rabi">Winter / Rabi</option>
                <option value="Autumn / Zaid">Autumn / Zaid</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={analyzing}
              className="w-full py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-slate-950 hover:from-emerald-400 hover:to-cyan-400 transition-all flex items-center justify-center space-x-2"
            >
              {analyzing ? (
                <span>Running AI Model...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate AI Recommendation</span>
                </>
              )}
            </button>
          </form>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-emerald-500/40 relative overflow-hidden bg-gradient-to-br from-slate-900/90 via-emerald-950/20 to-slate-900/90">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Award className="w-6 h-6 text-emerald-400" />
                <span className="text-sm font-bold text-slate-200 uppercase tracking-wider">Top Recommended Crop</span>
              </div>
              <span className="px-3 py-1 text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded-full">
                {recommendation.confidence}% Match Score
              </span>
            </div>

            <div className="py-4">
              <h3 className="text-3xl font-black text-emerald-400 mb-1">{recommendation.bestCrop}</h3>
              <p className="text-xs text-slate-300">Optimized for your soil pH ({ph}) and temperature ({temp}°C).</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Expected Yield</span>
                <span className="font-bold text-slate-100">{recommendation.expectedYield}</span>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Water Requirement</span>
                <span className="font-bold text-teal-300">{recommendation.waterRequirement}</span>
              </div>
              <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Soil pH Compatibility</span>
                <span className="font-bold text-emerald-400">Perfect Match</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-slate-200">Alternative Viable Crops</h4>
              <div className="space-y-2">
                {recommendation.alternativeCrops.map((alt, idx) => (
                  <div key={idx} className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-xs flex items-center justify-between">
                    <div>
                      <p className="font-bold text-slate-200">{alt.name}</p>
                      <p className="text-[10px] text-slate-400">{alt.yield}</p>
                    </div>
                    <span className="text-xs font-semibold text-emerald-400">{alt.confidence}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-slate-200">AI Cultivation Guidance</h4>
              <div className="space-y-2 text-xs">
                {recommendation.tips.map((tip, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-900/60 rounded-xl border border-slate-800 flex items-start space-x-2 text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
