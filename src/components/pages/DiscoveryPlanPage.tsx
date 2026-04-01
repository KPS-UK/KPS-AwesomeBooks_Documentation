'use client';

import { useState } from 'react';
import Hero from '@/components/Hero';
import StickyNav from '@/components/StickyNav';
import TocLayout from '@/components/TocLayout';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import { client, kps } from '@/data/client-config';

interface DiscoveryPlanPageProps {
  navigateTo: (page: string) => void;
  goHome: () => void;
}

/* ── Session data ── */
interface Activity {
  dur: string;
  activity: string;
  type: 'prep' | 'workshop' | 'decision' | 'output' | 'break';
  facilitator: string;
  notes: string;
}

interface Session {
  id: string;
  num: number;
  title: string;
  goal: string;
  duration: string;
  week: string;
  activities: Activity[];
  stakeholders?: string[];
  preparation?: string[];
  outputs?: string[];
  risks?: string[];
}

const sessions: Session[] = [
  {
    id: 's1', num: 1,
    title: 'Vision, Goals & Customer Journeys',
    goal: 'Align on commercial objectives and how customers interact with the brand.',
    duration: '~3 hrs', week: 'Week 1',
    activities: [
      { dur: '15 min', activity: 'Welcome, introductions, agenda walkthrough', type: 'prep', facilitator: 'PM', notes: 'Set the tone, confirm attendees' },
      { dur: '30 min', activity: 'Revenue targets, growth trajectory, commercial vision', type: 'workshop', facilitator: 'SA', notes: 'Capture current revenue baseline and ambition' },
      { dur: '30 min', activity: 'Key KPIs: conversion rate, AOV, retention targets', type: 'workshop', facilitator: 'SA', notes: 'Document current vs target metrics' },
      { dur: '15 min', activity: 'Break', type: 'break', facilitator: '', notes: '' },
      { dur: '30 min', activity: 'Customer acquisition vs retention strategy discussion', type: 'workshop', facilitator: 'SA', notes: 'Where is investment focused? Ratio?' },
      { dur: '30 min', activity: 'Demo key user journeys: discovery, purchase, repeat, wholesale', type: 'workshop', facilitator: 'SA / Client', notes: 'Client walks through current journeys; KPS notes pain points' },
      { dur: '15 min', activity: 'Checkout performance: what % of revenue is impacted today?', type: 'decision', facilitator: 'SA', notes: 'Quantify the checkout problem' },
      { dur: '15 min', activity: 'Agree primary success metrics and priority journeys for MVP', type: 'decision', facilitator: 'SA / PM', notes: 'Formal decision capture' },
    ],
    stakeholders: ['CMO / Head of Ecommerce', 'UX/UI lead', 'Customer support lead'],
    preparation: ['Current revenue and KPI data', 'Existing customer journey documentation (if any)', 'Known pain points and support ticket themes'],
    outputs: ['Success metrics framework', 'Journey maps (draft)'],
  },
  {
    id: 's2', num: 2,
    title: 'Product Model, Search & Discovery',
    goal: 'Define how customers find and explore products.',
    duration: '~3.5 hrs', week: 'Week 1-2',
    activities: [
      { dur: '15 min', activity: 'Recap Session 1 decisions; set agenda', type: 'prep', facilitator: 'PM', notes: '' },
      { dur: '35 min', activity: 'Product structure deep-dive: editions, condition, variants', type: 'workshop', facilitator: 'SA', notes: 'Explore whether variants or separate products suit the catalogue' },
      { dur: '25 min', activity: 'Author and series relationships; metadata strategy (genre, tags)', type: 'workshop', facilitator: 'SA', notes: 'How are relationships modelled today?' },
      { dur: '15 min', activity: 'Break', type: 'break', facilitator: '', notes: '' },
      { dur: '30 min', activity: 'Product data source and dataset size assessment', type: 'workshop', facilitator: 'SA', notes: 'Understand volume: how many SKUs, how often updated?' },
      { dur: '30 min', activity: 'Search functionality: native vs external (e.g. Algolia)', type: 'workshop', facilitator: 'SA', notes: 'Evaluate trade-offs given dataset size' },
      { dur: '20 min', activity: 'Filtering, navigation structure, ranking and merchandising logic', type: 'workshop', facilitator: 'SA', notes: '' },
      { dur: '20 min', activity: 'Decision: product model structure (variants vs separate products)', type: 'decision', facilitator: 'SA', notes: '' },
      { dur: '20 min', activity: 'Decision: search approach and ranking/merchandising strategy', type: 'decision', facilitator: 'SA', notes: '' },
    ],
    stakeholders: ['Merchandising team', 'Product/data owner', 'Ecommerce lead'],
    preparation: ['Product data export / sample', 'Current catalogue size and growth projections', 'Existing taxonomy and tagging approach'],
    outputs: ['Product data model (draft)', 'Search strategy recommendation'],
    risks: ['Inadequate product modelling limiting search and recommendations', 'Handling the size of the product dataset within platform limits'],
  },
  {
    id: 's3', num: 3,
    title: 'Promotions, Pricing & Loyalty',
    goal: 'Define commercial levers that drive revenue.',
    duration: '~2.5 hrs', week: 'Week 2',
    activities: [
      { dur: '10 min', activity: 'Recap and agenda', type: 'prep', facilitator: 'PM', notes: '' },
      { dur: '30 min', activity: 'Promotion types: bundles, series-based, cohort-based', type: 'workshop', facilitator: 'SA', notes: 'Map current promotions and frequency' },
      { dur: '25 min', activity: 'Discount rules, stacking behaviour, time-based campaigns', type: 'workshop', facilitator: 'SA', notes: 'Identify complexity ceiling for the platform' },
      { dur: '15 min', activity: 'Break', type: 'break', facilitator: '', notes: '' },
      { dur: '25 min', activity: 'Email-triggered discounts and CRM integration', type: 'workshop', facilitator: 'SA', notes: '' },
      { dur: '20 min', activity: 'Loyalty programme: current state and platform options', type: 'workshop', facilitator: 'SA', notes: 'Evaluate apps vs custom build' },
      { dur: '15 min', activity: 'Wholesale vs D2C pricing differences', type: 'workshop', facilitator: 'SA', notes: 'Are these separate storefronts or segments?' },
      { dur: '10 min', activity: 'Decisions: MVP promotion types, complexity limits, native vs app', type: 'decision', facilitator: 'SA / PM', notes: '' },
    ],
    stakeholders: ['Marketing team', 'CRM owner', 'Ecommerce manager'],
    preparation: ['List of current promotion types and rules', 'CRM setup and current automations', 'Loyalty programme details'],
    outputs: ['Promotions capability map', 'Loyalty integration approach'],
    risks: ['Over-complex promotions exceeding platform capability'],
  },
  {
    id: 's4', num: 4,
    title: 'Personalisation, AI & CRM',
    goal: 'Define how experiences are tailored to users.',
    duration: '~2.5 hrs', week: 'Week 2-3',
    activities: [
      { dur: '10 min', activity: 'Recap and agenda', type: 'prep', facilitator: 'PM', notes: '' },
      { dur: '25 min', activity: 'Segmentation strategy: cohorts, behavioural triggers', type: 'workshop', facilitator: 'SA', notes: 'What data exists today?' },
      { dur: '25 min', activity: 'Personalised homepage and content: ambition vs reality', type: 'workshop', facilitator: 'SA', notes: '' },
      { dur: '15 min', activity: 'Break', type: 'break', facilitator: '', notes: '' },
      { dur: '25 min', activity: 'Product recommendations: by author, series, genre, behaviour', type: 'workshop', facilitator: 'SA', notes: 'Native recs vs third-party (e.g. Nosto, Rebuy)' },
      { dur: '20 min', activity: 'Role of AI chatbot; CRM tool integration', type: 'workshop', facilitator: 'SA', notes: '' },
      { dur: '15 min', activity: 'Decision: personalisation ownership (tools vs custom)', type: 'decision', facilitator: 'SA', notes: '' },
      { dur: '15 min', activity: 'Decision: MVP vs future-state scope; data sources for segmentation', type: 'decision', facilitator: 'SA / PM', notes: '' },
    ],
    stakeholders: ['CRM / marketing automation lead', 'Data team', 'Ecommerce lead', 'Customer support'],
    outputs: ['Personalisation framework', 'Data requirements document'],
    risks: ['Personalisation ambition exceeding available data and tooling'],
  },
  {
    id: 's5', num: 5,
    title: 'CMS, Content & Experimentation',
    goal: 'Define how marketing teams manage and optimise content.',
    duration: '~2.5 hrs', week: 'Week 3',
    activities: [
      { dur: '10 min', activity: 'Recap and agenda', type: 'prep', facilitator: 'PM', notes: '' },
      { dur: '25 min', activity: 'Page creation workflows: current process and pain points', type: 'workshop', facilitator: 'SA', notes: '' },
      { dur: '25 min', activity: 'Drag-and-drop, WYSIWYG requirements; campaign scheduling', type: 'workshop', facilitator: 'SA', notes: 'Online Store Editor vs headless CMS' },
      { dur: '15 min', activity: 'Break', type: 'break', facilitator: '', notes: '' },
      { dur: '25 min', activity: 'Blog/editorial strategy and content types', type: 'workshop', facilitator: 'SA', notes: '' },
      { dur: '25 min', activity: 'A/B testing and experimentation: tooling evaluation', type: 'workshop', facilitator: 'SA', notes: '' },
      { dur: '15 min', activity: 'Decision: CMS approach (native vs headless)', type: 'decision', facilitator: 'SA', notes: '' },
      { dur: '10 min', activity: 'Decision: marketing autonomy vs governance; experimentation tooling', type: 'decision', facilitator: 'SA / PM', notes: '' },
    ],
    stakeholders: ['Marketing / content team', 'Ecommerce manager', 'UX lead'],
    outputs: ['CMS approach recommendation', 'Experimentation framework'],
  },
  {
    id: 's6', num: 6,
    title: 'Third-Party Ecosystem & Integrations',
    goal: 'Define how the platform operates within the wider commerce ecosystem.',
    duration: '~3.5 hrs', week: 'Week 3-4',
    activities: [
      { dur: '10 min', activity: 'Recap and agenda', type: 'prep', facilitator: 'PM', notes: '' },
      { dur: '35 min', activity: 'Full ecosystem mapping: platform + all third-party systems', type: 'workshop', facilitator: 'SA', notes: 'Whiteboard/Miro exercise: map every system' },
      { dur: '30 min', activity: 'Integration patterns per system: API, event-driven, middleware', type: 'workshop', facilitator: 'SA', notes: '' },
      { dur: '15 min', activity: 'Break', type: 'break', facilitator: '', notes: '' },
      { dur: '30 min', activity: 'Real-time vs batch decisions per integration', type: 'workshop', facilitator: 'SA', notes: '' },
      { dur: '30 min', activity: 'Ownership of business logic: platform vs external systems', type: 'workshop', facilitator: 'SA', notes: 'Where does pricing logic live? Promotions? Inventory?' },
      { dur: '20 min', activity: 'Data flows between systems; performance impact of scripts/apps', type: 'workshop', facilitator: 'SA', notes: '' },
      { dur: '20 min', activity: 'Decision: system ownership per capability', type: 'decision', facilitator: 'SA', notes: '' },
      { dur: '20 min', activity: 'Decision: integration approach per platform; acceptable app reliance', type: 'decision', facilitator: 'SA / PM', notes: '' },
    ],
    stakeholders: ['CTO / Technical Architect', 'Data/analytics team', 'CRM / marketing automation lead', 'Ecommerce lead'],
    outputs: ['Ecosystem architecture view', 'Integration ownership model', 'High-level data flow diagrams'],
    risks: ['Fragmented architecture from unclear ownership across tools', 'Over-reliance on apps impacting performance and maintainability', 'Conflicting logic across platforms (e.g. personalisation vs promotions)'],
  },
  {
    id: 's7', num: 7,
    title: 'Architecture, ERP & Data',
    goal: 'Define the technical backbone of the platform.',
    duration: '~3.5 hrs', week: 'Week 4',
    activities: [
      { dur: '10 min', activity: 'Recap and agenda', type: 'prep', facilitator: 'PM', notes: '' },
      { dur: '30 min', activity: 'Order lifecycle walkthrough: end-to-end', type: 'workshop', facilitator: 'SA', notes: 'Map the full order journey from basket to fulfilment' },
      { dur: '30 min', activity: 'Inventory ownership and pricing: where does truth live?', type: 'workshop', facilitator: 'SA', notes: '' },
      { dur: '15 min', activity: 'Break', type: 'break', facilitator: '', notes: '' },
      { dur: '35 min', activity: 'ERP integration approach: current state and target', type: 'workshop', facilitator: 'SA', notes: 'Key risk area: ERP uncertainty' },
      { dur: '30 min', activity: 'Data flows, analytics, and tracking strategy', type: 'workshop', facilitator: 'SA', notes: 'GA4, server-side tagging, data warehouse considerations' },
      { dur: '20 min', activity: 'Integration patterns: real-time vs batch, middleware needs', type: 'workshop', facilitator: 'SA', notes: '' },
      { dur: '20 min', activity: 'Decision: system ownership of orders, inventory, pricing', type: 'decision', facilitator: 'SA', notes: '' },
      { dur: '20 min', activity: 'Decision: integration architecture; core vs app-based capabilities', type: 'decision', facilitator: 'SA / PM', notes: '' },
    ],
    stakeholders: ['CTO / Tech lead', 'ERP team', 'Data/analytics team', 'Operations / fulfilment'],
    outputs: ['Architecture definition (draft)', 'Integration model'],
    risks: ['ERP uncertainty impacting architecture decisions', 'Over-reliance on apps creating fragmented architecture'],
  },
  {
    id: 's8', num: 8,
    title: 'Checkout & Payments Deep Dive',
    goal: 'Nail down the checkout experience and payment flows.',
    duration: '~3 hrs', week: 'Week 4-5',
    activities: [
      { dur: '10 min', activity: 'Recap and agenda', type: 'prep', facilitator: 'PM', notes: '' },
      { dur: '30 min', activity: 'Checkout experience: express checkout, guest vs logged-in, mobile', type: 'workshop', facilitator: 'SA', notes: '' },
      { dur: '30 min', activity: 'Payment flows: authorise vs capture, refunds, edge cases', type: 'workshop', facilitator: 'SA', notes: '' },
      { dur: '15 min', activity: 'Break', type: 'break', facilitator: '', notes: '' },
      { dur: '30 min', activity: 'Complex scenarios: split orders, pre-orders, mixed baskets', type: 'workshop', facilitator: 'SA', notes: 'Align with fulfilment and ERP approach from Session 7' },
      { dur: '25 min', activity: 'Fraud and risk management approach', type: 'workshop', facilitator: 'SA', notes: '' },
      { dur: '20 min', activity: 'Integration impact on checkout performance', type: 'workshop', facilitator: 'SA', notes: 'Script audit, third-party load times' },
      { dur: '20 min', activity: 'Decisions: capture strategy, complex basket handling, checkout priorities, fraud approach', type: 'decision', facilitator: 'SA / PM', notes: '' },
    ],
    stakeholders: ['Finance', 'Ecommerce lead', 'Technical architect', 'Operations / fulfilment'],
    outputs: ['Checkout experience specification', 'Payment flow diagrams'],
    risks: ['Poor checkout performance impacting conversion', 'Misalignment between payment flows and fulfilment/ERP', 'Inability to support complex order scenarios (split, pre-order)'],
  },
  {
    id: 's9', num: 9,
    title: 'Operating Model, MVP Scope & Playback',
    goal: 'Align on how the platform will be delivered and operated.',
    duration: '~3 hrs', week: 'Week 5-6',
    activities: [
      { dur: '15 min', activity: 'Full discovery recap: key decisions and open items', type: 'prep', facilitator: 'PM', notes: '' },
      { dur: '30 min', activity: 'Roles and responsibilities: marketing vs development ownership', type: 'workshop', facilitator: 'PM / SA', notes: '' },
      { dur: '30 min', activity: 'Release and deployment process; ways of working', type: 'workshop', facilitator: 'PM', notes: '' },
      { dur: '15 min', activity: 'Break', type: 'break', facilitator: '', notes: '' },
      { dur: '30 min', activity: 'MVP vs Phase 2 scope: walk through feature list', type: 'decision', facilitator: 'SA / PM', notes: 'Critical session: draw the line on MVP' },
      { dur: '20 min', activity: 'Key risks and mitigations review', type: 'workshop', facilitator: 'PM', notes: '' },
      { dur: '20 min', activity: 'Decision: final MVP scope, phased roadmap, governance model', type: 'decision', facilitator: 'SA / PM', notes: '' },
      { dur: '20 min', activity: 'Playback of all discovery findings to senior stakeholders', type: 'output', facilitator: 'SA / PM', notes: 'Formal presentation and sign-off' },
    ],
    stakeholders: ['Senior stakeholders (C-level)', 'Ecommerce lead', 'Engineering lead', 'Delivery / PMO'],
    outputs: ['Operating model', 'Final MVP scope', 'Validated discovery findings', 'Phased roadmap'],
  },
];

/* ── Schedule data ── */
interface ScheduleRow {
  label: string;
  bold?: boolean;
  weeks: ('' | 'workshop' | 'writeup' | 'playback' | 'prep')[];
}

const scheduleRows: ScheduleRow[] = [
  { label: 'S1: Vision, Goals & Journeys', weeks: ['prep', 'workshop', '', '', '', '', '', '', ''] },
  { label: 'S2: Product Model & Search', weeks: ['prep', 'workshop', 'workshop', '', '', '', '', '', ''] },
  { label: 'S3: Promotions & Loyalty', weeks: ['', '', 'workshop', '', '', '', '', '', ''] },
  { label: 'S4: Personalisation & CRM', weeks: ['', '', 'workshop', 'workshop', '', '', '', '', ''] },
  { label: 'S5: CMS & Content', weeks: ['', '', '', 'workshop', '', '', '', '', ''] },
  { label: 'S6: Ecosystem & Integrations', weeks: ['', '', '', 'workshop', 'workshop', '', '', '', ''] },
  { label: 'S7: Architecture & ERP', weeks: ['', '', '', '', 'workshop', '', '', '', ''] },
  { label: 'S8: Checkout & Payments', weeks: ['', '', '', '', 'workshop', 'workshop', '', '', ''] },
  { label: 'S9: Operating Model & MVP', weeks: ['', '', '', '', '', 'workshop', 'workshop', '', ''] },
  { label: 'Mop-up Sessions', weeks: ['', '', '', '', '', '', 'workshop', '', ''] },
  { label: 'BRD Write-up', bold: true, weeks: ['', '', '', '', 'writeup', 'writeup', 'writeup', 'writeup', ''] },
  { label: 'Solution Design', bold: true, weeks: ['', '', '', '', '', 'writeup', 'writeup', 'writeup', ''] },
  { label: 'Project Estimation', bold: true, weeks: ['', '', '', '', '', '', 'writeup', 'writeup', ''] },
  { label: 'Scope Playback', bold: true, weeks: ['', '', '', '', '', 'playback', '', '', ''] },
  { label: 'Full Playback & Sign-off', bold: true, weeks: ['', '', '', '', '', '', '', 'playback', 'playback'] },
];

const weekHeaders = ['Prep', 'Wk 1', 'Wk 2', 'Wk 3', 'Wk 4', 'Wk 5', 'Wk 6', 'Wk 7', 'Wk 8'];

/* ── Deliverables ── */
const deliverables = [
  { title: 'Business Requirements Document', desc: 'Gap analysis of current vs future state, prioritised by business impact. A focused scope for what needs to change, validated by stakeholders across all 9 sessions.' },
  { title: 'Solution Architecture', desc: 'Target architecture, integration patterns, and technology recommendations grounded in evidence and trade-off analysis. Defensible decisions the team can own.' },
  { title: 'Integration Catalogue', desc: 'Complete mapping of every third-party system, data flow, ownership model, and integration pattern. The single source of truth for how the ecosystem connects.' },
  { title: 'MVP Scope & Phased Roadmap', desc: 'A clear line between what ships first and what comes later. Costed, sequenced, with dependencies mapped and risks quantified.' },
  { title: 'Operating Model', desc: 'Roles, responsibilities, release processes, and governance. How the platform will be built, maintained, and evolved after launch.' },
];

/* ── Key risks ── */
const keyRisks = [
  { risk: 'ERP integration uncertainty', desc: 'Current ERP landscape is evolving. Architecture decisions depend on understanding where inventory, pricing, and order truth lives.', mitigation: 'Dedicated Session 7 focus; require ERP documentation before the session; design for abstraction at the integration layer.' },
  { risk: 'Product data complexity', desc: 'Large catalogue with complex relationships (editions, authors, series) may exceed platform-native limits or require external tooling.', mitigation: 'Session 2 product data assessment; early prototype of data model; search strategy decision before build phase.' },
  { risk: 'Scope creep in personalisation', desc: 'Ambition for personalised experiences may outstrip available data, tooling, and team capacity.', mitigation: 'Session 4 explicitly separates MVP from future-state; decisions captured and signed off before build.' },
  { risk: 'Stakeholder availability', desc: 'Discovery sessions require key decision-makers. Gaps in attendance delay decisions and create rework.', mitigation: 'Pre-schedule all 9 sessions in prep week; confirm attendees; provide async decision capture for unavoidable conflicts.' },
];

/* ── Type badge component ── */
function TypeBadge({ type }: { type: Activity['type'] }) {
  const styles: Record<Activity['type'], { bg: string; color: string; label: string }> = {
    prep: { bg: 'rgba(255,180,0,0.15)', color: 'var(--gold)', label: 'Prep' },
    workshop: { bg: 'rgba(40,220,202,0.15)', color: 'var(--cyan)', label: 'Workshop' },
    decision: { bg: 'rgba(232,30,97,0.15)', color: 'var(--pink)', label: 'Decision' },
    output: { bg: 'rgba(40,220,202,0.25)', color: '#5ef0e0', label: 'Output' },
    break: { bg: 'rgba(255,255,255,0.06)', color: 'var(--grey-light)', label: 'Break' },
  };
  const s = styles[type];
  return (
    <span style={{
      display: 'inline-block', padding: '2px 10px', borderRadius: 10,
      fontSize: 11, fontWeight: 600, letterSpacing: '0.02em',
      background: s.bg, color: s.color,
    }}>
      {s.label}
    </span>
  );
}

/* ── Chevron SVG ── */
function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="20" height="20" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{
        transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
        flexShrink: 0,
      }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

/* ── Schedule bar color ── */
function barColor(type: string): string {
  switch (type) {
    case 'workshop': return 'var(--cyan)';
    case 'writeup': return 'var(--gold)';
    case 'playback': return 'var(--pink)';
    case 'prep': return 'rgba(255,255,255,0.15)';
    default: return 'transparent';
  }
}

/* ── Main component ── */
export default function DiscoveryPlanPage({ navigateTo, goHome }: DiscoveryPlanPageProps) {
  const [expandedSessions, setExpandedSessions] = useState<Set<string>>(new Set());
  const [allExpanded, setAllExpanded] = useState(false);

  const toggleSession = (id: string) => {
    setExpandedSessions(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (allExpanded) {
      setExpandedSessions(new Set());
      setAllExpanded(false);
    } else {
      setExpandedSessions(new Set(sessions.map(s => s.id)));
      setAllExpanded(true);
    }
  };

  return (
    <>
      <Hero
        title={<>Discovery<br /><span className="accent">Plan</span></>}
        subtitle={`A structured 6-8 week discovery phase for ${client.name}, covering 9 facilitated sessions from commercial vision through to MVP scope and sign-off.`}
      />

      <StickyNav
        logoText={
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={kps.logoUrl} alt="KPS" style={{ height: 22 }} /> <span>Discovery Plan</span>
          </>
        }
        onHome={goHome}
      />

      <TocLayout links={[
        { id: 'dp-overview', label: 'Overview', group: 'Overview', groupId: 'ch-overview' },
        { id: 'dp-sessions', label: 'Sessions', group: 'Discovery Sessions', groupId: 'ch-sessions' },
        { id: 'dp-s1', label: '1. Vision & Goals' },
        { id: 'dp-s2', label: '2. Product & Search' },
        { id: 'dp-s3', label: '3. Promotions' },
        { id: 'dp-s4', label: '4. Personalisation' },
        { id: 'dp-s5', label: '5. CMS & Content' },
        { id: 'dp-s6', label: '6. Integrations' },
        { id: 'dp-s7', label: '7. Architecture' },
        { id: 'dp-s8', label: '8. Checkout' },
        { id: 'dp-s9', label: '9. MVP & Playback' },
        { id: 'dp-schedule', label: 'Schedule', group: 'Schedule & Outputs', groupId: 'ch-schedule' },
        { id: 'dp-deliverables', label: 'Deliverables' },
        { id: 'dp-risks', label: 'Key Risks' },
      ]}>

        {/* ── Overview ── */}
        <section className="section" id="dp-overview">
          <Reveal>
            <span className="section-label">Overview</span>
            <h2>Discovery at a Glance</h2>
            <p className="section-intro">
              Before committing to build timelines, we invest in <span className="hl">structured discovery</span> to ensure every decision is grounded in evidence, every risk is surfaced, and every stakeholder is aligned.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="stat-row" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
              <div className="stat-box">
                <div className="stat-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <div className="stat-label">9</div>
                <div className="stat-desc">Discovery sessions</div>
              </div>
              <div className="stat-box">
                <div className="stat-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div className="stat-label">6-8</div>
                <div className="stat-desc">Weeks duration</div>
              </div>
              <div className="stat-box">
                <div className="stat-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
                <div className="stat-label">5</div>
                <div className="stat-desc">Key deliverables</div>
              </div>
              <div className="stat-box">
                <div className="stat-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
                <div className="stat-label">4</div>
                <div className="stat-desc">Key risks identified</div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div style={{ fontSize: 16, color: 'var(--grey-light)', lineHeight: 1.75, marginTop: 24 }}>
              <p>
                Discovery is not a documentation exercise. It is a series of <span className="hl">facilitated working sessions</span> designed to surface the decisions that will shape the build. Each session has a clear goal, defined outputs, and requires specific stakeholders to attend.
              </p>
              <p style={{ marginTop: 12 }}>
                The sessions are sequenced deliberately: we start with <span className="hl">commercial vision and customer journeys</span>, then work through product data, promotions, personalisation, content, integrations, architecture, checkout, and finally operating model and MVP scope. Each session builds on the decisions from the previous one.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="callout callout--cyan" style={{ marginTop: 24 }}>
              <strong>How to use this page:</strong> Each session below shows a high-level summary. Click to expand and see the full activity breakdown, stakeholders required, preparation needed, and expected outputs.
            </div>
          </Reveal>
        </section>

        {/* ── Sessions ── */}
        <section className="section" id="dp-sessions">
          <Reveal>
            <span className="section-label">Discovery Sessions</span>
            <h2>9 Structured Sessions</h2>
            <p className="section-intro">
              Each session is designed around <span className="hl">specific decisions</span> that need to be made. Click any session to see the detailed agenda, stakeholders, and outputs.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
              <button
                onClick={toggleAll}
                style={{
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                  color: 'var(--grey-light)', padding: '6px 16px', borderRadius: 6,
                  fontSize: 13, cursor: 'pointer', transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
              >
                {allExpanded ? 'Collapse all' : 'Expand all'}
              </button>
            </div>
          </Reveal>

          {sessions.map((session, i) => {
            const isOpen = expandedSessions.has(session.id);
            return (
              <Reveal key={session.id} delay={0.05 * (i + 1)}>
                <div id={`dp-${session.id}`} className="dp-session-card" style={{ marginBottom: 12 }}>
                  {/* Header */}
                  <button
                    onClick={() => toggleSession(session.id)}
                    className="dp-session-header"
                    aria-expanded={isOpen}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', gap: 16,
                      padding: '16px 20px', cursor: 'pointer',
                      background: isOpen ? 'rgba(40,220,202,0.08)' : 'rgba(255,255,255,0.03)',
                      border: `1px solid ${isOpen ? 'rgba(40,220,202,0.25)' : 'rgba(255,255,255,0.08)'}`,
                      borderRadius: isOpen ? '10px 10px 0 0' : 10,
                      color: 'var(--white)', textAlign: 'left',
                      transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                    }}
                  >
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--cyan), var(--pink))',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 15, fontWeight: 700, flexShrink: 0,
                    }}>
                      {session.num}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 16, fontWeight: 600 }}>{session.title}</div>
                      <div style={{ fontSize: 13, color: 'var(--grey-light)', marginTop: 2 }}>{session.goal}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
                      <span style={{ fontSize: 12, color: 'var(--cyan)', fontWeight: 600 }}>{session.duration}</span>
                      <span style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 600 }}>{session.week}</span>
                      <Chevron open={isOpen} />
                    </div>
                  </button>

                  {/* Expandable body */}
                  <div style={{
                    maxHeight: isOpen ? 2000 : 0,
                    opacity: isOpen ? 1 : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease',
                    background: 'rgba(255,255,255,0.02)',
                    border: isOpen ? '1px solid rgba(40,220,202,0.25)' : '1px solid transparent',
                    borderTop: 'none',
                    borderRadius: '0 0 10px 10px',
                  }}>
                    <div style={{ padding: '20px 24px' }}>
                      {/* Activity table */}
                      <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                          <thead>
                            <tr>
                              {['Duration', 'Activity', 'Type', 'Lead', 'Notes'].map(h => (
                                <th key={h} style={{
                                  textAlign: 'left', padding: '8px 10px',
                                  borderBottom: '1px solid rgba(255,255,255,0.1)',
                                  color: 'var(--grey-light)', fontSize: 11, fontWeight: 600,
                                  textTransform: 'uppercase', letterSpacing: '0.05em',
                                  whiteSpace: 'nowrap',
                                }}>
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {session.activities.map((a, j) => (
                              <tr key={j} style={{
                                background: a.type === 'break' ? 'rgba(255,255,255,0.02)' : 'transparent',
                                opacity: a.type === 'break' ? 0.6 : 1,
                              }}>
                                <td style={{ padding: '7px 10px', borderBottom: '1px solid rgba(255,255,255,0.04)', whiteSpace: 'nowrap', color: 'var(--grey-light)', fontSize: 12 }}>{a.dur}</td>
                                <td style={{ padding: '7px 10px', borderBottom: '1px solid rgba(255,255,255,0.04)', color: 'var(--white)' }}>{a.activity}</td>
                                <td style={{ padding: '7px 10px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}><TypeBadge type={a.type} /></td>
                                <td style={{ padding: '7px 10px', borderBottom: '1px solid rgba(255,255,255,0.04)', color: 'var(--grey-light)', fontSize: 12, whiteSpace: 'nowrap' }}>{a.facilitator}</td>
                                <td style={{ padding: '7px 10px', borderBottom: '1px solid rgba(255,255,255,0.04)', color: 'var(--grey-light)', fontSize: 12 }}>{a.notes}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Sub-sections grid */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginTop: 20 }}>
                        {session.stakeholders && (
                          <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '14px 16px' }}>
                            <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--cyan)', marginBottom: 8 }}>Stakeholders Required</div>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                              {session.stakeholders.map((s, k) => (
                                <li key={k} style={{ fontSize: 13, color: 'var(--grey-light)', padding: '3px 0', paddingLeft: 14, position: 'relative' }}>
                                  <span style={{ position: 'absolute', left: 0, top: 10, width: 5, height: 5, borderRadius: '50%', background: 'var(--cyan)' }} />
                                  {s}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {session.preparation && (
                          <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '14px 16px' }}>
                            <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--gold)', marginBottom: 8 }}>Client Preparation</div>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                              {session.preparation.map((p, k) => (
                                <li key={k} style={{ fontSize: 13, color: 'var(--grey-light)', padding: '3px 0', paddingLeft: 14, position: 'relative' }}>
                                  <span style={{ position: 'absolute', left: 0, top: 10, width: 5, height: 5, borderRadius: '50%', background: 'var(--gold)' }} />
                                  {p}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {session.outputs && (
                          <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '14px 16px' }}>
                            <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#5ef0e0', marginBottom: 8 }}>Outputs</div>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                              {session.outputs.map((o, k) => (
                                <li key={k} style={{ fontSize: 13, color: 'var(--grey-light)', padding: '3px 0', paddingLeft: 14, position: 'relative' }}>
                                  <span style={{ position: 'absolute', left: 0, top: 10, width: 5, height: 5, borderRadius: '50%', background: '#5ef0e0' }} />
                                  {o}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {session.risks && (
                          <div style={{ background: 'rgba(232,30,97,0.05)', borderRadius: 8, padding: '14px 16px' }}>
                            <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--pink)', marginBottom: 8 }}>Key Risks</div>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                              {session.risks.map((r, k) => (
                                <li key={k} style={{ fontSize: 13, color: 'var(--grey-light)', padding: '3px 0', paddingLeft: 14, position: 'relative' }}>
                                  <span style={{ position: 'absolute', left: 0, top: 10, width: 5, height: 5, borderRadius: '50%', background: 'var(--pink)' }} />
                                  {r}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </section>

        {/* ── Schedule ── */}
        <section className="section" id="dp-schedule">
          <Reveal>
            <span className="section-label">Schedule</span>
            <h2>Timeline Overview</h2>
            <p className="section-intro">
              Workshops run at <span className="hl">3-4 sessions per week</span> during weeks 1-4, reducing to 2-3 per week in weeks 5-6. Write-up runs in parallel from week 4. Final playback and sign-off targets week 7-8.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div style={{ overflowX: 'auto', marginTop: 8 }}>
              <table style={{ width: '100%', minWidth: 700, borderCollapse: 'collapse', fontSize: 13 }}>
                <thead>
                  <tr>
                    <th style={{
                      textAlign: 'left', padding: '10px 12px', minWidth: 200,
                      background: 'rgba(255,255,255,0.06)',
                      borderBottom: '2px solid rgba(255,255,255,0.1)',
                      color: 'var(--white)', fontSize: 12, fontWeight: 600,
                    }}>
                      Activity
                    </th>
                    {weekHeaders.map(w => (
                      <th key={w} style={{
                        textAlign: 'center', padding: '10px 6px',
                        background: 'rgba(255,255,255,0.06)',
                        borderBottom: '2px solid rgba(255,255,255,0.1)',
                        color: 'var(--grey-light)', fontSize: 11, fontWeight: 600,
                        minWidth: 48,
                      }}>
                        {w}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {scheduleRows.map((row, i) => (
                    <tr key={i}>
                      <td style={{
                        padding: '8px 12px',
                        borderBottom: '1px solid rgba(255,255,255,0.04)',
                        color: 'var(--white)',
                        fontWeight: row.bold ? 600 : 400,
                        fontSize: row.bold ? 13 : 12,
                      }}>
                        {row.label}
                      </td>
                      {row.weeks.map((w, j) => (
                        <td key={j} style={{
                          padding: '4px 2px',
                          borderBottom: '1px solid rgba(255,255,255,0.04)',
                          textAlign: 'center',
                        }}>
                          {w && (
                            <div style={{
                              height: 22, borderRadius: 4,
                              background: barColor(w),
                              opacity: w === 'prep' ? 0.5 : 0.85,
                            }} />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', gap: 24, marginTop: 16, flexWrap: 'wrap' }}>
              {[
                { color: 'var(--cyan)', label: 'Workshop sessions', opacity: 0.85 },
                { color: 'var(--gold)', label: 'Write-up / design', opacity: 0.85 },
                { color: 'var(--pink)', label: 'Playback / sign-off', opacity: 0.85 },
                { color: 'rgba(255,255,255,0.15)', label: 'Preparation', opacity: 1 },
              ].map(l => (
                <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--grey-light)' }}>
                  <div style={{ width: 14, height: 14, borderRadius: 3, background: l.color, opacity: l.opacity }} />
                  {l.label}
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="callout callout--gold" style={{ marginTop: 24 }}>
              <strong>Schedule notes:</strong> BRD write-up runs in parallel with later workshops from week 4 onwards. A scope playback at week 5-6 acts as a mid-point checkpoint before final sign-off. Mop-up sessions are reserved in week 6 for any topics needing deeper follow-up.
            </div>
          </Reveal>
        </section>

        {/* ── Deliverables ── */}
        <section className="section" id="dp-deliverables">
          <Reveal>
            <span className="section-label">Outputs</span>
            <h2>Key Deliverables</h2>
            <p className="section-intro">
              Discovery produces <span className="hl">5 core deliverables</span> that form the foundation for the build phase. Each is grounded in evidence from the workshop sessions, not assumptions.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="scope-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
              {deliverables.map((d, i) => (
                <div key={i} className="scope-card">
                  <div>
                    <h4>{d.title}</h4>
                    <p>{d.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ── Key Risks ── */}
        <section className="section" id="dp-risks">
          <Reveal>
            <span className="section-label">Risk Management</span>
            <h2>Key Risks & Mitigations</h2>
            <p className="section-intro">
              These are the risks identified before discovery begins. The sessions are specifically designed to <span className="hl">address and de-risk</span> each one.
            </p>
          </Reveal>

          {keyRisks.map((r, i) => (
            <Reveal key={i} delay={0.05 * (i + 1)}>
              <div style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 10, padding: '20px 24px', marginBottom: 12,
                borderLeft: '3px solid var(--pink)',
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: 'rgba(232,30,97,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, marginTop: 2,
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--pink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--white)', marginBottom: 6 }}>{r.risk}</div>
                    <p style={{ fontSize: 14, color: 'var(--grey-light)', lineHeight: 1.6, margin: 0 }}>{r.desc}</p>
                    <div style={{
                      marginTop: 12, padding: '10px 14px',
                      background: 'rgba(40,220,202,0.06)',
                      borderRadius: 6, borderLeft: '2px solid var(--cyan)',
                    }}>
                      <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--cyan)' }}>Mitigation</span>
                      <p style={{ fontSize: 13, color: 'var(--grey-light)', lineHeight: 1.6, margin: '4px 0 0' }}>{r.mitigation}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal delay={0.3}>
            <div className="callout callout--cyan" style={{ marginTop: 24 }}>
              <strong>Discovery is risk mitigation.</strong> Every session is designed to surface unknowns early, when they are cheapest to address. The alternative - discovering these risks during build - is where projects go over budget and over time.
            </div>
          </Reveal>
        </section>

      </TocLayout>

      <Footer />
    </>
  );
}
