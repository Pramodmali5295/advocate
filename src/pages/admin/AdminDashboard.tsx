import { Link } from 'react-router-dom';
import { 
  FileText, 
  CreditCard, 
  TrendingUp,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

import { useContent } from '@/context/ContentContext';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot, limit } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { Inquiry } from '@/types/content';

const AdminDashboard = () => {
  const { content } = useContent();
  const fee = content.settings.inquiryFee;
  const currency = content.settings.currency === 'INR' ? '₹' : '$';

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
    { 
      title: 'Active (New)', 
      value: pendingCount.toString(), 
      change: 'Active', 
      changeType: 'up' as const,
      icon: TrendingUp,
      color: 'text-amber-600',
      bgColor: 'bg-amber-100',
    },
  ];

  const recentInquiries = inquiries.slice(0, 5);

  const statusConfig = {
    'pending': { icon: AlertCircle, className: 'badge-new', label: 'New' },
    'responded': { icon: Clock, className: 'badge-progress', label: 'In Progress' },
    'closed': { icon: CheckCircle, className: 'badge-closed', label: 'Closed' },
  };

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="admin-stat-card">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-10 h-10 sm:w-12 sm:h-12 ${stat.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color}`} />
              </div>
              <div className={`flex items-center gap-1 text-xs sm:text-sm font-medium ${
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
            <h3 className="text-xl sm:text-2xl font-bold text-foreground truncate">{stat.value}</h3>
            <p className="text-xs sm:text-sm text-muted-foreground truncate">{stat.title}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Inquiries */}
        <div className="lg:col-span-2 admin-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl font-semibold text-foreground">
              Recent Consultations
            </h2>
            <Link 
              to="/admin/inquiries"
              className="text-accent text-sm font-medium flex items-center gap-1 hover:gap-2 transition-all"
            >
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="table-header">
                  <th className="text-left py-3 px-4 rounded-l-lg">Sr No</th>
                  <th className="text-left py-3 px-4">Client</th>
                  <th className="text-left py-3 px-4">Category</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-right py-3 px-4 rounded-r-lg">Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentInquiries.map((inquiry, index) => {
                  const StatusIcon = statusConfig[inquiry.status as keyof typeof statusConfig]?.icon || AlertCircle;
                  return (
                    <tr key={inquiry.id} className="table-row">
                      <td className="py-4 px-4">
                        <span className="font-medium text-sm text-muted-foreground">
                          {inquiries.findIndex(i => i.id === inquiry.id) + 1}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="font-medium text-foreground">{inquiry.fullName}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-muted-foreground">{inquiry.category}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={statusConfig[inquiry.status as keyof typeof statusConfig].className}>
                          {statusConfig[inquiry.status as keyof typeof statusConfig]?.label || inquiry.status}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className="font-medium text-foreground">₹{inquiry.amount}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          {/* Inquiry Stats */}
          <div className="admin-card">
            <h3 className="font-display text-lg font-semibold text-foreground mb-4">
              Consultation Status
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                  <span className="text-sm text-muted-foreground">New</span>
                </div>
                <span className="font-semibold">{pendingCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-amber-500 rounded-full" />
                  <span className="text-sm text-muted-foreground">In Progress</span>
                </div>
                <span className="font-semibold">{respondedCount}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-sm text-muted-foreground">Closed</span>
                </div>
                <span className="font-semibold">{closedCount}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="admin-card">
            <h3 className="font-display text-lg font-semibold text-foreground mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Link
                to="/admin/inquiries"
                className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
              >
                <span className="text-sm font-medium">View New Consultations</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </Link>
              <Link
                to="/admin/services"
                className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
              >
                <span className="text-sm font-medium">Manage Services</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </Link>
              <Link
                to="/admin/settings"
                className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
              >
                <span className="text-sm font-medium">Settings</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
