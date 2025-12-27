import { Service, Project, NewsItem, TeamMember } from '../types';

export const MOCK_SERVICES: Service[] = [
  {
    id: 'svc-branding',
    title: 'Định Vị Thương Hiệu Độc Bản',
    description: 'Không chỉ là Logo. Chúng tôi xây dựng "linh hồn" cho doanh nghiệp. Từ chiến lược Brand Key, Key Visual đến Tone of Voice, biến thương hiệu của bạn thành biểu tượng không thể thay thế.',
    icon: 'Sparkles',
    imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'svc-web',
    title: 'Thiết Kế Web High-End',
    description: 'Website là bộ mặt số của doanh nghiệp. Chúng tôi thiết kế giao diện chuẩn quốc tế, tích hợp hiệu ứng 3D/WebGL mượt mà, tối ưu trải nghiệm người dùng để tối đa hóa tỷ lệ chuyển đổi.',
    icon: 'Monitor',
    imageUrl: 'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'svc-ads',
    title: 'Performance Marketing',
    description: 'Chúng tôi không đốt tiền quảng cáo. Chúng tôi đầu tư để sinh lời. Chiến lược đa kênh (Facebook, TikTok, Google) nhắm đúng đối tượng, tối ưu chi phí (CPA) thấp nhất với ROI cao nhất.',
    icon: 'TrendingUp',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'svc-seo',
    title: 'SEO Tổng Thể',
    description: 'Thống trị Google bền vững. Đưa từ khóa thương hiệu lên Top 1, phủ sóng mọi điểm chạm khách hàng, tăng trưởng Traffic tự nhiên (Organic) và uy tín doanh nghiệp dài hạn.',
    icon: 'Search',
    imageUrl: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&q=80&w=1000'
  }
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'prj-luxury-estate',
    title: 'The Empire City',
    client: 'Masterise Homes',
    category: 'Real Estate 3D',
    result: 'Bán 500 căn trong 2h',
    imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1000',
    description: 'Triển khai chiến dịch ra mắt dự án hạng sang. Ứng dụng công nghệ VR 360 Tour trên Landing Page giúp khách hàng trải nghiệm căn hộ tại gia. Kết hợp chạy Ads tiếp cận giới siêu giàu (High Net Worth Individuals).'
  },
  {
    id: 'prj-tech-fintech',
    title: 'NeoBank Rebranding',
    client: 'TPBank Digital',
    category: 'Branding & App UI',
    result: '+1 Triệu User mới',
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000',
    description: 'Tái định vị ngân hàng số dành cho Gen Z. Thiết kế lại UI/UX App ngân hàng theo phong cách Cyberpunk, tối giản quy trình eKYC chỉ còn 30 giây. Chiến dịch Viral "Bank không ngủ" phủ sóng TikTok.'
  },
  {
    id: 'prj-fashion',
    title: 'Streetwear Revolution',
    client: 'DirtyCoins Studio',
    category: 'Social Media Viral',
    result: '10M Views TikTok',
    imageUrl: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=1000',
    description: 'Booking 50 KOCs thời trang/lifestyle hàng đầu để tạo trend "Biến hình". Video đạt Top Trending TikTok sau 24h. Doanh số E-commerce tăng trưởng 400% trong tháng ra mắt bộ sưu tập mới.'
  },
  {
    id: 'prj-fnb',
    title: 'Coffee Chain Loyalty',
    client: 'The Coffee House',
    category: 'Web App & CRM',
    result: '+45% Khách quay lại',
    imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=1000',
    description: 'Tư vấn và triển khai hệ thống Loyalty App. Cá nhân hóa ưu đãi (Personalized Offer) dựa trên thói quen uống cafe. Tự động gửi thông báo đẩy (Push Noti) vào đúng giờ khách thường mua hàng.'
  }
];

export const MOCK_NEWS: NewsItem[] = [
  {
    id: 'news-ai-2024',
    title: 'Tương lai của AI trong Digital Marketing 2024',
    category: 'Xu Hướng',
    date: '2024-03-15',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000',
    summary: 'AI không thay thế Marketer, nhưng Marketer biết dùng AI sẽ thay thế người không biết. Phân tích cách ChatGPT, Midjourney đang thay đổi cuộc chơi sáng tạo nội dung.',
    content: 'Nội dung chi tiết về cách ChatGPT, Midjourney và Gemini đang thay đổi cách sản xuất nội dung...'
  },
  {
    id: 'news-award',
    title: 'DUHAVA đạt giải "Agency Sáng Tạo Của Năm"',
    category: 'Thông Cáo',
    date: '2024-03-10',
    imageUrl: 'https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&q=80&w=1000',
    summary: 'Cột mốc quan trọng ghi nhận nỗ lực của đội ngũ. Giải thưởng danh giá từ Hiệp hội Marketing Châu Á (MMA Smarties) cho chiến dịch Bất động sản xuất sắc nhất.',
    content: 'Lễ trao giải diễn ra tại Singapore với sự tham gia của 500 chuyên gia đầu ngành...'
  },
  {
    id: 'news-uiux',
    title: '5 Quy luật tâm lý học trong thiết kế UX/UI',
    category: 'Chuyên Môn',
    date: '2024-03-01',
    imageUrl: 'https://images.unsplash.com/photo-1586717791821-3f44a5638d48?auto=format&fit=crop&q=80&w=1000',
    summary: 'Tại sao khách hàng bấm nút "Mua ngay"? Khám phá Luật Fitts, Hiệu ứng Von Restorff và cách ứng dụng màu sắc để điều hướng mắt nhìn, tăng tỷ lệ chuyển đổi cho Website.',
    content: 'Phân tích sâu về hành vi người dùng và cách điều hướng mắt nhìn...'
  }
];

export const MOCK_TEAM: TeamMember[] = [
  {
    id: 'tm-1',
    name: 'Alex Nguyễn',
    role: 'Founder & CEO',
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800',
    bio: '15 năm kinh nghiệm quản trị chiến lược số cho các tập đoàn đa quốc gia.'
  },
  {
    id: 'tm-2',
    name: 'Sarah Trần',
    role: 'Creative Director',
    imageUrl: 'https://images.unsplash.com/photo-1573496359-7013ac2bebb4?auto=format&fit=crop&q=80&w=800',
    bio: 'Người đứng sau các chiến dịch Branding đạt giải thưởng quốc tế.'
  },
  {
    id: 'tm-3',
    name: 'David Hoàng',
    role: 'Head of Technology',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800',
    bio: 'Chuyên gia Full-stack, kiến trúc sư hệ thống cho các nền tảng thương mại điện tử lớn.'
  },
  {
    id: 'tm-4',
    name: 'Emily Phạm',
    role: 'Marketing Manager',
    imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800',
    bio: 'Bậc thầy về Performance Marketing và tối ưu hóa tỷ lệ chuyển đổi.'
  }
];