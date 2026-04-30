import { useState, useEffect } from 'react';
import { useContent } from '@/context/ContentContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Save, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { SectionCard, Field } from '../shared/AdminSectionComponents';

export const KnowledgeTab = () => {
  const { content, updateKnowledge } = useContent();
  const { toast } = useToast();
  const [articles, setArticles] = useState(content.knowledge.articles);
  const [faqs, setFaqs]         = useState(content.knowledge.faqs);
  const [expandedArticle, setExpandedArticle] = useState<number | null>(null);
  const [expandedFaq, setExpandedFaq]         = useState<number | null>(null);

  // Sync local state when content loads from Firestore
  useEffect(() => {
    setArticles(content.knowledge.articles);
    setFaqs(content.knowledge.faqs);
  }, [content.knowledge.articles, content.knowledge.faqs]);

  const categories = ['Criminal Law', 'Civil Litigation', 'Family Law', 'Property Law', 'Corporate Law', 'Consumer Law'];

  const updateArticle = (id: number, field: string, value: unknown) => setArticles(articles.map(a => a.id === id ? { ...a, [field]: value } : a));
  const addArticle    = () => {
    const id = Date.now();
    setArticles([...articles, { id, title: '', excerpt: '', content: '', category: 'Criminal Law', date: new Date().toISOString().split('T')[0], readTime: '5 min read', featured: false }]);
    setExpandedArticle(id);
  };
  const removeArticle = (id: number) => setArticles(articles.filter(a => a.id !== id));

  const updateFaq = (i: number, field: string, value: string) => { const arr = [...faqs]; arr[i] = { ...arr[i], [field]: value }; setFaqs(arr); };
  const addFaq    = () => {
    setFaqs([...faqs, { question: '', answer: '' }]);
    setExpandedFaq(faqs.length);
  };
  const removeFaq = (i: number) => setFaqs(faqs.filter((_, idx) => idx !== i));

  const save = () => { 
    updateKnowledge({ ...content.knowledge, articles, faqs }); 
    toast({ title: 'Knowledge Base Saved', description: 'Changes are now live on /knowledge.' }); 
  };

  return (
    <div className="space-y-6">

      <SectionCard
        title="Articles — Knowledge Base"
        page="Knowledge Base Page ( /knowledge )"
        hint='Articles appear as cards on the /knowledge page. "Featured" articles are displayed in the larger two-column grid at the top; others appear in the list below.'
      >
        <div className="space-y-4">
          {articles.map(a => (
            <div key={a.id} className="border border-border rounded-lg bg-card overflow-hidden transition-all duration-200 shadow-sm">
              <div 
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/30"
                onClick={() => setExpandedArticle(expandedArticle === a.id ? null : a.id)}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full ${a.featured ? 'bg-accent shadow-sm shadow-accent/50' : 'bg-muted-foreground/30'}`} />
                  <span className="font-semibold text-sm text-foreground">
                    {a.title || 'Untitled Article'}
                  </span>
                  {a.featured && <span className="text-[10px] bg-accent/10 text-accent px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Featured</span>}
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); removeArticle(a.id); }} 
                    className="text-destructive hover:bg-destructive/10 p-1.5 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  {expandedArticle === a.id ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                </div>
              </div>

              {expandedArticle === a.id && (
                <div className="p-4 pt-0 space-y-4 border-t border-border/50 animate-in fade-in slide-in-from-top-1 duration-200">
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
                  <label className="flex items-center gap-2 cursor-pointer select-none bg-muted/30 p-3 rounded-lg border border-border/50">
                    <input type="checkbox" checked={a.featured} onChange={e => updateArticle(a.id, 'featured', e.target.checked)} className="w-4 h-4 accent-amber-500" />
                    <div className="flex flex-col">
                      <span className="text-sm text-foreground font-bold">⭐ Featured Article</span>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Shows in the larger top grid</span>
                    </div>
                  </label>
                </div>
              )}
            </div>
          ))}
          <Button variant="default" onClick={addArticle} className="w-full btn-gold"><Plus className="w-4 h-4 mr-2" />Add New Article</Button>
        </div>
      </SectionCard>

      <SectionCard
        title='"Frequently Asked Questions" Section'
        page="Knowledge Base Page ( /knowledge ) — bottom section"
        hint='These Q&A pairs appear in the accordion list at the bottom of the /knowledge page under the heading "Frequently Asked Questions". Click a question to expand its answer.'
      >
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="border border-border rounded-lg bg-card overflow-hidden transition-all duration-200 shadow-sm">
              <div 
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/30"
                onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
              >
                <span className="font-semibold text-sm text-foreground">
                  {f.question || `FAQ #${i + 1}`}
                </span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); removeFaq(i); }} 
                    className="text-destructive hover:bg-destructive/10 p-1.5 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  {expandedFaq === i ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                </div>
              </div>

              {expandedFaq === i && (
                <div className="p-4 pt-0 space-y-4 border-t border-border/50 animate-in fade-in slide-in-from-top-1 duration-200">
                  <Field label="Question (shown as the clickable/expandable heading)">
                    <input className="form-input" value={f.question} onChange={e => updateFaq(i, 'question', e.target.value)} />
                  </Field>
                  <Field label="Answer (shown when the user clicks on the question to expand it)">
                    <textarea className="form-input min-h-[80px]" value={f.answer} onChange={e => updateFaq(i, 'answer', e.target.value)} />
                  </Field>
                </div>
              )}
            </div>
          ))}
          <Button variant="default" onClick={addFaq} className="w-full btn-gold"><Plus className="w-4 h-4 mr-2" />Add New FAQ</Button>
        </div>
      </SectionCard>

      <div className="flex justify-end">
        <Button onClick={save} className="btn-gold"><Save className="w-4 h-4 mr-2" />Save & Publish Knowledge Base</Button>
      </div>
    </div>
  );
};
