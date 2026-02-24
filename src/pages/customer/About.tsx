import { Layout } from '@/components/customer/layout/Layout';
import { useContent } from '@/context/ContentContext';
import { GraduationCap, Award, Scale, BookOpen, MapPin, Calendar, Check } from 'lucide-react';

const About = () => {
  const { content } = useContent();
  const p = content.aboutPage;

  const initials = p.advocateName
    .split(' ')
    .filter(w => w.match(/[A-Z]/))
    .map(w => w[0])
    .join('')
    .slice(0, 2);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero pt-44 pb-20">
        <div className="container-legal text-center">
          <div className="max-w-4xl mx-auto">
            <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 block animate-in fade-in slide-in-from-bottom-3 duration-700">
              {p.badge}
            </span>
            <h1 className="heading-display text-cream mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              {p.heroTitle}
            </h1>
            <p className="text-cream/80 text-lg leading-relaxed animate-in fade-in slide-in-from-bottom-5 duration-700 delay-300">
              {p.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-background">
        <div className="container-legal">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="card-premium p-6 md:p-8 lg:sticky lg:top-24">
                <div className="text-center mb-6">
                  <div className="w-32 h-32 mx-auto bg-navy rounded-full flex items-center justify-center mb-4">
                    <span className="font-display text-4xl text-accent">{initials}</span>
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-foreground">{p.advocateName}</h3>
                  <p className="text-muted-foreground">{p.advocateTitle}</p>
                </div>

                <div className="space-y-4 pt-6 border-t border-border">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-5 h-5 text-accent" />
                    <span className="text-sm">{p.education}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-accent" />
                    <span className="text-sm">20+ Years Experience</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Scale className="w-5 h-5 text-accent" />
                    <span className="text-sm">2,500+ Cases Handled</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-accent" />
                    <span className="text-sm">{p.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Biography */}
              <div>
                <h2 className="heading-section text-foreground mb-6">Biography</h2>
                <div className="accent-line mb-6" />
                <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                  {p.bio.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h2 className="heading-section text-foreground mb-6">Certifications & Memberships</h2>
                <div className="accent-line mb-6" />
                <div className="grid gap-3">
                  {p.certifications.map((cert) => (
                    <div key={cert} className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                      <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-accent" />
                      </div>
                      <span className="text-foreground">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h2 className="heading-section text-foreground mb-6">Professional Journey</h2>
                <div className="accent-line mb-8" />
                <div className="relative">
                  <div className="absolute left-[27px] top-0 bottom-0 w-0.5 bg-border" />
                  <div className="space-y-10 md:space-y-8">
                    {p.timeline.map((item) => (
                      <div key={item.year} className="relative flex flex-col sm:flex-row gap-4 sm:gap-6">
                        <div className="relative z-10 flex-shrink-0">
                          <div className="w-12 h-12 md:w-14 md:h-14 bg-accent rounded-full flex items-center justify-center">
                            <Calendar className="w-5 h-5 md:w-6 md:h-6 text-accent-foreground" />
                          </div>
                        </div>
                        <div className="sm:pt-2">
                          <span className="text-accent font-semibold text-xs md:text-sm">{item.year}</span>
                          <h3 className="font-display text-lg md:text-xl font-semibold text-foreground mt-1">{item.title}</h3>
                          <p className="text-muted-foreground text-sm md:text-base mt-2">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Ethics Statement */}
              <div className="bg-navy rounded-2xl p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-cream mb-3">Our Ethical Commitment</h3>
                    <p className="text-cream/70 leading-relaxed">{p.ethicsStatement}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
