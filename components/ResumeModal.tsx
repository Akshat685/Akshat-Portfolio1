'use client';

import { useEffect, useRef, useState } from 'react';

export default function ResumeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOpenResume = () => {
      setIsOpen(true);
    };

    window.addEventListener('openResume', handleOpenResume as EventListener);
    return () => window.removeEventListener('openResume', handleOpenResume as EventListener);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    // Animate in
    requestAnimationFrame(() => {
      if (modalRef.current) {
        modalRef.current.style.opacity = '1';
      }
      if (contentRef.current) {
        contentRef.current.style.transform = 'scale(1)';
        contentRef.current.style.opacity = '1';
      }
    });

    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = 'auto';
    };
  }, [isOpen]);

  const closeModal = () => {
    // Animate out
    if (contentRef.current) {
      contentRef.current.style.transform = 'scale(0.92)';
      contentRef.current.style.opacity = '0';
    }
    if (modalRef.current) {
      modalRef.current.style.opacity = '0';
    }

    setTimeout(() => {
      setIsOpen(false);
    }, 250);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-opacity duration-300"
      style={{
        background: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        opacity: 0,
      }}
    >
      <div
        ref={contentRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl h-[85vh] bg-[#111422] rounded-2xl border border-[rgba(0,245,255,0.2)] overflow-hidden flex flex-col transition-all duration-300"
        style={{
          opacity: 0,
          transform: 'scale(0.92)',
          boxShadow: '0 25px 80px rgba(0, 0, 0, 0.9), 0 0 40px rgba(0, 245, 255, 0.1)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0d0f1a] border-b border-[rgba(0,245,255,0.1)] flex-shrink-0">
          <h2 className="text-lg font-semibold text-[#e8eaf0]">Resume</h2>
          <div className="flex items-center gap-3">
            <a
              href="/Akshat_Shettigar_Resume.pdf"
              download="Akshat_Shettigar_Resume.pdf"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#07080f] bg-[#00f5ff] rounded-lg hover:shadow-[0_0_20px_rgba(0,245,255,0.5)] transition-all duration-200 hover:scale-105"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download
            </a>
            <button
              onClick={closeModal}
              className="p-2 text-[#8892a4] hover:text-[#e8eaf0] hover:bg-[rgba(255,255,255,0.05)] rounded-lg transition-all"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 overflow-hidden bg-[#07080f]">
          <iframe
            src="/Akshat_Shettigar_Resume.pdf#toolbar=0&navpanes=0"
            className="w-full h-full border-none"
            title="Resume"
          />
        </div>
      </div>
    </div>
  );
}
