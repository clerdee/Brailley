import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from '../pages/Landing'; // <-- Inimport natin si Landing
import Login from '../auth/Login';
import Register from '../auth/Register';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}