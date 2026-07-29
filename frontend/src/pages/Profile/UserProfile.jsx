import React from 'react';
import { User, ShieldCheck, Mail, Phone, MapPin, Edit } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const UserProfile = ({ onEdit }) => {
  const { user, role } = useAuth();

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
            {user?.name?.[0] || 'U'}
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-100">{user?.name || 'Dr. Sarah Jenkins'}</h3>
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
              {role === 'manager' ? 'Farm Manager' : 'Farmer'}
            </span>
          </div>
        </div>
        {onEdit && (
          <button onClick={onEdit} className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl flex items-center space-x-1">
            <Edit className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl space-y-1">
          <span className="text-slate-500 block">Email Address</span>
          <span className="font-semibold text-slate-200">{user?.email || 'manager@agrisense.io'}</span>
        </div>
        <div className="p-3 bg-slate-950/60 border border-slate-800 rounded-xl space-y-1">
          <span className="text-slate-500 block">Phone Contact</span>
          <span className="font-semibold text-slate-200">+1 (555) 019-2834</span>
        </div>
      </div>
    </div>
  );
};
