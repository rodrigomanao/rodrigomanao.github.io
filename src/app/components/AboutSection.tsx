'use client';

import Noise from './Noise';

interface AboutSectionProps {
  scrollY: number;
}

export default function AboutSection({ scrollY }: AboutSectionProps) {
  const contentOpacity = Math.min(1, Math.max(0, (scrollY - 1000) / 500));

  return (
    <div
      id="about"
      className="min-h-screen flex flex-col items-center justify-center px-8 py-16 relative"
      style={{
        pointerEvents: 'auto',
        backgroundColor: '#070707',
      }}
    >
      {/* Noise Background */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <Noise patternAlpha={8} />
      </div>
      
      
      <div 
        className="max-w-6xl w-full relative z-10 transition-all duration-500"
        style={{
          opacity: contentOpacity,
          transform: `translateY(${Math.max(0, 30 - (scrollY - 1000) / 15)}px)`,
        }}
      >
        <style jsx global>{`
          @keyframes bounceScale {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.08);
            }
          }
          
          @keyframes glowPulse {
            0%, 100% {
              filter: drop-shadow(0 0 5px rgba(240, 85, 85, 0.3));
            }
            50% {
              filter: drop-shadow(0 0 15px rgba(240, 85, 85, 0.8));
            }
          }
          
          @keyframes cursorBlink2 {
            0%, 49% { opacity: 1; }
            50%, 100% { opacity: 0; }
          }
        `}</style>
        
        <div className="mb-16 flex items-center">
          <pre
            className="text-xs sm:text-sm md:text-base"
            style={{
              fontFamily: 'monospace',
              color: '#f05555ff',
              lineHeight: '1.1',
              overflow: 'visible',
            }}
          >
{`
__        ___                            ___  
\\ \\      / / |__   ___    __ _ _ __ ___ |_ _| 
 \\ \\ /\\ / /| '_ \\ / _ \\  / _\` | '_ \` _ \\ | |  
  \\ V  V / | | | | (_) || (_| | | | | | || |  
   \\_/\\_/  |_| |_|\\___/  \\__,_|_| |_| |_|___|
`}
          </pre>
        </div>
        
        {/* Terminal Window */}
        <div 
          className="group border-2 border-[#f05555ff] rounded-lg overflow-hidden relative"
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 0 30px rgba(240, 85, 85, 0.3)'
          }}
        >
          {/* Noise Background */}
          <Noise
            patternSize={250}
            patternScaleX={1}
            patternScaleY={1}
            patternRefreshInterval={2}
            patternAlpha={15}
          />
          
          {/* Terminal Header */}
          <div 
            className="flex items-center gap-2 px-4 py-3 border-b-2 border-[#f05555ff]"
            style={{ backgroundColor: 'rgba(240, 85, 85, 0.1)' }}
          >
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#f05555ff] opacity-60"></div>
              <div className="w-3 h-3 rounded-full bg-[#f05555ff] opacity-40"></div>
              <div className="w-3 h-3 rounded-full bg-[#f05555ff] opacity-20"></div>
            </div>
            <span 
              className="ml-4 text-sm"
              style={{ 
                fontFamily: 'Percy Pixel', 
                color: '#f05555ff'
              }}
            >
              about.sh
            </span>
          </div>
          
          {/* Terminal Content */}
          <div className="p-8 space-y-8">
            {/* Bio Section */}
            <div>
              <div 
                className="mb-4 flex items-center gap-2"
                style={{ 
                  fontFamily: 'Percy Pixel', 
                  color: '#f05555ff'
                }}
              >
                <span className="text-xl">&gt; cat rodrigo.txt</span>
                <span className="inline-block w-2 h-5 bg-[#f05555ff] animate-pulse"></span>
              </div>
              <p 
                className="text-lg md:text-xl leading-relaxed pl-6"
                style={{ 
                  fontFamily: 'Percy Pixel',
                  color: '#e0e0e0',
                  lineHeight: '2.2',
                  letterSpacing: '0.08em'
                }}
              >
                I am a Computer Science and Engineering student with a deep curiosity for understanding how things work, which has been the main reason why I chose this field. 
                Since a young age,I&apos; ve always been fascinated by technology and the logic behind systems, and that enthusiasm has grown even stronger throughout my academic journey. 
                I&apos;m passionate about problem-solving, innovation, and constantly learning new concepts. 
                My goal is to develop creative and efficient solutions toreal-world problems while continuously improving my technical and personal skills.
              </p>
            </div>

            {/* Skills Section */}
            <div>
              <div 
                className="mb-6 text-xl"
                style={{ 
                  fontFamily: 'Percy Pixel', 
                  color: '#f05555ff'
                }}
              >
                &gt; ls -la skills/
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 pl-6">
                {/* Languages */}
                <div>
                  <div 
                    className="mb-4 text-lg flex items-center gap-2"
                    style={{ 
                      fontFamily: 'Percy Pixel', 
                      color: '#f05555ff',
                      opacity: 0.8
                    }}
                  >
                    <span>├─</span>
                    <span>languages/</span>
                  </div>
                  <div className="space-y-3 pl-6">
                    {['Java', 'C', 'PostgreSQL', 'TypeScript', 'Python'].map((skill, i) => (
                      <div 
                        key={skill}
                        className="group/skill flex items-center gap-3 transition-all duration-300 hover:translate-x-2"
                      >
                        <span 
                          className="text-base"
                          style={{ 
                            fontFamily: 'Percy Pixel', 
                            color: '#f05555ff',
                            opacity: 0.6
                          }}
                        >
                          {i === 4 ? '└─' : '├─'}
                        </span>
                        <span 
                          className="px-3 py-2 border border-[#f05555ff] rounded flex-1 relative overflow-hidden"
                          style={{ 
                            fontFamily: 'Percy Pixel', 
                            color: '#e0e0e0',
                            letterSpacing: '0.08em'
                          }}
                        >
                          <span className="absolute inset-0 bg-[#f05555ff] scale-x-0 group-hover/skill:scale-x-100 transition-transform duration-300 origin-left opacity-10"></span>
                          <span className="relative z-10">{skill}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <div 
                    className="mb-4 text-lg flex items-center gap-2"
                    style={{ 
                      fontFamily: 'Percy Pixel', 
                      color: '#f05555ff',
                      opacity: 0.8
                    }}
                  >
                    <span>└─</span>
                    <span>technologies/</span>
                  </div>
                  <div className="space-y-3 pl-6">
                    {['React', 'Next.js', 'CSS', 'Docker', 'Git'].map((skill, i) => (
                      <div 
                        key={skill}
                        className="group/skill flex items-center gap-3 transition-all duration-300 hover:translate-x-2"
                      >
                        <span 
                          className="text-base"
                          style={{ 
                            fontFamily: 'Percy Pixel', 
                            color: '#f05555ff',
                            opacity: 0.6
                          }}
                        >
                          {i === 4 ? '└─' : '├─'}
                        </span>
                        <span 
                          className="px-3 py-2 border border-[#f05555ff] rounded flex-1 relative overflow-hidden"
                          style={{ 
                            fontFamily: 'Percy Pixel', 
                            color: '#e0e0e0',
                            letterSpacing: '0.08em'
                          }}
                        >
                          <span className="absolute inset-0 bg-[#f05555ff] scale-x-0 group-hover/skill:scale-x-100 transition-transform duration-300 origin-left opacity-10"></span>
                          <span className="relative z-10">{skill}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats/Info */}
            <div>
              <div 
                className="mb-6 text-xl"
                style={{ 
                  fontFamily: 'Percy Pixel', 
                  color: '#f05555ff'
                }}
              >
                &gt; cat stats.json
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 pl-6">
                {[
                  { label: 'Location', value: 'Portugal, Anadia' },
                  { label: 'Education', value: 'Computer Science and Engineering at University of Coimbra' },
                ].map((stat) => (
                  <div 
                    key={stat.label}
                    className="border border-[#f05555ff] rounded p-4 relative overflow-hidden group/stat hover:border-2 transition-all duration-300"
                    style={{ backgroundColor: 'rgba(240, 85, 85, 0.05)' }}
                  >
                    <div className="absolute inset-0 bg-[#f05555ff] scale-y-0 group-hover/stat:scale-y-100 transition-transform duration-300 origin-bottom opacity-5"></div>
                    <div className="relative z-10">
                      <div 
                        className="text-sm opacity-60 mb-2"
                        style={{ 
                          fontFamily: 'Percy Pixel', 
                          color: '#f05555ff'
                        }}
                      >
                        {stat.label}:
                      </div>
                      <div 
                        className="text-lg"
                        style={{ 
                          fontFamily: 'Percy Pixel', 
                          color: '#e0e0e0',
                          letterSpacing: '0.08em'
                        }}
                      >
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
