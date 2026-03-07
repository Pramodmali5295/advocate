import { useState } from 'react';
import { useContent } from '@/context/ContentContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Save, Plus, Trash2 } from 'lucide-react';
import { SectionCard, Field } from '../shared/AdminSectionComponents';

export const TestimonialsTab = () => {
  const { content, updateTestimonials } = useContent();
  const { toast } = useToast();
  const [badge, setBadge] = useState(content.testimonials.badge);
  const [heroTitle, setHeroTitle] = useState(content.testimonials.heroTitle);
  const [heroSubtitle, setHeroSubtitle] = useState(content.testimonials.heroSubtitle);
  const [items, setItems] = useState(content.testimonials.items);

  const update = (id: number, field: string, value: unknown) => setItems(items.map(t => t.id === id ? { ...t, [field]: value } : t));
  const add    = () => setItems([...items, { id: Date.now(), name: '', role: '', content: '', rating: 5, location: '' }]);
  const remove = (id: number) => setItems(items.filter(t => t.id !== id));

  const save = () => { 
    updateTestimonials({ badge, heroTitle, heroSubtitle, items }); 
    toast({ title: 'Testimonials Saved', description: 'Changes are now live on /testimonials and home page.' }); 
  };

  return (
    <div className="space-y-6">
      <SectionCard
        title="Page Header — Testimonials"
        page="Testimonials Page ( /testimonials ) — top section"
        hint="This section controls the main banner at the top of the Client Testimonials page."
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
        💡 These testimonials appear in the <strong className="text-foreground">"What Our Clients Say"</strong> sliding carousel on the <strong className="text-foreground">Home page</strong> and the dedicated <strong className="text-foreground">Testimonials page</strong>.
      </div>

      {items.map((t) => (
        <div key={t.id} className="admin-card space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-foreground">{t.name || 'New Testimonial'}</span>
            <button onClick={() => remove(t.id)} className="p-2 text-destructive hover:bg-destructive/10 rounded-lg"><Trash2 className="w-4 h-4" /></button>
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            <Field
              label="Client's Full Name"
              hint='Shown as the bold name under the testimonial text, e.g. "Rajesh Sharma"'
            >
              <input className="form-input" value={t.name} onChange={e => update(t.id, 'name', e.target.value)} />
            </Field>
            <Field
              label="Profession / Role"
              hint='Shown next to the name, e.g. "Business Owner"'
            >
              <input className="form-input" value={t.role} onChange={e => update(t.id, 'role', e.target.value)} />
            </Field>
            <Field
              label="City"
              hint='Shown after the profession, e.g. "Delhi"'
            >
              <input className="form-input" value={t.location} onChange={e => update(t.id, 'location', e.target.value)} />
            </Field>
          </div>

          <Field
            label="Testimonial Text (the main review text shown in the large quote block)"
            hint="This is the actual review message that appears in the big sliding quote block. Keep it genuine."
          >
            <textarea className="form-input min-h-[80px]" value={t.content} onChange={e => update(t.id, 'content', e.target.value)} />
          </Field>

          <Field
            label="Star Rating (1–5 stars shown as gold stars above the quote)"
          >
            <div className="flex items-center gap-3">
              <input type="number" min="1" max="5" className="form-input w-24" value={t.rating} onChange={e => update(t.id, 'rating', parseInt(e.target.value))} />
              <span className="text-accent text-lg">{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</span>
            </div>
          </Field>
        </div>
      ))}

      <Button variant="outline" onClick={add} className="w-full"><Plus className="w-4 h-4 mr-2" />Add New Testimonial</Button>
      <div className="flex justify-end">
        <Button onClick={save} className="btn-gold"><Save className="w-4 h-4 mr-2" />Save & Publish Testimonials</Button>
      </div>
    </div>
  );
};
