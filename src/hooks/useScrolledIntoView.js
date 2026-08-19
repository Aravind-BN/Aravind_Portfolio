import { useEffect, useRef, useState } from 'react';

const OBSERVER_OPTIONS = { threshold: 0.15 };

/**
 * Like useInView, but also requires the user to have scrolled at least
 * once before flipping to true. Plain IntersectionObserver reports the
 * current intersection state immediately after `observe()` is called — so
 * for an element that's already on screen at mount (e.g. it sits high
 * enough on the page to be visible without scrolling), that fires
 * instantly with no scrolling having happened at all.
 *
 * Just skipping that first callback isn't enough on its own: the observer
 * only re-fires on a threshold *crossing*, so an element that stays above
 * the 15% threshold throughout a scroll (never actually leaving view)
 * would never get a second callback and would stay stuck at `inView:
 * false` forever. Tracking "has the user scrolled at all" separately and
 * requiring both conditions avoids that trap.
 *
 * Meant for scroll-triggered animations (count-ups, etc.) where firing on
 * page load would look broken; use useInView instead for a plain fade-in
 * reveal, where an already-visible element not animating is fine.
 */
export default function useScrolledIntoView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || inView) return;

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    let hasScrolled = false;
    let isIntersecting = false;

    const revealIfReady = () => {
      if (hasScrolled && isIntersecting) {
        setInView(true);
        cleanup();
      }
    };

    const handleScroll = () => {
      hasScrolled = true;
      revealIfReady();
    };

    const observer = new IntersectionObserver(([entry]) => {
      isIntersecting = entry.isIntersecting;
      revealIfReady();
    }, OBSERVER_OPTIONS);

    function cleanup() {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    }

    observer.observe(node);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return cleanup;
  }, [inView]);

  return [ref, inView];
}
