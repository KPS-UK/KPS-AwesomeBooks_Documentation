/**
 * ============================================================================
 * CLIENT CONFIGURATION
 * ============================================================================
 *
 * This is the single source of truth for all client-specific content.
 * When starting a new project, duplicate this file and update the values.
 *
 * The invented example below is for "Meridian Home & Garden" - a fictional
 * B2B/B2C retailer on SAP Commerce Cloud.
 * ============================================================================
 */

export const client = {
  /** Client company name */
  name: 'AwesomeBooks',
  /** Short name for tight spaces */
  shortName: 'AwesomeBooks',
  /** Client logo URL (white version for dark backgrounds) */
  logoUrl: 'https://storage.googleapis.com/kps-logos/external-brand-logos/customers-prospects/awsomebooks/awsomebooks-logo-white.png',
  /** Primary website URL */
  primaryWebsite: 'https://www.awesomebooks.com',
  /** Secondary / headless website URL (if applicable) */
  headlessWebsite: '',
  /** Year for footer confidential notice */
  year: 2026,
  /** Product verticals / categories */
  verticals: [] as string[],
  /** Target audiences */
  audiences: [] as string[],
  /** B2B features present */
  b2bFeatures: [] as string[],
  /** Business units / brands (used in consolidation options triangle) */
  businessUnits: [] as { name: string; shortName: string; color: string }[],
  /** Regions for CCv2 hosting */
  regions: [] as string[],
};

export const kps = {
  /** KPS logo URL */
  logoUrl: 'https://storage.googleapis.com/kps-logos/kps-brand-logos/kps-logo-white-orange-dot.png',
  /** KPS contact email for this engagement */
  contactEmail: 'proposal@kps.com',
  /** KPS contact name */
  contactName: 'Alex Morgan',
};

export const platform = {
  /** SAP Commerce version */
  commerceVersion: 'SAP Commerce Cloud 2211',
  /** Hosting model */
  hosting: 'CCv2 (Commerce Cloud v2)',
  /** Current frontend framework */
  currentFrontend: 'SAP Commerce Accelerator (JSP)',
  /** Headless frontend (if exists) */
  headlessFrontend: 'SAP Composable Storefront (Angular)',
  /** Proposed frontend */
  proposedFrontend: 'React / Next.js',
  /** ERP system */
  erp: 'SAP S/4HANA',
  /** Middleware */
  middleware: 'SAP CPI (Cloud Platform Integration)',
  /** Search provider */
  search: 'Algolia',
  /** Payment provider */
  payment: 'Adyen',
  /** Email provider */
  email: 'SendGrid',
  /** APM / monitoring */
  monitoring: 'Dynatrace',
  /** Authentication */
  authentication: 'SAP IDP (SAML SSO)',
  /** CRM */
  crm: 'Microsoft Dynamics 365',
  /** Tax calculation */
  tax: 'Avalara',
  /** Content management */
  cms: 'Contentful',
};

export const audit = {
  /** Number of audit areas */
  areaCount: 12,
  /** Audit area names */
  areas: [
    'Extensions',
    'Integrations',
    'Type System',
    'Catalogue',
    'Code Quality & Security',
    'Tests',
    'Performance',
    'Accessibility',
    'Headless Readiness',
    'JDK21 Upgrade Path',
    'CCv2 Configuration',
    'Infrastructure & Monitoring',
  ],
  /** Timeline */
  timeline: {
    startWeek: 'Week 1',
    endWeek: 'Week 3',
    duration: '2-3 weeks',
  },
};

export const metrics = {
  /** Test pass rate */
  testPassRate: '98.7%',
  /** Total test count */
  testCount: '1,840',
  /** Custom OCC endpoints */
  occEndpoints: 38,
  /** Mobile Lighthouse score */
  mobileLighthouse: 28,
  /** Desktop Lighthouse score */
  desktopLighthouse: 52,
  /** Mobile LCP */
  mobileLcp: '24.8s',
  /** Desktop LCP */
  desktopLcp: '5.1s',
  /** CLS */
  cls: '0.48',
  /** Unused JS (KiB) */
  unusedJs: '380 KiB',
  /** Unused CSS (KiB) */
  unusedCss: '92 KiB',
  /** Peak traffic */
  peakTraffic: '12,000 unique IPs/hour',
  /** Test file count */
  testFileCount: 412,
  /** Source file count */
  sourceFileCount: 890,
  /** Test coverage percentage */
  testCoverage: '39%',
  /** SonarQube critical code smells */
  criticalCodeSmells: 142,
  /** Security vulnerabilities */
  securityVulnerabilities: 5,
};

export const extensions = {
  /** Custom extension groups */
  groups: [
    { name: 'commerce', description: 'Core commerce logic (Accelerator + OCC)' },
    { name: 'integration', description: 'Hotfolder inbound and SAP CPI outbound' },
    { name: 'payment', description: 'Adyen payment gateway customisation' },
    { name: 'search', description: 'Algolia search integration and indexing' },
    { name: 'fulfilment', description: 'Order management and warehouse routing' },
    { name: 'promotions', description: 'Custom promotion rules and discount engine' },
    { name: 'punchout', description: 'B2B cXML punchout protocol support' },
    { name: 'sso', description: 'SAML SSO authentication addon' },
    { name: 'content', description: 'CMS components and page templates' },
    { name: 'dataload', description: 'ImpEx scripts and data migration tooling' },
    { name: 'reporting', description: 'Custom reporting and analytics hooks' },
    { name: 'api', description: 'Custom OCC REST API extensions' },
  ],
  /** Deprecated extensions */
  deprecated: [
    'acceleratorstorefrontcommons',
    'addonsupport',
    'smarteditaddon',
    'assistedservicestorefront',
    'b2bacceleratoraddon',
    'customersupportbackoffice',
  ],
};

export const integrations = [
  { name: 'SAP S/4HANA', type: 'ERP', protocol: 'IDoc via SAP CPI', status: 'Active', notes: 'Order, customer, pricing, stock sync' },
  { name: 'SAP CPI', type: 'Middleware', protocol: 'REST / IDoc', status: 'Active', notes: 'Integration orchestration layer' },
  { name: 'Adyen', type: 'Payment', protocol: 'REST API', status: 'Active', notes: 'Library from 2022, upgrade recommended' },
  { name: 'Algolia', type: 'Search', protocol: 'REST API', status: 'Active', notes: 'Product search and indexing' },
  { name: 'SendGrid', type: 'Email', protocol: 'REST API', status: 'Active', notes: 'Library from 2019, upgrade recommended' },
  { name: 'SAP IDP', type: 'Authentication', protocol: 'SAML 2.0', status: 'Active', notes: 'B2B SSO for trade customers' },
  { name: 'Microsoft Dynamics 365', type: 'CRM', protocol: 'OData via CPI', status: 'Active', notes: 'Customer data and segmentation sync' },
  { name: 'Warehouse API', type: 'Fulfilment', protocol: 'REST', status: 'Active', notes: 'Real-time stock and dispatch updates' },
  { name: 'Avalara', type: 'Tax', protocol: 'REST API', status: 'Active', notes: 'Tax calculation for UK, IE, FR' },
  { name: 'Contentful', type: 'CMS', protocol: 'REST API', status: 'Active', notes: 'Headless CMS for trade portal content' },
];

/**
 * Page titles for the site shell - update when adding/removing pages
 */
export const pageTitles: Record<string, string> = {
  home: `${client.name} × KPS`,
  rfp: `Our Response - ${client.name} × KPS`,
  audit: `Technical Audit Scope - ${client.name} × KPS`,
  phased: `Phased Go-Live - ${client.name} × KPS`,
  qa: `Follow-up Q&A - ${client.name} × KPS`,
  'technical-audit-report': `Technical Audit Report - ${client.name} × KPS`,
  'sonar-detail': `Sonar Issues Detail - ${client.name} × KPS`,
  'audit-findings': `Audit Findings Detail - ${client.name} × KPS`,
  factsheet: `Platform Factsheet - ${client.name} × KPS`,
  discovery: `Discovery & Technical Design - ${client.name} × KPS`,
  'consolidation-options': `Consolidation Options - ${client.name} × KPS`,
};

/**
 * Hidden pages - these pages still exist and are routable via direct URL,
 * but are not shown in the homepage navigation. Set to an empty array to
 * show all pages, or add page IDs to hide them.
 */
export const hiddenPages: string[] = [
  'rfp',
  'audit',
  'phased',
  'qa',
  'technical-audit-report',
  'sonar-detail',
  'audit-findings',
  'factsheet',
  'discovery',
  'consolidation-options',
];
