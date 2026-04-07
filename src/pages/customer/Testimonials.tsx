import { Layout } from '@/components/customer/layout/Layout';
import { Link } from 'react-router-dom';
import { Star, Quote, MapPin, CheckCircle2 } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import { useTranslation } from 'react-i18next';

const TestimonialsPage = () => {
  const { t, i18n } = useTranslation();
  const { content } = useContent();
  const { testimonials } = content;
  const items = testimonials.items;
  const isEn = i18n.language === 'en';
  const heroTitle = isEn ? (testimonials.heroTitle || t('testimonials.heroTitle')) : (testimonials.marathi?.heroTitle || t('testimonials.heroTitle'));
  const heroSubtitle = isEn ? (testimonials.heroSubtitle || t('testimonials.heroSubtitle')) : (testimonials.marathi?.heroSubtitle || t('testimonials.heroSubtitle'));

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();

  return (
    <Layout>
      {/* Hero Header */}
      <section className="relative pt-32 pb-16 md:pt-44 md:pb-24 bg-navy text-cream overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(196,160,82,0.3),transparent_50%)]" />
        </div>
        
        <div className="container-legal relative z-10 text-center">
          <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 block animate-in fade-in slide-in-from-bottom-3 duration-700">
            {isEn ? (testimonials.badge || t('testimonials.badge')) : (testimonials.marathi?.badge || t('testimonials.badge'))}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            {heroTitle.split('\n').map((line, i) => (
              <span key={i} className={`block ${!isEn && i > 0 ? 'mt-3 sm:mt-4' : ''} ${!isEn ? 'py-1' : ''}`}>
                {line}
              </span>
            ))}
          </h1>
          <div className="accent-line-center mb-8 animate-in fade-in zoom-in duration-700 delay-200" />
          <p className="text-cream/80 max-w-2xl mx-auto text-lg leading-relaxed animate-in fade-in slide-in-from-bottom-5 duration-700 delay-300">
            {heroSubtitle}
          </p>
        </div>
      </section>

      {/* Testimonials Grid Section */}
      <section className="section-padding bg-cream-dark">
        <div className="w-full px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {items.map((t, index) => (
              <div 
                key={t.id}
                className="bg-background rounded-2xl p-8 border border-border shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Decorative Elements */}
                <div className="absolute top-6 right-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="w-12 h-12 text-accent" />
                </div>
                
                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < t.rating ? 'fill-accent text-accent' : 'text-border'}`} 
                    />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-body text-lg italic mb-8 relative z-10 leading-relaxed">
                  "{t.content}"
                </blockquote>

                {/* Divider */}
                <div className="h-px w-full bg-gradient-to-r from-accent/30 via-accent/10 to-transparent mb-8" />

                {/* Author Info */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-navy to-charcoal flex items-center justify-center flex-shrink-0 shadow-lg border-2 border-accent/20">
                    <span className="text-accent font-bold text-lg">{getInitials(t.name)}</span>
                  </div>
                  <div className="min-w-0">
                    <div className="font-display font-bold text-foreground text-lg flex items-center gap-2">
                       {t.name}
                       <CheckCircle2 className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="text-muted-foreground text-sm font-medium">{t.role}</div>
                  </div>
                </div>

                {/* Location Badge */}
                <div className="absolute bottom-8 right-8 flex items-center gap-1.5 text-xs font-semibold text-accent/70 bg-accent/5 px-3 py-1.5 rounded-full border border-accent/10">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{t.location}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Secondary CTA */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container-legal text-center relative z-10 px-4">
           <h2 className="heading-section mb-8 px-4">{t('testimonials.ctaTitle')}</h2>
           <p className="text-body max-w-2xl mx-auto mb-10 text-lg">
             {t('testimonials.ctaSubtitle')}
           </p>
           <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Link to="/inquiry" className="btn-gold px-10 py-4 text-lg">{t('testimonials.bookConsultation')}</Link>
             <Link to="/practice-areas" className="btn-outline border-2 border-accent text-accent hover:bg-accent/10 px-10 py-4 text-lg text-center transition-all">{t('testimonials.exploreServices')}</Link>
           </div>
        </div>
      </section>
    </Layout>
  );
};

export default TestimonialsPage;
