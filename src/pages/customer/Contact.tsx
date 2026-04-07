import { Link } from 'react-router-dom';
import { Layout } from '@/components/customer/layout/Layout';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t, i18n } = useTranslation();
  const { content } = useContent();
  const c = content.contact;
  const isEn = i18n.language === 'en';

  const badge = isEn ? (c.badge || t('contact.badge')) : (c.marathi?.badge || t('contact.badge'));
  const heroTitle = isEn ? (c.heroTitle || t('contact.heroTitle')) : (c.marathi?.heroTitle || t('contact.heroTitle'));
  const heroSubtitle = isEn ? (c.heroSubtitle || t('contact.heroSubtitle')) : (c.marathi?.heroSubtitle || t('contact.heroSubtitle'));

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-hero pt-32 pb-16 md:pt-44 md:pb-20">
        <div className="container-legal text-center">
          <div className="max-w-4xl mx-auto">
            <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 block animate-in fade-in slide-in-from-bottom-3 duration-700">
              {badge}
            </span>
            <h1 className="heading-display text-cream mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              {heroTitle.split('\n').map((line, i) => (
                <span key={i} className={`block ${!isEn && i > 0 ? 'mt-3 sm:mt-4' : ''} ${!isEn ? 'py-1' : ''}`}>
                  {line}
                </span>
              ))}
            </h1>
            <p className="text-cream/80 text-lg leading-relaxed animate-in fade-in slide-in-from-bottom-5 duration-700 delay-300">
              {heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding bg-background">
        <div className="container-legal">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="flex flex-col h-full">
              <h2 className="heading-section text-foreground mb-6">{t('footer.contactUs')}</h2>
              <div className="accent-line mb-8" />
              <div className="space-y-6 flex-grow flex flex-col">
                {/* Address */}
                <div className="card-premium p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">{t('contact.address')}</h3>
                      <p className="text-muted-foreground whitespace-pre-line">{isEn ? c.address : (c.marathi?.address || c.address)}</p>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="card-premium p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">{t('contact.phone')}</h3>
                      <a href={`tel:${(isEn ? c.phone : (c.marathi?.phone || c.phone)).replace(/\s/g, '')}`} className="text-accent hover:underline block">{isEn ? c.phone : (c.marathi?.phone || c.phone)}</a>
                      {(isEn ? c.officePhone : (c.marathi?.officePhone || c.officePhone)) && (
                        <a href={`tel:${(isEn ? c.officePhone : (c.marathi?.officePhone || c.officePhone)).replace(/\s/g, '')}`} className="text-muted-foreground hover:text-accent block">{isEn ? c.officePhone : (c.marathi?.officePhone || c.officePhone)} ({t('contact.officeLabel', 'Office')})</a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="card-premium p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">{t('contact.email')}</h3>
                      <a href={`mailto:${isEn ? c.email : (c.marathi?.email || c.email)}`} className="text-accent hover:underline block">{isEn ? c.email : (c.marathi?.email || c.email)}</a>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="card-premium p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">{t('contact.hours')}</h3>
                      <p className="text-muted-foreground whitespace-pre-line">{isEn ? c.hours : (c.marathi?.hours || c.hours)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="flex flex-col h-full">
              <h2 className="heading-section text-foreground mb-6">{t('contact.location', 'Location')}</h2>
              <div className="accent-line mb-8" />
              <div className="card-premium overflow-hidden flex-grow flex flex-col">
                <div className="w-full h-full flex-grow bg-muted min-h-[300px]">
                  <iframe
                    src={c.mapEmbed}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full"
                  />
                </div>
              </div>

              <div className="mt-8 p-6 bg-navy rounded-lg text-center sm:text-left flex-shrink-0">
                <h3 className="font-display text-lg font-semibold text-cream mb-3">{t('contact.consultationTitle', 'For Detailed Legal Consultation')}</h3>
                <p className="text-cream/70 text-sm mb-6">
                  {t('contact.consultationDesc', 'General questions can be addressed via phone or email. For detailed legal consultation and case analysis, please book a consultation through our secure form.')}
                </p>
                <Link to="/inquiry" className="block sm:inline-block">
                  <Button className="bg-accent text-white hover:bg-gold-dark shadow-gold font-bold hover:scale-105 w-full sm:w-auto transition-all duration-300">
                    {t('common.bookConsultation')}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
