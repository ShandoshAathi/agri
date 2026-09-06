import React, { useState, useRef } from 'react';
import { Scan, Upload, CheckCircle, ShieldCheck, Sparkles, History, Clock, X, FileText, Calendar, ArrowRight, Video, Camera, Image, Play, Pause, AlertTriangle } from 'lucide-react';

const sampleMedia = [
  {
    id: 's1',
    isVideo: false,
    name: 'Tomato Late Blight Sample',
    url: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a28?auto=format&fit=crop&q=80&w=400',
    disease: 'Late Blight',
    confidence: '97%',
    affectedArea: '65%',
    severityGrade: 'High Severity',
    severityColor: 'rose',
    treatmentSteps: [
      'Remove infected leaves',
      'Use Copper based fungicide',
      'Maintain proper spacing'
    ],
    treatment: 'Apply Copper-based fungicide spray twice weekly.',
    prevention: 'Avoid overhead sprinkler watering; prune bottom leaves.'
  },
  {
    id: 's2',
    isVideo: false,
    name: 'Tomato Early Blight',
    url: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?auto=format&fit=crop&q=80&w=400',
    disease: 'Early Blight (Alternaria solani)',
    confidence: '94%',
    affectedArea: '42%',
    severityGrade: 'Moderate Severity',
    severityColor: 'amber',
    treatmentSteps: [
      'Apply Mancozeb 75% WP spray',
      'Mulch soil surface to prevent spore splash',
      'Improve inter-row ventilation'
    ],
    treatment: 'Spray Copper Oxychloride 50% WP @ 2.5g/L water every 7 days.',
    prevention: 'Prune lower yellow leaves; avoid overhead irrigation.'
  },
  {
    id: 's3',
    isVideo: false,
    name: 'Healthy Maize Leaf',
    url: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&q=80&w=400',
    disease: 'Healthy Crop (No Disease)',
    confidence: '99%',
    affectedArea: '0%',
    severityGrade: 'Optimal Health',
    severityColor: 'emerald',
    treatmentSteps: [
      'Maintain standard N-P-K fertigation',
      'Monitor weekly leaf humidity',
      'Keep drip lines clean'
    ],
    treatment: 'Maintain standard N-P-K fertigation schedule.',
    prevention: 'Continue regular drip irrigation cycles.'
  }
];

const initialHistory = [
  {
    id: 'h1',
    isVideo: false,
    date: '2026-08-22 14:30',
    name: 'Tomato Sector #4',
    url: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a28?auto=format&fit=crop&q=80&w=400',
    disease: 'Late Blight',
    confidence: '97%',
    affectedArea: '65%',
    severityGrade: 'High Severity',
    severityColor: 'rose',
    treatmentSteps: ['Remove infected leaves', 'Use Copper based fungicide', 'Maintain proper spacing']
  },
  {
    id: 'h2',
    isVideo: false,
    date: '2026-08-21 09:15',
    name: 'Maize Field Leaf #12',
    url: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&q=80&w=400',
    disease: 'Healthy Crop (No Disease)',
    confidence: '99%',
    affectedArea: '0%',
    severityGrade: 'Optimal Health',
    severityColor: 'emerald',
    treatmentSteps: ['Maintain standard N-P-K fertigation', 'Keep drip lines clean']
  }
];

export const DiseaseDiagnosis = () => {
  const [selectedMedia, setSelectedMedia] = useState(sampleMedia[0].url);
  const [isVideo, setIsVideo] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState(sampleMedia[0]);
  const [scanHistory, setScanHistory] = useState(initialHistory);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);

  const processFile = (file) => {
    if (!file) return;
    const fileIsVideo = file.type.startsWith('video/');
    const fileIsImage = file.type.startsWith('image/');

    if (!fileIsImage && !fileIsVideo) {
      alert('Please upload a valid image (JPG, PNG, WEBP) or video file (MP4, WEBM, MOV).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const mediaUrl = event.target.result;
      setSelectedMedia(mediaUrl);
      setIsVideo(fileIsVideo);
      setScanning(true);

      setTimeout(() => {
        setScanning(false);
        const newResult = {
          id: `h_${Date.now()}`,
          isVideo: fileIsVideo,
          date: new Date().toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
          name: file.name,
          url: mediaUrl,
          disease: fileIsVideo ? 'Downy Mildew Pathogen (Foliar Scan)' : 'Early Leaf Blight (Fungal Lesion)',
          confidence: (88 + Math.random() * 10).toFixed(1),
          severity: 'Moderate Risk (64%)',
          treatment: 'Foliar application of Neem extract 5% or standard Copper Hydroxide 77% WP.',
          prevention: 'Maintain spacing between canopy rows and optimize drip fertigation timing.'
        };
        setDiagnosisResult(newResult);
        setScanHistory(prev => [newResult, ...prev]);
      }, 2000);
    };
    reader.readAsDataURL(file);
  };

  const handleSelectSample = (sample) => {
    setSelectedMedia(sample.url);
    setIsVideo(!!sample.isVideo);
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setDiagnosisResult(sample);
    }, 1500);
  };

  const handleCustomUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const toggleLiveCamera = async () => {
    if (cameraActive) {
      setCameraActive(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setCameraActive(true);
    } catch (err) {
      alert('Unable to access camera. Please allow camera permissions or upload an image/video file.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-100 flex items-center space-x-2">
            <Scan className="w-6 h-6 text-cyan-400" />
            <span>AI Crop Disease Diagnosis Engine</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time leaf image & video classifier detecting plant pathogens, affected leaf area, and targeted treatment steps.
          </p>
        </div>

        <div className="flex items-center space-x-2 self-start sm:self-auto">
          <button
            onClick={toggleLiveCamera}
            className={`px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center space-x-1.5 border ${
              cameraActive
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse'
                : 'bg-slate-900 text-slate-300 border-slate-700 hover:border-emerald-500/50'
            }`}
          >
            <Camera className="w-4 h-4 text-emerald-400" />
            <span>{cameraActive ? 'Stop Camera' : 'Live Camera'}</span>
          </button>

          <button
            onClick={() => setShowHistoryModal(true)}
            className="px-4 py-2.5 rounded-2xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-700 hover:border-cyan-500/50 transition-all flex items-center space-x-2 shadow-lg"
          >
            <History className="w-4 h-4 text-cyan-400" />
            <span>View History ({scanHistory.length})</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left Column: Exact Card Design matching User Screenshot */}
        <div className="bg-white rounded-[32px] p-6 shadow-2xl text-slate-900 border border-slate-100 space-y-6">
          {/* Card Title & View History Link */}
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Disease Diagnosis</h3>
            <button
              onClick={() => setShowHistoryModal(true)}
              className="text-sm font-extrabold text-emerald-600 hover:text-emerald-700 flex items-center space-x-1 transition-all"
            >
              <span>View History</span>
            </button>
          </div>

          {/* Clickable & Drag-Drop Upload Area matching User Mockup */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`w-full py-8 px-6 rounded-2xl border-2 border-dashed transition-all cursor-pointer text-center block ${
              isDragging
                ? 'border-emerald-500 bg-emerald-50 scale-[1.01]'
                : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/70 hover:border-emerald-400'
            }`}
          >
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-1">
                <Upload className="w-6 h-6" />
              </div>
              <p className="text-base font-black text-slate-800">
                {isDragging ? 'Drop Crop Image or Video Now' : 'Click to upload or drag & drop'}
              </p>
              <p className="text-xs font-medium text-slate-400">JPG, PNG, WebP, MP4 (Max 15MB)</p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,video/*"
              onChange={handleCustomUpload}
              className="w-0 h-0 opacity-0 absolute -z-10"
            />
          </button>

          {/* DIAGNOSIS RESULT Card Section */}
          <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-extrabold text-slate-400 block">DIAGNOSIS RESULT</span>
                <h4 className="text-3xl font-black text-slate-900 mt-0.5">{diagnosisResult.disease}</h4>
              </div>
              <span className={`px-4 py-1.5 rounded-full text-xs font-black shadow-xs ${
                diagnosisResult.severityColor === 'rose' || diagnosisResult.severityGrade?.includes('High')
                  ? 'bg-rose-100 text-rose-600'
                  : diagnosisResult.severityColor === 'emerald' || diagnosisResult.disease.includes('Healthy')
                  ? 'bg-emerald-100 text-emerald-600'
                  : 'bg-amber-100 text-amber-700'
              }`}>
                {diagnosisResult.severityGrade || 'High Severity'}
              </span>
            </div>

            {/* Metrics: Confidence & Affected Area */}
            <div className="grid grid-cols-2 gap-4 py-2 border-y border-slate-200/60">
              <div>
                <span className="text-xs text-slate-400 font-bold block">Confidence</span>
                <span className="text-xl font-black text-rose-600">{diagnosisResult.confidence || '97%'}</span>
              </div>
              <div>
                <span className="text-xs text-slate-400 font-bold block">Affected Area</span>
                <span className="text-xl font-black text-slate-900">{diagnosisResult.affectedArea || '65%'}</span>
              </div>
            </div>

            {/* Treatment Steps with Checkmarks */}
            <div className="flex items-start space-x-3 pt-1">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-slate-200 shrink-0 bg-slate-950">
                {isVideo ? (
                  <video src={selectedMedia} className="w-full h-full object-cover" muted />
                ) : (
                  <img src={selectedMedia} alt="Diagnosis thumbnail" className="w-full h-full object-cover" />
                )}
              </div>
              <div>
                <h5 className="text-xs font-black text-slate-900 mb-1.5 uppercase tracking-wider">Treatment Steps</h5>
                <div className="space-y-1.5 text-xs text-slate-700 font-semibold">
                  {(diagnosisResult.treatmentSteps || [
                    'Remove infected leaves',
                    'Use Copper based fungicide',
                    'Maintain proper spacing'
                  ]).map((step, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Multi-Modal Scanner Viewport & Presets */}
        <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-slate-100 flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>Multi-Modal Neural Scanner & Sample Test</span>
            </span>
            <span className="text-xs font-normal text-emerald-400">OpenCV / PyTorch Vision</span>
          </h3>

          {/* Scanner Viewport */}
          <div className="relative w-full h-64 rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center">
            {cameraActive ? (
              <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
            ) : isVideo ? (
              <video src={selectedMedia} controls autoPlay loop className="w-full h-full object-cover" />
            ) : (
              <img src={selectedMedia} alt="Crop sample" className="w-full h-full object-cover opacity-90" />
            )}

            {/* AI Bounding Box */}
            {!scanning && !cameraActive && (
              <div className="absolute top-8 left-12 right-16 bottom-12 border-2 border-dashed border-rose-500/80 rounded-xl pointer-events-none flex items-start p-2 bg-rose-500/10 backdrop-blur-[1px] animate-pulse">
                <span className="px-2 py-0.5 rounded bg-rose-500 text-slate-950 font-black text-[10px] uppercase shadow-lg">
                  AI Box: {diagnosisResult.disease} ({diagnosisResult.confidence || '97%'})
                </span>
              </div>
            )}

            {scanning && (
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xs flex flex-col items-center justify-center z-20">
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent absolute top-0 animate-bounce" style={{ animationDuration: '0.8s' }}></div>
                <Sparkles className="w-10 h-10 text-cyan-400 animate-spin mb-2" />
                <span className="text-xs font-bold text-cyan-300">Scanning Foliar Micro-texture & Pathogens...</span>
              </div>
            )}
          </div>

          {/* Presets Grid */}
          <div>
            <p className="text-xs font-semibold text-slate-400 mb-2">Select instant sample test images:</p>
            <div className="grid grid-cols-3 gap-2">
              {sampleMedia.map((sample) => (
                <button
                  key={sample.id}
                  onClick={() => handleSelectSample(sample)}
                  className={`p-2 rounded-xl border text-left transition-all ${
                    selectedMedia === sample.url ? 'border-emerald-400 bg-emerald-500/10' : 'border-slate-800 hover:border-slate-700 bg-slate-900/60'
                  }`}
                >
                  <img src={sample.url} alt={sample.name} className="w-full h-14 object-cover rounded-lg mb-1" />
                  <p className="text-[10px] font-semibold text-slate-200 truncate">{sample.name}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Diagnosis History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="glass-panel p-6 rounded-3xl w-full max-w-3xl border border-slate-800 relative max-h-[85vh] flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center">
                  <History className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-100">Past Leaf Disease Diagnostic History</h3>
                  <p className="text-xs text-slate-400">Previous AI computer vision leaf scans, identified pathogens, and treatment logs.</p>
                </div>
              </div>

              <button 
                onClick={() => setShowHistoryModal(false)}
                className="p-2 text-slate-400 hover:text-slate-200 bg-slate-900 rounded-xl border border-slate-800 hover:border-slate-700 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* History List */}
            <div className="overflow-y-auto pr-1 flex-1 space-y-3 my-4">
              {scanHistory.map((item) => (
                <div 
                  key={item.id}
                  className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 hover:border-cyan-500/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <img src={item.url} alt={item.name} className="w-14 h-14 object-cover rounded-xl border border-slate-800" />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-slate-100">{item.name}</span>
                        <span className="text-[10px] text-slate-400 flex items-center space-x-1">
                          <Clock className="w-3 h-3 text-slate-500" />
                          <span>{item.date}</span>
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-cyan-300 mt-0.5">{item.disease}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{item.treatment}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 self-end sm:self-auto">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-950 text-amber-400 border border-slate-800 whitespace-nowrap">
                      {item.severity}
                    </span>
                    <button
                      onClick={() => {
                        setSelectedImage(item.url);
                        setDiagnosisResult(item);
                        setShowHistoryModal(false);
                      }}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-200 border border-slate-700 transition-all flex items-center space-x-1"
                    >
                      <span>Load Report</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
