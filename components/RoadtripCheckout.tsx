/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { JournalArticle } from '../types';

interface RoadtripCheckoutProps {
    trip: JournalArticle;
    onBack: () => void;
}

const RoadtripCheckout: React.FC<RoadtripCheckoutProps> = ({ trip, onBack }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        countryCode: '+254',
        phone: '',
        travelers: 1,
        date: '',
        specialRequests: '',
        mpesaNumber: ''
    });

    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const total = trip.price * formData.travelers;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = () => {
        setIsProcessing(true);
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
        }, 2000);
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen pt-24 pb-24 px-6 bg-[#1e3a8a] text-white animate-fade-in-up flex items-center justify-center">
                <div className="max-w-lg w-full bg-white/10 backdrop-blur-md p-12 rounded-lg border border-white/20 text-center">
                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                    </div>
                    <h2 className="text-3xl font-serif mb-4">Booking Received!</h2>
                    <p className="text-blue-200 mb-8 font-light">
                        Thank you, {formData.fullName}. We have received your request for <span className="font-medium text-white">{trip.title}</span>.
                    </p>
                    <p className="text-blue-200 mb-8 font-light text-sm">
                        An M-Pesa payment request for <span className="font-medium text-white">KSh {total.toLocaleString()}</span> has been sent to <span className="font-medium text-white">{formData.countryCode}{formData.mpesaNumber || formData.phone}</span>.
                        Please check your phone to complete the transaction.
                    </p>
                    <button
                        onClick={onBack}
                        className="px-8 py-3 bg-white text-blue-900 uppercase tracking-widest text-sm font-bold hover:bg-blue-50 transition-colors rounded"
                    >
                        Back to Roadtrips
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-24 px-6 bg-[#1e3a8a] text-white animate-fade-in-up">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={onBack}
                    className="group flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-blue-200 hover:text-white transition-colors mb-12"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                    Back to Roadtrips
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Trip Details */}
                    <div>
                        <div className="aspect-video overflow-hidden rounded-lg mb-8 bg-blue-900">
                            <img src={trip.image} alt={trip.title} className="w-full h-full object-cover opacity-80" />
                        </div>
                        <h1 className="text-4xl font-serif mb-4">{trip.title}</h1>
                        <p className="text-blue-200 font-light mb-6">{trip.excerpt}</p>

                        <div className="space-y-4 border-t border-white/20 pt-6">
                            <div className="flex justify-between">
                                <span className="text-sm uppercase tracking-widest text-blue-300">Duration</span>
                                <span className="font-medium">{trip.duration}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-sm uppercase tracking-widest text-blue-300">Price per Person</span>
                                <span className="font-medium">KSh {trip.price.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-xl font-serif pt-4 border-t border-white/20">
                                <span>Total</span>
                                <span>KSh {total.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Booking Form */}
                    <div className="bg-white/10 backdrop-blur-sm p-8 rounded-lg border border-white/10">
                        <h2 className="text-2xl font-serif mb-8">Book Your Adventure</h2>
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="fullName" className="block text-xs font-medium uppercase tracking-widest text-blue-200 mb-2">Full Name</label>
                                <input
                                    type="text"
                                    id="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    className="w-full bg-transparent border-b border-white/30 py-3 text-white placeholder-blue-300/50 outline-none focus:border-white transition-colors"
                                    placeholder="John Doe"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="email" className="block text-xs font-medium uppercase tracking-widest text-blue-200 mb-2">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full bg-transparent border-b border-white/30 py-3 text-white placeholder-blue-300/50 outline-none focus:border-white transition-colors"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-xs font-medium uppercase tracking-widest text-blue-200 mb-2">Phone</label>
                                    <div className="flex gap-2">
                                        <select
                                            id="countryCode"
                                            value={formData.countryCode}
                                            onChange={handleInputChange}
                                            className="bg-transparent border-b border-white/30 py-3 text-white outline-none focus:border-white transition-colors w-20"
                                        >
                                            <option value="+254" className="text-black">+254</option>
                                            <option value="+1" className="text-black">+1</option>
                                            <option value="+44" className="text-black">+44</option>
                                        </select>
                                        <input
                                            type="tel"
                                            id="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full bg-transparent border-b border-white/30 py-3 text-white placeholder-blue-300/50 outline-none focus:border-white transition-colors"
                                            placeholder="712 345 678"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="travelers" className="block text-xs font-medium uppercase tracking-widest text-blue-200 mb-2">Travelers</label>
                                    <input
                                        type="number"
                                        id="travelers"
                                        min="1"
                                        value={formData.travelers}
                                        onChange={handleInputChange}
                                        className="w-full bg-transparent border-b border-white/30 py-3 text-white placeholder-blue-300/50 outline-none focus:border-white transition-colors"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="date" className="block text-xs font-medium uppercase tracking-widest text-blue-200 mb-2">Preferred Date</label>
                                    <input
                                        type="date"
                                        id="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        className="w-full bg-transparent border-b border-white/30 py-3 text-white placeholder-blue-300/50 outline-none focus:border-white transition-colors"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="specialRequests" className="block text-xs font-medium uppercase tracking-widest text-blue-200 mb-2">Special Requests</label>
                                <textarea
                                    id="specialRequests"
                                    value={formData.specialRequests}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="w-full bg-transparent border-b border-white/30 py-3 text-white placeholder-blue-300/50 outline-none focus:border-white transition-colors resize-none"
                                    placeholder="Dietary requirements, pickup location..."
                                />
                            </div>

                            <div className="pt-6 border-t border-white/20">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="h-10 w-16 bg-green-600 text-white flex items-center justify-center font-bold text-xs tracking-widest rounded">M-PESA</div>
                                    <p className="text-xs text-blue-200">Secure mobile payment</p>
                                </div>
                                <input
                                    type="tel"
                                    id="mpesaNumber"
                                    value={formData.mpesaNumber}
                                    onChange={handleInputChange}
                                    placeholder="M-Pesa Number (if different)"
                                    className="w-full bg-transparent border-b border-white/30 py-3 text-white placeholder-blue-300/50 outline-none focus:border-white transition-colors"
                                />
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={isProcessing || !formData.fullName || !formData.email || !formData.phone}
                                className="w-full py-4 bg-white text-blue-900 uppercase tracking-widest text-sm font-bold hover:bg-blue-50 transition-colors disabled:opacity-50 mt-4"
                            >
                                {isProcessing ? 'Processing...' : 'Confirm Booking'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoadtripCheckout;
