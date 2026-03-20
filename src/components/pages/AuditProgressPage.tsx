'use client';

import Hero from '@/components/Hero';
import StickyNav from '@/components/StickyNav';
import TocLayout from '@/components/TocLayout';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import { client, kps, platform, metrics } from '@/data/client-config';

interface AuditProgressPageProps {
  navigateTo: (page: string) => void;
  goHome: () => void;
}

export default function AuditProgressPage({ navigateTo, goHome }: AuditProgressPageProps) {
  return (
    <>
      {/* === HERO === */}
      <Hero
        title={
          <>
            Technical Audit <span className="accent">Report</span>
          </>
        }
        subtitle={`A comprehensive review of the ${client.name} SAP Commerce codebase, covering code quality, integrations, headless readiness, performance, and upgrade path.`}
      />

      {/* === STICKY NAV === */}
      <StickyNav
        logoText={
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={kps.logoUrl} alt="KPS" style={{ height: 22 }} /> <span>Technical Audit Report</span>
          </>
        }
        onHome={goHome}
      />

      <TocLayout links={[
        { id: 'ap-overview', label: 'Overview', bold: true, group: 'Overview', groupId: 'ap-overview' },
        { id: 'ap-extensions', label: 'Extensions', group: 'SAP Commerce', groupId: 'ch-ap-application' },
        { id: 'ap-integrations', label: 'Integrations' },
        { id: 'ap-type-system', label: 'Type System' },
        { id: 'ap-catalogue', label: 'Catalogue' },
        { id: 'ap-code-quality', label: 'Code Quality' },
        { id: 'ap-tests', label: 'Tests' },
        { id: 'ap-performance', label: 'Performance', bold: true, group: 'Performance & Accessibility', groupId: 'ch-ap-perf' },
        { id: 'ap-accessibility', label: 'Accessibility' },
        { id: 'ap-headless', label: 'Headless', bold: true, group: 'Headless & JDK21', groupId: 'ch-ap-headless' },
        { id: 'ap-upgrade', label: 'JDK21', bold: true },
        { id: 'ap-ccv2', label: 'CCv2', group: 'Hosting', groupId: 'ch-ap-hosting' },
        { id: 'ap-infrastructure', label: 'Infrastructure' },
        { id: 'ap-conclusion', label: 'Summary', bold: true, group: 'Conclusion', groupId: 'ch-ap-conclusion' },
      ]}>

      {/* ===================================================================
          SECTION 0 - OVERVIEW
      =================================================================== */}
      <section className="section" id="ap-overview">
        <Reveal>
          <span className="section-label">Overview</span>
          <h2>{client.name} Code &amp; Site Review</h2>
          <p className="section-intro">
            A <span className="hl">12-area technical review</span> of the {client.name} SAP Commerce platform, covering code quality, integrations, performance, headless readiness, and upgrade path.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div style={{ fontSize: 17, color: 'var(--grey-light)', lineHeight: 1.75 }}>
            <p>
              The {client.name} SAP Commerce platform is in <span className="hl">reasonable health</span>. The codebase is logically organised, the custom extensions follow a clear functional structure, and the test suite is solid with a {metrics.testPassRate} pass rate across {metrics.testCount} tests.
            </p>
            <p style={{ marginTop: 16 }}>
              There is already a <span className="hl">partial headless storefront</span> in production ({client.headlessWebsite}) backed by {metrics.occEndpoints} custom OCC API endpoints. These APIs are framework-agnostic and would serve a React/Next.js frontend equally well, giving {client.shortName} a meaningful head start on a headless transition. The main areas requiring attention are <span className="hl">outdated third-party libraries</span> ({platform.email} from 2018, {platform.payment} from 2022), some <span className="hl">legacy security patterns</span> in the REST integration layer, and several <span className="hl">high-effort items</span> for the mandatory JDK21 upgrade before August 2026.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: 24, marginBottom: 16 }}>
            <h3 style={{ fontSize: 20, color: 'var(--white)' }}>Health Scorecard</h3>
            <span style={{ fontSize: 12, color: 'var(--grey)', opacity: 0.6 }}>Click any area to jump to its section</span>
          </div>
          <div className="scorecard-grid">
            <a className="scorecard-item" href="#ap-extensions"><span className="scorecard-dot scorecard-dot--green" /><div className="scorecard-info"><strong>Extensions</strong><span>Clean architecture, deprecated extensions accelerator-related</span></div></a>
            <a className="scorecard-item" href="#ap-integrations"><span className="scorecard-dot scorecard-dot--amber" /><div className="scorecard-info"><strong>Integrations</strong><span>Mandrill (2018) and Adyen (2022) libraries outdated</span></div></a>
            <a className="scorecard-item" href="#ap-type-system"><span className="scorecard-dot scorecard-dot--green" /><div className="scorecard-info"><strong>Type System</strong><span>98% pass rate, no critical findings</span></div></a>
            <a className="scorecard-item" href="#ap-catalogue"><span className="scorecard-dot scorecard-dot--green" /><div className="scorecard-info"><strong>Catalogue</strong><span>Sensible setup, standard patterns, multi-region and multilingual</span></div></a>
            <a className="scorecard-item" href="#ap-code-quality"><span className="scorecard-dot scorecard-dot--green" /><div className="scorecard-info"><strong>Code Quality</strong><span>Well maintained, {metrics.securityVulnerabilities} security issues in one file</span></div></a>
            <a className="scorecard-item" href="#ap-tests"><span className="scorecard-dot scorecard-dot--green" /><div className="scorecard-info"><strong>Tests</strong><span>{metrics.testPassRate} pass rate, {metrics.testFileCount} test files, {metrics.testCoverage} coverage</span></div></a>
            <a className="scorecard-item" href="#ap-performance"><span className="scorecard-dot scorecard-dot--red" /><div className="scorecard-info"><strong>Performance</strong><span>Mobile {metrics.mobileLighthouse}/100, thread pool saturation, cache invalidation storms</span></div></a>
            <a className="scorecard-item" href="#ap-accessibility"><span className="scorecard-dot scorecard-dot--amber" /><div className="scorecard-info"><strong>Accessibility</strong><span>72-74/100, falls short of WCAG 2.1 AA</span></div></a>
            <a className="scorecard-item" href="#ap-headless"><span className="scorecard-dot scorecard-dot--green" /><div className="scorecard-info"><strong>Headless Readiness</strong><span>{metrics.occEndpoints} OCC endpoints, working checkout, gaps identified</span></div></a>
            <a className="scorecard-item" href="#ap-upgrade"><span className="scorecard-dot scorecard-dot--red" /><div className="scorecard-info"><strong>JDK21</strong><span>Mandatory by August 2026, blocking issues unresolved</span></div></a>
            <a className="scorecard-item" href="#ap-ccv2"><span className="scorecard-dot scorecard-dot--green" /><div className="scorecard-info"><strong>CCv2</strong><span>Standard SAP behaviour, no core customisations</span></div></a>
            <a className="scorecard-item" href="#ap-infrastructure"><span className="scorecard-dot scorecard-dot--amber" /><div className="scorecard-info"><strong>Infrastructure</strong><span>Missing monitors, unindexed log fields</span></div></a>
          </div>
        </Reveal>

      </section>


      <div className="chapter-divider" id="ch-ap-application">SAP Commerce</div>

      {/* ===================================================================
          SECTION 1 - EXTENSIONS
      =================================================================== */}
      <section className="section" id="ap-extensions">
        <Reveal>
          <span className="section-label">01 / Extensions</span>
          <h2>Extensions</h2>
          <p className="section-intro">
            An overview of both <span className="hl">deprecated</span> and <span className="hl">custom extensions</span> in the current codebase.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="callout callout--pink" style={{ marginTop: 16 }}>
            <strong>Accelerator Storefront Deprecation:</strong> The accelerator storefront and addon framework has been deprecated and will be <a href="https://help.sap.com/docs/SAP_COMMERCE_CLOUD_PUBLIC_CLOUD/7e47d40a176d48ba914b50957d003804/1f1c6885781a4267a99c5d619d1f1edd.html?locale=en-US" target="_blank" rel="noopener noreferrer">dereleased in September 2027</a>. It will still be possible to download and add these extensions to source control, but they will no longer be supported by SAP and may need updating for the planned September 2028 Java framework update. The <code>mhgssoaddon</code> extension, whilst not a SAP extension, is dependent on the <code>addonsupport</code> extension.
          </div>
          <div className="callout callout--cyan" style={{ marginTop: 16 }}>
            <strong>Key Takeaway:</strong> The foundation is solid. The clear grouping of custom extensions into functional areas indicates good architectural discipline. The deprecated extensions are all tied to the accelerator storefront and will naturally retire as part of a move to headless.
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <h3 style={{ fontSize: 20, marginBottom: 16, color: 'var(--white)' }}>Deprecated Extensions</h3>
          <p style={{ fontSize: 16, color: 'var(--grey-light)', marginBottom: 16, lineHeight: 1.65 }}>
            The only deprecated extensions are related to the accelerator storefront. All will naturally retire as part of a move to headless.
          </p>

          <div className="deprecated-grid">
            <div className="deprecated-item">
              <code>acceleratorstorefrontcommons</code>
              <span>Shared accelerator storefront utilities and components</span>
            </div>
            <div className="deprecated-item">
              <code>addonsupport</code>
              <span>Addon framework for storefront extensions</span>
            </div>
            <div className="deprecated-item">
              <code>smarteditaddon</code>
              <span>SmartEdit CMS editing integration</span>
            </div>
            <div className="deprecated-item">
              <code>assistedservicestorefront</code>
              <span>ASM storefront integration</span>
            </div>
            <div className="deprecated-item">
              <code>b2bacceleratoraddon</code>
              <span>B2B-specific accelerator storefront features</span>
            </div>
            <div className="deprecated-item">
              <code>customersupportbackoffice</code>
              <span>Customer support backoffice addon</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <h3 style={{ fontSize: 20, marginBottom: 16, marginTop: 40, color: 'var(--white)' }}>Custom Extensions</h3>
          <p style={{ fontSize: 16, color: 'var(--grey-light)', marginBottom: 16, lineHeight: 1.65 }}>
            The custom folder is well organised into 12 functional groups:
          </p>

          <div className="scope-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
            <div className="scope-card">
              <span className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg></span>
              <div><h4>mhgcommerce</h4><p>Core commerce logic (Accelerator + OCC)</p></div>
            </div>
            <div className="scope-card">
              <span className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0114.08 0"/><path d="M1.42 9a16 16 0 0121.16 0"/><path d="M8.53 16.11a6 6 0 016.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg></span>
              <div><h4>mhgintegration</h4><p>Hotfolder inbound and SAP CPI outbound</p></div>
            </div>
            <div className="scope-card">
              <span className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg></span>
              <div><h4>mhgpayment</h4><p>Adyen payment gateway customisation</p></div>
            </div>
            <div className="scope-card">
              <span className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></span>
              <div><h4>mhgsearch</h4><p>Algolia search integration and indexing</p></div>
            </div>
            <div className="scope-card">
              <span className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg></span>
              <div><h4>mhgfulfilment</h4><p>Order management and warehouse routing</p></div>
            </div>
            <div className="scope-card">
              <span className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></span>
              <div><h4>mhgpromotions</h4><p>Custom promotion rules and discount engine</p></div>
            </div>
            <div className="scope-card">
              <span className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg></span>
              <div><h4>mhgpunchout</h4><p>B2B cXML punchout protocol support</p></div>
            </div>
            <div className="scope-card">
              <span className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg></span>
              <div><h4>mhgsso</h4><p>SAML SSO authentication addon</p></div>
            </div>
            <div className="scope-card">
              <span className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg></span>
              <div><h4>mhgcontent</h4><p>CMS components and page templates</p></div>
            </div>
            <div className="scope-card">
              <span className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg></span>
              <div><h4>mhgdataload</h4><p>ImpEx scripts and data migration tooling</p></div>
            </div>
            <div className="scope-card">
              <span className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></span>
              <div><h4>mhgreporting</h4><p>Custom reporting and analytics hooks</p></div>
            </div>
            <div className="scope-card">
              <span className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg></span>
              <div><h4>mhgapi</h4><p>Custom OCC REST API extensions</p></div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===================================================================
          SECTION 2 - 3RD PARTY INTEGRATIONS
      =================================================================== */}
      <section className="section" id="ap-integrations">
        <Reveal>
          <span className="section-label">02 / Integrations</span>
          <h2>3rd Party Integrations</h2>
          <p className="section-intro">
            A catalogue of all <span className="hl">external integration points</span> discovered in the codebase.
          </p>
          <div className="callout callout--pink" style={{ marginTop: 16 }}>
            <strong>Risk:</strong> The Mandrill integration is using an unsupported library from 2018. This should be flagged for replacement regardless of the migration timeline.
          </div>
          <div className="callout callout--cyan" style={{ marginTop: 16 }}>
            <strong>Key Takeaway:</strong> With the extension structure confirmed as clean, the next question is what the platform connects to. Each integration needs a decision: reuse the existing connector, rebuild it, or replace it with a modern alternative. The Mandrill and Adyen libraries are the most urgent as they use outdated dependencies.
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="scope-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div className="scope-card">
              <span className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg></span>
              <div>
                <h4>SAP CPI</h4>
                <p>S/4HANA pricing, availability, order simulation and orders.</p>
              </div>
            </div>
            <div className="scope-card">
              <span className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg></span>
              <div>
                <h4>SAML</h4>
                <p>SAP IDP (storefront only).</p>
              </div>
            </div>
            <div className="scope-card">
              <span className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></span>
              <div>
                <h4>Mandrill</h4>
                <p>Mail - MailChimp addon for transactional email. Using an unsupported library from 2018.</p>
              </div>
            </div>
            <div className="scope-card">
              <span className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg></span>
              <div>
                <h4>S/4HANA</h4>
                <p>SAP backend system integration via IDoc.</p>
              </div>
            </div>
            <div className="scope-card">
              <span className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></span>
              <div>
                <h4>Dynatrace</h4>
                <p>Application monitoring and observability.</p>
              </div>
            </div>
            <div className="scope-card">
              <span className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg></span>
              <div>
                <h4>Adyen</h4>
                <p>Payments. Custom extension using Adyen lib from 2022.</p>
              </div>
            </div>
            <div className="scope-card">
              <span className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg></span>
              <div>
                <h4>SAP CRM</h4>
                <p>Customer data management and segmentation sync via OData.</p>
              </div>
            </div>
            <div className="scope-card">
              <span className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/></svg></span>
              <div>
                <h4>Warehouse API</h4>
                <p>Real-time stock levels and dispatch updates via REST.</p>
              </div>
            </div>
            <div className="scope-card">
              <span className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></span>
              <div>
                <h4>Storyblok</h4>
                <p>Headless CMS content for the trade portal.</p>
              </div>
            </div>
            <div className="scope-card">
              <span className="scope-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></span>
              <div>
                <h4>Algolia</h4>
                <p>Product search and faceted navigation.</p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="callout callout--gold" style={{ marginTop: 16 }}>
            <strong>Observation:</strong> No headless CMS integration exists for the main consumer site. Any CMS integration for the new frontend would be net-new work, connecting through a BFF (Backend-for-Frontend) layer rather than the SAP Commerce backend directly.
          </div>
        </Reveal>
      </section>

      {/* ===================================================================
          SECTION 3 - TYPE SYSTEM VALIDATION
      =================================================================== */}
      <section className="section" id="ap-type-system">
        <Reveal>
          <span className="section-label">03 / Type System</span>
          <h2>Type System Validation</h2>
          <p className="section-intro">
            Using the TSV tool supplied by SAP we ran the type system definitions in <span className="hl">items.xml</span> files through a set of <span className="hl">1,987</span> validation rules across all custom extensions.
          </p>
          <div className="callout callout--cyan" style={{ marginTop: 16 }}>
            <strong>Key Takeaway:</strong> Beneath the extensions and integrations, the data model is equally healthy. No critical findings that would block or complicate a headless transition. The false positives at High and Medium levels are a positive indicator of a well-structured type system.
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="bullet-list">
            <li><strong>1,946 rules passed</strong> (98%) confirming the data model is well structured.</li>
            <li><strong>112 rules were not applicable</strong> to the extensions being scanned.</li>
            <li>Of the <strong>29 failures</strong>, 13 are false positives (abstract types / dynamic attributes), leaving 16 genuine findings, none of which are critical.</li>
          </ul>

          <div className="tsv-summary" style={{ display: 'flex', gap: 16, marginTop: 20, marginBottom: 24, flexWrap: 'wrap' }}>
            <div className="tsv-summary-card" style={{ borderColor: 'rgba(102,187,106,0.3)' }}>
              <span className="tsv-summary-count" style={{ color: '#66bb6a' }}>1,946</span>
              <span className="tsv-summary-label">Passed</span>
              <span className="tsv-summary-note">98% pass rate</span>
            </div>
            <div className="tsv-summary-card tsv-summary-card--med">
              <span className="tsv-summary-count">2</span>
              <span className="tsv-summary-label">Medium</span>
              <span className="tsv-summary-note">Worth reviewing</span>
            </div>
            <div className="tsv-summary-card tsv-summary-card--low">
              <span className="tsv-summary-count">14</span>
              <span className="tsv-summary-label">Low</span>
              <span className="tsv-summary-note">Minor recommendations</span>
            </div>
            <div className="tsv-summary-card">
              <span className="tsv-summary-count" style={{ color: '#66bb6a' }}>13</span>
              <span className="tsv-summary-label">False Positives</span>
              <span className="tsv-summary-note">No action required</span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h3 style={{ fontSize: 18, marginBottom: 16, marginTop: 8, color: 'var(--white)' }}>Medium Priority</h3>
          <div className="tsv-finding">
            <div className="tsv-finding__header">
              <span className="audit-severity audit-severity--medium">Medium</span>
              <strong>Boolean field cannot be optional</strong>
            </div>
            <p><code>GardenRangeComponent.featured</code> in <code>mhgcommerce-items.xml</code> (line 1482)</p>
            <p className="tsv-finding__note">Boolean attribute could be null. Call sites treat null as false, but may warrant a default value.</p>
          </div>

          <div className="tsv-finding">
            <div className="tsv-finding__header">
              <span className="audit-severity audit-severity--medium">Medium</span>
              <strong>Enum value naming convention</strong>
            </div>
            <p><code>MHGFulfilmentStatus.IN_PROGRESS</code> in <code>mhgfulfilment-items.xml</code> (line 203)</p>
            <p className="tsv-finding__note">Enum value uses underscore naming. Not critical but inconsistent with other enums in the type system.</p>
          </div>

          <h3 style={{ fontSize: 18, marginBottom: 16, marginTop: 32, color: 'var(--white)' }}>Low Priority</h3>

          <div className="tsv-finding">
            <div className="tsv-finding__header">
              <span className="audit-severity audit-severity--low">Low</span>
              <strong>Field name must start with lowercase letter</strong>
            </div>
            <p><code>Product.EAN13</code> in <code>mhgcommerce-items.xml</code> (line 527)</p>
            <p className="tsv-finding__note">The <code>EAN13</code> attribute is a standard barcode reference so the uppercase name is intentional.</p>
          </div>

          <div className="tsv-finding">
            <div className="tsv-finding__header">
              <span className="audit-severity audit-severity--low">Low</span>
              <strong>Ordering of relation should be avoided</strong>
            </div>
            <p>6 relations in <code>mhgcommerce-items.xml</code> use explicit ordering:</p>
            <ul className="tsv-element-list">
              <li><code>Product2InstallationGuideRelation.guides</code></li>
              <li><code>Category2FinishRelation.finishes</code></li>
              <li><code>RoomScene2ProductRelation.sceneProducts</code></li>
              <li><code>LightingGroup2FixtureRelation.fixtures</code></li>
              <li><code>CollectionPage2BannerRelation.bannerComponents</code></li>
              <li><code>DesignBoard2ItemRelation.boardItems</code></li>
            </ul>
            <p className="tsv-finding__note">Ordered relations add overhead. May be intentional where display order matters.</p>
          </div>

          <div className="tsv-finding">
            <div className="tsv-finding__header">
              <span className="audit-severity audit-severity--low">Low</span>
              <strong>Lists in relation should be avoided</strong>
            </div>
            <p>7 relations across <code>mhgcommerce-items.xml</code> and <code>mhgsearch-items.xml</code> use <code>list</code> instead of <code>set</code>:</p>
            <ul className="tsv-element-list">
              <li><code>SolrFacetSearchConfig2AlgoliaIndex.algoliaIndexes</code></li>
              <li><code>Customer2ConsentRelation.consents</code></li>
              <li><code>Product2InstallationGuideRelation.guides</code></li>
              <li><code>Category2FinishRelation.finishes</code></li>
              <li><code>PaymentModes2BaseStoreRelation.paymentModes</code></li>
              <li><code>CollectionPage2BannerRelation.bannerComponents</code></li>
              <li><code>DesignBoard2ItemRelation.boardItems</code></li>
            </ul>
            <p className="tsv-finding__note">Could warrant review but may have valid ordering requirements.</p>
          </div>

          <h3 style={{ fontSize: 18, marginBottom: 16, marginTop: 40, color: 'var(--grey)' }}>False Positives</h3>
          <p style={{ fontSize: 14, color: 'var(--grey)', marginBottom: 16, lineHeight: 1.5 }}>
            The following findings were flagged by the TSV tool but are not genuine issues. They are included here for completeness.
          </p>

          <div className="tsv-finding tsv-finding--muted">
            <div className="tsv-finding__header">
              <span style={{ fontSize: 12, color: 'var(--grey)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>High (false positive)</span>
              <strong>Deployment table rules for abstract types</strong>
            </div>
            <p>8 types in <code>mhgcommerce-items.xml</code> flagged for deployment table issues, all of which are abstract types or extend an abstract supertype:</p>
            <ul className="tsv-element-list">
              <li><code>AbstractRoomItem</code> - Type is abstract</li>
              <li><code>CachedPriceList</code> - Supertype is abstract</li>
              <li><code>CachedPriceEntry</code> - Supertype is abstract</li>
              <li><code>CachedStockLevel</code> - Supertype is abstract</li>
              <li><code>CachedLeadTime</code> - Supertype is abstract</li>
              <li><code>CachedShippingEstimate</code> - Supertype is abstract</li>
              <li><code>CachedDesignBoardData</code> - Supertype is abstract</li>
              <li><code>CachedWarehouseAllocation</code> - Supertype is abstract</li>
            </ul>
          </div>

          <div className="tsv-finding tsv-finding--muted">
            <div className="tsv-finding__header">
              <span style={{ fontSize: 12, color: 'var(--grey)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Medium (false positive)</span>
              <strong>Immutable field must have initial value</strong>
            </div>
            <p>5 dynamic attributes in <code>mhgcommerce-items.xml</code> flagged incorrectly:</p>
            <ul className="tsv-element-list">
              <li><code>Item.composedTypeAttribute</code> - Dynamic attribute</li>
              <li><code>MHGChannelRestriction.description</code> - Dynamic attribute</li>
              <li><code>MHGPromotionEngine.active</code> - Dynamic attribute</li>
              <li><code>CMSNavigationEntry.linkItem</code> - Dynamic attribute</li>
              <li><code>MHGProductRange.displayName</code> - Dynamic attribute</li>
            </ul>
          </div>
        </Reveal>
      </section>

      {/* ===================================================================
          SECTION 4 - CATALOGUE STRUCTURE
      =================================================================== */}
      <section className="section" id="ap-catalogue">
        <Reveal>
          <span className="section-label">04 / Catalogue</span>
          <h2>Catalogue Structure</h2>
          <p className="section-intro">
            Product catalogues, content catalogues, classification systems, and <span className="hl">multi-region configuration</span>.
          </p>
          <div className="callout callout--cyan" style={{ marginTop: 16 }}>
            <strong>Key Takeaway:</strong> The catalogue setup follows standard SAP Commerce patterns and is well structured for a multi-region, B2B/B2C operation. Product, content, and classification catalogues are clearly separated by region with proper staged/online versioning throughout.
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="callout callout--gold" style={{ marginTop: 16 }}>
            <strong>Observation:</strong> This assessment is based on the staging database and source code configuration. Backoffice access was not available during the audit, so a deeper review of category hierarchies, product data quality, and catalogue sync performance should be included in the Discovery phase.
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <h3 style={{ marginTop: 32 }}>Product catalogues</h3>
          <p>Two product catalogues serve distinct channels:</p>
          <div className="stat-row" style={{ marginTop: 16 }}>
            <div className="stat-box"><div className="stat-value" style={{ fontSize: 20 }}>meridianProductCatalog</div><div className="stat-label">Consumer sites (UK, IE, FR)</div></div>
            <div className="stat-box"><div className="stat-value" style={{ fontSize: 20 }}>meridianTradeProductCatalog</div><div className="stat-label">Trade portal</div></div>
          </div>
          <p style={{ marginTop: 16 }}>Both product catalogues are configured with the expected Staged/Online versions and sync configuration between them.</p>
        </Reveal>

        <Reveal delay={0.2}>
          <h3 style={{ marginTop: 32 }}>Content catalogues</h3>
          <p>Content catalogues follow a layered model with a shared global catalogue and site-specific content overrides for the UK, Ireland, and France. The trade portal uses a separate global content catalogue and trade-specific content because it is designed for the SAP Composable Storefront headless framework.</p>
          <p style={{ marginTop: 12 }}>Within the country-specific sites there is also multilingual content, supporting English and French across {client.shortName}&apos;s markets.</p>
        </Reveal>

        <Reveal delay={0.25}>
          <h3 style={{ marginTop: 32 }}>Classification catalogues</h3>
          <p>Classification is handled through ETIM 9.0 for the European sites, with product-vertical-specific classification for kitchens and bathrooms. This is a clean separation that avoids cross-contamination between the different product lines.</p>
        </Reveal>
      </section>

      {/* ===================================================================
          SECTION 5 - CODE QUALITY & SECURITY
      =================================================================== */}
      <section className="section" id="ap-code-quality">
        <Reveal>
          <span className="section-label">05 / Code Quality &amp; Security</span>
          <h2>Code Quality &amp; Security</h2>
          <p className="section-intro">
            Static analysis and security-in-code review confirms the codebase is <span className="hl">well maintained</span> with no critical blockers.
          </p>
          <div className="callout callout--cyan" style={{ marginTop: 16 }}>
            <strong>Key Takeaway:</strong> Moving from structure to code quality, the picture remains positive. The {metrics.securityVulnerabilities} security vulnerabilities are all in one file and straightforward to fix. The {metrics.criticalCodeSmells} critical code smells are typical for a codebase of this age and size, and none are blocking.
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="schedule-wrap">
            <table className="schedule-table">
              <thead>
                <tr>
                  <th style={{ textAlign: 'left' }}>Category</th>
                  <th>Security</th>
                  <th>Reliability</th>
                  <th>Maintainability</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><span className="audit-severity audit-severity--blocker">Blocker</span></td>
                  <td style={{ textAlign: 'center' }}>1</td>
                  <td style={{ textAlign: 'center' }}>4</td>
                  <td style={{ textAlign: 'center' }}>0</td>
                </tr>
                <tr>
                  <td><span className="audit-severity audit-severity--high">Critical</span></td>
                  <td style={{ textAlign: 'center' }}>7</td>
                  <td style={{ textAlign: 'center' }}>10</td>
                  <td style={{ textAlign: 'center' }}>8</td>
                </tr>
                <tr>
                  <td><span className="audit-severity audit-severity--medium">Major</span></td>
                  <td style={{ textAlign: 'center' }}>6</td>
                  <td style={{ textAlign: 'center' }}>25</td>
                  <td style={{ textAlign: 'center' }}>79</td>
                </tr>
                <tr>
                  <td><span className="audit-severity audit-severity--low">Minor</span></td>
                  <td style={{ textAlign: 'center' }}>0</td>
                  <td style={{ textAlign: 'center' }}>1</td>
                  <td style={{ textAlign: 'center' }}>99</td>
                </tr>
                <tr>
                  <td><span className="audit-severity audit-severity--info">Info</span></td>
                  <td style={{ textAlign: 'center' }}>1</td>
                  <td style={{ textAlign: 'center' }}>0</td>
                  <td style={{ textAlign: 'center' }}>39</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <h3 style={{ fontSize: 18, marginBottom: 16, marginTop: 28, color: 'var(--white)' }}>Blocker &amp; Critical Findings</h3>

          <table className="audit-table" style={{ marginBottom: 24 }}>
            <thead>
              <tr>
                <th>Severity</th>
                <th>Type</th>
                <th>Count</th>
                <th>Summary</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span className="audit-severity audit-severity--blocker">Blocker</span></td>
                <td>Vulnerability</td>
                <td style={{ textAlign: 'center' }}>1</td>
                <td>Weak password hashing in <code>MiddlewareUtils</code></td>
              </tr>
              <tr>
                <td><span className="audit-severity audit-severity--blocker">Blocker</span></td>
                <td>Bug</td>
                <td style={{ textAlign: 'center' }}>4</td>
                <td>Null pointer risks in <code>DashboardPopulator</code>, <code>ExportUtils</code>, <code>FulfilmentService</code>; unclosed resource in <code>PunchoutCatalogInterceptor</code></td>
              </tr>
              <tr>
                <td><span className="audit-severity audit-severity--high">Critical</span></td>
                <td>Vulnerability</td>
                <td style={{ textAlign: 'center' }}>7</td>
                <td>Disabled certificate validation (2), hardcoded passwords (2), CSRF disabled (1), reflected XSS (1), weak hashing (1)</td>
              </tr>
              <tr>
                <td><span className="audit-severity audit-severity--high">Critical</span></td>
                <td>Bug</td>
                <td style={{ textAlign: 'center' }}>10</td>
                <td>Unclosed resources (4), static field writes from instance methods (3), swallowed InterruptedException (2), null pointer (1)</td>
              </tr>
              <tr>
                <td><span className="audit-severity audit-severity--high">Critical</span></td>
                <td>Code Smell</td>
                <td style={{ textAlign: 'center' }}>8</td>
                <td>Cognitive complexity too high (4), duplicate string literals (4)</td>
              </tr>
            </tbody>
          </table>

          <button
            className="sonar-view-all-btn"
            onClick={() => navigateTo('sonar-detail')}
          >
            View all 280 issues in detail
          </button>
        </Reveal>

        <Reveal delay={0.2}>
          <h3 style={{ fontSize: 20, marginTop: 40, marginBottom: 20, color: 'var(--white)' }}>Findings Worth Investigating</h3>

          <div className="audit-finding">
            <div className="audit-finding__header">
              <span className="audit-severity audit-severity--high">High</span>
              <h4>AUD-001: Legacy encryption in AbstractIntegrationCommand</h4>
            </div>
            <p>
              The class <code>AbstractIntegrationCommand</code> is using legacy encryption protocol and not validating the server certificate for the connection. If connecting to some legacy infrastructure this may be necessary, but looking at the SAP CPI connection it is serving a certificate signed by Globalsign so can be validated. The Warehouse API is signed by DigiCert.
            </p>
            <p>
              There isn&apos;t an obvious need for relaxing this trust chain in SSL. This file contains all {metrics.securityVulnerabilities} high-level security issues highlighted.
            </p>
          </div>

          <div className="audit-finding">
            <div className="audit-finding__header">
              <span className="audit-severity audit-severity--medium">Medium</span>
              <h4>AUD-002: Non thread-safe date formatter in MHGDateHelper</h4>
            </div>
            <p>
              There is a non thread-safe date formatter being used in the <code>MHGDateHelper</code> class that could cause invalid formatted dates in a multithreaded environment. It looks like this can be called when caching cart availability in <code>MHGCartCacheListener</code> and since this happens on user interaction with the website it is inherently multithreaded.
            </p>
          </div>

          <div className="audit-finding">
            <div className="audit-finding__header">
              <span className="audit-severity audit-severity--low">Low</span>
              <h4>AUD-003: Legacy ServerCookie class</h4>
            </div>
            <p>
              There is an attempt to work around the non-safe use of a date formatter in <code>ServerCookie</code> which itself is an odd class. It looks like a way to support older browsers that use an older version of the HTTP cookie specification (e.g. Internet Explorer 6).
            </p>
            <p>
              This looks to have been copied from a much older version of Tomcat and then modified. The file contains a comment about changes in 2017 so it is highly likely that this isn&apos;t required any more and should use the default servlet container behaviour for cookies.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <h3 style={{ fontSize: 20, marginTop: 40, marginBottom: 20, color: 'var(--white)' }}>Security in Code</h3>
          <p style={{ fontSize: 16, color: 'var(--grey-light)', lineHeight: 1.65, marginBottom: 20 }}>
            The security findings from static analysis are summarised above ({metrics.securityVulnerabilities} vulnerabilities in <code>AbstractIntegrationCommand</code>). Authentication patterns (SAML SSO, OAuth) and authorisation flows are covered in detail in the Headless Readiness section (09), where they are assessed in the context of headless readiness.
          </p>

          <div className="callout callout--pink" style={{ marginTop: 16 }}>
            <strong>Risk - API keys in source code:</strong> Production API keys for third-party services (e.g. Adyen) are stored directly in the codebase. This is a common pattern in SAP Commerce projects but does increase the risk of credential exposure. SAP Commerce Cloud supports storing sensitive properties via the Cloud Portal, keeping them out of the repository and restricting visibility. Additionally, properties can be blacklisted in HAC to prevent retrieval through the admin console. This is a low-effort improvement worth addressing early.
          </div>

          <div className="callout callout--gold" style={{ marginTop: 16 }}>
            <strong>Minor observation - SAP domain URLs:</strong> The Composable Storefront and some API calls reference SAP infrastructure domain names directly (e.g. <code style={{ fontSize: 12 }}>api.copy-meridian1-p1-public.model-t.cc.commerce.ondemand.com</code>). This is common in SAP Commerce Cloud projects and not a significant security concern, but custom domains like <code>api.meridianhomeandgarden.com</code> and <code>trade-api.meridianhomeandgarden.com</code> are already in place and could be used more consistently for a tidier setup.
          </div>

          <div className="callout callout--gold" style={{ marginTop: 16 }}>
            <strong>Observation:</strong> A dedicated penetration test or OWASP-style security assessment was not in scope for this code review. The security findings here are limited to what static analysis and code inspection can surface. A more thorough security audit can be conducted via a KPS partner, if required.
          </div>
        </Reveal>
      </section>

      {/* ===================================================================
          SECTION 6 - TESTS & COVERAGE
      =================================================================== */}
      <section className="section" id="ap-tests">
        <Reveal>
          <span className="section-label">06 / Tests</span>
          <h2>Tests &amp; Coverage</h2>
          <p className="section-intro">
            The Java test suite contains <span className="hl">{metrics.testFileCount} test files</span> across the custom extensions, plus <span className="hl">41 Angular spec files</span> in the SAP Composable Storefront.
          </p>
          <div className="callout callout--cyan" style={{ marginTop: 16 }}>
            <strong>Key Takeaway:</strong> The code quality findings are backed by a strong test suite. A {metrics.testPassRate} pass rate across {metrics.testCount} tests and {metrics.testCoverage} coverage is reasonable for SAP Commerce. The suite is entirely unit tests with no integration tests, meaning backend logic is well covered but end-to-end flows are not validated automatically.
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="stat-row" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            <div className="stat-box">
              <div className="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg></div>
              <div className="stat-label">{metrics.testCount}</div>
              <div className="stat-desc">Total tests</div>
            </div>
            <div className="stat-box">
              <div className="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
              <div className="stat-label">{metrics.testPassRate}</div>
              <div className="stat-desc">Pass rate</div>
            </div>
            <div className="stat-box">
              <div className="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg></div>
              <div className="stat-label">{metrics.testCoverage}</div>
              <div className="stat-desc">Code coverage</div>
            </div>
            <div className="stat-box">
              <div className="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
              <div className="stat-label">6 / 8</div>
              <div className="stat-desc">Extension groups contain tests</div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <h3 style={{ fontSize: 18, marginBottom: 16, color: 'var(--white)' }}>Coverage by Extension</h3>
          <div className="schedule-wrap">
            <table className="schedule-table">
              <thead>
                <tr>
                  <th style={{ textAlign: 'left' }}>Extension Group</th>
                  <th>Test Files</th>
                  <th>Source Files</th>
                  <th>Ratio</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>mhgcommerce</strong> <span style={{ color: 'var(--grey)', fontSize: 12 }}>(services, facades, OCC, storefront, core)</span></td>
                  <td style={{ textAlign: 'center' }}>268</td>
                  <td style={{ textAlign: 'center' }}>694</td>
                  <td style={{ textAlign: 'center' }}>39%</td>
                </tr>
                <tr>
                  <td><strong>mhgintegration</strong> <span style={{ color: 'var(--grey)', fontSize: 12 }}>(hotfolder, SAP CPI)</span></td>
                  <td style={{ textAlign: 'center' }}>54</td>
                  <td style={{ textAlign: 'center' }}>128</td>
                  <td style={{ textAlign: 'center' }}>42%</td>
                </tr>
                <tr>
                  <td><strong>mhgsearch</strong> <span style={{ color: 'var(--grey)', fontSize: 12 }}>(Algolia)</span></td>
                  <td style={{ textAlign: 'center' }}>28</td>
                  <td style={{ textAlign: 'center' }}>67</td>
                  <td style={{ textAlign: 'center' }}>42%</td>
                </tr>
                <tr>
                  <td><strong>mhgpayment</strong> <span style={{ color: 'var(--grey)', fontSize: 12 }}>(Adyen)</span></td>
                  <td style={{ textAlign: 'center' }}>18</td>
                  <td style={{ textAlign: 'center' }}>38</td>
                  <td style={{ textAlign: 'center' }}>47%</td>
                </tr>
                <tr>
                  <td><strong>mhgfulfilment</strong></td>
                  <td style={{ textAlign: 'center' }}>22</td>
                  <td style={{ textAlign: 'center' }}>52</td>
                  <td style={{ textAlign: 'center' }}>42%</td>
                </tr>
                <tr>
                  <td><strong>mhgpromotions</strong></td>
                  <td style={{ textAlign: 'center' }}>14</td>
                  <td style={{ textAlign: 'center' }}>29</td>
                  <td style={{ textAlign: 'center' }}>48%</td>
                </tr>
                <tr>
                  <td><strong>mhgdataload</strong></td>
                  <td style={{ textAlign: 'center', color: '#ff5252' }}>0</td>
                  <td style={{ textAlign: 'center' }}>63</td>
                  <td style={{ textAlign: 'center', color: '#ff5252' }}>0%</td>
                </tr>
                <tr>
                  <td><strong>mhgsso</strong></td>
                  <td style={{ textAlign: 'center', color: '#ff5252' }}>0</td>
                  <td style={{ textAlign: 'center' }}>22</td>
                  <td style={{ textAlign: 'center', color: '#ff5252' }}>0%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 style={{ fontSize: 18, marginBottom: 16, marginTop: 28, color: 'var(--white)' }}>SAP Composable Storefront Tests</h3>
          <p style={{ fontSize: 16, color: 'var(--grey-light)', lineHeight: 1.65 }}>
            The Angular frontend has 41 spec files using Karma and Jasmine, concentrated in cart (12), checkout (6), and product detail (5). The frontend tests are modest but cover the most critical user-facing flows.
          </p>

          <div className="callout callout--gold" style={{ marginTop: 16 }}>
            <strong>Observation:</strong> Two extensions have zero tests: <code>mhgdataload</code> (63 source files) and <code>mhgsso</code> (22 source files). The absence of integration tests means that while individual services are well tested, cross-extension flows and external system interactions are not validated automatically.
          </div>
        </Reveal>
      </section>

      <div className="chapter-divider" id="ch-ap-perf">Performance &amp; Accessibility</div>

      {/* ===================================================================
          SECTION 7 - PERFORMANCE (LIGHTHOUSE)
      =================================================================== */}
      <section className="section" id="ap-performance">
        <Reveal>
          <span className="section-label">07 / Performance</span>
          <h2>Performance</h2>
          <p className="section-intro">
            Performance analysis covering both the <span className="hl">frontend storefront</span> (Core Web Vitals via Lighthouse) and the <span className="hl">backend platform</span> ({platform.monitoring} monitoring data).
          </p>
          <div className="callout callout--cyan" style={{ marginTop: 16 }}>
            <strong>Key Takeaway:</strong> The frontend is slow, particularly on mobile - typical of the Accelerator architecture. On the backend, {platform.monitoring} reveals recurring failure rate increases, thread pool saturation events, and a cache invalidation storm incident. A headless frontend would address the frontend issues structurally, while the backend issues need operational attention regardless.
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="stat-row" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            <div className="stat-box">
              <div className="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></div>
              <div className="stat-label">Performance</div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 8 }}>
                <div><span style={{ color: '#ff5252', fontWeight: 700, fontSize: 22 }}>{metrics.mobileLighthouse}</span><div className="stat-desc">Mobile</div></div>
                <div><span style={{ color: '#ffab40', fontWeight: 700, fontSize: 22 }}>{metrics.desktopLighthouse}</span><div className="stat-desc">Desktop</div></div>
              </div>
            </div>
            <div className="stat-box">
              <div className="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg></div>
              <div className="stat-label">Accessibility</div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 8 }}>
                <div><span style={{ color: '#ffab40', fontWeight: 700, fontSize: 22 }}>74</span><div className="stat-desc">Mobile</div></div>
                <div><span style={{ color: '#ffab40', fontWeight: 700, fontSize: 22 }}>72</span><div className="stat-desc">Desktop</div></div>
              </div>
            </div>
            <div className="stat-box">
              <div className="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
              <div className="stat-label">Best Practices</div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 8 }}>
                <div><span style={{ color: '#ffab40', fontWeight: 700, fontSize: 22 }}>74</span><div className="stat-desc">Mobile</div></div>
                <div><span style={{ color: '#ffab40', fontWeight: 700, fontSize: 22 }}>74</span><div className="stat-desc">Desktop</div></div>
              </div>
            </div>
            <div className="stat-box">
              <div className="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></div>
              <div className="stat-label">SEO</div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 8 }}>
                <div><span style={{ color: '#66bb6a', fontWeight: 700, fontSize: 22 }}>92</span><div className="stat-desc">Mobile</div></div>
                <div><span style={{ color: '#66bb6a', fontWeight: 700, fontSize: 22 }}>92</span><div className="stat-desc">Desktop</div></div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <h3 style={{ fontSize: 22, marginBottom: 24, marginTop: 8, color: 'var(--cyan)', fontWeight: 700 }}>Frontend (Core Web Vitals)</h3>
          <h3 style={{ fontSize: 20, marginBottom: 16, marginTop: 0, color: 'var(--white)' }}>Lighthouse Scores &amp; Core Web Vitals</h3>

          <div className="schedule-wrap">
            <table className="schedule-table">
              <thead>
                <tr>
                  <th style={{ textAlign: 'left' }}>Metric</th>
                  <th>Mobile</th>
                  <th>Desktop</th>
                  <th style={{ textAlign: 'left' }}>Assessment</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>First Contentful Paint</strong></td>
                  <td style={{ textAlign: 'center' }}><span style={{ color: '#ffab40' }}>4.1s</span></td>
                  <td style={{ textAlign: 'center' }}><span style={{ color: '#66bb6a' }}>1.2s</span></td>
                  <td>Mobile FCP is slow but desktop is acceptable</td>
                </tr>
                <tr>
                  <td><strong>Largest Contentful Paint</strong></td>
                  <td style={{ textAlign: 'center' }}><span style={{ color: '#ff5252' }}>{metrics.mobileLcp}</span></td>
                  <td style={{ textAlign: 'center' }}><span style={{ color: '#ff5252' }}>{metrics.desktopLcp}</span></td>
                  <td>Critical. Target is under 2.5s. Poor on both form factors</td>
                </tr>
                <tr>
                  <td><strong>Cumulative Layout Shift</strong></td>
                  <td style={{ textAlign: 'center' }}><span style={{ color: '#ff5252' }}>{metrics.cls}</span></td>
                  <td style={{ textAlign: 'center' }}><span style={{ color: '#ffab40' }}>0.21</span></td>
                  <td>Significant layout shifts on both. Target is under 0.1</td>
                </tr>
                <tr>
                  <td><strong>Total Blocking Time</strong></td>
                  <td style={{ textAlign: 'center' }}><span style={{ color: '#ffab40' }}>720ms</span></td>
                  <td style={{ textAlign: 'center' }}><span style={{ color: '#66bb6a' }}>40ms</span></td>
                  <td>Mobile thread blocked for 720ms. Desktop is acceptable</td>
                </tr>
                <tr>
                  <td><strong>Speed Index</strong></td>
                  <td style={{ textAlign: 'center' }}><span style={{ color: '#ff5252' }}>14.6s</span></td>
                  <td style={{ textAlign: 'center' }}><span style={{ color: '#ffab40' }}>2.8s</span></td>
                  <td>Desktop is reasonable. Mobile is very slow</td>
                </tr>
                <tr>
                  <td><strong>Time to Interactive</strong></td>
                  <td style={{ textAlign: 'center' }}><span style={{ color: '#ff5252' }}>28.2s</span></td>
                  <td style={{ textAlign: 'center' }}><span style={{ color: '#ff5252' }}>5.8s</span></td>
                  <td>Both poor. Page takes too long to become usable</td>
                </tr>
                <tr>
                  <td><strong>Page Weight</strong></td>
                  <td style={{ textAlign: 'center' }}>6.2 MB</td>
                  <td style={{ textAlign: 'center' }}>8.1 MB</td>
                  <td>Very heavy. {metrics.unusedJs} unused JavaScript identified</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <h3 style={{ fontSize: 20, marginBottom: 16, marginTop: 32, color: 'var(--white)' }}>Key Performance Issues</h3>

          <div className="audit-finding">
            <div className="audit-finding__header">
              <span className="audit-severity audit-severity--high">Critical</span>
              <h4>AUD-004: Largest Contentful Paint</h4>
            </div>
            <p>
              LCP of {metrics.mobileLcp} on mobile and {metrics.desktopLcp} on desktop is well above the 2.5s target. This is the single biggest factor dragging down the performance score. The main content takes far too long to render, likely due to render-blocking resources and unoptimised images.
            </p>
          </div>

          <div className="audit-finding">
            <div className="audit-finding__header">
              <span className="audit-severity audit-severity--high">High</span>
              <h4>AUD-005: Layout instability (CLS)</h4>
            </div>
            <p>
              Five layout shifts detected with a CLS of {metrics.cls} on mobile (target: under 0.1). Elements are moving after the initial paint, likely due to images without explicit dimensions, dynamically injected content, or web fonts loading.
            </p>
          </div>

          <div className="audit-finding">
            <div className="audit-finding__header">
              <span className="audit-severity audit-severity--medium">Medium</span>
              <h4>AUD-006: Unused JavaScript and CSS</h4>
            </div>
            <p>
              {metrics.unusedJs} of unused JavaScript and {metrics.unusedCss} of unused CSS identified. Removing these could save approximately 2.5 seconds on mobile. This is typical of monolithic accelerator storefront bundles.
            </p>
          </div>

          <div className="callout callout--gold" style={{ marginTop: 24 }}>
            <strong>Context:</strong> These performance scores are from a Lighthouse lab test (simulated throttled 4G for mobile). Real-user metrics may differ, but the underlying issues (large page weight, layout shifts, slow LCP) will affect all users. A headless frontend would address many of these issues structurally.
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <h3 style={{ fontSize: 22, marginBottom: 24, marginTop: 40, color: 'var(--cyan)', fontWeight: 700 }}>Backend ({platform.monitoring})</h3>
          <p style={{ fontSize: 16, color: 'var(--grey-light)', lineHeight: 1.65, marginBottom: 20 }}>
            {platform.monitoring} monitoring data from the production environment reveals several recurring issues that warrant attention. The problems dashboard highlights failure rate increases, response time degradation, and thread pool saturation events.
          </p>

          <h3 style={{ fontSize: 20, marginBottom: 16, marginTop: 0, color: 'var(--white)' }}>Problems Dashboard</h3>
          <div className="schedule-wrap">
            <table className="schedule-table">
              <thead>
                <tr>
                  <th style={{ textAlign: 'left' }}>Problem Type</th>
                  <th style={{ textAlign: 'left' }}>Affected Service</th>
                  <th style={{ textAlign: 'left' }}>Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Failure rate increase</strong></td>
                  <td><code>integration.meridianhomeandgarden.com</code></td>
                  <td>Recurring spikes in failure rate on pricing-related requests</td>
                </tr>
                <tr>
                  <td><strong>Failure rate increase</strong></td>
                  <td><code>algolia.net</code></td>
                  <td>Intermittent failures on search indexing/query calls</td>
                </tr>
                <tr>
                  <td><strong>Response time degradation</strong></td>
                  <td><code>integration.meridianhomeandgarden.com</code></td>
                  <td>Availability-related endpoints showing increased latency</td>
                </tr>
                <tr>
                  <td><strong>Thread exhaustion</strong></td>
                  <td>Tomcat</td>
                  <td>Thread pool saturation events in the application server</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="audit-finding" style={{ marginTop: 24 }}>
            <div className="audit-finding__header">
              <span className="audit-severity audit-severity--high">Critical</span>
              <h4>AUD-026: Cache invalidation storm and thread exhaustion</h4>
            </div>
            <p>
              On 5 March, a <strong>9-hour incident</strong> was caused by a cache invalidation storm cascading into thread pool exhaustion. The error log shows: <code style={{ fontSize: 13 }}>Timeout waiting for idle object, borrowMaxWaitDuration=PT9.99999981S</code>. This indicates the application ran out of available database connections for an extended period, likely degrading or blocking all transactional operations.
            </p>
            <p style={{ marginTop: 8 }}>
              This type of incident typically points to long-running queries, connection leaks, or insufficient pool sizing under load. It should be investigated to determine root cause and prevent recurrence.
            </p>
          </div>

          <div className="callout callout--gold" style={{ marginTop: 24 }}>
            <strong>Context:</strong> The {platform.monitoring} data shows the backend is not as stable as initial code review suggested. While the codebase itself is clean, the production environment experiences recurring integration failures and at least one significant availability incident. These operational issues should be addressed as part of any stabilisation or transition work.
          </div>
        </Reveal>
      </section>

      {/* ===================================================================
          SECTION 8 - ACCESSIBILITY
      =================================================================== */}
      <section className="section" id="ap-accessibility">
        <Reveal>
          <span className="section-label">08 / Accessibility</span>
          <h2>Accessibility</h2>
          <p className="section-intro">
            Lighthouse identified <span className="hl">7 accessibility failures</span> affecting usability for assistive technology users and mobile users.
          </p>
          <div className="callout callout--cyan" style={{ marginTop: 16 }}>
            <strong>Key Takeaway:</strong> The performance issues extend to accessibility. The site falls short of WCAG 2.1 AA compliance. Some issues (like the <code>lang</code> attribute) are quick fixes, but touch target sizing and contrast are structural and would be best addressed as part of a frontend rebuild rather than patching the existing templates.
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="schedule-wrap">
            <table className="schedule-table">
              <thead>
                <tr>
                  <th style={{ textAlign: 'left' }}>Issue</th>
                  <th>Count</th>
                  <th style={{ textAlign: 'left' }}>Impact</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Touch targets too small or too close</strong></td>
                  <td style={{ textAlign: 'center' }}>34</td>
                  <td>Users on mobile devices may struggle to tap the correct element</td>
                </tr>
                <tr>
                  <td><strong>Links without discernible name</strong></td>
                  <td style={{ textAlign: 'center' }}>8</td>
                  <td>Screen readers cannot describe where these links go</td>
                </tr>
                <tr>
                  <td><strong>Insufficient colour contrast</strong></td>
                  <td style={{ textAlign: 'center' }}>7</td>
                  <td>Text is hard to read for users with low vision</td>
                </tr>
                <tr>
                  <td><strong>Missing alt text on images</strong></td>
                  <td style={{ textAlign: 'center' }}>5</td>
                  <td>Screen readers cannot describe decorative or product images</td>
                </tr>
                <tr>
                  <td><strong>Invalid <code>lang</code> attribute</strong></td>
                  <td style={{ textAlign: 'center' }}>3</td>
                  <td>Screen readers may mispronounce content or use wrong language rules</td>
                </tr>
                <tr>
                  <td><strong>Pinch-to-zoom disabled</strong></td>
                  <td style={{ textAlign: 'center' }}>1</td>
                  <td>Users with low vision cannot zoom in to read content</td>
                </tr>
                <tr>
                  <td><strong>Button without accessible name</strong></td>
                  <td style={{ textAlign: 'center' }}>2</td>
                  <td>Screen readers cannot describe what the button does</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="callout callout--gold" style={{ marginTop: 24 }}>
            <strong>Observation:</strong> The score of 72-74 is below average for an accelerator storefront and falls short of WCAG 2.1 AA compliance. The most impactful issue is the 34 undersized touch targets, which affect all mobile users, not just those using assistive technology. The <code>lang</code> attribute issue is straightforward to fix and would improve screen reader behaviour across the entire site.
          </div>
        </Reveal>
      </section>

      <div className="chapter-divider" id="ch-ap-headless">Headless &amp; JDK21</div>

      {/* ===================================================================
          SECTION 9 - HEADLESS READINESS
      =================================================================== */}
      <section className="section" id="ap-headless">
        <Reveal>
          <span className="section-label">09 / Headless Readiness</span>
          <h2>Headless Readiness</h2>
          <p className="section-intro">
            A detailed mapping of what business functionality is already exposed via <span className="hl">OCC APIs</span> versus what is locked inside the <span className="hl">Accelerator storefront</span>.
          </p>
          <div className="callout callout--cyan" style={{ marginTop: 16 }}>
            <strong>Key Takeaway:</strong> The good news is that {client.shortName} is further along the headless journey than many SAP Commerce customers. A working headless trade portal already runs in production ({client.headlessWebsite}), and the custom OCC layer covers most core commerce operations. The headless effort would focus on filling specific gaps (Adyen payments, punchout, quoting, ASM, authentication) rather than building from scratch.
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="stat-row" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
            <div className="stat-box">
              <div className="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg></div>
              <div className="stat-label">{metrics.occEndpoints}</div>
              <div className="stat-desc">Custom OCC endpoints</div>
            </div>
            <div className="stat-box">
              <div className="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg></div>
              <div className="stat-label">10</div>
              <div className="stat-desc">OCC controllers</div>
            </div>
            <div className="stat-box">
              <div className="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div>
              <div className="stat-label">16</div>
              <div className="stat-desc">Accelerator-only functions</div>
            </div>
            <div className="stat-box">
              <div className="stat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
              <div className="stat-label">6</div>
              <div className="stat-desc">Storefront extensions</div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <h3 style={{ fontSize: 20, marginBottom: 16, color: 'var(--white)' }}>Existing OCC API Coverage</h3>
          <p style={{ fontSize: 16, color: 'var(--grey-light)', lineHeight: 1.65, marginBottom: 20 }}>
            The <code>mhgapi</code> extension already exposes significant custom functionality via 10 controllers with {metrics.occEndpoints} endpoints. <strong>New</strong> endpoints are entirely custom {client.shortName} functionality. <strong>Enhanced</strong> endpoints replace standard SAP behaviour with {client.shortName}-specific logic while keeping the same URL contract.
          </p>

          <div className="schedule-wrap">
            <table className="schedule-table">
              <thead>
                <tr>
                  <th style={{ textAlign: 'left' }}>Domain</th>
                  <th>New</th>
                  <th>Enhanced</th>
                  <th style={{ textAlign: 'left' }}>Key Capabilities</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Products</strong></td>
                  <td style={{ textAlign: 'center' }}>4</td>
                  <td style={{ textAlign: 'center' }}>4</td>
                  <td>Search, detail, barcode lookup, variants, pricing/stock (batch), room planner data</td>
                </tr>
                <tr>
                  <td><strong>Wishlists</strong></td>
                  <td style={{ textAlign: 'center' }}>8</td>
                  <td style={{ textAlign: 'center' }}>0</td>
                  <td>Full CRUD, entries management, restore to cart</td>
                </tr>
                <tr>
                  <td><strong>Design Boards</strong></td>
                  <td style={{ textAlign: 'center' }}>6</td>
                  <td style={{ textAlign: 'center' }}>0</td>
                  <td>Full CRUD, multi-board add, share via email</td>
                </tr>
                <tr>
                  <td><strong>Cart</strong></td>
                  <td style={{ textAlign: 'center' }}>4</td>
                  <td style={{ textAlign: 'center' }}>2</td>
                  <td>Multi-entry add, delivery date, click-and-collect store, availability, payment types</td>
                </tr>
                <tr>
                  <td><strong>Categories</strong></td>
                  <td style={{ textAlign: 'center' }}>1</td>
                  <td style={{ textAlign: 'center' }}>2</td>
                  <td>Category search, details with subcategories, product listing</td>
                </tr>
                <tr>
                  <td><strong>CMS</strong></td>
                  <td style={{ textAlign: 'center' }}>1</td>
                  <td style={{ textAlign: 'center' }}>1</td>
                  <td>Page data with content slots, navigation tree</td>
                </tr>
                <tr>
                  <td><strong>Checkout / Orders</strong></td>
                  <td style={{ textAlign: 'center' }}>0</td>
                  <td style={{ textAlign: 'center' }}>1</td>
                  <td>Place B2B order (custom validation). Standard SAP OCC provides delivery modes, delivery address, payment type. Working 3-step checkout on trade portal</td>
                </tr>
                <tr>
                  <td><strong>Users</strong></td>
                  <td style={{ textAlign: 'center' }}>0</td>
                  <td style={{ textAlign: 'center' }}>1</td>
                  <td>B2B user registration with custom data model</td>
                </tr>
                <tr>
                  <td><strong>Other</strong></td>
                  <td style={{ textAlign: 'center' }}>2</td>
                  <td style={{ textAlign: 'center' }}>1</td>
                  <td>Addresses (filtered by type), site config, store selection, translations</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <h3 style={{ fontSize: 20, marginBottom: 16, marginTop: 32, color: 'var(--white)' }}>Accelerator-Only Functionality (Gaps)</h3>
          <p style={{ fontSize: 16, color: 'var(--grey-light)', lineHeight: 1.65, marginBottom: 20 }}>
            The following capabilities exist <strong>only</strong> in the Accelerator storefront and have no OCC API equivalent. These would need to be built as new OCC endpoints or handled differently in a headless architecture.
          </p>

          <div className="audit-finding">
            <div className="audit-finding__header">
              <span className="audit-severity audit-severity--medium">Medium</span>
              <h4>AUD-007: Checkout flow</h4>
            </div>
            <p>
              A <strong>B2B checkout already works via OCC</strong> for the trade portal ({client.headlessWebsite}), using a custom 3-step flow: delivery mode/date, payment type/PO number, and order review. This uses a mix of standard SAP OCC endpoints (delivery modes, delivery address) and custom {client.shortName} endpoints (delivery date, click-and-collect store, availability, payment types, place order with custom validation).
            </p>
            <p style={{ marginTop: 24 }}>
              The <strong>Accelerator checkout adds</strong> functionality not yet in OCC: <strong>Adyen card payment session handling</strong> (initiate, redirect, success/failure), delivery cost calculation via AJAX, and the full payment address selection step. The headless checkout currently supports B2B account and in-store payment types but not card payments via Adyen.
            </p>
          </div>

          <div className="audit-finding">
            <div className="audit-finding__header">
              <span className="audit-severity audit-severity--blocker">Critical</span>
              <h4>AUD-008: B2B Punchout (cXML)</h4>
            </div>
            <p>
              The entire cXML punchout protocol (4 controllers) is Accelerator-only and tightly coupled to the storefront session model. Covers setup requests, session handling, cart inspection, purchase orders, and profile requests. A headless approach would need a dedicated punchout microservice or OCC extension.
            </p>
          </div>

          <div className="audit-finding">
            <div className="audit-finding__header">
              <span className="audit-severity audit-severity--high">High</span>
              <h4>AUD-009: B2B Quoting workflow</h4>
            </div>
            <p>
              Full quote lifecycle (create, edit, apply discount, submit, approve, reject, requote, checkout from quote) has zero OCC coverage. This is a significant B2B business process.
            </p>
          </div>

          <div className="audit-finding">
            <div className="audit-finding__header">
              <span className="audit-severity audit-severity--high">High</span>
              <h4>AUD-010: SAML SSO authentication</h4>
            </div>
            <p>
              SAML authentication is implemented via storefront filters (<code>MHGSamlAuthFilter</code>, <code>MHGSamlAuthenticationSuccessHandler</code>). There is no OCC equivalent. A headless frontend would need a different authentication approach (e.g. OAuth2/OIDC with the SAP IDP directly).
            </p>
          </div>

          <div className="audit-finding">
            <div className="audit-finding__header">
              <span className="audit-severity audit-severity--high">High</span>
              <h4>AUD-011: Assisted Service Mode (ASM)</h4>
            </div>
            <p>
              Full ASM lifecycle (agent login, customer emulation, cart binding, Customer 360 view) is entirely storefront session-based across 3 controllers. Zero OCC coverage.
            </p>
          </div>

          <div className="audit-finding">
            <div className="audit-finding__header">
              <span className="audit-severity audit-severity--medium">Medium</span>
              <h4>AUD-012: Cart/wishlist import and export</h4>
            </div>
            <p>
              CSV/Excel import into saved carts and wishlists, plus export to PDF/Excel with configurable options (net prices, images, spec sheets). No OCC equivalent.
            </p>
          </div>

          <div className="audit-finding">
            <div className="audit-finding__header">
              <span className="audit-severity audit-severity--medium">Medium</span>
              <h4>AUD-013: Consent management and vouchers</h4>
            </div>
            <p>
              Custom GDPR consent management (<code>MHGConsentFacade</code>) and cart voucher apply/remove are storefront-only. The trade pricing preference toggle per user is also not in OCC.
            </p>
          </div>

          <div className="audit-finding">
            <div className="audit-finding__header">
              <span className="audit-severity audit-severity--low">Low</span>
              <h4>AUD-014: Promotions, collection pages, and utilities</h4>
            </div>
            <p>
              Dedicated promotions page, collection/lookbook pages, quick order page, category directory, address validation, Algolia event tracking, and maintenance mode are all storefront-only. These are lower priority as they are either rendering-layer concerns or can be implemented client-side.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="callout callout--pink" style={{ marginTop: 24 }}>
            <strong>Phased rollout risk:</strong> The SAML SSO authentication gap has implications beyond the headless frontend itself. Any phased rollout that runs the new headless site alongside the existing Accelerator storefront will need a shared authentication strategy. The current SAML implementation is tied to the storefront session model, so a new approach (e.g. OAuth2/OIDC directly with the SAP IDP) will need to be resolved early in the project to avoid blocking the rollout.
          </div>

          <div className="callout callout--gold" style={{ marginTop: 16 }}>
            <strong>Positive indicators:</strong> The existing OCC layer is well-structured, follows SAP best practices (addonless extension pattern, Swagger/OpenAPI v3 annotations), and already covers the core commerce operations including a working B2B checkout. The trade portal ({client.headlessWebsite}) already runs a full purchase flow against these APIs in production. The main gaps for the {client.primaryWebsite} migration are Adyen card payments, B2B punchout, quoting, ASM, and SAML authentication.
          </div>

          <div className="callout callout--cyan" style={{ marginTop: 16, marginBottom: 0 }}>
            <strong>SAP Composable Storefront:</strong> The existing <code>js-storefront</code> is built on SAP Composable Storefront (Angular). A new headless frontend built with React/Next.js would not reuse this code directly, but the OCC API layer it consumes would carry over. The existing storefront could be reviewed separately if required.
          </div>
        </Reveal>
      </section>

      {/* ===================================================================
          SECTION 10 - UPGRADE READINESS
      =================================================================== */}
      <section className="section" id="ap-upgrade">
        <Reveal>
          <span className="section-label">10 / JDK21</span>
          <h2>JDK21 Upgrade Readiness</h2>
          <div className="callout callout--pink" style={{ marginTop: 16 }}>
            <strong>Deadline:</strong> The platform needs upgrading to work with JDK21 and Spring 6 by the <strong>end of August 2026</strong>. Beyond this date it will not be possible to build a new release of the platform using the unsupported versions.
          </div>
          <div className="callout callout--cyan" style={{ marginTop: 16 }}>
            <strong>Key Takeaway:</strong> Alongside the headless work, the JDK21 upgrade is mandatory and time-sensitive. The issues identified so far may be the tip of the iceberg: until the blocking items (XSD generation, OAuth, CPI libraries) are resolved, the full scope of upgrade work remains unknown. This must be factored into the project timeline as a parallel workstream.
          </div>
        </Reveal>

        <Reveal delay={0.15}>

          <p style={{ fontSize: 16, color: 'var(--grey-light)', lineHeight: 1.65, marginBottom: 24 }}>
            <strong style={{ color: 'var(--grey-light)' }}>AUD-020:</strong> The findings below represent the <span className="hl">minimum set of known issues</span> identified so far. We were able to get the project to compile under JDK21 by temporarily removing problematic code, but the application cannot start due to missing dependencies that result from those removals. Until the blocking issues listed below are resolved, it is not possible to progress further with the upgrade assessment. Each fix is likely to uncover additional items that are currently hidden behind the compilation and startup failures.
          </p>

          <div className="audit-finding-list">
            <div className="audit-finding">
              <div className="audit-finding__header">
                <span className="audit-severity audit-severity--low">Low</span>
                <h4>@Required annotation removed</h4>
              </div>
              <p>
                Switch to constructor injection. This is a straightforward refactoring task.
              </p>
            </div>

            <div className="audit-finding">
              <div className="audit-finding__header">
                <span className="audit-severity audit-severity--medium">Medium</span>
                <h4>EhCache upgraded from 2.x to 3.x</h4>
              </div>
              <p>
                Support from Spring is dropped. The <code>org.springframework.cache.ehcache</code> package is used from mhgcommerce, mhgapi, mhgfulfilment, mhgintegration.
              </p>
            </div>

            <div className="audit-finding">
              <div className="audit-finding__header">
                <span className="audit-severity audit-severity--high">High</span>
                <h4>SAP CPI library changes</h4>
              </div>
              <p>
                <code>mhgintegration</code> calls methods on SAP CPI libraries that have changed.
              </p>
            </div>

            <div className="audit-finding">
              <div className="audit-finding__header">
                <span className="audit-severity audit-severity--high">High</span>
                <h4>OAuth has changed completely</h4>
              </div>
              <p>
                There are dependencies from mhgintegration on the old OAuth libraries.
              </p>
            </div>

            <div className="audit-finding">
              <div className="audit-finding__header">
                <span className="audit-severity audit-severity--high">High</span>
                <h4>XSD-to-Java class generation</h4>
              </div>
              <p>
                The mhgintegration extension uses a library for generating Java classes from an XSD. It isn&apos;t supported any more so doesn&apos;t work with JDK21. This needs migrating to another method. Unfortunately it isn&apos;t possible to continue much further with the upgrade because the generated classes are required to compile further.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <div className="chapter-divider" id="ch-ap-hosting">Hosting</div>

      {/* ===================================================================
          SECTION 11 - CCv2 CONFIGURATION
      =================================================================== */}
      <section className="section" id="ap-ccv2">
        <Reveal>
          <span className="section-label">11 / CCv2</span>
          <h2>CCv2 Configuration</h2>
          <div className="callout callout--cyan" style={{ marginTop: 16 }}>
            <strong>Key Takeaway:</strong> On the operational side, a well-structured manifest.json and no core platform customisations are positive indicators. The platform is largely running on standard SAP Commerce behaviour, which simplifies both the JDK21 upgrade and a headless transition.
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h3 style={{ fontSize: 18, marginBottom: 14, color: 'var(--white)' }}>Source Repository</h3>
          <p style={{ fontSize: 16, color: 'var(--grey-light)', lineHeight: 1.65, marginBottom: 20 }}>
            Repository is hosted in GitHub Enterprise within the {client.shortName} organisation. Access control is managed through team-level permissions with branch protection rules on main and release branches.
          </p>

          <h3 style={{ fontSize: 18, marginBottom: 14, color: 'var(--white)' }}>manifest.json</h3>
          <p style={{ fontSize: 16, color: 'var(--grey-light)', lineHeight: 1.65, marginBottom: 20 }}>
            Well structured manifest with good separation of environment and aspect specific configuration.
          </p>

          <h3 style={{ fontSize: 18, marginBottom: 14, color: 'var(--white)' }}>ant customize</h3>
          <p style={{ fontSize: 16, color: 'var(--grey-light)', lineHeight: 1.65, marginBottom: 20 }}>
            There are no necessary customisations being made to the core platform either via config/customize or the CCv2 CUSTOMIZE mechanism. There is a MySQL database driver library in the source controlled customize folder but this is presumably legacy since it is expected to be using MsSQL.
          </p>

          <div className="callout callout--gold" style={{ marginTop: 16 }}>
            <strong>Observation:</strong> The GitHub Enterprise setup and branch protection rules are well configured. Repository access permissions should be reviewed to ensure proper access control during and after the engagement.
          </div>
        </Reveal>
      </section>

      {/* ===================================================================
          SECTION 12 - INFRASTRUCTURE
      =================================================================== */}
      <section className="section" id="ap-infrastructure">
        <Reveal>
          <span className="section-label">12 / Infrastructure</span>
          <h2>Infrastructure Observations</h2>
          <div className="callout callout--cyan" style={{ marginTop: 16 }}>
            <strong>Key Takeaway:</strong> Unindexed log fields and missing monitors are easy operational wins. The traffic data reveals the accelerator storefront ({metrics.peakTraffic} peak) carries the vast majority of traffic compared to the headless trade portal (82/hour), which is important context for sequencing a headless rollout.
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h3 style={{ fontSize: 18, marginBottom: 14, color: 'var(--white)' }}>SAP Cloud Logging</h3>
          <ul className="bullet-list">
            <li>There are <strong>21 days</strong> of indexed logs available in SAP Cloud Logging.</li>
            <li>There are some unindexed fields which means they can&apos;t be filtered by.</li>
            <li>There are no monitors and alerts configured (but this may be getting done elsewhere, e.g. {platform.monitoring}).</li>
            <li>The audit logger (<code>de.hybris.platform.audit.actions.impl.Slf4jAuditableActionHandler</code>) is very noisy and contributes significant log volume. Silencing or reducing its verbosity would improve signal-to-noise ratio and could reduce logging costs.</li>
          </ul>

          <h3 style={{ fontSize: 18, marginBottom: 14, marginTop: 28, color: 'var(--white)' }}>Solr</h3>
          <ul className="bullet-list">
            <li>The sample data configures indexes using <a href="https://help.sap.com/docs/SAP_COMMERCE_CLOUD_PUBLIC_CLOUD/aa417173fe4a4ba5a473c93eb730a417/473f6c43f15345e0a5135a2b57cc2cb4.html" target="_blank" rel="noopener noreferrer">TWO_PHASE indexing</a>, which aligns with current SAP recommendations. The source code configuration looks correct, but backoffice and/or Solr access would be needed to verify the production setup.</li>
            <li>This may only be for the backoffice index since the site index seems to be driven by {platform.search}.</li>
          </ul>

          <h3 style={{ fontSize: 18, marginBottom: 14, marginTop: 28, color: 'var(--white)' }}>Loadbalancer Log Analysis</h3>
          <ul className="bullet-list">
            <li>There isn&apos;t a lot of traffic on the trade (headless) portal. Over the past 7 days it peaked at <strong>82 unique users</strong> (by IP) per hour.</li>
            <li>Including the {client.primaryWebsite} data swamps the other results and shows up to <strong>{metrics.peakTraffic}</strong> at peak.</li>
          </ul>
        </Reveal>
      </section>

      <div className="chapter-divider" id="ch-ap-conclusion">Conclusion</div>

      {/* ===================================================================
          CONCLUSION
      =================================================================== */}
      <section className="section" id="ap-conclusion">
        <Reveal>
          <span className="section-label">Conclusion</span>
          <h2>Summary &amp; Recommendations</h2>
          <p className="section-intro">
            The {client.name} SAP Commerce platform is <span className="hl">well-built, well-tested, and well-positioned</span> for a headless transition.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div style={{ fontSize: 17, color: 'var(--grey-light)', lineHeight: 1.75 }}>
            <p>
              Across 12 audit areas, the consistent finding is that the underlying platform is in good health. The extension architecture is clean, the type system passes 98% of validation rules, the test suite has a {metrics.testPassRate} pass rate, and the custom OCC API layer already powers a working B2B checkout in production.
            </p>
            <p style={{ marginTop: 16 }}>
              The main areas requiring attention are well-defined: outdated third-party libraries ({platform.email}, {platform.payment}), legacy security patterns in the REST integration layer, and the mandatory JDK21 upgrade by August 2026. On the frontend, the Accelerator storefront&apos;s performance and accessibility limitations make a strong case for a headless approach, and the existing trade portal on {client.headlessWebsite} proves the OCC foundation works.
            </p>
            <p style={{ marginTop: 16 }}>
              The path to headless is not starting from zero. With {metrics.occEndpoints} custom OCC endpoints, a proven checkout flow, and a well-organised codebase, the effort is focused on filling specific gaps (Adyen card payments, B2B punchout, quoting, ASM, SAML authentication) rather than building an API layer from scratch.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <h3 style={{ fontSize: 20, marginBottom: 20, marginTop: 32, color: 'var(--white)' }}>Recommended Next Steps</h3>

          <div className="audit-finding">
            <div className="audit-finding__header">
              <span className="audit-severity audit-severity--blocker">Critical</span>
              <h4>AUD-020: JDK21 upgrade</h4>
            </div>
            <p>
              Begin resolving the blocking issues (XSD generation, OAuth, CPI libraries) to uncover the full scope of upgrade work. This is time-sensitive and should run as a parallel workstream.
            </p>
          </div>

          <div className="audit-finding">
            <div className="audit-finding__header">
              <span className="audit-severity audit-severity--high">High</span>
              <h4>AUD-021: Mandrill replacement</h4>
            </div>
            <p>
              The 2018 Mandrill library should be replaced regardless of the headless timeline. This is an operational risk on the current platform.
            </p>
          </div>

          <div className="audit-finding">
            <div className="audit-finding__header">
              <span className="audit-severity audit-severity--high">High</span>
              <h4>AUD-022: Security remediation</h4>
            </div>
            <p>
              Fix the {metrics.securityVulnerabilities} SSL/TLS vulnerabilities in <code>AbstractIntegrationCommand</code>. All {metrics.securityVulnerabilities} are in one file and the fix is straightforward.
            </p>
          </div>

          <div className="audit-finding">
            <div className="audit-finding__header">
              <span className="audit-severity audit-severity--medium">Medium</span>
              <h4>AUD-023: Headless transition planning</h4>
            </div>
            <p>
              The findings from this audit feed directly into the Discovery phase proposed in our RFP response. The headless readiness analysis (section 09), integration inventory (section 02), and JDK21 blocking items (section 10) provide the evidence base for sizing the engagement, sequencing the vertical rollout, and populating the sprint-zero backlog. The Discovery workshops can focus on business requirements and architecture decisions rather than reverse-engineering what already exists.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <h3 style={{ fontSize: 20, marginBottom: 20, marginTop: 40, color: 'var(--white)' }}>Sprint Zero Backlog</h3>
          <p style={{ fontSize: 16, color: 'var(--grey-light)', lineHeight: 1.65, marginBottom: 20 }}>
            Tactical items that can be addressed immediately.
          </p>
          <div className="schedule-wrap">
            <table className="schedule-table">
              <thead>
                <tr>
                  <th style={{ whiteSpace: 'nowrap' }}>ID</th>
                  <th style={{ textAlign: 'left' }}>Task</th>
                  <th>Section</th>
                  <th>Severity</th>
                  <th>Effort</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style={{ whiteSpace: 'nowrap' }}><a href="#ap-upgrade" style={{ color: 'var(--cyan)', textDecoration: 'none' }}>AUD-020</a></td><td>Resolve JDK21 blocking issues (XSD generation, OAuth, CPI libraries) and complete upgrade assessment</td><td style={{ textAlign: 'center' }}>JDK21</td><td style={{ textAlign: 'center' }}><span style={{ color: '#ff5252', fontWeight: 600 }}>Critical</span></td><td style={{ textAlign: 'center' }}>High</td></tr>
                <tr><td style={{ whiteSpace: 'nowrap' }}><a href="#ap-integrations" style={{ color: 'var(--cyan)', textDecoration: 'none' }}>AUD-021</a></td><td>Evaluate Mandrill replacement options (SAP Cloud Mail, SendGrid, or native SMTP)</td><td style={{ textAlign: 'center' }}>Integrations</td><td style={{ textAlign: 'center' }}><span style={{ color: '#ffab40', fontWeight: 600 }}>High</span></td><td style={{ textAlign: 'center' }}>Medium</td></tr>
                <tr><td style={{ whiteSpace: 'nowrap' }}><a href="#ap-headless" style={{ color: 'var(--cyan)', textDecoration: 'none' }}>AUD-010</a></td><td>Spike: design OAuth2/OIDC authentication flow to replace SAML SSO for headless</td><td style={{ textAlign: 'center' }}>Headless</td><td style={{ textAlign: 'center' }}><span style={{ color: '#ffab40', fontWeight: 600 }}>High</span></td><td style={{ textAlign: 'center' }}>Medium</td></tr>
                <tr><td style={{ whiteSpace: 'nowrap' }}><a href="#ap-code-quality" style={{ color: 'var(--cyan)', textDecoration: 'none' }}>AUD-022</a></td><td>Fix SSL/TLS certificate validation in AbstractIntegrationCommand ({metrics.securityVulnerabilities} vulnerabilities)</td><td style={{ textAlign: 'center' }}>Code Quality</td><td style={{ textAlign: 'center' }}><span style={{ color: '#ffab40', fontWeight: 600 }}>High</span></td><td style={{ textAlign: 'center' }}>Low</td></tr>
                <tr><td style={{ whiteSpace: 'nowrap' }}><a href="#ap-performance" style={{ color: 'var(--cyan)', textDecoration: 'none' }}>AUD-026</a></td><td>Investigate cache invalidation storm (9-hour incident on 5 March) and implement monitoring/alerting</td><td style={{ textAlign: 'center' }}>Performance</td><td style={{ textAlign: 'center' }}><span style={{ color: '#ef5350', fontWeight: 600 }}>Critical</span></td><td style={{ textAlign: 'center' }}>Medium</td></tr>
                <tr><td style={{ whiteSpace: 'nowrap' }}><a href="#ap-code-quality" style={{ color: 'var(--cyan)', textDecoration: 'none' }}>AUD-002</a></td><td>Replace non thread-safe SimpleDateFormat in MHGDateHelper with DateTimeFormatter</td><td style={{ textAlign: 'center' }}>Code Quality</td><td style={{ textAlign: 'center' }}><span style={{ color: '#ffab40', fontWeight: 600 }}>Medium</span></td><td style={{ textAlign: 'center' }}>Low</td></tr>
                <tr><td style={{ whiteSpace: 'nowrap' }}><a href="#ap-code-quality" style={{ color: 'var(--cyan)', textDecoration: 'none' }}>AUD-024</a></td><td>Move production API keys (e.g. Adyen) from source code to Cloud Portal properties and blacklist in HAC</td><td style={{ textAlign: 'center' }}>Code Quality</td><td style={{ textAlign: 'center' }}><span style={{ color: '#ffab40', fontWeight: 600 }}>Medium</span></td><td style={{ textAlign: 'center' }}>Low</td></tr>
              </tbody>
            </table>
          </div>
          <button
            className="sonar-export-btn"
            style={{ marginTop: 16 }}
            onClick={() => navigateTo('audit-findings')}
          >
            View all backlog items
          </button>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="callout callout--cyan" style={{ marginTop: 24 }}>
            <strong>Final word:</strong> The platform is a solid foundation to build on. The existing investment in OCC APIs and a working headless trade portal gives {client.shortName} a head start that most SAP Commerce customers don&apos;t have. The path forward is clear, the risks are well understood, and this report provides the evidence base to move into Discovery with confidence.
          </div>
        </Reveal>
      </section>

      {/* === FOOTER === */}
      </TocLayout>

      <Footer />
    </>
  );
}
