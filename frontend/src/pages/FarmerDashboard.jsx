import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Clock, ShieldCheck, HelpCircle, Bell, LogOut, Globe, ArrowRight, RefreshCw } from 'lucide-react';

export default function FarmerDashboard() {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [searchId, setSearchId] = useState('');

  // Loaded Pass State
  const [activePass, setActivePass] = useState({
    id: 'KS-8972-2026',
    farmerName: 'Ramesh Kumar Singh',
    mandi: 'Karnal Grain Mandi, Yard No. 2',
    crop: 'Wheat (Kanak) - Sharbati Premium',
    quantity: '45 Quintals (4500 Kg)',
    slot: '26 Sep 2026, 10:00 AM - 12:30 PM',
    queuePosition: '#12 in line',
    waitTime: '~ 45 mins',
    arrivalTime: '10:45 AM'
  });

  // Load from LocalStorage if available
  useEffect(() => {
    const savedName = localStorage.getItem('farmer_name') || 'Ramesh Kumar Singh';
    const savedPasses = JSON.parse(localStorage.getItem('farmer_passes')) || [];

    if (savedPasses.length > 0) {
      const latest = savedPasses[0];
      setActivePass({
        id: latest.id || 'KS-8972-2026',
        farmerName: savedName,
        mandi: latest.mandi || 'Nashik Main APMC Yard (Panchavati Market)',
        crop: latest.crop || 'Wheat (Kanak) - Sharbati Premium',
        quantity: latest.quantity || '45 Quintals (4500 Kg)',
        slot: latest.slot || '26 Sep 2026, 10:00 AM - 12:30 PM',
        queuePosition: '#12 in line',
        waitTime: '~ 45 mins',
        arrivalTime: '10:45 AM'
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleSearchBooking = (e) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    const savedPasses = JSON.parse(localStorage.getItem('farmer_passes')) || [];
    const found = savedPasses.find(p => p.id.toLowerCase().includes(searchId.toLowerCase()));

    if (found) {
      setActivePass(prev => ({
        ...prev,
        id: found.id,
        mandi: found.mandi,
        crop: found.crop,
        quantity: found.quantity,
        slot: found.slot
      }));
      alert(`Booking Pass ${found.id} Loaded!`);
    } else {
      alert(`No pass found matching ID: ${searchId}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-700 flex flex-col justify-between">
      
      {/* Top Header Section - Lightened Green Header */}
      <header className="bg-emerald-800 text-white px-8 py-4 flex justify-between items-center border-b border-emerald-700 shadow-xs">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-9 h-9 rounded-md bg-emerald-600 text-white font-black flex items-center justify-center text-sm shadow-inner">
            KS
          </div>
          <div>
            <h1 className="font-black text-xl tracking-tight text-white">KisaanSetu</h1>
            <p className="text-[10px] text-emerald-200 font-bold uppercase tracking-wider">
              GOVERNMENT OF INDIA • NATIONAL PROCUREMENT PORTAL
            </p>
          </div>
        </div>

        <nav className="flex items-center space-x-7 text-sm font-bold text-emerald-100">
          <button onClick={() => navigate('/')} className="hover:text-white transition cursor-pointer">HOME</button>
          <button className="hover:text-white transition cursor-pointer">SCHEMES GUIDELINES</button>
          <button className="text-white border-b-2 border-white pb-0.5 font-black cursor-pointer">TRACK MY STATUS</button>
          <button className="hover:text-white transition cursor-pointer">CONTACT US</button>

          {/* User Badge */}
          <span className="bg-emerald-700 text-emerald-100 px-3.5 py-1 rounded-full text-xs font-extrabold border border-emerald-600 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            ID: RAMESH_902
          </span>

          {/* Language Dropdown */}
          <div className="flex items-center space-x-1.5 font-bold text-sm text-slate-800 border-l border-emerald-700 pl-4">
            <Globe className="w-4 h-4 text-emerald-300" />
            <select 
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-emerald-700 text-white border border-emerald-600 rounded-md px-3 py-1 text-xs font-bold focus:outline-none cursor-pointer"
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="pa">Punjabi</option>
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

      {/* Page Title Header - Increased Title Font Size */}
      <div className="bg-white border-b border-slate-200 py-6 px-8 shadow-2xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-2.5">
              <RefreshCw className="w-7 h-7 text-emerald-800" />
              <span>Track My Status</span>
            </h2>
            <p className="text-sm text-slate-600 font-medium mt-1">
              Real-time digital mandi queue monitoring and crop procurement tracking.
            </p>
          </div>

          <button
            onClick={() => navigate('/farmer/book-slot')}
            className="bg-emerald-800 hover:bg-emerald-900 text-white px-5 py-3 rounded-lg text-xs font-extrabold flex items-center gap-2 shadow-xs cursor-pointer transition"
          >
            <span>BOOK NEW SLOT</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid Content */}
      <main className="max-w-6xl w-full mx-auto px-8 py-8 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* LEFT 2 COLUMNS */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Live Queue Status Card */}
            <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-6 space-y-5 shadow-2xs">
              <div className="flex justify-between items-center border-b border-emerald-200 pb-3">
                <span className="bg-emerald-800 text-white text-xs font-black px-3.5 py-1 rounded-full tracking-wider uppercase">
                  LIVE QUEUE STATUS
                </span>
                <span className="text-xs font-extrabold text-emerald-900 flex items-center gap-1">
                  <Clock className="w-4 h-4 text-emerald-700" /> Live Updates Active
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                <div>
                  <p className="text-xs font-extrabold text-slate-500 uppercase tracking-wide">Your Position</p>
                  <p className="text-4xl font-black text-emerald-900 mt-1">
                    {activePass.queuePosition} <span className="text-sm font-bold text-slate-600">in line</span>
                  </p>
                </div>

                <div>
                  <p className="text-xs font-extrabold text-slate-500 uppercase tracking-wide">Est. Waiting Time</p>
                  <p className="text-4xl font-black text-emerald-900 mt-1">
                    {activePass.waitTime}
                  </p>
                </div>

                <div className="text-right sm:text-right">
                  <p className="text-xs font-bold text-slate-600 mb-1.5">Need to change time?</p>
                  <button 
                    onClick={() => navigate('/farmer/book-slot')}
                    className="w-full sm:w-auto px-4 py-2.5 bg-white border border-emerald-700 text-emerald-900 hover:bg-emerald-100 rounded-lg text-xs font-extrabold uppercase tracking-wider transition cursor-pointer"
                  >
                    Reschedule Slot
                  </button>
                </div>
              </div>

              {/* Next Action Alert Box */}
              <div className="bg-emerald-100/90 border border-emerald-300 rounded-xl p-4 flex items-center gap-3 text-xs font-bold text-emerald-950">
                <Clock className="w-4.5 h-4.5 text-emerald-800 shrink-0" />
                <span>Next Action: Please report to Mandi Entrance Gate with loaded vehicle by {activePass.arrivalTime}.</span>
              </div>
            </div>

            {/* Procurement Stage Timeline (5 Steps) - Increased Heading Font Size */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-4">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2.5">
                Procurement Stage
              </h3>

              <div className="flex justify-between items-center text-center text-xs font-bold pt-2 px-2 relative">
                
                {/* Stage 1: Register (Completed) */}
                <div className="flex-1 flex flex-col items-center relative z-10">
                  <div className="w-9 h-9 rounded-full bg-emerald-800 text-white flex items-center justify-center font-black shadow-xs">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <p className="mt-2 text-slate-800 font-black text-xs">Register</p>
                </div>

                {/* Connecting Line 1-2 */}
                <div className="h-0.5 bg-emerald-800 flex-1 -mt-5"></div>

                {/* Stage 2: Enter Crop Details (Completed) */}
                <div className="flex-1 flex flex-col items-center relative z-10">
                  <div className="w-9 h-9 rounded-full bg-emerald-800 text-white flex items-center justify-center font-black shadow-xs">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <p className="mt-2 text-slate-800 font-black text-xs">Enter Crop Details</p>
                </div>

                {/* Connecting Line 2-3 */}
                <div className="h-0.5 bg-emerald-800 flex-1 -mt-5"></div>

                {/* Stage 3: Book Slot (Completed) */}
                <div className="flex-1 flex flex-col items-center relative z-10">
                  <div className="w-9 h-9 rounded-full bg-emerald-800 text-white flex items-center justify-center font-black shadow-xs">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <p className="mt-2 text-slate-800 font-black text-xs">Book Slot</p>
                </div>

                {/* Connecting Line 3-4 */}
                <div className="h-0.5 bg-emerald-700 flex-1 -mt-5"></div>

                {/* Stage 4: Track Queue (Active) */}
                <div className="flex-1 flex flex-col items-center relative z-10">
                  <div className="w-9 h-9 rounded-full bg-emerald-800 text-white ring-4 ring-emerald-100 flex items-center justify-center font-black text-xs shadow-xs">
                    4
                  </div>
                  <p className="mt-2 text-emerald-900 font-black text-xs">Track Queue</p>
                </div>

                {/* Connecting Line 4-5 */}
                <div className="h-0.5 bg-slate-200 flex-1 -mt-5"></div>

                {/* Stage 5: Procurement (Upcoming) */}
                <div className="flex-1 flex flex-col items-center relative z-10 opacity-60">
                  <div className="w-9 h-9 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-xs">
                    5
                  </div>
                  <p className="mt-2 text-slate-600 font-bold text-xs">Procurement</p>
                </div>

              </div>
            </div>

            {/* Booking & Mandi Information Table - Increased Heading Font Size */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-4">
              <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2.5">
                Booking & Mandi Information
              </h3>

              <div className="divide-y divide-slate-100 text-sm">
                <div className="py-3 flex justify-between items-center">
                  <span className="text-xs text-slate-500 font-bold">Farmer Name</span>
                  <span className="font-extrabold text-slate-800">{activePass.farmerName}</span>
                </div>

                <div className="py-3 flex justify-between items-center">
                  <span className="text-xs text-slate-500 font-bold">Booking ID</span>
                  <span className="font-extrabold text-slate-800 bg-slate-100 px-2.5 py-0.5 rounded text-xs">{activePass.id}</span>
                </div>

                <div className="py-3 flex justify-between items-center">
                  <span className="text-xs text-slate-500 font-bold">Mandi Center</span>
                  <span className="font-extrabold text-slate-800 text-right">{activePass.mandi}</span>
                </div>

                <div className="py-3 flex justify-between items-center">
                  <span className="text-xs text-slate-500 font-bold">Crop Variety</span>
                  <span className="font-extrabold text-slate-800">{activePass.crop}</span>
                </div>

                <div className="py-3 flex justify-between items-center">
                  <span className="text-xs text-slate-500 font-bold">Registered Quantity</span>
                  <span className="font-extrabold text-slate-800">{activePass.quantity}</span>
                </div>

                <div className="py-3 flex justify-between items-center">
                  <span className="text-xs text-slate-500 font-bold">Scheduled Slot</span>
                  <span className="font-extrabold text-emerald-900">{activePass.slot}</span>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN SIDEBAR */}
          <div className="space-y-6">
            
            {/* Search Booking Box - Increased Heading Font Size */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3.5 shadow-2xs">
              <h3 className="font-black text-xs text-slate-800 uppercase tracking-wider">
                Look up another Booking
              </h3>

              <form onSubmit={handleSearchBooking} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter Booking ID (e.g. KS-8972-2026)"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  className="flex-1 p-2.5 border border-slate-300 rounded-lg text-xs font-semibold focus:outline-none focus:border-emerald-700 bg-white"
                />
                <button 
                  type="submit"
                  className="bg-emerald-800 hover:bg-emerald-900 text-white px-4 py-2.5 rounded-lg font-black text-xs transition cursor-pointer"
                >
                  SEARCH
                </button>
              </form>
            </div>

            {/* Arrival Instructions Card - Increased Heading Font Size */}
            <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-6 space-y-4 shadow-2xs">
              <h3 className="font-black text-sm text-emerald-950 flex items-center gap-2 border-b border-emerald-200 pb-3 uppercase tracking-wider">
                <HelpCircle className="w-4.5 h-4.5 text-emerald-800" />
                <span>Arrival Instructions</span>
              </h3>

              <ol className="text-xs text-emerald-950 space-y-3 font-medium leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-800 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">1</span>
                  <span>Clean your grain properly before departure.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-800 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">2</span>
                  <span>Carry Original Aadhaar card & Farmer ID card.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-800 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">3</span>
                  <span>Bring a certified copy of your Land Revenue Record.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-800 text-white font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">4</span>
                  <span>Keep your digital or printed Gate Pass ready for scanner verification.</span>
                </li>
              </ol>
            </div>

            {/* Mandi Live Updates Card - Increased Heading Font Size */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4 shadow-2xs">
              <h3 className="font-black text-xs text-slate-800 uppercase tracking-wider flex items-center justify-between border-b border-slate-100 pb-2.5">
                <span>Mandi Live Updates</span>
                <Bell className="w-4 h-4 text-emerald-800" />
              </h3>

              <div className="space-y-3.5 text-xs">
                <div className="border-b border-slate-100 pb-2.5">
                  <div className="flex justify-between font-extrabold text-slate-800">
                    <span>Karnal Mandi Slot Update</span>
                    <span className="text-[10px] text-slate-400 font-bold">10 min ago</span>
                  </div>
                  <p className="text-slate-500 font-medium mt-1">Queue flow is normal. Current processing speed is 18 vehicles/hour.</p>
                </div>

                <div className="border-b border-slate-100 pb-2.5">
                  <div className="flex justify-between font-extrabold text-slate-800">
                    <span>Quality Inspection Operational</span>
                    <span className="text-[10px] text-slate-400 font-bold">2 hours ago</span>
                  </div>
                  <p className="text-slate-500 font-medium mt-1">Moisture analysis bays 1 through 4 are active with zero queue delay.</p>
                </div>

                <div>
                  <div className="flex justify-between font-extrabold text-slate-800">
                    <span>Weather Alert</span>
                    <span className="text-[10px] text-slate-400 font-bold">5 hours ago</span>
                  </div>
                  <p className="text-slate-500 font-medium mt-1">Partly cloudy skies expected tomorrow. Storage sheds are fully ready.</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-6 px-8 text-xs font-medium border-t border-slate-800">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <p className="font-extrabold text-white">KisaanSetu</p>
            <p className="text-slate-500 text-[11px] mt-0.5">Digital Infrastructure for Agricultural Procurement, Government of India</p>
          </div>

          <div className="flex space-x-6 text-[11px] font-bold text-slate-300">
            <button className="hover:text-white transition cursor-pointer">About Us</button>
            <button className="hover:text-white transition cursor-pointer">Privacy Policy</button>
            <button className="hover:text-white transition cursor-pointer">Terms & Conditions</button>
            <button className="hover:text-white transition cursor-pointer">FAQ & Support</button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto border-t border-slate-800 mt-4 pt-4 flex justify-between text-[10px] text-slate-500">
          <p>Developed for Smart India Hackathon (SIH 2026 Innovation Platform)</p>
          <p>Copyright © 2026. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}