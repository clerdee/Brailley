export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0f172a', padding: '2rem 4rem', borderTop: '1px solid #1e293b', textAlign: 'center', color: '#64748b', fontSize: '0.9rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
        <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} Brailley Platform. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <span style={{ cursor: 'pointer', hover: { color: '#38bdf8' } }}>Privacy Policy</span>
          <span style={{ cursor: 'pointer', hover: { color: '#38bdf8' } }}>Terms of Service</span>
          <span style={{ cursor: 'pointer', hover: { color: '#38bdf8' } }}>Contact</span>
        </div>
      </div>
    </footer>
  );
}