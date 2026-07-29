import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

export const MainLayout = ({ children, currentPage, setCurrentPage }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="flex flex-1">
        <Sidebar 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage} 
          collapsed={collapsed} 
          setCollapsed={setCollapsed} 
        />
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
};
