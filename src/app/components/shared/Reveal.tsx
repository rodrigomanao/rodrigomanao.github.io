'use client';

import { useEffect, useRef, type ElementType, type ReactNode, type CSSProperties } from 'react';

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Delay in ms before this element starts revealing */
  delay?: number;
  style?: CSSProperties;
  /** Fraction of the element that must be visible first */
  amount?: number;
}

/**
 * Fades + lifts + un-blurs its content the first time it scrolls into view.
 * Works off IntersectionObserver, so it is the same on every screen size
 * (no hard-coded scroll offsets) and costs nothing while scrolling.
 */
export default function Reveal({
  children,
  as: Tag = 'div',
  className = '',
  delay = 0,
  style,
  amount = 0.2,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      el.dataset.revealed = 'true';
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.revealed = 'true';
          io.disconnect();
        }
      },
      { threshold: amount, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [amount]);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      style={{ ...style, '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
