'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Reveal from '../shared/Reveal';
import styles from './ProjectsSection.module.css';

const PROJECTS = [
  {
    name: 'DEIChain',
    type: 'Blockchain Simulation',
    description:
      'A blockchain system simulation implemented in C for educational purposes. Features miners, validators, transaction generators, and statistics tracking using shared memory, semaphores, message queues, and named pipes.',
    tags: ['C', 'IPC', 'Operation Systems'],
    url: 'https://github.com/rodrigomanao/Projeto-SO',
  },
  {
    name: 'Googol',
    type: 'Distributed System',
    description:
      'A distributed web indexing and search system implemented in Java with RMI (Remote Method Invocation). The system consists of multiple components that work coordinately to index web pages and enable efficient searches.',
    tags: ['Java', 'RMI', 'Distributed Systems'],
    url: 'https://github.com/rodrigomanao/SD_Project',
  },
  {
    name: 'Comp_Project',
    type: 'Java Compiler Project',
    description:
      'A compiler project that transforms source code into executable output through lexical analysis, parsing, and semantic processing.',
    tags: ['Compiler', 'Parsing', 'C'],
    url: 'https://github.com/rodrigomanao/Comp_Project',
  },
];

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Clear the tapped card once the section leaves the screen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) setActiveProject(null);
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggle = (index: number) => setActiveProject((prev) => (prev === index ? null : index));

  return (
    <section id="projects" ref={sectionRef} className={styles.section}>
      <Reveal className={styles.titleWrapper}>
        <h2 className={styles.sectionTitle}>My Projects</h2>
      </Reveal>

      <div className={styles.contentWrapper}>
        <div className={styles.projectsList}>
          {PROJECTS.map((p, i) => (
            <Reveal key={p.name} delay={i * 90} amount={0.25}>
              <article
                className={`${styles.projectCard} ${activeProject === i ? styles.activeCard : ''}`}
                onClick={() => toggle(i)}
              >
                <div className={styles.cardOverlay} aria-hidden />
                <div className={styles.projectContent}>
                  <div className={styles.projectHeader}>
                    <h3 className={styles.projectName}>&gt; {p.name}</h3>
                    <span className={styles.projectType}>[{p.type}]</span>
                  </div>
                  <p className={styles.projectDescription}>{p.description}</p>

                  <div className={styles.projectFooter}>
                    <ul className={styles.projectTags}>
                      {p.tags.map((t) => (
                        <li key={t} className={styles.tag}>
                          {t}
                        </li>
                      ))}
                    </ul>

                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.projectLink}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className={styles.linkText}>View on GitHub</span>
                      <span className={styles.linkArrow} aria-hidden>
                        →
                      </span>
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {/* No Reveal wrapper here: fading an ancestor of animated gradient text
          (background-clip: text) can leave it unpainted until hover in some browsers. */}
      <div className={styles.allProjectsWrap}>
        <Link href="/projects" className={styles.allProjectsLink}>
          View all projects
        </Link>
      </div>
    </section>
  );
}
