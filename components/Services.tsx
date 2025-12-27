
import React, { useRef, useState, useEffect } from 'react';
import { Service } from '../types';
import { ArrowRight, Sparkles, Monitor, TrendingUp, Search, PenTool, BarChart3, Globe } from 'lucide-react';
import FadeIn from './FadeIn';

interface ServicesProps {
  services: Service[];
  onCtaClick: () => void;
}

// Map string icons to Lucide components for the grid
const IconMap: Record<string, React.ReactNode> = {
    'ChartBarIcon': <BarChart3 size={32} />,
    'CurrencyDollarIcon': <TrendingUp size={32} />,
    'DesktopComputerIcon': <Monitor size={32} />,
    'SparklesIcon': <PenTool size={32} />,
    'Search': <Search size={32} />,
    'Star': <Sparkles size={32} />,
    'Monitor': <Monitor size={32} />,
    'TrendingUp': <TrendingUp size={32} />
};

const Services: React.FC<ServicesProps> = ({ services, onCtaClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const div = containerRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <section id="services" className="bg-brand-black py-24 relative overflow-hidden">
       {/* Ambient Background */}
       <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(250,204,21,0.03),transparent_70%)] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <FadeIn>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                <div>
                    <h2 className="text-brand-yellow font-bold tracking-widest uppercase mb-2 text-xs flex items-center gap-2">
                        <Sparkles size={14} /> World-Class Expertise
                    </h2>
                    <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
                        Hệ Sinh Thái <span className="text-gray-600">Dịch Vụ</span>
                    </h3>
                </div>
                <div className="max-w-md text-right text-gray-400 text-sm hidden md:block">
                    Giải pháp toàn diện từ xây dựng thương hiệu đến tăng trưởng doanh thu, được may đo cho từng giai đoạn phát triển của doanh nghiệp.
                </div>
            </div>
        </FadeIn>

        {/* SPOTLIGHT GRID CONTAINER */}
        <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative"
        >
            {/* The Moving Spotlight Glow (Behind everything) */}
            <div 
                className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 z-0 rounded-3xl"
                style={{
                    opacity,
                    background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(250,204,21,0.15), transparent 40%)`
                }}
            />

            {services.map((service, index) => {
                // Get icon or fallback
                const Icon = IconMap[service.icon] || <Sparkles size={32} />;

                return (
                    <FadeIn key={service.id} delay={index * 100} className="h-full">
                        <div 
                            className="group relative h-full bg-gray-900/40 border border-white/5 rounded-3xl p-8 overflow-hidden hover:bg-gray-900/60 transition-colors duration-300 flex flex-col z-10"
                        >
                            {/* Spotlight Border Effect via CSS mask */}
                            <div 
                                className="absolute inset-0 z-0 transition-opacity duration-300"
                                style={{
                                    opacity,
                                    background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.1), transparent 40%)`,
                                    maskImage: 'linear-gradient(#fff, #fff)', 
                                    WebkitMaskImage: 'linear-gradient(#fff, #fff)',
                                    pointerEvents: 'none'
                                }}
                            />
                            
                            {/* Inner Highlight Border on Hover */}
                            <div className="absolute inset-0 border border-brand-yellow/0 group-hover:border-brand-yellow/30 rounded-3xl transition-colors duration-500 z-20 pointer-events-none"></div>

                            {/* Icon Box */}
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-800 to-black border border-gray-700 flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:border-brand-yellow/50 group-hover:text-brand-yellow transition-all duration-500 shadow-lg relative z-20">
                                {Icon}
                            </div>

                            {/* Content */}
                            <div className="relative z-20 flex-1 flex flex-col">
                                <h4 className="text-2xl font-black text-white uppercase mb-3 group-hover:text-brand-yellow transition-colors">{service.title}</h4>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                                    {service.description}
                                </p>
                                
                                {/* Image Preview (Subtle at bottom) */}
                                <div className="h-32 w-full rounded-xl overflow-hidden relative mb-6 opacity-60 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0">
                                    <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent"></div>
                                </div>

                                <button 
                                    onClick={onCtaClick}
                                    className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-widest group-hover:gap-4 transition-all duration-300"
                                >
                                    Khám Phá <ArrowRight size={16} className="text-brand-yellow" />
                                </button>
                            </div>
                        </div>
                    </FadeIn>
                );
            })}
        </div>
      </div>
    </section>
  );
};

export default Services;
