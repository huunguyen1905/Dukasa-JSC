
import React from 'react';
import { 
  BrainCircuit, Users, Zap, TrendingUp, 
  MessageSquare, PenTool, Settings, Code2, 
  CheckCircle2, Clock, Award, BookOpen, 
  Video, Monitor, ArrowRight, Sparkles, Target,
  GraduationCap, Layers, Star, Infinity
} from 'lucide-react';
import FadeIn from './FadeIn';
import MagneticButton from './MagneticButton';

interface AITrainingLandingProps {
  onCtaClick?: () => void;
}

const AITrainingLanding: React.FC<AITrainingLandingProps> = ({ onCtaClick }) => {
  
  const scrollToPrograms = () => {
    document.getElementById('ai-curriculum')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-purple-500 selection:text-white overflow-x-hidden">
      
      {/* 1. HERO SECTION: ACADEMY STYLE (KEPT INTACT AS REQUESTED) */}
      <section className="relative pt-32 pb-24 px-6 min-h-[90vh] flex flex-col justify-center border-b border-gray-900 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-purple-900/20 via-black to-black pointer-events-none"></div>
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] animate-pulse pointer-events-none"></div>

        <div className="container mx-auto relative z-10 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-900/20 text-purple-300 text-xs font-bold uppercase tracking-widest mb-8 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                <GraduationCap size={16} /> DUHAVA AI ACADEMY
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter mb-8 leading-[1.1]">
                Nâng Cấp <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-300 to-white animate-gradient-x">
                    DNA Doanh Nghiệp
                </span>
            </h1>
            
            <p className="text-gray-400 text-lg md:text-2xl font-light max-w-3xl mx-auto mb-12 leading-relaxed">
                Chương trình đào tạo AI thực chiến (Hands-on Training). <br className="hidden md:block"/>
                Biến đội ngũ nhân sự của bạn thành những <strong className="text-white">"Siêu Chiến Binh"</strong> với hiệu suất gấp 10 lần.
            </p>

            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                <MagneticButton>
                    <button 
                        onClick={scrollToPrograms}
                        className="bg-white text-purple-900 font-black uppercase py-4 px-10 rounded-full hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all flex items-center gap-2"
                    >
                        Xem Lộ Trình Đào Tạo <ArrowRight size={18}/>
                    </button>
                </MagneticButton>
                <div className="flex items-center gap-4 text-sm font-bold text-gray-500">
                    <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-purple-500"/> Practical</span>
                    <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-purple-500"/> Updated</span>
                    <span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-purple-500"/> Certified</span>
                </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 2. THE PROBLEM & SOLUTION (KEPT INTACT AS REQUESTED) */}
      <section className="py-24 px-6 relative bg-gray-900/20 border-b border-gray-800">
        <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <FadeIn>
                    <h3 className="text-3xl font-black text-white uppercase mb-6 leading-tight">
                        AI không thay thế con người. <br/>
                        <span className="text-gray-500">Người biết dùng AI sẽ thay thế người không biết.</span>
                    </h3>
                    <p className="text-gray-400 text-lg mb-8">
                        Doanh nghiệp của bạn đang lãng phí hàng ngàn giờ mỗi tháng cho những tác vụ lặp lại? Đội ngũ Marketing bí ý tưởng? Sale phản hồi khách chậm?
                    </p>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 bg-black/40 p-4 rounded-xl border border-red-900/30">
                            <div className="w-10 h-10 rounded-full bg-red-900/20 flex items-center justify-center text-red-500 font-bold">VS</div>
                            <div>
                                <h4 className="text-white font-bold">Cách cũ (Manual)</h4>
                                <p className="text-gray-500 text-sm">Viết 1 bài Blog: 4 tiếng. Lên Plan tháng: 3 ngày.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 bg-purple-900/10 p-4 rounded-xl border border-purple-500/30">
                            <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">AI</div>
                            <div>
                                <h4 className="text-white font-bold">Cách mới (AI-Powered)</h4>
                                <p className="text-gray-300 text-sm">Viết 1 bài Blog: 15 phút. Lên Plan tháng: 2 giờ.</p>
                            </div>
                        </div>
                    </div>
                </FadeIn>
                <FadeIn delay={200} direction="left">
                    <div className="relative aspect-square md:aspect-video rounded-3xl overflow-hidden border border-gray-700 shadow-2xl group">
                        <img 
                            src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000" 
                            alt="Team Training" 
                            className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-700"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-[0_0_30px_rgba(168,85,247,0.4)]">
                                <Zap size={32} className="text-white" fill="currentColor"/>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </div>
      </section>

      {/* 3. CURRICULUM ROADMAP (REDESIGNED - MODULAR GRID) */}
      <section id="ai-curriculum" className="py-24 px-6 relative bg-gradient-to-b from-black to-gray-900/30">
        <div className="container mx-auto max-w-6xl">
            <FadeIn>
                <div className="text-center mb-20">
                    <h2 className="text-purple-500 font-bold tracking-[0.2em] uppercase text-xs mb-4">Training Modules</h2>
                    <h3 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
                        Khung Chương Trình <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-white">Toàn Diện</span>
                    </h3>
                </div>
            </FadeIn>

            <div className="space-y-8">
                
                {/* LEVEL 1: FOUNDATION (Wide Card) */}
                <FadeIn delay={100}>
                    <div className="relative bg-[#0F0F0F] border border-gray-800 rounded-3xl p-8 md:p-10 overflow-hidden group hover:border-purple-500/50 transition-all duration-500">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px] group-hover:bg-purple-600/20 transition-all"></div>
                        
                        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                            <div className="md:w-1/3">
                                <div className="inline-flex items-center gap-2 bg-purple-500/10 text-purple-400 px-3 py-1 rounded text-xs font-black uppercase tracking-wider mb-4 border border-purple-500/20">
                                    Level 01 • Nền Tảng
                                </div>
                                <h3 className="text-3xl font-black text-white mb-4 uppercase">AI Mindset & <br/>Prompting</h3>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                                    Mô-đun bắt buộc cho mọi nhân sự. Trang bị tư duy đúng và kỹ thuật ra lệnh (Prompt Engineering) để làm chủ các mô hình ngôn ngữ lớn (LLMs).
                                </p>
                                <div className="flex gap-2">
                                    <span className="text-[10px] bg-gray-800 text-gray-300 px-2 py-1 rounded border border-gray-700">ChatGPT 4o</span>
                                    <span className="text-[10px] bg-gray-800 text-gray-300 px-2 py-1 rounded border border-gray-700">Claude 3.5</span>
                                    <span className="text-[10px] bg-gray-800 text-gray-300 px-2 py-1 rounded border border-gray-700">Gemini</span>
                                </div>
                            </div>
                            
                            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                                {[
                                    "Tư duy 'AI First': Tích hợp AI vào quy trình hàng ngày",
                                    "Kỹ thuật Prompting: Zero-shot, Few-shot, Chain-of-Thought",
                                    "Tối ưu hóa tác vụ văn phòng: Email, Báo cáo, Dịch thuật",
                                    "Phân tích tài liệu & Tóm tắt nội dung dài",
                                    "Brainstorming ý tưởng sáng tạo không giới hạn",
                                    "Thực hành & Sửa lỗi Prompt trực tiếp"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-start gap-3 bg-black/40 p-4 rounded-xl border border-white/5 hover:border-purple-500/30 transition-colors">
                                        <CheckCircle2 size={18} className="text-purple-500 shrink-0 mt-0.5" />
                                        <span className="text-sm text-gray-300 font-medium">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </FadeIn>

                {/* LEVEL 2: SPECIALIZED (3 Cols) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Track A */}
                    <FadeIn delay={200} className="h-full">
                        <div className="h-full bg-[#0F0F0F] border border-gray-800 p-8 rounded-3xl hover:border-pink-500/50 transition-all duration-300 group flex flex-col">
                            <div className="w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center text-pink-500 mb-6 group-hover:scale-110 transition-transform">
                                <PenTool size={24} />
                            </div>
                            <h4 className="text-lg font-black text-white uppercase mb-2 group-hover:text-pink-400 transition-colors">Marketing & Content</h4>
                            <p className="text-gray-500 text-xs mb-6 h-10">Sáng tạo nội dung đa kênh thần tốc và chất lượng cao.</p>
                            <ul className="space-y-3 mb-6 flex-1">
                                <li className="flex gap-2 text-sm text-gray-400"><div className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-1.5 shrink-0"></div> Viết Blog/SEO/Social Post</li>
                                <li className="flex gap-2 text-sm text-gray-400"><div className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-1.5 shrink-0"></div> Tạo ảnh với Midjourney/DALL-E 3</li>
                                <li className="flex gap-2 text-sm text-gray-400"><div className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-1.5 shrink-0"></div> Lên kế hoạch truyền thông</li>
                            </ul>
                        </div>
                    </FadeIn>

                    {/* Track B */}
                    <FadeIn delay={300} className="h-full">
                        <div className="h-full bg-[#0F0F0F] border border-gray-800 p-8 rounded-3xl hover:border-green-500/50 transition-all duration-300 group flex flex-col">
                            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500 mb-6 group-hover:scale-110 transition-transform">
                                <TrendingUp size={24} />
                            </div>
                            <h4 className="text-lg font-black text-white uppercase mb-2 group-hover:text-green-400 transition-colors">Sales & CSKH</h4>
                            <p className="text-gray-500 text-xs mb-6 h-10">Thấu hiểu khách hàng và chốt sale hiệu quả hơn.</p>
                            <ul className="space-y-3 mb-6 flex-1">
                                <li className="flex gap-2 text-sm text-gray-400"><div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0"></div> Research khách hàng thần tốc</li>
                                <li className="flex gap-2 text-sm text-gray-400"><div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0"></div> Cá nhân hóa kịch bản Sale</li>
                                <li className="flex gap-2 text-sm text-gray-400"><div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0"></div> Xử lý từ chối (Objection Handling)</li>
                            </ul>
                        </div>
                    </FadeIn>

                    {/* Track C */}
                    <FadeIn delay={400} className="h-full">
                        <div className="h-full bg-[#0F0F0F] border border-gray-800 p-8 rounded-3xl hover:border-blue-500/50 transition-all duration-300 group flex flex-col">
                            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                                <Settings size={24} />
                            </div>
                            <h4 className="text-lg font-black text-white uppercase mb-2 group-hover:text-blue-400 transition-colors">HR & Admin</h4>
                            <p className="text-gray-500 text-xs mb-6 h-10">Tối ưu hóa quy trình vận hành và xử lý dữ liệu.</p>
                            <ul className="space-y-3 mb-6 flex-1">
                                <li className="flex gap-2 text-sm text-gray-400"><div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></div> Xử lý dữ liệu Excel/Sheet</li>
                                <li className="flex gap-2 text-sm text-gray-400"><div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></div> Soạn thảo quy trình, chính sách</li>
                                <li className="flex gap-2 text-sm text-gray-400"><div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></div> Phân tích CV & Tuyển dụng</li>
                            </ul>
                        </div>
                    </FadeIn>
                </div>

                {/* LEVEL 3: ADVANCED (Banner) */}
                <FadeIn delay={500}>
                    <div className="relative bg-gradient-to-r from-gray-900 to-black border border-brand-yellow/30 p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 group overflow-hidden">
                        <div className="absolute inset-0 bg-brand-yellow/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative z-10 flex items-center gap-6">
                            <div className="w-16 h-16 bg-brand-yellow text-black rounded-full flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(250,204,21,0.4)]">
                                <Award size={32} />
                            </div>
                            <div>
                                <h4 className="text-2xl font-black text-white uppercase mb-1">Advanced: AI Agent & Automation</h4>
                                <p className="text-gray-400 text-sm">Xây dựng trợ lý ảo riêng (Custom GPTs) và tự động hóa quy trình liên ứng dụng (Zapier/Make).</p>
                            </div>
                        </div>
                        <button onClick={onCtaClick} className="relative z-10 px-6 py-3 bg-transparent border border-brand-yellow text-brand-yellow font-bold uppercase rounded-full hover:bg-brand-yellow hover:text-black transition-all text-sm whitespace-nowrap">
                            Khám Phá Level 3
                        </button>
                    </div>
                </FadeIn>

            </div>
        </div>
      </section>

      {/* 4. PRICING CARDS (REDESIGNED - MEMBERSHIP PASS STYLE) */}
      <section className="py-24 px-6 bg-black relative border-t border-gray-900">
          <div className="container mx-auto">
              <FadeIn>
                <div className="text-center mb-16">
                    <h3 className="text-3xl font-black text-white uppercase mb-4">Các Gói Đào Tạo</h3>
                    <p className="text-gray-400 text-sm">Đầu tư vào tri thức là khoản đầu tư sinh lời cao nhất.</p>
                </div>
              </FadeIn>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
                  
                  {/* STARTER */}
                  <FadeIn delay={100} className="h-full">
                      <div className="h-full bg-gray-900 border border-gray-800 rounded-3xl p-8 flex flex-col hover:border-gray-600 transition-all duration-300">
                          <div className="mb-6">
                              <h4 className="text-lg font-bold text-gray-400 uppercase tracking-widest mb-2">Starter Class</h4>
                              <div className="text-3xl font-black text-white">8.000.000 <span className="text-sm font-normal text-gray-500">vnđ</span></div>
                              <p className="text-gray-500 text-xs mt-2">Dành cho nhóm nhỏ hoặc cá nhân ghép lớp.</p>
                          </div>
                          
                          <div className="space-y-4 mb-8 flex-1 border-t border-gray-800 pt-6">
                              <div className="flex gap-3 text-sm text-gray-300"><CheckCircle2 size={16} className="text-gray-500 shrink-0"/> Module: Foundation</div>
                              <div className="flex gap-3 text-sm text-gray-300"><CheckCircle2 size={16} className="text-gray-500 shrink-0"/> Thời lượng: 4 Giờ (1 buổi)</div>
                              <div className="flex gap-3 text-sm text-gray-300"><CheckCircle2 size={16} className="text-gray-500 shrink-0"/> Hình thức: Online / Offline</div>
                              <div className="flex gap-3 text-sm text-gray-300"><CheckCircle2 size={16} className="text-gray-500 shrink-0"/> Tài liệu: Slide + Prompt List</div>
                          </div>
                          
                          <button onClick={onCtaClick} className="w-full py-4 border border-gray-700 hover:bg-white hover:text-black rounded-xl font-bold uppercase text-xs tracking-wider transition-all">Đăng Ký Ngay</button>
                      </div>
                  </FadeIn>

                  {/* PRO (Highlighted) */}
                  <FadeIn delay={200} className="h-full md:scale-110 z-10">
                      <div className="h-full bg-[#0F0F0F] border-2 border-purple-500 rounded-3xl p-8 flex flex-col relative shadow-[0_0_50px_rgba(168,85,247,0.15)]">
                          <div className="absolute top-0 right-0 bg-purple-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">POPULAR</div>
                          
                          <div className="mb-6">
                              <h4 className="text-lg font-bold text-purple-400 uppercase tracking-widest mb-2">Business Pro</h4>
                              <div className="text-4xl font-black text-white">25.000.000 <span className="text-sm font-normal text-gray-500">vnđ</span></div>
                              <p className="text-gray-400 text-xs mt-2">Giải pháp toàn diện cho SMEs.</p>
                          </div>
                          
                          <div className="space-y-4 mb-8 flex-1 border-t border-gray-800 pt-6">
                              <div className="flex gap-3 text-sm text-white font-bold"><CheckCircle2 size={16} className="text-purple-500 shrink-0"/> Module: Foundation + 2 Chuyên Sâu</div>
                              <div className="flex gap-3 text-sm text-gray-300"><CheckCircle2 size={16} className="text-purple-500 shrink-0"/> Thời lượng: 12 Giờ (3 buổi)</div>
                              <div className="flex gap-3 text-sm text-gray-300"><CheckCircle2 size={16} className="text-purple-500 shrink-0"/> Đào tạo In-house tại văn phòng</div>
                              <div className="flex gap-3 text-sm text-gray-300"><CheckCircle2 size={16} className="text-purple-500 shrink-0"/> Support 1:1 trong 1 tháng</div>
                              <div className="flex gap-3 text-sm text-gray-300"><CheckCircle2 size={16} className="text-purple-500 shrink-0"/> Video Recap trọn đời</div>
                          </div>
                          
                          <button onClick={onCtaClick} className="w-full py-4 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold uppercase text-xs tracking-wider transition-all shadow-lg shadow-purple-900/50">Tư Vấn Gói Này</button>
                      </div>
                  </FadeIn>

                  {/* ENTERPRISE */}
                  <FadeIn delay={300} className="h-full">
                      <div className="h-full bg-gray-900 border border-gray-800 rounded-3xl p-8 flex flex-col hover:border-white transition-all duration-300">
                          <div className="mb-6">
                              <h4 className="text-lg font-bold text-gray-400 uppercase tracking-widest mb-2">Custom Enterprise</h4>
                              <div className="text-3xl font-black text-white">Liên Hệ</div>
                              <p className="text-gray-500 text-xs mt-2">Thiết kế riêng cho tập đoàn lớn.</p>
                          </div>
                          
                          <div className="space-y-4 mb-8 flex-1 border-t border-gray-800 pt-6">
                              <div className="flex gap-3 text-sm text-gray-300"><CheckCircle2 size={16} className="text-white shrink-0"/> Full lộ trình (Cơ bản -> Nâng cao)</div>
                              <div className="flex gap-3 text-sm text-gray-300"><CheckCircle2 size={16} className="text-white shrink-0"/> Custom nội dung theo ngành</div>
                              <div className="flex gap-3 text-sm text-gray-300"><CheckCircle2 size={16} className="text-white shrink-0"/> Build Custom GPTs riêng</div>
                              <div className="flex gap-3 text-sm text-gray-300"><CheckCircle2 size={16} className="text-white shrink-0"/> Tư vấn chiến lược AI Automation</div>
                          </div>
                          
                          <button onClick={onCtaClick} className="w-full py-4 bg-white text-black hover:bg-gray-200 rounded-xl font-bold uppercase text-xs tracking-wider transition-all">Liên Hệ</button>
                      </div>
                  </FadeIn>

              </div>
          </div>
      </section>

      {/* 5. COMMITMENT & CERTIFICATION (KEPT INTACT AS REQUESTED) */}
      <section className="py-24 px-6 bg-gray-900/30">
          <div className="container mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <FadeIn>
                      <div className="relative rounded-2xl overflow-hidden border border-gray-800 aspect-video group">
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-black opacity-80"></div>
                          <div className="absolute inset-0 flex items-center justify-center flex-col text-center p-8">
                              <Award size={64} className="text-brand-yellow mb-4 shadow-lg" />
                              <h4 className="text-2xl font-black text-white uppercase mb-2">Cam Kết Chất Lượng</h4>
                              <p className="text-gray-300 text-sm max-w-sm">
                                  Học viên sau khóa học sẽ nhận được chứng nhận hoàn thành từ DUHAVA Academy và bộ tài liệu độc quyền trị giá 5.000.000 VNĐ.
                              </p>
                          </div>
                      </div>
                  </FadeIn>
                  <FadeIn delay={200}>
                      <h3 className="text-2xl font-black text-white uppercase mb-6">Tại Sao Chọn DUHAVA Academy?</h3>
                      <div className="space-y-6">
                          <div className="flex gap-4">
                              <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center shrink-0">
                                  <Target className="text-white" size={24}/>
                              </div>
                              <div>
                                  <h5 className="text-white font-bold mb-1">Thực Chiến 100%</h5>
                                  <p className="text-gray-400 text-sm">Không lý thuyết suông. Thực hành trực tiếp trên các bài toán của doanh nghiệp bạn.</p>
                              </div>
                          </div>
                          <div className="flex gap-4">
                              <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center shrink-0">
                                  <Users className="text-white" size={24}/>
                              </div>
                              <div>
                                  <h5 className="text-white font-bold mb-1">Support Trọn Đời</h5>
                                  <p className="text-gray-400 text-sm">Tham gia cộng đồng học viên kín, được update kiến thức AI mới nhất hàng tuần.</p>
                              </div>
                          </div>
                          <div className="flex gap-4">
                              <div className="w-12 h-12 rounded-xl bg-gray-800 flex items-center justify-center shrink-0">
                                  <Star className="text-white" size={24}/>
                              </div>
                              <div>
                                  <h5 className="text-white font-bold mb-1">Giảng Viên Expert</h5>
                                  <p className="text-gray-400 text-sm">Đội ngũ chuyên gia đang trực tiếp triển khai dự án AI cho các tập đoàn lớn.</p>
                              </div>
                          </div>
                      </div>
                  </FadeIn>
              </div>
          </div>
      </section>

      {/* 6. STICKY CTA (KEPT INTACT AS REQUESTED) */}
      <div className="fixed bottom-0 left-0 w-full z-50 bg-black/80 backdrop-blur-xl border-t border-gray-800 py-4 px-6">
          <div className="container mx-auto flex justify-between items-center">
              <div className="hidden md:block">
                  <span className="text-white font-bold uppercase text-sm">Đầu tư vào năng lực AI hôm nay?</span>
                  <span className="text-gray-500 text-xs ml-2">Thu hoạch năng suất & lợi thế cạnh tranh ngày mai.</span>
              </div>
              <button 
                onClick={onCtaClick}
                className="w-full md:w-auto bg-purple-600 text-white font-black uppercase py-3 px-8 rounded-full hover:bg-purple-500 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-purple-900/50"
              >
                  Đăng Ký Tư Vấn Đào Tạo <ArrowRight size={16}/>
              </button>
          </div>
      </div>
      <div className="h-24"></div>

    </div>
  );
};

export default AITrainingLanding;
