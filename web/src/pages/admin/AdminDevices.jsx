import { useState, useEffect, useCallback } from 'react'; import { motion } from 'framer-motion';
import AdminSidebar from '../../components/admin/AdminSidebar'; import AdminHeader from '../../components/admin/AdminHeader';
import AdminFooter from '../../components/admin/AdminFooter'; import api from '../../services/api';

export default function AdminDevices() {
  const [devices, setDevices] = useState([]); const [loading, setLoading] = useState(true); 
  const [search, setSearch] = useState(''); const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('');

  const fetchDevices = useCallback(async (isManual = false) => {
    if (isManual) setIsRefreshing(true);
    try {
      const res = await api.get('/admin/users');
      const dynamicDevices = res.data.filter(u => u.role === 'student' && u.deviceId).map((u) => {
        const isOnline = u.deviceData?.lastSync && (new Date() - new Date(u.deviceData.lastSync)) < 300000;
        return { _id: u._id, deviceId: u.deviceId, assignedStudent: u.username, status: isOnline ? 'Online' : 'Offline', battery: u.deviceData?.battery || '0%', firmware: 'v1.1.2' };
      });
      setDevices(dynamicDevices); setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) { console.error(error); } finally { setLoading(false); if (isManual) setTimeout(() => setIsRefreshing(false), 600); }
  }, []);

  useEffect(() => {
    fetchDevices(); const interval = setInterval(() => fetchDevices(), 10000);
    return () => clearInterval(interval);
  }, [fetchDevices]);

  const filtered = devices.filter(d => d.deviceId?.toLowerCase().includes(search.toLowerCase()) || d.assignedStudent?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#090d16', display: 'flex', fontFamily: '"Inter", sans-serif' }}>
      <AdminSidebar />
      <div style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <AdminHeader />
        <main style={{ flex: 1, padding: '3rem' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div>
              <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#f8fafc', margin: '0 0 8px 0' }}>Haptic Hardware Registry</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <motion.span animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#34d399', boxShadow: '0 0 10px #34d399' }} />
                <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.9rem', fontWeight: '500' }}>Live syncing active • Last updated: {lastUpdated || '...'}</p>
              </div>
            </div>
            
            <motion.button title="Force Sync" onClick={() => fetchDevices(true)} animate={{ rotate: isRefreshing ? 360 : 0 }} transition={{ duration: 0.5, ease: 'easeInOut' }} whileHover={{ scale: 1.1, backgroundColor: 'rgba(56, 189, 248, 0.2)' }} whileTap={{ scale: 0.9 }} style={{ width: '48px', height: '48px', background: 'rgba(56, 189, 248, 0.05)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.2)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
            </motion.button>
          </div>

          <div style={{ background: 'rgba(30, 41, 59, 0.2)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '24px', padding: '2rem', backdropFilter: 'blur(10px)' }}>
            <div style={{ marginBottom: '1.5rem' }}><input type="text" placeholder="Search by device hardware token or student..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ width: '100%', maxWidth: '400px', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(148, 163, 184, 0.2)', background: 'rgba(15, 23, 42, 0.6)', color: '#f8fafc', outline: 'none', transition: 'border 0.2s' }} onFocus={(e) => e.target.style.borderColor = '#38bdf8'} onBlur={(e) => e.target.style.borderColor = 'rgba(148, 163, 184, 0.2)'} /></div>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', color: '#cbd5e1' }}>
                <thead><tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#64748b', fontSize: '0.85rem', fontWeight: '700' }}><th style={{ padding: '12px' }}>DEVICE ID</th><th style={{ padding: '12px' }}>ASSIGNED STUDENT</th><th style={{ padding: '12px' }}>FIRMWARE</th><th style={{ padding: '12px' }}>BATTERY</th><th style={{ padding: '12px', textAlign: 'right' }}>NET STATUS</th></tr></thead>
                <tbody>
                  {loading ? (<tr><td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: '#38bdf8', fontWeight: '600' }}>Syncing hardware components...</td></tr>) 
                  : filtered.length === 0 ? (<tr><td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>No hardware modules tracked.</td></tr>) 
                  : filtered.map((d) => (
                    <motion.tr initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={d._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', fontSize: '0.95rem' }}>
                      <td style={{ padding: '16px 12px', color: '#38bdf8', fontFamily: 'monospace', fontWeight: '600' }}>{d.deviceId}</td>
                      <td style={{ padding: '16px 12px', fontWeight: '700', color: '#f8fafc' }}>{d.assignedStudent}</td>
                      <td style={{ padding: '16px 12px', color: '#64748b' }}>{d.firmware}</td>
                      <td style={{ padding: '16px 12px', color: d.status === 'Online' ? '#34d399' : '#64748b', fontWeight: '600' }}>{d.battery}</td>
                      <td style={{ padding: '16px 12px', textAlign: 'right' }}><span style={{ color: d.status === 'Online' ? '#34d399' : '#ef4444', background: d.status === 'Online' ? 'rgba(52, 211, 153, 0.1)' : 'rgba(239, 68, 68, 0.1)', padding: '6px 12px', borderRadius: '30px', fontSize: '0.8rem', fontWeight: '700', display: 'inline-block', minWidth: '70px', textAlign: 'center' }}>{d.status}</span></td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </main>
        <AdminFooter />
      </div>
    </div>
  );
}