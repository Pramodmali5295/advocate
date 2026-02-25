import { Layout } from '@/components/customer/layout/Layout';

const Terms = () => {
  return (
    <Layout>
      <section className="bg-gradient-hero pt-44 pb-20">
        <div className="container-legal text-center">
          <h1 className="heading-display text-cream mb-6">Terms of Service</h1>
          <p className="text-cream/80 text-lg max-w-2xl mx-auto">
            The legal framework for using our website and digital services.
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-legal max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
            <div>
              <h2 className="text-2xl font-display font-semibold text-foreground mb-4">Agreement to Terms</h2>
              <p>
                By accessing or using the Advocate Hub Pro website, you agree to be bound by these Terms of Service. 
                If you do not agree with any part of these terms, you must not use our website.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-display font-semibold text-foreground mb-4">No Legal Advice</h2>
              <p>
                The contents of this website are for informational purposes only and do not constitute legal advice. 
                Viewing this website or contacting our firm through this website does not create an attorney-client relationship.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display font-semibold text-foreground mb-4">Consultation Inquiries</h2>
              <p>
                When you submit an inquiry, you agree to provide accurate and complete information. 
                Payment for a consultation does not guarantee representation beyond the initial assessment 
                provided in the consultation response.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display font-semibold text-foreground mb-4">Intellectual Property</h2>
              <p>
                All content, logos, and materials on this website are the property of Advocate Hub Pro 
                and are protected by intellectual property laws. Unauthorized use or reproduction is strictly prohibited.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Terms;
