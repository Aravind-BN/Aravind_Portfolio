import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import './CommandPalette.css';

const COMMANDS = [
  { id: 'home', label: 'go to home', hint: '~/home', kind: 'nav', target: 'home' },
  { id: 'skills', label: 'go to skills', hint: '~/skills', kind: 'nav', target: 'skills' },
  { id: 'projects', label: 'go to projects', hint: '~/projects', kind: 'nav', target: 'projects' },
  { id: 'achievements', label: 'go to achievements', hint: '~/achievements', kind: 'nav', target: 'achievements' },
  { id: 'certificates', label: 'go to certificates', hint: '~/certificates', kind: 'nav', target: 'certificates' },
  { id: 'github', label: 'open github', hint: '↗ external', kind: 'link', target: 'https://github.com/Aravind-BN' },
  {
    id: 'linkedin',
    label: 'open linkedin',
    hint: '↗ external',
    kind: 'link',
    target: 'https://www.linkedin.com/in/aravind-nandakumar-a8ba05226/',
  },
  { id: 'email', label: 'email aravind', hint: 'mailto', kind: 'mail', target: 'aravindbn54@gmail.com' },
];

function runCommand(cmd, onDone) {
  if (cmd.kind === 'nav') {
    const el = document.getElementById(cmd.target);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else if (cmd.kind === 'link') {
    window.open(cmd.target, '_blank', 'noopener,noreferrer');
  } else if (cmd.kind === 'mail') {
    window.location.href = `mailto:${cmd.target}`;
  }
  onDone();
}

export default function CommandPalette({ open, onClose }) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COMMANDS;
    return COMMANDS.filter((c) => c.label.includes(q) || c.hint.toLowerCase().includes(q));
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement;
    setQuery('');
    setActiveIndex(0);
    const id = requestAnimationFrame(() => inputRef.current?.focus());

    return () => {
      cancelAnimationFrame(id);
      if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
        previouslyFocused.focus();
      }
    };
  }, [open]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const cmd = results[activeIndex];
        if (cmd) runCommand(cmd, onClose);
      }
    },
    [results, activeIndex, onClose]
  );

  if (!open) return null;

  const activeId = results[activeIndex] ? `cmdk-option-${results[activeIndex].id}` : undefined;

  return createPortal(
    <div className="cmdk-overlay" onClick={onClose}>
      <div
        className="cmdk-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="cmdk-input-row">
          <span className="cmdk-prompt" aria-hidden="true">
            ~/
          </span>
          <input
            ref={inputRef}
            className="cmdk-input"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="jump to a section, or open a link…"
            aria-label="Command input"
            role="combobox"
            aria-expanded="true"
            aria-controls="cmdk-listbox"
            aria-activedescendant={activeId}
            autoComplete="off"
          />
          <kbd className="cmdk-esc">esc</kbd>
        </div>

        <ul className="cmdk-list" role="listbox" id="cmdk-listbox">
          {results.length === 0 && <li className="cmdk-empty">no matches</li>}
          {results.map((cmd, i) => (
            <li key={cmd.id} id={`cmdk-option-${cmd.id}`} role="option" aria-selected={i === activeIndex}>
              <button
                type="button"
                tabIndex={-1}
                className={`cmdk-item${i === activeIndex ? ' active' : ''}`}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => runCommand(cmd, onClose)}
              >
                <span className="cmdk-item-label">{cmd.label}</span>
                <span className="cmdk-item-hint">{cmd.hint}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>,
    document.body
  );
}
