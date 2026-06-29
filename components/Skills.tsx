'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillGroups = [
  {
    category: 'Frontend',
    icon: '⬡',
    color: '#00f5ff',
    skills: [
      { name: 'React.js', level: 90 },
      { name: 'Next.js', level: 85 },
      { name: 'TypeScript', level: 82 },
      { name: 'Tailwind CSS', level: 90 },
      { name: 'GraphQL (Apollo Client)', level: 75 },
      { name: 'TanStack Query', level: 72 },
      { name: 'Bootstrap', level: 85 },
      { name: 'HTML / CSS / JS', level: 95 },
    ],
  },
  {
    category: 'Backend',
    icon: '⬡',
    color: '#10b981',
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Express.js', level: 88 },
      { name: 'Prisma ORM', level: 80 },
      { name: 'GraphQL (Apollo Server)', level: 75 },
    ],
  },
  {
    category: 'Databases & Tools',
    icon: '⬡',
    color: '#f59e0b',
    skills: [
      { name: 'MongoDB', level: 82 },
      { name: 'PostgreSQL', level: 75 },
      { name: 'Sanity CMS', level: 70 },
      { name: 'Dropbox API', level: 72 },
      { name: 'Google API', level: 70 },
    ],
  },
];

const techBadges = [
  'React.js', 'Next.js', 'TypeScript', 'Node.js', 'Express.js',
  'GraphQL', 'Prisma', 'MongoDB', 'PostgreSQL', 'Tailwind CSS',
  'Apollo', 'TanStack', 'Sanity', 'Dropbox API', 'Bootstrap',
];

export default function Skills() {
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
        '.skill-group',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: '.skill-group', start: 'top 80%' },
        }
      );

      // Animate skill bars on scroll
      ScrollTrigger.create({
        trigger: '.skill-bars-container',
        start: 'top 75%',
        onEnter: () => {
          document.querySelectorAll('.skill-bar-fill').forEach((el) => {
            const target = el as HTMLElement;
            const width = target.getAttribute('data-width') ?? '0';
            gsap.fromTo(target, { width: '0%' }, { width: `${width}%`, duration: 1.2, ease: 'power3.out', delay: parseFloat(target.getAttribute('data-delay') ?? '0') });
          });
        },
        once: true,
      });

      gsap.fromTo(
        '.tech-badge',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1, opacity: 1, stagger: 0.04, duration: 0.4, ease: 'back.out(1.7)',
          scrollTrigger: { trigger: '.tech-badges-grid', start: 'top 85%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="relative py-32 bg-[var(--bg-secondary)]">
      {/* Decorative glow */}
      <div
        className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,245,255,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div ref={headingRef} className="mb-16 text-center" style={{ opacity: 0 }}>
          <p className="text-[var(--cyan)] font-mono text-sm tracking-[0.25em] uppercase mb-3">02. Skills</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)]">
            Technical Arsenal
          </h2>
          <p className="mt-4 text-[var(--text-secondary)] max-w-lg mx-auto">
            A curated set of tools and technologies I use to build modern web experiences.
          </p>
        </div>

        {/* Skill groups with bars */}
        <div className="skill-bars-container grid lg:grid-cols-3 gap-8 mb-20">
          {skillGroups.map((group, gi) => (
            <div
              key={group.category}
              className="skill-group p-7 rounded-2xl bg-[var(--bg-card)] border border-[rgba(255,255,255,0.05)] card-hover"
              style={{ opacity: 0 }}
            >
              <div className="flex items-center gap-3 mb-7">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                  style={{ background: `${group.color}18`, color: group.color, border: `1px solid ${group.color}30` }}
                >
                  {String.fromCharCode(65 + gi)}
                </div>
                <h3 className="font-semibold text-[var(--text-primary)] text-sm tracking-wide">{group.category}</h3>
              </div>

              <div className="space-y-5">
                {group.skills.map((skill, si) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-[var(--text-secondary)]">{skill.name}</span>
                      <span className="font-mono" style={{ color: group.color }}>{skill.level}%</span>
                    </div>
                    <div className="h-1 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
                      <div
                        className="skill-bar-fill h-full rounded-full"
                        data-width={skill.level}
                        data-delay={(si * 0.06 + gi * 0.1).toFixed(2)}
                        style={{
                          width: 0,
                          background: `linear-gradient(90deg, ${group.color}, ${group.color}88)`,
                          boxShadow: `0 0 8px ${group.color}44`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech badge cloud */}
        <div>
          <p className="text-center text-[var(--text-muted)] text-xs font-mono uppercase tracking-widest mb-8">
            Technologies
          </p>
          <div className="tech-badges-grid flex flex-wrap justify-center gap-3">
            {techBadges.map((tech) => (
              <span
                key={tech}
                className="tech-badge px-4 py-2 text-sm font-medium text-[var(--text-secondary)] bg-[var(--bg-primary)] border border-[rgba(0,245,255,0.1)] rounded-xl hover:text-[var(--cyan)] hover:border-[rgba(0,245,255,0.35)] hover:bg-[rgba(0,245,255,0.04)] transition-all duration-200 cursor-default"
                style={{ opacity: 0 }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
