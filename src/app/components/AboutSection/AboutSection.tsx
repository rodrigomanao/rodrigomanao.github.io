'use client';

import Noise from '../shared/Noise';
import styles from './AboutSection.module.css';

interface AboutSectionProps {
  scrollY: number;
}

export default function AboutSection({ scrollY }: AboutSectionProps) {
  const contentOpacity = Math.min(1, Math.max(0, (scrollY - 1000) / 500));

  return (
    <div id="about" className={styles.section}>
      {/* Noise Background */}
      <div className={styles.noiseBackground}>
        <Noise patternAlpha={8} />
      </div>
      
      <div 
        className={styles.contentWrapper}
        style={{
          opacity: contentOpacity,
          transform: `translateY(${Math.max(0, 30 - (scrollY - 1000) / 15)}px)`,
        }}
      >
        <div className="mb-16 flex items-center">
          <pre className={styles.asciiArt}>
{`
__        ___                               ___  
\\ \\      / / |__   ___     __ _ _ __ ___   |_ _| 
 \\ \\ /\\ / /| '_ \\ / _ \\   / _\` | '_ \`  _ \\  | |  
  \\ V  V / | | | | (_) | | (_| | | | | | |  | |  
   \\_/\\_/  |_| |_|\\___/   \\__,_|_| |_| |_| |___|
`}
          </pre>
        </div>
        
        {/* Terminal Window */}
        <div className={styles.terminalWindow}>
          {/* Noise Background */}
          <Noise
            patternSize={250}
            patternScaleX={1}
            patternScaleY={1}
            patternRefreshInterval={2}
            patternAlpha={15}
          />
          
          {/* Terminal Header */}
          <div className={styles.terminalHeader}>
            <div className={styles.terminalDots}>
              <div className={`${styles.dot} ${styles.dot1}`}></div>
              <div className={`${styles.dot} ${styles.dot2}`}></div>
              <div className={`${styles.dot} ${styles.dot3}`}></div>
            </div>
            <span className={styles.terminalTitle}>about.sh</span>
          </div>
          
          {/* Terminal Content */}
          <div className={styles.terminalContent}>
            {/* Bio Section */}
            <div className={styles.bioSection}>
              <div className={styles.commandPrompt}>
                <span>&gt; cat rodrigo.txt</span>
                <span className={styles.cursor}></span>
              </div>
              <p className={styles.bioText}>
                I am a Computer Science and Engineering student with a deep curiosity for understanding how things work, which has been the main reason why I chose this field. 
                Since a young age,I&apos; ve always been fascinated by technology and the logic behind systems, and that enthusiasm has grown even stronger throughout my academic journey. 
                I&apos;m passionate about problem-solving, innovation, and constantly learning new concepts. 
                My goal is to develop creative and efficient solutions toreal-world problems while continuously improving my technical and personal skills.
              </p>
            </div>

            {/* Skills Section */}
            <div className={styles.skillsSection}>
              <div className={styles.commandPrompt}>
                &gt; ls -la skills/
              </div>
              
              <div className={styles.skillsGrid}>
                {/* Languages */}
                <div className={styles.skillCategory}>
                  <div className={styles.categoryHeader}>
                    <span>├─</span>
                    <span>languages/</span>
                  </div>
                  <div className={styles.skillsList}>
                    {['Java', 'C', 'PostgreSQL', 'TypeScript', 'Python'].map((skill, i) => (
                      <div key={skill} className={styles.skillItem}>
                        <span className={styles.skillIcon}>
                          {i === 4 ? '└─' : '├─'}
                        </span>
                        <span className={styles.skillTag}>
                          <span>{skill}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div className={styles.skillCategory}>
                  <div className={styles.categoryHeader}>
                    <span>└─</span>
                    <span>technologies/</span>
                  </div>
                  <div className={styles.skillsList}>
                    {['React', 'Next.js', 'CSS', 'Docker', 'Git'].map((skill, i) => (
                      <div key={skill} className={styles.skillItem}>
                        <span className={styles.skillIcon}>
                          {i === 4 ? '└─' : '├─'}
                        </span>
                        <span className={styles.skillTag}>
                          <span>{skill}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats/Info */}
            <div className={styles.statsSection}>
              <div className={styles.commandPrompt}>
                &gt; cat stats.json
              </div>
              
              <div className={styles.statsGrid}>
                {[
                  { label: 'Location', value: 'Portugal, Anadia' },
                  { label: 'Education', value: 'Computer Science and Engineering at University of Coimbra' },
                ].map((stat) => (
                  <div key={stat.label} className={styles.statCard}>
                    <div className={styles.statContent}>
                      <div className={styles.statLabel}>
                        {stat.label}:
                      </div>
                      <div className={styles.statValue}>
                        &quot;{stat.value}&quot;
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
