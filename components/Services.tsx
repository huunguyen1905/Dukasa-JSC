import React, { useEffect, useRef } from 'react';
import { Service } from '../types';
import { CheckCircle, ArrowRight } from 'lucide-react';
import FadeIn from './FadeIn';

interface ServicesProps {
  services: Service[];
  onCtaClick: () => void;
}

const ParallaxImage = ({ src, alt }: { src: string; alt: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current || !imgRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Only animate if in view
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const distFromCenter = rect.top + rect.height / 2 - windowHeight / 2;
        const speed = 0.1;
        const yPos = distFromCenter * speed;
        imgRef.current.style.transform = `translateY(${yPos}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="relative overflow-hidden rounded-2xl border border-white/10 transform transition-transform duration-500 group-hover:scale-[1.02] h-[400px] w-full bg-black/50 shadow-2xl"
    >
      <div className="absolute inset-0 bg-brand-yellow/10 opacity-0 group-hover:opacity-100 transition-opacity z-10 duration-500 pointer-events-none mix-blend-overlay"></div>
      <img 
        ref={imgRef}
        src={src} 
        alt={alt} 
        className="absolute left-0 w-full h-[130%] -top-[15%] object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700 will-change-transform"
      />
    </div>
  );
};

const Services: React.FC<ServicesProps> = ({ services, onCtaClick }) => {
  return (
    <section id="services" className="bg-transparent py-20 overflow-hidden relative">
      <div className="container mx-auto px-6 relative z-10">
        <FadeIn>
            <div className="text-center mb-24">
                <h2 className="text-brand-yellow font-bold tracking-widest uppercase mb-4 text-xs">World-Class Services</h2>
                <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
                    Giải Pháp <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">Toàn Diện</span>
                </h3>
            </div>
        </FadeIn>

        <div className="flex flex-col gap-32">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className={`flex flex-col md:flex-row items-center gap-16 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="flex-1 group w-full">
                <FadeIn direction={index % 2 === 0 ? 'right' : 'left'}>
                    <ParallaxImage src={service.imageUrl} alt={service.title} />
                </FadeIn>
              </div>
              
              <div className="flex-1">
                <FadeIn direction={index % 2 === 0 ? 'left' : 'right'} delay={200}>
                    <div className="p-8 md:p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 hover:border-brand-yellow/30 transition-colors duration-500 hover:shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                        <div className="w-12 h-1 bg-brand-yellow mb-6"></div>
                        <h4 className="text-3xl md:text-4xl font-black text-white uppercase mb-6 leading-tight">{service.title}</h4>
                        <p className="text-gray-300 text-lg leading-relaxed mb-8 font-light">
                            {service.description}
                        </p>
                        
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3 text-white font-medium">
                                <CheckCircle className="text-brand-yellow w-5 h-5 shrink-0" />
                                <span>Cam kết KPI rõ ràng bằng văn bản</span>
                            </li>
                            <li className="flex items-center gap-3 text-white font-medium">
                                <CheckCircle className="text-brand-yellow w-5 h-5 shrink-0" />
                                <span>Báo cáo minh bạch Real-time</span>
                            </li>
                            <li className="flex items-center gap-3 text-white font-medium">
                                <CheckCircle className="text-brand-yellow w-5 h-5 shrink-0" />
                                <span>Đội ngũ chuyên gia 10+ năm kinh nghiệm</span>
                            </li>
                        </ul>

                        <button 
                            onClick={onCtaClick}
                            className="group flex items-center gap-2 text-brand-yellow font-bold uppercase tracking-wider text-sm hover:text-white transition-colors"
                        >
                            Tư Vấn {service.title} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/>
                        </button>
                    </div>
                </FadeIn>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;