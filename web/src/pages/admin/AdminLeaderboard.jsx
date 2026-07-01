import { useState, useEffect, useCallback } from 'react'; 
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import AdminSidebar from '../../components/admin/AdminSidebar'; 
import AdminHeader from '../../components/admin/AdminHeader';

const mockData = [
  { name: 'Juan Dela Cruz', score: 980 }, { name: 'Maria Santos', score: 850 },
  { name: 'Pedro Penduko', score: 720 }, { name: 'Elena Reyes', score: 680 },
  { name: 'Jose Rizal', score: 500 }
];

export default function AdminLeaderboard() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    // Dito mo ilalagay ang API call sa susunod
    setTimeout(() => setIsRefreshing(false), 800);
  }, []);

  useEffect(() => {
    const handleScroll = (e) => { if (window.scrollY === 0 && e.deltaY < -40 && !isRefreshing) handleRefresh(); };
    window.addEventListener('wheel', handleScroll);
    return () => window.removeEventListener('wheel', handleScroll);
  }, [isRefreshing, handleRefresh]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#090d16', display: 'flex', fontFamily: '"Inter", sans-serif' }}>
      <AnimatePresence>
        {isRefreshing && (
          <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 30, opacity: 1, rotate: 360 }} exit={{ y: -50, opacity: 0 }} transition={{ duration: 0.6, ease: "easeInOut", rotate: { repeat: Infinity, duration: 0.8, ease: "linear" } }} style={{ position: 'fixed', top: 0, left: '55%', zIndex: 100, background: '#38bdf8', padding: '12px', borderRadius: '50%', boxShadow: '0 4px 20px rgba(56, 189, 248, 0.4)', color: '#0f172a', display: 'flex' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
          </motion.div>
        )}
      </AnimatePresence>

      <AdminSidebar />
      <div style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column' }}>
        <AdminHeader />
        <main style={{ padding: '3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h1 style={{ color: '#fff', fontSize: '2rem', margin: 0 }}>Training Insights 📈</h1>
            <button onClick={handleRefresh} style={{ padding: '10px 20px', background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', border: '1px solid rgba(56, 189, 248, 0.2)', borderRadius: '12px', fontWeight: '700', cursor: 'pointer' }}>Sync Data</button>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '2rem' }}>
            <div style={{ background: 'rgba(30, 41, 59, 0.3)', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <h3 style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>Top Students</h3>
              {mockData.map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '12px', borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: '800', color: i === 0 ? '#fbbf24' : '#64748b' }}>#{i + 1}</span>
                  <div style={{ flex: 1 }}><div style={{ color: '#f8fafc', fontWeight: '600' }}>{s.name}</div></div>
                  <div style={{ color: '#38bdf8', fontWeight: 'bold' }}>{s.score} XP</div>
                </div>
              ))}
            </div>

            <div style={{ background: 'rgba(30, 41, 59, 0.3)', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <h3 style={{ color: '#94a3b8', marginBottom: '2rem' }}>XP Performance Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockData}>
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                  <Tooltip contentStyle={{ background: '#0f172a', border: 'none', borderRadius: '8px' }} />
                  <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                    {mockData.map((entry, index) => <Cell key={`cell-${index}`} fill={index === 0 ? '#38bdf8' : '#1e293b'} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}