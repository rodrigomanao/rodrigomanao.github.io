'use client';

import { useState, useEffect, useRef } from 'react';
import { HiHome, HiCode, HiUser, HiMail } from 'react-icons/hi';
import styles from './Navbar.module.css';

export default function NavBar() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = ['projects', 'about', 'contact'];

    // When near the very top, always show Home as active.
    if (window.scrollY < 100) {
      setActiveSection('home');
      return;
    }

    const viewportCenter = window.innerHeight / 2;
    let closestId: string | null = null;
    let closestDistance = Infinity;

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const sectionCenter = rect.top + rect.height / 2;
      const distance = Math.abs(sectionCenter - viewportCenter);

      if (distance < closestDistance) {
        closestDistance = distance;
        closestId = id;
      }
    });

    if (closestId) {
      setActiveSection(closestId);
    }
  }, [scrollY]);

  const navbarVisible = scrollY > 100;

  const links = [
    { id: 'home', label: 'HOME', icon: HiHome },
    { id: 'projects', label: 'PROJECTS', icon: HiCode },
    { id: 'about', label: 'ABOUT', icon: HiUser },
    { id: 'contact', label: 'CONTACT', icon: HiMail },
  ];

  return (
    <nav className={`${styles.navbar} ${navbarVisible ? styles.visible : styles.hidden}`}>
      {/* Logo */}
      <div className={styles.logo}>
        {'<RM/>'}
      </div>

      {/* Navigation Links */}
      <div className={styles.navLinks}>
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <a
              key={link.id}
              href={link.id === 'home' ? undefined : `#${link.id}`}
              className={`${styles.navLink} ${activeSection === link.id ? styles.active : ''}`}
              onClick={link.id === 'home' ? (e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); } : undefined}
            >
              <Icon size={18} />
              <span className={styles.linkText}>{link.label}</span>
            </a>
          );
        })}
      </div>

      {/* Decorative corner elements */}
      <div className={styles.cornerTopRight} />
      <div className={styles.cornerBottomLeft} />
    </nav>
  );
}
