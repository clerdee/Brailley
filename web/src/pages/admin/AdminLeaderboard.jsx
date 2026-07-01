import { useState } from 'react'; import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import AdminSidebar from '../../components/admin/AdminSidebar'; import AdminHeader from '../../components/admin/AdminHeader';

const mockData = [
  { name: 'Juan Dela Cruz', score: 980 }, { name: 'Maria Santos', score: 850 },
  { name: 'Pedro Penduko', score: 720 }, { name: 'Elena Reyes', score: 680 },
  { name: 'Jose Rizal', score: 500 }
];

export default function AdminLeaderboard() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#090d16', display: 'flex', fontFamily: '"Inter", sans-serif' }}>
      <AdminSidebar />
      <div style={{ flex: 1, marginLeft: '260px', display: 'flex', flexDirection: 'column' }}>
        <AdminHeader />
        <main style={{ padding: '3rem' }}>
          <h1 style={{ color: '#fff', fontSize: '2rem', marginBottom: '2rem' }}>Training Insights & Ranking 📈</h1>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '2rem' }}>
            {/* LEADERBOARD CARD */}
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

            {/* CHART CARD */}
            <div style={{ background: 'rgba(30, 41, 59, 0.3)', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <h3 style={{ color: '#94a3b8', marginBottom: '2rem' }}>XP Performance Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockData}>
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
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