'use client';

import Reveal from '@/components/Reveal';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { client } from '@/data/client-config';

interface HomePageProps {
  navigateTo: (page: string) => void;
}

export default function HomePage({ navigateTo }: HomePageProps) {
  return (
    <>
      <Hero title="" subtitle="" />

      {/* ── The Mission ── */}
      <section className="section" id="overview">
        <Reveal>
          <span className="section-label">The Mission</span>
          <h2>A New Commerce Platform for {client.shortName}</h2>
          <p className="section-intro">
            KPS and {client.shortName} are building something better. A <span className="hl">Shopify Plus storefront</span> designed around how your customers actually buy, integrated cleanly with your existing systems, and delivered at pace with a fixed-price commitment.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div style={{ fontSize: 16, color: 'var(--grey-light)', lineHeight: 1.75 }}>
            <p>
              We are currently in a <span className="hl">6-week discovery phase</span>: 10 structured sessions working through commercial goals, product data, integrations, checkout, and MVP scope. Every decision grounded in evidence. Every output feeding directly into the build.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ── The Journey (vertical timeline) ── */}
      <section className="section" id="journey">
        <Reveal>
          <span className="section-label">The Journey</span>
          <h2>Discovery, Build, Launch</h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div style={{ position: 'relative', paddingLeft: 40, marginTop: 16 }}>
            {/* Vertical line - glowing at the top, fading down */}
            <div style={{ position: 'absolute', left: 11, top: 12, bottom: 12, width: 2, background: 'linear-gradient(to bottom, var(--cyan), rgba(255,180,0,0.3) 60%, rgba(255,255,255,0.06))' }} />

            {/* Discovery (clickable, active) */}
            <Reveal>
              <div
                onClick={() => navigateTo('discovery-timeline')}
                style={{ position: 'relative', marginBottom: 48, cursor: 'pointer', paddingBottom: 48, borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                onMouseEnter={e => { const btn = e.currentTarget.querySelector('span[data-cta]') as HTMLElement; if (btn) btn.style.background = 'var(--white)'; }}
                onMouseLeave={e => { const btn = e.currentTarget.querySelector('span[data-cta]') as HTMLElement; if (btn) btn.style.background = 'var(--cyan)'; }}
              >
                <div style={{ position: 'absolute', left: -40, top: 6, width: 24, height: 24, borderRadius: '50%', background: 'var(--cyan)', boxShadow: '0 0 20px rgba(40,220,202,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--navy)' }} />
                </div>
                <h3 style={{ fontSize: 24, fontWeight: 700, color: 'var(--white)', margin: '0 0 8px' }}>Discovery & Design</h3>
                <p style={{ fontSize: 15, color: 'var(--grey-light)', lineHeight: 1.7, margin: '0 0 16px', maxWidth: 520 }}>10 structured sessions working through commercial goals, product data, integrations, checkout, and MVP scope. Every decision validated before build begins.</p>
                <span data-cta="" style={{
                  display: 'inline-block', padding: '10px 24px', borderRadius: 8,
                  background: 'var(--cyan)', color: 'var(--navy)',
                  fontSize: 14, fontWeight: 700,
                  transition: 'all 0.25s',
                }}>
                  Explore the Discovery &rarr;
                </span>
              </div>
            </Reveal>

            {/* Build */}
            <Reveal delay={0.1}>
              <div style={{ position: 'relative', marginBottom: 48, paddingBottom: 48, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <div style={{ position: 'absolute', left: -40, top: 6, width: 24, height: 24, borderRadius: '50%', border: '2px solid rgba(255,180,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,180,0,0.4)' }} />
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: 'var(--white)', margin: '0 0 8px', opacity: 0.7 }}>Build</h3>
                <p style={{ fontSize: 15, color: 'var(--grey-light)', lineHeight: 1.7, margin: 0, maxWidth: 520, opacity: 0.6 }}>Sprint-based delivery: Shopify configuration, integrations, data migration, and storefront development. Fixed-price commitment.</p>
              </div>
            </Reveal>

            {/* Launch */}
            <Reveal delay={0.2}>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: -40, top: 6, width: 24, height: 24, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.12)' }} />
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: 'var(--white)', margin: '0 0 8px', opacity: 0.5 }}>Launch & Hypercare</h3>
                <p style={{ fontSize: 15, color: 'var(--grey-light)', lineHeight: 1.7, margin: 0, maxWidth: 520, opacity: 0.4 }}>Go-live, monitoring, stabilisation, and transition to continuous improvement.</p>
              </div>
            </Reveal>
          </div>
        </Reveal>
      </section>

      {/* ── Discovery link ── */}
      <section className="section" id="documents">
        <Reveal>
          <div className="doc-rows">
            <div className="doc-row" onClick={() => navigateTo('discovery-timeline')}>
              <div className="doc-row__badge doc-row__badge--discovery"><span className="badge-dot" />Discovery</div>
              <div className="doc-row__body">
                <h3>Discovery</h3>
                <p>Interactive timeline of all 10 sessions, deliverables, and success factors. Click any session to explore.</p>
              </div>
              <div className="doc-row__date">Apr-May 2026</div>
              <div className="doc-row__arrow">&rarr;</div>
            </div>
          </div>
        </Reveal>
      </section>

      <Footer />
    </>
  );
}
