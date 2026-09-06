import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useFarm } from '../../context/FarmContext';
import { useLanguage } from '../../context/LanguageContext';
import { LanguageSelector } from '../LanguageSelector';
import { 
  Search, 
  Calendar as CalendarIcon, 
  Bell, 
  ChevronDown, 
  LogOut, 
  AlertTriangle, 
  CheckCircle, 
  Activity,
  X,
  LayoutDashboard,
  Tractor,
  Sprout,
  Scan,
  Droplets,
  BarChart3,
  FileText,
  CloudSun,
  Cpu,
  Settings,
  User,
  Smartphone,
  Sparkles,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  Globe
} from 'lucide-react';

const SEARCH_DATABASE = [
  // Pages & Navigation
  { id: 'dash', title: 'Dashboard', category: 'Pages', page: 'dashboard', icon: LayoutDashboard, desc: 'Farm overview & telemetry dashboard' },
  { id: 'farms', title: 'Farms Management', category: 'Pages', page: 'farms', icon: Tractor, desc: 'Plots, crop zones & land management' },
  { id: 'sensors', title: 'Sensor Monitoring', category: 'Pages', page: 'monitoring', icon: Activity, desc: 'Real-time soil pH, moisture & micro-climate' },
  { id: 'irrig', title: 'Smart Irrigation', category: 'Pages', page: 'irrigation', icon: Droplets, desc: 'Automated pumps & moisture schedules' },
  { id: 'rec', title: 'AI Crop Advisor Engine', category: 'AI Tools', page: 'recommendation', icon: Sparkles, desc: 'Crop recommendation engine based on soil micro-climates' },
  { id: 'diag', title: 'Disease Diagnosis AI', category: 'AI Tools', page: 'diagnosis', icon: Scan, desc: 'AI leaf scan & plant disease diagnostic system' },
  { id: 'analytics', title: 'Analytics & Insights', category: 'Pages', page: 'analytics', icon: BarChart3, desc: 'Historical farm metrics & usage trends' },
  { id: 'reports', title: 'Farm Reports', category: 'Pages', page: 'reports', icon: FileText, desc: 'Exportable agronomy reports & data' },
  { id: 'notif', title: 'Alerts & Activity', category: 'Pages', page: 'notifications', icon: Bell, desc: 'Sensor warnings & farm activity log' },
  { id: 'weather', title: 'Weather Forecast', category: 'Pages', page: 'weather', icon: CloudSun, desc: 'Hyper-local rain probability & temperature' },
  { id: 'devices', title: 'IoT Devices', category: 'Pages', page: 'devices', icon: Cpu, desc: 'Microcontrollers, sensor nodes & hardware' },
  { id: 'settings', title: 'System Settings', category: 'Settings', page: 'settings', icon: Settings, desc: 'Configure thresholds, alerts & preferences' },
  { id: 'profile', title: 'User Profile', category: 'Account', page: 'profile', icon: User, desc: 'Account details & security settings' },
  { id: 'mobile', title: 'Mobile App Showcase', category: 'Pages', page: 'mobile_showcase', icon: Smartphone, desc: 'Preview mobile app UI & features' },

  // Farms & Plots
  { id: 'plot-1', title: 'Green Valley Farm - North Field', category: 'Farms & Plots', page: 'farms', icon: Sprout, desc: 'Basmati Rice • 12.5 Acres' },
  { id: 'plot-2', title: 'Sunrise Acres - Plot 2', category: 'Farms & Plots', page: 'farms', icon: Sprout, desc: 'Organic Tomato • 8.2 Acres' },
  { id: 'plot-3', title: 'Orchard Grove Sector 4', category: 'Farms & Plots', page: 'farms', icon: Sprout, desc: 'Sweet Corn • 15.0 Acres' },

  // Telemetry & Metrics
  { id: 'metric-ph', title: 'Soil pH Levels', category: 'Sensors & Metrics', page: 'monitoring', icon: Activity, desc: 'Current reading: 6.5 pH (Optimal)' },
  { id: 'metric-moisture', title: 'Soil Moisture %', category: 'Sensors & Metrics', page: 'monitoring', icon: Droplets, desc: 'Current reading: 45% (Zone Drip Active)' },
  { id: 'metric-temp', title: 'Ambient Temperature', category: 'Sensors & Metrics', page: 'monitoring', icon: CloudSun, desc: 'Current reading: 26°C' },
];

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const Header = ({ currentPage = 'dashboard', setCurrentPage }) => {
  const { user, role, logout } = useAuth();
  const { notifications, markNotificationRead } = useFarm();
  const { language, setLanguage, t, LANGUAGES } = useLanguage();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Search Engine State
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  // Date Picker State
  const [selectedDate, setSelectedDate] = useState(new Date(2026, 7, 12)); // Aug 12, 2026
  const [viewMonth, setViewMonth] = useState(selectedDate.getMonth());
  const [viewYear, setViewYear] = useState(selectedDate.getFullYear());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const datePickerRef = useRef(null);

  const unreadCount = notifications.filter(n => !n.read).length;
  
  const pageTitleKey = `page_${currentPage}_title`;
  const pageSubKey = `page_${currentPage}_sub`;

  const pageTitle = t(pageTitleKey);
  const pageSubtitle = t(pageSubKey);

  // Filter Search Results
  const filteredResults = searchQuery.trim() === ''
    ? SEARCH_DATABASE.slice(0, 5)
    : SEARCH_DATABASE.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase())
      );

  // Close search & date popovers on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setShowDatePicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Global Keyboard Shortcut (Ctrl+K or Cmd+K) to focus search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
        if (inputRef.current) inputRef.current.focus();
      } else if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setShowDatePicker(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSelectSearchResult = (targetPage) => {
    if (setCurrentPage && targetPage) {
      setCurrentPage(targetPage);
    }
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  // Calendar Calculation Helpers
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(viewYear, viewMonth, 1).getDay();

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

  const handleSelectDay = (day) => {
    const newDate = new Date(viewYear, viewMonth, day);
    setSelectedDate(newDate);
    setShowDatePicker(false);
  };

  const formatHeaderDate = (date) => {
    const month = MONTH_NAMES[date.getMonth()].slice(0, 3);
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/80 font-sans">
      {/* Left Title, Greeting & Active Page Name */}
      <div>
        <div className="flex items-center space-x-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 text-[11px] font-black uppercase tracking-wider border border-emerald-500/20 shadow-2xs">
            {currentPage === 'dashboard' ? (user?.name || t('page_dashboard_title')) : pageTitle}
          </span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-['Manrope',_sans-serif]">
          {t('greeting')}
        </h1>
        <p className="text-xs font-semibold text-slate-500 mt-0.5">
          {pageSubtitle}
        </p>
      </div>

      {/* Right Search, Language Selector, Date Picker & Notifications */}
      <div className="flex items-center space-x-3">
        {/* Responsive Interactive Global Search Bar */}
        <div ref={searchRef} className="relative min-w-[200px] lg:min-w-[300px]">
          <div className="relative">
            <Search className="w-4 h-4 text-emerald-700 absolute left-3.5 top-2.5 z-10" />
            <input 
              ref={inputRef}
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchOpen(true)}
              placeholder={t('search_placeholder')} 
              className="w-full glass-input py-2 pl-10 pr-9 text-xs font-semibold text-slate-900 placeholder-slate-400 rounded-2xl border border-stone-300 focus:outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 shadow-2xs transition-all"
            />
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-700 cursor-pointer p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <span className="hidden lg:flex items-center absolute right-3 top-2 px-1.5 py-0.5 rounded-md bg-stone-200/80 text-[10px] font-extrabold text-stone-500 pointer-events-none">
                ⌘K
              </span>
            )}
          </div>

          {/* Interactive Search Results Dropdown Overlay */}
          {isSearchOpen && (
            <div className="absolute left-0 right-0 mt-2 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl z-50 border border-slate-200 overflow-hidden max-h-96 flex flex-col font-sans animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="p-2.5 border-b border-stone-100 bg-stone-50/80 flex items-center justify-between">
                <span className="text-[10px] font-black text-stone-500 uppercase tracking-wider">
                  {searchQuery ? `Search Results (${filteredResults.length})` : 'Quick Suggestions'}
                </span>
                <span className="text-[10px] text-emerald-700 font-bold">Press ESC to dismiss</span>
              </div>

              <div className="overflow-y-auto p-1.5 space-y-1 divide-y divide-stone-100/50">
                {filteredResults.length === 0 ? (
                  <div className="py-6 text-center text-stone-500 space-y-1">
                    <Search className="w-6 h-6 text-stone-400 mx-auto" />
                    <p className="text-xs font-bold text-stone-800">No results found for "{searchQuery}"</p>
                    <p className="text-[11px] text-stone-400">Try searching for "soil", "crop", "farm", or "weather"</p>
                  </div>
                ) : (
                  filteredResults.map((item) => {
                    const IconComp = item.icon;
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleSelectSearchResult(item.page)}
                        className="p-2.5 rounded-xl hover:bg-emerald-50/80 transition-all cursor-pointer group flex items-center justify-between border border-transparent hover:border-emerald-200"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="p-2 rounded-xl bg-stone-100 text-emerald-800 group-hover:bg-emerald-800 group-hover:text-lime-300 transition-colors shrink-0">
                            <IconComp className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h4 className="text-xs font-bold text-stone-900 group-hover:text-emerald-950 font-['Manrope',_sans-serif]">
                                {item.title}
                              </h4>
                              <span className="px-1.5 py-0.2 rounded-md bg-stone-200/60 group-hover:bg-emerald-200/60 text-stone-700 group-hover:text-emerald-900 text-[9px] font-black uppercase tracking-wider">
                                {item.category}
                              </span>
                            </div>
                            <p className="text-[11px] text-stone-500 group-hover:text-emerald-800/80 font-medium">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-emerald-700 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>

        {/* Multilingual Regional Language Selector Dropdown */}
        <LanguageSelector variant="pill" />

        {/* Interactive Responsive Date & Calendar Picker */}
        <div ref={datePickerRef} className="relative hidden lg:block">
          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            className="flex items-center space-x-2 glass-card-subtle px-3 py-2 text-xs font-bold text-slate-700 hover:text-emerald-800 cursor-pointer hover:bg-white/90 shadow-2xs transition-all border border-stone-200 rounded-xl"
          >
            <CalendarIcon className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>{formatHeaderDate(selectedDate)}</span>
            <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${showDatePicker ? 'rotate-180 text-emerald-600' : ''}`} />
          </button>

          {/* Glassmorphic Calendar Popover Overlay */}
          {showDatePicker && (
            <div className="absolute right-0 mt-3 w-80 bg-white/95 backdrop-blur-2xl rounded-2xl p-4 shadow-2xl z-50 border border-slate-200/90 font-sans animate-in fade-in slide-in-from-top-2 duration-150">
              {/* Calendar Header with Month & Year Controls */}
              <div className="flex items-center justify-between border-b border-stone-100 pb-3 mb-3">
                <div className="flex items-center space-x-1">
                  <select
                    value={viewMonth}
                    onChange={(e) => setViewMonth(Number(e.target.value))}
                    className="text-xs font-black text-stone-900 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-lg px-2 py-1 cursor-pointer focus:outline-none focus:border-emerald-600"
                  >
                    {MONTH_NAMES.map((m, idx) => (
                      <option key={m} value={idx}>{m}</option>
                    ))}
                  </select>

                  <select
                    value={viewYear}
                    onChange={(e) => setViewYear(Number(e.target.value))}
                    className="text-xs font-black text-stone-900 bg-stone-100 hover:bg-stone-200 border border-stone-300 rounded-lg px-2 py-1 cursor-pointer focus:outline-none focus:border-emerald-600"
                  >
                    {[2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030].map(y => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={handlePrevMonth}
                    className="p-1.5 rounded-lg bg-stone-100 hover:bg-emerald-100 text-stone-700 hover:text-emerald-800 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleNextMonth}
                    className="p-1.5 rounded-lg bg-stone-100 hover:bg-emerald-100 text-stone-700 hover:text-emerald-800 transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Days of Week Header */}
              <div className="grid grid-cols-7 gap-1 text-center mb-1">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                  <span key={day} className="text-[10px] font-black text-stone-400 uppercase tracking-wider">
                    {day}
                  </span>
                ))}
              </div>

              {/* Day Grid */}
              <div className="grid grid-cols-7 gap-1 text-center">
                {/* Empty cells for starting day offset */}
                {Array.from({ length: firstDayOfWeek }).map((_, idx) => (
                  <div key={`empty-${idx}`} className="h-8" />
                ))}

                {/* Day Buttons */}
                {Array.from({ length: daysInMonth }).map((_, idx) => {
                  const dayNum = idx + 1;
                  const isSelected = 
                    selectedDate.getDate() === dayNum && 
                    selectedDate.getMonth() === viewMonth && 
                    selectedDate.getFullYear() === viewYear;

                  const isToday = 
                    new Date().getDate() === dayNum && 
                    new Date().getMonth() === viewMonth && 
                    new Date().getFullYear() === viewYear;

                  return (
                    <button
                      key={dayNum}
                      onClick={() => handleSelectDay(dayNum)}
                      className={`h-8 rounded-xl text-xs font-bold transition-all flex items-center justify-center cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-tr from-emerald-800 to-teal-800 text-lime-300 font-black shadow-md border border-lime-400/40 scale-105'
                          : isToday
                          ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 font-black'
                          : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900'
                      }`}
                    >
                      {dayNum}
                    </button>
                  );
                })}
              </div>

              {/* Quick Presets */}
              <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[10px] font-bold text-stone-400 flex items-center space-x-1">
                  <Clock className="w-3 h-3 text-emerald-600" />
                  <span>Presets</span>
                </span>
                <div className="flex items-center space-x-1 text-[10px]">
                  <button
                    onClick={() => {
                      const today = new Date();
                      setSelectedDate(today);
                      setViewMonth(today.getMonth());
                      setViewYear(today.getFullYear());
                      setShowDatePicker(false);
                    }}
                    className="px-2 py-0.5 rounded-md bg-stone-100 hover:bg-emerald-100 text-emerald-800 font-bold transition-colors cursor-pointer"
                  >
                    {t('date_preset_today')}
                  </button>
                  <button
                    onClick={() => {
                      const d = new Date(2026, 7, 12);
                      setSelectedDate(d);
                      setViewMonth(7);
                      setViewYear(2026);
                      setShowDatePicker(false);
                    }}
                    className="px-2 py-0.5 rounded-md bg-stone-100 hover:bg-emerald-100 text-emerald-800 font-bold transition-colors cursor-pointer"
                  >
                    {t('date_preset_reset')}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2.5 rounded-2xl bg-white/80 border border-white/90 text-slate-700 hover:text-emerald-700 transition-all shadow-xs cursor-pointer"
          >
            <Bell className="w-4.5 h-4.5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-black text-[9px] flex items-center justify-center border-2 border-white shadow-xs">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white/95 backdrop-blur-2xl rounded-2xl p-4 shadow-2xl z-50 border border-slate-200/80">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-sm flex items-center space-x-2 font-['Manrope',_sans-serif]">
                  <Bell className="w-4 h-4 text-emerald-600" />
                  <span>Farm Alerts & Activity</span>
                </h3>
                <span className="text-xs font-bold text-slate-500">{unreadCount} new</span>
              </div>
              <div className="py-2 max-h-72 overflow-y-auto space-y-2">
                {notifications.length === 0 ? (
                  <p className="text-xs text-slate-500 text-center py-4">No notifications</p>
                ) : (
                  notifications.map(item => (
                    <div 
                      key={item.id} 
                      onClick={() => markNotificationRead(item.id)}
                      className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                        item.read 
                          ? 'bg-slate-50 border-slate-100 opacity-60' 
                          : 'bg-white border-slate-200 text-slate-800 shadow-2xs'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        {item.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />}
                        {item.type === 'alert' && <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />}
                        {item.type === 'success' && <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />}
                        {item.type === 'info' && <Activity className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />}
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900">{item.title}</span>
                            <span className="text-[10px] text-slate-400 font-semibold">{item.time}</span>
                          </div>
                          <p className="text-slate-600 text-[11px] mt-0.5">{item.message}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              <button 
                onClick={() => { setCurrentPage('notifications'); setShowNotifications(false); }} 
                className="w-full text-center text-xs text-emerald-600 hover:text-emerald-700 font-bold pt-2 border-t border-slate-100 block cursor-pointer"
              >
                View all notifications →
              </button>
            </div>
          )}
        </div>

        {/* User Profile Avatar Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center space-x-2 p-1 rounded-2xl bg-white/80 border border-white/90 hover:bg-white transition-all cursor-pointer shadow-2xs"
          >
            <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-xl object-cover border border-emerald-500/40" />
            <ChevronDown className="w-3.5 h-3.5 text-slate-500 pr-1 hidden sm:block" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-56 bg-white/95 backdrop-blur-2xl rounded-2xl p-2 shadow-2xl z-50 border border-slate-200/80">
              <div className="p-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900">{user.name}</p>
                <p className="text-[11px] text-slate-500">{user.email}</p>
                <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 rounded-full border border-emerald-200 capitalize">
                  Role: {role}
                </span>
              </div>
              <button
                onClick={() => { setCurrentPage('profile'); setShowProfileMenu(false); }}
                className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-emerald-700 rounded-lg transition-all cursor-pointer"
              >
                View Profile
              </button>
              <button
                onClick={() => { setCurrentPage('settings'); setShowProfileMenu(false); }}
                className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-emerald-700 rounded-lg transition-all cursor-pointer"
              >
                System Settings
              </button>
              <button
                onClick={() => { logout(); setCurrentPage('login'); setShowProfileMenu(false); }}
                className="w-full text-left px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-lg transition-all flex items-center space-x-2 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
