'use client';

import { useCallback, useLayoutEffect, useMemo, useRef, useState, useEffect } from 'react';
import Reveal from '../components/shared/Reveal';
import styles from './projects.module.css';

export interface ProjectItem {
  id: number;
  name: string;
  summary: string;
  url: string;
  language: string;
  created: string;
  updated: string;
}

export default function ProjectsBrowser({ projects }: { projects: ProjectItem[] }) {
  const [filter, setFilter] = useState('All');
  const [marker, setMarker] = useState<{ x: number; w: number } | null>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Languages, most used first
  const tabs = useMemo(() => {
    const counts = new Map<string, number>();
    projects.forEach((p) => counts.set(p.language, (counts.get(p.language) ?? 0) + 1));
    const langs = [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
    return [['All', projects.length] as const, ...langs];
  }, [projects]);

  const shown = filter === 'All' ? projects : projects.filter((p) => p.language === filter);

  /* the gradient underline slides to the selected tab, like the navbar */
  const measure = useCallback(() => {
    const el = tabRefs.current[filter];
    if (el) setMarker({ x: el.offsetLeft, w: el.offsetWidth });
  }, [filter]);

  useLayoutEffect(measure, [measure]);

  useEffect(() => {
    // Re-measure whenever any item changes size (breakpoints hiding items, fonts loading, rotation…)
    const ro = new ResizeObserver(() => measure());
    // items + their row: hiding one item moves the others without resizing them
    Object.values(tabRefs.current).forEach((el) => {
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

  const select = (lang: string) => {
    setFilter(lang);
    // on phones the tab row scrolls sideways: keep the chosen tab in view
    tabRefs.current[lang]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  return (
    <>
      {tabs.length > 2 && (
        <Reveal delay={260} className={styles.filters}>
          <div className={styles.filterScroller}>
            <div role="group" aria-label="Filter projects by language" className={styles.filterList}>
              <span
                className={styles.filterMarker}
                aria-hidden
                data-ready={marker !== null}
                style={
                  marker
                    ? ({ '--x': `${marker.x}px`, '--w': `${marker.w}px` } as React.CSSProperties)
                    : undefined
                }
              />
              {tabs.map(([lang, count]) => (
                <button
                  key={lang}
                  ref={(el) => {
                    tabRefs.current[lang] = el;
                  }}
                  type="button"
                  className={styles.filter}
                  data-active={filter === lang}
                  aria-pressed={filter === lang}
                  onClick={() => select(lang)}
                >
                  {lang}
                  <span className={styles.srOnly}>, {count} projects</span>
                </button>
              ))}
            </div>
          </div>
        </Reveal>
      )}

      {/* re-keyed so the list re-enters with its stagger when the filter changes */}
      <ol key={filter} className={styles.repositoryList}>
        {shown.map((p, i) => (
          <li key={p.id} className={styles.item} style={{ '--i': Math.min(i, 8) } as React.CSSProperties}>
            <a href={p.url} target="_blank" rel="noopener noreferrer" className={styles.repository}>
              <span className={styles.cardOverlay} aria-hidden="true" />
              <span className={styles.index} aria-hidden="true">
                {String(projects.indexOf(p) + 1).padStart(2, '0')}
              </span>
              <div className={styles.body}>
                <div className={styles.repositoryHeader}>
                  <h2 className={styles.name}>&gt; {p.name}</h2>
                  <span className={styles.lang}>{p.language}</span>
                </div>
                <p className={styles.summary}>{p.summary}</p>
                <div className={styles.repositoryFooter}>
                  <span className={styles.meta}>
                    Updated {p.updated}
                    <span className={styles.dot} aria-hidden>
                      ·
                    </span>
                    Created {p.created}
                  </span>
                  <span className={styles.viewLabel}>
                    View on GitHub <span className={styles.arrow}>→</span>
                  </span>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ol>
    </>
  );
}
