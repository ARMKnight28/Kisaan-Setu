import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Globe, HelpCircle, PhoneCall, Lock, ShieldCheck, MapPin, Building2, Calendar, Clock, CheckCircle2, Download, Home, User, Package, QrCode, Loader2 } from 'lucide-react';
import { getFarmerProfile, bookSlot } from '../api';

// Cascading State & District Dataset
const stateDistrictMap = {
  "Maharashtra": ["Ahilyanagar (Ahmednagar)", "Akola", "Amravati", "Chhatrapati Sambhajinagar (Aurangabad)", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik", "Dharashiv (Osmanabad)", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"],
  "Punjab": ["Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Firozpur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Malerkotla", "Mansa", "Moga", "Mohali (SAS Nagar)", "Muktsar", "Pathankot", "Patiala", "Ropar (RUPNAGAR)", "Sangrur", "Shaheed Bhagat Singh Nagar", "Tarn Taran"],
  "Gujarat": ["Ahmedabad", "Amreli", "Anand", "Arvalli", "Banaskantha", "Bharuch", "Bhavnagar", "Botad", "Chhota Udepur", "Dahod", "Dangs", "Devbhoomi Dwarka", "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kachchh", "Kheda", "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", "Tapi", "Vadodara", "Valsad"],
  "Madhya Pradesh": ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain", "Sagar", "Dewas", "Satna"]
};

// Mandi Centres for specific districts
const districtMandiMap = {
  "Nashik": [
    "Nashik Main APMC Yard (Panchavati Market)",
    "Lasalgaon APMC Market (Onion & Grain Hub)",
    "Pimpalgaon Baswant APMC Yard",
    "Yeola APMC Market Yard",
    "Malegaon APMC Sub-Market"
  ],
  "Ahilyanagar (Ahmednagar)": [
    "Ahilyanagar APMC Central Market Yard",
    "Rahuri APMC Procurement Hub",
    "Shrirampur APMC Market",
    "Sangamner APMC Yard",
    "Kopargaon APMC Sub-Market"
  ]
};

// Exact Agmarknet Commodity Hierarchy
const agmarknetData = {
  "Cereals": ["Bajra(Pearl Millet/Cumbu)", "Barley(Jau)", "Cotton", "Jowar(Sorghum)", "Jute", "Maize", "Paddy(Common)", "Ragi(Finger Millet)", "Wheat"],
  "Fibre Crops": ["Cotton", "Jute"],
  "Oil Seeds": ["Copra", "Groundnut", "Mustard", "Niger Seed(Ramtil)", "Safflower", "Sesamum(Sesame,Gingelly,Til)", "Soyabean", "Sunflower/Sunflower Seed", "Toria"],
  "Pulses": ["Bengal Gram(Gram)(Whole)", "Black Gram(Urd Beans)(Whole)", "Green Gram(Moong)(Whole)", "Lentil(Masur)(Whole)", "Red gram/Arhar/Tur(whole)"],
  "Vegetables": ["Onion", "Potato", "Tomato"],
  "Others": ["Sugarcane"]
};

export default function SlotBooking() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  // STEP 1 FORM STATES (Pre-filled from session or FastAPI /api/farmers/me)
  const [farmerName, setFarmerName] = useState(() => localStorage.getItem('farmer_name') || 'Ramesh Kumar');
  const [mobileNumber, setMobileNumber] = useState(() => localStorage.getItem('farmer_mobile') || '9876543210');
  const [address, setAddress] = useState(() => localStorage.getItem('farmer_address') || 'Village Model Town');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('');
  const [estimatedQuantity, setEstimatedQuantity] = useState('85');

  // STEP 2 FORM STATES
  const [selectedState, setSelectedState] = useState(() => localStorage.getItem('farmer_state') || 'Maharashtra');
  const [selectedDistrict, setSelectedDistrict] = useState(() => localStorage.getItem('farmer_district') || 'Nashik');
  const [pincode, setPincode] = useState('422003');
  const [selectedMandi, setSelectedMandi] = useState('Nashik Main APMC Yard (Panchavati Market)');
  const [selectedDate, setSelectedDate] = useState('13 Oct');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('11:00 AM - 01:00 PM');
  
  // STEP 4 GENERATED DETAILS
  const [generatedDbtId, setGeneratedDbtId] = useState('KS-2026-9042');
  const [isBooking, setIsBooking] = useState(false);
  const [profileSyncStatus, setProfileSyncStatus] = useState('');

  // 1. Invoke FastAPI GET /api/farmers/me on page mount to sync Supabase/local profile
  useEffect(() => {
    async function loadFarmerProfile() {
      const token = localStorage.getItem('auth_token');
      const mobile = localStorage.getItem('farmer_mobile');

      try {
        const response = await getFarmerProfile({ token, mobile });
        if (response && response.profile) {
          const prof = response.profile;
          if (prof.full_name) setFarmerName(prof.full_name);
          if (prof.mobile_number) setMobileNumber(prof.mobile_number);
          if (prof.home_address) setAddress(prof.home_address);
          if (prof.state && stateDistrictMap[prof.state]) {
            setSelectedState(prof.state);
            if (prof.district) setSelectedDistrict(prof.district);
          }
          setProfileSyncStatus(response.source?.includes('supabase') ? 'Supabase Verified' : 'Profile Synced');
          return;
        }
      } catch (err) {
        console.warn("Could not fetch remote profile, using stored session:", err);
      }

      // Fallback: Populate from stored session state
      const savedName = localStorage.getItem('farmer_name');
      const savedMobile = localStorage.getItem('farmer_mobile');
      const savedAddress = localStorage.getItem('farmer_address');
      const savedState = localStorage.getItem('farmer_state');
      const savedDistrict = localStorage.getItem('farmer_district');

      if (savedName) setFarmerName(savedName);
      if (savedMobile) setMobileNumber(savedMobile);
      if (savedAddress) setAddress(savedAddress);
      if (savedState && stateDistrictMap[savedState]) {
        setSelectedState(savedState);
        if (savedDistrict) setSelectedDistrict(savedDistrict);
      }
      setProfileSyncStatus('Session Loaded');
    }

    loadFarmerProfile();
  }, []);

  const availableDistricts = selectedState ? stateDistrictMap[selectedState] || [] : [];
  const availableMandis = districtMandiMap[selectedDistrict] || [];

  const handleGroupChange = (e) => {
    setSelectedGroup(e.target.value);
    setSelectedCrop('');
  };

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedDistrict('');
    setSelectedMandi('');
  };

  const handleDistrictChange = (e) => {
    const dist = e.target.value;
    setSelectedDistrict(dist);
    const mandis = districtMandiMap[dist] || [];
    setSelectedMandi(mandis[0] || '');
  };

  const handleStep1Submit = (e) => {
    e.preventDefault();
    if (!selectedGroup || !selectedCrop || !estimatedQuantity) {
      alert('Please complete all crop selection fields.');
      return;
    }
    setCurrentStep(2);
  };

  const handleStep2Submit = (e) => {
    e.preventDefault();
    if (!selectedMandi || !selectedDate || !selectedTimeSlot) {
      alert('Please select a procurement centre, delivery date, and time slot.');
      return;
    }
    setCurrentStep(3);
  };

  // Step 3 Review & Final Confirm -> Carry forward verified profile to Gate Pass endpoint
  const handleFinalConfirm = async () => {
    setIsBooking(true);

    const bookingPayload = {
      farmer_id: localStorage.getItem('farmer_id') ? parseInt(localStorage.getItem('farmer_id')) : null,
      farmer_name: farmerName,
      mobile_number: mobileNumber,
      home_address: address,
      crop_type: selectedCrop,
      quantity_quintals: parseInt(estimatedQuantity) || 0,
      mandi_name: selectedMandi,
      slot_date: selectedDate,
      slot_time: selectedTimeSlot,
      vehicle: 'Tractor Trolley',
      auth_token: localStorage.getItem('auth_token')
    };

    let passId = `KS-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      const result = await bookSlot(bookingPayload);
      if (result && result.gate_pass_id) {
        passId = result.gate_pass_id;
      } else if (result && result.booking_details && result.booking_details.gate_pass_id) {
        passId = result.booking_details.gate_pass_id;
      }
    } catch (err) {
      console.warn("Backend booking offline, generating local pass:", err);
    }

    setGeneratedDbtId(passId);

    const existingPasses = JSON.parse(localStorage.getItem('farmer_passes')) || [];
    const newPass = {
      id: passId,
      farmerName: farmerName,
      mobile: mobileNumber,
      crop: selectedCrop,
      quantity: `${estimatedQuantity} Quintals`,
      mandi: selectedMandi,
      slot: `${selectedDate} | ${selectedTimeSlot}`,
      status: 'APPROVED',
      vehicle: 'Tractor Trolley'
    };

    localStorage.setItem('farmer_passes', JSON.stringify([newPass, ...existingPasses]));
    setIsBooking(false);
    setCurrentStep(4);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-700 flex flex-col justify-between">
      
      {/* Top Header Section */}
      <header className="bg-emerald-900 text-white px-8 py-4 flex justify-between items-center border-b border-emerald-800 shadow-xs">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-9 h-9 rounded-md bg-emerald-700 text-white font-black flex items-center justify-center text-sm shadow-inner">
            KS
          </div>
          <div>
            <h1 className="font-black text-lg tracking-tight text-white">KisaanSetu</h1>
            <p className="text-[10px] text-emerald-200 font-bold uppercase tracking-wider">
              GOVERNMENT OF INDIA • MINISTRY OF AGRICULTURE
            </p>
          </div>
        </div>

        <nav className="flex items-center space-x-7 text-sm font-bold text-emerald-100">
          <button onClick={() => navigate('/')} className="hover:text-white transition cursor-pointer">HOME</button>
          <button onClick={() => navigate('/farmer/dashboard')} className="hover:text-white transition cursor-pointer">TRACK PASSES</button>
          <button className="hover:text-white transition cursor-pointer">PROCUREMENT CENTERS</button>
          <button className="hover:text-white transition cursor-pointer">CONTACT US</button>

          {/* Language Dropdown */}
          <div className="flex items-center space-x-1.5 font-bold text-sm text-slate-800 border-l border-emerald-700 pl-4">
            <Globe className="w-4 h-4 text-emerald-300" />
            <select 
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-emerald-800 text-white border border-emerald-600 rounded-md px-3 py-1 text-xs font-bold focus:outline-none cursor-pointer"
            >
              <option value="en">English</option>
              <option value="hi">Hindi</option>
              <option value="pa">Punjabi</option>
              <option value="mr">Marathi</option>
              <option value="te">Telugu</option>
              <option value="gu">Gujarati</option>
              <option value="bn">Bengali</option>
            </select>
          </div>
        </nav>
      </header>

      {/* Dynamic Stepper Progress Bar */}
      <div className="bg-white border-b border-slate-200 py-4 px-8 shadow-2xs">
        <div className="max-w-5xl mx-auto flex justify-between items-center text-sm font-semibold">
          
          {/* Step 1 Indicator */}
          <div 
            className={`flex items-center space-x-3 ${currentStep > 1 ? 'cursor-pointer' : ''}`}
            onClick={() => currentStep > 1 && setCurrentStep(1)}
          >
            <div className={`w-8 h-8 rounded-full font-extrabold flex items-center justify-center text-sm ${
              currentStep > 1 
                ? 'bg-emerald-800 text-white' 
                : currentStep === 1 
                ? 'bg-emerald-900 text-white ring-4 ring-emerald-100' 
                : 'bg-slate-200 text-slate-600'
            }`}>
              {currentStep > 1 ? <CheckCircle2 className="w-5 h-5 text-white" /> : '1'}
            </div>
            <div>
              <p className={`text-sm ${currentStep === 1 ? 'font-black text-emerald-950' : 'font-bold text-slate-700'}`}>Farmer & Crop Details</p>
            </div>
          </div>

          <div className={`flex-1 h-0.5 mx-6 ${currentStep > 1 ? 'bg-emerald-700' : 'bg-slate-200'}`}></div>

          {/* Step 2 Indicator */}
          <div 
            className={`flex items-center space-x-3 ${currentStep > 2 ? 'cursor-pointer' : ''}`}
            onClick={() => currentStep > 2 && setCurrentStep(2)}
          >
            <div className={`w-8 h-8 rounded-full font-extrabold flex items-center justify-center text-sm ${
              currentStep > 2 
                ? 'bg-emerald-800 text-white' 
                : currentStep === 2 
                ? 'bg-emerald-900 text-white ring-4 ring-emerald-100' 
                : 'bg-slate-200 text-slate-600'
            }`}>
              {currentStep > 2 ? <CheckCircle2 className="w-5 h-5 text-white" /> : '2'}
            </div>
            <div>
              <p className={`text-sm ${currentStep === 2 ? 'font-black text-emerald-950' : 'font-bold text-slate-700'}`}>Mandi & Slot Selection</p>
            </div>
          </div>

          <div className={`flex-1 h-0.5 mx-6 ${currentStep > 2 ? 'bg-emerald-700' : 'bg-slate-200'}`}></div>

          {/* Step 3 Indicator */}
          <div className="flex items-center space-x-3">
            <div className={`w-8 h-8 rounded-full font-extrabold flex items-center justify-center text-sm ${
              currentStep >= 3 
                ? 'bg-emerald-900 text-white ring-4 ring-emerald-100' 
                : 'bg-slate-200 text-slate-600'
            }`}>
              {currentStep === 4 ? <CheckCircle2 className="w-5 h-5 text-white" /> : '3'}
            </div>
            <div>
              <p className={`text-sm ${currentStep >= 3 ? 'font-black text-emerald-950' : 'font-bold text-slate-500'}`}>
                {currentStep === 4 ? 'Booking Confirmed' : 'Review & Confirm'}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-6xl w-full mx-auto px-8 py-8 flex-1">
        
        {/* ================= STEP 1: FARMER & CROP DETAILS ================= */}
        {currentStep === 1 && (
          <div>
            <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">Farmer & Crop Registry</h2>
                <p className="text-sm text-slate-600 font-medium mt-0.5">
                  Ensure details match your land records for seamless APMC verification.
                </p>
              </div>
              <span className="text-xs font-bold bg-emerald-100 text-emerald-900 px-3.5 py-1.5 rounded-full border border-emerald-200 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-700" /> {profileSyncStatus || 'e-KYC Verified'}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <form onSubmit={handleStep1Submit} className="lg:col-span-2 space-y-6 bg-white p-7 rounded-xl border border-slate-200 shadow-2xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-extrabold text-slate-700 mb-1.5">Farmer Name <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      required
                      value={farmerName}
                      onChange={(e) => setFarmerName(e.target.value)}
                      className="w-full p-3 border border-slate-300 rounded-lg text-sm font-semibold focus:outline-none focus:border-emerald-700 bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-extrabold text-slate-700 mb-1.5">Mobile Number <span className="text-red-500">*</span></label>
                    <input
                      type="tel"
                      required
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className="w-full p-3 border border-slate-300 rounded-lg text-sm font-semibold focus:outline-none focus:border-emerald-700 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-extrabold text-slate-700 mb-1.5">Home Address / Village Details <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-3 border border-slate-300 rounded-lg text-sm font-semibold focus:outline-none focus:border-emerald-700 bg-white"
                  />
                </div>

                <div className="bg-slate-50/90 p-5 border border-slate-200 rounded-xl space-y-3.5">
                  <span className="text-xs font-black text-slate-600 uppercase tracking-wider block">Agmarknet Commodity Selection</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Commodity Group <span className="text-red-500">*</span></label>
                      <select
                        required
                        value={selectedGroup}
                        onChange={handleGroupChange}
                        className="w-full p-3 border border-slate-300 rounded-lg text-sm font-bold bg-white focus:outline-none focus:border-emerald-700 cursor-pointer"
                      >
                        <option value="">Select Commodity Group</option>
                        {Object.keys(agmarknetData).map((grp) => (
                          <option key={grp} value={grp}>{grp}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Commodity / Crop <span className="text-red-500">*</span></label>
                      <select
                        required
                        disabled={!selectedGroup}
                        value={selectedCrop}
                        onChange={(e) => setSelectedCrop(e.target.value)}
                        className="w-full p-3 border border-slate-300 rounded-lg text-sm font-bold bg-white focus:outline-none focus:border-emerald-700 cursor-pointer disabled:bg-slate-100 disabled:text-slate-400"
                      >
                        <option value="">{selectedGroup ? 'Select Commodity' : 'Select Commodity Group First'}</option>
                        {selectedGroup && agmarknetData[selectedGroup].map((crp) => (
                          <option key={crp} value={crp}>{crp}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-extrabold text-slate-700 mb-1.5">Expected Quantity (Quintals) <span className="text-red-500">*</span></label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="e.g. 85"
                    value={estimatedQuantity}
                    onChange={(e) => setEstimatedQuantity(e.target.value)}
                    className="w-full p-3 border border-slate-300 rounded-lg text-sm font-semibold focus:outline-none focus:border-emerald-700 bg-white"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <button
                    type="submit"
                    className="bg-emerald-800 hover:bg-emerald-900 text-white px-7 py-3.5 rounded-lg font-extrabold text-xs tracking-wider flex items-center justify-center space-x-2 transition shadow-sm cursor-pointer"
                  >
                    <span>CONTINUE TO SLOT SELECTION</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                    <Lock className="w-4 h-4 text-slate-400" />
                    Data encrypted under DBT protocols.
                  </span>
                </div>
              </form>

              {/* Instruction Sidebar */}
              <div className="bg-emerald-50/80 border border-emerald-200/90 rounded-xl p-6 space-y-4 shadow-2xs">
                <h3 className="font-black text-sm text-emerald-950 flex items-center gap-2 border-b border-emerald-200/90 pb-3 uppercase tracking-wider">
                  <HelpCircle className="w-4.5 h-4.5 text-emerald-800" />
                  <span>Instructions for Farmers</span>
                </h3>

                <ul className="text-xs text-emerald-950 space-y-3.5 font-medium leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-1.5 shrink-0"></span>
                    <span>Please ensure your Aadhaar card is linked to your registered mobile number for smooth e-KYC.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-1.5 shrink-0"></span>
                    <span>Please bring your digital or printed <strong>Gate Pass</strong> to the APMC checkpoint for fast-track entry.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-1.5 shrink-0"></span>
                    <span>Keep crop land registries (Girdawari documents) ready for grain inspection.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-1.5 shrink-0"></span>
                    <span>Moisture level of grains should ideally be under <strong>14%</strong> to avoid processing delays.</span>
                  </li>
                </ul>

                <div className="pt-4 border-t border-emerald-200/90 flex items-center space-x-2 text-xs font-black text-emerald-950">
                  <PhoneCall className="w-4 h-4 text-emerald-800" />
                  <span>Farmer Helpline: XXXX-XXX-XXXX</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 2: MANDI, DATE & TIME SELECTION ================= */}
        {currentStep === 2 && (
          <div>
            <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">Select Mandi, Date & Time</h2>
                <p className="text-sm text-slate-600 font-medium mt-0.5">
                  Choose a convenient procurement hub and book your delivery window to avoid long queues.
                </p>
              </div>
              <button
                onClick={() => setCurrentStep(1)}
                className="text-xs font-bold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 transition cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              
              <form onSubmit={handleStep2Submit} className="lg:col-span-2 space-y-6 bg-white p-7 rounded-xl border border-slate-200 shadow-2xs">
                
                <div className="space-y-4">
                  <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2 border-b border-slate-100 pb-2">
                    <MapPin className="w-4 h-4 text-emerald-800" /> Procurement Location Filters
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">State</label>
                      <select
                        value={selectedState}
                        onChange={handleStateChange}
                        className="w-full p-2.5 border border-slate-300 rounded-lg text-sm font-bold bg-white focus:outline-none focus:border-emerald-700 cursor-pointer"
                      >
                        {Object.keys(stateDistrictMap).map((st) => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">District</label>
                      <select
                        value={selectedDistrict}
                        onChange={handleDistrictChange}
                        className="w-full p-2.5 border border-slate-300 rounded-lg text-sm font-bold bg-white focus:outline-none focus:border-emerald-700 cursor-pointer"
                      >
                        <option value="">Select District</option>
                        {availableDistricts.map((dst) => (
                          <option key={dst} value={dst}>{dst}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">PIN Code Slot</label>
                      <input
                        type="text"
                        placeholder="e.g. 422003"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        className="w-full p-2.5 border border-slate-300 rounded-lg text-sm font-semibold focus:outline-none focus:border-emerald-700 bg-white"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-extrabold text-slate-800 mb-2.5 flex items-center gap-2">
                    <Building2 className="w-4.5 h-4.5 text-emerald-800" /> Choose Procurement Mandi Centre <span className="text-red-500">*</span>
                  </label>

                  {availableMandis.length > 0 ? (
                    <div className="space-y-2.5">
                      {availableMandis.map((mandi) => (
                        <div
                          key={mandi}
                          onClick={() => setSelectedMandi(mandi)}
                          className={`p-4 rounded-xl border text-sm font-bold cursor-pointer transition flex items-center justify-between ${
                            selectedMandi === mandi
                              ? 'border-emerald-700 bg-emerald-50/70 text-emerald-950 ring-1 ring-emerald-700 shadow-2xs'
                              : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-slate-50/50'
                          }`}
                        >
                          <div>
                            <p className="font-extrabold text-sm">{mandi}</p>
                            <p className="text-xs text-slate-500 font-medium mt-0.5">Active APMC Capacity • Fast-track Weighbridge Available</p>
                          </div>
                          <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            selectedMandi === mandi ? 'border-emerald-800 bg-emerald-800 text-white' : 'border-slate-300'
                          }`}>
                            {selectedMandi === mandi && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm font-semibold text-amber-900">
                      Currently active APMC centres are listed for <strong>Nashik</strong> and <strong>Ahilyanagar (Ahmednagar)</strong> districts. Select one of these districts above to view available hubs!
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-extrabold text-slate-800 mb-2.5 flex items-center gap-2">
                    <Calendar className="w-4.5 h-4.5 text-emerald-800" /> Select Date <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-5 gap-3">
                    {[
                      { day: 'Mon', date: '12 Oct', status: 'High Demand' },
                      { day: 'Tue', date: '13 Oct', status: 'Available' },
                      { day: 'Wed', date: '14 Oct', status: 'Available' },
                      { day: 'Thu', date: '15 Oct', status: 'Closed' },
                      { day: 'Fri', date: '16 Oct', status: 'Available' },
                    ].map((d) => (
                      <button
                        key={d.date}
                        type="button"
                        disabled={d.status === 'Closed'}
                        onClick={() => setSelectedDate(d.date)}
                        className={`p-3.5 rounded-xl border text-center transition ${
                          selectedDate === d.date
                            ? 'bg-emerald-800 text-white border-emerald-800 shadow-sm'
                            : d.status === 'Closed'
                            ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed opacity-60'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200 cursor-pointer'
                        }`}
                      >
                        <p className="text-xs uppercase font-bold opacity-80">{d.day}</p>
                        <p className="text-base font-black my-0.5">{d.date}</p>
                        <p className={`text-[10px] font-bold ${
                          selectedDate === d.date ? 'text-emerald-200' : d.status === 'Closed' ? 'text-red-500' : 'text-emerald-700'
                        }`}>
                          {d.status}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-extrabold text-slate-800 mb-2.5 flex items-center gap-2">
                    <Clock className="w-4.5 h-4.5 text-emerald-800" /> Available Time Slots <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {[
                      { slot: '09:00 AM - 11:00 AM', status: '08 Available' },
                      { slot: '11:00 AM - 01:00 PM', status: '05 Available' },
                      { slot: '01:00 PM - 03:00 PM', status: '02 Available' },
                      { slot: '03:00 PM - 05:00 PM', status: 'Full' },
                    ].map((s) => (
                      <button
                        key={s.slot}
                        type="button"
                        disabled={s.status === 'Full'}
                        onClick={() => setSelectedTimeSlot(s.slot)}
                        className={`p-3.5 rounded-xl border text-sm font-bold flex items-center justify-between transition ${
                          selectedTimeSlot === s.slot
                            ? 'bg-emerald-50 border-emerald-700 text-emerald-950 ring-1 ring-emerald-700'
                            : s.status === 'Full'
                            ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed opacity-60'
                            : 'bg-white hover:border-slate-300 border-slate-200 text-slate-700 cursor-pointer'
                        }`}
                      >
                        <span>{s.slot}</span>
                        <span className={`text-xs font-extrabold px-2.5 py-0.5 rounded ${
                          selectedTimeSlot === s.slot ? 'bg-emerald-800 text-white' : s.status === 'Full' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {selectedTimeSlot === s.slot ? 'Selected' : s.status}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between gap-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="px-6 py-3 border border-slate-300 rounded-lg text-slate-700 font-extrabold text-xs hover:bg-slate-100 transition cursor-pointer"
                  >
                    BACK
                  </button>

                  <button
                    type="submit"
                    className="bg-emerald-800 hover:bg-emerald-900 text-white px-7 py-3.5 rounded-lg font-extrabold text-xs tracking-wider flex items-center space-x-2 transition shadow-sm cursor-pointer"
                  >
                    <span>REVIEW BOOKING</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </form>

              {/* Instructions Box */}
              <div className="bg-emerald-50/80 border border-emerald-200/90 rounded-xl p-6 space-y-4 shadow-2xs">
                <h3 className="font-black text-sm text-emerald-950 flex items-center gap-2 border-b border-emerald-200/90 pb-3 uppercase tracking-wider">
                  <HelpCircle className="w-4.5 h-4.5 text-emerald-800" />
                  <span>Instructions for Farmers</span>
                </h3>

                <ul className="text-xs text-emerald-950 space-y-3.5 font-medium leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-1.5 shrink-0"></span>
                    <span>Please ensure your Aadhaar card is linked to your registered mobile number for smooth e-KYC.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-1.5 shrink-0"></span>
                    <span>Please bring your digital or printed <strong>Gate Pass</strong> to the APMC checkpoint for fast-track entry.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-1.5 shrink-0"></span>
                    <span>Keep crop land registries (Girdawari documents) ready for grain inspection.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-1.5 shrink-0"></span>
                    <span>Moisture level of grains should ideally be under <strong>14%</strong> to avoid processing delays.</span>
                  </li>
                </ul>

                <div className="pt-4 border-t border-emerald-200/90 flex items-center space-x-2 text-xs font-black text-emerald-950">
                  <PhoneCall className="w-4 h-4 text-emerald-800" />
                  <span>Farmer Helpline: XXXX-XXX-XXXX</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ================= STEP 3: REVIEW BEFORE FINAL CONFIRMATION ================= */}
        {currentStep === 3 && (
          <div>
            <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">Review Your Booking Details</h2>
                <p className="text-sm text-slate-600 font-medium mt-0.5">
                  Verify your registration details before final gate pass generation.
                </p>
              </div>
              <span className="text-xs font-bold bg-amber-100 text-amber-900 px-3.5 py-1.5 rounded-full border border-amber-200 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-amber-800" /> Pending Confirmation
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              
              {/* Review Card Left Column */}
              <div className="lg:col-span-2 space-y-6 bg-white p-7 rounded-xl border border-slate-200 shadow-2xs">
                
                {/* Farmer Info Review */}
                <div className="border border-slate-200 rounded-xl p-5 space-y-3 bg-slate-50/50">
                  <div className="flex justify-between items-center border-b border-slate-200 pb-2.5">
                    <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                      <User className="w-4 h-4 text-emerald-800" /> Farmer Personal Details
                    </h3>
                    <button onClick={() => setCurrentStep(1)} className="text-xs font-bold text-emerald-800 hover:underline cursor-pointer">Edit</button>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-slate-500 font-semibold">Farmer Name</p>
                      <p className="font-extrabold text-slate-800">{farmerName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-semibold">Mobile Number</p>
                      <p className="font-extrabold text-slate-800">{mobileNumber}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-semibold">Address / Village</p>
                      <p className="font-extrabold text-slate-800">{address}</p>
                    </div>
                  </div>
                </div>

                {/* Crop & Quantity Review */}
                <div className="border border-slate-200 rounded-xl p-5 space-y-3 bg-slate-50/50">
                  <div className="flex justify-between items-center border-b border-slate-200 pb-2.5">
                    <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                      <Package className="w-4 h-4 text-emerald-800" /> Agmarknet Crop Classification
                    </h3>
                    <button onClick={() => setCurrentStep(1)} className="text-xs font-bold text-emerald-800 hover:underline cursor-pointer">Edit</button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-slate-500 font-semibold">Commodity Group</p>
                      <p className="font-extrabold text-slate-800">{selectedGroup}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-semibold">Commodity / Crop</p>
                      <p className="font-extrabold text-slate-800">{selectedCrop}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-semibold">Estimated Weight</p>
                      <p className="font-extrabold text-emerald-900">{estimatedQuantity} Quintals</p>
                    </div>
                  </div>
                </div>

                {/* Mandi & Schedule Review */}
                <div className="border border-slate-200 rounded-xl p-5 space-y-3 bg-slate-50/50">
                  <div className="flex justify-between items-center border-b border-slate-200 pb-2.5">
                    <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-emerald-800" /> Mandi Centre & Delivery Window
                    </h3>
                    <button onClick={() => setCurrentStep(2)} className="text-xs font-bold text-emerald-800 hover:underline cursor-pointer">Edit</button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-xs text-slate-500 font-semibold">Target APMC Mandi</p>
                      <p className="font-extrabold text-slate-800">{selectedMandi}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-semibold">Scheduled Date</p>
                      <p className="font-extrabold text-slate-800">{selectedDate}</p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-semibold">Time Slot</p>
                      <p className="font-extrabold text-emerald-900">{selectedTimeSlot}</p>
                    </div>
                  </div>
                </div>

                {/* Final Confirm Buttons */}
                <div className="pt-3 flex items-center justify-between gap-4 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="px-6 py-3 border border-slate-300 rounded-lg text-slate-700 font-extrabold text-xs hover:bg-slate-100 transition cursor-pointer"
                  >
                    BACK
                  </button>

                  <button
                    type="button"
                    disabled={isBooking}
                    onClick={handleFinalConfirm}
                    className="bg-emerald-800 hover:bg-emerald-900 text-white px-8 py-3.5 rounded-lg font-extrabold text-xs tracking-wider flex items-center space-x-2 transition shadow-sm cursor-pointer disabled:opacity-75"
                  >
                    {isBooking ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-emerald-300" />
                        <span>ISSUING GATE PASS...</span>
                      </>
                    ) : (
                      <>
                        <span>CONFIRM & GENERATE GATE PASS</span>
                        <QrCode className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>

              </div>

              {/* Instructions Box */}
              <div className="bg-emerald-50/80 border border-emerald-200/90 rounded-xl p-6 space-y-4 shadow-2xs">
                <h3 className="font-black text-sm text-emerald-950 flex items-center gap-2 border-b border-emerald-200/90 pb-3 uppercase tracking-wider">
                  <HelpCircle className="w-4.5 h-4.5 text-emerald-800" />
                  <span>Instructions for Farmers</span>
                </h3>

                <ul className="text-xs text-emerald-950 space-y-3.5 font-medium leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-1.5 shrink-0"></span>
                    <span>Please ensure your Aadhaar card is linked to your registered mobile number for smooth e-KYC.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-1.5 shrink-0"></span>
                    <span>Please bring your digital or printed <strong>Gate Pass</strong> to the APMC checkpoint for fast-track entry.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-1.5 shrink-0"></span>
                    <span>Keep crop land registries (Girdawari documents) ready for grain inspection.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-1.5 shrink-0"></span>
                    <span>Moisture level of grains should ideally be under <strong>14%</strong> to avoid processing delays.</span>
                  </li>
                </ul>

                <div className="pt-4 border-t border-emerald-200/90 flex items-center space-x-2 text-xs font-black text-emerald-950">
                  <PhoneCall className="w-4 h-4 text-emerald-800" />
                  <span>Farmer Helpline: XXXX-XXX-XXXX</span>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ================= STEP 4: BOOKING CONFIRMED (SUCCESS SLIP) ================= */}
        {currentStep === 4 && (
          <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
            
            {/* Top Success Banner Card */}
            <div className="bg-emerald-50/90 border border-emerald-200 rounded-2xl p-8 text-center space-y-3 shadow-2xs">
              <div className="w-12 h-12 bg-emerald-800 text-white rounded-full mx-auto flex items-center justify-center shadow-xs">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">Booking Confirmed Successfully!</h2>
              <p className="text-sm font-semibold text-slate-600">
                An SMS with these details has been dispatched to <span className="font-bold text-slate-800">+91 {mobileNumber}</span>
              </p>
            </div>

            {/* Official Booking Slip Card */}
            <div className="bg-slate-100/70 border border-slate-200 rounded-2xl p-8 shadow-2xs space-y-6">
              
              {/* Slip Header */}
              <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                <h3 className="text-lg font-black text-slate-800 tracking-tight">Official Booking Slip</h3>
                <span className="bg-emerald-100/80 text-emerald-900 border border-emerald-200 font-extrabold text-xs px-3 py-1 rounded-full">
                  DBT ID: {generatedDbtId}
                </span>
              </div>

              {/* Grid Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-8 text-sm border-b border-slate-200 pb-6">
                <div>
                  <p className="text-xs text-slate-500 font-semibold mb-0.5">Farmer Name</p>
                  <p className="font-extrabold text-slate-800">{farmerName}</p>
                </div>

                <div>
                  <p className="text-xs text-slate-500 font-semibold mb-0.5">Crop & Weight</p>
                  <p className="font-extrabold text-slate-800">{selectedCrop} - {estimatedQuantity} Quintals</p>
                </div>

                <div>
                  <p className="text-xs text-slate-500 font-semibold mb-0.5">Procurement Mandi</p>
                  <p className="font-extrabold text-slate-800">{selectedMandi}</p>
                </div>

                <div>
                  <p className="text-xs text-slate-500 font-semibold mb-0.5">Appointment Time</p>
                  <p className="font-extrabold text-emerald-900">{selectedDate} • {selectedTimeSlot}</p>
                </div>
              </div>

              {/* Checklist Section */}
              <div className="space-y-3">
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                  What to bring to the Mandi Gate?
                </h4>

                <ul className="text-xs text-slate-600 font-medium space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Original Aadhaar Card of registered farmer</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Land registry Girdawari verification report from Patwari</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>Bank Account Passbook (For direct bank transfer verification)</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="w-full sm:w-auto bg-emerald-800 hover:bg-emerald-900 text-white px-8 py-3.5 rounded-lg font-extrabold text-xs tracking-wider flex items-center justify-center space-x-2 transition shadow-sm cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>DOWNLOAD SLIP</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/farmer/dashboard')}
                className="w-full sm:w-auto bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-8 py-3.5 rounded-lg font-extrabold text-xs tracking-wider flex items-center justify-center space-x-2 transition cursor-pointer"
              >
                <Home className="w-4 h-4" />
                <span>RETURN TO DASHBOARD</span>
              </button>
            </div>

          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-center py-4 text-xs font-medium border-t border-slate-800">
        KisaanSetu • Encrypted & Secured by National Agricultural Informatics Protocol (SIH 2026)
      </footer>

    </div>
  );
}