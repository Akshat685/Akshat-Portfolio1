'use client';

import dynamic from 'next/dynamic';
import Navigation from '@/components/Navigation';
import LoadingScreen from '@/components/LoadingScreen';

const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false });
const ScrollProgress = dynamic(() => import('@/components/ScrollProgress'), { ssr: false });
const Hero = dynamic(() => import('@/components/Hero'), { ssr: false });
const About = dynamic(() => import('@/components/About'));
const Skills = dynamic(() => import('@/components/Skills'));
const Experience = dynamic(() => import('@/components/Experience'));
const Projects = dynamic(() => import('@/components/Projects'));
const Education = dynamic(() => import('@/components/Education'));
const Contact = dynamic(() => import('@/components/Contact'));
const ResumeModal = dynamic(() => import('@/components/ResumeModal'));

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <ScrollProgress />
      <ResumeModal />
      <div className="noise-overlay" />
      <Navigation />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
    </>
  );
}
