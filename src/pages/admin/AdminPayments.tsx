import { useState } from 'react';
import { 
  CreditCard, 
  TrendingUp, 
  Calendar,
  Download,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const mockPayments = [
  { 
    id: 'PAY-001', 
    inquiryId: 'CON-001',
    clientName: 'Rajesh Kumar',
    amount: 499,
    status: 'Success',
    date: '2024-01-20T10:30:00',
    razorpayId: 'pay_NBgQpL3qM5k7FR',
  },
  { 
    id: 'PAY-002', 
    inquiryId: 'INQ-002',
    clientName: 'Priya Sharma',
    amount: 499,
    status: 'Success',
    date: '2024-01-19T14:45:00',
    razorpayId: 'pay_NBgQpL3qM5k7FS',
  },
  { 
    id: 'PAY-003', 
    inquiryId: 'INQ-003',
    clientName: 'Amit Singh',
    amount: 499,
    status: 'Success',
    date: '2024-01-18T09:15:00',
    razorpayId: 'pay_NBgQpL3qM5k7FT',
  },
  { 
    id: 'PAY-004', 
    inquiryId: 'INQ-004',
    clientName: 'Sneha Patel',
    amount: 499,
    status: 'Success',
    date: '2024-01-18T16:20:00',
    razorpayId: 'pay_NBgQpL3qM5k7FU',
  },
  { 
    id: 'PAY-005', 
    inquiryId: 'INQ-005',
    clientName: 'Vikram Rao',
    amount: 499,
    status: 'Success',
    date: '2024-01-17T11:00:00',
    razorpayId: 'pay_NBgQpL3qM5k7FV',
  },
];

const statusConfig = {
  'Success': { icon: CheckCircle, className: 'text-green-600 bg-green-100' },
  'Pending': { icon: Clock, className: 'text-amber-600 bg-amber-100' },
  'Failed': { icon: XCircle, className: 'text-red-600 bg-red-100' },
};

const AdminPayments = () => {
  const [dateRange, setDateRange] = useState('month');

  const totalRevenue = mockPayments
    .filter(p => p.status === 'Success')
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
              <p className="text-sm text-muted-foreground">Total Revenue (This Month)</p>
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
                {mockPayments.filter(p => p.status === 'Success').length}
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
      <div className="admin-card overflow-hidden">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">
          Payment History
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="table-header">
                <th className="text-left py-3 px-4 rounded-l-lg">Payment ID</th>
                <th className="text-left py-3 px-4">Client</th>
                <th className="text-left py-3 px-4">Consultation</th>
                <th className="text-left py-3 px-4">Date & Time</th>
                <th className="text-left py-3 px-4">Status</th>
                <th className="text-right py-3 px-4 rounded-r-lg">Amount</th>
              </tr>
            </thead>
            <tbody>
              {mockPayments.map((payment) => {
                const StatusIcon = statusConfig[payment.status as keyof typeof statusConfig].icon;
                return (
                  <tr key={payment.id} className="table-row">
                    <td className="py-4 px-4">
                      <div>
                        <span className="font-mono text-sm text-foreground block">
                          {payment.id}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {payment.razorpayId}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-medium text-foreground">{payment.clientName}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-mono text-sm text-muted-foreground">
                        {payment.inquiryId}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-muted-foreground">
                        {new Date(payment.date).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                        <br />
                        <span className="text-xs">
                          {new Date(payment.date).toLocaleTimeString('en-IN', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        statusConfig[payment.status as keyof typeof statusConfig].className
                      }`}>
                        <StatusIcon className="w-3 h-3" />
                        {payment.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className="font-semibold text-foreground">₹{payment.amount}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
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
