import { Link } from 'react-router-dom';
import { 
  Search,
  X,
  FileText, 
  CreditCard, 
  TrendingUp,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Clock,
  CheckCircle,
  AlertCircle,
  Eye,
  Trash2
} from 'lucide-react';

import { useContent } from '@/context/ContentContext';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Inquiry } from '@/types/content';
import { Button } from '@/components/ui/button';

const AdminDashboard = () => {
  const { content } = useContent();
  const fee = content.settings.inquiryFee;
  const currency = content.settings.currency === 'INR' ? '₹' : '$';

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

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

  const deleteInquiry = async (id: string) => {
    if (confirm('Are you sure you want to delete this consultation?')) {
      try {
        await deleteDoc(doc(db, 'inquiries', id));
      } catch (e) {
        console.error("Error deleting inquiry:", e);
      }
    }
  };

  const totalRevenue = inquiries
    .filter(i => i.paymentStatus === 'completed')
    .reduce((acc, current) => acc + (current.amount || fee), 0);

  const pendingCount = inquiries.filter(i => i.status === 'pending').length;
  const respondedCount = inquiries.filter(i => i.status === 'responded').length;
  const closedCount = inquiries.filter(i => i.status === 'closed').length;

  const stats = [
    { 
      title: 'Total Consultations', 
      value: inquiries.length.toString(), 
      change: '+100%', 
      changeType: 'up' as const,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    { 
      title: 'Total Revenue', 
      value: `${currency}${totalRevenue.toLocaleString()}`, 
      change: '+100%', 
      changeType: 'up' as const,
      icon: CreditCard,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
  ];

  const filteredInquiries = inquiries.filter(i => 
    i.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.mobile.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayInquiries = filteredInquiries;

  const statusConfig = {
    'pending': { icon: AlertCircle, className: 'badge-new', label: 'New' },
    'responded': { icon: Clock, className: 'badge-progress', label: 'In Progress' },
    'closed': { icon: CheckCircle, className: 'badge-closed', label: 'Closed' },
  };

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">

        {stats.map((stat) => (
          <div key={stat.title} className="admin-stat-card">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${
                stat.changeType === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.changeType === 'up' ? (
                  <ArrowUp className="w-4 h-4" />
                ) : (
                  <ArrowDown className="w-4 h-4" />
                )}
                {stat.change}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
            <p className="text-sm text-muted-foreground">{stat.title}</p>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        {/* Recent Inquiries */}
        <div className="admin-card !p-0 overflow-hidden flex flex-col">
          <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="font-display text-xl font-semibold text-foreground whitespace-nowrap">
              Recent Consultations
            </h2>
            
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search consultations..."
                className="w-full pl-10 pr-10 py-2 bg-muted/50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>


          <div className="overflow-auto max-h-[450px]">
            <table className="w-full min-w-[700px] border-separate border-spacing-0">
              <thead className="sticky top-0 z-20 bg-card">
                <tr className="table-header">
                  <th className="text-left py-3 px-4 rounded-tl-lg whitespace-nowrap bg-muted/50 border-b border-border">Sr No</th>
                  <th className="text-left py-3 px-4 whitespace-nowrap bg-muted/50 border-b border-border">Client Name</th>
                  <th className="text-left py-3 px-4 whitespace-nowrap bg-muted/50 border-b border-border">Contact No</th>
                  <th className="text-left py-3 px-4 whitespace-nowrap bg-muted/50 border-b border-border">Category</th>
                  <th className="text-left py-3 px-4 whitespace-nowrap bg-muted/50 border-b border-border">Amount</th>
                  <th className="text-right py-3 px-4 rounded-tr-lg whitespace-nowrap bg-muted/50 border-b border-border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayInquiries.map((inquiry, index) => {
                  return (
                    <tr key={inquiry.id} className="table-row">
                      <td className="py-2 px-4 whitespace-nowrap">
                        <span className="font-medium text-sm text-muted-foreground">
                          {inquiries.findIndex(i => i.id === inquiry.id) + 1}
                        </span>
                      </td>
                      <td className="py-2 px-4 whitespace-nowrap">
                        <span className="font-medium text-foreground">{inquiry.fullName}</span>
                      </td>
                      <td className="py-2 px-4 whitespace-nowrap">
                        <span className="text-muted-foreground">{inquiry.mobile}</span>
                      </td>
                      <td className="py-2 px-4 whitespace-nowrap">
                        <span className="text-muted-foreground">{inquiry.category}</span>
                      </td>
                      <td className="py-2 px-4 whitespace-nowrap">
                        <span className="font-medium text-foreground">₹{inquiry.amount}</span>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedInquiry(inquiry)}
                            className="p-2 text-accent hover:bg-accent/10 rounded-lg transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteInquiry(inquiry.id)}
                            className="p-2 text-red-500 hover:bg-red-50/50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/50" 
            onClick={() => setSelectedInquiry(null)}
          />
          <div className="relative bg-card rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-border">
            <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between z-10">
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground">
                   Consultation Details
                </h2>
                <p className="text-sm text-muted-foreground">ID: {selectedInquiry.id}</p>
              </div>
              <button 
                onClick={() => setSelectedInquiry(null)}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Client Name</label>
                  <p className="font-medium text-foreground text-lg">{selectedInquiry.fullName}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Contact Number</label>
                  <p className="font-medium text-foreground text-lg">{selectedInquiry.mobile}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email Address</label>
                  <p className="font-medium text-foreground">{selectedInquiry.email}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Category / Practice Area</label>
                  <p className="font-medium text-foreground">{selectedInquiry.category}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">City</label>
                  <p className="font-medium text-foreground">{selectedInquiry.city}</p>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Consultation Date</label>
                  <p className="font-medium text-foreground">
                    {selectedInquiry.createdAt ? (selectedInquiry.createdAt as any).toDate().toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    }) : 'Pending...'}
                  </p>
                </div>
              </div>

              <div className="divider h-px bg-border w-full" />

              <div>
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">Case Description</label>
                <div className="p-4 bg-muted/50 rounded-lg text-foreground border border-border italic leading-relaxed">
                  "{selectedInquiry.description}"
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <div className="px-3 py-1 bg-green-500/10 rounded-full flex items-center gap-2">
                   <div className="w-2 h-2 bg-green-500 rounded-full" />
                   <span className="text-xs font-semibold text-green-600 uppercase">Paid: ₹{selectedInquiry.amount}</span>
                </div>
              </div>
              <div className="flex gap-4 pt-4 border-t border-border mt-8">
                <Button variant="secondary" className="flex-1 bg-muted hover:bg-muted/80 text-foreground" onClick={() => setSelectedInquiry(null)}>
                  Close
                </Button>
                <Button variant="destructive" className="flex-1 bg-red-500 hover:bg-red-600 text-white border-0" onClick={() => {
                   deleteInquiry(selectedInquiry.id);
                   setSelectedInquiry(null);
                }}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

  );
};

export default AdminDashboard;
