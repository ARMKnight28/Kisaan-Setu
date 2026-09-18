import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ShieldCheck, UserCheck, Building2, Lock, Phone, ArrowLeft, UserPlus } from 'lucide-react';

export default function Login() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const initialRole = searchParams.get('role') === 'official' ? 'official' : 'farmer';
  
  const [role, setRole] = useState(initialRole);
  const [isRegistering, setIsRegistering] = useState(false); // Toggle between Login & Registration

  // Form States
  const [mobile, setMobile] = useState('');
  const [fullName, setFullName] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [district, setDistrict] = useState('');
  const [officerId, setOfficerId] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginOrRegister = (e) => {
    e.preventDefault();
    localStorage.setItem('auth_token', 'demo-token-12345');
    localStorage.setItem('user_role', role);

    if (role === 'farmer') {
      // Save farmer profile locally for demo
      if (isRegistering) {
        localStorage.setItem('farmer_name', fullName);
        localStorage.setItem('farmer_district', district);
      }
      navigate('/farmer/dashboard');
    } else {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between font-sans text-slate-800">
      
      {/* Top Header */}
      <div className="bg-slate-900 text-white px-6 py-3 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-3">
          <div className="bg-emerald-800 text-white font-bold p-2 rounded text-sm">KS</div>
          <div>
            <h1 className="font-bold text-sm tracking-tight">KISAAN SETU AUTHENTICATION</h1>
            <p className="text-[10px] text-slate-400">SIH Prototype | Agricultural Logistics Portal</p>
          </div>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </button>
      </div>

      {/* Main Form Card */}
      <div className="max-w-md w-full mx-auto my-8 p-6 bg-white border border-slate-300 rounded-lg shadow-sm space-y-6">
        <div className="text-center space-y-1">
          <div className="inline-flex p-2 bg-emerald-50 text-emerald-800 rounded-full mb-2">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-black text-slate-900">
            {role === 'farmer' ? (isRegistering ? 'New Farmer Registration' : 'Farmer Access / किसान लॉगिन') : 'Mandi Officer Access'}
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            {isRegistering ? 'Enter your details to create a new profile' : 'Enter registered details to access the portal'}
          </p>
        </div>

        {/* Role Switcher Tabs */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded text-xs font-bold">
          <button
            type="button"
            onClick={() => { setRole('farmer'); setIsRegistering(false); }}
            className={`py-2.5 rounded flex items-center justify-center space-x-2 transition ${
              role === 'farmer' ? 'bg-emerald-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Farmer (किसान)</span>
          </button>
          
          <button
            type="button"
            onClick={() => { setRole('official'); setIsRegistering(false); }}
            className={`py-2.5 rounded flex items-center justify-center space-x-2 transition ${
              role === 'official' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Mandi Official</span>
          </button>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleLoginOrRegister} className="space-y-4">
          
          {role === 'farmer' ? (
            <>
              {/* Registration Extra Fields */}
              {isRegistering && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name / पूरा नाम
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:border-emerald-800 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Aadhaar / Farmer Identification No.
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Enter 12-digit ID or Aadhaar number"
                      value={idNumber}
                      onChange={(e) => setIdNumber(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:border-emerald-800 font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      District / जिला
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ludhiana, Punjab"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:border-emerald-800 font-medium"
                    />
                  </div>
                </>
              )}

              {/* Mobile Number Field (Common for both) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mobile Number / मोबाइल नंबर
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    placeholder="Enter 10-digit mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:border-emerald-800 font-medium"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Official Credentials */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Officer ID / APMC Identifier
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. APMC-HUB-042"
                    value={officerId}
                    onChange={(e) => setOfficerId(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:border-slate-800 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Password
                </label>
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
              role === 'farmer' ? 'bg-emerald-900 hover:bg-emerald-950' : 'bg-slate-900 hover:bg-black'
            }`}
          >
            {role === 'farmer' 
              ? (isRegistering ? 'Register & Generate Profile' : 'Send OTP / Log In') 
              : 'Authorize Official Access'}
          </button>
        </form>

        {/* Toggle between Sign In / Registration for Farmers */}
        {role === 'farmer' && (
          <div className="text-center pt-2 border-t border-slate-200">
            <button
              type="button"
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-xs font-bold text-emerald-800 hover:underline inline-flex items-center gap-1"
            >
              {isRegistering ? (
                <span>Already registered? Sign In with Mobile OTP</span>
              ) : (
                <>
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>First time user? Register New Farmer Profile</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-center py-4 text-xs text-slate-500 border-t border-slate-200 font-medium">
        Encrypted & Secured by National Agricultural Informatics Protocol
      </div>
    </div>
  );
}