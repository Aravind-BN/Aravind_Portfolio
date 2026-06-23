import React, { useEffect, useRef } from 'react';

// Hues now alternate between the portfolio's two accent colors (amber ~38,
// teal ~190) instead of the previous blue/violet set, so the ambient
// background matches the rest of the palette.
const BALLS = [
  { r: 55, hue: 38, opacity: 0.1 },
  { r: 38, hue: 186, opacity: 0.09 },
  { r: 65, hue: 32, opacity: 0.07 },
  { r: 28, hue: 192, opacity: 0.1 },
  { r: 44, hue: 40, opacity: 0.08 },
  { r: 32, hue: 196, opacity: 0.09 },
  { r: 67, hue: 35, opacity: 0.067 },
];

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

export default function FloatingCircles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let rafId;

    // Size canvas to the viewport (fixed position, so viewport is all we need)
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialise ball state entirely in a plain array (no React state)
    const balls = BALLS.map((b) => ({
      ...b,
      x: randomBetween(b.r, window.innerWidth - b.r),
      y: randomBetween(b.r, window.innerHeight - b.r),
      vx: randomBetween(-0.4, 0.4) || 0.3,
      vy: randomBetween(-0.4, 0.4) || 0.3,
    }));

    const MIN_SPEED = 0.25;
    const MAX_SPEED = 0.55;

    const tick = () => {
      const W = canvas.width;
      const H = canvas.height;

      ctx.clearRect(0, 0, W, H);

      balls.forEach((b) => {
        // Nudge if too slow
        const speed = Math.sqrt(b.vx * b.vx + b.vy * b.vy);
        if (speed < MIN_SPEED) {
          const angle = Math.random() * Math.PI * 2;
          b.vx += Math.cos(angle) * 0.1;
          b.vy += Math.sin(angle) * 0.1;
        }
        // Cap if too fast
        if (speed > MAX_SPEED) {
          b.vx = (b.vx / speed) * MAX_SPEED;
          b.vy = (b.vy / speed) * MAX_SPEED;
        }

        b.x += b.vx;
        b.y += b.vy;

        // Bounce
        if (b.x - b.r < 0) {
          b.x = b.r;
          b.vx = Math.abs(b.vx);
        }
        if (b.x + b.r > W) {
          b.x = W - b.r;
          b.vx = -Math.abs(b.vx);
        }
        if (b.y - b.r < 0) {
          b.y = b.r;
          b.vy = Math.abs(b.vy);
        }
        if (b.y + b.r > H) {
          b.y = H - b.r;
          b.vy = -Math.abs(b.vy);
        }

        // Draw radial gradient circle
        const grad = ctx.createRadialGradient(b.x - b.r * 0.3, b.y - b.r * 0.3, 0, b.x, b.y, b.r);
        grad.addColorStop(0, `hsla(${b.hue}, 80%, 78%, ${b.opacity * 1.8})`);
        grad.addColorStop(1, `hsla(${b.hue}, 70%, 50%, 0)`);

        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Subtle border
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.strokeStyle = `hsla(${b.hue}, 70%, 75%, ${b.opacity * 0.9})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

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