import React, { useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import {
    LogOut,
    LayoutDashboard,
    Car,
    Calendar,
    Users,
    Settings,
    Menu,
    X,
    CreditCard,
    FileCheck,
    Map,
    Award
} from 'lucide-react';
import { ViewState } from '../../types';

interface AdminLayoutProps {
    children: React.ReactNode;
    onLogout: () => void;
    currentView: ViewState['type'];
    onNavigate: (view: ViewState['type']) => void;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, onLogout, currentView, onNavigate }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        onLogout();
    };

    const navItems = [
        { id: 'admin-dashboard', label: 'Overview', icon: LayoutDashboard },
        { id: 'admin-bookings', label: 'Bookings', icon: Calendar },
        { id: 'admin-vehicles', label: 'Fleet', icon: Car },
        { id: 'admin-roadtrips', label: 'Roadtrips', icon: Map },
        { id: 'admin-brands', label: 'Brands', icon: Award },
        { id: 'admin-customers', label: 'Customers', icon: Users },
        { id: 'admin-payments', label: 'Payments', icon: CreditCard }, // Future
        { id: 'admin-verification', label: 'Verification', icon: FileCheck }, // Future
        { id: 'admin-settings', label: 'Settings', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-[#F5F2EB] flex">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#2C2A26] text-[#F5F2EB] transition-transform duration-300 ease-in-out flex flex-col
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <div className="p-6 border-b border-[#403D39] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="font-serif text-xl font-medium">Bihh Admin</span>
                    </div>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-[#D6D1C7]">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = currentView === item.id;
                        return (
                            <button
                                key={item.id}
                                onClick={() => {
                                    onNavigate(item.id as ViewState['type']);
                                    setSidebarOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                                    ? 'bg-[#F5F2EB] text-[#2C2A26]'
                                    : 'text-[#D6D1C7] hover:bg-[#403D39] hover:text-white'
                                    }`}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.label}
                            </button>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-[#403D39]">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-[#403D39] transition-colors"
                    >
                        <LogOut className="w-5 h-5" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Top Header */}
                <header className="bg-white border-b border-[#EBE7DE] px-6 py-4 flex items-center justify-between">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="lg:hidden text-[#2C2A26]"
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    <div className="flex items-center gap-4 ml-auto">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-medium text-[#2C2A26]">Admin User</p>
                            <p className="text-xs text-[#5D5A53]">Super Admin</p>
                        </div>
                        <div className="w-10 h-10 bg-[#F5F2EB] rounded-full flex items-center justify-center text-[#2C2A26] font-serif font-bold border border-[#D6D1C7]">
                            A
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
