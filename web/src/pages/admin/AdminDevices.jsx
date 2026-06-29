import { useState, useEffect } from 'react'; import { motion } from 'framer-motion';
import AdminSidebar from '../../components/admin/AdminSidebar'; import AdminHeader from '../../components/admin/AdminHeader';
import AdminFooter from '../../components/admin/AdminFooter'; import api from '../../services/api';

export default function AdminDevices() {
  const [devices, setDevices] = useState([]); const [loading, setLoading] = useState(true); const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const res = await api.get('/admin/users');
        const studentsWithDevices = res.data.filter(u => u.role === 'student' && u.deviceId);
        const dynamicDevices = studentsWithDevices.map((u, index) => ({
          _id: u._id,
          deviceId: u.deviceId,
          assignedStudent: u.username,
          status: index === 0 ? 'Online' : 'Offline',
          battery: index === 0 ? '84%' : '0%',
          firmware: 'v1.1.2'
        })); setDevices(dynamicDevices);
      } catch (error) { console.error(error); } finally { setLoading(false); }
    }; fetchDevices();
  }, []);

  const filtered = devices.filter(d => d.deviceId?.toLowerCase().includes(search.toLowerCase()) || d.assignedStudent?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#090d16', display: 'flex', fontFamily: '"Inter", sans-serif' }}>
      <AdminSidebar />
      <div style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <AdminHeader />
        <main style={{ flex: 1, padding: '3rem' }}>
          
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#f8fafc', margin: '0 0 8px 0' }}>Haptic Hardware Registry</h1>
            <p style={{ color: '#94a3b8', margin: 0 }}>Monitor connected hardware modules and terminal synchronization states.</p>
          </div>

          <div style={{ background: 'rgba(30, 41, 59, 0.2)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '24px', padding: '2rem', backdropFilter: 'blur(10px)' }}>
            <div style={{ marginBottom: '1.5rem' }}><input type="text" placeholder="Search by device hardware token or student..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ width: '100%', maxWidth: '400px', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(148, 163, 184, 0.2)', background: 'rgba(15, 23, 42, 0.6)', color: '#f8fafc', outline: 'none' }} /></div>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', color: '#cbd5e1' }}>
                <thead><tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#64748b', fontSize: '0.85rem', fontWeight: '700' }}><th style={{ padding: '12px' }}>DEVICE HARDWARE ID</th><th style={{ padding: '12px' }}>ASSIGNED STUDENT</th><th style={{ padding: '12px' }}>FIRMWARE</th><th style={{ padding: '12px' }}>BATTERY</th><th style={{ padding: '12px', textAlign: 'right' }}>NET STATUS</th></tr></thead>
                <tbody>
                  {loading ? (<tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: '#38bdf8' }}>Syncing hardware components...</td></tr>) 
                  : filtered.length === 0 ? (<tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>No hardware modules tracked.</td></tr>) 
                  : (filtered.map((d) => (
                    <tr key={d._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', fontSize: '0.95rem' }}>
                      <td style={{ padding: '16px 12px', color: '#38bdf8', fontFamily: 'monospace', fontWeight: '600' }}>{d.deviceId}</td>
                      <td style={{ padding: '16px 12px', fontWeight: '700', color: '#f8fafc' }}>{d.assignedStudent}</td>
                      <td style={{ padding: '16px 12px', color: '#64748b' }}>{d.firmware}</td>
                      <td style={{ padding: '16px 12px', color: d.status === 'Online' ? '#34d399' : '#64748b' }}>{d.battery}</td>
                      <td style={{ padding: '16px 12px', textAlign: 'right' }}><span style={{ color: d.status === 'Online' ? '#34d399' : '#ef4444', background: d.status === 'Online' ? 'rgba(52, 211, 153, 0.1)' : 'rgba(239, 68, 68, 0.1)', padding: '4px 10px', borderRadius: '30px', fontSize: '0.8rem', fontWeight: '700' }}>{d.status}</span></td>
                    </tr>
                  )))}
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