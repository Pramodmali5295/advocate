import { useState } from 'react';
import { useContent } from '@/context/ContentContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Save, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { SectionCard, Field } from '../shared/AdminSectionComponents';

export const PracticeAreasTab = () => {
  const { content, updatePracticeAreas } = useContent();
  const { toast } = useToast();
  const [badge, setBadge] = useState(content.practiceAreas.badge);
  const [heroTitle, setHeroTitle] = useState(content.practiceAreas.heroTitle);
  const [heroSubtitle, setHeroSubtitle] = useState(content.practiceAreas.heroSubtitle);
  const [areas, setAreas]       = useState(content.practiceAreas.items);
  const [expanded, setExpanded] = useState<string | null>(null);

  const update       = (id: string, field: string, value: unknown) => setAreas(areas.map(a => a.id === id ? { ...a, [field]: value } : a));
  const updateList   = (id: string, field: 'services' | 'courts', i: number, value: string) => {
    setAreas(areas.map(a => { if (a.id !== id) return a; const arr = [...(a[field] as string[])]; arr[i] = value; return { ...a, [field]: arr }; }));
  };
  const addListItem    = (id: string, field: 'services' | 'courts') => setAreas(areas.map(a => a.id === id ? { ...a, [field]: [...(a[field] as string[]), ''] } : a));
  const removeListItem = (id: string, field: 'services' | 'courts', i: number) => setAreas(areas.map(a => a.id === id ? { ...a, [field]: (a[field] as string[]).filter((_, idx) => idx !== i) } : a));

  const save = () => { 
    updatePracticeAreas({ badge, heroTitle, heroSubtitle, items: areas }); 
    toast({ title: 'Practice Areas Saved', description: 'Changes are now live on /practice-areas.' }); 
  };

  return (
    <div className="space-y-6">
      <SectionCard
        title="Page Header — Practice Areas"
        page="Practice Areas Listing Page ( /practice-areas ) — top section"
        hint="This section controls the main banner at the top of the Practice Areas page."
      >
        <div className="grid sm:grid-cols-1 gap-4">
          <Field label="Header Badge (small text at the very top)">
            <input className="form-input" value={badge} onChange={e => setBadge(e.target.value)} />
          </Field>
          <Field label="Main Hero Title (the primary H1 heading)">
            <input className="form-input" value={heroTitle} onChange={e => setHeroTitle(e.target.value)} />
          </Field>
          <Field label="Hero Subtitle (the text paragraph under the title)">
            <textarea className="form-input min-h-[80px]" value={heroSubtitle} onChange={e => setHeroSubtitle(e.target.value)} />
          </Field>
        </div>
      </SectionCard>
      <div className="bg-accent/5 border border-accent/20 rounded-lg p-4 text-sm text-muted-foreground">
        💡 Each card below is a Practice Area shown on <strong className="text-foreground">/practice-areas</strong> page and also in the <strong className="text-foreground">Practice Areas grid on the Home page</strong>. Use the <strong className="text-foreground">Active / Hidden</strong> toggle to show or hide a card on the website.
      </div>

      {areas.map(area => (
        <div key={area.id} className="admin-card relative group">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              if (confirm(`Delete the "${area.title}" practice area section entirely?`)) {
                setAreas(areas.filter(a => a.id !== area.id));
              }
            }}
            className="absolute -top-2 -right-2 p-2 bg-background border border-border rounded-full text-destructive shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/10 z-10"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          <div className="flex items-center justify-between cursor-pointer" onClick={() => setExpanded(expanded === area.id ? null : area.id)}>
            <div className="flex items-center gap-3">
              <span className={`w-3 h-3 rounded-full flex-shrink-0 ${area.isActive ? 'bg-green-500' : 'bg-muted-foreground'}`} />
              <div>
                <span className="font-semibold text-foreground">{area.title || 'New Practice Area'}</span>
                <span className="ml-2 text-xs text-muted-foreground">{area.cases || '0'} cases · {area.successRate || '0%'} success rate</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={e => { e.stopPropagation(); update(area.id, 'isActive', !area.isActive); }}
                className={`text-xs px-3 py-1 rounded-full font-medium transition-colors ${area.isActive ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
              >
                {area.isActive ? '✓ Visible' : '✕ Hidden'}
              </button>
              {expanded === area.id ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
            </div>
          </div>

          {expanded === area.id && (
            <div className="mt-4 pt-4 border-t border-border space-y-5">
              <p className="text-xs text-muted-foreground bg-muted rounded-lg px-3 py-2">
                <strong>Card Title</strong> and <strong>Short Description</strong> appear on the grid card. 
                The <strong>ID/Slug</strong> determines the link (e.g., /practice-areas/criminal-law).
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Practice Area Name (Heading)">
                  <input 
                    className="form-input" 
                    value={area.title} 
                    onChange={e => {
                      const newTitle = e.target.value;
                      const newId = newTitle.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                      // Only update ID if it's a new area (empty ID) to avoid breaking existing links
                      const updates: any = { title: newTitle };
                      setAreas(areas.map(a => a.id === area.id ? { ...a, ...updates } : a));
                    }} 
                  />
                </Field>
                <Field label="URL ID / Slug (e.g. criminal-law)">
                  <input className="form-input font-mono text-xs" value={area.id} onChange={e => update(area.id, 'id', e.target.value)} />
                </Field>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Number of Cases (e.g. 500+)">
                  <input className="form-input" placeholder="800+" value={area.cases} onChange={e => update(area.id, 'cases', e.target.value)} />
                </Field>
                <Field label="Success Rate (e.g. 98%)">
                  <input className="form-input" placeholder="95%" value={area.successRate} onChange={e => update(area.id, 'successRate', e.target.value)} />
                </Field>
              </div>

              <Field
                label="Short Description (Listing Card)"
                hint="Shown on the grid card on Home and Listing pages."
              >
                <textarea className="form-input min-h-[60px]" value={area.description} onChange={e => update(area.id, 'description', e.target.value)} />
              </Field>

              <Field
                label="Full Description (Detail Page)"
                hint="The main paragraph shown at the top of the individual detail page."
              >
                <textarea className="form-input min-h-[80px]" value={area.fullDescription} onChange={e => update(area.id, 'fullDescription', e.target.value)} />
              </Field>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="form-label">Services Offered</label>
                  <div className="space-y-2">
                    {area.services.map((s, i) => (
                      <div key={i} className="flex gap-2">
                        <input className="form-input text-sm flex-1" value={s} onChange={e => updateList(area.id, 'services', i, e.target.value)} />
                        <button onClick={() => removeListItem(area.id, 'services', i)} className="text-destructive p-1 hover:bg-destructive/10 rounded"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={() => addListItem(area.id, 'services')} className="w-full"><Plus className="w-3 h-3 mr-1" />Add Service</Button>
                  </div>
                </div>
                <div>
                  <label className="form-label">Courts & Tribunals</label>
                  <div className="space-y-2">
                    {area.courts.map((c, i) => (
                      <div key={i} className="flex gap-2">
                        <input className="form-input text-sm flex-1" value={c} onChange={e => updateList(area.id, 'courts', i, e.target.value)} />
                        <button onClick={() => removeListItem(area.id, 'courts', i)} className="text-destructive p-1 hover:bg-destructive/10 rounded"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" onClick={() => addListItem(area.id, 'courts')} className="w-full"><Plus className="w-3 h-3 mr-1" />Add Court</Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      <Button 
        variant="outline" 
        className="w-full border-dashed py-6"
        onClick={() => {
          const newId = `new-area-${Date.now()}`;
          setAreas([...areas, {
            id: newId,
            title: '',
            description: '',
            fullDescription: '',
            icon: 'Scale',
            cases: '',
            successRate: '',
            isActive: true,
            services: [''],
            courts: ['']
          }]);
          setExpanded(newId);
        }}
      >
        <Plus className="w-4 h-4 mr-2" /> Add New Practice Area Section
      </Button>

      <div className="flex justify-end pt-6 border-t border-border">
        <Button onClick={save} className="btn-gold"><Save className="w-4 h-4 mr-2" />Save & Publish All Practice Areas</Button>
      </div>
    </div>
  );
};
