import { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const res = await api.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } });
          setUser(res.data.user || res.data);
        }
      } catch (err) { console.error("Session Error:", err); localStorage.removeItem('token'); } 
      finally { setLoading(false); }
    };
    checkUser();
  }, []);

  const login = async (email, password) => {
    const res = await api.post('/auth/login', { email, password }); 
    const userData = res.data.user || res.data;
    localStorage.setItem('token', res.data.token || userData.token);
    setUser(userData);
    return userData; 
  };

  const logout = () => { localStorage.removeItem('token'); setUser(null); };

  return <AuthContext.Provider value={{ user, login, logout, loading }}>{!loading && children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);