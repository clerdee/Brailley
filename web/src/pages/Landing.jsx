import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import heroVideo from '../assets/videos/braille-hero.mp4';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AdminLoginModal from '../components/AdminLoginModal';

export default function Landing() {
  const [showModal, setShowModal] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false); 
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const floatingBraille = [
    { char: '⠃', top: '10%', left: '15%', size: '3rem', delay: 0 },
    { char: '⠗', top: '70%', left: '80%', size: '5rem', delay: 2 },
    { char: '⠁', top: '40%', left: '50%', size: '2rem', delay: 1 },
    { char: '⠊', top: '80%', left: '20%', size: '4rem', delay: 3 },
    { char: '⠇', top: '20%', left: '70%', size: '3.5rem', delay: 1.5 },
    { char: '⠑', top: '50%', left: '10%', size: '2.5rem', delay: 4 },
    { char: '⠽', top: '15%', left: '85%', size: '4.5rem', delay: 0.5 },
    { char: '⠟', top: '85%', left: '60%', size: '3rem', delay: 2.5 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', fontFamily: '"Inter", sans-serif', backgroundColor: '#0f172a', color: '#f8fafc', position: 'relative', overflow: 'hidden' }}>
      
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(56,189,248,0.15) 0%, rgba(15,23,42,0) 70%)', filter: 'blur(80px)', zIndex: 0 }} />
      
      {floatingBraille.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: [0.02, 0.08, 0.02], y: [50, -50] }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "linear", delay: item.delay }}
          style={{ position: 'absolute', top: item.top, left: item.left, fontSize: item.size, color: '#38bdf8', zIndex: 0, pointerEvents: 'none' }}
        >
          {item.char}
        </motion.div>
      ))}

      <Navbar />

      <div style={{ flex: 1, display: 'flex', zIndex: 1, alignItems: 'center', maxWidth: '1600px', margin: '0 auto', width: '100%' }}>
        
        <motion.div variants={containerVariants} initial="hidden" animate="show" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '4rem', zIndex: 2 }}>
          
          <motion.div variants={itemVariants} style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem' }}>
            <div style={{ padding: '6px 14px', backgroundColor: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '30px', fontSize: '0.8rem', fontWeight: 'bold', color: '#38bdf8', letterSpacing: '1px', textTransform: 'uppercase' }}>
              INTRODUCING BRAILLEY
            </div>
            <span style={{ fontSize: '1.8rem', color: '#475569', letterSpacing: '6px', userSelect: 'none' }}>
              ⠃⠗⠁⠊⠇⠇⠑⠽
            </span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} style={{ fontSize: '4.2rem', margin: '0 0 20px 0', fontWeight: '900', lineHeight: '1.1', background: 'linear-gradient(135deg, #f8fafc 0%, #cbd5e1 50%, #38bdf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', textShadow: '0 10px 30px rgba(56, 189, 248, 0.2)' }}>
            Experience Braille <br />Like Never Before.
          </motion.h1>
          
          <motion.p variants={itemVariants} style={{ fontSize: '1.15rem', color: '#94a3b8', lineHeight: '1.8', margin: '0 0 45px 0', maxWidth: '540px', fontWeight: '400' }}>
            An innovative educational platform designed to make learning Braille accessible, interactive, and engaging. We empower educators with comprehensive management tools while paving the way for intuitive haptic learning.
          </motion.p>
          
          <motion.div variants={itemVariants} style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: '0 10px 25px -5px rgba(56, 189, 248, 0.4)' }} 
              whileTap={{ scale: 0.95 }} 
              onClick={() => setShowAdminLogin(true)}
              style={{ padding: '16px 36px', fontSize: '1rem', background: 'linear-gradient(to right, #0ea5e9, #38bdf8)', color: '#0f172a', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: '700', letterSpacing: '0.5px' }}
            >
              Admin Portal Login
            </motion.button>

            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(56, 189, 248, 0.05)', borderColor: '#38bdf8' }} 
              whileTap={{ scale: 0.95 }} 
              onClick={() => setShowModal(true)} 
              style={{ padding: '16px 36px', fontSize: '1rem', background: 'rgba(30, 41, 59, 0.5)', color: '#f8fafc', border: '1px solid #475569', borderRadius: '12px', cursor: 'pointer', fontWeight: '600', backdropFilter: 'blur(10px)' }}
            >
              For Students & Users
            </motion.button>
          </motion.div>
        </motion.div>

        <div style={{ flex: 1.4, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 4rem 2rem 0', position: 'relative' }}>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 0.3, scale: 1 }} transition={{ duration: 3, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }} style={{ position: 'absolute', width: '80%', height: '80%', background: '#38bdf8', filter: 'blur(120px)', borderRadius: '50%', zIndex: 0 }} />
          <motion.div
            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0, y: [0, -12, 0] }} 
            transition={{ opacity: { duration: 1 }, x: { duration: 1 }, y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 } }}
            style={{ width: '100%', zIndex: 1, padding: '12px', background: 'rgba(30, 41, 59, 0.4)', borderRadius: '32px', border: '1px solid rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(20px)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', position: 'relative' }}
          >
            <video ref={videoRef} src={heroVideo} autoPlay loop muted={isMuted} playsInline style={{ width: '100%', height: '75vh', objectFit: 'cover', borderRadius: '22px' }} />
            <motion.button
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={toggleMute}
              style={{ position: 'absolute', bottom: '30px', right: '30px', background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(255,255,255,0.2)', padding: '12px 20px', borderRadius: '30px', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', backdropFilter: 'blur(5px)', fontSize: '0.9rem', fontWeight: 'bold' }}
            >
              {isMuted ? '🔇 Unmute Video' : '🔊 Sound On'}
            </motion.button>
          </motion.div>
        </div>
      </div>

      <Footer />

      {/* ADMIN LOGIN MODAL */}
      <AdminLoginModal isOpen={showAdminLogin} onClose={() => setShowAdminLogin(false)} />

      {/* STUDENT "COMING SOON" MODAL */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(12px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 999 }}>
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} transition={{ type: "spring", bounce: 0.4, duration: 0.5 }} style={{ background: 'linear-gradient(145deg, #1e293b, #0f172a)', padding: '3.5rem', borderRadius: '24px', textAlign: 'center', border: '1px solid rgba(56, 189, 248, 0.2)', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)', maxWidth: '420px' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                <svg width="90" height="90" viewBox="0 0 100 100">
                  <rect x="15" y="25" width="70" height="60" rx="16" fill="#334155" stroke="#475569" strokeWidth="4"/>
                  <line x1="50" y1="25" x2="50" y2="5" stroke="#475569" strokeWidth="4" />
                  <circle cx="50" cy="5" r="5" fill="#ef4444" />
                  <motion.circle cx="35" cy="50" r="6" fill="#38bdf8" animate={{ scaleY: [1, 0.1, 1] }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }} />
                  <motion.circle cx="65" cy="50" r="6" fill="#38bdf8" animate={{ scaleY: [1, 0.1, 1] }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }} />
                  <path d="M 38 75 Q 50 65 62 75" fill="none" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
                  <motion.path d="M 35 60 Q 38 70 35 75 Q 32 70 35 60" fill="#38bdf8" initial={{ opacity: 0, y: 0 }} animate={{ opacity: [0, 1, 0], y: [0, 15] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} />
                  <motion.path d="M 65 60 Q 68 70 65 75 Q 62 70 65 60" fill="#38bdf8" initial={{ opacity: 0, y: 0 }} animate={{ opacity: [0, 1, 0], y: [0, 15] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.8 }} />
                </svg>
              </div>
              <h2 style={{ color: '#f8fafc', fontSize: '1.8rem', margin: '0 0 12px 0', fontWeight: '800' }}>Student App Incoming</h2>
              <p style={{ color: '#94a3b8', marginBottom: '30px', lineHeight: '1.6', fontSize: '1rem' }}>
                The application for students and general users is <strong>soon to develop</strong>. FOR NOW, this web platform is strictly reserved for Admins.
              </p>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowModal(false)} style={{ padding: '14px 24px', background: 'linear-gradient(to right, #0ea5e9, #38bdf8)', color: '#0f172a', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', width: '100%', fontSize: '1rem' }}>
                Understood.
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}