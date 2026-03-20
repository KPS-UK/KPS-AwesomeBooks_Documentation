'use client';

import { useState, useMemo, useCallback } from 'react';
import StickyNav from '@/components/StickyNav';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import { kps } from '@/data/client-config';
import sonarData from '@/data/sonar-issues.json';

interface SonarDetailPageProps {
  navigateTo: (page: string) => void;
  goHome: () => void;
}

const SEVERITIES = ['BLOCKER', 'CRITICAL', 'MAJOR', 'MINOR', 'INFO'] as const;
const TYPES = ['VULNERABILITY', 'BUG', 'CODE_SMELL'] as const;

interface SonarIssue {
  Severity: string;
  Type: string;
  Message: string;
  Component: string;
  Line: number;
  Rule: string;
  Author: string;
  Debt: string;
}

const issues = sonarData as SonarIssue[];

const severityOrder: Record<string, number> = {
  BLOCKER: 0, CRITICAL: 1, MAJOR: 2, MINOR: 3, INFO: 4,
};

const severityClass: Record<string, string> = {
  BLOCKER: 'audit-severity--blocker',
  CRITICAL: 'audit-severity--high',
  MAJOR: 'audit-severity--medium',
  MINOR: 'audit-severity--low',
  INFO: 'audit-severity--info',
};

const typeLabel: Record<string, string> = {
  VULNERABILITY: 'Vulnerability',
  BUG: 'Bug',
  CODE_SMELL: 'Code Smell',
};

function exportToExcel(data: SonarIssue[]) {
  const header = ['Severity', 'Type', 'Message', 'File', 'Line'];
  const rows = data.map(i => [
    i.Severity,
    typeLabel[i.Type] || i.Type,
    i.Message,
    i.Component,
    i.Line || '',
  ]);

  const escape = (v: unknown) => {
    const s = String(v ?? '');
    return s.includes(',') || s.includes('"') || s.includes('\n')
      ? '"' + s.replace(/"/g, '""') + '"'
      : s;
  };

  const csv = [header, ...rows].map(r => r.map(escape).join(',')).join('\n');
  const BOM = '\uFEFF';
  const blob = new Blob([BOM + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sonar-issues-export.csv';
  a.click();
  URL.revokeObjectURL(url);
}

export default function SonarDetailPage({ navigateTo, goHome }: SonarDetailPageProps) {
  const [selectedSeverities, setSelectedSeverities] = useState<Set<string>>(new Set(['BLOCKER', 'CRITICAL']));
  const [selectedTypes, setSelectedTypes] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');

  const toggleSeverity = useCallback((s: string) => {
    setSelectedSeverities(prev => {
      const next = new Set(prev);
      if (next.has(s)) next.delete(s);
      else next.add(s);
      return next;
    });
  }, []);

  const toggleType = useCallback((t: string) => {
    setSelectedTypes(prev => {
      const next = new Set(prev);
      if (next.has(t)) next.delete(t);
      else next.add(t);
      return next;
    });
  }, []);

  const filtered = useMemo(() => {
    let result = [...issues];
    if (selectedSeverities.size > 0) result = result.filter(i => selectedSeverities.has(i.Severity));
    if (selectedTypes.size > 0) result = result.filter(i => selectedTypes.has(i.Type));
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(i =>
        i.Message.toLowerCase().includes(q) ||
        i.Component.toLowerCase().includes(q) ||
        i.Rule.toLowerCase().includes(q)
      );
    }
    result.sort((a, b) => (severityOrder[a.Severity] ?? 5) - (severityOrder[b.Severity] ?? 5));
    return result;
  }, [selectedSeverities, selectedTypes, search]);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    issues.forEach(i => { c[i.Severity] = (c[i.Severity] || 0) + 1; });
    return c;
  }, []);

  return (
    <>
      <StickyNav
        logoText={<>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={kps.logoUrl} alt="KPS" style={{ height: 22 }} /> <span>Sonar Detail</span></>}
        onHome={goHome}
        homeLabel="Back to Report"
      />

      <section className="section" id="sonar-filters">
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
            <span style={{ color: 'var(--grey)', fontSize: 14 }}>
              Showing <strong style={{ color: 'var(--cyan)' }}>{filtered.length}</strong> of {issues.length} issues
            </span>
            <button
              className="sonar-export-btn"
              onClick={() => exportToExcel(filtered)}
            >
              Export to CSV
            </button>
          </div>

          <div className="sonar-filters">
            <div className="sonar-filter-group">
              <label>Severity <span style={{ fontWeight: 400, opacity: 0.6 }}>(multi-select)</span></label>
              <div className="sonar-filter-btns">
                {SEVERITIES.map(s => (
                  <button
                    key={s}
                    className={`sonar-filter-btn${selectedSeverities.has(s) ? ' active' : ''}`}
                    onClick={() => toggleSeverity(s)}
                  >
                    {s.charAt(0) + s.slice(1).toLowerCase()}
                    <span className="sonar-filter-count">{counts[s] || 0}</span>
                  </button>
                ))}
                {selectedSeverities.size > 0 && (
                  <button
                    className="sonar-filter-btn sonar-filter-clear"
                    onClick={() => setSelectedSeverities(new Set())}
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            <div className="sonar-filter-group">
              <label>Type <span style={{ fontWeight: 400, opacity: 0.6 }}>(multi-select)</span></label>
              <div className="sonar-filter-btns">
                {TYPES.map(t => (
                  <button
                    key={t}
                    className={`sonar-filter-btn${selectedTypes.has(t) ? ' active' : ''}`}
                    onClick={() => toggleType(t)}
                  >
                    {typeLabel[t]}
                  </button>
                ))}
                {selectedTypes.size > 0 && (
                  <button
                    className="sonar-filter-btn sonar-filter-clear"
                    onClick={() => setSelectedTypes(new Set())}
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            <div className="sonar-filter-group">
              <label>Search</label>
              <input
                type="text"
                className="sonar-search"
                placeholder="Filter by message, file, or rule..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section" id="sonar-table" style={{ paddingTop: 0 }}>
        <Reveal>
          <div className="sonar-table-wrap">
            <table className="audit-table sonar-detail-table">
              <thead>
                <tr>
                  <th>Severity</th>
                  <th>Type</th>
                  <th>Message</th>
                  <th>File</th>
                  <th>Line</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((issue, idx) => (
                  <tr key={idx}>
                    <td>
                      <span className={`audit-severity ${severityClass[issue.Severity] || ''}`}>
                        {issue.Severity}
                      </span>
                    </td>
                    <td style={{ whiteSpace: 'nowrap', fontSize: 12 }}>
                      {typeLabel[issue.Type] || issue.Type}
                    </td>
                    <td className="sonar-message-cell">{issue.Message}</td>
                    <td className="sonar-file-cell" title={issue.Component}>{issue.Component.split('/').pop()}</td>
                    <td style={{ textAlign: 'center' }}>{issue.Line || ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </section>

      <Footer />
    </>
  );
}
