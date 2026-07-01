import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

export default function AdminLoginModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login'); 
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
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
        if (user?.role === 'admin' || user?.role === 'superadmin') {
          navigate('/admin/dashboard');
        } else {
          setError('Access Denied. Admins only.');
        }
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

  const inputStyle = {
    width: '100%', padding: '14px 16px', borderRadius: '12px', 
    border: '1px solid rgba(148, 163, 184, 0.2)', background: 'rgba(15, 23, 42, 0.6)', 
    color: '#f8fafc', outline: 'none', fontSize: '0.95rem', boxSizing: 'border-box',
    transition: 'border-color 0.3s ease'
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
          style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(12px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} transition={{ type: "spring", bounce: 0.4, duration: 0.5 }} 
            style={{ background: 'linear-gradient(145deg, #1e293b, #0f172a)', padding: '2.5rem', borderRadius: '24px', width: '90%', maxWidth: '420px', border: '1px solid rgba(56, 189, 248, 0.3)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8)', position: 'relative' }}
          >
            {/* CLOSE BUTTON */}
            <button onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,0.05)', border: 'none', color: '#94a3b8', width: '35px', height: '35px', borderRadius: '50%', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'} onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}>
              ✕
            </button>

            {/* HEADER */}
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h2 style={{ color: '#f8fafc', fontSize: '1.8rem', fontWeight: '800', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>Admin Portal</h2>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', margin: 0 }}>Manage the Brailley ecosystem securely.</p>
            </div>

            {/* SLIDING TAB SWITCHER */}
            <div style={{ display: 'flex', position: 'relative', background: 'rgba(0,0,0,0.4)', borderRadius: '14px', padding: '6px', marginBottom: '1.8rem' }}>
              {['login', 'register'].map((tab) => (
                <button
                  key={tab} type="button" onClick={() => { setActiveTab(tab); setError(''); setSuccess(''); }}
                  style={{ flex: 1, padding: '12px 0', border: 'none', background: 'transparent', color: activeTab === tab ? '#0f172a' : '#94a3b8', fontWeight: '700', cursor: 'pointer', position: 'relative', zIndex: 1, textTransform: 'capitalize', fontSize: '0.95rem' }}
                >
                  {activeTab === tab && (
                    <motion.div layoutId="activeTab" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to right, #38bdf8, #818cf8)', borderRadius: '10px', zIndex: -1, boxShadow: '0 4px 12px rgba(56, 189, 248, 0.3)' }} transition={{ type: "spring", bounce: 0.2, duration: 0.5 }} />
                  )}
                  {tab}
                </button>
              ))}
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              
              {/* MESSAGES */}
              <AnimatePresence>
                {error && <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} style={{ color: '#ef4444', fontSize: '0.85rem', margin: 0, textAlign: 'center', background: 'rgba(239, 68, 68, 0.1)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>{error}</motion.p>}
                {success && <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} style={{ color: '#22c55e', fontSize: '0.85rem', margin: 0, textAlign: 'center', background: 'rgba(34, 197, 94, 0.1)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(34, 197, 94, 0.2)' }}>{success}</motion.p>}
              </AnimatePresence>
              
              {/* INPUTS */}
              <AnimatePresence>
                {activeTab === 'register' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} style={{ overflow: 'hidden' }}>
                    <input type="text" placeholder="Username" value={name} onChange={(e) => setName(e.target.value)} required style={inputStyle} />
                  </motion.div>
                )}
              </AnimatePresence>
              
              <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />
              
              {/* PASSWORD INPUT WITH EYE ICON */}
              <div style={{ position: 'relative', width: '100%' }}>
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="Password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  style={{ ...inputStyle, paddingRight: '50px' }} 
                />
                
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8', display: 'flex', alignItems: 'center', padding: '5px' }}
                >
                  {showPassword ? (
                    // EYE OPEN SVG
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  ) : (
                    // EYE CLOSED SVG (WITH SLASH)
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  )}
                </button>
              </div>
              
              {/* SUBMIT BUTTON */}
              <motion.button 
                whileHover={{ scale: 1.02, boxShadow: '0 10px 20px -5px rgba(56, 189, 248, 0.4)' }} 
                whileTap={{ scale: 0.98 }} 
                type="submit" disabled={loading} 
                style={{ padding: '16px', background: 'linear-gradient(135deg, #0ea5e9, #38bdf8)', color: '#0f172a', border: 'none', borderRadius: '12px', fontWeight: '800', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '10px', fontSize: '1.05rem', letterSpacing: '0.5px' }}
              >
                {loading ? 'Processing...' : (activeTab === 'login' ? 'Secure Login' : 'Apply for Access')}
              </motion.button>
            </form>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}