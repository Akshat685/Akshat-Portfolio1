'use client';

import { useEffect, useState } from 'react';

const ROLES = ['Full Stack Developer', 'React.js Specialist', 'Next.js Engineer', 'Node.js Developer', 'GraphQL Architect'];

export default function HeroRole() {
  const [displayText, setDisplayText] = useState(ROLES[0]);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer: ReturnType<typeof setTimeout>;
    let index = 0;
    let text = ROLES[0];
    let deleting = true;
    let inView = true;
    const tick = () => {
      const role = ROLES[index];
      text = deleting ? text.slice(0, -1) : role.slice(0, text.length + 1);
      setDisplayText(text);
      let delay = deleting ? 40 : 80;
      if (deleting && !text) {
        deleting = false;
        index = (index + 1) % ROLES.length;
      } else if (!deleting && text === role) {
        deleting = true;
        delay = 2000;
      }
      timer = setTimeout(tick, delay);
    };
    const update = () => {
      clearTimeout(timer);
      if (!motion.matches && !document.hidden && inView) timer = setTimeout(tick, 2000);
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      update();
    });
    const hero = document.getElementById('hero');
    if (hero) observer.observe(hero);
    document.addEventListener('visibilitychange', update);
    motion.addEventListener('change', update);
    update();
    return () => {
      clearTimeout(timer);
      observer.disconnect();
      document.removeEventListener('visibilitychange', update);
      motion.removeEventListener('change', update);
    };
  }, []);

  return <span className="inline-block min-w-[20ch] text-left">{displayText}</span>;
}
