
import React, { useState } from 'react';
import { Check, Zap, Crown, Rocket, ArrowRight } from 'lucide-react';
import FadeIn from './FadeIn';

interface PricingProps {
  onCtaClick: () => void;
}

const Pricing: React.FC<PricingProps> = ({ onCtaClick }) => {
  const [isAnnual, setIsAnnual] = useState(false);

  const tiers = [
    {
      name: "Khởi Tạo (Essential)",
      description: "Xây dựng nền tảng thương hiệu vững chắc cho Start-up.",
      price: isAnnual ? "15.000.000" : "19.000.000",
      period: "/ tháng",
      icon: <Rocket className="w-6 h-6" />,
      features: [
        "Bộ nhận diện thương hiệu cơ bản",
        "Thiết kế Website UI/UX chuẩn SEO",
        "5 bài Content Social / tháng",
        "Setup hệ thống Google Maps",
        "Support 8/24"
      ],
      cta: "Bắt Đầu Ngay",
      highlight: false
    },
    {
      name: "Tăng Trưởng (Growth)",
      description: "Giải pháp Performance Marketing để bứt phá doanh số.",
      price: isAnnual ? "35.000.000" : "45.000.000",
      period: "/ tháng",
      icon: <Zap className="w-6 h-6 text-black" />,
      features: [
        "Tất cả quyền lợi gói Essential",
        "SEO tổng thể (Top 10 cam kết)",
        "Chạy Ads đa kênh (Fb, Google, TikTok)",
        "Video Viral Marketing hàng tháng",
        "Báo cáo Real-time Dashboard",
        "Support 24/7 Priority"
      ],
      cta: "Tư Vấn Gói Growth",
      highlight: true
    },
    {
      name: "Thống Trị (Dominance)",
      description: "Chiến lược tổng thể dành cho Tập đoàn & Doanh nghiệp lớn.",
      price: "Liên Hệ",
      period: "",
      icon: <Crown className="w-6 h-6" />,
      features: [
        "CMO Outsourcing (Giám đốc MKT thuê ngoài)",
        "Xây dựng App/Software riêng biệt",
        "Quản trị khủng hoảng truyền thông",
        "Booking KOCs/KOLs độc quyền",
        "Bảo trợ truyền thông báo chí",
        "Cam kết ROI > 300%"
      ],
      cta: "Liên Hệ Cấp Cao",
      highlight: false
    }
  ];

  return (
    <section id="bang-gia" className="bg-brand-black py-24 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-brand-dark to-transparent opacity-50"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <FadeIn>
            <div className="text-center mb-16">
                <h2 className="text-brand-yellow font-bold tracking-widest uppercase mb-2">Khoản Đầu Tư Chiến Lược</h2>
                <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-6">
                    Chọn Cấp Độ <span className="text-gray-600">Tăng Trưởng</span>
                </h3>
                
                {/* Billing Toggle */}
                <div className="flex items-center justify-center gap-4 mb-8">
                    <span className={`text-sm font-bold uppercase tracking-wider ${!isAnnual ? 'text-white' : 'text-gray-500'}`}>Hàng Tháng</span>
                    <button 
                        onClick={() => setIsAnnual(!isAnnual)}
                        className="w-16 h-8 bg-gray-800 rounded-full p-1 relative transition-colors duration-300 border border-gray-600"
                    >
                        <div className={`w-6 h-6 bg-brand-yellow rounded-full shadow-lg transform transition-transform duration-300 ${isAnnual ? 'translate-x-8' : 'translate-x-0'}`}></div>
                    </button>
                    <span className={`text-sm font-bold uppercase tracking-wider ${isAnnual ? 'text-white' : 'text-gray-500'}`}>
                        Hàng Quý <span className="text-brand-yellow text-xs ml-1 py-0.5 px-2 bg-brand-yellow/10 rounded-full">-20%</span>
                    </span>
                </div>
            </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
            {tiers.map((tier, index) => (
                <FadeIn key={index} delay={index * 100} className={`h-full ${tier.highlight ? 'md:-mt-8 md:-mb-8 z-10' : ''}`}>
                    <div 
                        className={`
                            relative h-full flex flex-col p-6 md:p-8 rounded-2xl border transition-all duration-500 group
                            ${tier.highlight 
                                ? 'bg-gray-900 border-brand-yellow shadow-[0_0_50px_rgba(250,204,21,0.15)] scale-100 md:scale-105' 
                                : 'bg-brand-dark/50 border-gray-800 hover:border-gray-600 hover:bg-gray-900'
                            }
                        `}
                    >
                        {tier.highlight && (
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-brand-yellow text-black text-xs font-black uppercase py-1 px-4 rounded-full tracking-widest shadow-lg">
                                Khuyên Dùng
                            </div>
                        )}

                        <div className="mb-6 md:mb-8">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 md:mb-6 ${tier.highlight ? 'bg-brand-yellow text-black' : 'bg-gray-800 text-white'}`}>
                                {tier.icon}
                            </div>
                            <h4 className="text-xl font-bold text-white uppercase mb-2">{tier.name}</h4>
                            <p className="text-gray-400 text-sm h-10">{tier.description}</p>
                        </div>

                        <div className="mb-6 md:mb-8 pb-6 md:pb-8 border-b border-gray-800">
                             <div className="flex items-baseline gap-1">
                                <span className={`text-3xl lg:text-4xl font-black tracking-tight ${tier.highlight ? 'text-brand-yellow' : 'text-white'}`}>
                                    {tier.price}
                                </span>
                                {tier.price !== 'Liên Hệ' && <span className="text-gray-500 text-sm font-bold">VNĐ</span>}
                            </div>
                            {tier.period && <div className="text-gray-500 text-sm font-medium mt-1">{tier.period}</div>}
                        </div>

                        <ul className="space-y-4 mb-8 flex-1">
                            {tier.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                                    <Check size={16} className={`mt-0.5 shrink-0 ${tier.highlight ? 'text-brand-yellow' : 'text-gray-500'}`} />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <button 
                            onClick={onCtaClick}
                            className={`
                                w-full py-3 md:py-4 rounded font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap text-xs md:text-sm
                                ${tier.highlight 
                                    ? 'bg-brand-yellow text-black hover:bg-white hover:shadow-lg' 
                                    : 'bg-transparent border border-gray-700 text-white hover:border-brand-yellow hover:text-brand-yellow'
                                }
                            `}
                        >
                            {tier.cta} {tier.highlight && <ArrowRight size={18} />}
                        </button>
                    </div>
                </FadeIn>
            ))}
        </div>

        {/* Enterprise Banner */}
        <FadeIn delay={400}>
            <div className="mt-20 max-w-4xl mx-auto bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="relative z-10 text-center md:text-left">
                    <h4 className="text-2xl font-black text-white uppercase mb-2">Bạn cần giải pháp "May Đo" riêng biệt?</h4>
                    <p className="text-gray-400">Chúng tôi sẵn sàng ký NDA và tư vấn giải pháp bảo mật cho các dự án đặc thù.</p>
                </div>
                <button 
                    onClick={onCtaClick}
                    className="relative z-10 whitespace-nowrap px-8 py-3 bg-white/10 border border-white/20 rounded-full text-white font-bold hover:bg-white hover:text-black transition-all"
                >
                    Liên Hệ Enterprise
                </button>
            </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Pricing;
