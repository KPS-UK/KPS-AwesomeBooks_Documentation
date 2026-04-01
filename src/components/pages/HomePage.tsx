'use client';

import Reveal from '@/components/Reveal';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { client, kps, metrics, platform, audit, hiddenPages } from '@/data/client-config';

interface HomePageProps {
  navigateTo: (page: 'rfp' | 'audit' | 'phased' | 'qa' | 'technical-audit-report' | 'factsheet' | 'discovery' | 'consolidation-options' | 'discovery-plan') => void;
}

export default function HomePage({ navigateTo }: HomePageProps) {
  const allHidden = hiddenPages.length > 0 &&
    ['rfp', 'audit', 'phased', 'qa', 'technical-audit-report', 'factsheet', 'discovery', 'consolidation-options', 'discovery-plan']
      .every(p => hiddenPages.includes(p));
  const isVisible = (page: string) => !hiddenPages.includes(page);

  return (
    <>
      {/* ── Hero ── */}
      <Hero
        title={
          <>
            {client.name}
            <br />
            <span className="accent">× KPS</span>
          </>
        }
        subtitle={`Project documentation for ${client.name} and KPS.`}
      />

      {/* ── Overview ── */}
      {!allHidden && <section className="section" id="overview">
        <Reveal>
          <span className="section-label">Overview</span>
          <h2>How {kps.contactName ? 'KPS' : 'We'} Can Help</h2>
          <p className="section-intro">
            {client.name} is ready to move from a monolithic {platform.currentFrontend} storefront to a modern, <span className="hl">composable headless architecture</span>. KPS has the SAP Commerce expertise and headless delivery experience to make that transition safe, evidence-based, and sustainable.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div style={{ fontSize: 17, color: 'var(--grey-light)', lineHeight: 1.75 }}>
            <p>
              We understand the challenge: a <span className="hl">multi-vertical, multi-audience</span> B2B/B2C platform serving {client.audiences.join(' and ')} across {client.verticals.join(', ')} - with the Accelerator storefront approaching end of life and a mandatory JDK21 upgrade on the horizon. The current architecture is limiting how fast the team can move, how independently each vertical can evolve, and how easily new digital experiences can reach customers.
            </p>
            <p style={{ marginTop: 16 }}>
              KPS brings <span className="hl">deep SAP Commerce and composable architecture expertise</span> to help {client.shortName} decouple the frontend from the commerce engine - protecting the significant investment in SAP Commerce and {platform.erp} while unlocking faster time-to-market and independent deployability per vertical. We recommend a <span className="hl">phased vertical go-live</span> rather than a risky big-bang replatform: launch one vertical first, validate under real traffic, then scale with proven playbooks.
            </p>
            <p style={{ marginTop: 16 }}>
              Critically, we&apos;ll invest in <span className="hl">building {client.shortName}&apos;s internal development capability</span> from day one. Knowledge transfer is embedded in every sprint, not bolted on at the end. The goal is for the {client.shortName} team to progressively take ownership of the platform, with KPS transitioning to an advisory and continuous improvement role.
            </p>
          </div>
        </Reveal>

      </section>}

      {/* ── Audit Summary ── */}
      {!allHidden && <section className="section" id="audit-summary">
        <Reveal>
          <span className="section-label">Technical Audit</span>
          <h2>What the Audit Found</h2>
          <p className="section-intro">
            A <span className="hl">{audit.areaCount}-area technical review</span> of the {client.shortName} SAP Commerce platform, now complete. The codebase is in reasonable health with clear areas for action.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="stat-row" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            <div className="stat-box">
              <div className="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
              <div className="stat-label">{metrics.testPassRate}</div>
              <div className="stat-desc">Test pass rate across {metrics.testCount} tests</div>
            </div>
            <div className="stat-box">
              <div className="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></div>
              <div className="stat-label">{metrics.occEndpoints}</div>
              <div className="stat-desc">Custom OCC API endpoints</div>
            </div>
            <div className="stat-box">
              <div className="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></div>
              <div className="stat-label">{metrics.mobileLighthouse}/100</div>
              <div className="stat-desc">Mobile performance (Lighthouse)</div>
            </div>
            <div className="stat-box">
              <div className="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></div>
              <div className="stat-label">{audit.areaCount}</div>
              <div className="stat-desc">Audit areas reviewed</div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="callout callout--gold" style={{ marginTop: 24 }}>
            <strong>Headline findings:</strong> The platform is reasonably well maintained with a solid test suite and clean extension architecture. The main areas requiring attention are outdated third-party libraries ({platform.email} from 2018, {platform.payment} from 2022), legacy security patterns in the REST integration layer, Accelerator storefront performance limitations, and the mandatory JDK21 upgrade before August 2026.
          </div>

          <div className="callout callout--pink" style={{ marginTop: 16 }}>
            <strong>JDK21 upgrade required by August 2026:</strong> The platform must be upgraded to JDK21 and Spring 6 before the end of August 2026. Blocking issues have been identified (XSD generation, OAuth, {platform.middleware} libraries) and the full scope of upgrade work remains unknown until these are resolved. This must run as a parallel workstream.
          </div>

          <div className="callout callout--pink" style={{ marginTop: 16 }}>
            <strong>Accelerator end of life:</strong> The storefront and addon framework will be dereleased in September 2027. The SAML SSO addon has a dependency on the addon framework, which adds urgency to the headless transition.
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <button
            className="sonar-export-btn"
            style={{ marginTop: 20 }}
            onClick={() => navigateTo('technical-audit-report')}
          >
            Read the full Technical Audit Report
          </button>
        </Reveal>
      </section>}

      {/* ── Next Steps ── */}
      {!allHidden && <section className="section" id="next-steps">
        <Reveal>
          <span className="section-label">Next Steps</span>
          <h2>Discovery &amp; Technical Design</h2>
          <p className="section-intro">
            The recommended next step is a structured <span className="hl">Discovery &amp; Technical Design</span> phase. This is where assumptions become evidence, architecture decisions get validated, and the delivery plan takes shape.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div style={{ fontSize: 16, color: 'var(--grey-light)', lineHeight: 1.7 }}>
            <p>
              Discovery runs over <span className="hl">approximately 6 weeks</span> and combines a series of facilitated workshops with the technical audit findings. The output is a shared, evidence-based understanding of what needs to change, how to change it, and in what order.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <h3 style={{ fontSize: 18, marginTop: 32, marginBottom: 16, color: 'var(--white)' }}>What Discovery delivers</h3>
          <div className="scope-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div className="scope-card">
              <div><h4>Business Requirements Document</h4><p>Gap analysis of current vs future state, prioritised by business impact. Not a list of everything, but a focused scope for what needs to change.</p></div>
            </div>
            <div className="scope-card">
              <div><h4>Solution Architecture</h4><p>Target architecture, integration patterns, and technology recommendations grounded in criteria, not preference. Defensible decisions {client.shortName} can own.</p></div>
            </div>
            <div className="scope-card">
              <div><h4>Internal Capability Assessment</h4><p>An honest assessment of the current team&apos;s skills against what&apos;s needed for headless. Includes a target team structure, gap analysis, and upskilling plan.</p></div>
            </div>
            <div className="scope-card">
              <div><h4>Delivery Plan with Costs</h4><p>A costed, phased delivery plan with clear workstreams, timelines, and dependencies. No surprises, no ambiguity.</p></div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <h3 style={{ fontSize: 18, marginTop: 32, marginBottom: 16, color: 'var(--white)' }}>Why do it</h3>
          <div style={{ fontSize: 16, color: 'var(--grey-light)', lineHeight: 1.7 }}>
            <p>
              Without Discovery, decisions are based on assumptions. With it, {client.shortName} gets <span className="hl">validated architecture decisions</span>, a clear scope, accurate costs, and a team that already understands the landscape. It de-risks the programme and ensures every euro spent on Build delivers value.
            </p>
            <p style={{ marginTop: 12 }}>
              It also provides the evidence to make an <span className="hl">informed technology decision</span> between {platform.headlessFrontend}, Alokai, or a custom {platform.proposedFrontend} build on Vercel, based on {client.shortName}&apos;s specific requirements rather than industry trends.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="callout callout--cyan" style={{ marginTop: 24 }}>
            <strong>The audit is already done.</strong> Discovery builds directly on the audit findings, so workshops can focus on business requirements and architecture decisions rather than reverse-engineering what already exists. This gives {client.shortName} a significant head start.
          </div>

          <button
            className="sonar-export-btn"
            style={{ marginTop: 20 }}
            onClick={() => navigateTo('discovery')}
          >
            Read the full Discovery &amp; Technical Design proposal
          </button>
        </Reveal>
      </section>}

      {/* ── Documents ── */}
      {!allHidden && <section className="section" id="documents">
        <Reveal>
          <span className="section-label">Documents</span>
          <h2>Explore the Detail</h2>
          <p className="section-intro">
            Click any row to dive into the full document.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="doc-rows">
            {isVisible('discovery') && <div className="doc-row" onClick={() => navigateTo('discovery')}>
              <div className="doc-row__badge doc-row__badge--discovery"><span className="badge-dot" />Next Steps</div>
              <div className="doc-row__body">
                <h3>Discovery &amp; Technical Design</h3>
                <p>The structured Discovery phase - workshops, technical audit, deliverables, schedule, and transformation model.</p>
              </div>
              <div className="doc-row__date">19/03/2026</div>
              <div className="doc-row__arrow">&rarr;</div>
            </div>}

            {isVisible('technical-audit-report') && <div className="doc-row" onClick={() => navigateTo('technical-audit-report')}>
              <div className="doc-row__badge doc-row__badge--complete"><span className="badge-dot" />Complete</div>
              <div className="doc-row__body">
                <h3>Technical Audit Report</h3>
                <p>Comprehensive findings from the technical code and site review covering {audit.areaCount} areas.</p>
              </div>
              <div className="doc-row__date">18/03/2026</div>
              <div className="doc-row__arrow">&rarr;</div>
            </div>}

            {isVisible('factsheet') && <div className="doc-row" onClick={() => navigateTo('factsheet')}>
              <div className="doc-row__badge doc-row__badge--reference"><span className="badge-dot" />Reference</div>
              <div className="doc-row__body">
                <h3>Platform Factsheet</h3>
                <p>Structured overview of the SAP Commerce platform - version, integrations, components, and headless readiness.</p>
              </div>
              <div className="doc-row__date">19/03/2026</div>
              <div className="doc-row__arrow">&rarr;</div>
            </div>}

            {isVisible('qa') && <div className="doc-row" onClick={() => navigateTo('qa')}>
              <div className="doc-row__badge doc-row__badge--qa"><span className="badge-dot" />Q&amp;A</div>
              <div className="doc-row__body">
                <h3>Follow-up Questions &amp; Answers</h3>
                <p>Detailed responses covering commercial terms, team, technical approach, methodology, and references.</p>
              </div>
              <div className="doc-row__date">10/03/2026</div>
              <div className="doc-row__arrow">&rarr;</div>
            </div>}

            {isVisible('phased') && <div className="doc-row" onClick={() => navigateTo('phased')}>
              <div className="doc-row__badge doc-row__badge--phased"><span className="badge-dot" />Strategy</div>
              <div className="doc-row__body">
                <h3>A Phased Go-Live Strategy</h3>
                <p>How we de-risk the headless transition by launching one vertical first, then scaling with proven playbooks.</p>
              </div>
              <div className="doc-row__date">27/02/2026</div>
              <div className="doc-row__arrow">&rarr;</div>
            </div>}

            {isVisible('audit') && <div className="doc-row" onClick={() => navigateTo('audit')}>
              <div className="doc-row__badge doc-row__badge--scope"><span className="badge-dot" />Scope</div>
              <div className="doc-row__body">
                <h3>Technical Audit Scope</h3>
                <p>The audit scope covering performance, accessibility, code quality, integrations, headless readiness, and security.</p>
              </div>
              <div className="doc-row__date">27/02/2026</div>
              <div className="doc-row__arrow">&rarr;</div>
            </div>}

            {isVisible('consolidation-options') && <div className="doc-row" onClick={() => navigateTo('consolidation-options')}>
              <div className="doc-row__badge doc-row__badge--phased"><span className="badge-dot" />Interactive</div>
              <div className="doc-row__body">
                <h3>Consolidation Options Explorer</h3>
                <p>Interactive tool to explore how prioritising cost, agility, or BU autonomy affects the consolidation strategy.</p>
              </div>
              <div className="doc-row__date">&nbsp;</div>
              <div className="doc-row__arrow">&rarr;</div>
            </div>}

            {isVisible('discovery-plan') && <div className="doc-row" onClick={() => navigateTo('discovery-plan')}>
              <div className="doc-row__badge doc-row__badge--discovery"><span className="badge-dot" />Interactive</div>
              <div className="doc-row__body">
                <h3>Discovery Plan</h3>
                <p>Detailed 9-session discovery plan with expandable agendas, schedule, deliverables, and risk mitigations.</p>
              </div>
              <div className="doc-row__date">&nbsp;</div>
              <div className="doc-row__arrow">&rarr;</div>
            </div>}

            {isVisible('rfp') && <div className="doc-row" onClick={() => navigateTo('rfp')}>
              <div className="doc-row__badge doc-row__badge--rfp"><span className="badge-dot" />Proposal</div>
              <div className="doc-row__body">
                <h3>Our Full Response</h3>
                <p>The complete RFP response covering scope, approach, team structure, timeline, and commercial terms.</p>
              </div>
              <div className="doc-row__date">27/02/2026</div>
              <div className="doc-row__arrow">&rarr;</div>
            </div>}
          </div>
        </Reveal>
      </section>}

      {/* ── Footer ── */}
      <Footer />
    </>
  );
}
