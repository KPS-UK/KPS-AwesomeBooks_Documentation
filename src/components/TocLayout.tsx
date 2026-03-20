'use client';
import TocSidebar from './TocSidebar';

interface TocLink {
  id: string;
  label: string;
  bold?: boolean;
  group?: string;
  groupId?: string;
}

interface TocLayoutProps {
  links: TocLink[];
  children: React.ReactNode;
}

export default function TocLayout({ links, children }: TocLayoutProps) {
  return (
    <div className="toc-content-wrapper">
      <TocSidebar links={links} />
      <div className="toc-main">
        {children}
      </div>
    </div>
  );
}
