import React, { useState } from 'react';
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react';
import { useRealtimeBrands } from '../../hooks/useRealtimeBrands';
import { uploadImage } from '../../utils/imageUpload';
import ImageUpload from './ImageUpload';

const BrandsManager: React.FC = () => {
    const { brands, loading, addBrand, deleteBrand, usingFallback } = useRealtimeBrands();
    const [isAdding, setIsAdding] = useState(false);
    const [uploading, setUploading] = useState(false);

    const [formData, setFormData] = useState({
        name: '',
        logo: '',
        description: ''
    });

    const handleLogoUpload = async (file: File) => {
        setUploading(true);
        const { url, error } = await uploadImage(file);
        if (url) {
            setFormData(prev => ({ ...prev, logo: url }));
        }
        setUploading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.logo) return alert('Please upload a brand logo');

        await addBrand(formData);
        setIsAdding(false);
        setFormData({
            name: '',
            logo: '',
            description: ''
        });
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-serif text-[#2C2A26]">Brand Management</h1>
                    <p className="text-[#5D5A53] mt-2">Manage the vehicle brands showcased on the platform.</p>
                </div>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="flex items-center gap-2 bg-[#2C2A26] text-white px-6 py-3 rounded-none hover:bg-[#444] transition-all"
                >
                    <Plus className="w-5 h-5" />
                    {isAdding ? 'Cancel' : 'Add Brand'}
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
                                <label className="block text-sm font-medium text-[#2C2A26] mb-2">Brand Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full bg-[#F5F2EB] border border-[#D6D1C7] px-4 py-3 outline-none focus:border-[#2C2A26]"
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="e.g. Toyota"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-[#2C2A26] mb-2">Description (Optional)</label>
                                <textarea
                                    className="w-full bg-[#F5F2EB] border border-[#D6D1C7] px-4 py-3 outline-none focus:border-[#2C2A26] h-24"
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Brief note about the brand..."
                                />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-[#2C2A26] mb-2">Brand Logo</label>
                                {formData.logo ? (
                                    <div className="relative w-32 h-32 bg-[#F5F2EB] border border-[#D6D1C7] flex items-center justify-center p-4">
                                        <img src={formData.logo} className="max-w-full max-h-full object-contain" alt="Preview" />
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, logo: '' })}
                                            className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <ImageUpload onUpload={handleLogoUpload} />
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={uploading}
                                className="w-full bg-[#2C2A26] text-white py-4 rounded-none hover:bg-[#444] transition-all disabled:opacity-50"
                            >
                                {uploading ? 'Processing Logo...' : 'Add Brand'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {brands.map((brand) => (
                    <div key={brand.id} className="bg-white group p-6 border border-[#EBE7DE] shadow-sm hover:shadow-md transition-all flex flex-col items-center relative">
                        <div className="w-20 h-20 mb-4 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all">
                            <img
                                src={brand.logo}
                                alt={brand.name}
                                className="max-w-full max-h-full object-contain"
                            />
                        </div>
                        <span className="text-sm font-medium text-[#2C2A26] text-center">{brand.name}</span>
                        <button
                            onClick={() => deleteBrand(brand.id)}
                            className="absolute top-2 right-2 p-1 text-red-600 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50"
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>

            {brands.length === 0 && !loading && (
                <div className="text-center py-20 border-2 border-dashed border-[#D6D1C7] rounded-xl">
                    <ImageIcon className="w-12 h-12 text-[#D6D1C7] mx-auto mb-4" />
                    <p className="text-[#A8A29E]">No brands added yet. Start by adding your first brand above.</p>
                </div>
            )}
        </div>
    );
};

export default BrandsManager;
