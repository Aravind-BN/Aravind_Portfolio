import React, { useState, useEffect, useRef, useCallback } from 'react';
import './CTF.css';

const FLAG = 'FLAG{c1ph3e_m4st3e}';
const BASE64_CLUE = 'VGhlIG5leHQgaW4gdGhlIHNvdXJjZS4=';
const GRANTED_DURATION_MS = 3000;
const SOLVED_KEY = 'ctf-solved';

function CTF() {
  const [showInput, setShowInput] = useState(false);
  const [showGranted, setShowGranted] = useState(false);
  // Solved persists across visits (no more being asked to re-solve after a
  // reload); showHidden is just whether the secret panel is open right now,
  // so it can be closed and reopened without losing the solved state.
  const [solved, setSolved] = useState(() => {
    try { return localStorage.getItem(SOLVED_KEY) === 'true'; } catch { return false; }
  });
  const [showHidden, setShowHidden] = useState(false);
  const [flagValue, setFlagValue] = useState('');
  const [flagError, setFlagError] = useState(false);
  const [terminalTheme, setTerminalTheme] = useState(() => {
    try { return localStorage.getItem('ctf-terminal') === 'true'; } catch { return false; }
  });
  const inputRef = useRef(null);

  // Console clue on mount
  useEffect(() => {
    console.log(
      '%c🔒 [CLASSIFIED]',
      'color: #d98e3f; font-size: 16px; font-weight: bold;'
    );
    console.log(
      '%cDecode this: ' + BASE64_CLUE,
      'color: #4fa3a1; font-family: monospace; font-size: 12px;'
    );
    console.log(
      '%cHint: The answer isn\'t on the page. It\'s in the page.',
      'color: #9a9c8d; font-family: monospace; font-size: 11px;'
    );
  }, []);

  // Ctrl+Shift+F listener — once solved, this just reopens the secret
  // panel directly; it never asks for the flag again.
  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'F') {
        e.preventDefault();
        if (solved) {
          setShowHidden((v) => !v);
        } else {
          setShowInput(true);
        }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [solved]);

  // Terminal theme persistence
  useEffect(() => {
    document.body.classList.toggle('terminal-theme', terminalTheme);
    try { localStorage.setItem('ctf-terminal', String(terminalTheme)); } catch {}
  }, [terminalTheme]);

  // Focus input when panel opens
  useEffect(() => {
    if (showInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showInput]);

  const handleSubmit = useCallback(() => {
    if (flagValue.trim() === FLAG) {
      setShowInput(false);
      setFlagValue('');
      setFlagError(false);
      setShowGranted(true);
      setTimeout(() => {
        setShowGranted(false);
        setSolved(true);
        try { localStorage.setItem(SOLVED_KEY, 'true'); } catch {}
        window.dispatchEvent(new Event('ctf-solved'));
        setShowHidden(true);
      }, GRANTED_DURATION_MS);
    } else {
      setFlagError(true);
      setTimeout(() => setFlagError(false), 2000);
    }
  }, [flagValue]);

  const closeInput = useCallback(() => {
    setShowInput(false);
    setFlagValue('');
    setFlagError(false);
  }, []);

  const closeHidden = useCallback(() => setShowHidden(false), []);

  return (
    <>
      {/* ── Flag input panel ────────────────────────────────── */}
      {showInput && (
        <div className="ctf-overlay" onClick={closeInput}>
          <div className="ctf-panel" onClick={(e) => e.stopPropagation()}>
            <div className="ctf-panel-header">
              <span className="ctf-panel-title">FLAG SUBMISSION</span>
              <button className="ctf-panel-close" onClick={closeInput} aria-label="Close">
                ✕
              </button>
            </div>
            <div className="ctf-panel-body">
              <label className="ctf-label" htmlFor="ctf-flag-input">
                Enter flag:
              </label>
              <input
                ref={inputRef}
                id="ctf-flag-input"
                className={`ctf-flag-input${flagError ? ' ctf-flag-input--error' : ''}`}
                value={flagValue}
                onChange={(e) => setFlagValue(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') handleSubmit(); }}
                placeholder="FLAG{...}"
                autoComplete="off"
                spellCheck="false"
              />
              {flagError && (
                <span className="ctf-error">ACCESS DENIED: invalid flag</span>
              )}
              <button className="ctf-submit" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── ACCESS GRANTED overlay ──────────────────────────── */}
      {showGranted && (
        <div className="ctf-granted">
          <div className="ctf-granted-inner">
            <div className="ctf-granted-icon">&#10003;</div>
            <div className="ctf-granted-title">ACCESS GRANTED</div>
            <div className="ctf-granted-sub">Welcome to the inner circle.</div>
          </div>
        </div>
      )}

      {/* ── Hidden section (revealed after flag) ────────────── */}
      {showHidden && (
        <section className="ctf-secret-section">
          <div className="page-section">
            <div className="ctf-secret-header">
              <h2 className="section-heading">~/you-found-it</h2>
              <button className="ctf-secret-close" onClick={closeHidden} aria-label="Close">
                ✕
              </button>
            </div>
            <div className="ctf-secret-card">
              <p className="ctf-secret-msg">
                Congratulations, you beat my system!
              </p>
              <p className="ctf-secret-msg">
                If you're interested, do not hesitate to reach me over here:
              </p>

              <div className="ctf-secret-contact">
                <span className="ctf-secret-label">Email</span>
                <a href="mailto:aravindbn54@gmail.com" className="ctf-secret-email">
                  aravindbn54@gmail.com
                </a>
              </div>

              <div className="ctf-secret-contact">
                <span className="ctf-secret-label">Phone</span>
                <a href="tel:+6582010539" className="ctf-secret-phone">
                  +65 8201 0539
                </a>
              </div>

              <div className="ctf-secret-theme">
                <span className="ctf-secret-label">Terminal theme</span>
                <button
                  className={`ctf-theme-btn${terminalTheme ? ' active' : ''}`}
                  onClick={() => setTerminalTheme((t) => !t)}
                  aria-label="Toggle terminal theme"
                >
                  <span className="ctf-theme-track">
                    <span className="ctf-theme-thumb" />
                  </span>
                  <span className="ctf-theme-state">{terminalTheme ? 'ON' : 'OFF'}</span>
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default CTF;
