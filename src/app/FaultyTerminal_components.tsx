'use client';

import { useState, useEffect, useRef } from 'react';
import type { ComponentType } from 'react';
import Terminal from './components/FaultyTerminal';

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
  
  return (
    <div style={{ height: '200vh' }}>
      {/* Hero Section */}
      <div
      id="home"
        style={{
          width: '100%',
          height: '100vh',
          position: 'sticky',
          top: 0,
        }}
      >
        {/* FaultyTerminal rendering */}
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
        {/* Dark overlay using darknessOpacity to avoid unused variable */}
        <div

          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            backgroundColor: `rgba(0,0,0,${darknessOpacity})`,
            transition: 'background-color 0.3s ease-out',
          }}
        />

        
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
                  &gt; Project Two
                </span>
                <span 
                  className="text-sm md:text-base opacity-60"
                  style={{ 
                    fontFamily: 'Percy Pixel', 
                    color: '#fff'
                  }}
                >
                  [Mobile App]
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
                Another project description. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              
              <div className="flex gap-3 flex-wrap">
                <span className="px-3 py-1 text-xs border border-[#f05555ff] rounded" style={{ fontFamily: 'Percy Pixel', color: '#f05555ff' }}>React Native</span>
                <span className="px-3 py-1 text-xs border border-[#f05555ff] rounded" style={{ fontFamily: 'Percy Pixel', color: '#f05555ff' }}>Mobile</span>
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
    </div>
  );
}