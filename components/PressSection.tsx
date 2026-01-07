
import React, { useState, useRef } from 'react';
import { ArrowUpRight, Newspaper, Tv, Video, Award, Mic, ChevronDown, ChevronUp } from 'lucide-react';
import FadeIn from './FadeIn';

const pressData = [
  {
    id: 1,
    outlet: "VTV Online",
    type: "Tiêu Điểm",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/VTV_logo_2013_final.svg/800px-VTV_logo_2013_final.svg.png",
    title: "AI và Tự động hóa: Cơ hội, Thách thức và Xu hướng trong 5 năm tới",
    desc: "Phân tích sâu sắc về tác động của trí tuệ nhân tạo đối với thị trường lao động và doanh nghiệp Việt Nam. DUHAVA chia sẻ góc nhìn về việc ứng dụng AI không phải để thay thế con người, mà để tối ưu hóa hiệu suất.",
    link: "https://vtv.vn/cong-nghe/ai-va-tu-dong-hoa-co-hoi-thach-thuc-va-xu-huong-trong-5-nam-toi-20250318163053081.htm",
    icon: <Newspaper size={20} />,
    featured: true,
    image: "https://cdn-images.vtv.vn/66349b6076cb4dee98746cf1/2025/03/18/4-11-17301276384016826390671.jpg"
  },
  {
    id: 2,
    outlet: "HTV & FPTU",
    type: "Truyền Hình",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/HTV_New_Logo.png/800px-HTV_New_Logo.png",
    title: "Triển khai Tech Fest & Job Fair với sự hỗ trợ hơn 80% của AI",
    desc: "Đột phá công nghệ trong khâu tổ chức sự kiện quy mô lớn dành cho sinh viên.",
    link: "https://www.youtube.com/watch?v=qUl88KNUZl0",
    icon: <Video size={20} />,
    featured: false
  },
  {
    id: 3,
    outlet: "TayNinhTV",
    type: "Tọa Đàm",
    logo: "https://tayninhtv.vn/uploads/logo.png",
    title: "Quản Trị Doanh Nghiệp Trong Kỷ Nguyên Số",
    desc: "Chia sẻ chiến lược quản trị hiện đại giúp doanh nghiệp địa phương bứt phá.",
    link: "https://tayninhtv.vn/ban-tin-18g30/thoi-su-tay-ninh-2132025-tin-tuc-hom-nay-tayninhtv?fbclid=IwY2xjawM0flZleHRuA2FlbQIxMABicmlkETFTS2xOWmkyaTVHdnNWVDRDAR7Rw5bPCDm6T8rE_MhRdtnYJJVYdWIkwFN1_Zr6iIiiX16DXVqXB6u3HSqSjg_aem_PEaRqYZZdofPuHhsgQ4TCg",
    icon: <Tv size={20} />,
    featured: false
  },
  {
    id: 4,
    outlet: "Báo Tây Ninh",
    type: "Chính Thống",
    logo: "", 
    title: "Tập huấn ứng dụng AI trong truyền thông mạng xã hội",
    desc: "Đào tạo hơn 400 cán bộ lực lượng vũ trang về kỹ năng số.",
    link: "https://baotayninh.vn/tap-huan-ky-nang-su-dung-cong-nghe-ai-phuc-vu-cong-tac-truyen-thong-tren-mang-xa-hoi-a190711.html",
    icon: <Award size={20} />,
    featured: false
  },
  {
    id: 5,
    outlet: "Bnews (TTXVN)",
    type: "Tin Tức",
    logo: "",
    title: "Ngày hội ứng dụng chuyển đổi số & trí tuệ nhân tạo",
    desc: "Sự kiện trọng điểm do Sở Tài Chính tổ chức với sự hỗ trợ từ DUHAVA.",
    link: "https://bnews.vn/ngay-hoi-ung-dung-chuyen-doi-so-va-tri-tue-nhan-tao-danh-cho-doanh-nghiep/376348.html",
    icon: <Mic size={20} />,
    featured: false
  }
];

const SpotlightCard: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void }> = ({ children, className = "", onClick }) => {
    const divRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);
  
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!divRef.current) return;
      const rect = divRef.current.getBoundingClientRect();
      setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
  
    const handleFocus = () => {
      setOpacity(1);
    };
  
    const handleBlur = () => {
      setOpacity(0);
    };
  
    return (
      <div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleFocus}
        onMouseLeave={handleBlur}
        onClick={onClick}
        className={`relative overflow-hidden bg-gray-900/40 border border-white/5 rounded-3xl group cursor-pointer ${className}`}
      >
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(250, 204, 21, 0.1), transparent 40%)`,
          }}
        />
        <div className="relative h-full">{children}</div>
      </div>
    );
};

const PressSection: React.FC = () => {
  const [showAll, setShowAll] = useState(false);

  const featuredArticle = pressData.find(p => p.featured);
  const otherArticles = pressData.filter(p => !p.featured);
  
  // Show only 3 items initially, or all if expanded
  const visibleOthers = showAll ? otherArticles : otherArticles.slice(0, 3);

  return (
    <section className="bg-brand-black py-32 border-t border-gray-900 relative overflow-hidden">
      {/* Ambient Lighting */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute right-0 bottom-0 w-[600px] h-[600px] bg-brand-yellow/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <FadeIn>
            <div className="mb-20">
                <div className="flex items-center gap-4 mb-4">
                    <span className="w-12 h-[1px] bg-brand-yellow"></span>
                    <span className="text-brand-yellow font-bold tracking-[0.2em] uppercase text-xs">Media Coverage</span>
                </div>
                <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-tight">
                    Dấu Ấn <br/><span className="text-gray-700">Trên Truyền Thông.</span>
                </h3>
            </div>
        </FadeIn>

        {/* RESTRUCTURED LAYOUT: 2/3 Left (Featured) - 1/3 Right (List) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* 1. FEATURED CARD (Left - Spans 2 cols) */}
            {featuredArticle && (
                <div className="lg:col-span-2 h-full min-h-[500px]">
                    <FadeIn className="h-full">
                        <SpotlightCard className="h-full">
                            <a href={featuredArticle.link} target="_blank" rel="noopener noreferrer" className="block h-full relative group">
                                {/* Background Image */}
                                <div className="absolute inset-0">
                                    <img src={featuredArticle.image} alt="Cover" className="w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-700 scale-105 group-hover:scale-100" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
                                </div>

                                <div className="relative z-10 p-8 md:p-12 flex flex-col h-full justify-end">
                                    <div className="mb-auto">
                                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-yellow text-black text-xs font-black uppercase tracking-widest mb-6">
                                            <Award size={14} /> Tiêu Điểm
                                        </div>
                                    </div>

                                    {/* Logo Area */}
                                    <div className="mb-6 h-12 flex items-center">
                                        {featuredArticle.logo ? (
                                            <img 
                                                src={featuredArticle.logo} 
                                                alt={featuredArticle.outlet} 
                                                className="h-full w-auto object-contain brightness-0 invert opacity-90 group-hover:opacity-100 transition-all"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).style.display = 'none';
                                                    (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                                                }} 
                                            />
                                        ) : null}
                                        <span className={`text-3xl font-black uppercase tracking-wider text-white/90 ${featuredArticle.logo ? 'hidden' : ''}`}>
                                            {featuredArticle.outlet}
                                        </span>
                                    </div>

                                    <h4 className="text-3xl md:text-5xl font-black text-white mb-6 leading-[1.1] group-hover:text-brand-yellow transition-colors">
                                        {featuredArticle.title}
                                    </h4>
                                    <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-2xl line-clamp-3 font-light">
                                        {featuredArticle.desc}
                                    </p>

                                    <div className="flex items-center gap-3 text-white text-sm font-bold uppercase tracking-wider border-b border-transparent group-hover:border-brand-yellow w-fit pb-1 transition-all">
                                        Đọc Bài Viết <ArrowUpRight size={16} />
                                    </div>
                                </div>
                            </a>
                        </SpotlightCard>
                    </FadeIn>
                </div>
            )}

            {/* 2. SIDEBAR LIST (Right - Spans 1 col) */}
            <div className="lg:col-span-1 flex flex-col gap-6">
                {visibleOthers.map((item, index) => (
                    <FadeIn key={item.id} delay={index * 100} className="flex-1">
                        <SpotlightCard className="h-full">
                            <a href={item.link} target="_blank" rel="noopener noreferrer" className="block h-full p-6 md:p-8 flex flex-col justify-between group bg-gray-900/20 hover:bg-gray-900/60 transition-colors">
                                <div>
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="h-6 flex items-center">
                                            {item.logo ? (
                                                <img src={item.logo} alt={item.outlet} className="h-full w-auto object-contain brightness-0 invert opacity-60 group-hover:opacity-100 group-hover:brightness-100 group-hover:invert-0 transition-all duration-500" onError={(e) => {
                                                    (e.target as HTMLImageElement).style.display = 'none';
                                                    (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                                                }} />
                                            ) : null}
                                            <span className={`text-xs font-black uppercase tracking-wider text-gray-500 group-hover:text-white transition-colors ${item.logo ? 'hidden' : ''}`}>
                                                {item.outlet}
                                            </span>
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-gray-500 group-hover:text-brand-yellow group-hover:bg-brand-yellow/10 transition-colors">
                                            {item.icon}
                                        </div>
                                    </div>
                                    <h4 className="text-base md:text-lg font-bold text-white mb-2 group-hover:text-brand-yellow transition-colors line-clamp-2 leading-snug">
                                        {item.title}
                                    </h4>
                                    <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
                                        {item.desc}
                                    </p>
                                </div>
                                <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center opacity-50 group-hover:opacity-100 transition-opacity">
                                    <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">Xem Chi Tiết</span>
                                    <ArrowUpRight size={14} className="text-brand-yellow" />
                                </div>
                            </a>
                        </SpotlightCard>
                    </FadeIn>
                ))}
            </div>

        </div>

        {/* 3. VIEW ALL BUTTON (If more items exist) */}
        {otherArticles.length > 3 && (
            <div className="mt-12 flex justify-center">
                <button 
                    onClick={() => setShowAll(!showAll)}
                    className="group flex items-center gap-2 text-gray-400 hover:text-white border-b border-gray-700 hover:border-brand-yellow pb-1 transition-all uppercase text-xs font-bold tracking-widest"
                >
                    {showAll ? (
                        <>Thu Gọn <ChevronUp size={14} className="group-hover:-translate-y-1 transition-transform"/></>
                    ) : (
                        <>Xem Tất Cả ({otherArticles.length} bài) <ChevronDown size={14} className="group-hover:translate-y-1 transition-transform"/></>
                    )}
                </button>
            </div>
        )}

      </div>
    </section>
  );
};

export default PressSection;
