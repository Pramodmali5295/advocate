import { Link } from 'react-router-dom';
import { Layout } from '@/components/customer/layout/Layout';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { useContent } from '@/context/ContentContext';

const Contact = () => {
  const { content } = useContent();
  const c = content.contact;

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-hero pt-44 pb-20">
        <div className="container-legal text-center">
          <div className="max-w-4xl mx-auto">
            <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 block animate-in fade-in slide-in-from-bottom-3 duration-700">
              {c.badge}
            </span>
            <h1 className="heading-display text-cream mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              {c.heroTitle}
            </h1>
            <p className="text-cream/80 text-lg leading-relaxed animate-in fade-in slide-in-from-bottom-5 duration-700 delay-300">
              {c.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-padding bg-background">
        <div className="container-legal">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="heading-section text-foreground mb-6">Office Information</h2>
              <div className="accent-line mb-8" />
              <div className="space-y-6">
                {/* Address */}
                <div className="card-premium p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">Office Address</h3>
                      <p className="text-muted-foreground whitespace-pre-line">{c.address}</p>
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
                      <h3 className="font-semibold text-foreground mb-2">Phone</h3>
                      <a href={`tel:${c.phone.replace(/\s/g, '')}`} className="text-accent hover:underline block">{c.phone}</a>
                      {c.officePhone && (
                        <a href={`tel:${c.officePhone.replace(/\s/g, '')}`} className="text-muted-foreground hover:text-accent block">{c.officePhone} (Office)</a>
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
                      <h3 className="font-semibold text-foreground mb-2">Email</h3>
                      <a href={`mailto:${c.email}`} className="text-accent hover:underline block">{c.email}</a>
                      {c.inquiryEmail && (
                        <a href={`mailto:${c.inquiryEmail}`} className="text-muted-foreground hover:text-accent block">{c.inquiryEmail}</a>
                      )}
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
                      <h3 className="font-semibold text-foreground mb-2">Office Hours</h3>
                      <p className="text-muted-foreground whitespace-pre-line">{c.hours}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div>
              <h2 className="heading-section text-foreground mb-6">Location</h2>
              <div className="accent-line mb-8" />
              <div className="card-premium overflow-hidden">
                <div className="aspect-square sm:aspect-video bg-muted">
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
                <div className="p-6">
                  <h3 className="font-semibold text-foreground mb-2">How to Reach Us</h3>
                  <p className="text-muted-foreground text-sm">
                    Located near Civil Lines Metro Station (Yellow Line). Ample parking available in the building basement.
                  </p>
                </div>
              </div>

              <div className="mt-8 p-6 bg-navy rounded-lg text-center sm:text-left">
                <h3 className="font-display text-lg font-semibold text-cream mb-3">For Detailed Legal Consultation</h3>
                <p className="text-cream/70 text-sm mb-6">
                  General questions can be addressed via phone or email. For detailed legal consultation and case analysis, please book a consultation through our secure form.
                </p>
                <Link to="/inquiry" className="block sm:inline-block">
                  <Button className="btn-gold w-full sm:w-auto">Book Consultation</Button>
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
