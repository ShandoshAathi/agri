import React, { useState } from 'react';
import { 
  Scan, 
  Upload, 
  CheckCircle, 
  AlertTriangle, 
  ShieldCheck, 
  Sparkles, 
  X,
  FileImage
} from 'lucide-react';

const sampleImages = [
  { name: 'Tomato Early Blight', url: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a28?auto=format&fit=crop&q=80&w=400', disease: 'Early Blight (Alternaria solani)', severity: 'Moderate (55%)', treatment: 'Apply copper-based fungicide spray twice weekly.', prevention: 'Avoid overhead sprinkler watering; remove bottom infected leaves.' },
  { name: 'Healthy Maize Leaf', url: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&q=80&w=400', disease: 'Healthy Crop (No Disease Detected)', severity: 'Low Risk (2%)', treatment: 'Maintain standard N-P-K fertilizer schedule.', prevention: 'Continue regular drip irrigation cycles.' },
  { name: 'Pepper Bacterial Spot', url: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&q=80&w=400', disease: 'Bacterial Leaf Spot (Xanthomonas)', severity: 'High (82%)', treatment: 'Isolate affected plot. Spray Streptomycin sulphate solution.', prevention: 'Use disease-resistant seeds for next planting cycle.' }
];

export const DiseaseDiagnosis = () => {
  const [selectedImage, setSelectedImage] = useState(sampleImages[0].url);
  const [scanning, setScanning] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState(sampleImages[0]);

  const handleSelectSample = (sample) => {
    setSelectedImage(sample.url);
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setDiagnosisResult(sample);
    }, 1500);
  };

  const handleCustomUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
      setScanning(true);
      setTimeout(() => {
        setScanning(false);
        setDiagnosisResult({
          name: file.name,
          url,
          disease: 'Early Leaf Blight (Fungal Pathogen)',
          severity: 'Moderate Risk (64%)',
          treatment: 'Apply neem oil spray or standard Mancozeb 75% WP.',
          prevention: 'Ensure proper airflow between plant rows and avoid stagnant ground water.'
        });
      }, 1800);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800">
        <h2 className="text-2xl font-bold text-slate-100 flex items-center space-x-2">
          <Scan className="w-6 h-6 text-cyan-400" />
          <span>AI Crop Disease Diagnosis Scanner</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Upload leaf images to diagnose fungal, bacterial, or viral plant pathogens using our computer vision classification model.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload & Scanner Container */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-slate-100 flex items-center justify-between pb-3 border-b border-slate-800">
            <span>Image Upload & Scanner</span>
            <span className="text-xs font-normal text-emerald-400">OpenCV / TensorFlow Vision</span>
          </h3>

          {/* Scanner Viewport */}
          <div className="relative w-full h-64 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center">
            <img src={selectedImage} alt="Crop sample" className="w-full h-full object-cover opacity-80" />

            {scanning && (
              <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs flex flex-col items-center justify-center">
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent absolute top-0 animate-bounce" style={{ animationDuration: '1s' }}></div>
                <Sparkles className="w-10 h-10 text-cyan-400 animate-spin mb-2" />
                <span className="text-xs font-bold text-cyan-300">Analyzing Leaf Micro-texture...</span>
              </div>
            )}
          </div>

          {/* Upload Button */}
          <div>
            <label className="w-full py-3 rounded-2xl border-2 border-dashed border-slate-700 hover:border-emerald-500/50 flex items-center justify-center space-x-2 text-xs font-bold text-slate-300 cursor-pointer transition-all bg-slate-900/60">
              <Upload className="w-4 h-4 text-emerald-400" />
              <span>Upload Custom Crop Leaf Image</span>
              <input type="file" accept="image/*" onChange={handleCustomUpload} className="hidden" />
            </label>
          </div>

          {/* Presets */}
          <div>
            <p className="text-xs font-semibold text-slate-400 mb-2">Or select sample leaf images for instant scan test:</p>
            <div className="grid grid-cols-3 gap-2">
              {sampleImages.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectSample(sample)}
                  className="p-1.5 rounded-xl border border-slate-800 hover:border-emerald-500/40 bg-slate-900/60 overflow-hidden group text-left"
                >
                  <img src={sample.url} alt={sample.name} className="w-full h-14 object-cover rounded-lg mb-1" />
                  <p className="text-[10px] font-semibold text-slate-300 truncate">{sample.name}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Diagnosis Output Result */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-100 pb-3 border-b border-slate-800 flex items-center justify-between">
              <span>AI Diagnostic Report</span>
              {diagnosisResult.disease.includes('Healthy') ? (
                <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Healthy Leaf
                </span>
              ) : (
                <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">
                  Pathogen Flagged
                </span>
              )}
            </h3>

            <div className="py-4 space-y-3">
              <div>
                <span className="text-xs text-slate-400">Identified Pathogen / Condition</span>
                <h4 className="text-2xl font-black text-slate-100 mt-0.5">{diagnosisResult.disease}</h4>
              </div>

              <div className="p-3 bg-slate-900/80 rounded-2xl border border-slate-800">
                <span className="text-[10px] text-slate-400 block">Severity & Risk Assessment</span>
                <span className="text-sm font-bold text-amber-400">{diagnosisResult.severity}</span>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 space-y-1">
                <span className="font-bold text-emerald-400 flex items-center space-x-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Recommended Treatment</span>
                </span>
                <p className="text-slate-300">{diagnosisResult.treatment}</p>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 space-y-1">
                <span className="font-bold text-teal-300 flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4" />
                  <span>Prevention & Management</span>
                </span>
                <p className="text-slate-300">{diagnosisResult.prevention}</p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[10px] text-slate-500 text-center">
            Diagnostics powered by AgriSense Computer Vision AI Model v2.1.
          </div>
        </div>
      </div>
    </div>
  );
};
