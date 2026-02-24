import { useState } from 'react';
import { useContent } from '@/context/ContentContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';
import { SectionCard, Field } from '../shared/AdminSectionComponents';

export const InquiryTab = () => {
  const { content, updateInquiryPage } = useContent();
  const { toast } = useToast();
  const [data, setData] = useState(content.inquiryPage);

  const save = () => {
    updateInquiryPage(data);
    toast({ title: 'Inquiry Page Saved', description: 'Changes are now live on the /inquiry page.' });
  };

  return (
    <div className="space-y-6">
      <SectionCard
        title="Page Header — Book Consultation"
        page="Inquiry Page ( /inquiry ) — top section"
        hint="This section controls the main banner at the top of the consultation booking page."
      >
        <div className="grid sm:grid-cols-1 gap-4">
          <Field label="Header Badge (small text at the very top)">
            <input className="form-input" value={data.badge} onChange={e => setData({ ...data, badge: e.target.value })} />
          </Field>
          <Field label="Main Hero Title (the primary H1 heading)">
            <input className="form-input" value={data.heroTitle} onChange={e => setData({ ...data, heroTitle: e.target.value })} />
          </Field>
          <Field label="Hero Subtitle (the text paragraph under the title)">
            <textarea className="form-input min-h-[80px]" value={data.heroSubtitle} onChange={e => setData({ ...data, heroSubtitle: e.target.value })} />
          </Field>
        </div>
      </SectionCard>

      <SectionCard
        title="Form Header"
        page="Inquiry Page ( /inquiry ) — form header"
        hint="This text appears directly above the consultation form fields."
      >
        <div className="grid sm:grid-cols-1 gap-4">
          <Field label="Form Heading">
            <input className="form-input" value={data.formTitle} onChange={e => setData({ ...data, formTitle: e.target.value })} />
          </Field>
          <Field label="Form Sub-heading">
            <textarea className="form-input min-h-[60px]" value={data.formSubtitle} onChange={e => setData({ ...data, formSubtitle: e.target.value })} />
          </Field>
        </div>
      </SectionCard>

      <div className="flex justify-end">
        <Button onClick={save} className="btn-gold"><Save className="w-4 h-4 mr-2" />Save & Publish Inquiry Page</Button>
      </div>
    </div>
  );
};
