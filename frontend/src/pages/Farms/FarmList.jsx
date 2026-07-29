import React, { useState } from 'react';
import { Sprout, MapPin, Plus, Edit, Settings, Info, Cpu } from 'lucide-react';
import { useFarm } from '../../context/FarmContext';

export const FarmList = ({ onSelectFarm, onAddFarm, onEditFarm, onSettingsFarm }) => {
  const { farms, activeFarm, setActiveFarm } = useFarm();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-100">Farms & Plots Overview</h2>
          <p className="text-xs text-slate-400">Manage agricultural zones and assigned IoT hardware</p>
        </div>
        {onAddFarm && (
          <button 
            onClick={onAddFarm}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl flex items-center space-x-2 transition-all shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Plot</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {farms.map((farm) => {
          const isSelected = activeFarm?.id === farm.id;
          return (
            <div 
              key={farm.id}
              className={`bg-slate-900 border rounded-2xl p-6 shadow-xl space-y-4 transition-all ${
                isSelected ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-slate-100 text-base">{farm.name}</h3>
                  <div className="flex items-center space-x-1 text-xs text-slate-400 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{farm.location}</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
                  {farm.healthScore}% Health
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs border-t border-slate-800/80">
                <div>
                  <span className="text-slate-500 block">Active Crop</span>
                  <span className="font-medium text-slate-200">{farm.crop}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Land Area</span>
                  <span className="font-medium text-slate-200">{farm.acres} Acres</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Soil Classification</span>
                  <span className="font-medium text-slate-200">{farm.soilType}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Assigned Farmer</span>
                  <span className="font-medium text-slate-200">{farm.farmer}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                <button
                  onClick={() => { setActiveFarm(farm); if(onSelectFarm) onSelectFarm(farm); }}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl flex items-center space-x-1 transition-all ${
                    isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>{isSelected ? 'Active Plot' : 'Select Plot'}</span>
                </button>

                <div className="flex items-center space-x-2">
                  {onEditFarm && (
                    <button onClick={() => onEditFarm(farm)} className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs">
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                  )}
                  {onSettingsFarm && (
                    <button onClick={() => onSettingsFarm(farm)} className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs">
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
