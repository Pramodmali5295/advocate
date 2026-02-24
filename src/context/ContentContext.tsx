import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  SiteContent, 
  HeroContent, 
  AboutSectionContent, 
  CTAContent, 
  TestimonialItem, 
  PracticeAreaItem, 
  AboutPageContent, 
  KnowledgeContent, 
  ContactContent,
  TestimonialsContent,
  PracticeAreasContent,
  InquiryPageContent
} from '@/types/content';
import { db } from '@/lib/firebase';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';

// ─── Interaction Helpers ──────────────────────────────
const SECTION_DOCS = {
  hero: 'hero',
  aboutSection: 'about_section',
  cta: 'cta',
  testimonials: 'testimonials',
  practiceAreas: 'practice_areas',
  aboutPage: 'about_page',
  knowledge: 'knowledge',
  contact: 'contact',
  inquiryPage: 'inquiry_page',
  settings: 'settings',
} as const;

// ─── Professional Legal Content (The Source of Truth) ──
export const seedContent: SiteContent = {
  hero: {
    badge: 'LEGAL EXCELLENCE SINCE 2003',
    title: 'Precision in Law,\nResilience in Advocacy',
    subtitle: 'Your journey to justice begins with a strategic defense. We provide sophisticated legal solutions for complex challenges in Criminal, Civil, and Corporate law.',
    stats: [
      { label: 'Cases Won', value: '2,500+' },
      { label: 'Years Experience', value: '20+' },
      { label: 'Success Rate', value: '95%' },
    ],
  },
  aboutSection: {
    badge: 'About the Advocate',
    title: 'Dedicated to Justice & Client Success',
    name: 'Adv. Arun Kumar',
    title_designation: 'Senior Advocate – Supreme Court of India',
    experience: '20+',
    casesHandled: '2,500+',
    description: 'With over two decades of experience in criminal, civil, and corporate law, Advocate Arun Kumar has built a reputation for unwavering dedication and exceptional results. His approach combines strategic thinking with a deep commitment to justice.',
    highlights: [
      { label: 'Cases Handled', value: '2,500+' },
      { label: 'Years Experience', value: '20+' },
      { label: 'Success Rate', value: '95%' },
      { label: 'High Courts', value: '8' },
    ],
  },
  cta: {
    title: 'Ready to Get the Legal Help You Deserve?',
    subtitle: 'Book a consultation today and get a detailed legal assessment of your case within 24 hours. Our team is ready to fight for your rights.',
    buttonText: 'Book Consultation',
    features: [
      { icon: 'Clock', title: '24-Hour Response', description: 'Receive a detailed legal assessment within 24 hours of booking' },
      { icon: 'Shield', title: 'Confidential', description: 'All consultations are completely confidential and secure' },
      { icon: 'Award', title: 'Expert Guidance', description: '20+ years of expertise across all major areas of law' },
    ],
  },
  testimonials: {
    badge: 'SUCCESS STORIES',
    heroTitle: 'The Voices of the People We Represent',
    heroSubtitle: "Our legacy is built on the success of our clients. Explore honest reflections on our service from the individuals and businesses who have trusted us with their most critical legal matters.",
    items: [
      { id: 1, name: 'Rajesh Sharma', role: 'Business Owner', content: 'Advocate Kumar handled my property dispute case with exceptional professionalism. His strategic approach and deep knowledge of property law helped us secure a favorable judgment. Highly recommended for any real estate legal matters.', rating: 5, location: 'Delhi' },
      { id: 2, name: 'Priya Mehta', role: 'Corporate Executive', content: 'During a challenging family law matter, Advocate Kumar provided not just legal expertise but also emotional support. His compassionate yet strategic approach made a difficult situation manageable. Forever grateful.', rating: 5, location: 'Gurgaon' },
      { id: 3, name: 'Vikram Singh', role: 'Entrepreneur', content: 'Our company has been working with Advocate Kumar for corporate legal matters for over 5 years. His understanding of business law and quick response time have been invaluable for our operations.', rating: 5, location: 'Noida' },
      { id: 4, name: 'Anita Desai', role: 'Homemaker', content: 'I was falsely accused in a criminal case. Advocate Kumar believed in my innocence and fought tirelessly. His courtroom skills and dedication resulted in my complete acquittal. He truly fights for justice.', rating: 5, location: 'Delhi' },
      { id: 5, name: 'Suresh Nair', role: 'Software Engineer', content: 'Advocate Kumar resolved my consumer dispute against a major telecom company swiftly and efficiently. His thorough understanding of consumer law and confident advocacy saved me significant time and money.', rating: 5, location: 'Mumbai' },
    ],
  },
  practiceAreas: {
    badge: 'AREAS OF PRACTICE',
    heroTitle: 'Comprehensive Legal Solutions Tailored for You',
    heroSubtitle: 'Explore our specialized legal domains where deep technical knowledge meets relentless advocacy. We handle every case with the precision it demands.',
    items: [
      { id: 'criminal', icon: 'Scale', title: 'Criminal Law', description: 'Expert defense in criminal matters with a proven track record of successful representations.', fullDescription: 'Our criminal law practice offers comprehensive defense services for individuals facing criminal charges. With over 800 successful case resolutions, we bring decades of experience in navigating the complexities of criminal proceedings.', services: ['Bail Applications & Appeals', 'Criminal Trial Defense', 'White Collar Crime Defense', 'Cybercrime Cases', 'Appeals in Higher Courts', 'Anticipatory Bail', 'Quashing of FIRs', 'Criminal Writ Petitions'], courts: ['Supreme Court of India', 'Delhi High Court', 'District & Sessions Courts', 'Magistrate Courts'], cases: '800+', successRate: '96%', isActive: true },
      { id: 'civil', icon: 'FileText', title: 'Civil Litigation', description: 'Strategic resolution of civil disputes with focus on client interests.', fullDescription: 'We handle all aspects of civil litigation, from initial dispute assessment to trial and appeals. Our methodical approach ensures thorough preparation and effective advocacy for our clients.', services: ['Property Disputes', 'Recovery Suits', 'Declaratory Suits', 'Injunction Matters', 'Contract Disputes', 'Partition Suits', 'Civil Appeals', 'Execution Proceedings'], courts: ['Civil Courts', 'District Courts', 'High Court', 'Consumer Forums'], cases: '600+', successRate: '94%', isActive: true },
      { id: 'family', icon: 'Users', title: 'Family Law', description: 'Compassionate handling of sensitive family matters with discretion.', fullDescription: 'Family legal matters require sensitivity, understanding, and discretion. Our family law practice provides compassionate counsel while vigorously protecting our clients rights and interests.', services: ['Divorce Proceedings', 'Child Custody & Visitation', 'Maintenance & Alimony', 'Domestic Violence Cases', 'Guardianship Matters', 'Adoption Legal Support', 'Marriage Registration', 'Pre-nuptial Agreements'], courts: ['Family Courts', 'District Courts', 'High Court', 'Mediation Centers'], cases: '400+', successRate: '92%', isActive: true },
      { id: 'property', icon: 'Home', title: 'Property Law', description: 'Comprehensive property legal services for individuals and businesses.', fullDescription: 'Property transactions and disputes require meticulous attention to detail. Our property law practice covers all aspects of real estate legal matters, ensuring your property rights are protected.', services: ['Title Verification', 'Property Registration', 'Sale & Purchase Agreements', 'Lease Documentation', 'Property Disputes', 'Landlord-Tenant Matters', 'Development Agreements', 'RERA Compliance'], courts: ['Civil Courts', 'Revenue Courts', 'High Court', 'RERA Authority'], cases: '350+', successRate: '95%', isActive: true },
      { id: 'corporate', icon: 'Building2', title: 'Corporate Law', description: 'Business legal solutions for startups, SMEs, and corporations.', fullDescription: 'We provide comprehensive corporate legal services to businesses of all sizes. From company formation to complex commercial transactions, our team ensures your business operates within legal frameworks.', services: ['Company Registration', 'Contract Drafting & Review', 'Shareholder Agreements', 'Corporate Compliance', 'Mergers & Acquisitions', 'Intellectual Property', 'Employment Contracts', 'Commercial Litigation'], courts: ['NCLT', 'High Court', 'Commercial Courts', 'Arbitration Tribunals'], cases: '250+', successRate: '97%', isActive: true },
      { id: 'consumer', icon: 'Briefcase', title: 'Consumer Law', description: 'Protection of consumer rights against unfair trade practices.', fullDescription: 'When businesses fail to deliver on promises or engage in unfair practices, we stand with consumers. Our consumer law practice helps clients seek redressal and justice against corporate wrongdoing.', services: ['Consumer Complaints', 'Product Liability', 'Service Deficiency', 'Unfair Trade Practices', 'E-commerce Disputes', 'Banking Complaints', 'Insurance Claims', 'Medical Negligence'], courts: ['District Consumer Forum', 'State Consumer Commission', 'National Consumer Commission', 'High Court'], cases: '200+', successRate: '91%', isActive: true },
    ],
  },
  aboutPage: {
    badge: 'OUR LEGACY',
    heroTitle: 'A Personal Commitment to Upholding the Law',
    heroSubtitle: 'For over 20 years, Advocate Law Chambers has served as a cornerstone of legal reliability. Led by Adv. Arun Kumar, we blend traditional legal wisdom with modern strategic thinking.',
    advocateName: 'Adv. Arun Kumar',
    advocateTitle: 'Senior Advocate',
    education: 'LLB, Delhi University',
    location: 'New Delhi, India',
    bio: [
      'Advocate Arun Kumar is a distinguished legal professional with over two decades of experience in criminal defense, civil litigation, family law, and corporate legal matters. His career is marked by an unwavering commitment to justice and client success.',
      'After completing his law degree from the prestigious Delhi University, he was enrolled with the Bar Council of Delhi in 2003. His early years were spent learning under senior advocates at leading law firms, where he developed a strong foundation in litigation strategy and courtroom advocacy.',
      'In 2012, he established Advocate Law Chambers with a vision to provide accessible, high-quality legal services to individuals and businesses alike. The practice has since grown to handle cases across various courts, including the Supreme Court of India, High Courts, District Courts, and specialized tribunals.',
    ],
    certifications: [
      'Bar Council of Delhi - Enrollment No. D/1234/2003',
      'Supreme Court of India - AOR Designation',
      'Certified Mediator - Delhi High Court Mediation Centre',
      'Member - Delhi High Court Bar Association',
      'Member - Supreme Court Bar Association',
    ],
    timeline: [
      { year: '2003', title: 'Enrolled with Bar Council of Delhi', description: 'Began legal practice after completing LLB from Delhi University' },
      { year: '2008', title: 'Senior Associate at Leading Law Firm', description: 'Handled complex criminal and civil litigation cases' },
      { year: '2012', title: 'Established Independent Practice', description: 'Founded Advocate Law Chambers with focus on client success' },
      { year: '2018', title: 'Supreme Court Practice', description: 'Designated to practice before the Supreme Court of India' },
      { year: '2023', title: '20 Years of Excellence', description: 'Celebrating two decades of successful legal representation' },
    ],
    ethicsStatement: 'We believe that the practice of law is a sacred responsibility. Every client who walks through our doors receives our complete attention, honest counsel, and vigorous representation. We never compromise on ethics, and we treat every case with the gravity it deserves.',
  },
  knowledge: {
    badge: 'LEGAL INSIGHTS',
    heroTitle: 'Empowering You Through Legal Education',
    heroSubtitle: 'Stay informed with our latest analysis of law changes, practical guides, and comprehensive FAQs designed to clarify your rights.',
    articles: [
      { id: 1, title: 'Understanding Bail: A Complete Guide to Bail Provisions in India', excerpt: 'Learn about different types of bail, anticipatory bail, and the legal procedures involved in securing bail in criminal cases.', content: 'Bail is the release of a person from custody while they await trial or an appeal. In India, bail provisions are primarily governed by the Code of Criminal Procedure. There are three main types of bail: Regular Bail, Interim Bail, and Anticipatory Bail.', category: 'Criminal Law', date: '2024-01-15', readTime: '8 min read', featured: true },
      { id: 2, title: 'Property Registration Process: Step-by-Step Guide', excerpt: 'A comprehensive guide to property registration in India, including required documents, stamp duty, and common pitfalls to avoid.', content: 'Property registration in India is mandatory under the Registration Act. It involves multiple steps like valuation, payment of stamp duty, and final registration at the Sub-Registrar’s office.', category: 'Property Law', date: '2024-01-10', readTime: '6 min read', featured: true },
      { id: 3, title: 'Divorce Proceedings Under Hindu Marriage Act', excerpt: 'Understanding grounds for divorce, maintenance, custody, and the legal process for dissolving marriage under Hindu law.', content: 'Divorce under the Hindu Marriage Act can be by mutual consent or on contested grounds. Common grounds include cruelty, desertion, adultery, and conversion.', category: 'Family Law', date: '2024-01-05', readTime: '10 min read', featured: false },
      { id: 4, title: 'Consumer Rights: Filing Complaints in Consumer Forum', excerpt: 'Know your rights as a consumer and learn how to file effective complaints against deficient services or defective products.', content: 'The Consumer Protection Act protects consumers from unfair trade practices. Complaints can be filed at District, State, or National levels depending on the value of the claim.', category: 'Consumer Law', date: '2023-12-28', readTime: '5 min read', featured: false },
      { id: 5, title: 'Starting a Company: Legal Requirements and Compliance', excerpt: 'Essential legal requirements for company registration, director responsibilities, and ongoing compliance obligations.', content: 'Starting a company in India requires registration with the Ministry of Corporate Affairs. Key steps include obtaining DSC, DIN, and filing for incorporation with MOA and AOA.', category: 'Corporate Law', date: '2023-12-20', readTime: '7 min read', featured: false },
    ],
    faqs: [
      { question: 'How do I know if I have a valid legal case?', answer: 'Determining the validity of a legal case requires examining the facts against applicable laws. We recommend booking a consultation with your case details for a professional assessment.' },
      { question: 'What is the difference between civil and criminal cases?', answer: 'Civil cases involve disputes between individuals or organizations (property, contracts, family matters), while criminal cases involve prosecution by the state for violations of criminal law.' },
      { question: 'How long do legal proceedings typically take?', answer: 'The duration varies significantly based on case complexity, court backlog, and type of matter. Simple matters may resolve in months, while complex litigation can take years.' },
      { question: 'What documents should I keep ready for legal consultation?', answer: 'Gather all relevant documents including agreements, correspondence, ID proofs, previous legal orders if any, and a chronological summary of events.' },
      { question: 'Can I change my lawyer during an ongoing case?', answer: "Yes, you have the right to change your legal counsel at any stage. However, it's important to ensure proper handover of case files and documents." },
    ],
  },
  contact: {
    badge: 'GET IN TOUCH',
    heroTitle: 'Professional Counsel is Just a Conversation Away',
    heroSubtitle: 'Whether you require urgent representation or a strategic consultation, our team is ready to provide the clarity and direction you need.',
    address: '123 Legal Tower, 4th Floor, Civil Lines, Near District Court, New Delhi - 110001',
    phone: '+91 98765 43210',
    officePhone: '+91 11 2345 6789',
    email: 'pramodm200@gmail.com',
    inquiryEmail: 'pramodm200@gmail.com',
    hours: 'Monday - Friday: 10:00 AM - 7:00 PM\nSaturday: 10:00 AM - 4:00 PM\nSunday: By Appointment Only',
    mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.534682695469!2d77.22479931508096!3d28.637988982416287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b741d057%3A0xcdee88e47393c3f1!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1647856385542!5m2!1sen!2sin',
  },
  inquiryPage: {
    badge: 'CONSULTATION PORTAL',
    heroTitle: 'Secure Your Strategic Legal Assessment',
    heroSubtitle: 'Take the first step toward a resolution. Submit your details for a prioritized legal review and receive a comprehensive professional opinion within 24 hours.',
    formTitle: 'Case Details',
    formSubtitle: 'Provide accurate information for a detailed legal assessment.',
  },
  settings: {
    firmName: 'Advocate Law Chambers',
    advocateName: 'Adv. Arun Kumar',
    email: 'pramodm200@gmail.com',
    phone: '9503035935',
    address: '123 Legal Tower, Civil Lines, New Delhi - 110001',
    inquiryFee: 499,
    currency: 'INR',
    adminEmail: 'pramodm200@gmail.com',
    adminPassword: '9503035935',
  },
};

interface ContentContextType {
  content: SiteContent;
  updateHero: (data: Partial<HeroContent>) => void;
  updateAboutSection: (data: Partial<AboutSectionContent>) => void;
  updateCTA: (data: Partial<CTAContent>) => void;
  updateTestimonials: (data: Partial<TestimonialsContent>) => void;
  updatePracticeAreas: (data: Partial<PracticeAreasContent>) => void;
  updateAboutPage: (data: Partial<AboutPageContent>) => void;
  updateKnowledge: (data: Partial<KnowledgeContent>) => void;
  updateContact: (data: Partial<ContactContent>) => void;
  updateInquiryPage: (data: Partial<InquiryPageContent>) => void;
  updateSettings: (data: Partial<any>) => void;
  resetToDefaults: () => void;
  isLoading: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider = ({ children }: { children: ReactNode }) => {
  const [content, setContent] = useState<SiteContent>(seedContent);
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    Object.keys(SECTION_DOCS).reduce((acc, key) => ({ ...acc, [key]: true }), {})
  );

  useEffect(() => {
    // Setup listeners for each document separately
    const unsubscribes = Object.entries(SECTION_DOCS).map(([key, docId]) => {
      const docRef = doc(db, 'content', docId);
      
      return onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setContent(prev => ({ ...prev, [key]: data }));
        } else {
          // If node doesn't exist, seed it with the professional content
          console.log(`Seeding node "${docId}" to Firestore...`);
          const seedData = seedContent[key as keyof SiteContent];
            
          setDoc(docRef, seedData);
        }
        setLoadingStates(prev => ({ ...prev, [key]: false }));
      }, (error) => {
        console.error(`Firestore error on node "${docId}":`, error);
        setLoadingStates(prev => ({ ...prev, [key]: false }));
      });
    });

    return () => unsubscribes.forEach(unsub => unsub());
  }, []);

  const isLoading = Object.values(loadingStates).some(state => state);


  const updateNode = async (key: keyof typeof SECTION_DOCS, data: any) => {
    try {
      const docId = SECTION_DOCS[key];
      await setDoc(doc(db, 'content', docId), data);
    } catch (e) {
      console.error(`Error updating node "${key}":`, e);
    }
  };

  const updateHero = (data: Partial<HeroContent>) => updateNode('hero', { ...content.hero, ...data });
  const updateAboutSection = (data: Partial<AboutSectionContent>) => updateNode('aboutSection', { ...content.aboutSection, ...data });
  const updateCTA = (data: Partial<CTAContent>) => updateNode('cta', { ...content.cta, ...data });
  const updateTestimonials = (data: Partial<TestimonialsContent>) => updateNode('testimonials', { ...content.testimonials, ...data });
  const updatePracticeAreas = (data: Partial<PracticeAreasContent>) => updateNode('practiceAreas', { ...content.practiceAreas, ...data });
  const updateAboutPage = (data: Partial<AboutPageContent>) => updateNode('aboutPage', { ...content.aboutPage, ...data });
  const updateKnowledge = (data: Partial<KnowledgeContent>) => updateNode('knowledge', { ...content.knowledge, ...data });
  const updateContact = (data: Partial<ContactContent>) => updateNode('contact', { ...content.contact, ...data });
  const updateInquiryPage = (data: Partial<InquiryPageContent>) => updateNode('inquiryPage', { ...content.inquiryPage, ...data });
  const updateSettings = (data: any) => updateNode('settings', { ...content.settings, ...data });

  const resetToDefaults = async () => {
    for (const [key, docId] of Object.entries(SECTION_DOCS)) {
      const data = seedContent[key as keyof SiteContent];
      await setDoc(doc(db, 'content', docId), data);
    }
  };

  return (
    <ContentContext.Provider value={{
      content,
      updateHero,
      updateAboutSection,
      updateCTA,
      updateTestimonials,
      updatePracticeAreas,
      updateAboutPage,
      updateKnowledge,
      updateContact,
      updateInquiryPage,
      updateSettings,
      resetToDefaults,
      isLoading
    }}>
      {!isLoading && children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used within ContentProvider');
  return ctx;
};
