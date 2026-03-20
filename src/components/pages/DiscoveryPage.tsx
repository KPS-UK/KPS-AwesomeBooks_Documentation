'use client';

import Hero from '@/components/Hero';
import StickyNav from '@/components/StickyNav';
import TocLayout from '@/components/TocLayout';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import { client, kps } from '@/data/client-config';

interface DiscoveryPageProps {
  navigateTo: (page: string) => void;
  goHome: () => void;
}

export default function DiscoveryPage({ navigateTo, goHome }: DiscoveryPageProps) {
  return (
    <>
      {/* ── Hero ── */}
      <Hero
        title={
          <>
            Discovery &amp;
            <br />
            <span className="accent">Technical Design</span>
          </>
        }
        subtitle="A structured Discovery phase including a Technical Audit, establishing a shared and evidence-based understanding of the current landscape before committing to build timelines."
      />

      {/* ── Sticky Nav ── */}
      <StickyNav
        logoText={
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={kps.logoUrl} alt="KPS" style={{ height: 22 }} /> <span>Discovery</span>
          </>
        }
        onHome={goHome}
      />

      <TocLayout links={[
        { id: 'disc-overview', label: 'Overview', group: 'Overview', groupId: 'ch-overview' },
        { id: 'disc-audit', label: 'Technical Audit', group: 'Discovery Phase', groupId: 'ch-discovery' },
        { id: 'disc-workshops', label: 'Workshops' },
        { id: 'disc-schedule', label: 'Schedule' },
        { id: 'disc-deliverables', label: 'Deliverables' },
        { id: 'disc-team', label: 'Process', group: 'Transformation Model', groupId: 'ch-transformation' },
        { id: 'disc-beyond', label: 'Beyond Discovery', group: 'Beyond Discovery', groupId: 'ch-beyond' },
      ]}>

      <div className="chapter-divider" id="ch-overview">Overview</div>

      {/* ===================================================================
          Overview
      =================================================================== */}
      <section className="section" id="disc-overview">
        <Reveal>
          <span className="section-label">Overview</span>
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
          <h3 style={{ fontSize: 18, marginTop: 32, marginBottom: 16, color: 'var(--white)' }}>Why do it</h3>
          <div style={{ fontSize: 16, color: 'var(--grey-light)', lineHeight: 1.7 }}>
            <p>
              Without Discovery, you are estimating based on assumptions. With it, you have <span className="hl">validated architecture decisions</span>, a clear scope, accurate costs, and a team that already understands the landscape. Discovery de-risks the entire programme and ensures every euro spent on Build delivers value.
            </p>
            <p style={{ marginTop: 12 }}>
              It also gives {client.shortName} the evidence to make an <span className="hl">informed technology decision</span> between SAP Composable Storefront, Alokai, or a custom React/Next.js build on Vercel, based on your specific requirements rather than industry hype.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="callout callout--cyan" style={{ marginTop: 24 }}>
            <strong>The audit is already done.</strong> Discovery builds directly on the audit findings, so workshops can focus on business requirements and architecture decisions rather than reverse-engineering what already exists. This gives {client.shortName} a significant head start.
          </div>
        </Reveal>
      </section>

      <div className="chapter-divider" id="ch-discovery">Discovery Phase</div>

      {/* ===================================================================
          Technical Audit
      =================================================================== */}
      <section className="section" id="disc-audit">
        <Reveal>
          <span className="section-label">Technical Audit</span>
          <h2>Technical audit</h2>
          <p className="section-intro">
            The <span className="hl">12-area technical audit is complete</span>. It covered extensions, integrations, type system, code quality, tests, performance, accessibility, headless readiness, JDK21 upgrade path, CCv2 configuration, and infrastructure.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <p style={{ fontSize: 16, color: 'var(--grey-light)', lineHeight: 1.7 }}>
            The findings feed directly into Discovery. The headless readiness analysis, integration inventory, and JDK21 blocking items provide the evidence base for sizing the engagement, sequencing the vertical rollout, and populating the sprint-zero backlog. This means Discovery workshops can focus on business requirements and architecture decisions rather than reverse-engineering what already exists.
          </p>

          <button
            className="sonar-export-btn"
            style={{ marginTop: 20 }}
            onClick={() => navigateTo('technical-audit-report')}
          >
            Read the full Technical Audit Report
          </button>
        </Reveal>
      </section>

      {/* ===================================================================
          Workshops
      =================================================================== */}
      <section className="section" id="disc-workshops">
        <Reveal>
          <span className="section-label">Workshops</span>
          <h2>Workshop programme</h2>
          <p className="section-intro">
            A series of facilitated workshops covering architecture, experience, capabilities, and ways of working.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="scope-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="22" height="18" rx="2"/><line x1="1" y1="9" x2="23" y2="9"/><line x1="12" y1="3" x2="12" y2="9"/></svg></div>
              <div>
                <h4>Architecture and integration</h4>
                <p>Current-state mapping, target-state design, integration patterns, middleware, and technology decisions.</p>
              </div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg></div>
              <div>
                <h4>Customer experience review</h4>
                <p>Customer journey mapping, UX audit, design system assessment, and experience gap analysis.</p>
              </div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg></div>
              <div>
                <h4>Storefront capabilities</h4>
                <p>Feature inventory, functional gap analysis, and prioritisation of storefront capabilities for the new platform.</p>
              </div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg></div>
              <div>
                <h4>Technical review</h4>
                <p>Code quality, performance, accessibility, SEO, infrastructure, and security assessment of the current platform.</p>
              </div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg></div>
              <div>
                <h4>Ways of working</h4>
                <p>Team structure, delivery process, tooling, environments, CI/CD, and governance review.</p>
              </div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg></div>
              <div>
                <h4>Data and analytics</h4>
                <p>Data layer design, analytics requirements, tag management, and reporting needs for the new frontend.</p>
              </div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg></div>
              <div>
                <h4>Security and compliance</h4>
                <p>Authentication, authorisation, GDPR, cookie consent, and data handling requirements.</p>
              </div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4z"/></svg></div>
              <div>
                <h4>Roadmap alignment</h4>
                <p>Align Discovery outputs with business priorities, budget cycles, and the broader {client.shortName} digital roadmap.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===================================================================
          Schedule
      =================================================================== */}
      <section className="section" id="disc-schedule">
        <Reveal>
          <span className="section-label">Schedule</span>
          <h2>Schedule</h2>
          <p className="section-intro">
            Discovery runs over approximately 6 weeks, following a structured four-stage process.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="process-flow">
            <div className="process-step">
              <div className="step-num">1</div>
              <h4>Kick-off</h4>
              <p>Align on goals, scope, stakeholders, and logistics. Confirm access to systems, environments, and key contacts.</p>
            </div>
            <div className="process-step">
              <div className="step-num">2</div>
              <h4>Workshops and audit</h4>
              <p>Collaborative sessions with business and technology stakeholders. Parallel technical audit of the current platform.</p>
            </div>
            <div className="process-step">
              <div className="step-num">3</div>
              <h4>Write-up</h4>
              <p>Consolidate findings into architecture blueprints, integration maps, risk register, and phased delivery roadmap.</p>
            </div>
            <div className="process-step">
              <div className="step-num">4</div>
              <h4>Playback</h4>
              <p>Present findings and recommendations to stakeholders. Align on priorities, sequence, and next steps for Build.</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===================================================================
          Deliverables
      =================================================================== */}
      <section className="section" id="disc-deliverables">
        <Reveal>
          <span className="section-label">Deliverables</span>
          <h2>What Discovery delivers</h2>
          <p className="section-intro">
            The tangible outputs from the Discovery &amp; Technical Design phase.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
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

        <Reveal delay={0.15}>
          <div className="callout callout--cyan" style={{ marginTop: 24 }}>
            <strong>Deliverables:</strong> Architecture blueprint, integration inventory, data-flow mapping, business-rule catalogue, gap analysis, risk register, phased delivery roadmap, and effort estimates for Build.
          </div>
        </Reveal>
      </section>

      <div className="chapter-divider" id="ch-transformation">Transformation Model</div>

      {/* ===================================================================
          Team / Transformation Model
      =================================================================== */}
      <section className="section" id="disc-team">
        <Reveal>
          <span className="section-label">Transformation Model</span>
          <h2>KPS Transformation Model</h2>
          <p className="section-intro">
            Our proven <span className="hl">end-to-end CX transformation model</span> covering six stages from Discovery through to Run and Continuous Improvement.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="timeline">
            <div className="phase">
              <h4>1. Discovery</h4>
              <p>Foundation</p>
              <div className="phase-detail">Technical audit, stakeholder workshops, current-state mapping and evidence-based understanding of the landscape. Establishes a shared view of what exists, what needs to change, and why.</div>
            </div>
            <div className="phase">
              <h4>2. Technical Design</h4>
              <p>Architecture</p>
              <div className="phase-detail">Future-state architecture, technology decisions, integration design, API contracts, component design and phased delivery roadmap. All recommendations are criteria-led and grounded in Discovery findings.</div>
            </div>
            <div className="phase phase--future">
              <h4>3. Build</h4>
              <p>Delivery</p>
              <div className="phase-detail">Iterative, sprint-based development. Journey-by-journey build with continuous integration, automated testing and regular stakeholder demos. Component library and design system built first as a shared foundation.</div>
            </div>
            <div className="phase phase--future">
              <h4>4. Testing</h4>
              <p>Quality</p>
              <div className="phase-detail">Automated unit, integration and end-to-end tests. Performance budgets enforced in CI. Accessibility checked against WCAG 2.1 AA. User acceptance testing structured around journey-based scenarios.</div>
            </div>
            <div className="phase phase--future">
              <h4>5. Launch</h4>
              <p>Go-live</p>
              <div className="phase-detail">Progressive go-live with rollback capability. Canary deployments and traffic shifting. Journey-by-journey migration with real user validation before broader rollout. Hypercare support period after each phase.</div>
            </div>
            <div className="phase phase--future">
              <h4>6. Run &amp; CI</h4>
              <p>Continuous</p>
              <div className="phase-detail">Ongoing optimisation, performance monitoring, security patching, CRO experimentation, and continuous improvement. Dedicated CI team working from a shared backlog with the {client.shortName} product team.</div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="callout callout--cyan" style={{ marginTop: 24 }}>
            <strong>Key Takeaway:</strong> For the phase of work covered by this RFP, stages 1 (Discovery) and 2 (Technical Design) are relevant, along with support in developing an internal capability plan in partnership.
          </div>
        </Reveal>
      </section>

      <div className="chapter-divider" id="ch-beyond">Beyond Discovery</div>

      {/* ===================================================================
          Beyond Discovery
      =================================================================== */}
      <section className="section" id="disc-beyond">
        <Reveal>
          <span className="section-label">Beyond Discovery</span>
          <h2>Looking beyond Discovery</h2>
          <p className="section-intro">
            From <span className="hl">ways of working and build team</span> through testing, iterative delivery, launch, and continuous improvement - how the programme continues after Discovery is complete.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          {/* Ways of Working + Build Team: side by side, cyan SVGs */}
          <div className="scope-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg></div>
              <div>
                <h4>Ways of working</h4>
                <p>Agile delivery with two-week sprints, continuous integration, and regular stakeholder demos. KPS and {client.shortName} engineers work side by side from day one, with clear governance, escalation paths and decision-making processes.</p>
              </div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg></div>
              <div>
                <h4>Build team</h4>
                <p>A dedicated, cross-functional team combining KPS specialists with {client.shortName} engineers. Hybrid staffing model that transitions progressively from KPS-led to {client.shortName}-led as capability and confidence grow.</p>
              </div>
            </div>
          </div>

          {/* Iterative Delivery: full width, prominent, white SVG larger */}
          <div className="scope-grid" style={{ gridTemplateColumns: '1fr', marginTop: 16 }}>
            <div className="scope-card" style={{ borderColor: 'rgba(40,220,202,0.3)', background: 'rgba(40,220,202,0.04)', padding: 24, alignItems: 'center' }}>
              <div className="scope-icon" style={{ flexShrink: 0 }}><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg></div>
              <div>
                <h4>Iterative delivery</h4>
                <p>Journey-by-journey development with each sprint delivering working software. The component library and design system are built first, creating a shared foundation that accelerates development of subsequent journeys.</p>
              </div>
            </div>
          </div>

          {/* Testing + Launch: side by side, cyan SVGs */}
          <div className="scope-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', marginTop: 16 }}>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
              <div>
                <h4>Testing</h4>
                <p>Quality embedded in the delivery process. Automated unit, integration and end-to-end tests on every commit. Performance budgets enforced in CI. Accessibility checked against WCAG 2.1 AA. User acceptance testing structured around journey-based scenarios.</p>
              </div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4z"/></svg></div>
              <div>
                <h4>Launch</h4>
                <p>Progressive go-live with rollback capability, canary deployments and traffic shifting. Journey-by-journey migration with real user validation before broader rollout. Dedicated hypercare support period after each go-live phase.</p>
              </div>
            </div>
          </div>

          {/* Continuous Improvement: full width, prominent, white SVG larger */}
          <div className="scope-grid" style={{ gridTemplateColumns: '1fr', marginTop: 16 }}>
            <div className="scope-card" style={{ borderColor: 'rgba(40,220,202,0.3)', background: 'rgba(40,220,202,0.04)', padding: 24, alignItems: 'center' }}>
              <div className="scope-icon" style={{ flexShrink: 0 }}><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg></div>
              <div>
                <h4>Continuous Improvement Service</h4>
                <p>Ongoing performance monitoring, conversion rate improvements, accessibility compliance, SEO enhancements, new feature development and technology upgrades. A dedicated CI team works in two-week sprints, prioritising work from a shared backlog managed jointly with {client.shortName}.</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="callout callout--gold" style={{ marginTop: 24 }}>
            <strong>Getting started:</strong> We recommend beginning with the Discovery and Technical Design phase. This gives both teams a shared understanding of the current state, a validated target architecture, and an evidence-based delivery plan. From there, we can move into Build with confidence and clarity.
          </div>
        </Reveal>
      </section>

      </TocLayout>

      {/* ── Footer ── */}
      <Footer />
    </>
  );
}
