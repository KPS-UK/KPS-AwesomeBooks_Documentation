'use client';
import { useEffect, useRef, useState } from 'react';
import { client, kps } from '@/data/client-config';

interface TocLink {
  id: string;
  label: string;
  bold?: boolean;
  group?: string;
  groupId?: string;
}

interface TocSidebarProps {
  links: TocLink[];
}

export default function TocSidebar({ links }: TocSidebarProps) {
  const [activeIdx, setActiveIdx] = useState(-1);
  const [lineHeight, setLineHeight] = useState(0);
  const [footerVisible, setFooterVisible] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const onScroll = () => {
      let currentIdx = -1;
      for (let i = 0; i < links.length; i++) {
        const el = document.getElementById(links[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) currentIdx = i;
        }
      }
      // If scrolled to the bottom of the page, highlight the last section
      const atBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 100);
      if (atBottom && links.length > 0) currentIdx = links.length - 1;
      setActiveIdx(currentIdx);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [links]);

  useEffect(() => {
    if (!listRef.current || activeIdx < 0) { setLineHeight(0); return; }
    const dots = listRef.current.querySelectorAll('.toc-dot');
    if (dots[activeIdx]) {
      const listTop = listRef.current.getBoundingClientRect().top;
      const dotRect = dots[activeIdx].getBoundingClientRect();
      setLineHeight(dotRect.top + dotRect.height / 2 - listTop);
      // Auto-scroll the TOC list to keep the active item visible
      const activeButton = dots[activeIdx].closest('button');
      if (activeButton) {
        activeButton.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      }
    }
  }, [activeIdx, links]);

  // Watch the footer to hide TOC logos when footer logos are visible
  useEffect(() => {
    const footer = document.querySelector('.doc-footer');
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  // Find the active group by looking for the last group label at or before activeIdx
  let activeGroup = '';
  if (activeIdx >= 0) {
    for (let i = activeIdx; i >= 0; i--) {
      if (links[i].group) { activeGroup = links[i].group!; break; }
    }
  }

  // Build a map of which group each link belongs to
  const linkGroups: string[] = [];
  let currentGroup = '';
  for (const link of links) {
    if (link.group) currentGroup = link.group;
    linkGroups.push(currentGroup);
  }

  return (
    <aside className="toc-sidebar">
      <ul className="toc-list" ref={listRef}>
        {links.map((link, i) => {
          const passed = i < activeIdx;
          const active = i === activeIdx;
          const inActiveGroup = activeGroup && linkGroups[i] === activeGroup;
          return (
            <li key={link.id}>
              {link.group && <button className={`toc-group${link.group === activeGroup ? ' toc-group--active' : ''}`} onClick={() => scrollTo(link.groupId || link.id)}>{link.group}</button>}
              <button
                className={`toc-link${active ? ' active' : ''}${passed ? ' passed' : ''}${link.bold ? ' toc-link--bold' : ''}${inActiveGroup && !active ? ' toc-link--in-group' : ''}`}
                onClick={() => scrollTo(link.id)}
              >
                <span className="toc-dot" />
                <span className="toc-text">{link.label}</span>
              </button>
            </li>
          );
        })}
        <div className="toc-progress-line" style={{ height: lineHeight > 0 ? `${lineHeight}px` : '0' }} />
      </ul>
      <div className={`toc-logos${footerVisible ? ' toc-logos--hidden' : ''}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={client.logoUrl} alt={client.shortName} />
        <div className="toc-logo-sep" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={kps.logoUrl} alt="KPS" />
      </div>
    </aside>
  );
}
