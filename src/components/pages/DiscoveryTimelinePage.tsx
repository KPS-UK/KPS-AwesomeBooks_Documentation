'use client';

import { useState, useRef, useEffect } from 'react';
import Hero from '@/components/Hero';
import StickyNav from '@/components/StickyNav';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import { client, kps } from '@/data/client-config';

interface DiscoveryTimelinePageProps {
  navigateTo: (page: string) => void;
  goHome: () => void;
}

/* ── Session data (same as DiscoveryPlanPage) ── */
interface Activity {
  dur: string;
  activity: string;
  type: 'prep' | 'workshop' | 'decision' | 'output' | 'break';
}

interface Session {
  id: string;
  num: number;
  title: string;
  shortTitle: string;
  goal: string;
  duration: string;
  date: string;
  weekIdx: number; // 0-5 index into the 6 week columns
  kpsTeam: string[];
  activities: Activity[];
  stakeholders: string[];
  preparation: string[];
  outputs: string[];
}

const sessions: Session[] = [
  {
    id: 's1', num: 1, shortTitle: 'Vision & Goals',
    title: 'Vision, Goals & Customer Journeys',
    goal: 'Align on commercial objectives and how customers interact with the brand.',
    duration: '2-3 hrs', date: '14th Apr', weekIdx: 0,
    kpsTeam: ['Simon Holmes - Head of Technology', 'Jamie Bartlett - Shopify Practice Lead', 'Luke Hipkiss - Senior Requirements Analyst', 'Leigh Duncan - Senior Project Manager', 'Slav Pilus - Principal Developer'],
    activities: [
      { dur: '15 min', activity: 'Welcome, introductions, agenda walkthrough', type: 'prep' },
      { dur: '30 min', activity: 'Revenue targets, growth trajectory, commercial vision', type: 'workshop' },
      { dur: '30 min', activity: 'Key KPIs: conversion rate, AOV, retention targets', type: 'workshop' },
      { dur: '15 min', activity: 'Break', type: 'break' },
      { dur: '30 min', activity: 'Customer acquisition vs retention strategy discussion', type: 'workshop' },
      { dur: '30 min', activity: 'Demo key user journeys: discovery, purchase, repeat, wholesale', type: 'workshop' },
      { dur: '15 min', activity: 'Checkout performance: what % of revenue is impacted today?', type: 'decision' },
      { dur: '15 min', activity: 'Agree primary success metrics and priority journeys for MVP', type: 'decision' },
    ],
    stakeholders: ['Mubin Ahmed - General Director', 'Mikey Warner - Group Technology Director', 'Mark Booth - UX/UI Lead'],
    preparation: ['Current revenue and KPI data', 'Existing customer journey documentation (if any)', 'Known pain points and support ticket themes'],
    outputs: ['Success metrics framework', 'Journey maps (draft)'],
  },
  {
    id: 's2', num: 2, shortTitle: 'Product & Search',
    title: 'Product Model, Search & Discovery',
    goal: 'Define how customers find and explore products.',
    duration: '3-4 hrs', date: '15th Apr', weekIdx: 0,
    kpsTeam: ['Simon Holmes - Head of Technology', 'Jamie Bartlett - Shopify Practice Lead', 'Luke Hipkiss - Senior Requirements Analyst', 'Leigh Duncan - Senior Project Manager', 'Slav Pilus - Principal Developer'],
    activities: [
      { dur: '15 min', activity: 'Recap Session 1 decisions; set agenda', type: 'prep' },
      { dur: '35 min', activity: 'Product structure deep-dive: editions, condition, variants', type: 'workshop' },
      { dur: '25 min', activity: 'Author and series relationships; metadata strategy (genre, tags)', type: 'workshop' },
      { dur: '15 min', activity: 'Break', type: 'break' },
      { dur: '30 min', activity: 'Product data source and dataset size assessment', type: 'workshop' },
      { dur: '30 min', activity: 'Algolia integration on Shopify: indexing, sync, and configuration', type: 'workshop' },
      { dur: '20 min', activity: 'Filtering, navigation structure, ranking and merchandising logic', type: 'workshop' },
      { dur: '20 min', activity: 'Decision: product model structure (variants vs separate products)', type: 'decision' },
      { dur: '20 min', activity: 'Decision: Algolia configuration approach and merchandising strategy', type: 'decision' },
    ],
    stakeholders: ['Mubin Ahmed - General Director', 'Mikey Warner - Group Technology Director', 'Mark Booth - UX/UI Lead'],
    preparation: ['Product data export / sample', 'Current catalogue size and growth projections', 'Existing taxonomy and tagging approach'],
    outputs: ['Product data model (draft)', 'Search strategy recommendation'],
  },
  {
    id: 's3', num: 3, shortTitle: 'Promotions',
    title: 'Promotions, Pricing & Loyalty',
    goal: 'Define commercial levers that drive revenue.',
    duration: '2.5-3 hrs', date: '16th Apr', weekIdx: 0,
    kpsTeam: ['Simon Holmes - Head of Technology', 'Jamie Bartlett - Shopify Practice Lead', 'Luke Hipkiss - Senior Requirements Analyst', 'Leigh Duncan - Senior Project Manager', 'Slav Pilus - Principal Developer'],
    activities: [
      { dur: '10 min', activity: 'Recap and agenda', type: 'prep' },
      { dur: '30 min', activity: 'Promotion types: bundles, series-based, cohort-based', type: 'workshop' },
      { dur: '25 min', activity: 'Discount rules, stacking behaviour, time-based campaigns', type: 'workshop' },
      { dur: '15 min', activity: 'Break', type: 'break' },
      { dur: '25 min', activity: 'Email-triggered discounts and CRM integration', type: 'workshop' },
      { dur: '20 min', activity: 'Loyalty programme: current state and platform options', type: 'workshop' },
      { dur: '15 min', activity: 'Wholesale vs D2C pricing differences', type: 'workshop' },
      { dur: '10 min', activity: 'Decisions: MVP promotion types, complexity limits, native vs app', type: 'decision' },
    ],
    stakeholders: ['Mubin Ahmed - General Director', 'Mikey Warner - Group Technology Director', 'Mark Booth - UX/UI Lead'],
    preparation: ['List of current promotion types and rules', 'CRM setup and current automations', 'Loyalty programme details'],
    outputs: ['Promotions capability map', 'Loyalty integration approach'],
  },
  {
    id: 's4', num: 4, shortTitle: 'Ways of Working',
    title: 'Ways of Working',
    goal: 'Establish roles, responsibilities, and delivery approach.',
    duration: '2-3 hrs', date: 'W/C 20th Apr', weekIdx: 1,
    kpsTeam: ['Simon Holmes - Head of Technology', 'Rowena Bellamy - Head of Commerce Projects', 'Leigh Duncan - Senior Project Manager', 'Luke Hipkiss - Senior Requirements Analyst'],
    activities: [
      { dur: '10 min', activity: 'Recap and agenda', type: 'prep' },
      { dur: '30 min', activity: 'Roles and responsibilities: marketing vs development ownership', type: 'workshop' },
      { dur: '30 min', activity: 'Delivery approach: sprints, cadence, tooling', type: 'workshop' },
      { dur: '15 min', activity: 'Break', type: 'break' },
      { dur: '30 min', activity: 'Communication channels, escalation paths, decision-making', type: 'workshop' },
      { dur: '20 min', activity: 'Definition of done, QA process, release management', type: 'workshop' },
      { dur: '15 min', activity: 'Decisions: delivery model, sprint cadence, governance', type: 'decision' },
    ],
    stakeholders: ['Mubin Ahmed - General Director', 'Mikey Warner - Group Technology Director', 'Mark Booth - UX/UI Lead'],
    preparation: ['Current team structure and roles', 'Preferred tools for project management and communication', 'Any existing delivery processes or constraints'],
    outputs: ['Ways of working document', 'Delivery approach agreement'],
  },
  {
    id: 's5', num: 5, shortTitle: 'Personalisation',
    title: 'Personalisation, AI & CRM',
    goal: 'Define how experiences are tailored to users.',
    duration: '3 hrs', date: '28th Apr', weekIdx: 2,
    kpsTeam: ['Simon Holmes - Head of Technology', 'Jamie Bartlett - Shopify Practice Lead', 'Luke Hipkiss - Senior Requirements Analyst', 'Leigh Duncan - Senior Project Manager'],
    activities: [
      { dur: '10 min', activity: 'Recap and agenda', type: 'prep' },
      { dur: '25 min', activity: 'Segmentation strategy: cohorts, behavioural triggers', type: 'workshop' },
      { dur: '25 min', activity: 'Personalised homepage and content: ambition vs reality', type: 'workshop' },
      { dur: '15 min', activity: 'Break', type: 'break' },
      { dur: '25 min', activity: 'Product recommendations: by author, series, genre, behaviour', type: 'workshop' },
      { dur: '20 min', activity: 'Role of AI chatbot; CRM tool integration', type: 'workshop' },
      { dur: '15 min', activity: 'Decision: personalisation ownership (tools vs custom)', type: 'decision' },
      { dur: '15 min', activity: 'Decision: MVP vs future-state scope; data sources for segmentation', type: 'decision' },
    ],
    stakeholders: ['Mubin Ahmed - General Director', 'Mikey Warner - Group Technology Director', 'Mark Booth - UX/UI Lead'],
    preparation: ['Current customer segmentation approach', 'Available data sources for personalisation', 'Examples of personalised experiences you admire'],
    outputs: ['Personalisation framework', 'Data requirements document'],
  },
  {
    id: 's6', num: 6, shortTitle: 'CMS & Content',
    title: 'CMS, Content & Experimentation',
    goal: 'Define how marketing teams manage and optimise content.',
    duration: '2-2.5 hrs', date: '30th Apr', weekIdx: 2,
    kpsTeam: ['Simon Holmes - Head of Technology', 'Jamie Bartlett - Shopify Practice Lead', 'Luke Hipkiss - Senior Requirements Analyst', 'Leigh Duncan - Senior Project Manager'],
    activities: [
      { dur: '10 min', activity: 'Recap and agenda', type: 'prep' },
      { dur: '25 min', activity: 'Page creation workflows: current process and pain points', type: 'workshop' },
      { dur: '25 min', activity: 'Theme architecture: sections, blocks, metafields, and templates', type: 'workshop' },
      { dur: '15 min', activity: 'Break', type: 'break' },
      { dur: '25 min', activity: 'Blog/editorial strategy and content types', type: 'workshop' },
      { dur: '25 min', activity: 'A/B testing and experimentation: tooling evaluation', type: 'workshop' },
      { dur: '15 min', activity: 'Decision: theme structure, content ownership, and editorial workflows', type: 'decision' },
      { dur: '10 min', activity: 'Decision: experimentation tooling and AB Tasty integration approach', type: 'decision' },
    ],
    stakeholders: ['Mubin Ahmed - General Director', 'Mikey Warner - Group Technology Director', 'Mark Booth - UX/UI Lead'],
    preparation: ['Current content creation workflow and pain points', 'Examples of page types and campaign content', 'Any A/B testing or experimentation done to date'],
    outputs: ['CMS approach recommendation', 'Experimentation framework'],
  },
  {
    id: 's7', num: 7, shortTitle: 'Integrations',
    title: 'Third-Party Ecosystem & Integrations',
    goal: 'Define how the platform operates within the wider commerce ecosystem.',
    duration: '3-4 hrs', date: '1st May', weekIdx: 2,
    kpsTeam: ['Simon Holmes - Head of Technology', 'Jamie Bartlett - Shopify Practice Lead', 'Luke Hipkiss - Senior Requirements Analyst', 'Leigh Duncan - Senior Project Manager', 'Slav Pilus - Principal Developer'],
    activities: [
      { dur: '10 min', activity: 'Recap and agenda', type: 'prep' },
      { dur: '35 min', activity: 'Full ecosystem mapping: platform + all third-party systems', type: 'workshop' },
      { dur: '30 min', activity: 'Integration patterns per system: API, event-driven, middleware', type: 'workshop' },
      { dur: '15 min', activity: 'Break', type: 'break' },
      { dur: '30 min', activity: 'Real-time vs batch decisions per integration', type: 'workshop' },
      { dur: '30 min', activity: 'Ownership of business logic: platform vs external systems', type: 'workshop' },
      { dur: '20 min', activity: 'Data flows between systems; performance impact of scripts/apps', type: 'workshop' },
      { dur: '20 min', activity: 'Decision: system ownership per capability', type: 'decision' },
      { dur: '20 min', activity: 'Decision: integration approach per platform; acceptable app reliance', type: 'decision' },
    ],
    stakeholders: ['Mubin Ahmed - General Director', 'Mikey Warner - Group Technology Director', 'Mark Booth - UX/UI Lead'],
    preparation: ['List of all third-party systems and tools in use', 'Access credentials or documentation for key integrations', 'Known integration pain points or data quality issues'],
    outputs: ['Ecosystem architecture view', 'Integration ownership model', 'High-level data flow diagrams'],
  },
  {
    id: 's8', num: 8, shortTitle: 'Architecture',
    title: 'Architecture, ERP & Data',
    goal: 'Define the technical backbone of the platform.',
    duration: '3-4 hrs', date: '6th May', weekIdx: 3,
    kpsTeam: ['Simon Holmes - Head of Technology', 'Jamie Bartlett - Shopify Practice Lead', 'Luke Hipkiss - Senior Requirements Analyst', 'Leigh Duncan - Senior Project Manager', 'Slav Pilus - Principal Developer'],
    activities: [
      { dur: '10 min', activity: 'Recap and agenda', type: 'prep' },
      { dur: '30 min', activity: 'Order lifecycle walkthrough: end-to-end', type: 'workshop' },
      { dur: '30 min', activity: 'Inventory ownership and pricing: where does truth live?', type: 'workshop' },
      { dur: '15 min', activity: 'Break', type: 'break' },
      { dur: '35 min', activity: 'ERP integration approach: current state and target', type: 'workshop' },
      { dur: '30 min', activity: 'Data flows, analytics, and tracking strategy', type: 'workshop' },
      { dur: '20 min', activity: 'Integration patterns: real-time vs batch, middleware needs', type: 'workshop' },
      { dur: '20 min', activity: 'Decision: system ownership of orders, inventory, pricing', type: 'decision' },
      { dur: '20 min', activity: 'Decision: integration architecture; core vs app-based capabilities', type: 'decision' },
    ],
    stakeholders: ['Mubin Ahmed - General Director', 'Mikey Warner - Group Technology Director', 'Mark Booth - UX/UI Lead'],
    preparation: ['ERP documentation and current integration approach', 'Order lifecycle overview from basket to fulfilment', 'Analytics and tracking setup (GA4, tag manager, etc.)'],
    outputs: ['Architecture definition (draft)', 'Integration model'],
  },
  {
    id: 's9', num: 9, shortTitle: 'Checkout',
    title: 'Checkout & Payments Deep Dive',
    goal: 'Define the checkout experience and payment flows.',
    duration: '2-3 hrs', date: '7th May', weekIdx: 3,
    kpsTeam: ['Simon Holmes - Head of Technology', 'Jamie Bartlett - Shopify Practice Lead', 'Luke Hipkiss - Senior Requirements Analyst', 'Leigh Duncan - Senior Project Manager', 'Slav Pilus - Principal Developer'],
    activities: [
      { dur: '10 min', activity: 'Recap and agenda', type: 'prep' },
      { dur: '30 min', activity: 'Checkout experience: express checkout, guest vs logged-in, mobile', type: 'workshop' },
      { dur: '30 min', activity: 'Payment flows: authorise vs capture, refunds, edge cases', type: 'workshop' },
      { dur: '15 min', activity: 'Break', type: 'break' },
      { dur: '30 min', activity: 'Complex scenarios: split orders, pre-orders, mixed baskets', type: 'workshop' },
      { dur: '10 min', activity: 'Fraud protection: Shopify Protect, Shop Pay, and any additional needs', type: 'workshop' },
      { dur: '35 min', activity: 'Checkout performance: script audit, third-party impact, and optimisation', type: 'workshop' },
      { dur: '20 min', activity: 'Decisions: capture strategy, complex basket handling, checkout priorities, fraud approach', type: 'decision' },
    ],
    stakeholders: ['Mubin Ahmed - General Director', 'Mikey Warner - Group Technology Director', 'Mark Booth - UX/UI Lead'],
    preparation: ['Current payment provider details and configuration', 'Known checkout drop-off data or conversion metrics', 'Examples of complex order scenarios (split, pre-order, mixed)'],
    outputs: ['Checkout experience specification', 'Payment flow diagrams'],
  },
  {
    id: 's10', num: 10, shortTitle: 'MVP & Playback',
    title: 'Operating Model, MVP Scope & Playback',
    goal: 'Align on how the platform will be delivered and operated.',
    duration: '2-3 hrs', date: '12th May', weekIdx: 4,
    kpsTeam: ['Simon Holmes - Head of Technology', 'Jamie Bartlett - Shopify Practice Lead', 'Luke Hipkiss - Senior Requirements Analyst', 'Leigh Duncan - Senior Project Manager', 'Slav Pilus - Principal Developer'],
    activities: [
      { dur: '15 min', activity: 'Full discovery recap: key decisions and open items', type: 'prep' },
      { dur: '45 min', activity: 'MVP vs Phase 2 scope: walk through feature list line by line', type: 'decision' },
      { dur: '15 min', activity: 'Break', type: 'break' },
      { dur: '20 min', activity: 'Key risks, open items, and mitigations review', type: 'workshop' },
      { dur: '20 min', activity: 'Decision: final MVP scope, phased roadmap, and build timeline', type: 'decision' },
      { dur: '30 min', activity: 'Playback of all discovery findings to senior stakeholders', type: 'output' },
    ],
    stakeholders: ['Mubin Ahmed - General Director', 'Mikey Warner - Group Technology Director', 'Mark Booth - UX/UI Lead'],
    preparation: ['Draft feature list or wish-list for MVP', 'Internal view on team capacity and timelines', 'Any budget or deadline constraints'],
    outputs: ['Operating model', 'Final MVP scope', 'Validated discovery findings', 'Phased roadmap'],
  },
];

/* ── Parallel workstreams (span multiple weeks) ── */
interface Workstream {
  id: string;
  label: string;
  startWeek: number;
  endWeek: number;
  type: 'writeup' | 'playback';
  date?: string;
  summary: string;
  details: { heading: string; color: string; items: string[] }[];
}

const workstreams: Workstream[] = [
  {
    id: 'brd', label: 'BRD Write-up', startWeek: 2, endWeek: 5, type: 'writeup',
    summary: 'Distilling workshop outputs into a structured Business Requirements Document that captures what needs to change, why, and what the target state looks like.',
    details: [
      { heading: 'What we produce', color: 'var(--gold)', items: ['Gap analysis: current state vs target state', 'Prioritised requirements by business impact', 'Functional and non-functional requirements', 'Acceptance criteria for MVP features', 'Requirements traceability back to workshop decisions'] },
      { heading: 'How we work', color: 'var(--cyan)', items: ['Written in parallel with workshops from week 3', 'Shared incrementally for review, not as a big-bang document', 'Each session\'s decisions are captured within 48 hours', 'Client review and feedback built into the schedule'] },
    ],
  },
  {
    id: 'solution', label: 'Solution Design', startWeek: 3, endWeek: 5, type: 'writeup',
    summary: 'Translating requirements into a concrete technical architecture: how the Shopify store, integrations, data flows, and third-party systems fit together.',
    details: [
      { heading: 'What we produce', color: 'var(--gold)', items: ['Target architecture diagram', 'Integration catalogue with patterns per system', 'Data model and flow documentation', 'Technology recommendations with rationale', 'Theme architecture and component structure'] },
      { heading: 'How we work', color: 'var(--cyan)', items: ['Architecture decisions validated against workshop findings', 'Design reviews with the KPS technical team', 'Shopify-specific patterns and best practices applied throughout', 'Aligned with the BRD to ensure full traceability'] },
    ],
  },
  {
    id: 'estimation', label: 'Project Estimation', startWeek: 4, endWeek: 5, type: 'writeup',
    summary: 'Building a costed, phased delivery plan with clear timelines, dependencies, and resource requirements for the build phase.',
    details: [
      { heading: 'What we produce', color: 'var(--gold)', items: ['Detailed effort estimates per workstream', 'Phased delivery plan with sprint breakdown', 'Resource plan and team structure', 'Dependency map and critical path', 'Risk-adjusted timeline with contingency'] },
      { heading: 'How we work', color: 'var(--cyan)', items: ['Estimates grounded in BRD and solution design outputs', 'Based on KPS delivery experience with similar Shopify projects', 'Fixed-price commitment for the build phase', 'Transparent breakdown so nothing is hidden'] },
    ],
  },
  {
    id: 'playback', label: 'Full Playback & Sign-off', startWeek: 5, endWeek: 5, type: 'playback', date: '21st May',
    summary: 'A formal presentation to senior stakeholders summarising everything discovered, decided, and designed across the 10 sessions. This is the gate to the build phase.',
    details: [
      { heading: 'Agenda', color: 'var(--pink)', items: ['Recap of all key decisions from Sessions 1-10', 'Walkthrough of BRD and solution architecture', 'MVP scope and phased roadmap presentation', 'Integration model and data flow overview', 'Cost and timeline summary', 'Open items and risk register review', 'Formal approval to proceed to build'] },
      { heading: `What KPS expects from ${client.shortName}`, color: 'var(--cyan)', items: ['Senior decision-makers in the room (Mubin, Mikey, Mark)', 'Authority to approve MVP scope and sign off on build phase', 'Any outstanding data, access, or documentation provided before the session', 'Commitment to the delivery timeline and ways of working agreed in Session 4', 'Readiness to mobilise internal resources for the build phase'] },
    ],
  },
];

const weekHeaders = ['w/c 13 April', 'w/c 20 April', 'w/c 27 April', 'w/c 4 May', 'w/c 11 May', 'w/c 18 May'];

/* ── Deliverables ── */
interface Deliverable {
  id: string;
  title: string;
  desc: string;
  feedingSessions: number[]; // session nums that feed into this deliverable
  contents: string[];
  color: string;
}

const deliverables: Deliverable[] = [
  {
    id: 'brd', title: 'Business Requirements Document', color: 'var(--gold)',
    desc: 'Gap analysis of current vs future state, prioritised by business impact. A focused scope for what needs to change, validated by stakeholders across all 10 sessions.',
    feedingSessions: [1, 2, 3, 5, 6, 7, 8, 9],
    contents: ['Prioritised functional requirements', 'Non-functional requirements (performance, security, accessibility)', 'Current state vs target state gap analysis', 'Acceptance criteria per feature area', 'Traceability matrix back to workshop decisions'],
  },
  {
    id: 'architecture', title: 'Solution Architecture', color: 'var(--cyan)',
    desc: 'Target architecture, integration patterns, and technology recommendations grounded in evidence and trade-off analysis.',
    feedingSessions: [2, 7, 8, 9],
    contents: ['Target architecture diagram', 'Shopify theme architecture (sections, blocks, metafields)', 'Integration patterns per third-party system', 'Data model and entity relationships', 'Technology decision log with rationale'],
  },
  {
    id: 'integrations', title: 'Integration Catalogue', color: '#5ef0e0',
    desc: 'Complete mapping of every third-party system, data flow, ownership model, and integration pattern.',
    feedingSessions: [7, 8],
    contents: ['System-by-system integration spec (Algolia, Klaviyo, AB Tasty, ERP, etc.)', 'Data flow diagrams per integration', 'Ownership model: which system is master for each data entity', 'Real-time vs batch classification per integration', 'API contract expectations and error handling'],
  },
  {
    id: 'mvp', title: 'MVP Scope & Phased Roadmap', color: 'var(--pink)',
    desc: 'A clear line between what ships first and what comes later. Costed, sequenced, with dependencies mapped and risks quantified.',
    feedingSessions: [1, 3, 5, 10],
    contents: ['MVP feature list prioritised using MoSCoW', 'Phase 2 backlog with priority ranking', 'Sprint-level delivery plan', 'Dependency map and critical path', 'Risk-adjusted cost estimate (fixed price)'],
  },
  {
    id: 'opmodel', title: 'Operating Model', color: 'var(--gold)',
    desc: 'Roles, responsibilities, release processes, and governance. How the platform will be built, maintained, and evolved after launch.',
    feedingSessions: [4, 10],
    contents: ['RACI for build and run phases', 'Release and deployment process', 'Sprint cadence and ceremony schedule', 'Escalation paths and decision-making framework', 'Transition plan from KPS delivery to BAU'],
  },
];

/* ── Key risks ── */
interface KeyRisk {
  id: string;
  risk: string;
  desc: string;
  addressedInSessions: number[];
  mitigations: string[];
}

const keyRisks: KeyRisk[] = [
  {
    id: 'erp', risk: 'ERP integration uncertainty',
    desc: 'Current ERP landscape is evolving. Architecture decisions depend on understanding where inventory, pricing, and order truth lives.',
    addressedInSessions: [7, 8],
    mitigations: ['Dedicated Session 8 deep-dive on ERP integration', 'Require ERP documentation before the session', 'Design for abstraction at the integration layer', 'Identify fallback patterns if ERP landscape changes'],
  },
  {
    id: 'product', risk: 'Product data complexity',
    desc: 'Large catalogue with complex relationships (editions, authors, series) may exceed platform-native limits or require external tooling.',
    addressedInSessions: [2],
    mitigations: ['Session 2 product data assessment with real data samples', 'Early prototype of Shopify data model', 'Algolia configuration validated against dataset size', 'Decision captured before build phase begins'],
  },
  {
    id: 'personalisation', risk: 'Scope creep in personalisation',
    desc: 'Ambition for personalised experiences may outstrip available data, tooling, and team capacity.',
    addressedInSessions: [5, 10],
    mitigations: ['Session 5 explicitly separates MVP from future-state', 'Decisions captured and signed off before build', 'MoSCoW applied to personalisation features in Session 10', 'Tooling decisions (Nosto, Rebuy, native) grounded in real data'],
  },
  {
    id: 'stakeholders', risk: 'Stakeholder availability',
    desc: 'Discovery sessions require key decision-makers. Gaps in attendance delay decisions and create rework.',
    addressedInSessions: [1, 4],
    mitigations: ['All 10 sessions pre-scheduled in prep week', 'Attendee confirmation before each session', 'Async decision capture for unavoidable conflicts', 'Ways of working session (S4) establishes governance and escalation'],
  },
];

/* ── Helpers ── */
function getSessionsInWeek(weekIdx: number) {
  return sessions.filter(s => s.weekIdx === weekIdx);
}

// Determine "current week" based on today's date
function getCurrentWeekIdx(): number {
  const weekStarts = [
    new Date(2026, 3, 13), // w/c 13 Apr
    new Date(2026, 3, 20),
    new Date(2026, 3, 27),
    new Date(2026, 4, 4),
    new Date(2026, 4, 11),
    new Date(2026, 4, 18),
  ];
  const today = new Date();
  for (let i = weekStarts.length - 1; i >= 0; i--) {
    if (today >= weekStarts[i]) return i;
  }
  return -1; // before discovery starts
}

/* ── Main component ── */
export default function DiscoveryTimelinePage({ navigateTo, goHome }: DiscoveryTimelinePageProps) {
  const [activeSession, setActiveSession] = useState<string | null>(null);
  const [hoveredWeek, setHoveredWeek] = useState<number | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [activeWorkstream, setActiveWorkstream] = useState<string | null>(null);
  const [activeDeliverable, setActiveDeliverable] = useState<string | null>(null);
  const [activeRisk, setActiveRisk] = useState<string | null>(null);
  const highlightedSessions = activeDeliverable
    ? (deliverables.find(d => d.id === activeDeliverable)?.feedingSessions ?? [])
    : activeRisk
    ? (keyRisks.find(r => r.id === activeRisk)?.addressedInSessions ?? [])
    : [];
  const detailRef = useRef<HTMLDivElement>(null);
  const currentWeekIdx = getCurrentWeekIdx();

  const toggleSession = (id: string) => {
    setHasInteracted(true);
    setActiveWorkstream(null);
    setActiveSession(prev => prev === id ? null : id);
  };

  // Scroll detail into view when expanded
  useEffect(() => {
    if ((activeSession || activeWorkstream) && detailRef.current) {
      setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  }, [activeSession, activeWorkstream]);

  const activeData = activeSession ? sessions.find(s => s.id === activeSession) : null;
  const activeWsData = activeWorkstream ? workstreams.find(w => w.id === activeWorkstream) : null;
  const showDetail = activeData || activeWsData;

  return (
    <>
      <Hero title={<>Discovery <span className="accent">Timeline</span></>} subtitle="" />

      <StickyNav
        logoText={<>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={kps.logoUrl} alt="KPS" style={{ height: 22 }} /> <span>Discovery Timeline</span>
        </>}
        onHome={goHome}
      />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 32px 0' }}>

        {/* ── Intro ── */}
        <Reveal>
          <div style={{ fontSize: 17, color: 'var(--grey-light)', lineHeight: 1.75, marginBottom: 48 }}>
            <p>
              KPS and {client.shortName} are running a focused <span className="hl">6-week discovery phase</span> before build begins. Across 10 structured sessions, we will work through commercial goals, product data, integrations, checkout, and MVP scope to produce a validated set of requirements, a costed delivery plan, and a clear architecture.
            </p>
            <p style={{ marginTop: 12 }}>
              The output is a <span className="hl">fixed-price build commitment</span> with no surprises.
            </p>
            <p style={{ marginTop: 12, color: 'var(--cyan)' }}>
              Click any session below to see what we will cover.
            </p>
          </div>
        </Reveal>

        {/* ── INTERACTIVE TIMELINE ── */}
        <Reveal delay={0.1}>
          <div style={{ overflowX: 'auto', paddingBottom: 8 }}>
            <div style={{ minWidth: 900 }}>

              {/* Week headers */}
              <div style={{ display: 'grid', gridTemplateColumns: '180px repeat(6, 1fr)', gap: 0 }}>
                <div />
                {weekHeaders.map((wh, i) => (
                  <div
                    key={i}
                    onMouseEnter={() => setHoveredWeek(i)}
                    onMouseLeave={() => setHoveredWeek(null)}
                    style={{
                      padding: '12px 8px',
                      textAlign: 'center',
                      fontSize: 13,
                      fontWeight: 700,
                      letterSpacing: '0.02em',
                      color: currentWeekIdx === i ? 'var(--cyan)' : 'var(--grey-light)',
                      borderBottom: `2px solid ${currentWeekIdx === i ? 'var(--cyan)' : 'rgba(255,255,255,0.08)'}`,
                      background: hoveredWeek === i ? 'rgba(40,220,202,0.04)' : 'transparent',
                      transition: 'all 0.2s',
                      position: 'relative',
                    }}
                  >
                    {wh}
                    {currentWeekIdx === i && (
                      <div style={{
                        position: 'absolute', bottom: -2, left: '50%', transform: 'translateX(-50)',
                        width: 6, height: 6, borderRadius: '50%', background: 'var(--cyan)',
                      }} />
                    )}
                  </div>
                ))}
              </div>

              {/* Session rows - one row per session */}
              <div style={{ display: 'grid', gridTemplateColumns: '180px repeat(6, 1fr)', gap: 0 }}>
                {/* Row label column + week cells for each session */}
                {sessions.map((session) => {
                  const isActive = activeSession === session.id;
                  const isHighlighted = highlightedSessions.includes(session.num);
                  return (
                    <div key={session.id} style={{ display: 'contents' }}>
                      {/* Label */}
                      <div style={{
                        padding: '8px 10px 8px 0',
                        fontSize: 14,
                        color: isActive ? 'var(--white)' : isHighlighted ? 'var(--cyan)' : 'var(--grey-light)',
                        fontWeight: isActive || isHighlighted ? 600 : 500,
                        display: 'flex', alignItems: 'center',
                        borderBottom: '1px solid rgba(255,255,255,0.04)',
                        transition: 'color 0.2s',
                        whiteSpace: 'nowrap',
                      }}>
                        <span style={{ color: 'var(--cyan)', opacity: 0.6, marginRight: 8, fontSize: 12, fontWeight: 700 }}>{session.num}</span>
                        {session.shortTitle}
                      </div>
                      {/* Week cells */}
                      {weekHeaders.map((_, weekIdx) => {
                        const isSessionWeek = session.weekIdx === weekIdx;
                        return (
                          <div
                            key={weekIdx}
                            onMouseEnter={() => setHoveredWeek(weekIdx)}
                            onMouseLeave={() => setHoveredWeek(null)}
                            style={{
                              padding: '6px 4px',
                              borderBottom: '1px solid rgba(255,255,255,0.04)',
                              background: hoveredWeek === weekIdx ? 'rgba(40,220,202,0.03)' : 'transparent',
                              transition: 'background 0.2s',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}
                          >
                            {isSessionWeek && (
                              <button
                                onClick={() => toggleSession(session.id)}
                                style={{
                                  width: '100%',
                                  padding: session.num === 1 && !hasInteracted ? '10px 10px' : '8px 10px',
                                  borderRadius: 6,
                                  border: isActive || isHighlighted ? '1px solid var(--cyan)' : session.num === 1 && !hasInteracted ? '1px solid var(--cyan)' : '1px solid rgba(40,220,202,0.3)',
                                  background: isActive
                                    ? 'linear-gradient(135deg, rgba(40,220,202,0.25), rgba(40,220,202,0.1))'
                                    : isHighlighted ? 'rgba(40,220,202,0.25)'
                                    : session.num === 1 && !hasInteracted ? 'var(--cyan)' : 'rgba(40,220,202,0.12)',
                                  color: session.num === 1 && !hasInteracted ? 'var(--navy)' : 'var(--white)',
                                  cursor: 'pointer',
                                  fontSize: 11,
                                  fontWeight: 700,
                                  textAlign: 'center',
                                  transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
                                  boxShadow: isActive || isHighlighted ? '0 0 20px rgba(40,220,202,0.15)' : session.num === 1 && !hasInteracted ? '0 0 16px rgba(40,220,202,0.2)' : 'none',
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  animation: session.num === 1 && !hasInteracted ? 'sessionBounce 2s ease-in-out infinite' : 'none',
                                }}
                                onMouseEnter={e => {
                                  if (!isActive && !(session.num === 1 && !hasInteracted)) {
                                    e.currentTarget.style.background = 'rgba(40,220,202,0.2)';
                                  }
                                }}
                                onMouseLeave={e => {
                                  if (!isActive) {
                                    const isBouncing = session.num === 1 && !hasInteracted;
                                    e.currentTarget.style.background = isBouncing ? 'var(--cyan)' : isHighlighted ? 'rgba(40,220,202,0.25)' : 'rgba(40,220,202,0.12)';
                                  }
                                }}
                              >
                                <div>{session.date}</div>
                                <style>{`@keyframes sessionBounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(6px); } }`}</style>
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>

              {/* Workstream bars */}
              <div style={{ marginTop: 8, display: 'grid', gridTemplateColumns: '180px repeat(6, 1fr)', gap: 0 }}>
                {workstreams.map((ws, wsIdx) => {
                  const isPlayback = ws.type === 'playback';
                  const isWsActive = activeWorkstream === ws.id;
                  const barColor = ws.type === 'writeup' ? 'var(--gold)' : 'var(--pink)';
                  // Add gap before playback (after Project Estimation which is index 2)
                  const showGapBefore = isPlayback;
                  return (
                  <div key={ws.id} style={{ display: 'contents' }}>
                    {showGapBefore && <>
                      <div style={{ height: 8 }} />
                      {weekHeaders.map((_, gi) => <div key={`gap-${gi}`} style={{ height: 8 }} />)}
                    </>}
                    <div
                      onClick={() => { setActiveSession(null); setActiveWorkstream(prev => prev === ws.id ? null : ws.id); }}
                      style={{
                        padding: isPlayback ? '10px 10px 10px 0' : '6px 10px 6px 0',
                        fontSize: isPlayback ? 14 : 13,
                        color: barColor,
                        fontWeight: 600, display: 'flex', alignItems: 'center',
                        borderBottom: '1px solid rgba(255,255,255,0.03)',
                        whiteSpace: 'nowrap',
                        cursor: 'pointer',
                        transition: 'color 0.2s',
                      }}
                    >
                      {ws.label}
                    </div>
                    {weekHeaders.map((_, weekIdx) => {
                      const inRange = weekIdx >= ws.startWeek && weekIdx <= ws.endWeek;
                      const isStart = weekIdx === ws.startWeek;
                      const isEnd = weekIdx === ws.endWeek;
                      return (
                        <div
                          key={weekIdx}
                          onMouseEnter={() => setHoveredWeek(weekIdx)}
                          onMouseLeave={() => setHoveredWeek(null)}
                          style={{
                            padding: '5px 2px',
                            borderBottom: '1px solid rgba(255,255,255,0.03)',
                            background: hoveredWeek === weekIdx ? 'rgba(40,220,202,0.03)' : 'transparent',
                            transition: 'background 0.2s',
                            display: 'flex', alignItems: 'center',
                          }}
                        >
                          {inRange && (
                            <div
                              onClick={() => { setActiveSession(null); setActiveWorkstream(prev => prev === ws.id ? null : ws.id); }}
                              style={{
                                width: '100%', height: isPlayback ? 36 : 24,
                                background: isPlayback ? barColor : 'rgba(255,180,0,0.1)',
                                borderRadius: `${isStart ? 4 : 0}px ${isEnd ? 4 : 0}px ${isEnd ? 4 : 0}px ${isStart ? 4 : 0}px`,
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                border: isPlayback ? 'none' : `1.5px solid ${barColor}`,
                                borderLeftWidth: isPlayback ? '0' : isStart ? '1.5px' : '0',
                                borderRightWidth: isPlayback ? '0' : isEnd ? '1.5px' : '0',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: isPlayback ? 14 : 10,
                                fontWeight: 700,
                                color: isPlayback ? 'var(--white)' : barColor,
                                opacity: isWsActive ? 1 : 0.7,
                              }}
                            >
                              {ws.date && isStart ? ws.date : ''}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  );
                })}
              </div>

              {/* Workstream detail panel removed - renders in shared detail area below */}

              {/* Legend */}
              <div style={{ display: 'flex', gap: 24, marginTop: 16, flexWrap: 'wrap' }}>
                {[
                  { color: 'var(--cyan)', label: 'Workshop sessions' },
                  { color: 'var(--gold)', label: 'Write-up / design' },
                  { color: 'var(--pink)', label: 'Playback / sign-off' },
                ].map(l => (
                  <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--grey-light)' }}>
                    <div style={{ width: 14, height: 14, borderRadius: 3, background: l.color, opacity: 0.75 }} />
                    {l.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        {/* ── EXPANDED DETAIL (sessions + workstreams) ── */}
        {(() => {
          const accentColor = activeWsData ? (activeWsData.type === 'playback' ? 'var(--pink)' : 'var(--gold)') : 'var(--cyan)';
          const panelBg = activeWsData ? (activeWsData.type === 'playback' ? 'rgba(232,30,97,0.04)' : 'rgba(255,180,0,0.04)') : 'rgba(40,220,202,0.04)';
          const panelBorder = activeWsData ? (activeWsData.type === 'playback' ? 'rgba(232,30,97,0.15)' : 'rgba(255,180,0,0.15)') : 'rgba(40,220,202,0.15)';
          return (
            <div
              ref={detailRef}
              style={{
                maxHeight: showDetail ? 1200 : 0,
                opacity: showDetail ? 1 : 0,
                overflow: 'hidden',
                transition: 'max-height 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.35s ease',
                marginTop: showDetail ? 24 : 0,
              }}
            >
              {showDetail && (
                <div style={{
                  background: panelBg,
                  border: `1px solid ${panelBorder}`,
                  borderRadius: 12,
                  padding: '28px 32px',
                }}>
                  {/* Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: accentColor, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
                        {activeData ? `Session ${activeData.num} - ${activeData.date}` : activeWsData?.label}
                      </div>
                      <h3 style={{ fontSize: 22, fontWeight: 700, color: 'var(--white)', margin: 0 }}>
                        {activeData?.title ?? activeWsData?.label}
                      </h3>
                      <p style={{ fontSize: 14, color: 'var(--grey-light)', marginTop: 6 }}>
                        {activeData?.goal ?? activeWsData?.summary}
                      </p>
                    </div>
                    {activeData && (
                      <div style={{
                        padding: '4px 14px', borderRadius: 20,
                        background: 'rgba(40,220,202,0.15)', color: 'var(--cyan)',
                        fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0, marginLeft: 16,
                      }}>
                        {activeData.duration}
                      </div>
                    )}
                    {activeWsData?.date && (
                      <div style={{
                        padding: '4px 14px', borderRadius: 20,
                        background: `${activeWsData.type === 'playback' ? 'rgba(232,30,97,0.15)' : 'rgba(255,180,0,0.15)'}`,
                        color: accentColor,
                        fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0, marginLeft: 16,
                      }}>
                        {activeWsData.date}
                      </div>
                    )}
                  </div>

                  {/* Session: Activities */}
                  {activeData && (
                    <div style={{ marginBottom: 24 }}>
                      <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--grey-light)', marginBottom: 10, opacity: 0.6 }}>Agenda</div>
                      <div style={{ display: 'grid', gap: 2 }}>
                        {activeData.activities.filter(a => a.type !== 'break').map((a, i) => (
                          <div key={i} style={{
                            display: 'grid', gridTemplateColumns: '70px 1fr',
                            padding: '7px 0',
                            borderBottom: '1px solid rgba(255,255,255,0.04)',
                          }}>
                            <span style={{ fontSize: 12, color: 'var(--cyan)', fontWeight: 600 }}>{a.dur}</span>
                            <span style={{ fontSize: 13, color: 'var(--white)' }}>{a.activity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Session: 2x2 grid */}
                  {activeData && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                      <div style={{ background: 'rgba(40,220,202,0.04)', borderRadius: 8, padding: '16px 18px', border: '1px solid rgba(40,220,202,0.1)' }}>
                        <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--cyan)', marginBottom: 10, opacity: 0.8 }}>{client.shortName} Attendees</div>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}><tbody>
                          {activeData.stakeholders.map((s, k) => { const parts = s.split(' - '); return (
                            <tr key={k}><td style={{ padding: '5px 0', borderBottom: k < activeData.stakeholders.length - 1 ? '1px solid rgba(40,220,202,0.08)' : 'none', fontSize: 13, fontWeight: 600, color: 'var(--white)', whiteSpace: 'nowrap' }}>{parts[0]}</td><td style={{ padding: '5px 0 5px 12px', borderBottom: k < activeData.stakeholders.length - 1 ? '1px solid rgba(40,220,202,0.08)' : 'none', fontSize: 12, color: 'var(--grey-light)', opacity: 0.7 }}>{parts[1] || ''}</td></tr>
                          ); })}
                        </tbody></table>
                      </div>
                      <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '16px 18px', border: '1px solid rgba(255,255,255,0.06)' }}>
                        <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--grey-light)', marginBottom: 10, opacity: 0.7 }}>KPS Team</div>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}><tbody>
                          {activeData.kpsTeam.map((s, k) => { const parts = s.split(' - '); return (
                            <tr key={k}><td style={{ padding: '5px 0', borderBottom: k < activeData.kpsTeam.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', fontSize: 13, fontWeight: 600, color: 'var(--white)', whiteSpace: 'nowrap' }}>{parts[0]}</td><td style={{ padding: '5px 0 5px 12px', borderBottom: k < activeData.kpsTeam.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', fontSize: 12, color: 'var(--grey-light)', opacity: 0.7 }}>{parts[1] || ''}</td></tr>
                          ); })}
                        </tbody></table>
                      </div>
                      <div style={{ background: 'rgba(255,180,0,0.04)', borderRadius: 8, padding: '16px 18px', border: '1px solid rgba(255,180,0,0.1)' }}>
                        <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold)', marginBottom: 10, opacity: 0.8 }}>Client Preparation</div>
                        {activeData.preparation.map((p, k) => (
                          <div key={k} style={{ padding: '5px 0', borderBottom: k < activeData.preparation.length - 1 ? '1px solid rgba(255,180,0,0.06)' : 'none', fontSize: 13, color: 'var(--grey-light)', lineHeight: 1.5 }}>{p}</div>
                        ))}
                      </div>
                      <div style={{ background: 'rgba(94,240,224,0.04)', borderRadius: 8, padding: '16px 18px', border: '1px solid rgba(94,240,224,0.1)' }}>
                        <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#5ef0e0', marginBottom: 10, opacity: 0.8 }}>Outputs</div>
                        {activeData.outputs.map((o, k) => (
                          <div key={k} style={{ padding: '5px 0', borderBottom: k < activeData.outputs.length - 1 ? '1px solid rgba(94,240,224,0.06)' : 'none', fontSize: 13, color: 'var(--grey-light)', lineHeight: 1.5 }}>{o}</div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Workstream: 2-column detail */}
                  {activeWsData && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
                      {activeWsData.details.map((col, ci) => (
                        <div key={ci}>
                          <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: col.color, marginBottom: 10, opacity: 0.8 }}>{col.heading}</div>
                          {col.items.map((item, k) => (
                            <div key={k} style={{ padding: '5px 0', borderBottom: k < col.items.length - 1 ? `1px solid ${panelBorder}` : 'none', fontSize: 13, color: 'var(--grey-light)', lineHeight: 1.5 }}>{item}</div>
                          ))}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Close button */}
                  <div style={{ textAlign: 'center', marginTop: 20 }}>
                    <button
                      onClick={() => { setActiveSession(null); setActiveWorkstream(null); }}
                      style={{
                        background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                        color: 'var(--grey-light)', padding: '6px 20px', borderRadius: 6,
                        fontSize: 12, cursor: 'pointer', transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })()}

        {/* ── Deliverables ── */}
        <section style={{ marginTop: 80 }}>
          <Reveal>
            <span className="section-label">Outputs</span>
            <h2>Key Deliverables</h2>
            <p className="section-intro">
              Discovery produces <span className="hl">5 core deliverables</span> that form the foundation for the build phase.
            </p>
            <p style={{ marginTop: 8, marginBottom: 24, color: 'var(--cyan)', fontSize: 16 }}>
              Click any deliverable to see what it contains and which sessions feed into it.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ display: 'grid', gap: 12 }}>
              {deliverables.map((d) => {
                const isDelActive = activeDeliverable === d.id;
                return (
                  <div key={d.id}>
                    {/* Deliverable header card */}
                    <button
                      onClick={() => {
                        setActiveDeliverable(prev => prev === d.id ? null : d.id);
                        setActiveSession(null);
                      }}
                      style={{
                        width: '100%', textAlign: 'left', cursor: 'pointer',
                        padding: '18px 22px',
                        background: isDelActive ? `${d.color === 'var(--gold)' ? 'rgba(255,180,0' : d.color === 'var(--cyan)' ? 'rgba(40,220,202' : d.color === 'var(--pink)' ? 'rgba(232,30,97' : 'rgba(94,240,224'},0.08)` : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${isDelActive ? d.color : 'rgba(255,255,255,0.08)'}`,
                        borderRadius: isDelActive ? '10px 10px 0 0' : 10,
                        transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                        display: 'flex', alignItems: 'center', gap: 16,
                      }}
                    >
                      <div style={{
                        width: 4, height: 36, borderRadius: 2,
                        background: d.color, flexShrink: 0,
                      }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--white)' }}>{d.title}</div>
                        <div style={{ fontSize: 13, color: 'var(--grey-light)', marginTop: 3 }}>{d.desc}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                        <span style={{ fontSize: 11, color: d.color, fontWeight: 600, opacity: 0.8 }}>
                          {d.feedingSessions.length} sessions
                        </span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isDelActive ? d.color : 'var(--grey-light)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                          style={{ transition: 'transform 0.3s', transform: isDelActive ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </button>

                    {/* Expanded detail */}
                    <div style={{
                      maxHeight: isDelActive ? 800 : 0,
                      opacity: isDelActive ? 1 : 0,
                      overflow: 'hidden',
                      transition: 'max-height 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease',
                    }}>
                      <div style={{
                        background: 'rgba(255,255,255,0.02)',
                        border: `1px solid ${d.color}`,
                        borderTop: 'none',
                        borderRadius: '0 0 10px 10px',
                        padding: '20px 24px',
                      }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                          {/* What it contains */}
                          <div>
                            <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: d.color, marginBottom: 10, opacity: 0.8 }}>What it contains</div>
                            {d.contents.map((item, k) => (
                              <div key={k} style={{ padding: '5px 0', borderBottom: k < d.contents.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', fontSize: 13, color: 'var(--grey-light)', lineHeight: 1.5 }}>{item}</div>
                            ))}
                          </div>
                          {/* Feeding sessions */}
                          <div>
                            <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--cyan)', marginBottom: 10, opacity: 0.8 }}>Built from these sessions</div>
                            {d.feedingSessions.map(sNum => {
                              const s = sessions.find(sess => sess.num === sNum);
                              return s ? (
                                <div key={sNum}
                                  onClick={() => { setActiveDeliverable(null); toggleSession(s.id); }}
                                  style={{
                                    padding: '6px 10px', marginBottom: 4,
                                    background: 'rgba(40,220,202,0.08)',
                                    border: '1px solid rgba(40,220,202,0.15)',
                                    borderRadius: 6, cursor: 'pointer',
                                    fontSize: 13, color: 'var(--white)',
                                    transition: 'all 0.2s',
                                    display: 'flex', alignItems: 'center', gap: 8,
                                  }}
                                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(40,220,202,0.15)'; }}
                                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(40,220,202,0.08)'; }}
                                >
                                  <span style={{ fontSize: 11, color: 'var(--cyan)', fontWeight: 700 }}>{sNum}</span>
                                  {s.shortTitle}
                                </div>
                              ) : null;
                            })}
                            <div style={{ marginTop: 8, fontSize: 11, color: 'var(--grey-light)', opacity: 0.6 }}>
                              Click a session to jump to its detail above
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </section>

        {/* ── Key Risks ── */}
        <section style={{ marginTop: 64, paddingBottom: 80 }}>
          <Reveal>
            <span className="section-label">Risk Management</span>
            <h2>Key Risks & Mitigations</h2>
            <p className="section-intro">
              These are the risks identified before discovery begins. Each one is addressed by specific sessions.
            </p>
            <p style={{ marginTop: 8, marginBottom: 24, color: 'var(--cyan)', fontSize: 16 }}>
              Click any risk to see how it will be mitigated and which sessions address it.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div style={{ display: 'grid', gap: 12 }}>
              {keyRisks.map((r) => {
                const isRiskActive = activeRisk === r.id;
                return (
                  <div key={r.id}>
                    <button
                      onClick={() => {
                        setActiveRisk(prev => prev === r.id ? null : r.id);
                        setActiveDeliverable(null);
                        setActiveSession(null);
                      }}
                      style={{
                        width: '100%', textAlign: 'left', cursor: 'pointer',
                        padding: '18px 22px',
                        background: isRiskActive ? 'rgba(232,30,97,0.08)' : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${isRiskActive ? 'var(--pink)' : 'rgba(255,255,255,0.08)'}`,
                        borderRadius: isRiskActive ? '10px 10px 0 0' : 10,
                        transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                        display: 'flex', alignItems: 'center', gap: 16,
                      }}
                    >
                      <div style={{
                        width: 4, height: 36, borderRadius: 2,
                        background: 'var(--pink)', flexShrink: 0,
                      }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--white)' }}>{r.risk}</div>
                        <div style={{ fontSize: 13, color: 'var(--grey-light)', marginTop: 3 }}>{r.desc}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                        <span style={{ fontSize: 11, color: 'var(--pink)', fontWeight: 600, opacity: 0.8 }}>
                          {r.addressedInSessions.length} {r.addressedInSessions.length === 1 ? 'session' : 'sessions'}
                        </span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isRiskActive ? 'var(--pink)' : 'var(--grey-light)'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                          style={{ transition: 'transform 0.3s', transform: isRiskActive ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </button>

                    <div style={{
                      maxHeight: isRiskActive ? 600 : 0,
                      opacity: isRiskActive ? 1 : 0,
                      overflow: 'hidden',
                      transition: 'max-height 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease',
                    }}>
                      <div style={{
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid var(--pink)',
                        borderTop: 'none',
                        borderRadius: '0 0 10px 10px',
                        padding: '20px 24px',
                      }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                          <div>
                            <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--cyan)', marginBottom: 10, opacity: 0.8 }}>How we mitigate this</div>
                            {r.mitigations.map((m, k) => (
                              <div key={k} style={{ padding: '5px 0', borderBottom: k < r.mitigations.length - 1 ? '1px solid rgba(40,220,202,0.06)' : 'none', fontSize: 13, color: 'var(--grey-light)', lineHeight: 1.5 }}>{m}</div>
                            ))}
                          </div>
                          <div>
                            <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--pink)', marginBottom: 10, opacity: 0.8 }}>Addressed in these sessions</div>
                            {r.addressedInSessions.map(sNum => {
                              const s = sessions.find(sess => sess.num === sNum);
                              return s ? (
                                <div key={sNum}
                                  onClick={() => { setActiveRisk(null); toggleSession(s.id); }}
                                  style={{
                                    padding: '6px 10px', marginBottom: 4,
                                    background: 'rgba(232,30,97,0.08)',
                                    border: '1px solid rgba(232,30,97,0.15)',
                                    borderRadius: 6, cursor: 'pointer',
                                    fontSize: 13, color: 'var(--white)',
                                    transition: 'all 0.2s',
                                    display: 'flex', alignItems: 'center', gap: 8,
                                  }}
                                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(232,30,97,0.15)'; }}
                                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(232,30,97,0.08)'; }}
                                >
                                  <span style={{ fontSize: 11, color: 'var(--pink)', fontWeight: 700 }}>{sNum}</span>
                                  {s.shortTitle}
                                </div>
                              ) : null;
                            })}
                            <div style={{ marginTop: 8, fontSize: 11, color: 'var(--grey-light)', opacity: 0.6 }}>
                              Click a session to jump to its detail above
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </section>
      </div>

      <Footer />
    </>
  );
}
