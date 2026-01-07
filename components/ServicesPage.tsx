
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ContactModal from './ContactModal';
import { Service } from '../types';
import { Sparkles, ArrowRight, Zap, ShieldCheck, Cpu, Layers } from 'lucide-react';
import FadeIn from './FadeIn';
import WorldClassBackground from './WorldClassBackground';

interface ServicesPageProps {
  services: Service[];
  onOpenAdmin?: () => void;
}

const ServicesPage: React.FC<ServicesPageProps> = ({ services, onOpenAdmin }) => {
  const navigate = useNavigate();
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
      window.scrollTo(0, 0);
      document.title = "Dịch Vụ & Giải Pháp - DUHAVA Agency";
  }, []);

  return (
    <div className="bg-brand-black min-h-screen text-white font-sans selection:bg-brand-yellow selection:text-black">
      <WorldClassBackground />
      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      {/* HEADER SECTION */}
      <section className="pt-40 pb-20 px-6 relative border-b border-gray-800">
          <div className="container mx-auto text-center relative z-10">
              <FadeIn>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 text-brand-yellow text-[10px] font-bold uppercase tracking-widest mb-6">
                    <Sparkles size={12} />
                    <span>Our Expertise</span>
                </div>
                <h1 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6">
                    Giải Pháp <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-white">Toàn Diện</span>
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                    Hệ sinh thái dịch vụ Digital Marketing khép kín, được thiết kế để tối ưu hóa tăng trưởng và định vị thương hiệu dẫn đầu.
                </p>
              </FadeIn>
          </div>
      </section>

      {/* SERVICES LIST (ZIGZAG LAYOUT) */}
      <section className="py-24 px-6 relative">
          <div className="container mx-auto">
              <div className="space-y-32">
                  {services.map((service, index) => (
                      <FadeIn key={service.id} delay={index * 100}>
                          <div 
                            className={`flex flex-col lg:flex-row gap-12 lg:gap-24 items-center ${index % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}
                          >
                              {/* Image Side - Clickable */}
                              <div className="w-full lg:w-1/2 group cursor-pointer" onClick={() => navigate(`/service/${service.id}`)}>
                                  <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-gray-800 shadow-2xl">
                                      <img 
                                          src={service.imageUrl} 
                                          alt={service.title} 
                                          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110 filter brightness-[0.8] group-hover:brightness-100"
                                      />
                                      <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 to-transparent"></div>
                                      
                                      {/* Decorative Elements */}
                                      <div className="absolute top-6 right-6 w-16 h-16 border-t border-r border-brand-yellow/30 rounded-tr-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                      <div className="absolute bottom-6 left-6 w-16 h-16 border-b border-l border-brand-yellow/30 rounded-bl-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                      {/* Hover Badge */}
                                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/10 backdrop-blur-md border border-white/20 text-white w-20 h-20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-500">
                                          <ArrowRight size={32} className="-rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                                      </div>
                                  </div>
                              </div>

                              {/* Content Side - NOW CLICKABLE */}
                              <div 
                                className="w-full lg:w-1/2 cursor-pointer group" 
                                onClick={() => navigate(`/service/${service.id}`)}
                              >
                                  <div className="flex items-center gap-4 mb-6">
                                      <span className="text-brand-yellow font-mono text-xl font-bold">0{index + 1}</span>
                                      <span className="h-[1px] w-12 bg-gray-800"></span>
                                      <div className="p-2 bg-gray-900 rounded-lg border border-gray-800 text-brand-yellow group-hover:bg-brand-yellow group-hover:text-black transition-colors">
                                          <Layers size={18} />
                                      </div>
                                  </div>

                                  <h3 className="text-3xl md:text-5xl font-black text-white uppercase mb-6 leading-[1.1] tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                                      {service.title}
                                  </h3>
                                  
                                  <p className="text-gray-400 text-lg leading-relaxed mb-8 border-l-2 border-brand-yellow/50 pl-6 group-hover:border-brand-yellow transition-colors">
                                      {service.description}
                                  </p>
                                  
                                  <div className="grid grid-cols-2 gap-4 mb-10">
                                      {['Chiến Lược', 'Thực Thi', 'Tối Ưu', 'Báo Cáo'].map((tag, i) => (
                                          <div key={i} className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase">
                                              <ShieldCheck size={14} className="text-brand-yellow" /> {tag}
                                          </div>
                                      ))}
                                  </div>

                                  <button 
                                      className="group/btn flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-brand-yellow transition-all shadow-lg hover:shadow-brand-yellow/20"
                                  >
                                      Xem Chi Tiết <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                                  </button>
                              </div>
                          </div>
                      </FadeIn>
                  ))}
              </div>
          </div>
      </section>

      {/* PROCESS / WHY US MINI SECTION */}
      <section className="py-24 bg-gray-900/30 border-t border-gray-800">
          <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                  <h3 className="text-3xl font-black text-white uppercase mb-4">Quy Trình Chuẩn Quốc Tế</h3>
                  <p className="text-gray-400">Đảm bảo hiệu quả tối đa cho từng đồng chi phí đầu tư.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  {[
                      { icon: <Cpu size={32}/>, title: "Phân Tích Dữ Liệu", desc: "Audit hiện trạng và nghiên cứu đối thủ." },
                      { icon: <Layers size={32}/>, title: "Lập Chiến Lược", desc: "Xây dựng lộ trình thực thi may đo." },
                      { icon: <Zap size={32}/>, title: "Triển Khai Tốc Độ", desc: "Thực thi nhanh, chính xác, đúng KPI." },
                      { icon: <ShieldCheck size={32}/>, title: "Tối Ưu & Báo Cáo", desc: "Đo lường real-time, minh bạch ngân sách." }
                  ].map((step, idx) => (
                      <FadeIn key={idx} delay={idx * 100} direction="up">
                          <div className="bg-brand-black border border-gray-800 p-8 rounded-2xl text-center group hover:border-brand-yellow/50 transition-colors">
                              <div className="w-16 h-16 mx-auto bg-gray-900 rounded-full flex items-center justify-center text-gray-500 mb-6 group-hover:text-brand-yellow group-hover:bg-brand-yellow/10 transition-all">
                                  {step.icon}
                              </div>
                              <h4 className="text-lg font-bold text-white uppercase mb-2">{step.title}</h4>
                              <p className="text-sm text-gray-500">{step.desc}</p>
                          </div>
                      </FadeIn>
                  ))}
              </div>
          </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-brand-yellow relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-multiply"></div>
          <div className="container mx-auto px-6 text-center relative z-10">
              <FadeIn>
                <h2 className="text-4xl md:text-6xl font-black text-brand-black uppercase mb-6 leading-none">
                    Bạn chưa tìm thấy giải pháp?
                </h2>
                <p className="text-brand-black/80 text-xl font-medium mb-10 max-w-2xl mx-auto">
                    Đừng lo lắng. Chúng tôi cung cấp các gói tư vấn "May Đo" (Customized) dành riêng cho mô hình kinh doanh đặc thù của bạn.
                </p>
                <button 
                    onClick={() => setIsContactOpen(true)}
                    className="bg-black text-white text-xl font-bold py-5 px-12 rounded-full hover:scale-105 transition-transform shadow-2xl flex items-center gap-3 mx-auto"
                >
                    <Zap size={20} /> Liên Hệ Tư Vấn Riêng
                </button>
              </FadeIn>
          </div>
      </section>

      <Footer onOpenAdmin={onOpenAdmin || (() => navigate('/admin-login'))} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
};

export default ServicesPage;
