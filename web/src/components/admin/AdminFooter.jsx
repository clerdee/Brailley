export default function AdminFooter() {
  return (
    <footer style={{ padding: '2rem 3rem', borderTop: '1px solid rgba(255,255,255,0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#64748b', fontSize: '0.85rem' }}>
      <p style={{ margin: 0 }}>&copy; {new Date().getFullYear()} Brailley Management Suite.</p>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <span style={{ cursor: 'pointer' }}>Security Logs</span>
        <span style={{ cursor: 'pointer' }}>API Version 1.0</span>
      </div>
    </footer>
  );
}