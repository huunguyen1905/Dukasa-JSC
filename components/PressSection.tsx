import React from 'react';
import { ArrowUpRight, Newspaper, Tv, Video } from 'lucide-react';
import FadeIn from './FadeIn';

const pressData = [
  {
    id: 1,
    outlet: "VTV Online",
    type: "Báo Điện Tử",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/VTV_logo_2013_final.svg/800px-VTV_logo_2013_final.svg.png",
    title: "AI và Tự động hóa: Cơ hội, Thách thức và Xu hướng trong 5 năm tới",
    desc: "Phân tích sâu sắc về tác động của trí tuệ nhân tạo đối với thị trường lao động và doanh nghiệp Việt Nam.",
    link: "https://vtv.vn/cong-nghe/ai-va-tu-dong-hoa-co-hoi-thach-thuc-va-xu-huong-trong-5-nam-toi-20250318163053081.htm",
    icon: <Newspaper size={20} />
  },
  {
    id: 2,
    outlet: "HTV & FPTU",
    type: "Truyền Hình",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/HTV_New_Logo.png/800px-HTV_New_Logo.png",
    title: "Triển khai Tech Fest & Job Fair với sự hỗ trợ hơn 80% của AI",
    desc: "Đột phá công nghệ trong khâu tổ chức sự kiện quy mô lớn dành cho sinh viên công nghệ.",
    link: "https://www.youtube.com/watch?v=qUl88KNUZl0",
    icon: <Video size={20} />
  },
  {
    id: 3,
    outlet: "TayNinhTV",
    type: "Tọa Đàm",
    logo: "https://tayninhtv.vn/uploads/logo.png", // Fallback text handling included
    title: "Toạ Đàm: Quản Trị Doanh Nghiệp Trong Kỷ Nguyên Số",
    desc: "Chia sẻ chiến lược quản trị hiện đại giúp doanh nghiệp địa phương bứt phá.",
    link: "https://tayninhtv.vn/ban-tin-18g30/thoi-su-tay-ninh-2132025-tin-tuc-hom-nay-tayninhtv?fbclid=IwY2xjawM0flZleHRuA2FlbQIxMABicmlkETFTS2xOWmkyaTVHdnNWVDRDAR7Rw5bPCDm6T8rE_MhRdtnYJJVYdWIkwFN1_Zr6iIiiX16DXVqXB6u3HSqSjg_aem_PEaRqYZZdofPuHhsgQ4TCg",
    icon: <Tv size={20} />
  },
  {
    id: 4,
    outlet: "Báo Tây Ninh",
    type: "Báo Chính Thống",
    logo: "", // Text fallback
    title: "Tập huấn ứng dụng AI trong truyền thông mạng xã hội",
    desc: "Đào tạo hơn 400 cán bộ lực lượng vũ trang và tổ chức chính trị - xã hội về kỹ năng số.",
    link: "https://baotayninh.vn/tap-huan-ky-nang-su-dung-cong-nghe-ai-phuc-vu-cong-tac-truyen-thong-tren-mang-xa-hoi-a190711.html",
    icon: <Newspaper size={20} />
  },
  {
    id: 5,
    outlet: "Bnews (TTXVN)",
    type: "Tin Tức",
    logo: "", // Text fallback
    title: "Ngày hội ứng dụng chuyển đổi số & trí tuệ nhân tạo",
    desc: "Sự kiện trọng điểm do Sở Tài Chính & Hiệp hội DN tổ chức với sự hỗ trợ công nghệ từ DUHAVA.",
    link: "https://bnews.vn/ngay-hoi-ung-dung-chuyen-doi-so-va-tri-tue-nhan-tao-danh-cho-doanh-nghiep/376348.html",
    icon: <Newspaper size={20} />
  }
];

const PressSection: React.FC = () => {
  return (
    <section className="bg-brand-black py-24 border-t border-gray-900 relative">
      <div className="container mx-auto px-6 relative z-10">
        <FadeIn>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                <div>
                    <h2 className="text-brand-yellow font-bold tracking-widest uppercase mb-2 flex items-center gap-2">
                        <Newspaper size={18} /> Truyền Thông
                    </h2>
                    <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                        Báo Chí Nói Về <span className="text-gray-600">DUHAVA</span>
                    </h3>
                </div>
            </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pressData.map((item, index) => (
                <FadeIn key={item.id} delay={index * 100} className="h-full">
                    <a 
                        href={item.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group block h-full bg-gray-900/40 border border-gray-800 rounded-2xl overflow-hidden hover:border-brand-yellow/50 hover:bg-gray-900/60 transition-all duration-300 relative flex flex-col"
                    >
                        {/* Decorative top bar */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 group-hover:via-brand-yellow/50 transition-colors"></div>

                        <div className="p-8 flex flex-col h-full">
                            {/* Header: Outlet Logo/Name */}
                            <div className="flex justify-between items-start mb-6">
                                <div className="h-10 flex items-center">
                                    {item.logo ? (
                                        <img src={item.logo} alt={item.outlet} className="h-full w-auto object-contain max-w-[120px] brightness-0 invert group-hover:brightness-100 group-hover:invert-0 transition-all duration-300" onError={(e) => {
                                            (e.target as HTMLImageElement).style.display = 'none';
                                            (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                                        }} />
                                    ) : null}
                                    <span className={`text-lg font-black uppercase tracking-wider text-gray-400 group-hover:text-white transition-colors ${item.logo ? 'hidden' : ''}`}>
                                        {item.outlet}
                                    </span>
                                </div>
                                <div className="bg-gray-800/50 p-2 rounded-full text-gray-400 group-hover:text-brand-yellow group-hover:bg-brand-yellow/10 transition-colors">
                                    {item.icon}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <span className="inline-block px-3 py-1 rounded bg-brand-yellow/10 text-brand-yellow text-[10px] font-bold uppercase tracking-widest mb-4 border border-brand-yellow/20">
                                    {item.type}
                                </span>
                                <h4 className="text-xl font-bold text-white mb-3 group-hover:text-brand-yellow transition-colors leading-tight">
                                    {item.title}
                                </h4>
                                <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                                    {item.desc}
                                </p>
                            </div>

                            {/* Footer: Read More */}
                            <div className="pt-6 border-t border-gray-800 mt-auto flex items-center justify-between text-sm font-bold uppercase tracking-wider text-gray-500 group-hover:text-white transition-colors">
                                <span>Xem Chi Tiết</span>
                                <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-brand-yellow" />
                            </div>
                        </div>
                    </a>
                </FadeIn>
            ))}
        </div>
      </div>
    </section>
  );
};

export default PressSection;