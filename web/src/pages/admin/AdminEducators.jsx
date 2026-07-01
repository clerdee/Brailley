import { useState, useEffect, useCallback } from 'react'; import { motion, AnimatePresence } from 'framer-motion';
import AdminSidebar from '../../components/admin/AdminSidebar'; import AdminHeader from '../../components/admin/AdminHeader';
import AdminFooter from '../../components/admin/AdminFooter'; import EducatorActionModal from '../../components/admin/EducatorActionModal';
import api from '../../services/api'; import { useAuth } from '../../context/AuthContext';

export default function AdminEducators() {
  const { user: currentUser } = useAuth();
  const [admins, setAdmins] = useState([]); const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(''); const [isRefreshing, setIsRefreshing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); const [selected, setSelected] = useState(null);

  const fetchAdmins = useCallback(async (manual = false) => {
    if (manual) setIsRefreshing(true);
    try { const res = await api.get('/admin/users'); setAdmins(res.data.filter(u => ['admin', 'superadmin'].includes(u.role))); }
    catch (e) { console.error(e); } finally { setLoading(false); if (manual) setTimeout(() => setIsRefreshing(false), 800); }
  }, []);

  useEffect(() => { fetchAdmins(); const scroll = (e) => { if (window.scrollY === 0 && e.deltaY < -40 && !isRefreshing) fetchAdmins(true); };
    window.addEventListener('wheel', scroll); return () => window.removeEventListener('wheel', scroll);
  }, [isRefreshing, fetchAdmins]);

  const handleExport = () => {
    const csv = "data:text/csv;charset=utf-8," + [['System ID,Name,Email,Role,Status'], ...admins.map(a => `${a._id},${a.name},${a.email},${a.role.toUpperCase()},${a.isApproved ? 'Active' : 'Pending'}`)].join('\n');
    const link = document.createElement("a"); link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", `Brailley_Educators_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#090d16', display: 'flex', fontFamily: '"Inter", sans-serif' }}>
      <EducatorActionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} educator={selected} onRefresh={fetchAdmins} />
      
      <AnimatePresence>
        {isRefreshing && (
          <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 30, opacity: 1, rotate: 360 }} exit={{ y: -50, opacity: 0 }} transition={{ duration: 0.6, ease: "easeInOut", rotate: { repeat: Infinity, duration: 0.8, ease: "linear" } }} style={{ position: 'fixed', top: 0, left: '55%', zIndex: 100, background: '#38bdf8', padding: '12px', borderRadius: '50%', boxShadow: '0 4px 20px rgba(56, 189, 248, 0.4)', color: '#0f172a', display: 'flex' }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg></motion.div>
        )}
      </AnimatePresence>

      <AdminSidebar />
      <div style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column' }}>
        <AdminHeader />
        {/* Adjusted padding top for closer spacing to title */}
        <main style={{ padding: '2rem 3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
            <div><h1 style={{ color: '#fff', fontSize: '2rem', fontWeight: '800', margin: 0 }}>Educator Accounts</h1><p style={{ color: '#64748b', marginTop: '8px' }}>Manage staff access and system permissions.</p></div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <motion.button onClick={() => fetchAdmins(true)} animate={{ rotate: isRefreshing ? 360 : 0 }} transition={{ duration: 0.8 }} style={{ width: '45px', height: '45px', background: 'rgba(56,189,248,0.1)', color: '#38bdf8', border: '1px solid rgba(56,189,248,0.2)', borderRadius: '10px', cursor: 'pointer', display: 'grid', placeItems: 'center' }}>🔄</motion.button>
              <motion.button whileHover={{ scale: 1.05 }} onClick={handleExport} style={{ padding: '10px 16px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '700', cursor: 'pointer' }}>📥 Export CSV</motion.button>
            </div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
            {[{l:'TOTAL', v:admins.length, c:'#f8fafc'}, {l:'APPROVED', v:admins.filter(a=>a.isApproved).length, c:'#34d399'}, {l:'PENDING', v:admins.filter(a=>!a.isApproved).length, c:'#f59e0b'}].map((s, i) => (
              <div key={i} style={{ background: 'rgba(30,41,59,0.3)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <p style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: '800' }}>{s.l}</p><h3 style={{ fontSize: '1.8rem', color: s.c, margin: '5px 0 0' }}>{s.v}</h3>
              </div>
            ))}
          </div>

          <div style={{ background: 'rgba(30,41,59,0.2)', borderRadius: '24px', padding: '2rem', border: '1px solid rgba(255,255,255,0.03)' }}>
            <input placeholder="Search educator name..." onChange={(e) => setSearch(e.target.value)} style={{ width: '350px', marginBottom: '2rem', padding: '12px 16px', borderRadius: '12px', background: '#0f172a', border: '1px solid #334155', color: '#fff', fontSize: '0.9rem' }} />
            <table style={{ width: '100%', borderCollapse: 'collapse', color: '#cbd5e1' }}>
              <thead><tr style={{ color: '#64748b', fontSize: '0.7rem', textTransform: 'uppercase', borderBottom: '1px solid #1e293b' }}>
                <th style={{ padding: '12px', textAlign: 'left' }}>Educator Name</th><th style={{ padding: '12px' }}>Role Level</th><th style={{ padding: '12px' }}>Access Status</th><th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
              </tr></thead>
              <tbody>
                {admins.filter(a => a.name.toLowerCase().includes(search.toLowerCase())).map((a, idx) => (
                  <tr key={a._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                    <td style={{ padding: '16px', fontWeight: '600' }}>{a.name}</td>
                    <td style={{ padding: '16px', color: '#94a3b8' }}>{a.role.toUpperCase()}</td>
                    <td style={{ padding: '16px' }}><span style={{ color: a.isApproved ? '#34d399' : '#f59e0b', fontSize: '0.7rem', fontWeight: '800', background: a.isApproved ? 'rgba(52,211,153,0.1)' : 'rgba(245,158,11,0.1)', padding: '4px 10px', borderRadius: '6px' }}>{a.isApproved ? 'ACTIVE' : 'PENDING'}</span></td>
                    <td style={{ padding: '16px', textAlign: 'right', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      {!a.isApproved && currentUser?.role === 'superadmin' && <button onClick={() => api.put(`/admin/users/${a._id}/approve`).then(() => fetchAdmins())} style={{ background: '#38bdf8', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: '800', color: '#0f172a', cursor: 'pointer' }}>APPROVE</button>}
                      <button onClick={() => { setSelected(a); setIsModalOpen(true); }} style={{ background: 'transparent', border: '1px solid #334155', color: '#94a3b8', padding: '6px 12px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: '700', cursor: 'pointer' }}>VIEW</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ marginTop: '1.5rem', color: '#64748b', fontSize: '0.8rem', textAlign: 'right' }}>Showing {admins.length} entries</div>
          </div>
        </main>
        <AdminFooter />
      </div>
    </div>
  );
}