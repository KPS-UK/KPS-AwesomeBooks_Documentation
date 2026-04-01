'use client';

import { useState, useCallback, useRef, Fragment } from 'react';
import Hero from '@/components/Hero';
import StickyNav from '@/components/StickyNav';
import TocLayout from '@/components/TocLayout';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import { client, kps } from '@/data/client-config';

interface ConsolidationOptionsPageProps {
  navigateTo: (page: string) => void;
  goHome: () => void;
}

/* ══════════════════════════════════════════════════════════════════════
   INTERACTIVE EXPLORER - DATA LAYER
   5 threshold levels per dimension for maximum responsiveness
   ══════════════════════════════════════════════════════════════════════ */

interface TechContent {
  approach: string[];
  pros: string[];
  cons: string[];
  sapDetail: string[];
  infrastructure: string[];
}

interface ExecCard {
  rating: string;
  color: string;
  headline: string;
  summary: string;
  bullets: string[];
}

interface BackendRec {
  recommendation: string;
  option: string;
  color: string;
  execSummary: string;
  execBullets: string[];
  techDetails: string[];
  techInfra: string[];
  considerations: string[];
}

interface ExecViewMeta {
  dynamicHeadline: string;
  dynamicSubtitle: string;
  whatYouGet: string[];
  whatYouGiveUp: string[];
}

/* -- Technical dimension content (5 levels) -- */
function getTechContent(level: number, dim: 'cost' | 'agility' | 'autonomy'): TechContent {
  const bus = client.businessUnits;
  const buNames = bus.map(b => b.name).join(', ');
  void buNames;

  if (dim === 'cost') {
    if (level > 85) return {
      approach: ['Single monorepo codebase deployed identically to all business units', 'Maximum code reuse - zero duplication of business logic', 'Feature toggles via SAP Commerce site/store config for BU-specific behaviour', 'Unified CI/CD: one build artefact, promoted through environments'],
      pros: ['Lowest TCO - one codebase, one team, one pipeline', 'New BU rollout in days via configuration', 'Security patches applied once for all brands', 'Consistent quality benchmarks across portfolio'],
      cons: ['Every change ships to all storefronts simultaneously', 'Feature toggle sprawl becomes a maintenance burden', 'Single point of failure - a bad deploy affects all BUs', 'Release coordination overhead across all markets'],
      sapDetail: ['Single SAP Commerce extension set serving all sites', 'Shared ImpEx configuration with site-scoped overrides', 'One Spartacus app with lazy-loaded, feature-toggled modules', 'Shared CMS component catalogue with site-visibility rules'],
      infrastructure: ['Single CCv2 subscription with shared dev/staging/prod', 'One CI/CD pipeline per environment tier', 'Shared monitoring dashboards', 'Single search index strategy with site-scoped filtering'],
    };
    if (level > 65) return {
      approach: ['Shared core codebase with thin BU-specific configuration layers', 'Common component library used across all storefronts', 'Unified CI/CD pipeline with per-BU configuration injection', 'Centralised dependency and version management'],
      pros: ['Very low cost of ownership - minor duplication only at config level', 'New market launch takes 1-2 weeks of configuration', 'Single security and upgrade cycle covers most of the estate', 'Developers work in one codebase, reducing context switching'],
      cons: ['BU teams must work within the constraints of the shared core', 'Configuration-only customisation has limits for complex BU needs', 'Release coupling - all BUs on the same deployment cadence', 'Build times grow as the shared codebase scales'],
      sapDetail: ['Shared SAP Commerce extensions with BU-scoped properties files', 'Spartacus feature modules enabled/disabled via environment config', 'Common OCC API layer; BU differences handled via backend config', 'Shared data model with search boost rules per site'],
      infrastructure: ['Single CCv2 subscription, environments sized for combined load', 'One pipeline deploys config-injected artefacts per environment', 'Shared monitoring with BU-scoped alert rules', 'Combined search cores with site-scoped boosting and filtering'],
    };
    if (level > 40) return {
      approach: ['Shared core library consumed as a dependency by BU storefronts', 'Common features built once; BU teams extend as needed', 'Coordinated but independent release schedules', 'Shared infrastructure where practical, BU-specific where needed'],
      pros: ['Good cost balance - shared investment on common features', 'BU teams can extend without being fully constrained', 'Moderate rollout speed for new markets (weeks)', 'Shared security and patching for core components'],
      cons: ['Governance required to manage shared vs. bespoke boundaries', 'Some duplication at the BU extension layer', 'Dependency management complexity between core and BU packages', 'Build pipelines more complex than pure shared approach'],
      sapDetail: ['Shared SAP Commerce extension JAR consumed as a Maven dependency', 'BU-specific extensions override or extend core behaviour', 'Spartacus: shared library NPM package, BU apps import and extend', 'Shared OCC API base; BU-specific endpoints where needed'],
      infrastructure: ['Potentially shared CCv2 or separate subscriptions per region', 'Separate pipelines per BU, pulling from shared core artefact', 'Shared monitoring templates, BU-specific dashboards', 'Separate or shared search - depends on data isolation needs'],
    };
    if (level > 20) return {
      approach: ['Loosely coupled codebases with optional shared libraries', 'Each BU builds and deploys independently', 'Shared knowledge and patterns rather than shared code', 'Occasional code sharing via copy-paste or forking'],
      pros: ['Teams move independently with no coordination tax', 'Each BU can optimise for its own priorities', 'No shared-core bottleneck - faster individual BU delivery', 'Failure isolation - one BU\'s issues don\'t affect others'],
      cons: ['Significant duplication of common functionality', 'Higher total cost - multiple teams solving the same problems', 'Security patching must happen independently per BU', 'Inconsistent implementation quality across the portfolio'],
      sapDetail: ['Independent SAP Commerce codebases per BU (or region)', 'Separate Spartacus apps with no shared component library', 'BU-specific OCC customisations, possibly divergent API contracts', 'Each BU manages its own ImpEx, search config, and CMS'],
      infrastructure: ['Separate CCv2 subscriptions per BU or region', 'Independent CI/CD pipelines per BU', 'BU-specific monitoring; no unified portfolio view', 'Separate search instances per BU'],
    };
    return {
      approach: ['Fully independent codebases with no sharing at all', 'Each BU is a standalone project with its own team and stack', 'No coordination, no shared libraries, no shared infrastructure', 'BUs may even diverge on technology choices over time'],
      pros: ['Absolute autonomy per BU - zero dependencies on others', 'Each BU can pivot technology stack if needed', 'Simplest organisational model - no cross-team governance'],
      cons: ['Highest total cost of ownership in the portfolio', 'Massive duplication of effort on common e-commerce features', 'New market rollouts start from scratch every time', 'No shared learnings; same mistakes repeated across BUs', 'Security and compliance becomes a per-BU responsibility'],
      sapDetail: ['Each BU may run different SAP Commerce patch levels', 'No shared Spartacus components - complete independence', 'Divergent OCC APIs make any future consolidation very expensive', 'No shared CMS strategy - each BU manages content independently'],
      infrastructure: ['Fully separate CCv2 environments per BU', 'No shared tooling, monitoring, or alerting', 'Each BU negotiates its own SAP licensing and capacity', 'No economies of scale on infrastructure costs'],
    };
  }

  if (dim === 'agility') {
    if (level > 85) return {
      approach: ['Strict shared coding standards enforced by automated linting and review gates', 'Comprehensive automated test coverage: unit, integration, E2E across all BUs', 'Single source of truth for data models, business logic, and API contracts', 'Centralised monitoring, logging, alerting, and runbook documentation'],
      pros: ['Low defect rate - issues caught early by automated gates', 'Fast developer onboarding - one consistent codebase to learn', 'Predictable SAP Commerce and Spartacus upgrade path', 'Reduced technical debt accumulation over time'],
      cons: ['Strict standards can feel slow for teams wanting to move fast', 'Governance overhead to maintain and evolve shared conventions', 'Innovation may be constrained by the need for cross-BU consensus', 'BU-specific workarounds harder to implement within strict boundaries'],
      sapDetail: ['Enforced hybris best practices: no direct model manipulation, clean service layers', 'Shared Spartacus coding conventions with strict PR review gates', 'Standardised ImpEx patterns and data migration procedures', 'Unified Type System extensions with documented extension points'],
      infrastructure: ['Centralised SonarQube quality gates across all BUs', 'Shared E2E test suites running against all storefronts', 'Unified monitoring dashboards with automated anomaly detection', 'Shared runbooks and incident response procedures'],
    };
    if (level > 65) return {
      approach: ['Shared coding conventions with automated enforcement on core modules', 'Core test suite covering shared functionality; BU teams add BU-specific tests', 'Common data model with documented extension points for BU attributes', 'Shared monitoring infrastructure with BU-specific dashboards'],
      pros: ['Good consistency without being excessively rigid', 'Developers can move between BU teams with moderate ramp-up', 'Core quality is high; BU-specific quality is team-dependent', 'Upgrade path is clear for shared components'],
      cons: ['BU-specific code may drift from core standards over time', 'Test coverage gaps at the BU extension boundary', 'Monitoring can be noisy when BU-specific issues mix with core alerts', 'Core team becomes a bottleneck for reviewing shared changes'],
      sapDetail: ['Core hybris extensions follow strict standards; BU extensions have lighter governance', 'Shared Spartacus component library with documented override patterns', 'Standardised ImpEx for core data; BU teams manage BU-specific imports', 'Type System extensions documented but not strictly enforced at BU level'],
      infrastructure: ['SonarQube gates on core modules; advisory on BU modules', 'Shared E2E for core flows; BU teams maintain BU-specific E2E', 'Unified monitoring with BU-scoped alert channels', 'Shared incident response for core; BU teams handle BU-specific issues'],
    };
    if (level > 40) return {
      approach: ['Recommended coding conventions shared as guidelines, not enforced by tooling', 'Core test suite exists but coverage varies across BU modules', 'Common data model foundation with significant BU-specific extensions', 'Each BU manages its own monitoring with shared templates'],
      pros: ['Reasonable baseline consistency across the portfolio', 'BU teams have flexibility to choose their own testing strategies', 'Data model supports BU-specific needs without blocking others', 'Shared templates accelerate BU-specific monitoring setup'],
      cons: ['Gradual divergence between BU codebases is likely', 'Testing quality depends heavily on individual BU team discipline', 'Data model complexity grows as BU-specific extensions accumulate', 'Cross-BU debugging is harder when implementations diverge'],
      sapDetail: ['Coding guidelines documented but enforcement is team-by-team', 'Spartacus component sharing is optional - some BUs may fork', 'ImpEx patterns vary between BUs, making cross-BU data work harder', 'Type System extensions may conflict if not carefully coordinated'],
      infrastructure: ['SonarQube available but quality gates not mandatory', 'Test coverage varies significantly between BU codebases', 'Monitoring templates shared but customised differently per BU', 'Incident response is BU-specific with no unified escalation'],
    };
    if (level > 20) return {
      approach: ['Each BU team sets its own coding standards and practices', 'Test coverage is team-dependent - ranges from thorough to minimal', 'Data models diverge between BUs with limited documentation', 'Monitoring is BU-specific with no shared visibility'],
      pros: ['Teams can adopt whatever practices suit them best', 'No governance overhead or cross-BU coordination needed', 'Fast decision-making within each BU team'],
      cons: ['Code quality varies significantly across the portfolio', 'Developers moving between BUs face a steep learning curve', 'Technical debt accumulates unevenly - some BUs become fragile', 'Systemic issues are hard to identify without portfolio-wide visibility'],
      sapDetail: ['Different coding patterns per BU - no shared hybris conventions', 'Spartacus implementations may use different architecture patterns', 'ImpEx and data migration approaches differ per BU', 'Type System knowledge is siloed within each BU team'],
      infrastructure: ['No shared quality gates or automated code analysis', 'Each BU runs its own test infrastructure (or doesn\'t)', 'No cross-BU monitoring - issues discovered in isolation', 'No shared runbooks or incident response coordination'],
    };
    return {
      approach: ['No shared standards - each team operates independently', 'Testing is ad-hoc, often manual, with no shared frameworks', 'Data models are completely independent and undocumented', 'No monitoring strategy - reactive issue discovery only'],
      pros: ['Zero governance cost - teams are fully autonomous', 'Each team can experiment freely with approaches'],
      cons: ['Highest risk of production incidents and regressions', 'Developer mobility between BUs is nearly impossible', 'Technical debt compounds rapidly with no visibility', 'Knowledge is locked in individual team members\' heads', 'Any future consolidation would face massive compatibility challenges'],
      sapDetail: ['No shared hybris knowledge base or coding patterns', 'Spartacus implementations may be on different major versions', 'Data models likely incompatible - consolidation would require migration', 'CMS, ImpEx, and search configurations are completely divergent'],
      infrastructure: ['No shared tooling, infrastructure, or operational practices', 'Quality is entirely dependent on individual team investment', 'No portfolio-level visibility into system health', 'Each BU carries its own operational risk independently'],
    };
  }

  // flexibility / autonomy
  if (level > 85) return {
    approach: ['Each BU has full control over its storefront design, UX, and technology choices', 'Independent branding, layout, navigation, and feature sets per market', 'BU-specific third-party integrations (payment, logistics, CRM)', 'Fully decoupled release cycles - each BU ships when ready', 'Freedom to adopt new frameworks or approaches independently'],
    pros: ['Complete design freedom for brand-specific identity and experience', 'Can tailor UX precisely to local market expectations and regulations', 'No compromise on unique BU requirements - every need can be met', 'A/B testing and experimentation completely unconstrained', 'BU teams can innovate without waiting for cross-team consensus'],
    cons: ['Highest cost to build and maintain separate storefronts', 'Risk of brand inconsistency across the group', 'Duplicate effort on features that could have been shared', 'Group-wide compliance requirements harder to enforce', 'Each BU needs its own specialist frontend team and budget'],
    sapDetail: ['Each BU can choose its own Spartacus architecture and version', 'BU-specific CMS page structure, navigation, and content types', 'Independent SmartEdit configurations per storefront', 'Freedom to use non-Spartacus frontends (React, Vue) if needed'],
    infrastructure: ['Separate JS/CDN hosting per BU storefront', 'Independent frontend build pipelines and deployment schedules', 'BU-specific performance monitoring and Core Web Vitals tracking', 'Each storefront can be on a different tech stack if desired'],
  };
  if (level > 65) return {
    approach: ['Shared foundation with significant brand-specific overrides', 'Configuration-driven theming handles base look-and-feel', 'BU teams can replace entire page layouts and feature modules', 'Extension points designed for deep customisation', 'Mostly independent release cycles with shared-core coordination'],
    pros: ['Strong brand differentiation while sharing foundational plumbing', 'BU teams focus on what makes their brand unique', 'Shared foundation accelerates new BU launches', 'Core updates benefit all BUs but don\'t block BU-specific work'],
    cons: ['Extension point design is critical - bad abstractions cause pain', 'Some brand requirements may push beyond the extension model', 'Shared core updates can break BU-specific overrides', 'Requires skilled architects to maintain the balance'],
    sapDetail: ['Shared Spartacus page layout templates with BU-specific overrides', 'BU-specific CMS components coexist with shared component catalogue', 'Theme tokens (colors, typography, spacing) configurable per BU', 'BU teams can lazy-load entirely custom feature modules'],
    infrastructure: ['Shared build pipeline with BU-specific output bundles', 'BU-specific CDN configurations for different brand assets', 'Shared Lighthouse CI with per-BU performance budgets', 'Feature flags per BU for gradual rollouts'],
  };
  if (level > 40) return {
    approach: ['Shared foundation with configuration-driven theming and feature toggles', 'Brand differences limited to colours, logos, copy, and feature visibility', 'Shared component library with limited override capability', 'Coordinated release cycles - BU-specific changes batch with shared releases'],
    pros: ['Good brand differentiation for most common needs (theming, content)', 'Faster time to market for new BUs with shared baseline', 'Lower total cost than fully independent storefronts', 'Shared UX patterns create consistent cross-brand experience'],
    cons: ['Complex brand requirements may not fit the theming model', 'BU teams feel constrained when they need something non-standard', 'Shared release cycles can slow down individual BU delivery', 'Risk of "escape hatch" overuse undermining the shared core'],
    sapDetail: ['Shared Spartacus component library with theme token overrides', 'CMS-driven content personalisation per BU within shared templates', 'Feature toggles control which Spartacus modules are active per site', 'Shared checkout and PDP flows with BU-specific configuration'],
    infrastructure: ['Shared build outputs per-BU themed bundles', 'Single CDN with BU-scoped routing rules', 'Shared performance monitoring with per-BU filtering', 'Unified feature flag system'],
  };
  if (level > 20) return {
    approach: ['Uniform storefront with minor content-level personalisation', 'Single design system applied identically across all BUs', 'Differences limited to copy, images, and promotional content', 'All BUs follow the same UX patterns and page structures'],
    pros: ['Strongest brand consistency across the portfolio', 'Simplest to build, test, and maintain', 'Fastest possible rollout for new BUs', 'Minimal ongoing design and UX investment'],
    cons: ['Cannot accommodate market-specific UX expectations', 'BUs with unique local needs feel restricted', 'Risk of a "one-size-fits-all" experience that resonates with no-one', 'Cultural and regulatory differences hard to address within rigid templates'],
    sapDetail: ['Single Spartacus app with site-scoped content from CMS', 'Shared page templates - only CMS content differs per BU', 'No BU-specific components or feature modules', 'Shared checkout, PDP, PLP with content-only differences'],
    infrastructure: ['Single build artefact deployed for all BU storefronts', 'Shared CDN and caching strategy', 'Identical performance profile across all BUs', 'No per-BU deployment or feature flag complexity'],
  };
  return {
    approach: ['Identical storefront across all BUs - no customisation at all', 'Single brand identity applied uniformly', 'Content differences managed entirely through CMS', 'No BU-specific features, styling, or layout variations'],
    pros: ['Absolute minimum cost and complexity', 'Fastest possible new BU onboarding - zero frontend work', 'One team, one codebase, one design - maximum simplicity'],
    cons: ['All BUs look and feel identical - no brand personality', 'Local market expectations completely ignored', 'BU stakeholders have zero control over their customer experience', 'Competitive disadvantage in markets expecting tailored experiences', 'Regulatory requirements (language, accessibility, legal) may force divergence anyway'],
    sapDetail: ['Single Spartacus build with no site-specific logic', 'CMS content is the only mechanism for any per-BU variation', 'Shared everything - components, layouts, flows, assets', 'Any future customisation requires rearchitecting the extension model'],
    infrastructure: ['Simplest possible infrastructure - one app, one deploy', 'Single CDN, single monitoring dashboard, single alert channel', 'No feature flags or per-BU configuration needed', 'Migration to a more flexible model would be a significant project'],
  };
}

/* -- Executive card data (zone-based) -- */
function getExecCards(eff: number, maint: number, flex: number) {
  const dominant = eff >= maint && eff >= flex ? 'cost' : maint >= flex ? 'agility' : 'autonomy';
  const balanced = Math.abs(eff - maint) < 25 && Math.abs(maint - flex) < 25;
  const mostAdaptable = dominant === 'agility' && maint > 90 && eff < 40 && flex < 30;
  const bus = client.businessUnits;

  const costImpact: ExecCard = balanced
    ? { rating: 'Medium', color: '#66bb6a', headline: 'Shared core with targeted BU investment', summary: 'A balanced approach invests in a shared foundation - including clean architecture, automated testing, and quality gates - while allowing selective BU-specific spend. Not the cheapest option, but the best value: shared where it matters, bespoke where it counts.', bullets: ['Core platform costs shared across all BUs', 'Incremental per-BU spend on frontend customisation and extensions', 'Upfront investment in architecture quality pays back in faster ongoing delivery and lower maintenance', 'Security and compliance effort mostly centralised'] }
    : mostAdaptable
    ? { rating: 'Medium', color: '#66bb6a', headline: 'Upfront investment in architecture quality', summary: 'Higher upfront cost than the cheapest option, but the investment in clean architecture, automated testing, and quality gates means the platform adapts faster to change - SAP upgrades, regulatory shifts, and new features flow through predictable, short delivery cycles.', bullets: ['Core platform costs shared across all BUs', 'Upfront investment in architecture quality pays back in faster ongoing delivery', `Dedicated frontend for ${bus[0]?.name || 'primary brands'}; smaller BUs share a frontend team`, 'Security and compliance effort mostly centralised'] }
    : dominant === 'cost'
    ? { rating: 'Lowest', color: '#66bb6a', headline: 'Maximum sharing = minimum spend', summary: 'A single shared platform is the cheapest option to run. One backend team, one frontend team, one codebase, one deployment pipeline - costs don\'t multiply as you add new markets.', bullets: ['One backend team and one shared frontend team maintain the entire platform', 'New market launches cost configuration time only', 'Licensing, hosting, and tooling costs shared across all BUs', 'Security and compliance effort is a one-time investment'] }
    : dominant === 'autonomy'
    ? { rating: 'Highest', color: '#ff5252', headline: 'Frontend independence = highest team cost', summary: 'A dedicated frontend team per major BU is the most expensive team model. The shared backend keeps infrastructure and platform costs from multiplying, but frontend investment scales with the number of BUs.', bullets: ['Backend costs shared; major BUs each fund a dedicated frontend team', 'Smaller BUs would realistically share a frontend team', 'Same frontend features built independently across BUs - no reuse', 'Higher total team cost than any other option'] }
    : { rating: 'Medium', color: '#66bb6a', headline: 'Shared core with targeted BU investment', summary: 'A balanced approach invests in a shared foundation while allowing selective BU-specific spend. Not the cheapest option, but the best value - shared where it matters, bespoke where it counts.', bullets: ['Core platform costs shared across all BUs', 'Incremental per-BU spend on frontend customisation and extensions', 'Upfront investment in architecture quality pays back in faster delivery', 'Security and compliance effort mostly centralised'] };

  const timeToMarket: ExecCard = balanced
    ? { rating: 'Fast', color: '#66bb6a', headline: 'Fast launch, fastest ongoing delivery', summary: 'New BUs get a strong shared baseline that accelerates launch. Post-launch, investment in clean architecture and automated testing means the platform responds to change faster than any other option.', bullets: ['New BUs live quickly using the shared foundation', 'Brand-specific features added iteratively post-launch', 'SAP Commerce upgrades absorbed quickly', 'Automated CI/CD pipelines and quality gates mean confident, fast deployments'] }
    : mostAdaptable
    ? { rating: 'Slower start, fastest ongoing', color: '#ffab40', headline: 'Architecture investment upfront, fastest iteration post-launch', summary: 'Higher upfront investment in architecture quality means a slower initial launch. But once live, the platform responds to change faster than any other option.', bullets: ['Slower initial launch due to architecture investment', 'Fastest ongoing feature delivery once live', 'SAP Commerce upgrades absorbed quickly', 'Automated quality gates mean confident, predictable deployments'] }
    : dominant === 'cost'
    ? { rating: 'Fastest', color: '#66bb6a', headline: 'New markets live via configuration', summary: 'Maximum sharing plus investment in automated pipelines and testing. New markets launch through configuration - branding, language, currency, product catalogue.', bullets: ['New BU launch via configuration - no custom development', 'Automated CI/CD pipelines accelerate every release', 'Comprehensive test suites mean confident, fast deployments', 'Proven, tested foundation reduces launch risk'] }
    : dominant === 'autonomy'
    ? { rating: 'Slower', color: '#ffab40', headline: 'More storefronts to build upfront, faster iteration once live', summary: 'Dedicated frontend teams per BU mean more storefronts to build initially - no shared frontend foundation to accelerate launch. But once live, each BU\'s frontend team iterates at their own pace.', bullets: ['Each major BU\'s storefront built independently by its own frontend team', 'No shared frontend foundation to accelerate launch', 'Once live, frontend iteration speed is unconstrained', 'Frontend teams ship independently with zero coordination'] }
    : { rating: 'Fast', color: '#66bb6a', headline: 'Fast launch, fastest ongoing delivery', summary: 'New BUs get a strong shared baseline that accelerates launch. Post-launch, clean architecture means the platform responds to change faster than any other option.', bullets: ['New BUs live quickly using the shared foundation', 'Brand-specific features added iteratively post-launch', 'SAP Commerce upgrades absorbed quickly', 'Automated CI/CD pipelines and quality gates mean confident, fast deployments'] };

  const riskProfile: ExecCard = balanced
    ? { rating: 'Low', color: '#66bb6a', headline: 'BU changes can\'t break other storefronts', summary: 'BU-specific storefront changes are isolated - a problem at one brand can\'t take down another. The shared backend is governed jointly. Feature flags mean BUs adopt features at their own pace.', bullets: ['Storefront changes isolated per BU - no cross-brand regression risk', 'Feature flags let BUs adopt features when ready, not when deployed', 'Shared backend governed by joint board - changes coordinated', 'A backend issue affects all BUs - but that\'s true for every option'] }
    : mostAdaptable
    ? { rating: 'Low', color: '#66bb6a', headline: 'BU changes isolated. Higher investment in preventing backend incidents.', summary: 'Same isolation model as KPS Recommends - storefront changes can\'t break other BUs. The extra architecture investment reduces the likelihood of shared backend incidents.', bullets: ['Storefront changes isolated per BU - no cross-brand regression risk', 'Higher investment in architecture quality reduces backend incident risk', 'Feature flags let BUs adopt features when ready', 'The quality payoff: fewer production incidents, faster recovery'] }
    : dominant === 'cost'
    ? { rating: 'Higher', color: '#ffab40', headline: 'One platform means one risk profile. A bad deploy hits everyone.', summary: 'All BUs share a single platform. A bad deployment or misconfigured feature flag affects every storefront simultaneously. The trade-off for lowest cost is highest coupling.', bullets: ['A bad deployment takes down every storefront simultaneously', 'Feature flag misconfiguration can have portfolio-wide effects', 'No independent release schedules - all BUs deploy together', 'The trade-off for lowest cost is highest coupling'] }
    : dominant === 'autonomy'
    ? { rating: 'Low per BU', color: '#ffab40', headline: 'Storefront problems stay local. Backend is the shared constraint.', summary: `A storefront problem at ${bus[0]?.name || 'one brand'} has zero impact on others. Each BU owns their own storefront quality. The honest tension: backend changes affect everyone, and BU frontend teams compete for backend capacity.`, bullets: ['Zero cross-BU storefront regression risk', 'Each BU\'s storefront team owns their own quality and release schedule', 'Backend changes affect all BUs - this is the shared constraint', 'Brand inconsistency is a strategic choice, not a technical risk'] }
    : { rating: 'Low', color: '#66bb6a', headline: 'BU changes can\'t break other storefronts', summary: 'BU-specific storefront changes are isolated. The shared backend is governed jointly. Feature flags mean BUs adopt features at their own pace, not all at once.', bullets: ['Storefront changes isolated per BU - no cross-brand regression risk', 'Feature flags let BUs adopt features when ready, not when deployed', 'Shared backend governed by joint board - changes coordinated', 'A backend issue affects all BUs - but that\'s true for every option'] };

  const orgImpact: ExecCard = balanced
    ? { rating: 'Dedicated + shared', color: '#66bb6a', headline: 'Major brands get dedicated storefront teams. Smaller BUs share one.', summary: `Every BU gets a storefront built for their customers. Major brands each have a dedicated KPS team building and iterating their storefront. Smaller BUs share a storefront team - lower cost, still brand-specific. The shared backend is constant across all options.`, bullets: ['Major brands each have a dedicated storefront team', 'Smaller BUs share a storefront team - lower cost, still brand-specific', 'Feature flags let any BU adopt features another BU funded', 'Backend is shared across all options - storefront approach is what varies'] }
    : mostAdaptable
    ? { rating: 'Dedicated + shared', color: '#ffab40', headline: 'Same as KPS Recommends - with more investment in delivery speed.', summary: 'Major brands get dedicated storefront teams. Smaller BUs share one. Higher investment in architecture quality means the platform adapts faster to change once live.', bullets: ['Major brands each have a dedicated storefront team', 'Smaller BUs share a storefront team', 'Higher investment in architecture quality and automated testing', 'Fastest ongoing delivery once live - the agility payoff'] }
    : dominant === 'cost'
    ? { rating: 'Shared', color: 'var(--cyan)', headline: 'One storefront team builds for everyone.', summary: 'One shared storefront team builds and maintains all BU storefronts. Feature requests go through a shared backlog - you don\'t control the timeline, but you don\'t pay for a dedicated team either.', bullets: ['One shared storefront team builds all BU storefronts', 'Feature requests compete in a single queue - no BU controls their own roadmap', 'Feature flags let BUs adopt or defer features independently', 'Smallest team footprint - lowest people cost'] }
    : dominant === 'autonomy'
    ? { rating: 'Dedicated per BU', color: '#e040fb', headline: 'Each major BU gets their own storefront team. Total control.', summary: 'Major brands each control their own storefront - priorities, design, release schedule. Smaller BUs would realistically share a team. Total storefront control, but backend changes still go through a shared queue.', bullets: ['Major brands each have a dedicated storefront team - full control', 'Smaller BUs share a storefront team - a dedicated team isn\'t justified at their scale', 'Each major BU owns their storefront priorities and release schedule', 'Backend changes still go through a shared queue - the honest constraint'] }
    : { rating: 'Dedicated + shared', color: '#66bb6a', headline: 'Major brands get dedicated storefront teams. Smaller BUs share one.', summary: 'Every BU gets a storefront built for their customers. Major brands each have a dedicated KPS team. Smaller BUs share a storefront team. The shared backend is constant across all options.', bullets: ['Major brands each have a dedicated storefront team', 'Smaller BUs share a storefront team - lower cost, still brand-specific', 'Feature flags let any BU adopt features another BU funded', 'Backend is shared across all options - storefront approach is what varies'] };

  return { costImpact, timeToMarket, riskProfile, orgImpact };
}

/* -- Backend hosting recommendation (zone-based) -- */
function getBackendRec(eff: number, maint: number, flex: number): BackendRec {
  const balanced = Math.abs(eff - maint) < 25 && Math.abs(maint - flex) < 25;
  const dominant = eff >= maint && eff >= flex ? 'cost' : maint >= flex ? 'agility' : 'autonomy';
  const mostAdaptable = dominant === 'agility' && maint > 90 && eff < 40 && flex < 30;
  const regions = client.regions;

  if (balanced) return {
    recommendation: 'CCv2 Subscriptions',
    option: 'KPS Recommends',
    color: '#66bb6a',
    execSummary: `${regions.length} CCv2 subscriptions (${regions.join(' and ')}) running a single unified codebase. This is the KPS recommended approach - it gives you data residency, independent scaling, and operational independence per region, while keeping a single codebase to maintain and evolve.`,
    execBullets: ['One codebase, multiple environments - the best of both worlds', 'Data residency by design - each region\'s data stays local', 'Each region scales, releases, and operates independently', 'New regions are just another subscription from the same codebase'],
    techDetails: ['Unified Git monorepo with region-specific Spring profiles and properties', `Single build artefact deployed to all ${regions.length} CCv2 subscriptions`, 'Shared CI pipeline builds once; region-specific CD pipelines deploy independently', 'Shared Spartacus component library with region-specific feature flags', 'Unified Type System with region-scoped catalog structures', 'Cross-region E2E test suite validates all instances after each deployment'],
    techInfra: [`${regions.length} CCv2 subscriptions (Small/Medium per region)`, 'Separate search instances per region but shared schema definitions', 'Region-specific CDN configurations with independent cache invalidation', 'Unified monitoring with region-scoped dashboards and alerts', 'Shared SonarQube quality gates; per-region deployment health checks', 'Separate database instances per region - no cross-region data access'],
    considerations: ['Joint governance board is the #1 success factor', 'Cross-region E2E testing is essential to catch configuration drift early', 'Higher infrastructure cost than a single subscription', 'Architect for future regions from day one - avoid region-specific code in the shared core'],
  };
  if (mostAdaptable) return {
    recommendation: `${regions.length} CCv2 Subscriptions`,
    option: 'Most Adaptable',
    color: '#ffab40',
    execSummary: `${regions.length} CCv2 subscriptions (${regions.join(' and ')}) running a single unified codebase with maximum investment in architecture quality. Slower to launch, but the fastest platform to iterate on once live.`,
    execBullets: ['Architecture quality investment upfront pays back in ongoing speed', 'Regions operate independently', 'Quality gates at every stage protect must-not-break flows', 'Fastest platform to adapt to change once live'],
    techDetails: ['Unified Git monorepo with region-specific Spring profiles', 'Single build artefact deployed to all subscriptions', 'Comprehensive automated test coverage with quality gates', 'Clean architecture with well-defined extension points'],
    techInfra: [`${regions.length} CCv2 subscriptions`, 'Centralised SonarQube quality gates across all BUs', 'Shared E2E test suites running against all storefronts', 'Unified monitoring dashboards with automated anomaly detection'],
    considerations: ['Higher upfront investment in architecture quality', 'Governance board essential - maintaining engineering standards is a continuous effort', 'Must-not-break flows protected by comprehensive testing', 'The quality only holds if the engineering discipline does'],
  };
  if (eff > 80 || dominant === 'cost') return {
    recommendation: 'CCv2 Subscriptions',
    option: 'Lowest Cost',
    color: 'var(--cyan)',
    execSummary: 'All Business Units hosted on a single SAP Commerce Cloud (CCv2) subscription. Lowest infrastructure cost, simplest operations, but requires careful capacity planning and data isolation.',
    execBullets: ['One hosting bill, one operations team, one deployment pipeline', 'Fastest possible new market onboarding', 'Must monitor CCv2 capacity limits as BUs grow', 'Requires data isolation strategy between regions'],
    techDetails: ['Single CCv2 subscription: dev to staging to prod environment promotion', 'All BUs share search cores with site-scoped filtering', 'HAC, Backoffice, and SmartEdit shared across all storefronts', 'Feature toggles via SAP Commerce site configuration', 'One CI/CD pipeline with single build artefact promotion', 'Shared monitoring tenant with site-scoped dashboards'],
    techInfra: ['Environment sizing: monitor heap, search index size, and connection pools as BUs scale', 'Consider CCv2 Medium or Large tier for multi-BU workloads', 'CDN configuration: single origin, multi-site routing via host headers', 'Database: single schema with site-scoped data', 'Backup and DR: single recovery strategy covers all BUs'],
    considerations: ['CCv2 has environment sizing upper limits - plan for capacity growth', 'GDPR: multi-region customer data in the same database requires careful access controls', 'A bad deployment affects every BU simultaneously - invest in staged rollouts', 'Feature toggle sprawl is the #1 maintenance risk long-term'],
  };
  if (flex > 70 || dominant === 'autonomy') return {
    recommendation: 'CCv2 Subscriptions',
    option: 'BU Independence',
    color: '#e040fb',
    execSummary: `${regions.length} CCv2 subscriptions (${regions.join(' and ')}) with independently maintained frontend codebases per BU. Each subscription has its own deployment pipeline, while the shared backend codebase is maintained centrally.`,
    execBullets: ['Regions operate independently - different frontend release schedules', 'Infrastructure scales per subscription based on actual demand', 'Data residency solved by design', 'Backend service shared via feature flags; frontend code independent per BU'],
    techDetails: [`${regions.length} CCv2 subscriptions with shared backend, independent frontends`, 'Clean modular architecture: well-defined extension boundaries', 'Per-BU frontend repos with independent CI/CD pipelines', 'Shared backend API layer with BU-scoped endpoints', 'Backend team owns Type System, promotions, pricing, and OCC customisations', 'Frontend teams consume APIs - no direct access to SAP Commerce internals'],
    techInfra: [`${regions.length} CCv2 subscriptions (Small/Medium per region)`, 'Independent monitoring and alerting per region', 'Per-region CDN, database, search, and backup strategies', 'Shared SonarQube instance for quality benchmarking across regions', 'Independent DR strategies per region'],
    considerations: ['Higher infrastructure cost than a single subscription', 'Multiple frontend deployment pipelines to maintain - automate everything', 'Cross-subscription features require additional integration', 'Without deliberate effort, each frontend team reinvents solutions the others have already built'],
  };
  return {
    recommendation: 'CCv2 Subscriptions',
    option: 'KPS Recommends',
    color: '#66bb6a',
    execSummary: `${regions.length} CCv2 subscriptions (${regions.join(' and ')}) running a single unified codebase. This is the KPS recommended approach.`,
    execBullets: ['One codebase, multiple environments - the best of both worlds', 'Data residency by design', 'Each region scales, releases, and operates independently', 'New regions are just another subscription from the same codebase'],
    techDetails: ['Unified Git monorepo with region-specific Spring profiles and properties', `Single build artefact deployed to all ${regions.length} CCv2 subscriptions`, 'Shared CI pipeline builds once; region-specific CD pipelines deploy independently', 'Shared Spartacus component library with region-specific feature flags'],
    techInfra: [`${regions.length} CCv2 subscriptions (Small/Medium per region)`, 'Separate search instances per region but shared schema definitions', 'Unified monitoring with region-scoped dashboards and alerts', 'Separate database instances per region - no cross-region data access'],
    considerations: ['Joint governance board is the #1 success factor', 'Cross-region E2E testing is essential to catch configuration drift early', 'Higher infrastructure cost than a single subscription', 'Architect for future regions from day one'],
  };
}

/* -- Exec view meta: dynamic headline + what you get/give up -- */
function getExecViewMeta(eff: number, maint: number, flex: number): ExecViewMeta {
  const dominant = eff >= maint && eff >= flex ? 'cost' : maint >= flex ? 'agility' : 'autonomy';
  const balanced = Math.abs(eff - maint) < 25 && Math.abs(maint - flex) < 25;
  const mostAdaptable = dominant === 'agility' && maint > 90 && eff < 40 && flex < 30;

  if (balanced) return {
    dynamicHeadline: 'One backend. Storefronts tailored to the BUs that need it most.',
    dynamicSubtitle: 'Major brands get dedicated teams. Smaller BUs share - lower cost, still brand-specific.',
    whatYouGet: ['One BU funds a feature, every other BU can switch it on via feature flags or reuse the shared component', 'Fastest ongoing feature delivery once live - architecture quality means short, predictable delivery cycles', 'Brand-specific frontend features built in isolation - no risk to other storefronts', 'Platform cost split across all BUs - enterprise security, compliance, and monitoring funded collectively'],
    whatYouGiveUp: ['BU requests for shared backend changes join a central prioritisation queue', 'Higher infrastructure cost than running a single subscription', 'Governance adds real overhead: code review, architecture sign-off, shared standards', 'The quality only holds if the engineering discipline does - governance cannot be an afterthought'],
  };
  if (mostAdaptable) return {
    dynamicHeadline: 'KPS Recommends - with agility investment.',
    dynamicSubtitle: 'Same team model, but higher architecture investment. Slower to launch, fastest to iterate once live.',
    whatYouGet: ['Fastest ongoing feature delivery once live - architecture quality means short, predictable delivery cycles', 'SAP Commerce upgrades absorbed quickly - not the drawn-out cycle most SAP customers endure', 'Quality gates everywhere mean the lowest defect rate', 'One BU funds a feature, every other BU can switch it on via feature flags or reuse the shared component'],
    whatYouGiveUp: ['Higher upfront investment in architecture quality - slower initial launch', 'Governance overhead: code review, architecture sign-off, shared standards', 'BU requests for shared backend changes join a central prioritisation queue', 'The quality only holds if the engineering discipline does - governance cannot be an afterthought'],
  };
  if (dominant === 'cost') return {
    dynamicHeadline: 'Shared core. Shared storefront. BU-specific styling.',
    dynamicSubtitle: 'Lowest cost, lowest autonomy. Feature requests compete in a shared backlog.',
    whatYouGet: ['Lowest running cost of any option - infrastructure, licensing, and team costs shared across all BUs', 'New market live via configuration alone - branding, language, currency, catalogue', 'Every shared improvement automatically benefits all BUs via feature flags', 'Smallest team to manage - no coordination overhead between multiple frontend teams'],
    whatYouGiveUp: ['A single bad deployment takes down every storefront simultaneously', 'No BU controls its own release schedule, feature roadmap, or frontend priorities', 'Customisation beyond configuration and feature toggles depends on central team capacity', 'Feature toggle sprawl becomes a long-term maintenance burden if not actively managed'],
  };
  if (dominant === 'autonomy') return {
    dynamicHeadline: 'One backend. Independent storefronts. Total control per BU.',
    dynamicSubtitle: 'Highest autonomy, highest cost. Each major BU funds a dedicated storefront team.',
    whatYouGet: ['Each major BU\'s frontend team owns every storefront decision - feature priorities, release schedules, design direction', 'Zero cross-BU frontend regression risk: a problem at one brand has no impact on others', 'Once live, each BU ships frontend features at its own pace with no external dependencies', 'Backend services still available via feature flags - BUs can adopt shared features if they choose to'],
    whatYouGiveUp: ['Highest running cost of any option - dedicated frontend teams for major BUs on top of the shared backend', 'Frontend features built independently across BUs - all built multiple times', 'Backend changes still go through a shared queue - "total control" applies to the frontend, not the full stack', 'Smaller BUs pay disproportionately if given dedicated teams'],
  };
  return {
    dynamicHeadline: 'One backend. Storefronts tailored to the BUs that need it most.',
    dynamicSubtitle: 'Major brands get dedicated teams. Smaller BUs share - lower cost, still brand-specific.',
    whatYouGet: ['One BU funds a feature, every other BU can switch it on via feature flags or reuse the shared component', 'Fastest ongoing feature delivery once live - architecture quality means short, predictable delivery cycles', 'Brand-specific frontend features built in isolation - no risk to other storefronts', 'Platform cost split across all BUs - enterprise security, compliance, and monitoring funded collectively'],
    whatYouGiveUp: ['BU requests for shared backend changes join a central prioritisation queue', 'Higher infrastructure cost than running a single subscription', 'Governance adds real overhead: code review, architecture sign-off, shared standards', 'The quality only holds if the engineering discipline does - governance cannot be an afterthought'],
  };
}

/* -- Exec Scenarios: BU-specific examples that change dynamically -- */
interface ExecScenario {
  bu: string;
  buColor: string;
  headline: string;
  detail: string;
}

function getExecScenarios(eff: number, maint: number, flex: number): ExecScenario[] {
  const dominant = eff >= maint && eff >= flex ? 'cost' : maint >= flex ? 'agility' : 'autonomy';
  const balanced = Math.abs(eff - maint) < 25 && Math.abs(maint - flex) < 25;
  const mostAdaptable = dominant === 'agility' && maint > 90 && eff < 40 && flex < 30;
  const bus = client.businessUnits;
  const buA = bus[0] || { name: 'Brand A', color: '#6b7d22' };
  const buB = bus[1] || { name: 'Brand B', color: '#1a8fd1' };
  const buC = bus[2] || { name: 'Brand C', color: '#b8c94a' };
  const buD = bus[3] || { name: 'Brand D', color: '#14374a' };

  if (balanced) return [
    { bu: buA.name, buColor: buA.color, headline: `${buA.name} funds a wishlist. Other BUs switch it on.`, detail: `${buA.name} wants a wishlist. The backend team builds the wishlist service into the shared core. ${buA.name}'s frontend team builds the UI for their storefront. The feature is live - and now available to every other BU. ${buB.name} enables it via a feature flag, reuses the frontend component, and translates the labels. ${buC.name} decides not to launch it yet - they leave the flag off. The shared core is maintained centrally.` },
    { bu: buB.name, buColor: buB.color, headline: `${buB.name} launches a wishlist without funding the build.`, detail: `By the time ${buB.name} wants a wishlist, ${buA.name} has already funded and proven it. ${buB.name}'s frontend team enables the feature flag, picks up the shared component, and configures it for their customers. Their team spent zero days building the backend or designing the core UI - they just switched it on and localised it.` },
  ];
  if (mostAdaptable) return [
    { bu: buD.name, buColor: buD.color, headline: `${buD.name} funds a specialised wishlist. The core benefits everyone.`, detail: `${buD.name} wants a wishlist with custom filtering. The backend team builds the wishlist service into the shared core with the custom extension. ${buD.name}'s frontend team builds the UI. The feature is live - and the core wishlist service is now available to every other BU.` },
    { bu: buB.name, buColor: buB.color, headline: `${buB.name} picks up the wishlist and extends it.`, detail: `${buB.name}'s frontend team enables the wishlist feature flag, picks up the shared component, and configures it for their customers. They add their own extension on top. The shared core handles the data model; ${buB.name} owns the custom behaviour.` },
  ];
  if (dominant === 'cost') return [
    { bu: buC.name, buColor: buC.color, headline: `${buC.name} gets a wishlist without asking for it.`, detail: `The shared team builds a wishlist into the platform. It goes live across all storefronts simultaneously - ${buC.name} gets it automatically via a feature flag. No budget required, no request needed. If ${buC.name} doesn't want it yet, the flag stays off.` },
    { bu: buD.name, buColor: buD.color, headline: `${buD.name}'s wishlist idea joins a long queue.`, detail: `${buD.name} wants a wishlist with custom filtering - useful for their specific product categories. That's not a configuration change; it needs custom development. The request goes into the shared backlog alongside every other BU's priorities. It ships when the central team gets to it. ${buD.name} has no way to accelerate it.` },
  ];
  if (dominant === 'autonomy') return [
    { bu: buD.name, buColor: buD.color, headline: `${buD.name} builds a wishlist entirely around their needs.`, detail: `${buD.name}'s frontend team designs their wishlist from scratch around their unique requirements. The backend wishlist service sits in the shared core, but the frontend is entirely ${buD.name}'s - no shared component constraints, no compromise. ${buB.name} could reuse the backend service, but they build their own frontend independently. Both BUs paid to design and build the same type of feature from scratch.` },
    { bu: buB.name, buColor: buB.color, headline: `${buB.name} builds a wishlist that looks nothing like ${buD.name}'s - and that's the point.`, detail: `${buB.name}'s frontend team designs a wishlist for their specific customers. They use the same backend wishlist service, but the frontend is entirely their own. There is no frontend code reuse between the two. The trade-off is clear: total creative control, at the cost of building everything twice.` },
  ];
  return [
    { bu: buA.name, buColor: buA.color, headline: `${buA.name} funds a wishlist. Other BUs switch it on.`, detail: `${buA.name} wants a wishlist. The backend team builds the wishlist service into the shared core. ${buA.name}'s frontend team builds the UI for their storefront. The feature is live - and now available to every other BU.` },
    { bu: buB.name, buColor: buB.color, headline: `${buB.name} launches a wishlist without funding the build.`, detail: `By the time ${buB.name} wants a wishlist, ${buA.name} has already funded and proven it. ${buB.name}'s frontend team enables the feature flag, picks up the shared component, and configures it for their customers.` },
  ];
}

/* -- Interactive triangle explorer -- */
function InteractiveTriangleExplorer() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dragging, setDragging] = useState(false);
  const [mode, setMode] = useState<'exec-detailed' | 'technical'>('exec-detailed');
  const [expandedKpi, setExpandedKpi] = useState<string | null>(null);
  const [scenariosOpen, setScenariosOpen] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const primaryPresetIds = new Set(['kps', 'cheapest', 'freedom', 'fastest-delivery']);

  const tx = 250, ty = 30;
  const lx = 30,  ly = 420;
  const rx = 470, ry = 420;

  const [bary, setBary] = useState({ e: 0.34, m: 0.33, f: 0.33 });

  const dotCx = bary.e * tx + bary.m * lx + bary.f * rx;
  const dotCy = bary.e * ty + bary.m * ly + bary.f * ry;

  const screenToBary = useCallback((clientX: number, clientY: number) => {
    if (!svgRef.current) return;
    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const ctm = svg.getScreenCTM();
    if (!ctm) return;
    const svgPt = pt.matrixTransform(ctm.inverse());
    const px = svgPt.x, py = svgPt.y;

    const denom = (ly - ry) * (tx - rx) + (rx - lx) * (ty - ry);
    let e = ((ly - ry) * (px - rx) + (rx - lx) * (py - ry)) / denom;
    let m = ((ry - ty) * (px - rx) + (tx - rx) * (py - ry)) / denom;
    let f = 1 - e - m;

    if (e < 0) { e = 0; const s = m + f; if (s > 0) { m /= s; f /= s; } else { m = 0.5; f = 0.5; } }
    if (m < 0) { m = 0; const s = e + f; if (s > 0) { e /= s; f /= s; } else { e = 0.5; f = 0.5; } }
    if (f < 0) { f = 0; const s = e + m; if (s > 0) { e /= s; m /= s; } else { e = 0.5; m = 0.5; } }
    const total = e + m + f;
    const ne = e / total, nm = m / total, nf = f / total;

    const snapThreshold = 30;
    const presetPositions = [
      { e: 0.34, m: 0.33, f: 0.33 },
      { e: 0.75, m: 0.15, f: 0.10 },
      { e: 0.10, m: 0.15, f: 0.75 },
      { e: 0.20, m: 0.65, f: 0.15 },
    ];
    for (const p of presetPositions) {
      const ppx = p.e * tx + p.m * lx + p.f * rx;
      const ppy = p.e * ty + p.m * ly + p.f * ry;
      const dist = Math.sqrt((px - ppx) ** 2 + (py - ppy) ** 2);
      if (dist < snapThreshold) {
        setBary(p);
        return;
      }
    }
    setBary({ e: ne, m: nm, f: nf });
  }, []);

  const onPointerDown = useCallback((ev: React.PointerEvent) => {
    setDragging(true);
    setHasInteracted(true);
    (ev.target as Element).setPointerCapture(ev.pointerId);
    screenToBary(ev.clientX, ev.clientY);
  }, [screenToBary]);

  const onPointerMove = useCallback((ev: React.PointerEvent) => {
    if (!dragging) return;
    screenToBary(ev.clientX, ev.clientY);
  }, [dragging, screenToBary]);

  const onPointerUp = useCallback(() => {
    setDragging(false);
    setBary(prev => {
      const allPositions = [
        { e: 0.34, m: 0.33, f: 0.33 },
        { e: 0.75, m: 0.15, f: 0.10 },
        { e: 0.10, m: 0.15, f: 0.75 },
        { e: 0.20, m: 0.65, f: 0.15 },
      ];
      let nearest = allPositions[0];
      let minDist = Infinity;
      for (const p of allPositions) {
        const d = (prev.e - p.e) ** 2 + (prev.m - p.m) ** 2 + (prev.f - p.f) ** 2;
        if (d < minDist) { minDist = d; nearest = p; }
      }
      return nearest;
    });
  }, []);

  const maxB = Math.max(bary.e, bary.m, bary.f);
  const eff = Math.round((bary.e / maxB) * 100);
  const maint = Math.round((bary.m / maxB) * 100);
  const flex = Math.round((bary.f / maxB) * 100);

  const effTech = getTechContent(eff, 'cost');
  const maintTech = getTechContent(maint, 'agility');
  const flexTech = getTechContent(flex, 'autonomy');

  type PresetId = 'kps' | 'cheapest' | 'freedom' | 'fastest-delivery';
  const presets: { id: PresetId; label: string; optionId: string; bary: { e: number; m: number; f: number }; icon: React.ReactNode; color: string }[] = [
    { id: 'kps', label: 'KPS Recommends', optionId: 'Option 1', bary: { e: 0.34, m: 0.33, f: 0.33 }, color: 'rgba(255,255,255,0.9)',
      icon: <></> },
    { id: 'cheapest', label: 'Lowest Cost', optionId: 'Option 2', bary: { e: 0.75, m: 0.15, f: 0.10 }, color: 'var(--cyan)',
      icon: <span style={{ fontSize: 16, fontWeight: 700, lineHeight: 1 }}>&pound;</span> },
    { id: 'freedom', label: 'BU Independence', optionId: 'Option 3', bary: { e: 0.10, m: 0.15, f: 0.75 }, color: '#e040fb',
      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg> },
    { id: 'fastest-delivery', label: 'Most Adaptable', optionId: 'Option 4', bary: { e: 0.20, m: 0.65, f: 0.15 }, color: '#ffab40',
      icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
  ];
  const activePreset = presets.find(p => Math.abs(bary.e - p.bary.e) < 0.02 && Math.abs(bary.m - p.bary.m) < 0.02 && Math.abs(bary.f - p.bary.f) < 0.02);

  const nearestPreset = presets.reduce((nearest, p) => {
    const dist = Math.sqrt((bary.e - p.bary.e) ** 2 + (bary.m - p.bary.m) ** 2 + (bary.f - p.bary.f) ** 2);
    return dist < nearest.dist ? { preset: p, dist } : nearest;
  }, { preset: presets[0], dist: Infinity }).preset;
  const zoneMaxB = Math.max(nearestPreset.bary.e, nearestPreset.bary.m, nearestPreset.bary.f);
  const zoneEff = Math.round((nearestPreset.bary.e / zoneMaxB) * 100);
  const zoneMaint = Math.round((nearestPreset.bary.m / zoneMaxB) * 100);
  const zoneFlex = Math.round((nearestPreset.bary.f / zoneMaxB) * 100);
  const execCards = getExecCards(zoneEff, zoneMaint, zoneFlex);
  const backend = getBackendRec(zoneEff, zoneMaint, zoneFlex);
  const scenarios = getExecScenarios(zoneEff, zoneMaint, zoneFlex);
  const viewMeta = getExecViewMeta(zoneEff, zoneMaint, zoneFlex);

  const kpsCentre = { x: 0.34 * tx + 0.33 * lx + 0.33 * rx, y: 0.34 * ty + 0.33 * ly + 0.33 * ry };

  const barStyle = (pct: number, color: string): React.CSSProperties => ({
    height: 4, borderRadius: 2,
    background: `linear-gradient(90deg, ${color} ${pct}%, rgba(255,255,255,0.08) ${pct}%)`,
    marginTop: 4, marginBottom: 12,
  });

  const cardShell = (children: React.ReactNode, flex2?: string) => (
    <div style={{ flex: flex2 || '1 1 280px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 10 }}>
      {children}
    </div>
  );

  const badge = (text: string, color: string) => (
    <span style={{ fontSize: 11, fontWeight: 700, color, background: `${color}18`, padding: '3px 10px', borderRadius: 20, letterSpacing: '0.03em', whiteSpace: 'nowrap' }}>{text}</span>
  );

  const sectionLabel = (text: string, color?: string) => (
    <p style={{ fontWeight: 700, color: color || 'var(--white)', fontSize: 11, margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{text}</p>
  );

  const bulletList = (items: string[], color?: string) => (
    <ul style={{ margin: 0, padding: '0 0 0 16px', fontSize: 13, lineHeight: 1.65, color: color || 'var(--grey-light)' }}>
      {items.map((t, i) => <li key={i}>{t}</li>)}
    </ul>
  );

  const renderExecCard = (title: string, icon: React.ReactNode, data: ExecCard) => cardShell(<>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {icon}
        <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--white)', margin: 0 }}>{title}</h4>
      </div>
      {badge(data.rating, data.color)}
    </div>
    <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--white)', margin: 0, lineHeight: 1.4 }}>{data.headline}</p>
    <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--grey-light)', margin: 0 }}>{data.summary}</p>
    {bulletList(data.bullets, 'var(--grey)')}
  </>);

  void renderExecCard;

  const renderTechDim = (label: string, pct: number, color: string, content: TechContent) => cardShell(<>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <h4 style={{ fontSize: 15, fontWeight: 700, color: 'var(--white)', margin: 0 }}>{label}</h4>
      <span style={{ fontSize: 13, fontWeight: 600, color }}>{pct}%</span>
    </div>
    <div style={barStyle(pct, color)} />
    <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
      <div style={{ flex: '1 1 130px' }}>{sectionLabel('Pros', '#66bb6a')}{bulletList(content.pros)}</div>
      <div style={{ flex: '1 1 130px' }}>{sectionLabel('Cons', '#ff5252')}{bulletList(content.cons)}</div>
    </div>
    {sectionLabel('Approach')}{bulletList(content.approach, 'var(--grey)')}
    <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 4, paddingTop: 10 }}>
      {sectionLabel('SAP Commerce / Spartacus', 'var(--cyan)')}{bulletList(content.sapDetail, 'var(--grey)')}
    </div>
    <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 2, paddingTop: 10 }}>
      {sectionLabel('Infrastructure / DevOps', '#ffab40')}{bulletList(content.infrastructure, 'var(--grey)')}
    </div>
  </>, '1 1 320px');

  return (
    <div style={{ marginTop: 24 }}>
      {/* Axis explainer - mobile */}
      <div className="axis-explainer-mobile" style={{ display: 'none', marginBottom: 16 }}>
        <div style={{ padding: '14px 18px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12 }}>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <div><div style={{ color: 'var(--cyan)', fontWeight: 700, fontSize: 13 }}>TCO</div><div style={{ color: 'var(--grey-light)', fontSize: 12 }}>How much will it cost to build and run?</div></div>
            <div><div style={{ color: '#ffab40', fontWeight: 700, fontSize: 13 }}>Change Agility</div><div style={{ color: 'var(--grey-light)', fontSize: 12 }}>How quickly can the platform adapt?</div></div>
            <div><div style={{ color: '#e040fb', fontWeight: 700, fontSize: 13 }}>BU Autonomy</div><div style={{ color: 'var(--grey-light)', fontSize: 12 }}>How much control does each BU have?</div></div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 10, marginTop: 2 }}>
              <div style={{ color: 'var(--grey-light)', fontSize: 11, lineHeight: 1.5 }}>For all options, the backend is managed by a centralised {client.shortName} &amp; KPS team. A unified API enables all storefronts with flexibility.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Triangle + Presets layout */}
      <div className="triangle-layout" style={{ position: 'relative', marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: 700 }}>
          <svg
            ref={svgRef}
            viewBox="0 0 500 470"
            style={{ width: '100%', height: 'auto', display: 'block', cursor: dragging ? 'grabbing' : 'grab', touchAction: 'none', userSelect: 'none' }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
          >
            <defs>
              <radialGradient id="tri-glow" cx="50%" cy="60%" r="60%"><stop offset="0%" stopColor="rgba(40,220,202,0.08)" /><stop offset="100%" stopColor="rgba(40,220,202,0)" /></radialGradient>
              <radialGradient id="tri-depth" cx="50%" cy="55%" r="55%"><stop offset="0%" stopColor="rgba(20,30,50,0.0)" /><stop offset="40%" stopColor="rgba(5,10,20,0.15)" /><stop offset="70%" stopColor="rgba(0,0,0,0.45)" /><stop offset="100%" stopColor="rgba(0,0,0,0.7)" /></radialGradient>
              <radialGradient id="nebula-1" cx="30%" cy="65%" r="40%"><stop offset="0%" stopColor="rgba(40,220,202,0.06)" /><stop offset="50%" stopColor="rgba(40,220,202,0.02)" /><stop offset="100%" stopColor="rgba(0,0,0,0)" /></radialGradient>
              <radialGradient id="nebula-2" cx="75%" cy="70%" r="35%"><stop offset="0%" stopColor="rgba(224,64,251,0.05)" /><stop offset="50%" stopColor="rgba(224,64,251,0.015)" /><stop offset="100%" stopColor="rgba(0,0,0,0)" /></radialGradient>
              <radialGradient id="nebula-3" cx="50%" cy="25%" r="30%"><stop offset="0%" stopColor="rgba(255,171,64,0.04)" /><stop offset="50%" stopColor="rgba(255,171,64,0.01)" /><stop offset="100%" stopColor="rgba(0,0,0,0)" /></radialGradient>
              <clipPath id="tri-clip"><polygon points={`${tx},${ty} ${lx},${ly} ${rx},${ry}`} /></clipPath>
              <radialGradient id="dot-spotlight"><stop offset="0%" stopColor={nearestPreset.color} stopOpacity="0.15" /><stop offset="40%" stopColor={nearestPreset.color} stopOpacity="0.06" /><stop offset="100%" stopColor={nearestPreset.color} stopOpacity="0" /></radialGradient>
            </defs>

            <polygon points={`${tx},${ty} ${lx},${ly} ${rx},${ry}`} fill="url(#tri-glow)" />
            <polygon points={`${tx},${ty} ${lx},${ly} ${rx},${ry}`} fill="url(#tri-depth)" />
            <polygon points={`${tx},${ty} ${lx},${ly} ${rx},${ry}`} fill="url(#nebula-1)" />
            <polygon points={`${tx},${ty} ${lx},${ly} ${rx},${ry}`} fill="url(#nebula-2)" />
            <polygon points={`${tx},${ty} ${lx},${ly} ${rx},${ry}`} fill="url(#nebula-3)" />

            {/* Parallax star field */}
            {(() => {
              const cx = 250, cy = 290;
              const offsetX = (dotCx - cx) / cx;
              const offsetY = (dotCy - cy) / cy;
              const layers: [number, number, number, number][][] = [
                [[120,180,0.18,0.15],[380,200,0.15,0.12],[200,350,0.14,0.18],[300,150,0.18,0.1],[270,100,0.15,0.14],[340,170,0.14,0.16],[130,310,0.15,0.13],[250,130,0.12,0.11],[170,250,0.16,0.17],[320,370,0.13,0.14],[400,150,0.14,0.13],[220,420,0.12,0.15],[360,290,0.15,0.12]],
                [[150,280,0.25,0.45],[350,320,0.22,0.4],[250,250,0.2,0.5],[310,280,0.22,0.35],[230,380,0.2,0.42],[390,250,0.22,0.38],[160,200,0.2,0.48],[280,200,0.18,0.44],[200,310,0.24,0.4],[370,370,0.2,0.46],[140,380,0.18,0.42]],
                [[180,120,0.35,0.8],[420,380,0.3,0.75],[100,350,0.28,0.85],[220,300,0.32,0.7],[280,350,0.3,0.9],[200,160,0.35,0.72],[330,220,0.28,0.78],[150,150,0.3,0.82]],
              ];
              return (
                <g clipPath="url(#tri-clip)">
                  {layers.flat().map(([sx, sy, so, depth], si) => {
                    const px = sx + offsetX * depth * 40;
                    const py = sy + offsetY * depth * 30;
                    const r = depth > 0.6 ? 1.5 : depth > 0.3 ? 1.0 : 0.6;
                    return (
                      <circle key={si} cx={px} cy={py} r={r} fill="white" opacity={so}>
                        <animate attributeName="opacity" values={`${so};${so * 0.3};${so}`} dur={`${10 + (si % 5) * 3}s`} repeatCount="indefinite" begin={`${(si % 8) * 1.5}s`} />
                      </circle>
                    );
                  })}
                </g>
              );
            })()}

            <polygon points={`${tx},${ty} ${lx},${ly} ${rx},${ry}`} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="2" />

            {/* Vertex labels */}
            <text x={tx} y={ty - 14} textAnchor="middle" fill="var(--cyan)" fontSize="15" fontWeight="700">TCO</text>
            {mode === 'technical' && <text x={tx} y={ty + 2} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="12">{eff}%</text>}
            <text x={lx - 6} y={ly + 24} textAnchor="start" fill="#ffab40" fontSize="15" fontWeight="700">Change Agility</text>
            {mode === 'technical' && <text x={lx - 6} y={ly + 40} textAnchor="start" fill="rgba(255,255,255,0.5)" fontSize="12">{maint}%</text>}
            <text x={rx + 6} y={ry + 24} textAnchor="end" fill="#e040fb" fontSize="15" fontWeight="700">BU Autonomy</text>
            {mode === 'technical' && <text x={rx + 6} y={ry + 40} textAnchor="end" fill="rgba(255,255,255,0.5)" fontSize="12">{flex}%</text>}

            {/* KPS watermark */}
            {(() => {
              const distToKps = Math.sqrt((dotCx - kpsCentre.x) ** 2 + (dotCy - kpsCentre.y) ** 2);
              const fadeStart = 140, fadeEnd = 35;
              const rawT = distToKps <= fadeEnd ? 0 : distToKps >= fadeStart ? 1 : (distToKps - fadeEnd) / (fadeStart - fadeEnd);
              const easedT = rawT * rawT * (3 - 2 * rawT);
              const watermarkOpacity = 0.12 * easedT;
              const isKpsActive = nearestPreset.id === 'kps';
              const gravRange = 120;
              let kpsOffsetX = 0, kpsOffsetY = 0;
              if (!isKpsActive && distToKps > 0 && distToKps < gravRange) {
                const strength = (1 - distToKps / gravRange) * 40;
                kpsOffsetX = (dotCx - kpsCentre.x) / distToKps * strength;
                kpsOffsetY = (dotCy - kpsCentre.y) / distToKps * strength;
              }
              return watermarkOpacity > 0.005 || isKpsActive ? (
                <g style={{ pointerEvents: 'none', transition: 'transform 0.4s ease-out' }} transform={`translate(${kpsOffsetX}, ${kpsOffsetY})`}>
                  <defs><radialGradient id="kps-aura"><stop offset="0%" stopColor="#66bb6a" stopOpacity="0.6" /><stop offset="35%" stopColor="#66bb6a" stopOpacity="0.25" /><stop offset="70%" stopColor="#66bb6a" stopOpacity="0.08" /><stop offset="100%" stopColor="#66bb6a" stopOpacity="0" /></radialGradient></defs>
                  <circle cx={kpsCentre.x} cy={kpsCentre.y} r={40} fill="url(#kps-aura)" opacity={isKpsActive ? 0 : watermarkOpacity * 3} style={{ transition: 'opacity 0.6s ease' }} />
                  <image href={kps.logoUrl} x={kpsCentre.x - 28} y={kpsCentre.y - 10} width="56" height="20" opacity={isKpsActive ? 0 : watermarkOpacity * 1.5} style={{ transition: 'opacity 0.6s ease' }} />
                </g>
              ) : null;
            })()}

            {/* Zone stars */}
            {presets.filter(p => p.id !== 'kps').map((p) => {
              const baseX = p.bary.e * tx + p.bary.m * lx + p.bary.f * rx;
              const baseY = p.bary.e * ty + p.bary.m * ly + p.bary.f * ry;
              const isActive2 = nearestPreset.id === p.id;
              const distToDot = Math.sqrt((baseX - dotCx) ** 2 + (baseY - dotCy) ** 2);
              const gravRange = 120;
              let offsetX = 0, offsetY = 0;
              if (distToDot > 0 && distToDot < gravRange) {
                const strength = (1 - distToDot / gravRange) * 40;
                offsetX = (dotCx - baseX) / distToDot * strength;
                offsetY = (dotCy - baseY) / distToDot * strength;
              }
              return (
                <g key={p.id} transform={`translate(${offsetX}, ${offsetY})`} style={{ transition: 'transform 0.4s ease-out' }}>
                  {isActive2 ? (<><circle cx={baseX} cy={baseY} r={10} fill={p.color} opacity={0.2} /><circle cx={baseX} cy={baseY} r={5} fill={p.color} opacity={0.55} /><circle cx={baseX} cy={baseY} r={2.5} fill="white" opacity={0.9} /></>) : (<><circle cx={baseX} cy={baseY} r={8} fill={p.color} opacity={0.25} /><circle cx={baseX} cy={baseY} r={4} fill={p.color} opacity={0.55} /><circle cx={baseX} cy={baseY} r={2} fill="white" opacity={0.85} /></>)}
                </g>
              );
            })}

            {/* Connection lines */}
            <line x1={dotCx} y1={dotCy} x2={tx} y2={ty} stroke="var(--cyan)" strokeWidth="1" opacity={bary.e * 1.5} strokeDasharray="4 4" />
            <line x1={dotCx} y1={dotCy} x2={lx} y2={ly} stroke="#ffab40" strokeWidth="1" opacity={bary.m * 1.5} strokeDasharray="4 4" />
            <line x1={dotCx} y1={dotCy} x2={rx} y2={ry} stroke="#e040fb" strokeWidth="1" opacity={bary.f * 1.5} strokeDasharray="4 4" />

            <circle cx={dotCx} cy={dotCy} r={Math.max(30, Math.min(80, Math.min(bary.e, bary.m, bary.f) * 300))} fill="url(#dot-spotlight)" />

            {/* Dot */}
            {(() => {
              const dotColor = nearestPreset.color;
              const isSnapped = !!activePreset;
              const isPrimaryZone = primaryPresetIds.has(nearestPreset.id);
              const isKpsZone = nearestPreset.id === 'kps';
              const innerR = isKpsZone ? 22 : isSnapped ? (isPrimaryZone ? 16 : 11) : 12;
              const coreOpacity = isPrimaryZone ? 0.95 : 0.6;
              return (<>
                <circle cx={dotCx} cy={dotCy} r={innerR + 16} fill={dotColor} opacity={isPrimaryZone ? 0.04 : 0.02} />
                <circle cx={dotCx} cy={dotCy} r={innerR + 10} fill={dotColor} opacity={isPrimaryZone ? 0.08 : 0.04} />
                <circle cx={dotCx} cy={dotCy} r={innerR + 5} fill={dotColor} opacity={isPrimaryZone ? 0.15 : 0.08} />
                <circle cx={dotCx} cy={dotCy} r={innerR} fill={dotColor} opacity={coreOpacity} />
              </>);
            })()}

            {/* Drag hint */}
            {!hasInteracted && (
              <g style={{ pointerEvents: 'none' }}>
                <circle cx={dotCx} cy={dotCy} r="32" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeDasharray="4 3"><animate attributeName="r" values="32;42;32" dur="2s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.5;0;0.5" dur="2s" repeatCount="indefinite" /></circle>
                <circle cx={dotCx} cy={dotCy} r="38" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1"><animate attributeName="r" values="38;50;38" dur="2s" repeatCount="indefinite" begin="0.3s" /><animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" begin="0.3s" /></circle>
                <g opacity="0.7"><animateTransform attributeName="transform" type="translate" values="0,0;0,-3;0,0" dur="2.5s" repeatCount="indefinite" /><text x={dotCx} y={dotCy + 48} textAnchor="middle" dominantBaseline="central" fill="rgba(255,255,255,0.55)" fontSize="10" fontWeight="500" fontFamily="system-ui, sans-serif" letterSpacing="0.05em"><tspan>drag to explore</tspan></text></g>
              </g>
            )}
          </svg>
          {/* KPS logo overlay */}
          {nearestPreset.id === 'kps' && (
            <img src="https://storage.googleapis.com/kps-logos/kps-brand-logos/kps-logo-colour.png" alt="" style={{ position: 'absolute', left: `${(dotCx / 500) * 100}%`, top: `${(dotCy / 470) * 100}%`, transform: 'translate(-50%, -50%)', height: 20, pointerEvents: 'none', opacity: 0.9 }} />
          )}
        </div>
        </div>

        {/* Presets */}
        <div className="triangle-presets" style={{ position: 'absolute', top: 0, right: 0, display: 'flex', flexDirection: 'column', gap: 6, padding: '0 4px' }}>
          {presets.map((p) => {
            const isActive = nearestPreset.id === p.id;
            return (
              <Fragment key={p.id}>
                <button onClick={() => { setBary(p.bary); setHasInteracted(true); }} style={{ padding: '12px 20px', borderRadius: 12, border: isActive ? p.id === 'kps' ? '1.5px solid rgba(255,255,255,0.9)' : `1.5px solid ${p.color}` : '1.5px solid rgba(255,255,255,0.15)', fontSize: 14, fontWeight: 600, cursor: 'pointer', background: isActive ? p.id === 'kps' ? 'rgba(255,255,255,0.92)' : `${p.color}18` : 'rgba(255,255,255,0.05)', color: isActive ? p.id === 'kps' ? '#1a1a2e' : p.color : 'rgba(255,255,255,0.85)', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 7, whiteSpace: 'nowrap' }}>
                  <span style={{ display: 'flex', alignItems: 'center', opacity: isActive ? 1 : 0.8 }}>
                    {p.id === 'kps' ? <img src={isActive ? 'https://storage.googleapis.com/kps-logos/kps-brand-logos/kps-logo-colour.png' : kps.logoUrl} alt="KPS" style={{ height: 16, filter: isActive ? 'none' : 'brightness(10)' }} /> : p.icon}
                  </span>
                  <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}><span>{p.label}</span><span style={{ fontSize: 10, fontWeight: 500, opacity: 0.6 }}>{p.optionId}</span></span>
                </button>
              </Fragment>
            );
          })}
          {!hasInteracted && <p style={{ fontSize: 11, color: 'var(--grey)', margin: '4px 0 0', textAlign: 'center', opacity: 0.7 }}>or click a preset above</p>}
        </div>

        {/* Axis explainer - desktop */}
        <div className="axis-explainer-desktop" style={{ position: 'absolute', top: 0, left: 0, padding: '14px 18px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12, maxWidth: 300 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'left' }}>
            <div><div style={{ color: 'var(--cyan)', fontWeight: 700, fontSize: 13 }}>TCO</div><div style={{ color: 'var(--grey-light)', fontSize: 12 }}>How much will it cost to build and run?</div></div>
            <div><div style={{ color: '#ffab40', fontWeight: 700, fontSize: 13 }}>Change Agility</div><div style={{ color: 'var(--grey-light)', fontSize: 12 }}>How quickly can the platform adapt?</div></div>
            <div><div style={{ color: '#e040fb', fontWeight: 700, fontSize: 13 }}>BU Autonomy</div><div style={{ color: 'var(--grey-light)', fontSize: 12 }}>How much control does each BU have?</div></div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 10, marginTop: 2 }}>
              <div style={{ color: 'var(--grey-light)', fontSize: 11, lineHeight: 1.5 }}>For all options, the backend is managed by a centralised {client.shortName} &amp; KPS team. A unified API enables all storefronts with flexibility.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic headline */}
      <div style={{ margin: '0 0 16px', minHeight: 52, width: '100%', textAlign: 'center' }}>
        <p style={{ fontSize: 17, fontWeight: 600, color: 'var(--white)', lineHeight: 1.5, margin: 0 }}>{viewMeta.dynamicHeadline}</p>
        <p style={{ fontSize: 13, fontWeight: 400, color: 'var(--grey-light)', lineHeight: 1.5, margin: '4px 0 0', opacity: 0.8 }}>{viewMeta.dynamicSubtitle}</p>
      </div>

      {/* Mode switcher */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
        <div style={{ display: 'inline-flex', background: 'rgba(255,255,255,0.06)', borderRadius: 10, padding: 3, border: '1px solid rgba(255,255,255,0.08)' }}>
          {(['exec-detailed', 'technical'] as const).map(m => {
            const labels = { 'exec-detailed': 'Executive', technical: 'Technical' };
            const isActive = mode === m;
            return (<button key={m} onClick={() => { setMode(m); setExpandedKpi(null); }} style={{ padding: '8px 18px', borderRadius: 8, border: 'none', fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', background: isActive ? 'var(--cyan)' : 'transparent', color: isActive ? '#0a0f1a' : 'var(--grey)', whiteSpace: 'nowrap' }}>{labels[m]}</button>);
          })}
        </div>
      </div>

      {/* Content area */}
      {mode === 'technical' ? (<>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          {renderTechDim('TCO', eff, 'var(--cyan)', effTech)}
          {renderTechDim('Change Agility', maint, '#ffab40', maintTech)}
          {renderTechDim('BU Autonomy', flex, '#e040fb', flexTech)}
        </div>

        {/* Backend hosting (technical) */}
        <div style={{ marginTop: 20, background: 'rgba(255,255,255,0.02)', border: `1.5px solid ${backend.color}22`, borderRadius: 14, padding: '20px 24px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: backend.color, borderRadius: '14px 0 0 14px' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: `${backend.color}18`, border: `1.5px solid ${backend.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={backend.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--grey)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>Backend Hosting</div>
                <h4 style={{ fontSize: 17, fontWeight: 700, color: 'var(--white)', margin: 0 }}>{backend.recommendation}</h4>
              </div>
            </div>
            {badge(backend.option, backend.color)}
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--grey-light)', margin: '0 0 16px 0' }}>{backend.execSummary}</p>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 280px' }}>{sectionLabel('Architecture Details', 'var(--cyan)')}{bulletList(backend.techDetails)}<div style={{ marginTop: 12 }}>{sectionLabel('Infrastructure & DevOps', '#ffab40')}{bulletList(backend.techInfra, 'var(--grey)')}</div></div>
            <div style={{ flex: '1 1 240px' }}>{sectionLabel('Considerations', '#ff5252')}{bulletList(backend.considerations, 'var(--grey)')}</div>
          </div>
        </div>
      </>) : (<>
        {/* Executive view */}
        {(() => {
          const isDetailed = true;
          const kpiTiles: { id: string; label: string; rating: string; color: string; headline: string; icon: React.ReactNode; execDetail: React.ReactNode; detailedDetail: React.ReactNode }[] = [
            { id: 'cost', label: 'Cost', rating: execCards.costImpact.rating, color: execCards.costImpact.color, headline: execCards.costImpact.headline,
              icon: <span style={{ fontSize: 18, fontWeight: 700, lineHeight: 1 }}>&pound;</span>,
              execDetail: <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--grey-light)', margin: 0 }}>{execCards.costImpact.summary}</p>,
              detailedDetail: <>{bulletList(execCards.costImpact.bullets)}</> },
            { id: 'speed', label: 'Speed to Market', rating: execCards.timeToMarket.rating, color: execCards.timeToMarket.color, headline: execCards.timeToMarket.headline,
              icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
              execDetail: <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--grey-light)', margin: 0 }}>{execCards.timeToMarket.summary}</p>,
              detailedDetail: <>{bulletList(execCards.timeToMarket.bullets)}</> },
            { id: 'risk', label: 'Risk', rating: execCards.riskProfile.rating, color: execCards.riskProfile.color, headline: execCards.riskProfile.headline,
              icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
              execDetail: <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--grey-light)', margin: 0 }}>{execCards.riskProfile.summary}</p>,
              detailedDetail: <>{bulletList(execCards.riskProfile.bullets)}</> },
            { id: 'org', label: 'Storefront', rating: execCards.orgImpact.rating, color: execCards.orgImpact.color, headline: execCards.orgImpact.headline,
              icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
              execDetail: <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--grey-light)', margin: 0 }}>{execCards.orgImpact.summary}</p>,
              detailedDetail: <>{bulletList(execCards.orgImpact.bullets)}</> },
            { id: 'hosting', label: 'CCv2 Subscriptions', rating: backend.option === 'Lowest Cost' ? '1' : String(client.regions.length), color: backend.color,
              headline: backend.option === 'Lowest Cost' ? '1 subscription' : `${client.regions.length} subscriptions`,
              icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>,
              execDetail: <p style={{ fontSize: 14, lineHeight: 1.65, color: 'var(--grey-light)', margin: 0 }}>{backend.execSummary}</p>,
              detailedDetail: <>{bulletList(backend.execBullets)}<div style={{ marginTop: 10 }}>{sectionLabel('Considerations', '#ffab40')}{bulletList(backend.considerations, 'var(--grey)')}</div></> },
          ];

          return <>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 6 }}>
              {kpiTiles.map(kpi => {
                const isOpen = expandedKpi === kpi.id;
                return (
                  <div key={kpi.id} onClick={() => setExpandedKpi(isOpen ? null : kpi.id)} style={{ background: isOpen ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.03)', border: isOpen ? '1px solid rgba(255,255,255,0.20)' : '1px solid rgba(255,255,255,0.08)', borderRadius: 12, padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 8, cursor: 'pointer', transition: 'all 0.25s ease', userSelect: 'none' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--grey)' }}>{kpi.icon}<span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{kpi.label}</span></div>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--grey)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.25s ease', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0, opacity: 0.5 }}><polyline points="6 9 12 15 18 9"/></svg>
                    </div>
                    <span style={{ fontSize: 20, fontWeight: 800, color: kpi.color, lineHeight: 1.1 }}>{kpi.rating}</span>
                  </div>
                );
              })}
            </div>

            {(() => {
              const activeKpi = kpiTiles.find(k => k.id === expandedKpi);
              return (
                <div style={{ maxHeight: activeKpi ? 600 : 0, opacity: activeKpi ? 1 : 0, overflow: 'hidden', transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease', marginBottom: activeKpi ? 20 : 0 }}>
                  <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 14, padding: '24px 28px', marginTop: 4 }}>
                    {activeKpi && <>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                        <div style={{ display: 'flex', alignItems: 'center', color: activeKpi.color }}>{activeKpi.icon}</div>
                        <h4 style={{ fontSize: 16, fontWeight: 700, color: 'var(--white)', margin: 0 }}>{activeKpi.label}</h4>
                        {badge(activeKpi.rating, activeKpi.color)}
                      </div>
                      <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--white)', margin: '0 0 12px', lineHeight: 1.5 }}>{activeKpi.headline}</p>
                      {isDetailed ? activeKpi.detailedDetail : activeKpi.execDetail}
                    </>}
                  </div>
                </div>
              );
            })()}

            {!expandedKpi && <p style={{ fontSize: 11, color: 'var(--grey)', margin: '0 0 20px', opacity: 0.7 }}>Click any card above to see more detail</p>}

            {/* What you get / give up */}
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <div style={{ flex: '1 1 260px', background: 'rgba(102,187,106,0.06)', border: '1px solid rgba(102,187,106,0.15)', borderRadius: 12, padding: '16px 20px' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#66bb6a', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>What you get</div>
                <ul style={{ margin: 0, padding: '0 0 0 16px', fontSize: 14, lineHeight: 1.7, color: 'var(--grey-light)' }}>{viewMeta.whatYouGet.slice(0, 4).map((b, i) => <li key={`g${i}`}>{b}</li>)}</ul>
              </div>
              <div style={{ flex: '1 1 260px', background: 'rgba(255,82,82,0.06)', border: '1px solid rgba(255,82,82,0.15)', borderRadius: 12, padding: '16px 20px' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#ff5252', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 10 }}>What you give up</div>
                <ul style={{ margin: 0, padding: '0 0 0 16px', fontSize: 14, lineHeight: 1.7, color: 'var(--grey-light)' }}>{viewMeta.whatYouGiveUp.slice(0, 4).map((b, i) => <li key={`l${i}`}>{b}</li>)}</ul>
              </div>
            </div>

            {/* In Practice scenarios */}
            {isDetailed && (<>
              <div onClick={() => setScenariosOpen(!scenariosOpen)} style={{ marginTop: 20, padding: '16px 20px', background: scenariosOpen ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)', border: `1px solid ${scenariosOpen ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.08)'}`, borderRadius: 14, cursor: 'pointer', transition: 'all 0.25s ease', userSelect: 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: `${nearestPreset.color}15`, border: `1.5px solid ${nearestPreset.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={nearestPreset.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--grey)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>In Practice</div>
                      <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--white)', lineHeight: 1.3 }}>{scenarios[0].headline}</div>
                    </div>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--grey)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'transform 0.25s ease', transform: scenariosOpen ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0, opacity: 0.5 }}><polyline points="6 9 12 15 18 9"/></svg>
                </div>

                <div style={{ maxHeight: scenariosOpen ? 2000 : 0, opacity: scenariosOpen ? 1 : 0, overflow: 'hidden', transition: 'max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    {scenarios.map((s, i) => (
                      <div key={i} style={{ display: 'flex', gap: 14, padding: '14px 16px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, borderLeft: `3px solid ${s.buColor}` }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}><span style={{ fontSize: 11, fontWeight: 700, color: s.buColor, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.bu}</span></div>
                          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--white)', lineHeight: 1.4, marginBottom: 4 }}>{s.headline}</div>
                          <div style={{ fontSize: 13, lineHeight: 1.65, color: 'var(--grey-light)' }}>{s.detail}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>)}
          </>;
        })()}
      </>)}
    </div>
  );
}

export default function ConsolidationOptionsPage({ navigateTo, goHome }: ConsolidationOptionsPageProps) {
  void navigateTo;
  return (
    <>
      <Hero
        title={<>Consolidation <span className="accent">Options</span></>}
        subtitle={`Architecture options for unifying the ${client.shortName} SAP Commerce platforms into a scalable, multi-market foundation.`}
      />

      <StickyNav
        logoText={<>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={kps.logoUrl} alt="KPS" style={{ height: 22 }} /> <span>Consolidation Options</span>
        </>}
        onHome={goHome}
      />

      <TocLayout links={[
        { id: 'co-explorer', label: 'Interactive Explorer', group: 'Explorer', groupId: 'co-explorer' },
      ]}>

      <section className="section" id="co-explorer">
        <Reveal>
          <span className="section-label">Interactive</span>
          <h2>Consolidation Options Explorer</h2>
          <p className="section-intro">
            Drag the dot to explore how <span className="hl">prioritising cost, agility, or BU autonomy</span> affects the approach, benefits, and trade-offs of each consolidation strategy.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <InteractiveTriangleExplorer />
        </Reveal>
      </section>

      </TocLayout>

      <Footer />
    </>
  );
}
