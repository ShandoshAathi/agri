import React from 'react';
import { SplashLanding } from '../pages/SplashLanding';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { Dashboard } from '../pages/Dashboard';
import { FarmManagement } from '../pages/FarmManagement';
import { LiveMonitoring } from '../pages/LiveMonitoring';
import { CropRecommendation } from '../pages/CropRecommendation';
import { DiseaseDiagnosis } from '../pages/DiseaseDiagnosis';
import { SmartIrrigation } from '../pages/SmartIrrigation';
import { Analytics } from '../pages/Analytics';
import { Reports } from '../pages/Reports';
import { Notifications } from '../pages/Notifications';
import { Profile } from '../pages/Profile';
import { Settings } from '../pages/Settings';

export const AppRoutes = ({ currentPage, setCurrentPage }) => {
  switch (currentPage) {
    case 'splash':
      return <SplashLanding onGetStarted={() => setCurrentPage('login')} onLogin={() => setCurrentPage('login')} />;
    case 'login':
      return <Login onNavigateToDashboard={() => setCurrentPage('dashboard')} onNavigateToRegister={() => setCurrentPage('register')} />;
    case 'register':
      return <Register onNavigateToDashboard={() => setCurrentPage('dashboard')} onNavigateToLogin={() => setCurrentPage('login')} />;
    case 'dashboard':
      return <Dashboard setCurrentPage={setCurrentPage} />;
    case 'farms':
      return <FarmManagement />;
    case 'monitoring':
      return <LiveMonitoring />;
    case 'recommendation':
      return <CropRecommendation />;
    case 'diagnosis':
      return <DiseaseDiagnosis />;
    case 'irrigation':
      return <SmartIrrigation />;
    case 'analytics':
      return <Analytics />;
    case 'reports':
      return <Reports />;
    case 'notifications':
      return <Notifications />;
    case 'profile':
      return <Profile />;
    case 'settings':
      return <Settings />;
    default:
      return <Dashboard setCurrentPage={setCurrentPage} />;
  }
};
