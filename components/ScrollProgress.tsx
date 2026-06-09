'use client';

import { useEffect, useState } from 'react';
export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      setShowTop(scrollTop > 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Progress bar */}
      <div
        className="fixed top-0 left-0 h-0.5 z-[9999] pointer-events-none transition-all duration-100"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(90deg, var(--cyan), #00a8b5)',
          boxShadow: '0 0 8px rgba(0,245,255,0.5)',
        }}
      />

      {/* Back to top */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 w-11 h-11 rounded-full flex items-center justify-center border border-[rgba(0,245,255,0.3)] bg-[rgba(7,8,15,0.8)] backdrop-blur-sm text-[var(--cyan)] transition-all duration-300 hover:border-[var(--cyan)] hover:shadow-[0_0_20px_rgba(0,245,255,0.3)] ${
          showTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Back to top"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      </button>
    </>
  );
}
