'use client';

import { useState, useEffect } from 'react';
import { HiHome, HiCode, HiUser, HiMail } from 'react-icons/hi';

export default function NavBar() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = ['projects', 'about'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    // Handle scrolling to top (home section)
    const handleHomeDetection = () => {
      if (window.scrollY < 100) {
        setActiveSection('home');
      }
    };

    window.addEventListener('scroll', handleHomeDetection, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleHomeDetection);
    };
  }, []);

  const navbarVisible = scrollY > 100;

  const links = [
    { id: 'home', label: 'HOME', icon: HiHome },
    { id: 'projects', label: 'PROJECTS', icon: HiCode },
    { id: 'about', label: 'ABOUT', icon: HiUser },
    { id: 'contact', label: 'CONTACT', icon: HiMail },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '60px',
        backgroundColor: 'rgba(10, 10, 10, 0.95)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 2rem',
        zIndex: 1000,
        transform: `translateY(${navbarVisible ? '0' : '-100%'})`,
        transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
    >
      {/* Logo */}
      <div
        style={{
          position: 'absolute',
          left: '2rem',
          fontFamily: 'Percy Pixel',
          fontSize: '1.5rem',
          color: '#f05555ff',
          textShadow: '0 0 10px rgba(240, 85, 85, 0.5)',
          letterSpacing: '2px',
        }}
      >
        {'<RM/>'}
      </div>

      {/* Navigation Links */}
      <div
        style={{
          display: 'flex',
          gap: '1.5rem',
          alignItems: 'center',
        }}
      >
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.id}
              href={link.id === 'home' ? undefined : `#${link.id}`}
              style={{
                fontFamily: 'Percy Pixel',
                fontSize: '1rem',
                color: activeSection === link.id ? '#f05555ff' : '#888',
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                border: activeSection === link.id ? '2px solid #f05555ff' : '2px solid transparent',
                backgroundColor: activeSection === link.id ? 'rgba(240, 85, 85, 0.1)' : 'transparent',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                textShadow: activeSection === link.id ? '0 0 5px rgba(240, 85, 85, 0.5)' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
              }}
              onClick={link.id === 'home' ? (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); } : undefined}
              onMouseEnter={(e) => {
                if (activeSection !== link.id) {
                  e.currentTarget.style.color = '#f05555ff';
                  e.currentTarget.style.borderColor = '#f05555ff';
                }
              }}
              onMouseLeave={(e) => {
                if (activeSection !== link.id) {
                  e.currentTarget.style.color = '#888';
                  e.currentTarget.style.borderColor = 'transparent';
                }
              }}
            >
              <Icon size={18} />
              {link.label}
            </a>
          );
        })}
      </div>

      {/* Decorative corner elements */}
      <div
        style={{
          position: 'absolute',
          top: '5px',
          right: '5px',
          width: '20px',
          height: '20px',
          borderTop: '2px solid #f05555ff',
          borderRight: '2px solid #f05555ff',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '5px',
          left: '5px',
          width: '20px',
          height: '20px',
          borderBottom: '2px solid #f05555ff',
          borderLeft: '2px solid #f05555ff',
        }}
      />
    </nav>
  );
}