import { Layout } from '@/components/customer/layout/Layout';
import { HeroSection } from '@/components/customer/home/HeroSection';
import { PracticeAreasSection } from '@/components/customer/home/PracticeAreasSection';
import { AboutSection } from '@/components/customer/home/AboutSection';
import { TestimonialsSection } from '@/components/customer/home/TestimonialsSection';
import { CTASection } from '@/components/customer/home/CTASection';

const Index = () => {
  return (
    <Layout>
      <div className="home-page">
        <HeroSection />
        <PracticeAreasSection />
        <AboutSection />
        <TestimonialsSection />
        <CTASection />
      </div>
    </Layout>
  );
};

export default Index;
