import { useEffect, useRef, useState } from 'react';

/**
 * One-shot scroll reveal built on IntersectionObserver.
 *
 * Deliberately not a scroll listener: the observer fires off the main thread's
 * critical path and disconnects the moment the element has been seen, so a
 * fully-revealed page costs nothing. Reveals are skipped entirely under
 * prefers-reduced-motion (content starts visible instead of animating in).
 */
export const useReveal = ({ threshold = 0.15, rootMargin = '0px 0px -60px 0px' } = {}) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, visible];
};

export default useReveal;
