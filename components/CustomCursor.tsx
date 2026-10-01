'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const outlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pointer = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;
    let frame = 0;
    let hovering = false;

    const animate = () => {
      outlineX += (mouseX - outlineX) * 0.2;
      outlineY += (mouseY - outlineY) * 0.2;
      if (outlineRef.current) {
        outlineRef.current.style.transform = `translate3d(${outlineX - 18}px, ${outlineY - 18}px, 0) scale(${hovering ? 1.67 : 1})`;
      }
      frame = Math.abs(mouseX - outlineX) + Math.abs(mouseY - outlineY) > 0.1
        ? requestAnimationFrame(animate) : 0;
    };
    const hide = () => {
      document.body.classList.remove('custom-cursor-active');
      cancelAnimationFrame(frame);
      frame = 0;
    };
    const onMove = (event: PointerEvent) => {
      if (!pointer.matches || event.pointerType !== 'mouse') return;
      mouseX = event.clientX;
      mouseY = event.clientY;
      if (!document.body.classList.contains('custom-cursor-active')) {
        outlineX = mouseX;
        outlineY = mouseY;
        document.body.classList.add('custom-cursor-active');
      }
      hovering = event.target instanceof Element && !!event.target.closest('a, button, [data-hover]');
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0)`;
        dotRef.current.style.opacity = hovering ? '0' : '1';
      }
      if (!frame) frame = requestAnimationFrame(animate);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', hide);
    document.addEventListener('visibilitychange', hide);
    pointer.addEventListener('change', hide);
    return () => {
      hide();
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', hide);
      document.removeEventListener('visibilitychange', hide);
      pointer.removeEventListener('change', hide);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} aria-hidden="true" className="cursor-dot" style={{ left: 0, top: 0 }} />
      <div ref={outlineRef} aria-hidden="true" className="cursor-outline" style={{ left: 0, top: 0 }} />
    </>
  );
}
