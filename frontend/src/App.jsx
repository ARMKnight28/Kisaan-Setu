import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import FarmerDashboard from './pages/FarmerDashboard';
import SlotBooking from './pages/SlotBooking';
import CentreDashboard from './pages/CentreDashboard';
import AdminDashboard from './pages/AdminDashboard';

// Flexible Protected Route for MVP / Demo
const ProtectedRoute = ({ allowedRole }) => {
  const token = localStorage.getItem('auth_token');
  const userRole = localStorage.getItem('user_role');

  // Auto-set mock credentials if navigating directly during testing/demo
  if (!token) {
    localStorage.setItem('auth_token', 'demo_token_sih2026');
    localStorage.setItem('user_role', allowedRole);
  }

  return <Outlet />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Farmer Guarded Portal */}
        <Route element={<ProtectedRoute allowedRole="farmer" />}>
          <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
          <Route path="/farmer/book-slot" element={<SlotBooking />} />
        </Route>

        {/* Procurement Centre Guarded Portal */}
        <Route element={<ProtectedRoute allowedRole="centre" />}>
          <Route path="/centre/dashboard" element={<CentreDashboard />} />
        </Route>

        {/* Government Admin Guarded Portal */}
        <Route element={<ProtectedRoute allowedRole="admin" />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;