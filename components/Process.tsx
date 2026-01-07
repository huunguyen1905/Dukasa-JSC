
import React, { useState, useEffect } from 'react';
import { Search, Map, Zap, TrendingUp, Clock, CheckCircle2, ArrowRight, ChevronRight, Layers } from 'lucide-react';
import FadeIn from './FadeIn';

const steps = [
  {
    id: 0,
    num: '01',
    title: 'Khám Phá & Thấu Hiểu',
    subtitle: 'Data Mining',
    icon: <Search className="w-6 h-6" />,
    description: 'Chúng tôi không đoán mò. Mọi chiến lược bắt đầu bằng việc đào sâu dữ liệu (Data Mining), Audit sức khỏe thương hiệu và giải mã Insight khách hàng để tìm ra "điểm nghẽn" tăng trưởng.',
    duration: '1 - 2 Tuần',
    deliverables: ['Brand Health Audit', 'Competitor Analysis', 'User Persona', 'SWOT Report']
  },
  {
    id: 1,
    num: '02',
    title: 'Chiến Lược May Đo',
    subtitle: 'Strategy & Planning',
    icon: <Map className="w-6 h-6" />,
    description: 'Thiết kế lộ trình tăng trưởng độc bản. Kết hợp đa kênh (Omnichannel) từ SEO, Ads đến Social để vây hãm tâm trí khách hàng tại mọi điểm chạm, tối ưu hóa ngân sách.',
    duration: '1 Tuần',
    deliverables: ['Master Marketing Plan', 'Media Buying Plan', 'Content Direction', 'KPI Commitment']
  },
  {
    id: 2,
    num: '03',
    title: 'Thực Thi Thần Tốc',
    subtitle: 'High-Speed Execution',
    icon: <Zap className="w-6 h-6" />,
    description: 'Triển khai chiến dịch với tốc độ ánh sáng. Đội ngũ In-house chuyên nghiệp đảm bảo mọi ấn phẩm (Content, Visual, Video) đều đạt chuẩn High-End và đúng tiến độ.',
    duration: '2 - 4 Tuần',
    deliverables: ['Campaign Setup', 'Creative Production', 'A/B Testing', 'Real-time Dashboard']
  },
  {
    id: 3,
    num: '04',
    title: 'Tăng Trưởng & Mở Rộng',
    subtitle: 'Scale & Dominate',
    icon: <TrendingUp className="w-6 h-6" />,
    description: 'Không dừng lại ở KPI. Chúng tôi liên tục tối ưu hóa tỷ lệ chuyển đổi (CRO), mở rộng quy mô (Scale-up) và biến khách hàng tiềm năng thành khách hàng trung thành.',
    duration: 'Ongoing',
    deliverables: ['Monthly Report', 'CRO Optimization', 'Remarketing Funnel', 'Scale-up Strategy']
  }
];

const Process: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play feature (pauses on interaction)
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 5000); // Change every 5 seconds
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    setIsAutoPlaying(false); // Stop auto-play when user interacts
  };

  const activeData = steps[activeStep];

  return (
    <section className="bg-black py-24 relative overflow-hidden border-t border-gray-900">
      
      {/* Tech Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
      
      {/* Glow Effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-yellow/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* HEADER */}
        <div className="text-center mb-16">
            <FadeIn>
                <h2 className="text-brand-yellow font-bold tracking-[0.2em] uppercase text-xs mb-3 flex items-center justify-center gap-2">
                    <Layers size={14} /> Workflow 4.0
                </h2>
                <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                    Lộ Trình <span className="text-gray-600">Thực Thi</span>
                </h3>
            </FadeIn>
        </div>

        {/* --- INTERACTIVE DASHBOARD AREA --- */}
        <div className="max-w-6xl mx-auto bg-gray-900/30 border border-gray-800 rounded-3xl overflow-hidden backdrop-blur-xl relative">
            
            {/* 1. PROGRESS NAVIGATION BAR */}
            <div className="flex flex-col md:flex-row border-b border-gray-800">
                {steps.map((step, index) => {
                    const isActive = index === activeStep;
                    return (
                        <button
                            key={step.id}
                            onClick={() => handleStepClick(index)}
                            className={`
                                flex-1 py-6 px-4 relative group transition-all duration-300 text-left md:text-center
                                ${isActive ? 'bg-white/5' : 'hover:bg-white/5'}
                            `}
                        >
                            {/* Active Indicator Line */}
                            <div className={`absolute top-0 left-0 right-0 h-[2px] transition-all duration-500 ${isActive ? 'bg-brand-yellow shadow-[0_0_10px_#FACC15]' : 'bg-transparent'}`}></div>
                            
                            <div className="flex md:flex-col items-center justify-start md:justify-center gap-3">
                                <span className={`text-2xl font-black font-mono transition-colors ${isActive ? 'text-brand-yellow' : 'text-gray-600'}`}>
                                    {step.num}
                                </span>
                                <span className={`text-xs font-bold uppercase tracking-wider transition-colors ${isActive ? 'text-white' : 'text-gray-500'}`}>
                                    {step.subtitle}
                                </span>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* 2. CONTENT DISPLAY AREA */}
            <div className="p-8 md:p-12 min-h-[400px] relative flex flex-col md:flex-row gap-12 items-center">
                
                {/* Background Number Watermark */}
                <div className="absolute right-0 bottom-0 text-[200px] font-black text-white/5 leading-none pointer-events-none select-none -mb-10 -mr-10">
                    {activeData.num}
                </div>

                {/* Left: Icon & Title */}
                <div className="w-full md:w-1/3 relative z-10">
                    <div key={activeData.id} className="animate-in slide-in-from-left-8 fade-in duration-500">
                        <div className="w-16 h-16 bg-brand-yellow rounded-2xl flex items-center justify-center text-black mb-6 shadow-[0_0_30px_rgba(250,204,21,0.3)]">
                            {activeData.icon}
                        </div>
                        <h4 className="text-3xl md:text-4xl font-black text-white uppercase leading-tight mb-2">
                            {activeData.title}
                        </h4>
                        <div className="flex items-center gap-2 text-brand-yellow text-xs font-bold uppercase tracking-widest mt-4 bg-brand-yellow/10 px-3 py-1 rounded w-fit border border-brand-yellow/20">
                            <Clock size={14} /> Thời gian: {activeData.duration}
                        </div>
                    </div>
                </div>

                {/* Divider (Desktop) */}
                <div className="hidden md:block w-[1px] h-40 bg-gray-800"></div>

                {/* Right: Description & Deliverables */}
                <div className="w-full md:w-2/3 relative z-10">
                    <div key={activeData.id + '-content'} className="animate-in slide-in-from-right-8 fade-in duration-500 delay-100">
                        <p className="text-gray-300 text-lg leading-relaxed mb-8 font-light">
                            {activeData.description}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {activeData.deliverables.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3 bg-black/40 border border-white/5 p-3 rounded-xl">
                                    <CheckCircle2 size={16} className="text-brand-yellow shrink-0" />
                                    <span className="text-sm text-gray-400 font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

            {/* Navigation Controls (Bottom Right) */}
            <div className="absolute bottom-6 right-6 z-20 flex gap-2">
                <button 
                    onClick={() => handleStepClick((activeStep - 1 + steps.length) % steps.length)}
                    className="p-2 rounded-full border border-gray-700 text-gray-400 hover:text-white hover:border-white transition-colors"
                >
                    <ChevronRight size={20} className="rotate-180"/>
                </button>
                <button 
                    onClick={() => handleStepClick((activeStep + 1) % steps.length)}
                    className="p-2 rounded-full border border-gray-700 text-gray-400 hover:text-white hover:border-white transition-colors"
                >
                    <ChevronRight size={20} />
                </button>
            </div>

        </div>

        {/* CTA */}
        <div className="text-center mt-12">
            <button 
                onClick={() => (document.querySelector('button[aria-label="Nhận Tư Vấn"]') as HTMLElement)?.click()}
                className="inline-flex items-center gap-2 text-gray-400 hover:text-brand-yellow transition-colors font-bold uppercase text-xs tracking-widest border-b border-gray-800 hover:border-brand-yellow pb-1"
            >
                Bắt đầu quy trình ngay <ArrowRight size={14} />
            </button>
        </div>

      </div>
    </section>
  );
};

export default Process;
