import { useState, useEffect } from 'react'; import { motion } from 'framer-motion';
import AdminSidebar from '../../components/admin/AdminSidebar'; import AdminHeader from '../../components/admin/AdminHeader';
import AdminFooter from '../../components/admin/AdminFooter'; import api from '../../services/api';

export default function AdminStudents() {
  const [students, setStudents] = useState([]); const [loading, setLoading] = useState(true); const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try { const res = await api.get('/admin/users'); setStudents(res.data.filter(u => u.role === 'student')); } 
      catch (error) { console.error("Error fetching students", error); } finally { setLoading(false); }
    }; fetchStudents();
  }, []);

  const handleExport = () => {
    const headers = ['System ID,Username,Device ID,Registration Date'];
    const rows = students.map(s => `${s._id},${s.username},${s.deviceId},${new Date(s.createdAt).toLocaleDateString()}`);
    const csv = "data:text/csv;charset=utf-8," + [headers, ...rows].join('\n');
    const link = document.createElement("a"); link.setAttribute("href", encodeURI(csv)); link.setAttribute("download", "Brailley_Students.csv");
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
  };

  const filtered = students.filter(s => s.username?.toLowerCase().includes(search.toLowerCase()) || s.deviceId?.includes(search));

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#090d16', display: 'flex', fontFamily: '"Inter", sans-serif' }}>
      <AdminSidebar />
      <div style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <AdminHeader />
        <main style={{ flex: 1, padding: '3rem' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
            <div><h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#f8fafc', margin: '0 0 8px 0' }}>Student Database</h1><p style={{ color: '#94a3b8', margin: 0 }}>Manage and export registered mobile application users.</p></div>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleExport} style={{ padding: '10px 20px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', display: 'flex', gap: '8px' }}><span>📥</span> Export CSV</motion.button>
          </div>

          <div style={{ background: 'rgba(30, 41, 59, 0.2)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '24px', padding: '2rem', backdropFilter: 'blur(10px)' }}>
            <div style={{ marginBottom: '1.5rem' }}><input type="text" placeholder="Search by username or device ID..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ width: '100%', maxWidth: '400px', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(148, 163, 184, 0.2)', background: 'rgba(15, 23, 42, 0.6)', color: '#f8fafc', outline: 'none' }} /></div>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', color: '#cbd5e1' }}>
                <thead><tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#64748b', fontSize: '0.85rem', fontWeight: '700' }}><th style={{ padding: '12px' }}>USERNAME</th><th style={{ padding: '12px' }}>DEVICE ID</th><th style={{ padding: '12px' }}>DATE REGISTERED</th><th style={{ padding: '12px', textAlign: 'right' }}>STATUS</th></tr></thead>
                <tbody>
                  {loading ? (<tr><td colSpan="4" style={{ textAlign: 'center', padding: '2rem', color: '#38bdf8' }}>Loading database...</td></tr>) 
                  : filtered.length === 0 ? (<tr><td colSpan="4" style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>No student records found.</td></tr>) 
                  : (filtered.map((s) => (
                    <tr key={s._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', fontSize: '0.95rem' }}>
                      <td style={{ padding: '16px 12px', fontWeight: '700', color: '#f8fafc' }}>{s.username}</td>
                      <td style={{ padding: '16px 12px', color: '#94a3b8', fontFamily: 'monospace' }}>{s.deviceId}</td>
                      <td style={{ padding: '16px 12px' }}>{new Date(s.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                      <td style={{ padding: '16px 12px', textAlign: 'right' }}><span style={{ color: '#34d399', background: 'rgba(52, 211, 153, 0.1)', padding: '4px 10px', borderRadius: '30px', fontSize: '0.8rem', fontWeight: '700' }}>Active</span></td>
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