import { motion, AnimatePresence } from 'framer-motion';

export default function StudentEditModal({ isOpen, onClose, student }) {
  if (!student) return null;

  const Field = ({ label, value, icon, flex = 1, color = '#94a3b8' }) => (
    <div style={{ flex, minWidth: '150px' }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.65rem', fontWeight: '800', color: '#64748b', letterSpacing: '0.1em', marginBottom: '8px' }}>
        {icon} {label}
      </label>
      <div style={{ padding: '12px 16px', borderRadius: '12px', background: 'rgba(30, 41, 59, 0.4)', color: color, fontSize: '0.95rem', border: '1px solid rgba(255,255,255,0.05)', fontWeight: '600' }}>
        {value}
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(9, 13, 22, 0.8)', backdropFilter: 'blur(5px)' }} />
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} style={{ position: 'relative', background: '#1e293b', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '24px', padding: '2.5rem', width: '90%', maxWidth: '700px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{ width: '45px', height: '45px', borderRadius: '14px', background: '#10b981', display: 'grid', placeItems: 'center', fontSize: '1.2rem' }}>🧑‍🎓</div>
                <div>
                  <h3 style={{ margin: 0, color: '#f8fafc', fontSize: '1.4rem', fontWeight: '800' }}>Student Details</h3>
                  <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.85rem' }}>Brailley Student Information Portal</p>
                </div>
              </div>
              <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#94a3b8', width: '36px', height: '36px', borderRadius: '12px', cursor: 'pointer' }}>✕</button>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              <Field label="SYSTEM ID" icon="🔑" value={student._id} flex={2} />
              <Field label="JOINED DATE" icon="📅" value={new Date(student.createdAt).toLocaleDateString()} flex={1} />
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              <Field label="USERNAME" icon="👤" value={student.username} />
              <Field label="DEVICE ID" icon="📱" value={student.deviceId || 'UNASSIGNED'} color={student.deviceId ? '#38bdf8' : '#ef4444'} />
              <Field label="LAST SYNC" icon="🔄" value={student.deviceData?.lastSync ? new Date(student.deviceData.lastSync).toLocaleString() : 'N/A'} />
              <Field label="STATUS" icon="⚡" value="ACTIVE" color="#34d399" />
            </div>

            <button onClick={onClose} style={{ width: '100%', padding: '14px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: '800', cursor: 'pointer' }}>Close View</button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}