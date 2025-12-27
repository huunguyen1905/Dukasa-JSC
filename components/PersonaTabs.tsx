import React, { useState } from 'react';
import { Rocket, TrendingUp, Crown, ArrowRight } from 'lucide-react';
import FadeIn from './FadeIn';

type PersonaType = 'STARTUP' | 'SME' | 'ENTERPRISE';

const content = {
  STARTUP: {
    title: "Xây Dựng Đế Chế Từ Con Số 0",
    desc: "Bạn có sản phẩm tuyệt vời nhưng chưa ai biết đến? Chúng tôi giúp bạn thiết lập nhận diện thương hiệu chuẩn quốc tế và kéo Traffic ngay trong tháng đầu tiên.",
    focus: ["Brand Identity", "Go-to-market Strategy", "Website UI/UX"],
    cta: "Tư Vấn Gói Khởi Tạo",
    icon: <Rocket size={24} />
  },
  SME: {
    title: "Bứt Phá Doanh Thu & Mở Rộng Quy Mô",
    desc: "Đã có khách hàng nhưng tăng trưởng đang chững lại? Giải pháp Performance Marketing của DUHAVA sẽ tối ưu hóa từng đồng chi phí quảng cáo để nhân bản doanh thu.",
    focus: ["Performance Ads", "SEO Tổng Thể", "Automation CRM"],
    cta: "Tư Vấn Gói Tăng Trưởng",
    icon: <TrendingUp size={24} />
  },
  ENTERPRISE: {
    title: "Thống Trị Thị Trường & Bảo Vệ Vị Thế",
    desc: "Dành cho những người dẫn đầu muốn duy trì khoảng cách với đối thủ. Chiến lược tổng thể bao gồm quản trị khủng hoảng, Tech-stack riêng biệt và Creative độc bản.",
    focus: ["CMO Outsourcing", "Crisis Management", "Custom Tech Stack"],
    cta: "Liên Hệ Cấp Cao",
    icon: <Crown size={24} />
  }
};

const PersonaTabs: React.FC<{ onCtaClick: () => void }> = ({ onCtaClick }) => {
  const [activeTab, setActiveTab] = useState<PersonaType>('SME');

  return (
    <section className="bg-brand-black py-24 relative">
       <div className="container mx-auto px-6">
            <FadeIn>
                <div className="text-center mb-12">
                    <h2 className="text-gray-500 font-bold tracking-widest uppercase mb-4 text-xs">Customized Strategy</h2>
                    <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">
                        Bạn Đang Ở Giai Đoạn Nào?
                    </h3>
                </div>
            </FadeIn>

            {/* Tabs Header */}
            <div className="flex justify-center mb-12">
                <div className="bg-gray-900 p-1 rounded-full border border-gray-800 inline-flex">
                    {(Object.keys(content) as PersonaType[]).map((key) => (
                        <button
                            key={key}
                            onClick={() => setActiveTab(key)}
                            className={`
                                px-6 py-3 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2
                                ${activeTab === key 
                                    ? 'bg-brand-yellow text-black shadow-lg' 
                                    : 'text-gray-400 hover:text-white'
                                }
                            `}
                        >
                            {key === 'STARTUP' && <Rocket size={16} />}
                            {key === 'SME' && <TrendingUp size={16} />}
                            {key === 'ENTERPRISE' && <Crown size={16} />}
                            <span className="hidden md:inline">{key}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            <FadeIn key={activeTab} className="max-w-4xl mx-auto">
                <div className="bg-gradient-to-b from-gray-900 to-black border border-gray-800 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden group">
                    {/* Background Icon */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-800 opacity-20 transform scale-[5] pointer-events-none transition-transform duration-700 group-hover:scale-[6] group-hover:rotate-12">
                        {content[activeTab].icon}
                    </div>
                    
                    <div className="relative z-10">
                        <h4 className="text-2xl md:text-4xl font-black text-white mb-6 leading-tight">
                            {content[activeTab].title}
                        </h4>
                        <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
                            {content[activeTab].desc}
                        </p>

                        <div className="flex flex-wrap justify-center gap-3 mb-10">
                            {content[activeTab].focus.map((item, idx) => (
                                <span key={idx} className="bg-gray-800/50 border border-gray-700 text-gray-300 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide">
                                    {item}
                                </span>
                            ))}
                        </div>

                        <button 
                            onClick={onCtaClick}
                            className="inline-flex items-center gap-2 bg-white text-black font-black uppercase py-4 px-8 rounded-full hover:bg-brand-yellow transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-brand-yellow/40"
                        >
                            {content[activeTab].cta} <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </FadeIn>
       </div>
    </section>
  );
};

export default PersonaTabs;