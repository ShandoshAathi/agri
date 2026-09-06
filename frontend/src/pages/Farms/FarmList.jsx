import React from 'react';
import { MapPin, Plus, Edit, Settings, Info } from 'lucide-react';
import { useFarm } from '../../context/FarmContext';
import { useLanguage } from '../../context/LanguageContext';

export const FarmList = ({ onSelectFarm, onAddFarm, onEditFarm, onSettingsFarm }) => {
  const { farms, activeFarm, setActiveFarm } = useFarm();
  const { t } = useLanguage();

  return (
    <div className="space-y-6 font-sans">
      <div className="flex items-center justify-between bg-white border border-stone-200 p-5 rounded-2xl shadow-xs">
        <div>
          <h2 className="text-xl font-black text-stone-900 font-['Manrope',_sans-serif]">{t('Farms Management')}</h2>
          <p className="text-xs text-stone-500 font-medium mt-0.5">{t('Manage land plots, crops, and field assignments')}</p>
        </div>
        {onAddFarm && (
          <button 
            onClick={onAddFarm}
            className="px-4 py-2 bg-[#14532D] hover:bg-emerald-900 text-[#BEF264] font-extrabold text-xs rounded-xl flex items-center space-x-2 transition-all shadow-md border border-lime-400/40 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>{t('Add New Plot')}</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {farms.map((farm) => {
          const isSelected = activeFarm?.id === farm.id;
          return (
            <div 
              key={farm.id}
              className={`bg-white border rounded-2xl p-6 shadow-sm space-y-4 transition-all eco-card ${
                isSelected ? 'border-lime-500 ring-2 ring-lime-500/20' : 'border-stone-200 hover:border-stone-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-extrabold text-stone-900 text-base font-['Manrope',_sans-serif]">{t(farm.name)}</h3>
                  <div className="flex items-center space-x-1 text-xs text-stone-500 mt-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-emerald-800" />
                    <span>{farm.location}</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 text-xs font-black rounded-full bg-lime-400 text-emerald-950 border border-lime-500 shadow-2xs">
                  {farm.healthScore}% {t('Health')}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs border-t border-stone-200">
                <div>
                  <span className="text-stone-500 font-semibold block">{t('Crop')}</span>
                  <span className="font-bold text-stone-900">{t(farm.crop)}</span>
                </div>
                <div>
                  <span className="text-stone-500 font-semibold block">{t('Land')}</span>
                  <span className="font-bold text-stone-900">{farm.acres} {t('Acres')}</span>
                </div>
                <div>
                  <span className="text-stone-500 font-semibold block">{t('Soil')}</span>
                  <span className="font-bold text-stone-900">{farm.soilType}</span>
                </div>
                <div>
                  <span className="text-stone-500 font-semibold block">{t('Farmer')}</span>
                  <span className="font-bold text-stone-900">{farm.farmer}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-stone-200">
                <button
                  onClick={() => { setActiveFarm(farm); if(onSelectFarm) onSelectFarm(farm); }}
                  className={`px-3.5 py-1.5 text-xs font-extrabold rounded-xl flex items-center space-x-1.5 transition-all cursor-pointer ${
                    isSelected ? 'bg-[#14532D] text-[#BEF264] border border-lime-400/40 shadow-xs' : 'bg-stone-200/80 text-stone-800 hover:bg-stone-300'
                  }`}
                >
                  <Info className="w-3.5 h-3.5 text-lime-400" />
                  <span>{isSelected ? t('Active') : t('Select')}</span>
                </button>

                <div className="flex items-center space-x-2">
                  {onEditFarm && (
                    <button onClick={() => onEditFarm(farm)} className="p-2 bg-stone-200/80 hover:bg-stone-300 text-stone-800 rounded-xl text-xs cursor-pointer">
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {onSettingsFarm && (
                    <button onClick={() => onSettingsFarm(farm)} className="p-2 bg-stone-200/80 hover:bg-stone-300 text-stone-800 rounded-xl text-xs cursor-pointer">
                      <Settings className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
