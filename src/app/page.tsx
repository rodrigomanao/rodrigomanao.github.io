'use client';

import { useState, useEffect, useRef } from 'react';
import NavBar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProjectsSection from './components/ProjectsSection';
import AboutSection from './components/AboutSection';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const rafRef = useRef<number | null>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      rafRef.current = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <main>
      <NavBar />
      <div style={{ position: 'relative' }}>
        <HeroSection scrollY={scrollY} />
        <ProjectsSection scrollY={scrollY} />
        <AboutSection scrollY={scrollY} />
      </div>
    </main>
  );
}