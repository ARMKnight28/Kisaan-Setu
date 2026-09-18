import { useState } from 'react';
import { 
  Building2, 
  UserCheck, 
  CalendarCheck, 
  QrCode, 
  Truck, 
  ShieldCheck, 
  PhoneCall, 
  BellRing,
  ArrowRight,
  ChevronRight,
  Lock
} from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('all');
  const [showLoginModal, setShowLoginModal] = useState(false);

  const notices = [
    { id: 1, category: 'procurement', date: '18 Sep 2026', title: 'Paddy Procurement Guidelines 2026-27 released for all APMC Mandi Hubs.', tag: 'New' },
    { id: 2, category: 'advisory', date: '17 Sep 2026', title: 'Gate Pass registration is mandatory 24 hours prior to slot arrival.', tag: 'Important' },
    { id: 3, category: 'updates', date: '15 Sep 2026', title: 'Extended operating hours for Gate Pass verification at District Central Mandi.', tag: 'Update' },
  ];

  const filteredNotices = activeTab === 'all' 
    ? notices 
    : notices.filter(n => n.category === activeTab);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      
      {/* 1. Official Government Top Strip */}
      <div className="bg-slate-900 text-slate-300 text-xs px-4 py-1.5 flex justify-between items-center border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <span>🇮🇳</span>
          <span className="font-medium">An Initiative for Agricultural Logistics & Gate Management System</span>
        </div>
        <div className="flex items-center space-x-4">
          <button className="hover:text-white font-medium">हिंदी</button>
          <span>|</span>
          <button className="hover:text-white font-medium">English</button>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-800 text-white font-bold p-2.5 rounded-md flex items-center justify-center tracking-wider text-lg">
              KS
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                KISAAN SETU <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-semibold border border-emerald-200">Govt. Portal</span>
              </h1>
              <p className="text-xs text-slate-500 font-medium">किसान सेतु | Priority Gate Pass & Logistics</p>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex space-x-6 text-sm font-semibold text-slate-700">
              <a href="#home" className="hover:text-emerald-800">Home</a>
              <a href="#services" className="hover:text-emerald-800">Services</a>
              <a href="#notices" className="hover:text-emerald-800">Circulars</a>
              <a href="#helpline" className="hover:text-emerald-800">Helpline</a>
            </nav>
            <button 
              onClick={() => setShowLoginModal(true)}
              className="bg-emerald-800 hover:bg-emerald-900 text-white px-5 py-2.5 rounded-md text-sm font-semibold flex items-center space-x-2 transition shadow-sm"
            >
              <Lock className="w-4 h-4" />
              <span>Sign In / Login</span>
            </button>
          </div>
        </div>
      </header>

      {/* 3. Live Announcement Ticker */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-xs text-amber-900 flex items-center space-x-3">
        <span className="bg-amber-600 text-white font-bold px-2 py-0.5 rounded flex items-center space-x-1 shrink-0">
          <BellRing className="w-3 h-3 inline" />
          <span>ALERT</span>
        </span>
        <marquee className="font-medium">
          Wheat & Paddy procurement gates are open. Please generate your digital QR Gate Pass online to avoid traffic delays at APMC Mandi checkpoints.
        </marquee>
      </div>

      {/* 4. Hero Section */}
      <section className="bg-white border-b border-slate-200 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-slate-100 border border-slate-300 px-3 py-1 rounded-full text-xs font-semibold text-slate-700">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>Official Agricultural Logistics Gateway</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
              Direct Mandi Entry & Priority Gate Pass System for Farmers
            </h2>
            
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Kisaan Setu simplifies crop transportation and gate pass management. Book your arrival slot in advance, receive instant QR verification, and bypass highway traffic queues at procurement centres.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                onClick={() => setShowLoginModal(true)}
                className="bg-emerald-800 hover:bg-emerald-900 text-white px-6 py-3 rounded-md font-semibold text-sm flex items-center space-x-2 shadow-sm"
              >
                <span>Book Gate Pass / Slot</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a 
                href="#services" 
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 px-6 py-3 rounded-md font-semibold text-sm flex items-center space-x-2"
              >
                <span>How It Works</span>
              </a>
            </div>
          </div>

          {/* Quick Portal Access Box */}
          <div className="md:col-span-5 bg-slate-50 border border-slate-200 rounded-lg p-6 space-y-4">
            <h3 className="font-bold text-slate-900 border-b border-slate-200 pb-3 flex items-center justify-between">
              <span>Portal Access Portals</span>
              <span className="text-xs font-normal text-slate-500">Select Role</span>
            </h3>

            <div 
              onClick={() => setShowLoginModal(true)}
              className="bg-white p-4 rounded-md border border-slate-200 hover:border-emerald-600 cursor-pointer transition flex items-center space-x-4 group"
            >
              <div className="bg-emerald-100 text-emerald-800 p-3 rounded-md group-hover:bg-emerald-800 group-hover:text-white transition">
                <UserCheck className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 text-sm">Farmer Portal (किसान पोर्टल)</h4>
                <p className="text-xs text-slate-500">Book slot, view gate passes & track entry status</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-800" />
            </div>

            <div 
              onClick={() => setShowLoginModal(true)}
              className="bg-white p-4 rounded-md border border-slate-200 hover:border-slate-800 cursor-pointer transition flex items-center space-x-4 group"
            >
              <div className="bg-slate-100 text-slate-800 p-3 rounded-md group-hover:bg-slate-900 group-hover:text-white transition">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 text-sm">Mandi / Centre Official</h4>
                <p className="text-xs text-slate-500">Scan QR codes, verify passes & manage gate capacity</p>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-900" />
            </div>
          </div>

        </div>
      </section>

      {/* 5. How It Works Section */}
      <section id="services" className="py-12 max-w-7xl mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h3 className="text-2xl font-bold text-slate-900">3-Step Priority Logistics Process</h3>
          <p className="text-slate-600 text-sm mt-2">Designed for fast adoption across all procurement centres and Mandi hubs.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-md flex items-center justify-center font-bold text-lg">1</div>
            <h4 className="font-bold text-slate-900 flex items-center gap-2">
              <CalendarCheck className="w-5 h-5 text-emerald-700" />
              <span>Book Entry Slot</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Select your crop, quantity, preferred procurement centre, and target arrival time slot.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-md flex items-center justify-center font-bold text-lg">2</div>
            <h4 className="font-bold text-slate-900 flex items-center gap-2">
              <QrCode className="w-5 h-5 text-emerald-700" />
              <span>Get Digital Pass</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Receive a downloadable QR-coded Gate Pass on your smartphone and via SMS notification.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-3">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-md flex items-center justify-center font-bold text-lg">3</div>
            <h4 className="font-bold text-slate-900 flex items-center gap-2">
              <Truck className="w-5 h-5 text-emerald-700" />
              <span>Fast-Track Entry</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Scan pass at Mandi checkpoint gate for immediate entry and priority weighing queue.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Official Circulars & Notice Board Section */}
      <section id="notices" className="bg-white border-t border-b border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Official Notices & Circulars (सूचना एवं परिपत्र)</h3>
              <p className="text-xs text-slate-500">Latest procurement advisories updated by agricultural authorities</p>
            </div>

            <div className="flex space-x-2 text-xs font-semibold">
              <button 
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1.5 rounded-md border ${activeTab === 'all' ? 'bg-emerald-800 text-white border-emerald-800' : 'bg-slate-100 text-slate-600 border-slate-200'}`}
              >
                All
              </button>
              <button 
                onClick={() => setActiveTab('procurement')}
                className={`px-3 py-1.5 rounded-md border ${activeTab === 'procurement' ? 'bg-emerald-800 text-white border-emerald-800' : 'bg-slate-100 text-slate-600 border-slate-200'}`}
              >
                Procurement
              </button>
              <button 
                onClick={() => setActiveTab('advisory')}
                className={`px-3 py-1.5 rounded-md border ${activeTab === 'advisory' ? 'bg-emerald-800 text-white border-emerald-800' : 'bg-slate-100 text-slate-600 border-slate-200'}`}
              >
                Advisories
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {filteredNotices.map((item) => (
              <div key={item.id} className="p-4 rounded-md bg-slate-50 border border-slate-200 flex justify-between items-center hover:border-slate-300 transition">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                  <span className="text-xs text-slate-500">{item.date}</span>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-amber-100 text-amber-900 border border-amber-200">
                  {item.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer id="helpline" className="bg-slate-900 text-slate-400 py-8 text-xs border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h5 className="font-bold text-white text-sm mb-2">KISAAN SETU PORTAL</h5>
            <p className="text-slate-400 leading-relaxed">
              Designed for streamlined procurement logistics, gate pass scheduling, and queue optimization at Mandis and procurement hubs across India.
            </p>
          </div>
          <div>
            <h5 className="font-bold text-white text-sm mb-2">Toll-Free Kisan Helpline</h5>
            <p className="flex items-center space-x-2 text-white font-semibold text-sm">
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>1800-180-1551</span>
            </p>
            <p className="mt-1 text-slate-400">Available Monday to Saturday (8 AM – 8 PM)</p>
          </div>
          <div>
            <h5 className="font-bold text-white text-sm mb-2">Government Links</h5>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline">Ministry of Agriculture & Farmers Welfare</a></li>
              <li><a href="#" className="hover:underline">National Agriculture Market (eNAM)</a></li>
              <li><a href="#" className="hover:underline">PM-Kisan Samman Nidhi</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-8 pt-4 border-t border-slate-800 text-center text-slate-500">
          © 2026 Kisaan Setu. All Rights Reserved. National Informatics Infrastructure.
        </div>
      </footer>

      {/* 8. Role Selection Modal (Popup) */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-lg shadow-xl border border-slate-200 p-6 space-y-6">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <h3 className="text-lg font-bold text-slate-900">Select Login Portal</h3>
              <button 
                onClick={() => setShowLoginModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600">Choose your account type to proceed to authentication:</p>

            <div className="space-y-3">
              <button 
                onClick={() => window.location.href = '/login?role=farmer'}
                className="w-full bg-emerald-800 hover:bg-emerald-900 text-white p-3.5 rounded-md font-semibold text-sm flex items-center justify-between shadow-sm"
              >
                <div className="flex items-center space-x-3">
                  <UserCheck className="w-5 h-5" />
                  <span>Farmer Portal Login (किसान)</span>
                </div>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button 
                onClick={() => window.location.href = '/login?role=official'}
                className="w-full bg-slate-800 hover:bg-slate-900 text-white p-3.5 rounded-md font-semibold text-sm flex items-center justify-between shadow-sm"
              >
                <div className="flex items-center space-x-3">
                  <Building2 className="w-5 h-5" />
                  <span>Mandi Officer / Admin Login</span>
                </div>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}