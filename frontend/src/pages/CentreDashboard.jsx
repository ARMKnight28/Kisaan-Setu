import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, CheckCircle2, XCircle, Clock, UserCheck, Scale, Search, LogOut, Globe, AlertTriangle, FileCheck, ArrowRight } from 'lucide-react';

export default function CentreDashboard() {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Active Operator Centre Info
  const centreName = "Nashik Main APMC Yard (Panchavati Market)";
  const centreId = "APMC-NSK-01";

  // State for Queue Items
  const [passes, setPasses] = useState([]);
  const [selectedPass, setSelectedPass] = useState(null);

  // Verification Form State
  const [verifyName, setVerifyName] = useState(true);
  const [verifyCrop, setVerifyCrop] = useState(true);
  const [recordedWeight, setRecordedWeight] = useState('');
  const [operatorNotes, setOperatorNotes] = useState('');

  // Load appointment passes from localStorage or initialize defaults
  useEffect(() => {
    const savedPasses = JSON.parse(localStorage.getItem('farmer_passes')) || [];
    if (savedPasses.length > 0) {
      setPasses(savedPasses);
    } else {
      const defaultPasses = [
        {
          id: 'KS-8972-2026',
          farmerName: 'Ramesh Kumar Singh',
          crop: 'Wheat (Kanak)',
          quantity: '45 Quintals',
          slot: '13 Oct | 11:00 AM - 01:00 PM',
          status: 'IN QUEUE',
          mobile: '9876543210'
        },
        {
          id: 'GP-2026-4102',
          farmerName: 'Suresh Patil',
          crop: 'Paddy (Common)',
          quantity: '60 Quintals',
          slot: '13 Oct | 09:00 AM - 11:00 AM',
          status: 'IN QUEUE',
          mobile: '9812345678'
        },
        {
          id: 'GP-2026-9041',
          farmerName: 'Anil Deshmukh',
          crop: 'Soyabean',
          quantity: '30 Quintals',
          slot: '13 Oct | 11:00 AM - 01:00 PM',
          status: 'COMPLETED',
          recordedWeight: '30.2 Quintals',
          mobile: '9898989898'
        }
      ];
      setPasses(defaultPasses);
      localStorage.setItem('farmer_passes', JSON.stringify(defaultPasses));
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  // Open verification panel for specific farmer
  const handleOpenOperate = (pass) => {
    setSelectedPass(pass);
    setVerifyName(true);
    setVerifyCrop(true);
    setRecordedWeight(pass.quantity ? pass.quantity.replace(' Quintals', '') : '');
    setOperatorNotes('');
  };

  // Complete Procurement Action
  const handleCompleteProcurement = (e) => {
    e.preventDefault();
    if (!selectedPass) return;

    if (!verifyName) {
      alert("Farmer Identity Mismatch flagged! Please request patwari document re-check.");
      return;
    }

    if (!verifyCrop) {
      alert("Crop Quality Inspection failed (>14% moisture or quality issue). Entry flagged.");
    }

    const updatedPasses = passes.map((p) => {
      if (p.id === selectedPass.id) {
        return {
          ...p,
          status: verifyCrop ? 'COMPLETED' : 'FLAGGED',
          recordedWeight: `${recordedWeight} Quintals`,
          operatorNotes: operatorNotes || 'Passed weighbridge inspection'
        };
      }
      return p;
    });

    setPasses(updatedPasses);
    localStorage.setItem('farmer_passes', JSON.stringify(updatedPasses));
    alert(`Pass ${selectedPass.id} marked as ${verifyCrop ? 'COMPLETED' : 'FLAGGED'}!`);
    setSelectedPass(null);
  };

  // Mark Farmer as No-Show
  const handleMarkNoShow = (passId) => {
    if (!window.confirm(`Mark Pass ${passId} as NO-SHOW?`)) return;

    const updatedPasses = passes.map((p) => {
      if (p.id === passId) {
        return { ...p, status: 'NO-SHOW' };
      }
      return p;
    });

    setPasses(updatedPasses);
    localStorage.setItem('farmer_passes', JSON.stringify(updatedPasses));
    if (selectedPass && selectedPass.id === passId) setSelectedPass(null);
  };

  // Filtered Queue
  const filteredPasses = passes.filter(
    (p) =>
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.crop.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Today's Stats Counters
  const totalCount = passes.length;
  const inQueueCount = passes.filter((p) => p.status === 'IN QUEUE' || p.status === 'APPROVED').length;
  const completedCount = passes.filter((p) => p.status === 'COMPLETED').length;
  const noShowCount = passes.filter((p) => p.status === 'NO-SHOW' || p.status === 'FLAGGED').length;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-700 flex flex-col justify-between">
      
      {/* Top Operator Header */}
      <header className="bg-emerald-800 text-white px-8 py-4 flex justify-between items-center border-b border-emerald-700 shadow-xs">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-9 h-9 rounded-md bg-emerald-600 text-white font-black flex items-center justify-center text-sm shadow-inner">
            KS
          </div>
          <div>
            <h1 className="font-black text-xl tracking-tight text-white">KisaanSetu • Centre Operator</h1>
            <p className="text-[10px] text-emerald-200 font-bold uppercase tracking-wider">
              {centreName} ({centreId})
            </p>
          </div>
        </div>

        <nav className="flex items-center space-x-6 text-sm font-bold text-emerald-100">
          <span className="bg-emerald-700 text-emerald-100 px-3.5 py-1 rounded-full text-xs font-extrabold border border-emerald-600 flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-emerald-300" />
            Operator Bay 01
          </span>

          <div className="flex items-center space-x-1.5 font-bold text-sm text-slate-800 border-l border-emerald-700 pl-4">
            <Globe className="w-4 h-4 text-emerald-300" />
            <select 
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-emerald-700 text-white border border-emerald-600 rounded-md px-3 py-1 text-xs font-bold focus:outline-none cursor-pointer"
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="mr">Marathi</option>
            </select>
          </div>

          <button 
            onClick={handleLogout}
            className="bg-emerald-900 hover:bg-emerald-950 text-white text-xs px-3.5 py-1.5 rounded-md font-bold flex items-center gap-1 transition cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </nav>
      </header>

      {/* Stats Summary Bar */}
      <div className="bg-white border-b border-slate-200 py-6 px-8 shadow-2xs">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-black text-slate-800 mb-4 tracking-tight">Today's Procurement Overview</h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-xs font-bold text-slate-500 uppercase">Total Booked</p>
              <p className="text-2xl font-black text-slate-800 mt-1">{totalCount}</p>
            </div>

            <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4">
              <p className="text-xs font-extrabold text-amber-800 uppercase">In Queue / Pending</p>
              <p className="text-2xl font-black text-amber-900 mt-1">{inQueueCount}</p>
            </div>

            <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-4">
              <p className="text-xs font-extrabold text-emerald-800 uppercase">Procured / Verified</p>
              <p className="text-2xl font-black text-emerald-900 mt-1">{completedCount}</p>
            </div>

            <div className="bg-rose-50/80 border border-rose-200 rounded-xl p-4">
              <p className="text-xs font-extrabold text-rose-800 uppercase">No-Show / Flagged</p>
              <p className="text-2xl font-black text-rose-900 mt-1">{noShowCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-6xl w-full mx-auto px-8 py-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Column: Appointments Queue Table (2/3 width) */}
          <div className="lg:col-span-2 space-y-4">
            
            <div className="flex items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">
                Active Appointments Queue
              </h3>

              <div className="relative flex-1 max-w-xs">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search Token ID or Name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-slate-300 rounded-lg text-xs font-semibold focus:outline-none focus:border-emerald-700 bg-white"
                />
              </div>
            </div>

            {/* Queue List Table */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700 font-extrabold uppercase">
                    <th className="p-3.5">Token ID</th>
                    <th className="p-3.5">Farmer Name</th>
                    <th className="p-3.5">Crop</th>
                    <th className="p-3.5">Est. Qty</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-semibold text-slate-800">
                  {filteredPasses.length > 0 ? (
                    filteredPasses.map((pass) => (
                      <tr 
                        key={pass.id} 
                        className={`hover:bg-slate-50/80 transition ${selectedPass?.id === pass.id ? 'bg-emerald-50/50' : ''}`}
                      >
                        <td className="p-3.5 font-black text-slate-900">{pass.id}</td>
                        <td className="p-3.5">{pass.farmerName || 'Ramesh Kumar'}</td>
                        <td className="p-3.5">{pass.crop}</td>
                        <td className="p-3.5">{pass.quantity}</td>
                        <td className="p-3.5">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                            pass.status === 'COMPLETED'
                              ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                              : pass.status === 'NO-SHOW' || pass.status === 'FLAGGED'
                              ? 'bg-rose-100 text-rose-900 border border-rose-200'
                              : 'bg-amber-100 text-amber-900 border border-amber-200'
                          }`}>
                            {pass.status || 'IN QUEUE'}
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => handleOpenOperate(pass)}
                            className="bg-emerald-800 hover:bg-emerald-900 text-white px-3 py-1.5 rounded-md font-extrabold text-[11px] transition shadow-2xs cursor-pointer"
                          >
                            Operate
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="p-6 text-center text-slate-400 font-bold">
                        No appointment passes found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>

          {/* Right Column: Operator Action / Verification Modal Drawer */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-5 shadow-2xs">
            {selectedPass ? (
              <form onSubmit={handleCompleteProcurement} className="space-y-5">
                
                <div className="border-b border-slate-200 pb-3 flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-black text-emerald-800 uppercase tracking-wider block">Operator Action Bay</span>
                    <h3 className="text-base font-black text-slate-800 mt-0.5">{selectedPass.id}</h3>
                    <p className="text-xs text-slate-500 font-bold">{selectedPass.farmerName || 'Ramesh Kumar'}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedPass(null)}
                    className="text-slate-400 hover:text-slate-600 font-bold text-xs"
                  >
                    ✕ Close
                  </button>
                </div>

                {/* Identity Verification Toggle */}
                <div className="space-y-2 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                  <label className="block text-xs font-extrabold text-slate-800 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <UserCheck className="w-4 h-4 text-emerald-800" /> Identity / Name Verified
                    </span>
                    <span className={verifyName ? 'text-emerald-800 font-extrabold' : 'text-rose-600 font-extrabold'}>
                      {verifyName ? 'VERIFIED ✓' : 'MISMATCH ✗'}
                    </span>
                  </label>

                  <div className="flex gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setVerifyName(true)}
                      className={`flex-1 py-1.5 rounded text-xs font-bold transition ${
                        verifyName ? 'bg-emerald-800 text-white' : 'bg-white border border-slate-300 text-slate-600'
                      }`}
                    >
                      Verify ✓
                    </button>
                    <button
                      type="button"
                      onClick={() => setVerifyName(false)}
                      className={`flex-1 py-1.5 rounded text-xs font-bold transition ${
                        !verifyName ? 'bg-rose-700 text-white' : 'bg-white border border-slate-300 text-slate-600'
                      }`}
                    >
                      Flag ✗
                    </button>
                  </div>
                </div>

                {/* Crop Quality Inspection Toggle */}
                <div className="space-y-2 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                  <label className="block text-xs font-extrabold text-slate-800 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <FileCheck className="w-4 h-4 text-emerald-800" /> Crop Quality Inspection
                    </span>
                    <span className={verifyCrop ? 'text-emerald-800 font-extrabold' : 'text-rose-600 font-extrabold'}>
                      {verifyCrop ? 'PASSED ✓' : 'REJECTED ✗'}
                    </span>
                  </label>

                  <p className="text-[11px] text-slate-500 font-medium">Declared: {selectedPass.crop}</p>

                  <div className="flex gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setVerifyCrop(true)}
                      className={`flex-1 py-1.5 rounded text-xs font-bold transition ${
                        verifyCrop ? 'bg-emerald-800 text-white' : 'bg-white border border-slate-300 text-slate-600'
                      }`}
                    >
                      Passed (&lt;14% Moisture)
                    </button>
                    <button
                      type="button"
                      onClick={() => setVerifyCrop(false)}
                      className={`flex-1 py-1.5 rounded text-xs font-bold transition ${
                        !verifyCrop ? 'bg-rose-700 text-white' : 'bg-white border border-slate-300 text-slate-600'
                      }`}
                    >
                      Fail / Moisture High
                    </button>
                  </div>
                </div>

                {/* Weighbridge Recorded Quantity */}
                <div>
                  <label className="block text-xs font-extrabold text-slate-800 mb-1 flex items-center gap-1.5">
                    <Scale className="w-4 h-4 text-emerald-800" /> Recorded Weighbridge Weight (Quintals)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    placeholder="e.g. 45.2"
                    value={recordedWeight}
                    onChange={(e) => setRecordedWeight(e.target.value)}
                    className="w-full p-2.5 border border-slate-300 rounded-lg text-xs font-bold focus:outline-none focus:border-emerald-700 bg-white"
                  />
                  <span className="text-[10px] text-slate-400 font-semibold block mt-1">Est. Registered: {selectedPass.quantity}</span>
                </div>

                {/* Submit / Complete Buttons */}
                <div className="space-y-2 pt-2">
                  <button
                    type="submit"
                    className="w-full bg-emerald-800 hover:bg-emerald-900 text-white py-3 rounded-lg font-extrabold text-xs tracking-wider flex items-center justify-center gap-2 shadow-xs cursor-pointer transition"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>SUBMIT & COMPLETE ENTRY</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleMarkNoShow(selectedPass.id)}
                    className="w-full bg-white border border-rose-300 text-rose-700 hover:bg-rose-50 py-2.5 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>MARK AS NO-SHOW</span>
                  </button>
                </div>

              </form>
            ) : (
              <div className="py-12 text-center text-slate-400 space-y-3">
                <Building2 className="w-10 h-10 mx-auto text-slate-300" />
                <p className="text-xs font-extrabold text-slate-600">Select a farmer row from the queue table and click "Operate" to inspect and record weighbridge weight.</p>
              </div>
            )}
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-center py-4 text-xs font-medium border-t border-slate-800">
        KisaanSetu Procurement Centre Infrastructure • Government of India (SIH 2026)
      </footer>

    </div>
  );
}