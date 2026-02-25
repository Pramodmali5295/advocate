import { Layout } from '@/components/customer/layout/Layout';

const Disclaimer = () => {
  return (
    <Layout>
      <section className="bg-gradient-hero pt-44 pb-20">
        <div className="container-legal text-center">
          <h1 className="heading-display text-cream mb-6">Legal Disclaimer</h1>
          <p className="text-cream/80 text-lg max-w-2xl mx-auto">
            Important information regarding the nature of our digital content and services.
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-legal max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
            <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-lg">
              <p className="text-amber-800 font-medium">
                The information provided on this website does not, and is not intended to, constitute legal advice; 
                instead, all information, content, and materials available on this site are for general informational purposes only.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display font-semibold text-foreground mb-4">No Attorney-Client Relationship</h2>
              <p>
                Use of, and access to, this website or any of the links or resources contained within the site do not create 
                an attorney-client relationship between the reader, user, or browser and website authors, contributors, 
                contributing law firms, or committee members and their respective employers.
              </p>
            </div>
            
            <div>
              <h2 className="text-2xl font-display font-semibold text-foreground mb-4">Accuracy of Information</h2>
              <p>
                While we strive to keep the information on this website accurate and up-to-date, we make no guarantees 
                regarding the completeness, reliability, or accuracy of the information provided. Laws change rapidly 
                and may vary by jurisdiction.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-display font-semibold text-foreground mb-4">Third-Party Links</h2>
              <p>
                This website may contain links to other third-party websites. Such links are only for the convenience of 
                the reader, user or browser; Advocate Hub Pro does not recommend or endorse the contents of the third-party sites.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Disclaimer;
