export interface HeroContent {
  badge: string;
  title: string;
  subtitle: string;
  backgroundImage?: string;
  stats: { label: string; value: string }[];
}

export interface AboutSectionContent {
  badge: string;
  title: string;
  name: string;
  title_designation: string;
  experience: string;
  casesHandled: string;
  description: string;
  highlights: { label: string; value: string }[];
}

export interface CTAContent {
  title: string;
  subtitle: string;
  buttonText: string;
  features: { icon: string; title: string; description: string }[];
}

export interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  location: string;
}

export interface TestimonialsContent {
  badge: string;
  heroTitle: string;
  heroSubtitle: string;
  items: TestimonialItem[];
}

export interface PracticeAreaItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  fullDescription: string;
  services: string[];
  courts: string[];
  cases: string;
  successRate: string;
  isActive: boolean;
}

export interface PracticeAreasContent {
  badge: string;
  heroTitle: string;
  heroSubtitle: string;
  items: PracticeAreaItem[];
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface AboutPageContent {
  badge: string;
  heroTitle: string;
  heroSubtitle: string;
  advocateName: string;
  advocateTitle: string;
  education: string;
  location: string;
  bio: string[];
  certifications: string[];
  timeline: TimelineItem[];
  ethicsStatement: string;
}

export interface ArticleItem {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  featured: boolean;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface KnowledgeContent {
  badge: string;
  heroTitle: string;
  heroSubtitle: string;
  articles: ArticleItem[];
  faqs: FAQItem[];
}

export interface ContactContent {
  badge: string;
  heroTitle: string;
  heroSubtitle: string;
  address: string;
  phone: string;
  officePhone: string;
  email: string;
  inquiryEmail: string;
  hours: string;
  mapEmbed: string;
}

export interface InquiryPageContent {
  badge: string;
  heroTitle: string;
  heroSubtitle: string;
  formTitle: string;
  formSubtitle: string;
}

export interface SettingsContent {
  firmName: string;
  advocateName: string;
  email: string;
  phone: string;
  address: string;
  inquiryFee: number;
  currency: string;
  adminEmail?: string;
  adminPassword?: string;
}

export interface SiteContent {
  hero: HeroContent;
  aboutSection: AboutSectionContent;
  cta: CTAContent;
  testimonials: TestimonialsContent;
  practiceAreas: PracticeAreasContent;
  aboutPage: AboutPageContent;
  knowledge: KnowledgeContent;
  contact: ContactContent;
  inquiryPage: InquiryPageContent;
  settings: SettingsContent;
}

export interface Inquiry {
  id: string;
  fullName: string;
  mobile: string;
  email: string;
  city: string;
  category: string;
  description: string;
  createdAt: string;
  status: 'pending' | 'responded' | 'closed';
  paymentStatus: 'pending' | 'completed' | 'failed';
  amount: number;
}
