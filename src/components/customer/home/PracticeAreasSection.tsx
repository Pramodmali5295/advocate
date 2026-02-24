import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Scale, Users, Home, Building2, Briefcase, FileText, ArrowRight, LucideIcon } from 'lucide-react';
import { useContent } from '@/context/ContentContext';

const iconMap: Record<string, LucideIcon> = { Scale, FileText, Users, Home, Building2, Briefcase };

export const PracticeAreasSection = () => {
  const { content } = useContent();
  const { practiceAreas } = content;
  const areas = practiceAreas.items.filter(a => a.isActive);

  return (
    <section className="section-padding bg-background scroll-mt-20" id="practice-areas">
      <div className="container-legal">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 block">{practiceAreas.badge}</span>
          <h2 className="heading-section text-foreground mb-4">{practiceAreas.heroTitle}</h2>
          <div className="accent-line-center mb-6" />
          <p className="text-body max-w-2xl mx-auto px-4">
            {practiceAreas.heroSubtitle}
          </p>
        </div>

        {/* Practice Areas Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {areas.map((area, index) => {
            const Icon = iconMap[area.icon] || Scale;
            return (
              <Link key={area.id} to={`/practice-areas/${area.id}`} className="card-premium p-6 md:p-8 group" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-12 h-12 md:w-14 md:h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent transition-colors duration-300">
                  <Icon className="w-6 h-6 md:w-7 md:h-7 text-accent group-hover:text-accent-foreground transition-colors duration-300" />
                </div>
                <h3 className="heading-card text-foreground mb-3 group-hover:text-accent transition-colors">{area.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{area.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-accent text-xs md:text-sm font-semibold">{area.cases} Cases</span>
                  <span className="flex items-center gap-2 text-muted-foreground text-xs md:text-sm group-hover:text-accent transition-colors">
                    Learn More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 md:mt-16">
          <Button asChild className="btn-gold px-10 py-7 h-auto text-lg text-white shadow-xl hover:scale-105 transition-all group">
            <Link to="/practice-areas">
              View All Practice Areas
              <ArrowRight className="ml-2 w-6 h-6 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
