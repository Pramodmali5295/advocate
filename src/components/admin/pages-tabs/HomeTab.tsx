import { useState } from 'react';
import { useContent } from '@/context/ContentContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Save, Plus, Trash2 } from 'lucide-react';
import { SectionCard, Field } from '../shared/AdminSectionComponents';

export const HomeTab = () => {
  const { content, updateHero, updateAboutSection, updateCTA } = useContent();
  const { toast } = useToast();
  const [hero, setHero]   = useState(content.hero);
  const [about, setAbout] = useState(content.aboutSection);
  const [cta, setCta]     = useState(content.cta);

  const save = () => {
    updateHero(hero);
    updateAboutSection(about);
    updateCTA(cta);
    toast({ title: 'Home Page Saved', description: 'All changes are now live on the Home page.' });
  };

  return (
    <div className="space-y-6">
      {/* ── Section 1: Top Banner / Hero ── */}
      <SectionCard
        title="Top Banner — Hero Section"
        page="Home Page ( / )"
        hint="This is the very first thing visitors see when they open the website — the full-screen dark banner at the top."
      >
        <Field
          label="Small Badge Text (above the main heading)"
          hint='e.g. "20+ YEARS OF LEGAL EXCELLENCE" — shown in a pill/badge above the big title.'
        >
          <input className="form-input" value={hero.badge} onChange={e => setHero({ ...hero, badge: e.target.value })} />
        </Field>

        <Field
          label='Main Heading — "Justice Delivered with…" line'
          hint="The large white heading text in the centre of the banner."
        >
          <textarea className="form-input min-h-[80px]" value={hero.title} onChange={e => setHero({ ...hero, title: e.target.value })} />
        </Field>

        <Field
          label="Description Text (below the main heading)"
          hint="The smaller paragraph text below the big heading that describes the firm's services."
        >
          <textarea className="form-input min-h-[80px]" value={hero.subtitle} onChange={e => setHero({ ...hero, subtitle: e.target.value })} />
        </Field>

        <Field
          label="Hero Background Image URL"
          hint="Paste a direct image link (e.g. from Unsplash) to show as the banner background. A dark professional library image is used by default to keep navigation clear."
        >
          <input 
            className="form-input" 
            placeholder="https://images.unsplash.com/..." 
            value={hero.backgroundImage || ''} 
            onChange={e => setHero({ ...hero, backgroundImage: e.target.value })} 
          />
        </Field>

        <div>
          <label className="form-label">Statistics Row (Cases Won / Years Experience / Success Rate…)</label>
          <p className="text-xs text-muted-foreground mb-2">These numbers appear at the bottom of the banner in a row of stat boxes.</p>
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
        <div>
          <label className="form-label">Highlight Stats (the icon + number + label boxes shown in a grid)</label>
          <p className="text-xs text-muted-foreground mb-2">e.g. "Supreme Court Practice — 20+" or "Success Rate — 98%"</p>
          <div className="grid sm:grid-cols-2 gap-3">
            {about.highlights.map((h, i) => (
              <div key={i} className="flex gap-2 items-start border border-border rounded-lg p-2">
                <div className="flex-1">
                  <input className="form-input text-sm mb-1" placeholder="Label, e.g. Supreme Court Practice" value={h.label} onChange={e => { const arr = [...about.highlights]; arr[i] = { ...arr[i], label: e.target.value }; setAbout({ ...about, highlights: arr }); }} />
                </div>
                <input className="form-input text-sm w-20" placeholder="Value" value={h.value} onChange={e => { const arr = [...about.highlights]; arr[i] = { ...arr[i], value: e.target.value }; setAbout({ ...about, highlights: arr }); }} />
              </div>
            ))}
          </div>
        </div>
      </SectionCard>

      {/* ── Section 3: "Ready to Discuss…" CTA ── */}
      <SectionCard
        title={`"Ready to Discuss Your Legal Matter?" — Call-to-Action Section`}
        page="Home Page ( / ) — near the bottom"
        hint={`This is the dark navy banner near the bottom of the Home page with the "Book Consultation" button and feature cards.`}
      >
        <Field label={`Main Heading (e.g. "Ready to Discuss Your Legal Matter?")`}>
          <input className="form-input" value={cta.title} onChange={e => setCta({ ...cta, title: e.target.value })} />
        </Field>
        <Field label="Description Paragraph (below the heading)">
          <textarea className="form-input min-h-[80px]" value={cta.subtitle} onChange={e => setCta({ ...cta, subtitle: e.target.value })} />
        </Field>
        <Field label="CTA Button Text">
          <input className="form-input" value={cta.buttonText} onChange={e => setCta({ ...cta, buttonText: e.target.value })} />
        </Field>
        <div>
          <label className="form-label">Feature Cards (Icon + Title + Description)</label>
          <p className="text-xs text-muted-foreground mb-4">Add or remove cards to highlight your firm's key strengths.</p>
          <div className="space-y-4">
            {cta.features.map((f, i) => (
              <div key={i} className="border border-border rounded-lg p-4 space-y-3 bg-muted/20 relative group">
                <button 
                  onClick={() => {
                    const arr = [...cta.features];
                    arr.splice(i, 1);
                    setCta({ ...cta, features: arr });
                  }}
                  className="absolute top-2 right-2 p-1.5 text-destructive bg-background border border-border rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="grid sm:grid-cols-2 gap-3">
                  <Field label="Card Title">
                    <input className="form-input text-sm font-semibold" placeholder="e.g. 24-Hour Response" value={f.title} onChange={e => { const arr = [...cta.features]; arr[i] = { ...arr[i], title: e.target.value }; setCta({ ...cta, features: arr }); }} />
                  </Field>
                  <Field label="Icon Name">
                    <select 
                      className="form-input text-sm" 
                      value={f.icon} 
                      onChange={e => { const arr = [...cta.features]; arr[i] = { ...arr[i], icon: e.target.value }; setCta({ ...cta, features: arr }); }}
                    >
                      <option value="Clock">Clock</option>
                      <option value="Shield">Shield</option>
                      <option value="Award">Award</option>
                      <option value="Phone">Phone</option>
                      <option value="ArrowRight">Arrow</option>
                    </select>
                  </Field>
                </div>
                <Field label="Card Description">
                  <input className="form-input text-sm" placeholder="Short description" value={f.description} onChange={e => { const arr = [...cta.features]; arr[i] = { ...arr[i], description: e.target.value }; setCta({ ...cta, features: arr }); }} />
                </Field>
              </div>
            ))}
            <Button 
              variant="outline" 
              className="w-full border-dashed"
              onClick={() => setCta({ ...cta, features: [...cta.features, { icon: 'Shield', title: '', description: '' }] })}
            >
              <Plus className="w-4 h-4 mr-2" /> Add Feature Card
            </Button>
          </div>
        </div>
      </SectionCard>

      <div className="flex justify-end">
        <Button onClick={save} className="btn-gold"><Save className="w-4 h-4 mr-2" />Save & Publish Home Page</Button>
      </div>
    </div>
  );
};
