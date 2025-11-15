'use client';

import Noise from './Noise';

interface ProjectsSectionProps {
  scrollY: number;
}

export default function ProjectsSection({ scrollY }: ProjectsSectionProps) {
  const projectsOpacity = Math.min(1, Math.max(0, (scrollY - 50) / 750));
  const scale = 0.95 + (projectsOpacity * 0.05);
  const contentBlur = Math.max(0, 15 - (projectsOpacity * 15));

  const titleText = 'My Projects';

  return (
    <div
      id="projects"
      className="min-h-screen flex flex-col items-center justify-center px-8 py-16 relative"
      style={{
        opacity: projectsOpacity,
        transform: `translateY(${Math.max(0, 20 - scrollY / 20)}px) scale(${scale})`,
        filter: `blur(${contentBlur}px)`,
        transition: 'opacity 0.4s ease-out, transform 0.4s ease-out, filter 0.4s ease-out',
        pointerEvents: projectsOpacity > 0.5 ? 'auto' : 'none',
        backgroundColor: '#070707',
      }}
    >
      {/* Noise Background */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <Noise patternAlpha={8} />
      </div>
      
      <div className="max-w-6xl w-full relative z-10">
        <style jsx global>{`
          @keyframes floatWave {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }
          
          @keyframes colorPulse {
            0%, 100% {
              color: #f05555ff;
              text-shadow: 0 0 10px rgba(240, 85, 85, 0.5);
            }
            50% {
              color: #ff6b6b;
              text-shadow: 0 0 20px rgba(240, 85, 85, 0.8), 0 0 30px rgba(240, 85, 85, 0.4);
            }
          }
          
          @keyframes cursorBlink {
            0%, 49% { opacity: 1; }
            50%, 100% { opacity: 0; }
          }
        `}</style>
        
        <h2 
          className="text-5xl md:text-7xl mb-16 font-mono relative"
          style={{ 
            fontFamily: 'Percy Pixel', 
            color: '#f05555ff',
          }}
        >
          {titleText.split('').map((char, i) => (
            <span
              key={i}
              style={{
                display: 'inline-block',
                animation: `floatWave 3s ease-in-out ${i * 0.1}s infinite, colorPulse 3s ease-in-out ${i * 0.15}s infinite`,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
          <span 
            className="inline-block w-3 h-8 md:h-12 ml-2 bg-[#f05555ff]"
            style={{
              verticalAlign: 'middle',
              animation: 'cursorBlink 1.2s step-end infinite'
            }}
          ></span>
        </h2>
        
        {/* Project List */}
        <div className="space-y-8">
          {/* Project 1 */}
          <div 
            className="group transition-all duration-500 relative"
            style={{ 
              borderRadius: '30px',
              background: '#0a0a0a',
              boxShadow: '20px 20px 40px rgba(0, 0, 0, 0.5), -20px -20px 40px rgba(50, 50, 50, 0.1)',
              padding: '2rem',
              overflow: 'hidden',
              border: '1px solid transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(240, 85, 85, 0.3)';
              e.currentTarget.style.boxShadow = '20px 20px 40px rgba(0, 0, 0, 0.5), -20px -20px 40px rgba(50, 50, 50, 0.1), 0 0 30px rgba(240, 85, 85, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'transparent';
              e.currentTarget.style.boxShadow = '20px 20px 40px rgba(0, 0, 0, 0.5), -20px -20px 40px rgba(50, 50, 50, 0.1)';
            }}
          >
            {/* Noise overlay on card - same as background */}
            <div className="absolute inset-0 pointer-events-none">
              <Noise patternAlpha={8} />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-baseline gap-4 mb-3">
                <span 
                  className="text-3xl md:text-4xl font-mono"
                  style={{ 
                    fontFamily: 'Percy Pixel', 
                    color: '#f05555ff'
                  }}
                >
                  &gt; DEIChain
                </span>
                <span 
                  className="text-sm md:text-base opacity-60"
                  style={{ 
                    fontFamily: 'Percy Pixel', 
                    color: '#fff',
                    letterSpacing: '0.08em'
                  }}
                >
                  [Blockchain Simulation]
                </span>
              </div>
              <p 
                className="text-lg md:text-xl leading-relaxed mb-4"
                style={{ 
                  fontFamily: 'Percy Pixel',
                  color: '#e0e0e0',
                  lineHeight: '2.2',
                  letterSpacing: '0.08em'
                }}
              >
                A blockchain system simulation implemented in C for educational purposes. Features miners, validators, transaction generators, and statistics tracking using shared memory, semaphores, message queues, and named pipes.
              </p>
              
              <div className="flex justify-between items-center">
                <div className="flex gap-3 flex-wrap">
                  <span className="px-3 py-1 text-xs border border-[#f05555ff] rounded" style={{ fontFamily: 'Percy Pixel', color: '#f05555ff' }}>C</span>
                  <span className="px-3 py-1 text-xs border border-[#f05555ff] rounded" style={{ fontFamily: 'Percy Pixel', color: '#f05555ff' }}>IPC</span>
                  <span className="px-3 py-1 text-xs border border-[#f05555ff] rounded" style={{ fontFamily: 'Percy Pixel', color: '#f05555ff' }}>Operation Systems</span>
                </div>
                
                <a 
                  href="https://github.com/rodrigomanao/Projeto-SO" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border-2 border-[#f05555ff] rounded relative overflow-hidden group/btn opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ 
                    fontFamily: 'Percy Pixel', 
                    color: '#f05555ff',
                    textDecoration: 'none'
                  }}
                >
                  <span className="absolute inset-0 bg-[#f05555ff] scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left -z-10"></span>
                  <span className="relative z-10 group-hover/btn:text-black transition-colors duration-300">View on GitHub</span>
                  <span className="relative z-10 group-hover/btn:text-black transition-colors duration-300">→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Project 2 */}
          <div 
            className="group transition-all duration-500 relative"
            style={{ 
              borderRadius: '30px',
              background: '#0a0a0a',
              boxShadow: '20px 20px 40px rgba(0, 0, 0, 0.5), -20px -20px 40px rgba(50, 50, 50, 0.1)',
              padding: '2rem',
              overflow: 'hidden',
              border: '1px solid transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(240, 85, 85, 0.3)';
              e.currentTarget.style.boxShadow = '20px 20px 40px rgba(0, 0, 0, 0.5), -20px -20px 40px rgba(50, 50, 50, 0.1), 0 0 30px rgba(240, 85, 85, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'transparent';
              e.currentTarget.style.boxShadow = '20px 20px 40px rgba(0, 0, 0, 0.5), -20px -20px 40px rgba(50, 50, 50, 0.1)';
            }}
          >
            {/* Noise overlay on card - same as background */}
            <div className="absolute inset-0 pointer-events-none">
              <Noise patternAlpha={8} />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-baseline gap-4 mb-3">
                <span 
                  className="text-3xl md:text-4xl font-mono"
                  style={{ 
                    fontFamily: 'Percy Pixel', 
                    color: '#f05555ff'
                  }}
                >
                  &gt; Googol
                </span>
                <span 
                  className="text-sm md:text-base opacity-60"
                  style={{ 
                    fontFamily: 'Percy Pixel', 
                    color: '#fff',
                    letterSpacing: '0.08em'
                  }}
                >
                  [Distributed System]
                </span>
              </div>
              <p 
                className="text-lg md:text-xl leading-relaxed mb-4"
                style={{ 
                  fontFamily: 'Percy Pixel',
                  color: '#e0e0e0',
                  lineHeight: '2.2',
                  letterSpacing: '0.08em'
                }}
              >
                A distributed web indexing and search system implemented in Java with RMI (Remote Method Invocation). The system consists of multiple components that work coordinately to index web pages and enable efficient searches.
              </p>
              
              <div className="flex justify-between items-center">
                <div className="flex gap-3 flex-wrap">
                  <span className="px-3 py-1 text-xs border border-[#f05555ff] rounded" style={{ fontFamily: 'Percy Pixel', color: '#f05555ff' }}>Java</span>
                  <span className="px-3 py-1 text-xs border border-[#f05555ff] rounded" style={{ fontFamily: 'Percy Pixel', color: '#f05555ff' }}>RMI</span>
                  <span className="px-3 py-1 text-xs border border-[#f05555ff] rounded" style={{ fontFamily: 'Percy Pixel', color: '#f05555ff' }}>Distributed Systems</span>
                </div>
                
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border-2 border-[#f05555ff] rounded relative overflow-hidden group/btn opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ 
                    fontFamily: 'Percy Pixel', 
                    color: '#f05555ff',
                    textDecoration: 'none'
                  }}
                >
                  <span className="absolute inset-0 bg-[#f05555ff] scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left -z-10"></span>
                  <span className="relative z-10 group-hover/btn:text-black transition-colors duration-300">View on GitHub</span>
                  <span className="relative z-10 group-hover/btn:text-black transition-colors duration-300">→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Project 3 */}
          <div 
            className="group transition-all duration-500 relative"
            style={{ 
              borderRadius: '30px',
              background: '#0a0a0a',
              boxShadow: '20px 20px 40px rgba(0, 0, 0, 0.5), -20px -20px 40px rgba(50, 50, 50, 0.1)',
              padding: '2rem',
              overflow: 'hidden',
              border: '1px solid transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(240, 85, 85, 0.3)';
              e.currentTarget.style.boxShadow = '20px 20px 40px rgba(0, 0, 0, 0.5), -20px -20px 40px rgba(50, 50, 50, 0.1), 0 0 30px rgba(240, 85, 85, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'transparent';
              e.currentTarget.style.boxShadow = '20px 20px 40px rgba(0, 0, 0, 0.5), -20px -20px 40px rgba(50, 50, 50, 0.1)';
            }}
          >
            {/* Noise overlay on card - same as background */}
            <div className="absolute inset-0 pointer-events-none">
              <Noise patternAlpha={8} />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-baseline gap-4 mb-3">
                <span 
                  className="text-3xl md:text-4xl font-mono"
                  style={{ 
                    fontFamily: 'Percy Pixel', 
                    color: '#f05555ff'
                  }}
                >
                  &gt; Project Three
                </span>
                <span 
                  className="text-sm md:text-base opacity-60"
                  style={{ 
                    fontFamily: 'Percy Pixel', 
                    color: '#fff',
                    letterSpacing: '0.08em'
                  }}
                >
                  [Game Dev]
                </span>
              </div>
              <p 
                className="text-lg md:text-xl leading-relaxed mb-4"
                style={{ 
                  fontFamily: 'Percy Pixel',
                  color: '#e0e0e0',
                  lineHeight: '2.2',
                  letterSpacing: '0.08em'
                }}
              >
                Third project description. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
              </p>
              
              <div className="flex justify-between items-center">
                <div className="flex gap-3 flex-wrap">
                  <span className="px-3 py-1 text-xs border border-[#f05555ff] rounded" style={{ fontFamily: 'Percy Pixel', color: '#f05555ff' }}>Unity</span>
                  <span className="px-3 py-1 text-xs border border-[#f05555ff] rounded" style={{ fontFamily: 'Percy Pixel', color: '#f05555ff' }}>C#</span>
                  <span className="px-3 py-1 text-xs border border-[#f05555ff] rounded" style={{ fontFamily: 'Percy Pixel', color: '#f05555ff' }}>Game</span>
                </div>
                
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border-2 border-[#f05555ff] rounded relative overflow-hidden group/btn opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ 
                    fontFamily: 'Percy Pixel', 
                    color: '#f05555ff',
                    textDecoration: 'none'
                  }}
                >
                  <span className="absolute inset-0 bg-[#f05555ff] scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left -z-10"></span>
                  <span className="relative z-10 group-hover/btn:text-black transition-colors duration-300">View on GitHub</span>
                  <span className="relative z-10 group-hover/btn:text-black transition-colors duration-300">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
