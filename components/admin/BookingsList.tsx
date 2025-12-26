import React, { useState } from 'react';
import { Search, Filter, Eye, X, Calendar, User, Car as CarIcon } from 'lucide-react';
import { Booking } from '../../types';
import { useRealtimeBookings } from '../../hooks/useRealtimeBookings';

const BookingsList: React.FC = () => {
    const { bookings, loading, error, updateBookingStatus } = useRealtimeBookings();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

    const getStatusBadge = (status: Booking['status']) => {
        const styles = {
            pending: 'bg-yellow-100 text-yellow-800',
            confirmed: 'bg-green-100 text-green-800',
            completed: 'bg-gray-100 text-gray-800',
            cancelled: 'bg-red-100 text-red-800'
        };
        return (
            <span className={`px-2 py-1 rounded text-xs font-medium ${styles[status]}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const getPaymentBadge = (status: Booking['payment_status']) => {
        const styles = {
            pending: 'bg-orange-100 text-orange-800',
            paid: 'bg-green-100 text-green-800',
            refunded: 'bg-blue-100 text-blue-800'
        };
        return (
            <span className={`px-2 py-1 rounded text-xs font-medium ${styles[status]}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const filteredBookings = bookings.filter(booking => {
        const matchesSearch =
            booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.customer?.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.vehicle?.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif text-[#2C2A26]">Bookings Management</h2>
                <div className="text-sm text-[#5D5A53]">
                    Total: {filteredBookings.length} bookings
                </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex gap-4 flex-wrap">
                <div className="flex-1 min-w-[200px]">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A8A29E]" />
                        <input
                            type="text"
                            placeholder="Search by ID, customer, or vehicle..."
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
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[#F5F2EB] border-b border-[#D6D1C7]">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#2C2A26] uppercase tracking-wider">Booking ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#2C2A26] uppercase tracking-wider">Customer</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#2C2A26] uppercase tracking-wider">Vehicle</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#2C2A26] uppercase tracking-wider">Dates</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#2C2A26] uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#2C2A26] uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#2C2A26] uppercase tracking-wider">Payment</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#2C2A26] uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#D6D1C7]">
                            {filteredBookings.map(booking => (
                                <tr key={booking.id} className="hover:bg-[#F5F2EB] transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#2C2A26]">
                                        {booking.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-[#2C2A26]">{booking.customer?.full_name}</div>
                                        <div className="text-xs text-[#5D5A53]">{booking.customer?.phone}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2C2A26]">
                                        {booking.vehicle?.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#5D5A53]">
                                        <div>{booking.start_date}</div>
                                        <div>to {booking.end_date}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#2C2A26]">
                                        KSh {booking.total_amount.toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {getStatusBadge(booking.status)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {getPaymentBadge(booking.payment_status)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <button
                                            onClick={() => setSelectedBooking(booking)}
                                            className="text-[#2C2A26] hover:text-black"
                                        >
                                            <Eye className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Booking Details Modal */}
            {selectedBooking && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-[#D6D1C7] flex justify-between items-center">
                            <h3 className="text-xl font-serif text-[#2C2A26]">Booking Details</h3>
                            <button onClick={() => setSelectedBooking(null)} className="text-[#5D5A53] hover:text-[#2C2A26]">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-[#5D5A53]">Booking ID</label>
                                    <p className="text-[#2C2A26] font-semibold">{selectedBooking.id}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-[#5D5A53]">Created</label>
                                    <p className="text-[#2C2A26]">{selectedBooking.created_at}</p>
                                </div>
                            </div>

                            <div className="border-t border-[#D6D1C7] pt-4">
                                <h4 className="font-medium text-[#2C2A26] mb-3 flex items-center gap-2">
                                    <User className="w-5 h-5" />
                                    Customer Information
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-[#5D5A53]">Name</label>
                                        <p className="text-[#2C2A26]">{selectedBooking.customer?.full_name}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-[#5D5A53]">Email</label>
                                        <p className="text-[#2C2A26]">{selectedBooking.customer?.email}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-[#5D5A53]">Phone</label>
                                        <p className="text-[#2C2A26]">{selectedBooking.customer?.phone}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-[#D6D1C7] pt-4">
                                <h4 className="font-medium text-[#2C2A26] mb-3 flex items-center gap-2">
                                    <CarIcon className="w-5 h-5" />
                                    Vehicle Information
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-[#5D5A53]">Vehicle</label>
                                        <p className="text-[#2C2A26]">{selectedBooking.vehicle?.name}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-[#5D5A53]">Category</label>
                                        <p className="text-[#2C2A26]">{selectedBooking.vehicle?.category}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-[#5D5A53]">Daily Rate</label>
                                        <p className="text-[#2C2A26]">KSh {selectedBooking.vehicle?.pricePerDay.toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-[#D6D1C7] pt-4">
                                <h4 className="font-medium text-[#2C2A26] mb-3 flex items-center gap-2">
                                    <Calendar className="w-5 h-5" />
                                    Booking Details
                                </h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-[#5D5A53]">Start Date</label>
                                        <p className="text-[#2C2A26]">{selectedBooking.start_date}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-[#5D5A53]">End Date</label>
                                        <p className="text-[#2C2A26]">{selectedBooking.end_date}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-[#5D5A53]">Total Amount</label>
                                        <p className="text-[#2C2A26] font-semibold text-lg">KSh {selectedBooking.total_amount.toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-[#5D5A53]">Status</label>
                                        <div className="mt-1">{getStatusBadge(selectedBooking.status)}</div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-[#5D5A53]">Payment Status</label>
                                        <div className="mt-1">{getPaymentBadge(selectedBooking.payment_status)}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button className="flex-1 bg-[#2C2A26] text-[#F5F2EB] py-2 rounded-lg hover:bg-black transition-colors">
                                    Confirm Booking
                                </button>
                                <button className="flex-1 border border-[#D6D1C7] text-[#2C2A26] py-2 rounded-lg hover:bg-[#F5F2EB] transition-colors">
                                    Cancel Booking
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingsList;
