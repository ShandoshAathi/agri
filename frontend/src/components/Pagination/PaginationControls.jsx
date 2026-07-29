import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const PaginationControls = ({ currentPage = 1, totalPages = 5, onPageChange }) => {
  return (
    <div className="flex items-center justify-between text-xs text-slate-400 py-3">
      <span>Page {currentPage} of {totalPages}</span>
      <div className="flex items-center space-x-2">
        <button
          disabled={currentPage <= 1}
          onClick={() => onPageChange && onPageChange(currentPage - 1)}
          className="p-1.5 bg-slate-900 border border-slate-800 rounded-lg disabled:opacity-40"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange && onPageChange(currentPage + 1)}
          className="p-1.5 bg-slate-900 border border-slate-800 rounded-lg disabled:opacity-40"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
