import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { FarmProvider } from './context/FarmContext';
import { TelemetryProvider } from './context/TelemetryContext';

import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';

import { SplashLanding } from './pages/SplashLanding';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { FarmManagement } from './pages/FarmManagement';
import { LiveMonitoring } from './pages/LiveMonitoring';
import { CropRecommendation } from './pages/CropRecommendation';
import { DiseaseDiagnosis } from './pages/DiseaseDiagnosis';
import { SmartIrrigation } from './pages/SmartIrrigation';
import { Analytics } from './pages/Analytics';
import { Reports } from './pages/Reports';
import { Notifications } from './pages/Notifications';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';

const MainContent = () => {
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState('splash'); // Default entry point
  const [collapsed, setCollapsed] = useState(false);

  // If user is on authentication screens or splash
  if (!isAuthenticated && currentPage !== 'login' && currentPage !== 'register' && currentPage !== 'splash') {
    return <SplashLanding onGetStarted={() => setCurrentPage('login')} onLogin={() => setCurrentPage('login')} />;
  }

  if (currentPage === 'splash') {
    return <SplashLanding onGetStarted={() => setCurrentPage('login')} onLogin={() => setCurrentPage('login')} />;
  }

  if (currentPage === 'login') {
    return <Login onNavigateToDashboard={() => setCurrentPage('dashboard')} onNavigateToRegister={() => setCurrentPage('register')} />;
  }

  if (currentPage === 'register') {
    return <Register onNavigateToDashboard={() => setCurrentPage('dashboard')} onNavigateToLogin={() => setCurrentPage('login')} />;
  }

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
          {currentPage === 'dashboard' && <Dashboard setCurrentPage={setCurrentPage} />}
          {currentPage === 'farms' && <FarmManagement />}
          {currentPage === 'monitoring' && <LiveMonitoring />}
          {currentPage === 'recommendation' && <CropRecommendation />}
          {currentPage === 'diagnosis' && <DiseaseDiagnosis />}
          {currentPage === 'irrigation' && <SmartIrrigation />}
          {currentPage === 'analytics' && <Analytics />}
          {currentPage === 'reports' && <Reports />}
          {currentPage === 'notifications' && <Notifications />}
          {currentPage === 'profile' && <Profile />}
          {currentPage === 'settings' && <Settings />}
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <FarmProvider>
        <TelemetryProvider>
          <MainContent />
        </TelemetryProvider>
      </FarmProvider>
    </AuthProvider>
  );
}
