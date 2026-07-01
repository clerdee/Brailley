import { useState, useEffect } from 'react'; import { motion, AnimatePresence } from 'framer-motion';
import api from '../../services/api';

export default function EducatorActionModal({ isOpen, onClose, educator, onRefresh, currentUser }) {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(false);
  
  // Base on your backend, the first registered admin has 'superadmin' role, 
  // or you can check if they are the one who approved others. Let's assume currentUser.role === 'superadmin'
  const isSuperAdmin = currentUser?.role === 'superadmin'; 

  useEffect(() => { if (educator) setFormData({ name: educator.name || '', email: educator.email || '' }); }, [educator]);

  const handleSubmit = async (e) => {
    e.preventDefault(); if (!isSuperAdmin) return;
    setLoading(true);
    try { await api.put(`/admin/users/${educator._id}`, formData); onRefresh(true); onClose(); } 
    catch (err) { alert('Failed to update educator.'); } finally { setLoading(false); }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(9, 13, 22, 0.8)', backdropFilter: 'blur(5px)' }} />
          <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} style={{ position: 'relative', background: '#1e293b', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '2.5rem', width: '100%', maxWidth: '420px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <h3 style={{ margin: 0, color: '#f8fafc', fontSize: '1.4rem', fontWeight: '800' }}>{isSuperAdmin ? 'Modify Educator' : 'Educator Details'}</h3>
                {!isSuperAdmin && <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: '#f59e0b', fontWeight: '600' }}>🔒 View Only Mode</p>}
              </div>
              <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#64748b', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1.2rem' }}>
                <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '8px', fontWeight: '600' }}>Full Name</label>
                <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} disabled={!isSuperAdmin} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(148, 163, 184, 0.2)', background: isSuperAdmin ? 'rgba(15, 23, 42, 0.6)' : 'transparent', color: isSuperAdmin ? '#f8fafc' : '#94a3b8', outline: 'none', cursor: isSuperAdmin ? 'text' : 'not-allowed' }} />
              </div>
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '8px', fontWeight: '600' }}>Email Address</label>
                <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} disabled={!isSuperAdmin} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(148, 163, 184, 0.2)', background: isSuperAdmin ? 'rgba(15, 23, 42, 0.6)' : 'transparent', color: isSuperAdmin ? '#f8fafc' : '#94a3b8', outline: 'none', cursor: isSuperAdmin ? 'text' : 'not-allowed' }} />
              </div>
              
              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="button" onClick={onClose} style={{ flex: 1, padding: '12px', background: 'transparent', color: '#94a3b8', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '12px', fontWeight: '600', cursor: 'pointer' }}>{isSuperAdmin ? 'Cancel' : 'Close'}</button>
                {isSuperAdmin && <button type="submit" disabled={loading} style={{ flex: 1, padding: '12px', background: '#38bdf8', color: '#0f172a', border: 'none', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>{loading ? 'Saving...' : 'Save Changes'}</button>}
              </div>
            </form>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}