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
    duration: '2-3 hrs', date: '14 Apr', weekIdx: 0,
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
    duration: '3-4 hrs', date: '15 Apr', weekIdx: 0,
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
    duration: '2.5-3 hrs', date: '16 Apr', weekIdx: 0,
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
    duration: '2-3 hrs', date: 'W/C 20 Apr', weekIdx: 1,
    kpsTeam: ['Simon Holmes - Head of Technology', 'Leigh Duncan - Senior Project Manager', 'Ro', 'Luke Hipkiss - Senior Requirements Analyst'],
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
    duration: '3 hrs', date: '28 Apr', weekIdx: 2,
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
    duration: '2-2.5 hrs', date: '30 Apr', weekIdx: 2,
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
    duration: '3-4 hrs', date: '1 May', weekIdx: 2,
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
    duration: '3-4 hrs', date: '6 May', weekIdx: 3,
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
    duration: '2-3 hrs', date: '7 May', weekIdx: 3,
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
    duration: '2-3 hrs', date: '12 May', weekIdx: 4,
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
  label: string;
  startWeek: number;
  endWeek: number;
  type: 'writeup' | 'playback';
}

const workstreams: Workstream[] = [
  { label: 'BRD Write-up', startWeek: 2, endWeek: 5, type: 'writeup' },
  { label: 'Solution Design', startWeek: 3, endWeek: 5, type: 'writeup' },
  { label: 'Project Estimation', startWeek: 4, endWeek: 5, type: 'writeup' },
  { label: 'Scope Playback', startWeek: 3, endWeek: 3, type: 'playback' },
  { label: 'Full Playback & Sign-off', startWeek: 5, endWeek: 5, type: 'playback' },
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
  { risk: 'ERP integration uncertainty', desc: 'Current ERP landscape is evolving. Architecture decisions depend on understanding where inventory, pricing, and order truth lives.', mitigation: 'Dedicated Session 8 focus; require ERP documentation before the session; design for abstraction at the integration layer.' },
  { risk: 'Product data complexity', desc: 'Large catalogue with complex relationships (editions, authors, series) may exceed platform-native limits or require external tooling.', mitigation: 'Session 2 product data assessment; early prototype of data model; search strategy decision before build phase.' },
  { risk: 'Scope creep in personalisation', desc: 'Ambition for personalised experiences may outstrip available data, tooling, and team capacity.', mitigation: 'Session 5 explicitly separates MVP from future-state; decisions captured and signed off before build.' },
  { risk: 'Stakeholder availability', desc: 'Discovery sessions require key decision-makers. Gaps in attendance delay decisions and create rework.', mitigation: 'Pre-schedule all 10 sessions in prep week; confirm attendees; provide async decision capture for unavoidable conflicts.' },
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
  const detailRef = useRef<HTMLDivElement>(null);
  const currentWeekIdx = getCurrentWeekIdx();

  const toggleSession = (id: string) => {
    setHasInteracted(true);
    setActiveSession(prev => prev === id ? null : id);
  };

  // Scroll detail into view when expanded
  useEffect(() => {
    if (activeSession && detailRef.current) {
      setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    }
  }, [activeSession]);

  const activeData = activeSession ? sessions.find(s => s.id === activeSession) : null;

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
              Before we commit to build timelines, we invest in a <span className="hl">structured discovery phase</span> to make sure every decision is grounded in evidence. Over six weeks, KPS and {client.shortName} will work through 10 facilitated sessions covering everything from commercial vision and product data through to architecture, checkout, and MVP scope.
            </p>
            <p style={{ marginTop: 12 }}>
              The goal is simple: turn assumptions into validated decisions, so the build phase starts with clarity and confidence. Click any session below to see what we will cover.
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
                  return (
                    <div key={session.id} style={{ display: 'contents' }}>
                      {/* Label */}
                      <div style={{
                        padding: '8px 10px 8px 0',
                        fontSize: 14,
                        color: isActive ? 'var(--white)' : 'var(--grey-light)',
                        fontWeight: isActive ? 600 : 500,
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
                            {isSessionWeek && (<>
                              <button
                                onClick={() => toggleSession(session.id)}
                                style={{
                                  width: '100%',
                                  padding: '8px 10px',
                                  borderRadius: 6,
                                  border: isActive ? '1px solid var(--cyan)' : '1px solid rgba(40,220,202,0.3)',
                                  background: isActive
                                    ? 'linear-gradient(135deg, rgba(40,220,202,0.25), rgba(40,220,202,0.1))'
                                    : 'rgba(40,220,202,0.12)',
                                  color: 'var(--white)',
                                  cursor: 'pointer',
                                  fontSize: 11,
                                  fontWeight: 600,
                                  textAlign: 'center',
                                  transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
                                  boxShadow: isActive ? '0 0 20px rgba(40,220,202,0.15)' : 'none',
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                }}
                                onMouseEnter={e => {
                                  if (!isActive) e.currentTarget.style.background = 'rgba(40,220,202,0.2)';
                                }}
                                onMouseLeave={e => {
                                  if (!isActive) e.currentTarget.style.background = 'rgba(40,220,202,0.12)';
                                }}
                              >
                                {session.date}
                              </button>
                              {session.num === 1 && !hasInteracted && (
                                <div style={{
                                  marginTop: 6, fontSize: 10, color: 'var(--cyan)',
                                  textAlign: 'center', fontWeight: 600, letterSpacing: '0.03em',
                                  animation: 'pulse 2s ease-in-out infinite',
                                }}>
                                  Click to explore
                                  <style>{`@keyframes pulse { 0%, 100% { opacity: 0.5; } 50% { opacity: 1; } }`}</style>
                                </div>
                              )}
                            </>)}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>

              {/* Workstream bars */}
              <div style={{ marginTop: 8, display: 'grid', gridTemplateColumns: '180px repeat(6, 1fr)', gap: 0 }}>
                {workstreams.map((ws, i) => (
                  <div key={i} style={{ display: 'contents' }}>
                    <div style={{
                      padding: '6px 10px 6px 0', fontSize: 13, color: 'var(--grey-light)',
                      fontWeight: 600, display: 'flex', alignItems: 'center',
                      borderBottom: '1px solid rgba(255,255,255,0.03)',
                      whiteSpace: 'nowrap',
                    }}>
                      {ws.label}
                    </div>
                    {weekHeaders.map((_, weekIdx) => {
                      const inRange = weekIdx >= ws.startWeek && weekIdx <= ws.endWeek;
                      const isStart = weekIdx === ws.startWeek;
                      const isEnd = weekIdx === ws.endWeek;
                      const color = ws.type === 'writeup' ? 'var(--gold)' : 'var(--pink)';
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
                            <div style={{
                              width: '100%', height: 20,
                              background: color,
                              opacity: 0.75,
                              borderRadius: `${isStart ? 4 : 0}px ${isEnd ? 4 : 0}px ${isEnd ? 4 : 0}px ${isStart ? 4 : 0}px`,
                            }} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>

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

        {/* ── EXPANDED SESSION DETAIL ── */}
        <div
          ref={detailRef}
          style={{
            maxHeight: activeData ? 1200 : 0,
            opacity: activeData ? 1 : 0,
            overflow: 'hidden',
            transition: 'max-height 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.35s ease',
            marginTop: activeData ? 24 : 0,
          }}
        >
          {activeData && (
            <div style={{
              background: 'rgba(40,220,202,0.04)',
              border: '1px solid rgba(40,220,202,0.15)',
              borderRadius: 12,
              padding: '28px 32px',
            }}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--cyan)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
                    Session {activeData.num} - {activeData.date}
                  </div>
                  <h3 style={{ fontSize: 22, fontWeight: 700, color: 'var(--white)', margin: 0 }}>{activeData.title}</h3>
                  <p style={{ fontSize: 14, color: 'var(--grey-light)', marginTop: 6 }}>{activeData.goal}</p>
                </div>
                <div style={{
                  padding: '4px 14px', borderRadius: 20,
                  background: 'rgba(40,220,202,0.15)', color: 'var(--cyan)',
                  fontSize: 12, fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0, marginLeft: 16,
                }}>
                  {activeData.duration}
                </div>
              </div>

              {/* Activities */}
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

              {/* 2x2 detail grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                {/* AB Attendees */}
                <div style={{ background: 'rgba(40,220,202,0.04)', borderRadius: 8, padding: '16px 18px', border: '1px solid rgba(40,220,202,0.1)' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--cyan)', marginBottom: 10, opacity: 0.8 }}>{client.shortName} Attendees</div>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <tbody>
                      {activeData.stakeholders.map((s, k) => {
                        const parts = s.split(' - ');
                        return (
                          <tr key={k}>
                            <td style={{ padding: '5px 0', borderBottom: k < activeData.stakeholders.length - 1 ? '1px solid rgba(40,220,202,0.08)' : 'none', fontSize: 13, fontWeight: 600, color: 'var(--white)', whiteSpace: 'nowrap' }}>{parts[0]}</td>
                            <td style={{ padding: '5px 0 5px 12px', borderBottom: k < activeData.stakeholders.length - 1 ? '1px solid rgba(40,220,202,0.08)' : 'none', fontSize: 12, color: 'var(--grey-light)', opacity: 0.7 }}>{parts[1] || ''}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* KPS Team */}
                <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 8, padding: '16px 18px', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--grey-light)', marginBottom: 10, opacity: 0.7 }}>KPS Team</div>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <tbody>
                      {activeData.kpsTeam.map((s, k) => {
                        const parts = s.split(' - ');
                        return (
                          <tr key={k}>
                            <td style={{ padding: '5px 0', borderBottom: k < activeData.kpsTeam.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', fontSize: 13, fontWeight: 600, color: 'var(--white)', whiteSpace: 'nowrap' }}>{parts[0]}</td>
                            <td style={{ padding: '5px 0 5px 12px', borderBottom: k < activeData.kpsTeam.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', fontSize: 12, color: 'var(--grey-light)', opacity: 0.7 }}>{parts[1] || ''}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Preparation */}
                <div style={{ background: 'rgba(255,180,0,0.04)', borderRadius: 8, padding: '16px 18px', border: '1px solid rgba(255,180,0,0.1)' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold)', marginBottom: 10, opacity: 0.8 }}>Client Preparation</div>
                  {activeData.preparation.map((p, k) => (
                    <div key={k} style={{ padding: '5px 0', borderBottom: k < activeData.preparation.length - 1 ? '1px solid rgba(255,180,0,0.06)' : 'none', fontSize: 13, color: 'var(--grey-light)', lineHeight: 1.5 }}>{p}</div>
                  ))}
                </div>

                {/* Outputs */}
                <div style={{ background: 'rgba(94,240,224,0.04)', borderRadius: 8, padding: '16px 18px', border: '1px solid rgba(94,240,224,0.1)' }}>
                  <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#5ef0e0', marginBottom: 10, opacity: 0.8 }}>Outputs</div>
                  {activeData.outputs.map((o, k) => (
                    <div key={k} style={{ padding: '5px 0', borderBottom: k < activeData.outputs.length - 1 ? '1px solid rgba(94,240,224,0.06)' : 'none', fontSize: 13, color: 'var(--grey-light)', lineHeight: 1.5 }}>{o}</div>
                  ))}
                </div>
              </div>

              {/* Close button */}
              <div style={{ textAlign: 'center', marginTop: 20 }}>
                <button
                  onClick={() => setActiveSession(null)}
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

        {/* ── Deliverables ── */}
        <section style={{ marginTop: 80 }}>
          <Reveal>
            <span className="section-label">Outputs</span>
            <h2>Key Deliverables</h2>
            <p className="section-intro">
              Discovery produces <span className="hl">5 core deliverables</span> that form the foundation for the build phase.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="scope-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
              {deliverables.map((d, i) => (
                <div key={i} className="scope-card">
                  <div><h4>{d.title}</h4><p>{d.desc}</p></div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ── Key Risks ── */}
        <section style={{ marginTop: 64, paddingBottom: 80 }}>
          <Reveal>
            <span className="section-label">Risk Management</span>
            <h2>Key Risks & Mitigations</h2>
          </Reveal>
          {keyRisks.map((r, i) => (
            <Reveal key={i} delay={0.05 * (i + 1)}>
              <div style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 10, padding: '20px 24px', marginBottom: 12, borderLeft: '3px solid var(--pink)',
              }}>
                <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--white)', marginBottom: 6 }}>{r.risk}</div>
                <p style={{ fontSize: 14, color: 'var(--grey-light)', lineHeight: 1.6, margin: 0 }}>{r.desc}</p>
                <div style={{
                  marginTop: 12, padding: '10px 14px', background: 'rgba(40,220,202,0.06)',
                  borderRadius: 6, borderLeft: '2px solid var(--cyan)',
                }}>
                  <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--cyan)' }}>Mitigation</span>
                  <p style={{ fontSize: 13, color: 'var(--grey-light)', lineHeight: 1.6, margin: '4px 0 0' }}>{r.mitigation}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </section>
      </div>

      <Footer />
    </>
  );
}
