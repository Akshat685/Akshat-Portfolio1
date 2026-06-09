'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: '1+', label: 'Years Experience' },
  { value: '3+', label: 'Projects Shipped' },
  { value: '10+', label: 'Technologies' },
  { value: '100%', label: 'Dedication' },
];

const interests = ['Gym', 'Anime', 'Coding'];
const languages = ['English', 'Hindi', 'Gujarati', 'Tulu'];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

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
        leftRef.current,
        { x: -60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: leftRef.current, start: 'top 80%' },
        }
      );

      gsap.fromTo(
        rightRef.current,
        { x: 60, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: rightRef.current, start: 'top 80%' },
        }
      );

      gsap.fromTo(
        '.stat-item',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: statsRef.current, start: 'top 85%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-32 grid-bg">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section heading */}
        <div ref={headingRef} className="mb-16 text-center" style={{ opacity: 0 }}>
          <p className="text-[var(--cyan)] font-mono text-sm tracking-[0.25em] uppercase mb-3">01. About</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)]">
            Who Am I?
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — avatar / card */}
          <div ref={leftRef} style={{ opacity: 0 }} className="flex flex-col items-center lg:items-start">
            {/* Avatar placeholder with animated ring */}
            <div className="relative w-52 h-52 mb-8 mx-auto lg:mx-0">
              <div className="absolute inset-0 rounded-full border-2 border-[var(--cyan)] opacity-20 animate-ping" style={{ animationDuration: '3s' }} />
              <div className="absolute inset-2 rounded-full border border-[rgba(0,245,255,0.3)]" />
              <div
                className="w-full h-full rounded-full flex items-center justify-center text-6xl font-bold bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-secondary)] border border-[rgba(0,245,255,0.15)]"
                style={{ boxShadow: '0 0 40px rgba(0,245,255,0.08)' }}
              >
                <span className="gradient-text text-5xl">AS</span>
              </div>

              {/* Status badge */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 bg-[var(--bg-card)] border border-[rgba(0,245,255,0.15)] rounded-full text-xs whitespace-nowrap">
                <span className="w-2 h-2 rounded-full bg-[var(--success)] pulse-glow" />
                <span className="text-[var(--text-secondary)]">Available for hire</span>
              </div>
            </div>

            {/* Contact info */}
            <div className="w-full space-y-3">
              {[
                { icon: '✉', label: 'akshatshettigar2001@gmail.com', href: 'mailto:akshatshettigar2001@gmail.com' },
                { icon: '📍', label: 'Ahmedabad, India', href: null },
                { icon: '📱', label: '+91 7624077685', href: 'tel:+917624077685' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                  <span className="text-base">{item.icon}</span>
                  {item.href ? (
                    <a href={item.href} className="hover:text-[var(--cyan)] transition-colors">{item.label}</a>
                  ) : (
                    <span>{item.label}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Languages */}
            <div className="mt-8 w-full">
              <p className="text-[var(--text-muted)] text-xs font-mono uppercase tracking-widest mb-3">Languages</p>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <span key={lang} className="px-3 py-1 text-xs font-medium text-[var(--cyan)] bg-[rgba(0,245,255,0.06)] border border-[rgba(0,245,255,0.12)] rounded-full">
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Interests */}
            <div className="mt-6 w-full">
              <p className="text-[var(--text-muted)] text-xs font-mono uppercase tracking-widest mb-3">Interests</p>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <span key={interest} className="px-3 py-1 text-xs font-medium text-[var(--text-secondary)] bg-[var(--bg-secondary)] border border-[rgba(255,255,255,0.06)] rounded-full">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right — bio */}
          <div ref={rightRef} style={{ opacity: 0 }}>
            <div className="space-y-5 text-[var(--text-secondary)] leading-relaxed">
              <p>
                I&apos;m a passionate full-stack developer with expertise in building{' '}
                <span className="text-[var(--cyan)]">high-performance, scalable web applications</span>. With a
                Master&apos;s degree in Computer Applications from GLS University, I combine academic
                knowledge with hands-on industry experience.
              </p>
              <p>
                My journey spans building everything from{' '}
                <span className="text-[var(--text-primary)]">cloud-integrated file converters</span> to{' '}
                <span className="text-[var(--text-primary)]">inventory management dashboards</span> and{' '}
                <span className="text-[var(--text-primary)]">nutrition tracking platforms</span>. I thrive
                on solving complex challenges and delivering clean, maintainable code.
              </p>
              <p>
                Skilled in the full JavaScript ecosystem — from{' '}
                <span className="text-[var(--cyan)]">React.js and Next.js</span> on the frontend to{' '}
                <span className="text-[var(--cyan)]">Node.js, GraphQL, and Prisma ORM</span> on the backend —
                I&apos;m dedicated to writing code that makes a real difference.
              </p>
            </div>

            {/* Career objective highlight */}
            <div className="mt-8 p-5 rounded-xl bg-[rgba(0,245,255,0.04)] border border-[rgba(0,245,255,0.1)] relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-[var(--cyan)] rounded-l-xl" />
              <p className="text-sm text-[var(--text-secondary)] italic leading-relaxed pl-3">
                &ldquo;Dedicated to delivering innovative, maintainable solutions that contribute to
                organizational success while continuously enhancing technical proficiency.&rdquo;
              </p>
            </div>

            {/* Social links */}
            <div className="mt-8 flex items-center gap-4">
              <a
                href="https://linkedin.com/in/akshat-shettigar-088214253"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-[var(--text-secondary)] border border-[rgba(255,255,255,0.08)] rounded-lg hover:text-[var(--cyan)] hover:border-[rgba(0,245,255,0.25)] transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
              <a
                href="https://github.com/Akshat685"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-[var(--text-secondary)] border border-[rgba(255,255,255,0.08)] rounded-lg hover:text-[var(--cyan)] hover:border-[rgba(0,245,255,0.25)] transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="stat-item text-center p-6 rounded-2xl bg-[var(--bg-card)] border border-[rgba(0,245,255,0.08)] card-hover"
              style={{ opacity: 0 }}
            >
              <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
              <div className="text-sm text-[var(--text-muted)]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
