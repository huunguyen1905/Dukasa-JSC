import React from 'react';

const logos = [
  "Techcombank", "VinGroup", "Shopee", "Lazada", "Grab", 
  "The Coffee House", "Masterise Homes", "Viettel", "FPT Software", "MoMo"
];

const ClientLogos: React.FC = () => {
  return (
    <section className="bg-brand-black border-y border-gray-900 py-10 overflow-hidden relative z-20">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-brand-black to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-brand-black to-transparent z-10"></div>

      <div className="flex">
        {/* Loop 1 */}
        <div className="flex animate-scroll-right items-center gap-16 md:gap-32 whitespace-nowrap px-8 md:px-16">
          {logos.map((logo, index) => (
            <span 
                key={index} 
                className="text-2xl md:text-3xl font-black text-gray-800 uppercase tracking-tighter hover:text-white transition-colors duration-500 cursor-default select-none"
            >
              {logo}
            </span>
          ))}
        </div>
        {/* Loop 2 (Duplicate for seamless effect) */}
        <div className="flex animate-scroll-right items-center gap-16 md:gap-32 whitespace-nowrap px-8 md:px-16">
           {logos.map((logo, index) => (
            <span 
                key={`dup-${index}`} 
                className="text-2xl md:text-3xl font-black text-gray-800 uppercase tracking-tighter hover:text-white transition-colors duration-500 cursor-default select-none"
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
      
      <div className="text-center mt-4">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-600 font-bold">Được tin chọn bởi những người dẫn đầu</p>
      </div>
    </section>
  );
};

export default ClientLogos;