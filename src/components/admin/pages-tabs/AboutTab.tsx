import { useState, useEffect } from 'react';
import { useContent } from '@/context/ContentContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Save, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { SectionCard, Field } from '../shared/AdminSectionComponents';

export const AboutTab = () => {
  const { content, updateAboutPage } = useContent();
  const { toast } = useToast();
  const [data, setData] = useState(content.aboutPage);
  const [expandedTimeline, setExpandedTimeline] = useState<number | null>(null);
  
  // Sync local state when content loads from Firestore
  useEffect(() => {
    setData(content.aboutPage);
  }, [content.aboutPage]);

  const save = () => {
    updateAboutPage(data);
    toast({ title: 'About Page Saved', description: 'All changes are now live on the About page.' });
  };

  const updateTimeline = (i: number, field: string, value: string) => {
    const arr = [...data.timeline]; arr[i] = { ...arr[i], [field]: value }; setData({ ...data, timeline: arr });
  };
  const addTimeline    = () => {
    const newTimeline = [...data.timeline, { year: '', title: '', description: '' }];
    setData({ ...data, timeline: newTimeline });
    setExpandedTimeline(newTimeline.length - 1);
  };
  const removeTimeline = (i: number) => setData({ ...data, timeline: data.timeline.filter((_, idx) => idx !== i) });

  const updateCert = (i: number, value: string) => { const arr = [...data.certifications]; arr[i] = value; setData({ ...data, certifications: arr }); };
  const addCert    = () => setData({ ...data, certifications: [...data.certifications, ''] });
  const removeCert = (i: number) => setData({ ...data, certifications: data.certifications.filter((_, idx) => idx !== i) });

  const updateBio = (i: number, value: string) => { const arr = [...data.bio]; arr[i] = value; setData({ ...data, bio: arr }); };

  return (
    <div className="space-y-6">
      <SectionCard
        title="Top Banner — About Page Header"
        page="About Page ( /about ) — top dark section"
        hint="The full-width dark navy header at the top of the /about page, showing the page title and the advocate's profile sidebar."
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Header Badge (small text at the very top)">
            <input className="form-input" value={data.badge} onChange={e => setData({ ...data, badge: e.target.value })} />
          </Field>
          <Field label="Advocate's Full Name (shown in the profile sidebar card)">
            <input className="form-input" value={data.advocateName} onChange={e => setData({ ...data, advocateName: e.target.value })} />
          </Field>
          <Field label="Designation / Title (shown below name in sidebar)">
            <input className="form-input" placeholder="e.g. Senior Advocate" value={data.advocateTitle} onChange={e => setData({ ...data, advocateTitle: e.target.value })} />
          </Field>
          <Field label="Education / Bar Enrollment (shown with graduation icon in sidebar)">
            <input className="form-input" placeholder="e.g. LLB, Delhi University" value={data.education} onChange={e => setData({ ...data, education: e.target.value })} />
          </Field>
          <Field label="Location / City (shown with map pin icon in sidebar)">
            <input className="form-input" placeholder="e.g. New Delhi, India" value={data.location} onChange={e => setData({ ...data, location: e.target.value })} />
          </Field>
        </div>
      </SectionCard>

      <SectionCard
        title='"Biography" Section'
        page="About Page ( /about ) — main content area"
        hint='The "Biography" heading and paragraphs of text shown in the right-hand content column on the About page.'
      >
        {data.bio.map((p, i) => (
          <Field key={i} label={`Biography Paragraph ${i + 1}`}>
            <textarea className="form-input min-h-[80px]" value={p} onChange={e => updateBio(i, e.target.value)} />
          </Field>
        ))}
      </SectionCard>

      <SectionCard
        title='"Certifications & Memberships" Section'
        page="About Page ( /about ) — below Biography"
        hint='Each item appears as a checkbox row in the "Certifications & Memberships" section on the About page.'
      >
        <div className="space-y-2">
          {data.certifications.map((c, i) => (
            <div key={i} className="flex gap-2">
              <input className="form-input text-sm flex-1" placeholder="e.g. Bar Council of Delhi — Enrollment No. D/123/2003" value={c} onChange={e => updateCert(i, e.target.value)} />
              <button onClick={() => removeCert(i)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}
        </div>
        <Button variant="default" onClick={addCert} className="w-full btn-gold"><Plus className="w-4 h-4 mr-2" />Add Certification / Membership</Button>
      </SectionCard>

      <SectionCard
        title='"Professional Journey" Timeline'
        page="About Page ( /about ) — below Certifications"
        hint='Each entry appears as a numbered timeline card with a Year, Title, and Description on the About page.'
      >
        <div className="space-y-3">
          {data.timeline.map((t, i) => (
            <div key={i} className="border border-border rounded-lg bg-card overflow-hidden transition-all duration-200 shadow-sm">
              <div 
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/30"
                onClick={() => setExpandedTimeline(expandedTimeline === i ? null : i)}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-accent w-12">{t.year || 'YEAR'}</span>
                  <span className="font-semibold text-sm text-foreground">
                    {t.title || 'Untitled Milestone'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); removeTimeline(i); }} 
                    className="text-destructive hover:bg-destructive/10 p-1.5 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  {expandedTimeline === i ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                </div>
              </div>

              {expandedTimeline === i && (
                <div className="p-4 pt-0 space-y-4 border-t border-border/50 animate-in fade-in slide-in-from-top-1 duration-200">
                  <div className="grid sm:grid-cols-4 gap-3">
                    <Field label="Year">
                      <input className="form-input" placeholder="e.g. 2003" value={t.year} onChange={e => updateTimeline(i, 'year', e.target.value)} />
                    </Field>
                    <div className="sm:col-span-3">
                      <Field label="Milestone Title">
                        <input className="form-input" placeholder="e.g. Enrolled with Bar Council" value={t.title} onChange={e => updateTimeline(i, 'title', e.target.value)} />
                      </Field>
                    </div>
                  </div>
                  <Field label="Description">
                    <textarea className="form-input min-h-[60px]" placeholder="Short description for this milestone" value={t.description} onChange={e => updateTimeline(i, 'description', e.target.value)} />
                  </Field>
                </div>
              )}
            </div>
          ))}
        </div>
        <Button variant="default" onClick={addTimeline} className="w-full btn-gold"><Plus className="w-4 h-4 mr-2" />Add Timeline Entry</Button>
      </SectionCard>



      <div className="flex justify-end">
        <Button onClick={save} className="btn-gold"><Save className="w-4 h-4 mr-2" />Save & Publish About Page</Button>
      </div>
    </div>
  );
};
