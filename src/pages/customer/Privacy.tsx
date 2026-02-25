import { Layout } from '@/components/customer/layout/Layout';

const Privacy = () => {
  return (
    <Layout>
      <section className="bg-gradient-hero pt-44 pb-20">
        <div className="container-legal text-center">
          <h1 className="heading-display text-cream mb-6">Privacy Policy</h1>
          <p className="text-cream/80 text-lg max-w-2xl mx-auto">
            Your trust is our most valuable asset. Learn how we protect your personal information.
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-legal max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
            <div>
              <h2 className="text-2xl font-display font-semibold text-foreground mb-4">Introduction</h2>
              <p>
                At Advocate Hub Pro, we are committed to protecting the privacy and confidentiality of our clients' personal information. 
                This Privacy Policy explains how we collect, use, and safeguard the data you provide through our website.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-display font-semibold text-foreground mb-4">Information We Collect</h2>
              <p>
                We collect information that you voluntarily provide when you:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Submit a consultation inquiry form</li>
                <li>Contact us via email or phone</li>
                <li>Sign up for our newsletter or legal updates</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-display font-semibold text-foreground mb-4">How We Use Your Information</h2>
              <p>
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Process and respond to your legal inquiries</li>
                <li>Schedule and confirm consultations</li>
                <li>Improve our website and client services</li>
                <li>Maintain our records in compliance with legal standards</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-display font-semibold text-foreground mb-4">Attorney-Client Privilege</h2>
              <p>
                Please note that while we take every precaution to secure your data, the submission of information through this website 
                does not alone create an attorney-client relationship. Confidential or time-sensitive information should not be 
                sent through the initial contact form.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Privacy;
