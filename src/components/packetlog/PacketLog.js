import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import './PacketLog.css';
import useInView from '../../hooks/useInView';

const SCAN_TARGETS = [
  {
    id: 'home',
    host: 'hero',
    ip: '192.168.1.1',
    ports: [
      { port: 22, service: 'ssh', detail: 'Aravind Nandakumar — CSIT Scholar, Co-Founder of GrowCalth' },
      { port: 443, service: 'https', detail: 'TLS 1.3 · typing animation · encrypted bio payload' },
      { port: 8080, service: 'photo', detail: 'Profile image endpoint — aravind-photo.png' },
    ],
    risk: 'CLEAN',
    latency: '0.12ms',
  },
  {
    id: 'skills',
    host: 'skills',
    ip: '192.168.1.2',
    ports: [
      { port: 80, service: 'http', detail: 'JavaScript · React · Python · HTML · CSS · Figma' },
      { port: 443, service: 'https', detail: 'Soft skills: Leadership · Communication · Collaboration' },
    ],
    risk: 'CLEAN',
    latency: '0.08ms',
  },
  {
    id: 'projects',
    host: 'projects',
    ip: '192.168.1.3',
    ports: [
      { port: 3000, service: 'growcalth', detail: 'Kotlin fitness app · 1200+ users · Firebase backend' },
      { port: 5000, service: 'can+een', detail: 'Python canteen ordering system · SST coursework' },
      { port: 8443, service: 'crypto', detail: 'CRYSTALS-Kyber + ChaCha20-Poly1305 payment mockup' },
      { port: 9090, service: 'technogates', detail: 'SIT climate innovation · Lead Developer · 3rd place' },
    ],
    risk: 'INFO',
    latency: '0.34ms',
  },
  {
    id: 'achievements',
    host: 'achievements',
    ip: '192.168.1.4',
    ports: [
      { port: 80, service: 'timeline', detail: '2021–2025 · Academic, Competition, Leadership, Service' },
      { port: 443, service: 'https', detail: 'CSIT Scholarship · Director\'s List · EAGLES Award' },
    ],
    risk: 'CLEAN',
    latency: '0.15ms',
  },
  {
    id: 'certificates',
    host: 'certificates',
    ip: '192.168.1.5',
    ports: [
      { port: 443, service: 'google', detail: 'Google Cybersecurity Certificate · Credly verified' },
      { port: 443, service: 'ibm', detail: 'IBM Cybersecurity Fundamentals · Credly verified' },
      { port: 443, service: 'cisco', detail: 'CISCO Packet Tracer · Network fundamentals' },
      { port: 8443, service: 'linkedin', detail: 'PowerShell · Linux · GenAI for Network Security' },
      { port: 8080, service: 'academic', detail: '18 total certifications across technical, cyber, leadership' },
    ],
    risk: 'HARDENED',
    latency: '0.22ms',
  },
];

const NAV_ITEMS = [
  { id: 'home', label: '~/home', ip: '192.168.1.1' },
  { id: 'skills', label: '~/skills', ip: '192.168.1.2' },
  { id: 'projects', label: '~/projects', ip: '192.168.1.3' },
  { id: 'achievements', label: '~/achievements', ip: '192.168.1.4' },
  { id: 'certificates', label: '~/certificates', ip: '192.168.1.5' },
];

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const riskClass = (r) => {
  if (r === 'CLEAN') return 'scan-green';
  if (r === 'HARDENED') return 'scan-teal';
  if (r === 'INFO') return 'scan-amber';
  return 'scan-muted';
};

const ScanHost = memo(function ScanHost({ target, expanded, onToggle, onNavigate }) {
  return (
    <div className={`scan-host${expanded ? ' expanded' : ''}`}>
      <button className="scan-host-header" onClick={() => onToggle(target.id)} aria-expanded={expanded}>
        <span className="scan-host-ip">{target.ip}</span>
        <span className="scan-host-name">{target.host}</span>
        <span className={`scan-host-risk ${riskClass(target.risk)}`}>{target.risk}</span>
        <span className="scan-host-latency">{target.latency}</span>
        <span className="scan-chevron">{expanded ? '▼' : '▶'}</span>
      </button>

      {expanded && (
        <div className="scan-host-detail">
          <div className="scan-ports">
            {target.ports.map((p) => (
              <div key={p.port} className="scan-port-row">
                <span className="scan-port-num">{p.port}</span>
                <span className="scan-port-proto">tcp</span>
                <span className="scan-port-state">open</span>
                <span className="scan-port-svc">{p.service}</span>
                <span className="scan-port-detail">{p.detail}</span>
              </div>
            ))}
          </div>
          <button className="scan-navigate-btn" onClick={() => onNavigate(target.id)}>
            Navigate to {target.host} ↗
          </button>
        </div>
      )}
    </div>
  );
});

function PacketLog() {
  const [ref, inView] = useInView();
  const [revealedCount, setRevealedCount] = useState(0);
  const [expandedId, setExpandedId] = useState(null);
  const [scanComplete, setScanComplete] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!inView) return;

    setRevealedCount(0);
    setScanComplete(false);
    let count = 0;

    intervalRef.current = setInterval(() => {
      count += 1;
      setRevealedCount(count);
      if (count >= SCAN_TARGETS.length) {
        clearInterval(intervalRef.current);
        setTimeout(() => setScanComplete(true), 600);
      }
    }, 700);

    return () => clearInterval(intervalRef.current);
  }, [inView]);

  const handleToggle = useCallback((id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  const handleNavigate = useCallback((id) => {
    scrollTo(id);
  }, []);

  return (
    <div ref={ref} className="scan-panel">
      <div className="scan-header">
        <span className="scan-title">portscan</span>
        <span className="scan-cmd">nmap -sV -sC portfolio.local</span>
        <span className={`scan-meta${scanComplete ? ' done' : ''}`}>
          {scanComplete ? `${SCAN_TARGETS.length} hosts · complete` : `scanning... ${revealedCount}/${SCAN_TARGETS.length}`}
        </span>
      </div>

      <div className="scan-columns">
        <span>IP ADDRESS</span>
        <span>HOST</span>
        <span>RISK</span>
        <span>LATENCY</span>
      </div>

      <div className="scan-results">
        {SCAN_TARGETS.slice(0, revealedCount).map((t) => (
          <ScanHost
            key={t.id}
            target={t}
            expanded={expandedId === t.id}
            onToggle={handleToggle}
            onNavigate={handleNavigate}
          />
        ))}

        {scanComplete && (
          <div className="scan-summary">
            <span className="scan-summary-line">─── scan complete ───</span>
            <span className="scan-summary-stat">{SCAN_TARGETS.length} hosts scanned</span>
            <span className="scan-summary-stat">{SCAN_TARGETS.reduce((a, t) => a + t.ports.length, 0)} open ports detected</span>
            <span className="scan-summary-stat">{SCAN_TARGETS.filter((t) => t.risk === 'CLEAN').length} clean · {SCAN_TARGETS.filter((t) => t.risk === 'HARDENED').length} hardened · {SCAN_TARGETS.filter((t) => t.risk === 'INFO').length} info</span>
          </div>
        )}
      </div>

      <div className="scan-nav">
        {NAV_ITEMS.map((n) => (
          <button key={n.id} className="scan-nav-btn" onClick={() => scrollTo(n.id)}>
            <span className="scan-nav-ip">{n.ip}</span>
            <span className="scan-nav-label">{n.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default PacketLog;
