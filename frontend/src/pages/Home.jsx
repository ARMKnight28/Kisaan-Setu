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
  Globe,
  Search
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
          <span>Consumer Affairs, Food & Public Distribution</span>
          <span className="text-slate-400">|</span>
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
            { id: 'notices', label: 'Circulars & Notices' },
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

      {/* 4. Full-Width Hero Banner Section */}
      <section 
        className="relative bg-cover bg-center border-b border-emerald-200 py-16 sm:py-20 overflow-hidden"
        style={{ backgroundImage: `url('/hero-farmer.jpg')` }}
      >
        <div className="relative max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start z-10">
          
          {/* Left Text Block */}
          <div className="lg:col-span-8 space-y-5 relative">
            
            {/* Subtle soft light patch behind text only for readability */}
            <div className="absolute top-0 bottom-0 -left-8 right-20 bg-white/10 blur-md rounded-full -z-10 pointer-events-none"></div>

            <h2 className="text-4xl sm:text-5xl font-black text-emerald-950 leading-tight drop-shadow-sm">
              Digital Procurement Services <br />for Farmers
            </h2>
            <p className="text-slate-800 text-base sm:text-lg font-bold leading-relaxed max-w-2xl drop-shadow-sm">
              Book your procurement slot, track your queue, know your status and get timely updates. All in one place.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              {/* Dark Green Solid Button */}
              <button 
                onClick={() => navigate('/login')}
                className="bg-emerald-900 hover:bg-emerald-950 text-white px-7 py-3 rounded-md font-bold text-sm flex items-center space-x-2.5 shadow-md border border-emerald-950 transition"
              >
                <Calendar className="w-4 h-4 text-emerald-300" />
                <span>Book a Procurement Slot</span>
              </button>

              {/* Light Semi-Translucent Outline Button */}
              <button 
                onClick={() => navigate('/login')}
                className="bg-white/80 hover:bg-white text-slate-900 border-2 border-slate-800 px-7 py-3 rounded-md font-bold text-sm flex items-center space-x-2.5 transition shadow-sm"
              >
                <Search className="w-4 h-4 text-slate-800" />
                <span>Track My Status</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 5. Four Key Feature Badges (First under Hero) */}
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
              <FileText className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">Digital Gate Pass</h3>
              <p className="text-sm text-slate-600 mt-1 font-semibold leading-relaxed">Get instant digital entry passes for quick entry at the centre.</p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="p-4 bg-emerald-100 text-emerald-800 rounded-full shrink-0">
              <Bell className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-lg">Smart Notifications</h3>
              <p className="text-sm text-slate-600 mt-1 font-semibold leading-relaxed">Receive updates on your slot, procurement and payment status.</p>
            </div>
          </div>

        </div>
      </section>

      {/* 6. Balanced Stats Section (Clean, Structured, Moderate Contrast) */}
      <section className="py-10 bg-slate-100/70 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Stat 1 */}
            <div className="bg-white p-6 rounded-xl border-l-4 border-l-emerald-800 border-t border-r border-b border-slate-200 shadow-sm flex items-center space-x-5 hover:shadow-md transition">
              <div className="p-3 bg-emerald-50 text-emerald-800 rounded-lg shrink-0">
                <Globe className="w-7 h-7" />
              </div>
              <div>
                <p className="text-3xl font-black text-slate-900 tracking-tight">36</p>
                <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mt-0.5">States & UTs Covered</p>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="bg-white p-6 rounded-xl border-l-4 border-l-emerald-800 border-t border-r border-b border-slate-200 shadow-sm flex items-center space-x-5 hover:shadow-md transition">
              <div className="p-3 bg-emerald-50 text-emerald-800 rounded-lg shrink-0">
                <Building className="w-7 h-7" />
              </div>
              <div>
                <p className="text-3xl font-black text-slate-900 tracking-tight">7,085</p>
                <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mt-0.5">Procurement Centres</p>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="bg-white p-6 rounded-xl border-l-4 border-l-emerald-800 border-t border-r border-b border-slate-200 shadow-sm flex items-center space-x-5 hover:shadow-md transition">
              <div className="p-3 bg-emerald-50 text-emerald-800 rounded-lg shrink-0">
                <Users className="w-7 h-7" />
              </div>
              <div>
                <p className="text-3xl font-black text-slate-900 tracking-tight">24,50,000</p>
                <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mt-0.5">Registered Farmers</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 7. How Kisaan Setu Works (Equal Height Step Cards) */}
      <section className="py-14 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-8 space-y-8">
          
          {/* Section Heading Text Only */}
          <div>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">How Kisaan Setu Works</h3>
          </div>

          {/* 5 Step Cards with Equal Height & Width */}
          <div className="flex flex-col lg:flex-row items-stretch justify-between gap-3 lg:gap-2">
            
            {/* Step 1 */}
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition flex-1 w-full relative group">
              <div className="flex flex-col justify-between h-full space-y-4">
                <div className="flex justify-between items-center">
                  <span className="bg-emerald-900 text-white font-black text-xs px-2.5 py-1 rounded-md">Step 01</span>
                  <div className="p-2.5 bg-white text-emerald-900 rounded-full border border-emerald-100 group-hover:bg-emerald-100 transition">
                    <UserCheck className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-start">
                  <h4 className="font-extrabold text-base text-slate-900">Register</h4>
                  <p className="text-xs text-slate-600 font-semibold mt-1 leading-relaxed">
                    Create your profile using Aadhaar or Mobile number.
                  </p>
                </div>
              </div>
            </div>

            {/* Arrow 1 -> 2 */}
            <div className="hidden lg:flex items-center justify-center shrink-0">
              <ChevronRight className="w-6 h-6 text-emerald-700" />
            </div>

            {/* Step 2 */}
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition flex-1 w-full relative group">
              <div className="flex flex-col justify-between h-full space-y-4">
                <div className="flex justify-between items-center">
                  <span className="bg-emerald-900 text-white font-black text-xs px-2.5 py-1 rounded-md">Step 02</span>
                  <div className="p-2.5 bg-white text-emerald-900 rounded-full border border-emerald-100 group-hover:bg-emerald-100 transition">
                    <Sprout className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-start">
                  <h4 className="font-extrabold text-base text-slate-900">Enter Crop Details</h4>
                  <p className="text-xs text-slate-600 font-semibold mt-1 leading-relaxed">
                    Specify your crop type and estimated quantity.
                  </p>
                </div>
              </div>
            </div>

            {/* Arrow 2 -> 3 */}
            <div className="hidden lg:flex items-center justify-center shrink-0">
              <ChevronRight className="w-6 h-6 text-emerald-700" />
            </div>

            {/* Step 3 */}
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition flex-1 w-full relative group">
              <div className="flex flex-col justify-between h-full space-y-4">
                <div className="flex justify-between items-center">
                  <span className="bg-emerald-900 text-white font-black text-xs px-2.5 py-1 rounded-md">Step 03</span>
                  <div className="p-2.5 bg-white text-emerald-900 rounded-full border border-emerald-100 group-hover:bg-emerald-100 transition">
                    <CalendarCheck className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-start">
                  <h4 className="font-extrabold text-base text-slate-900">Book Slot</h4>
                  <p className="text-xs text-slate-600 font-semibold mt-1 leading-relaxed">
                    Select your preferred procurement centre, date, and arrival time.
                  </p>
                </div>
              </div>
            </div>

            {/* Arrow 3 -> 4 */}
            <div className="hidden lg:flex items-center justify-center shrink-0">
              <ChevronRight className="w-6 h-6 text-emerald-700" />
            </div>

            {/* Step 4 */}
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition flex-1 w-full relative group">
              <div className="flex flex-col justify-between h-full space-y-4">
                <div className="flex justify-between items-center">
                  <span className="bg-emerald-900 text-white font-black text-xs px-2.5 py-1 rounded-md">Step 04</span>
                  <div className="p-2.5 bg-white text-emerald-900 rounded-full border border-emerald-100 group-hover:bg-emerald-100 transition">
                    <LineChart className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-start">
                  <h4 className="font-extrabold text-base text-slate-900">Track Queue</h4>
                  <p className="text-xs text-slate-600 font-semibold mt-1 leading-relaxed">
                    Track real-time queue and get your digital Gate Pass.
                  </p>
                </div>
              </div>
            </div>

            {/* Arrow 4 -> 5 */}
            <div className="hidden lg:flex items-center justify-center shrink-0">
              <ChevronRight className="w-6 h-6 text-emerald-700" />
            </div>

            {/* Step 5 */}
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition flex-1 w-full relative group">
              <div className="flex flex-col justify-between h-full space-y-4">
                <div className="flex justify-between items-center">
                  <span className="bg-emerald-900 text-white font-black text-xs px-2.5 py-1 rounded-md">Step 05</span>
                  <div className="p-2.5 bg-white text-emerald-900 rounded-full border border-emerald-100 group-hover:bg-emerald-100 transition">
                    <Truck className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-start">
                  <h4 className="font-extrabold text-base text-slate-900">Procurement</h4>
                  <p className="text-xs text-slate-600 font-semibold mt-1 leading-relaxed">
                    Arrive at the procurement centre to hand over produce and complete process.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 8. Circulars & Public Notices */}
      <section className="py-12 max-w-7xl mx-auto px-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-slate-200 pb-4">
            <div className="flex items-center space-x-2.5">
              <Bell className="w-5 h-5 text-emerald-800" />
              <h4 className="font-black text-lg text-slate-900">Circulars & Public Notices</h4>
            </div>
            <a href="#all" className="text-xs font-extrabold text-emerald-800 hover:underline">
              View All Notices →
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {announcements.map((item) => (
              <div key={item.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200/80 hover:border-emerald-300 transition flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <span className={`text-[10px] text-white font-black px-2 py-0.5 rounded ${item.tagColor}`}>
                    {item.tag}
                  </span>
                  <p className="font-bold text-slate-800 text-sm leading-snug">{item.title}</p>
                </div>
                <p className="text-xs text-slate-400 font-semibold pt-2 border-t border-slate-200/60">{item.date}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Official Dark Green Footer with Team Yuva & SIH26032 Branding */}
      <footer className="bg-emerald-950 text-slate-300 py-10 text-xs border-t border-emerald-900">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          
          {/* Left: Platform Branding */}
          <div className="flex items-center space-x-4">
            {/* Reserved Empty Space for Main Kisaan Setu Logo */}
            <div className="w-8 h-11 shrink-0 border border-dashed border-emerald-700/60 rounded flex items-center justify-center text-[10px] text-emerald-500">
              Logo
            </div>
            <div>
              <p className="font-black text-white text-base">Kisaan Setu</p>
              <p className="text-xs text-emerald-300 font-medium mt-0.5">Digital Procurement Management Platform</p>
            </div>
          </div>

          {/* Middle: Navigation Links */}
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

          {/* Right: Team Yuva & SIH26032 Branding Block */}
          <div className="flex flex-col items-start md:items-end space-y-2.5">
            <div className="flex items-center space-x-3">
              {/* Reserved Empty Space for Team Yuva Logo */}
              <div className="w-8 h-8 shrink-0 border border-dashed border-emerald-700/60 rounded-full flex items-center justify-center text-[9px] text-emerald-400 font-bold">
                Team
              </div>
              <div className="text-left md:text-right">
                <p className="font-black text-white text-sm tracking-tight">Team Yuva</p>
                <span className="inline-block px-2 py-0.5 mt-0.5 text-[10px] font-extrabold text-emerald-300 bg-emerald-900/60 border border-emerald-700/50 rounded">
                  SIH ID: SIH26032
                </span>
              </div>
            </div>

            {/* YouTube Demo Video Button */}
            <button 
              onClick={() => {}}
              className="mt-1 bg-emerald-900/90 hover:bg-emerald-800 text-emerald-100 border border-emerald-700/80 px-3.5 py-1.5 rounded-md font-bold text-xs flex items-center space-x-2 transition shadow-sm"
              title="Demo video link will be added here"
            >
              {/* Official YouTube Red Logo SVG */}
              <svg className="w-4 h-3.5 fill-rose-500" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span>Watch Prototype Demo</span>
            </button>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-8 mt-8 pt-4 border-t border-emerald-900/80 text-center text-emerald-400/80 text-xs font-semibold">
          This is a prototype web application developed for SIH (Smart India Hackathon) 2026.
        </div>
      </footer>

    </div>
  );
}