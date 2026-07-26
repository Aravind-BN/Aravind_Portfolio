import React, { useState, useEffect, useRef, useCallback } from 'react';
import './EncryptionReveal.css';
import useInView from '../../hooks/useInView';

const HEX_CHARS = '0123456789abcdef';
const CIPHER_CHARS = '!@#$%^&*0123456789abcdefABCDEF';
const CYCLE_SPEED_MS = 30;
const CHARS_PER_TICK = 3;

function randomChar(pool) {
  return pool[Math.floor(Math.random() * pool.length)];
}

function EncryptionReveal({ text, tag = 'classified' }) {
  const [ref, inView] = useInView();
  const [display, setDisplay] = useState('');
  const [status, setStatus] = useState('ENCRYPTED');
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(null);
  const revealedRef = useRef(0);
  const lastTickRef = useRef(0);

  const decrypt = useCallback(() => {
    const now = performance.now();
    if (now - lastTickRef.current < CYCLE_SPEED_MS) {
      rafRef.current = requestAnimationFrame(decrypt);
      return;
    }
    lastTickRef.current = now;

    const target = revealedRef.current + CHARS_PER_TICK;
    const newRevealed = Math.min(target, text.length);
    revealedRef.current = newRevealed;

    let result = '';
    for (let i = 0; i < text.length; i++) {
      if (i < newRevealed) {
        result += text[i];
      } else {
        result += randomChar(i % 2 === 0 ? HEX_CHARS : CIPHER_CHARS);
      }
    }

    setDisplay(result);
    setProgress(Math.round((newRevealed / text.length) * 100));

    if (newRevealed >= text.length) {
      setStatus('DECRYPTED');
      return;
    }
    rafRef.current = requestAnimationFrame(decrypt);
  }, [text]);

  useEffect(() => {
    if (!inView) return;
    setStatus('DECRYPTING...');
    rafRef.current = requestAnimationFrame(decrypt);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [inView, decrypt]);

  useEffect(() => {
    if (!inView) {
      let idle = '';
      for (let i = 0; i < text.length; i++) {
        idle += randomChar(i % 2 === 0 ? HEX_CHARS : CIPHER_CHARS);
      }
      setDisplay(idle);
    }
  }, [inView, text]);

  return (
    <div ref={ref} className="enc-reveal">
      <div className="enc-header">
        <span className="enc-tag">{`[${tag}]`}</span>
        <span className={`enc-status${status === 'DECRYPTED' ? ' done' : ''}`}>
          {status}
        </span>
        <span className="enc-progress">{progress}%</span>
      </div>
      <div className="enc-body">
        <p className="enc-text">{display || ' '}</p>
      </div>
      <div className="enc-footer">
        <span className="enc-label">PAYLOAD</span>
        <span className="enc-dots">{status === 'DECRYPTING...' ? '●●●' : '○○○'}</span>
      </div>
    </div>
  );
}

export default EncryptionReveal;
