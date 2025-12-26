
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import { Car } from '../types';

interface CheckoutProps {
  items: Car[];
  onBack: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ items, onBack }) => {
  const subtotal = items.reduce((sum, item) => sum + item.pricePerDay, 0);
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  const [formData, setFormData] = React.useState({
    fullName: '',
    email: '',
    newsletter: false,
    countryCode: '+254',
    mobileNumber: '',
    licenseNumber: '',
    licenseCountry: 'Kenya',
    idNumber: '',
    dob: '',
    hasAdditionalDriver: false,
    additionalDriverName: '',
    additionalDriverLicense: '',
    additionalDriverCountry: 'Kenya',
    mpesaNumber: ''
  });

  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value, type } = e.target;
    // Handle checkbox separately
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const [isSuccess, setIsSuccess] = React.useState(false);

  const handleSubmit = () => {
    setIsProcessing(true);
    // Mock payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-24 pb-24 px-6 bg-[#F5F2EB] animate-fade-in-up flex items-center justify-center">
        <div className="max-w-lg w-full bg-white p-12 rounded-none shadow-xl border border-[#D6D1C7] text-center">
          <div className="w-20 h-20 bg-[#2C2A26] rounded-full flex items-center justify-center mx-auto mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-10 h-10 text-[#F5F2EB]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h2 className="text-3xl font-serif text-[#2C2A26] mb-4">Reservation Received</h2>
          <p className="text-[#5D5A53] mb-8 font-light">
            Thank you, {formData.fullName}. We have received your reservation request.
          </p>
          <p className="text-[#5D5A53] mb-8 font-light text-sm">
            An M-Pesa payment request for <span className="font-medium text-[#2C2A26]">KSh {total.toLocaleString()}</span> has been sent to <span className="font-medium text-[#2C2A26]">{formData.countryCode}{formData.mpesaNumber || formData.mobileNumber}</span>.
            Please check your phone to complete the transaction.
          </p>
          <button
            onClick={onBack}
            className="px-8 py-3 bg-[#2C2A26] text-[#F5F2EB] uppercase tracking-widest text-sm font-medium hover:bg-[#444] transition-colors"
          >
            Back to Fleet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-24 px-6 bg-[#F5F2EB] animate-fade-in-up">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={onBack}
          className="group flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#A8A29E] hover:text-[#2C2A26] transition-colors mb-12"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Fleet
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left Column: Form */}
          <div>
            <h1 className="text-3xl font-serif text-[#2C2A26] mb-4">Car Hire Reservation Request</h1>
            <p className="text-sm text-[#5D5A53] mb-12">Complete your details to secure your vehicle.</p>

            <div className="space-y-12">
              {/* Section 1: Personal & Contact Information */}
              <div>
                <h2 className="text-xl font-serif text-[#2C2A26] mb-6">1. Personal & Contact Information</h2>
                <p className="text-xs text-[#A8A29E] mb-4 uppercase tracking-widest">Primary Renter Identification</p>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="fullName" className="block text-xs font-medium uppercase tracking-widest text-[#5D5A53] mb-2">Full Name (as per official ID)</label>
                    <input
                      type="text"
                      id="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b border-[#D6D1C7] py-3 text-[#2C2A26] placeholder-[#A8A29E] outline-none focus:border-[#2C2A26] transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-medium uppercase tracking-widest text-[#5D5A53] mb-2">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b border-[#D6D1C7] py-3 text-[#2C2A26] placeholder-[#A8A29E] outline-none focus:border-[#2C2A26] transition-colors mb-3"
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="newsletter"
                        checked={formData.newsletter}
                        onChange={handleInputChange}
                        className="accent-[#2C2A26]"
                      />
                      <label htmlFor="newsletter" className="text-sm text-[#5D5A53]">Send me special offers and travel tips.</label>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="mobileNumber" className="block text-xs font-medium uppercase tracking-widest text-[#5D5A53] mb-2">Mobile Number</label>
                    <div className="flex gap-4">
                      <select
                        id="countryCode"
                        value={formData.countryCode}
                        onChange={handleInputChange}
                        className="bg-transparent border-b border-[#D6D1C7] py-3 text-[#2C2A26] outline-none focus:border-[#2C2A26]"
                      >
                        <option value="+254">KE (+254)</option>
                        <option value="+1">US (+1)</option>
                        <option value="+44">UK (+44)</option>
                        <option value="+255">TZ (+255)</option>
                        <option value="+256">UG (+256)</option>
                      </select>
                      <input
                        type="tel"
                        id="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleInputChange}
                        placeholder="7XX XXX XXX"
                        className="flex-1 bg-transparent border-b border-[#D6D1C7] py-3 text-[#2C2A26] placeholder-[#A8A29E] outline-none focus:border-[#2C2A26] transition-colors"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Driver Identification & Verification */}
              <div>
                <h2 className="text-xl font-serif text-[#2C2A26] mb-6">2. Driver Identification & Verification</h2>
                <p className="text-xs text-[#A8A29E] mb-4 uppercase tracking-widest">Primary Driver's Details</p>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="licenseNumber" className="block text-xs font-medium uppercase tracking-widest text-[#5D5A53] mb-2">Driver's License Number</label>
                      <input
                        type="text"
                        id="licenseNumber"
                        value={formData.licenseNumber}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-b border-[#D6D1C7] py-3 text-[#2C2A26] outline-none focus:border-[#2C2A26] transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="licenseCountry" className="block text-xs font-medium uppercase tracking-widest text-[#5D5A53] mb-2">Country of Issue</label>
                      <select
                        id="licenseCountry"
                        value={formData.licenseCountry}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-b border-[#D6D1C7] py-3 text-[#2C2A26] outline-none focus:border-[#2C2A26]"
                      >
                        <option value="Kenya">Kenya</option>
                        <option value="USA">USA</option>
                        <option value="UK">UK</option>
                        <option value="Tanzania">Tanzania</option>
                        <option value="Uganda">Uganda</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="idNumber" className="block text-xs font-medium uppercase tracking-widest text-[#5D5A53] mb-2">ID/Passport Number</label>
                      <input
                        type="text"
                        id="idNumber"
                        value={formData.idNumber}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-b border-[#D6D1C7] py-3 text-[#2C2A26] outline-none focus:border-[#2C2A26] transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="dob" className="block text-xs font-medium uppercase tracking-widest text-[#5D5A53] mb-2">Date of Birth</label>
                      <input
                        type="date"
                        id="dob"
                        value={formData.dob}
                        onChange={handleInputChange}
                        className="w-full bg-transparent border-b border-[#D6D1C7] py-3 text-[#2C2A26] outline-none focus:border-[#2C2A26] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Additional Driver */}
                  <div className="pt-6 border-t border-[#D6D1C7]/50">
                    <div className="flex items-center gap-2 mb-6">
                      <input
                        type="checkbox"
                        id="hasAdditionalDriver"
                        checked={formData.hasAdditionalDriver}
                        onChange={handleInputChange}
                        className="accent-[#2C2A26]"
                      />
                      <label htmlFor="hasAdditionalDriver" className="text-sm font-medium text-[#2C2A26]">I will have an additional driver.</label>
                    </div>

                    {formData.hasAdditionalDriver && (
                      <div className="space-y-6 pl-4 border-l-2 border-[#D6D1C7] animate-fade-in-up">
                        <div>
                          <label htmlFor="additionalDriverName" className="block text-xs font-medium uppercase tracking-widest text-[#5D5A53] mb-2">Full Name</label>
                          <input
                            type="text"
                            id="additionalDriverName"
                            value={formData.additionalDriverName}
                            onChange={handleInputChange}
                            className="w-full bg-transparent border-b border-[#D6D1C7] py-3 text-[#2C2A26] outline-none focus:border-[#2C2A26] transition-colors"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label htmlFor="additionalDriverLicense" className="block text-xs font-medium uppercase tracking-widest text-[#5D5A53] mb-2">Driver's License Number</label>
                            <input
                              type="text"
                              id="additionalDriverLicense"
                              value={formData.additionalDriverLicense}
                              onChange={handleInputChange}
                              className="w-full bg-transparent border-b border-[#D6D1C7] py-3 text-[#2C2A26] outline-none focus:border-[#2C2A26] transition-colors"
                            />
                          </div>
                          <div>
                            <label htmlFor="additionalDriverCountry" className="block text-xs font-medium uppercase tracking-widest text-[#5D5A53] mb-2">Country of Issue</label>
                            <select
                              id="additionalDriverCountry"
                              value={formData.additionalDriverCountry}
                              onChange={handleInputChange}
                              className="w-full bg-transparent border-b border-[#D6D1C7] py-3 text-[#2C2A26] outline-none focus:border-[#2C2A26]"
                            >
                              <option value="Kenya">Kenya</option>
                              <option value="USA">USA</option>
                              <option value="UK">UK</option>
                              <option value="Tanzania">Tanzania</option>
                              <option value="Uganda">Uganda</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Section 3: Payment (M-Pesa) */}
              <div>
                <h2 className="text-xl font-serif text-[#2C2A26] mb-6">3. Payment Method</h2>
                <div className="p-6 border border-[#D6D1C7] bg-white/50 space-y-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-20 bg-green-600 text-white flex items-center justify-center font-bold tracking-widest rounded">M-PESA</div>
                    <p className="text-sm text-[#5D5A53]">Secure mobile payment</p>
                  </div>
                  <p className="text-sm text-[#5D5A53] mb-2">Enter your M-Pesa number below (if different from mobile number). You will receive a prompt on your phone.</p>
                  <div className="flex items-center gap-4">
                    <span className="text-[#2C2A26] font-medium">+254</span>
                    <input
                      type="tel"
                      id="mpesaNumber"
                      value={formData.mpesaNumber}
                      onChange={handleInputChange}
                      placeholder={formData.mobileNumber || "7XX XXX XXX"}
                      className="flex-1 bg-transparent border-b border-[#D6D1C7] py-3 text-[#2C2A26] placeholder-[#A8A29E] outline-none focus:border-[#2C2A26] transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div>
                <button
                  onClick={handleSubmit}
                  disabled={isProcessing || !formData.fullName || !formData.email || !formData.mobileNumber || !formData.licenseNumber}
                  className="w-full py-5 bg-[#2C2A26] text-[#F5F2EB] uppercase tracking-widest text-sm font-medium hover:bg-[#433E38] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Processing...' : `Pay with M-Pesa — KSh ${total.toLocaleString()}`}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Summary */}
          <div className="lg:pl-12 lg:border-l border-[#D6D1C7]">
            <h2 className="text-xl font-serif text-[#2C2A26] mb-8">Reservation Summary</h2>

            <div className="space-y-6 mb-8">
              {items.map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-16 h-16 bg-[#EBE7DE] relative">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                    <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#2C2A26] text-white text-[10px] flex items-center justify-center rounded-full">1</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-[#2C2A26] text-base">{item.name}</h3>
                    <p className="text-xs text-[#A8A29E]">{item.category}</p>
                  </div>
                  <span className="text-sm text-[#5D5A53]">KSh {item.pricePerDay.toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-[#D6D1C7] pt-6 space-y-2">
              <div className="flex justify-between text-sm text-[#5D5A53]">
                <span>Subtotal</span>
                <span>${subtotal}</span>
              </div>
              <div className="flex justify-between text-sm text-[#5D5A53]">
                <span>Shipping</span>
                <span>Free</span>
              </div>
            </div>

            <div className="border-t border-[#D6D1C7] mt-6 pt-6">
              <div className="flex justify-between items-center">
                <span className="font-serif text-xl text-[#2C2A26]">Total</span>
                <div className="flex items-end gap-2">
                  <span className="text-xs text-[#A8A29E] mb-1">KES</span>
                  <span className="font-serif text-2xl text-[#2C2A26]">KSh {total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;