import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, QrCode, CheckCircle2, LogOut, ShieldAlert, Users, Truck } from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [scanStatus, setScanStatus] = useState(null);

  const [recentScans, setRecentScans] = useState([
    { id: 'GP-2026-8941', farmer: 'Ramesh Kumar', crop: 'Paddy', qty: '45 Qtl', time: '09:15 AM', status: 'VERIFIED' },
    { id: 'GP-2026-3102', farmer: 'Sukhdev Singh', crop: 'Wheat', qty: '60 Qtl', time: '08:45 AM', status: 'VERIFIED' }
  ]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleVerify = (e) => {
    e.preventDefault();
    if (!searchQuery) return;
    
    setScanStatus({
      id: searchQuery.toUpperCase(),
      farmer: 'Verified Farmer',
      crop: 'Paddy (Dhan)',
      time: 'Just Now',
      valid: true
    });

    setRecentScans([
      { id: searchQuery.toUpperCase(), farmer: 'Verified Farmer', crop: 'Paddy', qty: '50 Qtl', time: 'Just Now', status: 'VERIFIED' },
      ...recentScans
    ]);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
      
      {/* Header */}
      <header className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-3">
          <div className="bg-slate-700 text-white font-bold px-2.5 py-1 rounded text-sm">APMC</div>
          <div>
            <h1 className="font-bold text-sm tracking-tight">MANDI CONTROL CENTER</h1>
            <p className="text-[10px] text-slate-400">Official ID: APMC-HUB-042 | Gate Operator</p>
          </div>
        </div>
        <button 
          onClick={handleLogout}
          className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs px-3 py-1.5 rounded font-semibold flex items-center space-x-1 border border-slate-700"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Logout</span>
        </button>
      </header>

      {/* Main Body */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        
        {/* Mandi Metrics Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-5 rounded-lg border border-slate-300 shadow-sm flex items-center space-x-4">
            <div className="bg-emerald-100 text-emerald-900 p-3 rounded"><Truck className="w-6 h-6" /></div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase">Vehicles In-Gate Today</p>
              <p className="text-2xl font-black text-slate-900">142 Trucks</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg border border-slate-300 shadow-sm flex items-center space-x-4">
            <div className="bg-amber-100 text-amber-900 p-3 rounded"><Users className="w-6 h-6" /></div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase">Current Gate Capacity</p>
              <p className="text-2xl font-black text-slate-900">78% Occupied</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-lg border border-slate-300 shadow-sm flex items-center space-x-4">
            <div className="bg-slate-100 text-slate-900 p-3 rounded"><Building2 className="w-6 h-6" /></div>
            <div>
              <p className="text-xs font-bold text-slate-500 uppercase">Gate Pass System</p>
              <p className="text-2xl font-black text-emerald-700">ONLINE</p>
            </div>
          </div>
        </div>

        {/* Verification Box */}
        <div className="bg-white border-2 border-slate-300 rounded-lg p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <QrCode className="w-5 h-5 text-slate-800" />
            <span>Gate Pass Verification Scanner</span>
          </h2>

          <form onSubmit={handleVerify} className="flex gap-3">
            <input 
              type="text" 
              placeholder="Enter or scan Gate Pass ID (e.g. GP-2026-8941)" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 p-3 border border-slate-300 rounded text-sm font-semibold focus:outline-none focus:border-slate-800"
            />
            <button 
              type="submit" 
              className="bg-slate-900 hover:bg-black text-white px-6 py-3 rounded font-bold text-sm shadow-sm"
            >
              Verify Pass
            </button>
          </form>

          {scanStatus && (
            <div className="p-4 bg-emerald-50 border border-emerald-300 rounded flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-700" />
                <div>
                  <p className="text-sm font-bold text-emerald-950">Gate Pass Valid & Approved ({scanStatus.id})</p>
                  <p className="text-xs text-emerald-800 font-medium">Clear for weighbridge entry</p>
                </div>
              </div>
              <span className="text-xs font-bold text-slate-500">{scanStatus.time}</span>
            </div>
          )}
        </div>

        {/* Recent Activity Log */}
        <div className="bg-white border border-slate-300 rounded-lg p-6 shadow-sm space-y-4">
          <h3 className="font-extrabold text-slate-900 text-base">Recent Gate Clearances</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-800 text-slate-200 uppercase font-bold border-b border-slate-300">
                  <th className="p-3">Pass ID</th>
                  <th className="p-3">Farmer Name</th>
                  <th className="p-3">Crop</th>
                  <th className="p-3">Quantity</th>
                  <th className="p-3">Entry Time</th>
                  <th className="p-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {recentScans.map((scan, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">{scan.id}</td>
                    <td className="p-3 font-semibold text-slate-700">{scan.farmer}</td>
                    <td className="p-3 text-slate-600">{scan.crop}</td>
                    <td className="p-3 text-slate-600">{scan.qty}</td>
                    <td className="p-3 text-slate-500">{scan.time}</td>
                    <td className="p-3 text-right">
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-900 rounded font-black text-[10px]">
                        {scan.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}