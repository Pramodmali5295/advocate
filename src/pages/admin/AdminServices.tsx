import { PracticeAreasTab } from '@/components/admin/pages-tabs/PracticeAreasTab';

const AdminServices = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-bold text-foreground">Practice Areas Manager</h2>
        <p className="text-muted-foreground mt-1">
          Manage the legal services and practice areas offered by your firm. 
          Changes here will update both the Home page and the dedicated Practice Areas section.
        </p>
      </div>

      <div className="bg-card rounded-xl border border-border p-6">
        <PracticeAreasTab />
      </div>
    </div>
  );
};

export default AdminServices;
