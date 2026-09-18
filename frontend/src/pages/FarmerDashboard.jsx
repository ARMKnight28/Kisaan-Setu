import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, Calendar, Truck, CheckCircle2, LogOut, PlusCircle, AlertCircle } from 'lucide-react';

export default function FarmerDashboard() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [passes, setPasses] = useState([
    {
      id: 'GP-2026-8941',
      crop: 'Paddy (Dhan)',
      quantity: '45 Quintals',
      mandi: 'Central APMC Hub - Gate 2',
      slot: '20 Sep 2026 | 09:00 AM - 11:00 AM',
      status: 'APPROVED',
      vehicle: 'PB-10-CZ-4412'
    }
  ]);

  const [formData, setFormData] = useState({
    crop: 'Paddy (Dhan)',
    quantity: '',
    mandi: 'Central APMC Hub - Gate 2',
    date: '2026-09-20',
    timeSlot: '09:00 AM - 11:00 AM',
    vehicle: ''
  });

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleCreatePass = (e) => {
    e.preventDefault();
    const newPass = {
      id: `GP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      crop: formData.crop,
      quantity: `${formData.quantity} Quintals`,
      mandi: formData.mandi,
      slot: `${formData.date} | ${formData.timeSlot}`,
      status: 'APPROVED',
      vehicle: formData.vehicle || 'Not Specified'
    };
    setPasses([newPass, ...passes]);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800">
      
      {/* Header */}
      <header className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-3">
          <div className="bg-emerald-800 text-white font-bold px-2.5 py-1 rounded text-sm">KS</div>
          <div>
            <h1 className="font-bold text-sm tracking-tight">FARMER LOGISTICS PORTAL</h1>
            <p className="text-[10px] text-slate-400">Welcome, Ramesh Kumar | ID: FRM-98042</p>
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
        
        {/* Action Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-lg border border-slate-300 shadow-sm gap-4">
          <div>
            <h2 className="text-xl font-black text-slate-900">Your Active Gate Passes</h2>
            <p className="text-xs text-slate-500 font-medium">Show the digital QR pass at the APMC checkpoint for fast-track entry.</p>
          </div>
          <button 
            onClick={() => setShowModal(true)}
            className="bg-emerald-900 hover:bg-emerald-950 text-white px-5 py-2.5 rounded font-bold text-sm flex items-center space-x-2 shadow-sm border border-emerald-950"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Book New Gate Pass</span>
          </button>
        </div>

        {/* Gate Passes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {passes.map((pass) => (
            <div key={pass.id} className="bg-white border-2 border-slate-300 rounded-lg p-6 shadow-sm space-y-4">
              <div className="flex justify-between items-start border-b border-slate-200 pb-3">
                <div>
                  <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">Pass ID</span>
                  <h3 className="text-lg font-black text-slate-900">{pass.id}</h3>
                </div>
                <span className="px-2.5 py-1 rounded text-[10px] font-black bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                  {pass.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <p className="text-slate-500 font-semibold">Crop Type</p>
                  <p className="font-bold text-slate-900">{pass.crop}</p>
                </div>
                <div>
                  <p className="text-slate-500 font-semibold">Quantity</p>
                  <p className="font-bold text-slate-900">{pass.quantity}</p>
                </div>
                <div>
                  <p className="text-slate-500 font-semibold">Destination Mandi</p>
                  <p className="font-bold text-slate-900">{pass.mandi}</p>
                </div>
                <div>
                  <p className="text-slate-500 font-semibold">Vehicle No.</p>
                  <p className="font-bold text-slate-900">{pass.vehicle}</p>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 p-3 rounded flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Assigned Slot</p>
                  <p className="text-xs font-bold text-slate-900">{pass.slot}</p>
                </div>
                <div className="bg-white p-2 rounded border border-slate-300 shadow-sm">
                  <QrCode className="w-8 h-8 text-slate-900" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-lg shadow-2xl border border-slate-300 p-6 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <h3 className="text-base font-black text-slate-900 uppercase">Book Priority Gate Pass</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-700 font-bold">✕</button>
            </div>

            <form onSubmit={handleCreatePass} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 mb-1">Crop Type</label>
                <select 
                  value={formData.crop} 
                  onChange={(e) => setFormData({...formData, crop: e.target.value})}
                  className="w-full p-2.5 border border-slate-300 rounded font-medium focus:border-emerald-800"
                >
                  <option>Paddy (Dhan)</option>
                  <option>Wheat (Gehun)</option>
                  <option>Pulses (Dal)</option>
                  <option>Maize (Makka)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 mb-1">Quantity (in Quintals)</label>
                  <input 
                    type="number" 
                    required 
                    placeholder="e.g. 50" 
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                    className="w-full p-2.5 border border-slate-300 rounded font-medium focus:border-emerald-800"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 mb-1">Vehicle Number</label>
                  <input 
                    type="text" 
                    placeholder="e.g. PB-10-CZ-4412" 
                    value={formData.vehicle}
                    onChange={(e) => setFormData({...formData, vehicle: e.target.value})}
                    className="w-full p-2.5 border border-slate-300 rounded font-medium focus:border-emerald-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 mb-1">Select Procurement Centre</label>
                <select 
                  value={formData.mandi} 
                  onChange={(e) => setFormData({...formData, mandi: e.target.value})}
                  className="w-full p-2.5 border border-slate-300 rounded font-medium focus:border-emerald-800"
                >
                  <option>Central APMC Hub - Gate 2</option>
                  <option>District Grain Procurement Yard A</option>
                  <option>Regional Farmers Co-op Hub</option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button 
                  type="button" 
                  onClick={() => setShowModal(false)} 
                  className="px-4 py-2 border border-slate-300 rounded text-slate-700 font-bold hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 bg-emerald-900 text-white rounded font-bold hover:bg-emerald-950 shadow-sm"
                >
                  Generate Pass
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}