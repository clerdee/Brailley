import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

export default function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();         
    navigate('/');    
  };

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: '📊' },
    { name: 'Leaderboard', path: '/admin/leaderboard', icon: '🏆' },
    { name: 'Students', path: '/admin/students', icon: '👨‍🎓' },
    { name: 'Educators', path: '/admin/educators', icon: '👩‍🏫' },
    { name: 'Haptic Devices', path: '/admin/devices', icon: '📟' },
    { name: 'Settings', path: '/admin/settings', icon: '⚙️' },
  ];

  return (
    <div style={{ width: '260px', height: '100vh', backgroundColor: '#0f172a', borderRight: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', position: 'fixed', left: 0, top: 0, zIndex: 40 }}>
      <div style={{ padding: '2rem 2rem 1.5rem', fontSize: '1.6rem', fontWeight: '900', color: '#f8fafc', letterSpacing: '-0.5px', borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
        Braill<span style={{ color: '#38bdf8' }}>ey.</span>
        <span style={{ fontSize: '0.7rem', display: 'block', color: '#64748b', fontWeight: 'bold', marginTop: '4px', letterSpacing: '1px' }}>ADMIN CONTROL</span>
      </div>

      {/* NAVIGATION ITEMS */}
      <div style={{ flex: 1, padding: '2rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <motion.div
              key={item.name} whileHover={{ x: 6, backgroundColor: 'rgba(56, 189, 248, 0.05)' }} whileTap={{ scale: 0.98 }}
              onClick={() => navigate(item.path)}
              style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 16px', borderRadius: '12px', cursor: 'pointer', color: isActive ? '#38bdf8' : '#94a3b8', backgroundColor: isActive ? 'rgba(56, 189, 248, 0.08)' : 'transparent', fontWeight: isActive ? '700' : '500', transition: 'color 0.2s' }}
            >
              <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
              <span>{item.name}</span>
            </motion.div>
          );
        })}
      </div>

      {/* LOGOUT BUTTON */}
      <div style={{ padding: '1.5rem 1rem', borderTop: '1px solid rgba(255,255,255,0.02)' }}>
        <motion.button
          whileHover={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }} 
          onClick={handleLogout} 
          style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '15px', padding: '12px 16px', borderRadius: '12px', background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontWeight: '600', textAlign: 'left', transition: 'all 0.2s' }}
        >
          <span>🚪</span> Sign Out
        </motion.button>
      </div>
    </div>
  );
}