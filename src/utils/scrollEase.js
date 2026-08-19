const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

/**
 * Maps a continuous scroll position (0..lastIndex) across a fixed set of
 * steps into { stepIndex, easedFraction } — used to drive scroll-jacked
 * step transitions (the GrowCalth phone, the achievements journey) so the
 * user rests fully settled on one step for most of the scroll range,
 * instead of the visual drifting continuously with every pixel scrolled.
 *
 * Within each step's scroll range, a `dwell` fraction on both sides stays
 * pinned at the step's resting position; only the middle window between
 * dwell and (1 - dwell) actually eases the visual from one step to the
 * next. So leaving a settled step takes deliberate, sustained scrolling
 * through that dwell zone rather than any small scroll nudging it along.
 */
export function stepEase(continuous, lastIndex, dwell = 0.2) {
  const clamped = clamp(continuous, 0, lastIndex);
  const stepIndex = Math.min(Math.floor(clamped), lastIndex);
  const fraction = clamped - stepIndex;

  const span = 1 - dwell * 2;
  const t = span > 0 ? clamp((fraction - dwell) / span, 0, 1) : fraction;
  const easedFraction = t * t * (3 - 2 * t); // smoothstep

  return { stepIndex, easedFraction, position: stepIndex + easedFraction };
}
