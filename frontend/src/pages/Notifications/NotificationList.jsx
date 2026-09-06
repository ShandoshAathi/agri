import React from 'react';
import { Bell, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const NotificationList = () => {
  const { t } = useLanguage();
  const alerts = [
    { type: 'warning', title: 'Low Soil Moisture Alert', msg: 'Block A moisture dropped below 35%. Auto-irrigation triggered.', time: '10 mins ago' },
    { type: 'success', title: 'Irrigation Cycle Complete', msg: 'Plot 2 drip irrigation completed (450 Liters delivered).', time: '1 hour ago' },
    { type: 'info', title: 'AI Model Scan Complete', msg: 'Leaf scan classified as Early Blight. Copper spray advised.', time: '3 hours ago' },
  ];

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-4 eco-card font-sans">
      <div className="flex items-center space-x-2 border-b border-stone-200 pb-3">
        <Bell className="w-5 h-5 text-emerald-800" />
        <h3 className="text-base font-black text-stone-900 font-['Manrope',_sans-serif]">{t('System Notification Feed')}</h3>
      </div>

      <div className="space-y-3">
        {alerts.map((a, idx) => (
          <div key={idx} className="p-3 bg-stone-100 border border-stone-200 rounded-xl flex items-start space-x-3 text-xs">
            {a.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />}
            {a.type === 'success' && <CheckCircle className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />}
            {a.type === 'info' && <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />}
            <div className="flex-1 space-y-0.5">
              <div className="font-bold text-stone-900">{t(a.title)}</div>
              <div className="text-stone-600 font-medium">{t(a.msg)}</div>
            </div>
            <span className="text-stone-400 font-semibold text-[10px]">{t(a.time)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
