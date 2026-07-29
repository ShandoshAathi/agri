import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Calendar
} from 'lucide-react';

export const Reports = () => {
  const [downloading, setDownloading] = useState(null);

  const reportTypes = [
    { id: 'daily', name: 'Daily Telemetry Summary', desc: 'Hourly sensor logs, min/max moisture, temp, and pump run cycles.', format: 'PDF & CSV' },
    { id: 'weekly', name: 'Weekly Water & Irrigation Report', desc: 'Total water consumption by plot, pump relay triggers, and efficiency score.', format: 'Excel (.xlsx)' },
    { id: 'disease', name: 'AI Disease Diagnosis Audit', desc: 'Scan history, disease severity distribution, and chemical treatment logs.', format: 'PDF' },
    { id: 'crop_history', name: 'Seasonal Crop Yield Audit', desc: 'Harvest yields, AI recommendation accuracy, soil pH trends across 6 months.', format: 'Excel & CSV' }
  ];

  const handleExport = (id) => {
    setDownloading(id);
    setTimeout(() => {
      setDownloading(null);
      alert(`Report export generated successfully for ${id.toUpperCase()} report format!`);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 rounded-3xl border border-slate-800">
        <h2 className="text-2xl font-bold text-slate-100 flex items-center space-x-2">
          <FileText className="w-6 h-6 text-emerald-400" />
          <span>Agricultural Reports & Data Export</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">Generate comprehensive daily, weekly, and monthly farm performance audits for compliance and decision-making.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportTypes.map((rpt) => (
          <div key={rpt.id} className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {rpt.format}
                </span>
                <Calendar className="w-4 h-4 text-slate-500" />
              </div>
              <h3 className="text-lg font-bold text-slate-100 mt-2">{rpt.name}</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{rpt.desc}</p>
            </div>

            <button
              onClick={() => handleExport(rpt.id)}
              disabled={downloading === rpt.id}
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-slate-700 hover:border-emerald-500/50 transition-all flex items-center justify-center space-x-2 mt-4"
            >
              {downloading === rpt.id ? (
                <span>Generating Export File...</span>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download Report Data</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
