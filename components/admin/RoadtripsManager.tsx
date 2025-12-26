import React, { useState } from 'react';
import { Plus, Trash2, Calendar, Clock, DollarSign, Image as ImageIcon } from 'lucide-react';
import { useRealtimeRoadtrips } from '../../hooks/useRealtimeRoadtrips';
import { uploadImage } from '../../utils/imageUpload';
import ImageUpload from './ImageUpload';

const RoadtripsManager: React.FC = () => {
    const { roadtrips, loading, addRoadtrip, deleteRoadtrip, usingFallback } = useRealtimeRoadtrips();
    const [isAdding, setIsAdding] = useState(false);
    const [uploading, setUploading] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        excerpt: '',
        content: '',
        image: '',
        price: 0,
        duration: '',
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    });

    const handleImageUpload = async (file: File) => {
        setUploading(true);
        const { url, error } = await uploadImage(file);
        if (url) {
            setFormData(prev => ({ ...prev, image: url }));
        }
        setUploading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.image) return alert('Please upload an image');

        await addRoadtrip(formData);
        setIsAdding(false);
        setFormData({
            title: '',
            excerpt: '',
            content: '',
            image: '',
            price: 0,
            duration: '',
            date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
        });
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-serif text-[#2C2A26]">Roadtrip Management</h1>
                    <p className="text-[#5D5A53] mt-2">Create and manage curated travel experiences.</p>
                </div>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="flex items-center gap-2 bg-[#2C2A26] text-white px-6 py-3 rounded-none hover:bg-[#444] transition-all"
                >
                    <Plus className="w-5 h-5" />
                    {isAdding ? 'Cancel' : 'Add Roadtrip'}
                </button>
            </div>

            {usingFallback && (
                <div className="bg-amber-50 border border-amber-200 p-4 text-amber-800 text-sm">
                    Operating in local development mode. Changes are saved to your browser only.
                </div>
            )}

            {isAdding && (
                <div className="bg-white p-8 rounded-xl shadow-sm border border-[#EBE7DE] animate-slide-up-fade">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-[#2C2A26] mb-2">Trip Title</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-[#F5F2EB] border border-[#D6D1C7] px-4 py-3 outline-none focus:border-[#2C2A26]"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="e.g. Weekend at the Mara"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#2C2A26] mb-2">Short Excerpt</label>
                                <textarea
                                    required
                                    className="w-full bg-[#F5F2EB] border border-[#D6D1C7] px-4 py-3 outline-none focus:border-[#2C2A26] h-24"
                                    value={formData.excerpt}
                                    onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                                    placeholder="Brief summary of the trip..."
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-[#2C2A26] mb-2">Price (KSh)</label>
                                    <input
                                        type="number"
                                        required
                                        className="w-full bg-[#F5F2EB] border border-[#D6D1C7] px-4 py-3 outline-none focus:border-[#2C2A26]"
                                        value={formData.price}
                                        onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-[#2C2A26] mb-2">Duration</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-[#F5F2EB] border border-[#D6D1C7] px-4 py-3 outline-none focus:border-[#2C2A26]"
                                        value={formData.duration}
                                        onChange={e => setFormData({ ...formData, duration: e.target.value })}
                                        placeholder="e.g. 3 Days"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-[#2C2A26] mb-2">Cover Image</label>
                                {formData.image ? (
                                    <div className="relative aspect-video bg-[#F5F2EB] border border-[#D6D1C7] overflow-hidden">
                                        <img src={formData.image} className="w-full h-full object-cover" alt="Preview" />
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, image: '' })}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <ImageUpload onUpload={handleImageUpload} />
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={uploading}
                                className="w-full bg-[#2C2A26] text-white py-4 rounded-none hover:bg-[#444] transition-all disabled:opacity-50"
                            >
                                {uploading ? 'Processing Image...' : 'Publish Roadtrip'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {roadtrips.map((trip) => (
                    <div key={trip.id} className="bg-white group overflow-hidden border border-[#EBE7DE] shadow-sm hover:shadow-md transition-all">
                        <div className="aspect-[4/3] relative overflow-hidden">
                            <img
                                src={trip.image}
                                alt={trip.title}
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                            <button
                                onClick={() => deleteRoadtrip(trip.id)}
                                className="absolute top-4 right-4 bg-white/90 p-2 text-red-600 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-[#A8A29E] mb-3">
                                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {trip.date}</span>
                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {trip.duration}</span>
                            </div>
                            <h3 className="text-xl font-serif text-[#2C2A26] mb-3">{trip.title}</h3>
                            <p className="text-[#5D5A53] text-sm line-clamp-2 mb-4 font-light leading-relaxed">
                                {trip.excerpt}
                            </p>
                            <div className="pt-4 border-t border-[#F5F2EB] flex items-center justify-between">
                                <span className="text-lg font-bold text-[#2C2A26]">KSh {trip.price.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {roadtrips.length === 0 && !loading && (
                <div className="text-center py-20 border-2 border-dashed border-[#D6D1C7] rounded-xl">
                    <ImageIcon className="w-12 h-12 text-[#D6D1C7] mx-auto mb-4" />
                    <p className="text-[#A8A29E]">No roadtrips available. Create your first experience above.</p>
                </div>
            )}
        </div>
    );
};

export default RoadtripsManager;
