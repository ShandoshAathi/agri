import React from 'react';

export const DataTable = ({ headers = [], rows = [] }) => {
  return (
    <div className="overflow-x-auto border border-slate-800 rounded-2xl">
      <table className="w-full text-left text-xs">
        <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800 uppercase">
          <tr>
            {headers.map((h, idx) => (
              <th key={idx} className="p-3">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60 text-slate-200">
          {rows.map((row, rIdx) => (
            <tr key={rIdx} className="hover:bg-slate-900/50">
              {row.map((cell, cIdx) => (
                <td key={cIdx} className="p-3">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
