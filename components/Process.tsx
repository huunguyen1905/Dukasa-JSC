import React from 'react';
import { Search, Map, Zap, TrendingUp, Clock, ArrowDown, ChevronRight } from 'lucide-react';
import FadeIn from './FadeIn';

const steps = [
  {
    id: '01',
    title: 'Khám Phá & Thấu Hiểu',
    subtitle: 'Data Mining & Insight',
    icon: <Search className="w-6 h-6" />,
    description: 'Chúng tôi đào sâu vào dữ liệu (Data Mining), nghiên cứu đối thủ và vẽ chân dung khách hàng mục tiêu để tìm ra "Long Mạch" cho thương hiệu.',
    duration: '1 - 2 Tuần',
    tags: ['Audit', 'Research', 'Persona']
  },
  {
    id: '02',
    title: 'Chiến Lược May Đo',
    subtitle: 'Tailored Roadmap',
    icon: <Map className="w-6 h-6" />,
    description: 'Thiết kế lộ trình tăng trưởng riêng biệt. Kết hợp đa kênh (Omnichannel) từ SEO, Ads đến Social để tối ưu hóa điểm chạm khách hàng.',
    duration: '1 Tuần',
    tags: ['Planning', 'KPIs', 'Media Mix']
  },
  {
    id: '03',
    title: 'Thực Thi Thần Tốc',
    subtitle: 'Execution Excellence',
    icon: <Zap className="w-6 h-6" />,
    description: 'Triển khai chiến dịch với tốc độ và sự chính xác tuyệt đối. Hệ thống báo cáo Real-time giúp bạn nắm bắt hiệu quả từng đồng chi phí.',
    duration: '2 - 4 Tuần / Liên tục',
    tags: ['Setup', 'Optimization', 'Tracking']
  },
  {
    id: '04',
    title: 'Tăng Trưởng & Mở Rộng',
    subtitle: 'Scale-up & Sustain',
    icon: <TrendingUp className="w-6 h-6" />,
    description: 'Liên tục A/B Testing, tối ưu hóa tỷ lệ chuyển đổi (CRO) và mở rộng quy mô (Scale-up) để nhân bản doanh thu bền vững.',
    duration: 'Dài hạn (Ongoing)',
    tags: ['A/B Test', 'CRO', 'Scale']
  }
];

const Process: React.FC = () => {
  return (
    <section className="bg-brand-black py-24 md:py-32 relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-brand-yellow/5 rounded-full blur-[120px] pointer-events-none opacity-50"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* HEADER SECTION */}
        <FadeIn>
            <div className="text-center mb-24 max-w-4xl mx-auto">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="h-px w-12 bg-brand-yellow/50"></div>
                    <span className="text-brand-yellow font-bold tracking-[0.2em] uppercase text-xs">Quy Trình Chuẩn Quốc Tế</span>
                    <div className="h-px w-12 bg-brand-yellow/50"></div>
                </div>
                <h3 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mb-8 leading-tight">
                    Lộ Trình <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-b from-brand-yellow to-yellow-700">Thành Công</span>
                </h3>
                <p className="text-gray-400 text-lg font-light leading-relaxed">
                    Không có phép màu nào cả. Chỉ có Chiến lược đúng đắn, Thực thi xuất sắc và Tối ưu liên tục.
                </p>
            </div>
        </FadeIn>

        {/* TIMELINE CONTAINER */}
        <div className="relative">
            {/* The Central Golden Line (Desktop) */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-yellow/30 to-transparent transform -translate-x-1/2 hidden md:block z-0"></div>

            <div className="flex flex-col gap-12 md:gap-0">
                {steps.map((step, index) => (
                    <div key={index} className={`flex flex-col md:flex-row items-center relative ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''} group`}>
                        
                        {/* CENTER NODE (Desktop) */}
                        <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden md:flex flex-col items-center justify-center z-20">
                            <div className="w-4 h-4 bg-black border-2 border-brand-yellow rounded-full shadow-[0_0_15px_rgba(250,204,21,0.8)] group-hover:scale-150 transition-transform duration-500"></div>
                        </div>

                        {/* EMPTY SPACER for alignment */}
                        <div className="flex-1 hidden md:block"></div>

                        {/* CONTENT CARD */}
                        <div className="flex-1 w-full md:w-auto p-4 md:p-12">
                            <FadeIn direction={index % 2 === 0 ? 'right' : 'left'} delay={index * 100}>
                                <div className="relative bg-[#0A0A0A] border border-gray-800 p-8 md:p-10 rounded-2xl group-hover:border-brand-yellow/50 transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(250,204,21,0.05)] overflow-hidden">
                                    
                                    {/* Giant Outline Number Background */}
                                    <div className="absolute -top-6 -right-6 text-9xl font-black text-transparent opacity-10 select-none z-0" 
                                         style={{ WebkitTextStroke: '2px #333' }}>
                                        {step.id}
                                    </div>

                                    <div className="relative z-10">
                                        {/* Header: Icon & Duration */}
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="w-14 h-14 bg-gray-900 rounded-xl flex items-center justify-center text-brand-yellow border border-gray-800 group-hover:bg-brand-yellow group-hover:text-black transition-all duration-300 shadow-lg">
                                                {step.icon}
                                            </div>
                                            <div className="flex items-center gap-2 bg-gray-900/80 px-3 py-1.5 rounded text-[10px] font-bold uppercase tracking-wider text-gray-400 border border-gray-800">
                                                <Clock size={12} className="text-brand-yellow" />
                                                {step.duration}
                                            </div>
                                        </div>

                                        {/* Titles */}
                                        <div className="mb-4">
                                            <div className="text-brand-yellow text-xs font-bold uppercase tracking-widest mb-1 opacity-80">{step.subtitle}</div>
                                            <h4 className="text-2xl md:text-3xl font-black text-white uppercase leading-none group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                                                {step.title}
                                            </h4>
                                        </div>

                                        {/* Description */}
                                        <p className="text-gray-400 text-sm leading-relaxed mb-6 border-l border-gray-800 pl-4 group-hover:border-brand-yellow transition-colors duration-500">
                                            {step.description}
                                        </p>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-800/50">
                                            {step.tags.map((tag, i) => (
                                                <span key={i} className="text-[10px] font-bold text-gray-500 bg-gray-900 px-2 py-1 rounded hover:text-white hover:bg-gray-800 transition-colors cursor-default">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    {/* Hover Corner Accent */}
                                    <div className="absolute bottom-0 right-0 w-12 h-12 bg-brand-yellow/10 rounded-tl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Connector */}
            <div className="flex justify-center mt-12">
                 <div className="flex flex-col items-center gap-2 animate-bounce">
                    <div className="w-px h-12 bg-gradient-to-b from-brand-yellow/50 to-transparent"></div>
                    <ArrowDown size={20} className="text-brand-yellow opacity-50" />
                 </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Process;