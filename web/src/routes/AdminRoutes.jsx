import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null; 
  
  const isAdmin = user && (user.role === 'admin' || user.role === 'superadmin');
  
  return isAdmin ? children : <Navigate to="/" replace />;
}