import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Mail, 
  Phone, 
  MapPin,
  FileText,
  CreditCard,
  MoreVertical
} from 'lucide-react';

const mockClients = [
  { 
    id: 'CLT-001', 
    name: 'Rajesh Kumar', 
    email: 'rajesh@email.com',
    mobile: '+91 98765 43210',
    city: 'Delhi',
    totalInquiries: 3,
    totalPaid: 1497,
    lastConsultation: '2024-01-20',
  },
  { 
    id: 'CLT-002', 
    name: 'Priya Sharma', 
    email: 'priya@email.com',
    mobile: '+91 98765 43211',
    city: 'Gurgaon',
    totalInquiries: 2,
    totalPaid: 998,
    lastConsultation: '2024-01-19',
  },
  { 
    id: 'CLT-003', 
    name: 'Amit Singh', 
    email: 'amit@email.com',
    mobile: '+91 98765 43212',
    city: 'Noida',
    totalInquiries: 1,
    totalPaid: 499,
    lastConsultation: '2024-01-18',
  },
  { 
    id: 'CLT-004', 
    name: 'Sneha Patel', 
    email: 'sneha@email.com',
    mobile: '+91 98765 43213',
    city: 'Mumbai',
    totalInquiries: 4,
    totalPaid: 1996,
    lastConsultation: '2024-01-18',
  },
  { 
    id: 'CLT-005', 
    name: 'Vikram Rao', 
    email: 'vikram@email.com',
    mobile: '+91 98765 43214',
    city: 'Bangalore',
    totalInquiries: 2,
    totalPaid: 998,
    lastConsultation: '2024-01-17',
  },
];

const AdminClients = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredClients = mockClients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.mobile.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="admin-card">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search clients..."
            className="form-input pl-10"
          />
        </div>
      </div>

      {/* Clients Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <div key={client.id} className="admin-card">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <span className="text-accent font-semibold">
                    {client.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{client.name}</h3>
                  <p className="text-xs text-muted-foreground">{client.id}</p>
                </div>
              </div>
              <button className="p-2 hover:bg-muted rounded-lg">
                <MoreVertical className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>{client.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>{client.mobile}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{client.city}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-border grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                  <FileText className="w-4 h-4" />
                </div>
                <p className="font-semibold text-foreground">{client.totalInquiries}</p>
                <p className="text-xs text-muted-foreground">Consultations</p>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                  <CreditCard className="w-4 h-4" />
                </div>
                <p className="font-semibold text-foreground">₹{client.totalPaid}</p>
                <p className="text-xs text-muted-foreground">Total Paid</p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                Last consultation: {new Date(client.lastConsultation).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
              </span>
              <Button variant="ghost" size="sm" className="text-accent">
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <div className="admin-card text-center py-12">
          <p className="text-muted-foreground">No clients found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default AdminClients;
