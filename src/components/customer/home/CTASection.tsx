import * as React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Phone, Clock, Shield, Award, LucideIcon } from 'lucide-react';
import { useContent } from '@/context/ContentContext';

const iconMap: Record<string, LucideIcon> = { ArrowRight, Phone, Clock, Shield, Award };

export const CTASection = () => {
  const { content } = useContent();
  const cta = content.cta;

  return (
    <section className="section-padding bg-background">
      <div className="container-legal">
        <div className="bg-gradient-hero rounded-3xl p-8 md:p-16 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-light rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-center lg:text-left">
              {/* Content */}
              <div>
                <h2 className="heading-section text-cream mb-6">{cta.title}</h2>
                <p className="text-cream/80 text-base md:text-lg mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">{cta.subtitle}</p>
                <div className="flex justify-center lg:justify-start">
                  <Button asChild className="btn-gold text-lg md:text-xl px-10 py-7 h-auto w-full sm:w-auto text-white shadow-2xl hover:scale-105 transition-all group">
                    <Link to="/inquiry">
                      {cta.buttonText}
                      <ArrowRight className="ml-2 w-6 h-6 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {cta.features.map((f, i) => {
                  const Icon = iconMap[f.icon] || Shield;
                  return (
                    <FeatureCard key={i} icon={<Icon className="w-6 h-6" />} title={f.title} description={f.description} />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({
  icon, title, description
}: {
  icon: React.ReactNode; title: string; description: string;
}) => (
  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 text-center">
    <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center text-accent mb-4 mx-auto">
      {icon}
    </div>
    <h3 className="font-semibold text-cream mb-2">{title}</h3>
    <p className="text-cream/60 text-sm">{description}</p>
  </div>
);
