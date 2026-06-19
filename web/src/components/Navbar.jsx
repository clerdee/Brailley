import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 4rem', backgroundColor: '#0f172a', borderBottom: '1px solid #1e293b', position: 'sticky', top: 0, zIndex: 50 }}
    >
      <div 
        onClick={() => navigate('/')} 
        style={{ fontSize: '1.8rem', fontWeight: '800', color: '#f8fafc', cursor: 'pointer', letterSpacing: '-0.5px' }}
      >
        Braill<span style={{ color: '#38bdf8' }}>ey.</span>
      </div>
      
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
        <button onClick={() => navigate('/login')} style={{ padding: '10px 24px', fontSize: '0.95rem', background: '#38bdf8', color: '#0f172a', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '700', transition: '0.2s' }}>
          Admin Portal
        </button>
      </div>
    </motion.nav>
  );
}