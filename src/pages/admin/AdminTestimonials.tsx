import { TestimonialsTab } from '@/components/admin/pages-tabs/TestimonialsTab';

const AdminTestimonials = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">Client Testimonials Manager</h2>
        <p className="text-muted-foreground mt-1">
          Manage the feedback from your clients. These testimonials are displayed on the 
          Home page carousel and the dedicated Testimonials page.
        </p>
      </div>

      <div className="bg-card rounded-xl border border-border p-6">
        <TestimonialsTab />
      </div>
    </div>
  );
};

export default AdminTestimonials;
