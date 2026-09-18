import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import FarmerDashboard from './pages/FarmerDashboard';
import AdminDashboard from './pages/AdminDashboard';

// Protected Route Wrapper
const ProtectedRoute = ({ allowedRole }) => {
  const token = localStorage.getItem('auth_token');
  const userRole = localStorage.getItem('user_role');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (userRole !== allowedRole) {
    return <Navigate to={userRole === 'farmer' ? '/farmer/dashboard' : '/admin/dashboard'} replace />;
  }

  return <Outlet />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* Farmer Guarded Portal */}
        <Route element={<ProtectedRoute allowedRole="farmer" />}>
          <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
        </Route>

        {/* Mandi Officer Guarded Portal */}
        <Route element={<ProtectedRoute allowedRole="official" />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;