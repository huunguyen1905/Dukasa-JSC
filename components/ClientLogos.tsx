
import React from 'react';

const STATIC_PARTNERS = [
  "https://i.imgur.com/RyKqFvm.png",
  "https://i.imgur.com/778zJUh.png",
  "https://i.imgur.com/L6IRX6P.png",
  "https://i.imgur.com/bCCYHhz.png",
  "https://i.imgur.com/WKg6Aik.png",
  "https://i.imgur.com/cRuuGGT.png",
  "https://i.imgur.com/g25p4Kk.png",
  "https://i.imgur.com/HxSpImW.png",
  "https://i.imgur.com/Z4X8ks8.png",
  "https://i.imgur.com/rnfG8j2.png",
  "https://i.imgur.com/jwHjRSd.png",
  "https://i.imgur.com/fJyFehr.png",
  "https://i.imgur.com/NzPl1P9.png",
  "https://i.imgur.com/INE0DEP.png",
  "https://i.imgur.com/YaasCgc.png",
  "https://i.imgur.com/xRqUo5i.png",
  "https://i.imgur.com/f3Mv6XM.png",
  "https://i.imgur.com/i2KvaaZ.png",
  "https://i.imgur.com/sYQGDLg.png",
  "https://i.imgur.com/Zbq9H5v.png",
  "https://i.imgur.com/UXT09Vh.png",
  "https://i.imgur.com/GnjfJvi.png",
  "https://i.imgur.com/wQyoVLQ.png",
  "https://i.imgur.com/fbbGePd.png",
  "https://i.imgur.com/RrubrGb.png"
].map((url, index) => ({
  id: index,
  name: `Partner ${index + 1}`,
  url: url
}));

const LogoItem: React.FC<{ partner: { name: string, url: string } }> = ({ partner }) => {
  return (
    // UPDATED: Reduced width (w-32/w-52) to bring them closer visually
    // UPDATED: Increased height (h-32) container to accommodate larger logos
    <div className="group relative h-32 w-32 md:w-52 flex items-center justify-center px-2 transition-all duration-500 shrink-0">
        
        <img 
            src={partner.url} 
            alt={partner.name} 
            referrerPolicy="no-referrer"
            className="
                max-h-16 md:max-h-24 w-auto object-contain transition-all duration-500 ease-out
                filter grayscale brightness-[0.6] opacity-50 
                group-hover:grayscale-0 group-hover:brightness-100 group-hover:opacity-100 group-hover:scale-110 
            "
        />
    </div>
  );
};

const ClientLogos: React.FC = () => {
  // Use the full list in a single continuous stream
  const partners = STATIC_PARTNERS;

  return (
    <section className="bg-brand-black border-b border-white/5 py-12 overflow-hidden relative z-20">
      
      {/* Vignette Fade Edges */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-60 bg-gradient-to-r from-brand-black via-brand-black/90 to-transparent z-20 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-60 bg-gradient-to-l from-brand-black via-brand-black/90 to-transparent z-20 pointer-events-none"></div>

      <div className="container mx-auto px-6 mb-10 text-center relative z-10">
          <span className="inline-block py-1 px-3 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 mb-4 backdrop-blur-md">
            Strategic Ecosystem
          </span>
          <h3 className="text-xl md:text-3xl font-display font-medium text-white tracking-tight">
             Được Tin Tưởng Bởi <span className="text-gray-600">500+ Doanh Nghiệp</span>
          </h3>
      </div>

      {/* SINGLE ROW SCROLL */}
      <div className="flex w-full relative mask-linear-fade">
          {/* We duplicate the array 3 times to ensure infinite scroll feels seamless on large screens */}
          <div 
            className="flex animate-scroll-right items-center gap-6 md:gap-12 pl-6" 
            style={{ 
                animationDirection: 'normal', 
                animationDuration: '80s', // Slightly faster due to higher density
                width: 'max-content' 
            }}
          >
              {[...partners, ...partners, ...partners].map((partner, index) => (
                  <LogoItem key={`p-${index}`} partner={partner} />
              ))}
          </div>
      </div>
    </section>
  );
};

export default ClientLogos;
