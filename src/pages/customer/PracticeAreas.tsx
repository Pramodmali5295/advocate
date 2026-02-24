import { Link, useParams } from 'react-router-dom';
import { Layout } from '@/components/customer/layout/Layout';
import { Button } from '@/components/ui/button';
import {
  Scale, FileText, Users, Home, Building2, Briefcase,
  ArrowRight, Check, Gavel, LucideIcon
} from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import { PracticeAreaItem } from '@/types/content';

// Map icon name strings to actual icon components
const iconMap: Record<string, LucideIcon> = {
  Scale, FileText, Users, Home, Building2, Briefcase,
};

const PracticeAreas = () => {
  const { id } = useParams();
  const { content } = useContent();
  const { practiceAreas } = content;
  const items = practiceAreas.items.filter(a => a.isActive);

  if (id) {
    const area = items.find(a => a.id === id);
    if (!area) {
      return (
        <Layout>
          <div className="section-padding container-legal text-center">
            <h1 className="heading-section">Practice Area Not Found</h1>
            <Link to="/practice-areas" className="text-accent">View All Practice Areas</Link>
          </div>
        </Layout>
      );
    }

    const IconComponent = iconMap[area.icon] || Scale;

    return (
      <Layout>
        {/* Hero */}
        <section className="bg-gradient-hero pt-44 pb-16 md:pb-20">
          <div className="container-legal text-center">
            <div className="flex items-center justify-center gap-2 text-cream/60 text-xs md:text-sm mb-4 animate-in fade-in slide-in-from-bottom-3 duration-700">
              <Link to="/practice-areas" className="hover:text-accent">Practice Areas</Link>
              <span>/</span>
              <span className="text-cream">{area.title}</span>
            </div>
            <div className="flex flex-col items-center gap-4 md:gap-6 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-accent rounded-xl flex items-center justify-center">
                <IconComponent className="w-6 h-6 md:w-8 md:h-8 text-accent-foreground" />
              </div>
              <h1 className="heading-display text-cream text-3xl md:text-5xl">{area.title}</h1>
            </div>
            <p className="text-cream/80 text-base md:text-lg max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-700 delay-300">
              {area.fullDescription}
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="section-padding bg-background">
          <div className="container-legal">
            <div className="grid lg:grid-cols-3 gap-10 md:gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-10 md:space-y-12">
                {/* Services */}
                <div>
                  <h2 className="heading-section text-foreground mb-6">Services We Offer</h2>
                  <div className="accent-line mb-8" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    {area.services.map((service) => (
                      <div key={service} className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                        <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Check className="w-4 h-4 text-accent" />
                        </div>
                        <span className="text-foreground text-sm">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Courts */}
                <div>
                  <h2 className="heading-section text-foreground mb-6">Courts & Tribunals</h2>
                  <div className="accent-line mb-8" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    {area.courts.map((court) => (
                      <div key={court} className="flex items-center gap-3 p-4 border border-border rounded-lg">
                        <Gavel className="w-5 h-5 text-accent flex-shrink-0" />
                        <span className="text-foreground text-sm">{court}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-navy rounded-2xl p-6 md:p-8 text-center sm:text-left">
                  <h3 className="font-display text-xl md:text-2xl font-semibold text-cream mb-4">
                    Need Legal Assistance in {area.title}?
                  </h3>
                  <p className="text-cream/70 mb-6 text-sm md:text-base">
                    Book a consultation and receive detailed legal guidance from our experienced team within 24 hours.
                  </p>
                  <Link to="/inquiry">
                    <Button className="btn-gold w-full sm:w-auto">
                      Book Consultation <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="card-premium p-6 md:p-8 lg:sticky lg:top-24">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-6">Practice Statistics</h3>
                  <div className="space-y-6">
                    <div className="text-center p-6 bg-muted rounded-lg">
                      <div className="font-display text-4xl font-bold text-accent">{area.cases}</div>
                      <div className="text-muted-foreground text-sm mt-1">Cases Handled</div>
                    </div>
                    <div className="text-center p-6 bg-muted rounded-lg">
                      <div className="font-display text-4xl font-bold text-accent">{area.successRate}</div>
                      <div className="text-muted-foreground text-sm mt-1">Success Rate</div>
                    </div>
                  </div>
                  <div className="mt-8 pt-6 border-t border-border">
                    <h4 className="font-semibold text-foreground mb-4">Other Practice Areas</h4>
                    <div className="space-y-2">
                      {items.filter(a => a.id !== id).slice(0, 4).map((a) => {
                        const Icon = iconMap[a.icon] || Scale;
                        return (
                          <Link key={a.id} to={`/practice-areas/${a.id}`} className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors py-2">
                            <Icon className="w-4 h-4" />
                            <span>{a.title}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  // List all practice areas
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-hero pt-44 pb-20">
        <div className="container-legal text-center">
          <div className="max-w-4xl mx-auto">
            <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 block animate-in fade-in slide-in-from-bottom-3 duration-700">
              {practiceAreas.badge}
            </span>
            <h1 className="heading-display text-cream mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              {practiceAreas.heroTitle}
            </h1>
            <p className="text-cream/80 text-lg leading-relaxed animate-in fade-in slide-in-from-bottom-5 duration-700 delay-300">
              {practiceAreas.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Practice Areas Grid */}
      <section className="section-padding bg-background">
        <div className="container-legal">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((area) => {
              const Icon = iconMap[area.icon] || Scale;
              return (
                <Link key={area.id} to={`/practice-areas/${area.id}`} className="card-premium p-8 group">
                  <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent transition-colors">
                    <Icon className="w-7 h-7 text-accent group-hover:text-accent-foreground transition-colors" />
                  </div>
                  <h3 className="heading-card text-foreground mb-3 group-hover:text-accent transition-colors">{area.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">{area.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex gap-4">
                      <span className="text-sm">
                        <span className="text-accent font-semibold">{area.cases}</span>
                        <span className="text-muted-foreground"> Cases</span>
                      </span>
                    </div>
                    <span className="text-accent flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PracticeAreas;
