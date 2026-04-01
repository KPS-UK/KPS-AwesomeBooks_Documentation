'use client';

import Reveal from '@/components/Reveal';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { client, kps, hiddenPages } from '@/data/client-config';

interface HomePageProps {
  navigateTo: (page: 'rfp' | 'audit' | 'phased' | 'qa' | 'technical-audit-report' | 'factsheet' | 'discovery' | 'consolidation-options' | 'discovery-plan' | 'discovery-timeline') => void;
}

export default function HomePage({ navigateTo }: HomePageProps) {
  const isVisible = (page: string) => !hiddenPages.includes(page);

  return (
    <>
      {/* ── Hero ── */}
      <Hero
        title=""
        subtitle=""
      />

      {/* ── Where We Are ── */}
      <section className="section" id="overview">
        <Reveal>
          <span className="section-label">Where We Are</span>
          <h2>Discovery Phase</h2>
          <p className="section-intro">
            KPS and {client.shortName} are currently in the <span className="hl">Discovery & Design phase</span> of the Shopify Plus migration. Over 6 weeks of structured workshops we are working through the key decisions that will shape the build.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div style={{ fontSize: 16, color: 'var(--grey-light)', lineHeight: 1.75 }}>
            <p>
              Discovery runs from <span className="hl">14 April to mid-May 2026</span>, covering 10 facilitated sessions across commercial vision, product data, promotions, personalisation, integrations, architecture, checkout, and operating model. The goal is to turn assumptions into evidence before committing to build timelines.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <button
            className="sonar-export-btn"
            style={{ marginTop: 20 }}
            onClick={() => navigateTo('discovery-plan')}
          >
            View the full Discovery Plan
          </button>
        </Reveal>
      </section>

      {/* ── What's Next ── */}
      <section className="section" id="next-steps">
        <Reveal>
          <span className="section-label">What Comes Next</span>
          <h2>Build & Launch</h2>
          <p className="section-intro">
            Once Discovery is complete, the outputs feed directly into the <span className="hl">Build phase</span>. The BRD, solution architecture, and integration catalogue provide the foundation for a fixed-price Shopify Plus implementation.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="scope-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            <div className="scope-card">
              <div>
                <h4>Discovery & Design</h4>
                <p>Workshops, requirements, architecture decisions, and a validated delivery plan.</p>
                <div style={{ marginTop: 8, fontSize: 12, color: 'var(--cyan)', fontWeight: 600 }}>In progress</div>
              </div>
            </div>
            <div className="scope-card">
              <div>
                <h4>Build</h4>
                <p>Sprint-based delivery covering configuration, integrations, data migration, and storefront development.</p>
                <div style={{ marginTop: 8, fontSize: 12, color: 'var(--grey-light)', fontWeight: 600 }}>Up next</div>
              </div>
            </div>
            <div className="scope-card">
              <div>
                <h4>Launch & Hypercare</h4>
                <p>Go-live, monitoring, and a stabilisation period before transitioning to continuous improvement.</p>
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
          <p className="section-intro">
            Click any row to dive into the detail.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="doc-rows">
            {isVisible('discovery-timeline') && <div className="doc-row" onClick={() => navigateTo('discovery-timeline')}>
              <div className="doc-row__badge doc-row__badge--phased"><span className="badge-dot" />Interactive</div>
              <div className="doc-row__body">
                <h3>Discovery Timeline</h3>
                <p>Interactive timeline view of all 10 discovery sessions. Click any session to explore the detail.</p>
              </div>
              <div className="doc-row__date">Apr 2026</div>
              <div className="doc-row__arrow">&rarr;</div>
            </div>}

            {isVisible('discovery-plan') && <div className="doc-row" onClick={() => navigateTo('discovery-plan')}>
              <div className="doc-row__badge doc-row__badge--discovery"><span className="badge-dot" />Active</div>
              <div className="doc-row__body">
                <h3>Discovery Plan</h3>
                <p>10-session discovery plan with agendas, attendees, schedule, deliverables, and key risks.</p>
              </div>
              <div className="doc-row__date">Apr 2026</div>
              <div className="doc-row__arrow">&rarr;</div>
            </div>}
          </div>
        </Reveal>
      </section>

      {/* ── Footer ── */}
      <Footer />
    </>
  );
}
