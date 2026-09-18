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
  Lock,
  FileText,
  CheckCircle2,
  Users,
  Clock
} from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('all');
  const [showLoginModal, setShowLoginModal] = useState(false);

  const notices = [
    { id: 1, category: 'procurement', date: '18 Sep 2026', title: 'Paddy Procurement Guidelines 2026-27 released for all APMC Mandi Hubs.', tag: 'New', dept: 'Dept. of Agriculture' },
    { id: 2, category: 'advisory', date: '17 Sep 2026', title: 'Gate Pass registration is mandatory 24 hours prior to slot arrival at Central Mandi.', tag: 'Important', dept: 'APMC Logistics' },
    { id: 3, category: 'updates', date: '15 Sep 2026', title: 'Extended operating hours for Gate Pass verification during peak harvesting season.', tag: 'Update', dept: 'Mandi Board' },
  ];

  const filteredNotices = activeTab === 'all' 
    ? notices 
    : notices.filter(n => n.category === activeTab);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans antialiased">
      
      {/* 1. Official Government Top Strip */}
      <div className="bg-slate-900 text-slate-300 text-xs px-6 py-2 flex flex-col sm:flex-row justify-between items-center border-b border-slate-800 gap-2">
        <div className="flex items-center space-x-2">
          <span>🇮🇳</span>
          <span className="font-semibold tracking-wide uppercase text-[11px] text-slate-200">
            Government of India | Agricultural Logistics & Gate Pass Portal
          </span>
        </div>
        <div className="flex items-center space-x-4 text-[11px]">
          <button className="hover:text-white transition font-medium">हिंदी</button>
          <span className="text-slate-600">|</span>
          <button className="hover:text-white transition font-medium text-emerald-400">English</button>
        </div>
      </div>

      {/* 2. Main Navigation Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-emerald-900 text-white font-extrabold px-3 py-2 rounded text-xl tracking-wider shadow-sm border border-emerald-950">
              KS
            </div>
            <div className="border-l border-slate-300 pl-3">
              <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                KISAAN SETU
                <span className="text-[10px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded font-bold border border-emerald-300 tracking-normal uppercase">
                  Official Portal
                </span>
              </h1>
              <p className="text-xs text-slate-500 font-semibold tracking-wide">किसान सेतु | Priority Gate Pass & Logistics System</p>
            </div>
          </div>

          <div className="flex items-center space-x-8">
            <nav className="hidden md:flex space-x-8 text-sm font-bold text-slate-700">
              <a href="#home" className="text-emerald-900 hover:text-emerald-700 transition">Home</a>
              <a href="#services" className="hover:text-emerald-900 transition">How It Works</a>
              <a href="#notices" className="hover:text-emerald-900 transition">Circulars & Notices</a>
              <a href="#helpline" className="hover:text-emerald-900 transition">Helpline</a>
            </nav>
            <button 
              onClick={() => setShowLoginModal(true)}
              className="bg-emerald-900 hover:bg-emerald-950 text-white px-5 py-2.5 rounded text-sm font-bold flex items-center space-x-2 transition shadow-sm border border-emerald-950"
            >
              <Lock className="w-4 h-4 text-emerald-300" />
              <span>Sign In / Login</span>
            </button>
          </div>
        </div>
      </header>

      {/* 3. Official Ticker Bar */}
      <div className="bg-amber-100 border-b border-amber-300 px-6 py-2.5 text-xs text-amber-950 flex items-center space-x-3 shadow-inner">
        <span className="bg-amber-700 text-white font-black px-2.5 py-0.5 rounded text-[10px] tracking-wider uppercase flex items-center space-x-1 shrink-0">
          <BellRing className="w-3 h-3 inline" />
          <span>Notice</span>
        </span>
        <marquee className="font-semibold text-slate-900">
          Online Gate Pass registration is mandatory for all procurement centres. Generate your QR pass prior to vehicle arrival to ensure fast-track weighing and entry.
        </marquee>
      </div>

      {/* 4. Hero Section with Structured Banner */}
      <section id="home" className="bg-slate-900 text-white border-b border-slate-800 py-16 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 bg-emerald-950 border border-emerald-700/60 px-3 py-1 rounded text-xs font-bold text-emerald-300 tracking-wide">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>NATIONAL AGRICULTURAL LOGISTICS FRAMEWORK</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
              Automated Gate Pass & Priority Slot Booking for Farmers
            </h2>
            
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-normal">
              Eliminate highway congestion and unorganized waiting times at Mandis. Kisaan Setu enables verified farmers to schedule crop arrivals, receive instant QR gate passes, and access priority weighbridge slots.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                onClick={() => setShowLoginModal(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-7 py-3.5 rounded font-bold text-sm flex items-center space-x-2 shadow-md transition border border-emerald-500"
              >
                <span>Book Gate Pass / Slot</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a 
                href="#notices" 
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-6 py-3.5 rounded font-bold text-sm flex items-center space-x-2 transition"
              >
                <FileText className="w-4 h-4 text-slate-400" />
                <span>View Procurement Circulars</span>
              </a>
            </div>
          </div>

          {/* Quick Portal Gateway Card */}
          <div className="lg:col-span-5 bg-white text-slate-900 border-2 border-slate-300 rounded-lg p-6 shadow-xl">
            <div className="border-b border-slate-200 pb-3 mb-4 flex justify-between items-center">
              <h3 className="font-extrabold text-slate-900 text-base uppercase tracking-wider">Select Portal Access</h3>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Authorized Login
              </span>
            </div>

            <div className="space-y-4">
              <div 
                onClick={() => setShowLoginModal(true)}
                className="p-4 rounded-md border-2 border-slate-200 hover:border-emerald-800 hover:bg-emerald-50/50 cursor-pointer transition flex items-center space-x-4 group bg-slate-50"
              >
                <div className="bg-emerald-900 text-white p-3 rounded shadow-sm">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-black text-slate-900 text-sm group-hover:text-emerald-950">Farmer Portal (किसान सेवा)</h4>
                  <p className="text-xs text-slate-600 font-medium">Book arrival slots, generate QR passes & track queue status</p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-900" />
              </div>

              <div 
                onClick={() => setShowLoginModal(true)}
                className="p-4 rounded-md border-2 border-slate-200 hover:border-slate-900 hover:bg-slate-100 cursor-pointer transition flex items-center space-x-4 group bg-slate-50"
              >
                <div className="bg-slate-900 text-white p-3 rounded shadow-sm">
                  <Building2 className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h4 className="font-black text-slate-900 text-sm group-hover:text-slate-950">Mandi Officer / Admin</h4>
                  <p className="text-xs text-slate-600 font-medium">Verify digital passes, scan QR codes & control gate capacity</p>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-900" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Key Statistics Bar */}
      <section className="bg-emerald-950 text-white border-b border-emerald-900 py-6">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="border-r border-emerald-800/80 last:border-0 pr-4">
            <p className="text-2xl lg:text-3xl font-black text-emerald-400">100%</p>
            <p className="text-xs text-emerald-200 font-semibold tracking-wide uppercase mt-1">Verified Gate Access</p>
          </div>
          <div className="border-r border-emerald-800/80 last:border-0 pr-4">
            <p className="text-2xl lg:text-3xl font-black text-emerald-400">Digital QR</p>
            <p className="text-xs text-emerald-200 font-semibold tracking-wide uppercase mt-1">Instant Pass Generation</p>
          </div>
          <div className="border-r border-emerald-800/80 last:border-0 pr-4">
            <p className="text-2xl lg:text-3xl font-black text-emerald-400">&lt; 15 Mins</p>
            <p className="text-xs text-emerald-200 font-semibold tracking-wide uppercase mt-1">Average Gate Verification</p>
          </div>
          <div>
            <p className="text-2xl lg:text-3xl font-black text-emerald-400">24 / 7</p>
            <p className="text-xs text-emerald-200 font-semibold tracking-wide uppercase mt-1">System Availability</p>
          </div>
        </div>
      </section>

      {/* 6. How It Works Section */}
      <section id="services" className="py-16 max-w-7xl mx-auto px-6">
        <div className="border-b border-slate-300 pb-4 mb-10 flex flex-col md:flex-row md:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">Process Overview</span>
            <h3 className="text-2xl font-black text-slate-900 mt-1">Structured 3-Step Gate Management</h3>
          </div>
          <p className="text-xs font-semibold text-slate-500">Standardized operational workflow for all Mandi hubs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-md border border-slate-300 shadow-sm space-y-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-950 rounded flex items-center justify-center font-black text-xl border border-emerald-300">
              01
            </div>
            <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <CalendarCheck className="w-5 h-5 text-emerald-800" />
              <span>Select Procurement Slot</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Choose your crop type, estimated quantity in quintals, target procurement centre, and preferred arrival window.
            </p>
          </div>

          <div className="bg-white p-6 rounded-md border border-slate-300 shadow-sm space-y-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-950 rounded flex items-center justify-center font-black text-xl border border-emerald-300">
              02
            </div>
            <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <QrCode className="w-5 h-5 text-emerald-800" />
              <span>Receive Digital QR Pass</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              An official QR-coded Gate Pass is issued immediately to your account and dispatched via SMS confirmation.
            </p>
          </div>

          <div className="bg-white p-6 rounded-md border border-slate-300 shadow-sm space-y-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-950 rounded flex items-center justify-center font-black text-xl border border-emerald-300">
              03
            </div>
            <h4 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <Truck className="w-5 h-5 text-emerald-800" />
              <span>Priority Mandi Entry</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              Present the QR pass at the entrance checkpoint for handheld scanning, fast-track weighbridge entry, and unhindered unloading.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Official Circulars & Notice Table */}
      <section id="notices" className="bg-white border-t border-b border-slate-300 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 border-b border-slate-200 pb-4">
            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">Official Updates</span>
              <h3 className="text-2xl font-black text-slate-900 mt-1">Circulars, Notifications & Advisories</h3>
            </div>

            <div className="flex space-x-2 text-xs font-bold">
              <button 
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 rounded border ${activeTab === 'all' ? 'bg-emerald-900 text-white border-emerald-900' : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'}`}
              >
                All Notices
              </button>
              <button 
                onClick={() => setActiveTab('procurement')}
                className={`px-4 py-2 rounded border ${activeTab === 'procurement' ? 'bg-emerald-900 text-white border-emerald-900' : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'}`}
              >
                Procurement
              </button>
              <button 
                onClick={() => setActiveTab('advisory')}
                className={`px-4 py-2 rounded border ${activeTab === 'advisory' ? 'bg-emerald-900 text-white border-emerald-900' : 'bg-slate-100 text-slate-700 border-slate-300 hover:bg-slate-200'}`}
              >
                Advisories
              </button>
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-300 rounded-md">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-800 text-slate-200 uppercase font-bold tracking-wider border-b border-slate-300">
                  <th className="p-3.5">Publish Date</th>
                  <th className="p-3.5">Issuing Department</th>
                  <th className="p-3.5">Subject / Circular Title</th>
                  <th className="p-3.5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {filteredNotices.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition">
                    <td className="p-3.5 font-bold text-slate-700 whitespace-nowrap">{item.date}</td>
                    <td className="p-3.5 text-slate-600 font-semibold whitespace-nowrap">{item.dept}</td>
                    <td className="p-3.5 font-bold text-slate-900">{item.title}</td>
                    <td className="p-3.5 text-right whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
                        {item.tag}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 8. Official Footer */}
      <footer id="helpline" className="bg-slate-950 text-slate-400 py-12 text-xs border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="bg-emerald-800 text-white font-bold px-2 py-1 rounded text-xs">KS</div>
              <h5 className="font-extrabold text-white text-sm tracking-wide">KISAAN SETU PORTAL</h5>
            </div>
            <p className="text-slate-400 leading-relaxed font-normal">
              An integrated digital gateway designed for agricultural logistics management, slot scheduling, and gate pass authentication across Indian procurement hubs.
            </p>
          </div>

          <div className="space-y-2">
            <h5 className="font-extrabold text-white text-sm tracking-wide uppercase">Toll-Free Kisan Support</h5>
            <p className="flex items-center space-x-2 text-white font-black text-base pt-1">
              <PhoneCall className="w-5 h-5 text-emerald-400" />
              <span>1800-180-1551</span>
            </p>
            <p className="text-slate-400 font-medium">National Helpdesk | Available 08:00 AM to 08:00 PM</p>
          </div>

          <div className="space-y-2">
            <h5 className="font-extrabold text-white text-sm tracking-wide uppercase">Government Portals</h5>
            <ul className="space-y-1.5 font-semibold text-slate-300">
              <li><a href="#" className="hover:text-emerald-400 transition">Ministry of Agriculture & Farmers Welfare</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition">National Agriculture Market (eNAM)</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition">PM-Kisan Samman Nidhi</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-10 pt-6 border-t border-slate-900 text-center text-slate-500 text-[11px] font-semibold">
          © 2026 Kisaan Setu Logistics Infrastructure. Designed for Official Mandi Gate Operations.
        </div>
      </footer>

      {/* 9. Role Selection Modal (Popup) */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-lg shadow-2xl border border-slate-300 p-6 space-y-6">
            <div className="flex justify-between items-center border-b border-slate-200 pb-3">
              <h3 className="text-base font-black text-slate-900 uppercase tracking-wide">Select Portal Access</h3>
              <button 
                onClick={() => setShowLoginModal(false)}
                className="text-slate-400 hover:text-slate-700 font-black text-base"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 font-medium">Choose your account type to proceed to authentication:</p>

            <div className="space-y-3">
              <button 
                onClick={() => window.location.href = '/login?role=farmer'}
                className="w-full bg-emerald-900 hover:bg-emerald-950 text-white p-4 rounded font-bold text-sm flex items-center justify-between shadow transition border border-emerald-950"
              >
                <div className="flex items-center space-x-3">
                  <UserCheck className="w-5 h-5 text-emerald-400" />
                  <span>Farmer Portal (किसान लॉगिन)</span>
                </div>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button 
                onClick={() => window.location.href = '/login?role=official'}
                className="w-full bg-slate-900 hover:bg-black text-white p-4 rounded font-bold text-sm flex items-center justify-between shadow transition border border-slate-950"
              >
                <div className="flex items-center space-x-3">
                  <Building2 className="w-5 h-5 text-slate-400" />
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