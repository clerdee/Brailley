import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import heroImg from '../assets/images/landing-hero.jpg';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Landing() {
  const [showModal, setShowModal] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  // Static array para sa floating Braille background (No images needed!)
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
      
      {/* FLOATING BRAILLE BACKGROUND ANIMATION */}
      {floatingBraille.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: [0.03, 0.1, 0.03], y: [50, -50] }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, ease: "linear", delay: item.delay }}
          style={{ position: 'absolute', top: item.top, left: item.left, fontSize: item.size, color: '#38bdf8', zIndex: 0, pointerEvents: 'none' }}
        >
          {item.char}
        </motion.div>
      ))}

      <Navbar />

      <div style={{ flex: 1, display: 'flex', zIndex: 1 }}>
        {/* LEFT SECTION */}
        <motion.div variants={containerVariants} initial="hidden" animate="show" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '5rem', zIndex: 2 }}>
          
          <motion.div variants={itemVariants} style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1.5rem' }}>
            <div style={{ padding: '6px 12px', backgroundColor: '#1e293b', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold', color: '#38bdf8', letterSpacing: '1px' }}>
              BETA VERSION 1.0
            </div>
            {/* BRAILLEY translated to native Braille text */}
            <span style={{ fontSize: '1.8rem', color: '#334155', letterSpacing: '4px', userSelect: 'none' }}>
              ⠃⠗⠁⠊⠇⠇⠑⠽
            </span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} style={{ fontSize: '4rem', margin: '0 0 20px 0', fontWeight: '800', lineHeight: '1.1', background: 'linear-gradient(to right, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Experience Braille <br />Like Never Before.
          </motion.h1>
          
          <motion.p variants={itemVariants} style={{ fontSize: '1.2rem', color: '#94a3b8', lineHeight: '1.7', margin: '0 0 40px 0', maxWidth: '500px' }}>
            An interactive platform designed to help educators manage and monitor visually impaired individuals through innovative haptic learning.
          </motion.p>
          
          <motion.div variants={itemVariants}>
            <motion.button whileHover={{ scale: 1.05, backgroundColor: 'rgba(71, 85, 105, 0.2)' }} whileTap={{ scale: 0.95 }} onClick={() => setShowModal(true)} style={{ padding: '16px 32px', fontSize: '1rem', background: 'transparent', color: '#f8fafc', border: '1px solid #475569', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}>
              Explore Mobile App
            </motion.button>
          </motion.div>
        </motion.div>

        {/* RIGHT SECTION (Image) */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative' }}>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 0.2, scale: 1 }} transition={{ duration: 2, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }} style={{ position: 'absolute', width: '60%', height: '60%', background: '#38bdf8', filter: 'blur(120px)', borderRadius: '50%' }} />
          <motion.img initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0, y: [0, -15, 0] }} transition={{ opacity: { duration: 1 }, x: { duration: 1 }, y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 } }} src={heroImg} alt="Brailley Platform" style={{ width: '90%', maxHeight: '75vh', objectFit: 'cover', borderRadius: '24px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', zIndex: 1, border: '1px solid #1e293b' }} />
        </div>
      </div>

      <Footer />

      {/* MODAL POPUP W/ CRYING ROBOT ANIMATION */}
      <AnimatePresence>
        {showModal && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(8px)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 999 }}>
            <motion.div initial={{ scale: 0.8, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0, y: 20 }} transition={{ type: "spring", bounce: 0.4, duration: 0.5 }} style={{ background: '#1e293b', padding: '3rem', borderRadius: '16px', textAlign: 'center', border: '1px solid #334155', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)', maxWidth: '400px' }}>
              
              {/* ANIMATED CRYING ROBOT SVG */}
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <svg width="80" height="80" viewBox="0 0 100 100">
                  {/* Robot Head */}
                  <rect x="15" y="25" width="70" height="60" rx="12" fill="#334155" stroke="#475569" strokeWidth="4"/>
                  {/* Antenna */}
                  <line x1="50" y1="25" x2="50" y2="5" stroke="#475569" strokeWidth="4" />
                  <circle cx="50" cy="5" r="5" fill="#ef4444" />
                  {/* Blinking Eyes */}
                  <motion.circle cx="35" cy="50" r="6" fill="#38bdf8" animate={{ scaleY: [1, 0.1, 1] }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }} />
                  <motion.circle cx="65" cy="50" r="6" fill="#38bdf8" animate={{ scaleY: [1, 0.1, 1] }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }} />
                  {/* Sad Mouth */}
                  <path d="M 40 75 Q 50 65 60 75" fill="none" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
                  {/* Animated Tears */}
                  <motion.path d="M 35 60 Q 38 70 35 75 Q 32 70 35 60" fill="#38bdf8" initial={{ opacity: 0, y: 0 }} animate={{ opacity: [0, 1, 0], y: [0, 15] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} />
                  <motion.path d="M 65 60 Q 68 70 65 75 Q 62 70 65 60" fill="#38bdf8" initial={{ opacity: 0, y: 0 }} animate={{ opacity: [0, 1, 0], y: [0, 15] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.8 }} />
                </svg>
              </div>

              <h2 style={{ color: '#f8fafc', fontSize: '1.8rem', margin: '0 0 10px 0' }}>Mobile Application</h2>
              <p style={{ color: '#94a3b8', marginBottom: '25px', lineHeight: '1.5' }}>
                The web interface is restricted to Admins. This feature is <strong>Still Developing</strong> via our upcoming Mobile App.
              </p>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }} onClick={() => setShowModal(false)} style={{ padding: '12px 24px', background: '#38bdf8', color: '#0f172a', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', width: '100%' }}>
                Got it!
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}