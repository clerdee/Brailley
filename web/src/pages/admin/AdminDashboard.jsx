import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import AdminFooter from '../../components/admin/AdminFooter';
import api from '../../services/api';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/admin/users'); 
        setUsers(res.data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleApprove = async (userId) => {
    try {
      await api.put(`/admin/users/${userId}/approve`); 
      setUsers(users.map(user => user._id === userId ? { ...user, isApproved: true } : user));
    } catch (error) {
      alert("Failed to approve user.");
    }
  };

  const studentsCount = users.filter(u => u.role === 'student').length;
  const activeAdminsCount = users.filter(u => u.role === 'admin' && u.isApproved).length;
  const pendingAdmins = users.filter(u => u.role === 'admin' && !u.isApproved);
  
  const chartData = [
    { name: 'Students', count: studentsCount, color: '#38bdf8' },
    { name: 'Active Admins', count: activeAdminsCount, color: '#818cf8' },
    { name: 'Pending', count: pendingAdmins.length, color: '#f59e0b' }
  ];

  const stats = [
    { title: 'Total Registered Students', value: studentsCount, icon: '👨‍🎓', color: '#38bdf8' },
    { title: 'Active Admins (Educators)', value: activeAdminsCount, icon: '👩‍🏫', color: '#818cf8' },
    { title: 'Connected Devices', value: '0', icon: '📟', color: '#34d399' }, 
    { title: 'Pending Approval', value: pendingAdmins.length, icon: '⏳', color: '#f59e0b' },
  ];

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#090d16', display: 'flex', fontFamily: '"Inter", sans-serif' }}>
      <AdminSidebar />

      <div style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <AdminHeader />

        <main style={{ flex: 1, padding: '3rem' }}>
          
          {/* WELCOME BANNER */}
          <div style={{ marginBottom: '3rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#f8fafc', margin: '0 0 8px 0' }}>System Overview</h1>
            <p style={{ color: '#94a3b8', margin: 0, fontSize: '1rem' }}>Real-time database metrics across the Brailley platform.</p>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', color: '#38bdf8', padding: '3rem' }}>Loading database records...</div>
          ) : (
            <>
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

              {/* BOTTOM SECTION: CHART & TABLE */}
              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                
                {/* CHART PANEL */}
                <div style={{ flex: 1, minWidth: '300px', background: 'rgba(30, 41, 59, 0.2)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '24px', padding: '2rem', backdropFilter: 'blur(10px)' }}>
                  <h3 style={{ margin: '0 0 2rem 0', color: '#f8fafc', fontSize: '1.2rem', fontWeight: '700' }}>User Distribution</h3>
                  <div style={{ width: '100%', height: '300px' }}>
                    <ResponsiveContainer>
                      <BarChart data={chartData}>
                        <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                        <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f8fafc' }} />
                        <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* DATA TABLE PANEL */}
                <div style={{ flex: 1.5, minWidth: '400px', background: 'rgba(30, 41, 59, 0.2)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '24px', padding: '2rem', backdropFilter: 'blur(10px)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3 style={{ margin: 0, color: '#f8fafc', fontSize: '1.2rem', fontWeight: '700' }}>Pending Admin Approvals</h3>
                  </div>

                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', color: '#cbd5e1' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#64748b', fontSize: '0.85rem', fontWeight: '700' }}>
                          <th style={{ padding: '12px' }}>NAME</th>
                          <th style={{ padding: '12px' }}>EMAIL</th>
                          <th style={{ padding: '12px' }}>STATUS</th>
                          <th style={{ padding: '12px', textAlign: 'right' }}>ACTION</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pendingAdmins.length === 0 ? (
                          <tr>
                            <td colSpan="4" style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>No pending requests at the moment.</td>
                          </tr>
                        ) : (
                          pendingAdmins.map(user => (
                            <tr key={user._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.02)', fontSize: '0.95rem' }}>
                              <td style={{ padding: '16px 12px', fontWeight: '600', color: '#f8fafc' }}>{user.name}</td>
                              <td style={{ padding: '16px 12px', color: '#94a3b8' }}>{user.email}</td>
                              <td style={{ padding: '16px 12px' }}>
                                <span style={{ color: '#f59e0b', background: 'rgba(245,158,11,0.1)', padding: '4px 10px', borderRadius: '30px', fontSize: '0.8rem', fontWeight: '700' }}>
                                  Pending
                                </span>
                              </td>
                              <td style={{ padding: '16px 12px', textAlign: 'right' }}>
                                <motion.button 
                                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                  onClick={() => handleApprove(user._id)}
                                  style={{ padding: '6px 14px', background: '#38bdf8', color: '#0f172a', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', fontSize: '0.85rem' }}
                                >
                                  Approve
                                </motion.button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            </>
          )}

        </main>
        <AdminFooter />
      </div>
    </div>
  );
}