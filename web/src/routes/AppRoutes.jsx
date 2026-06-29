import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from '../pages/Landing';
import About from '../pages/About';
import AdminDashboard from '../pages/admin/AdminDashboard'; 
import AdminStudents from '../pages/admin/AdminStudents';
import AdminEducators from '../pages/admin/AdminEducators';
import AdminDevices from '../pages/admin/AdminDevices';
import AdminRoute from './AdminRoutes';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/about" element={<About />} />

      {/* PROTECTED ADMIN ROUTES */}
      <Route path="/admin/dashboard" element={<AdminRoute> <AdminDashboard /> </AdminRoute>} />
      <Route path="/admin/students" element={<AdminRoute> <AdminStudents /> </AdminRoute>} />
      <Route path="/admin/educators" element={<AdminRoute> <AdminEducators /> </AdminRoute>} />
      <Route path="/admin/devices" element={<AdminRoute> <AdminDevices /> </AdminRoute>} />

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}