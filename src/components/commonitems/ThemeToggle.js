import React, { useState, useEffect, useCallback } from 'react';

function getInitial() {
  try {
    return localStorage.getItem('site-theme') === 'light';
  } catch {
    return false;
  }
}

function ThemeToggle() {
  const [light, setLight] = useState(getInitial);

  useEffect(() => {
    document.body.classList.toggle('light-theme', light);
    try {
      localStorage.setItem('site-theme', light ? 'light' : 'dark');
    } catch {}
  }, [light]);

  const toggle = useCallback(() => setLight((v) => !v), []);

  return (
    <button
      type="button"
      className="nav-link theme-toggle-btn"
      onClick={toggle}
      aria-pressed={light}
      title={light ? 'Switch to dark theme' : 'Switch to light theme (experimental)'}
    >
      {light ? '● light' : '○ dark'}
    </button>
  );
}

export default ThemeToggle;
