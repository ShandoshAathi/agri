import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  FileText, 
  ShieldCheck, 
  X, 
  CheckCircle2, 
  Lock, 
  AlertTriangle, 
  Cpu, 
  Database, 
  Scale, 
  Sparkles,
  Info,
  ShoppingBag,
  Truck,
  RotateCcw
} from 'lucide-react';

export const TermsModal = ({ isOpen, onClose, onAccept, isAgreementMode = false }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('terms');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200 select-none">
      <div className="bg-white rounded-[32px] border border-stone-200 shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden text-stone-900 font-sans">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 p-5 sm:p-6 text-white flex items-center justify-between shrink-0 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-lime-400/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center space-x-3 relative z-10">
            <div className="p-3 bg-lime-400 text-emerald-950 rounded-2xl shadow-md shrink-0">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-xl sm:text-2xl font-black font-['Manrope',_sans-serif] tracking-tight">
                  AgriSense AI Legal Center
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-lime-400/20 text-lime-300 text-[10px] font-mono font-bold border border-lime-400/30">
                  v2.4 Updated
                </span>
              </div>
              <p className="text-xs text-emerald-200 font-medium">
                Terms of Service & Data Privacy Policy for Smart Precision Agriculture
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-stone-200 hover:text-white transition-all cursor-pointer border border-white/20 relative z-10"
            title="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center space-x-2 px-6 pt-4 border-b border-stone-200 bg-stone-50/80 shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('terms')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-extrabold flex items-center space-x-2 transition-all cursor-pointer border-t border-x shrink-0 ${
              activeTab === 'terms'
                ? 'bg-white text-emerald-950 border-stone-200 shadow-xs border-b-2 border-b-emerald-800'
                : 'text-stone-600 hover:text-stone-900 border-transparent hover:bg-stone-100'
            }`}
          >
            <FileText className={`w-4 h-4 ${activeTab === 'terms' ? 'text-emerald-800' : 'text-stone-400'}`} />
            <span>{t('Terms of Service')}</span>
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-extrabold flex items-center space-x-2 transition-all cursor-pointer border-t border-x shrink-0 ${
              activeTab === 'privacy'
                ? 'bg-white text-emerald-950 border-stone-200 shadow-xs border-b-2 border-b-emerald-800'
                : 'text-stone-600 hover:text-stone-900 border-transparent hover:bg-stone-100'
            }`}
          >
            <ShieldCheck className={`w-4 h-4 ${activeTab === 'privacy' ? 'text-emerald-800' : 'text-stone-400'}`} />
            <span>{t('Privacy & Telemetry Policy')}</span>
          </button>

          <button
            onClick={() => setActiveTab('ecommerce')}
            className={`px-4 py-2.5 rounded-t-xl text-xs font-extrabold flex items-center space-x-2 transition-all cursor-pointer border-t border-x shrink-0 ${
              activeTab === 'ecommerce'
                ? 'bg-white text-amber-950 border-stone-200 shadow-xs border-b-2 border-b-amber-500'
                : 'text-stone-600 hover:text-stone-900 border-transparent hover:bg-stone-100'
            }`}
          >
            <ShoppingBag className={`w-4 h-4 ${activeTab === 'ecommerce' ? 'text-amber-600' : 'text-stone-400'}`} />
            <span>{t('Direct Farm E-Commerce Terms')}</span>
          </button>
        </div>

        {/* Scrollable Document Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-stone-700 leading-relaxed font-sans">
          
          {activeTab === 'terms' && (
            <>
              {/* Section 1 */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-stone-950 font-black text-sm">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold flex items-center justify-center">1</span>
                  <h3>{t('Acceptance of Platform Terms')}</h3>
                </div>
                <p className="pl-8 text-stone-600 font-medium">
                  {t('terms_p1')}
                </p>
              </div>

              {/* Section 2 */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-stone-950 font-black text-sm">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold flex items-center justify-center">2</span>
                  <h3>{t('IoT Hardware & Sensor Telemetry Usage')}</h3>
                </div>
                <div className="pl-8 space-y-2 text-stone-600 font-medium">
                  <p>
                    {t('terms_p2')}
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-stone-600">
                    <li>{t('terms_p2_b1')}</li>
                    <li>{t('terms_p2_b2')}</li>
                    <li>{t('terms_p2_b3')}</li>
                  </ul>
                </div>
              </div>

              {/* Section 3 */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-stone-950 font-black text-sm">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-900 text-xs font-mono font-bold flex items-center justify-center">3</span>
                  <h3>{t('AI Crop Recommendation & Vision Diagnostic Disclaimer')}</h3>
                </div>
                <div className="pl-8 p-3.5 bg-amber-50/80 border border-amber-200/80 rounded-2xl space-y-1.5">
                  <div className="flex items-center space-x-1.5 text-amber-950 font-extrabold text-xs">
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{t('terms_p3_sub')}</span>
                  </div>
                  <p className="text-[11px] text-stone-700 font-semibold">
                    {t('terms_p3')}
                  </p>
                </div>
              </div>

              {/* Section 4 */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-stone-950 font-black text-sm">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold flex items-center justify-center">4</span>
                  <h3>{t('Account Credentials & Security')}</h3>
                </div>
                <p className="pl-8 text-stone-600 font-medium">
                  {t('terms_p4')}
                </p>
              </div>

              {/* Section 5 */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-stone-950 font-black text-sm">
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-mono font-bold flex items-center justify-center">5</span>
                  <h3>{t('Limitation of Liability')}</h3>
                </div>
                <p className="pl-8 text-stone-600 font-medium">
                  {t('terms_p5')}
                </p>
              </div>
            </>
          )}

          {activeTab === 'privacy' && (
            <>
              {/* Privacy Policy */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-stone-950 font-black text-sm">
                  <Database className="w-4 h-4 text-emerald-800" />
                  <h3>{t('Farm Data & Telemetry Ownership')}</h3>
                </div>
                <p className="pl-6 text-stone-600 font-medium">
                  {t('privacy_p1')}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-stone-950 font-black text-sm">
                  <Lock className="w-4 h-4 text-emerald-800" />
                  <h3>{t('Data Protection & Encryption')}</h3>
                </div>
                <p className="pl-6 text-stone-600 font-medium">
                  {t('privacy_p2')}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-stone-950 font-black text-sm">
                  <Sparkles className="w-4 h-4 text-emerald-800" />
                  <h3>{t('Anonymized Model Training')}</h3>
                </div>
                <p className="pl-6 text-stone-600 font-medium">
                  {t('privacy_p3')}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-stone-950 font-black text-sm">
                  <Cpu className="w-4 h-4 text-emerald-800" />
                  <h3>{t('Third-Party API Integrations')}</h3>
                </div>
                <p className="pl-6 text-stone-600 font-medium">
                  {t('privacy_p4')}
                </p>
              </div>
            </>
          )}

          {activeTab === 'ecommerce' && (
            <>
              {/* Direct Farm E-Commerce Marketplace Terms */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-stone-950 font-black text-sm">
                  <ShoppingBag className="w-4 h-4 text-amber-600" />
                  <h3>{t('Direct Farm-to-Consumer (F2C) Model')}</h3>
                </div>
                <p className="pl-6 text-stone-600 font-medium">
                  {t('ecom_p1')}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-stone-950 font-black text-sm">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <h3>{t('Produce Quality & Natural Variation')}</h3>
                </div>
                <p className="pl-6 text-stone-600 font-medium">
                  {t('ecom_p2')}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-stone-950 font-black text-sm">
                  <Scale className="w-4 h-4 text-amber-600" />
                  <h3>{t('Pricing, Invoicing & Escrow Security')}</h3>
                </div>
                <p className="pl-6 text-stone-600 font-medium">
                  {t('ecom_p3')}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-stone-950 font-black text-sm">
                  <RotateCcw className="w-4 h-4 text-amber-600" />
                  <h3>{t('Cancellation, Damaged Produce & Instant Refund Policy')}</h3>
                </div>
                <div className="pl-6 p-3 bg-amber-50 border border-amber-200 rounded-xl space-y-1 text-stone-700 font-medium">
                  <p>{t('ecom_p4_1')}</p>
                  <p>{t('ecom_p4_2')}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-stone-950 font-black text-sm">
                  <Truck className="w-4 h-4 text-amber-600" />
                  <h3>{t('Hyperlocal Delivery & Logistics')}</h3>
                </div>
                <p className="pl-6 text-stone-600 font-medium">
                  {t('ecom_p5')}
                </p>
              </div>
            </>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-stone-100/90 border-t border-stone-200 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-2 text-stone-500 text-[11px] font-semibold">
            <Info className="w-4 h-4 text-stone-400" />
            <span>{t('By clicking agree, you accept all terms listed above.')}</span>
          </div>

          <div className="flex items-center space-x-2">
            {isAgreementMode && onAccept ? (
              <>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 font-extrabold text-xs rounded-full transition-all cursor-pointer"
                >
                  {t('Decline')}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    onAccept();
                    onClose();
                  }}
                  className="px-5 py-2 bg-[#FACC15] hover:bg-[#F59E0B] text-stone-950 font-black text-xs rounded-full shadow-md transition-all cursor-pointer flex items-center space-x-1.5"
                >
                  <CheckCircle2 className="w-4 h-4 text-stone-950" />
                  <span>{t('I Have Read & Accept Terms')}</span>
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 bg-emerald-800 hover:bg-emerald-900 text-lime-300 font-extrabold text-xs rounded-full shadow-md transition-all cursor-pointer border border-lime-400/30"
              >
                {t('Close Document')}
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
