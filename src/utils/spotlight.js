// Attach as onMouseMove to any element with the `.spotlight` class.
// Writes the cursor position straight onto CSS custom properties via the
// DOM, bypassing React state entirely — hovering a card never causes a
// re-render, it's just a paint-only effect.
export function onSpotlightMove(e) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
}
