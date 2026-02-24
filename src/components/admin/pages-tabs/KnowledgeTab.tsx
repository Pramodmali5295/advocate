import { useState } from 'react';
import { useContent } from '@/context/ContentContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Save, Plus, Trash2 } from 'lucide-react';
import { SectionCard, Field } from '../shared/AdminSectionComponents';

export const KnowledgeTab = () => {
  const { content, updateKnowledge } = useContent();
  const { toast } = useToast();
  const [badge, setBadge] = useState(content.knowledge.badge);
  const [heroTitle, setHeroTitle] = useState(content.knowledge.heroTitle);
  const [heroSubtitle, setHeroSubtitle] = useState(content.knowledge.heroSubtitle);
  const [articles, setArticles] = useState(content.knowledge.articles);
  const [faqs, setFaqs]         = useState(content.knowledge.faqs);

  const categories = ['Criminal Law', 'Civil Litigation', 'Family Law', 'Property Law', 'Corporate Law', 'Consumer Law'];

  const updateArticle = (id: number, field: string, value: unknown) => setArticles(articles.map(a => a.id === id ? { ...a, [field]: value } : a));
  const addArticle    = () => setArticles([...articles, { id: Date.now(), title: '', excerpt: '', content: '', category: 'Criminal Law', date: new Date().toISOString().split('T')[0], readTime: '5 min read', featured: false }]);
  const removeArticle = (id: number) => setArticles(articles.filter(a => a.id !== id));

  const updateFaq = (i: number, field: string, value: string) => { const arr = [...faqs]; arr[i] = { ...arr[i], [field]: value }; setFaqs(arr); };
  const addFaq    = () => setFaqs([...faqs, { question: '', answer: '' }]);
  const removeFaq = (i: number) => setFaqs(faqs.filter((_, idx) => idx !== i));

  const save = () => { 
    updateKnowledge({ badge, heroTitle, heroSubtitle, articles, faqs }); 
    toast({ title: 'Knowledge Base Saved', description: 'Changes are now live on /knowledge.' }); 
  };

  return (
    <div className="space-y-6">
      <SectionCard
        title="Page Header — Knowledge Base"
        page="Knowledge Base Page ( /knowledge ) — top section"
        hint="This section controls the main banner at the top of the Knowledge Base page."
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
      <SectionCard
        title="Articles — Knowledge Base"
        page="Knowledge Base Page ( /knowledge )"
        hint='Articles appear as cards on the /knowledge page. "Featured" articles are displayed in the larger two-column grid at the top; others appear in the list below.'
      >
        <div className="space-y-4">
          {articles.map(a => (
            <div key={a.id} className="border border-border rounded-lg p-4 space-y-3 bg-muted/10">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm text-foreground">{a.title || 'New Article'}</span>
                <button onClick={() => removeArticle(a.id)} className="text-destructive hover:bg-destructive/10 p-1 rounded"><Trash2 className="w-4 h-4" /></button>
              </div>
              <Field label="Article Title (the heading shown on the card)">
                <input className="form-input" value={a.title} onChange={e => updateArticle(a.id, 'title', e.target.value)} />
              </Field>
              <Field
                label="Excerpt / Summary (the 2–3 line description shown under the title on the card)"
              >
                <textarea className="form-input min-h-[60px]" value={a.excerpt} onChange={e => updateArticle(a.id, 'excerpt', e.target.value)} />
              </Field>
              <Field
                label="Full Article Content (the detailed text that opens when clicking 'Read More')"
              >
                <textarea className="form-input min-h-[120px]" value={a.content} onChange={e => updateArticle(a.id, 'content', e.target.value)} />
              </Field>
              <div className="grid sm:grid-cols-3 gap-3">
                <Field label="Category (filter tag on the card)">
                  <select className="form-input" value={a.category} onChange={e => updateArticle(a.id, 'category', e.target.value)}>
                    {categories.map(c => <option key={c}>{c}</option>)}
                  </select>
                </Field>
                <Field label="Published Date">
                  <input type="date" className="form-input" value={a.date} onChange={e => updateArticle(a.id, 'date', e.target.value)} />
                </Field>
                <Field label='Read Time (e.g. "5 min read")'>
                  <input className="form-input" placeholder="5 min read" value={a.readTime} onChange={e => updateArticle(a.id, 'readTime', e.target.value)} />
                </Field>
              </div>
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" checked={a.featured} onChange={e => updateArticle(a.id, 'featured', e.target.checked)} className="w-4 h-4 accent-amber-500" />
                <span className="text-sm text-foreground font-medium">⭐ Featured Article</span>
                <span className="text-xs text-muted-foreground">(featured articles show in the larger top grid)</span>
              </label>
            </div>
          ))}
          <Button variant="outline" onClick={addArticle} className="w-full"><Plus className="w-4 h-4 mr-2" />Add New Article</Button>
        </div>
      </SectionCard>

      <SectionCard
        title='"Frequently Asked Questions" Section'
        page="Knowledge Base Page ( /knowledge ) — bottom section"
        hint='These Q&A pairs appear in the accordion list at the bottom of the /knowledge page under the heading "Frequently Asked Questions". Click a question to expand its answer.'
      >
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="border border-border rounded-lg p-4 space-y-3 bg-muted/10">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">FAQ #{i + 1}</span>
                <button onClick={() => removeFaq(i)} className="text-destructive hover:bg-destructive/10 p-1 rounded"><Trash2 className="w-4 h-4" /></button>
              </div>
              <Field label="Question (shown as the clickable/expandable heading)">
                <input className="form-input" value={f.question} onChange={e => updateFaq(i, 'question', e.target.value)} />
              </Field>
              <Field label="Answer (shown when the user clicks on the question to expand it)">
                <textarea className="form-input min-h-[80px]" value={f.answer} onChange={e => updateFaq(i, 'answer', e.target.value)} />
              </Field>
            </div>
          ))}
          <Button variant="outline" onClick={addFaq} className="w-full"><Plus className="w-4 h-4 mr-2" />Add New FAQ</Button>
        </div>
      </SectionCard>

      <div className="flex justify-end">
        <Button onClick={save} className="btn-gold"><Save className="w-4 h-4 mr-2" />Save & Publish Knowledge Base</Button>
      </div>
    </div>
  );
};
