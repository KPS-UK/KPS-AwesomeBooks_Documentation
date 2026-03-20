'use client';

import Hero from '@/components/Hero';
import StickyNav from '@/components/StickyNav';
import TocLayout from '@/components/TocLayout';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import { client, kps, platform } from '@/data/client-config';

interface RfpPageProps {
  navigateTo: (page: string) => void;
  goHome: () => void;
}

export default function RfpPage({ navigateTo, goHome }: RfpPageProps) {
  return (
    <>
      {/* ── Hero ── */}
      <Hero
        title={
          <>
            Our Response to
            <br />
            <span className="accent">{client.shortName}</span>
          </>
        }
        subtitle="Headless and Composable Web Architecture Transformation - covering architecture, discovery, delivery, capability building, and continuous improvement."
      />

      {/* ── Sticky Nav ── */}
      <StickyNav
        logoText={
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={kps.logoUrl} alt="KPS" style={{ height: 22 }} /> <span>Our Response</span>
          </>
        }
        onHome={goHome}
      />

      <TocLayout links={[
        { id: 'rfp-exec', label: 'Summary', group: 'Executive Summary', groupId: 'ch-exec' },
        { id: 'rfp-criteria', label: 'Criteria', group: 'About KPS', groupId: 'ch-about' },
        { id: 'rfp-about', label: 'About KPS' },
        { id: 'rfp-understanding', label: 'Understanding', group: 'Our Understanding', groupId: 'ch-understanding' },
        { id: 'rfp-principles', label: 'Principles' },
        { id: 'rfp-headless', label: 'Headless' },
        { id: 'rfp-technology', label: 'Technology' },
        { id: 'rfp-capability', label: 'Capability' },
        { id: 'rfp-frontend', label: 'Frontend' },
        { id: 'rfp-ai', label: 'AI readiness' },
        { id: 'rfp-crossplatform', label: 'Cross-platform' },
        { id: 'rfp-punchout', label: 'Punchout & SSO' },
        { id: 'rfp-widgets', label: 'Widgets' },
        { id: 'rfp-designsystem', label: 'Design system' },
        { id: 'rfp-data', label: 'Data' },
        { id: 'rfp-b2b', label: 'B2B & B2C' },
        { id: 'rfp-governance', label: 'Governance' },
        { id: 'rfp-commercial', label: 'Commercial' },
        { id: 'rfp-transformation', label: 'Transformation', group: 'Transformation Model', groupId: 'ch-transformation' },
        { id: 'rfp-discovery', label: 'Discovery' },
        { id: 'rfp-beyond', label: 'Beyond Discovery', group: 'Beyond Discovery', groupId: 'ch-beyond' },
        { id: 'rfp-stories', label: 'Customers', group: 'Relevant Experience', groupId: 'ch-experience' },
      ]}>

      <div className="chapter-divider" id="ch-exec">Executive Summary</div>

      {/* ===================================================================
          01 / Executive Summary
      =================================================================== */}
      <section className="section" id="rfp-exec">
        <Reveal>
          <span className="section-label">01 / Executive summary</span>
          <h2>Purpose of this proposal</h2>
          <p className="section-intro">
            This proposal sets out how KPS will partner with {client.name} to <span className="hl">define and design a future-ready headless and composable digital architecture</span>, anchored in {platform.commerceVersion}, based on modern, best-practice architectural principles and aligned with {client.shortName}&apos;s long-term IT and business ambitions.
          </p>
          <p style={{ fontSize: 16, color: 'var(--grey-light)', lineHeight: 1.7, marginBottom: 16 }}>
            The objective is not simply to replace the existing storefront, but to establish a sustainable digital foundation that enables faster change, stronger governance, and long-term evolution across channels and capabilities.
          </p>
          <div className="callout callout--cyan" style={{ marginTop: 16 }}>
            <strong>Key Takeaway:</strong> KPS is probably the most experienced digital partner for SAP Commerce headless transformation. Offering all modern headless options, we have helped dozens of businesses make the most of headless, both technically and operationally.
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--white)', marginBottom: 16, marginTop: 32 }}>Understanding your context and the need for change</h3>
          <p style={{ fontSize: 16, color: 'var(--grey-light)', lineHeight: 1.7, marginBottom: 16 }}>
            {client.name} is at a clear transition point. The end of life of the {platform.currentFrontend}, combined with increasing demands for flexibility, experimentation, AI enablement and internal capability growth, means that incremental optimisation of the current setup is no longer sufficient.
          </p>
          <p style={{ fontSize: 16, color: 'var(--grey-light)', lineHeight: 1.7, marginBottom: 16 }}>
            The challenge is to modernise the customer-facing experience while protecting the stability, security and investment already made in {platform.erp}, SAP Commerce and the wider enterprise landscape.
          </p>

          <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--white)', marginBottom: 16, marginTop: 32 }}>KPS&apos;s role and experience</h3>
          <p style={{ fontSize: 16, color: 'var(--grey-light)', lineHeight: 1.7, marginBottom: 16 }}>
            KPS brings deep and proven experience in leading SAP Commerce modernisation and headless transitions in complex B2B and B2C environments. We have guided many organisations through the shift to composable architectures while maintaining strong IT governance, integration discipline and operational control.
          </p>
          <p style={{ fontSize: 16, color: 'var(--grey-light)', lineHeight: 1.7, marginBottom: 16 }}>
            Our experience spans business consulting, enterprise architecture, SAP Commerce delivery and modern frontend engineering. This allows us to focus not only on what needs to change, but why it matters and how it can be sustained over time by you.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="two-column" style={{ marginTop: 24 }}>
            <div className="content-box">
              <h3>Discovery as the foundation</h3>
              <p>
                Our proposed engagement starts with a structured Discovery phase, including a Technical Audit. This phase establishes a shared and evidence-based understanding of the current landscape across SAP Commerce, integrations, frontend architecture, content, data flows and operational processes.
              </p>
              <p>
                Discovery will identify constraints created by the current Accelerator-based setup, surface technical debt and stability risks, and clarify where architectural change will deliver the greatest value. It also provides the basis for informed decision making on frontend technology options, including {platform.headlessFrontend} and alternative headless frameworks.
              </p>
            </div>
            <div className="content-box">
              <h3>Architecture vision and future state direction</h3>
              <p>
                Based on the outcomes of Discovery, KPS will define a clear future state architecture that is headless, composable and operable by {client.shortName} IT. Technology recommendations will be criteria-led and grounded in flexibility, performance, maintainability, integration readiness and capability building objectives.
              </p>
              <p>
                The architecture will support clean integration with {platform.erp}, {client.shortName}&apos;s {platform.middleware} layer and the existing trade portal, while enabling experimentation, CRO and AI-driven capabilities in a controlled and secure manner.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="two-column" style={{ marginTop: 24 }}>
            <div className="content-box">
              <h3>Phased transformation and risk management</h3>
              <p>
                A core principle of the proposed approach is phased evolution rather than a big bang replacement. The future state architecture will allow the existing and new frontends to run in parallel, with controlled routing used to migrate journeys incrementally.
              </p>
              <p>
                This approach reduces implementation risk, enables early value delivery, and allows performance and user impact to be validated in production before broader rollout.
              </p>
            </div>
            <div className="content-box">
              <h3>Capability development and ownership</h3>
              <p>
                Internal capability development is treated as a critical outcome of the programme. KPS will provide clear guidance on the roles, skills and operating model {client.shortName} will need to support and get the most out of a headless and composable platform.
              </p>
              <p>
                We will work alongside {client.shortName} teams to enable knowledge transfer, architectural alignment and growing autonomy, ensuring long-term ownership and independence rather than ongoing dependency on external partners. We can coach and support your team and even help with recruitment if required.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--white)', marginBottom: 16, marginTop: 32 }}>What success looks like for {client.shortName}</h3>
          <p style={{ fontSize: 16, color: 'var(--grey-light)', lineHeight: 1.7, marginBottom: 16 }}>
            Success for {client.shortName} means more than a modern storefront. It means a digital platform that enables faster change, supports experimentation and CRO, integrates cleanly with {platform.erp}, {platform.middleware} and the trade portal, is ready for AI-driven capabilities, and remains secure, observable and fully governed by IT.
          </p>
          <div className="callout callout--gold" style={{ marginTop: 16 }}>
            <strong>Our offer to you:</strong> This proposal is backed by our KPS guaranteed delivery promise, which warrants a successful outcome. Because of your strategic importance to us, you will see our investment in {client.shortName} in two places: in the commercials we propose and in the senior expertise we will be committing to the project. You will have access to our leading minds and best practitioners - people experienced in delivering customer-centric commerce at scale and always focused on pragmatic, future-ready solutions.
          </div>
        </Reveal>
      </section>

      <div className="chapter-divider" id="ch-about">About KPS</div>

      {/* ===================================================================
          02 / Evaluation Criteria
      =================================================================== */}
      <section className="section" id="rfp-criteria">
        <Reveal>
          <span className="section-label">02 / Evaluation criteria</span>
          <h2>Alignment to your evaluation criteria</h2>
          <p className="section-intro">
            How KPS&apos;s capabilities align directly with <span className="hl">{client.shortName}&apos;s evaluation criteria</span> for this engagement.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="scope-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div className="scope-card">
              <div><h4>Deep B2B eCommerce capability</h4><p>KPS brings proven experience delivering complex B2B commerce scenarios including pricing models, approvals, account hierarchies, punchout procurement, and ERP-driven processes. This ensures the proposed architecture supports real B2B complexity from the outset.</p></div>
            </div>
            <div className="scope-card">
              <div><h4>SAP Commerce modernisation expertise</h4><p>KPS has probably the most direct experience in modernising SAP Commerce environments similar to {client.shortName}&apos;s, including Accelerator end-of-life scenarios, headless transitions, and coexistence models. Recommendations are grounded in practical SAP realities rather than abstract patterns.</p></div>
            </div>
            <div className="scope-card">
              <div><h4>Criteria-led technology decision making</h4><p>KPS applies a transparent, criteria-led framework to evaluate {platform.headlessFrontend} and alternative headless options, based on flexibility, maintainability, performance, skills availability, and total cost of ownership. This avoids technology bias and supports informed decision making.</p></div>
            </div>
            <div className="scope-card">
              <div><h4>IT-led governance and ownership model</h4><p>KPS is accustomed to IT-led delivery models with strong governance requirements. Architectures are designed to respect middleware constraints, containerisation standards, and ownership rules, with all assets controlled by the client.</p></div>
            </div>
            <div className="scope-card">
              <div><h4>Enterprise-grade architecture design</h4><p>KPS designs headless and composable architectures that explicitly address governance, security, observability, integration discipline, and operational ownership. This aligns with {client.shortName}&apos;s requirement for enterprise-grade control rather than experimentation-led architectures.</p></div>
            </div>
            <div className="scope-card">
              <div><h4>Capability building and knowledge transfer</h4><p>KPS embeds capability development into every phase of the engagement, including role definition, upskilling paths, and hands-on collaboration. This ensures {client.shortName} teams grow alongside the platform.</p></div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===================================================================
          03 / About KPS
      =================================================================== */}
      <section className="section" id="rfp-about">
        <Reveal>
          <span className="section-label">03 / About KPS</span>
          <h2>The most trusted SAP CX partner</h2>
          <p className="section-intro">
            <span className="hl">20+ years</span> earning client trust. Big capacity, boutique service. Best-in-class CX specialists.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="stat-row" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            <div className="stat-box">
              <div className="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
              <div className="stat-label">2000</div>
              <div className="stat-desc">Founded</div>
            </div>
            <div className="stat-box">
              <div className="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg></div>
              <div className="stat-label">800</div>
              <div className="stat-desc">Consultants</div>
            </div>
            <div className="stat-box">
              <div className="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg></div>
              <div className="stat-label">12</div>
              <div className="stat-desc">Offices</div>
            </div>
            <div className="stat-box">
              <div className="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg></div>
              <div className="stat-label">&euro;160M</div>
              <div className="stat-desc">Revenue</div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p style={{ fontSize: 16, color: 'var(--grey-light)', lineHeight: 1.7, marginTop: 24 }}>
            KPS is a trusted CX consulting and delivery specialist with a European presence and near and offshore capability. Our purpose is to help our clients succeed and grow. We are invested in this - we are a partner, not a supplier.
          </p>
          <p style={{ fontSize: 16, color: 'var(--grey-light)', lineHeight: 1.7, marginTop: 12 }}>
            Across hundreds of projects, KPS is deeply experienced in commerce - B2C and B2B. We are one of the leaders in modern CX as a member of the advisory board for MACH. Committed to architecting solutions which follow modern principles which future-proof our clients&apos; investments.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <h3 style={{ fontSize: 18, marginTop: 32, marginBottom: 16, color: 'var(--white)' }}>Our values</h3>
          <div className="scope-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div className="scope-card">
              <div><h4>Committed to your success</h4><p>We care about your priorities and partner with you for your success.</p></div>
            </div>
            <div className="scope-card">
              <div><h4>Quality in everything</h4><p>We are trusted to do a great job with quality and value at the core.</p></div>
            </div>
            <div className="scope-card">
              <div><h4>Do the right thing</h4><p>We do the right thing because we believe it&apos;s the only way.</p></div>
            </div>
            <div className="scope-card">
              <div><h4>Stronger together</h4><p>We work together as one team, showing empathy and respect along the way.</p></div>
            </div>
          </div>
        </Reveal>
      </section>

      <div className="chapter-divider" id="ch-understanding">Our Understanding</div>

      {/* ===================================================================
          04 / Understanding
      =================================================================== */}
      <section className="section" id="rfp-understanding">
        <Reveal>
          <span className="section-label">04 / Understanding</span>
          <h2>Our understanding of your requirements</h2>
          <p className="section-intro">
            {client.name} is looking to modernise the customer experience in a way that delivers <span className="hl">immediate flexibility and performance improvements</span>, while laying a clean, future-ready foundation for experimentation, integration and innovation.
          </p>
          <p style={{ fontSize: 16, color: 'var(--grey-light)', lineHeight: 1.7, marginBottom: 16 }}>
            Based on our understanding, your requirements centre on establishing a frontend and experience architecture that is decoupled from SAP Commerce, supports both B2B and B2C scenarios, and can adapt over time as new channels, technologies and capabilities emerge.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--white)', marginBottom: 16, marginTop: 24 }}>Your requirements for this RFP</h3>
          <div className="scope-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg></div>
              <div>
                <h4>Composable headless architecture</h4>
                <p>A composable, headless storefront architecture that decouples experience from the commerce platform and enables modular evolution.</p>
              </div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg></div>
              <div>
                <h4>Ownership and operability</h4>
                <p>Clear ownership and long-term operability through defined product, UX and engineering roles, a pragmatic hybrid resourcing model, and structured upskilling and training of existing teams.</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--white)', marginBottom: 16, marginTop: 32 }}>Furthermore</h3>
          <div className="scope-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg></div>
              <div>
                <h4>UX flexibility and experimentation</h4>
                <p>Maximum flexibility to change and optimise UX without being constrained by backend release cycles, with the ability to run rapid CRO, A/B testing and experimentation as a standard operating model.</p>
              </div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg></div>
              <div>
                <h4>Punchout, SSO and AI</h4>
                <p>Clear, repeatable patterns for cXML punchout procurement, {platform.authentication} integration, and emerging AI-driven capabilities across search, recommendations and content.</p>
              </div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg></div>
              <div>
                <h4>Cross-platform and design system</h4>
                <p>Strong support for cross-platform experiences and a shared design system across the consumer site, trade portal, and mobile channels.</p>
              </div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></div>
              <div>
                <h4>Data, integration and governance</h4>
                <p>A clean, governed data, integration and content architecture that connects with existing PIM, DAM and {platform.search} tooling, while balancing speed of change with control and risk management.</p>
              </div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg></div>
              <div>
                <h4>Governance, security and control</h4>
                <p>Predictable governance, security and operational control, particularly for complex B2B scenarios including punchout, Assisted Service Mode, and trade pricing, alongside the consumer-facing retail experience.</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="callout callout--gold" style={{ marginTop: 24 }}>
            <strong>Summary:</strong> This section brings these requirements together and sets out the core architectural and delivery principles that guide our approach, focusing on flexibility with control, innovation, and a practical, phased and low-risk evolution of the experience landscape.
          </div>
        </Reveal>
      </section>

      {/* ===================================================================
          05 / Architecture Principles
      =================================================================== */}
      <section className="section" id="rfp-principles">
        <Reveal>
          <span className="section-label">05 / Architecture principles</span>
          <h2>Principles of the future-state architecture</h2>
          <p className="section-intro">
            Drawing on deep SAP Commerce expertise and extensive delivery experience, KPS applies these <span className="hl">architectural principles</span> to ensure the future state is not only well designed, but practical, scalable and operable in the real world.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="tech-grid">
            <div className="tech-card">
              <span className="badge">Principle</span>
              <div className="tech-card__name">Headless by design</div>
              <div className="tech-card__desc">
                A clean separation of frontend and backend, exposing SAP Commerce through well-structured APIs so the storefront can evolve independently and support multiple channels.
              </div>
            </div>
            <div className="tech-card">
              <span className="badge">Principle</span>
              <div className="tech-card__name">Composable and modular</div>
              <div className="tech-card__desc">
                A stack built from specialised, interchangeable services for CMS, search, personalisation and experimentation, avoiding unnecessary lock-in and allowing components to be swapped over time.
              </div>
            </div>
            <div className="tech-card">
              <span className="badge">Principle</span>
              <div className="tech-card__name">Phased evolution, not big bang</div>
              <div className="tech-card__desc">
                A rollout model that uses CDN or edge routing to move journeys gradually to the new headless frontend, validating performance in production and reducing cutover risk.
              </div>
            </div>
            <div className="tech-card">
              <span className="badge">Principle</span>
              <div className="tech-card__name">API-first and integration-ready</div>
              <div className="tech-card__desc">
                Clear, versioned APIs that align with {client.shortName}&apos;s middleware approach, simplifying integration with existing and future systems, including the trade portal and new CX services.
              </div>
            </div>
            <div className="tech-card">
              <span className="badge">Principle</span>
              <div className="tech-card__name">Performance and resilience as defaults</div>
              <div className="tech-card__desc">
                Architecture choices that optimise page speed, scalability and reliability, using edge delivery, smart caching and observability to support both B2B and B2C scenarios at peak.
              </div>
            </div>
            <div className="tech-card">
              <span className="badge">Principle</span>
              <div className="tech-card__name">Content and experience decoupling</div>
              <div className="tech-card__desc">
                A headless CMS and experience layer that separates content from commerce, enabling faster publishing, cross-channel reuse and more autonomy for marketing and product teams.
              </div>
            </div>
            <div className="tech-card">
              <span className="badge">Principle</span>
              <div className="tech-card__name">Secure, governed and compliant</div>
              <div className="tech-card__desc">
                Security, access control, monitoring and change governance built into the design from the outset, aligned with enterprise standards and regulatory requirements.
              </div>
            </div>
            <div className="tech-card">
              <span className="badge">Principle</span>
              <div className="tech-card__name">Ready for AI and future platforms</div>
              <div className="tech-card__desc">
                Patterns that make it straightforward to introduce AI-driven features, new channels and potential future commerce engines without having to rebuild the customer-facing experience.
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===================================================================
          06 / Headless Architecture
      =================================================================== */}
      <section className="section" id="rfp-headless">
        <Reveal>
          <span className="section-label">06 / Headless architecture</span>
          <h2>Headless storefront architecture</h2>
          <p className="section-intro">
            This model illustrates how KPS structures a <span className="hl">headless storefront</span> to unlock frontend agility while keeping SAP Commerce stable, secure and well governed.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="scope-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg></div>
              <div>
                <h4>Decoupled, channel-agnostic storefront</h4>
                <p>A fully headless presentation layer that consumes APIs rather than relying on platform templates, enabling rapid iteration across web, mobile and future channels.</p>
              </div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg></div>
              <div>
                <h4>Backend-for-Frontend (BFF) layer</h4>
                <p>A dedicated BFF sits between the frontend and SAP Commerce, shaping and optimising API responses for each user journey. This reduces complexity in the frontend, improves performance, and ensures consistent integration patterns.</p>
              </div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg></div>
              <div>
                <h4>Refined SAP Commerce OCC layer</h4>
                <p>The SAP Commerce OCC APIs are extended and customised where necessary to provide clean, frontend-ready endpoints. This includes normalising responses, consolidating multiple calls, and exposing data required for modern UX patterns and B2B logic.</p>
              </div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg></div>
              <div>
                <h4>Modular, composable services</h4>
                <p>Experience capabilities such as CMS, search, personalisation, experimentation and reviews are delivered as independent, API-first services. Each module can evolve independently, allowing {client.shortName} to adopt best-of-breed tools as needs mature.</p>
              </div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg></div>
              <div>
                <h4>Technology selection for the headless frontend</h4>
                <p>The architecture supports multiple modern frameworks. A decision is still required on the preferred headless technology, assessed against criteria such as design freedom, ecosystem strength, maintainability, and alignment with {client.shortName}&apos;s capability-building goals.</p>
              </div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg></div>
              <div>
                <h4>Frontend-only integrations</h4>
                <p>Where appropriate, integrations are achieved directly from the frontend or BFF layer, reducing backend development effort and allowing rapid onboarding of tools such as search, analytics, recommendations and experimentation platforms.</p>
              </div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg></div>
              <div>
                <h4>Observability and performance built in</h4>
                <p>Performance monitoring, logging and real-time telemetry are embedded within the frontend and BFF, supporting continuous optimisation, rapid issue detection and evidence-based experience improvements.</p>
              </div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg></div>
              <div>
                <h4>Secure and governed by design</h4>
                <p>Authentication, authorisation and data-access patterns are enforced at the BFF and API layers, ensuring consistent governance while enabling flexibility at the edge of the architecture.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===================================================================
          07 / Technology Decision
      =================================================================== */}
      <section className="section" id="rfp-technology">
        <Reveal>
          <span className="section-label">07 / Technology decision</span>
          <h2>Headless technology decision framework</h2>
          <p className="section-intro">
            A <span className="hl">criteria-led rather than technology-led</span> decision. {client.shortName}&apos;s choice of frontend framework should be grounded in the strategic outcomes the organisation wants to achieve, rather than any single technology.
          </p>
          <p style={{ fontSize: 16, color: 'var(--grey-light)', lineHeight: 1.7, marginBottom: 16 }}>
            The KPS frontend decision framework focuses on what matters most to your business: flexibility, long-term maintainability, internal capability building, speed of change, and alignment with the wider digital ecosystem.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--white)', marginBottom: 16, marginTop: 24 }}>Decision criteria</h3>
          <div className="scope-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg></div>
              <div><h4>Experience flexibility and design freedom</h4></div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg></div>
              <div><h4>Decoupling and long-term adaptability</h4></div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg></div>
              <div><h4>Developer ecosystem and skills availability</h4></div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg></div>
              <div><h4>Integration readiness and API maturity</h4></div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg></div>
              <div><h4>Performance and scalability expectations</h4></div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg></div>
              <div><h4>Operational independence and ownership</h4></div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg></div>
              <div><h4>Total cost of ownership</h4></div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--white)', marginBottom: 16, marginTop: 32 }}>Three options</h3>
          <div className="tech-grid tech-grid--3">
            <div className="tech-card">
              <span className="badge badge--gold">Option 1</span>
              <div className="tech-card__name">SAP Composable Storefront</div>
              <div className="tech-card__desc">
                SAP&apos;s headless, cloud-ready frontend for Commerce Cloud, offering a flexible, enterprise-grade framework built to support modular architectures and rapid experience updates.
              </div>
            </div>
            <div className="tech-card">
              <span className="badge badge--gold">Option 2</span>
              <div className="tech-card__name">Alokai, Frontend-as-a-Service</div>
              <div className="tech-card__desc">
                A modern headless frontend framework that combines its opinionated storefront with Connect for ready-made commerce/CMS integrations, Compass for in-built AI-led experiences, and Console for streamlined deployment, monitoring and configuration.
              </div>
            </div>
            <div className="tech-card">
              <span className="badge badge--gold">Option 3</span>
              <div className="tech-card__name">Custom Storefront on Vercel</div>
              <div className="tech-card__desc">
                A fully bespoke storefront built with modern tooling, offering complete freedom in experience design while running on Vercel&apos;s developer experience platform and managed infrastructure, which includes their AI-optimised cloud services.
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="callout callout--cyan" style={{ marginTop: 24 }}>
            <strong>Key Takeaway:</strong> Based on {client.shortName}&apos;s ambition for flexibility, rapid experimentation, a mobile-ready experience, AI enablement and internal capability development, the most strategic long-term path is a fully decoupled, composable frontend delivered through an iterative rollout. This approach provides the freedom to innovate now and the resilience to adapt to future technology choices without significant rework.
          </div>
          <div className="callout callout--gold" style={{ marginTop: 16 }}>
            <strong>Transparent process:</strong> This decision framework ensures the recommendation remains transparent and criteria-led, giving {client.shortName} confidence that any chosen direction is grounded in strategic fit rather than preference for a specific technology.
          </div>
        </Reveal>
      </section>

      {/* ===================================================================
          08 / Capability & Ownership
      =================================================================== */}
      <section className="section" id="rfp-capability">
        <Reveal>
          <span className="section-label">08 / Capability and ownership</span>
          <h2>Internal capability and ownership</h2>
          <p className="section-intro">
            KPS can help ensure the {client.shortName} teams can confidently <span className="hl">own, operate and evolve</span> the solution over time by clearly defining the required roles and competencies, adopting a pragmatic hybrid resourcing model, and embedding structured upskilling and knowledge transfer into delivery.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="scope-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg></div>
              <div>
                <h4>Defined profiles and competencies</h4>
                <p>Help to define the core product, UX and engineering roles required to design, build and operate a composable headless frontend. Explicit separation of responsibilities across frontend experience, integration and SAP Commerce domains. Clear ownership of code, APIs, configuration, environments and operational processes.</p>
              </div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg></div>
              <div>
                <h4>Resourcing model and ownership transition</h4>
                <p>A pragmatic hybrid staffing approach combining {client.shortName} employees with targeted use of external specialists where needed. External roles focused on acceleration, specialist expertise and early-phase delivery rather than long-term dependency. A clear and planned transition of responsibility to internal teams as capability and confidence increase.</p>
              </div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg></div>
              <div>
                <h4>Upskilling and capability enablement</h4>
                <p>Progressive knowledge transfer embedded into day-to-day delivery, not deferred to the end of the programme. Structured upskilling across build, release, support and optimisation activities, with use of familiar, well-supported technologies, patterns and tooling to reduce learning overhead.</p>
              </div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg></div>
              <div>
                <h4>Operability and long-term sustainability</h4>
                <p>Solutions designed to be understandable, supportable and extensible by internal teams. Strong emphasis on documentation, standards and repeatable ways of working with operational transparency across performance, cost, stability and change.</p>
              </div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg></div>
              <div>
                <h4>Evolution without reliance</h4>
                <p>Ability for internal teams to enhance, experiment and optimise independently. Clear path to reducing external involvement over time without loss of momentum. Confidence that the platform can evolve as business needs and capabilities change.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===================================================================
          09 / Frontend Strategy
      =================================================================== */}
      <section className="section" id="rfp-frontend">
        <Reveal>
          <span className="section-label">09 / Frontend strategy</span>
          <h2>Future frontend strategy for flexibility and experimentation</h2>
          <p className="section-intro">
            This strategy focuses on giving teams the freedom to <span className="hl">continuously improve the customer experience</span> through safe, controlled frontend change and experimentation, without impacting core commerce stability.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="scope-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg></div>
              <div>
                <h4>Maximum flexibility in UX changes</h4>
                <p>Clear separation between experience, orchestration and commerce services. Frontend-owned layouts and interaction patterns, independent of backend release cycles. Ability to evolve journeys incrementally rather than through large redesigns.</p>
              </div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg></div>
              <div>
                <h4>Rapid CRO experimentation and A/B testing</h4>
                <p>Support for experimentation frameworks at the experience layer. Targeted A/B tests at page, component or journey level. Fast deploy and rollback of experiments without backend impact. Third-party tooling (e.g. Dynamic Yield) recommended.</p>
              </div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg></div>
              <div>
                <h4>Composable UI components</h4>
                <p>Library of reusable, self-contained UI components. Components designed for independent evolution and replacement. Consistent behaviour and styling through a shared design system.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===================================================================
          10 / AI Readiness
      =================================================================== */}
      <section className="section" id="rfp-ai">
        <Reveal>
          <span className="section-label">10 / AI readiness</span>
          <h2>AI readiness across the frontend and experience layer</h2>
          <p className="section-intro">
            The objective is to make AI adoption a <span className="hl">configuration and integration exercise</span>, rather than a structural rebuild, as new capabilities become valuable to the business.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="scope-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg></div>
              <div>
                <h4>Architecture readiness for AI</h4>
                <p>Clear separation between experience, orchestration and commerce services. AI capabilities integrated as modular, replaceable services. Frontend-agnostic approach across {platform.headlessFrontend} or React. Support for AI-driven discovery patterns such as conversational interfaces and generative experiences.</p>
              </div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg></div>
              <div>
                <h4>AI-enabled use cases</h4>
                <p>AI search and discovery including semantic search and vector search. Recommendations, ranking and merchandising optimisation. Personalisation, next best action and dynamic content. Automation using AI agents and workflow orchestration. Generative experiences, summarisation and content enrichment. GEO and AI-assisted optimisation of content for generative search engines.</p>
              </div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg></div>
              <div>
                <h4>Integration and experimentation</h4>
                <p>API and event-driven integration of AI services. Backend-for-frontend mediates AI orchestration and data access. Feature flags, A/B testing and controlled rollout of AI features. Ability to run multiple AI providers in parallel for comparison.</p>
              </div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg></div>
              <div>
                <h4>Governance and control</h4>
                <p>Provider independence and avoidance of vendor lock-in. Monitoring of AI outcomes, bias and performance. Alignment with data privacy, consent and security requirements.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===================================================================
          11 / Cross-Platform & BFF
      =================================================================== */}
      <section className="section" id="rfp-crossplatform">
        <Reveal>
          <span className="section-label">11 / Cross-platform and BFF</span>
          <h2>Cross-platform experiences via a backend-for-frontend and a unified API layer</h2>
          <p className="section-intro">
            By introducing a backend-for-frontend and a unified API layer, this model <span className="hl">reduces duplication, improves performance</span>, and creates a stable foundation for both web and native mobile experiences.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="scope-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg></div>
              <div>
                <h4>Cross-platform experience foundation</h4>
                <p>One set of experience capabilities powering web and mobile native. Shared composition patterns for navigation, search, basket, checkout, account, content and personalisation. Faster extension from web journeys into native app without duplicating business logic. Consistent behaviour across channels, with channel-specific presentation where it matters.</p>
              </div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg></div>
              <div>
                <h4>Backend-for-frontend layer</h4>
                <p>Introduce a BFF to decouple storefronts and mobile app from SAP Commerce and adjacent services. The BFF becomes the channel-facing contract, owning aggregation, orchestration and response shaping. Limits direct coupling to SAP Commerce OCC and reduces the impact of platform changes on frontends. Enables incremental delivery and safe change through independently deployable experience services.</p>
              </div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg></div>
              <div>
                <h4>Performance, caching and resilience</h4>
                <p>Centralised caching strategy at the BFF where appropriate. Response caching and data caching to reduce SAP Commerce load and improve peak stability. Built-in patterns for rate limiting, retries, fallbacks and circuit breakers. Observability across the whole request path, with metrics and tracing at the experience layer.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===================================================================
          12 / Punchout & SSO Integration
      =================================================================== */}
      <section className="section" id="rfp-punchout">
        <Reveal>
          <span className="section-label">12 / Punchout and SSO integration</span>
          <h2>Embedding punchout procurement and SAML SSO into the headless architecture</h2>
          <p className="section-intro">
            This model sets out how cXML punchout and {platform.authentication} can be <span className="hl">integrated cleanly</span> into the headless storefront, balancing procurement compliance, session security and long-term maintainability.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="scope-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg></div>
              <div>
                <h4>Experience consistency</h4>
                <p>Shared design system and UI guidelines applied to both the consumer storefront and trade portal. Single sign-on to ensure seamless authentication and session continuity for trade professionals. Consistent handling of errors, loading states and messaging across platforms.</p>
              </div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg></div>
              <div>
                <h4>Data and API integration</h4>
                <p>Punchout sessions and trade portal applications consume the same unified API layer as the consumer storefront where possible. Backend-for-frontend mediates access to SAP Commerce and other systems, avoiding direct tight coupling. Event-driven integration for asynchronous updates such as order status, account changes or approval workflows.</p>
              </div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg></div>
              <div>
                <h4>Performance, security and governance</h4>
                <p>Clear performance budgets for punchout and trade-specific experiences. Security controls enforced centrally, including SAML assertion handling, authorisation and data access. Governance model to decide when trade-specific customisation is appropriate versus extending the shared storefront.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===================================================================
          13 / Frontend Widgets
      =================================================================== */}
      <section className="section" id="rfp-widgets">
        <Reveal>
          <span className="section-label">13 / Frontend widgets</span>
          <h2>Frontend-only integration of plug-and-play widgets</h2>
          <p className="section-intro">
            Enable rapid enhancement of the customer experience by integrating specialist widgets <span className="hl">directly into the frontend</span>, without introducing unnecessary backend coupling.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="scope-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg></div>
              <div>
                <h4>What frontend-only integration means</h4>
                <p>Third-party widgets embedded directly into the {platform.headlessFrontend} or React application. No dependency on SAP Commerce customisation or changes to core backend flows. Frontend teams can iterate independently and at speed.</p>
              </div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg></div>
              <div>
                <h4>Typical use cases</h4>
                <p>Search and discovery widgets such as {platform.search} InstantSearch. Personalisation, recommendations, and merchandising components. Content enrichment, ratings and reviews, A/B testing, and marketing tools.</p>
              </div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg></div>
              <div>
                <h4>Integration approach</h4>
                <p>Widgets integrated as native components in {platform.headlessFrontend} or React. Encapsulated with clear boundaries and minimal coupling. Configuration-driven to enable easy tuning, replacement or removal. Lazy loaded to protect performance of core journeys.</p>
              </div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg></div>
              <div>
                <h4>Governance and lifecycle management</h4>
                <p>Clear criteria for when frontend-only integration is appropriate. Ability to swap or remove widgets without major refactoring. Monitoring of performance, errors and third-party dependency health.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===================================================================
          14 / Design System
      =================================================================== */}
      <section className="section" id="rfp-designsystem">
        <Reveal>
          <span className="section-label">14 / Design system</span>
          <h2>Design system</h2>
          <p className="section-intro">
            Establish a shared design system that aligns design, development and delivery, ensuring <span className="hl">consistent, scalable and efficient experiences</span> across web, mobile and embedded applications.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="scope-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg></div>
              <div>
                <h4>Design system foundations</h4>
                <p>Single source of truth for UI components, patterns and interaction standards. Design system created and maintained in Figma or similar, used as the primary tool for design collaboration and governance. Clear mapping between Figma components and frontend implementation.</p>
              </div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg></div>
              <div>
                <h4>Design-to-build alignment</h4>
                <p>Shared component library between design and engineering teams. Design tokens defined in Figma for colours, typography, spacing and layout. Reduced rework through clear translation of design intent into build artefacts.</p>
              </div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg></div>
              <div>
                <h4>Cross-platform consistency</h4>
                <p>Consistent look, feel and behaviour across the consumer site, trade portal and mobile applications. Support for channel-specific adaptations without breaking overall coherence. Faster extension of journeys into new channels using established Figma patterns.</p>
              </div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
              <div>
                <h4>Governance and evolution</h4>
                <p>Clear ownership of the design system and contribution model. Versioning and controlled evolution of components and patterns in Figma. Ability to evolve the experience incrementally without large-scale redesigns.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===================================================================
          15 / Data & Integration Architecture
      =================================================================== */}
      <section className="section" id="rfp-data">
        <Reveal>
          <span className="section-label">15 / Data and integration architecture</span>
          <h2>Clean data and integration architecture</h2>
          <p className="section-intro">
            Establish a clear, scalable integration and content foundation that supports change, governance and future innovation, while <span className="hl">connecting cleanly to existing PIM, DAM and {platform.search} tooling</span>.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="scope-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg></div>
              <div>
                <h4>Modern content management and experience enablement</h4>
                <p>Headless CMS to manage content independently of the commerce platform. Content reuse across channels and experiences. Separation of content authoring from frontend deployment to enable faster publishing cycles.</p>
              </div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg></div>
              <div>
                <h4>Data integration patterns</h4>
                <p>Product data flows from PIM through SAP Commerce to the frontend via the BFF. Content data flows from the headless CMS directly to the frontend. Pricing and availability resolved at runtime from SAP Commerce. Clear data ownership to prevent conflicts and duplication.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===================================================================
          16 / B2B & B2C
      =================================================================== */}
      <section className="section" id="rfp-b2b">
        <Reveal>
          <span className="section-label">16 / B2B and B2C</span>
          <h2>B2B foundations and B2C readiness</h2>
          <p className="section-intro">
            The architecture supports <span className="hl">both B2B and B2C journeys</span> on the same platform, with the trade portal as the immediate priority and the consumer site enabled progressively on the same headless foundation.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="scope-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg></div>
              <div>
                <h4>B2B foundations</h4>
                <p>Multi-level account hierarchies with role-based access, approval workflows, customer-specific pricing, contract catalogues, punchout procurement, bulk ordering, and configurable business rules driven by SAP Commerce.</p>
              </div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></svg></div>
              <div>
                <h4>Experience flexibility</h4>
                <p>Specialised UI patterns for trade professionals including account switching, budget tracking, project-based ordering, and complex product configuration. Frontend optimised for task completion, fast search, keyboard navigation, bulk actions and minimal clicks.</p>
              </div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg></div>
              <div>
                <h4>B2C readiness</h4>
                <p>The same frontend architecture, component library and design system can serve retail consumers with a different journey flow. Shared components reduce duplication while allowing each audience to have a tailored experience.</p>
              </div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg></div>
              <div>
                <h4>Single architecture, dual audience</h4>
                <p>A single composable architecture serves both B2B and B2C without duplication. Channel-specific presentation is handled at the experience layer, with shared backend, BFF and integration patterns across audiences.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===================================================================
          17 / Governance & Control
      =================================================================== */}
      <section className="section" id="rfp-governance">
        <Reveal>
          <span className="section-label">17 / Governance and control</span>
          <h2>Governance and control</h2>
          <p className="section-intro">
            Predictable governance, security and operational control, particularly for complex B2B scenarios. <span className="hl">Governance by design</span>, not as an afterthought.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="scope-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
              <div>
                <h4>Governance by design</h4>
                <p>Change management, release control and access governance embedded into the architecture and ways of working from the outset. Clear separation of responsibilities across teams and systems.</p>
              </div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg></div>
              <div>
                <h4>Predictable change</h4>
                <p>Controlled release cycles, versioned APIs, and well-defined change processes that balance speed of delivery with stability and risk management.</p>
              </div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg></div>
              <div>
                <h4>Security and compliance</h4>
                <p>Authentication, authorisation, data handling and monitoring aligned with enterprise standards and regulatory requirements. Security built into every layer of the architecture.</p>
              </div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div>
              <div>
                <h4>Risk management</h4>
                <p>Proactive identification and mitigation of technical, operational and delivery risks through structured governance processes, monitoring and escalation.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===================================================================
          18 / Commercial Predictability
      =================================================================== */}
      <section className="section" id="rfp-commercial">
        <Reveal>
          <span className="section-label">18 / Commercial predictability</span>
          <h2>Commercial predictability</h2>
          <p className="section-intro">
            A clear operating model, cost control mechanisms, and <span className="hl">sustainable evolution</span> that ensures commercial predictability across the programme lifecycle.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="scope-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg></div>
              <div>
                <h4>Operating model</h4>
                <p>Clear commercial structure aligned to delivery phases. Transparent pricing and resource allocation. Predictable costs through structured engagement models.</p>
              </div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg></div>
              <div>
                <h4>Cost control</h4>
                <p>Budget visibility at every phase. Early identification of scope changes with impact assessment. Controlled use of external specialists to optimise spend.</p>
              </div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg></div>
              <div>
                <h4>Controlled complexity</h4>
                <p>Architecture designed to manage complexity through modularity, clear contracts and separation of concerns. Each component has a defined cost and maintenance profile.</p>
              </div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg></div>
              <div>
                <h4>Sustainable evolution</h4>
                <p>Platform designed to grow and adapt without escalating costs. Progressive capability transfer reduces long-term external dependency. Clear path from initial investment through to self-sustaining operation.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <div className="chapter-divider" id="ch-transformation">KPS Transformation Model</div>

      {/* ===================================================================
          19 / KPS Transformation Model
      =================================================================== */}
      <section className="section" id="rfp-transformation">
        <Reveal>
          <span className="section-label">19 / KPS transformation model</span>
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

      {/* ===================================================================
          20 / Discovery & Design
      =================================================================== */}
      <section className="section" id="rfp-discovery">
        <Reveal>
          <span className="section-label">20 / Discovery and design</span>
          <h2>Discovery and Technical Design</h2>
          <p className="section-intro">
            A structured <span className="hl">Discovery phase</span> including a Technical Audit, establishing a shared and evidence-based understanding of the current landscape before committing to build timelines.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--white)', marginBottom: 16, marginTop: 24 }}>Technical audit overview</h3>
          <p style={{ fontSize: 16, color: 'var(--grey-light)', lineHeight: 1.7, marginBottom: 16 }}>
            The Technical Audit examines the current SAP Commerce platform, frontend, integrations, content, data flows and operational processes. It identifies constraints created by the current Accelerator-based setup, surfaces technical debt and stability risks, and clarifies where architectural change will deliver the greatest value.
          </p>
          <div className="callout callout--gold" style={{ marginTop: 16 }}>
            <strong>Prerequisites:</strong> Access to source code repositories, staging environments, analytics dashboards, and key stakeholders from business, technology, and operations teams. KPS provides a detailed checklist during kick-off.
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--white)', marginBottom: 16, marginTop: 32 }}>Workshop programme</h3>
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

        <Reveal delay={0.2}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--white)', marginBottom: 16, marginTop: 32 }}>Schedule</h3>
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

        <Reveal delay={0.25}>
          <div className="callout callout--cyan" style={{ marginTop: 24 }}>
            <strong>Deliverables:</strong> Architecture blueprint, integration inventory, data-flow mapping, business-rule catalogue, gap analysis, risk register, phased delivery roadmap, and effort estimates for Build.
          </div>
        </Reveal>
      </section>

      <div className="chapter-divider" id="ch-beyond">Looking Beyond Discovery</div>

      {/* ===================================================================
          21 / Beyond Discovery
      =================================================================== */}
      <section className="section" id="rfp-beyond">
        <Reveal>
          <span className="section-label">21 / Beyond Discovery</span>
          <h2>Looking beyond Discovery</h2>
          <p className="section-intro">
            From <span className="hl">ways of working and build team</span> through testing, iterative delivery, launch, and continuous improvement - how the programme continues after Discovery is complete.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="scope-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg></div>
              <div>
                <h4>Ways of working</h4>
                <p>Agile delivery with two-week sprints, continuous integration, and regular stakeholder demos. KPS and {client.shortName} engineers work side by side from day one, with clear governance, escalation paths and decision-making processes.</p>
              </div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg></div>
              <div>
                <h4>Build team</h4>
                <p>A dedicated, cross-functional team combining KPS specialists with {client.shortName} engineers. Hybrid staffing model that transitions progressively from KPS-led to {client.shortName}-led as capability and confidence grow.</p>
              </div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
              <div>
                <h4>Testing</h4>
                <p>Quality embedded in the delivery process. Automated unit, integration and end-to-end tests on every commit. Performance budgets enforced in CI. Accessibility checked against WCAG 2.1 AA. User acceptance testing structured around journey-based scenarios.</p>
              </div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg></div>
              <div>
                <h4>Iterative delivery</h4>
                <p>Journey-by-journey development with each sprint delivering working software. The component library and design system are built first, creating a shared foundation that accelerates development of subsequent journeys.</p>
              </div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4z"/></svg></div>
              <div>
                <h4>Launch</h4>
                <p>Progressive go-live with rollback capability, canary deployments and traffic shifting. Journey-by-journey migration with real user validation before broader rollout. Dedicated hypercare support period after each go-live phase.</p>
              </div>
            </div>
            <div className="scope-card">
              <div className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg></div>
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

      <div className="chapter-divider" id="ch-experience">Relevant Experience</div>

      {/* ===================================================================
          22 / Customer Stories
      =================================================================== */}
      <section className="section" id="rfp-stories">
        <Reveal>
          <span className="section-label">22 / Customer stories</span>
          <h2>Relevant experience</h2>
          <p className="section-intro">
            KPS has delivered <span className="hl">headless commerce transformations</span> at scale for brands across B2B, luxury retail, and high-traffic sports e-commerce.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="tech-grid tech-grid--3">
            <div className="tech-card" style={{ borderColor: 'var(--pink)' }}>
              <span className="badge badge--pink">B2B</span>
              <div className="tech-card__name">Brakes</div>
              <div className="tech-card__desc">
                UK&apos;s largest foodservice distributor. KPS delivered a headless commerce transformation on SAP Commerce Cloud, migrating from a legacy monolith to a modern, composable frontend serving thousands of professional buyers.
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 16 }}>
                <div className="mini-stat"><div className="val">50%</div><div className="lbl">Web traffic</div></div>
                <div className="mini-stat"><div className="val">42%</div><div className="lbl">Online engagement</div></div>
                <div className="mini-stat"><div className="val">35%</div><div className="lbl">Revenue uplift</div></div>
                <div className="mini-stat"><div className="val">+NPS</div><div className="lbl">Customer satisfaction</div></div>
              </div>
            </div>
            <div className="tech-card" style={{ borderColor: 'var(--gold)' }}>
              <span className="badge badge--gold">Luxury retail</span>
              <div className="tech-card__name">The White Company</div>
              <div className="tech-card__desc">
                Premium lifestyle brand. KPS modernised the digital platform with a headless frontend, improving site performance, content flexibility, and delivery pace. The new architecture enabled the team to ship features independently of backend releases.
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 8, marginTop: 16 }}>
                <div className="mini-stat"><div className="val">Faster</div><div className="lbl">Delivery pace</div></div>
              </div>
            </div>
            <div className="tech-card" style={{ borderColor: 'var(--cyan)' }}>
              <span className="badge">B2C Sports</span>
              <div className="tech-card__name">Arsenal</div>
              <div className="tech-card__desc">
                Global sports brand. KPS delivered a high-performance e-commerce platform capable of handling extreme traffic spikes on match days and kit launches. The headless architecture ensured sub-second page loads under peak demand.
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 16 }}>
                <div className="mini-stat"><div className="val">Record</div><div className="lbl">Peak sales</div></div>
                <div className="mini-stat"><div className="val">Higher</div><div className="lbl">Conversion + session</div></div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Footer ── */}
      </TocLayout>

      <Footer />
    </>
  );
}
