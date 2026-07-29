import React from 'react';
import { ChevronRight } from 'lucide-react';

export const BreadcrumbNav = ({ items = [] }) => {
  return (
    <div className="flex items-center space-x-2 text-xs text-slate-400">
      {items.map((item, idx) => (
        <React.Fragment key={idx}>
          {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-600" />}
          <span className={idx === items.length - 1 ? "text-slate-200 font-semibold" : "hover:text-slate-300 cursor-pointer"}>
            {item}
          </span>
        </React.Fragment>
      ))}
    </div>
  );
};
