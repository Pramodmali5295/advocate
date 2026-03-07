import { Star, Quote, MapPin } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import { useTranslation } from 'react-i18next';

export const TestimonialsSection = () => {
  const { t, i18n } = useTranslation();
  const { content } = useContent();
  const { testimonials } = content;
  const items = testimonials.items;
  const isEn = i18n.language === 'en';

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

  return (
    <section className="section-padding bg-cream-dark scroll-mt-20 overflow-hidden" id="testimonials">
      <div className="container-legal px-0 sm:px-0 lg:px-0 max-w-none">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16 container-legal">
          <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 block">
            {isEn ? (testimonials.badge || t('testimonials.badge')) : (testimonials.marathi?.badge || t('testimonials.badge'))}
          </span>
          <h2 className="heading-section text-foreground mb-4">
            {isEn ? (testimonials.heroTitle || t('testimonials.heroTitle')) : (testimonials.marathi?.heroTitle || t('testimonials.heroTitle'))}
          </h2>
          <div className="accent-line-center mb-6" />
          <p className="text-body max-w-2xl mx-auto px-4">
            {isEn ? (testimonials.heroSubtitle || t('testimonials.heroSubtitle')) : (testimonials.marathi?.heroSubtitle || t('testimonials.heroSubtitle'))}
          </p>
        </div>

        {/* ─── Continuous Marquee ────────────────────────────── */}
        <div className="relative group">
          <div 
            className="flex gap-6 animate-marquee py-4 hover:[animation-play-state:paused] whitespace-nowrap"
            style={{ '--duration': '10s' } as React.CSSProperties}
          >
            {[...items, ...items, ...items].map((t, idx) => (
              <div 
                key={`${t.id}-${idx}`} 
                className="w-[300px] sm:w-[400px] flex-shrink-0"
              >
                <div className="h-full relative flex flex-col bg-background rounded-2xl border border-border shadow-md hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 p-6 sm:p-8 group/card overflow-hidden whitespace-normal">
                  {/* Subtle gold corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-accent/5 rounded-bl-3xl rounded-tr-2xl pointer-events-none" />

                  {/* Quote Icon */}
                  <div className="mb-6">
                    <div className="w-11 h-11 bg-accent/10 rounded-xl flex items-center justify-center group-hover/card:bg-accent/20 transition-colors duration-300">
                      <Quote className="w-5 h-5 text-accent" />
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed flex-1 mb-6 italic">
                    "{!isEn && testimonials.marathi?.items?.[idx % items.length]?.content ? testimonials.marathi.items[idx % items.length].content : t.content}"
                  </p>

                  {/* Divider */}
                  <div className="border-t border-border mb-6" />

                  {/* Footer Info */}
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-navy to-charcoal flex items-center justify-center flex-shrink-0 shadow-sm border-2 border-accent/20">
                        <span className="text-accent font-bold text-xs sm:text-sm tracking-tighter">{getInitials(t.name)}</span>
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-foreground text-sm sm:text-base truncate">
                          {!isEn && testimonials.marathi?.items?.[idx % items.length]?.name ? testimonials.marathi.items[idx % items.length].name : t.name}
                        </div>
                        <div className="text-muted-foreground text-xs sm:text-sm truncate">
                          {!isEn && testimonials.marathi?.items?.[idx % items.length]?.role ? testimonials.marathi.items[idx % items.length].role : t.role}
                        </div>
                      </div>
                    </div>
                    
                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-medium text-accent bg-accent/5 px-2 py-1.5 sm:px-3 rounded-full">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      <span>{!isEn && testimonials.marathi?.items?.[idx % items.length]?.location ? testimonials.marathi.items[idx % items.length].location : t.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
