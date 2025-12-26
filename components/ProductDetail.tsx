/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import { Car } from '../types';

interface ProductDetailProps {
  product: Car;
  onBack: () => void;
  onAddToCart: (product: Car) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, onAddToCart }) => {
  return (
    <div className="pt-24 min-h-screen bg-[#F5F2EB] animate-fade-in-up">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 pb-24">

        {/* Breadcrumb / Back */}
        <button
          onClick={onBack}
          className="group flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#A8A29E] hover:text-[#2C2A26] transition-colors mb-8"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Back to Fleet
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

          {/* Left: Main Image Only */}
          <div className="flex flex-col gap-4">
            <div className="w-full aspect-[16/9] bg-[#EBE7DE] overflow-hidden">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover animate-fade-in-up"
              />
            </div>
            {/* Gallery Preview */}
            <div className="grid grid-cols-2 gap-4">
              {product.gallery?.map((img, idx) => (
                <div key={idx} className="aspect-[16/9] bg-[#EBE7DE] overflow-hidden">
                  <img src={img} alt={`${product.name} ${idx}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              ))}
            </div>
          </div>

          {/* Right: Details */}
          <div className="flex flex-col justify-center max-w-xl">
            <span className="text-sm font-medium text-[#A8A29E] uppercase tracking-widest mb-2">{product.category}</span>
            <h1 className="text-4xl md:text-5xl font-serif text-[#2C2A26] mb-4">{product.name}</h1>
            <span className="text-2xl font-light text-[#2C2A26] mb-8">KSh {product.pricePerDay.toLocaleString()} <span className="text-sm text-[#A8A29E]">/ day</span></span>

            <p className="text-[#5D5A53] leading-relaxed font-light text-lg mb-8 border-b border-[#D6D1C7] pb-8">
              {product.longDescription || product.description}
            </p>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              {product.specs.range && (
                <div>
                  <span className="block text-xs font-bold uppercase tracking-widest text-[#A8A29E] mb-1">Range</span>
                  <span className="text-xl text-[#2C2A26]">{product.specs.range}</span>
                </div>
              )}
              {product.specs.acceleration && (
                <div>
                  <span className="block text-xs font-bold uppercase tracking-widest text-[#A8A29E] mb-1">0-60 mph</span>
                  <span className="text-xl text-[#2C2A26]">{product.specs.acceleration}</span>
                </div>
              )}
              {product.specs.topSpeed && (
                <div>
                  <span className="block text-xs font-bold uppercase tracking-widest text-[#A8A29E] mb-1">Top Speed</span>
                  <span className="text-xl text-[#2C2A26]">{product.specs.topSpeed}</span>
                </div>
              )}
              <div>
                <span className="block text-xs font-bold uppercase tracking-widest text-[#A8A29E] mb-1">Seats</span>
                <span className="text-xl text-[#2C2A26]">{product.specs.seats}</span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button
                onClick={() => onAddToCart(product)}
                className="w-full py-5 bg-[#2C2A26] text-[#F5F2EB] uppercase tracking-widest text-sm font-medium hover:bg-[#433E38] transition-colors"
              >
                Reserve Dates
              </button>
              <ul className="mt-8 space-y-2 text-sm text-[#5D5A53]">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <span className="w-1 h-1 bg-[#2C2A26] rounded-full"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
