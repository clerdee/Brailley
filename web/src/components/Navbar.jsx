import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation(); // Para malaman kung nasa Home o About tayo

  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }} 
      animate={{ y: 0, opacity: 1 }} 
      transition={{ duration: 0.6, ease: "easeOut" }}
      style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        padding: '1.2rem 4rem', backgroundColor: 'rgba(15, 23, 42, 0.75)', 
        backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', 
        position: 'sticky', top: 0, zIndex: 50 
      }}
    >
      {/* LOGO */}
      <motion.div 
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/')} 
        style={{ fontSize: '1.8rem', fontWeight: '800', color: '#f8fafc', cursor: 'pointer', letterSpacing: '-0.5px' }}
      >
        Braill<span style={{ color: '#38bdf8' }}>ey.</span>
      </motion.div>
      
      {/* CENTER TABS (Home & About) */}
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <motion.div 
          whileHover={{ color: '#f8fafc' }}
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer', fontWeight: '600', fontSize: '1rem', color: location.pathname === '/' ? '#38bdf8' : '#94a3b8', transition: 'color 0.2s' }}
        >
          Home
        </motion.div>
        <motion.div 
          whileHover={{ color: '#f8fafc' }}
          onClick={() => navigate('/about')}
          style={{ cursor: 'pointer', fontWeight: '600', fontSize: '1rem', color: location.pathname === '/about' ? '#38bdf8' : '#94a3b8', transition: 'color 0.2s' }}
        >
          About
        </motion.div>
      </div>

      {/* RIGHT SIDE BADGE */}
      <div>
        <span style={{ padding: '6px 12px', background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.2)', borderRadius: '20px', color: '#38bdf8', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '1px' }}>
          EDUCATOR PORTAL
        </span>
      </div>
    </motion.nav>
  );
}