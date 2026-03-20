import SiteShell from '@/components/SiteShell';

export function generateStaticParams() {
  return [
    { slug: [] },
    { slug: ['rfp'] },
    { slug: ['audit'] },
    { slug: ['phased'] },
    { slug: ['qa'] },
    { slug: ['technical-audit-report'] },
    { slug: ['sonar-detail'] },
    { slug: ['audit-findings'] },
    { slug: ['factsheet'] },
    { slug: ['discovery'] },
  ];
}

export default function Page() {
  return <SiteShell />;
}
