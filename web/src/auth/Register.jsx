import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', form);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif' }}>
      <form onSubmit={handleSubmit} style={{ padding: '2rem', border: '1px solid #ccc', borderRadius: '8px', width: '320px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h2 style={{ textAlign: 'center', margin: 0 }}>Create Account</h2>
        {error && <p style={{ color: 'red', fontSize: '14px', margin: 0 }}>{error}</p>}
        <input type="text" placeholder="Full Name" onChange={e => setForm({...form, name: e.target.value})} required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
        <input type="email" placeholder="Email" onChange={e => setForm({...form, email: e.target.value})} required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
        <input type="password" placeholder="Password" onChange={e => setForm({...form, password: e.target.value})} required style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
        <select onChange={e => setForm({...form, role: e.target.value})} style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}>
          <option value="student">Student</option>
          <option value="admin">Admin / Educator</option>
        </select>
        <button type="submit" style={{ padding: '10px', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Register</button>
        <p style={{ textAlign: 'center', fontSize: '14px', margin: 0, cursor: 'pointer', color: '#007bff' }} onClick={() => navigate('/login')}>Already have an account? Login</p>
      </form>
    </div>
  );
}