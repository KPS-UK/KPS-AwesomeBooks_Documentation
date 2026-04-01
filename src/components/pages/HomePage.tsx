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
          <div style={{ position: 'relative', paddingLeft: 32, marginTop: 8 }}>
            {/* Vertical line */}
            <div style={{ position: 'absolute', left: 7, top: 8, bottom: 8, width: 2, background: 'rgba(255,255,255,0.08)' }} />

            {/* Phase 1 - Discovery (clickable) */}
            <div
              onClick={() => navigateTo('discovery-timeline')}
              style={{ position: 'relative', marginBottom: 32, cursor: 'pointer' }}
            >
              <div style={{ position: 'absolute', left: -32, top: 4, width: 16, height: 16, borderRadius: '50%', background: 'var(--cyan)', border: '3px solid var(--navy)' }} />
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--cyan)', marginBottom: 4 }}>Phase 1</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--white)', margin: '0 0 6px' }}>Discovery & Design</h3>
              <p style={{ fontSize: 14, color: 'var(--grey-light)', lineHeight: 1.6, margin: '0 0 10px' }}>10 sessions, validated requirements, architecture decisions, and a fixed-price build plan.</p>
              <span style={{
                display: 'inline-block', padding: '6px 16px', borderRadius: 6,
                background: 'var(--cyan)', color: 'var(--navy)',
                fontSize: 13, fontWeight: 700,
                transition: 'all 0.2s',
              }}>
                Explore the Discovery &rarr;
              </span>
            </div>

            {/* Phase 2 - Build */}
            <div style={{ position: 'relative', marginBottom: 32 }}>
              <div style={{ position: 'absolute', left: -32, top: 4, width: 16, height: 16, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: '3px solid var(--navy)' }} />
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--gold)', marginBottom: 4 }}>Phase 2</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--white)', margin: '0 0 6px' }}>Build</h3>
              <p style={{ fontSize: 14, color: 'var(--grey-light)', lineHeight: 1.6, margin: 0 }}>Sprint-based delivery: Shopify configuration, integrations, data migration, and storefront development.</p>
              <div style={{ marginTop: 8, fontSize: 12, color: 'var(--grey-light)', fontWeight: 600, opacity: 0.6 }}>Up next</div>
            </div>

            {/* Phase 3 - Launch */}
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: -32, top: 4, width: 16, height: 16, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: '3px solid var(--navy)' }} />
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--gold)', marginBottom: 4 }}>Phase 3</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--white)', margin: '0 0 6px' }}>Launch & Hypercare</h3>
              <p style={{ fontSize: 14, color: 'var(--grey-light)', lineHeight: 1.6, margin: 0 }}>Go-live, monitoring, stabilisation, and transition to continuous improvement.</p>
              <div style={{ marginTop: 8, fontSize: 12, color: 'var(--grey-light)', fontWeight: 600, opacity: 0.6 }}>Planned</div>
            </div>
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
