import { useNavigate } from 'react-router-dom';
import { Landmark, LogOut, Construction } from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 flex flex-col justify-between">
      
      {/* Header */}
      <header className="bg-slate-900 text-white px-8 py-4 flex justify-between items-center shadow-md">
        <div className="flex items-center space-x-3">
          <Landmark className="w-6 h-6 text-slate-300" />
          <div>
            <h1 className="font-bold text-sm tracking-tight">Government Administrator Portal</h1>
            <p className="text-[10px] text-slate-400">Kisaan Setu National Oversight • SIH 2026</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded text-xs font-semibold flex items-center space-x-1.5 transition"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Logout</span>
        </button>
      </header>

      {/* Placeholder Body */}
      <main className="flex-1 max-w-4xl mx-auto px-6 py-16 flex flex-col items-center justify-center text-center space-y-4">
        <div className="p-4 bg-slate-200 text-slate-700 rounded-full">
          <Construction className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">Admin Dashboard Under Construction</h2>
        <p className="text-sm text-slate-600 max-w-md">
          This module is reserved for national-level procurement analytics, policy management, and cross-state monitoring. You can easily flesh this out later for your hackathon presentation!
        </p>
        <button
          onClick={() => navigate('/')}
          className="mt-4 bg-slate-900 hover:bg-black text-white px-5 py-2.5 rounded text-xs font-bold transition shadow-sm"
        >
          Return to Home
        </button>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-center py-4 text-xs">
        National Agricultural Informatics Protocol • SIH 2026
      </footer>

    </div>
  );
}