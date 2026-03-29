'use client';

import { useState, useEffect, useRef } from 'react';
import NavBar from './components/Navbar/Navbar';
import HeroSection from './components/HeroSection/HeroSection';
import ProjectsSection from './components/ProjectsSection/ProjectsSection';
import AboutSection from './components/AboutSection/AboutSection';
import ContactSection from './components/ContactSection/ContactSection';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const tickingRef = useRef(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!tickingRef.current) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          tickingRef.current = false;
        });
        tickingRef.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <main>
      <NavBar />
      <HeroSection scrollY={scrollY} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <ProjectsSection scrollY={scrollY} />
        <AboutSection scrollY={scrollY} />
        <ContactSection scrollY={scrollY} />
      </div>
    </main>
  );
}