import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/customer/layout/Layout';
import { Button } from '@/components/ui/button';
import { Search, BookOpen, Calendar, Clock, ArrowRight, ChevronRight, X } from 'lucide-react';
import { useContent } from '@/context/ContentContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ArticleItem } from '@/types/content';

const Knowledge = () => {
  const { content } = useContent();
  const { articles, faqs } = content.knowledge;

  const allCategories = ['All', ...Array.from(new Set(articles.map(a => a.category)))];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);

  const filteredArticles = articles.filter(article => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-hero pt-44 pb-20">
        <div className="container-legal text-center">
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 block animate-in fade-in slide-in-from-bottom-3 duration-700">
              {content.knowledge.badge}
            </span>
            <h1 className="heading-display text-cream mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              {content.knowledge.heroTitle}
            </h1>
            <p className="text-cream/80 text-lg leading-relaxed mb-8 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-300">
              {content.knowledge.heroSubtitle}
            </p>
            <div className="relative w-full max-w-xl animate-in fade-in zoom-in duration-700 delay-400">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-cream placeholder:text-cream/50 focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="section-padding bg-background">
        <div className="container-legal">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-3 mb-12">
            {allCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Featured Articles */}
          {filteredArticles.filter(a => a.featured).length > 0 && (
            <div className="mb-12">
              <h2 className="heading-section text-foreground mb-6">Featured Articles</h2>
              <div className="accent-line mb-8" />
              <div className="grid md:grid-cols-2 gap-8">
                {filteredArticles.filter(a => a.featured).map((article) => (
                  <article key={article.id} className="card-premium p-6 group cursor-pointer" onClick={() => setSelectedArticle(article)}>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">{article.category}</span>
                      <span className="flex items-center gap-1 text-muted-foreground text-xs">
                        <Calendar className="w-3 h-3" />
                        {new Date(article.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                    <h3 className="heading-card text-foreground mb-3 group-hover:text-accent transition-colors">{article.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{article.excerpt}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="flex items-center gap-1 text-muted-foreground text-xs">
                        <Clock className="w-3 h-3" />{article.readTime}
                      </span>
                      <span className="flex items-center gap-1 text-accent text-sm font-medium group-hover:gap-2 transition-all">
                        Read More <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* All Articles */}
          <div>
            <h2 className="heading-section text-foreground mb-6">All Articles</h2>
            <div className="accent-line mb-8" />
            <div className="space-y-4">
              {filteredArticles.map((article) => (
                <article key={article.id} className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 p-5 sm:p-6 bg-card border border-border rounded-lg hover:shadow-md transition-all group cursor-pointer" onClick={() => setSelectedArticle(article)}>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-accent text-[10px] sm:text-xs font-medium uppercase tracking-wider">{article.category}</span>
                      <span className="text-muted-foreground text-xs">•</span>
                      <span className="text-muted-foreground text-[10px] sm:text-xs">{article.readTime}</span>
                    </div>
                    <h3 className="font-semibold text-foreground text-sm sm:text-base group-hover:text-accent transition-colors leading-snug">{article.title}</h3>
                  </div>
                  <ChevronRight className="hidden sm:block w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                </article>
              ))}
              {filteredArticles.length === 0 && (
                <p className="text-center text-muted-foreground py-12">No articles found matching your search.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-cream-dark">
        <div className="container-legal">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 block">Common Questions</span>
              <h2 className="heading-section text-foreground mb-4">Frequently Asked Questions</h2>
              <div className="accent-line-center" />
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-card border border-border rounded-lg overflow-hidden">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-colors"
                  >
                    <span className="font-semibold text-foreground pr-4">{faq.question}</span>
                    <ChevronRight className={`w-5 h-5 text-muted-foreground transition-transform ${expandedFaq === index ? 'rotate-90' : ''}`} />
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-6 pt-0">
                      <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-navy">
        <div className="container-legal text-center">
          <h2 className="heading-section text-cream mb-4">Need Personalized Legal Advice?</h2>
          <p className="text-cream/70 mb-8 max-w-xl mx-auto">
            Our knowledge base provides general information. For advice specific to your situation, book a consultation.
          </p>
          <Link to="/inquiry">
            <Button className="btn-gold px-8 py-6 h-auto text-lg">
              Book Consultation
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
      {/* Article Detail Modal */}
      <Dialog open={!!selectedArticle} onOpenChange={() => setSelectedArticle(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedArticle && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">{selectedArticle.category}</span>
                  <span className="text-muted-foreground text-xs">{selectedArticle.date}</span>
                  <span className="text-muted-foreground text-xs">•</span>
                  <span className="text-muted-foreground text-xs">{selectedArticle.readTime}</span>
                </div>
                <DialogTitle className="heading-section text-left mb-4">{selectedArticle.title}</DialogTitle>
                <DialogDescription className="text-muted-foreground text-left text-base leading-relaxed italic border-l-4 border-accent pl-4 mb-6">
                  {selectedArticle.excerpt}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6 pt-6 border-t border-border">
                <div className="prose prose-slate max-w-none text-foreground leading-relaxed whitespace-pre-wrap">
                  {selectedArticle.content || "Full content is coming soon."}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Knowledge;
