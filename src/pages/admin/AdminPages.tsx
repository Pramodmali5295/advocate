import { useState } from 'react';
import { useContent } from '@/context/ContentContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Home, Info, Briefcase, MessageSquare, BookOpen, Phone,
  HelpCircle
} from 'lucide-react';

import { HomeTab } from '@/components/admin/pages-tabs/HomeTab';
import { AboutTab } from '@/components/admin/pages-tabs/AboutTab';
import { PracticeAreasTab } from '@/components/admin/pages-tabs/PracticeAreasTab';
import { TestimonialsTab } from '@/components/admin/pages-tabs/TestimonialsTab';
import { KnowledgeTab } from '@/components/admin/pages-tabs/KnowledgeTab';
import { ContactTab } from '@/components/admin/pages-tabs/ContactTab';
import { InquiryTab } from '@/components/admin/pages-tabs/InquiryTab';

const tabs = [
  { id: 'home',         label: 'Home Page',      icon: Home,         route: '/' },
  { id: 'about',        label: 'About Page',      icon: Info,         route: '/about' },
  { id: 'practice',     label: 'Practice Areas',  icon: Briefcase,    route: '/practice-areas' },
  { id: 'testimonials', label: 'Testimonials',    icon: MessageSquare,route: '/ & /testimonials' },
  { id: 'knowledge',    label: 'Knowledge Base',  icon: BookOpen,     route: '/knowledge' },
  { id: 'contact',      label: 'Contact Page',    icon: Phone,        route: '/contact' },
  { id: 'inquiry',      label: 'Inquiry Page',    icon: HelpCircle,   route: '/inquiry' },
];

const AdminPages = () => {
  const [activeTab, setActiveTab] = useState('home');
  const { toast } = useToast();

  const activeTabData = tabs.find(t => t.id === activeTab);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-semibold text-foreground">Website Page Content Manager</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Select a tab below to edit content for that page. Changes are saved to{' '}
            <strong className="text-foreground">{activeTabData?.route}</strong> — click "Save & Publish" to go live.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-border pb-4">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-accent text-accent-foreground shadow-sm'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
            <span className={`text-[10px] hidden sm:inline ${activeTab === tab.id ? 'text-accent-foreground/70' : 'text-muted-foreground/60'}`}>
              {tab.route}
            </span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
        {activeTab === 'home'         && <HomeTab />}
        {activeTab === 'about'        && <AboutTab />}
        {activeTab === 'practice'     && <PracticeAreasTab />}
        {activeTab === 'testimonials' && <TestimonialsTab />}
        {activeTab === 'knowledge'    && <KnowledgeTab />}
        {activeTab === 'contact'      && <ContactTab />}
        {activeTab === 'inquiry'      && <InquiryTab />}
      </div>
    </div>
  );
};

export default AdminPages;
