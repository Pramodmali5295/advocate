import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Scale, Shield, Award, TrendingUp } from 'lucide-react';
import gsap from 'gsap';
import { useContent } from '@/context/ContentContext';

const statIcons = [TrendingUp, Award, Shield, Scale];

export const HeroSection = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { content } = useContent();
  const hero = content.hero;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('.hero-badge',   { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7 })
        .fromTo('.hero-title',   { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9 }, '-=0.3')
        .fromTo('.hero-sub',     { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
        .fromTo('.hero-cta',     { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
        .fromTo('.hero-stat',    { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.12 }, '-=0.2');
    }, heroRef);
    return () => ctx.revert();
  }, []);

  // Parse the title so each newline becomes its own line
  const titleLines = hero.title.split('\n');

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-navy"
    >
      {/* ── Background Image ── */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('${hero.backgroundImage || 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=2670'}')`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Deep Overlay for readability & professionalism */}
        <div className="absolute inset-0 bg-navy/80 backdrop-blur-[1px]" />
        {/* Subtle gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-transparent to-navy/60" />
      </div>

      {/* ── Decorative grid pattern ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] z-[1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* ══════════ MAIN CONTENT ══════════ */}
      <div className="container-legal relative z-10 flex flex-col items-center text-center pt-36 pb-24 md:pt-44 md:pb-28">

        {/* Badge */}
        <div className="hero-badge inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 mb-8">
          <Award className="w-4 h-4 text-accent flex-shrink-0" />
          <span className="text-cream/90 text-xs sm:text-sm font-medium tracking-widest uppercase">
            {hero.badge}
          </span>
        </div>

        {/* Main Title */}
        <h1 className="hero-title font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-cream leading-[1.08] mb-6 max-w-5xl">
          {titleLines.map((line, i) => (
            <span key={i} className="block">
              {i === 1 ? (
                // Highlight the middle line with gold gradient
                <span
                  style={{
                    background: 'linear-gradient(135deg, hsl(43 74% 55%) 0%, hsl(43 74% 70%) 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {line}
                </span>
              ) : (
                line
              )}
            </span>
          ))}
        </h1>

        {/* Gold divider line */}
        <div className="w-20 h-1 rounded-full bg-accent mb-8 opacity-80" />

        {/* Subtitle */}
        <p className="hero-sub text-cream/75 text-base sm:text-lg lg:text-xl max-w-2xl leading-relaxed mb-10 font-light">
          {hero.subtitle}
        </p>

        {/* CTA Buttons */}
        <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 w-full">
          <Link to="/inquiry" className="w-full sm:w-auto">
            <Button
              className="btn-gold text-base md:text-lg px-10 py-6 h-auto w-full text-white shadow-2xl hover:scale-105 transition-all duration-300 group"
            >
              Book Consultation
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link to="/practice-areas" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="border-2 border-accent/70 text-accent bg-transparent hover:bg-accent/10 hover:border-accent text-base md:text-lg px-10 py-6 h-auto w-full hover:scale-105 transition-all duration-300"
            >
              View Practice Areas
            </Button>
          </Link>
        </div>

        {/* Stats Row */}
        <div className="hero-stat-wrapper w-full max-w-3xl">
          {/* thin separator */}
          <div className="mb-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-cream/30 text-xs tracking-widest uppercase">Proven Track Record</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {hero.stats.map((stat, i) => {
              const Icon = statIcons[i % statIcons.length];
              return (
                <div key={i} className="hero-stat flex flex-col items-center text-center group">
                  {/* Icon bubble */}
                  <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl bg-accent/15 border border-accent/20 flex items-center justify-center mb-3 group-hover:bg-accent/25 transition-colors duration-300">
                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-accent" />
                  </div>
                  {/* Value */}
                  <div className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-cream mb-1 leading-none">
                    {stat.value}
                  </div>
                  {/* Label */}
                  <div className="text-cream/55 text-[10px] sm:text-xs md:text-sm font-medium tracking-wide">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 animate-bounce">
        <span className="text-cream/30 text-[10px] tracking-widest uppercase">Scroll</span>
        <div className="w-5 h-9 border-2 border-cream/20 rounded-full flex items-start justify-center p-1.5">
          <div className="w-1 h-2.5 bg-accent rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};
