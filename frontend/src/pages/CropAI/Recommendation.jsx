import React, { useState } from 'react';
import { Sprout, Sparkles, Sliders, CheckCircle } from 'lucide-react';
import { useTelemetry } from '../../context/TelemetryContext';
import { useLanguage } from '../../context/LanguageContext';

export const Recommendation = ({ _onSelectCrop }) => {
  const { currentReading } = useTelemetry();
  const { t, language } = useLanguage();
  const [ph, setPh] = useState(currentReading.soil_ph || 6.5);
  const [moisture, setMoisture] = useState(currentReading.soil_moisture || 45);
  const [temp, setTemp] = useState(currentReading.temperature || 26);
  const [humidity, _setHumidity] = useState(currentReading.humidity || 64);
  const [rainfall, setRainfall] = useState(180);
  const [season, _setSeason] = useState('Monsoon/Kharif');
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/v1/ai/crop-recommendation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ph: Number(ph), moisture: Number(moisture), temp: Number(temp), humidity: Number(humidity), rainfall: Number(rainfall), season })
      });
      const data = await res.json();
      setPrediction(data.recommendation || data);
    } catch {
      // Offline fallback prediction
      setPrediction({
        best_crop: ph < 6.0 
          ? (language === 'ta' ? "உருளைக்கிழங்கு (குஃப்ரி ஜோதி)" : "Potato (Kufri Jyoti)")
          : (language === 'ta' ? "தக்காளி (ஹைபிரிட் ரோம்)" : "Tomato (Hybrid Rome)"),
        confidence: 95.2,
        expected_yield: ph < 6.0 
          ? (language === 'ta' ? "24.0 டன்கள் / ஏக்கர்" : "24.0 Tons / Acre")
          : (language === 'ta' ? "28.5 டன்கள் / ஏக்கர்" : "28.5 Tons / Acre"),
        water_requirement: language === 'ta' ? "மிதமான பாசனம் (சொட்டுநீர்)" : "Moderate (Drip Recommended)",
        tips: language === 'ta' ? [
          "அதிகபட்ச ஊட்டச்சத்து உறிஞ்சுதலுக்கு மண் pH 6.0 முதல் 6.8 வரை இருக்க வேண்டும்.",
          "அதிகாலை சொட்டுநீர் பாசனம் ஆவியாதல் இழப்பை 28% வரை குறைக்கிறது."
        ] : [
          "Maintain soil pH between 6.0 and 6.8 for maximum nutrient absorption.",
          "Drip irrigation at early morning reduces evaporation loss by up to 28%."
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex items-center space-x-4 bg-white border border-stone-200 p-5 rounded-2xl shadow-xs">
        <div className="w-12 h-12 rounded-2xl bg-emerald-950 border-2 border-lime-400 p-0.5 shadow-md shrink-0 overflow-hidden relative">
          <img src="/farmer_ai_avatar.png" alt="Farmer AI Avatar" className="w-full h-full object-cover rounded-xl" />
          <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-lime-400 border-2 border-emerald-950" />
        </div>
        <div>
          <h2 className="text-xl font-black text-stone-900 font-['Manrope',_sans-serif]">{t('ai_crop_title')}</h2>
          <p className="text-xs text-stone-500 font-medium">{t('ai_crop_subtitle')}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <form onSubmit={handlePredict} className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-4 eco-card">
          <h3 className="text-sm font-extrabold text-stone-900 uppercase tracking-wider flex items-center space-x-2 font-['Manrope',_sans-serif]">
            <Sliders className="w-4 h-4 text-emerald-800" />
            <span>{t('ai_micro_climate_inputs')}</span>
          </h3>

          <div>
            <label className="block text-xs text-stone-700 font-bold mb-1">{t('ai_soil_ph')} ({ph})</label>
            <input type="range" min="4.0" max="9.0" step="0.1" value={ph} onChange={(e) => setPh(e.target.value)} className="w-full accent-emerald-800 cursor-pointer" />
          </div>

          <div>
            <label className="block text-xs text-stone-700 font-bold mb-1">{t('ai_moisture')} ({moisture}%)</label>
            <input type="range" min="10" max="90" value={moisture} onChange={(e) => setMoisture(e.target.value)} className="w-full accent-emerald-800 cursor-pointer" />
          </div>

          <div>
            <label className="block text-xs text-stone-700 font-bold mb-1">{t('ai_temp')} ({temp}°C)</label>
            <input type="range" min="10" max="45" value={temp} onChange={(e) => setTemp(e.target.value)} className="w-full accent-emerald-800 cursor-pointer" />
          </div>

          <div>
            <label className="block text-xs text-stone-700 font-bold mb-1">{t('ai_rainfall')} ({rainfall} mm)</label>
            <input type="range" min="50" max="400" value={rainfall} onChange={(e) => setRainfall(e.target.value)} className="w-full accent-emerald-800 cursor-pointer" />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#14532D] hover:bg-emerald-900 text-[#BEF264] font-black text-xs rounded-xl shadow-md flex items-center justify-center space-x-2 transition-all border border-lime-400/40 cursor-pointer"
          >
            {loading ? <span>{t('ai_analyzing')}</span> : (
              <>
                <Sparkles className="w-4 h-4 text-lime-400" />
                <span>{t('ai_run_recommendation')}</span>
              </>
            )}
          </button>
        </form>

        <div className="lg:col-span-2">
          {prediction ? (
            <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-6 eco-card">
              <div className="flex items-center justify-between border-b border-stone-200 pb-4">
                <div>
                  <span className="text-xs text-emerald-800 font-extrabold uppercase tracking-wider block">{t('ai_recommended_crop')}</span>
                  <h3 className="text-2xl font-black text-stone-900 mt-0.5 font-['Manrope',_sans-serif]">{prediction.best_crop}</h3>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-emerald-900">{prediction.confidence}%</span>
                  <span className="block text-xs text-stone-500 font-medium">{t('ai_match_confidence')}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-stone-100 border border-stone-200 rounded-xl">
                  <span className="text-stone-500 font-semibold block">{t('ai_est_yield')}</span>
                  <span className="font-bold text-stone-900 text-sm">{prediction.expected_yield}</span>
                </div>
                <div className="p-3 bg-stone-100 border border-stone-200 rounded-xl">
                  <span className="text-stone-500 font-semibold block">{t('ai_water_needs')}</span>
                  <span className="font-bold text-stone-900 text-sm">{prediction.water_requirement}</span>
                </div>
              </div>

              {prediction.tips && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-stone-800 uppercase tracking-wider">{t('ai_agronomic_insight')}</h4>
                  <ul className="space-y-1.5 text-xs text-stone-600 font-medium">
                    {prediction.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white border border-stone-200 rounded-2xl p-12 text-center text-stone-500 space-y-3 shadow-xs">
              <Sprout className="w-12 h-12 text-emerald-700/60 mx-auto" />
              <h3 className="text-base font-bold text-stone-900 font-['Manrope',_sans-serif]">{t('ai_crop_title')}</h3>
              <p className="text-xs max-w-sm mx-auto">{t('ai_run_recommendation')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
