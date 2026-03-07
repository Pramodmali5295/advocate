import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Mail, 
  Phone, 
  MapPin,
  FileText,
  CreditCard,
  MoreVertical,
  Loader2
} from 'lucide-react';

import { db } from '@/lib/firebase';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { Inquiry } from '@/types/content';

interface ClientData {
  id: string;
  name: string;
  email: string;
  mobile: string;
  city: string;
  totalInquiries: number;
  totalPaid: number;
  lastConsultation: Date;
}

const AdminClients = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [clients, setClients] = useState<ClientData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'inquiries'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const clientsMap = new Map<string, ClientData>();
      
      snapshot.docs.forEach(doc => {
        const inq = doc.data() as Inquiry;
        const key = inq.email || inq.mobile || doc.id;
        
        if (!clientsMap.has(key)) {
          clientsMap.set(key, {
            id: `CLT-${doc.id.substring(0, 6).toUpperCase()}`,
            name: inq.fullName || 'Unknown',
            email: inq.email || 'N/A',
            mobile: inq.mobile || 'N/A',
            city: inq.city || 'N/A',
            totalInquiries: 0,
            totalPaid: 0,
            lastConsultation: inq.createdAt ? ((inq.createdAt as any).toDate ? (inq.createdAt as any).toDate() : new Date(inq.createdAt)) : new Date(0)
          });
        }
        
        const client = clientsMap.get(key)!;
        client.totalInquiries += 1;
        
        if (inq.paymentStatus === 'completed') {
          client.totalPaid += inq.amount || 0;
        }
        
        const inqDate = inq.createdAt ? ((inq.createdAt as any).toDate ? (inq.createdAt as any).toDate() : new Date(inq.createdAt)) : new Date(0);
        if (inqDate > client.lastConsultation) {
          client.lastConsultation = inqDate;
        }
      });
      
      setClients(Array.from(clientsMap.values()));
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredClients = clients.filter(client =>
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

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-accent" />
        </div>
      ) : (
        <>
          {/* Clients Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClients.map((client) => (
              <div key={client.id} className="admin-card">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center truncate px-2">
                      <span className="text-accent font-semibold text-sm">
                        {client.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground max-w-[200px] truncate" title={client.name}>{client.name}</h3>
                      <p className="text-xs text-muted-foreground">{client.id}</p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-muted rounded-lg shrink-0">
                    <MoreVertical className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4 shrink-0" />
                    <span className="truncate" title={client.email}>{client.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4 shrink-0" />
                    <span className="truncate" title={client.mobile}>{client.mobile}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span className="truncate" title={client.city}>{client.city}</span>
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
                    Last consultation: {client.lastConsultation instanceof Date && !isNaN(client.lastConsultation.getTime()) ? client.lastConsultation.toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    }) : 'N/A'}
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
        </>
      )}
    </div>
  );
};

export default AdminClients;
