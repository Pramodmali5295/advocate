import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Check, ArrowRight } from 'lucide-react';
import { useContent } from '@/context/ContentContext';

export const AboutSection = () => {
  const { content } = useContent();
  const about = content.aboutSection;

  // Get initials from name
  const initials = about.name
    .split(' ')
    .filter(w => w.match(/[A-Z]/))
    .map(w => w[0])
    .join('')
    .slice(0, 2);

  return (
    <section className="section-padding bg-cream-dark scroll-mt-20" id="about">
      <div className="container-legal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Image Column */}
          <div className="relative order-2 lg:order-1">
            <div className="relative z-10">
              <div className="aspect-[3/2] bg-navy rounded-lg overflow-hidden shadow-2xl">
                <div className="w-full h-full bg-gradient-to-br from-navy to-charcoal flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-24 h-24 md:w-32 md:h-32 mx-auto bg-accent/20 rounded-full flex items-center justify-center mb-6">
                      <span className="font-display text-4xl md:text-5xl text-accent">{initials}</span>
                    </div>
                    <h3 className="font-display text-xl md:text-2xl text-cream mb-2">{about.name}</h3>
                    <p className="text-cream/60 text-xs md:text-sm">{about.title_designation}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 w-full h-full border-2 border-accent rounded-lg -z-10" />

            {/* Experience badge */}
            <div className="absolute -bottom-6 -left-4 md:-bottom-8 md:-left-8 bg-accent rounded-lg p-4 md:p-6 shadow-gold z-20">
              <div className="text-center">
                <div className="font-display text-2xl md:text-4xl font-bold text-accent-foreground">
                  {about.experience}
                </div>
                <div className="text-accent-foreground/80 text-[10px] md:text-sm font-medium leading-tight">
                  Years of<br />Excellence
                </div>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="order-1 lg:order-2">
            <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 block">
              {about.badge}
            </span>
            <h2 className="heading-section text-foreground mb-4">
              {about.title}
            </h2>
            <div className="accent-line mb-6" />

            <p className="text-body mb-8">{about.description}</p>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 mb-10">
              {about.highlights.map((h) => (
                <div key={h.label} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-accent font-bold text-sm">{h.value}</span>
                  </div>
                  <span className="text-foreground text-sm font-medium">{h.label}</span>
                </div>
              ))}
            </div>

            <Button asChild className="btn-gold px-10 py-7 h-auto text-lg w-full sm:w-auto text-white shadow-xl hover:scale-105 transition-all group">
              <Link to="/about">
                Learn More About Us
                <ArrowRight className="ml-2 w-6 h-6 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
