'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const education = [
  {
    degree: 'Master of Computer Application',
    institution: 'GLS University',
    period: 'Aug 2022 – Jun 2024',
    percentage: '69.33%',
    level: 'Masters',
    color: '#00f5ff',
    icon: 'M',
  },
  {
    degree: 'Bachelor of Computer Application',
    institution: 'Navgujarat College of Computer Application',
    period: 'Jun 2019 – Apr 2022',
    percentage: '64.69%',
    level: 'Bachelors',
    color: '#10b981',
    icon: 'B',
  },
  {
    degree: '12th Standard (Commerce)',
    institution: 'Nalanda Vidyalay Higher Secondary English',
    period: 'Jun 2018 – Apr 2019',
    percentage: '57.07%',
    level: 'Higher Secondary',
    color: '#f59e0b',
    icon: '12',
  },
  {
    degree: '10th Standard',
    institution: 'Tripada English School',
    period: 'Jun 2016 – Jul 2017',
    percentage: '61%',
    level: 'Secondary',
    color: '#8b5cf6',
    icon: '10',
  },
];

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 85%' },
        }
      );

      gsap.fromTo(
        '.edu-card',
        { y: 40, opacity: 0, scale: 0.95 },
        {
          y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.edu-grid', start: 'top 80%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="education" ref={sectionRef} className="relative py-32 grid-bg">
      <div className="max-w-5xl mx-auto px-6">
        <div ref={headingRef} className="mb-16 text-center" style={{ opacity: 0 }}>
          <p className="text-[var(--cyan)] font-mono text-sm tracking-[0.25em] uppercase mb-3">05. Education</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)]">
            Academic Background
          </h2>
          <p className="mt-4 text-[var(--text-secondary)] max-w-lg mx-auto">
            My educational journey that laid the foundation for my engineering career.
          </p>
        </div>

        <div className="edu-grid grid sm:grid-cols-2 gap-6">
          {education.map((edu) => (
            <div
              key={edu.degree}
              className="edu-card relative p-7 rounded-2xl bg-[var(--bg-card)] border border-[rgba(255,255,255,0.05)] card-hover group overflow-hidden"
              style={{ opacity: 0 }}
            >
              {/* Background glow */}
              <div
                className="absolute -top-16 -right-16 w-40 h-40 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle, ${edu.color}10 0%, transparent 70%)` }}
              />

              <div className="flex items-start gap-4 mb-5">
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                  style={{ background: `${edu.color}12`, color: edu.color, border: `1px solid ${edu.color}30` }}
                >
                  {edu.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <span
                    className="inline-block px-2.5 py-0.5 text-xs font-medium rounded-full mb-2"
                    style={{ background: `${edu.color}12`, color: edu.color, border: `1px solid ${edu.color}25` }}
                  >
                    {edu.level}
                  </span>
                  <h3 className="font-semibold text-[var(--text-primary)] leading-snug">{edu.degree}</h3>
                </div>
              </div>

              <p
                className="text-sm font-medium mb-2 transition-colors duration-200 group-hover:text-[var(--text-primary)]"
                style={{ color: edu.color }}
              >
                {edu.institution}
              </p>

              <div className="flex items-center justify-between mt-4 pt-4 border-t border-[rgba(255,255,255,0.05)]">
                <span className="text-[var(--text-muted)] text-xs font-mono">{edu.period}</span>
                <div className="flex items-center gap-2">
                  <span className="text-[var(--text-muted)] text-xs">Score</span>
                  <span className="font-bold text-sm" style={{ color: edu.color }}>{edu.percentage}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
