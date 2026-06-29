'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const contactLinks = [
  {
    label: 'Email',
    value: 'akshatshettigar2001@gmail.com',
    href: 'mailto:akshatshettigar2001@gmail.com',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    label: 'Phone',
    value: '+91 7624077685',
    href: 'tel:+917624077685',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    value: 'akshat-shettigar-088214253',
    href: 'https://linkedin.com/in/akshat-shettigar-088214253',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'GitHub',
    value: 'Akshat685',
    href: 'https://github.com/Akshat685',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

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
        infoRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: infoRef.current, start: 'top 80%' },
        }
      );
      gsap.fromTo(
        formRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: formRef.current, start: 'top 80%' },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.error || 'Failed to save message');
      }

      setStatus('sent');
      setFormState({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch (err) {
      console.error('Failed to send message:', err);
      setStatus('idle');
      alert('Failed to send message. Please try again or email directly.');
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="relative py-32 bg-[var(--bg-secondary)]">
      {/* Top decorative glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,245,255,0.3), transparent)' }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div ref={headingRef} className="mb-16 text-center" style={{ opacity: 0 }}>
          <p className="text-[var(--cyan)] font-mono text-sm tracking-[0.25em] uppercase mb-3">06. Contact</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)]">
            Let&apos;s Work Together
          </h2>
          <p className="mt-4 text-[var(--text-secondary)] max-w-lg mx-auto">
            Have a project in mind? I&apos;d love to hear about it. Send me a message and let&apos;s create something amazing.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left — info */}
          <div ref={infoRef} style={{ opacity: 0 }}>
            <div className="mb-10">
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Get In Touch</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed text-sm">
                I&apos;m currently open to new opportunities. Whether it&apos;s a full-time role, freelance project,
                or just a conversation about tech — my inbox is always open.
              </p>
            </div>

            <div className="space-y-4 mb-10">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-[var(--bg-card)] border border-[rgba(255,255,255,0.05)] hover:border-[rgba(0,245,255,0.25)] hover:bg-[rgba(0,245,255,0.03)] transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center text-[var(--cyan)] bg-[rgba(0,245,255,0.08)] border border-[rgba(0,245,255,0.15)] group-hover:border-[rgba(0,245,255,0.35)] transition-colors flex-shrink-0">
                    {link.icon}
                  </div>
                  <div>
                    <p className="text-xs text-[var(--text-muted)] font-mono">{link.label}</p>
                    <p className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--cyan)] transition-colors truncate">{link.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Availability card */}
            <div className="p-5 rounded-xl bg-[rgba(0,245,255,0.04)] border border-[rgba(0,245,255,0.12)]">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--success)] pulse-glow" />
                <span className="text-sm font-medium text-[var(--text-primary)]">Available for Hire</span>
              </div>
              <p className="text-xs text-[var(--text-secondary)]">
                Based in Ahmedabad, India. Open to remote and on-site opportunities.
              </p>
            </div>
          </div>

          {/* Right — form */}
          <form ref={formRef} onSubmit={handleSubmit} style={{ opacity: 0 }} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-medium text-[var(--text-muted)] mb-2 uppercase tracking-widest">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className="w-full px-4 py-3 text-sm rounded-xl bg-[var(--bg-card)] border border-[rgba(255,255,255,0.06)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[rgba(0,245,255,0.4)] focus:bg-[rgba(0,245,255,0.02)] transition-all duration-200"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--text-muted)] mb-2 uppercase tracking-widest">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 text-sm rounded-xl bg-[var(--bg-card)] border border-[rgba(255,255,255,0.06)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[rgba(0,245,255,0.4)] focus:bg-[rgba(0,245,255,0.02)] transition-all duration-200"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--text-muted)] mb-2 uppercase tracking-widest">Subject</label>
              <input
                type="text"
                name="subject"
                value={formState.subject}
                onChange={handleChange}
                required
                placeholder="Project inquiry, collaboration..."
                className="w-full px-4 py-3 text-sm rounded-xl bg-[var(--bg-card)] border border-[rgba(255,255,255,0.06)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[rgba(0,245,255,0.4)] focus:bg-[rgba(0,245,255,0.02)] transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[var(--text-muted)] mb-2 uppercase tracking-widest">Message</label>
              <textarea
                name="message"
                value={formState.message}
                onChange={handleChange}
                required
                rows={6}
                placeholder="Tell me about your project..."
                className="w-full px-4 py-3 text-sm rounded-xl bg-[var(--bg-card)] border border-[rgba(255,255,255,0.06)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[rgba(0,245,255,0.4)] focus:bg-[rgba(0,245,255,0.02)] transition-all duration-200 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending' || status === 'sent'}
              className={`w-full py-4 text-sm font-semibold rounded-xl transition-all duration-300 tracking-wide ${
                status === 'sent'
                  ? 'bg-[var(--success)] text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                  : 'text-[var(--bg-primary)] bg-[var(--cyan)] hover:shadow-[0_0_30px_rgba(0,245,255,0.4)] hover:scale-[1.01] disabled:opacity-60'
              }`}
            >
              {status === 'idle' && 'Send Message →'}
              {status === 'sending' && (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Sending...
                </span>
              )}
              {status === 'sent' && '✓ Message Sent! I\'ll be in touch soon.'}
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-24 pt-8 border-t border-[rgba(255,255,255,0.05)]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[var(--text-muted)] text-xs font-mono">
            &copy; {new Date().getFullYear()} Akshat Shettigar. Built with Next.js & Three.js.
          </p>
          <div className="flex items-center gap-6">
            <a href="https://github.com/Akshat685" target="_blank" rel="noopener noreferrer" className="text-[var(--text-muted)] hover:text-[var(--cyan)] transition-colors text-xs">GitHub</a>
            <a href="https://linkedin.com/in/akshat-shettigar-088214253" target="_blank" rel="noopener noreferrer" className="text-[var(--text-muted)] hover:text-[var(--cyan)] transition-colors text-xs">LinkedIn</a>
            <a href="mailto:akshatshettigar2001@gmail.com" className="text-[var(--text-muted)] hover:text-[var(--cyan)] transition-colors text-xs">Email</a>
          </div>
        </div>
      </div>
    </section>
  );
}
