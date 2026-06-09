'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: 'Trainee ReactJS Developer',
    company: 'Codage Habitation',
    period: 'Apr 2025 – Oct 2025',
    current: true,
    description:
      'Developed and maintained React-based web applications, built a cloud-integrated file converter with Dropbox and Google APIs, and implemented responsive UIs with TypeScript and modern React patterns.',
    skills: ['React.js', 'TypeScript', 'Node.js', 'Express.js', 'Dropbox API', 'Google API'],
  },
  {
    role: 'Trainee ReactJS Developer',
    company: 'Webcreta Technologies Pvt. Ltd.',
    period: 'Sep 2024 – Dec 2024',
    current: false,
    description:
      'Built MERN stack dashboard applications for inventory and nutrition management. Designed real-time expiration tracking systems and comprehensive diet plan management platforms.',
    skills: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JavaScript', 'CSS'],
  },
];

const certificates = [
  'MERN Stack Developer Intern',
  'ReactJS Developer Intern',
  'Airline Cabin Crew Training (IATA Course)',
];

export default function Experience() {
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
        '.exp-item',
        { x: -50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out',
          scrollTrigger: { trigger: '.exp-timeline', start: 'top 80%' },
        }
      );

      gsap.fromTo(
        '.cert-item',
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: '.cert-list', start: 'top 85%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="relative py-32 grid-bg">
      <div className="max-w-5xl mx-auto px-6">
        <div ref={headingRef} className="mb-16 text-center" style={{ opacity: 0 }}>
          <p className="text-[var(--cyan)] font-mono text-sm tracking-[0.25em] uppercase mb-3">03. Experience</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)]">
            Work Journey
          </h2>
        </div>

        {/* Timeline */}
        <div className="exp-timeline relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--cyan)] via-[rgba(0,245,255,0.2)] to-transparent" style={{ transform: 'translateX(-0.5px)' }} />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <div
                key={exp.company}
                className={`exp-item relative flex flex-col md:flex-row gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                style={{ opacity: 0 }}
              >
                {/* Dot */}
                <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-[var(--bg-primary)] border-2 border-[var(--cyan)] -translate-x-1.5 md:-translate-x-1/2 mt-6" style={{ zIndex: 1, boxShadow: '0 0 12px rgba(0,245,255,0.5)' }} />

                {/* Card */}
                <div className={`ml-14 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                  <div className="p-6 rounded-2xl bg-[var(--bg-card)] border border-[rgba(0,245,255,0.08)] card-hover group relative overflow-hidden">
                    {/* Hover glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,245,255,0.03)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <h3 className="font-semibold text-[var(--text-primary)] text-lg">{exp.role}</h3>
                        <p className="text-[var(--cyan)] text-sm font-medium mt-0.5">{exp.company}</p>
                      </div>
                      {exp.current && (
                        <span className="flex items-center gap-1.5 px-2.5 py-1 bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.25)] rounded-full text-xs text-[var(--success)] whitespace-nowrap">
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)]" />
                          Current
                        </span>
                      )}
                    </div>

                    <p className="text-[var(--text-muted)] text-xs font-mono mb-4">{exp.period}</p>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-5">
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-1 text-xs font-medium text-[var(--cyan)] bg-[rgba(0,245,255,0.06)] rounded-md border border-[rgba(0,245,255,0.12)]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Period label on opposite side (desktop) */}
                <div className={`hidden md:flex md:w-[calc(50%-2rem)] items-center ${i % 2 === 0 ? 'pl-8' : 'pr-8 justify-end'}`}>
                  <span className="text-[var(--text-muted)] text-sm font-mono">{exp.period}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certificates */}
        <div className="mt-20">
          <h3 className="text-center text-[var(--text-primary)] font-semibold text-xl mb-8">Certifications</h3>
          <div className="cert-list grid sm:grid-cols-3 gap-4">
            {certificates.map((cert) => (
              <div
                key={cert}
                className="cert-item p-5 rounded-xl bg-[var(--bg-card)] border border-[rgba(0,245,255,0.08)] card-hover group text-center"
                style={{ opacity: 0 }}
              >
                <div className="w-10 h-10 mx-auto mb-3 rounded-lg flex items-center justify-center bg-[rgba(0,245,255,0.08)] border border-[rgba(0,245,255,0.15)] group-hover:border-[rgba(0,245,255,0.35)] transition-colors">
                  <svg className="w-5 h-5 text-[var(--cyan)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <p className="text-sm text-[var(--text-secondary)] font-medium">{cert}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
