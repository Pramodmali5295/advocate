import { useState } from 'react';
import { Layout } from '@/components/customer/layout/Layout';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  Clock, 
  CheckCircle, 
  CreditCard,
  ArrowRight,
  Lock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

import { useContent } from '@/context/ContentContext';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const Inquiry = () => {
  const { toast } = useToast();
  const { content } = useContent();
  const fee = content.settings.inquiryFee;
  const currency = content.settings.currency === 'INR' ? '₹' : '$';
  
  const caseCategories = [
    ...content.practiceAreas.items.map(a => a.title),
    'Other',
  ];

  const [formData, setFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    city: '',
    category: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.fullName || !formData.mobile || !formData.email || !formData.category || !formData.description) {
      toast({
        title: "Incomplete Form",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Create inquiry record in Firestore
      await addDoc(collection(db, 'inquiries'), {
        ...formData,
        amount: fee,
        status: 'pending',
        paymentStatus: 'completed', // Simulation for now
        createdAt: serverTimestamp(),
      });

      toast({
        title: "Inquiry Submitted!",
        description: "Your consultation has been booked. We will contact you within 24 hours.",
      });

      // Clear form
      setFormData({
        fullName: '',
        mobile: '',
        email: '',
        city: '',
        category: '',
        description: '',
      });
    } catch (e) {
      console.error("Error submitting inquiry:", e);
      toast({
        title: "Error",
        description: "Failed to submit inquiry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-hero pt-44 pb-20">
        <div className="container-legal text-center">
          <div className="max-w-4xl mx-auto">
            <span className="text-accent text-sm font-semibold tracking-widest uppercase mb-4 block animate-in fade-in slide-in-from-bottom-3 duration-700">
              {content.inquiryPage.badge}
            </span>
            <h1 className="heading-display text-cream mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
              {content.inquiryPage.heroTitle}
            </h1>
            <p className="text-cream/80 text-lg leading-relaxed animate-in fade-in slide-in-from-bottom-5 duration-700 delay-300">
              {content.inquiryPage.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-background">
        <div className="container-legal">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="card-premium p-8">
                <h2 className="heading-section text-foreground mb-2">
                  {content.inquiryPage.formTitle}
                </h2>
                <p className="text-muted-foreground mb-8">
                  {content.inquiryPage.formSubtitle}
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div>
                      <label className="form-label">
                        Full Name <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    {/* Mobile */}
                    <div>
                      <label className="form-label">
                        Mobile Number <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="+91 98765 43210"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Email */}
                    <div>
                      <label className="form-label">
                        Email Address <span className="text-destructive">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>

                    {/* City */}
                    <div>
                      <label className="form-label">
                        City
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Your city"
                      />
                    </div>
                  </div>

                  {/* Case Category */}
                  <div>
                    <label className="form-label">
                      Case Category <span className="text-destructive">*</span>
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="form-input"
                      required
                    >
                      <option value="">Select a category</option>
                      {caseCategories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* Case Description */}
                  <div>
                    <label className="form-label">
                      Case Description <span className="text-destructive">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      className="form-input min-h-[150px]"
                      placeholder="Please describe your legal matter in detail. Include relevant dates, parties involved, and any actions taken so far..."
                      required
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                      Minimum 50 characters. Be as detailed as possible for accurate assessment.
                    </p>
                  </div>

                  {/* Payment Section */}
                  <div className="pt-6 border-t border-border">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
                      <div className="text-center sm:text-left">
                        <h3 className="font-semibold text-foreground">Consultation Fee</h3>
                        <p className="text-sm text-muted-foreground">One-time consultation fee</p>
                      </div>
                      <div className="text-center sm:text-right">
                        <div className="text-3xl md:text-4xl font-bold text-accent">{currency}{fee}</div>
                        <p className="text-sm text-muted-foreground">Inclusive of all taxes</p>
                      </div>
                    </div>

                    <Button 
                      type="submit" 
                      className="btn-gold w-full py-6 md:py-8 h-auto text-lg md:text-xl text-white shadow-2xl hover:scale-105 transition-all group"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        'Processing...'
                      ) : (
                        <div className="flex items-center justify-center">
                          <CreditCard className="mr-2 w-5 h-5 md:w-6 md:h-6" />
                          Pay {currency}{fee} & Book Consultation
                        </div>
                      )}
                    </Button>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mt-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        <span>Secured by Razorpay</span>
                      </div>
                      <span className="hidden sm:inline">•</span>
                      <span>Your data is encrypted</span>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="space-y-6 lg:sticky lg:top-24">
                {/* What You Get */}
                <div className="card-premium p-6">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-4">
                    What You'll Receive
                  </h3>
                  <div className="space-y-4">
                    <FeatureItem
                      icon={<Clock className="w-5 h-5" />}
                      title="24-Hour Response"
                      description="Detailed response within 24 hours"
                    />
                    <FeatureItem
                      icon={<CheckCircle className="w-5 h-5" />}
                      title="Case Analysis"
                      description="Thorough assessment of your legal matter"
                    />
                    <FeatureItem
                      icon={<ArrowRight className="w-5 h-5" />}
                      title="Action Steps"
                      description="Clear guidance on next steps"
                    />
                    <FeatureItem
                      icon={<Shield className="w-5 h-5" />}
                      title="Confidential"
                      description="100% confidential handling"
                    />
                  </div>
                </div>

                {/* Why Book Consultation? */}
                <div className="bg-navy rounded-lg p-6">
                  <h3 className="font-display text-lg font-semibold text-cream mb-3">
                    Why Book a Consultation?
                  </h3>
                  <p className="text-cream/70 text-sm leading-relaxed">
                    The nominal consultation fee ensures serious inquiries only, allowing 
                    us to dedicate time and expertise to provide you with meaningful, 
                    actionable legal guidance instead of generic responses.
                  </p>
                </div>

                {/* Note */}
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-amber-800 text-sm">
                    <strong>Note:</strong> This is an initial consultation. 
                    If you decide to proceed with legal representation, the 
                    consultation fee will be adjusted against the engagement fee.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

const FeatureItem = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) => (
  <div className="flex items-start gap-3">
    <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 text-accent">
      {icon}
    </div>
    <div>
      <h4 className="font-medium text-foreground text-sm">{title}</h4>
      <p className="text-muted-foreground text-xs">{description}</p>
    </div>
  </div>
);

export default Inquiry;
