import { useState, useEffect } from 'react';
import { useContent } from '@/context/ContentContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';
import { SectionCard, Field } from '../shared/AdminSectionComponents';

export const HomeTab = () => {
  const { content, updateHero, updateAboutSection } = useContent();
  const { toast } = useToast();
  const [hero, setHero]   = useState(content.hero);
  const [about, setAbout] = useState(content.aboutSection);

  // Sync local state when content loads from Firestore
  useEffect(() => {
    setHero(content.hero);
    setAbout(content.aboutSection);
  }, [content.hero, content.aboutSection]);

  const save = () => {
    updateHero(hero);
    updateAboutSection(about);
    toast({ title: 'Home Page Saved', description: 'All changes are now live on the Home page.' });
  };

  return (
    <div className="space-y-6">
      {/* ── Section 1: Home Page Statistics Row ── */}
      <SectionCard
        title="Home Page Statistics Row"
        page="Home Page ( / )"
        hint="These numbers appear at the bottom of the top banner in a row of stat boxes."
      >
        <div>
          <label className="form-label">Statistics Row (Cases Won / Years Experience / Success Rate…)</label>
          <div className="grid sm:grid-cols-3 gap-3">
            {hero.stats.map((stat, i) => (
              <div key={i} className="border border-border rounded-lg p-3 space-y-2 bg-muted/30">
                <input
                  className="form-input text-sm font-bold"
                  placeholder="Number, e.g. 2,500+"
                  value={stat.value}
                  onChange={e => { const s = [...hero.stats]; s[i] = { ...s[i], value: e.target.value }; setHero({ ...hero, stats: s }); }}
                />
                <input
                  className="form-input text-sm"
                  placeholder="Label, e.g. Cases Won"
                  value={stat.label}
                  onChange={e => { const s = [...hero.stats]; s[i] = { ...s[i], label: e.target.value }; setHero({ ...hero, stats: s }); }}
                />
              </div>
            ))}
          </div>
        </div>
      </SectionCard>

      {/* ── Section 2: "About the Advocate" on home ── */}
      <SectionCard
        title={`"About the Advocate" Section`}
        page="Home Page ( / ) — middle section"
        hint="This is the two-column section on the Home page with the advocate's photo placeholder on the left and text on the right. It is NOT the full About page — just a summary."
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Section Badge (e.g. ABOUT THE ADVOCATE)">
            <input className="form-input" value={about.badge} onChange={e => setAbout({ ...about, badge: e.target.value })} />
          </Field>
          <Field label="Main Heading (e.g. Dedicated to Justice…)">
            <input className="form-input" value={about.title} onChange={e => setAbout({ ...about, title: e.target.value })} />
          </Field>
          <Field label="Advocate's Full Name (shown in the photo card)">
            <input className="form-input" value={about.name} onChange={e => setAbout({ ...about, name: e.target.value })} />
          </Field>
          <Field label="Designation / Title (shown below the name in the card)">
            <input className="form-input" placeholder="e.g. Senior Advocate" value={about.title_designation} onChange={e => setAbout({ ...about, title_designation: e.target.value })} />
          </Field>
          <Field label="Years of Experience (shown in the gold badge on the photo)">
            <input className="form-input" placeholder="e.g. 20+" value={about.experience} onChange={e => setAbout({ ...about, experience: e.target.value })} />
          </Field>
          <Field label="Total Cases Handled">
            <input className="form-input" placeholder="e.g. 2,500+" value={about.casesHandled} onChange={e => setAbout({ ...about, casesHandled: e.target.value })} />
          </Field>
        </div>
        <Field
          label="About Description Paragraph (the two lines of text on the right side)"
          hint="Keep this concise — it's a short introduction that links to the full About page."
        >
          <textarea className="form-input min-h-[100px]" value={about.description} onChange={e => setAbout({ ...about, description: e.target.value })} />
        </Field>
      </SectionCard>

      <div className="flex justify-end">
        <Button onClick={save} className="btn-gold"><Save className="w-4 h-4 mr-2" />Save & Publish Home Page</Button>
      </div>
    </div>
  );
};
