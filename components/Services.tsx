
import React, { useState, useEffect, useRef } from 'react';
import { Service } from '../types';
import { ArrowRight, Sparkles, Plus, Minus, CornerDownRight, Zap, Target, BarChart2, Hash, ChevronRight } from 'lucide-react';
import FadeIn from './FadeIn';
import { useNavigate } from 'react-router-dom';

interface ServicesProps {
  services: Service[];
  onCtaClick: () => void;
}

// Visual Assets Mapping for Cinematic Effect
const visualAssets: Record<string, { bg: string, accent: string, video?: string }> = {
    '0': { 
        bg: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop", 
        accent: "text-blue-500" 
    }, // Branding
    '1': { 
        bg: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop", 
        accent: "text-green-500" 
    }, // Web
    '2': { 
        bg: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop", 
        accent: "text-brand-yellow" 
    }, // Ads
    '3': { 
        bg: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2000&auto=format&fit=crop", 
        accent: "text-purple-500" 
    }, // SEO
};

const Services: React.FC<ServicesProps> = ({ services, onCtaClick }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLElement>(null);

  // Safety check
  if (!services || services.length === 0) return null;

  const activeService = services[activeIndex] || services[0];
  const assets = visualAssets[activeIndex.toString()] || visualAssets['0'];

  const handleServiceChange = (index: number) => {
    setActiveIndex(index);
  };

  const handleDetailClick = (id: string) => {
      navigate(`/service/${id}`);
  };

  return (
    <section id="giai-phap" ref={sectionRef} className="bg-brand-black relative overflow-hidden py-24 border-t border-gray-900">
       
       <div className="container mx-auto px-6 relative z-10 h-full">
         
         {/* SECTION HEADER */}
         <div className="mb-16 md:mb-24">
            <FadeIn>
                <h2 className="text-brand-yellow font-bold tracking-[0.2em] uppercase text-xs mb-4 flex items-center gap-2">
                    <span className="w-8 h-[1px] bg-brand-yellow"></span> Core Capabilities
                </h2>
                <h3 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9]">
                    Giải Pháp <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-600">Toàn Diện.</span>
                </h3>
            </FadeIn>
         </div>

         <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 h-auto lg:h-[650px]">
            
            {/* LEFT: VERTICAL NAVIGATION */}
            <div className="lg:w-1/3 flex flex-col justify-center gap-2">
                {services.map((service, index) => {
                    const isActive = index === activeIndex;
                    return (
                        <div 
                            key={service.id}
                            onMouseEnter={() => handleServiceChange(index)}
                            className={`
                                group cursor-pointer transition-all duration-500 ease-out border-l-2 pl-6 py-4 md:py-6 relative
                                ${isActive ? 'border-brand-yellow' : 'border-gray-800 hover:border-gray-600'}
                            `}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className={`text-[10px] font-bold uppercase tracking-widest mb-1 block transition-colors ${isActive ? 'text-brand-yellow' : 'text-gray-600'}`}>
                                        0{index + 1}
                                    </span>
                                    <h4 className={`text-xl md:text-2xl font-black uppercase transition-all duration-300 ${isActive ? 'text-white translate-x-2' : 'text-gray-500 group-hover:text-gray-300'}`}>
                                        {service.title}
                                    </h4>
                                </div>
                                <ChevronRight 
                                    size={16} 
                                    className={`transition-all duration-300 ${isActive ? 'opacity-100 translate-x-0 text-brand-yellow' : 'opacity-0 -translate-x-4 text-gray-600'}`}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* RIGHT: CINEMATIC PANEL */}
            <div className="lg:w-2/3 relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-gray-900 group h-[500px] lg:h-full">
                
                {/* Background Images (Stacked & Cross-faded) */}
                {Object.entries(visualAssets).map(([key, asset], idx) => (
                    <div 
                        key={key}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out
                            ${idx === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}
                        `}
                    >
                        <img 
                            src={asset.bg} 
                            alt="Background" 
                            className="w-full h-full object-cover filter brightness-[0.4] scale-105 transition-transform duration-[10s] ease-linear"
                            style={{ transform: idx === activeIndex ? 'scale(1.1)' : 'scale(1.0)' }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent"></div>
                    </div>
                ))}

                {/* Content Overlay */}
                <div className="absolute inset-0 z-20 p-8 md:p-12 flex flex-col justify-end">
                    <div key={activeService.id} className="animate-in slide-in-from-bottom-8 fade-in duration-500">
                        {/* Icons Row */}
                        <div className="flex gap-3 mb-6">
                            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                                <Zap size={18} />
                            </div>
                            <div className="w-10 h-10 rounded-full bg-brand-yellow/20 backdrop-blur-md border border-brand-yellow/30 flex items-center justify-center text-brand-yellow">
                                <Target size={18} />
                            </div>
                        </div>

                        <h2 className="text-4xl md:text-6xl font-black text-white uppercase leading-none mb-4 drop-shadow-xl">
                            {activeService.title}
                        </h2>
                        
                        <p className="text-gray-300 text-base md:text-lg font-light leading-relaxed max-w-xl mb-8 border-l-2 border-brand-yellow pl-6">
                            {activeService.description}
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <button 
                                onClick={() => handleDetailClick(activeService.id)}
                                className="bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-brand-yellow transition-colors flex items-center gap-2"
                            >
                                Xem Chi Tiết <ArrowRight size={16} />
                            </button>
                            
                            {/* Glass Button */}
                            <button 
                                onClick={onCtaClick}
                                className="bg-white/5 backdrop-blur-md border border-white/10 text-white font-bold py-3 px-8 rounded-full hover:bg-white/10 transition-colors"
                            >
                                Tư Vấn Ngay
                            </button>
                        </div>
                    </div>
                </div>

                {/* Top Right Decoration */}
                <div className="absolute top-6 right-6 z-30 flex items-center gap-2 opacity-50">
                    <div className="w-2 h-2 bg-brand-yellow rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white">Live Preview</span>
                </div>
            </div>

         </div>
       </div>
    </section>
  );
};

export default Services;
