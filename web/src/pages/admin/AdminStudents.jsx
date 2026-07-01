import { useState, useEffect, useCallback } from 'react'; import { motion, AnimatePresence } from 'framer-motion';
import AdminSidebar from '../../components/admin/AdminSidebar'; import AdminHeader from '../../components/admin/AdminHeader';
import AdminFooter from '../../components/admin/AdminFooter'; import api from '../../services/api';
import StudentEditModal from '../../components/admin/StudentEditModal'; 

export default function AdminStudents() {
  const [students, setStudents] = useState([]); const [loading, setLoading] = useState(true); 
  const [search, setSearch] = useState(''); const [isRefreshing, setIsRefreshing] = useState(false);
  
  // MODAL STATES
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const fetchStudents = useCallback(async (isManual = false) => {
    if (isManual) setIsRefreshing(true);
    try { const res = await api.get('/admin/users'); setStudents(res.data.filter(u => u.role === 'student')); } 
    catch (error) { console.error("Error fetching students", error); } 
    finally { setLoading(false); if (isManual) setTimeout(() => setIsRefreshing(false), 800); }
  }, []);

  useEffect(() => { fetchStudents(); }, [fetchStudents]);

  useEffect(() => {
    const handleScrollUp = (e) => { if (window.scrollY === 0 && e.deltaY < -40 && !isRefreshing) fetchStudents(true); };
    window.addEventListener('wheel', handleScrollUp);
    return () => window.removeEventListener('wheel', handleScrollUp);
  }, [isRefreshing, fetchStudents]);

  const handleExport = () => {
    const headers = ['System ID,Username,Device ID,Registration Date,Last Sync'];
    const rows = students.map(s => `${s._id},${s.username},${s.deviceId || 'Unassigned'},${new Date(s.createdAt).toLocaleDateString()},${s.deviceData?.lastSync ? new Date(s.deviceData.lastSync).toLocaleString() : 'N/A'}`);
    const csv = "data:text/csv;charset=utf-8," + [headers, ...rows].join('\n');
    const link = document.createElement("a"); link.setAttribute("href", encodeURI(csv)); 
    link.setAttribute("download", `Brailley_Students_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
  };

  const openEditModal = (student) => { setSelectedStudent(student); setIsModalOpen(true); };

  const filtered = students.filter(s => s.username?.toLowerCase().includes(search.toLowerCase()) || s.deviceId?.includes(search));

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#090d16', display: 'flex', fontFamily: '"Inter", sans-serif', position: 'relative' }}>
      
      <StudentEditModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} student={selectedStudent} onRefresh={fetchStudents} />

      <AnimatePresence>
        {isRefreshing && (
          <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 30, opacity: 1, rotate: 360 }} exit={{ y: -50, opacity: 0, transition: { duration: 0.3 } }} transition={{ duration: 0.6, ease: "easeInOut", rotate: { repeat: Infinity, duration: 0.8, ease: "linear" } }} style={{ position: 'fixed', top: 0, left: '55%', zIndex: 100, background: '#38bdf8', padding: '12px', borderRadius: '50%', boxShadow: '0 4px 20px rgba(56, 189, 248, 0.4)', color: '#0f172a', display: 'flex' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
          </motion.div>
        )}
      </AnimatePresence>

      <AdminSidebar />
      <div style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <AdminHeader />
        <main style={{ flex: 1, padding: '3rem' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
            <div><h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#f8fafc', margin: '0 0 8px 0' }}>Student Database</h1><p style={{ color: '#94a3b8', margin: 0 }}>Manage users, export records, and monitor registration states.</p></div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <motion.button title="Force Sync" onClick={() => fetchStudents(true)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ padding: '10px 16px', background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', border: '1px solid rgba(56,189,248,0.2)', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}><span>🔄</span> Sync</motion.button>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleExport} style={{ padding: '10px 20px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 15px rgba(16, 185, 129, 0.2)' }}><span>📥</span> Export CSV</motion.button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ background: 'rgba(30, 41, 59, 0.4)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.02)' }}><p style={{ margin: '0 0 5px 0', color: '#94a3b8', fontSize: '0.85rem', fontWeight: '600' }}>TOTAL STUDENTS</p><h3 style={{ margin: 0, color: '#f8fafc', fontSize: '1.8rem' }}>{students.length}</h3></div>
            <div style={{ background: 'rgba(30, 41, 59, 0.4)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.02)' }}><p style={{ margin: '0 0 5px 0', color: '#94a3b8', fontSize: '0.85rem', fontWeight: '600' }}>ACTIVE DEVICES</p><h3 style={{ margin: 0, color: '#34d399', fontSize: '1.8rem' }}>{students.filter(s => s.deviceId).length}</h3></div>
            <div style={{ background: 'rgba(30, 41, 59, 0.4)', padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.02)' }}><p style={{ margin: '0 0 5px 0', color: '#94a3b8', fontSize: '0.85rem', fontWeight: '600' }}>NEW THIS WEEK</p><h3 style={{ margin: 0, color: '#38bdf8', fontSize: '1.8rem' }}>{students.filter(s => (new Date() - new Date(s.createdAt)) < 604800000).length}</h3></div>
          </div>

          <div style={{ background: 'rgba(30, 41, 59, 0.2)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '24px', padding: '2rem', backdropFilter: 'blur(10px)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <input type="text" placeholder="Search by username or device ID..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ width: '100%', maxWidth: '400px', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(148, 163, 184, 0.2)', background: 'rgba(15, 23, 42, 0.6)', color: '#f8fafc', outline: 'none', transition: 'border 0.2s' }} onFocus={(e) => e.target.style.borderColor = '#38bdf8'} onBlur={(e) => e.target.style.borderColor = 'rgba(148, 163, 184, 0.2)'}/>
            </div>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', color: '#cbd5e1' }}>
                <thead><tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#64748b', fontSize: '0.85rem', fontWeight: '700' }}><th style={{ padding: '12px' }}>USERNAME</th><th style={{ padding: '12px' }}>DEVICE ID</th><th style={{ padding: '12px' }}>DATE REGISTERED</th><th style={{ padding: '12px', textAlign: 'center' }}>STATUS</th><th style={{ padding: '12px', textAlign: 'right' }}>ACTIONS</th></tr></thead>
                <tbody>
                  {loading ? (<tr><td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: '#38bdf8', fontWeight: '600' }}>Loading database...</td></tr>) 
                  : filtered.length === 0 ? (<tr><td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>No student records found.</td></tr>) 
                  : (filtered.map((s) => (
                    <motion.tr initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={s._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', fontSize: '0.95rem' }}>
                      <td style={{ padding: '16px 12px', fontWeight: '700', color: '#f8fafc' }}>{s.username}</td>
                      <td style={{ padding: '16px 12px', color: s.deviceId ? '#94a3b8' : '#ef4444', fontFamily: 'monospace' }}>{s.deviceId || 'Unassigned'}</td>
                      <td style={{ padding: '16px 12px' }}>{new Date(s.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                      <td style={{ padding: '16px 12px', textAlign: 'center' }}><span style={{ color: '#34d399', background: 'rgba(52, 211, 153, 0.1)', padding: '6px 12px', borderRadius: '30px', fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase' }}>Active</span></td>
                      <td style={{ padding: '16px 12px', textAlign: 'right' }}>
                        <button style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', fontWeight: '600', padding: '4px 8px', transition: '0.2s' }} onMouseOver={e => e.target.style.color = '#38bdf8'} onMouseOut={e => e.target.style.color = '#94a3b8'} onClick={() => openEditModal(s)}>View</button>
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