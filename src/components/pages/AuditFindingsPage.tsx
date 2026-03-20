'use client';

import { useState, useMemo, useCallback } from 'react';
import StickyNav from '@/components/StickyNav';
import Footer from '@/components/Footer';
import Reveal from '@/components/Reveal';
import { kps } from '@/data/client-config';
import findingsData from '@/data/audit-findings.json';

interface AuditFindingsPageProps {
  navigateTo: (page: string) => void;
  goHome: () => void;
}

interface AuditFinding {
  id: string;
  title: string;
  severity: string;
  section: string;
  description: string;
}

const findings = findingsData as AuditFinding[];

const SEVERITIES = ['Critical', 'High', 'Medium', 'Low'] as const;
const SECTIONS = [
  'Code Quality & Security',
  'Performance',
  'Headless Readiness',
  'JDK21',
  'Next Steps',
] as const;

const severityOrder: Record<string, number> = {
  Critical: 0, High: 1, Medium: 2, Low: 3,
};

const severityClass: Record<string, string> = {
  Critical: 'audit-severity--blocker',
  High: 'audit-severity--high',
  Medium: 'audit-severity--medium',
  Low: 'audit-severity--low',
};

const severityColour: Record<string, string> = {
  Critical: '#ff5252',
  High: '#ffab40',
  Medium: '#ffd740',
  Low: '#66bb6a',
};

function exportToCsv(data: AuditFinding[]) {
  const header = ['ID', 'Severity', 'Section', 'Title', 'Description'];
  const rows = data.map(f => [f.id, f.severity, f.section, f.title, f.description]);

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
  a.download = 'audit-findings-export.csv';
  a.click();
  URL.revokeObjectURL(url);
}

export default function AuditFindingsPage({ navigateTo, goHome }: AuditFindingsPageProps) {
  const [selectedSeverities, setSelectedSeverities] = useState<Set<string>>(new Set());
  const [selectedSections, setSelectedSections] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');

  const toggleSeverity = useCallback((s: string) => {
    setSelectedSeverities(prev => {
      const next = new Set(prev);
      if (next.has(s)) next.delete(s);
      else next.add(s);
      return next;
    });
  }, []);

  const toggleSection = useCallback((s: string) => {
    setSelectedSections(prev => {
      const next = new Set(prev);
      if (next.has(s)) next.delete(s);
      else next.add(s);
      return next;
    });
  }, []);

  const filtered = useMemo(() => {
    let result = [...findings];
    if (selectedSeverities.size > 0) result = result.filter(f => selectedSeverities.has(f.severity));
    if (selectedSections.size > 0) result = result.filter(f => selectedSections.has(f.section));
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(f =>
        f.id.toLowerCase().includes(q) ||
        f.title.toLowerCase().includes(q) ||
        f.description.toLowerCase().includes(q) ||
        f.section.toLowerCase().includes(q)
      );
    }
    result.sort((a, b) => (severityOrder[a.severity] ?? 5) - (severityOrder[b.severity] ?? 5));
    return result;
  }, [selectedSeverities, selectedSections, search]);

  const severityCounts = useMemo(() => {
    const c: Record<string, number> = {};
    findings.forEach(f => { c[f.severity] = (c[f.severity] || 0) + 1; });
    return c;
  }, []);

  const sectionCounts = useMemo(() => {
    const c: Record<string, number> = {};
    findings.forEach(f => { c[f.section] = (c[f.section] || 0) + 1; });
    return c;
  }, []);

  return (
    <>
      <StickyNav
        logoText={<>{/* eslint-disable-next-line @next/next/no-img-element */}<img src={kps.logoUrl} alt="KPS" style={{ height: 22 }} /> <span>Audit Findings</span></>}
        onHome={() => history.back()}
        homeLabel="Back to Report"
      />

      <section className="section" id="findings-filters">
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
            <span style={{ color: 'var(--grey)', fontSize: 14 }}>
              Showing <strong style={{ color: 'var(--cyan)' }}>{filtered.length}</strong> of {findings.length} findings
            </span>
            <button
              className="sonar-export-btn"
              onClick={() => exportToCsv(filtered)}
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
                    {s}
                    <span className="sonar-filter-count">{severityCounts[s] || 0}</span>
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
              <label>Section <span style={{ fontWeight: 400, opacity: 0.6 }}>(multi-select)</span></label>
              <div className="sonar-filter-btns">
                {SECTIONS.map(s => (
                  <button
                    key={s}
                    className={`sonar-filter-btn${selectedSections.has(s) ? ' active' : ''}`}
                    onClick={() => toggleSection(s)}
                  >
                    {s}
                    <span className="sonar-filter-count">{sectionCounts[s] || 0}</span>
                  </button>
                ))}
                {selectedSections.size > 0 && (
                  <button
                    className="sonar-filter-btn sonar-filter-clear"
                    onClick={() => setSelectedSections(new Set())}
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
                placeholder="Filter by ID, title, description, or section..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>
        </Reveal>
      </section>

      <section className="section" id="findings-table" style={{ paddingTop: 0 }}>
        <Reveal>
          <div className="sonar-table-wrap">
            <table className="audit-table sonar-detail-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Severity</th>
                  <th>Section</th>
                  <th>Title</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(f => (
                  <tr key={f.id}>
                    <td style={{ whiteSpace: 'nowrap', fontWeight: 600, fontSize: 13 }}>{f.id}</td>
                    <td>
                      <span className={`audit-severity ${severityClass[f.severity] || ''}`}>
                        {f.severity}
                      </span>
                    </td>
                    <td style={{ whiteSpace: 'nowrap', fontSize: 12, color: 'var(--grey-light)' }}>{f.section}</td>
                    <td style={{ fontWeight: 500, color: 'var(--white)' }}>{f.title}</td>
                    <td className="sonar-message-cell" style={{ color: 'var(--grey-light)' }}>{f.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary by severity */}
          <div style={{ marginTop: 32, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            {SEVERITIES.map(s => (
              <div
                key={s}
                style={{
                  background: 'var(--glass)',
                  border: '1px solid var(--glass-border)',
                  borderRadius: 8,
                  padding: '12px 20px',
                  textAlign: 'center',
                  minWidth: 100,
                }}
              >
                <div style={{ fontSize: 24, fontWeight: 700, color: severityColour[s] }}>{severityCounts[s] || 0}</div>
                <div style={{ fontSize: 12, color: 'var(--grey)', marginTop: 4 }}>{s}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <Footer />
    </>
  );
}
