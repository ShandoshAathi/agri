import React, { useState } from 'react';
import { FileText, Download, Calendar } from 'lucide-react';

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
      // Generate real downloadable CSV file content
      let csvContent = 'data:text/csv;charset=utf-8,';
      if (id === 'daily') {
        csvContent += 'Timestamp,Soil Moisture (%),Temperature (C),Humidity (%),Soil pH,Pump State\n';
        csvContent += '2026-08-22 08:00,42.5,26.4,62,6.4,OFF\n';
        csvContent += '2026-08-22 10:00,38.1,28.9,58,6.4,ON\n';
        csvContent += '2026-08-22 12:00,52.0,30.5,54,6.5,OFF\n';
      } else if (id === 'weekly') {
        csvContent += 'Day,Water Consumed (Liters),Pump Active Duration (Minutes),Efficiency Rating\n';
        csvContent += 'Monday,420,45,98%\nTuesday,380,40,99%\nWednesday,510,55,96%\nThursday,290,30,100%\nFriday,460,50,97%\n';
      } else if (id === 'disease') {
        csvContent += 'Scan ID,Crop Plot,Pathogen Identified,Severity,Treatment Action,Scan Date\n';
        csvContent += 'SCAN-101,Tomato Sector 1,Early Blight (Alternaria solani),Moderate (55%),Copper Fungicide,2026-08-22\n';
        csvContent += 'SCAN-102,Cucumber Greenhouse,Powdery Mildew,High (78%),Bio Sulfur Spray,2026-08-21\n';
      } else {
        csvContent += 'Crop Variety,Acreage,Target Yield,Actual Harvest,Soil pH Compatibility,Profit Margin\n';
        csvContent += 'Tomato (Hybrid Rome),4.5 Acres,28.5 Tons/Acre,29.2 Tons/Acre,Perfect (6.4),$14500\n';
        csvContent += 'Bell Pepper,2.0 Acres,22.0 Tons/Acre,21.8 Tons/Acre,Optimal (6.5),$8900\n';
      }
      
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `AgriSense_${id.toUpperCase()}_Report.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, 1200);
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
