import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from '../pages/Landing';
import Login from '../auth/Login';
import Register from '../auth/Register';
import About from '../pages/About';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/about" element={<About />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}