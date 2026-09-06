import React, { useState } from 'react';
import { 
  Sprout, 
  Lock, 
  Mail, 
  User, 
  Phone, 
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Eye, 
  EyeOff, 
  Globe, 
  MapPin, 
  Home, 
  Maximize2, 
  AlertCircle,
  Navigation
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { LanguageSelector } from '../../components/LanguageSelector';
import { detectUserLocation } from '../../services/weatherService';
import { FarmMapPicker } from '../../components/FarmMapPicker';
import { TermsModal } from '../../components/TermsModal';
import farmBg from '../../assets/farm_bg.jpg';

export const Register = ({ onNavigateToDashboard, onNavigateToLogin }) => {
  const { login } = useAuth();
  const { language, setLanguage, t, LANGUAGES } = useLanguage();

  // Wizard Step State (Step 1: Language, Step 2: Personal, Step 3: Farm, Step 4: Terms)
  const [currentStep, setCurrentStep] = useState(1);

  // Personal Details State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setRole] = useState('farmer');

  // Farm Information State
  const [farmName, setFarmName] = useState('');
  const [farmLocation, setFarmLocation] = useState('');
  const [farmArea, setFarmArea] = useState('');
  const [farmUnit, setFarmUnit] = useState('Acres');
  const [crop, setCrop] = useState('Tomato');
  const [soilType, setSoilType] = useState('Loamy Soil');

  // Interactive Map & Agreement State
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showMapPicker, setShowMapPicker] = useState(false);
  const [locLoading, setLocLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleAutoGPS = async () => {
    setLocLoading(true);
    const loc = await detectUserLocation();
    if (loc?.formatted) {
      setFarmLocation(loc.formatted);
    }
    setLocLoading(false);
  };

  const handleMapSave = (locData) => {
    setFarmLocation(locData.formatted || `${locData.lat.toFixed(4)}°N, ${locData.lon.toFixed(4)}°E`);
    setShowMapPicker(false);
  };

  const handleNextStep1Language = () => {
    setErrorMsg('');
    setCurrentStep(2);
  };

  const handleNextStep2Personal = () => {
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setErrorMsg(t('Please fill out all personal details before proceeding.'));
      return;
    }
    setErrorMsg('');
    setCurrentStep(3);
  };

  const handleNextStep3Farm = () => {
    if (!password || !confirmPassword) {
      setErrorMsg(t('Please fill out all required fields before proceeding.'));
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg(t('Passwords do not match.'));
      return;
    }
    setErrorMsg('');
    setCurrentStep(4);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreeTerms) {
      setErrorMsg(t('Terms & Conditions Agreement Required'));
      return;
    }

    login({
      name: name || 'Smart Farmer',
      email,
      phone,
      role,
      farmName: farmName || 'Green Field Sector 1',
      farmLocation: farmLocation || 'Coimbatore, Tamil Nadu',
      farmArea: farmArea || '10',
      farmUnit,
      crop,
      soilType
    });

    onNavigateToDashboard();
  };

  const selectedLangObj = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  return (
    <div className="h-screen max-h-screen w-full relative font-sans text-stone-950 flex items-center justify-center p-2 sm:p-4 lg:p-6 overflow-hidden select-none">
      
      {/* Full Viewport Background Agriculture Palmyra Tree Image */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <img 
          src={farmBg} 
          alt="Tamil Nadu Agriculture Field & Palmyra Trees"
          className="w-full h-full object-cover object-center transform scale-105"
        />
        <div className="absolute inset-0 bg-stone-900/10" />
      </div>

      {/* Main Floating Non-Scrollable Layout */}
      <div className="relative z-20 w-full max-w-[1240px] h-[calc(100vh-1.5rem)] max-h-[96vh] flex flex-col lg:flex-row gap-4 lg:gap-6 my-auto overflow-hidden">

        {/* LEFT PANEL: Phone-Curved Glass Card */}
        <div className="w-full lg:w-[48%] xl:w-[44%] h-full bg-white/30 backdrop-blur-md rounded-[36px] p-4 sm:p-6 lg:p-8 flex flex-col justify-between overflow-y-auto border border-white/70 shadow-2xl my-auto">
          
          <div className="space-y-3.5">
            {/* Top Bar */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={onNavigateToLogin}
                className="p-2 rounded-full bg-white/80 hover:bg-white text-stone-950 transition-all cursor-pointer border border-white/90 shadow-md"
                title="Back to Login"
              >
                <ArrowLeft className="w-4 h-4 text-stone-950" />
              </button>

              {/* Pill Logo Badge */}
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-white/90 bg-white/80 text-stone-950 text-xs font-black font-mono tracking-wide shadow-md">
                <Sprout className="w-4 h-4 text-emerald-800" />
                <span className="text-stone-950 font-black">AgriSense AI 🌱</span>
              </div>

              {/* Language Selector */}
              <LanguageSelector variant="pill" />
            </div>

            {/* Header & Step Indicator */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between">
                <h1 className="text-xl sm:text-2xl xl:text-3xl font-black text-stone-950 tracking-tight font-['Manrope',_sans-serif] drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)]">
                  {t('Create an account')}
                </h1>
                <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-amber-300 text-[10px] font-black shadow-md">
                  {currentStep === 1 && '25%'}
                  {currentStep === 2 && '50%'}
                  {currentStep === 3 && '75%'}
                  {currentStep === 4 && '100%'}
                </span>
              </div>

              {/* Glowing Step Progress Bar */}
              <div className="space-y-1">
                <div className="w-full bg-white/60 rounded-full h-2 overflow-hidden border border-white/80 shadow-inner">
                  <div 
                    className="bg-emerald-800 h-full rounded-full transition-all duration-300 shadow-sm"
                    style={{ width: `${(currentStep / 4) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-stone-950 font-black drop-shadow-[0_1px_2px_rgba(255,255,255,0.9)] flex items-center justify-between">
                  <span>
                    {currentStep === 1 && t('Step 1 of 4: Select Language')}
                    {currentStep === 2 && t('Step 2 of 4: Personal Details')}
                    {currentStep === 3 && t('Step 3 of 4: Security & Farm Details')}
                    {currentStep === 4 && t('Step 4 of 4: Terms & Complete Setup')}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-900 bg-white/70 px-2 py-0.5 rounded-full border border-white">
                    {selectedLangObj.flag} {selectedLangObj.native}
                  </span>
                </p>
              </div>
            </div>

            {errorMsg && (
              <div className="p-2 bg-rose-100/95 border border-rose-300 rounded-xl text-rose-950 text-xs font-black text-center shadow-md">
                {t(errorMsg)}
              </div>
            )}

            {/* SLIDE 1: Dedicated Regional Language Selection */}
            {currentStep === 1 && (
              <div className="space-y-3 pt-1 animate-in fade-in duration-200">
                <div className="text-center space-y-1">
                  <h3 className="text-sm font-black text-stone-950 flex items-center justify-center space-x-1.5">
                    <Globe className="w-4 h-4 text-emerald-800" />
                    <span>{t('Select Your Language')}</span>
                  </h3>
                  <p className="text-xs text-stone-900 font-bold drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
                    {t('Choose your preferred language for AgriSense AI')}
                  </p>
                </div>

                {/* Interactive Language Cards Grid */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {LANGUAGES.map((lang) => {
                    const isSelected = language === lang.code;
                    return (
                      <button
                        key={lang.code}
                        type="button"
                        onClick={() => {
                          setLanguage(lang.code);
                        }}
                        className={`p-3 rounded-2xl text-left transition-all cursor-pointer border flex flex-col justify-between space-y-1 ${
                          isSelected
                            ? 'bg-emerald-950 text-white border-emerald-800 shadow-xl ring-2 ring-amber-400'
                            : 'bg-white/85 text-stone-950 hover:bg-white border-white/90 shadow-md'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-2xl">{lang.flag}</span>
                          {isSelected && (
                            <span className="w-4 h-4 rounded-full bg-amber-400 text-stone-950 flex items-center justify-center text-[10px] font-black">
                              ✓
                            </span>
                          )}
                        </div>
                        <div>
                          <div className={`text-xs font-black ${isSelected ? 'text-amber-300' : 'text-stone-950'}`}>
                            {lang.native}
                          </div>
                          <div className={`text-[10px] font-bold ${isSelected ? 'text-emerald-200' : 'text-stone-600'}`}>
                            {lang.label}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Continue Button */}
                <button
                  type="button"
                  onClick={handleNextStep1Language}
                  className="w-full py-3.5 rounded-full bg-[#FACC15] hover:bg-[#F59E0B] text-stone-950 font-black text-sm shadow-xl hover:shadow-2xl transition-all cursor-pointer transform hover:scale-[1.01] active:scale-[0.99] mt-2 border border-amber-300 flex items-center justify-center space-x-2"
                >
                  <span>{t('Next Step')} ({selectedLangObj.native})</span>
                  <ArrowRight className="w-4 h-4 text-stone-950" />
                </button>
              </div>
            )}

            {/* SLIDE 2: Personal Details */}
            {currentStep === 2 && (
              <div className="space-y-3 pt-1 animate-in fade-in duration-200">
                {/* Full Name */}
                <div>
                  <label className="block text-[11px] font-black text-stone-950 mb-1 pl-3 uppercase tracking-wider drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
                    {t('Full name')}
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/90 border border-white/90 rounded-full py-3 px-5 text-xs font-black text-stone-950 placeholder:text-stone-700 focus:outline-none focus:bg-white focus:ring-2 focus:ring-amber-400 shadow-md transition-all"
                    placeholder={t('Full name')}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[11px] font-black text-stone-950 mb-1 pl-3 uppercase tracking-wider drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
                    {t('Email')}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/90 border border-white/90 rounded-full py-3 px-5 text-xs font-black text-stone-950 placeholder:text-stone-700 focus:outline-none focus:bg-white focus:ring-2 focus:ring-amber-400 shadow-md transition-all"
                    placeholder="email@gmail.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[11px] font-black text-stone-950 mb-1 pl-3 uppercase tracking-wider drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
                    {t('Phone')}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white/90 border border-white/90 rounded-full py-3 px-5 text-xs font-black text-stone-950 placeholder:text-stone-700 focus:outline-none focus:bg-white focus:ring-2 focus:ring-amber-400 shadow-md transition-all"
                    placeholder="+91..."
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="w-1/3 py-3 rounded-full bg-white/80 hover:bg-white text-stone-950 font-black text-xs shadow-md cursor-pointer transition-all border border-white/90"
                  >
                    {t('Back')}
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep2Personal}
                    className="w-2/3 py-3 rounded-full bg-[#FACC15] hover:bg-[#F59E0B] text-stone-950 font-black text-xs sm:text-sm shadow-xl hover:shadow-2xl transition-all cursor-pointer border border-amber-300 flex items-center justify-center space-x-1.5"
                  >
                    <span>{t('Next Step')}</span>
                    <ArrowRight className="w-4 h-4 text-stone-950" />
                  </button>
                </div>
              </div>
            )}

            {/* SLIDE 3: Security & Farm Details */}
            {currentStep === 3 && (
              <div className="space-y-2.5 pt-1 animate-in fade-in duration-200">
                
                {/* Password & Confirm Password */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-black text-stone-950 mb-0.5 pl-3 uppercase tracking-wider drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
                      {t('Password')}
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-white/90 border border-white/90 rounded-full py-2.5 pl-5 pr-9 text-xs font-black text-stone-950 placeholder:text-stone-700 focus:outline-none focus:bg-white focus:ring-2 focus:ring-amber-400 shadow-md transition-all"
                        placeholder="••••••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-stone-950 hover:text-emerald-950 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-black text-stone-950 mb-0.5 pl-3 uppercase tracking-wider drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
                      {t('Confirm Password')}
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-white/90 border border-white/90 rounded-full py-2.5 pl-5 pr-9 text-xs font-black text-stone-950 placeholder:text-stone-700 focus:outline-none focus:bg-white focus:ring-2 focus:ring-amber-400 shadow-md transition-all"
                        placeholder="••••••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3 text-stone-950 hover:text-emerald-950 transition-colors"
                      >
                        {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Role Selection */}
                <div className="grid grid-cols-2 gap-2 bg-white/50 p-1 rounded-full border border-white/80 shadow-md">
                  <button
                    type="button"
                    onClick={() => setRole('farmer')}
                    className={`py-2 px-3 rounded-full text-xs font-black transition-all cursor-pointer ${
                      role === 'farmer' ? 'bg-stone-950 text-white shadow-lg' : 'text-stone-950 hover:bg-white/60 font-black'
                    }`}
                  >
                    👨‍🌾 {t('Farmer')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('manager')}
                    className={`py-2 px-3 rounded-full text-xs font-black transition-all cursor-pointer ${
                      role === 'manager' ? 'bg-stone-950 text-white shadow-lg' : 'text-stone-950 hover:bg-white/60 font-black'
                    }`}
                  >
                    👨‍💼 {t('Manager')}
                  </button>
                </div>

                {/* Farm Name & Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-black text-stone-950 mb-0.5 pl-3 uppercase tracking-wider drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
                      {t('Farm Name')}
                    </label>
                    <input
                      type="text"
                      required
                      value={farmName}
                      onChange={(e) => setFarmName(e.target.value)}
                      className="w-full bg-white/90 border border-white/90 rounded-full py-2.5 px-5 text-xs font-black text-stone-950 placeholder:text-stone-700 focus:outline-none focus:bg-white focus:ring-2 focus:ring-amber-400 shadow-md transition-all"
                      placeholder="Green Valley Plot"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-black text-stone-950 mb-0.5 pl-3 uppercase tracking-wider drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
                      {t('Location')}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={farmLocation}
                        onChange={(e) => setFarmLocation(e.target.value)}
                        className="w-full bg-white/90 border border-white/90 rounded-full py-2.5 pl-5 pr-20 text-xs font-black text-stone-950 placeholder:text-stone-700 focus:outline-none focus:bg-white focus:ring-2 focus:ring-amber-400 shadow-md transition-all"
                        placeholder="Coimbatore"
                      />
                      <div className="absolute right-1.5 top-1.5 flex items-center space-x-1">
                        <button
                          type="button"
                          onClick={() => setShowMapPicker(true)}
                          className="px-2 py-1 bg-stone-950 text-amber-300 rounded-full text-[10px] font-black flex items-center space-x-1 cursor-pointer shadow-md"
                        >
                          <Maximize2 className="w-3 h-3 text-amber-400" />
                          <span>{t('Pin')}</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleAutoGPS}
                          disabled={locLoading}
                          className="px-1.5 py-1 bg-amber-300 text-stone-950 rounded-full text-[10px] font-black cursor-pointer shadow-md"
                        >
                          <Navigation className={`w-3 h-3 ${locLoading ? 'animate-spin' : ''}`} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Farm Area & Unit */}
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="block text-[11px] font-black text-stone-950 mb-0.5 pl-3 uppercase tracking-wider drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
                      {t('Farm Area')}
                    </label>
                    <input
                      type="number"
                      step="any"
                      required
                      value={farmArea}
                      onChange={(e) => setFarmArea(e.target.value)}
                      className="w-full bg-white/90 border border-white/90 rounded-full py-2.5 px-5 text-xs font-black text-stone-950 placeholder:text-stone-700 focus:outline-none focus:bg-white focus:ring-2 focus:ring-amber-400 shadow-md transition-all"
                      placeholder="12.5"
                    />
                  </div>

                  <div className="w-24 shrink-0">
                    <label className="block text-[11px] font-black text-stone-950 mb-0.5 pl-3 uppercase tracking-wider drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
                      {t('Unit')}
                    </label>
                    <select
                      value={farmUnit}
                      onChange={(e) => setFarmUnit(e.target.value)}
                      className="w-full bg-white/90 border border-white/90 rounded-full py-2.5 px-3 text-xs font-black text-stone-950 focus:outline-none shadow-md cursor-pointer"
                    >
                      <option value="Acres">{t('Acres')}</option>
                      <option value="Hectares">{t('Hectares')}</option>
                      <option value="Cents">{t('Cents')}</option>
                    </select>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="w-1/3 py-3 rounded-full bg-white/80 hover:bg-white text-stone-950 font-black text-xs shadow-md cursor-pointer transition-all border border-white/90"
                  >
                    {t('Back')}
                  </button>
                  <button
                    type="button"
                    onClick={handleNextStep3Farm}
                    className="w-2/3 py-3 rounded-full bg-[#FACC15] hover:bg-[#F59E0B] text-stone-950 font-black text-xs sm:text-sm shadow-xl hover:shadow-2xl transition-all cursor-pointer border border-amber-300 flex items-center justify-center space-x-1.5"
                  >
                    <span>{t('Next Step')}</span>
                    <ArrowRight className="w-4 h-4 text-stone-950" />
                  </button>
                </div>

              </div>
            )}

            {/* SLIDE 4: Review Details & Terms Agreement */}
            {currentStep === 4 && (
              <form onSubmit={handleSubmit} className="space-y-3 pt-1 animate-in fade-in duration-200">
                
                {/* Summary Card */}
                <div className="p-3.5 bg-white/80 border border-white/90 rounded-2xl shadow-md space-y-2 text-xs">
                  <h4 className="font-black text-stone-950 border-b border-stone-200 pb-1 flex items-center justify-between">
                    <span>{t('Review Your Details')}</span>
                    <span className="text-[10px] text-emerald-800 font-mono">Step 4/4</span>
                  </h4>
                  <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-[11px] text-stone-800 font-bold">
                    <div><span className="text-stone-500 font-semibold">{t('Full name')}:</span> {name}</div>
                    <div><span className="text-stone-500 font-semibold">{t('Phone')}:</span> {phone}</div>
                    <div><span className="text-stone-500 font-semibold">{t('Email')}:</span> {email}</div>
                    <div><span className="text-stone-500 font-semibold">{t('Farm Name')}:</span> {farmName || 'Green Plot'}</div>
                    <div className="col-span-2"><span className="text-stone-500 font-semibold">{t('Location')}:</span> {farmLocation || 'Coimbatore'}</div>
                  </div>
                </div>

                {/* Mandatory Terms & Conditions Agreement Checkbox */}
                <div className="flex items-start space-x-2 pt-1 text-xs">
                  <input
                    type="checkbox"
                    id="agreeTermsCheck"
                    checked={agreeTerms}
                    onChange={(e) => {
                      setAgreeTerms(e.target.checked);
                      if (e.target.checked) setErrorMsg('');
                    }}
                    className="mt-0.5 w-4 h-4 rounded border-white/90 text-amber-500 focus:ring-amber-400 accent-amber-500 cursor-pointer shrink-0"
                  />
                  <label htmlFor="agreeTermsCheck" className="text-[11px] font-black text-stone-950 cursor-pointer select-none leading-tight drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
                    {t("I agree to AgriSense AI's")}{' '}
                    <button
                      type="button"
                      onClick={() => setShowTermsModal(true)}
                      className="text-emerald-950 underline font-black hover:text-emerald-800 cursor-pointer inline-block"
                    >
                      {t('Terms & Conditions')}
                    </button>
                    {' '}{t('and Privacy Policy.')}
                  </label>
                </div>

                {/* Step 4 Submit & Back Buttons */}
                <div className="flex items-center space-x-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="w-1/3 py-3 rounded-full bg-white/80 hover:bg-white text-stone-950 font-black text-xs shadow-md cursor-pointer transition-all border border-white/90"
                  >
                    {t('Back')}
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-3.5 rounded-full bg-[#FACC15] hover:bg-[#F59E0B] text-stone-950 font-black text-xs sm:text-sm shadow-xl hover:shadow-2xl transition-all cursor-pointer border border-amber-300 flex items-center justify-center space-x-1.5 transform hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-stone-950" />
                    <span>{t('Complete Registration')}</span>
                  </button>
                </div>

              </form>
            )}

          </div>

          {/* Footer Row */}
          <div className="flex items-center justify-between text-xs text-stone-950 font-black pt-3 border-t border-stone-900/20 mt-2">
            <span className="text-stone-950 font-black drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
              {t('Have an account?')}{' '}
              <button 
                type="button" 
                onClick={onNavigateToLogin} 
                className="text-emerald-950 font-black underline hover:text-emerald-800 cursor-pointer ml-1"
              >
                {t('Sign in')}
              </button>
            </span>

            <button
              type="button"
              onClick={() => setShowTermsModal(true)}
              className="text-stone-950 hover:text-emerald-950 hover:underline cursor-pointer font-black drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]"
            >
              {t('Terms & Conditions')}
            </button>
          </div>
        </div>

        {/* RIGHT PANEL: Phone-Curved Floating Crextio Glass Widgets */}
        <div className="hidden lg:flex w-full lg:w-[52%] xl:w-[56%] h-full relative my-auto overflow-hidden">
          
          {/* FLOATING GLASS WIDGET 1: Top Yellow Badge */}
          <div className="absolute top-6 left-6 z-20 space-y-2 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="bg-[#FACC15] text-stone-950 px-4 py-2 rounded-3xl shadow-xl border border-amber-300/60 flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-stone-950 animate-pulse" />
              <div className="text-xs font-black">
                <div>Task Review With Team</div>
                <div className="text-[10px] font-bold text-stone-900">09:30am - 10:00am</div>
              </div>
            </div>
            <div className="bg-stone-950/90 backdrop-blur-md text-stone-200 px-3.5 py-1.5 rounded-2xl shadow-md text-xs font-mono border border-stone-700/60 ml-4">
              09:30am - 10:00am
            </div>
          </div>

          {/* FLOATING GLASS WIDGET 2: Middle Calendar Row & Team Avatars */}
          <div className="absolute right-6 top-1/4 z-20 space-y-3 flex flex-col items-end">
            
            {/* Avatar Stack */}
            <div className="flex -space-x-2 overflow-hidden bg-white/30 backdrop-blur-md p-1.5 rounded-full border border-white/40 shadow-xl">
              <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150" alt="Specialist" />
              <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150" alt="Farmer" />
              <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" alt="Manager" />
            </div>

            {/* Glass Calendar Bar */}
            <div className="bg-white/30 backdrop-blur-md border border-white/40 rounded-3xl p-3 text-stone-950 shadow-2xl text-center">
              <div className="grid grid-cols-7 gap-2.5 text-[11px] font-black uppercase tracking-wider text-stone-900 pb-1">
                <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
              </div>
              <div className="grid grid-cols-7 gap-2.5 text-xs font-black font-mono">
                <span className="opacity-80">22</span>
                <span className="opacity-80">23</span>
                <span className="opacity-80">24</span>
                <span className="bg-stone-950 text-white rounded-lg py-0.5 px-1 shadow-md">25</span>
                <span>26</span>
                <span>27</span>
                <span>28</span>
              </div>
            </div>
          </div>

          {/* FLOATING GLASS WIDGET 3: Bottom Left Card (Daily Telemetry Sync) */}
          <div className="absolute bottom-6 left-6 z-20 bg-white/95 backdrop-blur-lg p-4 rounded-3xl border border-white shadow-2xl max-w-xs space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-xs font-black text-stone-950">Daily Telemetry Sync</h4>
                <p className="text-[10px] text-stone-600 font-bold">12:00pm - 01:00pm</p>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            </div>

            <div className="flex items-center justify-between pt-1">
              <div className="flex -space-x-1">
                <div className="w-6 h-6 rounded-full bg-emerald-700 text-white text-[10px] font-black flex items-center justify-center border-2 border-white">AV</div>
                <div className="w-6 h-6 rounded-full bg-amber-600 text-white text-[10px] font-black flex items-center justify-center border-2 border-white">ER</div>
                <div className="w-6 h-6 rounded-full bg-teal-700 text-white text-[10px] font-black flex items-center justify-center border-2 border-white font-mono">+4</div>
              </div>
              <span className="text-[10px] font-extrabold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded-2xl border border-emerald-300">
                IoT Active
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Interactive Map Pin Dropper Modal */}
      {showMapPicker && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-4xl max-h-[95vh] overflow-y-auto">
            <FarmMapPicker
              initialArea={farmLocation || 'Coimbatore, Tamil Nadu'}
              onSave={handleMapSave}
              onClose={() => setShowMapPicker(false)}
            />
          </div>
        </div>
      )}

      {/* Terms & Conditions Modal */}
      <TermsModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        onAccept={() => {
          setAgreeTerms(true);
          setErrorMsg('');
        }}
        isAgreementMode={true}
      />
    </div>
  );
};
