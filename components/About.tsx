/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="bg-[#EBE7DE]">

      {/* Introduction / Story */}
      <div className="py-24 px-6 md:px-12 max-w-[1800px] mx-auto flex flex-col md:flex-row items-start gap-16 md:gap-32">
        <div className="md:w-1/3">
          <h2 className="text-4xl md:text-6xl font-serif text-[#2C2A26] leading-tight">
            The road is <br /> the destination.
          </h2>
          <p className="text-lg md:text-xl text-[#5D5A53] font-light leading-relaxed mb-8">
            Bihh was born from the vibrant energy of Nairobi and the serene beauty of the Kenyan landscape. We believe travel should be an experience, not just a commute.
          </p>
          <p className="text-lg md:text-xl text-[#5D5A53] font-light leading-relaxed mb-8">
            Whether you need a "Nganya" for a video shoot, a Land Cruiser for the Mara, or a sleek sedan for a business meeting, our fleet is curated for the Kenyan spirit. We combine luxury with local culture.
          </p>

          <div className="grid grid-cols-2 gap-8 mt-12">
            <div>
              <h3 className="text-xl font-serif text-[#2C2A26] mb-2">Culture</h3>
              <p className="text-[#5D5A53] font-light">Authentic Kenyan vibes, from the music to the art.</p>
            </div>
            <div>
              <h3 className="text-xl font-serif text-[#2C2A26] mb-2">Freedom</h3>
              <p className="text-[#5D5A53] font-light">Explore every corner of the country in comfort.</p>
            </div>
          </div>
        </div>
        <div className="md:w-2/3 max-w-2xl">
          <img
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1200"
            alt="Car on a scenic road"
            className="w-full h-[400px] object-cover grayscale contrast-[0.9] brightness-110 mt-12"
          />
          <p className="text-sm font-medium uppercase tracking-widest text-[#A8A29E] mt-4">
            Pacific Coast Highway, California
          </p>
        </div>
      </div>

      {/* Philosophy Blocks (Formerly Features) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
        <div className="order-2 lg:order-1 relative h-[500px] lg:h-auto overflow-hidden group">
          <img
            src="https://images.unsplash.com/photo-1593055497720-4d9437aa6071?auto=format&fit=crop&q=80&w=1200"
            alt="Car Interior"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
          />
        </div>
        <div className="order-1 lg:order-2 flex flex-col justify-center p-12 lg:p-24 bg-[#D6D1C7]">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#5D5A53] mb-6">Sanctuary</span>
          <h3 className="text-4xl md:text-5xl font-serif mb-8 text-[#2C2A26] leading-tight">
            A cabin of <br /> calm.
          </h3>
          <p className="text-lg text-[#5D5A53] font-light leading-relaxed mb-12 max-w-md">
            Every vehicle in our fleet is chosen for its interior serenity. Double-pane acoustic glass, active noise cancellation, and sustainable materials create a space where you can truly breathe.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
        <div className="flex flex-col justify-center p-12 lg:p-24 bg-[#2C2A26] text-[#F5F2EB]">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#A8A29E] mb-6">Freedom</span>
          <h3 className="text-4xl md:text-5xl font-serif mb-8 text-[#F5F2EB] leading-tight">
            Range without <br /> anxiety.
          </h3>
          <p className="text-lg text-[#A8A29E] font-light leading-relaxed mb-12 max-w-md">
            With ranges exceeding 400 miles and access to our exclusive network of rapid chargers, the horizon is yours to explore. We handle the logistics so you can focus on the drive.
          </p>
        </div>
        <div className="relative h-[500px] lg:h-auto overflow-hidden group">
          <img
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1200"
            alt="Road trip landscape"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105 brightness-90"
          />
        </div>
      </div>
    </section>
  );
};

export default About;