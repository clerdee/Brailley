import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext'; 

export default function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(email, password);
      if (user?.role === 'admin') navigate('/admin/dashboard');
      else navigate('/user/dashboard');
    } catch (err) {
      setError('Invalid credentials or API offline');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 4rem', backgroundColor: '#0f172a', borderBottom: '1px solid #1e293b', position: 'sticky', top: 0, zIndex: 50 }}
    >
      <div onClick={() => navigate('/')} style={{ fontSize: '1.8rem', fontWeight: '800', color: '#f8fafc', cursor: 'pointer', letterSpacing: '-0.5px' }}>
        Braill<span style={{ color: '#38bdf8' }}>ey.</span>
      </div>
      
      {/* Dropdown Container */}
      <div style={{ position: 'relative' }}>
        <button onClick={() => setIsOpen(!isOpen)} style={{ padding: '10px 24px', fontSize: '0.95rem', background: isOpen ? '#e0f2fe' : '#38bdf8', color: '#0f172a', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '700', transition: '0.2s' }}>
          Admin Portal {isOpen ? '▲' : '▼'}
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
              style={{ position: 'absolute', top: '130%', right: 0, background: '#1e293b', padding: '1.5rem', borderRadius: '12px', width: '280px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5)', border: '1px solid #334155' }}
            >
              <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h3 style={{ margin: 0, color: '#f8fafc', fontSize: '1.2rem', textAlign: 'center' }}>Admin Login</h3>
                {error && <p style={{ color: '#ef4444', fontSize: '0.85rem', margin: 0, textAlign: 'center' }}>{error}</p>}
                
                <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #475569', background: '#0f172a', color: '#f8fafc', outline: 'none' }} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ padding: '10px', borderRadius: '6px', border: '1px solid #475569', background: '#0f172a', color: '#f8fafc', outline: 'none' }} />
                
                <button type="submit" disabled={loading} style={{ padding: '10px', background: '#38bdf8', color: '#0f172a', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '5px' }}>
                  {loading ? 'Authenticating...' : 'Sign In'}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}