
import React from 'react';
import { 
  Bot, CheckCircle2, Zap, Layout, 
  MessageSquare, Settings, Gift, ArrowRight, 
  Cpu, BarChart3, ShieldCheck, DollarSign
} from 'lucide-react';
import FadeIn from './FadeIn';
import MagneticButton from './MagneticButton';

interface ChatbotLandingProps {
  onCtaClick?: () => void;
}

const ChatbotLanding: React.FC<ChatbotLandingProps> = ({ onCtaClick }) => {
  
  // Fake navigation hook if strictly separated, otherwise use standard formatting
  const scrollToPricing = () => {
    document.getElementById('pricing-breakdown')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-brand-yellow selection:text-black overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6 min-h-[90vh] flex flex-col justify-center border-b border-gray-900 overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')] opacity-5 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-yellow/5 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="container mx-auto relative z-10 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest mb-8 animate-pulse">
                <Bot size={14} /> AI Technology v2.0
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter mb-6 leading-[1.1]">
                Tuyển Dụng <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-brand-yellow">
                    "Nhân Viên Số"
                </span> 24/7
            </h1>
            
            <p className="text-gray-400 text-lg md:text-2xl font-light max-w-3xl mx-auto mb-10 leading-relaxed">
                Giải pháp Chatbot AI toàn diện – Chăm sóc khách hàng tự động, tăng lead và bứt phá doanh số mà <strong className="text-white">không cần mở rộng nhân sự</strong>.
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                <MagneticButton>
                    <button 
                        onClick={scrollToPricing}
                        className="bg-brand-yellow text-black font-black uppercase py-4 px-10 rounded-full hover:shadow-[0_0_30px_rgba(250,204,21,0.4)] transition-all flex items-center gap-2"
                    >
                        Xem Báo Giá Chi Tiết <ArrowRight size={18}/>
                    </button>
                </MagneticButton>
                <button className="px-8 py-4 rounded-full border border-gray-700 text-gray-400 hover:text-white hover:border-white transition-colors font-bold uppercase text-sm tracking-wider">
                    Tìm hiểu quy trình
                </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 2. THE PROCESS (3 STAGES) */}
      <section className="py-24 px-6 relative">
        <div className="container mx-auto">
            <FadeIn>
                <div className="text-center mb-16">
                    <h2 className="text-brand-yellow font-bold tracking-[0.2em] uppercase text-xs mb-3">Implementation Roadmap</h2>
                    <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                        Quy Trình <span className="text-gray-700">3 Giai Đoạn</span>
                    </h3>
                </div>
            </FadeIn>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Stage 1 */}
                <FadeIn delay={100} className="h-full">
                    <div className="h-full bg-gray-900/40 border border-gray-800 p-8 rounded-3xl hover:border-blue-500/50 transition-all group relative overflow-hidden flex flex-col">
                        <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-8xl text-white group-hover:text-blue-500 transition-colors select-none">01</div>
                        
                        <div className="mb-6">
                            <div className="w-12 h-12 bg-blue-900/20 rounded-xl flex items-center justify-center text-blue-400 mb-4 border border-blue-500/20">
                                <BarChart3 size={24} />
                            </div>
                            <h4 className="text-2xl font-black text-white uppercase mb-2">Nền Tảng Chiến Lược</h4>
                            <p className="text-gray-400 text-sm h-10">Xây dựng móng vững chắc, đảm bảo Chatbot đi đúng hướng kinh doanh.</p>
                        </div>

                        <ul className="space-y-4 mb-8 flex-1">
                            {[
                                "Phân tích nhu cầu & mục tiêu",
                                "Nghiên cứu chân dung khách hàng",
                                "Xác định phạm vi & chức năng",
                                "Lập sơ đồ luồng hội thoại (Flow Map)",
                                "Báo cáo đề xuất chiến lược"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                    <CheckCircle2 size={16} className="text-blue-500 shrink-0 mt-0.5"/>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="pt-6 border-t border-gray-800">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">Chi phí giai đoạn 1</span>
                            <span className="text-2xl font-black text-white">8.000.000 VNĐ</span>
                        </div>
                    </div>
                </FadeIn>

                {/* Stage 2 */}
                <FadeIn delay={200} className="h-full">
                    <div className="h-full bg-gray-900/40 border border-gray-800 p-8 rounded-3xl hover:border-brand-yellow/50 transition-all group relative overflow-hidden flex flex-col shadow-[0_0_50px_rgba(250,204,21,0.05)]">
                        <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-8xl text-white group-hover:text-brand-yellow transition-colors select-none">02</div>
                        
                        <div className="mb-6">
                            <div className="w-12 h-12 bg-brand-yellow/20 rounded-xl flex items-center justify-center text-brand-yellow mb-4 border border-brand-yellow/20">
                                <MessageSquare size={24} />
                            </div>
                            <h4 className="text-2xl font-black text-white uppercase mb-2">Thiết Kế & Content</h4>
                            <p className="text-gray-400 text-sm h-10">Tạo trải nghiệm hội thoại thông minh, đậm chất thương hiệu.</p>
                        </div>

                        <ul className="space-y-4 mb-8 flex-1">
                            {[
                                "Xây dựng Tone & Mood thương hiệu",
                                "Soạn thảo kịch bản chi tiết",
                                "Thiết kế UI Chatbot (Màu, Logo)",
                                "Tối ưu trải nghiệm UX mượt mà",
                                "Kiểm duyệt & tinh chỉnh kịch bản"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                    <CheckCircle2 size={16} className="text-brand-yellow shrink-0 mt-0.5"/>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="pt-6 border-t border-gray-800">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">Chi phí giai đoạn 2</span>
                            <span className="text-2xl font-black text-brand-yellow">10.000.000 VNĐ</span>
                        </div>
                    </div>
                </FadeIn>

                {/* Stage 3 */}
                <FadeIn delay={300} className="h-full">
                    <div className="h-full bg-gray-900/40 border border-gray-800 p-8 rounded-3xl hover:border-green-500/50 transition-all group relative overflow-hidden flex flex-col">
                        <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-8xl text-white group-hover:text-green-500 transition-colors select-none">03</div>
                        
                        <div className="mb-6">
                            <div className="w-12 h-12 bg-green-900/20 rounded-xl flex items-center justify-center text-green-400 mb-4 border border-green-500/20">
                                <Cpu size={24} />
                            </div>
                            <h4 className="text-2xl font-black text-white uppercase mb-2">Triển Khai & Vận Hành</h4>
                            <p className="text-gray-400 text-sm h-10">Hiện thực hóa Chatbot, tích hợp đa kênh và bàn giao.</p>
                        </div>

                        <ul className="space-y-4 mb-8 flex-1">
                            {[
                                "Phát triển & Tích hợp (Web/Facebook)",
                                "Kết nối 02 kênh giao tiếp",
                                "Kiểm thử chất lượng (QA/QC)",
                                "Đào tạo & Hướng dẫn sử dụng",
                                "Hỗ trợ kỹ thuật 01 tháng"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                    <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5"/>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="pt-6 border-t border-gray-800">
                            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-1">Chi phí giai đoạn 3</span>
                            <span className="text-2xl font-black text-white">7.000.000 VNĐ</span>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </div>
      </section>

      {/* 3. PRICING BREAKDOWN & BONUS */}
      <section id="pricing-breakdown" className="py-20 bg-gray-900/30 border-y border-gray-800">
          <div className="container mx-auto px-6">
              <div className="flex flex-col lg:flex-row gap-12 items-center">
                  
                  {/* Left: The Receipt */}
                  <div className="w-full lg:w-1/2">
                      <FadeIn direction="right">
                        <div className="bg-black border border-gray-800 p-8 md:p-10 rounded-2xl relative shadow-2xl">
                            <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-6">
                                <h3 className="text-2xl font-black text-white uppercase">Tổng Quan Chi Phí</h3>
                                <div className="text-xs font-bold text-gray-500 uppercase bg-gray-900 px-3 py-1 rounded">Gói Tiêu Chuẩn</div>
                            </div>
                            
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-gray-400 text-sm">
                                    <span>01. Nền tảng chiến lược</span>
                                    <span className="font-bold text-white">8.000.000 đ</span>
                                </div>
                                <div className="flex justify-between text-gray-400 text-sm">
                                    <span>02. Thiết kế & Nội dung</span>
                                    <span className="font-bold text-white">10.000.000 đ</span>
                                </div>
                                <div className="flex justify-between text-gray-400 text-sm">
                                    <span>03. Triển khai & Vận hành</span>
                                    <span className="font-bold text-white">7.000.000 đ</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center pt-6 border-t border-dashed border-gray-700">
                                <span className="text-lg font-bold text-white uppercase">Tổng Cộng</span>
                                <span className="text-3xl md:text-4xl font-black text-brand-yellow tracking-tight">25.000.000 VNĐ</span>
                            </div>
                        </div>
                      </FadeIn>
                  </div>

                  {/* Right: The Bonus */}
                  <div className="w-full lg:w-1/2">
                      <FadeIn direction="left" delay={200}>
                          <div className="bg-gradient-to-br from-brand-yellow/10 to-transparent border border-brand-yellow/30 p-8 rounded-2xl relative overflow-hidden group">
                              {/* Animated Shine */}
                              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                              
                              <div className="flex items-start gap-6">
                                  <div className="w-16 h-16 bg-brand-yellow rounded-2xl flex items-center justify-center text-black shrink-0 shadow-lg animate-bounce">
                                      <Gift size={32} />
                                  </div>
                                  <div>
                                      <h4 className="text-xl font-black text-white uppercase mb-2">Quà Tặng Đặc Biệt</h4>
                                      <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                                          Đăng ký ngay hôm nay để nhận trọn bộ công cụ quản trị độc quyền từ DUHAVA.
                                      </p>
                                      
                                      <div className="space-y-3">
                                          <div className="flex items-center gap-3 bg-black/40 p-3 rounded-lg border border-brand-yellow/20">
                                              <Layout size={18} className="text-brand-yellow"/>
                                              <div>
                                                  <div className="text-white font-bold text-sm">Flow AI Automation Build Page</div>
                                                  <div className="text-gray-500 text-[10px] uppercase font-bold">Trị giá: <span className="line-through decoration-brand-yellow">3.000.000 VNĐ</span> (Free)</div>
                                              </div>
                                          </div>
                                          <div className="flex items-center gap-3 bg-black/40 p-3 rounded-lg border border-white/10">
                                              <MessageSquare size={18} className="text-blue-400"/>
                                              <div>
                                                  <div className="text-white font-bold text-sm">Tư vấn hỗ trợ 1:1</div>
                                                  <div className="text-gray-500 text-[10px] uppercase font-bold">Trọn đời dự án</div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </FadeIn>
                  </div>

              </div>
          </div>
      </section>

      {/* 4. WHY US GRID */}
      <section className="py-24 px-6">
          <div className="container mx-auto">
              <FadeIn>
                <h3 className="text-center text-3xl font-black text-white uppercase mb-16">
                    Vì Sao Chọn <span className="text-brand-yellow">Duhava AI?</span>
                </h3>
              </FadeIn>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                      { icon: ShieldCheck, title: "Giải Pháp Toàn Diện", desc: "Lo trọn gói từ A-Z, bạn không cần bận tâm kỹ thuật." },
                      { icon: Settings, title: "Cá Nhân Hóa", desc: "Chatbot mang giọng điệu và bản sắc riêng của bạn." },
                      { icon: DollarSign, title: "Chi Phí Minh Bạch", desc: "Cam kết không phát sinh chi phí ẩn trong quá trình làm." },
                      { icon: Zap, title: "Hỗ Trợ Sau Bán", desc: "Đồng hành kỹ thuật ngay cả khi đã bàn giao xong." }
                  ].map((item, idx) => (
                      <FadeIn key={idx} delay={idx * 100} direction="up">
                          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl hover:border-gray-600 transition-colors text-center h-full">
                              <item.icon size={32} className="text-gray-500 mx-auto mb-4" />
                              <h4 className="text-white font-bold uppercase text-sm mb-2">{item.title}</h4>
                              <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                          </div>
                      </FadeIn>
                  ))}
              </div>
          </div>
      </section>

      {/* 5. STICKY CTA BOTTOM */}
      <div className="fixed bottom-0 left-0 w-full z-50 bg-black/80 backdrop-blur-xl border-t border-gray-800 py-4 px-6">
          <div className="container mx-auto flex justify-between items-center">
              <div className="hidden md:block">
                  <span className="text-white font-bold uppercase text-sm">Sẵn sàng nâng cấp doanh nghiệp?</span>
                  <span className="text-gray-500 text-xs ml-2">Ưu đãi có hạn cho 5 khách hàng đầu tiên.</span>
              </div>
              <button 
                onClick={onCtaClick}
                className="w-full md:w-auto bg-brand-yellow text-black font-black uppercase py-3 px-8 rounded-full hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(250,204,21,0.3)]"
              >
                  Đăng Ký Tư Vấn Miễn Phí <ArrowRight size={16}/>
              </button>
          </div>
      </div>

      {/* Spacing for fixed footer */}
      <div className="h-24"></div>

    </div>
  );
};

export default ChatbotLanding;
