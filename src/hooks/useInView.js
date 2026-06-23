import { useEffect, useRef, useState } from 'react';

const OBSERVER_OPTIONS = { threshold: 0.15 };

/**
 * Returns [ref, inView]. Attach `ref` to the element you want to watch.
 * `inView` flips to true the first time the element enters the viewport
 * and then stays true — the observer disconnects itself immediately so it
 * never fires (or re-renders the component) again.
 */
export default function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || inView) return;

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, OBSERVER_OPTIONS);

    observer.observe(node);
    return () => observer.disconnect();
  }, [inView]);

  return [ref, inView];
}