'use client';

import Hero from '@/components/Hero';
import StickyNav from '@/components/StickyNav';
import TocLayout from '@/components/TocLayout';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import { client, kps } from '@/data/client-config';

interface QaPageProps {
  navigateTo: (page: string) => void;
  goHome: () => void;
}

interface QaItem {
  question: string;
  answer: string;
}

interface QaCategory {
  id: string;
  label: string;
  icon: React.ReactNode;
  items: QaItem[];
}

const categories: QaCategory[] = [
  {
    id: 'qa-commercial',
    label: 'Commercial & Contractual',
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>,
    items: [
      {
        question: `The Technical Audit is offered free of charge - is this contingent on ${client.shortName} committing to Stage 2, and what happens if we decide not to proceed to Discovery after the audit?`,
        answer: `Normally if a client chose not to proceed to Discovery after an audit, the audit findings and report would still be provided, but the waived fee would become chargeable as a standalone activity. However, we offered to waive the audit fee in our pre-RFP engagement with ${client.shortName}, and the offer still stands whether you proceed or not (of course, we hope that you do proceed).`,
      },
      {
        question: 'What are the payment milestones for the Discovery & Design phase? What is specifically included at each milestone, and how does the scope of Stage 2 differ from the Technical Audit?',
        answer: `The payment milestones usually follow a 50/50 split. The first payment is due after the Discovery Kick Off and the final payment following the Discovery Playback.\n\nWhilst the Technical Audit gives a detailed picture of the 'As-Is', the Discovery & Technical Design (Stage 2) details the 'To-Be'. The key difference being that we would be able to provide a clear Delivery Plan with timelines and costs as the full extent of the migration would be scoped and defined. The initial intention was to run the Technical Audit and Discovery in parallel so they could dovetail back together in time for the Playback. We will need to review the outputs of the audit and may decide to adapt the overall approach. We still anticipate the majority of the workshops will still be required to ensure a comprehensive set of scope is defined.`,
      },
      {
        question: 'Regarding Stages 3-6 (Build, Testing, Launch, Run & CI): can you provide a ballpark price estimate and indicative timeline for these phases, even if subject to refinement after Discovery?',
        answer: `At this stage only Discovery & Design are scoped in detail and therefore can be priced (all our work is based on effort). The purpose of Discovery is to define the precise scope, architecture, internal ${client.shortName} capability and roadmap so that Build, Testing, Launch and Continuous Improvement can be estimated accurately. We will give you early sight of this as we go through it.\n\nHowever, if the preferred approach to headless is for an iterative approach rather than big bang, it could make a lot of sense to incorporate the headless work into an ongoing roadmap of work & support with a dedicated KPS / ${client.shortName} Continuous Improvement team. Once on-boarded, this team would also take care of support and any other development tasks.`,
      },
      {
        question: 'How are \'reasonable travel and expenses\' defined, and is there a cap mechanism in place?',
        answer: 'Travel and expenses are limited to necessary project-related costs such as on-site workshops or steering meetings and are charged at cost. Where travel is expected, it is normally agreed in advance with the client. If preferred, a cap or pre-agreed travel budget can be defined during contracting.',
      },
      {
        question: 'What does the \'KPS guaranteed delivery promise\' actually guarantee from a contractual standpoint?',
        answer: 'The guarantee reflects KPS\'s commitment to delivering a successful outcome aligned with the agreed scope and architecture. It means KPS remains accountable, in contract and in personal commitment, for delivery quality, governance, and ensuring the solution is delivered in line with the agreed design and objectives. It is our promise to you that we will do what it takes. Contractual wording would be included in the services agreement.',
      },
    ],
  },
  {
    id: 'qa-team',
    label: 'Team & Resources',
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
    items: [
      {
        question: `Who specifically will be assigned to ${client.shortName}'s project? We would like to meet the actual delivery team members before signing.`,
        answer: `A dedicated delivery team would be assigned including a Solution Architect, Frontend Architect, Technical Lead, Project Manager and supporting engineers. Senior practice leadership and expert services would remain available throughout. We would be happy to introduce the proposed core delivery team during Discovery and before contracting.`,
      },
      {
        question: 'What is the seniority mix of the dedicated delivery team versus the broader \'expert services\' team?',
        answer: 'The core delivery team consists primarily of senior engineers, architects and technical leads responsible for day-to-day delivery - they are all highly experienced experts in their own right. The KPS Expert Services team provides specialist, ad-hoc input (advanced architecture, performance, security, CX strategy) when needed.',
      },
      {
        question: 'Will there be one dedicated Project Manager on the KPS side throughout the engagement?',
        answer: 'Yes. The engagement would have a dedicated KPS Project Manager responsible for governance, planning, reporting and coordination with stakeholders.',
      },
      {
        question: `How many team members will you require from ${client.shortName}'s side, and in what profiles? What does your onboarding and training program look like?`,
        answer: `Successful delivery hinges on close collaboration with ${client.shortName}'s product, technical, and business stakeholders. We typically engage a core team - including the Product Owner, Enterprise / Technical Architects, and Integration Lead - alongside QA and Security/Operations representatives. To kick things off, a pre-discovery call will be scheduled to map out these roles and identify the right attendees for each workshop. Throughout the project, we ensure seamless knowledge transfer through a hands-on, 'train-the-trainer' approach.`,
      },
      {
        question: 'Are any team members nearshore or offshore, and if so, in which locations?',
        answer: 'KPS core delivery teams are primarily UK and Europe based. We also have resources around the world (e.g. India, Brazil) which enables us to bring additional cost-effective resource into teams to add capacity, under the leadership of the core delivery team leads. We will discuss this in Discovery.',
      },
      {
        question: `What is the expected weekly time commitment from ${client.shortName}'s internal team during the Discovery phase?`,
        answer: 'Discovery typically involves stakeholder workshops and technical sessions across several weeks - currently anticipating 6 weeks. Key stakeholders usually participate in scheduled workshops and weekly alignment sessions to review findings, decisions and progress. Additional time should be expected for preparing existing documentation and for reviewing/sign off of deliverables including scope defined in the Business Requirements Document (BRD).',
      },
    ],
  },
  {
    id: 'qa-technical',
    label: 'Technical & Functional',
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>,
    items: [
      {
        question: `Regarding the SAP Commerce backend: would KPS take over backend ownership and management from our current partner, and if so, how would that transition be handled?`,
        answer: `We would love to be your on-going Commerce partner for the build phase and for on-going support, maintenance & Continuous Improvement. We have taken over and transitioned more than half of our SAP Commerce customers and we have a very well practiced on-boarding transition process to safely and securely transition services to KPS, with no downtime.\n\nWe see 2 clear options:\n1. Iterative - KPS takes over backend ownership of Commerce, we put together a joint development team (${client.shortName} & KPS), and together we plan an iterative roadmap to implement headless, whilst also managing support, maintenance and any other roadmap work.\n2. Big bang - KPS implements headless as a distinct project and migrates this to ${client.shortName} for go-live and run.`,
      },
      {
        question: `Will there be a team member who will actively challenge ${client.shortName}'s functional decisions and act as a critical thinking partner throughout the project?`,
        answer: 'Yes. The engagement includes senior architectural and CX consulting roles whose responsibility is to challenge assumptions, guide architectural decisions and ensure the solution remains aligned with long-term business goals and incorporate best practice based on our team\'s extensive experience. This would also be built in to an on-going Continuous Improvement service and would also provide constructive challenge on ways of working, processes, etc.',
      },
      {
        question: 'How does KPS handle situations where the Technical Audit reveals significantly more complexity than initially anticipated?',
        answer: 'The purpose of the Technical Audit is to uncover risks, technical debt and complexity early. Findings are reviewed collaboratively and incorporated into the Discovery outputs. If additional scope is identified, options and impacts are documented and discussed transparently before moving forward. We are very experienced in managing scope & change through audit/discovery - where we find issues or risks we aim to talk about them with you early, before committing cost or progressing too far. Where this does happen we will always be pragmatic, honest and flexible.',
      },
    ],
  },
  {
    id: 'qa-methodology',
    label: 'Methodology & Approach',
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg>,
    items: [
      {
        question: 'The Discovery is scoped at 6 weeks - what are the risks of this timeline proving insufficient, and what happens commercially if it overruns?',
        answer: `The Discovery timeline is designed to balance thorough analysis & momentum whilst being pragmatic. Currently we have suggested 2-3 sessions per week to reduce the overhead on ${client.shortName}'s day-to-day operations. Commercially - the Discovery cost is based on effort, not timeline. Within reason, there's flexibility on timeline with no extra charge.`,
      },
      {
        question: 'How are architectural design decisions documented and governed after Discovery, in the period before KPS is formally engaged for the Build phase?',
        answer: 'Architectural decisions are formalised as core Discovery outputs, including context diagrams, design decisions, and integration patterns. To bridge the period before the Build phase, governance is maintained through an Architectural Design Authority and a steering structure. KPS would be actively embedded in this process throughout Discovery, ensuring that all design documentation is not just handed over, but fully socialised.',
      },
      {
        question: 'What does the \'Architecture Design Authority\' governance structure look like in practice for a project of this size?',
        answer: `The Architecture Design Authority (ADA) serves as the primary governance body for maintaining technical integrity. Comprised of Lead Architects from both KPS and ${client.shortName}, the ADA provides oversight to ensure that architectural decisions stay aligned with the architectural principles defined during Discovery and the wider ${client.shortName} technology ecosystem. While the core group remains lean for agile decision-making, it is designed to scale dynamically - bringing in subject matter experts (SMEs) when needed.`,
      },
    ],
  },
  {
    id: 'qa-capability',
    label: 'Capability Building',
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>,
    items: [
      {
        question: 'Can you conduct a formal Internal Capability Assessment of our current team as part of the engagement?',
        answer: `Yes. The Discovery phase includes evaluating ${client.shortName}'s current CX capabilities and defining a future capability model, including roles, skills and training paths.`,
      },
      {
        question: `What specific upskilling programs or certifications does KPS offer to ${client.shortName} developers throughout the transformation?`,
        answer: `KPS emphasises hands-on knowledge transfer, we do not offer formal programs or certifications directly. During Discovery (and beyond, until ${client.shortName} are comfortable), we will identify ${client.shortName} knowledge / skill / capacity gaps and we will help formulate a pragmatic plan - this could be a recommendation for formal vendor training or learning (e.g. SAP certifications). In addition, we will be creating documentation of API and design decisions for the storefront which will be available.`,
      },
      {
        question: `What prior knowledge should the ${client.shortName} developers already possess in order to have a smooth start?`,
        answer: `The exact skill requirements will be defined more precisely during Discovery, once the storefront path has been confirmed and a proper assessment of the ${client.shortName} team's current capabilities has been completed. In the meantime, the following gives a useful working picture:\n\nReact / Next.js (Vercel route): Frontend developers need solid React and TypeScript experience, and comfort with Next.js specifically. Backend developers need to be comfortable building a Node.js-based BFF layer and designing API contracts.\n\nSAP Composable Storefront: Frontend developers need Angular and Composable Storefront module system familiarity, including NgRx. Backend developers need a solid grasp of SAP Commerce OCC APIs.\n\nSAP Commerce APIs (both routes): Backend developers need to understand how OCC APIs behave, where the gaps are, and how to shape data effectively for frontend consumption.\n\nDelivery practices (common to all): All developers need to be comfortable in a modern CI/CD environment: Git workflows, branching strategies, automated testing, and environment management.`,
      },
    ],
  },
  {
    id: 'qa-risk',
    label: 'Risk',
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    items: [
      {
        question: 'What is your contingency plan if the chosen headless technology (Next.js) proves problematic or creates unforeseen constraints during the Build phase?',
        answer: 'Next.js is maintained by Vercel with direct engineering contributions from Google and Meta, has over 6 million weekly npm downloads, and sits at the core of React\'s server-rendering ecosystem - making framework-level failure an implausible risk rather than a realistic contingency. Our architecture mitigates further by maintaining a clean separation between the React component layer and SAP Commerce\'s OCC APIs, meaning any framework-level substitution would not disturb the integration or data layer. During the Build phase, we apply structured technical governance including weekly architecture reviews and early spike work on any complex SSR, ISR, or edge-runtime requirements to surface constraints before they become blockers.',
      },
      {
        question: 'How have you managed situations where a client\'s middleware layer created unexpected integration blockers?',
        answer: 'KPS has deep, cross-platform middleware experience spanning SAP Commerce, Salesforce, and custom BFF layers, and in practice, integration blockers are a routine challenge we plan for rather than an exception we react to. Where a blocker originates in a third-party system outside our control, our agile delivery model means we re-prioritise without losing sprint velocity, pulling forward independent workstreams while the upstream issue is resolved. We maintain a living integration risk register throughout the Build phase, which gives us early visibility of potential blockers.',
      },
      {
        question: `Based on what you already know from our context, what do you see as the top three risks specifically for ${client.shortName}'s transformation?`,
        answer: 'Typical risks include legacy complexity in the existing SAP Commerce implementation, integration dependencies with ERP and back end systems, and internal capability gaps during transition to a new architecture.',
      },
    ],
  },
  {
    id: 'qa-references',
    label: 'References & Experience',
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>,
    items: [
      {
        question: 'Would it be possible to speak directly with a reference client?',
        answer: 'We would be very happy to arrange a reference conversation subject to client availability and approval.',
      },
      {
        question: 'How many SAP Commerce Accelerator end-of-life migrations has KPS specifically completed?',
        answer: 'KPS has extensive experience in building and transforming SAP Commerce environments including Accelerator end-of-life scenarios and headless transitions across multiple enterprise clients. We have many SAP Commerce clients (it\'s our core business), all of them are on the non-accelerator journey, or we are planning it with them, or are already there.',
      },
      {
        question: `Have you delivered a headless SAP Commerce solution for a B2B business of comparable complexity to ${client.shortName}?`,
        answer: 'Yes, we thrive on complexity. KPS has delivered SAP Commerce solutions for complex B2B environments and continues to support multiple large commerce platforms through long-term engagements.',
      },
      {
        question: 'Can you provide references from clients where KPS successfully transferred full platform ownership to an internal team?',
        answer: `KPS has a strong track record of building client capability and transitioning platform ownership. Alongside their internal teams, most of our clients retain KPS in some capacity to support with complex projects, architecture leadership, specialist roles or just additional capacity. Ultimately, our goal is to enable ${client.shortName} in as far as they want to go.`,
      },
    ],
  },
];

export default function QaPage({ navigateTo, goHome }: QaPageProps) {
  return (
    <>
      <Hero
        title={
          <>
            Follow-up
            <br />
            <span className="accent">Q&amp;A</span>
          </>
        }
        subtitle={`Detailed answers to ${client.shortName}'s follow-up questions - covering commercial terms, team, technical approach, methodology, capability building, risk, and references.`}
      />

      <StickyNav
        logoText={
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={kps.logoUrl} alt="KPS" style={{ height: 22 }} /> <span>Q&amp;A</span>
          </>
        }
        onHome={goHome}
      />

      <TocLayout links={categories.map((c) => ({
        id: c.id,
        label: c.label.replace(' & Contractual', '').replace(' & Resources', '').replace(' & Functional', '').replace(' & Approach', '').replace(' Building', '').replace(' & Experience', ''),
      }))}>

      {categories.map((category, catIdx) => (
        <section className="section" id={category.id} key={category.id}>
          <Reveal>
            <span className="section-label">
              {String(catIdx + 1).padStart(2, '0')} / {category.label}
            </span>
            <h2>
              {category.icon} {category.label}
            </h2>
          </Reveal>

          <div className="qa-list">
            {category.items.map((item, idx) => (
              <Reveal delay={0.08 * (idx + 1)} key={idx}>
                <div className="qa-item">
                  <div className="qa-question">
                    <span className="qa-q-marker">Q</span>
                    <p>{item.question}</p>
                  </div>
                  <div className="qa-answer">
                    <span className="qa-a-marker">A</span>
                    <div>
                      {item.answer.split('\n\n').map((para, pIdx) => (
                        <p key={pIdx}>
                          {para.split('\n').map((line, lIdx, arr) => (
                            <span key={lIdx}>
                              {line}
                              {lIdx < arr.length - 1 && <br />}
                            </span>
                          ))}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      ))}

      </TocLayout>

      <Footer />
    </>
  );
}
