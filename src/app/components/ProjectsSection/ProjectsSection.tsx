'use client';

import { useState, useEffect, useRef } from 'react';
import Noise from '../shared/Noise';
import styles from './ProjectsSection.module.css';

interface ProjectsSectionProps {
  scrollY: number;
}

export default function ProjectsSection({ scrollY }: ProjectsSectionProps) {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!sectionRef.current) return;

    const updateBounds = () => {
      if (!sectionRef.current) return;
      const el = sectionRef.current;
      // We only care about vertical range to detect leaving the section
      (sectionRef.current as any)._top = el.offsetTop;
      (sectionRef.current as any)._height = el.offsetHeight;
    };

    updateBounds();
    window.addEventListener('resize', updateBounds);
    return () => window.removeEventListener('resize', updateBounds);
  }, []);

  // Clear active card when user scrolls completely outside Projects section
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!sectionRef.current) return;

    const top: number = (sectionRef.current as any)._top ?? sectionRef.current.offsetTop;
    const height: number = (sectionRef.current as any)._height ?? sectionRef.current.offsetHeight;
    if (!height) return;

    const bottom = top + height;
    const viewportTop = scrollY;
    const viewportBottom = scrollY + window.innerHeight;

    const isAbove = viewportBottom < top;
    const isBelow = viewportTop > bottom;

    if ((isAbove || isBelow) && activeProject !== null) {
      setActiveProject(null);
    }
  }, [scrollY, activeProject]);

  const handleProjectClick = (index: number) => {
    setActiveProject(prev => (prev === index ? null : index));
  };

  return (
    <div id="projects" ref={sectionRef} className={styles.section}>
      {/* "My Projects" Title */}
      <div className={styles.titleWrapper}>
        <h2 className={styles.sectionTitle}>
          My Projects
        </h2>
      </div>
      
      {/* Noise Background */}
      <div className={styles.noiseBackground}>
        <Noise patternAlpha={8} />
      </div>
      
      <div className={styles.contentWrapper}>
        {/* Project List */}
        <div className={styles.projectsList}>
          {/* Project 1 */}
          <div
            className={`${styles.projectCard} ${activeProject === 0 ? styles.activeCard : ''}`}
            onClick={() => handleProjectClick(0)}
          >
            <div className={styles.cardOverlay}></div>
            <div className={styles.projectNoise}>
              <Noise patternAlpha={8} />
            </div>
            
            <div className={styles.projectContent}>
              <div className={styles.projectHeader}>
                <span className={styles.projectName}>
                  &gt; DEIChain
                </span>
                <span className={styles.projectType}>
                  [Blockchain Simulation]
                </span>
              </div>
              <p className={styles.projectDescription}>
                A blockchain system simulation implemented in C for educational purposes. Features miners, validators, transaction generators, and statistics tracking using shared memory, semaphores, message queues, and named pipes.
              </p>
              
              <div className={styles.projectFooter}>
                <div className={styles.projectTags}>
                  <span className={styles.tag}>C</span>
                  <span className={styles.tag}>IPC</span>
                  <span className={styles.tag}>Operation Systems</span>
                </div>
                
                <a 
                  href="https://github.com/rodrigomanao/Projeto-SO" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.projectLink}
                >
                  <span className={styles.linkText}>View on GitHub</span>
                  <span className={styles.linkArrow}>→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Project 2 */}
          <div
            className={`${styles.projectCard} ${activeProject === 1 ? styles.activeCard : ''}`}
            onClick={() => handleProjectClick(1)}
          >
            <div className={styles.cardOverlay}></div>
            <div className={styles.projectNoise}>
              <Noise patternAlpha={8} />
            </div>
            
            <div className={styles.projectContent}>
              <div className={styles.projectHeader}>
                <span className={styles.projectName}>
                  &gt; Googol
                </span>
                <span className={styles.projectType}>
                  [Distributed System]
                </span>
              </div>
              <p className={styles.projectDescription}>
                A distributed web indexing and search system implemented in Java with RMI (Remote Method Invocation). The system consists of multiple components that work coordinately to index web pages and enable efficient searches.
              </p>
              
              <div className={styles.projectFooter}>
                <div className={styles.projectTags}>
                  <span className={styles.tag}>Java</span>
                  <span className={styles.tag}>RMI</span>
                  <span className={styles.tag}>Distributed Systems</span>
                </div>
                
                <a 
                  href="https://github.com/rodrigomanao/SD_Project" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.projectLink}
                >
                  <span className={styles.linkText}>View on GitHub</span>
                  <span className={styles.linkArrow}>→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Project 3 */}
          <div
            className={`${styles.projectCard} ${activeProject === 2 ? styles.activeCard : ''}`}
            onClick={() => handleProjectClick(2)}
          >
            <div className={styles.cardOverlay}></div>
            <div className={styles.projectNoise}>
              <Noise patternAlpha={8} />
            </div>
            
            <div className={styles.projectContent}>
              <div className={styles.projectHeader}>
                <span className={styles.projectName}>
                  &gt; PowerUDP 
                </span>
                <span className={styles.projectType}>
                  [Communication Networks]
                </span>
              </div>
              <p className={styles.projectDescription}>
                It implements a UDP-based data protocol ("PowerUDP") with optional reliability features, while using a TCP control channel to register clients and distribute configuration updates. Configuration changes are broadcast to all clients via multicast.
              </p>
              
              <div className={styles.projectFooter}>
                <div className={styles.projectTags}>
                  <span className={styles.tag}>Protocols</span>
                  <span className={styles.tag}>Communication Networks</span>
                  <span className={styles.tag}>C</span>
                </div>
                
                <a 
                  href="https://github.com/rodrigomanao/ProjetoRC" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.projectLink}
                >
                  <span className={styles.linkText}>View on GitHub</span>
                  <span className={styles.linkArrow}>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
