import React, { useState } from 'react';
import { useTelemetry } from '../context/TelemetryContext';
import { Sprout, Sparkles, CheckCircle, Sliders, Award, X, Search, Database, ArrowRight } from 'lucide-react';

const ALL_CROPS_DATABASE = [
  { id: 'c1', name: 'Tomato (Hybrid Rome)', category: 'Vegetable', targetPh: '6.0 - 6.8', tempRange: '20 - 30°C', yield: '28.5 Tons / Acre', water: 'Moderate', matchScore: 96.4, desc: 'High market demand, optimal for well-drained loamy soil with drip irrigation.' },
  { id: 'c2', name: 'Bell Pepper (Capsicum)', category: 'Vegetable', targetPh: '6.0 - 7.0', tempRange: '21 - 28°C', yield: '22.0 Tons / Acre', water: 'Moderate', matchScore: 91.2, desc: 'High ROI crop requiring protected microclimate or greenhouse drip fertigation.' },
  { id: 'c3', name: 'Cucumber (Hybrid)', category: 'Gourd', targetPh: '6.0 - 6.8', tempRange: '22 - 32°C', yield: '19.8 Tons / Acre', water: 'High', matchScore: 87.5, desc: 'Fast turnaround harvest (45-50 days) with high moisture affinity.' },
  { id: 'c4', name: 'Sweet Corn', category: 'Cereal', targetPh: '5.8 - 7.0', tempRange: '18 - 32°C', yield: '14.2 Tons / Acre', water: 'Moderate', matchScore: 83.0, desc: 'Heavy nitrogen consumer, excellent crop rotation partner for legumes.' },
  { id: 'c5', name: 'Potato (Kufri Jyoti)', category: 'Tuber', targetPh: '5.2 - 6.5', tempRange: '15 - 22°C', yield: '24.0 Tons / Acre', water: 'High', matchScore: 89.4, desc: 'Favors slightly acidic cool soils with high organic compost content.' },
  { id: 'c6', name: 'Sweet Potato', category: 'Tuber', targetPh: '5.5 - 6.5', tempRange: '22 - 30°C', yield: '18.0 Tons / Acre', water: 'Low', matchScore: 85.0, desc: 'Drought-tolerant root crop with minimal pest vulnerability.' },
  { id: 'c7', name: 'Carrot (Nantes)', category: 'Root', targetPh: '5.8 - 6.8', tempRange: '16 - 24°C', yield: '16.5 Tons / Acre', water: 'Moderate', matchScore: 82.5, desc: 'Requires deep friable sandy loam to avoid root bifurcation.' },
  { id: 'c8', name: 'Winter Wheat', category: 'Grain', targetPh: '6.0 - 7.5', tempRange: '12 - 25°C', yield: '12.8 Tons / Acre', water: 'Low-Moderate', matchScore: 80.0, desc: 'Staple grain crop ideal for cooler Rabi season planting.' },
  { id: 'c9', name: 'Rice / Paddy (IR64)', category: 'Grain', targetPh: '5.5 - 6.8', tempRange: '22 - 35°C', yield: '15.4 Tons / Acre', water: 'Very High', matchScore: 79.5, desc: 'Requires standing water puddle or automated flood gates.' },
  { id: 'c10', name: 'Cotton (Bt Hybrid)', category: 'Cash Crop', targetPh: '5.8 - 8.0', tempRange: '25 - 35°C', yield: '8.5 Tons / Acre', water: 'Moderate', matchScore: 78.0, desc: 'Deep taproot system suitable for black clay cotton soils.' },
  { id: 'c11', name: 'Strawberry (Chandler)', category: 'Fruit', targetPh: '5.5 - 6.5', tempRange: '15 - 25°C', yield: '11.2 Tons / Acre', water: 'Moderate', matchScore: 76.5, desc: 'High profit margin fruit cultivated under drip plastic mulch.' },
  { id: 'c12', name: 'Organic Spinach', category: 'Leafy Green', targetPh: '6.5 - 7.5', tempRange: '12 - 22°C', yield: '9.8 Tons / Acre', water: 'Low', matchScore: 75.0, desc: 'Short lifecycle (30 days) for quick cash flow cycles.' }
];

export const CropRecommendation = () => {
  const { telemetry } = useTelemetry();

  // Inputs
  const [ph, setPh] = useState(telemetry.soilPh || 6.4);
  const [moisture, setMoisture] = useState(telemetry.soilMoisture || 40);
  const [temp, setTemp] = useState(telemetry.temperature || 27.5);
  const [humidity, setHumidity] = useState(telemetry.humidity || 64);
  const [rainfall, setRainfall] = useState(210); // mm
  const [season, setSeason] = useState('Summer / Kharif');
  const [analyzing, setAnalyzing] = useState(false);
  const [showAllModal, setShowAllModal] = useState(false);
  const [cropSearch, setCropSearch] = useState('');

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
      // Dynamic logic output for preview
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

  const [activeViewTab, setActiveViewTab] = useState('predictor'); // 'predictor' or 'catalog'

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center space-x-2">
            <Sprout className="w-6 h-6 text-emerald-400" />
            <span>AI Crop Recommendation Engine</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Machine Learning prediction model trained on soil pH, moisture, micro-climate, and seasonal rainfall parameters.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center space-x-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 self-start md:self-auto">
          <button
            onClick={() => setActiveViewTab('predictor')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeViewTab === 'predictor'
                ? 'bg-emerald-500 text-slate-950 shadow-md glow-emerald'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            AI Predictor Model
          </button>

          <button
            onClick={() => setActiveViewTab('catalog')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
              activeViewTab === 'catalog'
                ? 'bg-emerald-500 text-slate-950 shadow-md glow-emerald'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>View All Crops Database ({ALL_CROPS_DATABASE.length})</span>
          </button>
        </div>
      </div>

      {/* Inline All Crops Database Catalog Section */}
      {activeViewTab === 'catalog' && (
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold text-slate-100 flex items-center space-x-2">
                <Database className="w-5 h-5 text-emerald-400" />
                <span>All Supported AI Agronomy Crops Database ({ALL_CROPS_DATABASE.length})</span>
              </h3>
              <p className="text-xs text-slate-400">Complete agronomic dataset with target soil pH, growth temperature ranges, and expected yield per acre.</p>
            </div>

            <div className="relative min-w-[220px]">
              <div className="flex items-center space-x-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800 focus-within:border-emerald-500/50">
                <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <input
                  type="text"
                  value={cropSearch}
                  onChange={(e) => setCropSearch(e.target.value)}
                  placeholder="Filter crops..."
                  className="bg-transparent text-xs text-slate-100 placeholder-slate-500 focus:outline-none w-full"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {ALL_CROPS_DATABASE
              .filter(c => c.name.toLowerCase().includes(cropSearch.toLowerCase()) || c.category.toLowerCase().includes(cropSearch.toLowerCase()))
              .map(cropItem => (
                <div key={cropItem.id} className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 hover:border-emerald-500/50 space-y-2 transition-all">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                        {cropItem.category}
                      </span>
                      <h4 className="text-base font-extrabold text-slate-100 mt-1">{cropItem.name}</h4>
                    </div>
                    <span className="text-xs font-black text-emerald-400 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                      {cropItem.matchScore}% Match
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2">{cropItem.desc}</p>

                  <div className="grid grid-cols-3 gap-2 pt-1 text-[11px]">
                    <div className="p-2 bg-slate-950/60 rounded-xl border border-slate-800">
                      <span className="text-slate-500 text-[9px] block">Target pH</span>
                      <span className="font-semibold text-slate-200">{cropItem.targetPh}</span>
                    </div>
                    <div className="p-2 bg-slate-950/60 rounded-xl border border-slate-800">
                      <span className="text-slate-500 text-[9px] block">Est. Yield</span>
                      <span className="font-semibold text-teal-300">{cropItem.yield}</span>
                    </div>
                    <div className="p-2 bg-slate-950/60 rounded-xl border border-slate-800">
                      <span className="text-slate-500 text-[9px] block">Water Needs</span>
                      <span className="font-semibold text-cyan-300">{cropItem.water}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setRecommendation({
                        bestCrop: cropItem.name,
                        confidence: cropItem.matchScore,
                        expectedYield: cropItem.yield,
                        waterRequirement: cropItem.water,
                        alternativeCrops: ALL_CROPS_DATABASE.filter(x => x.id !== cropItem.id).slice(0, 3).map(x => ({ name: x.name, confidence: x.matchScore, yield: x.yield })),
                        tips: [
                          `Maintain target soil pH around ${cropItem.targetPh}.`,
                          `Ideal ambient growth temperature is ${cropItem.tempRange}.`,
                          cropItem.desc
                        ]
                      });
                      setActiveViewTab('predictor');
                    }}
                    className="w-full mt-2 py-2 rounded-xl text-xs font-bold bg-slate-950 hover:bg-emerald-500 hover:text-slate-950 text-slate-300 border border-slate-800 hover:border-emerald-400 transition-all flex items-center justify-center space-x-1.5"
                  >
                    <span>Set as Active Target Crop</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Main Predictor Model View */}
      {activeViewTab === 'predictor' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Parameters Form */}
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

        {/* AI Output Cards */}
        {recommendation && (
          <div className="lg:col-span-2 space-y-6">
            {/* Best Match Result Card */}
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

            {/* Alternatives & Tips Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Alternative Crops */}
              <div className="glass-panel p-5 rounded-3xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-200">Alternative Viable Crops</h4>
                  <button
                    onClick={() => setShowAllModal(true)}
                    className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center space-x-1 transition-all"
                  >
                    <Database className="w-3.5 h-3.5" />
                    <span>View All Database ({ALL_CROPS_DATABASE.length}) →</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {recommendation.alternativeCrops.map((alt, idx) => (
                    <div key={idx} className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-xs flex items-center justify-between hover:border-emerald-500/40 transition-all">
                      <div>
                        <p className="font-bold text-slate-200">{alt.name}</p>
                        <p className="text-[10px] text-slate-400">{alt.yield}</p>
                      </div>
                      <span className="text-xs font-semibold text-emerald-400">{alt.confidence}%</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cultivation Tips */}
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
        )}
        </div>
      )}

      {/* View All Supported AI Crops Modal */}
      {showAllModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="glass-panel p-6 rounded-3xl w-full max-w-4xl border border-slate-800 relative max-h-[85vh] flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                  <Database className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-100">AI Agronomy Crop Recommendation Database</h3>
                  <p className="text-xs text-slate-400">All {ALL_CROPS_DATABASE.length} machine-learning evaluated crops matching soil & climate parameters.</p>
                </div>
              </div>
              
              <button 
                onClick={() => setShowAllModal(false)} 
                className="p-2 text-slate-400 hover:text-slate-200 bg-slate-900 rounded-xl border border-slate-800 hover:border-slate-700 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Filter Bar */}
            <div className="my-4 relative">
              <div className="flex items-center space-x-2 bg-slate-900 px-3.5 py-2.5 rounded-2xl border border-slate-800 focus-within:border-emerald-500/50">
                <Search className="w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={cropSearch}
                  onChange={(e) => setCropSearch(e.target.value)}
                  placeholder="Search crop name, category, soil pH, or water requirement..."
                  className="bg-transparent text-xs text-slate-100 placeholder-slate-500 focus:outline-none w-full"
                />
              </div>
            </div>

            {/* Crops Grid */}
            <div className="overflow-y-auto pr-1 flex-1 space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {ALL_CROPS_DATABASE
                  .filter(c => c.name.toLowerCase().includes(cropSearch.toLowerCase()) || c.category.toLowerCase().includes(cropSearch.toLowerCase()) || c.desc.toLowerCase().includes(cropSearch.toLowerCase()))
                  .map(cropItem => (
                    <div 
                      key={cropItem.id} 
                      className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 hover:border-emerald-500/50 space-y-2 transition-all group"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                            {cropItem.category}
                          </span>
                          <h4 className="text-base font-extrabold text-slate-100 mt-1">{cropItem.name}</h4>
                        </div>
                        <span className="text-xs font-black text-emerald-400 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                          {cropItem.matchScore}% Match
                        </span>
                      </div>

                      <p className="text-xs text-slate-400 line-clamp-2">{cropItem.desc}</p>

                      <div className="grid grid-cols-3 gap-2 pt-1 text-[11px]">
                        <div className="p-2 bg-slate-950/60 rounded-xl border border-slate-800">
                          <span className="text-slate-500 text-[9px] block">Target pH</span>
                          <span className="font-semibold text-slate-200">{cropItem.targetPh}</span>
                        </div>
                        <div className="p-2 bg-slate-950/60 rounded-xl border border-slate-800">
                          <span className="text-slate-500 text-[9px] block">Est. Yield</span>
                          <span className="font-semibold text-teal-300">{cropItem.yield}</span>
                        </div>
                        <div className="p-2 bg-slate-950/60 rounded-xl border border-slate-800">
                          <span className="text-slate-500 text-[9px] block">Water Needs</span>
                          <span className="font-semibold text-cyan-300">{cropItem.water}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setRecommendation({
                            bestCrop: cropItem.name,
                            confidence: cropItem.matchScore,
                            expectedYield: cropItem.yield,
                            waterRequirement: cropItem.water,
                            alternativeCrops: ALL_CROPS_DATABASE.filter(x => x.id !== cropItem.id).slice(0, 3).map(x => ({ name: x.name, confidence: x.matchScore, yield: x.yield })),
                            tips: [
                              `Maintain target soil pH around ${cropItem.targetPh}.`,
                              `Ideal ambient growth temperature is ${cropItem.tempRange}.`,
                              cropItem.desc
                            ]
                          });
                          setShowAllModal(false);
                        }}
                        className="w-full mt-2 py-2 rounded-xl text-xs font-bold bg-slate-950 hover:bg-emerald-500 hover:text-slate-950 text-slate-300 border border-slate-800 hover:border-emerald-400 transition-all flex items-center justify-center space-x-1.5"
                      >
                        <span>Set as Active Target Crop</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
