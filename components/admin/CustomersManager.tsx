import React, { useState } from 'react';
import { Search, Mail, Phone, Eye, MessageSquare } from 'lucide-react';

interface Customer {
    id: string;
    full_name: string;
    email: string;
    phone: string;
    total_bookings: number;
    total_spent: number;
    last_booking: string;
    created_at: string;
}

const CustomersManager: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

    // Mock data
    const mockCustomers: Customer[] = [
        {
            id: 'C001',
            full_name: 'John Kamau',
            email: 'john@example.com',
            phone: '+254712345678',
            total_bookings: 5,
            total_spent: 125000,
            last_booking: '2025-12-01',
            created_at: '2025-01-15'
        },
        {
            id: 'C002',
            full_name: 'Mary Wanjiku',
            email: 'mary@example.com',
            phone: '+254723456789',
            total_bookings: 3,
            total_spent: 78000,
            last_booking: '2025-11-28',
            created_at: '2025-03-22'
        },
        {
            id: 'C003',
            full_name: 'Peter Omondi',
            email: 'peter@example.com',
            phone: '+254734567890',
            total_bookings: 8,
            total_spent: 210000,
            last_booking: '2025-11-30',
            created_at: '2024-11-10'
        }
    ];

    const [customers] = useState<Customer[]>(mockCustomers);

    const filteredCustomers = customers.filter(customer =>
        customer.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.includes(searchTerm)
    );

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif text-[#2C2A26]">Customer Management</h2>
                <div className="text-sm text-[#5D5A53]">
                    Total: {filteredCustomers.length} customers
                </div>
            </div>

            {/* Search */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A8A29E]" />
                    <input
                        type="text"
                        placeholder="Search by name, email, or phone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-[#F5F2EB] border border-transparent focus:border-[#2C2A26] rounded-lg outline-none"
                    />
                </div>
            </div>

            {/* Customers Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[#F5F2EB] border-b border-[#D6D1C7]">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#2C2A26] uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#2C2A26] uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#2C2A26] uppercase tracking-wider">Bookings</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#2C2A26] uppercase tracking-wider">Total Spent</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#2C2A26] uppercase tracking-wider">Last Booking</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#2C2A26] uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#D6D1C7]">
                            {filteredCustomers.map(customer => (
                                <tr key={customer.id} className="hover:bg-[#F5F2EB] transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-[#2C2A26] text-[#F5F2EB] rounded-full flex items-center justify-center font-serif font-bold">
                                                {customer.full_name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-[#2C2A26]">{customer.full_name}</div>
                                                <div className="text-xs text-[#5D5A53]">ID: {customer.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-[#2C2A26] flex items-center gap-2">
                                            <Mail className="w-4 h-4 text-[#5D5A53]" />
                                            {customer.email}
                                        </div>
                                        <div className="text-sm text-[#5D5A53] flex items-center gap-2 mt-1">
                                            <Phone className="w-4 h-4" />
                                            {customer.phone}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2C2A26] font-semibold">
                                        {customer.total_bookings}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#2C2A26]">
                                        KSh {customer.total_spent.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#5D5A53]">
                                        {customer.last_booking}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => setSelectedCustomer(customer)}
                                                className="text-[#2C2A26] hover:text-black"
                                                title="View Details"
                                            >
                                                <Eye className="w-5 h-5" />
                                            </button>
                                            <button
                                                className="text-[#2C2A26] hover:text-black"
                                                title="Send Message"
                                            >
                                                <MessageSquare className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Customer Details Modal */}
            {selectedCustomer && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-[#D6D1C7] flex justify-between items-center">
                            <h3 className="text-xl font-serif text-[#2C2A26]">Customer Profile</h3>
                            <button onClick={() => setSelectedCustomer(null)} className="text-[#5D5A53] hover:text-[#2C2A26]">
                                ✕
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-[#2C2A26] text-[#F5F2EB] rounded-full flex items-center justify-center font-serif font-bold text-2xl">
                                    {selectedCustomer.full_name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-[#2C2A26]">{selectedCustomer.full_name}</h4>
                                    <p className="text-sm text-[#5D5A53]">Customer since {selectedCustomer.created_at}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-[#F5F2EB] p-4 rounded-lg">
                                    <p className="text-sm text-[#5D5A53]">Total Bookings</p>
                                    <p className="text-2xl font-bold text-[#2C2A26]">{selectedCustomer.total_bookings}</p>
                                </div>
                                <div className="bg-[#F5F2EB] p-4 rounded-lg">
                                    <p className="text-sm text-[#5D5A53]">Total Spent</p>
                                    <p className="text-2xl font-bold text-[#2C2A26]">KSh {selectedCustomer.total_spent.toLocaleString()}</p>
                                </div>
                            </div>

                            <div className="border-t border-[#D6D1C7] pt-4">
                                <h5 className="font-medium text-[#2C2A26] mb-3">Contact Information</h5>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm">
                                        <Mail className="w-4 h-4 text-[#5D5A53]" />
                                        <span className="text-[#2C2A26]">{selectedCustomer.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <Phone className="w-4 h-4 text-[#5D5A53]" />
                                        <span className="text-[#2C2A26]">{selectedCustomer.phone}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-[#D6D1C7] pt-4">
                                <h5 className="font-medium text-[#2C2A26] mb-3">Booking History</h5>
                                <p className="text-sm text-[#5D5A53]">Last booking: {selectedCustomer.last_booking}</p>
                                <p className="text-xs text-[#5D5A53] mt-2">Full booking history would be displayed here</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CustomersManager;
