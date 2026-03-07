import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Save, 
  CreditCard, 
  Building,
  Lock
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useContent } from '@/context/ContentContext';

const AdminSettings = () => {
  const { toast } = useToast();
  const { content, updateSettings } = useContent();
  
  const [settings, setSettings] = useState(content.settings);

  // Keep local state in sync if content changes elsewhere
  useEffect(() => {
    setSettings(content.settings);
  }, [content.settings]);

  const handleSave = () => {
    if (settings.phone.length !== 10) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid 10-digit phone number.",
        variant: "destructive"
      });
      return;
    }

    updateSettings(settings);
    toast({
      title: "Settings Saved",
      description: "Your business information and credentials have been updated successfully.",
    });
  };

  return (
    <div className="max-w-4xl space-y-8">
      {/* Business Information */}
      <div className="admin-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Building className="w-5 h-5 text-accent" />
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-foreground">
              Business Information
            </h2>
            <p className="text-sm text-muted-foreground">
              Your firm's public information
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="form-label">Firm Name</label>
            <input
              type="text"
              value={settings.firmName}
              onChange={(e) => setSettings({ ...settings, firmName: e.target.value })}
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">Lead Advocate Name</label>
            <input
              type="text"
              value={settings.advocateName}
              onChange={(e) => setSettings({ ...settings, advocateName: e.target.value })}
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">Email Address</label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => setSettings({ ...settings, email: e.target.value })}
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">Phone Number (10 Digits)</label>
            <input
              type="tel"
              value={settings.phone}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                setSettings({ ...settings, phone: val });
              }}
              className={`form-input ${settings.phone.length > 0 && settings.phone.length < 10 ? 'border-destructive' : ''}`}
              placeholder="Enter 10 digit number"
            />
            {settings.phone.length > 0 && settings.phone.length < 10 && (
              <p className="text-[10px] text-destructive mt-1 font-bold">
                Must be exactly 10 digits
              </p>
            )}
          </div>
          <div className="sm:col-span-2">
            <label className="form-label">Office Address</label>
            <textarea
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="form-input"
              rows={2}
            />
          </div>
        </div>
      </div>

      {/* Account Security */}
      <div className="admin-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Lock className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-foreground">
              Account Security
            </h2>
            <p className="text-sm text-muted-foreground">
              Manage your private admin login credentials
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="form-label">Login Username (Email)</label>
            <input
              type="text"
              value={settings.adminEmail || settings.email}
              onChange={(e) => setSettings({ ...settings, adminEmail: e.target.value })}
              className="form-input"
            />
             <p className="text-[10px] text-muted-foreground mt-1 uppercase font-bold">
              Private login username only
            </p>
          </div>
          <div>
            <label className="form-label">Login Password</label>
            <input
              type="text"
              value={settings.adminPassword || settings.phone}
              onChange={(e) => setSettings({ ...settings, adminPassword: e.target.value })}
              className="form-input font-mono"
            />
            <p className="text-xs text-muted-foreground mt-1 text-[10px] uppercase font-bold">
              Private login password only
            </p>
          </div>
        </div>
      </div>

      {/* Payment Settings */}
      <div className="admin-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h2 className="font-display text-lg font-semibold text-foreground">
              Payment Settings
            </h2>
            <p className="text-sm text-muted-foreground">
              Configure consultation fees and payment options
            </p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <label className="form-label">Consultation Fee (₹)</label>
            <input
              type="text"
              value={settings.inquiryFee === 0 ? '' : settings.inquiryFee}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, '');
                setSettings({ ...settings, inquiryFee: val === '' ? 0 : parseInt(val) });
              }}
              placeholder="0"
              className="form-input"
            />
          </div>
          <div>
            <label className="form-label">Currency</label>
            <select
              value={settings.currency}
              onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
              className="form-input"
            >
              <option value="INR">Indian Rupee (₹)</option>
              <option value="USD">US Dollar ($)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end gap-4">
        <Button 
          onClick={handleSave} 
          className="btn-gold px-8 py-6 h-auto text-lg"
        >
          <Save className="w-5 h-5 mr-2" />
          Save & Publish Settings
        </Button>
      </div>
    </div>
  );
};

export default AdminSettings;
