'use client';

import Noise from '../shared/Noise';
import styles from './ProjectsSection.module.css';

interface ProjectsSectionProps {
  scrollY: number;
}

export default function ProjectsSection({ scrollY }: ProjectsSectionProps) {
  return (
    <div id="projects" className={styles.section}>
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
          <div className={styles.projectCard}>
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
          <div className={styles.projectCard}>
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
                  href="#" 
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
          <div className={styles.projectCard}>
            <div className={styles.cardOverlay}></div>
            <div className={styles.projectNoise}>
              <Noise patternAlpha={8} />
            </div>
            
            <div className={styles.projectContent}>
              <div className={styles.projectHeader}>
                <span className={styles.projectName}>
                  &gt; Project Three
                </span>
                <span className={styles.projectType}>
                  [Game Dev]
                </span>
              </div>
              <p className={styles.projectDescription}>
                Third project description. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
              </p>
              
              <div className={styles.projectFooter}>
                <div className={styles.projectTags}>
                  <span className={styles.tag}>Unity</span>
                  <span className={styles.tag}>C#</span>
                  <span className={styles.tag}>Game</span>
                </div>
                
                <a 
                  href="#" 
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
