import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from '../pages/Landing';
import About from '../pages/About';
import AdminDashboard from '../pages/admin/AdminDashboard'; 

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/about" element={<About />} />

      {/* Admin Protected Routes */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}