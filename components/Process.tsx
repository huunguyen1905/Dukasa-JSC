import React from 'react';
import { Search, Map, Zap, TrendingUp, Clock, ArrowDown } from 'lucide-react';
import FadeIn from './FadeIn';

const steps = [
  {
    id: '01',
    title: 'Khám Phá & Thấu Hiểu',
    icon: <Search className="w-8 h-8 text-brand-black" />,
    description: 'Chúng tôi đào sâu vào dữ liệu (Data Mining), nghiên cứu đối thủ và vẽ chân dung khách hàng mục tiêu để tìm ra "Long Mạch" cho thương hiệu.',
    duration: '1 - 2 Tuần',
    color: 'bg-brand-yellow'
  },
  {
    id: '02',
    title: 'Chiến Lược May Đo',
    icon: <Map className="w-8 h-8 text-white" />,
    description: 'Thiết kế lộ trình tăng trưởng riêng biệt (Tailored Roadmap). Kết hợp đa kênh (Omnichannel) từ SEO, Ads đến Social để tối ưu hóa điểm chạm.',
    duration: '1 Tuần',
    color: 'bg-blue-600'
  },
  {
    id: '03',
    title: 'Thực Thi Thần Tốc',
    icon: <Zap className="w-8 h-8 text-white" />,
    description: 'Triển khai chiến dịch với tốc độ và sự chính xác tuyệt đối. Hệ thống báo cáo Real-time giúp bạn nắm bắt hiệu quả từng đồng chi phí.',
    duration: '2 - 4 Tuần / Liên tục',
    color: 'bg-purple-600'
  },
  {
    id: '04',
    title: 'Tăng Trưởng & Mở Rộng',
    icon: <TrendingUp className="w-8 h-8 text-white" />,
    description: 'Liên tục A/B Testing, tối ưu hóa tỷ lệ chuyển đổi (CRO) và mở rộng quy mô (Scale-up) để nhân bản doanh thu bền vững.',
    duration: 'Dài hạn (Ongoing)',
    color: 'bg-green-600'
  }
];

const Process: React.FC = () => {
  return (
    <section className="bg-brand-black py-16 md:py-24 relative overflow-hidden">
      {/* Background Grid Line */}
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gray-800 transform -translate-x-1/2 z-0 hidden md:block"></div>

      <div className="container mx-auto px-6 relative z-10">
        <FadeIn>
            <div className="text-center mb-16 md:mb-24">
                <h2 className="text-brand-yellow font-bold tracking-widest uppercase mb-2">Quy Trình Làm Việc</h2>
                <h3 className="text-3xl md:text-6xl font-black text-white uppercase tracking-tighter mb-6">
                Lộ Trình <span className="text-gray-600">Thành Công</span>
                </h3>
                <div className="flex items-center justify-center gap-2 text-gray-500 text-sm animate-bounce">
                    <ArrowDown size={14}/> Cuộn để khám phá
                </div>
            </div>
        </FadeIn>

        <div className="flex flex-col gap-8 md:gap-24 relative">
          {steps.map((step, index) => (
            <div 
                key={index} 
                className="sticky top-24 md:top-32 group"
                style={{ zIndex: index + 1 }}
            >
                <FadeIn delay={index * 0}>
                    <div className="max-w-4xl mx-auto">
                        <div className={`
                            relative overflow-hidden rounded-2xl border border-gray-800 
                            bg-[#0a0a0a] backdrop-blur-xl
                            shadow-[0_-5px_30px_rgba(0,0,0,0.8)]
                            transition-all duration-500 ease-out 
                            hover:border-brand-yellow/50 hover:shadow-[0_0_30px_rgba(250,204,21,0.15)] hover:-translate-y-1
                            flex flex-col md:flex-row
                        `}>
                            {/* Mobile Header: Step Number & Icon */}
                            <div className="flex items-center justify-between p-5 border-b border-gray-800 md:hidden">
                                <span className="text-3xl font-black text-white/10">{step.id}</span>
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${step.id === '01' ? 'bg-brand-yellow text-black' : 'bg-gray-800 text-white'}`}>
                                    {React.cloneElement(step.icon as React.ReactElement<any>, { size: 20 })}
                                </div>
                            </div>

                            {/* Left Side: Visual & Number (Desktop) */}
                            <div className="hidden md:flex w-48 flex-col justify-between p-8 border-r border-gray-800 bg-gray-900/20 relative overflow-hidden">
                                <span className="text-8xl font-black text-white/5 absolute -top-4 -left-4 select-none">{step.id}</span>
                                <div className={`
                                    w-14 h-14 rounded-xl flex items-center justify-center shadow-lg relative z-10
                                    transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3
                                    ${step.id === '01' ? 'bg-brand-yellow' : 'bg-gray-800 border border-gray-700'}
                                `}>
                                    {step.icon}
                                </div>
                                <div className="h-full w-px bg-gray-800 absolute right-0 top-0 hidden"></div>
                            </div>

                            {/* Right Side: Content */}
                            <div className="flex-1 p-5 md:p-10 flex flex-col justify-center relative">
                                {/* Hover Effect: Duration Reveal (Desktop) */}
                                <div className="absolute top-6 right-6 md:right-10 flex items-center gap-2 overflow-hidden hidden md:flex">
                                    <div className="flex items-center gap-2 translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 bg-brand-yellow/10 border border-brand-yellow/30 px-3 py-1 rounded-full">
                                        <Clock size={14} className="text-brand-yellow"/>
                                        <span className="text-brand-yellow text-xs font-bold uppercase whitespace-nowrap">{step.duration}</span>
                                    </div>
                                </div>

                                <h4 className="text-xl md:text-3xl font-black text-white uppercase mb-3 md:mb-4 group-hover:text-brand-yellow transition-colors duration-300">
                                    {step.title}
                                </h4>
                                <p className="text-gray-400 text-sm md:text-lg leading-relaxed border-l-2 border-gray-800 pl-4 group-hover:border-brand-yellow transition-colors duration-300">
                                    {step.description}
                                </p>
                                
                                <div className="mt-4 md:hidden flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-gray-900/50 w-fit px-2 py-1 rounded">
                                    <Clock size={12} /> {step.duration}
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;