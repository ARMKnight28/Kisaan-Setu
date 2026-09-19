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
  MapPin,
  Sprout,
  ShieldAlert,
  Globe
} from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('home');
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const announcements = [
    { id: 1, tag: 'New', tagColor: 'bg-amber-500', title: 'Slot booking for October is now open', date: '12 Sep 2026' },
    { id: 2, tag: 'Update', tagColor: 'bg-sky-500', title: 'Procurement schedule revised for Kharif season', date: '18 Sep 2026' },
    { id: 3, tag: 'Info', tagColor: 'bg-blue-600', title: 'New procurement centre added in Mahoba', date: '15 Sep 2026' },
    { id: 4, tag: 'Notice', tagColor: 'bg-rose-500', title: 'Scheduled maintenance: 22 Sep, 11 PM – 1 AM', date: '10 Sep 2026' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased">
      
      {/* 1. Top Government Utility Strip */}
      <div className="bg-slate-100 border-b border-slate-200 text-xs text-slate-600 px-8 py-2 flex justify-between items-center">
        <div className="flex items-center space-x-2 font-semibold text-slate-700">
          <Sprout className="w-4 h-4 text-emerald-800" />
          <span>Agriculture & Farmer Welfare Portal</span>
          <span className="text-slate-400">|</span>
          <span>SIH 2026 Innovation Platform</span>
        </div>
        <div className="flex items-center space-x-4 font-medium text-xs">
          <button className="hover:text-slate-900">Skip to main content</button>
          <span className="text-slate-300">|</span>
          <button className="hover:text-slate-900">Skip to navigation</button>
          <span className="text-slate-300">|</span>
          <button className="hover:text-slate-900">Screen Reader</button>
          <span className="text-slate-300">|</span>
          <div className="flex items-center space-x-1.5 font-bold">
            <button className="hover:text-slate-900">A+</button>
            <button className="hover:text-slate-900">A</button>
            <button className="hover:text-slate-900">A-</button>
          </div>
          <span className="text-slate-300">|</span>
          <button className="p-0.5 hover:text-slate-900"><Sun className="w-3.5 h-3.5" /></button>
          <span className="text-slate-300">|</span>
          
          {/* Regional Language Dropdown */}
          <div className="flex items-center space-x-1.5 font-bold text-slate-800">
            <Globe className="w-3.5 h-3.5 text-emerald-900" />
            <select 
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-white border border-slate-300 rounded px-2 py-0.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-800 cursor-pointer"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी (Hindi)</option>
              <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
              <option value="mr">मराठी (Marathi)</option>
              <option value="te">తెలుగు (Telugu)</option>
              <option value="gu">ગુજરાતી (Gujarati)</option>
              <option value="bn">বাংলা (Bengali)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Disclaimer Notice Banner */}
      <div className="bg-amber-50 border-b border-amber-200 px-8 py-1.5 text-xs font-bold text-amber-900 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
          <span>Demonstration Prototype for Smart India Hackathon (SIH) 2026 — Not an Official Government Portal</span>
        </span>
        <span className="text-amber-700 font-semibold">Team Project Showcase</span>
      </div>

      {/* 2. Main Brand Header */}
      <header className="bg-white px-8 py-4 flex justify-between items-center border-b border-slate-200 shadow-sm">
        <div className="flex items-center space-x-5">
          
          {/* Reserved Empty Space for Logo / Emblem (w-9 h-12) */}
          <div className="w-9 h-12 shrink-0"></div>

          <div className="border-l border-slate-300 pl-5 py-1">
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl font-black text-emerald-950 tracking-tight">Kisaan Setu</h1>
            </div>
            <p className="text-sm text-slate-500 font-bold tracking-wide mt-0.5">Digital Procurement Management Platform</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button 
            onClick={() => navigate('/login')}
            className="border-2 border-emerald-900 text-emerald-900 hover:bg-emerald-50 px-6 py-2.5 rounded-md font-bold text-sm flex items-center space-x-2 transition"
          >
            <LogIn className="w-4 h-4" />
            <span>Login</span>
          </button>
          <button 
            onClick={() => navigate('/login?role=farmer')}
            className="bg-emerald-900 hover:bg-emerald-950 text-white px-6 py-2.5 rounded-md font-bold text-sm flex items-center space-x-2 transition shadow-sm"
          >
            <UserPlus className="w-4 h-4" />
            <span>Sign Up</span>
          </button>
        </div>
      </header>

      {/* 3. Deep Green Navigation Menu */}
      <nav className="bg-emerald-950 text-white text-sm font-bold px-8">
        <div className="max-w-7xl mx-auto flex space-x-2">
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
              className={`px-6 py-3.5 transition relative ${
                activeNav === item.id 
                  ? 'bg-emerald-900 text-white font-extrabold shadow-inner' 
                  : 'hover:bg-emerald-900/50 text-slate-200'
              }`}
            >
              {item.label}
              {activeNav === item.id && (
                <span className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-400"></span>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* 4. Full-Width Hero Banner with Background Image */}
      <section 
        className="relative bg-cover bg-center border-b border-emerald-200 py-16 sm:py-20 overflow-hidden"
        style={{ backgroundImage: `url('/hero-farmer.jpg')` }}
      >
        {/* Soft gradient overlay to ensure text stays crystal clear & readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/85 via-emerald-900/70 to-emerald-950/40"></div>

        <div className="relative max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
          
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight drop-shadow-md">
              Digital Procurement Services <br />for Farmers
            </h2>
            <p className="text-emerald-50 text-lg font-semibold leading-relaxed max-w-2xl drop-shadow">
              Book your procurement slot, track your queue, know your status and get timely updates — all in one place.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                onClick={() => navigate('/login')}
                className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 px-8 py-4 rounded-md font-black text-base flex items-center space-x-3 shadow-lg transition"
              >
                <Calendar className="w-5 h-5 text-slate-950" />
                <span>Book a Procurement Slot</span>
              </button>
              <button 
                onClick={() => navigate('/login')}
                className="bg-white/90 hover:bg-white text-emerald-950 border-2 border-white px-8 py-4 rounded-md font-black text-base flex items-center space-x-3 transition shadow-md"
              >
                <LineChart className="w-5 h-5 text-emerald-900" />
                <span>Track My Status</span>
              </button>
            </div>
          </div>

          {/* Top-Right Floating Tagline Badge */}
          <div className="lg:col-span-4 flex justify-end">
            <div className="bg-white/95 backdrop-blur-md px-5 py-3.5 rounded-lg shadow-xl border border-white/50 text-right">
              <p className="text-sm font-black text-slate-900">Empowering Farmers</p>
              <p className="text-sm font-black text-slate-900">Strengthening India</p>
              <div className="flex justify-end gap-1 mt-1.5">
                <div className="w-6 h-1.5 bg-amber-500 rounded-full"></div>
                <div className="w-6 h-1.5 bg-emerald-700 rounded-full"></div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Four Key Feature Badges */}
      <section className="bg-white py-10 border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="flex items-start space-x-4 border-r border-slate-200/80 last:border-0 pr-4">
            <div className="p-4 bg-emerald-100 text-emerald-800 rounded-full shrink-0">
              <Calendar className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">Slot Booking</h3>
              <p className="text-sm text-slate-600 mt-1 font-semibold leading-relaxed">Choose a convenient procurement date and time.</p>
            </div>
          </div>

          <div className="flex items-start space-x-4 border-r border-slate-200/80 last:border-0 pr-4">
            <div className="p-4 bg-emerald-100 text-emerald-800 rounded-full shrink-0">
              <Users className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">Real-Time Queue</h3>
              <p className="text-sm text-slate-600 mt-1 font-semibold leading-relaxed">Know your queue position and estimated waiting time.</p>
            </div>
          </div>

          <div className="flex items-start space-x-4 border-r border-slate-200/80 last:border-0 pr-4">
            <div className="p-4 bg-emerald-100 text-emerald-800 rounded-full shrink-0">
              <Bell className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">Smart Notifications</h3>
              <p className="text-sm text-slate-600 mt-1 font-semibold leading-relaxed">Receive updates on your slot, procurement and payment status.</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="p-4 bg-emerald-100 text-emerald-800 rounded-full shrink-0">
              <IndianRupee className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">Payment Tracking</h3>
              <p className="text-sm text-slate-600 mt-1 font-semibold leading-relaxed">Track your procurement and payment status easily.</p>
            </div>
          </div>

        </div>
      </section>

      {/* 6. How Kisaan Setu Works + Announcements */}
      <section className="py-12 max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        <div className="lg:col-span-8 bg-emerald-50/60 p-8 rounded-xl border border-emerald-200 shadow-sm">
          <h3 className="text-2xl font-black text-slate-900 mb-8">How Kisaan Setu Works</h3>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center">
            
            <div className="flex flex-col items-center space-y-3 flex-1">
              <div className="relative">
                <span className="absolute -top-1 -left-2 bg-emerald-900 text-white font-extrabold text-xs w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">1</span>
                <div className="p-4 bg-white text-emerald-900 rounded-full border border-emerald-200 shadow"><UserCheck className="w-8 h-8" /></div>
              </div>
              <h4 className="font-extrabold text-base text-slate-900">Register</h4>
              <p className="text-xs text-slate-600 font-bold">Create your profile on Kisaan Setu</p>
            </div>

            <ChevronRight className="w-6 h-6 text-slate-400 hidden md:block" />

            <div className="flex flex-col items-center space-y-3 flex-1">
              <div className="relative">
                <span className="absolute -top-1 -left-2 bg-emerald-900 text-white font-extrabold text-xs w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">2</span>
                <div className="p-4 bg-white text-emerald-900 rounded-full border border-emerald-200 shadow"><CalendarCheck className="w-8 h-8" /></div>
              </div>
              <h4 className="font-extrabold text-base text-slate-900">Book Slot</h4>
              <p className="text-xs text-slate-600 font-bold">Select a date and time for procurement</p>
            </div>

            <ChevronRight className="w-6 h-6 text-slate-400 hidden md:block" />

            <div className="flex flex-col items-center space-y-3 flex-1">
              <div className="relative">
                <span className="absolute -top-1 -left-2 bg-emerald-900 text-white font-extrabold text-xs w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">3</span>
                <div className="p-4 bg-white text-emerald-900 rounded-full border border-emerald-200 shadow"><LineChart className="w-8 h-8" /></div>
              </div>
              <h4 className="font-extrabold text-base text-slate-900">Track Queue</h4>
              <p className="text-xs text-slate-600 font-bold">View your position and estimated wait time</p>
            </div>

            <ChevronRight className="w-6 h-6 text-slate-400 hidden md:block" />

            <div className="flex flex-col items-center space-y-3 flex-1">
              <div className="relative">
                <span className="absolute -top-1 -left-2 bg-emerald-900 text-white font-extrabold text-xs w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">4</span>
                <div className="p-4 bg-white text-emerald-900 rounded-full border border-emerald-200 shadow"><Truck className="w-8 h-8" /></div>
              </div>
              <h4 className="font-extrabold text-base text-slate-900">Procurement</h4>
              <p className="text-xs text-slate-600 font-bold">Get your produce procured at the centre</p>
            </div>

            <ChevronRight className="w-6 h-6 text-slate-400 hidden md:block" />

            <div className="flex flex-col items-center space-y-3 flex-1">
              <div className="relative">
                <span className="absolute -top-1 -left-2 bg-emerald-900 text-white font-extrabold text-xs w-6 h-6 rounded-full flex items-center justify-center border-2 border-white">5</span>
                <div className="p-4 bg-white text-emerald-900 rounded-full border border-emerald-200 shadow"><IndianRupee className="w-8 h-8" /></div>
              </div>
              <h4 className="font-extrabold text-base text-slate-900">Get Paid</h4>
              <p className="text-xs text-slate-600 font-bold">Track your payment status</p>
            </div>

          </div>
        </div>

        <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center border-b border-slate-200 pb-3 mb-4">
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-emerald-800" />
                <h4 className="font-extrabold text-base text-slate-900">Announcements & Updates</h4>
              </div>
              <a href="#all" className="text-xs font-bold text-emerald-700 hover:underline">View All</a>
            </div>

            <div className="space-y-4">
              {announcements.map((item) => (
                <div key={item.id} className="flex items-start justify-between text-xs border-b border-slate-100 pb-3 last:border-0">
                  <div className="space-y-1.5 pr-2">
                    <span className={`text-[10px] text-white font-black px-2 py-0.5 rounded ${item.tagColor}`}>
                      {item.tag}
                    </span>
                    <p className="font-bold text-slate-800 text-sm leading-snug">{item.title}</p>
                    <p className="text-xs text-slate-400 font-semibold">{item.date}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 mt-2" />
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* 7. Procurement Metrics & Quick Links Bar */}
      <section className="bg-slate-100 py-10 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 space-y-4">
            <p className="text-base font-extrabold text-slate-800 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-800" />
              <span>Procurement Centres</span>
              <span className="text-slate-500 font-semibold text-xs">(Demo Data)</span>
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex items-center space-x-4">
                <Building className="w-8 h-8 text-emerald-800 shrink-0" />
                <div>
                  <p className="text-xl font-black text-slate-900">24</p>
                  <p className="text-xs text-slate-600 font-bold">Centres Active</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex items-center space-x-4">
                <Users className="w-8 h-8 text-emerald-800 shrink-0" />
                <div>
                  <p className="text-xl font-black text-slate-900">1,248</p>
                  <p className="text-xs text-slate-600 font-bold">Farmers Registered</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex items-center space-x-4">
                <Calendar className="w-8 h-8 text-emerald-800 shrink-0" />
                <div>
                  <p className="text-xl font-black text-slate-900">326</p>
                  <p className="text-xs text-slate-600 font-bold">Slots Booked Today</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm flex items-center space-x-4">
                <CheckCircle2 className="w-8 h-8 text-emerald-800 shrink-0" />
                <div>
                  <p className="text-xl font-black text-slate-900">182</p>
                  <p className="text-xs text-slate-600 font-bold">Procurements Completed</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-white p-6 rounded-lg border border-slate-200 shadow-sm space-y-4">
            <p className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-800" />
              <span>Quick Links</span>
            </p>
            <ul className="text-sm text-slate-700 font-bold space-y-3">
              <li className="flex justify-between items-center hover:text-emerald-800 cursor-pointer">
                <span>Schemes & Guidelines</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </li>
              <li className="flex justify-between items-center hover:text-emerald-800 cursor-pointer border-t border-slate-100 pt-2.5">
                <span>FAQs</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </li>
              <li className="flex justify-between items-center hover:text-emerald-800 cursor-pointer border-t border-slate-100 pt-2.5">
                <span>Downloads</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </li>
              <li className="flex justify-between items-center hover:text-emerald-800 cursor-pointer border-t border-slate-100 pt-2.5">
                <span>Contact Us</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* 8. Official Dark Green Footer */}
      <footer className="bg-emerald-950 text-slate-300 py-8 text-xs border-t border-emerald-900">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          
          <div className="flex items-center space-x-4">
            {/* Reserved Empty Space for Footer Logo (w-7 h-10) */}
            <div className="w-7 h-10 shrink-0"></div>
            <div>
              <p className="font-black text-white text-base">Kisaan Setu</p>
              <p className="text-xs text-emerald-300 font-medium">Digital Procurement Management Platform</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 text-emerald-200 font-semibold text-xs">
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

          {/* Social Brand SVGs */}
          <div className="flex space-x-3.5 text-emerald-200 items-center">
            <a href="#" className="hover:text-white" title="YouTube">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a href="#" className="hover:text-white" title="Facebook">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" className="hover:text-white" title="X (Twitter)">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="#" className="hover:text-white" title="Instagram">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-8 mt-6 pt-4 border-t border-emerald-900/80 text-center text-emerald-400/80 text-xs font-semibold">
          This is a prototype web application developed for SIH (Smart India Hackathon) 2026.
        </div>
      </footer>

    </div>
  );
}