'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const HeroScene = dynamic(() => import('./HeroScene'), { ssr: false });

export default function HeroBackground() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const motion = window.matchMedia('(min-width: 768px) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    let idle: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const cancel = () => {
      if (idle !== undefined) window.cancelIdleCallback(idle);
      clearTimeout(timer);
    };
    const enable = () => {
      if (motion.matches) setEnabled(true);
    };
    const schedule = () => {
      cancel();
      if (!motion.matches) {
        setEnabled(false);
        return;
      }
      if ('requestIdleCallback' in window) {
        idle = window.requestIdleCallback(enable);
      } else {
        timer = setTimeout(enable, 0);
      }
    };
    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule, { once: true });
    motion.addEventListener('change', schedule);
    return () => {
      cancel();
      window.removeEventListener('load', schedule);
      motion.removeEventListener('change', schedule);
    };
  }, []);

  return (
    <div aria-hidden="true" className="hero-starfield absolute inset-0 pointer-events-none">
      {enabled && <HeroScene />}
    </div>
  );
}
