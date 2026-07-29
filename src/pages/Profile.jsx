import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Save, 
  Lock 
} from 'lucide-react';

export const Profile = () => {
  const { user, role } = useAuth();
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone || '+1 (555) 234-5678');
  const [location, setLocation] = useState(user.location || 'Central AgTech Hub');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="glass-panel p-6 rounded-3xl border border-slate-800 flex items-center space-x-4">
        <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-400" />
        <div>
          <h2 className="text-2xl font-bold text-slate-100">{user.name}</h2>
          <p className="text-xs text-slate-400">{user.title} • <span className="text-emerald-400 capitalize">{role}</span></p>
        </div>
      </div>

      <div className="glass-panel p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-slate-100 pb-3 border-b border-slate-800">Personal Information</h3>

        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Email Address</label>
              <input
                type="email"
                disabled
                value={user.email}
                className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs opacity-60 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs"
              />
            </div>
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Location / AgTech Station</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full glass-input rounded-xl px-3.5 py-2.5 text-xs"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 hover:from-emerald-400 hover:to-teal-400 transition-all flex items-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>{saved ? 'Changes Saved!' : 'Save Profile Changes'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
