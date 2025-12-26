import React, { useState } from 'react';
import { FileText, CheckCircle, XCircle, Eye, Download } from 'lucide-react';

interface DriverVerification {
    id: string;
    driver_name: string;
    email: string;
    phone: string;
    license_number: string;
    license_expiry: string;
    id_number: string;
    status: 'pending' | 'approved' | 'rejected';
    submitted_at: string;
    documents: {
        license_front: string;
        license_back: string;
        id_front: string;
        id_back: string;
    };
}

const VerificationManager: React.FC = () => {
    const [selectedVerification, setSelectedVerification] = useState<DriverVerification | null>(null);

    // Mock data
    const mockVerifications: DriverVerification[] = [
        {
            id: 'VER001',
            driver_name: 'James Mwangi',
            email: 'james@example.com',
            phone: '+254745678901',
            license_number: 'DL123456',
            license_expiry: '2026-06-15',
            id_number: '12345678',
            status: 'pending',
            submitted_at: '2025-12-01 09:30',
            documents: {
                license_front: '/docs/license1.jpg',
                license_back: '/docs/license1b.jpg',
                id_front: '/docs/id1.jpg',
                id_back: '/docs/id1b.jpg'
            }
        },
        {
            id: 'VER002',
            driver_name: 'Sarah Njeri',
            email: 'sarah@example.com',
            phone: '+254756789012',
            license_number: 'DL789012',
            license_expiry: '2027-03-20',
            id_number: '87654321',
            status: 'approved',
            submitted_at: '2025-11-30 14:15',
            documents: {
                license_front: '/docs/license2.jpg',
                license_back: '/docs/license2b.jpg',
                id_front: '/docs/id2.jpg',
                id_back: '/docs/id2b.jpg'
            }
        }
    ];

    const [verifications, setVerifications] = useState<DriverVerification[]>(mockVerifications);

    const getStatusBadge = (status: DriverVerification['status']) => {
        const styles = {
            pending: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
            approved: { bg: 'bg-green-100', text: 'text-green-800' },
            rejected: { bg: 'bg-red-100', text: 'text-red-800' }
        };
        const style = styles[status];
        return (
            <span className={`px-2 py-1 rounded text-xs font-medium ${style.bg} ${style.text}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const handleApprove = (id: string) => {
        setVerifications(verifications.map(v =>
            v.id === id ? { ...v, status: 'approved' as const } : v
        ));
        setSelectedVerification(null);
    };

    const handleReject = (id: string) => {
        if (confirm('Are you sure you want to reject this verification?')) {
            setVerifications(verifications.map(v =>
                v.id === id ? { ...v, status: 'rejected' as const } : v
            ));
            setSelectedVerification(null);
        }
    };

    const pendingCount = verifications.filter(v => v.status === 'pending').length;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif text-[#2C2A26]">Driver Verification</h2>
                {pendingCount > 0 && (
                    <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                        {pendingCount} Pending
                    </span>
                )}
            </div>

            {/* Verifications Table */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-[#F5F2EB] border-b border-[#D6D1C7]">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#2C2A26] uppercase tracking-wider">Driver</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#2C2A26] uppercase tracking-wider">Contact</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#2C2A26] uppercase tracking-wider">License</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#2C2A26] uppercase tracking-wider">Expiry</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#2C2A26] uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#2C2A26] uppercase tracking-wider">Submitted</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-[#2C2A26] uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#D6D1C7]">
                            {verifications.map(verification => (
                                <tr key={verification.id} className="hover:bg-[#F5F2EB] transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-[#2C2A26]">{verification.driver_name}</div>
                                        <div className="text-xs text-[#5D5A53]">ID: {verification.id_number}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-[#2C2A26]">{verification.email}</div>
                                        <div className="text-xs text-[#5D5A53]">{verification.phone}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2C2A26] font-mono">
                                        {verification.license_number}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#5D5A53]">
                                        {verification.license_expiry}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {getStatusBadge(verification.status)}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-[#5D5A53]">
                                        {verification.submitted_at}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <button
                                            onClick={() => setSelectedVerification(verification)}
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

            {/* Verification Details Modal */}
            {selectedVerification && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b border-[#D6D1C7] flex justify-between items-center">
                            <h3 className="text-xl font-serif text-[#2C2A26]">Driver Verification Details</h3>
                            <button onClick={() => setSelectedVerification(null)} className="text-[#5D5A53] hover:text-[#2C2A26]">
                                ✕
                            </button>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm font-medium text-[#5D5A53]">Driver Name</label>
                                    <p className="text-[#2C2A26] font-semibold">{selectedVerification.driver_name}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-[#5D5A53]">Status</label>
                                    <div className="mt-1">{getStatusBadge(selectedVerification.status)}</div>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-[#5D5A53]">Email</label>
                                    <p className="text-[#2C2A26]">{selectedVerification.email}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-[#5D5A53]">Phone</label>
                                    <p className="text-[#2C2A26]">{selectedVerification.phone}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-[#5D5A53]">License Number</label>
                                    <p className="text-[#2C2A26] font-mono">{selectedVerification.license_number}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-[#5D5A53]">License Expiry</label>
                                    <p className="text-[#2C2A26]">{selectedVerification.license_expiry}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-[#5D5A53]">ID Number</label>
                                    <p className="text-[#2C2A26] font-mono">{selectedVerification.id_number}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-[#5D5A53]">Submitted</label>
                                    <p className="text-[#2C2A26]">{selectedVerification.submitted_at}</p>
                                </div>
                            </div>

                            <div className="border-t border-[#D6D1C7] pt-4">
                                <h4 className="font-medium text-[#2C2A26] mb-4">Uploaded Documents</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="border border-[#D6D1C7] rounded-lg p-4 text-center">
                                        <FileText className="w-12 h-12 mx-auto text-[#5D5A53] mb-2" />
                                        <p className="text-sm text-[#2C2A26] mb-2">License (Front)</p>
                                        <button className="text-xs text-[#2C2A26] hover:underline flex items-center gap-1 mx-auto">
                                            <Download className="w-3 h-3" />
                                            View Document
                                        </button>
                                    </div>
                                    <div className="border border-[#D6D1C7] rounded-lg p-4 text-center">
                                        <FileText className="w-12 h-12 mx-auto text-[#5D5A53] mb-2" />
                                        <p className="text-sm text-[#2C2A26] mb-2">License (Back)</p>
                                        <button className="text-xs text-[#2C2A26] hover:underline flex items-center gap-1 mx-auto">
                                            <Download className="w-3 h-3" />
                                            View Document
                                        </button>
                                    </div>
                                    <div className="border border-[#D6D1C7] rounded-lg p-4 text-center">
                                        <FileText className="w-12 h-12 mx-auto text-[#5D5A53] mb-2" />
                                        <p className="text-sm text-[#2C2A26] mb-2">ID (Front)</p>
                                        <button className="text-xs text-[#2C2A26] hover:underline flex items-center gap-1 mx-auto">
                                            <Download className="w-3 h-3" />
                                            View Document
                                        </button>
                                    </div>
                                    <div className="border border-[#D6D1C7] rounded-lg p-4 text-center">
                                        <FileText className="w-12 h-12 mx-auto text-[#5D5A53] mb-2" />
                                        <p className="text-sm text-[#2C2A26] mb-2">ID (Back)</p>
                                        <button className="text-xs text-[#2C2A26] hover:underline flex items-center gap-1 mx-auto">
                                            <Download className="w-3 h-3" />
                                            View Document
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {selectedVerification.status === 'pending' && (
                                <div className="flex gap-3 pt-4">
                                    <button
                                        onClick={() => handleApprove(selectedVerification.id)}
                                        className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <CheckCircle className="w-5 h-5" />
                                        Approve
                                    </button>
                                    <button
                                        onClick={() => handleReject(selectedVerification.id)}
                                        className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                                    >
                                        <XCircle className="w-5 h-5" />
                                        Reject
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VerificationManager;
