
import React, { useState, useEffect, useRef } from 'react';
import { Service } from '../types';
import { CheckCircle2, Zap, ArrowUpRight } from 'lucide-react';
import FadeIn from './FadeIn';
import { useNavigate } from 'react-router-dom';

interface ServicesProps {
  services: Service[];
  onCtaClick: () => void;
}

// Configuration for the Premium "Cinematic" look
const SERVICE_CONFIG: Record<string, { title: string, subtitle: string, features: string[], img: string, gradient: string }> = {
  'chatbot-ai': {
    title: 'AI Conversationalist',
    subtitle: 'Trợ Lý Ảo 24/7',
    features: ['Auto Lead Qualification', 'Natural Language Processing', 'Multi-Platform (FB/Web/Zalo)', 'Instant Response'],
    img: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?q=80&w=2000&auto=format&fit=crop',
    gradient: 'from-blue-600/20 to-cyan-400/20'
  },
  'digital-transformation': {
    title: 'Digital Core Ops',
    subtitle: 'Số Hóa Vận Hành',
    features: ['ERP & CRM Systems', 'Paperless Workflow', 'Data Centralization', 'Business Intelligence'],
    img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2000&auto=format&fit=crop',
    gradient: 'from-cyan-500/20 to-blue-500/20'
  },
  'ai-training': {
    title: 'AI Workforce',
    subtitle: 'Nâng Cao Năng Lực',
    features: ['Prompt Engineering', 'AI Tools Mastery', 'Workflow Optimization', 'Custom Training Programs'],
    img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop',
    gradient: 'from-purple-600/20 to-pink-500/20'
  },
  'automation': {
    title: 'Workflow Automation',
    subtitle: 'Tự Động Hóa',
    features: ['Zapier/Make Integration', 'Auto Email/SMS Sequences', 'Task Automation', 'Cross-Platform Sync'],
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop',
    gradient: 'from-orange-500/20 to-yellow-500/20'
  }
};

const Services: React.FC<ServicesProps> = ({ services, onCtaClick }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // If no services, skip observer setup
    if (!services || services.length === 0) return;

    const observerOptions = {
        root: null,
        rootMargin: "-20% 0px -20% 0px", 
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = Number(entry.target.getAttribute('data-index'));
                if (!isNaN(index)) {
                    setActiveIndex(index);
                }
            }
        });
    }, observerOptions);

    textRefs.current.forEach(el => {
        if (el) observer.observe(el);
    });

    return () => {
        textRefs.current.forEach(el => {
            if (el) observer.unobserve(el);
        });
    };
  }, [services]);

  // FIX: Moved Safety check AFTER all hooks to prevent React Error #310
  if (!services || services.length === 0) return null;

  return (
    <section id="giai-phap" ref={sectionRef} className="bg-[#050505] relative border-t border-gray-900">
       
       <div className="container mx-auto px-6 relative z-10">
         
         <div className="flex flex-col lg:flex-row">
            
            {/* LEFT: SCROLLABLE TEXT CONTENT */}
            <div className="w-full lg:w-1/2 py-20">
                <div className="mb-20">
                    <FadeIn>
                        <h2 className="text-brand-yellow font-bold tracking-[0.2em] uppercase text-xs mb-4 flex items-center gap-2">
                            <span className="w-8 h-[1px] bg-brand-yellow"></span> Core Capabilities
                        </h2>
                        <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-[0.9]">
                            Giải Pháp <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-600">Toàn Diện.</span>
                        </h3>
                    </FadeIn>
                </div>

                <div className="space-y-12 lg:space-y-0">
                    {services.map((service, index) => {
                        const config = SERVICE_CONFIG[service.id] || { 
                            title: service.title, 
                            subtitle: 'Service', 
                            features: ['Comprehensive Solution', 'Expert Support'],
                            img: service.imageUrl,
                            gradient: 'from-gray-500/20 to-gray-500/20'
                        };
                        const isActive = activeIndex === index;

                        return (
                            <div 
                                key={service.id}
                                ref={(el) => { textRefs.current[index] = el; }}
                                data-index={index}
                                className={`
                                    min-h-[50vh] lg:min-h-[80vh] flex flex-col justify-center transition-all duration-500 ease-out
                                    ${isActive 
                                        ? 'opacity-100 translate-x-0' 
                                        : 'lg:opacity-50 lg:translate-x-4'
                                    }
                                `}
                            >
                                <span className={`font-mono text-xl font-bold mb-4 block transition-colors ${isActive ? 'text-brand-yellow' : 'text-gray-600'}`}>0{index + 1}</span>
                                <h4 className={`text-3xl md:text-5xl font-black uppercase mb-6 leading-tight transition-colors ${isActive ? 'text-white' : 'text-gray-500'}`}>
                                    {config.title}
                                </h4>
                                <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-md font-light">
                                    {service.description}
                                </p>
                                
                                <div className="grid grid-cols-1 gap-3 mb-8">
                                    {config.features.map((feat, idx) => (
                                        <div key={idx} className="flex items-center gap-3 text-white/80">
                                            <CheckCircle2 size={16} className={`${isActive ? 'text-brand-yellow' : 'text-gray-600'} shrink-0`} />
                                            <span className="text-sm font-medium">{feat}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center gap-4">
                                    <button 
                                        onClick={() => navigate(`/service/${service.id}`)}
                                        className={`group flex items-center gap-2 px-6 py-3 rounded-full font-bold uppercase tracking-widest transition-all shadow-lg text-xs
                                            ${isActive 
                                                ? 'bg-white text-black hover:bg-brand-yellow' 
                                                : 'bg-transparent border border-gray-700 text-gray-500 hover:text-white hover:border-white'
                                            }
                                        `}
                                    >
                                        Chi Tiết <ArrowUpRight size={14} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* RIGHT: STICKY IMAGE STAGE (Desktop Only) */}
            <div className="hidden lg:block lg:w-1/2 relative">
                <div className="sticky top-0 h-screen flex items-center justify-center py-20 pl-12">
                    <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 bg-gray-900">
                        {services.map((s, idx) => {
                            const cfg = SERVICE_CONFIG[s.id] || { 
                                title: s.title,
                                subtitle: 'Service', 
                                features: [],
                                img: s.imageUrl, 
                                gradient: 'from-gray-500/20 to-gray-500/20' 
                            };
                            return (
                                <div 
                                    key={s.id}
                                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${idx === activeIndex ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'}`}
                                >
                                    <img 
                                        src={cfg.img} 
                                        alt={s.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className={`absolute inset-0 bg-gradient-to-br ${cfg.gradient} mix-blend-overlay opacity-60`}></div>
                                    <div className="absolute inset-0 bg-black/20"></div>
                                    <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                                    
                                    <div className="absolute bottom-8 left-8 z-20">
                                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-widest">
                                            <Zap size={14} className="text-brand-yellow" />
                                            {cfg.subtitle}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

         </div>
       </div>
    </section>
  );
};

export default Services;
