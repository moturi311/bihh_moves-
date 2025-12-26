/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

const WhatsAppButton: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const phoneNumber = '254733590901'; // Kenya format: 254 + number without leading 0

    const handleSendMessage = () => {
        const textMessage = message || 'Hi! I need help with Bihh.';
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(textMessage)}`;
        window.open(whatsappUrl, '_blank');
        setMessage('');
        setIsOpen(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && message.trim()) {
            handleSendMessage();
        }
    };

    return (
        <div className="fixed bottom-6 left-6 z-50">
            {/* Chat Widget Container */}
            <div
                className={`mb-4 bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
                    }`}
                style={{ width: '360px', maxWidth: 'calc(100vw - 3rem)' }}
            >
                {/* Header */}
                <div className="bg-[#25D366] px-5 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                            <img
                                src="/assets/logo.jpg"
                                alt="Bihh Logo"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div>
                            <h3 className="text-white font-semibold text-base">Bihh Support</h3>
                            <p className="text-white/90 text-xs">Online</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-white/90 hover:text-white transition-colors"
                        aria-label="Close chat"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Messages Area */}
                <div className="bg-[#E5DDD5] p-4 min-h-[200px] max-h-[300px] overflow-y-auto">
                    {/* Welcome Message Bubble */}
                    <div className="flex items-start gap-2 mb-3">
                        <div className="flex-1">
                            <div className="bg-white rounded-lg rounded-tl-none px-4 py-3 shadow-sm">
                                <p className="text-[#2C2A26] text-sm leading-relaxed">
                                    Thanks for visiting our website! 👋
                                </p>
                                <p className="text-[#2C2A26] text-sm leading-relaxed mt-2">
                                    How can we help you today?
                                </p>
                                <span className="text-[#667781] text-xs mt-1 block">Just now</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Input Area */}
                <div className="bg-[#F0F0F0] px-4 py-3 flex items-center gap-2">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type a message..."
                        className="flex-1 bg-white rounded-full px-4 py-2 text-sm text-[#2C2A26] placeholder-[#667781] outline-none focus:ring-2 focus:ring-[#25D366]/30"
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={!message.trim()}
                        className="bg-[#25D366] hover:bg-[#20BA5A] disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-full p-2 transition-colors"
                        aria-label="Send message"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
                aria-label="Toggle WhatsApp chat"
            >
                {/* Pulse animation ring */}
                {!isOpen && <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></div>}

                {/* Icon - WhatsApp or Close */}
                {isOpen ? (
                    <svg className="w-8 h-8 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                ) : (
                    <svg
                        className="w-8 h-8 relative z-10"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                )}
            </button>
        </div>
    );
};

export default WhatsAppButton;
