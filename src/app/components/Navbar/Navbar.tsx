'use client';

import { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
] as const;

type SectionId = (typeof LINKS)[number]['id'];

// Shown once the visitor has scrolled a little past the name in the hero.
const SHOW_AFTER = 0.18; // fraction of the viewport height

interface NavBarProps {
  /** `home`: sections on this page, appears after the hero.
   *  `projects`: the /projects page — always shown, links go back to the home sections. */
  page?: 'home' | 'projects';
}

export default function NavBar({ page = 'home' }: NavBarProps) {
  const onHome = page === 'home';
  const [visible, setVisible] = useState(false);
  // /projects: ink colour picked from the gradient behind the logo / links
  const [bandTone, setBandTone] = useState<{ logo: string; links: string }>({ logo: 'light', links: 'light' });
  const [active, setActive] = useState<SectionId>(onHome ? 'home' : 'projects');
  const [indicator, setIndicator] = useState<{ x: number; w: number } | null>(null);

  const linkRefs = useRef<Partial<Record<SectionId, HTMLAnchorElement | null>>>({});
  // While a click-scroll is in flight, keep the clicked tab highlighted
  // instead of letting the observer flick through every section on the way.
  const lockRef = useRef<{ id: SectionId; until: number } | null>(null);

  /* ---------- show / hide ---------- */
  useEffect(() => {
    if (!onHome) {
      // Sub-pages: no hero to wait for, just play the entrance once.
      const t = setTimeout(() => setVisible(true), 120);
      const onTone = (e: Event) => setBandTone((e as CustomEvent<{ logo: string; links: string }>).detail);
      window.addEventListener('projects-nav-tone', onTone);
      return () => {
        clearTimeout(t);
        window.removeEventListener('projects-nav-tone', onTone);
      };
    }
    let ticking = false;
    const update = () => {
      ticking = false;
      const y = window.scrollY;
      setVisible(y > window.innerHeight * SHOW_AFTER);
      if (y < window.innerHeight * 0.4 && !lockRef.current) setActive('home');
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [onHome]);

  /* ---------- active section ---------- */
  useEffect(() => {
    if (!onHome) return;
    const ids: SectionId[] = ['projects', 'about', 'contact'];
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!els.length) return;

    // A thin band across the middle of the viewport decides which section "owns" the screen.
    const io = new IntersectionObserver(
      (entries) => {
        const lock = lockRef.current;
        if (lock && performance.now() < lock.until) return;
        lockRef.current = null;
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId);
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [onHome]);

  /* ---------- sliding underline ---------- */
  const measure = useCallback(() => {
    const el = linkRefs.current[active];
    if (!el) return;
    setIndicator({ x: el.offsetLeft, w: el.offsetWidth });
  }, [active]);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    // Re-measure whenever any item changes size (breakpoints hiding items, fonts loading, rotation…)
    const ro = new ResizeObserver(() => measure());
    // items + their row: hiding one item moves the others without resizing them
    Object.values(linkRefs.current).forEach((el) => {
      if (!el) return;
      ro.observe(el);
      if (el.parentElement) ro.observe(el.parentElement);
    });
    window.addEventListener('resize', measure);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [measure]);

  const handleClick = (id: SectionId) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    lockRef.current = { id, until: performance.now() + 1100 };
    setActive(id);
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      history.replaceState(null, '', ' ');
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', `#${id}`);
    }
  };

  return (
    // Contact sits on the bright orange part of the gradient, so the nav switches to dark ink there.
    <header className={styles.wrap} data-page={page} data-visible={visible} data-tone={onHome ? (active === 'contact' ? 'dark' : 'light') : bandTone.links}
      data-logo-tone={onHome ? undefined : bandTone.logo}>
      <nav className={styles.navbar} aria-label="Main">

        {onHome ? (
          <a
            href="#home"
            className={styles.logo}
            onClick={handleClick('home')}
            aria-label="Rodrigo Manão, back to top"
            tabIndex={visible ? 0 : -1}
          >
            {'<RM/>'}
          </a>
        ) : (
          <Link href="/" className={styles.logo} aria-label="Rodrigo Manão, home" data-nav-logo>
            {'<RM/>'}
          </Link>
        )}

        <div className={styles.links} data-nav-links>
          <span
            className={styles.underline}
            aria-hidden
            data-ready={indicator !== null}
            style={
              indicator
                ? ({ '--x': `${indicator.x}px`, '--w': `${indicator.w}px` } as React.CSSProperties)
                : undefined
            }
          />
          {LINKS.map(({ id, label }) => {
            const common = {
              ref: (el: HTMLAnchorElement | null) => {
                linkRefs.current[id] = el;
              },
              className: styles.link,
              'data-id': id,
              'data-active': active === id,
            };
            return onHome ? (
              <a
                key={id}
                {...common}
                href={`#${id}`}
                onClick={handleClick(id)}
                aria-current={active === id ? 'location' : undefined}
                tabIndex={visible ? 0 : -1}
              >
                {label}
              </a>
            ) : (
              <Link
                key={id}
                {...common}
                href={id === 'home' ? '/' : id === 'projects' ? '/projects' : `/#${id}`}
                aria-current={active === id ? 'page' : undefined}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
