'use client';

import Hero from '@/components/Hero';
import StickyNav from '@/components/StickyNav';
import TocLayout from '@/components/TocLayout';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import { client, kps, platform } from '@/data/client-config';

interface AuditPageProps {
  navigateTo: (page: string) => void;
  goHome: () => void;
}

export default function AuditPage({ navigateTo, goHome }: AuditPageProps) {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <Hero
        title={
          <>
            Technical <span className="accent">Audit</span>
          </>
        }
        subtitle={`A deep-dive into ${client.name}'s SAP Commerce landscape - code quality, integrations, performance, and headless readiness - so every subsequent decision is grounded in evidence.`}
      />

      {/* ═══ STICKY NAV ═══ */}
      <StickyNav
        logoText={
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={kps.logoUrl} alt="KPS" style={{ height: 22 }} /> <span>Technical Audit Scope</span>
          </>
        }
        onHome={goHome}
      />

      <TocLayout links={[
        { id: 'audit-why', label: 'Why' },
        { id: 'audit-scope', label: 'Scope' },
        { id: 'audit-process', label: 'Process' },
        { id: 'audit-prerequisites', label: 'Prerequisites' },
        { id: 'audit-deliverables', label: 'Deliverables' },
        { id: 'audit-timeline', label: 'Timeline' },
        { id: 'audit-next-steps', label: 'Next Steps' },
      ]}>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 1 - WHY A TECHNICAL AUDIT?
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section" id="audit-why">
        <Reveal>
          <span className="section-label">01 / Context</span>
          <h2>Why a Technical Audit?</h2>
          <p className="section-intro">
            Before we can recommend a migration path, we need a <span className="hl">robust, evidence-based understanding</span> of the current platform. The technical audit gives both teams a shared baseline of fact.
          </p>
        </Reveal>

        <div className="side-by-side">
          <Reveal direction="left">
            <ul className="bullet-list">
              <li>
                <strong>Establish a clear picture</strong> of the current SAP Commerce implementation - its strengths, its pain points, and where technical debt has accumulated over time.
              </li>
              <li>
                <strong>Assess constraints and dependencies</strong> that will influence the migration strategy, including third-party integrations, customisation depth, and data-model complexity.
              </li>
              <li>
                <strong>Review integration patterns</strong> and extension usage so we can determine what can be reused, what must be rebuilt, and what should be retired.
              </li>
            </ul>

            <div className="callout">
              <strong>How this connects:</strong> The audit findings dovetail directly into the Discovery workshops. Every recommendation we make during the Phased Approach and architecture design will be traceable back to evidence surfaced here.
            </div>
          </Reveal>

          <Reveal direction="right">
            <div className="side-detail">
              <h4>Why this matters for {client.shortName}</h4>
              <p>
                {client.name} has operated its SAP Commerce platform for several years, with multiple rounds of feature development and third-party integrations layered on top. Understanding exactly what exists today removes guesswork and ensures we size the migration accurately.
              </p>

              <h4>What technical debt means</h4>
              <p>
                Technical debt is not a failure - it is the natural result of a long-lived platform evolving under business pressure. The audit quantifies this debt so we can address it systematically rather than discovering surprises mid-migration.
              </p>

              <h4>Integration complexity</h4>
              <p>
                The number and nature of integrations - ERP, PIM, payment providers, logistics - determines the critical path for a migration. We map every touchpoint so nothing is overlooked when planning the new architecture.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 2 - SCOPE
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section" id="audit-scope">
        <Reveal>
          <span className="section-label">02 / Scope</span>
          <h2>What the Technical Audit covers</h2>
          <p className="section-intro">
            The audit examines <span className="hl">twelve key areas</span> of your SAP Commerce codebase and infrastructure, each chosen because it directly influences migration effort and risk.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="scope-grid">
            {/* Card 1 */}
            <div className="scope-card">
              <span className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg></span>
              <div>
                <h4>Code quality</h4>
                <p>Coding standards, complexity metrics, and maintainability of the existing codebase.</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="scope-card">
              <span className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg></span>
              <div>
                <h4>Database Type System</h4>
                <p>SAP Commerce type system analysis - items, relations, enums, and data-model sprawl.</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="scope-card">
              <span className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg></span>
              <div>
                <h4>Catalogue structure</h4>
                <p>Product catalogues, classification systems, and category hierarchies.</p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="scope-card">
              <span className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></span>
              <div>
                <h4>Unit testing</h4>
                <p>Test coverage, test quality, and confidence level for safe refactoring.</p>
              </div>
            </div>

            {/* Card 5 */}
            <div className="scope-card">
              <span className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></span>
              <div>
                <h4>Integration review</h4>
                <p>All inbound and outbound integrations - APIs, middleware, file-based feeds.</p>
              </div>
            </div>

            {/* Card 6 */}
            <div className="scope-card">
              <span className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg></span>
              <div>
                <h4>Security-in-code</h4>
                <p>Authentication flows, authorisation patterns, and common vulnerability indicators.</p>
              </div>
            </div>

            {/* Card 7 */}
            <div className="scope-card">
              <span className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg></span>
              <div>
                <h4>Headless readiness</h4>
                <p>OCC API coverage, custom endpoints, and gaps that affect a decoupled front-end.</p>
              </div>
            </div>

            {/* Card 8 */}
            <div className="scope-card">
              <span className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></span>
              <div>
                <h4>Performance</h4>
                <p>Response times, caching strategy, query efficiency, and scalability indicators.</p>
              </div>
            </div>

            {/* Card 9 */}
            <div className="scope-card">
              <span className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg></span>
              <div>
                <h4>Extension status</h4>
                <p>Installed extensions, version currency, deprecated modules, and upgrade blockers.</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="callout callout--gold">
            <strong>Note on SEO:</strong> SEO-specific auditing (metadata, structured data, crawlability) is covered by specialist KPS partners and is not part of this technical code review.
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="side-detail" style={{ marginTop: 32 }}>
            <h4>Code quality</h4>
            <p>
              We apply static analysis and manual review to assess cyclomatic complexity, code duplication, adherence to SAP best practices, and the overall health of the codebase. This tells us how much refactoring effort is ahead.
            </p>

            <h4>Type system</h4>
            <p>
              The SAP Commerce type system is the backbone of the data model. We look for over-customisation, orphaned types, and unnecessary complexity that could slow down data migration or cause issues in a headless layer.
            </p>

            <h4>Integration &amp; OCC</h4>
            <p>
              Every integration is catalogued: protocol, direction, frequency, and error-handling approach. For OCC APIs we check coverage against the front-end requirements to identify gaps that a new composable storefront would need filled.
            </p>

            <h4>Headless readiness</h4>
            <p>
              We evaluate how much of the current business logic is already exposed via APIs versus locked inside JSP templates or Accelerator controllers. This is the single biggest factor in estimating the migration timeline.
            </p>

            <h4>Performance</h4>
            <p>
              Using {platform.monitoring} data and code-level analysis, we pinpoint slow queries, missing caches, and architectural bottlenecks. These findings feed directly into the performance workstream of the Phased Approach.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 3 - PROCESS
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section" id="audit-process">
        <Reveal>
          <span className="section-label">03 / Process</span>
          <h2>How the audit fits into Discovery</h2>
          <p className="section-intro">
            The technical audit runs as a <span className="hl">parallel workstream</span> alongside the Discovery workshops - it does not add calendar time to the overall engagement.
          </p>
        </Reveal>

        <div className="side-by-side">
          <Reveal direction="left">
            <div className="process-flow">
              {/* Step 1 */}
              <div className="process-step">
                <div className="step-num">1</div>
                <h4>Kick Off</h4>
                <p>Align on scope, agree access, schedule the review call.</p>
              </div>

              {/* Step 2 */}
              <div className="process-step">
                <div className="step-num">2</div>
                <h4>Workshops &amp; Audit</h4>
                <p>Discovery workshops run while KPS engineers review the codebase in parallel.</p>
              </div>

              {/* Step 3 */}
              <div className="process-step">
                <div className="step-num">3</div>
                <h4>Write-Up</h4>
                <p>Findings consolidated into a structured report with severity ratings.</p>
              </div>

              {/* Step 4 */}
              <div className="process-step">
                <div className="step-num">4</div>
                <h4>Playback</h4>
                <p>Review call with {client.shortName} to walk through findings, answer questions, and align on next steps.</p>
              </div>
            </div>

            <div className="callout-highlight">
              <strong>The technical audit is provided free of charge</strong> as part of KPS&apos;s commitment to the Discovery phase. There is no separate cost - it is included in the overall engagement to ensure we start from a position of complete transparency.
            </div>
          </Reveal>

          <Reveal direction="right">
            <div className="side-detail">
              <h4>Parallel workstreams</h4>
              <p>
                While the business and UX workshops capture requirements and map journeys, our engineers are independently reviewing the code. This means both workstreams inform each other without creating a sequential bottleneck.
              </p>

              <h4>Kick off</h4>
              <p>
                The kick-off aligns both teams on exactly what access is needed, who the technical contacts are on {client.shortName}&apos;s side, and when the review call will take place. We aim to keep this lightweight - typically a 30-minute session.
              </p>

              <h4>Write-up</h4>
              <p>
                The report is structured around the twelve audit areas with a clear severity rating (critical, high, medium, low) for each finding. This makes it easy to prioritise and to trace findings through to the Phased Approach.
              </p>

              <h4>No additional cost</h4>
              <p>
                KPS funds the technical audit internally because we believe starting every engagement with a clear-eyed view of the current state is essential for an honest, realistic migration plan. It protects both parties from avoidable surprises.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 4 - PREREQUISITES
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section" id="audit-prerequisites">
        <Reveal>
          <span className="section-label">04 / Prerequisites</span>
          <h2>What we need from {client.shortName}</h2>
          <p className="section-intro">
            To deliver a thorough audit we require <span className="hl">three things</span> from the {client.shortName} team. We keep the ask as lean as possible to minimise disruption.
          </p>
        </Reveal>

        <div className="side-by-side">
          <Reveal direction="left">
            <div className="prereq-grid">
              {/* Card 1 */}
              <div className="prereq-card">
                <h4>
                  <span className="prereq-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></span>
                  Copy of codebase
                </h4>
                <ul>
                  <li>Full source code of the SAP Commerce project (Git repository or zip export).</li>
                  <li>Include all custom extensions, configuration files, and build scripts.</li>
                  <li>Read-only access is sufficient - we do not need write permissions.</li>
                </ul>
              </div>

              {/* Card 2 */}
              <div className="prereq-card">
                <h4>
                  <span className="prereq-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></span>
                  Documentation
                </h4>
                <ul>
                  <li>Any existing architecture diagrams, integration maps, or data-flow documentation.</li>
                  <li>Deployment pipeline documentation if available.</li>
                  <li>Known issue logs or tech-debt registers if maintained.</li>
                </ul>
              </div>

              {/* Card 3 */}
              <div className="prereq-card" style={{ gridColumn: '1 / -1' }}>
                <h4>
                  <span className="prereq-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg></span>
                  {platform.monitoring} access
                </h4>
                <ul>
                  <li>Read-only access to the {platform.monitoring} dashboard for the production SAP Commerce environment.</li>
                  <li>This allows us to correlate code-level findings with real-world performance data.</li>
                  <li>If {platform.monitoring} is not available, equivalent APM data (New Relic, AppDynamics, etc.) is acceptable.</li>
                </ul>
              </div>
            </div>

            <div className="callout callout--pink">
              <strong>Sensitivity:</strong> All code and data shared with KPS is covered under the existing NDA. We store artefacts in a dedicated, access-controlled repository that is purged at the end of the engagement.
            </div>
          </Reveal>

          <Reveal direction="right">
            <div className="side-detail">
              <h4>Codebase access</h4>
              <p>
                A Git clone is ideal because it gives us commit history, which helps us understand the velocity of change and identify areas of high churn (often correlated with instability). A zip export is fine if Git is not feasible.
              </p>

              <h4>Documentation</h4>
              <p>
                We do not need polished documentation - even rough diagrams, wiki pages, or Confluence exports are valuable. The goal is to accelerate our ramp-up so we spend audit time on analysis, not on reverse-engineering basics.
              </p>

              <h4>{platform.monitoring} / APM</h4>
              <p>
                Performance data from production is essential for validating our code-level findings against real traffic patterns. Without it, our performance assessment would be limited to static analysis only, which misses load-dependent issues.
              </p>

              <h4>Minimising your effort</h4>
              <p>
                We have designed the prerequisites to require minimal effort from the {client.shortName} team. Once access is granted, the audit runs largely independently - we will only reach out with targeted questions if something in the code is unclear.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 5 - DELIVERABLES
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section" id="audit-deliverables">
        <Reveal>
          <span className="section-label">05 / Deliverables</span>
          <h2>What you receive</h2>
          <p className="section-intro">
            The audit produces a <span className="hl">comprehensive report</span> and a structured playback session. Every finding is actionable and feeds directly into the Discovery output.
          </p>
        </Reveal>

        <div className="side-by-side">
          <Reveal direction="left">
            <div className="deliverables-grid">
              {/* Box 1: Report */}
              <div className="deliverable-box">
                <h3>Technical Audit Report</h3>
                <ul className="check-list">
                  <li>Executive summary with overall health rating</li>
                  <li>Code quality analysis and complexity metrics</li>
                  <li>Type system assessment and data-model review</li>
                  <li>Catalogue structure evaluation</li>
                  <li>Unit test coverage and quality analysis</li>
                  <li>Integration inventory with risk ratings</li>
                  <li>Security-in-code findings</li>
                  <li>Headless readiness scorecard</li>
                  <li>Performance analysis with {platform.monitoring} correlation</li>
                </ul>
              </div>

              {/* Box 2: Feed into Discovery */}
              <div className="deliverable-box">
                <h3>How findings feed into Discovery</h3>
                <ul className="feed-list">
                  <li>
                    <strong>Migration sizing:</strong> Audit findings directly inform effort estimates for each phase of the migration, ensuring the Phased Approach is grounded in reality.
                  </li>
                  <li>
                    <strong>Risk register:</strong> High and critical findings are escalated into the project risk register with recommended mitigations, giving both teams early visibility.
                  </li>
                  <li>
                    <strong>Architecture decisions:</strong> Integration patterns and headless readiness scores shape the target architecture, helping us decide what to reuse, replace, or retire.
                  </li>
                  <li>
                    <strong>Sprint zero backlog:</strong> Tactical fixes identified during the audit are packaged into a sprint-zero backlog so the development team can hit the ground running.
                  </li>
                </ul>

                <div className="callout" style={{ marginTop: 16 }}>
                  <strong>Review call:</strong> After the report is delivered, we schedule a 60-minute review call to walk through every finding, answer questions, and agree on priority. This ensures nothing is lost in translation.
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal direction="right">
            <div className="side-detail">
              <h4>Report format</h4>
              <p>
                The report is delivered as a structured PDF document with an accompanying data appendix. Each finding includes a severity rating, evidence (code snippets or metrics), and a recommended action.
              </p>

              <h4>Severity ratings</h4>
              <p>
                We use a four-tier rating system: Critical (blocks migration or poses immediate risk), High (significant effort or risk), Medium (should be addressed but not blocking), and Low (cosmetic or minor improvement). This makes prioritisation straightforward.
              </p>

              <h4>Traceability</h4>
              <p>
                Every finding is assigned a unique ID that carries through to the Phased Approach document. When a migration task references audit finding AUD-017, for example, both teams can trace it back to the original evidence.
              </p>

              <h4>Living document</h4>
              <p>
                While the initial report is a point-in-time snapshot, we update it if significant changes are discovered during the Discovery workshops. The goal is to keep it accurate and useful throughout the engagement.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 6 - TIMELINE
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section" id="audit-timeline">
        <Reveal>
          <span className="section-label">06 / Timeline</span>
          <h2>When and how long</h2>
          <p className="section-intro">
            The audit is designed to be <span className="hl">fast, focused, and non-disruptive</span>. It runs in parallel with Discovery so it adds zero calendar time to the overall programme.
          </p>
        </Reveal>

        <div className="side-by-side">
          <Reveal direction="left">
            <div className="stat-row">
              <div className="stat-box">
                <div className="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
                <div className="stat-label">~2 weeks</div>
                <div className="stat-desc">End-to-end from codebase access to report delivery.</div>
              </div>

              <div className="stat-box">
                <div className="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4z"/></svg></div>
                <div className="stat-label">Before kick-off</div>
                <div className="stat-desc">Ideally we receive the codebase before the Discovery kick-off so we can start immediately.</div>
              </div>

              <div className="stat-box">
                <div className="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg></div>
                <div className="stat-label">Review call</div>
                <div className="stat-desc">Scheduled at the end of week 2 or early week 3 to walk through findings together.</div>
              </div>
            </div>

            <div className="schedule-wrap">
              <table className="schedule-table">
                <thead>
                  <tr>
                    <th>Activity</th>
                    <th>Week 1</th>
                    <th>Week 2</th>
                    <th>Week 3</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Codebase access &amp; kick-off</td>
                    <td className="active-cell">&#x2713;</td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Static analysis &amp; code review</td>
                    <td className="active-cell">&#x2713;</td>
                    <td className="active-cell">&#x2713;</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Integration &amp; performance review</td>
                    <td></td>
                    <td className="active-cell">&#x2713;</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Report write-up</td>
                    <td></td>
                    <td className="active-cell">&#x2713;</td>
                    <td className="active-cell">&#x2713;</td>
                  </tr>
                  <tr>
                    <td>Playback / review call</td>
                    <td></td>
                    <td></td>
                    <td className="active-cell--gold">&#x2713;</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal direction="right">
            <div className="side-detail">
              <h4>Why ~2 weeks?</h4>
              <p>
                Two weeks gives us enough time to perform a thorough analysis without rushing, while keeping the results fresh and relevant for the Discovery workshops happening in parallel. Most codebases of this size can be reviewed comprehensively in this window.
              </p>

              <h4>Early access advantage</h4>
              <p>
                If {client.shortName} can provide codebase access before the official Discovery kick-off, we gain a head start. This means the audit findings are available earlier, giving the workshop facilitators richer context for their sessions.
              </p>

              <h4>Flexibility</h4>
              <p>
                The timeline can flex slightly depending on codebase size and complexity. If the SAP Commerce project is unusually large or has a very high number of custom extensions, we may extend to 2.5 weeks. We will communicate any adjustment early.
              </p>

              <h4>Minimal disruption</h4>
              <p>
                The {client.shortName} team&apos;s involvement is limited to providing initial access and attending the review call. We handle everything in between independently, reaching out only if we encounter something that requires clarification.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 7 - NEXT STEPS
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="section" id="audit-next-steps">
        <Reveal>
          <span className="section-label">07 / Next Steps</span>
          <h2>Getting started</h2>
          <p className="section-intro">
            The groundwork is done. Here is where we stand and what comes next to <span className="hl">begin the technical audit</span>.
          </p>
        </Reveal>

        <div className="side-by-side">
          <Reveal direction="left">
            <div className="next-steps-list">
              {/* Step 1 - completed */}
              <div className="next-step" style={{ opacity: 0.45 }}>
                <div className="step-circle" style={{ background: 'var(--grey)' }}>1</div>
                <div>
                  <h4 style={{ textDecoration: 'line-through' }}>RFP response delivered</h4>
                  <p>KPS has submitted a comprehensive proposal covering architecture, delivery model, capability building, and continuous improvement.</p>
                </div>
              </div>

              {/* Step 2 - completed */}
              <div className="next-step" style={{ opacity: 0.45 }}>
                <div className="step-circle" style={{ background: 'var(--grey)' }}>2</div>
                <div>
                  <h4 style={{ textDecoration: 'line-through' }}>Audit prerequisites shared</h4>
                  <p>{client.shortName} has provided codebase access, supporting documentation, and {platform.monitoring} credentials to enable a thorough review.</p>
                </div>
              </div>

              {/* Step 3 - completed */}
              <div className="next-step" style={{ opacity: 0.45 }}>
                <div className="step-circle" style={{ background: 'var(--grey)' }}>3</div>
                <div>
                  <h4 style={{ textDecoration: 'line-through' }}>Audit kick-off</h4>
                  <p>Align on scope, confirm access, and schedule the review call. KPS engineers begin the parallel code review alongside Discovery workshops.</p>
                </div>
              </div>

              {/* Step 4 - active */}
              <div className="next-step" style={{ borderColor: 'var(--cyan)', boxShadow: '0 0 20px rgba(40,220,202,0.1)' }}>
                <div className="step-circle">4</div>
                <div>
                  <h4>Audit report delivery</h4>
                  <p>A structured report covering all twelve audit areas with severity ratings, actionable findings, and a playback session to walk through every recommendation together.</p>
                </div>
              </div>
            </div>

          </Reveal>

          <Reveal direction="right">
            <div className="side-detail">
              <h4>Momentum is building</h4>
              <p>
                The RFP response and audit prerequisites are behind us. Both teams are aligned on the scope, the deliverables, and the timeline. We are ready to move into active review.
              </p>

              <h4>What happens at kick-off</h4>
              <p>
                A focused 30-minute session to confirm access, agree on the review call date, and align on any open questions. KPS engineers begin the code review immediately after, running in parallel with the Discovery workshops.
              </p>

              <h4>What the report delivers</h4>
              <p>
                A structured document covering all twelve audit areas with a clear severity rating for every finding. Each recommendation is evidence-based and traceable through to the Phased Approach, ensuring nothing is lost between analysis and action.
              </p>

              <h4>Questions?</h4>
              <p>
                If anything about the process, scope, or next steps is unclear, reach out to <a href={`mailto:${kps.contactEmail}`} style={{ color: 'var(--cyan)' }}>{kps.contactEmail}</a>. We are happy to schedule a short call to address any concerns.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      </TocLayout>

      {/* ═══ FOOTER ═══ */}
      <Footer />
    </>
  );
}
