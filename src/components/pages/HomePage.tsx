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

      {/* ── Where We Are ── */}
      <section className="section" id="overview">
        <Reveal>
          <span className="section-label">Where We Are</span>
          <h2>Discovery Phase</h2>
          <p className="section-intro">
            KPS and {client.shortName} are running a focused <span className="hl">6-week discovery phase</span> before build begins. Across 10 structured sessions, we will work through commercial goals, product data, integrations, checkout, and MVP scope to produce a validated set of requirements, a costed delivery plan, and a clear architecture.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <p style={{ fontSize: 16, color: 'var(--grey-light)', lineHeight: 1.75 }}>
            The output is a <span className="hl">fixed-price build commitment</span> with no surprises.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <button
            className="sonar-export-btn"
            style={{ marginTop: 20 }}
            onClick={() => navigateTo('discovery-timeline')}
          >
            Explore the Discovery Timeline
          </button>
        </Reveal>
      </section>

      {/* ── What's Next ── */}
      <section className="section" id="next-steps">
        <Reveal>
          <span className="section-label">What Comes Next</span>
          <h2>Build & Launch</h2>
          <p className="section-intro">
            Once Discovery is complete, the outputs feed directly into a <span className="hl">fixed-price Shopify Plus build</span>. The BRD, solution architecture, and integration catalogue provide the foundation.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="scope-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <div className="scope-card">
              <div>
                <h4>Discovery & Design</h4>
                <p>10 workshops, requirements, architecture decisions, and a validated delivery plan.</p>
                <div style={{ marginTop: 8, fontSize: 12, color: 'var(--cyan)', fontWeight: 600 }}>In progress</div>
              </div>
            </div>
            <div className="scope-card">
              <div>
                <h4>Build</h4>
                <p>Sprint-based delivery: configuration, integrations, data migration, and storefront development.</p>
                <div style={{ marginTop: 8, fontSize: 12, color: 'var(--grey-light)', fontWeight: 600 }}>Up next</div>
              </div>
            </div>
            <div className="scope-card">
              <div>
                <h4>Launch & Hypercare</h4>
                <p>Go-live, monitoring, and stabilisation before transitioning to continuous improvement.</p>
                <div style={{ marginTop: 8, fontSize: 12, color: 'var(--grey-light)', fontWeight: 600 }}>Planned</div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Documents ── */}
      <section className="section" id="documents">
        <Reveal>
          <span className="section-label">Documents</span>
          <h2>Project Documentation</h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="doc-rows">
            {isVisible('discovery-timeline') && <div className="doc-row" onClick={() => navigateTo('discovery-timeline')}>
              <div className="doc-row__badge doc-row__badge--discovery"><span className="badge-dot" />Active</div>
              <div className="doc-row__body">
                <h3>Discovery Timeline</h3>
                <p>Interactive timeline of all 10 sessions, deliverables, and risk mitigations. Click any session to explore.</p>
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
