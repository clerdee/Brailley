import { useState, useEffect, useCallback } from 'react'; import { motion, AnimatePresence } from 'framer-motion';
import AdminSidebar from '../../components/admin/AdminSidebar'; import AdminHeader from '../../components/admin/AdminHeader';
import AdminFooter from '../../components/admin/AdminFooter'; import api from '../../services/api';
import EducatorActionModal from '../../components/admin/EducatorActionModal';
import { useAuth } from '../../context/AuthContext'; 

export default function AdminEducators() {
  const { user: currentUser } = useAuth(); 
  const [admins, setAdmins] = useState([]); const [loading, setLoading] = useState(true); 
  const [search, setSearch] = useState(''); const [isRefreshing, setIsRefreshing] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false); const [selectedEducator, setSelectedEducator] = useState(null);

  const fetchAdmins = useCallback(async (isManual = false) => {
    if (isManual) setIsRefreshing(true);
    try { const res = await api.get('/admin/users'); setAdmins(res.data.filter(u => u.role === 'admin' || u.role === 'superadmin')); } 
    catch (error) { console.error("Error fetching admins", error); } 
    finally { setLoading(false); if (isManual) setTimeout(() => setIsRefreshing(false), 800); }
  }, []);

  useEffect(() => { fetchAdmins(); }, [fetchAdmins]);

  useEffect(() => {
    const handleScrollUp = (e) => { if (window.scrollY === 0 && e.deltaY < -40 && !isRefreshing) fetchAdmins(true); };
    window.addEventListener('wheel', handleScrollUp); return () => window.removeEventListener('wheel', handleScrollUp);
  }, [isRefreshing, fetchAdmins]);

  const handleApprove = async (id) => {
    try { await api.put(`/admin/users/${id}/approve`); setAdmins(admins.map(a => a._id === id ? { ...a, isApproved: true } : a)); } 
    catch (error) { alert("Failed to approve educator."); }
  };

  const handleExport = () => {
    const headers = ['System ID,Name,Email,Role,Status,Date Registered'];
    const rows = admins.map(a => `${a._id},${a.name},${a.email},${a.role.toUpperCase()},${a.isApproved ? 'Approved' : 'Pending'},${new Date(a.createdAt).toLocaleDateString()}`);
    const csv = "data:text/csv;charset=utf-8," + [headers, ...rows].join('\n');
    const link = document.createElement("a"); link.setAttribute("href", encodeURI(csv)); 
    link.setAttribute("download", `Brailley_Educators_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
  };

  const openModal = (educator) => { setSelectedEducator(educator); setIsModalOpen(true); };
  const filtered = admins.filter(a => a.name?.toLowerCase().includes(search.toLowerCase()) || a.email?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#090d16', display: 'flex', fontFamily: '"Inter", sans-serif', position: 'relative' }}>
      
      <EducatorActionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} educator={selectedEducator} onRefresh={fetchAdmins} currentUser={currentUser} />

      <AnimatePresence>
        {isRefreshing && (
          <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 30, opacity: 1, rotate: 360 }} exit={{ y: -50, opacity: 0, transition: { duration: 0.3 } }} transition={{ duration: 0.6, ease: "easeInOut", rotate: { repeat: Infinity, duration: 0.8, ease: "linear" } }} style={{ position: 'fixed', top: 0, left: '55%', zIndex: 100, background: '#38bdf8', padding: '12px', borderRadius: '50%', boxShadow: '0 4px 20px rgba(56, 189, 248, 0.4)', color: '#0f172a', display: 'flex' }}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg></motion.div>
        )}
      </AnimatePresence>

      <AdminSidebar />
      <div style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <AdminHeader />
        <main style={{ flex: 1, padding: '3rem' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
            <div><h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#f8fafc', margin: '0 0 8px 0' }}>Educator Accounts</h1><p style={{ color: '#94a3b8', margin: 0 }}>Manage teaching staff, approve access, and export records.</p></div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <motion.button title="Force Sync" onClick={() => fetchAdmins(true)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ padding: '10px 16px', background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', border: '1px solid rgba(56,189,248,0.2)', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}><span>🔄</span> Sync</motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleExport} style={{ padding: '10px 20px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 15px rgba(16, 185, 129, 0.2)' }}><span>📥</span> Export CSV</motion.button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ background: 'rgba(30, 41, 59, 0.4)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.02)' }}><p style={{ margin: '0 0 5px 0', color: '#94a3b8', fontSize: '0.85rem', fontWeight: '600' }}>TOTAL EDUCATORS</p><h3 style={{ margin: 0, color: '#f8fafc', fontSize: '1.8rem' }}>{admins.length}</h3></div>
            <div style={{ background: 'rgba(30, 41, 59, 0.4)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.02)' }}><p style={{ margin: '0 0 5px 0', color: '#94a3b8', fontSize: '0.85rem', fontWeight: '600' }}>APPROVED</p><h3 style={{ margin: 0, color: '#34d399', fontSize: '1.8rem' }}>{admins.filter(a => a.isApproved).length}</h3></div>
            <div style={{ background: 'rgba(30, 41, 59, 0.4)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.02)' }}><p style={{ margin: '0 0 5px 0', color: '#94a3b8', fontSize: '0.85rem', fontWeight: '600' }}>PENDING VERIFICATION</p><h3 style={{ margin: 0, color: '#f59e0b', fontSize: '1.8rem' }}>{admins.filter(a => !a.isApproved).length}</h3></div>
          </div>

          <div style={{ background: 'rgba(30, 41, 59, 0.2)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '24px', padding: '2rem', backdropFilter: 'blur(10px)' }}>
            <div style={{ marginBottom: '1.5rem' }}><input type="text" placeholder="Search by name or email..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ width: '100%', maxWidth: '400px', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(148, 163, 184, 0.2)', background: 'rgba(15, 23, 42, 0.6)', color: '#f8fafc', outline: 'none', transition: 'border 0.2s' }} onFocus={(e) => e.target.style.borderColor = '#38bdf8'} onBlur={(e) => e.target.style.borderColor = 'rgba(148, 163, 184, 0.2)'}/></div>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', color: '#cbd5e1' }}>
                <thead><tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#64748b', fontSize: '0.85rem', fontWeight: '700' }}><th style={{ padding: '12px' }}>NAME</th><th style={{ padding: '12px' }}>EMAIL</th><th style={{ padding: '12px' }}>DATE REGISTERED</th><th style={{ padding: '12px', textAlign: 'center' }}>STATUS</th><th style={{ padding: '12px', textAlign: 'right' }}>ACTIONS</th></tr></thead>
                <tbody>
                  {loading ? (<tr><td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: '#38bdf8', fontWeight: '600' }}>Loading database...</td></tr>) 
                  : filtered.length === 0 ? (<tr><td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>No educator records found.</td></tr>) 
                  : (filtered.map((a) => (
                    <motion.tr initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={a._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', fontSize: '0.95rem' }}>
                      <td style={{ padding: '16px 12px', fontWeight: '700', color: '#f8fafc' }}>{a.name} {a.role === 'superadmin' && <span style={{ fontSize: '0.7rem', background: '#38bdf8', color: '#0f172a', padding: '2px 6px', borderRadius: '4px', marginLeft: '6px' }}>SUPER</span>}</td>
                      <td style={{ padding: '16px 12px', color: '#94a3b8' }}>{a.email}</td>
                      <td style={{ padding: '16px 12px' }}>{new Date(a.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                      <td style={{ padding: '16px 12px', textAlign: 'center' }}>{a.isApproved ? <span style={{ color: '#34d399', background: 'rgba(52, 211, 153, 0.1)', padding: '6px 12px', borderRadius: '30px', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase' }}>Active</span> : <span style={{ color: '#f59e0b', background: 'rgba(245, 158, 11, 0.1)', padding: '6px 12px', borderRadius: '30px', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase' }}>Pending</span>}</td>
                      <td style={{ padding: '16px 12px', textAlign: 'right', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        {!a.isApproved && currentUser?.role === 'superadmin' && <button onClick={() => handleApprove(a._id)} style={{ padding: '4px 10px', background: '#38bdf8', color: '#0f172a', border: 'none', borderRadius: '6px', fontWeight: '700', cursor: 'pointer', fontSize: '0.8rem' }}>Approve</button>}
                        <button onClick={() => openModal(a)} style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontWeight: '600', padding: '4px 8px', transition: '0.2s' }} onMouseOver={e => e.target.style.color = '#38bdf8'} onMouseOut={e => e.target.style.color = '#94a3b8'}>{currentUser?.role === 'superadmin' ? 'Modify' : 'View'}</button>
                      </td>
                    </motion.tr>
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