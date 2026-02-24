import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useContent } from '@/context/ContentContext';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Practice Areas', path: '/practice-areas' },
  { name: 'Testimonials', path: '/testimonials' },
  { name: 'Knowledge Base', path: '/knowledge' },
  { name: 'Contact', path: '/contact' },
];

export const Header = () => {
  const { content } = useContent();
  const { settings } = content;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  // Handle scroll lock when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu when shifting orientation or window size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-md py-4 md:py-5'
          : 'bg-transparent py-6 md:py-10'
      )}
    >
      <div className="container-legal">
        <nav className="flex items-center h-full">
          {/* Logo - Left Corner */}
          <div className="flex-1 flex justify-start">
            <Link to="/" className="flex items-center gap-3 md:gap-4 group">
              <div className="w-10 h-10 md:w-14 md:h-14 bg-accent rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                <Scale className="w-6 h-6 md:w-8 md:h-8 text-accent-foreground" />
              </div>
              <div className="flex flex-col">
                <span className={cn(
                  'font-display text-xl md:text-2xl lg:text-3xl font-bold tracking-tight transition-colors leading-none',
                  isScrolled ? 'text-foreground' : 'text-white'
                )}>
                  {settings.firmName.split(' ')[0]}
                </span>
                <span className={cn(
                  'text-[10px] md:text-xs lg:text-sm tracking-[0.2em] uppercase transition-colors mt-1',
                  isScrolled ? 'text-muted-foreground' : 'text-white/70'
                )}>
                  {settings.firmName.split(' ').slice(1).join(' ')}
                </span>
              </div>
            </Link>
          </div>

          {/* Center Navigation - Desktop Only */}
          <div className="hidden lg:flex items-center justify-center gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'text-base md:text-lg font-semibold transition-colors relative whitespace-nowrap',
                  isActive(link.path)
                    ? 'text-accent'
                    : isScrolled
                      ? 'text-foreground hover:text-accent'
                      : 'text-white/90 hover:text-white',
                  'after:absolute after:bottom-[-4px] after:left-0 after:h-0.5 after:bg-accent after:transition-all after:duration-300',
                  isActive(link.path) ? 'after:w-full' : 'after:w-0 hover:after:w-full'
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop & Mobile CTA - Right Corner */}
          <div className="flex-1 flex items-center justify-end gap-3 md:gap-4">
            {/* Phone (Desktop Only) */}
            <div
              className={cn(
                'hidden xl:flex items-center gap-2 text-sm font-medium mr-2',
                isScrolled ? 'text-foreground' : 'text-white'
              )}
            >
              <Phone className="w-4 h-4" />
              <span>{settings.phone}</span>
            </div>

            {/* Inquiry Button - All Devices */}
            <Link to="/inquiry" className="flex items-center">
              <Button className={cn(
                "btn-gold",
                "h-10 md:h-14 px-4 md:px-8 text-sm md:text-base font-bold shadow-xl hover:scale-105 transition-all text-white"
              )}>
                <span className="hidden sm:inline">Book Consultation</span>
                <span className="sm:hidden">Book Now</span>
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={cn(
                'lg:hidden p-2 transition-colors z-50 rounded-lg shrink-0',
                isScrolled 
                  ? 'text-foreground hover:bg-accent/10' 
                  : 'text-white hover:bg-white/10'
              )}
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <div className={cn(
          'lg:hidden fixed inset-0 bg-background z-40 transition-all duration-500 ease-in-out transform',
          isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        )}>
          {/* Decorative background elements for mobile menu */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-light/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="container-legal relative h-full flex flex-col pt-24 pb-12">
            <nav className="flex-1 overflow-y-auto py-8">
              <div className="flex flex-col gap-2">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      'group flex items-center justify-between py-6 text-3xl md:text-4xl font-display font-bold transition-all duration-300',
                      isActive(link.path) ? 'text-accent pl-2' : 'text-foreground hover:text-accent pl-0 hover:pl-2',
                      isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                    )}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <span>{link.name}</span>
                    <div className={cn(
                      'w-2 h-2 rounded-full bg-accent transition-all duration-300',
                      isActive(link.path) ? 'opacity-100 scale-100' : 'opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100'
                    )} />
                  </Link>
                ))}
              </div>
            </nav>
            
            <div className={cn(
              "mt-auto pt-8 border-t border-border/50 space-y-8 transition-all duration-500 delay-500",
              isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            )}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div
                  className="flex items-center gap-4 text-foreground p-4 rounded-xl bg-muted/50"
                >
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold mb-1">Call Us Anytime</div>
                    <span className="font-semibold">{settings.phone}</span>
                  </div>
                </div>
              </div>
              
              <Link to="/inquiry" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="btn-gold w-full py-7 h-auto text-xl font-bold shadow-gold group">
                  <span className="flex items-center gap-2">
                    Book Consultation
                    <svg className="w-6 h-6 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
