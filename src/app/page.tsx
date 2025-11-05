'use client';

import FaultyTerminal from './FaultyTerminal_components';
import NavBar from './components/Navbar';

export default function Home() {
  return (
    <main>
      <NavBar />
      <FaultyTerminal />
    </main>
  );
}