import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  ShieldCheck, 
  MapPin, 
  Award, 
  Key, 
  Smartphone, 
  Lock, 
  CheckCircle, 
  Save, 
  Edit3, 
  Tractor, 
  Cpu, 
  Sparkles, 
  Globe, 
  Activity,
  Layers,
  FileCheck,
  Check
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const UserProfile = () => {
  const { user, role } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: user?.name || 'Dr. Aathi Shandosh',
    email: user?.email || 'aathi.shandosh@agrisense.io',
    secondaryEmail: 'aathi.agronomy@gmail.com',
    phone: '+1 (555) 234-5678',
    location: 'California Central Valley, Zone 9B',
    license: 'AGRI-CA-994820-CERT',
    bio: 'Senior Agricultural Scientist specializing in precision IoT soil monitoring, micro-climate predictive modeling, and organic yield optimization.',
    twoFactor: true,
  });

  const [passwordData, setPasswordData] = useState({
    current: '',
    newPass: '',
    confirmPass: ''
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Toast Notification */}
      {savedSuccess && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-900 text-lime-300 px-4 py-3 rounded-2xl shadow-2xl border border-lime-400/40 flex items-center space-x-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle className="w-5 h-5 text-lime-400" />
          <span className="text-xs font-black">Profile details updated successfully!</span>
        </div>
      )}

      {/* Top Banner & Hero Profile Card */}
      <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 rounded-3xl p-6 lg:p-8 text-white shadow-xl relative overflow-hidden border border-emerald-800/50">
        {/* Soft Ambient Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-lime-400/10 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center space-x-5">
            <div className="relative group">
              <img 
                src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256'} 
                alt={formData.name} 
                className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl object-cover border-2 border-lime-400 shadow-2xl"
              />
              <button 
                className="absolute -bottom-1 -right-1 p-2 bg-lime-400 text-emerald-950 rounded-xl shadow-md hover:scale-110 transition-transform cursor-pointer border border-emerald-950"
                title="Change Profile Picture"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <h2 className="text-2xl font-black tracking-tight font-['Manrope',_sans-serif]">{formData.name}</h2>
                <span className="p-1 rounded-full bg-lime-400/20 text-lime-400 border border-lime-400/30" title="Verified Agronomist">
                  <ShieldCheck className="w-4 h-4" />
                </span>
              </div>
              <p className="text-xs text-emerald-200 font-semibold">{formData.email}</p>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="px-2.5 py-0.5 rounded-full bg-lime-400 text-emerald-950 text-[10px] font-black uppercase tracking-wider shadow-2xs">
                  {role === 'manager' ? 'Senior Farm Manager' : 'Certified Agronomist'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-emerald-100 text-[10px] font-bold border border-white/20 flex items-center space-x-1">
                  <MapPin className="w-3 h-3 text-lime-400" />
                  <span>{formData.location}</span>
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stat Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full md:w-auto text-xs">
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/15 text-center">
              <span className="text-emerald-300 font-bold text-[10px] uppercase block">Managed Land</span>
              <span className="text-lg font-black text-white font-['Manrope',_sans-serif]">245.5 Ac</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/15 text-center">
              <span className="text-emerald-300 font-bold text-[10px] uppercase block">Active Sensors</span>
              <span className="text-lg font-black text-white font-['Manrope',_sans-serif]">38 Nodes</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/15 text-center">
              <span className="text-emerald-300 font-bold text-[10px] uppercase block">AI Inferences</span>
              <span className="text-lg font-black text-white font-['Manrope',_sans-serif]">142 Runs</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/15 text-center">
              <span className="text-emerald-300 font-bold text-[10px] uppercase block">Security Score</span>
              <span className="text-lg font-black text-lime-400 font-['Manrope',_sans-serif]">98%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Navigation Tabs */}
      <div className="flex items-center space-x-2 border-b border-stone-200 pb-2 overflow-x-auto scrollbar-none">
        {[
          { id: 'personal', label: 'Personal Information', icon: User },
          { id: 'access', label: 'Farm Access & Roles', icon: ShieldCheck },
          { id: 'security', label: 'Security & Audit Logs', icon: Key },
          { id: 'certifications', label: 'Agronomic Licenses', icon: Award }
        ].map(tab => {
          const TabIcon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold flex items-center space-x-2 transition-all cursor-pointer whitespace-nowrap ${
                isActive 
                  ? 'bg-emerald-800 text-lime-300 shadow-md border border-lime-400/30' 
                  : 'bg-white text-stone-600 hover:text-stone-900 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              <TabIcon className={`w-4 h-4 ${isActive ? 'text-lime-400' : 'text-stone-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Personal Information */}
      {activeTab === 'personal' && (
        <form onSubmit={handleSaveProfile} className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm space-y-6 eco-card">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4">
            <div>
              <h3 className="text-base font-black text-stone-900 font-['Manrope',_sans-serif]">Personal Details & Contact</h3>
              <p className="text-xs text-stone-500 font-medium">Update your account information, primary email, and agronomist license details.</p>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-800 hover:bg-emerald-900 text-lime-300 font-extrabold text-xs rounded-xl shadow-md flex items-center space-x-1.5 transition-all border border-lime-400/30 cursor-pointer"
            >
              <Save className="w-4 h-4 text-lime-400" />
              <span>Save Changes</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-stone-700 font-bold mb-1.5">Full Name</label>
              <input 
                type="text" 
                value={formData.name} 
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full glass-input py-2.5 px-3.5 rounded-xl font-semibold border border-stone-300 focus:outline-none focus:border-emerald-700"
              />
            </div>

            <div>
              <label className="block text-stone-700 font-bold mb-1.5">Primary Email Address</label>
              <input 
                type="email" 
                value={formData.email} 
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full glass-input py-2.5 px-3.5 rounded-xl font-semibold border border-stone-300 focus:outline-none focus:border-emerald-700"
              />
            </div>

            <div>
              <label className="block text-stone-700 font-bold mb-1.5">Secondary Email Address</label>
              <input 
                type="email" 
                value={formData.secondaryEmail} 
                onChange={(e) => setFormData({ ...formData, secondaryEmail: e.target.value })}
                className="w-full glass-input py-2.5 px-3.5 rounded-xl font-semibold border border-stone-300 focus:outline-none focus:border-emerald-700"
              />
            </div>

            <div>
              <label className="block text-stone-700 font-bold mb-1.5">Phone Number</label>
              <input 
                type="text" 
                value={formData.phone} 
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full glass-input py-2.5 px-3.5 rounded-xl font-semibold border border-stone-300 focus:outline-none focus:border-emerald-700"
              />
            </div>

            <div>
              <label className="block text-stone-700 font-bold mb-1.5">Agronomist License ID</label>
              <input 
                type="text" 
                value={formData.license} 
                onChange={(e) => setFormData({ ...formData, license: e.target.value })}
                className="w-full glass-input py-2.5 px-3.5 rounded-xl font-semibold border border-stone-300 focus:outline-none focus:border-emerald-700 font-mono"
              />
            </div>

            <div>
              <label className="block text-stone-700 font-bold mb-1.5">Farm Region & Climate Zone</label>
              <input 
                type="text" 
                value={formData.location} 
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full glass-input py-2.5 px-3.5 rounded-xl font-semibold border border-stone-300 focus:outline-none focus:border-emerald-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-stone-700 font-bold mb-1.5">Professional Bio & Agronomy Focus</label>
            <textarea 
              rows={3} 
              value={formData.bio} 
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full glass-input py-2.5 px-3.5 rounded-xl font-semibold border border-stone-300 focus:outline-none focus:border-emerald-700 text-xs"
            />
          </div>
        </form>
      )}

      {/* Tab 2: Farm Access & Roles */}
      {activeTab === 'access' && (
        <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm space-y-6 eco-card">
          <div className="border-b border-stone-200 pb-4">
            <h3 className="text-base font-black text-stone-900 font-['Manrope',_sans-serif]">Farm Access Levels & Role Matrix</h3>
            <p className="text-xs text-stone-500 font-medium">Overview of assigned farm management privileges, field access zones, and hardware controls.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-2xl space-y-2">
              <div className="flex items-center space-x-2 text-emerald-800 font-extrabold">
                <Tractor className="w-4 h-4 text-emerald-700" />
                <span>Assigned Farms</span>
              </div>
              <ul className="space-y-1 font-semibold text-stone-700">
                <li className="flex items-center space-x-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Green Valley Farm (North)</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Sunrise Acres (Sector 2)</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Orchard Grove (Hydroponics)</span>
                </li>
              </ul>
            </div>

            <div className="p-4 bg-lime-50/60 border border-lime-200 rounded-2xl space-y-2">
              <div className="flex items-center space-x-2 text-emerald-950 font-extrabold">
                <Cpu className="w-4 h-4 text-emerald-800" />
                <span>IoT Hardware Rights</span>
              </div>
              <ul className="space-y-1 font-semibold text-stone-700">
                <li className="flex items-center space-x-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Full Pump Remote Control</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Sensor Calibration & Reset</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                  <span>MQTT Broker Configuration</span>
                </li>
              </ul>
            </div>

            <div className="p-4 bg-teal-50/60 border border-teal-200 rounded-2xl space-y-2">
              <div className="flex items-center space-x-2 text-teal-900 font-extrabold">
                <Sparkles className="w-4 h-4 text-teal-700" />
                <span>AI Engine Privileges</span>
              </div>
              <ul className="space-y-1 font-semibold text-stone-700">
                <li className="flex items-center space-x-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                  <span>AI Crop Recommendation v2.4</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Plant Disease Vision Classifier</span>
                </li>
                <li className="flex items-center space-x-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Yield Forecast Model Override</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Security & Audit Logs */}
      {activeTab === 'security' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs font-sans">
          {/* Password & 2FA Form */}
          <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm space-y-6 eco-card">
            <div className="border-b border-stone-200 pb-3">
              <h3 className="text-base font-black text-stone-900 font-['Manrope',_sans-serif] flex items-center space-x-2">
                <Lock className="w-4 h-4 text-emerald-800" />
                <span>Account Password & 2FA</span>
              </h3>
              <p className="text-xs text-stone-500 font-medium">Update your account password and manage two-factor authentication.</p>
            </div>

            {/* 2FA Toggle */}
            <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-emerald-100 text-emerald-800 rounded-xl">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-stone-900">Two-Factor Authentication (2FA)</h4>
                  <p className="text-[11px] text-stone-500 font-medium">Protects your account with Google Authenticator or SMS codes.</p>
                </div>
              </div>
              <button
                onClick={() => setFormData({ ...formData, twoFactor: !formData.twoFactor })}
                className={`w-12 h-6 rounded-full transition-colors p-1 cursor-pointer ${
                  formData.twoFactor ? 'bg-emerald-800' : 'bg-stone-300'
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  formData.twoFactor ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-stone-700 font-bold mb-1">Current Password</label>
                <input 
                  type="password" 
                  value={passwordData.current} 
                  onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                  placeholder="••••••••••••" 
                  className="w-full glass-input py-2 px-3 rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">New Password</label>
                <input 
                  type="password" 
                  value={passwordData.newPass} 
                  onChange={(e) => setPasswordData({ ...passwordData, newPass: e.target.value })}
                  placeholder="Minimum 8 characters" 
                  className="w-full glass-input py-2 px-3 rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-bold mb-1">Confirm New Password</label>
                <input 
                  type="password" 
                  value={passwordData.confirmPass} 
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPass: e.target.value })}
                  placeholder="Re-enter new password" 
                  className="w-full glass-input py-2 px-3 rounded-xl border border-stone-300 focus:outline-none focus:border-emerald-700"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white font-extrabold rounded-xl shadow-md cursor-pointer transition-all"
              >
                Update Security Credentials
              </button>
            </form>
          </div>

          {/* Login Audit Log */}
          <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm space-y-4 eco-card">
            <div className="border-b border-stone-200 pb-3 flex items-center justify-between">
              <h3 className="text-base font-black text-stone-900 font-['Manrope',_sans-serif] flex items-center space-x-2">
                <Globe className="w-4 h-4 text-emerald-800" />
                <span>Active Login Sessions</span>
              </h3>
              <span className="text-[10px] font-black px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md">2 Active</span>
            </div>

            <div className="space-y-3">
              {[
                { browser: 'Chrome on macOS (Current Device)', ip: '192.168.1.104', location: 'California, US', time: 'Active now' },
                { browser: 'AgriSense Mobile App (iOS)', ip: '172.56.21.90', location: 'Sacramento, US', time: '2 hours ago' },
                { browser: 'Firefox on Windows', ip: '104.28.14.22', location: 'San Jose, US', time: 'May 20, 2026' }
              ].map((session, idx) => (
                <div key={idx} className="p-3 bg-stone-50 border border-stone-200 rounded-xl flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-stone-900">{session.browser}</h4>
                    <p className="text-[11px] text-stone-500 font-medium">{session.ip} • {session.location}</p>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md">
                    {session.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Agronomic Certifications */}
      {activeTab === 'certifications' && (
        <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm space-y-6 eco-card font-sans">
          <div className="border-b border-stone-200 pb-4">
            <h3 className="text-base font-black text-stone-900 font-['Manrope',_sans-serif]">Agronomic Credentials & Certifications</h3>
            <p className="text-xs text-stone-500 font-medium">Verified agricultural certifications, soil classification standards, and organic compliance IDs.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl flex items-start space-x-3">
              <div className="p-2.5 bg-lime-400 text-emerald-950 rounded-xl shadow-xs shrink-0">
                <FileCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-stone-900">Certified Crop Advisor (CCA - USDA)</h4>
                <p className="text-stone-500 text-[11px]">License ID: CCA-99820-CA • Valid thru Dec 2028</p>
                <span className="inline-block mt-2 px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded-md text-[10px]">
                  Verified Active
                </span>
              </div>
            </div>

            <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl flex items-start space-x-3">
              <div className="p-2.5 bg-emerald-800 text-lime-300 rounded-xl shadow-xs shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-extrabold text-stone-900">FAO Soil Taxonomy Specialist</h4>
                <p className="text-stone-500 text-[11px]">Class: Mollisols & Alfisols Micro-climate Analyst</p>
                <span className="inline-block mt-2 px-2 py-0.5 bg-emerald-100 text-emerald-800 font-bold rounded-md text-[10px]">
                  Certified
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
