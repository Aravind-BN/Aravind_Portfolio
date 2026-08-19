import { stepEase } from './scrollEase';

test('stays pinned at the resting position through the dwell zone on both sides', () => {
  const lastIndex = 3;
  // Within step 1 (continuous in [1,2)), fraction 0..0.32 and 0.68..1 are dwell zones.
  expect(stepEase(1.0, lastIndex).position).toBeCloseTo(1, 5);
  expect(stepEase(1.1, lastIndex).position).toBeCloseTo(1, 5);
  expect(stepEase(1.31, lastIndex).position).toBeCloseTo(1, 2);
  expect(stepEase(1.69, lastIndex).position).toBeCloseTo(2, 2);
  expect(stepEase(1.9, lastIndex).position).toBeCloseTo(2, 5);
});

test('eases smoothly from one step to the next through the transition window', () => {
  const lastIndex = 3;
  const mid = stepEase(1.5, lastIndex);
  expect(mid.stepIndex).toBe(1);
  expect(mid.easedFraction).toBeCloseTo(0.5, 5);
  expect(mid.position).toBeCloseTo(1.5, 5);
});

test('clamps to the first and last step for out-of-range input', () => {
  expect(stepEase(-1, 3).position).toBe(0);
  expect(stepEase(10, 3).position).toBe(3);
});

test('position is monotonically non-decreasing across the full range', () => {
  const lastIndex = 4;
  let prev = -Infinity;
  for (let c = 0; c <= lastIndex; c += 0.05) {
    const { position } = stepEase(c, lastIndex);
    expect(position).toBeGreaterThanOrEqual(prev);
    prev = position;
  }
});
