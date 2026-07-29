import React from 'react';

export const AlertBadge = ({ type = "success", text }) => {
  const styles = {
    success: "bg-emerald-950/80 text-emerald-400 border-emerald-800",
    warning: "bg-amber-950/80 text-amber-400 border-amber-800",
    danger: "bg-rose-950/80 text-rose-400 border-rose-800",
    info: "bg-cyan-950/80 text-cyan-400 border-cyan-800",
  };

  return (
    <span className={`px-2.5 py-1 text-[11px] font-bold rounded-full border ${styles[type] || styles.success}`}>
      {text}
    </span>
  );
};
