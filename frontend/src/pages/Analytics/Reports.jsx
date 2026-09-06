import React from 'react';
import { FileText, FileSpreadsheet } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const Reports = () => {
  const { t } = useLanguage();
  const handleExport = (type) => {
    alert(`Downloading AgriSense Telemetry & Analytics Report (${type.toUpperCase()})...`);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 font-sans">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center space-x-2 font-['Manrope',_sans-serif]">
          <FileText className="w-4 h-4 text-emerald-400" />
          <span>{t('Export Analytics Reports')}</span>
        </h3>
      </div>

      <p className="text-xs text-slate-400">{t('Download formatted telemetry summaries, irrigation volume logs, and AI yield diagnostic reports.')}</p>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => handleExport('pdf')}
          className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700 flex items-center justify-center space-x-2 cursor-pointer"
        >
          <FileText className="w-4 h-4 text-rose-400" />
          <span>{t('Export as PDF Report')}</span>
        </button>

        <button
          onClick={() => handleExport('xlsx')}
          className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700 flex items-center justify-center space-x-2 cursor-pointer"
        >
          <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
          <span>{t('Export Excel (.xlsx)')}</span>
        </button>
      </div>
    </div>
  );
};
