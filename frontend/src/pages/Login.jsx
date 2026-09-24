import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, UserCheck, Building2, Lock, Phone, ArrowLeft, UserPlus, Globe, Landmark } from 'lucide-react';
import { changeAppLanguage } from '../i18n';

export default function Login() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const initialRole = searchParams.get('role') === 'official' ? 'centre' : 'farmer';
  
  const [role, setRole] = useState(initialRole); // 'farmer', 'centre', or 'admin'
  const [selectedLanguage, setSelectedLanguage] = useState(
    localStorage.getItem('user_language') || 'en'
  );

  const handleLanguageChange = (e) => {
    const lng = e.target.value;
    setSelectedLanguage(lng);
    changeAppLanguage(lng);
  };

  // Form & OTP States
  const [mobile, setMobile] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [centreId, setCentreId] = useState('');
  const [adminId, setAdminId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    if (role === 'farmer' && !otpSent) {
      setOtpSent(true);
      return;
    }

    localStorage.setItem('auth_token', 'demo-token-12345');
    localStorage.setItem('user_role', role);

    if (role === 'farmer') {
      navigate('/farmer/dashboard');
    } else if (role === 'centre') {
      navigate('/centre/dashboard');
    } else {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between font-sans text-slate-800">
      
      {/* Top Header with Dark Green Homepage Aesthetic */}
      <div className="bg-emerald-950 text-white px-6 py-3 flex justify-between items-center shadow-md">
        
        {/* Clickable Top-Left Brand Block (Logo space + Text -> Back to Home) */}
        <div 
          onClick={() => navigate('/')} 
          className="flex items-center space-x-3 cursor-pointer group"
          title="Click to go back to Home"
        >
          <div className="w-8 h-10 shrink-0 border border-dashed border-emerald-700/60 rounded flex items-center justify-center text-[10px] text-emerald-400 group-hover:border-emerald-400 transition">
            Logo
          </div>
          <div>
            <h1 className="font-bold text-sm tracking-tight">{t('common.portalTitle')} {t('nav.login')}</h1>
            <p className="text-[10px] text-emerald-300">{t('common.portalSubtitle')}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Language Dropdown */}
          <div className="flex items-center space-x-1.5 font-bold text-xs text-slate-800">
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <select 
              value={selectedLanguage}
              onChange={handleLanguageChange}
              className="bg-white border border-slate-700 rounded px-2 py-1 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-500 cursor-pointer"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी (Hindi)</option>
              <option value="mr">मराठी (Marathi)</option>
            </select>
          </div>

          {/* Normal Back to Home Button */}
          <button 
            onClick={() => navigate('/')}
            className="text-xs font-semibold text-emerald-200 hover:text-white flex items-center gap-1 border-l border-emerald-800 pl-4 transition"
          >
            <ArrowLeft className="w-4 h-4" /> {t('nav.backToHome')}
          </button>
        </div>
      </div>

      {/* Main Form Card */}
      <div className="max-w-md w-full mx-auto my-8 p-6 bg-white border border-slate-300 rounded-lg shadow-sm space-y-6">
        <div className="text-center space-y-1">
          <div className={`inline-flex p-2 rounded-full mb-2 ${
            role === 'farmer' ? 'bg-emerald-50 text-emerald-800' :
            role === 'centre' ? 'bg-blue-50 text-blue-800' : 'bg-slate-100 text-slate-900'
          }`}>
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-black text-slate-900">
            {role === 'farmer' 
              ? t('login.title') 
              : role === 'centre' 
              ? t('login.centreRole') 
              : t('login.adminRole')}
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            {t('login.subtitle')}
          </p>
        </div>

        {/* 3-Way Role Switcher Tabs: Farmer | Centre | Admin */}
        <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded text-xs font-bold">
          <button
            type="button"
            onClick={() => { setRole('farmer'); setOtpSent(false); }}
            className={`py-2 px-1 rounded flex items-center justify-center space-x-1 transition ${
              role === 'farmer' ? 'bg-emerald-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{t('login.farmerRole')}</span>
          </button>
          
          <button
            type="button"
            onClick={() => { setRole('centre'); setOtpSent(false); }}
            className={`py-2 px-1 rounded flex items-center justify-center space-x-1 transition ${
              role === 'centre' ? 'bg-blue-800 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{t('login.centreRole')}</span>
          </button>

          <button
            type="button"
            onClick={() => { setRole('admin'); setOtpSent(false); }}
            className={`py-2 px-1 rounded flex items-center justify-center space-x-1 transition ${
              role === 'admin' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Landmark className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{t('login.adminRole')}</span>
          </button>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleLogin} className="space-y-4">
          
          {role === 'farmer' ? (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{t('login.enterMobile')}</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    placeholder={t('register.enterMobile')}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:border-emerald-800 font-medium"
                  />
                </div>
              </div>

              {otpSent && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t('login.enterOtp')}</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      maxLength={6}
                      placeholder="123456"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:border-emerald-800 font-medium tracking-widest"
                    />
                  </div>
                  <p className="text-[11px] text-emerald-700 font-bold mt-1">{t('login.sendOtp')} (Demo: Any 6 digits)</p>
                </div>
              )}
            </>
          ) : role === 'centre' ? (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{t('login.centreId')}</label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. APMC-HUB-042"
                    value={centreId}
                    onChange={(e) => setCentreId(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:border-blue-800 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{t('login.password')}</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:border-blue-800 font-medium"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{t('login.adminId')}</label>
                <div className="relative">
                  <Landmark className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. GOV-ADMIN-901"
                    value={adminId}
                    onChange={(e) => setAdminId(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:border-slate-800 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{t('login.password')}</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:border-slate-800 font-medium"
                  />
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            className={`w-full py-2.5 rounded font-bold text-sm text-white transition shadow-sm ${
              role === 'farmer' 
                ? 'bg-emerald-900 hover:bg-emerald-950' 
                : role === 'centre'
                ? 'bg-blue-800 hover:bg-blue-900'
                : 'bg-slate-900 hover:bg-black'
            }`}
          >
            {role === 'farmer' 
              ? (!otpSent ? t('login.sendOtp') : t('login.verifyLogin')) 
              : t('login.loginBtn')}
          </button>
        </form>

        {/* Link to Dedicated Registration Page */}
        {role === 'farmer' && (
          <div className="text-center pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="text-xs font-bold text-emerald-800 hover:underline inline-flex items-center gap-1"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>{t('login.firstTime')}</span>
            </button>
          </div>
        )}
      </div>

      <div className="text-center py-4 text-xs text-slate-500 border-t border-slate-200 font-medium">
        {t('common.encryptedSecured')}
      </div>
    </div>
  );
}