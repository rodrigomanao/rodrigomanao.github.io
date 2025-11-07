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
        className="min-h-screen flex flex-col items-center justify-center px-8 py-16 transition-all duration-300"
        style={{
          opacity: projectsOpacity,
          transform: `translateY(${Math.max(0, 50 - scrollY / 10)}px)`
        }}
      >
<h2 style={{ fontFamily: 'Percy Pixel', fontSize: '7rem', color: '#f05555ff', marginBottom: '3rem', textAlign: 'center' }}>
  My Projects
</h2>
<div className="flex flex-col md:flex-row gap-6 md:gap-16 max-w-[1400px] w-full justify-center py-8 md:py-12">
  {/* Card 1 */}
<div
      className="card group relative w-full max-w-xs md:w-[220px] md:h-[290px] outline-[2px] outline outline-[#f05555ff] rounded-[8px] p-4 bg-[#1a1a1a] overflow-hidden"
      style={{ fontFamily: 'Percy Pixel', color: '#f05555ff', lineHeight: '150%' }}
    >
      <div className="card-front absolute left-0 bottom-4 w-full text-center transition-transform duration-1000 [transition-timing-function:cubic-bezier(0.785,0.135,0.150,0.860)] group-hover:-translate-x-full">
        <p className="title text-[1.1rem] md:text-[1.3rem] font-bold mb-1" style={{ fontFamily: 'Percy Pixel', color: '#f05555ff' }}>
          Project One
        <span className="block w-1/2 h-[2px] mx-auto mt-1 rounded-full bg-[#f05555ff]" />
      </p>
      <p className="subtitle text-[0.9rem] md:text-[1rem]" style={{ fontFamily: 'Percy Pixel', color: '#fff' }}>
        Web Dev
      </p>
    </div>
    <div className="card-back absolute left-0 top-0 w-full h-full text-center flex items-center justify-center px-2 transition-transform duration-1000 [transition-timing-function:cubic-bezier(0.785,0.135,0.150,0.860)] translate-x-[120%] group-hover:translate-x-0 text-[0.9rem] md:text-[1rem]">
      <p className="text-[1rem]" style={{ fontFamily: 'Percy Pixel', color: '#fff' }}>
        Project description goes here. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
    </div>
  </div>
  {/* Card 2 */}
<div
      className="card group relative w-full max-w-xs md:w-[220px] md:h-[290px] outline-[2px] outline outline-[#f05555ff] rounded-[8px] p-4 bg-[#1a1a1a] overflow-hidden"
      style={{ fontFamily: 'Percy Pixel', color: '#f05555ff', lineHeight: '150%' }}
    >
      <div className="card-front absolute left-0 bottom-4 w-full text-center transition-transform duration-1000 [transition-timing-function:cubic-bezier(0.785,0.135,0.150,0.860)] group-hover:-translate-x-full">
        <p className="title text-[1.1rem] md:text-[1.3rem] font-bold mb-1" style={{ fontFamily: 'Percy Pixel', color: '#f05555ff' }}>
          Project Two
        <span className="block w-1/2 h-[2px] mx-auto mt-1 rounded-full bg-[#f05555ff]" />
      </p>
      <p className="subtitle text-[0.9rem] md:text-[1rem]" style={{ fontFamily: 'Percy Pixel', color: '#fff' }}>
        Mobile App
      </p>
    </div>
    <div className="card-back absolute left-0 top-0 w-full h-full text-center flex items-center justify-center px-2 transition-transform duration-1000 [transition-timing-function:cubic-bezier(0.785,0.135,0.150,0.860)] translate-x-[120%] group-hover:translate-x-0 text-[0.9rem] md:text-[1rem]">
      <p className="text-[1rem]" style={{ fontFamily: 'Percy Pixel', color: '#fff' }}>
        Another project description. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </div>
  </div>
  {/* Card 3 */}
<div
      className="card group relative w-full max-w-xs md:w-[220px] md:h-[290px] outline-[2px] outline outline-[#f05555ff] rounded-[8px] p-4 bg-[#1a1a1a] overflow-hidden"
      style={{ fontFamily: 'Percy Pixel', color: '#f05555ff', lineHeight: '150%' }}
    >
      <div className="card-front absolute left-0 bottom-4 w-full text-center transition-transform duration-1000 [transition-timing-function:cubic-bezier(0.785,0.135,0.150,0.860)] group-hover:-translate-x-full">
        <p className="title text-[1.1rem] md:text-[1.3rem] font-bold mb-1" style={{ fontFamily: 'Percy Pixel', color: '#f05555ff' }}>
          Project Three
        <span className="block w-1/2 h-[2px] mx-auto mt-1 rounded-full bg-[#f05555ff]" />
      </p>
      <p className="subtitle text-[0.9rem] md:text-[1rem]" style={{ fontFamily: 'Percy Pixel', color: '#fff' }}>
        Game Dev
      </p>
    </div>
    <div className="card-back absolute left-0 top-0 w-full h-full text-center flex items-center justify-center px-2 transition-transform duration-1000 [transition-timing-function:cubic-bezier(0.785,0.135,0.150,0.860)] translate-x-[120%] group-hover:translate-x-0 text-[0.9rem] md:text-[1rem]">
      <p className="text-[1rem]" style={{ fontFamily: 'Percy Pixel', color: '#fff' }}>
        Third project description. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
      </p>
    </div>
  </div>
</div>
        </div>
      </div>
  );
}