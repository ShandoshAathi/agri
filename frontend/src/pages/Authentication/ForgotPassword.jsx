import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle } from 'lucide-react';

export const ForgotPassword = ({ onNavigateToLogin }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-slate-100">Reset Password</h2>
          <p className="text-sm text-slate-400">Enter your email to receive recovery instructions</p>
        </div>

        {submitted ? (
          <div className="p-4 bg-emerald-950/80 border border-emerald-800/60 rounded-xl text-center space-y-3">
            <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />
            <p className="text-sm text-slate-200">Password reset link sent to <strong>{email}</strong></p>
            <button 
              onClick={onNavigateToLogin}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl"
            >
              Return to Sign In
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
                  placeholder="name@agrisense.io"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold rounded-xl shadow-lg flex items-center justify-center space-x-2 transition-all"
            >
              <span>Send Reset Instructions</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onNavigateToLogin}
              className="w-full text-center text-xs text-slate-400 hover:text-slate-200 mt-2"
            >
              Back to Sign In
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
