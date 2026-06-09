'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.left = `${mouseX - 4}px`;
        dotRef.current.style.top = `${mouseY - 4}px`;
      }
    };

    const animate = () => {
      outlineX += (mouseX - outlineX) * 0.12;
      outlineY += (mouseY - outlineY) * 0.12;

      if (outlineRef.current) {
        outlineRef.current.style.left = `${outlineX - 18}px`;
        outlineRef.current.style.top = `${outlineY - 18}px`;
      }
      rafId = requestAnimationFrame(animate);
    };

    const onMouseEnterHoverable = () => {
      outlineRef.current?.classList.add('hovering');
      dotRef.current?.style.setProperty('transform', 'scale(0)');
    };

    const onMouseLeaveHoverable = () => {
      outlineRef.current?.classList.remove('hovering');
      dotRef.current?.style.setProperty('transform', 'scale(1)');
    };

    const addHoverListeners = () => {
      const hoverables = document.querySelectorAll('a, button, [data-hover]');
      hoverables.forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterHoverable);
        el.addEventListener('mouseleave', onMouseLeaveHoverable);
      });
    };

    window.addEventListener('mousemove', onMouseMove);
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
      <div ref={dotRef} className="cursor-dot" />
      <div ref={outlineRef} className="cursor-outline" />
    </>
  );
}
