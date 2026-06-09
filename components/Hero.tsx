'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

const ROLES = [
  'Full Stack Developer',
  'React.js Specialist',
  'Next.js Engineer',
  'Node.js Developer',
  'GraphQL Architect',
];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText.length < currentRole.length) {
      timeout = setTimeout(() => setDisplayText(currentRole.slice(0, displayText.length + 1)), 80);
    } else if (!isDeleting && displayText.length === currentRole.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => setDisplayText(displayText.slice(0, -1)), 40);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  // Three.js particle field
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    // Particle geometry — large field of dots
    const count = 3000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 120;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60;

      const brightness = 0.3 + Math.random() * 0.7;
      if (Math.random() < 0.15) {
        // Cyan particles
        colors[i * 3] = 0;
        colors[i * 3 + 1] = brightness * 0.96;
        colors[i * 3 + 2] = brightness;
      } else {
        // Dim blue-white particles
        colors[i * 3] = brightness * 0.4;
        colors[i * 3 + 1] = brightness * 0.5;
        colors[i * 3 + 2] = brightness * 0.7;
      }

      sizes[i] = Math.random() * 2.5 + 0.5;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const mat = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    // Floating geometric wireframes
    const shapes: THREE.Mesh[] = [];
    const geometries = [
      new THREE.IcosahedronGeometry(2.5, 0),
      new THREE.OctahedronGeometry(2, 0),
      new THREE.TetrahedronGeometry(1.8, 0),
      new THREE.TorusGeometry(1.5, 0.4, 6, 12),
    ];

    geometries.forEach((geom, i) => {
      const wireMat = new THREE.MeshBasicMaterial({
        color: 0x00f5ff,
        wireframe: true,
        transparent: true,
        opacity: 0.08 + i * 0.02,
      });
      const mesh = new THREE.Mesh(geom, wireMat);
      mesh.position.set(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 30,
        (Math.random() - 0.5) * 20 - 5
      );
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      shapes.push(mesh);
      scene.add(mesh);
    });

    // Connection lines between nearby particles
    const lineGeo = new THREE.BufferGeometry();
    const linePositions: number[] = [];
    const sampleCount = 80;
    for (let i = 0; i < sampleCount; i++) {
      for (let j = i + 1; j < sampleCount; j++) {
        const ax = positions[i * 3], ay = positions[i * 3 + 1], az = positions[i * 3 + 2];
        const bx = positions[j * 3], by = positions[j * 3 + 1], bz = positions[j * 3 + 2];
        const dist = Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2 + (az - bz) ** 2);
        if (dist < 18) {
          linePositions.push(ax, ay, az, bx, by, bz);
        }
      }
    }
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const lineMat = new THREE.LineBasicMaterial({ color: 0x00f5ff, transparent: true, opacity: 0.04 });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    // Mouse parallax
    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Resize
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    // Animate
    let frameId: number;
    const clock = new THREE.Clock();
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      particles.rotation.y = t * 0.02;
      particles.rotation.x = t * 0.008;

      camera.position.x += (mouseX * 3 - camera.position.x) * 0.04;
      camera.position.y += (mouseY * 2 - camera.position.y) * 0.04;

      shapes.forEach((s, i) => {
        s.rotation.x = t * (0.15 + i * 0.07);
        s.rotation.y = t * (0.1 + i * 0.05);
        s.position.y += Math.sin(t * 0.5 + i) * 0.003;
      });

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(frameId);
      renderer.dispose();
    };
  }, []);

  // GSAP entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.8 });
      tl.fromTo(
        headingRef.current,
        { y: 60, opacity: 0, skewY: 3 },
        { y: 0, opacity: 1, skewY: 0, duration: 1.2, ease: 'power4.out' }
      )
        .fromTo(
          subRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
          '-=0.6'
        )
        .fromTo(
          ctaRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          '-=0.5'
        );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Three.js canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />

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
        <div ref={headingRef} style={{ opacity: 0 }}>
          <p className="text-[var(--cyan)] text-sm font-mono tracking-[0.3em] uppercase mb-4">
            &lt; Hello World /&gt;
          </p>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-none mb-4">
            <span className="text-[var(--text-primary)]">Akshat</span>
            <br />
            <span className="gradient-text">Shettigar</span>
          </h1>
        </div>

        <div ref={subRef} style={{ opacity: 0 }} className="mt-6 mb-10">
          <div className="flex items-center justify-center gap-3 text-xl sm:text-2xl font-light text-[var(--text-secondary)]">
            <span className="text-[var(--cyan)]">&gt;</span>
            <span className="font-mono">
              {displayText}
              <span className="typewriter-cursor text-[var(--cyan)] font-bold">|</span>
            </span>
          </div>
          <p className="mt-5 max-w-xl mx-auto text-[var(--text-secondary)] text-base leading-relaxed">
            Building high-performance, scalable web applications with modern technologies.
            Turning complex problems into elegant solutions.
          </p>
        </div>

        <div ref={ctaRef} style={{ opacity: 0 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#projects"
            onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="group px-8 py-3.5 text-sm font-semibold text-[var(--bg-primary)] bg-[var(--cyan)] rounded-full hover:shadow-[0_0_30px_rgba(0,245,255,0.5)] transition-all duration-300 hover:scale-105 tracking-wide"
          >
            View My Work
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-200">→</span>
          </a>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
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
