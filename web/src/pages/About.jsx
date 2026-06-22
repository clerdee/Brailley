import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const developers = [
  {
    name: "H.C. Cruz",
    role: "Lead Full-Stack Developer",
    focus: "Website & Mobile",
    bio: "Passionate about creating accessible technology and bridging the gap in special education through code.",
    image: "https://ui-avatars.com/api/?name=H.C.+Cruz&background=0ea5e9&color=fff&size=200"
  },
  {
    name: "D.D. Cortez",
    role: "Technical Writer",
    focus: "Research Documentation",
    bio: "Responsible for preparing technical documents, research papers, and ensuring the project's written materials are accurate and well-organized.",
    image: "https://ui-avatars.com/api/?name=D.D.+Cortez&background=38bdf8&color=fff&size=200"
  },
  {
    name: "J.M. Danque",
    role: "Research Analyst",
    focus: "Literature Review",
    bio: "Conducts research, analyzes related studies, and contributes to the development of project methodologies and documentation.",
    image: "https://ui-avatars.com/api/?name=J.M.+Danque&background=0284c7&color=fff&size=200"
  },
  {
    name: "G. De Los Santos",
    role: "Documentation Specialist",
    focus: "Reports & Presentation",
    bio: "Organizes project reports, prepares presentation materials, and maintains consistency across all project documentation.",
    image: "https://ui-avatars.com/api/?name=G.+De+Los+Santos&background=0369a1&color=fff&size=200"
  }
];

export default function About() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#0f172a', fontFamily: '"Inter", sans-serif', color: '#f8fafc' }}>
      <Navbar />

      <main style={{ flex: 1, padding: '5rem 2rem', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'hidden' }}>
        
        {/* Background Glows */}
        <div style={{ position: 'absolute', top: '10%', left: '20%', width: '40%', height: '40%', background: 'radial-gradient(circle, rgba(56,189,248,0.1) 0%, rgba(15,23,42,0) 70%)', filter: 'blur(100px)', zIndex: 0 }} />
        <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '30%', height: '30%', background: 'radial-gradient(circle, rgba(14,165,233,0.1) 0%, rgba(15,23,42,0) 70%)', filter: 'blur(80px)', zIndex: 0 }} />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', maxWidth: '800px', marginBottom: '5rem', zIndex: 1 }}
        >
          <div style={{ display: 'inline-block', padding: '6px 16px', backgroundColor: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.2)', borderRadius: '30px', color: '#38bdf8', fontSize: '0.85rem', fontWeight: 'bold', letterSpacing: '2px', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
            The Minds Behind Brailley
          </div>
          <h1 style={{ fontSize: '3.8rem', fontWeight: '900', margin: '0 0 1.5rem 0', background: 'linear-gradient(to right, #f8fafc, #7dd3fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Meet The Team
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#94a3b8', lineHeight: '1.8', maxWidth: '700px', margin: '0 auto' }}>
            We are a group of developers dedicated to transforming how visually impaired individuals experience learning. Brailley is built with empathy, innovation, and cutting-edge tech.
          </p>
        </motion.div>

        {/* CSS GRID FORMAT - Ito ang magpapapantay sa kanila */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
          gap: '2rem', 
          zIndex: 1, 
          width: '100%', 
          maxWidth: '1200px' 
        }}>
          {developers.map((dev, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15, type: "spring", bounce: 0.4 }}
              whileHover={{ 
                y: -12, 
                boxShadow: '0 25px 50px -12px rgba(56, 189, 248, 0.25)',
                borderColor: 'rgba(56, 189, 248, 0.4)'
              }}
              style={{
                background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.6), rgba(15, 23, 42, 0.8))', 
                border: '1px solid rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(12px)', borderRadius: '28px', padding: '3rem 2rem 2.5rem',
                textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center',
                transition: 'border-color 0.3s ease'
              }}
            >
              {/* Profile Image with subtle glow */}
              <div style={{ position: 'relative', marginBottom: '1.8rem' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: '#38bdf8', filter: 'blur(20px)', borderRadius: '50%', opacity: 0.4, zIndex: -1 }} />
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  src={dev.image} 
                  alt={dev.name} 
                  style={{ width: '130px', height: '130px', borderRadius: '50%', border: '4px solid #1e293b', objectFit: 'cover' }}
                />
              </div>

              <h2 style={{ fontSize: '1.5rem', margin: '0 0 0.5rem 0', color: '#f8fafc', fontWeight: '800' }}>{dev.name}</h2>
              <h3 style={{ fontSize: '0.9rem', margin: '0 0 1.5rem 0', color: '#38bdf8', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>{dev.role}</h3>
              
              <p style={{ fontSize: '1rem', color: '#94a3b8', lineHeight: '1.6', margin: '0 0 1.5rem 0', flex: 1 }}>{dev.bio}</p>
              
              {/* Tag / Focus Area */}
              <div style={{ padding: '6px 14px', background: 'rgba(15, 23, 42, 0.8)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', color: '#cbd5e1', fontSize: '0.8rem', fontWeight: '600' }}>
                {dev.focus}
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}