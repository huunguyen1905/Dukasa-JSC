
import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ContactModal from './ContactModal';
import WorldClassBackground from './WorldClassBackground';
import FadeIn from './FadeIn';
import { Target, Eye, Zap, Award, Users, Globe, ArrowRight, History } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Team from './Team';
import TechStack from './TechStack';
import { TeamMember } from '../types';

interface AboutPageProps {
    team?: TeamMember[];
}

const AboutPage: React.FC<AboutPageProps> = ({ team = [] }) => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const navigate = useNavigate();

  return (
    // FIX: Added overflow-x-hidden, w-full, max-w-[100vw] to prevent horizontal scroll
    <div className="bg-brand-black min-h-screen text-white font-sans selection:bg-brand-yellow selection:text-black overflow-x-hidden w-full max-w-[100vw] relative">
      <WorldClassBackground />
      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      {/* HEADER SECTION */}
      <section className="pt-40 pb-20 px-6 relative border-b border-gray-800">
          <div className="container mx-auto text-center relative z-10">
              <FadeIn>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 text-brand-yellow text-[10px] font-bold uppercase tracking-widest mb-6">
                    <Users size={12} />
                    <span>Who We Are</span>
                </div>
                <h1 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6 break-words">
                    Đế Chế <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-white">Sáng Tạo Số</span>
                </h1>
                <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed font-light">
                    Hành trình từ một Startup công nghệ nhỏ bé đến vị thế đối tác chiến lược của hàng trăm doanh nghiệp lớn. Đây là câu chuyện về đam mê, dữ liệu và sự hoàn hảo.
                </p>
              </FadeIn>
          </div>
      </section>

      {/* 1. VISION & MISSION - FULL DETAIL */}
      <section className="py-24 px-6 relative">
        <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center">
                <FadeIn>
                    <h2 className="text-3xl font-black text-white uppercase mb-6">Sứ Mệnh & Tầm Nhìn</h2>
                    <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                        Tại DUHAVA, chúng tôi tin rằng Marketing không chỉ là chạy quảng cáo hay làm hình ảnh đẹp. Đó là cuộc chiến về <strong className="text-white">Chiếm lĩnh tâm trí</strong> khách hàng.
                    </p>
                    <div className="space-y-8">
                        <div className="flex gap-6">
                            <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center text-brand-yellow shrink-0 border border-gray-800">
                                <Target size={32} />
                            </div>
                            <div className="min-w-0 flex-1"> {/* min-w-0 prevents flex child from overflowing */}
                                <h4 className="text-xl font-bold text-white mb-2 uppercase">Sứ Mệnh (Mission)</h4>
                                <p className="text-gray-500 leading-relaxed text-sm break-words">
                                    Trao quyền cho doanh nghiệp Việt Nam bằng vũ khí công nghệ hạng nặng. Giúp doanh nghiệp không chỉ cạnh tranh sòng phẳng mà còn thiết lập luật chơi mới trên thị trường.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-6">
                            <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center text-blue-500 shrink-0 border border-gray-800">
                                <Eye size={32} />
                            </div>
                            <div className="min-w-0 flex-1">
                                <h4 className="text-xl font-bold text-white mb-2 uppercase">Tầm Nhìn (Vision)</h4>
                                <p className="text-gray-500 leading-relaxed text-sm break-words">
                                    Trở thành Top 1 Growth Agency tại Đông Nam Á vào năm 2028. Nơi hội tụ của những bộ óc sáng tạo nhất, định hình lại chuẩn mực ngành Digital Marketing.
                                </p>
                            </div>
                        </div>
                    </div>
                </FadeIn>
                
                <FadeIn direction="left" delay={200}>
                    <div className="relative rounded-3xl overflow-hidden border border-gray-800 aspect-square w-full">
                        <img 
                            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000" 
                            alt="Team meeting" 
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                    </div>
                </FadeIn>
            </div>
        </div>
      </section>

      {/* 2. CORE VALUES */}
      <section className="py-24 bg-gray-900/30 border-y border-gray-800">
        <div className="container mx-auto px-6">
            <FadeIn>
                <div className="text-center mb-16">
                    <h3 className="text-2xl font-black text-white uppercase tracking-widest">Giá Trị Cốt Lõi (Core Values)</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        { icon: Zap, title: "Tốc Độ", desc: "Trong kỷ nguyên số, chậm là chết. Chúng tôi triển khai thần tốc, chính xác từng giây." },
                        { icon: Award, title: "Cam Kết", desc: "KPI rõ ràng, nói được làm được. Không vẽ vời, chỉ tập trung vào kết quả cuối cùng." },
                        { icon: Users, title: "Con Người", desc: "Khách hàng là trung tâm. Đội ngũ nhân sự là tài sản quý giá nhất." },
                        { icon: Globe, title: "Toàn Cầu", desc: "Tư duy không biên giới. Áp dụng tiêu chuẩn quốc tế vào thị trường nội địa." }
                    ].map((val, idx) => (
                        <div key={idx} className="bg-brand-black border border-gray-800 p-6 md:p-8 rounded-2xl hover:border-brand-yellow/50 transition-all group">
                            <val.icon className="text-gray-500 group-hover:text-brand-yellow transition-colors mb-6" size={40} strokeWidth={1.5} />
                            <h4 className="text-white font-bold uppercase mb-4 text-lg">{val.title}</h4>
                            <p className="text-gray-500 text-sm leading-relaxed">{val.desc}</p>
                        </div>
                    ))}
                </div>
            </FadeIn>
        </div>
      </section>

      {/* 3. HISTORY TIMELINE */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
             <FadeIn>
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-700 text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-4">
                        <History size={12} /> Milestone
                    </div>
                    <h3 className="text-3xl font-black text-white uppercase">Lịch Sử Hình Thành</h3>
                </div>
             </FadeIn>

             {/* FIX: Removed ml-4 on mobile to prevent overflow, adjusted spacing */}
             <div className="relative border-l border-gray-800 ml-2 md:ml-0 space-y-12 md:space-y-16">
                {[
                    { year: "2018", title: "Khởi Nguyên", desc: "Thành lập DUHAVA với 5 thành viên cốt cán tại một văn phòng nhỏ ở Quận 3. Tập trung vào thị trường SEO ngách và Content Marketing." },
                    { year: "2020", title: "Bứt Phá", desc: "Mở rộng sang Performance Marketing. Đạt mốc 100 khách hàng SME đầu tiên bất chấp đại dịch Covid-19 nhờ các giải pháp chuyển đổi số kịp thời." },
                    { year: "2022", title: "Khẳng Định", desc: "Trở thành Google Partner Premium. Quy mô nhân sự đạt 50+ chuyên gia. Mở rộng văn phòng sang Singapore để tiếp cận khách hàng quốc tế." },
                    { year: "2024", title: "Vươn Tầm", desc: "Ra mắt hệ sinh thái DUHAVA Group bao gồm Tech-hub và Academy. Tích hợp AI vào quy trình vận hành để tối ưu hiệu suất." }
                ].map((item, index) => (
                    <div key={index} className="relative pl-8 md:pl-20 group">
                        {/* Timeline Dot */}
                        <div className="absolute -left-[5px] top-2 w-[9px] h-[9px] rounded-full bg-gray-800 border border-gray-600 group-hover:bg-brand-yellow group-hover:border-brand-yellow transition-colors duration-300 shadow-[0_0_0_4px_#050505]"></div>
                        
                        <FadeIn delay={index * 100} direction="right">
                            <span className="text-brand-yellow font-mono text-xl font-black tracking-tighter mb-2 block">{item.year}</span>
                            <h4 className="text-2xl font-bold text-white mb-3 break-words">{item.title}</h4>
                            <p className="text-gray-400 text-sm md:text-base leading-relaxed bg-gray-900/50 p-6 rounded-xl border border-gray-800 w-full">{item.desc}</p>
                        </FadeIn>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* 4. TEAM SECTION (Moved from Landing Page) */}
      <Team members={team} />

      {/* 5. TECH STACK (Moved from Landing Page) */}
      <TechStack />

      {/* CTA REIMAGINED */}
      <section className="py-16 md:py-20 bg-brand-yellow text-center relative overflow-hidden w-full">
          {/* Decorative Pattern - Adds depth */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-multiply pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/10 to-transparent md:hidden pointer-events-none"></div>

          <div className="container mx-auto px-6 relative z-10">
              <h2 className="text-3xl md:text-6xl font-black text-brand-black uppercase mb-4 md:mb-8 leading-tight md:leading-none break-words">
                  Gia nhập đội ngũ?
              </h2>
              <p className="text-brand-black/80 font-bold text-base md:text-lg mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed">
                  Chúng tôi luôn tìm kiếm những tài năng kiệt xuất để cùng nhau chinh phục những đỉnh cao mới.
              </p>
              
              {/* Button Group: Column on Mobile, Row on Desktop */}
              <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-4 w-full max-w-md mx-auto md:max-w-none">
                  <button 
                    onClick={() => navigate('/lien-he')}
                    className="w-full md:w-auto bg-black text-white font-bold py-4 px-10 rounded-xl md:rounded-full hover:scale-105 transition-transform shadow-xl flex items-center justify-center gap-2"
                  >
                      Ứng Tuyển Ngay <ArrowRight size={18} className="md:hidden opacity-80" />
                  </button>
                  <button 
                    onClick={() => setIsContactOpen(true)}
                    className="w-full md:w-auto bg-transparent border-2 border-black text-black font-bold py-4 px-10 rounded-xl md:rounded-full hover:bg-black hover:text-white transition-colors"
                  >
                      Liên Hệ Hợp Tác
                  </button>
              </div>
          </div>
      </section>

      <Footer onOpenAdmin={() => navigate('/admin-login')} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
};

export default AboutPage;
