'use client';

import Noise from './Noise';

interface ContactSectionProps {
  scrollY: number;
}

export default function ContactSection({ scrollY }: ContactSectionProps) {
  const contactOpacity = Math.min(1, Math.max(0, (scrollY - 2000) / 500));

  return (
    <div
      id="contact"
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
          opacity: contactOpacity,
          transform: `translateY(${Math.max(0, 30 - (scrollY - 2000) / 15)}px)`,
        }}
      >
        <style jsx global>{`
          @keyframes cursorBlink3 {
            0%, 49% { opacity: 1; }
            50%, 100% { opacity: 0; }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          
          @keyframes glow {
            0%, 100% { 
              box-shadow: 0 0 20px rgba(240, 85, 85, 0.3),
                          0 0 40px rgba(240, 85, 85, 0.2),
                          inset 0 0 20px rgba(240, 85, 85, 0.1);
            }
            50% { 
              box-shadow: 0 0 40px rgba(240, 85, 85, 0.5),
                          0 0 80px rgba(240, 85, 85, 0.3),
                          inset 0 0 30px rgba(240, 85, 85, 0.2);
            }
          }
        `}</style>
        
        {/* ASCII Art Title */}
        <div className="mb-15 flex justify-center items-cente">
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
  ____            _             _   
 / ___|___  _ __ | |_ __ _  ___| |_ 
| |   / _ \\| '_ \\| __/ _\` |/ __| __|
| |__| (_) | | | | || (_| | (__| |_ 
 \\____\\___/|_| |_|\\__\\__,_|\\___|\\__|
`}
          </pre>

        </div>
        
        {/* Contact Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {/* Email Card */}
          <a
            href="mailto:rodrigoalmeidamanao@gmail.com"
            className="group/card relative"
            style={{
              textDecoration: 'none',
            }}
          >
            <div
              className="relative p-8 rounded-xl overflow-hidden transition-all duration-500"
              style={{
                background: 'linear-gradient(135deg, rgba(240, 85, 85, 0.1) 0%, rgba(240, 85, 85, 0.05) 100%)',
                border: '2px solid rgba(240, 85, 85, 0.3)',
                animation: 'float 6s ease-in-out infinite',
                animationDelay: '0s',
              }}
            >
              {/* Glow effect on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
                style={{
                  animation: 'glow 2s ease-in-out infinite',
                }}
              ></div>
              
              <div className="relative z-10 text-center">
                <h3
                  className="text-3xl md:text-4xl mb-4"
                  style={{
                    fontFamily: 'Percy Pixel',
                    color: '#f05555ff'
                  }}
                >
                  Email
                </h3>
                <p
                  className="text-lg md:text-xl leading-relaxed"
                  style={{
                    fontFamily: 'Percy Pixel',
                    color: '#e0e0e0',
                    letterSpacing: '0.08em'
                  }}
                >
                  rodrigoalmeidamanao@gmail.com
                </p>
              </div>
            </div>
          </a>

          {/* GitHub Card */}
          <a
            href="https://github.com/rodrigomanao"
            target="_blank"
            rel="noopener noreferrer"
            className="group/card relative"
            style={{
              textDecoration: 'none',
            }}
          >
            <div
              className="relative p-8 rounded-xl overflow-hidden transition-all duration-500"
              style={{
                background: 'linear-gradient(135deg, rgba(240, 85, 85, 0.1) 0%, rgba(240, 85, 85, 0.05) 100%)',
                border: '2px solid rgba(240, 85, 85, 0.3)',
                animation: 'float 6s ease-in-out infinite',
                animationDelay: '0.5s',
              }}
            >
              {/* Glow effect on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
                style={{
                  animation: 'glow 2s ease-in-out infinite',
                }}
              ></div>
              
              <div className="relative z-10 text-center">
                <h3
                  className="text-3xl md:text-4xl mb-4"
                  style={{
                    fontFamily: 'Percy Pixel',
                    color: '#f05555ff'
                  }}
                >
                  GitHub
                </h3>
                <p
                  className="text-lg md:text-xl leading-relaxed"
                  style={{
                    fontFamily: 'Percy Pixel',
                    color: '#e0e0e0',
                    letterSpacing: '0.08em'
                  }}
                >
                  @rodrigomanao
                </p>
              </div>
            </div>
          </a>

          {/* LinkedIn Card */}
          <a
            href="https://www.linkedin.com/in/rodrigo-manão-57b061330/"
            target="_blank"
            rel="noopener noreferrer"
            className="group/card relative"
            style={{
              textDecoration: 'none',
            }}
          >
            <div
              className="relative p-8 rounded-xl overflow-hidden transition-all duration-500"
              style={{
                background: 'linear-gradient(135deg, rgba(240, 85, 85, 0.1) 0%, rgba(240, 85, 85, 0.05) 100%)',
                border: '2px solid rgba(240, 85, 85, 0.3)',
                animation: 'float 6s ease-in-out infinite',
                animationDelay: '1s',
              }}
            >
              {/* Glow effect on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
                style={{
                  animation: 'glow 2s ease-in-out infinite',
                }}
              ></div>
              
              <div className="relative z-10 text-center">
                <h3
                  className="text-3xl md:text-4xl mb-4"
                  style={{
                    fontFamily: 'Percy Pixel',
                    color: '#f05555ff'
                  }}
                >
                  LinkedIn
                </h3>
                <p
                  className="text-lg md:text-xl leading-relaxed"
                  style={{
                    fontFamily: 'Percy Pixel',
                    color: '#e0e0e0',
                    letterSpacing: '0.08em'
                  }}
                >
                  Rodrigo Manão
                </p>
              </div>
            </div>
          </a>
        </div>

        {/* Footer Message */}
        <div className="text-center">
          <p
            className="text-2xl md:text-3xl"
            style={{
              fontFamily: 'Percy Pixel',
              color: '#f05555ff',
              letterSpacing: '0.08em'

            }}
          >
            Let&apos;s build something together
          </p>
        </div>
      </div>
    </div>
  );
}
