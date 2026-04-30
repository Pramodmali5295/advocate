import { useState } from 'react';
import { useContent } from '@/context/ContentContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  Home, Info, Briefcase, MessageSquare, BookOpen, Phone
} from 'lucide-react';

import { HomeTab } from '@/components/admin/pages-tabs/HomeTab';
import { AboutTab } from '@/components/admin/pages-tabs/AboutTab';
import { PracticeAreasTab } from '@/components/admin/pages-tabs/PracticeAreasTab';
import { TestimonialsTab } from '@/components/admin/pages-tabs/TestimonialsTab';
import { KnowledgeTab } from '@/components/admin/pages-tabs/KnowledgeTab';
import { ContactTab } from '@/components/admin/pages-tabs/ContactTab';

const tabs = [
  { id: 'home',         label: 'Home Page',      icon: Home,         route: '/' },
  { id: 'about',        label: 'About Page',      icon: Info,         route: '/about' },
  { id: 'practice',     label: 'Practice Areas',  icon: Briefcase,    route: '/practice-areas' },
  { id: 'testimonials', label: 'Testimonials',    icon: MessageSquare,route: '/ & /testimonials' },
  { id: 'knowledge',    label: 'Knowledge Base',  icon: BookOpen,     route: '/knowledge' },
  { id: 'contact',      label: 'Contact Page',    icon: Phone,        route: '/contact' },
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
      <div className="grid grid-cols-2 sm:flex sm:w-full gap-2 border-b border-border pb-4">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center justify-center gap-2 px-3 py-3 rounded-lg text-xs sm:text-sm font-bold transition-all sm:flex-1 ${
              activeTab === tab.id
                ? 'bg-accent text-accent-foreground shadow-gold'
                : 'bg-background border border-border text-muted-foreground hover:border-accent hover:text-accent hover:bg-accent/5'
            }`}
          >
            <tab.icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${activeTab === tab.id ? 'text-accent-foreground' : 'text-muted-foreground'}`} />
            <span>{tab.label}</span>
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
      </div>
    </div>
  );
};

export default AdminPages;
