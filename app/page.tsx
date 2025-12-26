'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero animation - immediate on load
    const heroTl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    heroTl.fromTo('.hero-badge',
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.5 }
    )
    .fromTo('.hero-title',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.7 },
      '-=0.2'
    )
    .fromTo('.hero-subtitle',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 },
      '-=0.3'
    )
    .fromTo('.hero-buttons',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 },
      '-=0.2'
    );

    // Trust indicators - scroll triggered
    gsap.fromTo('.trust-indicator',
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.trust-section',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );

    // Features/How it works - scroll triggered with stagger
    gsap.fromTo('.feature-card',
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.features-section',
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      }
    );

    // Section headers - scroll triggered
    gsap.utils.toArray('.section-header').forEach((header) => {
      gsap.fromTo(header as Element,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          scrollTrigger: {
            trigger: header as Element,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // Capabilities bento grid - scroll triggered with stagger
    gsap.fromTo('.capability-card',
      { opacity: 0, y: 30, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.capabilities-section',
          start: 'top 70%',
          toggleActions: 'play none none none'
        }
      }
    );

    // CTA section - scroll triggered
    gsap.fromTo('.cta-content',
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-screen flex items-center">
        {/* Animated Blob Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-veridian-50/30 to-white" />

        {/* Topographic Contour Lines - Top Left */}
        <div className="absolute top-0 left-0 w-[520px] h-[520px] -translate-x-[10%] -translate-y-[10%] opacity-0 md:opacity-[0.08] pointer-events-none">
          <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Outermost contours - extending further */}
            <path d="M-50 550 Q80 420 150 300 Q220 180 320 120 Q420 60 550 -50" stroke="#047857" strokeWidth="1.2" fill="none"/>
            <path d="M-50 500 Q70 380 140 270 Q210 160 300 100 Q390 40 500 -50" stroke="#047857" strokeWidth="1.2" fill="none"/>
            <path d="M-50 450 Q60 340 130 240 Q200 140 280 85 Q360 30 450 -50" stroke="#047857" strokeWidth="1.2" fill="none"/>
            <path d="M-50 400 Q50 300 120 210 Q190 120 260 70 Q330 20 400 -50" stroke="#047857" strokeWidth="1.2" fill="none"/>
            <path d="M-50 350 Q40 260 110 180 Q180 100 240 55 Q300 10 350 -50" stroke="#047857" strokeWidth="1.2" fill="none"/>
            <path d="M-50 300 Q30 220 100 150 Q170 80 220 40 Q270 0 300 -50" stroke="#047857" strokeWidth="1.2" fill="none"/>
            <path d="M-50 250 Q20 180 90 120 Q160 60 200 25 Q240 -10 250 -50" stroke="#047857" strokeWidth="1.2" fill="none"/>
            <path d="M-50 200 Q10 140 80 90 Q150 40 180 10 Q210 -20 200 -50" stroke="#047857" strokeWidth="1.2" fill="none"/>
            <path d="M-50 150 Q0 100 70 60 Q140 20 160 -5 Q180 -30 150 -50" stroke="#047857" strokeWidth="1.2" fill="none"/>
            <path d="M-50 100 Q-10 60 60 30 Q130 0 140 -20 Q150 -40 100 -50" stroke="#047857" strokeWidth="1.2" fill="none"/>
            {/* Middle detail contours */}
            <path d="M0 420 Q80 320 140 230 Q200 140 280 90 Q360 40 420 0" stroke="#059669" strokeWidth="1" fill="none"/>
            <path d="M20 380 Q90 290 150 210 Q210 130 280 80 Q350 30 400 0" stroke="#059669" strokeWidth="1" fill="none"/>
            <path d="M40 340 Q100 260 160 190 Q220 120 280 75 Q340 30 380 0" stroke="#059669" strokeWidth="1" fill="none"/>
            <path d="M60 300 Q110 230 170 170 Q230 110 280 70 Q330 30 360 10" stroke="#059669" strokeWidth="1" fill="none"/>
            <path d="M80 260 Q120 200 180 150 Q240 100 280 65 Q320 30 340 20" stroke="#059669" strokeWidth="1" fill="none"/>
            <path d="M100 220 Q130 170 190 130 Q250 90 280 60 Q310 30 320 25" stroke="#059669" strokeWidth="1" fill="none"/>
            {/* Inner detail curves */}
            <path d="M120 180 Q150 145 200 110 Q250 75 280 55 Q310 35 300 30" stroke="#10b981" strokeWidth="0.8" fill="none"/>
            <path d="M140 150 Q165 125 210 95 Q255 65 280 50 Q305 35 295 35" stroke="#10b981" strokeWidth="0.8" fill="none"/>
            <path d="M160 120 Q180 105 220 80 Q260 55 280 45" stroke="#10b981" strokeWidth="0.8" fill="none"/>
            <path d="M180 95 Q200 85 230 68 Q260 50 280 42" stroke="#10b981" strokeWidth="0.6" fill="none"/>
          </svg>
        </div>

        {/* Topographic Contour Lines - Bottom Right */}
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] translate-x-[10%] translate-y-[10%] opacity-[0.15] pointer-events-none rotate-180">
          <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Outermost contours - extending further */}
            <path d="M-50 550 Q80 420 150 300 Q220 180 320 120 Q420 60 550 -50" stroke="#047857" strokeWidth="1.2" fill="none"/>
            <path d="M-50 500 Q70 380 140 270 Q210 160 300 100 Q390 40 500 -50" stroke="#047857" strokeWidth="1.2" fill="none"/>
            <path d="M-50 450 Q60 340 130 240 Q200 140 280 85 Q360 30 450 -50" stroke="#047857" strokeWidth="1.2" fill="none"/>
            <path d="M-50 400 Q50 300 120 210 Q190 120 260 70 Q330 20 400 -50" stroke="#047857" strokeWidth="1.2" fill="none"/>
            <path d="M-50 350 Q40 260 110 180 Q180 100 240 55 Q300 10 350 -50" stroke="#047857" strokeWidth="1.2" fill="none"/>
            <path d="M-50 300 Q30 220 100 150 Q170 80 220 40 Q270 0 300 -50" stroke="#047857" strokeWidth="1.2" fill="none"/>
            <path d="M-50 250 Q20 180 90 120 Q160 60 200 25 Q240 -10 250 -50" stroke="#047857" strokeWidth="1.2" fill="none"/>
            <path d="M-50 200 Q10 140 80 90 Q150 40 180 10 Q210 -20 200 -50" stroke="#047857" strokeWidth="1.2" fill="none"/>
            <path d="M-50 150 Q0 100 70 60 Q140 20 160 -5 Q180 -30 150 -50" stroke="#047857" strokeWidth="1.2" fill="none"/>
            <path d="M-50 100 Q-10 60 60 30 Q130 0 140 -20 Q150 -40 100 -50" stroke="#047857" strokeWidth="1.2" fill="none"/>
            {/* Middle detail contours */}
            <path d="M0 420 Q80 320 140 230 Q200 140 280 90 Q360 40 420 0" stroke="#059669" strokeWidth="1" fill="none"/>
            <path d="M20 380 Q90 290 150 210 Q210 130 280 80 Q350 30 400 0" stroke="#059669" strokeWidth="1" fill="none"/>
            <path d="M40 340 Q100 260 160 190 Q220 120 280 75 Q340 30 380 0" stroke="#059669" strokeWidth="1" fill="none"/>
            <path d="M60 300 Q110 230 170 170 Q230 110 280 70 Q330 30 360 10" stroke="#059669" strokeWidth="1" fill="none"/>
            <path d="M80 260 Q120 200 180 150 Q240 100 280 65 Q320 30 340 20" stroke="#059669" strokeWidth="1" fill="none"/>
            <path d="M100 220 Q130 170 190 130 Q250 90 280 60 Q310 30 320 25" stroke="#059669" strokeWidth="1" fill="none"/>
            {/* Inner detail curves */}
            <path d="M120 180 Q150 145 200 110 Q250 75 280 55 Q310 35 300 30" stroke="#10b981" strokeWidth="0.8" fill="none"/>
            <path d="M140 150 Q165 125 210 95 Q255 65 280 50 Q305 35 295 35" stroke="#10b981" strokeWidth="0.8" fill="none"/>
            <path d="M160 120 Q180 105 220 80 Q260 55 280 45" stroke="#10b981" strokeWidth="0.8" fill="none"/>
            <path d="M180 95 Q200 85 230 68 Q260 50 280 42" stroke="#10b981" strokeWidth="0.6" fill="none"/>
          </svg>
        </div>

        <div className="absolute inset-0 overflow-hidden">
          <div className="blob blob-teal w-[400px] h-[400px] top-[20%] right-[-220px] animate-blob-reverse opacity-10 md:opacity-100" />
          <div className="blob blob-emerald w-[350px] h-[350px] bottom-[-50px] left-[80%] animate-blob-slow opacity-40 md:opacity-100" />
          <div className="blob blob-teal w-[500px] h-[400px] top-[80%] right-[60px] animate-blob-reverse opacity-30 md:opacity-50" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            {/* Trust Badge - Glass */}
            <div className="hero-badge inline-flex items-center gap-2 glass-card rounded-full px-5 py-2.5 mb-8">
              <svg className="w-5 h-5 text-veridian-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium text-veridian-800">LMA Compliant Assessment Platform</span>
            </div>

            <h1 className="hero-title text-4xl md:text-6xl font-display font-medium text-gray-900 mb-6 tracking-tight">
              Verify Green Projects.{' '}
              <span className="gradient-text">Get Funded.</span>
            </h1>
            <p className="hero-subtitle text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              AI-powered <span className="font-semibold text-veridian-700">LMA compliance</span> assessment,
              greenwashing detection, and <span className="font-semibold text-veridian-700">DFI matching</span>.
            </p>
            <div className="hero-buttons flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/assess" className="bg-veridian-700 hover:bg-veridian-800 text-white font-semibold text-lg px-8 py-4 rounded-xl shadow-veridian hover:shadow-veridian-lg transition-all duration-300 hover:scale-105">
                Assess Your Project
              </Link>
              <Link href="/search" className="glass-card text-veridian-700 font-semibold text-lg px-8 py-4 rounded-xl hover:bg-white/90 transition-all duration-300">
                Search LMA Clauses
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="trust-section glass py-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-center">
            <div className="trust-indicator">
              <p className="text-3xl font-bold text-veridian-700">LMA</p>
              <p className="text-sm text-gray-500">Transition Loan Principles</p>
            </div>
            <div className="w-px h-12 bg-gray-200 hidden md:block" />
            <div className="trust-indicator">
              <p className="text-3xl font-bold text-veridian-700">7+</p>
              <p className="text-sm text-gray-500">DFI Partners</p>
            </div>
            <div className="w-px h-12 bg-gray-200 hidden md:block" />
            <div className="trust-indicator">
              <p className="text-3xl font-bold text-veridian-700">SBTi</p>
              <p className="text-sm text-gray-500">Aligned Targets</p>
            </div>
            <div className="w-px h-12 bg-gray-200 hidden md:block" />
            <div className="trust-indicator">
              <p className="text-3xl font-bold text-veridian-700">7</p>
              <p className="text-sm text-gray-500">African Markets</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="features-section py-20 bg-gradient-to-b from-white via-veridian-50/20 to-white relative overflow-hidden">
        {/* Subtle blobs */}
        <div className="blob blob-emerald w-[300px] h-[300px] top-[10%] left-[-100px] opacity-50 animate-blob-slow" />
        <div className="blob blob-teal w-[250px] h-[250px] bottom-[10%] right-[-80px] opacity-40 animate-blob-reverse" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-header text-3xl font-display font-medium text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="section-header text-gray-600 max-w-2xl mx-auto">
              Three simple steps to assess your project's transition finance eligibility
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              number="01"
              title="Upload or Input"
              description="Upload your project documentation or fill in the assessment form with project details, financials, and transition strategy."
              icon={
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
                </svg>
              }
            />
            <FeatureCard
              number="02"
              title="AI Assessment"
              description="Our AI analyzes your project against LMA Transition Loan Principles, checks for greenwashing risks, and generates KPIs."
              icon={
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                </svg>
              }
            />
            <FeatureCard
              number="03"
              title="Get Matched"
              description="Receive DFI recommendations, financing structure suggestions, and actionable steps to make your project bankable."
              icon={
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                </svg>
              }
            />
          </div>
        </div>
      </section>

      {/* Capabilities Section - Bento Box */}
      <section className="capabilities-section py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-white" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-header text-3xl font-display font-medium text-gray-900 mb-4">
              Platform Capabilities
            </h2>
            <p className="section-header text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools for transition finance assessment and compliance
            </p>
          </div>

          {/* Asymmetric Bento Grid - Mobile friendly */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 lg:auto-rows-[140px]">

            {/* Level 1: Most Crucial - LMA Compliance (spans 2 cols, 2 rows on lg) */}
            <div className="capability-card sm:col-span-2 lg:row-span-2 glass-card rounded-3xl p-6 md:p-8 flex flex-col justify-between group transition-all duration-300 border-l-4 border-l-veridian-500 overflow-hidden relative min-h-[200px] lg:min-h-0 glass-card-hover">
              <div className="absolute top-0 right-0 w-32 h-32 bg-veridian-500/10 rounded-full blur-2xl group-hover:bg-veridian-500/20 transition-colors" />
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-veridian-100 to-veridian-200 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-veridian-500/10">
                  <svg className="w-7 h-7 text-veridian-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">LMA Compliance Scoring</h3>
                <p className="text-gray-600">Automated assessment against all 5 LMA Transition Loan Principles components with detailed feedback and actionable recommendations.</p>
              </div>
              <div className="flex items-center gap-2 text-veridian-600 font-medium text-sm mt-4">
                <span>Core Feature</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Level 2: 2nd Important - Greenwashing Detection */}
            <div className="capability-card sm:col-span-2 glass-card rounded-3xl p-5 md:p-6 flex items-center gap-4 md:gap-6 group transition-all duration-300 border-l-4 border-l-amber-500 glass-card-hover">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-amber-500/10">
                <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Greenwashing Detection</h3>
                <p className="text-gray-600 text-sm">AI-powered identification of red flags and weak transition commitments</p>
              </div>
            </div>

            {/* Level 3: 3rd Important - DFI Matching */}
            <div className="capability-card sm:col-span-2 glass-card rounded-3xl p-5 md:p-6 flex items-center gap-4 md:gap-6 group transition-all duration-300 border-l-4 border-l-navy-600 glass-card-hover">
              <div className="w-12 h-12 bg-gradient-to-br from-navy-100 to-navy-200 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-navy-500/10">
                <svg className="w-6 h-6 text-navy-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">DFI Matching</h3>
                <p className="text-gray-600 text-sm">Match with IFC, AfDB, FMO, DEG, BII, Proparco, and DFC based on eligibility</p>
              </div>
            </div>

            {/* Level 4-6: Same size features - responsive grid */}
            <div className="capability-card glass-card rounded-2xl p-4 md:p-5 group transition-all duration-300 border-l-4 border-l-purple-500 glass-card-hover">
              <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center mb-2 md:mb-3 shadow-md shadow-purple-500/10">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">KPI Generation</h3>
              <p className="text-gray-500 text-xs">Science-based KPIs and SPTs</p>
            </div>

            <div className="capability-card glass-card rounded-2xl p-4 md:p-5 group transition-all duration-300 border-l-4 border-l-indigo-500 glass-card-hover">
              <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-lg flex items-center justify-center mb-2 md:mb-3 shadow-md shadow-indigo-500/10">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">Clause Search</h3>
              <p className="text-gray-500 text-xs">2000+ LMA document templates</p>
            </div>

            <div className="capability-card glass-card rounded-2xl p-4 md:p-5 group transition-all duration-300 border-l-4 border-l-teal-500 glass-card-hover">
              <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-teal-100 to-teal-200 rounded-lg flex items-center justify-center mb-2 md:mb-3 shadow-md shadow-teal-500/10">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">Paris Alignment</h3>
              <p className="text-gray-500 text-xs">NDC targets verification</p>
            </div>

            <div className="capability-card glass-card rounded-2xl p-4 md:p-5 group transition-all duration-300 border-l-4 border-l-emerald-500 glass-card-hover">
              <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-lg flex items-center justify-center mb-2 md:mb-3 shadow-md shadow-emerald-500/10">
                <svg className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 text-sm md:text-base">PDF Export</h3>
              <p className="text-gray-500 text-xs">Professional assessment reports</p>
            </div>

          </div>
        </div>
      </section>

      {/* Supported Countries */}
      <section className="py-20 relative overflow-hidden">
        {/* Blob background */}
        <div className="absolute inset-0 bg-gradient-to-br from-veridian-50/50 via-white to-teal-50/30" />
        <div className="blob blob-green w-[400px] h-[400px] top-[-150px] right-[-100px] opacity-40 animate-blob" />
        <div className="blob blob-emerald w-[300px] h-[300px] bottom-[-100px] left-[-50px] opacity-30 animate-blob-reverse" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-header text-3xl font-display font-medium text-gray-900 mb-4">
              Supported African Markets
            </h2>
            <p className="section-header text-gray-600 max-w-2xl mx-auto">
              Full country profiles with NDC targets, regulatory frameworks, and DFI eligibility
            </p>
          </div>

          {/* Country Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4 md:gap-6">
            {[
              { name: 'Kenya', flag: '🇰🇪', code: 'KE' },
              { name: 'Nigeria', flag: '🇳🇬', code: 'NG' },
              { name: 'South Africa', flag: '🇿🇦', code: 'ZA' },
              { name: 'Tanzania', flag: '🇹🇿', code: 'TZ' },
              { name: 'Ghana', flag: '🇬🇭', code: 'GH' },
              { name: 'Egypt', flag: '🇪🇬', code: 'EG' },
              { name: 'Morocco', flag: '🇲🇦', code: 'MA' },
            ].map((country) => (
              <div
                key={country.code}
                className="country-tag glass-card rounded-2xl p-4 md:p-5 text-center hover:bg-white/80 hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-default group"
              >
                <div className="text-4xl md:text-5xl mb-2 group-hover:scale-110 transition-transform">{country.flag}</div>
                <p className="text-veridian-800 font-semibold text-sm md:text-base">{country.name}</p>
                <p className="text-veridian-600/60 text-xs mt-1 hidden md:block">NDC Aligned</p>
              </div>
            ))}
          </div>

          {/* Additional info */}
          <div className="mt-10 text-center">
            <p className="text-gray-500 text-sm">
              More markets coming soon: <span className="text-veridian-600">Ethiopia, Rwanda, Senegal, Côte d&apos;Ivoire</span>
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-24 relative overflow-hidden">
        {/* Dark glass background with blobs */}
        <div className="absolute inset-0 bg-gradient-to-br from-veridian-900 via-veridian-800 to-navy-900" />
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <div className="blob blob-teal w-[400px] h-[400px] top-[-100px] left-[-100px] animate-blob" />
          <div className="blob blob-emerald w-[350px] h-[350px] bottom-[-100px] right-[-100px] animate-blob-reverse" />
        </div>

        {/* White Topographic Contour Lines - Top Left */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] lg:w-[800px] lg:h-[800px] -translate-x-[15%] -translate-y-[15%] opacity-[0.12] pointer-events-none">
          <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M-50 550 Q80 420 150 300 Q220 180 320 120 Q420 60 550 -50" stroke="white" strokeWidth="1.2" fill="none"/>
            <path d="M-50 500 Q70 380 140 270 Q210 160 300 100 Q390 40 500 -50" stroke="white" strokeWidth="1.2" fill="none"/>
            <path d="M-50 450 Q60 340 130 240 Q200 140 280 85 Q360 30 450 -50" stroke="white" strokeWidth="1.2" fill="none"/>
            <path d="M-50 400 Q50 300 120 210 Q190 120 260 70 Q330 20 400 -50" stroke="white" strokeWidth="1.2" fill="none"/>
            <path d="M-50 350 Q40 260 110 180 Q180 100 240 55 Q300 10 350 -50" stroke="white" strokeWidth="1.2" fill="none"/>
            <path d="M-50 300 Q30 220 100 150 Q170 80 220 40 Q270 0 300 -50" stroke="white" strokeWidth="1.2" fill="none"/>
            <path d="M-50 250 Q20 180 90 120 Q160 60 200 25 Q240 -10 250 -50" stroke="rgba(255,255,255,0.8)" strokeWidth="1" fill="none"/>
            <path d="M-50 200 Q10 140 80 90 Q150 40 180 10 Q210 -20 200 -50" stroke="rgba(255,255,255,0.8)" strokeWidth="1" fill="none"/>
            <path d="M-50 150 Q0 100 70 60 Q140 20 160 -5 Q180 -30 150 -50" stroke="rgba(255,255,255,0.6)" strokeWidth="0.8" fill="none"/>
            <path d="M-50 100 Q-10 60 60 30 Q130 0 140 -20 Q150 -40 100 -50" stroke="rgba(255,255,255,0.6)" strokeWidth="0.8" fill="none"/>
          </svg>
        </div>

        {/* White Topographic Contour Lines - Bottom Right */}
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] lg:w-[800px] lg:h-[800px] translate-x-[15%] translate-y-[15%] opacity-[0.1] pointer-events-none rotate-180">
          <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M-50 550 Q80 420 150 300 Q220 180 320 120 Q420 60 550 -50" stroke="white" strokeWidth="1.2" fill="none"/>
            <path d="M-50 500 Q70 380 140 270 Q210 160 300 100 Q390 40 500 -50" stroke="white" strokeWidth="1.2" fill="none"/>
            <path d="M-50 450 Q60 340 130 240 Q200 140 280 85 Q360 30 450 -50" stroke="white" strokeWidth="1.2" fill="none"/>
            <path d="M-50 400 Q50 300 120 210 Q190 120 260 70 Q330 20 400 -50" stroke="white" strokeWidth="1.2" fill="none"/>
            <path d="M-50 350 Q40 260 110 180 Q180 100 240 55 Q300 10 350 -50" stroke="white" strokeWidth="1.2" fill="none"/>
            <path d="M-50 300 Q30 220 100 150 Q170 80 220 40 Q270 0 300 -50" stroke="white" strokeWidth="1.2" fill="none"/>
            <path d="M-50 250 Q20 180 90 120 Q160 60 200 25 Q240 -10 250 -50" stroke="rgba(255,255,255,0.8)" strokeWidth="1" fill="none"/>
            <path d="M-50 200 Q10 140 80 90 Q150 40 180 10 Q210 -20 200 -50" stroke="rgba(255,255,255,0.8)" strokeWidth="1" fill="none"/>
          </svg>
        </div>

        <div className="cta-content relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-medium text-white mb-4">
            Ready to Make Your Project Bankable?
          </h2>
          <p className="text-veridian-200 mb-10 text-lg max-w-2xl mx-auto">
            Get a comprehensive LMA compliance assessment in seconds, not weeks.
            Join the verified green finance movement.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/assess"
              className="glass-button text-veridian-700 font-semibold px-8 py-4 rounded-xl hover:bg-white transition-all duration-300 shadow-lg hover:scale-105"
            >
              Start Free Assessment
            </Link>
            <Link
              href="/search"
              className="glass-dark text-white font-semibold px-8 py-4 rounded-xl hover:bg-veridian-700/80 transition-all duration-300"
            >
              Explore LMA Clauses
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ number, title, description, icon }: { number: string; title: string; description: string; icon: React.ReactNode }) {
  return (
    <div className="feature-card glass-card-hover rounded-2xl p-8 text-center relative overflow-hidden group">
      {/* Background Number */}
      <div className="absolute -top-4 -right-4 text-8xl font-bold text-veridian-500/10 group-hover:text-veridian-500/20 transition-colors pointer-events-none">
        {number}
      </div>

      <div className="relative">
        <div className="w-16 h-16 bg-gradient-to-br from-veridian-100 to-veridian-200/50 rounded-2xl flex items-center justify-center text-veridian-600 mx-auto mb-6 group-hover:from-veridian-200 group-hover:to-veridian-300/50 transition-all shadow-lg shadow-veridian-500/10">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}

