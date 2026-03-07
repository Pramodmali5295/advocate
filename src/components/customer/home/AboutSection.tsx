import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import { useTranslation } from 'react-i18next';

export const AboutSection = () => {
  const { t, i18n } = useTranslation();
  const { content } = useContent();
  const about = content.aboutSection;
  const isEn = i18n.language === 'en';

  const badge = isEn ? (about.badge || t('aboutSection.badge')) : (about.marathi?.badge || t('aboutSection.badge'));
  const title = isEn ? (about.title || t('aboutSection.title')) : (about.marathi?.title || t('aboutSection.title'));
  const description = isEn ? (about.description || t('aboutSection.description')) : (about.marathi?.description || t('aboutSection.description'));

  return (
    <section className="section-padding bg-cream-dark scroll-mt-20" id="about">
      <div className="container-legal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Column */}
          <div className="relative order-2 lg:order-1 max-w-2xl mx-auto lg:ml-auto w-full">
            <div className="relative z-10">
              <div className="aspect-[3/2] md:aspect-[4/3] lg:aspect-[3/2] max-h-[480px] bg-navy rounded-lg overflow-hidden shadow-2xl border border-white/10">
                <img 
                  src="/Adv Homepage.jpeg" 
                  alt={isEn ? about.name : (about.marathi?.name || about.name)}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-full h-full border-2 border-accent rounded-lg -z-10" />

            {/* Experience badge */}
            <div className="absolute -bottom-6 -left-4 md:-bottom-8 md:-left-8 bg-accent rounded-lg p-4 md:p-6 shadow-gold z-20">
              <div className="text-center">
                <div className="font-display text-2xl md:text-4xl font-bold text-accent-foreground">
                  {isEn ? about.experience : (about.marathi?.experience || about.experience)}
                </div>
                <div className="text-accent-foreground/80 text-[10px] md:text-sm font-medium leading-tight whitespace-pre-line">
                  {t('aboutSection.yearsOfExcellence')}
                </div>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="order-1 lg:order-2 max-w-2xl lg:mr-auto">
            <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 block">
              {badge}
            </span>
            <h2 className="heading-section text-foreground mb-4">
              {title}
            </h2>
            <div className="accent-line mb-6" />

            <p className="text-body mb-8">{description}</p>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 mb-10">
              {about.highlights.map((h, index) => {
                const key = index === 0 ? 'casesHandled' : index === 1 ? 'yearsExperience' : index === 2 ? 'successRate' : 'highCourts';
                const marathiH = about.marathi?.highlights?.[index];
                return (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-accent font-bold text-sm">{isEn ? h.value : (marathiH?.value || h.value)}</span>
                    </div>
                    <span className="text-foreground text-sm font-medium">{isEn ? (h.label || t(`aboutSection.highlights.${key}`)) : (marathiH?.label || t(`aboutSection.highlights.${key}`))}</span>
                  </div>
                );
              })}
            </div>

            <Button asChild className="btn-gold px-10 py-7 h-auto text-lg w-full sm:w-auto text-white shadow-xl hover:scale-105 transition-all group">
              <Link to="/about">
                {t('common.learnMore')}
                <ArrowRight className="ml-2 w-6 h-6 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
