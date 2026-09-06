import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { FarmProvider } from './context/FarmContext';
import { TelemetryProvider } from './context/TelemetryContext';
import { LanguageProvider } from './context/LanguageContext';

import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { CropAIAvatar } from './components/CropAI/CropAIAvatar';

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
import { MobileAppShowcase } from './pages/MobileAppShowcase';
import { WeatherWidget } from './pages/Dashboard/WeatherWidget';

const MainContent = () => {
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState('splash');
  const [collapsed, setCollapsed] = useState(false);
  const [diseaseDiagnosisResult, setDiseaseDiagnosisResult] = useState(null);

  if (!isAuthenticated && !['login', 'register', 'splash', 'forgot', 'reset'].includes(currentPage)) {
    return (
      <Login 
        onNavigateToDashboard={() => setCurrentPage('dashboard')} 
        onNavigateToRegister={() => setCurrentPage('register')} 
        onNavigateToForgot={() => setCurrentPage('forgot')} 
        onNavigateToSplash={() => setCurrentPage('splash')}
      />
    );
  }

  if (currentPage === 'splash') {
    return (
      <Splash 
        onGetStarted={() => setCurrentPage('login')} 
        onLogin={() => setCurrentPage('login')} 
      />
    );
  }

  if (currentPage === 'login') {
    return (
      <Login 
        onNavigateToDashboard={() => setCurrentPage('dashboard')} 
        onNavigateToRegister={() => setCurrentPage('register')} 
        onNavigateToForgot={() => setCurrentPage('forgot')} 
        onNavigateToSplash={() => setCurrentPage('splash')}
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

  if (currentPage === 'mobile_showcase') {
    return (
      <div className="min-h-screen bg-[#FAF7F2] text-stone-900 flex flex-col font-sans">
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <MobileAppShowcase onNavigateToDashboard={() => setCurrentPage('dashboard')} />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#F0F4F1] text-slate-900 flex flex-col font-sans selection:bg-emerald-200">
      {/* GPU-Accelerated Soft Ambient Mesh Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-200/50 via-teal-100/30 to-transparent transform-gpu" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <div className="flex-1 pb-28">
          <main className="p-4 lg:p-6 max-w-[1700px] mx-auto w-full space-y-6">
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
            {currentPage === 'weather' && <WeatherWidget />}
            {currentPage === 'devices' && <SensorDashboard />}
            {currentPage === 'profile' && <UserProfile />}
            {currentPage === 'settings' && <GeneralSettings />}
          </main>
        </div>
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <CropAIAvatar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <FarmProvider>
          <TelemetryProvider>
            <MainContent />
          </TelemetryProvider>
        </FarmProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
