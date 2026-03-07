import { Layout } from '@/components/customer/layout/Layout';
import { useContent } from '@/context/ContentContext';
import { useTranslation } from 'react-i18next';
import { GraduationCap, Award, Scale, BookOpen, MapPin, Calendar, Check } from 'lucide-react';

const About = () => {
  const { t, i18n } = useTranslation();
  const { content } = useContent();
  const p = content.aboutPage;
  const isEn = i18n.language === 'en';

  const badge = isEn ? (p.badge || t('about.badge')) : (p.marathi?.badge || t('about.badge'));
  const heroTitle = isEn ? (p.heroTitle || t('about.heroTitle')) : (p.marathi?.heroTitle || t('about.heroTitle'));
  const heroSubtitle = isEn ? (p.heroSubtitle || t('about.heroSubtitle')) : (p.marathi?.heroSubtitle || t('about.heroSubtitle'));

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-hero pt-44 pb-20">
        <div className="container-legal text-center">
          <div className="max-w-4xl mx-auto">
            <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 block animate-in fade-in slide-in-from-bottom-3 duration-700">
              {badge}
            </span>
            <h1 className="heading-display text-cream mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              {heroTitle}
            </h1>
            <p className="text-cream/80 text-lg leading-relaxed animate-in fade-in slide-in-from-bottom-5 duration-700 delay-300">
              {heroSubtitle}
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
                  <div className="w-32 h-32 mx-auto bg-navy rounded-full overflow-hidden mb-4 border-2 border-accent/20">
                    <img 
                      src="/Adv Homepage.jpeg" 
                      alt={t('about.advocateName')}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-foreground">{isEn ? (p.advocateName || t('about.advocateName')) : (p.marathi?.advocateName || t('about.advocateName'))}</h3>
                  <p className="text-muted-foreground">{isEn ? (p.advocateTitle || t('about.designation')) : (p.marathi?.advocateTitle || t('about.designation'))}</p>
                </div>

                <div className="space-y-4 pt-6 border-t border-border">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-5 h-5 text-accent" />
                    <span className="text-sm">{isEn ? (p.education || t('about.education')) : (p.marathi?.education || t('about.education'))}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-accent" />
                    <span className="text-sm">{t('about.practiceYears')}: 20+</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Scale className="w-5 h-5 text-accent" />
                    <span className="text-sm">{t('aboutSection.highlights.casesHandled')}: {isEn ? content.aboutSection.casesHandled : (content.aboutSection.marathi?.casesHandled || content.aboutSection.casesHandled)}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-accent" />
                    <span className="text-sm">{isEn ? (p.location || t('about.location')) : (p.marathi?.location || t('about.location'))}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Biography */}
              <div>
                <h2 className="heading-section text-foreground mb-6">{t('about.experience')}</h2>
                <div className="accent-line mb-6" />
                <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                  {(!isEn && p.marathi?.bio?.length > 0 ? p.marathi.bio : (isEn && p.bio?.length > 0 ? p.bio : (t('about.bio', { returnObjects: true }) as string[]))).map((paragraph: string, i: number) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h2 className="heading-section text-foreground mb-6">{t('about.qualifications')}</h2>
                <div className="accent-line mb-6" />
                <div className="grid gap-3">
                  {(!isEn && p.marathi?.certifications?.length > 0 ? p.marathi.certifications : (isEn && p.certifications?.length > 0 ? p.certifications : (t('about.certifications', { returnObjects: true }) as string[]))).map((cert: string, index: number) => (
                    <div key={index} className="flex items-center gap-3 p-4 bg-muted rounded-lg">
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
                <h2 className="heading-section text-foreground mb-6">{t('about.achievements')}</h2>
                <div className="accent-line mb-8" />
                <div className="relative">
                  <div className="absolute left-[27px] top-0 bottom-0 w-0.5 bg-border" />
                  <div className="space-y-10 md:space-y-8">
                    {(!isEn && p.marathi?.timeline?.length > 0 ? p.marathi.timeline : (isEn && p.timeline?.length > 0 ? p.timeline : (t('about.timeline', { returnObjects: true }) as any[]))).map((item: any, index: number) => (
                      <div key={index} className="relative flex flex-col sm:flex-row gap-4 sm:gap-6">
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
                    <h3 className="font-display text-xl font-semibold text-cream mb-3">{t('about.approach')}</h3>
                    <p className="text-cream/70 leading-relaxed">{isEn ? (p.ethicsStatement || t('about.ethicsStatement')) : (p.marathi?.ethicsStatement || t('about.ethicsStatement'))}</p>
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
