'use client';

import { useState, useEffect, useRef } from 'react';
import type { ComponentType } from 'react';
import Terminal from './components/FaultyTerminal';
import Noise from './components/Noise';

const TerminalComponent = Terminal as ComponentType<Record<string, unknown>>;

export default function TerminalWrapper() {
  const [scrollY, setScrollY] = useState(0);
  const rafRef = useRef<number | null>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      rafRef.current = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // Calculate opacity based on scroll position
  const heroOpacity = Math.max(0, 1 - scrollY / 500);
  const projectsOpacity = Math.min(1, scrollY / 500);
  const darknessOpacity = Math.min(0.6, scrollY / 600);
  const aboutOpacity = Math.min(1, Math.max(0, (scrollY - 1000) / 500));
  
  return (
    <div style={{ position: 'relative' }}>
      {/* FaultyTerminal Background - Fixed to viewport */}
      <div
        style={{
          width: '100%',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      >
        <TerminalComponent
          scale={2.5}
          gridMul={[2, 1]}
          digitSize={1.3}
          timeScale={1}
          pause={false}
          scanlineIntensity={0.7}
          glitchAmount={1}
          flickerAmount={1}
          noiseAmp={1}
          chromaticAberration={0}
          dither={0}
          curvature={0.1}
          tint="#d32f2f"
          mouseReact={true}
          mouseStrength={1}
          pageLoadAnimation={false}
          brightness={0.4}
        />
        {/* Dark overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            backgroundColor: `rgba(0,0,0,${darknessOpacity})`,
            transition: 'background-color 0.3s ease-out',
          }}
        />
      </div>

      {/* Hero Section */}
      <div
        id="home"
        style={{
          width: '100%',
          height: '100vh',
          position: 'relative',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      >
        {/* Text overlay */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: '#f05555ff',
            fontFamily: 'Percy Pixel',
            animation: 'fadeIn 2s ease-in-out',
            pointerEvents: 'none',
            opacity: heroOpacity,
            transition: 'opacity 0.3s ease-out',
            display: heroOpacity === 0 ? 'none' : undefined,
          }}
        >
          <h1 style={{ fontSize: '10rem', margin: 0 }}>Rodrigo Manão</h1>
          <p style={{ fontSize: '5rem', margin: 0 }}>Portfolio</p>
        </div>
      </div>

      {/* Projects Section */}
      <div
        id="projects"
        className="min-h-screen flex flex-col items-center justify-center px-8 py-16 transition-all duration-300 relative"
        style={{
          opacity: projectsOpacity,
          transform: `translateY(${Math.max(0, 50 - scrollY / 10)}px)`,
          pointerEvents: 'auto',
        }}
      >
        {/* Scanline effect */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, rgba(240, 85, 85, 0.03) 0px, rgba(240, 85, 85, 0.03) 1px, transparent 1px, transparent 2px)',
            zIndex: 1
          }}
        />
        
        <div className="max-w-4xl w-full relative z-10">
          <h2 
            className="text-5xl md:text-7xl mb-16 font-mono"
            style={{ 
              fontFamily: 'Percy Pixel', 
              color: '#f05555ff',
              textShadow: '0 0 10px rgba(240, 85, 85, 0.5)'
            }}
          >
            My Projects
          </h2>
          
          {/* Project List */}
          <div className="space-y-12">
            {/* Project 1 */}
            <div 
              className="group border-l-4 border-[#f05555ff] pl-6 py-4 transition-all duration-300 hover:border-l-8 relative overflow-hidden"
              style={{ 
                backgroundColor: 'rgba(240, 85, 85, 0.05)',
                backdropFilter: 'blur(10px)',
              }}
            >
              {/* Background fill on hover */}
              <div 
                className="absolute inset-0 bg-[#f05555ff] opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10"
              />
              
              <div className="flex items-baseline gap-4 mb-2">
                <span 
                  className="text-2xl md:text-3xl font-mono"
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
                    color: '#fff'
                  }}
                >
                  [Blockchain Simulation]
                </span>
              </div>
              <p 
                className="text-lg md:text-xl leading-relaxed mb-3"
                style={{ 
                  fontFamily: 'Percy Pixel',
                  color: '#e0e0e0',
                  lineHeight: '1.8'
                }}
              >
                A blockchain system simulation implemented in C for educational purposes. Features miners, validators, transaction generators, and statistics tracking using shared memory, semaphores, message queues, and named pipes.
              </p>
              
              <div className="flex gap-3 flex-wrap">
                <span className="px-3 py-1 text-xs border border-[#f05555ff] rounded" style={{ fontFamily: 'Percy Pixel', color: '#f05555ff' }}>C</span>
                <span className="px-3 py-1 text-xs border border-[#f05555ff] rounded" style={{ fontFamily: 'Percy Pixel', color: '#f05555ff' }}>IPC</span>
                <span className="px-3 py-1 text-xs border border-[#f05555ff] rounded" style={{ fontFamily: 'Percy Pixel', color: '#f05555ff' }}>Systems</span>
              </div>
              
              {/* GitHub Button - appears on hover at bottom right */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a 
                  href="https://github.com/rodrigomanao/Projeto-SO" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border-2 border-[#f05555ff] rounded relative overflow-hidden group/btn"
                  style={{ 
                    fontFamily: 'Percy Pixel', 
                    color: '#f05555ff',
                    textDecoration: 'none'
                  }}
                >
                  {/* Fill-in background */}
                  <span className="absolute inset-0 bg-[#f05555ff] scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left -z-10"></span>
                  <span className="relative z-10 group-hover/btn:text-black transition-colors duration-300">View on GitHub</span>
                  <span className="relative z-10 group-hover/btn:text-black transition-colors duration-300">→</span>
                </a>
              </div>
            </div>

            {/* Project 2 */}
            <div 
              className="group border-l-4 border-[#f05555ff] pl-6 py-4 transition-all duration-300 hover:border-l-8 relative overflow-hidden"
              style={{ 
                backgroundColor: 'rgba(240, 85, 85, 0.05)',
                backdropFilter: 'blur(10px)',
              }}
            >
              {/* Background fill on hover */}
              <div 
                className="absolute inset-0 bg-[#f05555ff] opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10"
              />
              
              <div className="flex items-baseline gap-4 mb-2">
                <span 
                  className="text-2xl md:text-3xl font-mono"
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
                    color: '#fff'
                  }}
                >
                  [Distributed System]
                </span>
              </div>
              <p 
                className="text-lg md:text-xl leading-relaxed mb-3"
                style={{ 
                  fontFamily: 'Percy Pixel',
                  color: '#e0e0e0',
                  lineHeight: '1.8'
                }}
              >
                A distributed web indexing and search system implemented in Java with RMI (Remote Method Invocation). The system consists of multiple components that work coordinately to index web pages and enable efficient searches.
              </p>
              
              <div className="flex gap-3 flex-wrap">
                <span className="px-3 py-1 text-xs border border-[#f05555ff] rounded" style={{ fontFamily: 'Percy Pixel', color: '#f05555ff' }}>Java</span>
                <span className="px-3 py-1 text-xs border border-[#f05555ff] rounded" style={{ fontFamily: 'Percy Pixel', color: '#f05555ff' }}>RMI</span>
                <span className="px-3 py-1 text-xs border border-[#f05555ff] rounded" style={{ fontFamily: 'Percy Pixel', color: '#f05555ff' }}>Distributed Systems</span>
              </div>
              
              {/* GitHub Button - appears on hover at bottom right */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border-2 border-[#f05555ff] rounded relative overflow-hidden group/btn"
                  style={{ 
                    fontFamily: 'Percy Pixel', 
                    color: '#f05555ff',
                    textDecoration: 'none'
                  }}
                >
                  {/* Fill-in background */}
                  <span className="absolute inset-0 bg-[#f05555ff] scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left -z-10"></span>
                  <span className="relative z-10 group-hover/btn:text-black transition-colors duration-300">View on GitHub</span>
                  <span className="relative z-10 group-hover/btn:text-black transition-colors duration-300">→</span>
                </a>
              </div>
            </div>

            {/* Project 3 */}
            <div 
              className="group border-l-4 border-[#f05555ff] pl-6 py-4 transition-all duration-300 hover:border-l-8 relative overflow-hidden"
              style={{ 
                backgroundColor: 'rgba(240, 85, 85, 0.05)',
                backdropFilter: 'blur(10px)',
              }}
            >
              {/* Background fill on hover */}
              <div 
                className="absolute inset-0 bg-[#f05555ff] opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10"
              />
              
              <div className="flex items-baseline gap-4 mb-2">
                <span 
                  className="text-2xl md:text-3xl font-mono"
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
                    color: '#fff'
                  }}
                >
                  [Game Dev]
                </span>
              </div>
              <p 
                className="text-lg md:text-xl leading-relaxed mb-3"
                style={{ 
                  fontFamily: 'Percy Pixel',
                  color: '#e0e0e0',
                  lineHeight: '1.8'
                }}
              >
                Third project description. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
              </p>
              
              <div className="flex gap-3 flex-wrap">
                <span className="px-3 py-1 text-xs border border-[#f05555ff] rounded" style={{ fontFamily: 'Percy Pixel', color: '#f05555ff' }}>Unity</span>
                <span className="px-3 py-1 text-xs border border-[#f05555ff] rounded" style={{ fontFamily: 'Percy Pixel', color: '#f05555ff' }}>C#</span>
                <span className="px-3 py-1 text-xs border border-[#f05555ff] rounded" style={{ fontFamily: 'Percy Pixel', color: '#f05555ff' }}>Game</span>
              </div>
              
              {/* GitHub Button - appears on hover at bottom right */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a 
                  href="#" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 border-2 border-[#f05555ff] rounded relative overflow-hidden group/btn"
                  style={{ 
                    fontFamily: 'Percy Pixel', 
                    color: '#f05555ff',
                    textDecoration: 'none'
                  }}
                >
                  {/* Fill-in background */}
                  <span className="absolute inset-0 bg-[#f05555ff] scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left -z-10"></span>
                  <span className="relative z-10 group-hover/btn:text-black transition-colors duration-300">View on GitHub</span>
                  <span className="relative z-10 group-hover/btn:text-black transition-colors duration-300">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div
        id="about"
        className="min-h-screen flex flex-col items-center justify-center px-8 py-16 transition-all duration-300 relative"
        style={{
          opacity: aboutOpacity,
          transform: `translateY(${Math.max(0, 50 - (scrollY - 1000) / 10)}px)`,
          pointerEvents: 'auto',
        }}
      >
        {/* Scanline effect */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, rgba(240, 85, 85, 0.03) 0px, rgba(240, 85, 85, 0.03) 1px, transparent 1px, transparent 2px)',
            zIndex: 1
          }}
        />
        
        <div className="max-w-5xl w-full relative z-10">
          <h2 
            className="text-5xl md:text-7xl mb-16 font-mono"
            style={{ 
              fontFamily: 'Percy Pixel', 
              color: '#f05555ff',
              textShadow: '0 0 10px rgba(240, 85, 85, 0.5)'
            }}
          >
            $ whoami
          </h2>
          
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
                    lineHeight: '2'
                  }}
                >
                  I&apos;m a Computer Science student passionate about systems programming, distributed systems, and building cool stuff with code. 
                  I love diving deep into how things work under the hood, from low-level C programming to distributed architectures. 
                  When I&apos;m not coding, you&apos;ll find me exploring new technologies or working on challenging projects.
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
                      {['Java', 'C', 'JavaScript', 'TypeScript', 'Python'].map((skill, i) => (
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
                              color: '#e0e0e0'
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
                      {['React', 'Next.js', 'RMI', 'Docker', 'Git'].map((skill, i) => (
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
                              color: '#e0e0e0'
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
                
                <div className="grid md:grid-cols-3 gap-4 pl-6">
                  {[
                    { label: 'Location', value: 'Portugal' },
                    { label: 'Education', value: 'Computer Science' },
                    { label: 'Status', value: 'Available' }
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
                            color: '#e0e0e0'
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
    </div>
  );
}