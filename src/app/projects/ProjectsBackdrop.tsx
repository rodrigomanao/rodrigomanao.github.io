'use client';

import { useEffect, useRef } from 'react';
import Grainient from '../components/shared/Grainient';
import styles from './ProjectsBackdrop.module.css';

export type NavTone = { logo: 'light' | 'dark'; links: 'light' | 'dark' };
export const NAV_TONE_EVENT = 'projects-nav-tone';

// how much the black fade overlay covers the gradient at a given height (matches the CSS)
function fadeAlpha(fy: number) {
  const stops: Array<[number, number]> = [[0, 0], [0.5, 0], [0.7, 0.55], [0.86, 0.9], [1, 1]];
  if (fy <= 0) return 0;
  if (fy >= 1) return 1;
  for (let i = 1; i < stops.length; i++) {
    const [y1, a1] = stops[i];
    const [y0, a0] = stops[i - 1];
    if (fy <= y1) return a0 + ((fy - y0) / (y1 - y0)) * (a1 - a0);
  }
  return 1;
}

/**
 * The home hero's moving gradient, reused as the top of /projects.
 * It fades into black below the title and, like the hero, blurs and
 * darkens as you scroll past it.
 * It also reads the gradient's brightness behind the navbar so the logo and
 * links can switch to black ink when it gets bright.
 */
export default function ProjectsBackdrop() {
  const bgRef = useRef<HTMLDivElement>(null);
  const darkRef = useRef<HTMLDivElement>(null);
  const darkness = useRef(0);
  const points = useRef<Array<[number, number]>>([]);
  const tone = useRef<NavTone>({ logo: 'light', links: 'light' });

  /* Where the logo and the links sit over the gradient, as fractions of it */
  const samplePoints = () => {
    const box = bgRef.current?.getBoundingClientRect();
    const logo = document.querySelector<HTMLElement>('[data-nav-logo]');
    const links = document.querySelector<HTMLElement>('[data-nav-links]');
    if (!box || !logo || !links || !box.width || !box.height) return null;
    points.current = [logo, links].map((el) => {
      const r = el.getBoundingClientRect();
      return [(r.left + r.width / 2 - box.left) / box.width, (r.top + r.height / 2 - box.top) / box.height];
    });
    return points.current.map(([x, y]) => [Math.min(1, Math.max(0, x)), Math.min(1, Math.max(0, y))] as [number, number]);
  };

  /* Brightness actually seen behind each element → dark or light ink, with a
     little hysteresis so it doesn't flicker on the boundary */
  const setTone = (next: NavTone) => {
    if (next.logo !== tone.current.logo || next.links !== tone.current.links) {
      tone.current = next;
      window.dispatchEvent(new CustomEvent<NavTone>(NAV_TONE_EVENT, { detail: next }));
    }
  };

  const onSample = (lumas: number[]) => {
    const next = lumas.map((l, i) => {
      const [, fy] = points.current[i] ?? [0, 2];
      const seen = fy > 1 ? 0 : l * (1 - fadeAlpha(fy)) * (1 - darkness.current);
      const was = i === 0 ? tone.current.logo : tone.current.links;
      if (was === 'light') return seen > 0.5 ? 'dark' : 'light';
      return seen < 0.42 ? 'light' : 'dark';
    }) as Array<'light' | 'dark'>;
    setTone({ logo: next[0], links: next[1] });
  };

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;

    const apply = () => {
      frame = 0;
      const vh = window.innerHeight || 1;
      const y = window.scrollY;
      // Past the bright part of the band the page behind the nav is black:
      // switch to light ink right away instead of waiting for the next sample.
      const band = bgRef.current?.offsetHeight ?? vh;
      if (y > band * 0.4) setTone({ logo: 'light', links: 'light' });
      if (y > vh * 1.2) {
        darkness.current = 0.75;
        return;
      }
      const p = Math.min(1, y / (vh * 0.6));
      const eased = 1 - Math.pow(1 - p, 3);
      if (bgRef.current) {
        bgRef.current.style.filter = reduce || eased < 0.01 ? '' : `blur(${(eased * 12).toFixed(2)}px)`;
        bgRef.current.style.transform = reduce ? '' : `scale(${1 + eased * 0.06})`;
      }
      darkness.current = eased * 0.75;
      if (darkRef.current) darkRef.current.style.opacity = String(darkness.current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className={styles.backdrop} aria-hidden>
      <div ref={bgRef} className={styles.gradient}>
        <div className={styles.inner}>
          {/* same settings as the home hero */}
          <Grainient
            samplePoints={samplePoints}
            onSample={onSample}
            color1="#ff8647"
            color2="#e63b7a"
            color3="#000000"
            timeSpeed={0.25}
            colorBalance={-0.1}
            warpStrength={1.9}
            warpFrequency={5}
            warpSpeed={2.2}
            warpAmplitude={47}
            blendAngle={60}
            blendSoftness={0.25}
            rotationAmount={590}
            noiseScale={2}
            grainAmount={0.09}
            grainScale={2}
            grainAnimated={false}
            contrast={1.45}
            gamma={0.9}
            saturation={1}
            centerX={0}
            centerY={0}
            zoom={0.6}
          />
        </div>
      </div>
      <div ref={darkRef} className={styles.dark} />
      <div className={styles.fade} />
    </div>
  );
}
