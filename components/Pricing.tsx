
import React from 'react';
import { Check, Zap, Briefcase, Infinity, TrendingUp, ArrowRight, Layers } from 'lucide-react';
import FadeIn from './FadeIn';

interface PricingProps {
  onCtaClick: () => void;
}

const Pricing: React.FC<PricingProps> = ({ onCtaClick }) => {
  const models = [
    {
      name: "Project-Based",
      subtitle: "Hợp Tác Theo Dự Án",
      description: "Giải pháp trọn gói cho các nhu cầu cụ thể, ngắn hạn với kết quả đầu ra rõ ràng.",
      icon: <Briefcase className="w-6 h-6" />,
      features: [
        "Thiết kế Nhận diện thương hiệu (Branding)",
        "Thiết kế Website & Landing Page High-end",
        "Sản xuất TVC / Video Viral / Production",
        "Chiến dịch ra mắt sản phẩm (Launching)",
        "Bàn giao Source gốc & Tài sản số"
      ],
      cta: "Tư Vấn Dự Án",
      highlight: false
    },
    {
      name: "Monthly Retainer",
      subtitle: "Đồng Hành Dài Hạn",
      description: "DUHAVA trở thành phòng Marketing thuê ngoài của bạn. Cam kết KPI tăng trưởng theo tháng/quý.",
      icon: <Infinity className="w-6 h-6 text-black" />,
      features: [
        "Quản trị & Tối ưu đa kênh (Social, Web, Ads)",
        "Performance Marketing (Cam kết doanh số/Leads)",
        "SEO Tổng thể & Content Marketing định kỳ",
        "Báo cáo Real-time & Họp chiến lược hàng tuần",
        "Đội ngũ In-house: Account, Ads, Content, Design"
      ],
      cta: "Đăng Ký Tư Vấn Retainer",
      highlight: true
    },
    {
      name: "Consulting & Training",
      subtitle: "Tư Vấn & Đào Tạo",
      description: "Chuyển giao quy trình, công nghệ và chiến lược cho đội ngũ In-house của doanh nghiệp.",
      icon: <Layers className="w-6 h-6" />,
      features: [
        "Audit tổng thể sức khỏe doanh nghiệp số",
        "Xây dựng chiến lược Marketing tổng thể (Master Plan)",
        "Đào tạo kỹ năng thực chiến cho nhân sự",
        "Tư vấn chuyển đổi số & Automation CRM",
        "Giám sát & Tinh chỉnh quá trình thực thi"
      ],
      cta: "Liên Hệ Chuyên Gia",
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
                <h2 className="text-brand-yellow font-bold tracking-widest uppercase mb-2">Phương Thức Hợp Tác</h2>
                <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-6">
                    Linh Hoạt Theo <span className="text-gray-600">Mục Tiêu</span>
                </h3>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                    Chúng tôi không bán các gói dịch vụ cố định. Chúng tôi thiết kế mô hình hợp tác tối ưu nhất dựa trên giai đoạn phát triển và nguồn lực của doanh nghiệp bạn.
                </p>
            </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
            {models.map((model, index) => (
                <FadeIn key={index} delay={index * 100} className={`h-full ${model.highlight ? 'md:-mt-4 md:-mb-4 z-10' : ''}`}>
                    <div 
                        className={`
                            relative h-full flex flex-col p-8 md:p-10 rounded-3xl border transition-all duration-500 group
                            ${model.highlight 
                                ? 'bg-gray-900 border-brand-yellow shadow-[0_0_50px_rgba(250,204,21,0.15)] scale-100 md:scale-105' 
                                : 'bg-brand-dark/50 border-gray-800 hover:border-gray-600 hover:bg-gray-900'
                            }
                        `}
                    >
                        {model.highlight && (
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-brand-yellow text-black text-[10px] font-black uppercase py-2 px-6 rounded-full tracking-widest shadow-lg flex items-center gap-2 whitespace-nowrap">
                                <TrendingUp size={14} /> Khuyên Dùng Cho SMEs
                            </div>
                        )}

                        <div className="mb-8 text-center md:text-left">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 mx-auto md:mx-0 shadow-lg ${model.highlight ? 'bg-brand-yellow text-black' : 'bg-gray-800 text-white'}`}>
                                {model.icon}
                            </div>
                            <h4 className="text-2xl font-black text-white uppercase mb-2">{model.name}</h4>
                            <p className={`text-sm font-bold uppercase tracking-wider mb-4 ${model.highlight ? 'text-brand-yellow' : 'text-gray-500'}`}>{model.subtitle}</p>
                            <p className="text-gray-400 text-sm leading-relaxed">{model.description}</p>
                        </div>

                        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-8"></div>

                        <ul className="space-y-5 mb-10 flex-1">
                            {model.features.map((feature, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                                    <Check size={18} className={`mt-0.5 shrink-0 ${model.highlight ? 'text-brand-yellow' : 'text-gray-600'}`} />
                                    <span className="font-medium">{feature}</span>
                                </li>
                            ))}
                        </ul>

                        <button 
                            onClick={onCtaClick}
                            className={`
                                w-full py-4 rounded-xl font-black uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-3 text-xs md:text-sm
                                ${model.highlight 
                                    ? 'bg-brand-yellow text-black hover:bg-white hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]' 
                                    : 'bg-transparent border border-gray-600 text-white hover:border-brand-yellow hover:text-brand-yellow hover:bg-brand-yellow/5'
                                }
                            `}
                        >
                            {model.cta} {model.highlight && <ArrowRight size={18} />}
                        </button>
                    </div>
                </FadeIn>
            ))}
        </div>

        {/* Bottom Note */}
        <FadeIn delay={400}>
            <div className="mt-16 text-center">
                <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
                    <Zap size={14} className="text-brand-yellow"/>
                    <span>Chưa biết mô hình nào phù hợp? <button onClick={onCtaClick} className="text-white border-b border-white hover:text-brand-yellow hover:border-brand-yellow transition-colors font-bold ml-1">Trò chuyện với Chuyên gia</button></span>
                </p>
            </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default Pricing;
