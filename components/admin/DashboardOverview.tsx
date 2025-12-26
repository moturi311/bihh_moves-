import React from 'react';
import { Users, Car, Calendar, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const DashboardOverview: React.FC = () => {
    // Placeholder data - will be replaced with real data from Supabase
    const stats = [
        { label: 'Total Revenue', value: 'KES 0', change: '0%', trend: 'up', icon: DollarSign },
        { label: 'Active Bookings', value: '0', change: '0', trend: 'up', icon: Calendar },
        { label: 'Fleet Utilization', value: '0%', change: '0%', trend: 'up', icon: Car },
        { label: 'New Customers', value: '0', change: '0', trend: 'up', icon: Users },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-serif text-[#2C2A26]">Dashboard Overview</h1>
                <p className="text-[#5D5A53] mt-2">Welcome back, Admin. Here's what's happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-[#EBE7DE]">
                        <div className="flex items-start justify-between">
                            <div className="p-3 bg-[#F5F2EB] rounded-lg">
                                <stat.icon className="w-6 h-6 text-[#2C2A26]" />
                            </div>
                            <span className={`flex items-center text-sm font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                                }`}>
                                {stat.change}
                                {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4 ml-1" /> : <ArrowDownRight className="w-4 h-4 ml-1" />}
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-[#2C2A26] mt-4">{stat.value}</h3>
                        <p className="text-[#5D5A53] text-sm mt-1">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Recent Activity Placeholder */}
            <div className="bg-white rounded-xl shadow-sm border border-[#EBE7DE] overflow-hidden">
                <div className="px-6 py-4 border-b border-[#EBE7DE] flex justify-between items-center">
                    <h3 className="font-serif text-lg text-[#2C2A26]">Recent Bookings</h3>
                    <button className="text-sm text-[#5D5A53] hover:text-[#2C2A26]">View All</button>
                </div>
                <div className="p-6 text-center text-[#5D5A53] py-12">
                    <p>No recent bookings to display (Data connection pending)</p>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;
