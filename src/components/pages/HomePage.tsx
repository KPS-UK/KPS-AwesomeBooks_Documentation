'use client';

import Reveal from '@/components/Reveal';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { client, hiddenPages } from '@/data/client-config';

interface HomePageProps {
  navigateTo: (page: string) => void;
}

export default function HomePage({ navigateTo }: HomePageProps) {
  const isVisible = (page: string) => !hiddenPages.includes(page);

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

        <Reveal delay={0.15}>
          <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
            <button
              className="sonar-export-btn"
              onClick={() => navigateTo('discovery-timeline')}
            >
              Explore the Discovery Timeline
            </button>
          </div>
        </Reveal>
      </section>

      {/* ── The Journey ── */}
      <section className="section" id="journey">
        <Reveal>
          <span className="section-label">The Journey</span>
          <h2>Discovery, Build, Launch</h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            <div style={{
              background: 'rgba(40,220,202,0.06)', border: '1px solid rgba(40,220,202,0.2)',
              borderRadius: 10, padding: '24px 20px', position: 'relative',
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--cyan)', marginBottom: 8 }}>Phase 1</div>
              <h4 style={{ color: 'var(--white)', fontSize: 18, margin: '0 0 8px' }}>Discovery & Design</h4>
              <p style={{ fontSize: 13, color: 'var(--grey-light)', lineHeight: 1.6, margin: 0 }}>10 sessions, validated requirements, architecture decisions, and a fixed-price build plan.</p>
              <div style={{ marginTop: 12, fontSize: 12, color: 'var(--cyan)', fontWeight: 700 }}>In progress</div>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 10, padding: '24px 20px',
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--gold)', marginBottom: 8 }}>Phase 2</div>
              <h4 style={{ color: 'var(--white)', fontSize: 18, margin: '0 0 8px' }}>Build</h4>
              <p style={{ fontSize: 13, color: 'var(--grey-light)', lineHeight: 1.6, margin: 0 }}>Sprint-based delivery: Shopify configuration, integrations, data migration, and storefront development.</p>
              <div style={{ marginTop: 12, fontSize: 12, color: 'var(--grey-light)', fontWeight: 600 }}>Up next</div>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 10, padding: '24px 20px',
            }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--gold)', marginBottom: 8 }}>Phase 3</div>
              <h4 style={{ color: 'var(--white)', fontSize: 18, margin: '0 0 8px' }}>Launch & Hypercare</h4>
              <p style={{ fontSize: 13, color: 'var(--grey-light)', lineHeight: 1.6, margin: 0 }}>Go-live, monitoring, stabilisation, and transition to continuous improvement.</p>
              <div style={{ marginTop: 12, fontSize: 12, color: 'var(--grey-light)', fontWeight: 600 }}>Planned</div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Documents ── */}
      <section className="section" id="documents">
        <Reveal>
          <div className="doc-rows">
            {isVisible('discovery-timeline') && <div className="doc-row" onClick={() => navigateTo('discovery-timeline')}>
              <div className="doc-row__badge doc-row__badge--discovery"><span className="badge-dot" />Active</div>
              <div className="doc-row__body">
                <h3>Discovery Timeline</h3>
                <p>Interactive timeline of all 10 sessions, deliverables, and success factors. Click any session to explore.</p>
              </div>
              <div className="doc-row__date">Apr-May 2026</div>
              <div className="doc-row__arrow">&rarr;</div>
            </div>}
          </div>
        </Reveal>
      </section>

      <Footer />
    </>
  );
}
