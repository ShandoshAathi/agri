import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const LanguageSelector = ({ variant = 'default', className = '' }) => {
  const { language, setLanguage, LANGUAGES } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Compact Pill Variant (Header & Topbars)
  if (variant === 'pill') {
    return (
      <div ref={dropdownRef} className={`relative inline-block text-left ${className}`}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-white/90 border border-stone-300 hover:border-emerald-600 rounded-full text-stone-950 text-xs font-black shadow-xs hover:shadow-md transition-all cursor-pointer select-none"
          title="Select Language"
        >
          <Globe className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
          <span className="text-sm">{currentLang.flag}</span>
          <span className="font-mono font-bold tracking-tight">{currentLang.native}</span>
          <ChevronDown className={`w-3 h-3 text-stone-500 transition-transform ${isOpen ? 'rotate-180 text-emerald-800' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-52 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl z-50 border border-stone-200 p-1.5 font-sans animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="px-3 py-1.5 text-[10px] font-black text-stone-500 uppercase tracking-wider border-b border-stone-100 mb-1">
              Select Regional Language
            </div>
            <div className="space-y-0.5 max-h-60 overflow-y-auto">
              {LANGUAGES.map((lang) => {
                const isSelected = lang.code === language;
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50 text-emerald-950 border border-emerald-200'
                        : 'text-stone-800 hover:bg-stone-100 hover:text-stone-950'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-base">{lang.flag}</span>
                      <div className="flex flex-col text-left">
                        <span className="font-extrabold text-stone-950">{lang.native}</span>
                        <span className="text-[10px] text-stone-500 font-semibold">{lang.label}</span>
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-emerald-800 stroke-[3]" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Cards / Settings Grid Variant
  if (variant === 'grid') {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 ${className}`}>
        {LANGUAGES.map((lang) => {
          const isSelected = lang.code === language;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => setLanguage(lang.code)}
              className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-emerald-50/90 border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
                  : 'bg-white/80 border-stone-200 hover:border-emerald-300 hover:bg-white shadow-2xs'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="text-2xl p-1 bg-stone-100/80 rounded-xl">{lang.flag}</span>
                <div className="text-left">
                  <h4 className="text-sm font-black text-stone-950">{lang.native}</h4>
                  <p className="text-xs font-semibold text-stone-500">{lang.label}</p>
                </div>
              </div>

              {isSelected ? (
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full border border-stone-300 bg-stone-50" />
              )}
            </button>
          );
        })}
      </div>
    );
  }

  // Standard Header Dropdown Variant
  return (
    <div ref={dropdownRef} className={`relative inline-block text-left ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-1.5 bg-white/90 border border-stone-300 hover:border-emerald-600 rounded-xl text-stone-950 text-xs font-black shadow-2xs hover:shadow-xs transition-all cursor-pointer"
      >
        <Globe className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
        <span className="text-sm">{currentLang.flag}</span>
        <span className="font-extrabold text-stone-950">{currentLang.native}</span>
        <ChevronDown className={`w-3 h-3 text-stone-500 transition-transform ${isOpen ? 'rotate-180 text-emerald-800' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl z-50 border border-stone-200 p-1.5 font-sans animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-3 py-1.5 text-[10px] font-black text-stone-500 uppercase tracking-wider border-b border-stone-100 mb-1">
            Regional Language / மொழி
          </div>
          <div className="space-y-1 max-h-64 overflow-y-auto">
            {LANGUAGES.map((lang) => {
              const isSelected = lang.code === language;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => {
                    setLanguage(lang.code);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-stone-800 hover:bg-stone-100 hover:text-stone-950'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <span className="text-lg">{lang.flag}</span>
                    <div className="flex flex-col text-left">
                      <span className="font-black text-xs">{lang.native}</span>
                      <span className={`text-[10px] font-semibold ${isSelected ? 'text-emerald-100' : 'text-stone-500'}`}>
                        {lang.label}
                      </span>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-white stroke-[3]" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
