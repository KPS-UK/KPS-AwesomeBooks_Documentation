'use client';

import Hero from '@/components/Hero';
import StickyNav from '@/components/StickyNav';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import { client, kps, platform, metrics, extensions, integrations } from '@/data/client-config';

interface FactsheetPageProps {
  navigateTo: (page: string) => void;
  goHome: () => void;
}

/* ── colour helpers for section headers ── */
const sectionHeaderStyle = (bg: string): React.CSSProperties => ({
  background: bg,
  color: '#fff',
  fontWeight: 700,
  fontSize: 15,
  letterSpacing: 0.5,
  padding: '10px 16px',
  borderRadius: '8px 8px 0 0',
  marginTop: 40,
  marginBottom: 0,
});

/* ── TBC badge ── */
const TBC = () => (
  <span style={{ color: 'var(--grey)', opacity: 0.5, fontStyle: 'italic', fontSize: 13 }}>TBC</span>
);

/* ── single key-value row ── */
function Row({ label, value, note }: { label: string; value?: string | null; note?: string }) {
  return (
    <tr>
      <td style={{ padding: '10px 16px', color: 'var(--grey-light)', fontSize: 14, whiteSpace: 'nowrap', verticalAlign: 'top', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        {label}
      </td>
      <td style={{ padding: '10px 16px', color: value ? 'var(--white)' : undefined, fontSize: 14, lineHeight: 1.55, borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        {value ? (
          <>
            {value}
            {note && <span style={{ display: 'block', marginTop: 4, fontSize: 12, color: 'var(--grey)', lineHeight: 1.45 }}>{note}</span>}
          </>
        ) : (
          <TBC />
        )}
      </td>
    </tr>
  );
}

/* ── section table ── */
function SectionTable({ header, bg, children }: { header: string; bg: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <div style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)', marginBottom: 0 }}>
        <div style={sectionHeaderStyle(bg)}>{header}</div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>{children}</tbody>
        </table>
      </div>
    </Reveal>
  );
}

export default function FactsheetPage({ navigateTo, goHome }: FactsheetPageProps) {
  return (
    <>
      <Hero
        title={
          <>
            {client.shortName}
            <br />
            <span className="accent">Factsheet</span>
          </>
        }
        subtitle="SAP Commerce Cloud platform factsheet - compiled from the technical audit codebase review, site analysis, and integration inventory."
      />

      <StickyNav
        logoText={
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={kps.logoUrl} alt="KPS" style={{ height: 22 }} /> <span>Factsheet</span>
          </>
        }
        onHome={goHome}
      />

      <section className="section" style={{ paddingBottom: 0 }}>
        <Reveal>
          <span className="section-label">Reference</span>
          <h2>Platform Factsheet</h2>
          <p className="section-intro">
            A structured overview of the {client.name} SAP Commerce platform, enriched with findings from the <span className="hl">technical audit</span>. Fields marked <em style={{ color: 'var(--grey)', opacity: 0.6 }}>TBC</em> require backoffice access or client confirmation.
          </p>
        </Reveal>
      </section>

      {/* ──────────────────────────────────────────────────────────────────
          OVERVIEW
      ────────────────────────────────────────────────────────────────── */}
      <section className="section" style={{ paddingTop: 16 }}>
        <SectionTable header="OVERVIEW" bg="#4a6fa5">
          <Row label="Version" value={platform.commerceVersion} note="Patch level to be confirmed" />
          <Row label="Patching Strategy" />
          <Row label="Started on version" />
          <Row label="Hosting" value={platform.hosting} note="Well-structured manifest.json, no core customisations" />
          <Row label="Incumbent SI" />
          <Row label="Database" value="Microsoft SQL Server (MSSQL)" note="Standard CCv2 deployment" />
          <Row label="SAP CC License Type" />
          <Row label="Source Control" />
        </SectionTable>

        {/* ──────────────────────────────────────────────────────────────
            FRONTEND / MOBILE
        ────────────────────────────────────────────────────────────── */}
        <SectionTable header="FRONTEND / MOBILE" bg="#6a8d73">
          <Row label="Websites" value={`${client.primaryWebsite} (B2C), ${client.headlessWebsite} (B2B trade portal)`} />
          <Row label="Frontend" value={`${platform.currentFrontend} + ${platform.headlessFrontend} for trade portal`} note={`Accelerator deprecated, derelease Sep 2027. Aiming to go headless with ${platform.proposedFrontend}`} />
          <Row label="Mobile Apps" value="Yes, via OCC APIs" />
          <Row label="Physical Store / EPOS" />
        </SectionTable>

        {/* ──────────────────────────────────────────────────────────────
            SITES
        ────────────────────────────────────────────────────────────── */}
        <SectionTable header="SITES" bg="#7a6b8e">
          <Row label="Primary" value={client.primaryWebsite} note={`Accelerator storefront - ${metrics.peakTraffic} at peak`} />
          <Row label="Trade (headless)" value={client.headlessWebsite} note={`${platform.headlessFrontend} - trade professionals portal`} />
        </SectionTable>

        {/* ──────────────────────────────────────────────────────────────
            E-COMMERCE
        ────────────────────────────────────────────────────────────── */}
        <SectionTable header="E-COMMERCE" bg="#c75643">
          <Row label="Languages" value="English (en_GB), French (fr_FR)" note="i18n and l10n custom extension groups present" />
          <Row label="Search" value={platform.search} note="Custom extension group with significant customisation beyond standard integration" />
          <Row label="Currencies" value="GBP, EUR" note="Multi-currency support for UK and European markets" />
          <Row label="Content Catalogue" />
          <Row label="Cron Jobs" />
          <Row label="Customer" value="B2B and B2C customer types" note="Custom registration with extended data model, GDPR consent management" />
          <Row label="Estimated Delivery Times" value="Yes" note="Custom OCC endpoint for delivery date selection per cart" />
          <Row label="User" value="B2B user registration with custom data model via OCC" />
          <Row label="Employee" />
          <Row label="Products" value={`${metrics.occEndpoints} custom OCC endpoints`} note="Search, detail, barcode lookup, variants, batch pricing/stock, references" />
          <Row label="Product Recommendations" value="Yes" note="Custom caching layer for product recommendations in type system" />
          <Row label="Pricing" value={`ERP-driven via ${platform.middleware}`} note={`Real-time pricing from ${platform.erp} via integration layer (order simulation)`} />
          <Row label="Stock" value={`ERP-driven via ${platform.middleware}`} note={`Real-time availability from ${platform.erp}, cached locally`} />
          <Row label="Promotions" value="Yes" note="Custom promotion model, dedicated promotions page (Accelerator only)" />
          <Row label="Click and Collect / Dispatch from store" value="Yes" note="Pickup POS selection via custom OCC endpoint on cart" />
          <Row label="Vouchers" value="Yes" note="Cart voucher apply/remove (currently Accelerator only, no OCC)" />
          <Row label="B2B" value="Yes" note={`B2B ${client.b2bFeatures.join(', ')}`} />
          <Row label="Orders" value="Custom B2B order placement via OCC" note="Enhanced place-order endpoint with custom validation" />
          <Row label="Subscriptions" />
          <Row label="Tax" />
          <Row label="Other" value="Wishlists, Projects, Cart import/export (CSV/Excel/PDF)" />
        </SectionTable>

        <Reveal>
          <div className="callout callout--pink" style={{ marginTop: 16 }}>
            <strong>{platform.search}:</strong> The search implementation has been flagged as requiring review. The custom extension group suggests significant customisation beyond a standard {platform.search} integration.
          </div>
        </Reveal>

        {/* ──────────────────────────────────────────────────────────────
            COMPONENTS (Yes/No)
        ────────────────────────────────────────────────────────────── */}
        <SectionTable header="COMPONENTS (Yes / No)" bg="#d4a843">
          <Row label="Adaptive Search" value="No" note={`${platform.search} used instead of SAP Adaptive Search`} />
          <Row label="ASM" value="Yes (Accelerator only)" note="Full ASM lifecycle: agent login, customer emulation, cart binding, Customer 360 view. Zero OCC coverage" />
          <Row label="Backoffice" value="Yes" note="Custom backoffice addons (dashboard extension group)" />
          <Row label="Backoffice CS" />
          <Row label="Bundles module" />
          <Row label="Commerce Search" value="No" note={`Replaced by ${platform.search}`} />
          <Row label="Customer Service Cockpit" />
          <Row label="HMC" value="No" note="Deprecated, replaced by Backoffice" />
          <Row label="Import Cockpit" />
          <Row label="Multi-country-module" />
          <Row label="OMS" />
          <Row label="PCM" />
          <Row label="Product Cockpit" value="No" note="Deprecated, replaced by Backoffice" />
          <Row label="Punchout" value="Yes (B2B cXML)" note="cXML punchout controllers: setup, session, cart, PO, profile. Accelerator only" />
          <Row label="Report Cockpit" />
          <Row label="SmartEdit" value="Yes" note="smarteditaddon installed (deprecated, will retire with Accelerator)" />
          <Row label="WCMS" value="Yes" note="CMS page data with content slots via custom OCC endpoint. SmartEdit for visual editing" />
        </SectionTable>

        {/* ──────────────────────────────────────────────────────────────
            INTEGRATIONS AND SERVICES
        ────────────────────────────────────────────────────────────── */}
        <SectionTable header="INTEGRATIONS AND SERVICES" bg="#5b8a72">
          <Row label="Middleware" value={platform.middleware} note={`ERP pricing, availability, order simulation and orders via ${platform.middleware}`} />
          <Row label="Hot folders" value="Yes (MHG integration extensions)" note="Custom integration extension group" />
          <Row label="DataHub" value="No" note={`Replaced by ${platform.middleware}`} />
          <Row label="CRM" value={platform.crm} note="Customer data management / login integration" />
          <Row label="Email" value={platform.email} note="Transactional email. Library age to be confirmed - upgrade may be recommended" />
          <Row label="ERP" value={platform.erp} note={`Real-time pricing, stock availability, order simulation via ${platform.middleware}`} />
          <Row label="POS terminals" />
          <Row label="Geo-location" />
          <Row label="Payment" value={platform.payment} note="Custom payment extension. Library version to be confirmed" />
          <Row label="3rd Party Integrations" value={`${platform.search} (search), ${platform.monitoring} (monitoring)`} />
          <Row label="1st Party Integrations" value={`${platform.erp} (ERP), ${platform.middleware} (middleware), ${platform.authentication} (SSO), Solr (backoffice search)`} />
        </SectionTable>

        <Reveal>
          <div className="callout callout--pink" style={{ marginTop: 16 }}>
            <strong>{platform.email} risk:</strong> The email integration library age should be verified. If outdated, replacement is recommended regardless of the headless migration timeline as an operational risk on the current platform.
          </div>
        </Reveal>

        {/* ──────────────────────────────────────────────────────────────
            CONTENT
        ────────────────────────────────────────────────────────────── */}
        <SectionTable header="CONTENT" bg="#8b6e99">
          <Row label="CMS" value="SAP Commerce WCMS + SmartEdit" note="Custom CMS OCC endpoint for page data with content slots. SmartEdit for visual editing (addon, will retire)" />
          <Row label="DAM" />
          <Row label="PIM" />
        </SectionTable>

        {/* ──────────────────────────────────────────────────────────────
            CUSTOM EXTENSIONS
        ────────────────────────────────────────────────────────────── */}
        <SectionTable header={`CUSTOM EXTENSIONS (${extensions.groups.length} groups)`} bg="#5a7fa5">
          {extensions.groups.map((ext) => (
            <Row key={ext.name} label={ext.name} value={ext.description} />
          ))}
        </SectionTable>

        {/* ──────────────────────────────────────────────────────────────
            HEADLESS READINESS SUMMARY
        ────────────────────────────────────────────────────────────── */}
        <SectionTable header="HEADLESS READINESS" bg="#c75643">
          <Row label="Custom OCC Endpoints" value={`${metrics.occEndpoints} endpoints across multiple controllers`} />
          <Row label="Working Headless Checkout" value={`Yes (${client.headlessWebsite})`} note="Multi-step B2B checkout: delivery mode/date, payment type/PO, order review" />
          <Row label="Accelerator-Only Functions" value="To be quantified" note="Punchout, quoting, ASM, SAML SSO, card payments, cart import/export, consent, vouchers" />
          <Row label={`Key Gaps for ${new URL(client.primaryWebsite).hostname}`} value={`${platform.payment} payments, B2B punchout, quoting, ASM, SAML authentication`} />
          <Row label="Deprecated Extensions" value={String(extensions.deprecated.length)} note={extensions.deprecated.join(', ')} />
        </SectionTable>

        {/* ──────────────────────────────────────────────────────────────
            HEALTH SCORECARD SUMMARY
        ────────────────────────────────────────────────────────────── */}
        <SectionTable header="AUDIT HEALTH SCORECARD" bg="#4a6fa5">
          <Row label="Extensions" value="Green" note="Clean architecture, deprecated extensions are all Accelerator-related" />
          <Row label="Integrations" value="Amber" note="Library versions to be confirmed - upgrades may be needed" />
          <Row label="Type System" value="Green" note="High pass rate, no critical findings" />
          <Row label="Catalogue" value="Green" note="Sensible setup, standard patterns, multi-region and multilingual" />
          <Row label="Code Quality" value="Green" note="Well maintained, minor security findings to address" />
          <Row label="Tests" value="Green" note={`${metrics.testPassRate} pass rate, ${metrics.testCount} tests, ${metrics.testCoverage} coverage`} />
          <Row label="Performance" value="Red" note={`Mobile Lighthouse score ${metrics.mobileLighthouse}/100, LCP ${metrics.mobileLcp}`} />
          <Row label="Accessibility" value="Amber" note="Falls short of WCAG 2.1 AA target" />
          <Row label="Headless Readiness" value="Green" note={`${metrics.occEndpoints} OCC endpoints, working checkout on trade portal`} />
          <Row label="JDK21" value="Red" note="Mandatory by Aug 2026, blocking issues unresolved" />
          <Row label="CCv2" value="Green" note="Standard SAP behaviour, no core customisations" />
          <Row label="Infrastructure" value="Amber" note="Missing monitors, unindexed log fields" />
        </SectionTable>
      </section>

      <Footer />
    </>
  );
}
