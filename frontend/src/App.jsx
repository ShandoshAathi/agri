import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { FarmProvider } from './context/FarmContext';
import { TelemetryProvider } from './context/TelemetryContext';

import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';

import { Splash } from './pages/Authentication/Splash';
import { Login } from './pages/Authentication/Login';
import { Register } from './pages/Authentication/Register';
import { ForgotPassword } from './pages/Authentication/ForgotPassword';
import { ResetPassword } from './pages/Authentication/ResetPassword';

import { Dashboard } from './pages/Dashboard/Dashboard';
import { FarmList } from './pages/Farms/FarmList';
import { SensorDashboard } from './pages/Monitoring/SensorDashboard';
import { Recommendation } from './pages/CropAI/Recommendation';
import { UploadImage } from './pages/DiseaseAI/UploadImage';
import { Diagnosis } from './pages/DiseaseAI/Diagnosis';
import { IrrigationDashboard } from './pages/Irrigation/IrrigationDashboard';
import { AnalyticsDashboard } from './pages/Analytics/AnalyticsDashboard';
import { NotificationList } from './pages/Notifications/NotificationList';
import { UserProfile } from './pages/Profile/UserProfile';
import { GeneralSettings } from './pages/Settings/GeneralSettings';

const MainContent = () => {
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState('splash');
  const [collapsed, setCollapsed] = useState(false);
  const [diseaseDiagnosisResult, setDiseaseDiagnosisResult] = useState(null);

  if (!isAuthenticated && !['login', 'register', 'splash', 'forgot', 'reset'].includes(currentPage)) {
    return <Splash onGetStarted={() => setCurrentPage('login')} onLogin={() => setCurrentPage('login')} />;
  }

  if (currentPage === 'splash') {
    return <Splash onGetStarted={() => setCurrentPage('login')} onLogin={() => setCurrentPage('login')} />;
  }

  if (currentPage === 'login') {
    return (
      <Login 
        onNavigateToDashboard={() => setCurrentPage('dashboard')} 
        onNavigateToRegister={() => setCurrentPage('register')} 
        onNavigateToForgot={() => setCurrentPage('forgot')} 
      />
    );
  }

  if (currentPage === 'register') {
    return <Register onNavigateToDashboard={() => setCurrentPage('dashboard')} onNavigateToLogin={() => setCurrentPage('login')} />;
  }

  if (currentPage === 'forgot') {
    return <ForgotPassword onNavigateToLogin={() => setCurrentPage('login')} />;
  }

  if (currentPage === 'reset') {
    return <ResetPassword onNavigateToLogin={() => setCurrentPage('login')} />;
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
          {currentPage === 'farms' && <FarmList />}
          {currentPage === 'monitoring' && <SensorDashboard />}
          {currentPage === 'recommendation' && <Recommendation />}
          {currentPage === 'diagnosis' && (
            <div className="space-y-6">
              <UploadImage onDiagnosisResult={(res) => setDiseaseDiagnosisResult(res)} />
              {diseaseDiagnosisResult && <Diagnosis result={diseaseDiagnosisResult} />}
            </div>
          )}
          {currentPage === 'irrigation' && <IrrigationDashboard />}
          {currentPage === 'analytics' && <AnalyticsDashboard />}
          {currentPage === 'reports' && <AnalyticsDashboard />}
          {currentPage === 'notifications' && <NotificationList />}
          {currentPage === 'profile' && <UserProfile />}
          {currentPage === 'settings' && <GeneralSettings />}
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
