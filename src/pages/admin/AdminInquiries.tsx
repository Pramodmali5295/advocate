import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Filter, 
  Eye, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  ChevronDown,
  X
} from 'lucide-react';

import { useContent } from '@/context/ContentContext';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { Inquiry } from '@/types/content';

const statusConfig = {
  'pending': { icon: AlertCircle, className: 'badge-new', label: 'New' },
  'responded': { icon: Clock, className: 'badge-progress', label: 'In Progress' },
  'closed': { icon: CheckCircle, className: 'badge-closed', label: 'Closed' },
};

const AdminInquiries = () => {
  const { content } = useContent();
  const fee = content.settings.inquiryFee;
  const categories = ['All', ...content.practiceAreas.items.map(a => a.title), 'Other'];

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const inqData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Inquiry[];
      setInquiries(inqData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, 'inquiries', id), { status: newStatus });
    } catch (e) {
      console.error("Error updating status:", e);
    }
  };


  const statuses = ['All', 'pending', 'responded', 'closed'];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesSearch = inquiry.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          inquiry.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          inquiry.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || inquiry.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || inquiry.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="admin-card">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, ID, or email..."
              className="form-input pl-10"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="form-input appearance-none pr-10 min-w-[180px]"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat === 'All' ? 'All Categories' : cat}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="form-input appearance-none pr-10 min-w-[150px]"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>{status === 'All' ? 'All Status' : (statusConfig[status as keyof typeof statusConfig]?.label || status)}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Consultations Table */}
      <div className="admin-card !p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="table-header">
                <th className="text-left py-3 px-4 rounded-l-lg whitespace-nowrap">Sr No</th>
                <th className="text-left py-3 px-4 whitespace-nowrap">Client</th>
                <th className="text-left py-3 px-4 whitespace-nowrap">Category</th>
                <th className="text-left py-3 px-4 whitespace-nowrap">Date</th>
                <th className="text-left py-3 px-4 whitespace-nowrap">Status</th>
                <th className="text-right py-3 px-4 whitespace-nowrap">Amount</th>
                <th className="text-right py-3 px-4 rounded-r-lg whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInquiries.map((inquiry, index) => (
                <tr key={inquiry.id} className="table-row">
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="font-medium text-sm text-muted-foreground">
                      {inquiries.findIndex(i => i.id === inquiry.id) + 1}
                    </span>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div>
                      <span className="font-medium text-foreground block">{inquiry.fullName}</span>
                      <span className="text-sm text-muted-foreground">{inquiry.email}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="text-muted-foreground">{inquiry.category}</span>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="text-muted-foreground">
                      {inquiry.createdAt ? (inquiry.createdAt as any).toDate().toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric'
                      }) : 'Pending...'}
                    </span>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className={statusConfig[inquiry.status as keyof typeof statusConfig].className}>
                      {statusConfig[inquiry.status as keyof typeof statusConfig]?.label || inquiry.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right whitespace-nowrap">
                    <span className="font-medium text-foreground">₹{inquiry.amount}</span>
                  </td>
                  <td className="py-4 px-4 text-right whitespace-nowrap">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedInquiry(inquiry)}
                      className="text-accent hover:text-accent"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredInquiries.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No consultations found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50" 
            onClick={() => setSelectedInquiry(null)}
          />
          <div className="relative bg-card rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground">
                   Consultation Details
                </h2>
                <p className="text-sm text-muted-foreground">Case #{inquiries.findIndex(i => i.id === selectedInquiry.id) + 1}</p>
              </div>
              <button 
                onClick={() => setSelectedInquiry(null)}
                className="p-2 hover:bg-muted rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Status & Category */}
              <div className="flex items-center gap-4">
                <span className={statusConfig[selectedInquiry.status as keyof typeof statusConfig].className}>
                   {statusConfig[selectedInquiry.status as keyof typeof statusConfig]?.label || selectedInquiry.status}
                </span>
                <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs font-medium">
                  {selectedInquiry.category}
                </span>
              </div>

              {/* Client Info */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">Full Name</label>
                  <p className="font-medium text-foreground">{selectedInquiry.fullName}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Mobile</label>
                  <p className="font-medium text-foreground">{selectedInquiry.mobile}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Email</label>
                  <p className="font-medium text-foreground">{selectedInquiry.email}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">City</label>
                  <p className="font-medium text-foreground">{selectedInquiry.city}</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-sm text-muted-foreground">Case Description</label>
                <p className="mt-2 p-4 bg-muted rounded-lg text-foreground">
                  {selectedInquiry.description}
                </p>
              </div>

              {/* Payment Info */}
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-600">Payment Received</p>
                    <p className="font-semibold text-green-800">₹{selectedInquiry.amount}</p>
                  </div>
                  <p className="text-sm text-green-600">
                    {selectedInquiry.createdAt ? (selectedInquiry.createdAt as any).toDate().toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    }) : 'Pending...'}
                  </p>
                </div>
              </div>

              {/* Internal Notes logic removed for brevity or you can add it to Firestore */}

              {/* Actions */}
              <div className="flex gap-4">
                <Button 
                  className="btn-gold flex-1"
                  onClick={() => {
                    const next = selectedInquiry.status === 'pending' ? 'responded' : 'closed';
                    updateStatus(selectedInquiry.id, next);
                    setSelectedInquiry(null);
                  }}
                >
                  Mark as {selectedInquiry.status === 'pending' ? 'Responded' : 'Closed'}
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => setSelectedInquiry(null)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminInquiries;
