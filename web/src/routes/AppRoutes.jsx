import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from '../pages/Landing';
import About from '../pages/About';
import AdminDashboard from '../pages/admin/AdminDashboard'; 
import AdminRoute from './AdminRoutes';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/about" element={<About />} />

      {/* PROTECTED ADMIN ROUTES */}
      <Route path="/admin/dashboard" element={<AdminRoute> <AdminDashboard /> </AdminRoute>} />

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}