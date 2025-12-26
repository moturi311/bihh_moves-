import React, { useState } from 'react';
import { Search, Filter, CheckCircle, XCircle, Clock } from 'lucide-react';

interface Payment {
    id: string;
    booking_id: string;
    customer_name: string;
    amount: number;
    method: 'M-Pesa' | 'Cash' | 'Bank Transfer';
    status: 'pending' | 'completed' | 'failed' | 'refunded';
    transaction_id: string;
    created_at: string;
}

const PaymentsManager: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    // Mock data
    const mockPayments: Payment[] = [
        {
            id: 'PAY001',
            booking_id: 'BK001',
            customer_name: 'John Kamau',
            amount: 45000,
            method: 'M-Pesa',
            status: 'completed',
            transaction_id: 'MPESA123456',
            created_at: '2025-12-01 14:30'
        },
        {
            id: 'PAY002',
            booking_id: 'BK002',
            customer_name: 'Mary Wanjiku',
            amount: 32000,
            method: 'M-Pesa',
            status: 'pending',
            transaction_id: 'MPESA789012',
            created_at: '2025-12-01 15:45'
        },
        {
            id: 'PAY003',
            booking_id: 'BK003',
            customer_name: 'Peter Omondi',
            amount: 28000,
            method: 'M-Pesa',
            status: 'completed',
            transaction_id: 'MPESA345678',
            created_at: '2025-11-30 10:20'
        }
    ];

    const [payments] = useState<Payment[]>(mockPayments);

    const getStatusBadge = (status: Payment['status']) => {
        const styles = {
            pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', icon: Clock },
            completed: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle },
            failed: { bg: 'bg-red-100', text: 'text-red-800', icon: XCircle },
            refunded: { bg: 'bg-blue-100', text: 'text-blue-800', icon: CheckCircle }
        };
        const style = styles[status];
        const Icon = style.icon;
        return (
            <span className={`px-2 py-1 rounded text-xs font-medium ${style.bg} ${style.text} flex items-center gap-1 w-fit`}>
                <Icon className="w-3 h-3" />
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const filteredPayments = payments.filter(payment => {
        const matchesSearch =
            payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            payment.transaction_id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const totalRevenue = payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0);
    const pendingAmount = payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif text-[#2C2A26]">Payment Management</h2>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-[#D6D1C7]">
                    <p className="text-sm text-[#5D5A53] mb-1">Total Revenue</p>
                    <p className="text-2xl font-bold text-green-600">KSh {totalRevenue.toLocaleString()}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-[#D6D1C7]">
                    <p className="text-sm text-[#5D5A53] mb-1">Pending Payments</p>
                    <p className="text-2xl font-bold text-yellow-600">KSh {pendingAmount.toLocaleString()}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-[#D6D1C7]">
                    <p className="text-sm text-[#5D5A53] mb-1">Total Transactions</p>
                    <p className="text-2xl font-bold text-[#2C2A26]">{payments.length}</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex gap-4 flex-wrap">
                <div className="flex-1 min-w-[200px]">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A8A29E]" />
                        <input
                            type="text"
                            placeholder="Search payments..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-[#F5F2EB] border border-transparent focus:border-[#2C2A26] rounded-lg outline-none"
                        />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Filter className="w-5 h-5 text-[#5D5A53]" />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 bg-[#F5F2EB] border border-transparent focus:border-[#2C2A26] rounded-lg outline-none"
                    >
                        <option value="all">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                        <option value="failed">Failed</option>
                        <option value="refunded">Refunded</option>
                    </select>
                </div>
            </div>

            {/* Payments Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[#F5F2EB] border-b border-[#D6D1C7]">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#2C2A26] uppercase tracking-wider">Payment ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#2C2A26] uppercase tracking-wider">Booking</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#2C2A26] uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#2C2A26] uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#2C2A26] uppercase tracking-wider">Method</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#2C2A26] uppercase tracking-wider">Transaction ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#2C2A26] uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#2C2A26] uppercase tracking-wider">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#D6D1C7]">
                            {filteredPayments.map(payment => (
                                <tr key={payment.id} className="hover:bg-[#F5F2EB] transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2C2A26]">
                                        {payment.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2C2A26]">
                                        {payment.booking_id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2C2A26]">
                                        {payment.customer_name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#2C2A26]">
                                        KSh {payment.amount.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2C2A26]">
                                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                                            {payment.method}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#5D5A53] font-mono">
                                        {payment.transaction_id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {getStatusBadge(payment.status)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#5D5A53]">
                                        {payment.created_at}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PaymentsManager;
