import { useState, useEffect } from 'react'; import { motion, AnimatePresence } from 'framer-motion';
import api from '../../services/api';

export default function StudentEditModal({ isOpen, onClose, student, onRefresh }) {
  const [formData, setFormData] = useState({ username: '', deviceId: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => { if (student) setFormData({ username: student.username || '', deviceId: student.deviceId || '' }); }, [student]);

  const handleSubmit = async (e) => {
    e.preventDefault(); setLoading(true);
    try {
      await api.put(`/admin/users/${student._id}`, formData);
      onRefresh(true); 
      onClose();
    } catch (err) { 
      console.error(err); alert('Failed to update student details.'); 
    } finally { setLoading(false); }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(9, 13, 22, 0.8)', backdropFilter: 'blur(5px)' }} />
          <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} style={{ position: 'relative', background: '#1e293b', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '2.5rem', width: '100%', maxWidth: '420px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0, color: '#f8fafc', fontSize: '1.4rem', fontWeight: '800' }}>Edit Student</h3>
              <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: '#64748b', fontSize: '1.5rem', cursor: 'pointer' }}>&times;</button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1.2rem' }}>
                <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '8px', fontWeight: '600' }}>Username</label>
                <input type="text" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(148, 163, 184, 0.2)', background: 'rgba(15, 23, 42, 0.6)', color: '#f8fafc', outline: 'none' }} required />
              </div>
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '8px', fontWeight: '600' }}>Hardware Token (Device ID)</label>
                <input type="text" value={formData.deviceId} onChange={e => setFormData({...formData, deviceId: e.target.value})} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid rgba(148, 163, 184, 0.2)', background: 'rgba(15, 23, 42, 0.6)', color: '#f8fafc', outline: 'none', fontFamily: 'monospace' }} placeholder="Unassigned" />
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="button" onClick={onClose} style={{ flex: 1, padding: '12px', background: 'transparent', color: '#94a3b8', border: '1px solid rgba(148, 163, 184, 0.2)', borderRadius: '12px', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" disabled={loading} style={{ flex: 1, padding: '12px', background: '#38bdf8', color: '#0f172a', border: 'none', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', opacity: loading ? 0.7 : 1 }}>{loading ? 'Saving...' : 'Save Changes'}</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}