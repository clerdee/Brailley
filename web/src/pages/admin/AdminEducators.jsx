import { useState, useEffect } from 'react'; import { motion } from 'framer-motion';
import AdminSidebar from '../../components/admin/AdminSidebar'; import AdminHeader from '../../components/admin/AdminHeader';
import AdminFooter from '../../components/admin/AdminFooter'; import api from '../../services/api';

export default function AdminEducators() {
  const [admins, setAdmins] = useState([]); const [loading, setLoading] = useState(true); const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchAdmins = async () => {
      try { const res = await api.get('/admin/users'); setAdmins(res.data.filter(u => u.role === 'admin')); } 
      catch (error) { console.error("Error fetching admins", error); } finally { setLoading(false); }
    }; fetchAdmins();
  }, []);

  const handleApprove = async (id) => {
    try { await api.put(`/admin/users/${id}/approve`); setAdmins(admins.map(a => a._id === id ? { ...a, isApproved: true } : a)); } 
    catch (error) { alert("Failed to approve educator."); }
  };

  const handleExport = () => {
    const headers = ['System ID,Name,Email,Status,Date Registered'];
    const rows = admins.map(a => `${a._id},${a.name},${a.email},${a.isApproved ? 'Approved' : 'Pending'},${new Date(a.createdAt).toLocaleDateString()}`);
    const csv = "data:text/csv;charset=utf-8," + [headers, ...rows].join('\n');
    const link = document.createElement("a"); link.setAttribute("href", encodeURI(csv)); link.setAttribute("download", "Brailley_Educators.csv");
    document.body.appendChild(link); link.click(); document.body.removeChild(link);
  };

  const filtered = admins.filter(a => a.name?.toLowerCase().includes(search.toLowerCase()) || a.email?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#090d16', display: 'flex', fontFamily: '"Inter", sans-serif' }}>
      <AdminSidebar />
      <div style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <AdminHeader />
        <main style={{ flex: 1, padding: '3rem' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
            <div><h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#f8fafc', margin: '0 0 8px 0' }}>Educator Accounts</h1><p style={{ color: '#94a3b8', margin: 0 }}>Manage, approve, and export admin profiles.</p></div>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleExport} style={{ padding: '10px 20px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', display: 'flex', gap: '8px' }}><span>📥</span> Export CSV</motion.button>
          </div>

          <div style={{ background: 'rgba(30, 41, 59, 0.2)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '24px', padding: '2rem', backdropFilter: 'blur(10px)' }}>
            <div style={{ marginBottom: '1.5rem' }}><input type="text" placeholder="Search by name or email..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ width: '100%', maxWidth: '400px', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(148, 163, 184, 0.2)', background: 'rgba(15, 23, 42, 0.6)', color: '#f8fafc', outline: 'none' }} /></div>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', color: '#cbd5e1' }}>
                <thead><tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#64748b', fontSize: '0.85rem', fontWeight: '700' }}><th style={{ padding: '12px' }}>NAME</th><th style={{ padding: '12px' }}>EMAIL</th><th style={{ padding: '12px' }}>DATE REGISTERED</th><th style={{ padding: '12px' }}>STATUS</th><th style={{ padding: '12px', textAlign: 'right' }}>ACTION</th></tr></thead>
                <tbody>
                  {loading ? (<tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: '#38bdf8' }}>Loading database...</td></tr>) 
                  : filtered.length === 0 ? (<tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>No educator records found.</td></tr>) 
                  : (filtered.map((a) => (
                    <tr key={a._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', fontSize: '0.95rem' }}>
                      <td style={{ padding: '16px 12px', fontWeight: '700', color: '#f8fafc' }}>{a.name}</td>
                      <td style={{ padding: '16px 12px', color: '#94a3b8' }}>{a.email}</td>
                      <td style={{ padding: '16px 12px' }}>{new Date(a.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                      <td style={{ padding: '16px 12px' }}>{a.isApproved ? <span style={{ color: '#34d399', background: 'rgba(52, 211, 153, 0.1)', padding: '4px 10px', borderRadius: '30px', fontSize: '0.8rem', fontWeight: '700' }}>Active</span> : <span style={{ color: '#f59e0b', background: 'rgba(245, 158, 11, 0.1)', padding: '4px 10px', borderRadius: '30px', fontSize: '0.8rem', fontWeight: '700' }}>Pending</span>}</td>
                      <td style={{ padding: '16px 12px', textAlign: 'right' }}>{!a.isApproved && <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleApprove(a._id)} style={{ padding: '6px 14px', background: '#38bdf8', color: '#0f172a', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem' }}>Approve</motion.button>}</td>
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