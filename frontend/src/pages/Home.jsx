import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  Bell, 
  IndianRupee, 
  UserCheck, 
  CalendarCheck, 
  LineChart, 
  Truck, 
  ChevronRight, 
  Building,
  CheckCircle2,
  FileText,
  Sun,
  LogIn,
  UserPlus,
  MapPin
} from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('home');

  const announcements = [
    { id: 1, tag: 'New', tagColor: 'bg-amber-500', title: 'Slot booking for October is now open', date: '12 Sep 2026' },
    { id: 2, tag: 'Update', tagColor: 'bg-sky-500', title: 'Procurement schedule revised for Kharif season', date: '18 Sep 2026' },
    { id: 3, tag: 'Info', tagColor: 'bg-blue-600', title: 'New procurement centre added in Mahoba', date: '15 Sep 2026' },
    { id: 4, tag: 'Notice', tagColor: 'bg-rose-500', title: 'Scheduled maintenance: 22 Sep, 11 PM – 1 AM', date: '10 Sep 2026' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
      
      {/* 1. Top Government Utility Strip */}
      <div className="bg-slate-100 border-b border-slate-200 text-[11px] text-slate-600 px-8 py-1.5 flex justify-between items-center">
        <div className="flex items-center space-x-2 font-semibold text-slate-700">
          <span>🇮🇳</span>
          <span>भारत सरकार</span>
          <span className="text-slate-400">|</span>
          <span>Government of India</span>
        </div>
        <div className="flex items-center space-x-4 font-medium">
          <button className="hover:text-slate-900">Skip to main content</button>
          <span className="text-slate-300">|</span>
          <button className="hover:text-slate-900">Skip to navigation</button>
          <span className="text-slate-300">|</span>
          <button className="hover:text-slate-900">Screen Reader</button>
          <span className="text-slate-300">|</span>
          <div className="flex items-center space-x-1 font-bold">
            <button className="hover:text-slate-900">A+</button>
            <button className="hover:text-slate-900">A</button>
            <button className="hover:text-slate-900">A-</button>
          </div>
          <span className="text-slate-300">|</span>
          <button className="p-0.5 hover:text-slate-900"><Sun className="w-3 h-3" /></button>
          <span className="text-slate-300">|</span>
          <div className="space-x-1 font-bold">
            <button className="hover:text-emerald-800">हिंदी</button>
            <span className="text-slate-400">|</span>
            <button className="text-emerald-900 font-extrabold">English</button>
          </div>
        </div>
      </div>

      {/* 2. Main Brand Header */}
      <header className="bg-white px-8 py-4 flex justify-between items-center border-b border-slate-200 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="flex flex-col items-center">
            <div className="w-8 h-10 border-2 border-slate-800 rounded-t-full flex items-center justify-center font-bold text-[9px] text-slate-800 text-center leading-none">
              🇮🇳
            </div>
          </div>
          <div className="border-l border-slate-300 pl-4">
            <div className="flex items-center space-x-1.5">
              <h1 className="text-2xl font-black text-emerald-950 tracking-tight">Kisaan Setu</h1>
            </div>
            <p className="text-xs text-slate-500 font-semibold tracking-wide">Digital Procurement Management Platform</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button 
            onClick={() => navigate('/login')}
            className="border-2 border-emerald-900 text-emerald-900 hover:bg-emerald-50 px-5 py-2 rounded-md font-bold text-xs flex items-center space-x-1.5 transition"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Login</span>
          </button>
          <button 
            onClick={() => navigate('/login?role=farmer')}
            className="bg-emerald-900 hover:bg-emerald-950 text-white px-5 py-2 rounded-md font-bold text-xs flex items-center space-x-1.5 transition shadow-sm"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Sign Up</span>
          </button>
        </div>
      </header>

      {/* 3. Deep Green Navigation Menu */}
      <nav className="bg-emerald-950 text-white text-xs font-bold px-8">
        <div className="max-w-7xl mx-auto flex space-x-1">
          {[
            { id: 'home', label: 'Home' },
            { id: 'about', label: 'About Us' },
            { id: 'works', label: 'How It Works' },
            { id: 'centres', label: 'Procurement Centres' },
            { id: 'schemes', label: 'Schemes & Guidelines' },
            { id: 'faqs', label: 'FAQs' },
            { id: 'contact', label: 'Contact Us' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveNav(item.id)}
              className={`px-5 py-3 transition relative ${
                activeNav === item.id 
                  ? 'bg-emerald-900 text-white font-extrabold shadow-inner' 
                  : 'hover:bg-emerald-900/50 text-slate-200'
              }`}
            >
              {item.label}
              {activeNav === item.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-400"></span>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* 4. Hero Banner Section */}
      <section className="relative bg-gradient-to-r from-emerald-100 via-emerald-50 to-amber-50 border-b border-emerald-200 py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-6 z-10">
            <h2 className="text-3xl sm:text-4xl font-black text-emerald-950 leading-tight">
              Digital Procurement Services <br />for Farmers
            </h2>
            <p className="text-slate-700 text-sm font-medium leading-relaxed max-w-xl">
              Book your procurement slot, track your queue, know your status and get timely updates — all in one place.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                onClick={() => navigate('/login')}
                className="bg-emerald-900 hover:bg-emerald-950 text-white px-6 py-3 rounded-md font-bold text-xs flex items-center space-x-2 shadow-md transition"
              >
                <Calendar className="w-4 h-4 text-emerald-300" />
                <span>Book a Procurement Slot</span>
              </button>
              <button 
                onClick={() => navigate('/login')}
                className="bg-emerald-100/80 hover:bg-emerald-200 text-emerald-950 border border-emerald-300 px-6 py-3 rounded-md font-bold text-xs flex items-center space-x-2 transition"
              >
                <LineChart className="w-4 h-4 text-emerald-800" />
                <span>Track My Status</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex justify-end">
            <div className="w-full h-64 bg-emerald-800/10 rounded-2xl overflow-hidden border-2 border-emerald-200/60 shadow-lg relative flex items-center justify-center bg-cover bg-center">
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded shadow text-right">
                <p className="text-[11px] font-extrabold text-slate-800">Empowering Farmers</p>
                <p className="text-[11px] font-extrabold text-slate-800">Strengthening India</p>
                <div className="flex justify-end gap-1 mt-1">
                  <div className="w-4 h-1 bg-amber-500 rounded-full"></div>
                  <div className="w-4 h-1 bg-emerald-700 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Four Key Feature Badges */}
      <section className="bg-white py-10 border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          <div className="flex items-start space-x-4 border-r border-slate-200/80 last:border-0 pr-4">
            <div className="p-3 bg-emerald-100 text-emerald-800 rounded-full shrink-0">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">Slot Booking</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">Choose a convenient procurement date and time.</p>
            </div>
          </div>

          <div className="flex items-start space-x-4 border-r border-slate-200/80 last:border-0 pr-4">
            <div className="p-3 bg-emerald-100 text-emerald-800 rounded-full shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">Real-Time Queue</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">Know your queue position and estimated waiting time.</p>
            </div>
          </div>

          <div className="flex items-start space-x-4 border-r border-slate-200/80 last:border-0 pr-4">
            <div className="p-3 bg-emerald-100 text-emerald-800 rounded-full shrink-0">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">Smart Notifications</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">Receive updates on your slot, procurement and payment status.</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="p-3 bg-emerald-100 text-emerald-800 rounded-full shrink-0">
              <IndianRupee className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-sm">Payment Tracking</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">Track your procurement and payment status easily.</p>
            </div>
          </div>

        </div>
      </section>

      {/* 6. How Kisaan Setu Works + Announcements */}
      <section className="py-12 max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-8 bg-emerald-50/50 p-6 rounded-lg border border-emerald-100">
          <h3 className="text-lg font-black text-slate-900 mb-6">How Kisaan Setu Works</h3>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center">
            
            <div className="flex flex-col items-center space-y-2 flex-1">
              <div className="relative">
                <span className="absolute -top-1 -left-2 bg-emerald-900 text-white font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center">1</span>
                <div className="p-3 bg-white text-emerald-900 rounded-full border border-emerald-200 shadow-sm"><UserCheck className="w-6 h-6" /></div>
              </div>
              <h4 className="font-extrabold text-xs text-slate-900">Register</h4>
              <p className="text-[11px] text-slate-500">Create your profile on Kisaan Setu</p>
            </div>

            <ChevronRight className="w-4 h-4 text-slate-400 hidden md:block" />

            <div className="flex flex-col items-center space-y-2 flex-1">
              <div className="relative">
                <span className="absolute -top-1 -left-2 bg-emerald-900 text-white font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center">2</span>
                <div className="p-3 bg-white text-emerald-900 rounded-full border border-emerald-200 shadow-sm"><CalendarCheck className="w-6 h-6" /></div>
              </div>
              <h4 className="font-extrabold text-xs text-slate-900">Book Slot</h4>
              <p className="text-[11px] text-slate-500">Select a date and time for procurement</p>
            </div>

            <ChevronRight className="w-4 h-4 text-slate-400 hidden md:block" />

            <div className="flex flex-col items-center space-y-2 flex-1">
              <div className="relative">
                <span className="absolute -top-1 -left-2 bg-emerald-900 text-white font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center">3</span>
                <div className="p-3 bg-white text-emerald-900 rounded-full border border-emerald-200 shadow-sm"><LineChart className="w-6 h-6" /></div>
              </div>
              <h4 className="font-extrabold text-xs text-slate-900">Track Queue</h4>
              <p className="text-[11px] text-slate-500">View your position and estimated wait time</p>
            </div>

            <ChevronRight className="w-4 h-4 text-slate-400 hidden md:block" />

            <div className="flex flex-col items-center space-y-2 flex-1">
              <div className="relative">
                <span className="absolute -top-1 -left-2 bg-emerald-900 text-white font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center">4</span>
                <div className="p-3 bg-white text-emerald-900 rounded-full border border-emerald-200 shadow-sm"><Truck className="w-6 h-6" /></div>
              </div>
              <h4 className="font-extrabold text-xs text-slate-900">Procurement</h4>
              <p className="text-[11px] text-slate-500">Get your produce procured at the centre</p>
            </div>

            <ChevronRight className="w-4 h-4 text-slate-400 hidden md:block" />

            <div className="flex flex-col items-center space-y-2 flex-1">
              <div className="relative">
                <span className="absolute -top-1 -left-2 bg-emerald-900 text-white font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center">5</span>
                <div className="p-3 bg-white text-emerald-900 rounded-full border border-emerald-200 shadow-sm"><IndianRupee className="w-6 h-6" /></div>
              </div>
              <h4 className="font-extrabold text-xs text-slate-900">Get Paid</h4>
              <p className="text-[11px] text-slate-500">Track your payment status</p>
            </div>

          </div>
        </div>

        <div className="lg:col-span-4 bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center border-b border-slate-200 pb-2 mb-3">
              <div className="flex items-center space-x-2">
                <Bell className="w-4 h-4 text-emerald-800" />
                <h4 className="font-extrabold text-xs text-slate-900">Announcements & Updates</h4>
              </div>
              <a href="#all" className="text-[11px] font-bold text-emerald-700 hover:underline">View All</a>
            </div>

            <div className="space-y-3">
              {announcements.map((item) => (
                <div key={item.id} className="flex items-start justify-between text-xs border-b border-slate-100 pb-2 last:border-0">
                  <div className="space-y-1 pr-2">
                    <span className={`text-[9px] text-white font-black px-1.5 py-0.5 rounded ${item.tagColor}`}>
                      {item.tag}
                    </span>
                    <p className="font-bold text-slate-800 text-[11px] leading-snug">{item.title}</p>
                    <p className="text-[10px] text-slate-400">{item.date}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 mt-2" />
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* 7. Procurement Metrics & Quick Links Bar */}
      <section className="bg-slate-50 py-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 space-y-3">
            <p className="text-xs font-bold text-slate-600 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-800" />
              <span>Procurement Centres</span>
              <span className="text-slate-400 font-normal">(Demo Data)</span>
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-md border border-slate-200 shadow-sm flex items-center space-x-3">
                <Building className="w-6 h-6 text-emerald-800 shrink-0" />
                <div>
                  <p className="text-base font-black text-slate-900">24</p>
                  <p className="text-[10px] text-slate-500 font-medium">Centres Active</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-md border border-slate-200 shadow-sm flex items-center space-x-3">
                <Users className="w-6 h-6 text-emerald-800 shrink-0" />
                <div>
                  <p className="text-base font-black text-slate-900">1,248</p>
                  <p className="text-[10px] text-slate-500 font-medium">Farmers Registered</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-md border border-slate-200 shadow-sm flex items-center space-x-3">
                <Calendar className="w-6 h-6 text-emerald-800 shrink-0" />
                <div>
                  <p className="text-base font-black text-slate-900">326</p>
                  <p className="text-[10px] text-slate-500 font-medium">Slots Booked Today</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-md border border-slate-200 shadow-sm flex items-center space-x-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-800 shrink-0" />
                <div>
                  <p className="text-base font-black text-slate-900">182</p>
                  <p className="text-[10px] text-slate-500 font-medium">Procurements Completed</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white p-4 rounded-md border border-slate-200 shadow-sm space-y-2">
            <p className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-emerald-800" />
              <span>Quick Links</span>
            </p>
            <ul className="text-xs text-slate-700 font-semibold space-y-2">
              <li className="flex justify-between items-center hover:text-emerald-800 cursor-pointer">
                <span>Schemes & Guidelines</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </li>
              <li className="flex justify-between items-center hover:text-emerald-800 cursor-pointer border-t border-slate-100 pt-1.5">
                <span>FAQs</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </li>
              <li className="flex justify-between items-center hover:text-emerald-800 cursor-pointer border-t border-slate-100 pt-1.5">
                <span>Downloads</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </li>
              <li className="flex justify-between items-center hover:text-emerald-800 cursor-pointer border-t border-slate-100 pt-1.5">
                <span>Contact Us</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* 8. Official Dark Green Footer with Custom Brand SVGs */}
      <footer className="bg-emerald-950 text-slate-300 py-8 text-xs border-t border-emerald-900">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-10 border-2 border-slate-300 rounded-t-full flex items-center justify-center font-bold text-[9px] text-white">
              🇮🇳
            </div>
            <div>
              <p className="font-extrabold text-white text-sm">Kisaan Setu</p>
              <p className="text-[11px] text-emerald-300">Digital Procurement Management Platform</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-emerald-200 font-medium text-[11px]">
            <a href="#home" className="hover:text-white">Home</a>
            <span>|</span>
            <a href="#about" className="hover:text-white">About Us</a>
            <span>|</span>
            <a href="#privacy" className="hover:text-white">Privacy Policy</a>
            <span>|</span>
            <a href="#terms" className="hover:text-white">Terms & Conditions</a>
            <span>|</span>
            <a href="#help" className="hover:text-white">Help</a>
            <span>|</span>
            <a href="#contact" className="hover:text-white">Contact Us</a>
          </div>

          {/* Custom SVG Brand Icons (YouTube, Facebook, X/Twitter, Instagram) */}
          <div className="flex space-x-3 text-emerald-200 items-center">
            {/* YouTube */}
            <a href="#" className="hover:text-white" title="YouTube">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            {/* Facebook */}
            <a href="#" className="hover:text-white" title="Facebook">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            {/* X (Twitter) */}
            <a href="#" className="hover:text-white" title="X (Twitter)">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            {/* Instagram */}
            <a href="#" className="hover:text-white" title="Instagram">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-8 mt-6 pt-4 border-t border-emerald-900/80 text-center text-emerald-400/80 text-[11px] font-semibold">
          This is a demo website for SIH (Smart India Hackathon) 2026.
        </div>
      </footer>

    </div>
  );
}