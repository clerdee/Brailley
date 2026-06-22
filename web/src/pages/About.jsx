import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Pwede mong palitan ang mga detalye dito!
const developers = [
  {
    name: "Developer One",
    role: "Lead Full-Stack Engineer",
    bio: "Passionate about creating accessible technology and bridging the gap in special education through code.",
    image: "https://ui-avatars.com/api/?name=Dev+One&background=0ea5e9&color=fff&size=200"
  },
  {
    name: "Developer Two",
    role: "UI/UX & Hardware Specialist",
    bio: "Focused on intuitive design and seamless integration of haptic feedback hardware with mobile interfaces.",
    image: "https://ui-avatars.com/api/?name=Dev+Two&background=38bdf8&color=fff&size=200"
  }
];

export default function About() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#0f172a', fontFamily: '"Inter", sans-serif', color: '#f8fafc' }}>
      <Navbar />

      <main style={{ flex: 1, padding: '5rem 2rem', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Background Glows */}
        <div style={{ position: 'absolute', top: '10%', left: '20%', width: '30%', height: '30%', background: 'radial-gradient(circle, rgba(56,189,248,0.15) 0%, rgba(15,23,42,0) 70%)', filter: 'blur(80px)', zIndex: 0 }} />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', maxWidth: '800px', marginBottom: '4rem', zIndex: 1 }}
        >
          <h1 style={{ fontSize: '3.5rem', fontWeight: '900', margin: '0 0 1rem 0', background: 'linear-gradient(to right, #f8fafc, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Meet The Team
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#94a3b8', lineHeight: '1.8' }}>
            We are a group of developers dedicated to transforming how visually impaired individuals experience learning. Brailley is built with empathy, innovation, and cutting-edge tech.
          </p>
        </motion.div>

        {/* Developer Cards Grid */}
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center', zIndex: 1, width: '100%', maxWidth: '1000px' }}>
          {developers.map((dev, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10, boxShadow: '0 20px 40px -10px rgba(56, 189, 248, 0.2)' }}
              style={{
                background: 'rgba(30, 41, 59, 0.4)', border: '1px solid rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)', borderRadius: '24px', padding: '2.5rem 2rem',
                width: '100%', maxWidth: '350px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center'
              }}
            >
              <img 
                src={dev.image} 
                alt={dev.name} 
                style={{ width: '120px', height: '120px', borderRadius: '50%', marginBottom: '1.5rem', border: '4px solid #1e293b', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}
              />
              <h2 style={{ fontSize: '1.5rem', margin: '0 0 0.5rem 0', color: '#f8fafc' }}>{dev.name}</h2>
              <h3 style={{ fontSize: '0.95rem', margin: '0 0 1.5rem 0', color: '#38bdf8', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>{dev.role}</h3>
              <p style={{ fontSize: '1rem', color: '#94a3b8', lineHeight: '1.6', margin: 0 }}>{dev.bio}</p>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}