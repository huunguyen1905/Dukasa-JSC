
import React from 'react';
import { 
  Database, Server, LayoutDashboard, Workflow, 
  CheckCircle2, ArrowRight, Settings, ShieldCheck, 
  Users, ShoppingCart, Activity, Briefcase, 
  Code2, Terminal, Rocket, PenTool, Coffee, Scissors, Dumbbell, Hotel
} from 'lucide-react';
import FadeIn from './FadeIn';
import MagneticButton from './MagneticButton';

interface DigitalTransformationLandingProps {
  onCtaClick?: () => void;
}

const DigitalTransformationLanding: React.FC<DigitalTransformationLandingProps> = ({ onCtaClick }) => {
  
  const scrollToPricing = () => {
    document.getElementById('software-pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans selection:bg-brand-yellow selection:text-black overflow-x-hidden">
      
      {/* 1. HERO SECTION: THE ARCHITECT */}
      <section className="relative pt-32 pb-20 px-6 min-h-[90vh] flex flex-col justify-center border-b border-gray-900 overflow-hidden">
        {/* Tech Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-900/10 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="container mx-auto relative z-10 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-900/10 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-8">
                <Terminal size={14} /> Custom Software Solutions
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tighter mb-6 leading-[1.1]">
                Số Hóa <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-brand-yellow">
                    Vận Hành Doanh Nghiệp
                </span>
            </h1>
            
            <p className="text-gray-400 text-lg md:text-2xl font-light max-w-3xl mx-auto mb-10 leading-relaxed">
                Chúng tôi không bán phần mềm đóng gói. Chúng tôi <strong className="text-white">thiết kế hệ điều hành riêng</strong> giải quyết chính xác nỗi đau và quy trình của bạn.
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                <MagneticButton>
                    <button 
                        onClick={scrollToPricing}
                        className="bg-brand-yellow text-black font-black uppercase py-4 px-10 rounded-full hover:shadow-[0_0_30px_rgba(250,204,21,0.4)] transition-all flex items-center gap-2"
                    >
                        Xem Chi Phí Triển Khai <ArrowRight size={18}/>
                    </button>
                </MagneticButton>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 2. SOLUTIONS ECOSYSTEM (GRID) */}
      <section className="py-24 px-6 relative border-b border-gray-900">
        <div className="container mx-auto">
            <FadeIn>
                <div className="text-center mb-16">
                    <h2 className="text-cyan-500 font-bold tracking-[0.2em] uppercase text-xs mb-3">Our Ecosystem</h2>
                    <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                        Hệ Thống <span className="text-gray-700">Chúng Tôi Triển Khai</span>
                    </h3>
                </div>
            </FadeIn>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* 1. Operation Management */}
                <FadeIn delay={100}>
                    <div className="bg-gray-900/30 border border-gray-800 p-8 rounded-3xl hover:border-cyan-500/50 transition-all group h-full">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-cyan-900/20 rounded-xl flex items-center justify-center text-cyan-400 border border-cyan-500/20">
                                <Activity size={24} />
                            </div>
                            <h4 className="text-xl font-black text-white uppercase">Vận Hành Dịch Vụ</h4>
                        </div>
                        <ul className="space-y-4">
                            {[
                                { icon: Hotel, text: "Khách sạn/Homestay: Booking, Housekeeping, Real-time Revenue" },
                                { icon: Coffee, text: "F&B/Nhà hàng: Order, Quản lý bàn, Kho nguyên liệu" },
                                { icon: Scissors, text: "Spa/Salon: Booking lịch, Quản lý thợ, CSKH thân thiết" },
                                { icon: Dumbbell, text: "Gym/Fitness: Membership, PT Schedule, Check-in Auto" }
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                                    <item.icon size={16} className="text-cyan-500 shrink-0 mt-0.5" />
                                    <span>{item.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </FadeIn>

                {/* 2. Sales & CRM */}
                <FadeIn delay={200}>
                    <div className="bg-gray-900/30 border border-gray-800 p-8 rounded-3xl hover:border-brand-yellow/50 transition-all group h-full">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-brand-yellow/10 rounded-xl flex items-center justify-center text-brand-yellow border border-brand-yellow/20">
                                <ShoppingCart size={24} />
                            </div>
                            <h4 className="text-xl font-black text-white uppercase">Bán Hàng & CRM</h4>
                        </div>
                        <ul className="space-y-4">
                            {[
                                { icon: Users, text: "CRM Tùy Chỉnh: Quản lý Lead, Pipeline, Automation Care" },
                                { icon: Database, text: "Kho & Đơn Hàng: Tồn kho thực tế, Cảnh báo, Đồng bộ đa kênh" },
                                { icon: LayoutDashboard, text: "POS Thông Minh: Bán hàng, Tích điểm, Báo cáo theo ca" }
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                                    <item.icon size={16} className="text-brand-yellow shrink-0 mt-0.5" />
                                    <span>{item.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </FadeIn>

                {/* 3. Internal Management */}
                <FadeIn delay={300}>
                    <div className="bg-gray-900/30 border border-gray-800 p-8 rounded-3xl hover:border-purple-500/50 transition-all group h-full">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-purple-900/20 rounded-xl flex items-center justify-center text-purple-400 border border-purple-500/20">
                                <Briefcase size={24} />
                            </div>
                            <h4 className="text-xl font-black text-white uppercase">Quản Trị Nội Bộ</h4>
                        </div>
                        <ul className="space-y-4">
                            {[
                                { icon: Users, text: "HRM: Chấm công, Tính lương, KPI, Nghỉ phép" },
                                { icon: CheckCircle2, text: "Project Management: Task, Deadline, Hiệu suất team" },
                                { icon: Database, text: "E-Office: Quản lý tài liệu, Quy trình duyệt, Workflow" }
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                                    <item.icon size={16} className="text-purple-500 shrink-0 mt-0.5" />
                                    <span>{item.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </FadeIn>

                {/* 4. Automation */}
                <FadeIn delay={400}>
                    <div className="bg-gray-900/30 border border-gray-800 p-8 rounded-3xl hover:border-green-500/50 transition-all group h-full">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-green-900/20 rounded-xl flex items-center justify-center text-green-400 border border-green-500/20">
                                <Workflow size={24} />
                            </div>
                            <h4 className="text-xl font-black text-white uppercase">Tự Động Hóa & Data</h4>
                        </div>
                        <ul className="space-y-4">
                            {[
                                { icon: Workflow, text: "Workflow Automation: Tự động hóa quy trình lặp lại" },
                                { icon: Server, text: "Integration: Kết nối Kế toán, Email, Website, CRM..." },
                                { icon: LayoutDashboard, text: "BI Dashboard: Báo cáo trực quan Real-time" }
                            ].map((item, idx) => (
                                <li key={idx} className="flex items-start gap-3 text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                                    <item.icon size={16} className="text-green-500 shrink-0 mt-0.5" />
                                    <span>{item.text}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </FadeIn>

            </div>
        </div>
      </section>

      {/* 3. PROCESS TIMELINE */}
      <section className="py-24 px-6 bg-black relative">
          <div className="container mx-auto">
              <FadeIn>
                <h3 className="text-3xl font-black text-white uppercase mb-16 text-center">Lộ Trình Triển Khai</h3>
              </FadeIn>

              <div className="relative border-l border-gray-800 ml-4 md:ml-12 space-y-16">
                  {/* Step 1 */}
                  <div className="relative pl-12 md:pl-20 group">
                      <div className="absolute -left-[5px] top-0 w-[11px] h-[11px] rounded-full bg-cyan-500 shadow-[0_0_10px_#06b6d4]"></div>
                      <FadeIn delay={100} direction="right">
                          <span className="text-cyan-500 text-xs font-bold uppercase tracking-widest mb-2 block">Giai Đoạn 01</span>
                          <h4 className="text-2xl font-bold text-white mb-2">Khảo Sát & Phân Tích</h4>
                          <p className="text-gray-400 text-sm mb-4">"Hiểu sâu vấn đề trước khi đưa ra giải pháp."</p>
                          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-500 mb-4">
                              <li>Khảo sát quy trình, tìm điểm nghẽn (Pain points)</li>
                              <li>Phân tích yêu cầu chức năng & người dùng</li>
                              <li>Đề xuất giải pháp & báo giá chi tiết</li>
                          </ul>
                          <div className="inline-block px-3 py-1 bg-gray-900 border border-gray-700 rounded text-xs font-bold text-white">Chi phí: Từ 5.000.000 VNĐ</div>
                      </FadeIn>
                  </div>

                  {/* Step 2 */}
                  <div className="relative pl-12 md:pl-20 group">
                      <div className="absolute -left-[5px] top-0 w-[11px] h-[11px] rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6]"></div>
                      <FadeIn delay={200} direction="right">
                          <span className="text-blue-500 text-xs font-bold uppercase tracking-widest mb-2 block">Giai Đoạn 02</span>
                          <h4 className="text-2xl font-bold text-white mb-2">Thiết Kế Hệ Thống (Architecture)</h4>
                          <p className="text-gray-400 text-sm mb-4">"Vẽ bản thiết kế chi tiết trước khi xây nhà."</p>
                          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-500 mb-4">
                              <li>Thiết kế kiến trúc Database & Luồng dữ liệu</li>
                              <li>Thiết kế UI/UX (Wireframe & Mockup)</li>
                              <li>Quy hoạch luồng nghiệp vụ & Phân quyền</li>
                          </ul>
                          <div className="inline-block px-3 py-1 bg-gray-900 border border-gray-700 rounded text-xs font-bold text-white">Chi phí: Từ 8.000.000 VNĐ</div>
                      </FadeIn>
                  </div>

                  {/* Step 3 */}
                  <div className="relative pl-12 md:pl-20 group">
                      <div className="absolute -left-[5px] top-0 w-[11px] h-[11px] rounded-full bg-brand-yellow shadow-[0_0_10px_#FACC15]"></div>
                      <FadeIn delay={300} direction="right">
                          <span className="text-brand-yellow text-xs font-bold uppercase tracking-widest mb-2 block">Giai Đoạn 03</span>
                          <h4 className="text-2xl font-bold text-white mb-2">Phát Triển (Development) & QC</h4>
                          <p className="text-gray-400 text-sm mb-4">"Biến bản vẽ thành sản phẩm thực tế theo từng Sprint."</p>
                          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-500 mb-4">
                              <li>Code chức năng theo module (Agile Sprint)</li>
                              <li>Tích hợp API bên thứ 3 (Kế toán, Web...)</li>
                              <li>Kiểm thử (QA/QC) & Bảo mật</li>
                          </ul>
                          <div className="inline-block px-3 py-1 bg-gray-900 border border-gray-700 rounded text-xs font-bold text-white">Chi phí: Từ 15.000.000 VNĐ</div>
                      </FadeIn>
                  </div>

                  {/* Step 4 */}
                  <div className="relative pl-12 md:pl-20 group">
                      <div className="absolute -left-[5px] top-0 w-[11px] h-[11px] rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]"></div>
                      <FadeIn delay={400} direction="right">
                          <span className="text-green-500 text-xs font-bold uppercase tracking-widest mb-2 block">Giai Đoạn 04</span>
                          <h4 className="text-2xl font-bold text-white mb-2">Triển Khai & Đào Tạo</h4>
                          <p className="text-gray-400 text-sm mb-4">"Đưa hệ thống vào vận hành trơn tru."</p>
                          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-500 mb-4">
                              <li>Deploy Production (Server, Domain, SSL)</li>
                              <li>Migrate dữ liệu cũ (nếu có)</li>
                              <li>Đào tạo Admin & Staff, bàn giao tài liệu</li>
                          </ul>
                          <div className="inline-block px-3 py-1 bg-gray-900 border border-gray-700 rounded text-xs font-bold text-white">Chi phí: Từ 7.000.000 VNĐ</div>
                      </FadeIn>
                  </div>
              </div>
          </div>
      </section>

      {/* 4. PRICING TABLE */}
      <section id="software-pricing" className="py-24 px-6 border-t border-gray-900">
          <div className="container mx-auto">
              <FadeIn>
                <div className="text-center mb-16">
                    <h3 className="text-3xl font-black text-white uppercase mb-4">Bảng Giá Tham Khảo</h3>
                    <p className="text-gray-400 text-sm">Chi phí chính xác sẽ được báo sau khi khảo sát yêu cầu cụ thể.</p>
                </div>
              </FadeIn>

              <div className="overflow-x-auto">
                  <div className="min-w-[800px] grid grid-cols-3 gap-6">
                      
                      {/* Basic */}
                      <div className="bg-gray-900/20 border border-gray-800 p-8 rounded-2xl flex flex-col">
                          <div className="mb-6">
                              <h4 className="text-xl font-black text-white uppercase">Cơ Bản</h4>
                              <p className="text-gray-500 text-xs mt-2">Dành cho quy mô nhỏ</p>
                          </div>
                          <div className="text-2xl font-bold text-brand-yellow mb-6">35 - 50tr <span className="text-xs text-gray-500 font-normal">VNĐ</span></div>
                          <ul className="space-y-3 mb-8 flex-1">
                              <li className="flex gap-2 text-sm text-gray-300"><CheckCircle2 size={16} className="text-gray-500"/> 3-5 Module chức năng</li>
                              <li className="flex gap-2 text-sm text-gray-300"><CheckCircle2 size={16} className="text-gray-500"/> 1-2 Vai trò người dùng</li>
                              <li className="flex gap-2 text-sm text-gray-300"><CheckCircle2 size={16} className="text-gray-500"/> Không tích hợp phức tạp</li>
                          </ul>
                          <button onClick={onCtaClick} className="w-full py-3 border border-gray-700 hover:bg-white hover:text-black hover:border-white text-white rounded-xl font-bold text-sm uppercase transition-all">Tư Vấn Gói Này</button>
                      </div>

                      {/* Standard */}
                      <div className="bg-gray-900/60 border border-brand-yellow p-8 rounded-2xl flex flex-col relative shadow-[0_0_30px_rgba(250,204,21,0.1)]">
                          <div className="absolute top-0 right-0 bg-brand-yellow text-black text-[10px] font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">POPULAR</div>
                          <div className="mb-6">
                              <h4 className="text-xl font-black text-white uppercase">Trung Bình</h4>
                              <p className="text-gray-500 text-xs mt-2">Dành cho SMEs đang tăng trưởng</p>
                          </div>
                          <div className="text-2xl font-bold text-brand-yellow mb-6">50 - 100tr <span className="text-xs text-gray-500 font-normal">VNĐ</span></div>
                          <ul className="space-y-3 mb-8 flex-1">
                              <li className="flex gap-2 text-sm text-white"><CheckCircle2 size={16} className="text-brand-yellow"/> 5-10 Module chức năng</li>
                              <li className="flex gap-2 text-sm text-white"><CheckCircle2 size={16} className="text-brand-yellow"/> 3-5 Vai trò phân quyền</li>
                              <li className="flex gap-2 text-sm text-white"><CheckCircle2 size={16} className="text-brand-yellow"/> Tích hợp 1-2 hệ thống (Web/Mail)</li>
                          </ul>
                          <button onClick={onCtaClick} className="w-full py-3 bg-brand-yellow text-black rounded-xl font-bold text-sm uppercase transition-all hover:bg-white">Tư Vấn Gói Này</button>
                      </div>

                      {/* Advanced */}
                      <div className="bg-gray-900/20 border border-gray-800 p-8 rounded-2xl flex flex-col">
                          <div className="mb-6">
                              <h4 className="text-xl font-black text-white uppercase">Nâng Cao</h4>
                              <p className="text-gray-500 text-xs mt-2">Enterprise / Hệ sinh thái lớn</p>
                          </div>
                          <div className="text-2xl font-bold text-brand-yellow mb-6">From 100tr <span className="text-xs text-gray-500 font-normal">VNĐ</span></div>
                          <ul className="space-y-3 mb-8 flex-1">
                              <li className="flex gap-2 text-sm text-gray-300"><CheckCircle2 size={16} className="text-cyan-500"/> 10+ Module phức tạp</li>
                              <li className="flex gap-2 text-sm text-gray-300"><CheckCircle2 size={16} className="text-cyan-500"/> Phân quyền đa cấp độ</li>
                              <li className="flex gap-2 text-sm text-gray-300"><CheckCircle2 size={16} className="text-cyan-500"/> Automation & Tích hợp sâu</li>
                          </ul>
                          <button onClick={onCtaClick} className="w-full py-3 border border-gray-700 hover:bg-cyan-500 hover:text-black hover:border-cyan-500 text-white rounded-xl font-bold text-sm uppercase transition-all">Tư Vấn Gói Này</button>
                      </div>

                  </div>
              </div>
          </div>
      </section>

      {/* 5. MAINTENANCE & UPGRADE */}
      <section className="py-20 px-6 bg-gray-900/30">
          <div className="container mx-auto">
              <h4 className="text-xl font-bold text-white mb-8 text-center uppercase">Dịch Vụ Bảo Trì & Nâng Cấp</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                      { name: "Bảo Trì Cơ Bản", price: "2.000.000", unit: "tháng", feat: "Sửa lỗi, backup data, update bảo mật" },
                      { name: "Bảo Trì Nâng Cao", price: "5.000.000", unit: "tháng", feat: "Gói cơ bản + Hỗ trợ ưu tiên + Chỉnh sửa nhỏ" },
                      { name: "Toàn Diện", price: "Báo Giá Riêng", unit: "project", feat: "Phát triển tính năng mới liên tục (Dev hours)" }
                  ].map((pkg, idx) => (
                      <div key={idx} className="bg-black border border-gray-800 p-6 rounded-xl text-center">
                          <h5 className="text-white font-bold mb-2">{pkg.name}</h5>
                          <div className="text-brand-yellow font-bold text-lg mb-2">{pkg.price} <span className="text-xs text-gray-500">/{pkg.unit}</span></div>
                          <p className="text-gray-400 text-xs">{pkg.feat}</p>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* 6. CASE STUDY & WHY US */}
      <section className="py-24 px-6 border-t border-gray-900">
          <div className="container mx-auto max-w-6xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                  {/* Case Study */}
                  <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 p-8 rounded-3xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-10 font-black text-9xl text-white select-none">"</div>
                      <div className="relative z-10">
                          <div className="inline-flex items-center gap-2 bg-brand-yellow/10 text-brand-yellow px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-6 border border-brand-yellow/20">
                              Case Study: Hotel Management
                          </div>
                          <p className="text-xl text-white leading-relaxed mb-6 font-medium">
                              "Từ quản lý bằng Excel và sổ tay, khách sạn <strong className="text-brand-yellow">PRESTIGE TRAVEL</strong> đã chuyển sang hệ thống số hóa toàn diện – giảm 70% thời gian xử lý đặt phòng, theo dõi doanh thu realtime, và không còn tình trạng double booking."
                          </p>
                          <div className="flex items-center gap-4 border-t border-gray-800 pt-4">
                              <div className="w-10 h-10 bg-gray-800 rounded-full"></div>
                              <div>
                                  <div className="text-white font-bold text-sm">CEO Prestige Travel</div>
                                  <div className="text-gray-500 text-xs">Đối tác từ 2023</div>
                              </div>
                          </div>
                      </div>
                  </div>

                  {/* Why Us */}
                  <div>
                      <h3 className="text-2xl font-black text-white uppercase mb-8">Tại Sao Chọn DUHAVA?</h3>
                      <div className="space-y-6">
                          {[
                              { title: "Giải pháp đúng vấn đề", desc: "Không bán phần mềm thừa tính năng, chỉ xây những gì bạn thực sự cần." },
                              { title: "Hiểu nghiệp vụ chuyên sâu", desc: "Kinh nghiệm triển khai cho nhiều ngành: khách sạn, F&B, bán lẻ..." },
                              { title: "Công nghệ hiện đại", desc: "Nền tảng ổn định (Cloud), dễ mở rộng (Scalable) và bảo mật cao." },
                              { title: "Đồng hành dài hạn", desc: "Không bỏ rơi khách hàng. Hỗ trợ kỹ thuật trọn đời dự án." }
                          ].map((item, idx) => (
                              <div key={idx} className="flex gap-4">
                                  <div className="w-8 h-8 rounded-full bg-cyan-900/30 flex items-center justify-center text-cyan-400 shrink-0 mt-1">
                                      <ShieldCheck size={16} />
                                  </div>
                                  <div>
                                      <h4 className="text-white font-bold text-sm mb-1">{item.title}</h4>
                                      <p className="text-gray-400 text-xs leading-relaxed">{item.desc}</p>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* 7. STICKY CTA */}
      <div className="fixed bottom-0 left-0 w-full z-50 bg-black/80 backdrop-blur-xl border-t border-gray-800 py-4 px-6">
          <div className="container mx-auto flex justify-between items-center">
              <div className="hidden md:block">
                  <span className="text-white font-bold uppercase text-sm">Bạn đang gặp vấn đề vận hành?</span>
                  <span className="text-gray-500 text-xs ml-2">Để chuyên gia công nghệ phân tích giúp bạn.</span>
              </div>
              <button 
                onClick={onCtaClick}
                className="w-full md:w-auto bg-brand-yellow text-black font-black uppercase py-3 px-8 rounded-full hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(250,204,21,0.3)]"
              >
                  <Settings size={16}/> Đăng Ký Tư Vấn Miễn Phí
              </button>
          </div>
      </div>
      <div className="h-24"></div>

    </div>
  );
};

export default DigitalTransformationLanding;
