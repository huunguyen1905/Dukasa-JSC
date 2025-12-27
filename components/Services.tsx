
import React, { useState, useEffect, useRef } from 'react';
import { Service } from '../types';
import { ArrowRight, Sparkles, Plus, Minus, CornerDownRight, Zap, Target, BarChart2, Hash } from 'lucide-react';
import FadeIn from './FadeIn';

interface ServicesProps {
  services: Service[];
  onCtaClick: () => void;
}

// Augment the service data with rich visual assets for the masterpiece look
const visualAssets: Record<string, { bg: string, accent: string, video?: string }> = {
    '0': { 
        bg: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop", 
        accent: "text-blue-500" 
    }, // Branding - Abstract liquid
    '1': { 
        bg: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop", 
        accent: "text-green-500" 
    }, // Web - Cyberpunk city
    '2': { 
        bg: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop", 
        accent: "text-brand-yellow" 
    }, // Ads - Data dashboard
    '3': { 
        bg: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2000&auto=format&fit=crop", 
        accent: "text-purple-500" 
    }, // SEO - Network nodes
};

const Services: React.FC<ServicesProps> = ({ services, onCtaClick }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleServiceChange = (index: number) => {
    if (index === activeIndex || isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex(index);
    setTimeout(() => setIsTransitioning(false), 600); // Match transition duration
  };

  const activeService = services[activeIndex] || services[0];

  return (
    <section id="services" className="bg-brand-black relative overflow-hidden min-h-screen flex items-center py-24 md:py-0 border-t border-gray-900">
       
       {/* GLOBAL BACKGROUND NOISE */}
       <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none"></div>

       <div className="container mx-auto px-6 relative z-10 h-full">
         <div className="flex flex-col lg:flex-row h-full lg:min-h-[700px] gap-12 lg:gap-24 items-center">
            
            {/* LEFT: THE CONTROL PANEL */}
            <div className="lg:w-5/12 flex flex-col justify-center relative z-20 w-full">
                <FadeIn>
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-[1px] bg-brand-yellow"></div>
                            <span className="text-brand-yellow font-bold tracking-[0.3em] uppercase text-xs">Core Capabilities</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-[0.9]">
                            Giải Pháp <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-600">Toàn Diện.</span>
                        </h2>
                    </div>
                </FadeIn>

                <div className="flex flex-col w-full">
                    {services.map((service, index) => {
                        const isActive = index === activeIndex;
                        return (
                            <div 
                                key={service.id}
                                onMouseEnter={() => handleServiceChange(index)}
                                onClick={() => setActiveIndex(index)} // Support click on mobile
                                className={`
                                    group relative cursor-pointer transition-all duration-300 w-full
                                    border-t border-gray-800 last:border-b
                                    ${isActive ? 'bg-white/5' : 'hover:bg-white/5'} 
                                `}
                            >
                                {/* Active Indicator Strip */}
                                <div className={`absolute left-0 top-0 bottom-0 w-1 bg-brand-yellow transition-all duration-300 origin-top ${isActive ? 'scale-y-100' : 'scale-y-0'}`}></div>

                                <div className="py-6 px-4 md:px-6 flex items-center justify-between gap-6">
                                    <div className="flex items-center gap-6 flex-1 min-w-0">
                                        <span className={`font-mono text-sm font-bold transition-colors duration-300 shrink-0 ${isActive ? 'text-brand-yellow' : 'text-gray-600'}`}>
                                            0{index + 1}
                                        </span>
                                        <h3 className={`text-xl md:text-2xl font-black uppercase transition-colors duration-300 truncate ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
                                            {service.title}
                                        </h3>
                                    </div>

                                    {/* Icon Container - Fixed Size & Stable */}
                                    <div className={`
                                        w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full border transition-all duration-300 shrink-0 relative overflow-hidden
                                        ${isActive 
                                            ? 'border-brand-yellow bg-brand-yellow text-black rotate-0 shadow-[0_0_15px_rgba(250,204,21,0.4)]' 
                                            : 'border-gray-800 text-gray-600 group-hover:border-gray-600 group-hover:text-white'
                                        }
                                    `}>
                                        {isActive ? <CornerDownRight size={20} /> : <Plus size={20} />}
                                    </div>
                                </div>
                                
                                {/* Mobile Detail Expansion (Accordion style) */}
                                <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${isActive ? 'max-h-60 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}>
                                    <div className="px-6 pl-14">
                                        <p className="text-gray-400 text-sm leading-relaxed mb-4">
                                            {service.description}
                                        </p>
                                        <button onClick={onCtaClick} className="text-xs font-bold text-brand-yellow uppercase flex items-center gap-2 border-b border-brand-yellow pb-0.5 w-fit">
                                            Khám phá ngay <ArrowRight size={12}/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* RIGHT: THE VIEWPORT (CINEMATIC DISPLAY) */}
            <div className="hidden lg:flex lg:w-7/12 relative h-[600px] items-center justify-center perspective-1000">
                
                {/* Background Image Layer with Parallax/Zoom Effect */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl border border-gray-800 bg-gray-900 group">
                     {/* The Image */}
                     {Object.entries(visualAssets).map(([key, asset], idx) => (
                        <div 
                            key={key}
                            className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] transform
                                ${idx === activeIndex ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'}
                            `}
                        >
                            <img src={asset.bg} alt="Service Background" className="w-full h-full object-cover filter brightness-[0.3]" />
                            
                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-transparent to-transparent opacity-60"></div>
                        </div>
                     ))}

                     {/* Grid Overlay on top of image */}
                     <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>

                     {/* Content Layer (Floating) */}
                     <div className="absolute bottom-0 left-0 w-full p-16 z-20 flex flex-col justify-end h-full">
                        
                        {/* Big Number Watermark */}
                        <div className="absolute top-6 right-6 z-0 opacity-10 pointer-events-none transition-all duration-500 transform translate-x-0">
                             <span className="text-[10rem] font-black text-white leading-none tracking-tighter stroke-white" style={{ WebkitTextStroke: '2px rgba(255,255,255,0.2)', color: 'transparent' }}>
                                0{activeIndex + 1}
                             </span>
                        </div>

                        {/* Animated Text Content */}
                        <div key={activeService.id} className="relative z-10 animate-in slide-in-from-bottom-4 fade-in duration-500">
                             {/* Tags */}
                             <div className="flex gap-3 mb-6">
                                <span className="bg-white/5 backdrop-blur-md border border-white/10 px-3 py-1 rounded text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                                    <Hash size={12} className="text-brand-yellow"/> {activeService.title.split(' ')[0]}
                                </span>
                                <span className="bg-brand-yellow text-black px-3 py-1 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-[0_0_10px_rgba(250,204,21,0.3)]">
                                    <Zap size={12}/> High Impact
                                </span>
                             </div>

                             <h3 className="text-5xl font-black text-white uppercase leading-tight mb-6 max-w-lg drop-shadow-2xl">
                                {activeService.title}
                             </h3>
                             
                             <p className="text-gray-300 text-lg leading-relaxed max-w-md mb-10 border-l-2 border-brand-yellow pl-6">
                                {activeService.description}
                             </p>

                             {/* Magnetic Button Area */}
                             <div className="flex items-center gap-6">
                                <button 
                                    onClick={onCtaClick}
                                    className="group relative px-8 py-4 bg-white text-black font-black uppercase tracking-wide overflow-hidden rounded-lg hover:scale-105 transition-transform duration-300"
                                >
                                    <div className="absolute inset-0 bg-brand-yellow translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                                    <span className="relative flex items-center gap-2">
                                        Tư Vấn Ngay <ArrowRight size={18} />
                                    </span>
                                </button>

                                <button 
                                    className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
                                    title="Xem chi tiết"
                                >
                                    <Plus size={20} />
                                </button>
                             </div>
                        </div>
                     </div>
                </div>

                {/* Decorative Elements around the Viewport */}
                <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-brand-yellow/30 hidden lg:block"></div>
                <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-brand-yellow/30 hidden lg:block"></div>
                
            </div>
         </div>
       </div>
    </section>
  );
};

export default Services;
