
import React, { useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Zap, ArrowRight, Layers, Cpu, Globe } from 'lucide-react';
import { Service, Project } from '../types';
import FadeIn from './FadeIn';
import MagneticButton from './MagneticButton';

interface ServiceDetailProps {
  services: Service[];
  projects: Project[];
  onCtaClick: () => void;
}

// Rich content mapping based on service IDs (Simulating CMS data)
const RICH_CONTENT: Record<string, any> = {
    'default': {
        tagline: "Giải Pháp Toàn Diện",
        benefits: ["Tối ưu hóa chi phí", "Tăng trưởng doanh thu", "Nâng tầm thương hiệu", "Hỗ trợ 24/7"],
        process: [
            { step: "01", title: "Phân Tích", desc: "Đánh giá hiện trạng và nghiên cứu đối thủ chuyên sâu." },
            { step: "02", title: "Chiến Lược", desc: "Xây dựng lộ trình thực thi may đo theo mục tiêu." },
            { step: "03", title: "Thực Thi", desc: "Triển khai với đội ngũ chuyên gia hàng đầu." },
            { step: "04", title: "Tối Ưu", desc: "Đo lường và tinh chỉnh real-time để đạt KPI." }
        ]
    },
    'svc-seo': {
        tagline: "Thống Trị Tìm Kiếm",
        benefits: ["Lên Top bền vững", "Traffic tự nhiên chất lượng", "Tăng uy tín thương hiệu", "Tiết kiệm chi phí Ads"],
        process: [
            { step: "01", title: "Audit Website", desc: "Kiểm tra sức khỏe website tổng thể với 200+ tiêu chí Google." },
            { step: "02", title: "Keyword Research", desc: "Nghiên cứu bộ từ khóa chuyển đổi cao (Buying Keywords)." },
            { step: "03", title: "On-page & Off-page", desc: "Tối ưu nội dung và xây dựng hệ thống backlink chất lượng." },
            { step: "04", title: "Reporting", desc: "Báo cáo thứ hạng từ khóa định kỳ hàng tuần." }
        ]
    },
    'svc-ads': {
        tagline: "Bùng Nổ Doanh Số",
        benefits: ["Ra đơn ngay lập tức", "Target đúng đối tượng", "Kiểm soát ngân sách", "Báo cáo minh bạch"],
        process: [
            { step: "01", title: "Setup Tài Khoản", desc: "Thiết lập Business Manager và Pixel theo chuẩn." },
            { step: "02", title: "A/B Testing", desc: "Thử nghiệm đa dạng mẫu quảng cáo để tìm ra mẫu tốt nhất." },
            { step: "03", title: "Scale Up", desc: "Mở rộng ngân sách vào các nhóm hiệu quả để vít số." },
            { step: "04", title: "Remarketing", desc: "Tiếp thị lại tệp khách hàng tiềm năng để chốt đơn." }
        ]
    },
    'svc-branding': {
        tagline: "Định Vị Độc Bản",
        benefits: ["Khác biệt hóa thương hiệu", "Tăng giá trị cảm nhận", "Đồng bộ nhận diện", "Dễ dàng nhượng quyền"],
        process: [
            { step: "01", title: "Brand Audit", desc: "Nghiên cứu cốt lõi thương hiệu và archetype." },
            { step: "02", title: "Concept", desc: "Sáng tạo ý tưởng chủ đạo (Big Idea) và Key Visual." },
            { step: "03", title: "Design System", desc: "Thiết kế Logo, Brand Guideline và ấn phẩm truyền thông." },
            { step: "04", title: "Launch", desc: "Tư vấn chiến lược tung thương hiệu ra thị trường." }
        ]
    },
    'svc-web': {
        tagline: "Kiệt Tác Kỹ Thuật Số",
        benefits: ["Tốc độ tải trang < 1s", "Chuẩn UX/UI Quốc tế", "Tương thích mọi thiết bị", "Bảo mật SSL Cao cấp"],
        process: [
            { step: "01", title: "Wireframe & UX", desc: "Phác thảo luồng người dùng để tối ưu hóa tỷ lệ chuyển đổi (CRO)." },
            { step: "02", title: "Visual Design", desc: "Thiết kế giao diện đẹp mắt, nhất quán với nhận diện thương hiệu." },
            { step: "03", title: "Development", desc: "Lập trình Frontend & Backend với công nghệ mới nhất (React, NextJS)." },
            { step: "04", title: "Testing & Go-live", desc: "Kiểm thử đa nền tảng và bàn giao mã nguồn gốc." }
        ]
    }
};

const ServiceDetail: React.FC<ServiceDetailProps> = ({ services, projects, onCtaClick }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const service = services.find(s => s.id === id);
  
  // Get rich content or fallback
  const content = (id && RICH_CONTENT[id]) ? RICH_CONTENT[id] : RICH_CONTENT['default'];

  // Filter related projects
  const relatedProjects = useMemo(() => {
      if (!service) return [];
      
      // Safety check: ensure title exists
      const safeServiceTitle = service.title || '';
      if (!safeServiceTitle) return [];

      const serviceKey = safeServiceTitle.split(' ')[0].toLowerCase();

      return projects.filter(p => {
          // Safety check: ensure category exists
          const safeCategory = p.category || '';
          if (!safeCategory) return false;

          const categoryKey = safeCategory.split(' ')[0].toLowerCase();
          
          return safeCategory.toLowerCase().includes(serviceKey) ||
                 safeServiceTitle.toLowerCase().includes(categoryKey);
      }).slice(0, 2);
  }, [service, projects]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (service) {
        document.title = `${service.title} - Dịch Vụ DUHAVA`;
    }
  }, [id, service]);

  if (!service) {
      return (
          <div className="min-h-screen bg-brand-black flex items-center justify-center">
              <div className="text-center">
                  <h2 className="text-2xl text-white font-bold mb-4">Dịch vụ không tồn tại</h2>
                  <button onClick={() => navigate('/')} className="text-brand-yellow hover:underline">Về Trang Chủ</button>
              </div>
          </div>
      );
  }

  return (
    <div className="bg-brand-black min-h-screen relative overflow-x-hidden selection:bg-brand-yellow selection:text-black">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
          {/* Background Image with Parallax feel */}
          <div className="absolute inset-0 z-0">
              <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover opacity-40 filter brightness-50" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-transparent to-transparent"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10 pt-20">
              <button 
                onClick={() => navigate('/giai-phap')}
                className="group flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors uppercase text-xs font-bold tracking-widest"
              >
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform"/> Quay lại Dịch Vụ
              </button>

              <FadeIn>
                  <div className="max-w-4xl">
                      <span className="inline-block px-4 py-1.5 rounded-full border border-brand-yellow/30 bg-brand-yellow/10 text-brand-yellow text-xs font-black uppercase tracking-[0.2em] mb-6 backdrop-blur-md">
                          {content.tagline}
                      </span>
                      <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase leading-none tracking-tighter mb-8 drop-shadow-2xl">
                          {service.title}
                      </h1>
                      <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl leading-relaxed border-l-4 border-brand-yellow pl-6">
                          {service.description}
                      </p>
                  </div>
              </FadeIn>
          </div>
      </section>

      {/* 2. STATS STRIP */}
      <div className="border-y border-white/10 bg-white/5 backdrop-blur-sm relative z-20">
          <div className="container mx-auto px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
                  {content.benefits.map((benefit: string, idx: number) => (
                      <div key={idx} className="py-8 px-4 text-center group hover:bg-white/5 transition-colors">
                          <Check size={24} className="text-brand-yellow mx-auto mb-3" />
                          <span className="text-white text-xs md:text-sm font-bold uppercase tracking-wide block">{benefit}</span>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      {/* 3. DEEP DIVE CONTENT */}
      <section className="py-24 relative">
          <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                  
                  {/* Left: Sticky Methodology */}
                  <div className="lg:col-span-5">
                      <div className="sticky top-32">
                          <h3 className="text-4xl font-black text-white uppercase mb-8 leading-tight">
                              Quy Trình <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-white">Thực Thi Chuẩn</span>
                          </h3>
                          <p className="text-gray-400 mb-12 text-lg">
                              Chúng tôi áp dụng mô hình Agile Marketing để đảm bảo tính linh hoạt và hiệu quả tối đa cho từng giai đoạn dự án.
                          </p>
                          <MagneticButton>
                            <button 
                                onClick={onCtaClick}
                                className="bg-white text-black font-black uppercase py-4 px-10 rounded-full hover:bg-brand-yellow transition-all shadow-xl flex items-center gap-3"
                            >
                                <Zap size={20} fill="black" /> Tư Vấn Ngay
                            </button>
                          </MagneticButton>
                      </div>
                  </div>

                  {/* Right: Steps List */}
                  <div className="lg:col-span-7 space-y-4">
                      {content.process.map((step: any, idx: number) => (
                          <FadeIn key={idx} delay={idx * 100} direction="up">
                              <div className="group bg-gray-900/50 border border-gray-800 p-8 rounded-2xl hover:border-brand-yellow/50 transition-all duration-300 hover:translate-x-2">
                                  <div className="flex flex-col md:flex-row gap-6 items-start">
                                      <div className="text-5xl font-black text-gray-800 group-hover:text-brand-yellow/20 transition-colors font-mono">
                                          {step.step}
                                      </div>
                                      <div>
                                          <h4 className="text-2xl font-bold text-white mb-3 group-hover:text-brand-yellow transition-colors">
                                              {step.title}
                                          </h4>
                                          <p className="text-gray-400 leading-relaxed">
                                              {step.desc}
                                          </p>
                                      </div>
                                  </div>
                              </div>
                          </FadeIn>
                      ))}
                  </div>
              </div>
          </div>
      </section>

      {/* 4. RELATED PROJECTS */}
      {relatedProjects.length > 0 && (
          <section className="py-24 border-t border-gray-900 bg-gray-900/20">
              <div className="container mx-auto px-6">
                  <div className="flex justify-between items-end mb-12">
                      <h3 className="text-3xl font-black text-white uppercase">Dự Án Đã Triển Khai</h3>
                      <button onClick={() => navigate('/du-an')} className="text-brand-yellow font-bold text-sm uppercase tracking-wider flex items-center gap-2 hover:underline">
                          Xem Tất Cả <ArrowRight size={16}/>
                      </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {relatedProjects.map((p) => (
                          <div 
                            key={p.id} 
                            onClick={() => navigate(`/project/${p.id}`)}
                            className="group cursor-pointer"
                          >
                              <div className="relative aspect-video overflow-hidden rounded-xl bg-gray-800 mb-6 border border-gray-800 group-hover:border-brand-yellow/30 transition-all">
                                  <img src={p.imageUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={p.title} />
                                  <div className="absolute top-4 right-4 bg-brand-black/80 backdrop-blur text-white px-3 py-1 rounded text-xs font-bold border border-white/10">
                                      {p.category}
                                  </div>
                              </div>
                              <h4 className="text-xl font-bold text-white mb-2 group-hover:text-brand-yellow transition-colors">{p.title}</h4>
                              <div className="text-gray-500 text-xs font-bold uppercase tracking-wider">{p.client}</div>
                          </div>
                      ))}
                  </div>
              </div>
          </section>
      )}

      {/* 5. BOTTOM CTA */}
      <section className="py-20 bg-brand-yellow relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-multiply"></div>
          <div className="container mx-auto px-6 text-center relative z-10">
              <h2 className="text-4xl md:text-6xl font-black text-brand-black uppercase mb-8 leading-none">
                  Sẵn sàng dẫn đầu?
              </h2>
              <button 
                onClick={onCtaClick}
                className="bg-black text-white text-xl font-bold py-5 px-12 rounded-full hover:scale-105 transition-transform shadow-2xl"
              >
                  Bắt Đầu Dự Án Ngay
              </button>
          </div>
      </section>

    </div>
  );
};

export default ServiceDetail;
