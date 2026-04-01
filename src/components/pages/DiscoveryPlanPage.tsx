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
  date: string;
  kpsTeam: string[];
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
    duration: '2-3 hrs', date: '14 Apr',
    kpsTeam: ['Simon Holmes - Head of Technology', 'Jamie Bartlett - Shopify Practice Lead', 'Luke Hipkiss - Senior Requirements Analyst', 'Leigh Duncan - Senior Project Manager', 'Slav Pilus - Principal Developer'],
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
    stakeholders: ['Mubin Ahmed - General Director', 'Mikey Warner - Group Technology Director', 'Mark Booth - UX/UI Lead'],
    preparation: ['Current revenue and KPI data', 'Existing customer journey documentation (if any)', 'Known pain points and support ticket themes'],
    outputs: ['Success metrics framework', 'Journey maps (draft)'],
  },
  {
    id: 's2', num: 2,
    title: 'Product Model, Search & Discovery',
    goal: 'Define how customers find and explore products.',
    duration: '3-4 hrs', date: '15 Apr',
    kpsTeam: ['Simon Holmes - Head of Technology', 'Jamie Bartlett - Shopify Practice Lead', 'Luke Hipkiss - Senior Requirements Analyst', 'Leigh Duncan - Senior Project Manager', 'Slav Pilus - Principal Developer'],
    activities: [
      { dur: '15 min', activity: 'Recap Session 1 decisions; set agenda', type: 'prep', facilitator: 'PM', notes: '' },
      { dur: '35 min', activity: 'Product structure deep-dive: editions, condition, variants', type: 'workshop', facilitator: 'SA', notes: 'Explore whether variants or separate products suit the catalogue' },
      { dur: '25 min', activity: 'Author and series relationships; metadata strategy (genre, tags)', type: 'workshop', facilitator: 'SA', notes: 'How are relationships modelled today?' },
      { dur: '15 min', activity: 'Break', type: 'break', facilitator: '', notes: '' },
      { dur: '30 min', activity: 'Product data source and dataset size assessment', type: 'workshop', facilitator: 'SA', notes: 'Understand volume: how many SKUs, how often updated?' },
      { dur: '30 min', activity: 'Algolia integration on Shopify: indexing, sync, and configuration', type: 'workshop', facilitator: 'SA', notes: 'How Algolia connects to Shopify; data flow and update frequency' },
      { dur: '20 min', activity: 'Filtering, navigation structure, ranking and merchandising logic', type: 'workshop', facilitator: 'SA', notes: '' },
      { dur: '20 min', activity: 'Decision: product model structure (variants vs separate products)', type: 'decision', facilitator: 'SA', notes: '' },
      { dur: '20 min', activity: 'Decision: Algolia configuration approach and merchandising strategy', type: 'decision', facilitator: 'SA', notes: '' },
    ],
    stakeholders: ['Mubin Ahmed - General Director', 'Mikey Warner - Group Technology Director', 'Mark Booth - UX/UI Lead'],
    preparation: ['Product data export / sample', 'Current catalogue size and growth projections', 'Existing taxonomy and tagging approach'],
    outputs: ['Product data model (draft)', 'Search strategy recommendation'],
    risks: ['Inadequate product modelling limiting search and recommendations', 'Handling the size of the product dataset within platform limits'],
  },
  {
    id: 's3', num: 3,
    title: 'Promotions, Pricing & Loyalty',
    goal: 'Define commercial levers that drive revenue.',
    duration: '2.5-3 hrs', date: '16 Apr',
    kpsTeam: ['Simon Holmes - Head of Technology', 'Jamie Bartlett - Shopify Practice Lead', 'Luke Hipkiss - Senior Requirements Analyst', 'Leigh Duncan - Senior Project Manager', 'Slav Pilus - Principal Developer'],
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
    stakeholders: ['Mubin Ahmed - General Director', 'Mikey Warner - Group Technology Director', 'Mark Booth - UX/UI Lead'],
    preparation: ['List of current promotion types and rules', 'CRM setup and current automations', 'Loyalty programme details'],
    outputs: ['Promotions capability map', 'Loyalty integration approach'],
    risks: ['Over-complex promotions exceeding platform capability'],
  },
  {
    id: 's4', num: 4,
    title: 'Ways of Working',
    goal: 'Establish roles, responsibilities, and delivery approach.',
    duration: '2-3 hrs', date: 'W/C 20 Apr',
    kpsTeam: ['Simon Holmes - Head of Technology', 'Leigh Duncan - Senior Project Manager', 'Ro', 'Luke Hipkiss - Senior Requirements Analyst'],
    activities: [
      { dur: '10 min', activity: 'Recap and agenda', type: 'prep', facilitator: 'PM', notes: '' },
      { dur: '30 min', activity: 'Roles and responsibilities: marketing vs development ownership', type: 'workshop', facilitator: 'PM', notes: '' },
      { dur: '30 min', activity: 'Delivery approach: sprints, cadence, tooling', type: 'workshop', facilitator: 'PM', notes: '' },
      { dur: '15 min', activity: 'Break', type: 'break', facilitator: '', notes: '' },
      { dur: '30 min', activity: 'Communication channels, escalation paths, decision-making', type: 'workshop', facilitator: 'PM', notes: '' },
      { dur: '20 min', activity: 'Definition of done, QA process, release management', type: 'workshop', facilitator: 'PM', notes: '' },
      { dur: '15 min', activity: 'Decisions: delivery model, sprint cadence, governance', type: 'decision', facilitator: 'PM', notes: '' },
    ],
    stakeholders: ['Mubin Ahmed - General Director', 'Mikey Warner - Group Technology Director', 'Mark Booth - UX/UI Lead'],
    preparation: ['Current team structure and roles', 'Preferred tools for project management and communication', 'Any existing delivery processes or constraints'],
    outputs: ['Ways of working document', 'Delivery approach agreement'],
  },
  {
    id: 's5', num: 5,
    title: 'Personalisation, AI & CRM',
    goal: 'Define how experiences are tailored to users.',
    duration: '3 hrs', date: '28 Apr',
    kpsTeam: ['Simon Holmes - Head of Technology', 'Jamie Bartlett - Shopify Practice Lead', 'Luke Hipkiss - Senior Requirements Analyst', 'Leigh Duncan - Senior Project Manager'],
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
    stakeholders: ['Mubin Ahmed - General Director', 'Mikey Warner - Group Technology Director', 'Mark Booth - UX/UI Lead'],
    preparation: ['Current customer segmentation approach', 'Available data sources for personalisation', 'Examples of personalised experiences you admire'],
    outputs: ['Personalisation framework', 'Data requirements document'],
    risks: ['Personalisation ambition exceeding available data and tooling'],
  },
  {
    id: 's6', num: 6,
    title: 'CMS, Content & Experimentation',
    goal: 'Define how marketing teams manage and optimise content.',
    duration: '2-2.5 hrs', date: '30 Apr',
    kpsTeam: ['Simon Holmes - Head of Technology', 'Jamie Bartlett - Shopify Practice Lead', 'Luke Hipkiss - Senior Requirements Analyst', 'Leigh Duncan - Senior Project Manager'],
    activities: [
      { dur: '10 min', activity: 'Recap and agenda', type: 'prep', facilitator: 'PM', notes: '' },
      { dur: '25 min', activity: 'Page creation workflows: current process and pain points', type: 'workshop', facilitator: 'SA', notes: '' },
      { dur: '25 min', activity: 'Theme architecture: sections, blocks, metafields, and templates', type: 'workshop', facilitator: 'SA', notes: 'How to structure the Online Store 2.0 theme for flexibility' },
      { dur: '15 min', activity: 'Break', type: 'break', facilitator: '', notes: '' },
      { dur: '25 min', activity: 'Blog/editorial strategy and content types', type: 'workshop', facilitator: 'SA', notes: '' },
      { dur: '25 min', activity: 'A/B testing and experimentation: tooling evaluation', type: 'workshop', facilitator: 'SA', notes: '' },
      { dur: '15 min', activity: 'Decision: theme structure, content ownership, and editorial workflows', type: 'decision', facilitator: 'SA', notes: '' },
      { dur: '10 min', activity: 'Decision: experimentation tooling and AB Tasty integration approach', type: 'decision', facilitator: 'SA / PM', notes: '' },
    ],
    stakeholders: ['Mubin Ahmed - General Director', 'Mikey Warner - Group Technology Director', 'Mark Booth - UX/UI Lead'],
    preparation: ['Current content creation workflow and pain points', 'Examples of page types and campaign content', 'Any A/B testing or experimentation done to date'],
    outputs: ['CMS approach recommendation', 'Experimentation framework'],
  },
  {
    id: 's7', num: 7,
    title: 'Third-Party Ecosystem & Integrations',
    goal: 'Define how the platform operates within the wider commerce ecosystem.',
    duration: '3-4 hrs', date: '1 May',
    kpsTeam: ['Simon Holmes - Head of Technology', 'Jamie Bartlett - Shopify Practice Lead', 'Luke Hipkiss - Senior Requirements Analyst', 'Leigh Duncan - Senior Project Manager', 'Slav Pilus - Principal Developer'],
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
    stakeholders: ['Mubin Ahmed - General Director', 'Mikey Warner - Group Technology Director', 'Mark Booth - UX/UI Lead'],
    preparation: ['List of all third-party systems and tools in use', 'Access credentials or documentation for key integrations', 'Known integration pain points or data quality issues'],
    outputs: ['Ecosystem architecture view', 'Integration ownership model', 'High-level data flow diagrams'],
    risks: ['Fragmented architecture from unclear ownership across tools', 'Over-reliance on apps impacting performance and maintainability', 'Conflicting logic across platforms (e.g. personalisation vs promotions)'],
  },
  {
    id: 's8', num: 8,
    title: 'Architecture, ERP & Data',
    goal: 'Define the technical backbone of the platform.',
    duration: '3-4 hrs', date: '6 May',
    kpsTeam: ['Simon Holmes - Head of Technology', 'Jamie Bartlett - Shopify Practice Lead', 'Luke Hipkiss - Senior Requirements Analyst', 'Leigh Duncan - Senior Project Manager', 'Slav Pilus - Principal Developer'],
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
    stakeholders: ['Mubin Ahmed - General Director', 'Mikey Warner - Group Technology Director', 'Mark Booth - UX/UI Lead'],
    preparation: ['ERP documentation and current integration approach', 'Order lifecycle overview from basket to fulfilment', 'Analytics and tracking setup (GA4, tag manager, etc.)'],
    outputs: ['Architecture definition (draft)', 'Integration model'],
    risks: ['ERP uncertainty impacting architecture decisions', 'Over-reliance on apps creating fragmented architecture'],
  },
  {
    id: 's9', num: 9,
    title: 'Checkout & Payments Deep Dive',
    goal: 'Define the checkout experience and payment flows.',
    duration: '2-3 hrs', date: '7 May',
    kpsTeam: ['Simon Holmes - Head of Technology', 'Jamie Bartlett - Shopify Practice Lead', 'Luke Hipkiss - Senior Requirements Analyst', 'Leigh Duncan - Senior Project Manager', 'Slav Pilus - Principal Developer'],
    activities: [
      { dur: '10 min', activity: 'Recap and agenda', type: 'prep', facilitator: 'PM', notes: '' },
      { dur: '30 min', activity: 'Checkout experience: express checkout, guest vs logged-in, mobile', type: 'workshop', facilitator: 'SA', notes: '' },
      { dur: '30 min', activity: 'Payment flows: authorise vs capture, refunds, edge cases', type: 'workshop', facilitator: 'SA', notes: '' },
      { dur: '15 min', activity: 'Break', type: 'break', facilitator: '', notes: '' },
      { dur: '30 min', activity: 'Complex scenarios: split orders, pre-orders, mixed baskets', type: 'workshop', facilitator: 'SA', notes: 'Align with fulfilment and ERP approach from Session 7' },
      { dur: '10 min', activity: 'Fraud protection: Shopify Protect, Shop Pay, and any additional needs', type: 'workshop', facilitator: 'SA', notes: 'Mostly platform-handled; confirm any gaps' },
      { dur: '35 min', activity: 'Checkout performance: script audit, third-party impact, and optimisation', type: 'workshop', facilitator: 'SA', notes: 'Ensure nothing degrades Shopify Checkout conversion' },
      { dur: '20 min', activity: 'Decisions: capture strategy, complex basket handling, checkout priorities, fraud approach', type: 'decision', facilitator: 'SA / PM', notes: '' },
    ],
    stakeholders: ['Mubin Ahmed - General Director', 'Mikey Warner - Group Technology Director', 'Mark Booth - UX/UI Lead'],
    preparation: ['Current payment provider details and configuration', 'Known checkout drop-off data or conversion metrics', 'Examples of complex order scenarios (split, pre-order, mixed)'],
    outputs: ['Checkout experience specification', 'Payment flow diagrams'],
    risks: ['Poor checkout performance impacting conversion', 'Misalignment between payment flows and fulfilment/ERP', 'Inability to support complex order scenarios (split, pre-order)'],
  },
  {
    id: 's10', num: 10,
    title: 'Operating Model, MVP Scope & Playback',
    goal: 'Align on how the platform will be delivered and operated.',
    duration: '2-3 hrs', date: '12 May',
    kpsTeam: ['Simon Holmes - Head of Technology', 'Jamie Bartlett - Shopify Practice Lead', 'Luke Hipkiss - Senior Requirements Analyst', 'Leigh Duncan - Senior Project Manager', 'Slav Pilus - Principal Developer'],
    activities: [
      { dur: '15 min', activity: 'Full discovery recap: key decisions and open items', type: 'prep', facilitator: 'PM', notes: '' },
      { dur: '45 min', activity: 'MVP vs Phase 2 scope: walk through feature list line by line', type: 'decision', facilitator: 'SA / PM', notes: 'Critical session: draw the line on what ships first' },
      { dur: '15 min', activity: 'Break', type: 'break', facilitator: '', notes: '' },
      { dur: '20 min', activity: 'Key risks, open items, and mitigations review', type: 'workshop', facilitator: 'PM', notes: '' },
      { dur: '20 min', activity: 'Decision: final MVP scope, phased roadmap, and build timeline', type: 'decision', facilitator: 'SA / PM', notes: '' },
      { dur: '30 min', activity: 'Playback of all discovery findings to senior stakeholders', type: 'output', facilitator: 'SA / PM', notes: 'Formal presentation and sign-off' },
    ],
    stakeholders: ['Mubin Ahmed - General Director', 'Mikey Warner - Group Technology Director', 'Mark Booth - UX/UI Lead'],
    preparation: ['Draft feature list or wish-list for MVP', 'Internal view on team capacity and timelines', 'Any budget or deadline constraints'],
    outputs: ['Operating model', 'Final MVP scope', 'Validated discovery findings', 'Phased roadmap'],
  },
];

/* ── Schedule data ── */
interface ScheduleRow {
  label: string;
  bold?: boolean;
  weeks: ('' | 'workshop' | 'writeup' | 'playback' | 'prep')[];
  date?: string;
}

const scheduleRows: ScheduleRow[] = [
  { label: 'S1: Vision, Goals & Journeys', date: '14 Apr', weeks: ['workshop', '', '', '', '', ''] },
  { label: 'S2: Product Model & Search', date: '15 Apr', weeks: ['workshop', '', '', '', '', ''] },
  { label: 'S3: Promotions & Loyalty', date: '16 Apr', weeks: ['workshop', '', '', '', '', ''] },
  { label: 'S4: Ways of Working', date: 'W/C 20 Apr', weeks: ['', 'workshop', '', '', '', ''] },
  { label: 'S5: Personalisation & CRM', date: '28 Apr', weeks: ['', '', 'workshop', '', '', ''] },
  { label: 'S6: CMS & Content', date: '30 Apr', weeks: ['', '', 'workshop', '', '', ''] },
  { label: 'S7: Ecosystem & Integrations', date: '1 May', weeks: ['', '', 'workshop', '', '', ''] },
  { label: 'S8: Architecture & ERP', date: '6 May', weeks: ['', '', '', 'workshop', '', ''] },
  { label: 'S9: Checkout & Payments', date: '7 May', weeks: ['', '', '', 'workshop', '', ''] },
  { label: 'S10: Operating Model & MVP', date: '12 May', weeks: ['', '', '', '', 'workshop', ''] },
  { label: 'BRD Write-up', bold: true, weeks: ['', '', 'writeup', 'writeup', 'writeup', 'writeup'] },
  { label: 'Solution Design', bold: true, weeks: ['', '', '', 'writeup', 'writeup', 'writeup'] },
  { label: 'Project Estimation', bold: true, weeks: ['', '', '', '', 'writeup', 'writeup'] },
  { label: 'Scope Playback', bold: true, weeks: ['', '', '', 'playback', '', ''] },
  { label: 'Full Playback & Sign-off', bold: true, weeks: ['', '', '', '', '', 'playback'] },
];

const weekHeaders = ['w/c 13 April', 'w/c 20 April', 'w/c 27 April', 'w/c 4 May', 'w/c 11 May', 'w/c 18 May'];

/* ── Deliverables ── */
const deliverables = [
  { title: 'Business Requirements Document', desc: 'Gap analysis of current vs future state, prioritised by business impact. A focused scope for what needs to change, validated by stakeholders across all 10 sessions.' },
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
  { risk: 'Stakeholder availability', desc: 'Discovery sessions require key decision-makers. Gaps in attendance delay decisions and create rework.', mitigation: 'Pre-schedule all 10 sessions in prep week; confirm attendees; provide async decision capture for unavoidable conflicts.' },
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
        title={<>Discovery <span className="accent">Plan</span></>}
        subtitle={`A structured 6-week discovery phase for ${client.name}, covering 10 facilitated sessions from commercial vision through to MVP scope and sign-off.`}
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
        { id: 'dp-s4', label: '4. Ways of Working' },
        { id: 'dp-s5', label: '5. Personalisation' },
        { id: 'dp-s6', label: '6. CMS & Content' },
        { id: 'dp-s7', label: '7. Integrations' },
        { id: 'dp-s8', label: '8. Architecture' },
        { id: 'dp-s9', label: '9. Checkout' },
        { id: 'dp-s10', label: '10. MVP & Playback' },
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
            <h2>10 Structured Sessions</h2>
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
                    <span style={{
                      fontSize: 14, fontWeight: 700, color: 'var(--grey-light)',
                      minWidth: 24, textAlign: 'center', flexShrink: 0,
                    }}>
                      {session.num}
                    </span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 16, fontWeight: 600 }}>{session.title}</div>
                      <div style={{ fontSize: 13, color: 'var(--grey-light)', marginTop: 2 }}>{session.goal}</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
                      <span style={{ fontSize: 12, color: 'var(--cyan)', fontWeight: 600 }}>{session.duration}</span>
                      <span style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 600 }}>{session.date}</span>
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
                              {['Duration', 'Activity'].map(h => (
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
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Sub-sections grid */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, marginTop: 20 }}>
                        {session.stakeholders && (
                          <div style={{ background: 'rgba(40,220,202,0.04)', borderRadius: 8, padding: '16px 18px', border: '1px solid rgba(40,220,202,0.1)' }}>
                            <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--cyan)', marginBottom: 10, opacity: 0.8 }}>{client.shortName} Attendees</div>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                              <tbody>
                                {session.stakeholders.map((s, k) => {
                                  const parts = s.split(' - ');
                                  return (
                                    <tr key={k}>
                                      <td style={{ padding: '5px 0', borderBottom: k < session.stakeholders!.length - 1 ? '1px solid rgba(40,220,202,0.08)' : 'none', fontSize: 13, fontWeight: 600, color: 'var(--white)', whiteSpace: 'nowrap' }}>{parts[0]}</td>
                                      <td style={{ padding: '5px 0 5px 12px', borderBottom: k < session.stakeholders!.length - 1 ? '1px solid rgba(40,220,202,0.08)' : 'none', fontSize: 12, color: 'var(--grey-light)', opacity: 0.7 }}>{parts[1] || ''}</td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        )}
                        {session.kpsTeam && (
                          <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '16px 18px', border: '1px solid rgba(255,255,255,0.06)' }}>
                            <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--grey-light)', marginBottom: 10, opacity: 0.7 }}>KPS Team</div>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                              <tbody>
                                {session.kpsTeam.map((s, k) => {
                                  const parts = s.split(' - ');
                                  return (
                                    <tr key={k}>
                                      <td style={{ padding: '5px 0', borderBottom: k < session.kpsTeam.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', fontSize: 13, fontWeight: 600, color: 'var(--white)', whiteSpace: 'nowrap' }}>{parts[0]}</td>
                                      <td style={{ padding: '5px 0 5px 12px', borderBottom: k < session.kpsTeam.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', fontSize: 12, color: 'var(--grey-light)', opacity: 0.7 }}>{parts[1] || ''}</td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        )}
                        {session.preparation && (
                          <div style={{ background: 'rgba(255,180,0,0.04)', borderRadius: 8, padding: '16px 18px', border: '1px solid rgba(255,180,0,0.1)' }}>
                            <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold)', marginBottom: 10, opacity: 0.8 }}>Client Preparation</div>
                            {session.preparation.map((p, k) => (
                              <div key={k} style={{ padding: '5px 0', borderBottom: k < session.preparation!.length - 1 ? '1px solid rgba(255,180,0,0.06)' : 'none', fontSize: 13, color: 'var(--grey-light)', lineHeight: 1.5 }}>{p}</div>
                            ))}
                          </div>
                        )}
                        {session.outputs && (
                          <div style={{ background: 'rgba(94,240,224,0.04)', borderRadius: 8, padding: '16px 18px', border: '1px solid rgba(94,240,224,0.1)' }}>
                            <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#5ef0e0', marginBottom: 10, opacity: 0.8 }}>Outputs</div>
                            {session.outputs.map((o, k) => (
                              <div key={k} style={{ padding: '5px 0', borderBottom: k < session.outputs!.length - 1 ? '1px solid rgba(94,240,224,0.06)' : 'none', fontSize: 13, color: 'var(--grey-light)', lineHeight: 1.5 }}>{o}</div>
                            ))}
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
              Ten sessions across <span className="hl">six weeks</span>, front-loaded so the big decisions land early. BRD and solution design run in parallel once enough ground has been covered, and a formal playback closes the phase before build begins.
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
                              height: 24, borderRadius: 4,
                              background: barColor(w),
                              opacity: w === 'prep' ? 0.5 : 0.85,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              fontSize: 10, fontWeight: 600, color: 'rgba(0,0,0,0.7)',
                              whiteSpace: 'nowrap', padding: '0 4px',
                            }}>
                              {row.date && w === 'workshop' ? row.date : ''}
                            </div>
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
