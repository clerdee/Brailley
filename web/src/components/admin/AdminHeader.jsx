import { useAuth } from '../../context/AuthContext';
import AdminNotifications from './AdminNotifications';

export default function AdminHeader() {
  const { user } = useAuth();
  const roleDisplay = user?.role === 'superadmin' ? 'Super Admin' : 'Admin';

  return (
    <header style={{ height: '70px', backgroundColor: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 3rem', position: 'sticky', top: 0, zIndex: 30 }}>
      <div>
        <h2 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#f8fafc', margin: 0 }}></h2>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        {/* <AdminNotifications /> */}
        <div style={{ width: '1px', height: '24px', backgroundColor: 'rgba(255,255,255,0.1)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img src={`https://ui-avatars.com/api/?name=${user?.name || 'Admin'}&background=38bdf8&color=0f172a&bold=true`} alt="Profile" style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2px solid #38bdf8' }} />
          <div style={{ textAlign: 'left' }}>
            <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: '800', color: '#f8fafc' }}>{user?.name || 'Administrator'}</span>
            <span style={{ display: 'block', fontSize: '0.7rem', color: '#38bdf8', fontWeight: '700', textTransform: 'uppercase' }}>{roleDisplay}</span>
          </div>
        </div>
      </div>
    </header>
  );
}