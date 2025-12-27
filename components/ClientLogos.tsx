
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
    // Adjusted: Tighter width (w-44/w-72), reduced padding, increased container height (h-40)
    <div className="group relative h-32 w-44 md:w-72 flex items-center justify-center px-4 md:px-8 transition-all duration-500">
        {/* Hover Glow Effect Behind */}
        <div className="absolute inset-0 bg-brand-yellow/0 group-hover:bg-brand-yellow/5 rounded-xl transition-colors duration-500 filter blur-xl"></div>
        
        <img 
            src={partner.url} 
            alt={partner.name} 
            referrerPolicy="no-referrer"
            className="
                max-h-16 md:max-h-24 w-auto object-contain transition-all duration-500 ease-out
                filter grayscale brightness-[0.6] opacity-70 contrast-125
                group-hover:grayscale-0 group-hover:brightness-100 group-hover:opacity-100 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]
            "
        />
    </div>
  );
};

const ClientLogos: React.FC = () => {
  const partners = STATIC_PARTNERS;
  const half = Math.ceil(partners.length / 2);
  const row1 = partners.slice(0, half);
  const row2 = partners.slice(half);

  return (
    <section className="bg-brand-black border-b border-gray-900 py-10 overflow-hidden relative z-20 group/section">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"></div>
      
      {/* Vignette Fade Edges (Smooth Transition) */}
      <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-brand-black via-brand-black/80 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-brand-black via-brand-black/80 to-transparent z-10 pointer-events-none"></div>

      <div className="container mx-auto px-6 mb-8 text-center relative z-10">
          <span className="text-brand-yellow font-bold tracking-[0.3em] uppercase text-xs md:text-sm mb-2 block animate-pulse">Ecosystem</span>
          <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight opacity-90">
             Mạng Lưới <span className="text-gray-600">Đối Tác Chiến Lược</span>
          </h3>
      </div>

      <div className="flex flex-col gap-4 relative">
        {/* ROW 1: Scrolling Left (Normal) */}
        <div className="flex w-full relative">
            <div className="flex animate-scroll-right items-center whitespace-nowrap" style={{ animationDirection: 'normal', animationDuration: '60s' }}>
                {[...row1, ...row1, ...row1].map((partner, index) => (
                    <LogoItem key={`r1-${index}`} partner={partner} />
                ))}
            </div>
        </div>

        {/* ROW 2: Scrolling Right (Reverse) */}
        <div className="flex w-full relative">
            <div className="flex animate-scroll-right items-center whitespace-nowrap" style={{ animationDirection: 'reverse', animationDuration: '70s' }}>
                {[...row2, ...row2, ...row2].map((partner, index) => (
                    <LogoItem key={`r2-${index}`} partner={partner} />
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
