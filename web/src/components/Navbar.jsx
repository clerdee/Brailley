import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess(''); setLoading(true);
    
    try {
      if (activeTab === 'login') {
        const user = await login(email, password);
        if (user?.role === 'admin') navigate('/admin/dashboard');
        else navigate('/user/dashboard');
      } else {
        await api.post('/auth/register', { name, email, password, role: 'admin' });
        setSuccess('Registration success! Pending approval.');
        setTimeout(() => { setActiveTab('login'); setSuccess(''); setName(''); setPassword(''); }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Network error or invalid data');
    } finally {
      setLoading(false);
    }
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setError(''); setSuccess('');
  };

  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        padding: '1.2rem 4rem', 
        backgroundColor: 'rgba(15, 23, 42, 0.75)', // Transparent dark
        backdropFilter: 'blur(12px)', // Glassmorphism effect
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)', 
        position: 'sticky', top: 0, zIndex: 50 
      }}
    >
      {/* LOGO W/ HOVER EFFECT */}
      <motion.div 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/')} 
        style={{ fontSize: '1.8rem', fontWeight: '800', color: '#f8fafc', cursor: 'pointer', letterSpacing: '-0.5px' }}
      >
        Braill<span style={{ color: '#38bdf8' }}>ey.</span>
      </motion.div>
      
      <div style={{ position: 'relative' }}>
        {/* ENHANCED ADMIN PORTAL BUTTON */}
        <motion.button 
          whileHover={{ scale: 1.05, boxShadow: '0 4px 15px rgba(56, 189, 248, 0.4)' }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleDropdown} 
          style={{ 
            padding: '10px 24px', fontSize: '0.95rem', 
            background: isOpen ? '#bae6fd' : '#38bdf8', 
            color: '#0f172a', border: 'none', borderRadius: '8px', 
            cursor: 'pointer', fontWeight: '700', transition: 'background 0.2s',
            display: 'flex', alignItems: 'center', gap: '8px'
          }}
        >
          Admin Portal 
          <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
            ▼
          </motion.span>
        </motion.button>

        {/* DROPDOWN MENU */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0, y: 15, scale: 0.95 }} 
              animate={{ opacity: 1, y: 0, scale: 1 }} 
              exit={{ opacity: 0, y: 15, scale: 0.95 }} 
              transition={{ type: "spring", bounce: 0.3, duration: 0.4 }}
              style={{ 
                position: 'absolute', top: 'calc(100% + 15px)', right: 0, 
                background: 'rgba(30, 41, 59, 0.95)', // Glass dropdown
                backdropFilter: 'blur(16px)',
                padding: '1.5rem', borderRadius: '16px', width: '320px', 
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', 
                border: '1px solid rgba(255, 255, 255, 0.1)' 
              }}
            >
              {/* SLIDING TAB SWITCHER */}
              <div style={{ display: 'flex', position: 'relative', background: 'rgba(0,0,0,0.3)', borderRadius: '10px', padding: '5px', marginBottom: '1.5rem' }}>
                {['login', 'register'].map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => { setActiveTab(tab); setError(''); setSuccess(''); }}
                    style={{ 
                      flex: 1, padding: '8px 0', border: 'none', background: 'transparent', 
                      color: activeTab === tab ? '#0f172a' : '#94a3b8', 
                      fontWeight: '700', cursor: 'pointer', position: 'relative', zIndex: 1, textTransform: 'capitalize' 
                    }}
                  >
                    {activeTab === tab && (
                      <motion.div
                        layoutId="activeTabIndicator"
                        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: '#38bdf8', borderRadius: '6px', zIndex: -1 }}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                      />
                    )}
                    {tab}
                  </button>
                ))}
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {error && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: '#ef4444', fontSize: '0.85rem', margin: 0, textAlign: 'center', background: 'rgba(239, 68, 68, 0.1)', padding: '8px', borderRadius: '6px' }}>{error}</motion.p>}
                {success && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ color: '#22c55e', fontSize: '0.85rem', margin: 0, textAlign: 'center', background: 'rgba(34, 197, 94, 0.1)', padding: '8px', borderRadius: '6px' }}>{success}</motion.p>}
                
                {activeTab === 'register' && (
                  <motion.input initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required style={{ padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: '#f8fafc', outline: 'none' }} />
                )}

                <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: '#f8fafc', outline: 'none' }} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.2)', color: '#f8fafc', outline: 'none' }} />
                
                <motion.button 
                  whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  type="submit" disabled={loading} 
                  style={{ padding: '12px', background: '#38bdf8', color: '#0f172a', border: 'none', borderRadius: '8px', fontWeight: '800', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '5px', fontSize: '1rem' }}
                >
                  {loading ? 'Processing...' : (activeTab === 'login' ? 'Login In' : 'Apply Admin Account')}
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}