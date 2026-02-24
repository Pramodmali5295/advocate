import { useState } from 'react';
import { useContent } from '@/context/ContentContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';
import { SectionCard, Field } from '../shared/AdminSectionComponents';

export const ContactTab = () => {
  const { content, updateContact } = useContent();
  const { toast } = useToast();
  const [data, setData] = useState(content.contact);

  const save = () => { updateContact(data); toast({ title: 'Contact Info Saved', description: 'Changes are now live on the Contact page.' }); };

  return (
    <div className="space-y-6">
      <SectionCard
        title="Page Header — Contact Us"
        page="Contact Page ( /contact ) — top section"
        hint="This section controls the main banner at the top of the Contact page."
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
        title="Office Contact Information"
        page="Contact Page ( /contact ) & Footer (all pages)"
        hint="These details appear on the /contact page in the info cards, AND also in the website footer shown on every page."
      >
        <div className="grid sm:grid-cols-2 gap-4">
          <Field
            label="Primary Mobile Number"
            hint="Shown in the header navbar and Contact page. Tap-to-call on mobile."
          >
            <input className="form-input" placeholder="+91 98765 43210" value={data.phone} onChange={e => setData({ ...data, phone: e.target.value })} />
          </Field>
          <Field
            label="Office / Landline Number (optional)"
            hint="Shown below the primary number on the Contact page."
          >
            <input className="form-input" placeholder="+91 11 2345 6789" value={data.officePhone} onChange={e => setData({ ...data, officePhone: e.target.value })} />
          </Field>
          <Field
            label="Primary Email Address"
            hint="Shown on the Contact page. Clicking it opens the user's mail app."
          >
            <input type="email" className="form-input" placeholder="info@advocatechambers.com" value={data.email} onChange={e => setData({ ...data, email: e.target.value })} />
          </Field>
          <Field
            label="Consultation / Inquiry Email Address"
            hint="A second email shown below the primary one, specifically for case inquiries."
          >
            <input type="email" className="form-input" placeholder="cases@advocatechambers.com" value={data.inquiryEmail} onChange={e => setData({ ...data, inquiryEmail: e.target.value })} />
          </Field>
        </div>

        <Field
          label="Full Office Address (shown in the 'Office Address' card on the Contact page)"
          hint="You can use newlines for multi-line address formatting."
        >
          <textarea className="form-input min-h-[80px]" placeholder={"Chamber No. 210, Lawyers' Chambers\nDistrict Court Complex, Dwarka\nNew Delhi - 110075"} value={data.address} onChange={e => setData({ ...data, address: e.target.value })} />
        </Field>

        <Field
          label="Office Working Hours (shown in the 'Office Hours' card on the Contact page)"
          hint='Use newlines for separate days, e.g. "Mon–Sat: 10:00 AM – 6:00 PM"'
        >
          <textarea className="form-input min-h-[80px]" placeholder={"Monday – Saturday: 10:00 AM – 6:00 PM\nSunday: Closed\n(Emergency consultations available)"} value={data.hours} onChange={e => setData({ ...data, hours: e.target.value })} />
        </Field>

        <Field
          label="Google Maps Embed URL (the interactive map shown on the Contact page)"
          hint='Go to Google Maps → search your office → click "Share" → "Embed a map" → copy the src="..." URL and paste it here.'
        >
          <input className="form-input text-xs font-mono" placeholder="https://www.google.com/maps/embed?pb=..." value={data.mapEmbed} onChange={e => setData({ ...data, mapEmbed: e.target.value })} />
        </Field>
      </SectionCard>

      <div className="flex justify-end">
        <Button onClick={save} className="btn-gold"><Save className="w-4 h-4 mr-2" />Save & Publish Contact Info</Button>
      </div>
    </div>
  );
};
