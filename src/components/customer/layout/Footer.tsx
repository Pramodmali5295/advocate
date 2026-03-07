import { Link } from 'react-router-dom';
import { Scale, Phone, Mail, MapPin, Clock, Shield } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import { useTranslation } from 'react-i18next';

const quickLinksKeys = [
  { nameKey: 'navigation.about', path: '/about' },
  { nameKey: 'navigation.practiceAreas', path: '/practice-areas' },
  { nameKey: 'navigation.testimonials', path: '/testimonials' },
  { nameKey: 'navigation.knowledgeBase', path: '/knowledge' },
  { nameKey: 'common.bookConsultation', path: '/inquiry' },
  { nameKey: 'navigation.contact', path: '/contact' },
];

export const Footer = () => {
  const { t, i18n } = useTranslation();
  const { content } = useContent();
  const { settings, practiceAreas } = content;
  const isEn = i18n.language === 'en';
  const activeAreas = practiceAreas.items.filter(a => a.isActive).slice(0, 5);

  return (
    <footer className="bg-navy text-cream">
      {/* Main Footer */}
      <div className="container-legal py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 text-left">
          {/* Brand Column */}
          <div className="space-y-6 flex flex-col items-center sm:items-start">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-accent rounded-lg flex items-center justify-center">
                <Scale className="w-6 h-6 md:w-7 md:h-7 text-accent-foreground" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-display text-2xl md:text-3xl font-bold text-cream">
                  {settings.firmName.split(' ')[0]}
                </span>
                <span className="text-xs md:text-sm tracking-widest uppercase text-cream/60">
                  {settings.firmName.split(' ').slice(1).join(' ')}
                </span>
              </div>
            </Link>
            <p className="text-cream/70 text-base leading-relaxed max-w-xs mx-auto sm:mx-0">
              {t('footer.description')}
            </p>
          </div>

          {/* Practice Areas */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h4 className="font-display text-xl font-semibold text-cream mb-4">
              {t('navigation.practiceAreas')}
            </h4>
            <ul className="space-y-3">
              {activeAreas.map((area) => (
                <li key={area.id}>
                   <Link
                    to={`/practice-areas/${area.id}`}
                    className="text-cream/70 hover:text-accent transition-colors text-base"
                  >
                    {isEn ? (area.title || t(`practiceAreas.${area.id}.title`)) : t(`practiceAreas.${area.id}.title`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h4 className="font-display text-xl font-semibold text-cream mb-4">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-3">
              {quickLinksKeys.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-cream/70 hover:text-accent transition-colors text-base"
                  >
                    {t(link.nameKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h4 className="font-display text-xl font-semibold text-cream mb-4">
              {t('footer.contactUs')}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 justify-center sm:justify-start">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-cream/70 text-base whitespace-pre-line">
                  {settings.address}
                </span>
              </li>
              <li className="flex items-center gap-3 justify-center sm:justify-start">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="text-cream/70 hover:text-accent transition-colors text-base">
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 justify-center sm:justify-start">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <a href={`mailto:${settings.email}`} className="text-cream/70 hover:text-accent transition-colors text-base">
                  {settings.email}
                </a>
              </li>
              <li className="flex items-center gap-3 justify-center sm:justify-start">
                <Clock className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-cream/70 text-base">
                  {content.contact.hours.split('\n')[0]}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-navy-light/30">
        <div className="container-legal py-4 md:py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 text-center md:text-left">
            <p className="text-cream/50 text-sm md:text-base">
              © {new Date().getFullYear()} {settings.firmName}. {t('footer.copyright')}
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 items-center">
              <Link
                to="/admin"
                className="flex items-center gap-1.5 text-cream/30 hover:text-cream/70 text-sm transition-colors group"
                title="Admin Login"
              >
                <Shield className="w-4 h-4 group-hover:text-accent transition-colors" />
                <span>{t('footer.adminLogin')}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
