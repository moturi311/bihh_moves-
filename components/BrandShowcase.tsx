import React from 'react';
import { useRealtimeBrands } from '../hooks/useRealtimeBrands';

const BrandShowcase: React.FC = () => {
    const { brands, loading } = useRealtimeBrands();

    if (loading && brands.length === 0) return null;
    if (brands.length === 0) return null;

    return (
        <section className="bg-white py-24 px-6 overflow-hidden border-b border-[#F5F2EB]">
            <div className="max-w-[1800px] mx-auto">
                <div className="text-center mb-16">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#A8A29E] block mb-4">Our Partners</span>
                    <h2 className="text-3xl md:text-5xl font-serif text-[#2C2A26]">Trusted Vehicle Brands</h2>
                    <div className="w-12 h-[1px] bg-[#D6D1C7] mx-auto mt-8"></div>
                </div>

                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60">
                    {brands.map((brand) => (
                        <div
                            key={brand.id}
                            className="group flex flex-col items-center gap-4 transition-all duration-500 hover:opacity-100 hover:scale-110"
                            title={brand.name}
                        >
                            <div className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500">
                                <img
                                    src={brand.logo}
                                    alt={brand.name}
                                    className="max-w-full max-h-full object-contain"
                                />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#2C2A26] opacity-0 group-hover:opacity-100 transition-opacity">
                                {brand.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BrandShowcase;
