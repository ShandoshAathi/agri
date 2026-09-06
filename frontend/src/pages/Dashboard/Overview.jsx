import React, { useState, useRef, useEffect } from 'react';
import { 
  Thermometer, 
  Droplets, 
  Sprout, 
  FlaskConical, 
  Container, 
  Power, 
  TrendingUp, 
  TrendingDown, 
  ChevronDown, 
  Sun, 
  CloudSun, 
  UploadCloud, 
  CheckCircle2, 
  AlertTriangle, 
  Activity, 
  MapPin, 
  Zap, 
  Clock, 
  Cpu, 
  Layers, 
  Sparkles,
  Scan,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { useLanguage } from '../../context/LanguageContext';
import { FarmMapComponent } from '../../components/Cards/FarmMapComponent';

// Telemetry Line Chart Mock Data
const defaultLineChartData = [
  { time: '12 AM', temp: 24, humidity: 75, moisture: 42 },
  { time: '04 AM', temp: 22, humidity: 82, moisture: 44 },
  { time: '08 AM', temp: 27, humidity: 70, moisture: 45 },
  { time: '12 PM', temp: 31, humidity: 62, moisture: 40 },
  { time: '04 PM', temp: 30, humidity: 65, moisture: 43 },
  { time: '08 PM', temp: 26, humidity: 74, moisture: 46 },
  { time: '12 AM', temp: 24, humidity: 78, moisture: 45 },
];

// Analytics Bar Chart Mock Data
const barChartData = [
  { day: 'May 18', water: 4200 },
  { day: 'May 19', water: 5100 },
  { day: 'May 20', water: 3800 },
  { day: 'May 21', water: 5600 },
  { day: 'May 22', water: 4900 },
  { day: 'May 23', water: 5300 },
  { day: 'May 24', water: 5600 },
];

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const Overview = ({ setCurrentPage }) => {
  const { t } = useLanguage();
  const [irrigationMode, setIrrigationMode] = useState('auto');
  const [pumpActive, setPumpActive] = useState(false);
  const [moistureThreshold, setMoistureThreshold] = useState(35);

  // Sensor Overview Date & Calendar Picker State
  const [showSensorCalendar, setShowSensorCalendar] = useState(false);
  const [selectedSensorDate, setSelectedSensorDate] = useState(new Date());
  const [sensorDateLabel, setSensorDateLabel] = useState('Today');
  const [viewMonth, setViewMonth] = useState(new Date().getMonth());
  const [viewYear, setViewYear] = useState(new Date().getFullYear());
  const [chartData, setChartData] = useState(defaultLineChartData);

  // Disease Diagnosis Widget Interactive State
  const diagFileInputRef = useRef(null);
  const [diagDragging, setDiagDragging] = useState(false);
  const [diagAnalyzing, setDiagAnalyzing] = useState(false);
  const [diagResult, setDiagResult] = useState({
    disease: 'Late Blight',
    confidence: '97%',
    affectedArea: '65%',
    severityGrade: 'High Severity',
    severityColor: 'rose',
    url: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=150&q=80',
    treatmentSteps: [
      'Remove infected leaves',
      'Use Copper based fungicide',
      'Maintain proper spacing'
    ]
  });

  const handleDiagFileUpload = (file) => {
    if (!file) return;
    setDiagAnalyzing(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      const imgDataUrl = e.target.result;
      setTimeout(() => {
        setDiagAnalyzing(false);
        setDiagResult({
          disease: 'Early Leaf Blight',
          confidence: '95%',
          affectedArea: '42%',
          severityGrade: 'Moderate Severity',
          severityColor: 'amber',
          url: imgDataUrl,
          treatmentSteps: [
            'Prune lower yellow leaves',
            'Apply Neem bio-fungicide spray',
            'Avoid overhead sprinkler watering'
          ]
        });
      }, 1200);
    };
    reader.readAsDataURL(file);
  };

  const sensorCalendarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sensorCalendarRef.current && !sensorCalendarRef.current.contains(event.target)) {
        setShowSensorCalendar(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectDate = (dateObj, label) => {
    setSelectedSensorDate(dateObj);
    setSensorDateLabel(label);
    setShowSensorCalendar(false);

    // Dynamic telemetry variation based on selected date
    const daySeed = dateObj.getDate() % 5;
    const updatedData = defaultLineChartData.map(item => ({
      ...item,
      temp: Math.min(42, Math.max(18, item.temp + daySeed - 2)),
      humidity: Math.min(95, Math.max(40, item.humidity - daySeed * 2)),
      moisture: Math.min(85, Math.max(25, item.moisture + (daySeed % 3) * 3))
    }));
    setChartData(updatedData);
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfWeek = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* ----------------- ROW 1: 6 TELEMETRY METRIC CARDS ----------------- */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* 1. Temperature */}
        <div className="glass-card p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-500">{t('Temperature')}</span>
            <div className="p-2 rounded-xl bg-rose-50 border border-rose-100">
              <Thermometer className="w-4.5 h-4.5 text-rose-500" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-['Manrope',_sans-serif]">31°C</div>
            <div className="flex items-center space-x-1 text-[11px] font-bold text-emerald-600 mt-1">
              <TrendingUp className="w-3 h-3" />
              <span>↑ 2.4°C</span>
            </div>
          </div>
        </div>

        {/* 2. Humidity */}
        <div className="glass-card p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-500">{t('Humidity')}</span>
            <div className="p-2 rounded-xl bg-blue-50 border border-blue-100">
              <Droplets className="w-4.5 h-4.5 text-blue-500" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-['Manrope',_sans-serif]">68%</div>
            <div className="flex items-center space-x-1 text-[11px] font-bold text-emerald-600 mt-1">
              <TrendingUp className="w-3 h-3" />
              <span>↑ 5%</span>
            </div>
          </div>
        </div>

        {/* 3. Soil Moisture */}
        <div className="glass-card p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-500">{t('Soil Moisture')}</span>
            <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-100">
              <Sprout className="w-4.5 h-4.5 text-emerald-600" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-['Manrope',_sans-serif]">45%</div>
            <div className="flex items-center space-x-1 text-[11px] font-bold text-rose-500 mt-1">
              <TrendingDown className="w-3 h-3" />
              <span>↓ 8%</span>
            </div>
          </div>
        </div>

        {/* 4. pH Level */}
        <div className="glass-card p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-500">{t('pH Level')}</span>
            <div className="p-2 rounded-xl bg-purple-50 border border-purple-100">
              <FlaskConical className="w-4.5 h-4.5 text-purple-600" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-['Manrope',_sans-serif]">6.8</div>
            <div className="flex items-center space-x-1 text-[11px] font-bold text-emerald-600 mt-1">
              <TrendingUp className="w-3 h-3" />
              <span>↑ 0.2</span>
            </div>
          </div>
        </div>

        {/* 5. Water Tank */}
        <div className="glass-card p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-500">{t('Water Tank')}</span>
            <div className="p-2 rounded-xl bg-cyan-50 border border-cyan-100">
              <Container className="w-4.5 h-4.5 text-cyan-600" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-['Manrope',_sans-serif]">82%</div>
            <div className="text-[11px] font-extrabold text-emerald-600 mt-1">{t('Optimal')}</div>
          </div>
        </div>

        {/* 6. Pump Status */}
        <div className="glass-card p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-500">{t('Status')}</span>
            <div className="p-2 rounded-xl bg-amber-50 border border-amber-100">
              <Power className="w-4.5 h-4.5 text-amber-600" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xl sm:text-2xl font-black text-rose-600 font-['Manrope',_sans-serif] truncate">{t('OFF')}</div>
            <div className="text-[11px] font-extrabold text-slate-400 mt-1">{t('Standby')}</div>
          </div>
        </div>
      </div>

      {/* ----------------- ROW 2: MAIN DASHBOARD PANELS ----------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Sensor Overview & Quick Actions & Weather (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Sensor Overview Line Chart */}
          <div className="glass-card p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-slate-900 font-['Manrope',_sans-serif]">Sensor Overview</h3>
                <div className="flex items-center space-x-4 text-xs font-semibold text-slate-500 mt-1">
                  <span className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /><span>Temperature (°C)</span></span>
                  <span className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" /><span>Humidity (%)</span></span>
                  <span className="flex items-center space-x-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /><span>Soil Moisture (%)</span></span>
                </div>
              </div>

              {/* Interactive Calendar Picker Badge & Popover Overlay */}
              <div ref={sensorCalendarRef} className="relative">
                <button
                  type="button"
                  onClick={() => setShowSensorCalendar(!showSensorCalendar)}
                  className="glass-card-subtle px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-emerald-800 flex items-center space-x-1.5 cursor-pointer hover:bg-white border border-stone-200 rounded-xl transition-all shadow-2xs"
                >
                  <CalendarIcon className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{sensorDateLabel}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${showSensorCalendar ? 'rotate-180 text-emerald-700' : ''}`} />
                </button>

                {/* Glassmorphic Calendar Popover Modal */}
                {showSensorCalendar && (
                  <div className="absolute right-0 mt-2 w-80 bg-white/95 backdrop-blur-2xl rounded-2xl p-4 shadow-2xl z-50 border border-slate-200/90 font-sans animate-in fade-in slide-in-from-top-2 duration-150">
                    {/* Header Controls */}
                    <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-3">
                      <div className="flex items-center space-x-1">
                        <select
                          value={viewMonth}
                          onChange={(e) => setViewMonth(Number(e.target.value))}
                          className="text-xs font-black text-stone-900 bg-stone-100 border border-stone-300 rounded-lg px-2 py-1 cursor-pointer focus:outline-none focus:border-emerald-600"
                        >
                          {MONTH_NAMES.map((m, idx) => (
                            <option key={m} value={idx}>{m}</option>
                          ))}
                        </select>
                        <select
                          value={viewYear}
                          onChange={(e) => setViewYear(Number(e.target.value))}
                          className="text-xs font-black text-stone-900 bg-stone-100 border border-stone-300 rounded-lg px-2 py-1 cursor-pointer focus:outline-none focus:border-emerald-600"
                        >
                          {[2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030].map(y => (
                            <option key={y} value={y}>{y}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex items-center space-x-1">
                        <button
                          type="button"
                          onClick={handlePrevMonth}
                          className="p-1 rounded-lg hover:bg-stone-100 text-stone-600 cursor-pointer"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={handleNextMonth}
                          className="p-1 rounded-lg hover:bg-stone-100 text-stone-600 cursor-pointer"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowSensorCalendar(false)}
                          className="p-1 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-700 cursor-pointer"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Presets Bar */}
                    <div className="flex items-center gap-1.5 mb-3 text-[10px] font-bold">
                      <button
                        type="button"
                        onClick={() => handleSelectDate(new Date(), 'Today')}
                        className="px-2 py-1 rounded-md bg-emerald-100 hover:bg-emerald-200 text-emerald-800 cursor-pointer"
                      >
                        Today
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const yest = new Date();
                          yest.setDate(yest.getDate() - 1);
                          handleSelectDate(yest, 'Yesterday');
                        }}
                        className="px-2 py-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-700 cursor-pointer"
                      >
                        Yesterday
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const d = new Date();
                          d.setDate(d.getDate() - 7);
                          handleSelectDate(d, 'Last 7 Days');
                        }}
                        className="px-2 py-1 rounded-md bg-stone-100 hover:bg-stone-200 text-stone-700 cursor-pointer"
                      >
                        Last 7 Days
                      </button>
                    </div>

                    {/* Day Names Grid */}
                    <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-extrabold text-stone-400 mb-1">
                      <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                    </div>

                    {/* Month Days Grid */}
                    <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold">
                      {Array.from({ length: getFirstDayOfWeek(viewMonth, viewYear) }).map((_, i) => (
                        <div key={`empty-${i}`} className="p-1.5" />
                      ))}

                      {Array.from({ length: getDaysInMonth(viewMonth, viewYear) }).map((_, i) => {
                        const dayNum = i + 1;
                        const currDate = new Date(viewYear, viewMonth, dayNum);
                        const isSelected = 
                          selectedSensorDate.getDate() === dayNum &&
                          selectedSensorDate.getMonth() === viewMonth &&
                          selectedSensorDate.getFullYear() === viewYear;

                        return (
                          <button
                            key={dayNum}
                            type="button"
                            onClick={() => handleSelectDate(currDate, `${dayNum} ${MONTH_NAMES[viewMonth].slice(0, 3)} ${viewYear}`)}
                            className={`p-1.5 rounded-lg text-xs transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-emerald-800 text-lime-300 font-extrabold shadow-sm'
                                : 'hover:bg-emerald-50 text-stone-800 hover:text-emerald-800'
                            }`}
                          >
                            {dayNum}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="h-64 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={[0, 100]} />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '12px', borderColor: '#e2e8f0', fontSize: '12px' }} />
                  <Line type="monotone" dataKey="temp" stroke="#f43f5e" strokeWidth={2.5} dot={{ r: 4, fill: '#f43f5e' }} />
                  <Line type="monotone" dataKey="humidity" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 4, fill: '#3b82f6' }} />
                  <Line type="monotone" dataKey="moisture" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4, fill: '#10b981' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Actions & Weather Forecast Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Quick Actions Grid */}
            <div className="glass-card p-5 space-y-4">
              <h3 className="text-base font-black text-slate-900 font-['Manrope',_sans-serif]">{t('Quick Actions')}</h3>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setCurrentPage?.('recommendation')}
                  className="glass-card-subtle p-3.5 flex flex-col items-center justify-center text-center space-y-2 hover:bg-emerald-50/80 hover:border-emerald-200 transition-all cursor-pointer"
                >
                  <div className="p-2.5 rounded-2xl bg-emerald-100 text-emerald-700"><Sprout className="w-5 h-5" /></div>
                  <span className="text-xs font-extrabold text-slate-800">{t('Crop Recommendation')}</span>
                </button>
                <button 
                  onClick={() => setCurrentPage?.('diagnosis')}
                  className="glass-card-subtle p-3.5 flex flex-col items-center justify-center text-center space-y-2 hover:bg-emerald-50/80 hover:border-emerald-200 transition-all cursor-pointer"
                >
                  <div className="p-2.5 rounded-2xl bg-emerald-100 text-emerald-700"><Scan className="w-5 h-5" /></div>
                  <span className="text-xs font-extrabold text-slate-800">{t('Disease Diagnosis')}</span>
                </button>
                <button 
                  onClick={() => setCurrentPage?.('irrigation')}
                  className="glass-card-subtle p-3.5 flex flex-col items-center justify-center text-center space-y-2 hover:bg-emerald-50/80 hover:border-emerald-200 transition-all cursor-pointer"
                >
                  <div className="p-2.5 rounded-2xl bg-emerald-100 text-emerald-700"><Droplets className="w-5 h-5" /></div>
                  <span className="text-xs font-extrabold text-slate-800">{t('Smart Irrigation')}</span>
                </button>
                <button 
                  onClick={() => setCurrentPage?.('monitoring')}
                  className="glass-card-subtle p-3.5 flex flex-col items-center justify-center text-center space-y-2 hover:bg-emerald-50/80 hover:border-emerald-200 transition-all cursor-pointer"
                >
                  <div className="p-2.5 rounded-2xl bg-emerald-100 text-emerald-700"><Activity className="w-5 h-5" /></div>
                  <span className="text-xs font-extrabold text-slate-800">{t('Sensor Monitoring')}</span>
                </button>
              </div>
            </div>

            {/* Weather Forecast Card */}
            <div className="glass-card p-5 space-y-3">
              <h3 className="text-base font-black text-slate-900 font-['Manrope',_sans-serif]">{t('Weather Forecast')}</h3>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-black text-slate-900 font-['Manrope',_sans-serif]">31°C</div>
                  <p className="text-xs font-bold text-slate-500">{t('Partly Cloudy')}</p>
                </div>
                <Sun className="w-10 h-10 text-amber-500" />
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs font-semibold text-slate-500 pt-2 border-t border-slate-200/50">
                <div>{t('Humidity')}<br/><span className="text-slate-900 font-extrabold">68%</span></div>
                <div>{t('Wind')}<br/><span className="text-slate-900 font-extrabold">12 km/h</span></div>
                <div>{t('Rain')}<br/><span className="text-slate-900 font-extrabold">10%</span></div>
              </div>
              <div className="grid grid-cols-5 gap-1 text-center pt-2 text-[10px] font-bold text-slate-600">
                <div className="p-1 rounded-xl bg-white/50"><div>{t('Sat')}</div><Sun className="w-3.5 h-3.5 text-amber-500 mx-auto my-1" /><div>27°/18°</div></div>
                <div className="p-1 rounded-xl bg-white/50"><div>{t('Sun')}</div><Sun className="w-3.5 h-3.5 text-amber-500 mx-auto my-1" /><div>28°/19°</div></div>
                <div className="p-1 rounded-xl bg-white/50"><div>{t('Mon')}</div><CloudSun className="w-3.5 h-3.5 text-amber-500 mx-auto my-1" /><div>30°/20°</div></div>
                <div className="p-1 rounded-xl bg-white/50"><div>{t('Tue')}</div><Sun className="w-3.5 h-3.5 text-amber-500 mx-auto my-1" /><div>29°/21°</div></div>
                <div className="p-1 rounded-xl bg-white/50"><div>{t('Wed')}</div><Sun className="w-3.5 h-3.5 text-amber-500 mx-auto my-1" /><div>28°/20°</div></div>
              </div>
            </div>
          </div>

          {/* Field Telemetry & Active Sensor Nodes */}
          <div className="glass-card p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-black text-slate-900 font-['Manrope',_sans-serif]">{t('Field Telemetry &')} {t('Active Nodes')}</h3>
                <span className="flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                  <span>3 {t('NODES ONLINE')}</span>
                </span>
              </div>
              <span 
                onClick={() => setCurrentPage?.('monitoring')}
                className="text-xs font-bold text-emerald-600 cursor-pointer hover:underline"
              >
                {t('Manage Nodes')} →
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Node 1 */}
              <div className="glass-card-subtle p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-900">ESP32-Node 01</div>
                      <div className="text-[10px] text-slate-500 font-semibold">{t('Field')} A ({t('Paddy')})</div>
                    </div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-emerald-500/50 shadow-xs" />
                </div>
                <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-slate-200/50 text-[11px]">
                  <div><span className="text-slate-500">{t('Moisture')}</span><br/><strong className="text-slate-900 font-extrabold">45%</strong></div>
                  <div><span className="text-slate-500">{t('Temperature')}</span><br/><strong className="text-slate-900 font-extrabold">31°C</strong></div>
                  <div><span className="text-slate-500">{t('Battery')}</span><br/><strong className="text-emerald-600 font-extrabold">94%</strong></div>
                  <div><span className="text-slate-500">{t('Signal')}</span><br/><strong className="text-slate-900 font-extrabold">-62 dBm</strong></div>
                </div>
              </div>

              {/* Node 2 */}
              <div className="glass-card-subtle p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 rounded-lg bg-blue-100 text-blue-700">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-900">ESP32-Node 02</div>
                      <div className="text-[10px] text-slate-500 font-semibold">{t('Polyhouse')}</div>
                    </div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-emerald-500/50 shadow-xs" />
                </div>
                <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-slate-200/50 text-[11px]">
                  <div><span className="text-slate-500">{t('Moisture')}</span><br/><strong className="text-slate-900 font-extrabold">38%</strong></div>
                  <div><span className="text-slate-500">{t('Temperature')}</span><br/><strong className="text-slate-900 font-extrabold">29°C</strong></div>
                  <div><span className="text-slate-500">{t('Battery')}</span><br/><strong className="text-emerald-600 font-extrabold">88%</strong></div>
                  <div><span className="text-slate-500">{t('Signal')}</span><br/><strong className="text-slate-900 font-extrabold">-68 dBm</strong></div>
                </div>
              </div>

              {/* Node 3 */}
              <div className="glass-card-subtle p-3.5 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 rounded-lg bg-purple-100 text-purple-700">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-black text-slate-900">ESP32-Node 03</div>
                      <div className="text-[10px] text-slate-500 font-semibold">{t('Drip Lines')}</div>
                    </div>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-emerald-500/50 shadow-xs" />
                </div>
                <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-slate-200/50 text-[11px]">
                  <div><span className="text-slate-500">{t('Moisture')}</span><br/><strong className="text-slate-900 font-extrabold">62%</strong></div>
                  <div><span className="text-slate-500">{t('Temperature')}</span><br/><strong className="text-slate-900 font-extrabold">30°C</strong></div>
                  <div><span className="text-slate-500">{t('Battery')}</span><br/><strong className="text-emerald-600 font-extrabold">98%</strong></div>
                  <div><span className="text-slate-500">{t('Signal')}</span><br/><strong className="text-slate-900 font-extrabold">-55 dBm</strong></div>
                </div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200/70 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-2.5">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-bold text-slate-800 text-[11px]">
                  {t('AI Recommendations')}: {t('Optimal')} {t('Soil Moisture')}. {t('Tomorrow, 07:00 AM')}
                </span>
              </div>
              <button 
                onClick={() => setCurrentPage?.('irrigation')}
                className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-[10px] rounded-lg shrink-0 transition-all cursor-pointer ml-2"
              >
                {t('Run')}
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: AI Recommendations & Disease Diagnosis (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* AI Recommendations Card */}
          <div className="glass-card p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-slate-900 font-['Manrope',_sans-serif]">{t('AI Recommendations')}</h3>
              <span className="text-xs font-bold text-emerald-600 cursor-pointer hover:underline" onClick={() => setCurrentPage?.('recommendation')}>{t('View All')}</span>
            </div>

            <div className="glass-card-subtle p-4 space-y-3">
              <span className="text-[11px] font-extrabold text-slate-500 block">{t('Recommendation')}</span>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xl font-black text-slate-900 font-['Manrope',_sans-serif]">{t('Rice')}</h4>
                  <p className="text-[11px] font-medium text-slate-500">{t('Crop')}</p>
                  <div className="mt-2 flex items-center space-x-2">
                    <span className="text-xs font-extrabold text-slate-700">{t('Confidence')}</span>
                    <span className="text-xs font-black text-emerald-600">98%</span>
                  </div>
                  <div className="w-36 bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1">
                    <div className="bg-emerald-600 h-full w-[98%]" />
                  </div>
                </div>
                <img src="https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=120&q=80" alt="Rice Crop" className="w-16 h-16 rounded-2xl object-cover border border-emerald-200 shadow-xs" />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/50 text-[11px]">
                <div><span className="text-slate-500 font-semibold">{t('Yield')}</span><br/><strong className="text-slate-900 font-bold">4.2 - 4.8 Ton/ha</strong></div>
                <div><span className="text-slate-500 font-semibold">{t('Harvest')}</span><br/><strong className="text-slate-900 font-bold">120 - 150 Days</strong></div>
              </div>

              <div className="pt-2 border-t border-slate-200/50 space-y-1 text-[10px]">
                <div className="font-extrabold text-slate-600 uppercase tracking-wider mb-1">{t('Soil')}</div>
                <div className="flex justify-between text-slate-700"><span>{t('Nitrogen')}</span><strong className="font-bold">50 kg/ha</strong></div>
                <div className="flex justify-between text-slate-700"><span>{t('Phosphorus')}</span><strong className="font-bold">40 kg/ha</strong></div>
                <div className="flex justify-between text-slate-700"><span>{t('Potassium')}</span><strong className="font-bold">30 kg/ha</strong></div>
                <div className="flex justify-between text-slate-700"><span>{t('Soil pH')}</span><strong className="font-bold">6.8</strong></div>
                <div className="flex justify-between text-slate-700"><span>{t('Rainfall')}</span><strong className="font-bold">650 mm</strong></div>
                <div className="flex justify-between text-slate-700"><span>{t('Temperature')}</span><strong className="font-bold">31 °C</strong></div>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-700 block">{t('Top 3 Suitable')}</span>
              <div className="grid grid-cols-3 gap-2">
                <div className="glass-card-subtle p-2.5 text-center">
                  <span className="text-xs font-black text-slate-900 block">{t('Maize')}</span>
                  <span className="text-[10px] font-bold text-emerald-600 block mt-0.5">87%</span>
                </div>
                <div className="glass-card-subtle p-2.5 text-center">
                  <span className="text-xs font-black text-slate-900 block">{t('Wheat')}</span>
                  <span className="text-[10px] font-bold text-emerald-600 block mt-0.5">76%</span>
                </div>
                <div className="glass-card-subtle p-2.5 text-center">
                  <span className="text-xs font-black text-slate-900 block">{t('Cotton')}</span>
                  <span className="text-[10px] font-bold text-emerald-600 block mt-0.5">65%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Disease Diagnosis Card */}
          <div className="glass-card p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-slate-900 font-['Manrope',_sans-serif]">{t('Disease Diagnosis')}</h3>
              <button
                onClick={() => setCurrentPage?.('diagnosis')}
                className="text-xs font-bold text-emerald-600 cursor-pointer hover:underline bg-transparent border-none p-0"
              >
                {t('View History')}
              </button>
            </div>

            {/* Clickable & Drag-Drop Upload Area */}
            <div
              onClick={() => diagFileInputRef.current?.click()}
              onDragEnter={(e) => { e.preventDefault(); e.stopPropagation(); setDiagDragging(true); }}
              onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setDiagDragging(true); }}
              onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); setDiagDragging(false); }}
              onDrop={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setDiagDragging(false);
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                  handleDiagFileUpload(e.dataTransfer.files[0]);
                }
              }}
              className={`border-2 border-dashed rounded-2xl p-4 text-center transition-all cursor-pointer ${
                diagDragging
                  ? 'border-emerald-500 bg-emerald-50 scale-[1.01]'
                  : 'border-slate-300/80 bg-white/40 hover:border-emerald-500 hover:bg-emerald-50/30'
              }`}
            >
              <UploadCloud className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
              <span className="text-xs font-bold text-slate-700 block">
                {diagDragging ? t('Drop Leaf Image Now') : t('Click to upload or drag & drop')}
              </span>
              <span className="text-[10px] text-slate-400 font-medium">{t('JPG, PNG, WebP (Max 5MB)')}</span>

              <input
                ref={diagFileInputRef}
                type="file"
                accept="image/*,video/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleDiagFileUpload(e.target.files[0]);
                  }
                }}
                className="hidden"
              />
            </div>

            {/* Diagnosis Result Box */}
            <div className="glass-card-subtle p-4 space-y-3 relative overflow-hidden">
              {diagAnalyzing && (
                <div className="absolute inset-0 bg-white/90 backdrop-blur-xs flex flex-col items-center justify-center space-y-2 z-10">
                  <Scan className="w-6 h-6 text-emerald-600 animate-spin" />
                  <span className="text-xs font-extrabold text-slate-800">{t('Diagnosis')}...</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">{t('Result')}</span>
                  <h4 className="text-lg font-black text-slate-900 font-['Manrope',_sans-serif]">{t(diagResult.disease)}</h4>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${
                  diagResult.severityColor === 'rose' || diagResult.severityGrade?.includes('High')
                    ? 'bg-rose-100 text-rose-700 border-rose-200'
                    : 'bg-amber-100 text-amber-700 border-amber-200'
                }`}>
                  {t('Severity')}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-500 font-semibold">{t('Confidence')}</span>
                  <br />
                  <strong className="text-rose-600 font-extrabold">{diagResult.confidence}</strong>
                </div>
                <div>
                  <span className="text-slate-500 font-semibold">{t('Affected Area')}</span>
                  <br />
                  <strong className="text-slate-900 font-bold">{diagResult.affectedArea}</strong>
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <img
                  src={diagResult.url}
                  alt="Diseased Leaf"
                  className="w-16 h-16 rounded-xl object-cover border border-rose-300 shrink-0"
                />
                <div className="space-y-1 text-[10px] font-medium text-slate-700">
                  <div className="font-extrabold text-slate-900 mb-1">{t('Treatment Steps')}</div>
                  {diagResult.treatmentSteps.map((step, idx) => (
                    <div key={idx} className="flex items-center space-x-1.5">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span>{t(step)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ----------------- ROW 3: BOTTOM DASHBOARD PANELS ----------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* 1. Smart Irrigation Panel */}
        <div className="glass-card p-5 space-y-4">
          <h3 className="text-base font-black text-slate-900 font-['Manrope',_sans-serif]">{t('Smart Irrigation')}</h3>
          
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-600 block">{t('Mode')}</span>
            <div className="bg-slate-100 p-1 rounded-xl grid grid-cols-2 gap-1 border border-slate-200">
              <button 
                onClick={() => setIrrigationMode('auto')} 
                className={`py-1.5 rounded-lg text-xs font-black transition-all ${
                  irrigationMode === 'auto' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600'
                }`}
              >
                {t('Auto Mode')}
              </button>
              <button 
                onClick={() => setIrrigationMode('manual')} 
                className={`py-1.5 rounded-lg text-xs font-black transition-all ${
                  irrigationMode === 'manual' ? 'bg-emerald-600 text-white shadow-xs' : 'text-slate-600'
                }`}
              >
                {t('Manual Mode')}
              </button>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-600">{t('Threshold')}</span>
              <span className="text-emerald-700">{moistureThreshold}%</span>
            </div>
            <input 
              type="range" 
              min="20" 
              max="80" 
              value={moistureThreshold} 
              onChange={(e) => setMoistureThreshold(Number(e.target.value))} 
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          <div className="pt-2 border-t border-slate-200/50 text-xs">
            <span className="text-slate-500 font-semibold block">{t('Next பாசனம்')}</span>
            <span className="font-extrabold text-slate-900">{t('Tomorrow, 07:00 AM')}</span>
          </div>

          <div className="pt-2 space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-600">{t('Status')}</span>
              <span className={pumpActive ? 'text-emerald-600 font-black' : 'text-rose-600 font-black'}>
                {pumpActive ? t('ON') : t('OFF')}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => setPumpActive(true)} 
                className="py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-xs cursor-pointer"
              >
                {t('Turn ON')}
              </button>
              <button 
                onClick={() => setPumpActive(false)} 
                className="py-2 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs rounded-xl shadow-xs cursor-pointer"
              >
                {t('Turn OFF')}
              </button>
            </div>
          </div>
        </div>

        {/* 2. Recent Alerts Panel */}
        <div className="glass-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900 font-['Manrope',_sans-serif]">{t('Recent எச்சரிக்கைகள்')}</h3>
            <span className="text-xs font-bold text-emerald-600 cursor-pointer hover:underline" onClick={() => setCurrentPage?.('notifications')}>{t('View All')}</span>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex items-start space-x-3 text-xs">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>{t('Alert')}</span>
                  <span className="text-[10px] text-slate-400 font-medium">2 {t('min ago')}</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5">{t('Soil Moisture')} {t('is below')} 30%</p>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-rose-50/80 border border-rose-200/80 flex items-start space-x-3 text-xs">
              <Power className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>{t('Pump')} {t('Turned OFF')}</span>
                  <span className="text-[10px] text-slate-400 font-medium">10 {t('min ago')}</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5">{t('stopped automatically')}</p>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-blue-50/80 border border-blue-200/80 flex items-start space-x-3 text-xs">
              <Droplets className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>{t('Rain Detected')}</span>
                  <span className="text-[10px] text-slate-400 font-medium">30 {t('min ago')}</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5">{t('Rain detected in your area')}</p>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-cyan-50/80 border border-cyan-200/80 flex items-start space-x-3 text-xs">
              <Container className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex justify-between font-bold text-slate-900">
                  <span>{t('Water Tank')}</span>
                  <span className="text-[10px] text-slate-400 font-medium">1 {t('hour ago')}</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5">{t('Tank level is below 20%')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Analytics Overview Panel */}
        <div className="glass-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900 font-['Manrope',_sans-serif]">{t('Analytics')} {t('Overview')}</h3>
            <span className="text-xs font-bold text-slate-500 cursor-pointer" onClick={() => setCurrentPage?.('analytics')}>{t('7 Days')} ▾</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-bold text-slate-500">
            <div className="p-2 rounded-xl bg-blue-50/80 border border-blue-100">
              <span>{t('Water Usage')}</span>
              <div className="text-xs font-black text-slate-900 mt-0.5">5,600 L</div>
              <span className="text-emerald-600 font-bold">↓ 10%</span>
            </div>
            <div className="p-2 rounded-xl bg-emerald-50/80 border border-emerald-100">
              <span>{t('Irrigation')} {t('Time')}</span>
              <div className="text-xs font-black text-slate-900 mt-0.5">12 h 30 m</div>
              <span className="text-emerald-600 font-bold">↑ 8%</span>
            </div>
            <div className="p-2 rounded-xl bg-purple-50/80 border border-purple-100">
              <span>{t('Energy Used')}</span>
              <div className="text-xs font-black text-slate-900 mt-0.5">18.5 kWh</div>
              <span className="text-emerald-600 font-bold">↑ 5%</span>
            </div>
          </div>

          <div className="h-40 w-full pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData}>
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={9} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={9} tickLine={false} />
                <Bar dataKey="water" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 4. Devices Status Panel */}
        <div className="glass-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900 font-['Manrope',_sans-serif]">{t('Devices')} {t('Status')}</h3>
            <span className="text-xs font-bold text-emerald-600 cursor-pointer hover:underline" onClick={() => setCurrentPage?.('devices')}>{t('View All')}</span>
          </div>

          <div className="space-y-3">
            <div className="p-3 rounded-2xl bg-white/70 border border-white/80 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700"><Cpu className="w-4 h-4" /></div>
                <div>
                  <h4 className="font-bold text-slate-900">{t('ESP32 Controller')}</h4>
                  <span className="text-[10px] font-extrabold text-emerald-600">{t('Online')}</span>
                </div>
              </div>
              <span className="text-slate-400">›</span>
            </div>

            <div className="p-3 rounded-2xl bg-white/70 border border-white/80 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-emerald-100 text-emerald-700"><Sprout className="w-4 h-4" /></div>
                <div>
                  <h4 className="font-bold text-slate-900">{t('Soil Moisture')}</h4>
                  <span className="text-[10px] font-extrabold text-emerald-600">{t('Online')}</span>
                </div>
              </div>
              <span className="text-slate-400">›</span>
            </div>

            <div className="p-3 rounded-2xl bg-white/70 border border-white/80 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-purple-100 text-purple-700"><FlaskConical className="w-4 h-4" /></div>
                <div>
                  <h4 className="font-bold text-slate-900">{t('pH Level')}</h4>
                  <span className="text-[10px] font-extrabold text-emerald-600">{t('Online')}</span>
                </div>
              </div>
              <span className="text-slate-400">›</span>
            </div>

            <div className="p-3 rounded-2xl bg-white/70 border border-white/80 flex items-center justify-between text-xs">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-blue-100 text-blue-700"><Power className="w-4 h-4" /></div>
                <div>
                  <h4 className="font-bold text-slate-900">{t('Relay Module')}</h4>
                  <span className="text-[10px] font-extrabold text-emerald-600">{t('Online')}</span>
                </div>
              </div>
              <span className="text-slate-400">›</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Full-Width Widescreen Interactive Farm Map Panel */}
      <div className="w-full pt-2">
        <FarmMapComponent onSelectFarm={(farm) => setCurrentPage?.('farms')} />
      </div>
    </div>
  );
};
