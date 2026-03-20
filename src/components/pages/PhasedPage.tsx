'use client';

import Reveal from '@/components/Reveal';
import Hero from '@/components/Hero';
import StickyNav from '@/components/StickyNav';
import TocLayout from '@/components/TocLayout';
import Footer from '@/components/Footer';
import { client, kps } from '@/data/client-config';

interface PhasedPageProps {
  navigateTo: (page: string) => void;
  goHome: () => void;
}

export default function PhasedPage({ navigateTo, goHome }: PhasedPageProps) {
  return (
    <>
      {/* ── Hero ── */}
      <Hero
        title={<>A Phased Go-Live Is the Right Way to Do This</>}
        subtitle="Why an incremental headless transition reduces risk, delivers value earlier, and builds confidence at every step."
      />

      {/* ── Sticky Nav ── */}
      <StickyNav
        logoText={<>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={kps.logoUrl} alt="KPS" style={{ height: 22 }} /> <span>Phased Go-Live</span></>}
        onHome={goHome}
      />

      <TocLayout links={[
        { id: 'phased-context', label: 'Context' },
        { id: 'phased-vs-bigbang', label: 'vs Big Bang' },
        { id: 'phased-vertical', label: 'How It Works' },
        { id: 'phased-granularity', label: 'Granularity' },
        { id: 'phased-experience', label: 'Experience' },
        { id: 'phased-rollback', label: 'Rollback' },
        { id: 'phased-considerations', label: 'Considerations' },
        { id: 'phased-technology', label: 'Technology' },
        { id: 'phased-benefits', label: 'Benefits' },
        { id: 'phased-prioritisation', label: 'Prioritisation' },
        { id: 'phased-model', label: 'Model' },
        { id: 'phased-architecture', label: 'Architecture' },
        { id: 'phased-summary', label: 'Summary' },
      ]}>

      {/* ═══════════════════════════════════════════════════════════
          01 / Context
      ═══════════════════════════════════════════════════════════ */}
      <section className="section" id="phased-context">
        <Reveal>
          <span className="section-label">01 / Context</span>
          <h2>{client.name} is at a transition point</h2>
          <div className="callout callout--cyan" style={{ marginTop: 16 }}>
            <strong>Key Takeaway:</strong> SAP Commerce Accelerator will receive diminishing support and no new feature
            investment. Organisations that delay the transition face compounding risk: security
            patches slow down, compatible extensions become scarce, and developer talent
            moves to modern stacks.
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="bullet-list">
            <li>
              <strong>SAP Commerce Accelerator is approaching end of life.</strong> The current
              storefront is built on a technology that SAP is sunsetting. Staying on this path
              means increasing maintenance cost, shrinking vendor support, and growing technical
              debt with every release cycle.
            </li>
            <li>
              <strong>Customer and business demands are increasing.</strong> B2B and B2C buyers
              expect faster page loads, personalised experiences, and seamless omnichannel
              journeys. The current architecture makes it difficult to iterate at the speed
              the market requires.
            </li>
            <li>
              <strong>The objective is not just to replace a storefront.</strong> {client.name} needs
              a platform that supports composable commerce, enables teams to ship
              independently, and positions the business for AI-driven personalisation and
              future channel expansion.
            </li>
            <li>
              <strong>The challenge is to modernise without putting stability at risk.</strong> {client.shortName} runs
              a high-volume, mission-critical commerce operation across {client.verticals.join(', ')}. Any transition
              strategy must protect revenue continuity, operational stability, and customer
              trust throughout the transition.
            </li>
          </ul>

          <div className="callout callout--gold" style={{ marginTop: 16 }}>
            <strong>Why the approach matters:</strong> A platform transition of this scale is not purely a technology project. It touches
            every customer journey, every integration, and every internal workflow. The
            transition approach determines whether the business experiences disruption or
            continuous improvement.
          </div>
        </Reveal>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          02 / Phased vs Big Bang
      ═══════════════════════════════════════════════════════════ */}
      <section className="section" id="phased-vs-bigbang">
        <Reveal>
          <span className="section-label">02 / Approach</span>
          <h2>Phased evolution, not big bang</h2>
          <p className="section-intro">
            The core principle behind our recommendation is <span className="hl">phased vertical
            rollout</span>: launch new experiences incrementally, validate them under real
            traffic, and expand only when confidence is established.
          </p>
          <div className="callout callout--cyan" style={{ marginTop: 16 }}>
            <strong>Key Takeaway:</strong> A vertical slice means taking a complete customer journey - for example, product
            search through to checkout - and moving it end-to-end to the new frontend.
            This is different from a horizontal approach, where you might rebuild an entire
            layer (e.g. all UI components) without delivering a complete flow.
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="pros-cons">
            <div className="pros">
              <h4>Phased rollout</h4>
              <ul>
                <li>Old and new run side by side with no downtime</li>
                <li>Migrate one journey at a time, proving value early</li>
                <li>Validate architecture decisions in production before scaling</li>
                <li>Roll back any single journey without affecting the rest</li>
                <li>Build organisational confidence through incremental wins</li>
              </ul>
            </div>
            <div className="cons">
              <h4>Big-bang replacement</h4>
              <ul>
                <li>Everything changes at once on a single launch day</li>
                <li>Months or years of work before any business value is delivered</li>
                <li>High-stakes cutover weekend with limited fallback options</li>
                <li>Teams overwhelmed by the volume of simultaneous change</li>
                <li>Issues surface only after the entire system is live</li>
              </ul>
            </div>
          </div>

          <div className="callout callout--gold" style={{ marginTop: 16 }}>
            <strong>Smart risk management:</strong> Phased rollout limits the blast radius of any issue. If a newly launched journey
            encounters a problem, it can be rolled back to the legacy frontend within minutes.
            The rest of the site remains unaffected. This is fundamentally different from the
            all-or-nothing risk profile of a big-bang launch.
          </div>
        </Reveal>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          03 / How Vertical Migration Works
      ═══════════════════════════════════════════════════════════ */}
      <section className="section" id="phased-vertical">
        <Reveal>
          <span className="section-label">03 / Mechanism</span>
          <h2>How vertical rollout works</h2>
          <p className="section-intro">
            A <span className="hl">CDN or edge router</span> sits in front of both frontends and
            directs each request to the appropriate destination based on configurable routing
            rules. The customer never sees the seam.
          </p>
          <div className="callout callout--cyan" style={{ marginTop: 16 }}>
            <strong>Key Takeaway:</strong> From the customer&apos;s perspective, the entire site lives under a single domain.
            There is no redirect, no separate subdomain, and no visible indication that two
            frontends are serving different parts of the experience. Navigation between
            migrated and non-migrated journeys feels seamless.
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="arch-diagram">
            <div className="arch-box" style={{ width: '100%', maxWidth: 340 }}>
              Customer request
            </div>

            <div className="arch-arrow">↓</div>

            <div className="arch-box shared" style={{ width: '100%', maxWidth: 420 }}>
              <span style={{ color: 'var(--gold)', fontWeight: 600 }}>CDN / Edge Router</span>
            </div>

            <div className="arch-arrow">↓</div>

            <div className="arch-row">
              <div className="arch-box legacy" style={{ flex: 1 }}>
                <div style={{ color: 'var(--pink)', fontWeight: 600, marginBottom: 6 }}>
                  Legacy Accelerator
                </div>
                <div style={{ fontSize: 13, color: 'var(--grey)' }}>
                  Journeys not yet migrated
                </div>
                <div style={{ fontSize: 12, color: 'var(--grey)', marginTop: 4, fontStyle: 'italic' }}>
                  e.g. account management, order history
                </div>
              </div>
              <div className="arch-box new" style={{ flex: 1 }}>
                <div style={{ color: 'var(--cyan)', fontWeight: 600, marginBottom: 6 }}>
                  New Headless Frontend
                </div>
                <div style={{ fontSize: 13, color: 'var(--grey)' }}>
                  Migrated journeys
                </div>
                <div style={{ fontSize: 12, color: 'var(--grey)', marginTop: 4, fontStyle: 'italic' }}>
                  e.g. homepage, PDP, search, checkout
                </div>
              </div>
            </div>

            <div className="arch-arrow">↓</div>

            <div className="arch-box shared" style={{ width: '100%', maxWidth: 420 }}>
              SAP Commerce (shared backend)
            </div>
          </div>

          <div className="callout-highlight">
            <strong>Both frontends share the same SAP Commerce backend.</strong> Product data,
            pricing, inventory, cart, and customer accounts remain in a single source of truth.
            The transition is a frontend concern - the backend stays stable throughout.
          </div>

          <div className="callout callout--gold" style={{ marginTop: 16 }}>
            <strong>Edge routing in practice:</strong> The CDN or edge layer inspects each incoming request - typically by URL path,
            cookie, or header - and forwards it to the appropriate frontend. For example,
            <code style={{ color: 'var(--cyan)', fontSize: 14 }}> /products/*</code> might
            route to the new headless frontend while
            <code style={{ color: 'var(--pink)', fontSize: 14 }}> /account/*</code> still
            routes to the legacy Accelerator.
          </div>
        </Reveal>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          04 / Granularity
      ═══════════════════════════════════════════════════════════ */}
      <section className="section" id="phased-granularity">
        <Reveal>
          <span className="section-label">04 / Granularity</span>
          <h2>Go-live per module, per page, per user segment</h2>
          <p className="section-intro">
            Phased rollout operates at <span className="hl">multiple levels of granularity</span>.
            You can route by page, by module within a page, or by user segment - giving
            full control over how and when each part of the experience transitions.
          </p>
          <div className="callout callout--cyan" style={{ marginTop: 16 }}>
            <strong>Key Takeaway:</strong> The combination of page-level and segment-level routing means the team has
            precise control over the rollout pace. There is no pressure to migrate
            everything at once. Each decision to expand is backed by production data
            and real user feedback.
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="two-column">
            <div className="content-box">
              <h3>By page or module</h3>
              <p>
                Route entire pages (e.g. the homepage, PDP, or checkout) to the new frontend,
                or go more granular and migrate individual modules within a page. For example,
                the product recommendation carousel could be served by the new frontend while
                the rest of the page remains on the legacy system.
              </p>
              <p>
                This allows teams to ship value in small, testable increments rather than
                waiting for an entire page to be feature-complete before going live.
              </p>
            </div>
            <div className="content-box">
              <h3>By user segment</h3>
              <p>
                Route specific user segments to the new frontend while others continue on
                the legacy experience. This enables canary releases, A/B testing, and
                controlled rollouts based on geography, account type, or percentage of traffic.
              </p>
              <p>
                Start with internal users, expand to a small percentage of live traffic,
                validate metrics, and then scale to 100%. Risk is contained at every step.
              </p>
            </div>
          </div>

          <div className="callout callout--gold" style={{ marginTop: 16 }}>
            <strong>Routing rule types:</strong> Routing can be based on URL path, cookie values, HTTP headers, IP ranges,
            geographic location, user agent, or custom logic at the edge. Modern CDN
            platforms like Cloudflare, Akamai, and Vercel Edge Middleware make these
            rules trivial to implement and update without deployments.
          </div>
        </Reveal>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          05 / Experience
      ═══════════════════════════════════════════════════════════ */}
      <section className="section" id="phased-experience">
        <Reveal>
          <span className="section-label">05 / Experience</span>
          <h2>The customer experience during the transition</h2>
          <p className="section-intro">
            The transition must be <span className="hl">invisible to customers</span>. They should
            never notice that they are moving between two frontends. Here is how we achieve that.
          </p>
          <div className="callout callout--cyan" style={{ marginTop: 16 }}>
            <strong>Key Takeaway:</strong> Session management is handled at the backend level through SAP Commerce. Both
            frontends use the same session cookies and authentication tokens. This means
            there is no re-authentication when crossing a boundary, and cart state, wishlist
            data, and user preferences remain consistent.
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="bullet-list">
            <li>
              <strong>Shared domain, shared backend, shared session.</strong> Both frontends
              operate under the same domain and authenticate against the same SAP Commerce
              backend. Session tokens, cookies, and authentication state carry across seamlessly.
            </li>
            <li>
              <strong>Cart and login state are maintained across boundaries.</strong> A customer
              who adds items to their cart on a migrated page and then navigates to a legacy
              page will see the same cart contents. Login state persists regardless of which
              frontend serves the page.
            </li>
            <li>
              <strong>Visual consistency through a shared design system.</strong> Both frontends
              consume the same design tokens, component library, and brand guidelines. Headers,
              footers, navigation, and core UI patterns are visually identical regardless of
              which frontend renders them.
            </li>
            <li>
              <strong>Performance differences work in the customer&apos;s favour.</strong> The
              new headless frontend is faster by design - smaller bundles, edge-rendered pages,
              and optimised asset delivery. Customers routed to migrated journeys experience
              better performance, not worse.
            </li>
          </ul>

          <div className="callout callout--gold" style={{ marginTop: 16 }}>
            <strong>Boundary crossings:</strong> When a customer navigates from a migrated page to a legacy page (or vice versa),
            the transition happens via a standard page navigation. The CDN routes the request
            to the correct frontend, and the page loads with the customer&apos;s session intact.
            There is no flash of unstyled content, no visible redirect, and no data loss.
          </div>
        </Reveal>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          06 / Rollback
      ═══════════════════════════════════════════════════════════ */}
      <section className="section" id="phased-rollback">
        <Reveal>
          <span className="section-label">06 / Safety Net</span>
          <h2>Rollback, user groups, and monitoring</h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="tech-grid tech-grid--3">
            <div className="tech-card">
              <span className="badge">Rollback</span>
              <div className="tech-card__name">Straightforward and low-risk</div>
              <div className="tech-card__desc">
                Rolling back a migrated journey means updating the edge routing rule to point
                that path back to the legacy frontend. This is a configuration change, not a
                deployment. It takes effect in seconds and requires no code changes, no
                downtime, and no data transfer.
              </div>
            </div>
            <div className="tech-card">
              <span className="badge badge--gold">User groups</span>
              <div className="tech-card__name">Flexible segmentation</div>
              <div className="tech-card__desc">
                Route specific user groups to the new experience: internal testers first,
                then a percentage of external traffic, then specific customer segments. Each
                expansion is a deliberate decision backed by monitoring data from the
                previous phase.
              </div>
            </div>
            <div className="tech-card">
              <span className="badge badge--pink">Monitoring</span>
              <div className="tech-card__name">Full visibility per phase</div>
              <div className="tech-card__desc">
                Every phase is instrumented with real-time monitoring: page load times,
                conversion rates, error rates, and user behaviour metrics. Dashboards
                compare new vs legacy performance side by side, making it clear whether
                a phase is succeeding or needs attention.
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="callout">
            <strong>Control at every stage.</strong> The combination of instant rollback,
            granular user segmentation, and real-time monitoring means the team is never
            flying blind. Every rollout step is reversible, measurable, and deliberate.
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="callout callout--cyan" style={{ marginTop: 16 }}>
            <strong>Key Takeaway:</strong> Rollback is not a panic button - it is a planned capability. Every migrated
            journey is designed with the assumption that it might need to be rolled back.
            The legacy frontend remains operational and ready to serve traffic at all times
            until a journey is fully validated and the legacy version is decommissioned.
          </div>

          <div className="callout callout--gold" style={{ marginTop: 16 }}>
            <strong>Monitoring capabilities:</strong> Monitoring spans both synthetic and real-user metrics. Core Web Vitals, server
            response times, API error rates, and business KPIs (add-to-cart rate, checkout
            completion, revenue per session) are tracked per frontend. Alerts fire
            automatically when thresholds are breached, enabling rapid response.
          </div>
        </Reveal>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          07 / Considerations
      ═══════════════════════════════════════════════════════════ */}
      <section className="section" id="phased-considerations">
        <Reveal>
          <span className="section-label">07 / Trade-offs</span>
          <h2>Limitations and considerations</h2>
          <p className="section-intro">
            We believe in being <span className="hl">clear-eyed about trade-offs</span>. A phased
            transition is the right strategy, but it is not without complexity. Here are the
            considerations we plan for upfront.
          </p>
          <div className="callout callout--pink" style={{ marginTop: 16 }}>
            <strong>Not blockers, but planning items:</strong> None of these considerations are deal-breakers. They are well-understood
            challenges with proven solutions. The key is to address them during the
            Discovery and Technical Design phases rather than discovering them mid-build.
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="bullet-list">
            <li>
              <strong>Two frontends = two codebases.</strong> During the transition period, the
              team maintains both the legacy Accelerator and the new headless frontend. This
              means parallel bug fixes, coordinated releases, and a clear ownership model
              for each codebase.
            </li>
            <li>
              <strong>Visual consistency requires active management.</strong> Keeping both
              frontends visually aligned requires a shared design system, shared tokens, and
              regular cross-team reviews. Without discipline, visual drift can erode the
              seamless experience.
            </li>
            <li>
              <strong>Session and auth sharing must be designed carefully.</strong> Both
              frontends need to share session state, authentication tokens, and cart data.
              This is a solved problem architecturally, but it requires deliberate design
              during the technical planning phase.
            </li>
            <li>
              <strong>Not every journey splits cleanly.</strong> Some customer journeys span
              multiple pages or involve deep interdependencies between modules. These
              journeys require more careful planning to determine where the boundary between
              old and new should sit.
            </li>
            <li>
              <strong>Routing complexity grows with granularity.</strong> The more granular
              the routing rules (per module, per user segment, per geography), the more
              complex the routing configuration becomes. This is manageable with the right
              tooling, but it needs to be planned and documented.
            </li>
          </ul>

          <div className="callout callout--gold" style={{ marginTop: 16 }}>
            <strong>Addressed during Discovery:</strong> The KPS Discovery phase explicitly maps session sharing requirements, identifies
            journeys that do not split cleanly, defines the design system governance model,
            and establishes routing rule management processes. Every consideration listed
            here has a corresponding deliverable in Discovery.
          </div>
        </Reveal>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          08 / Technology
      ═══════════════════════════════════════════════════════════ */}
      <section className="section" id="phased-technology">
        <Reveal>
          <span className="section-label">08 / Technology</span>
          <h2>Which technology best supports phased delivery?</h2>
          <p className="section-intro">
            All three frontend options under consideration <span className="hl">support phased
            rollout</span>, but they differ in how naturally they fit the model and how much
            flexibility they offer at the edge.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="tech-grid tech-grid--3">
            <div className="tech-card" style={{ borderColor: 'var(--cyan)' }}>
              <span className="badge">Option 1</span>
              <div className="tech-card__name">SAP Composable Storefront</div>
              <div className="tech-card__desc">
                SAP&apos;s own headless frontend built on Angular. Supports phased rollout
                through SmartEdit and component-level routing. Tightly coupled to the SAP
                ecosystem, which simplifies integration but limits flexibility at the edge.
              </div>
              <div className="phased-fit" style={{ color: 'var(--cyan)' }}>
                Phased fit: Good
              </div>
            </div>
            <div className="tech-card" style={{ borderColor: 'var(--gold)' }}>
              <span className="badge badge--gold">Option 2</span>
              <div className="tech-card__name">Alokai FEaaS</div>
              <div className="tech-card__desc">
                Frontend-as-a-Service platform with built-in SAP Commerce integration.
                Supports edge-based routing and page-level rollout out of the box.
                Provides a middleware layer that abstracts backend complexity.
              </div>
              <div className="phased-fit" style={{ color: 'var(--gold)' }}>
                Phased fit: Strong
              </div>
            </div>
            <div className="tech-card" style={{ borderColor: 'var(--pink)' }}>
              <span className="badge badge--pink">Option 3</span>
              <div className="tech-card__name">Custom on Vercel</div>
              <div className="tech-card__desc">
                A bespoke Next.js frontend deployed on Vercel&apos;s edge network. Full
                control over routing, rendering strategy, and performance optimisation.
                Vercel Edge Middleware enables granular, code-driven routing rules.
              </div>
              <div className="phased-fit" style={{ color: 'var(--pink)' }}>
                Phased fit: Strongest
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="callout-highlight">
            <strong>The technology decision will be made during Discovery.</strong> Each option
            has strengths depending on {client.name}&apos;s internal capabilities, long-term
            platform strategy, and integration complexity. Discovery evaluates all three
            against real requirements, not theoretical comparisons.
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="callout callout--gold" style={{ marginTop: 16 }}>
            <strong>SAP Composable Storefront:</strong> Best suited for organisations that want to stay within the SAP ecosystem and
            value out-of-the-box integration with SAP Commerce features. Phased rollout
            is possible but routing flexibility is limited compared to edge-native approaches.
          </div>

          <div className="callout callout--gold" style={{ marginTop: 16 }}>
            <strong>Alokai FEaaS:</strong> Provides a strong balance between integration speed and architectural flexibility.
            The middleware layer simplifies API orchestration, and the platform supports
            page-level routing natively. A good fit for teams that want to move fast without
            building everything from scratch.
          </div>

          <div className="callout callout--cyan" style={{ marginTop: 16 }}>
            <strong>Custom on Vercel:</strong> Offers maximum flexibility and performance potential. Vercel Edge Middleware
            enables routing rules that can inspect cookies, headers, and geolocation at the
            edge with sub-millisecond latency. Best suited for teams with strong frontend
            engineering capability or willingness to build it.
          </div>
        </Reveal>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          09 / Benefits
      ═══════════════════════════════════════════════════════════ */}
      <section className="section" id="phased-benefits">
        <Reveal>
          <span className="section-label">09 / Benefits</span>
          <h2>Why phased delivery works</h2>
          <div className="callout callout--cyan" style={{ marginTop: 16 }}>
            <strong>Key Takeaway:</strong> The most common reason large platform transitions fail is not technology - it is
            the accumulation of risk into a single high-stakes moment. Phased delivery
            eliminates this pattern by distributing risk across many small, manageable
            releases. Each release is validated independently before the next begins.
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="stat-grid">
            <div className="stat-box">
              <div className="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
              <div className="stat-label">Reduced risk</div>
              <div className="stat-desc">
                Every rollout step is reversible. Issues are contained to a single journey,
                not the entire site. Rollback takes seconds, not hours.
              </div>
            </div>
            <div className="stat-box">
              <div className="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></div>
              <div className="stat-label">Early value</div>
              <div className="stat-desc">
                The first migrated journey goes live in weeks, not months. Business
                stakeholders see real results early, building momentum for the rest of
                the programme.
              </div>
            </div>
            <div className="stat-box">
              <div className="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/><line x1="11" y1="8" x2="11" y2="14"/></svg></div>
              <div className="stat-label">A/B testing built in</div>
              <div className="stat-desc">
                Running two frontends side by side is inherently an A/B test. Compare
                conversion rates, page speed, and user behaviour between old and new
                with real production data.
              </div>
            </div>
            <div className="stat-box">
              <div className="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
              <div className="stat-label">No downtime</div>
              <div className="stat-desc">
                There is no cutover weekend, no maintenance window, and no moment where
                the site is unavailable. Traffic shifts gradually and transparently.
              </div>
            </div>
            <div className="stat-box">
              <div className="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg></div>
              <div className="stat-label">Predictable delivery</div>
              <div className="stat-desc">
                Each phase has a clear scope, timeline, and success criteria. Progress
                is visible and measurable, making it easier to plan resources and
                communicate status to stakeholders.
              </div>
            </div>
            <div className="stat-box">
              <div className="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg></div>
              <div className="stat-label">Stakeholder confidence</div>
              <div className="stat-desc">
                Incremental delivery builds trust across the organisation. Each successful
                phase demonstrates competence and reduces anxiety about the remaining
                rollout scope.
              </div>
            </div>
          </div>

          <div className="callout callout--gold" style={{ marginTop: 16 }}>
            <strong>Early return on investment:</strong> With a big-bang approach, ROI is zero until launch day. With phased delivery,
            the first migrated journey begins delivering value immediately: faster page
            loads, improved conversion rates, and a modern developer experience that
            accelerates all subsequent work.
          </div>
        </Reveal>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          10 / Prioritisation
      ═══════════════════════════════════════════════════════════ */}
      <section className="section" id="phased-prioritisation">
        <Reveal>
          <span className="section-label">10 / Prioritisation</span>
          <h2>Prioritising what to migrate first</h2>
          <p className="section-intro">
            Not all journeys are equal. We recommend <span className="hl">prioritising based on
            business impact</span>, transition complexity, and the ability to demonstrate early
            value to stakeholders.
          </p>
          <div className="callout callout--cyan" style={{ marginTop: 16 }}>
            <strong>Key Takeaway:</strong> We prioritise journeys where the gap between current and potential performance
            is largest, where traffic volume amplifies the impact of improvements, and where
            stakeholders can see measurable results quickly. This builds the business case
            for continued investment in the headless programme.
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="content-box" style={{ marginBottom: 20 }}>
              <h3>High-priority candidates</h3>
              <ul className="bullet-list">
                <li>
                  <strong>Homepage</strong> - highest traffic, greatest brand impact, and
                  relatively low integration complexity
                </li>
                <li>
                  <strong>Product search</strong> - performance-sensitive, high conversion
                  influence, and a strong candidate for edge rendering
                </li>
                <li>
                  <strong>Product detail pages</strong> - the most visited page type, directly
                  tied to purchase decisions and SEO performance
                </li>
                <li>
                  <strong>Checkout</strong> - the highest-value journey, where performance
                  improvements translate directly to revenue
                </li>
              </ul>
            </div>
            <div className="content-box" style={{ marginBottom: 20 }}>
              <h3>Migrate later</h3>
              <ul className="bullet-list">
                <li>
                  <strong>Account management</strong> - lower traffic, higher integration
                  complexity with backend systems
                </li>
                <li>
                  <strong>Order history</strong> - read-heavy, stable, and lower priority
                  for customer experience improvement
                </li>
                <li>
                  <strong>Trade portal admin</strong> - specialised workflows with deep SAP integration
                  that benefit from more rollout experience
                </li>
                <li>
                  <strong>Back-office</strong> - internal tools that can migrate on a longer
                  timeline without customer impact
                </li>
              </ul>
            </div>

          <div className="callout">
            <strong>Discovery defines the priority.</strong> The exact rollout sequence will
            be determined during Discovery based on {client.name}&apos;s specific traffic
            patterns, business priorities, and integration landscape. The above is an
            indicative starting point, not a fixed plan.
          </div>

          <div className="callout callout--gold" style={{ marginTop: 16 }}>
            <strong>Stable journeys can wait:</strong> Journeys that are working well on the legacy platform, have lower traffic, or
            involve deeply integrated back-office workflows can be migrated later when the
            team has more experience with the new architecture. There is no urgency to
            migrate everything at once - that is the entire point of phased delivery.
          </div>
        </Reveal>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          11 / Model
      ═══════════════════════════════════════════════════════════ */}
      <section className="section" id="phased-model">
        <Reveal>
          <span className="section-label">11 / Model</span>
          <h2>The KPS Transformation Model</h2>
          <p className="section-intro">
            KPS delivers phased transitions through a <span className="hl">structured, repeatable
            model</span> that takes the programme from initial discovery through to continuous
            improvement. Each phase has clear inputs, outputs, and success criteria.
          </p>
          <div className="callout callout--cyan" style={{ marginTop: 16 }}>
            <strong>Key Takeaway:</strong> Discovery and Technical Design are where the most critical decisions are made. Discovery
            produces the what and why; Technical Design produces the how. Together they
            eliminate the ambiguity and assumption that derail large transformation programmes.
            KPS invests heavily in these phases because getting them right makes everything
            downstream faster and lower risk.
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="timeline">
            <div className="phase">
              <h4>Discovery</h4>
              <p>Integration mapping, journey inventory, business rule catalogue</p>
              <div className="phase-detail">
                Workshops with stakeholders across all verticals. Output: a complete
                picture of what exists, what needs to change, and what the rollout
                sequence should be.
              </div>
            </div>
            <div className="phase">
              <h4>Technical Design</h4>
              <p>Architecture blueprint, API contracts, routing strategy</p>
              <div className="phase-detail">
                Translate Discovery findings into a concrete technical plan. Define the
                component library, integration patterns, and edge routing configuration.
              </div>
            </div>
            <div className="phase">
              <h4>Build</h4>
              <p>Sprint-based delivery of vertical slices</p>
              <div className="phase-detail">
                Build and deliver migrated journeys in two-week sprints. Each sprint
                produces a deployable increment that can be validated in a staging or
                production-like environment.
              </div>
            </div>
            <div className="phase">
              <h4>Testing</h4>
              <p>Automated testing, performance benchmarking, UAT</p>
              <div className="phase-detail">
                Every vertical slice goes through automated regression testing,
                performance benchmarking against the legacy version, and user acceptance
                testing with real stakeholders.
              </div>
            </div>
            <div className="phase">
              <h4>Launch</h4>
              <p>Controlled rollout with monitoring and rollback</p>
              <div className="phase-detail">
                Route traffic to the new frontend incrementally. Monitor key metrics in
                real time. Expand traffic percentage as confidence grows. Roll back
                instantly if issues arise.
              </div>
            </div>
            <div className="phase">
              <h4>Run &amp; CI</h4>
              <p>Continuous improvement, knowledge transfer, ownership handover</p>
              <div className="phase-detail">
                Transition operational ownership to the {client.shortName} team. Establish
                continuous improvement practices, monitoring runbooks, and a backlog
                of optimisation opportunities.
              </div>
            </div>
          </div>

          <div className="callout callout--gold" style={{ marginTop: 16 }}>
            <strong>Build through to Run:</strong> The Build, Testing, Launch, and Run phases repeat for each vertical slice. This
            creates a rhythm that the team internalises over time. By the third or fourth
            slice, the process is well-understood, velocity increases, and the {client.shortName} team
            is increasingly self-sufficient. The goal is not perpetual dependency on
            KPS - it is building lasting internal capability.
          </div>
        </Reveal>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          12 / Architecture
      ═══════════════════════════════════════════════════════════ */}
      <section className="section" id="phased-architecture">
        <Reveal>
          <span className="section-label">12 / Architecture</span>
          <h2>Architecture principles that support phased delivery</h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="tech-grid">
            <div className="tech-card">
              <span className="badge">Principle</span>
              <div className="tech-card__name">Headless by design</div>
              <div className="tech-card__desc">
                Decoupling the frontend from the commerce engine means the presentation
                layer can be replaced, extended, or run in parallel without touching backend
                logic. This is the fundamental enabler of phased rollout.
              </div>
            </div>
            <div className="tech-card">
              <span className="badge">Principle</span>
              <div className="tech-card__name">Composable and modular</div>
              <div className="tech-card__desc">
                The architecture is built from independent, interchangeable components.
                Each module can be developed, tested, and deployed independently. This
                supports parallel workstreams and reduces coupling between teams.
              </div>
            </div>
            <div className="tech-card">
              <span className="badge">Principle</span>
              <div className="tech-card__name">API-first and integration-ready</div>
              <div className="tech-card__desc">
                Every capability is exposed through well-documented APIs. This makes it
                straightforward to connect new frontends, mobile apps, or third-party
                services without custom integration work for each consumer.
              </div>
            </div>
            <div className="tech-card">
              <span className="badge">Principle</span>
              <div className="tech-card__name">Ready for AI and future platforms</div>
              <div className="tech-card__desc">
                The composable architecture is inherently ready for AI-driven personalisation,
                conversational commerce, and future channel expansion. New capabilities
                plug into the existing API layer without requiring architectural changes.
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="callout">
            <strong>Every principle supports incremental change.</strong> These are not
            abstract architectural ideals - they are practical enablers of the phased
            transition strategy. Headless enables parallel frontends. Composable enables
            independent module rollout. API-first enables consistent data access across
            both frontends. Future-readiness ensures the investment compounds over time.
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="callout callout--cyan" style={{ marginTop: 16 }}>
            <strong>Key Takeaway:</strong> A headless architecture means the frontend is a standalone application that
            communicates with the commerce engine exclusively through APIs. This separation
            is what makes it possible to run two frontends simultaneously, route between
            them at the edge, and migrate journeys independently.
          </div>

          <div className="callout callout--gold" style={{ marginTop: 16 }}>
            <strong>Composable for long term:</strong> Composability means {client.shortName} is never locked into a single vendor&apos;s
            stack for every capability. Payment processing, search, content management,
            and personalisation can each be best-of-breed, connected through APIs. If a
            better option emerges, it can be swapped without rebuilding the platform.
          </div>

          <div className="callout callout--gold" style={{ marginTop: 16 }}>
            <strong>AI readiness:</strong> The composable, API-first architecture positions {client.shortName} to adopt AI-driven
            capabilities - product recommendations, dynamic pricing, conversational
            interfaces, visual search - as composable services rather than monolithic
            platform upgrades. This future-proofs the investment and ensures the platform
            evolves with the market.
          </div>
        </Reveal>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          13 / Summary
      ═══════════════════════════════════════════════════════════ */}
      <section className="section" id="phased-summary">
        <Reveal>
          <span className="section-label">13 / Summary</span>
          <h2>What this means for {client.name}</h2>
          <div className="callout callout--cyan" style={{ marginTop: 16 }}>
            <strong>Key Takeaway:</strong> The phased approach means {client.shortName} does not wait 12-18 months to see results.
            The first migrated journey delivers production data on performance, user
            behaviour, and conversion impact. This data informs every subsequent decision
            and builds the business case for continued investment.
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="bullet-list">
            <li>
              <strong>Measurable improvements from the first migrated journey.</strong> Faster
              page loads, better Core Web Vitals, and improved conversion rates are visible
              within weeks, not months. Each subsequent phase compounds these gains.
            </li>
            <li>
              <strong>SAP investment is protected, not abandoned.</strong> The SAP Commerce
              backend remains the system of record throughout the transition and beyond. The
              headless frontend enhances what SAP does well while removing the limitations
              of the Accelerator storefront.
            </li>
            <li>
              <strong>Internal teams build confidence and capability incrementally.</strong> Each
              migrated journey is an opportunity for {client.shortName} developers to learn the new
              stack, own the codebase, and build the skills needed for long-term platform
              ownership.
            </li>
            <li>
              <strong>B2B and B2C are both supported from day one.</strong> The composable
              architecture handles the distinct requirements of {client.audiences.join(' and ')} within
              a single platform. Personalisation, pricing, and workflows
              can differ by segment without duplicating infrastructure.
            </li>
            <li>
              <strong>Full ownership is the end state.</strong> KPS designs the transition to
              transfer knowledge and operational capability to {client.shortName} throughout the
              engagement. The goal is a platform the {client.shortName} team can own, extend, and
              operate independently.
            </li>
          </ul>

          <div className="recommendation">
            <h3>KPS recommendation</h3>
            <p>
              We recommend beginning with a focused <strong>Discovery phase</strong> to map
              the full integration landscape, validate the rollout sequence, and select
              the right frontend technology. Discovery produces the blueprint that makes
              phased delivery predictable, low-risk, and aligned with {client.name}&apos;s
              specific business priorities. Everything starts with understanding the current
              state before making irreversible decisions.
            </p>
          </div>

          <div className="callout callout--gold" style={{ marginTop: 16 }}>
            <strong>Protecting existing investment:</strong> {client.shortName} has invested significantly in SAP Commerce. The phased approach
            preserves and extends this investment. The commerce engine, product catalogue,
            pricing rules, and business logic remain in SAP. The headless frontend simply
            provides a better window into those capabilities.
          </div>

          <div className="callout callout--gold" style={{ marginTop: 16 }}>
            <strong>Building internal capability:</strong> KPS embeds knowledge transfer into every sprint. {client.shortName} developers participate
            in architecture decisions, code reviews, and production operations from day one.
            By the end of the programme, the team has the skills and confidence to own the
            platform independently.
          </div>

          <div className="callout callout--gold" style={{ marginTop: 16 }}>
            <strong>Future-proof foundation:</strong> The composable, headless architecture is not just about solving today&apos;s
            problems. It positions {client.shortName} to adopt emerging capabilities - AI-driven
            personalisation, voice commerce, IoT integration - as composable services
            rather than platform rewrites. The headless transition is an investment in long-term
            adaptability.
          </div>
        </Reveal>
      </section>

      {/* ── Footer ── */}
      </TocLayout>

      <Footer />
    </>
  );
}
