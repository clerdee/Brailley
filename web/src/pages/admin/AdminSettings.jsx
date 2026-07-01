import { useState } from 'react'; import { motion } from 'framer-motion';
import AdminSidebar from '../../components/admin/AdminSidebar'; import AdminHeader from '../../components/admin/AdminHeader';
import AdminFooter from '../../components/admin/AdminFooter'; import { useAuth } from '../../context/AuthContext';

export default function AdminSettings() {
  const { user } = useAuth(); const [tab, setTab] = useState('profile');
  const [syncAlert, setSyncAlert] = useState(true); const [hapticLevel, setHapticLevel] = useState('Medium');

  const handleSave = (e) => { e.preventDefault(); alert('Profile updated successfully!'); /* Dito natin ikakabit ang API update sa susunod */ };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#090d16', display: 'flex', fontFamily: '"Inter", sans-serif' }}>
      <AdminSidebar />
      <div style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <AdminHeader />
        <main style={{ flex: 1, padding: '3rem' }}>
          
          <div style={{ marginBottom: '2.5rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#f8fafc', margin: '0 0 8px 0' }}>System Preferences</h1>
            <p style={{ color: '#94a3b8', margin: 0 }}>Configure your educator profile and global haptic module parameters.</p>
          </div>
          
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
            {/* SETTINGS SIDEBAR TABS */}
            <div style={{ width: '250px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['profile', 'hardware', 'notifications'].map(t => (
                <motion.button key={t} whileHover={{ x: 4 }} onClick={() => setTab(t)} style={{ padding: '14px 20px', textAlign: 'left', background: tab === t ? 'rgba(56, 189, 248, 0.1)' : 'transparent', color: tab === t ? '#38bdf8' : '#94a3b8', border: 'none', borderRadius: '12px', fontWeight: '600', cursor: 'pointer', textTransform: 'capitalize', transition: '0.2s' }}>
                  {t} Settings
                </motion.button>
              ))}
            </div>

            {/* SETTINGS CONTENT PANEL */}
            <div style={{ flex: 1, background: 'rgba(30, 41, 59, 0.2)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '24px', padding: '2.5rem', backdropFilter: 'blur(10px)' }}>
              
              {tab === 'profile' && (
                <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={handleSave}>
                  <h3 style={{ color: '#f8fafc', margin: '0 0 1.5rem 0', fontSize: '1.2rem' }}>Educator Account</h3>
                  <div style={{ marginBottom: '1.5rem' }}><label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '8px', fontWeight: '600' }}>Full Name</label><input type="text" defaultValue={user?.name || ''} placeholder="Juan Dela Cruz" style={{ width: '100%', maxWidth: '400px', padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(148,163,184,0.2)', background: 'rgba(15,23,42,0.6)', color: '#fff', outline: 'none' }} /></div>
                  <div style={{ marginBottom: '2.5rem' }}><label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '8px', fontWeight: '600' }}>Email Address</label><input type="email" defaultValue={user?.email || ''} placeholder="educator@brailley.com" style={{ width: '100%', maxWidth: '400px', padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(148,163,184,0.2)', background: 'rgba(15,23,42,0.6)', color: '#fff', outline: 'none' }} /></div>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} type="submit" style={{ padding: '12px 24px', background: '#38bdf8', color: '#0f172a', border: 'none', borderRadius: '10px', fontWeight: '700', cursor: 'pointer' }}>Save Changes</motion.button>
                </motion.form>
              )}

              {tab === 'hardware' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h3 style={{ color: '#f8fafc', margin: '0 0 1.5rem 0', fontSize: '1.2rem' }}>Haptic Device Defaults</h3>
                  <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', background: 'rgba(15,23,42,0.4)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.02)' }}>
                    <div><p style={{ margin: '0 0 6px 0', color: '#f8fafc', fontWeight: '700' }}>Global Vibration Intensity</p><p style={{ margin: 0, color: '#64748b', fontSize: '0.85rem', maxWidth: '300px' }}>Set the default physical feedback strength for students using the mobile learning app.</p></div>
                    <select value={hapticLevel} onChange={e => setHapticLevel(e.target.value)} style={{ padding: '10px 16px', borderRadius: '10px', background: '#1e293b', color: '#fff', border: '1px solid rgba(255,255,255,0.1)', outline: 'none', cursor: 'pointer', fontWeight: '600' }}><option>Low (Power Save)</option><option>Medium (Default)</option><option>High (Strong)</option></select>
                  </div>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ padding: '12px 24px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '700', cursor: 'pointer' }}>Update Hardware Settings</motion.button>
                </motion.div>
              )}

              {tab === 'notifications' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h3 style={{ color: '#f8fafc', margin: '0 0 1.5rem 0', fontSize: '1.2rem' }}>Telemetry Alerts</h3>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem', background: 'rgba(15,23,42,0.4)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.02)', cursor: 'pointer' }} onClick={() => setSyncAlert(!syncAlert)}>
                    <div><p style={{ margin: '0 0 6px 0', color: '#f8fafc', fontWeight: '700' }}>Low Battery Warnings</p><p style={{ margin: 0, color: '#64748b', fontSize: '0.85rem' }}>Get dashboard alerts when a student device drops below 15%.</p></div>
                    <div style={{ width: '46px', height: '24px', background: syncAlert ? '#38bdf8' : '#334155', borderRadius: '20px', position: 'relative', transition: '0.3s' }}><div style={{ width: '20px', height: '20px', background: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', left: syncAlert ? '24px' : '2px', transition: '0.3s', boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }} /></div>
                  </div>
                </motion.div>
              )}

            </div>
          </div>

        </main>
        <AdminFooter />
      </div>
    </div>
  );
}