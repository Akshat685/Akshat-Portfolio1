'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Workforce Pulse',
    company: 'Personal Project',
    description:
      'A COO-facing workforce analytics dashboard that ingests messy CSV/JSON employee data, normalizes ~50 app aliases, ~64 task spellings, and 4 compensation schemas, then surfaces recoverable hours and ₹INR/month through task-specific recoverability factors.',
    highlights: [
      'Weighted automation priority scoring (0–100) across 21 task categories',
      'Auditable data pipeline with cleaning summaries & anomaly detection',
      'LLM-powered executive assistant with strict source citations',
      'Executive PDF export, cross-filtering & code-split chart loading',
      'Task-specific recoverability factors (15%–70%) instead of flat rates',
    ],
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Recharts', 'Zod', 'PapaParse', 'jsPDF', 'OpenAI API'],
    category: 'Analytics',
    color: '#e040fb',
    link: 'https://workforce-pulse-seven.vercel.app',
    image: 'https://res.cloudinary.com/dzbzwyksl/image/upload/v1782732606/0913971a-8070-4d9b-b6ea-de512786c8cf.png',
  },
  {
    title: 'Chat with Website',
    company: 'Personal Project',
    description:
      'A RAG-powered web app that crawls any website, extracts and chunks readable text, builds an in-memory vector index using embeddings, and lets you ask questions with source-cited answers — all through a polite, scoped crawling pipeline.',
    highlights: [
      'Scoped BFS crawler with robots.txt compliance & 700ms polite delay',
      'Cheerio-based boilerplate stripping (navs, footers, cookie banners)',
      'In-memory cosine-similarity vector search over embedded chunks',
      'Anti-hallucination grounding — answers cite sources or say "I don\'t know"',
      'CLI eval script for retrieval quality sanity checks',
    ],
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Cheerio', 'OpenAI SDK', 'Gemini API'],
    category: 'AI / RAG',
    color: '#06b6d4',
    link: 'https://webcrawl-red.vercel.app/',
    image: 'https://res.cloudinary.com/dzbzwyksl/image/upload/v1782732119/58d72fed-cd4e-4dc5-a712-e41a9d089f6e_a1k4rb.png',
  },
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
    image: 'https://res.cloudinary.com/dzbzwyksl/image/upload/v1782733345/3a64fed0-4074-4b47-a3a7-399705f8e45a.png',
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
    image: 'https://res.cloudinary.com/dzbzwyksl/image/upload/v1782733135/acdb243c-1a66-4c38-af02-321c2bfc4283.png',
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
    image: 'https://res.cloudinary.com/dzbzwyksl/image/upload/v1782733937/d79b3412-dfb8-4e22-b235-898ee7db8b73.png',
  },
];

const categories = ['All', 'AI / RAG', 'Analytics', 'Full Stack', 'Dashboard', 'Health Tech', 'SaaS'];

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

      <div className="max-w-7xl mx-auto px-6">
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
              className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${activeCategory === cat
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
              className="project-card group relative flex flex-col h-full rounded-2xl bg-[var(--bg-card)] border border-[rgba(255,255,255,0.05)] overflow-hidden transition-all duration-400 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] hover:-translate-y-2"
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

              <div className="p-6 flex flex-col flex-1">
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
                <div className="flex flex-wrap gap-1.5 pt-4 mt-auto border-t border-[rgba(255,255,255,0.05)]">
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

                {/* Live link */}
                {'link' in project && (project as any).link && (
                  <a
                    href={(project as any).link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-4 px-4 py-2 text-xs font-semibold rounded-full transition-all duration-300 hover:scale-105"
                    style={{
                      background: `${project.color}18`,
                      color: project.color,
                      border: `1px solid ${project.color}40`,
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                    Live Demo
                  </a>
                )}
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
