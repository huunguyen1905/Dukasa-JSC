
import React, { useEffect, useRef, useState } from 'react';
import { Search, Map, Zap, TrendingUp, Clock, Hash, CheckCircle2 } from 'lucide-react';
import FadeIn from './FadeIn';

const steps = [
  {
    id: '01',
    title: 'Khám Phá & Thấu Hiểu',
    subtitle: 'Data Mining',
    icon: <Search className="w-6 h-6" />,
    description: 'Đào sâu dữ liệu (Data Mining), nghiên cứu đối thủ và vẽ chân dung khách hàng mục tiêu để tìm ra "Long Mạch" cho thương hiệu.',
    duration: '1 - 2 Tuần',
    tags: ['Market Audit', 'User Persona', 'SWOT']
  },
  {
    id: '02',
    title: 'Chiến Lược May Đo',
    subtitle: 'Strategic Roadmap',
    icon: <Map className="w-6 h-6" />,
    description: 'Thiết kế lộ trình tăng trưởng riêng biệt. Kết hợp đa kênh (Omnichannel) từ SEO, Ads đến Social để tối ưu hóa điểm chạm.',
    duration: '1 Tuần',
    tags: ['Media Planning', 'KPI Setting', 'Creative']
  },
  {
    id: '03',
    title: 'Thực Thi Thần Tốc',
    subtitle: 'High-Speed Execution',
    icon: <Zap className="w-6 h-6" />,
    description: 'Triển khai chiến dịch với tốc độ và sự chính xác tuyệt đối. Hệ thống báo cáo Real-time giúp nắm bắt hiệu quả từng đồng chi phí.',
    duration: '2 - 4 Tuần',
    tags: ['Campaign Setup', 'A/B Testing', 'Tracking']
  },
  {
    id: '04',
    title: 'Tăng Trưởng & Mở Rộng',
    subtitle: 'Scale & Dominate',
    icon: <TrendingUp className="w-6 h-6" />,
    description: 'Liên tục tối ưu hóa tỷ lệ chuyển đổi (CRO) và mở rộng quy mô (Scale-up) để nhân bản doanh thu bền vững.',
    duration: 'Ongoing',
    tags: ['CRO', 'Remarketing', 'Scale-up']
  }
];

const Process: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const { top, height } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollPos = windowHeight / 2; // Trigger point at middle of screen
      
      // Calculate progress relative to the container
      const relativeY = scrollPos - top;
      const stepHeight = height / steps.length;
      
      let current = Math.floor(relativeY / stepHeight);
      current = Math.max(0, Math.min(steps.length - 1, current));
      
      // Only update if visible inside container range
      if (top < windowHeight && top + height > 0) {
          setActiveStep(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={containerRef} className="bg-[#050505] py-20 relative overflow-hidden">
      
      {/* 1. Global Tech Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:40px_40px] opacity-30 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-transparent to-brand-black pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* HEADER */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">
                Lộ Trình <span className="text-brand-yellow">Thực Thi</span>
            </h3>
            <p className="text-gray-400 text-sm md:text-base leading-relaxed">
                Quy trình chuẩn hóa 4 bước biến mục tiêu thành kết quả thực tế. Tối ưu hóa thời gian và nguồn lực.
            </p>
        </div>

        {/* THE COMPACT TIMELINE */}
        <div className="relative max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
            
            {/* PROGRESS RAIL (Desktop Sticky) */}
            <div className="hidden md:block w-1 bg-gray-800 rounded-full relative h-[600px] shrink-0 mt-8">
                {/* Active Fill */}
                <div 
                    className="absolute top-0 left-0 w-full bg-brand-yellow transition-all duration-500 ease-out shadow-[0_0_15px_#FACC15]"
                    style={{ height: `${((activeStep + 1) / steps.length) * 100}%` }}
                ></div>
                
                {/* Nodes */}
                {steps.map((_, idx) => (
                    <div 
                        key={idx}
                        className={`absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 transition-all duration-300 z-10
                            ${idx <= activeStep ? 'bg-brand-yellow border-brand-yellow shadow-[0_0_10px_#FACC15]' : 'bg-brand-black border-gray-700'}
                        `}
                        style={{ top: `${(idx / (steps.length - 1)) * 100}%` }}
                    ></div>
                ))}
            </div>

            {/* CONTENT STACK */}
            <div className="flex-1 flex flex-col gap-6">
                {steps.map((step, index) => {
                    const isActive = index === activeStep;
                    return (
                        <div 
                            key={index} 
                            className={`
                                group relative overflow-hidden rounded-xl border transition-all duration-500
                                ${isActive 
                                    ? 'bg-gray-900 border-brand-yellow/50 shadow-[0_0_30px_rgba(250,204,21,0.05)] translate-x-2' 
                                    : 'bg-gray-900/40 border-gray-800 hover:border-gray-700'
                                }
                            `}
                            onMouseEnter={() => setActiveStep(index)}
                        >
                            {/* Number Watermark (Subtle) */}
                            <div className="absolute -right-4 -bottom-8 text-8xl font-black text-white opacity-[0.02] select-none pointer-events-none font-mono">
                                {step.id}
                            </div>

                            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center relative z-10">
                                {/* Icon Box */}
                                <div className={`
                                    w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300
                                    ${isActive 
                                        ? 'bg-brand-yellow text-black shadow-lg rotate-3' 
                                        : 'bg-gray-800 text-gray-500 border border-gray-700 group-hover:bg-gray-700 group-hover:text-white'
                                    }
                                `}>
                                    {step.icon}
                                </div>

                                {/* Main Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                                        <div>
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1 block">{step.subtitle}</span>
                                            <h4 className={`text-xl md:text-2xl font-black uppercase transition-colors ${isActive ? 'text-white' : 'text-gray-300'}`}>
                                                {step.title}
                                            </h4>
                                        </div>
                                        {/* Duration Badge */}
                                        <div className={`
                                            flex items-center gap-2 px-3 py-1 rounded text-xs font-bold font-mono w-fit
                                            ${isActive ? 'bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/20' : 'bg-black/30 text-gray-500 border border-gray-800'}
                                        `}>
                                            <Clock size={12} /> {step.duration}
                                        </div>
                                    </div>

                                    <p className="text-gray-400 text-sm leading-relaxed mb-4 border-l-2 border-gray-800 pl-3 group-hover:border-brand-yellow/50 transition-colors line-clamp-3 md:line-clamp-none">
                                        {step.description}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2">
                                        {step.tags.map((tag, tIdx) => (
                                            <span 
                                                key={tIdx} 
                                                className={`
                                                    text-[10px] uppercase font-bold px-2 py-1 rounded border transition-colors
                                                    ${isActive 
                                                        ? 'bg-brand-yellow/5 border-brand-yellow/30 text-brand-yellow' 
                                                        : 'bg-transparent border-gray-800 text-gray-600'
                                                    }
                                                `}
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            
                            {/* Active Indicator Bar (Left side) */}
                            <div className={`absolute left-0 top-0 bottom-0 w-1 bg-brand-yellow transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}></div>
                        </div>
                    );
                })}
            </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
