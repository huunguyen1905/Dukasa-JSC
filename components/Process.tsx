
import React, { useEffect, useRef, useState } from 'react';
import { Search, Map, Zap, TrendingUp, Clock, Hash, CheckCircle2, CircleDashed } from 'lucide-react';
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
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      
      const { top, height } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress: 0 when top enters bottom of screen, 1 when bottom leaves top of screen
      // Adjusted for a smoother "fill" experience that starts when the timeline is centered
      const startOffset = windowHeight * 0.6;
      const endOffset = windowHeight * 0.4;
      
      const scrollY = -top + startOffset;
      const maxScroll = height - endOffset;
      
      let progress = scrollY / maxScroll;
      progress = Math.max(0, Math.min(1, progress));
      
      setScrollProgress(progress * 100);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="bg-brand-black py-32 relative overflow-hidden">
      
      {/* Background Tech Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-transparent to-brand-black pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* HEADER */}
        <FadeIn>
            <div className="text-center mb-24 max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
                    <span className="w-2 h-2 rounded-full bg-brand-yellow animate-pulse"></span>
                    <span className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.2em]">Process Workflow</span>
                </div>
                <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-tight mb-6">
                    Lộ Trình <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-white">Thực Thi Chuẩn</span>
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed">
                    Quy trình 4 bước khép kín biến mục tiêu kinh doanh thành kết quả thực tế. <br className="hidden md:block"/>Tối ưu hóa thời gian, minh bạch ngân sách và cam kết hiệu quả.
                </p>
            </div>
        </FadeIn>

        {/* TIMELINE CONTAINER */}
        <div ref={containerRef} className="relative max-w-6xl mx-auto">
            
            {/* CENTRAL LINE (Desktop) / LEFT LINE (Mobile) */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-gray-800 transform md:-translate-x-1/2 h-full rounded-full">
                {/* Progress Fill */}
                <div 
                    className="absolute top-0 left-0 w-full bg-gradient-to-b from-brand-yellow via-yellow-400 to-brand-yellow transition-all duration-300 ease-out shadow-[0_0_15px_#FACC15]"
                    style={{ height: `${scrollProgress}%` }}
                ></div>
            </div>

            {/* STEPS */}
            <div className="space-y-12 md:space-y-24">
                {steps.map((step, index) => {
                    const isEven = index % 2 === 0;
                    // Determine if this step is "active" based on scroll progress
                    // Rough estimate: step 1 active at >10%, step 2 at >35%, etc.
                    const threshold = (index / steps.length) * 100;
                    const isActive = scrollProgress > threshold;

                    return (
                        <div key={index} className={`relative flex flex-col md:flex-row items-center w-full ${isEven ? 'md:flex-row-reverse' : ''}`}>
                            
                            {/* 1. CONTENT SIDE */}
                            <div className="w-full md:w-[45%] pl-20 md:pl-0 md:pr-16 md:text-right group">
                                <FadeIn delay={index * 100} direction={isEven ? 'left' : 'right'}>
                                    <div className={`transition-all duration-500 ${isEven ? 'md:text-left md:pl-16 md:pr-0' : ''}`}>
                                        <div className="flex items-center gap-3 mb-3 md:justify-end justify-start">
                                            {isEven && <span className="hidden md:inline-block w-8 h-[1px] bg-brand-yellow/50"></span>}
                                            <span className="text-brand-yellow font-mono text-xs font-bold uppercase tracking-widest">{step.subtitle}</span>
                                            {!isEven && <span className="hidden md:inline-block w-8 h-[1px] bg-brand-yellow/50"></span>}
                                        </div>
                                        
                                        <h4 className="text-2xl md:text-3xl font-black text-white uppercase mb-4 group-hover:text-brand-yellow transition-colors">
                                            {step.title}
                                        </h4>
                                        
                                        <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6 border-l-2 border-gray-800 pl-4 md:border-l-0 md:border-r-2 md:pr-4 md:pl-0">
                                            {isEven ? (
                                                <span className="md:border-r-0 md:pr-0 md:border-l-2 md:border-gray-800 md:pl-4 block">{step.description}</span>
                                            ) : (
                                                step.description
                                            )}
                                        </p>

                                        {/* Tags & Duration */}
                                        <div className={`flex flex-wrap gap-2 ${isEven ? 'md:justify-start' : 'md:justify-end'}`}>
                                            <span className="px-3 py-1 bg-gray-900 border border-gray-700 rounded text-[10px] font-bold text-white uppercase flex items-center gap-2">
                                                <Clock size={12} className="text-brand-yellow"/> {step.duration}
                                            </span>
                                            {step.tags.map((tag, i) => (
                                                <span key={i} className="px-3 py-1 bg-gray-900/50 border border-gray-800 rounded text-[10px] font-bold text-gray-500 uppercase">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </FadeIn>
                            </div>

                            {/* 2. CENTER NODE */}
                            <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center z-20">
                                <div className={`
                                    w-12 h-12 rounded-full border-4 flex items-center justify-center transition-all duration-500 bg-brand-black
                                    ${isActive ? 'border-brand-yellow shadow-[0_0_20px_rgba(250,204,21,0.5)] scale-110' : 'border-gray-800 grayscale'}
                                `}>
                                    <div className={`text-brand-yellow transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
                                        {step.icon}
                                    </div>
                                </div>
                            </div>

                            {/* 3. SPACER / ORNAMENT SIDE */}
                            <div className="w-full md:w-[45%] hidden md:block">
                                <div className={`absolute top-1/2 -translate-y-1/2 text-[120px] font-black text-gray-900 opacity-20 pointer-events-none select-none transition-all duration-700
                                    ${isEven ? 'right-0 translate-x-20' : 'left-0 -translate-x-20'}
                                    ${isActive ? 'opacity-40 scale-110 text-gray-800' : ''}
                                `}>
                                    {step.id}
                                </div>
                            </div>

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
