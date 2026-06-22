import { motion } from 'framer-motion';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminFooter from '../../components/admin/AdminFooter';

export default function AdminDashboard() {
  // Static metrics placeholder for design visualization
  const stats = [
    { title: 'Total Registered Students', value: '42', icon: '👨‍🎓', color: '#38bdf8' },
    { title: 'Active Educators', value: '12', icon: '👩‍🏫', color: '#818cf8' },
    { title: 'Connected Devices', value: '08', icon: '📟', color: '#34d399' },
    { title: 'Pending Approval', value: '01', icon: '⏳', color: '#f59e0b' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#090d16', display: 'flex', fontFamily: '"Inter", sans-serif' }}>
      {/* REUSABLE SIDEBAR COMPONENTS (Fixed at 260px) */}
      <AdminSidebar />

      {/* CONTENT WRAPPER (Shifted left by 260px to allocate for Sidebar width) */}
      <div style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        
        {/* REUSABLE HEADER COMPONENTS */}
        <AdminHeader />

        {/* MAIN BODY AREA */}
        <main style={{ flex: 1, padding: '3rem' }}>
          
          {/* WELCOME BANNER */}
          <div style={{ marginBottom: '3rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#f8fafc', margin: '0 0 8px 0' }}>Welcome Back, Admin!</h1>
            <p style={{ color: '#94a3b8', margin: 0, fontSize: '1rem' }}>Here is the real-time activity metrics across the Brailley platform.</p>
          </div>

          {/* SYSTEM STATS METRIC GRID */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem', marginBottom: '3.5rem' }}>
            {stats.map((stat, i) => (
              <motion.div
                key={stat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.1 }}
                style={{ background: 'rgba(30, 41, 59, 0.4)', border: '1px solid rgba(255, 255, 255, 0.05)', padding: '1.8rem', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '20px', backdropFilter: 'blur(10px)' }}
              >
                <div style={{ fontSize: '2.2rem', padding: '12px', backgroundColor: 'rgba(15,23,42,0.5)', borderRadius: '14px', border: `1px solid ${stat.color}30` }}>
                  {stat.icon}
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>{stat.title}</span>
                  <span style={{ display: 'block', fontSize: '1.8rem', fontWeight: '800', color: '#f8fafc' }}>{stat.value}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* DATA TABLE WRAPPER PANEL */}
          <div style={{ background: 'rgba(30, 41, 59, 0.2)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '24px', padding: '2rem', backdropFilter: 'blur(10px)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0, color: '#f8fafc', fontSize: '1.2rem', fontWeight: '700' }}>Recent Educator Registration Requests</h3>
              <span style={{ fontSize: '0.85rem', color: '#38bdf8', fontWeight: '700', cursor: 'pointer' }}>View All Accounts ➔</span>
            </div>

            {/* SIMPLE REUSABLE DESIGN TABLE */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', color: '#cbd5e1' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#64748b', fontSize: '0.85rem', fontWeight: '700' }}>
                    <th style={{ padding: '12px' }}>NAME</th>
                    <th style={{ padding: '12px' }}>EMAIL</th>
                    <th style={{ padding: '12px' }}>ROLE REQUESTED</th>
                    <th style={{ padding: '12px' }}>STATUS</th>
                    <th style={{ padding: '12px', textAlign: 'right' }}>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', fontSize: '0.95rem' }}>
                    <td style={{ padding: '16px 12px', fontWeight: '600' }}>Educator Account Request</td>
                    <td style={{ padding: '16px 12px', color: '#94a3b8' }}>educator@gmail.com</td>
                    <td style={{ padding: '16px 12px' }}><span style={{ color: '#818cf8', fontWeight: 'bold' }}>ADMIN</span></td>
                    <td style={{ padding: '16px 12px' }}><span style={{ color: '#f59e0b', background: 'rgba(245,158,11,0.1)', padding: '4px 10px', borderRadius: '30px', fontSize: '0.8rem', fontWeight: '700' }}>Pending Review</span></td>
                    <td style={{ padding: '16px 12px', textAlign: 'right' }}>
                      <button style={{ padding: '6px 14px', background: '#38bdf8', color: '#0f172a', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem' }}>Approve</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </main>

        {/* REUSABLE FOOTER COMPONENTS */}
        <AdminFooter />
      </div>
    </div>
  );
}