import React, { useState } from 'react';
import { Save, Bell, Globe, DollarSign, Clock } from 'lucide-react';

const SettingsManager: React.FC = () => {
    const [settings, setSettings] = useState({
        businessName: 'Bihh Premium Car Hire',
        email: 'info@bihh.co.ke',
        phone: '+254712345678',
        currency: 'KSh',
        timezone: 'Africa/Nairobi',
        businessHours: {
            start: '08:00',
            end: '18:00'
        },
        notifications: {
            emailBookings: true,
            smsBookings: true,
            emailPayments: true,
            smsPayments: false
        },
        mpesa: {
            consumerKey: '••••••••••••',
            consumerSecret: '••••••••••••',
            shortcode: '174379',
            passkey: '••••••••••••',
            environment: 'sandbox'
        }
    });

    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        // In real app, save to Supabase
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif text-[#2C2A26]">Settings</h2>
                <button
                    onClick={handleSave}
                    className="flex items-center gap-2 bg-[#2C2A26] text-[#F5F2EB] px-4 py-2 rounded-lg hover:bg-black transition-colors"
                >
                    <Save className="w-5 h-5" />
                    Save Changes
                </button>
            </div>

            {saved && (
                <div className="bg-green-100 text-green-800 p-3 rounded-lg mb-6 flex items-center gap-2">
                    <span>✓</span> Settings saved successfully!
                </div>
            )}

            <div className="space-y-6">
                {/* Business Information */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-serif text-[#2C2A26] mb-4 flex items-center gap-2">
                        <Globe className="w-5 h-5" />
                        Business Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-[#2C2A26] mb-2">Business Name</label>
                            <input
                                type="text"
                                value={settings.businessName}
                                onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
                                className="w-full px-4 py-2 bg-[#F5F2EB] border border-transparent focus:border-[#2C2A26] rounded-lg outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#2C2A26] mb-2">Email</label>
                            <input
                                type="email"
                                value={settings.email}
                                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                                className="w-full px-4 py-2 bg-[#F5F2EB] border border-transparent focus:border-[#2C2A26] rounded-lg outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#2C2A26] mb-2">Phone</label>
                            <input
                                type="tel"
                                value={settings.phone}
                                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                                className="w-full px-4 py-2 bg-[#F5F2EB] border border-transparent focus:border-[#2C2A26] rounded-lg outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#2C2A26] mb-2">Timezone</label>
                            <select
                                value={settings.timezone}
                                onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                                className="w-full px-4 py-2 bg-[#F5F2EB] border border-transparent focus:border-[#2C2A26] rounded-lg outline-none"
                            >
                                <option value="Africa/Nairobi">Africa/Nairobi (EAT)</option>
                                <option value="UTC">UTC</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Business Hours */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-serif text-[#2C2A26] mb-4 flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        Business Hours
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-[#2C2A26] mb-2">Opening Time</label>
                            <input
                                type="time"
                                value={settings.businessHours.start}
                                onChange={(e) => setSettings({
                                    ...settings,
                                    businessHours: { ...settings.businessHours, start: e.target.value }
                                })}
                                className="w-full px-4 py-2 bg-[#F5F2EB] border border-transparent focus:border-[#2C2A26] rounded-lg outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#2C2A26] mb-2">Closing Time</label>
                            <input
                                type="time"
                                value={settings.businessHours.end}
                                onChange={(e) => setSettings({
                                    ...settings,
                                    businessHours: { ...settings.businessHours, end: e.target.value }
                                })}
                                className="w-full px-4 py-2 bg-[#F5F2EB] border border-transparent focus:border-[#2C2A26] rounded-lg outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Notifications */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-serif text-[#2C2A26] mb-4 flex items-center gap-2">
                        <Bell className="w-5 h-5" />
                        Notification Preferences
                    </h3>
                    <div className="space-y-3">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.notifications.emailBookings}
                                onChange={(e) => setSettings({
                                    ...settings,
                                    notifications: { ...settings.notifications, emailBookings: e.target.checked }
                                })}
                                className="w-5 h-5 rounded border-[#D6D1C7] text-[#2C2A26] focus:ring-[#2C2A26]"
                            />
                            <span className="text-sm text-[#2C2A26]">Email notifications for new bookings</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.notifications.smsBookings}
                                onChange={(e) => setSettings({
                                    ...settings,
                                    notifications: { ...settings.notifications, smsBookings: e.target.checked }
                                })}
                                className="w-5 h-5 rounded border-[#D6D1C7] text-[#2C2A26] focus:ring-[#2C2A26]"
                            />
                            <span className="text-sm text-[#2C2A26]">SMS notifications for new bookings</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.notifications.emailPayments}
                                onChange={(e) => setSettings({
                                    ...settings,
                                    notifications: { ...settings.notifications, emailPayments: e.target.checked }
                                })}
                                className="w-5 h-5 rounded border-[#D6D1C7] text-[#2C2A26] focus:ring-[#2C2A26]"
                            />
                            <span className="text-sm text-[#2C2A26]">Email notifications for payments</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={settings.notifications.smsPayments}
                                onChange={(e) => setSettings({
                                    ...settings,
                                    notifications: { ...settings.notifications, smsPayments: e.target.checked }
                                })}
                                className="w-5 h-5 rounded border-[#D6D1C7] text-[#2C2A26] focus:ring-[#2C2A26]"
                            />
                            <span className="text-sm text-[#2C2A26]">SMS notifications for payments</span>
                        </label>
                    </div>
                </div>

                {/* M-Pesa Configuration */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h3 className="text-lg font-serif text-[#2C2A26] mb-4 flex items-center gap-2">
                        <DollarSign className="w-5 h-5" />
                        M-Pesa Configuration
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-[#2C2A26] mb-2">Consumer Key</label>
                            <input
                                type="password"
                                value={settings.mpesa.consumerKey}
                                className="w-full px-4 py-2 bg-[#F5F2EB] border border-transparent focus:border-[#2C2A26] rounded-lg outline-none"
                                placeholder="Enter consumer key"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#2C2A26] mb-2">Consumer Secret</label>
                            <input
                                type="password"
                                value={settings.mpesa.consumerSecret}
                                className="w-full px-4 py-2 bg-[#F5F2EB] border border-transparent focus:border-[#2C2A26] rounded-lg outline-none"
                                placeholder="Enter consumer secret"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#2C2A26] mb-2">Shortcode</label>
                            <input
                                type="text"
                                value={settings.mpesa.shortcode}
                                onChange={(e) => setSettings({
                                    ...settings,
                                    mpesa: { ...settings.mpesa, shortcode: e.target.value }
                                })}
                                className="w-full px-4 py-2 bg-[#F5F2EB] border border-transparent focus:border-[#2C2A26] rounded-lg outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#2C2A26] mb-2">Environment</label>
                            <select
                                value={settings.mpesa.environment}
                                onChange={(e) => setSettings({
                                    ...settings,
                                    mpesa: { ...settings.mpesa, environment: e.target.value }
                                })}
                                className="w-full px-4 py-2 bg-[#F5F2EB] border border-transparent focus:border-[#2C2A26] rounded-lg outline-none"
                            >
                                <option value="sandbox">Sandbox (Testing)</option>
                                <option value="production">Production (Live)</option>
                            </select>
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-[#2C2A26] mb-2">Passkey</label>
                            <input
                                type="password"
                                value={settings.mpesa.passkey}
                                className="w-full px-4 py-2 bg-[#F5F2EB] border border-transparent focus:border-[#2C2A26] rounded-lg outline-none"
                                placeholder="Enter passkey"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsManager;
