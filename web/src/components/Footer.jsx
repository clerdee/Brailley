import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer style={{ backgroundColor: '#0f172a', padding: '2rem 4rem', borderTop: '1px solid #1e293b', textAlign: 'center', color: '#64748b', fontSize: '0.9rem', position: 'relative', zIndex: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1600px', margin: '0 auto', flexWrap: 'wrap', gap: '1rem' }}>
        
        <p style={{ margin: 0, fontWeight: '500' }}>&copy; {new Date().getFullYear()} Brailley Platform. All rights reserved.</p>
        
        <div style={{ display: 'flex', gap: '2rem', fontWeight: '600' }}>
          <motion.span whileHover={{ color: '#38bdf8', y: -2 }} onClick={() => navigate('/')} style={{ cursor: 'pointer', transition: 'color 0.2s' }}>Home</motion.span>
          <motion.span whileHover={{ color: '#38bdf8', y: -2 }} onClick={() => navigate('/about')} style={{ cursor: 'pointer', transition: 'color 0.2s' }}>About Us</motion.span>
        </div>

      </div>
    </footer>
  );
}