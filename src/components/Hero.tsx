'use client';
import { useCallback, useRef } from 'react';
import ParticleField from './ParticleField';
import { client, kps } from '@/data/client-config';

interface HeroProps {
  title: React.ReactNode;
  subtitle: string;
  scrollLabel?: string;
}

export default function Hero({ title, subtitle, scrollLabel = 'Explore' }: HeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!gradientRef.current || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    gradientRef.current.style.background = `radial-gradient(600px circle at ${x}% ${y}%, rgba(40,220,202,0.07), transparent 60%)`;
  }, []);

  return (
    <header className="hero" ref={heroRef} onMouseMove={handleMouseMove}>
      <ParticleField />
      <div ref={gradientRef} className="hero-gradient-follow" />
      <div className="hero-logos">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="logo-vm"
          src={client.logoUrl}
          alt={client.name}
          style={{ height: 160 }}
        />
        <div className="logo-sep" style={{ height: 80 }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="logo-kps"
          src={kps.logoUrl}
          alt="KPS"
          style={{ height: 88 }}
        />
      </div>
      <h1>{title}</h1>
      <p className="subtitle">{subtitle}</p>
      <div className="scroll-hint">
        <span>{scrollLabel}</span>
        <div className="scroll-arrow" />
      </div>
    </header>
  );
}
