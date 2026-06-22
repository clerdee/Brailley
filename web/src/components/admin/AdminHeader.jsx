import { useAuth } from '../../context/AuthContext';

export default function AdminHeader() {
  const { user } = useAuth();

  return (
    <header style={{ height: '70px', backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 3rem', position: 'sticky', top: 0, zIndex: 30 }}>
      {/* GREETING / TITLE */}
      <div>
        <h2 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#f8fafc', margin: 0 }}>System Overview</h2>
      </div>

      {/* ADMIN PROFILE INFO */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <div style={{ position: 'relative', cursor: 'pointer', padding: '8px', color: '#94a3b8' }}>
          🔔 <span style={{ position: 'absolute', top: '4px', right: '4px', width: '8px', height: '8px', backgroundColor: '#ef4444', borderRadius: '50%' }} />
        </div>
        
        <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255,255,255,0.1)' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img 
            src={`https://ui-avatars.com/api/?name=${user?.name || 'Admin'}&background=38bdf8&color=0f172a&bold=true`} 
            alt="Profile" style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2px solid rgba(56, 189, 248, 0.5)' }}
          />
          <div style={{ textAlign: 'left' }}>
            <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: '700', color: '#f8fafc' }}>{user?.name || 'Administrator'}</span>
            <span style={{ display: 'block', fontSize: '0.75rem', color: '#38bdf8', fontWeight: '600', textTransform: 'uppercase' }}>Super Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}