import { motion, AnimatePresence } from 'framer-motion';

export default function EducatorActionModal({ isOpen, onClose, educator }) {
  if (!educator) return null;

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
                <div style={{ width: '45px', height: '45px', borderRadius: '14px', background: '#38bdf8', display: 'grid', placeItems: 'center', fontSize: '1.2rem' }}>🎓</div>
                <div>
                  <h3 style={{ margin: 0, color: '#f8fafc', fontSize: '1.4rem', fontWeight: '800' }}>Educator Details</h3>
                  <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: '0.85rem' }}>Brailley Staff Information Portal</p>
                </div>
              </div>
              <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#94a3b8', width: '36px', height: '36px', borderRadius: '12px', cursor: 'pointer' }}>✕</button>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              <Field label="SYSTEM ID" icon="🔑" value={educator._id} flex={2} />
              <Field label="JOINED DATE" icon="📅" value={new Date(educator.createdAt).toLocaleDateString()} flex={1} />
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              <Field label="FULL NAME" icon="👤" value={educator.name} />
              <Field label="EMAIL ADDRESS" icon="📧" value={educator.email} />
              <Field label="ROLE" icon="🛡️" value={educator.role.toUpperCase()} color="#38bdf8" />
              <Field label="STATUS" icon="⚡" value={educator.isApproved ? 'ACTIVE' : 'PENDING'} color={educator.isApproved ? '#34d399' : '#f59e0b'} />
            </div>

            <button onClick={onClose} style={{ width: '100%', padding: '14px', background: '#38bdf8', color: '#0f172a', border: 'none', borderRadius: '12px', fontWeight: '800', cursor: 'pointer' }}>Close View</button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}