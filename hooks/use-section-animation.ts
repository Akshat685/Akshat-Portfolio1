'use client';

import { useEffect, useRef, type RefObject } from 'react';

type Setup = (
  gsap: typeof import('gsap')['gsap'],
  ScrollTrigger: typeof import('gsap/ScrollTrigger')['ScrollTrigger']
) => () => void;

// Content is visible in the HTML. Load animation code only near the viewport.
export function useSectionAnimation(section: RefObject<HTMLElement>, setup: Setup, animationKey?: string) {
  const setupRef = useRef(setup);
  setupRef.current = setup;

  useEffect(() => {
    const element = section.current;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!element) return;
    let disposed = false;
    let started = false;
    let cleanup: (() => void) | undefined;
    const observer = new IntersectionObserver(async ([entry]) => {
      if (!entry.isIntersecting || started || motion.matches) return;
      started = true;
      observer.disconnect();
      try {
        const [{ gsap }, { ScrollTrigger }] = await Promise.all([
          import('gsap'), import('gsap/ScrollTrigger'),
        ]);
        if (disposed || motion.matches) return;
        gsap.registerPlugin(ScrollTrigger);
        cleanup = setupRef.current(gsap, ScrollTrigger);
      } catch {
        // A failed optional animation must never hide the content.
      }
    }, { rootMargin: '160px 0px' });
    observer.observe(element);
    const onMotionChange = () => {
      if (motion.matches) {
        cleanup?.();
        cleanup = undefined;
      }
    };
    motion.addEventListener('change', onMotionChange);
    return () => {
      disposed = true;
      observer.disconnect();
      motion.removeEventListener('change', onMotionChange);
      cleanup?.();
    };
  }, [section, animationKey]);
}
