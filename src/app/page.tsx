import NavBar from './components/Navbar/Navbar';
import HeroSection from './components/HeroSection/HeroSection';
import ProjectsSection from './components/ProjectsSection/ProjectsSection';
import AboutSection from './components/AboutSection/AboutSection';
import ContactSection from './components/ContactSection/ContactSection';

// Scroll-driven effects live inside each section (refs + rAF / IntersectionObserver),
// so scrolling no longer re-renders the whole page on every frame.
export default function Home() {
  return (
    <main>
      <NavBar />
      <HeroSection />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <ProjectsSection />
        <AboutSection />
        <ContactSection />
      </div>
    </main>
  );
}
