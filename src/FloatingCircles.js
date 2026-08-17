import React, { useEffect, useRef } from 'react';

const BALLS = [
  { r: 55, hue: 38, opacity: 0.1 },
  { r: 38, hue: 186, opacity: 0.09 },
  { r: 65, hue: 32, opacity: 0.07 },
  { r: 28, hue: 192, opacity: 0.1 },
  { r: 44, hue: 40, opacity: 0.08 },
  { r: 32, hue: 196, opacity: 0.09 },
  { r: 67, hue: 35, opacity: 0.067 },
];

const BINARY_CHARS = '01';
const FONT_SIZE = 14;
const COLUMN_GAP = 22;

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

function initColumns(W, H) {
  const count = Math.ceil(W / COLUMN_GAP);
  const columns = [];
  for (let i = 0; i < count; i++) {
    const len = Math.floor(randomBetween(8, 20));
    const chars = [];
    for (let j = 0; j < len; j++) {
      chars.push(BINARY_CHARS[Math.floor(Math.random() * 2)]);
    }
    columns.push({
      x: i * COLUMN_GAP + randomBetween(-4, 4),
      y: randomBetween(-H, 0),
      speed: randomBetween(1.2, 3.5),
      chars,
      opacity: randomBetween(0.15, 0.5),
    });
  }
  return columns;
}

function isTerminalTheme() {
  try { return document.body.classList.contains('terminal-theme'); } catch { return false; }
}

function isLightTheme() {
  try { return document.body.classList.contains('light-theme'); } catch { return false; }
}

export default function FloatingCircles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let rafId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Ball state
    const balls = BALLS.map((b) => ({
      ...b,
      x: randomBetween(b.r, window.innerWidth - b.r),
      y: randomBetween(b.r, window.innerHeight - b.r),
      vx: randomBetween(-0.4, 0.4) || 0.3,
      vy: randomBetween(-0.4, 0.4) || 0.3,
    }));

    // Binary rain state
    let columns = initColumns(canvas.width, canvas.height);

    const MIN_SPEED = 0.25;
    const MAX_SPEED = 0.55;

    const tick = () => {
      const W = canvas.width;
      const H = canvas.height;
      const terminal = isTerminalTheme();
      const light = !terminal && isLightTheme();

      ctx.clearRect(0, 0, W, H);

      if (terminal) {
        // ── Binary rain ──
        ctx.font = `${FONT_SIZE}px "IBM Plex Mono", monospace`;

        columns.forEach((col) => {
          col.y += col.speed;

          for (let j = 0; j < col.chars.length; j++) {
            const charY = col.y + j * FONT_SIZE;
            if (charY < -FONT_SIZE || charY > H + FONT_SIZE) continue;

            // Head char is brightest, tail fades
            const headFade = j === 0 ? 1 : Math.max(0, 1 - j / col.chars.length);
            const alpha = col.opacity * headFade;

            // Green with varying brightness
            if (j === 0) {
              ctx.fillStyle = `rgba(0, 255, 65, ${Math.min(alpha + 0.3, 1)})`;
            } else {
              ctx.fillStyle = `rgba(0, 255, 65, ${alpha})`;
            }

            ctx.fillText(col.chars[j], col.x, charY);

            // Randomly swap characters for shimmer
            if (Math.random() < 0.02) {
              col.chars[j] = BINARY_CHARS[Math.floor(Math.random() * 2)];
            }
          }

          // Recycle when off screen
          if (col.y - col.chars.length * FONT_SIZE > H) {
            col.y = randomBetween(-H * 0.5, 0);
            col.speed = randomBetween(1.2, 3.5);
            col.opacity = randomBetween(0.15, 0.5);
            for (let j = 0; j < col.chars.length; j++) {
              col.chars[j] = BINARY_CHARS[Math.floor(Math.random() * 2)];
            }
          }
        });
      } else {
        // ── Floating circles ──
        balls.forEach((b) => {
          const speed = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
          if (speed < MIN_SPEED) {
            const angle = Math.random() * Math.PI * 2;
            b.vx += Math.cos(angle) * 0.1;
            b.vy += Math.sin(angle) * 0.1;
          }
          if (speed > MAX_SPEED) {
            b.vx = (b.vx / speed) * MAX_SPEED;
            b.vy = (b.vy / speed) * MAX_SPEED;
          }

          b.x += b.vx;
          b.y += b.vy;

          if (b.x - b.r < 0) { b.x = b.r; b.vx = Math.abs(b.vx); }
          if (b.x + b.r > W) { b.x = W - b.r; b.vx = -Math.abs(b.vx); }
          if (b.y - b.r < 0) { b.y = b.r; b.vy = Math.abs(b.vy); }
          if (b.y + b.r > H) { b.y = H - b.r; b.vy = -Math.abs(b.vy); }

          const grad = ctx.createRadialGradient(b.x - b.r * 0.3, b.y - b.r * 0.3, 0, b.x, b.y, b.r);
          if (light) {
            grad.addColorStop(0, `hsla(0, 0%, 20%, ${b.opacity * 1.4})`);
            grad.addColorStop(1, `hsla(0, 0%, 20%, 0)`);
          } else {
            grad.addColorStop(0, `hsla(${b.hue}, 80%, 78%, ${b.opacity * 1.8})`);
            grad.addColorStop(1, `hsla(${b.hue}, 70%, 50%, 0)`);
          }

          ctx.beginPath();
          ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
          ctx.strokeStyle = light
            ? `hsla(0, 0%, 20%, ${b.opacity * 0.7})`
            : `hsla(${b.hue}, 70%, 75%, ${b.opacity * 0.9})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        });
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
