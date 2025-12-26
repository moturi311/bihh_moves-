/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import { JournalArticle } from '../types';
import { useRealtimeRoadtrips } from '../hooks/useRealtimeRoadtrips';

interface JournalProps {
  onArticleClick: (article: JournalArticle) => void;
  onBookTrip: (article: JournalArticle) => void;
}

const Journal: React.FC<JournalProps> = ({ onArticleClick, onBookTrip }) => {
  const { roadtrips, loading } = useRealtimeRoadtrips();

  if (loading && roadtrips.length === 0) {
    return (
      <section id="journal" className="bg-[#2C2A26] py-32 px-6 text-center text-white/50">
        <p className="font-serif italic text-xl">Discovering new horizons...</p>
      </section>
    );
  }

  if (roadtrips.length === 0) {
    return (
      <section id="journal" className="bg-[#2C2A26] py-32 px-6 text-center text-white/50">
        <p className="font-serif italic text-xl">Our next collection of roadtrips is coming soon.</p>
      </section>
    );
  }

  return (
    <section id="journal" className="bg-[#2C2A26] py-32 px-6 md:px-12 text-white">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 pb-8 border-b border-white/20">
          <div>
            <span className="block text-xs font-bold uppercase tracking-[0.2em] text-[#D6D1C7] mb-4">Experiences</span>
            <h2 className="text-4xl md:text-6xl font-serif text-white">Curated Roadtrips</h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {roadtrips.map((article) => (
            <div key={article.id} className="group cursor-pointer flex flex-col text-left">
              <div className="w-full aspect-[4/3] overflow-hidden mb-8 bg-[#1A1816] relative" onClick={() => onArticleClick(article)}>
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onBookTrip(article);
                  }}
                  className="absolute bottom-4 right-4 bg-white text-[#2C2A26] px-4 py-2 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-[#F5F2EB]"
                >
                  Book Trip
                </button>
              </div>
              <div className="flex flex-col flex-1 text-left">
                <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-widest text-[#D6D1C7] mb-3">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.duration}</span>
                </div>
                <h3 className="text-2xl font-serif text-white mb-4 leading-tight group-hover:underline decoration-1 underline-offset-4">{article.title}</h3>
                <p className="text-[#A8A29E] font-light leading-relaxed mb-6 line-clamp-2">{article.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold bg-[#F5F2EB] text-[#2C2A26] px-3 py-1">KSh {article.price.toLocaleString()}</span>
                  <button className="text-sm font-medium uppercase tracking-widest text-white border-b border-white/50 pb-1 hover:border-white transition-colors">
                    View Itinerary
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Journal;
