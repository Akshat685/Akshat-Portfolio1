'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Three.js particle field
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'low-power', alpha: true });
    } catch {
      // The CSS star field remains visible if WebGL is unavailable.
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    // Particle geometry — large field of dots
    const count = 700;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);


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


    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));


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
    let frameId = 0;
    let inView = true;
    let lastFrame = 0;
    const clock = new THREE.Clock();
    const animate = (now: number) => {
      frameId = requestAnimationFrame(animate);
      if (now - lastFrame < 1000 / 30) return;
      lastFrame = now;
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
    const updatePlayback = () => {
      cancelAnimationFrame(frameId);
      if (inView && !document.hidden) frameId = requestAnimationFrame(animate);
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      updatePlayback();
    });
    observer.observe(canvas);
    document.addEventListener('visibilitychange', updatePlayback);
    updatePlayback();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(frameId);
      observer.disconnect();
      document.removeEventListener('visibilitychange', updatePlayback);
      geo.dispose();
      mat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      shapes.forEach((shape) => {
        shape.geometry.dispose();
        (shape.material as THREE.Material).dispose();
      });
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 w-full h-full" />;
}
