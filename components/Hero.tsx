/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';

const Hero: React.FC = () => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      // Manual scroll calculation to account for fixed header
      const headerOffset = 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      // Update URL hash without jumping, safely ignoring errors in sandboxed environments
      try {
        window.history.pushState(null, '', `#${targetId}`);
      } catch (err) {
        // Ignore SecurityError in restricted environments
      }
    }
  };

  return (
    <section className="relative w-full h-screen min-h-[800px] overflow-hidden bg-[#D6D1C7]">

      {/* Background Video - YouTube */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full min-w-full min-h-full"
          style={{
            width: 'max(100vw, calc(100vh * (16/9)))',
            height: 'max(100vh, calc(100vw * (9/16)))'
          }}>
          <iframe
            src="https://www.youtube.com/embed/wLd3dfix2B8?autoplay=1&mute=1&loop=1&playlist=wLd3dfix2B8&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3"
            title="Hero background video"
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            allow="autoplay; encrypted-media"
            frameBorder="0"
          />
        </div>
        {/* Warmer Brown Overlay for Richness */}
        <div className="absolute inset-0 bg-[#433E38]/40 mix-blend-multiply"></div>
        {/* Deep Sepia Tone for Shadow Depth */}
        <div className="absolute inset-0 bg-[#313030]/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-start text-left md:items-center md:text-center px-6">
        <div className="animate-fade-in-up w-full md:w-auto">
          <span className="block text-xs md:text-sm font-medium uppercase tracking-[0.2em] text-white/90 mb-6 backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full mx-0 md:mx-auto w-fit">
            Premium Kenyan Travel
          </span>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-normal text-white tracking-tight mb-8 drop-shadow-sm">
            Move <span className="italic text-[#F5F2EB]">different.</span>
          </h1>
          <p className="max-w-lg mx-0 md:mx-auto text-lg md:text-xl text-white/90 font-light leading-relaxed mb-12 text-shadow-sm">
            From the chaos of the CBD to the silence of the Mara. <br />
            Experience Kenya with Bihh.
          </p>

          <a
            href="#products"
            onClick={(e) => handleNavClick(e, 'products')}
            className="group relative px-10 py-4 bg-[#F5F2EB] text-[#2C2A26] rounded-full text-sm font-semibold uppercase tracking-widest hover:bg-white transition-all duration-500 overflow-hidden shadow-lg hover:shadow-xl inline-block"
          >
            <span className="relative z-10 group-hover:text-[#2C2A26]">View Collection</span>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
