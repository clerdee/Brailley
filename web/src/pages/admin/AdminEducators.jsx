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

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#090d16', display: 'flex', fontFamily: '"Inter", sans-serif' }}>
      <EducatorActionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} educator={selected} onRefresh={fetchAdmins} currentUser={currentUser} />
      <AdminSidebar />
      <div style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column' }}>
        <AdminHeader />
        <main style={{ padding: '3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
            <div><h1 style={{ color: '#fff', fontSize: '2rem', fontWeight: '800' }}>Educator Accounts</h1><p style={{ color: '#64748b' }}>Manage teaching staff and access control.</p></div>
          </div>
          <div style={{ background: 'rgba(30,41,59,0.2)', borderRadius: '24px', padding: '2rem', border: '1px solid rgba(255,255,255,0.03)' }}>
            <input placeholder="Search admins..." onChange={(e) => setSearch(e.target.value)} style={{ width: '100%', marginBottom: '1.5rem', padding: '12px', borderRadius: '12px', background: '#0f172a', border: '1px solid #334155', color: '#fff' }} />
            <table style={{ width: '100%', borderCollapse: 'collapse', color: '#cbd5e1' }}>
              <thead><tr style={{ color: '#64748b', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                <th style={{ padding: '12px', textAlign: 'left' }}>Name</th><th style={{ padding: '12px' }}>Role</th><th style={{ padding: '12px' }}>Status</th><th style={{ padding: '12px', textAlign: 'right' }}>Actions</th>
              </tr></thead>
              <tbody>
                {admins.filter(a => a.name.toLowerCase().includes(search.toLowerCase())).map(a => (
                  <tr key={a._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '16px', fontWeight: '600' }}>{a.name}</td>
                    <td style={{ padding: '16px' }}>{a.role.toUpperCase()}</td>
                    <td style={{ padding: '16px' }}><span style={{ color: a.isApproved ? '#34d399' : '#f59e0b', fontSize: '0.7rem', fontWeight: 'bold' }}>{a.isApproved ? 'ACTIVE' : 'PENDING'}</span></td>
                    <td style={{ padding: '16px', textAlign: 'right', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      {!a.isApproved && currentUser?.role === 'superadmin' && <button onClick={() => api.put(`/admin/users/${a._id}/approve`).then(() => fetchAdmins())} style={{ background: '#38bdf8', border: 'none', padding: '4px 10px', borderRadius: '6px', fontSize: '0.7rem', fontWeight: '800' }}>Approve</button>}
                      <button onClick={() => { setSelected(a); setIsModalOpen(true); }} style={{ background: 'transparent', border: 'none', color: '#38bdf8', fontWeight: '700', cursor: 'pointer' }}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
}