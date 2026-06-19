import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'sans-serif', textAlign: 'center', background: '#f8f9fa', padding: '1rem' }}>
      <h1 style={{ fontSize: '2.5rem', color: '#333', margin: '0 0 10px 0' }}>Welcome to Brailley</h1>
      <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '500px', margin: '0 0 30px 0' }}>
        An interactive platform designed to help visually impaired users learn and experience Braille through innovative haptic feedback.
      </p>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button onClick={() => navigate('/login')} style={{ padding: '12px 24px', fontSize: '1rem', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Login
        </button>
        <button onClick={() => navigate('/register')} style={{ padding: '12px 24px', fontSize: '1rem', background: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Register
        </button>
      </div>
    </div>
  );
}