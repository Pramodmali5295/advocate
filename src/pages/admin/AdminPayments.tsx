import { useState, useEffect } from 'react';
import { 
  CreditCard, 
  TrendingUp, 
  Calendar,
  Download,
  CheckCircle,
  XCircle,
  Clock,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { Inquiry } from '@/types/content';

interface PaymentData {
  id: string;
  inquiryId: string;
  clientName: string;
  amount: number;
  status: string;
  date: Date;
  razorpayId: string;
}

const statusConfig: Record<string, { icon: any; className: string; label: string }> = {
  'completed': { icon: CheckCircle, className: 'text-green-600 bg-green-100', label: 'Success' },
  'pending': { icon: Clock, className: 'text-amber-600 bg-amber-100', label: 'Pending' },
  'failed': { icon: XCircle, className: 'text-red-600 bg-red-100', label: 'Failed' },
};

const AdminPayments = () => {
  const [dateRange, setDateRange] = useState('month');
  const [payments, setPayments] = useState<PaymentData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const paymentData = snapshot.docs.map(doc => {
        const inq = doc.data() as Inquiry;
        return {
          id: `PAY-${doc.id.substring(0, 6).toUpperCase()}`,
          inquiryId: doc.id,
          clientName: inq.fullName || 'Unknown',
          amount: inq.amount || 0,
          status: inq.paymentStatus || 'pending',
          date: inq.createdAt ? ((inq.createdAt as any).toDate ? (inq.createdAt as any).toDate() : new Date(inq.createdAt)) : new Date(),
          razorpayId: (inq as any).razorpayId || 'N/A',
        };
      });
      setPayments(paymentData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const totalRevenue = payments
    .filter(p => p.status === 'completed')
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-6">
        <div className="admin-stat-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue ({dateRange})</p>
              <p className="text-2xl font-bold text-foreground">₹{totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Successful Payments</p>
              <p className="text-2xl font-bold text-foreground">
                {payments.filter(p => p.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Average Per Day</p>
              <p className="text-2xl font-bold text-foreground">₹{Math.round(totalRevenue / 30).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Export */}
      <div className="admin-card">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex gap-2">
            {['week', 'month', 'quarter', 'year'].map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  dateRange === range
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>

          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Payments Table */}
      <div className="admin-card !p-0 overflow-hidden">
        <div className="p-6 pb-0">
          <h3 className="font-display text-lg font-semibold text-foreground mb-4">
            Payment History
          </h3>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-accent" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px]">
              <thead>
                <tr className="table-header">
                  <th className="text-left py-3 px-4 rounded-l-lg whitespace-nowrap">Payment ID</th>
                  <th className="text-left py-3 px-4 whitespace-nowrap">Client</th>
                  <th className="text-left py-3 px-4 whitespace-nowrap">Consultation</th>
                  <th className="text-left py-3 px-4 whitespace-nowrap">Date & Time</th>
                  <th className="text-left py-3 px-4 whitespace-nowrap">Status</th>
                  <th className="text-right py-3 px-4 rounded-r-lg whitespace-nowrap">Amount</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => {
                  const conf = statusConfig[payment.status] || statusConfig['pending'];
                  const StatusIcon = conf.icon;
                  return (
                    <tr key={payment.id} className="table-row">
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div>
                          <span className="font-mono text-sm text-foreground block">
                            {payment.id}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {payment.razorpayId !== 'N/A' ? payment.razorpayId : 'No Ext ID'}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="font-medium text-foreground">{payment.clientName}</span>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="font-mono text-sm text-muted-foreground">
                          {payment.inquiryId.substring(0, 8)}...
                        </span>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="text-muted-foreground">
                          {payment.date instanceof Date && !isNaN(payment.date.getTime()) ? (
                            <>
                              {payment.date.toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                              <br />
                              <span className="text-xs">
                                {payment.date.toLocaleTimeString('en-IN', {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </span>
                            </>
                          ) : 'N/A'}
                        </span>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          conf.className
                        }`}>
                          <StatusIcon className="w-3 h-3" />
                          {conf.label}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right whitespace-nowrap">
                        <span className="font-semibold text-foreground">₹{payment.amount}</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            
            {payments.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No payments found matching your criteria.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Revenue Note */}
      <div className="admin-card bg-amber-50 border-amber-200">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <CreditCard className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <h4 className="font-medium text-amber-800 mb-1">Payment Gateway</h4>
            <p className="text-sm text-amber-700">
              Payments are processed through Razorpay. For refunds, disputes, or detailed 
              transaction logs, access your Razorpay Dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPayments;
