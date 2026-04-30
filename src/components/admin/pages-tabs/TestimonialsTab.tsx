import { useState, useEffect } from 'react';
import { useContent } from '@/context/ContentContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Save, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { SectionCard, Field } from '../shared/AdminSectionComponents';

export const TestimonialsTab = () => {
  const { content, updateTestimonials } = useContent();
  const { toast } = useToast();
  const [items, setItems] = useState(content.testimonials.items);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // Sync local state when content loads from Firestore
  useEffect(() => {
    setItems(content.testimonials.items);
  }, [content.testimonials.items]);

  const update = (id: number, field: string, value: unknown) => setItems(items.map(t => t.id === id ? { ...t, [field]: value } : t));
  const add    = () => {
    const id = Date.now();
    setItems([...items, { id, name: '', role: '', content: '', rating: 5, location: '' }]);
    setExpandedId(id);
  };
  const remove = (id: number) => setItems(items.filter(t => t.id !== id));

  const save = () => { 
    updateTestimonials({ ...content.testimonials, items }); 
    toast({ title: 'Testimonials Saved', description: 'Changes are now live on /testimonials and home page.' }); 
  };

  return (
    <div className="space-y-6">



      {items.map((t) => (
        <div key={t.id} className="border border-border rounded-lg bg-card overflow-hidden transition-all duration-200 shadow-sm">
          <div 
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/30"
            onClick={() => setExpandedId(expandedId === t.id ? null : t.id)}
          >
            <div className="flex items-center gap-4">
              <span className="font-semibold text-sm text-foreground">
                {t.name || 'New Testimonial'}
              </span>
              <span className="text-accent text-xs hidden sm:inline">{'★'.repeat(t.rating)}{'☆'.repeat(5 - t.rating)}</span>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={(e) => { e.stopPropagation(); remove(t.id); }} 
                className="text-destructive hover:bg-destructive/10 p-1.5 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              {expandedId === t.id ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
            </div>
          </div>

          {expandedId === t.id && (
            <div className="p-4 pt-0 space-y-4 border-t border-border/50 animate-in fade-in slide-in-from-top-1 duration-200">
              <div className="grid sm:grid-cols-3 gap-3">
                <Field
                  label="Client's Full Name"
                >
                  <input className="form-input" value={t.name} onChange={e => update(t.id, 'name', e.target.value)} />
                </Field>
                <Field
                  label="Profession / Role"
                >
                  <input className="form-input" value={t.role} onChange={e => update(t.id, 'role', e.target.value)} />
                </Field>
                <Field
                  label="City"
                >
                  <input className="form-input" value={t.location} onChange={e => update(t.id, 'location', e.target.value)} />
                </Field>
              </div>

              <Field
                label="Testimonial Text (the main review text shown in the large quote block)"
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
          )}
        </div>
      ))}

      <Button variant="default" onClick={add} className="w-full btn-gold"><Plus className="w-4 h-4 mr-2" />Add New Testimonial</Button>
      <div className="flex justify-end">
        <Button onClick={save} className="btn-gold"><Save className="w-4 h-4 mr-2" />Save & Publish Testimonials</Button>
      </div>
    </div>
  );
};
