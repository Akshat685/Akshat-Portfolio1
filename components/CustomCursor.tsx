'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
      }
    };

    const animate = () => {
      outlineX += (mouseX - outlineX) * 0.12;
      outlineY += (mouseY - outlineY) * 0.12;

      if (outlineRef.current) {
        outlineRef.current.style.transform = `translate3d(${outlineX - 18}px, ${outlineY - 18}px, 0)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    const onMouseEnterHoverable = () => {
      outlineRef.current?.classList.add('hovering');
      if (dotRef.current) dotRef.current.style.opacity = '0';
    };

    const onMouseLeaveHoverable = () => {
      outlineRef.current?.classList.remove('hovering');
      if (dotRef.current) dotRef.current.style.opacity = '1';
    };

    const addHoverListeners = () => {
      const hoverables = document.querySelectorAll('a, button, [data-hover]');
      hoverables.forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterHoverable);
        el.addEventListener('mouseleave', onMouseLeaveHoverable);
      });
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);
    addHoverListeners();

    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" style={{ left: 0, top: 0, willChange: 'transform' }} />
      <div ref={outlineRef} className="cursor-outline" style={{ left: 0, top: 0, willChange: 'transform' }} />
    </>
  );
}

