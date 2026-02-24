import { Link } from 'react-router-dom';
import { Scale, Phone, Mail, MapPin, Clock, Shield } from 'lucide-react';
import { useContent } from '@/context/ContentContext';

const quickLinks = [
  { name: 'About Us', path: '/about' },
  { name: 'Our Services', path: '/practice-areas' },
  { name: 'Testimonials', path: '/testimonials' },
  { name: 'Knowledge Base', path: '/knowledge' },
  { name: 'Book Consultation', path: '/inquiry' },
  { name: 'Contact Us', path: '/contact' },
];

export const Footer = () => {
  const { content } = useContent();
  const { settings, practiceAreas } = content;
  const activeAreas = practiceAreas.items.filter(a => a.isActive).slice(0, 5);

  return (
    <footer className="bg-navy text-cream">
      {/* Main Footer */}
      <div className="container-legal section-padding">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 text-left">
          {/* Brand Column */}
          <div className="space-y-6 flex flex-col items-center sm:items-start">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-accent rounded-lg flex items-center justify-center">
                <Scale className="w-6 h-6 md:w-7 md:h-7 text-accent-foreground" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-display text-xl md:text-2xl font-bold text-cream">
                  {settings.firmName.split(' ')[0]}
                </span>
                <span className="text-[10px] md:text-xs tracking-widest uppercase text-cream/60">
                  {settings.firmName.split(' ').slice(1).join(' ')}
                </span>
              </div>
            </Link>
            <p className="text-cream/70 text-sm leading-relaxed max-w-xs mx-auto sm:mx-0">
              Delivering excellence in legal representation with integrity, 
              professionalism, and dedication to our clients' success for over 
              two decades.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-navy-light rounded-full flex items-center justify-center hover:bg-accent transition-colors group"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5 text-cream group-hover:text-accent-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-navy-light rounded-full flex items-center justify-center hover:bg-accent transition-colors group"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5 text-cream group-hover:text-accent-foreground" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Practice Areas */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="font-display text-lg font-semibold text-cream mb-6">
              Practice Areas
            </h4>
            <ul className="space-y-3">
              {activeAreas.map((area) => (
                <li key={area.id}>
                  <Link
                    to={`/practice-areas/${area.id}`}
                    className="text-cream/70 hover:text-accent transition-colors text-sm"
                  >
                    {area.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="font-display text-lg font-semibold text-cream mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-cream/70 hover:text-accent transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center sm:items-start">
            <h4 className="font-display text-lg font-semibold text-cream mb-6">
              Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 justify-center sm:justify-start">
                <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-cream/70 text-sm whitespace-pre-line">
                  {settings.address}
                </span>
              </li>
              <li className="flex items-center gap-3 justify-center sm:justify-start">
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <a href={`tel:${settings.phone.replace(/\s/g, '')}`} className="text-cream/70 hover:text-accent transition-colors text-sm">
                  {settings.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 justify-center sm:justify-start">
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <a href={`mailto:${settings.email}`} className="text-cream/70 hover:text-accent transition-colors text-sm">
                  {settings.email}
                </a>
              </li>
              <li className="flex items-center gap-3 justify-center sm:justify-start">
                <Clock className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="text-cream/70 text-sm">
                  {content.contact.hours.split('\n')[0]}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-navy-light">
        <div className="container-legal py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 text-center md:text-left">
            <p className="text-cream/50 text-xs md:text-sm">
              © {new Date().getFullYear()} {settings.firmName}. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6 items-center">
              <Link to="/privacy" className="text-cream/50 hover:text-cream text-xs md:text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-cream/50 hover:text-cream text-xs md:text-sm transition-colors">
                Terms of Service
              </Link>
              <Link to="/disclaimer" className="text-cream/50 hover:text-cream text-xs md:text-sm transition-colors">
                Legal Disclaimer
              </Link>
              <span className="text-cream/20 hidden md:inline">|</span>
              <Link
                to="/admin"
                className="flex items-center gap-1.5 text-cream/30 hover:text-cream/70 text-xs transition-colors group"
                title="Admin Login"
              >
                <Shield className="w-3 h-3 group-hover:text-accent transition-colors" />
                <span>Admin Login</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
