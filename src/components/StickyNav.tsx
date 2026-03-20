'use client';
import { useEffect, useState } from 'react';

interface StickyNavProps {
  logoText: React.ReactNode;
  onHome: () => void;
  homeLabel?: string;
}

export default function StickyNav({ logoText, onHome, homeLabel = 'Home' }: StickyNavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`sticky-nav${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-logo">{logoText}</div>
      <button
        className="nav-home"
        onClick={onHome}
        style={{ background: 'none', border: 'none', fontFamily: 'inherit' }}
      >
        &larr; {homeLabel}
      </button>
    </nav>
  );
}
