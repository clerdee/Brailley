import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminNotifications() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifs] = useState(['System update v1.1.2 live', 'New student registered']);

  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setIsOpen(!isOpen)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', position: 'relative' }}>
        🔔 {notifs.length > 0 && <span style={{ position: 'absolute', top: 0, right: 0, width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%' }} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} style={{ position: 'absolute', right: 0, top: '40px', width: '250px', background: '#1e293b', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', padding: '10px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)', zIndex: 50 }}>
            {notifs.map((n, i) => <p key={i} style={{ color: '#cbd5e1', fontSize: '0.8rem', margin: '5px 0', padding: '5px', borderBottom: '1px solid #334155' }}>{n}</p>)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}