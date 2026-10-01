import HeroBackground from '@/components/HeroBackground';
import HeroRole from '@/components/HeroRole';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-40 sm:py-32"
    >
      <HeroBackground />

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,245,255,0.04) 0%, rgba(7,8,15,0.5) 60%, rgba(7,8,15,0.95) 100%)',
          zIndex: 1,
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, var(--bg-primary))', zIndex: 2 }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div>
          <p className="text-[var(--cyan)] text-sm font-mono tracking-[0.3em] uppercase mb-4">
            &lt; Hello World /&gt;
          </p>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-4">
            <span className="text-[var(--text-primary)]">Akshat</span>
            <br />
            <span className="gradient-text">Shettigar</span>
          </h1>
        </div>

        <div className="mt-6 mb-10">
          <div className="flex items-center justify-center gap-3 text-lg sm:text-2xl font-light text-[var(--text-secondary)]">
            <span className="text-[var(--cyan)]">&gt;</span>
            <span className="font-mono">
              <HeroRole />
              <span className="typewriter-cursor text-[var(--cyan)] font-bold">|</span>
            </span>
          </div>
          <p className="mt-5 max-w-xl mx-auto text-[var(--text-secondary)] text-base leading-relaxed">
            Building high-performance, scalable web applications with modern technologies.
            Turning complex problems into elegant solutions.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#projects"
            className="group px-8 py-3.5 text-sm font-semibold text-[var(--bg-primary)] bg-[var(--cyan)] rounded-full hover:shadow-[0_0_30px_rgba(0,245,255,0.5)] transition-all duration-300 hover:scale-105 tracking-wide"
          >
            View My Work
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
          </a>
          <a
            href="#contact"
            className="px-8 py-3.5 text-sm font-semibold text-[var(--cyan)] border border-[rgba(0,245,255,0.3)] rounded-full hover:border-[var(--cyan)] hover:bg-[rgba(0,245,255,0.05)] transition-all duration-300 tracking-wide"
          >
            Get In Touch
          </a>
        </div>

        {/* Tech tags */}
        <div className="mt-14 flex flex-wrap justify-center gap-2.5">
          {['React.js', 'Next.js', 'TypeScript', 'Node.js', 'GraphQL', 'Prisma', 'PostgreSQL', 'MongoDB'].map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-mono text-[var(--text-muted)] border border-[rgba(0,245,255,0.08)] rounded-full bg-[rgba(0,245,255,0.03)] hover:text-[var(--cyan)] hover:border-[rgba(0,245,255,0.25)] transition-all duration-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-[var(--text-muted)] text-xs font-mono tracking-widest">SCROLL</span>
        <div className="w-px h-16 bg-gradient-to-b from-[var(--cyan)] to-transparent" />
      </div>
    </section>
  );
}
