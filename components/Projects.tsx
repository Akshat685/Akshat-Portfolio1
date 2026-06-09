'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'File Converter',
    company: 'Codage Habitation',
    description:
      'A web-based file converter for efficient transformation and management of various file formats including PDF, DOCX, images, and audio/video files.',
    highlights: [
      'Built responsive frontend with TypeScript & React',
      'Designed secure backend with cloud API integration',
      'Seamless cross-platform access via Dropbox & Google APIs',
    ],
    tech: ['React', 'TypeScript', 'Node.js', 'Express.js', 'Dropbox API', 'Google API'],
    category: 'Full Stack',
    color: '#00f5ff',
    image: 'https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'InvyTrack',
    company: 'Webcreta Technologies Pvt. Ltd.',
    description:
      'A MERN stack dashboard application designed to help organizations manage their inventory, specifically tracking and managing expiration dates of perishable items.',
    highlights: [
      'Real-time expiration date tracking system',
      'Interactive inventory dashboard with analytics',
      'MERN stack architecture with optimized queries',
    ],
    tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'HTML', 'CSS', 'JavaScript'],
    category: 'Dashboard',
    color: '#10b981',
    image: 'https://images.pexels.com/photos/256524/pexels-photo-256524.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'GymFuel',
    company: 'Webcreta Technologies Pvt. Ltd.',
    description:
      'A comprehensive MERN stack dashboard platform for managing customer nutrition and diet plans with personalized meal tracking and progress monitoring.',
    highlights: [
      'Personalized diet plan management system',
      'Customer nutrition tracking and analytics',
      'Comprehensive dashboard with visual reporting',
    ],
    tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'HTML', 'CSS', 'JavaScript'],
    category: 'Health Tech',
    color: '#f59e0b',
    image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'FlowBoard',
    company: 'Personal Project',
    description:
      'A multi-tenant SaaS project management tool built for teams and companies to collaborate securely across workspaces, projects, and tasks.',
    highlights: [
      'Built a multi-tenant dashboard with workspace isolation and role-based access',
      'Implemented GraphQL API using Apollo Client and Apollo Server',
      'Designed PostgreSQL schema with Prisma ORM for scalable project/task data',
      'Integrated Sanity CMS for dynamic changelog and announcement content',
      'Enabled real-time task updates and collaborative project tracking',
    ],
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'GraphQL', 'Apollo', 'Prisma', 'PostgreSQL', 'Sanity', 'Node.js'],
    category: 'SaaS',
    color: '#7c3aed',
    image: 'https://images.pexels.com/photos/3184312/pexels-photo-3184312.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];

const categories = ['All', 'Full Stack', 'Dashboard', 'Health Tech', 'SaaS'];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

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
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.project-card',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: 'power3.out' }
      );
    });
    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <section id="projects" ref={sectionRef} className="relative py-32 bg-[var(--bg-secondary)]">
      {/* Decorative glow left */}
      <div
        className="absolute top-1/2 left-0 w-96 h-96 pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,245,255,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto px-6">
        <div ref={headingRef} className="mb-12 text-center" style={{ opacity: 0 }}>
          <p className="text-[var(--cyan)] font-mono text-sm tracking-[0.25em] uppercase mb-3">04. Projects</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)]">
            Featured Work
          </h2>
          <p className="mt-4 text-[var(--text-secondary)] max-w-lg mx-auto">
            A selection of projects I&apos;ve built during my professional journey.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                activeCategory === cat
                  ? 'text-[var(--bg-primary)] bg-[var(--cyan)] shadow-[0_0_20px_rgba(0,245,255,0.3)]'
                  : 'text-[var(--text-secondary)] border border-[rgba(255,255,255,0.08)] hover:border-[rgba(0,245,255,0.25)] hover:text-[var(--cyan)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <div
              key={project.title}
              className="project-card group relative rounded-2xl bg-[var(--bg-card)] border border-[rgba(255,255,255,0.05)] overflow-hidden transition-all duration-400 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] hover:-translate-y-2"
              style={{ opacity: 0 }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(to bottom, transparent 40%, var(--bg-card) 100%)`,
                  }}
                />
                {/* Category badge */}
                <span
                  className="absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full backdrop-blur-sm"
                  style={{ background: `${project.color}20`, color: project.color, border: `1px solid ${project.color}40` }}
                >
                  {project.category}
                </span>
              </div>

              <div className="p-6">
                {/* Title */}
                <div className="mb-1">
                  <h3 className="text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--cyan)] transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5 font-mono">{project.company}</p>
                </div>

                <p className="text-[var(--text-secondary)] text-sm leading-relaxed mt-3 mb-4">
                  {project.description}
                </p>

                {/* Highlights */}
                <ul className="space-y-1.5 mb-5">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-xs text-[var(--text-muted)]">
                      <span style={{ color: project.color }} className="mt-0.5 flex-shrink-0">▸</span>
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[rgba(255,255,255,0.05)]">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-xs rounded-md font-mono"
                      style={{ background: `${project.color}0d`, color: project.color, border: `1px solid ${project.color}25` }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Border glow on hover */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300"
                style={{
                  border: `1px solid ${project.color}`,
                  opacity: hoveredIndex === i ? 0.25 : 0,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
