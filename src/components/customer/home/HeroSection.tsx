import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Scale, Shield, Award, TrendingUp } from 'lucide-react';
import gsap from 'gsap';
import { useContent } from '@/context/ContentContext';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

const statIcons = [TrendingUp, Award, Shield, Scale];

export const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);
  const { content } = useContent();
  const hero = content.hero;
  const isEn = i18n.language === 'en';

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

  // Helper to get localized field
  const getField = (key: keyof typeof hero) => {
    if (isEn) return hero[key] || t(`hero.${key}`);
    return hero.marathi?.[key as keyof typeof hero.marathi] || t(`hero.${key}`);
  };

  const badge = getField('badge') as string;
  const title = getField('title') as string;
  const subtitle = getField('subtitle') as string;

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative flex flex-col bg-navy"
    >
      {/* ══════════ MAIN CONTENT ══════════ */}
      <div className="bg-navy relative overflow-hidden min-h-[25vh] flex flex-col justify-center pt-12 pb-6 md:pt-16 md:pb-10">
        {/* Decorative grid pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05] z-[1]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="container-legal relative z-10 flex flex-col items-center text-center py-16 md:py-24">
          {/* Badge */}
          <div className="hero-badge inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 mb-8">
            <Award className="w-4 h-4 text-accent flex-shrink-0" />
            <span className="text-cream/90 text-xs sm:text-sm font-medium tracking-widest uppercase">
              {badge}
            </span>
          </div>
          
          {/* Main Title */}
          <h1 className={cn(
            "hero-title font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-cream mb-8 max-w-[90rem]",
            isEn ? "leading-[1.1] tracking-tight" : "leading-[1.3] tracking-normal"
          )}>
            {title.split('\n').map((line, i) => (
              <span key={i} className={cn("block", !isEn && "py-2 sm:py-3")}>
                {i === 1 ? (
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
          <div className="w-24 h-1.5 rounded-full bg-accent mb-10 opacity-80" />

          {/* Subtitle */}
          <p className="hero-sub text-cream/75 text-lg sm:text-xl md:text-2xl max-w-4xl leading-relaxed mb-12 font-light">
            {subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 w-full">
            <Link to="/inquiry" className="w-full sm:w-auto">
              <Button
                className="btn-gold text-base md:text-lg px-10 py-6 h-auto w-full text-white shadow-2xl hover:scale-105 transition-all duration-300 group"
              >
                {t('common.bookConsultation')}
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          {/* Stats Row */}
          <div className="hero-stat-wrapper w-full max-w-3xl">
            {/* thin separator */}
            <div className="mb-8 flex items-center gap-4">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-cream/30 text-xs tracking-widest uppercase">{isEn ? 'Proven Track Record' : (hero.marathi as any)?.trackRecord || 'सिद्ध ट्रॅक रेकॉर्ड'}</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {hero.stats.map((stat, i) => {
                const Icon = statIcons[i % statIcons.length];
                const marathiStat = hero.marathi?.stats?.[i];
                return (
                  <div key={i} className="hero-stat flex flex-col items-center text-center group">
                    <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl bg-accent/15 border border-accent/20 flex items-center justify-center mb-3 group-hover:bg-accent/25 transition-colors duration-300">
                      <Icon className="w-5 h-5 md:w-6 md:h-6 text-accent" />
                    </div>
                    <div className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-cream mb-1 leading-none">
                      {isEn ? stat.value : (marathiStat?.value || stat.value)}
                    </div>
                    <div className="text-cream/55 text-[10px] sm:text-xs md:text-sm font-medium tracking-wide">
                      {isEn ? stat.label : (marathiStat?.label || (i === 0 ? t('hero.stats.casesWon') : i === 1 ? t('hero.stats.yearsExperience') : t('hero.stats.successRate')))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
