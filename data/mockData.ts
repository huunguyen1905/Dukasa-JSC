import { Service, Project, NewsItem, TeamMember } from '../types';

export const MOCK_SERVICES: Service[] = [
  {
    id: 'svc-ai-automation',
    title: 'AI Agent & Automation',
    description: 'Tự động hóa quy trình doanh nghiệp bằng trí tuệ nhân tạo. Xây dựng trợ lý AI (AI Agents) chuyên biệt cho CSKH, Marketing, HR và Chấm thi tự động.',
    icon: 'Cpu',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'svc-branding',
    title: 'Tư Vấn Chiến Lược Số',
    description: 'Đồng hành cùng doanh nghiệp từ A-Z: Audit hiện trạng, lên kế hoạch Marketing tổng thể (Social, Website, Ads) và đào tạo đội ngũ In-house.',
    icon: 'Target',
    imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'svc-training',
    title: 'Đào Tạo AI & Digital',
    description: 'Các khóa huấn luyện thực chiến "Mastering AI for Work" dành cho doanh nghiệp, tập đoàn và các trường đại học hàng đầu (UEF, FPT, NTTU).',
    icon: 'BookOpen',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: 'svc-media',
    title: 'Sản Xuất Media AI',
    description: 'Ứng dụng AI sáng tạo Video, TVC, hình ảnh, Mascot và thiết kế ấn phẩm truyền thông với tốc độ nhanh gấp 10 lần phương pháp truyền thống.',
    icon: 'Video',
    imageUrl: 'https://images.unsplash.com/photo-1626544827763-d516dce335ca?auto=format&fit=crop&q=80&w=1000'
  }
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'prj-trung-son',
    title: 'Trung Sơn Pharma',
    client: 'Trung Sơn & Asia Business Builders',
    category: 'Strategy & CRM',
    result: 'Đồng hành 1.5 Năm',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000', // Placeholder
    description: 'Lễ ký kết hợp tác chiến lược. Triển khai tổng thể và đào tạo Marketing Online: Social, Website, Ads, CRM giúp tối ưu hóa vận hành chuỗi dược phẩm.'
  },
  {
    id: 'prj-prudential',
    title: 'Prudential AI Agents',
    client: 'Prudential Vietnam',
    category: 'AI Solution',
    result: 'Train toàn quốc',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1000', // Placeholder
    description: 'Chương trình chia sẻ trực tuyến cho toàn bộ tư vấn viên Prudential trên cả nước. Ứng dụng tạo AI Agents (Trợ lý ảo) hỗ trợ tư vấn và chăm sóc khách hàng tự động.'
  },
  {
    id: 'prj-droppii',
    title: 'Sàn TMĐT Droppii',
    client: 'Droppii Việt Nam/Cambodia',
    category: 'E-commerce',
    result: 'Tăng doanh số',
    imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=1000', // Placeholder
    description: 'Đồng hành tăng doanh số cùng các nhà cung cấp lớn: Kuchen, Nông Lâm Foods, VLive, Satyca... Triển khai các chiến dịch Livestream và đào tạo kỹ năng số.'
  },
  {
    id: 'prj-big-family',
    title: 'Chuỗi Nhà Thuốc Big Family',
    client: 'Big Family',
    category: 'Automation',
    result: 'Đồng hành 6 tháng',
    imageUrl: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&q=80&w=1000', // Placeholder
    description: 'Xây dựng hệ thống Social, sản xuất AI Video hàng loạt, tích hợp Chatbot AI và Zalo OA để tự động hóa quy trình chăm sóc khách hàng dược phẩm.'
  },
  {
    id: 'prj-fptu',
    title: 'FPT University Tech Fest',
    client: 'Đại Học FPT',
    category: 'Event & Creative',
    result: '10.000+ SV tham gia',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000', // Placeholder
    description: 'Thiết kế Mascot, Video AI, Banner, Backdrop cho sự kiện Tech Fest & Job Fair. Thu hút hơn 60 doanh nghiệp và 10.000 sinh viên tham gia.'
  },
  {
    id: 'prj-htv',
    title: 'Đài Truyền Hình HTV',
    client: 'HTV',
    category: 'Training AI',
    result: '100+ BTV/Kỹ Sư',
    imageUrl: 'https://images.unsplash.com/photo-1586899028174-e7098604235b?auto=format&fit=crop&q=80&w=1000', // Placeholder
    description: 'Ứng dụng AI vào sáng tạo Video và Đồ họa. Tập huấn cho hơn 100 anh chị biên tập viên, kỹ sư, họa sĩ, quay phim và đạo diễn của đài.'
  },
  {
    id: 'prj-vnpt',
    title: 'VNPT AI Automation',
    client: 'VNPT',
    category: 'AI HR',
    result: 'Tối ưu nhân sự',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000', // Placeholder
    description: 'Chia sẻ chuyển đổi số và ứng dụng AI Automation cho bộ phận nhân sự & lãnh đạo VNPT. Chương trình chia sẻ trực tiếp tại doanh nghiệp.'
  },
  {
    id: 'prj-smartlands',
    title: 'Smartlands Agentics',
    client: 'Smartlands',
    category: 'AI Automation',
    result: '6 Phòng ban',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000', // Placeholder
    description: 'Triển khai hệ thống AI Automations tại 6 phòng ban. AI tự động hóa làm nội dung đa kênh, thống kê/cảnh báo quảng cáo, báo cáo Dashboard và gửi email tự động.'
  }
];

export const MOCK_NEWS: NewsItem[] = [
  {
    id: 'news-tayninh-gov',
    title: 'Tây Ninh: Tập huấn AI trong công tác truyền thông',
    category: 'Chính Phủ',
    date: '2024-03-20',
    imageUrl: 'https://images.unsplash.com/photo-1555848962-6e79363ec58f?auto=format&fit=crop&q=80&w=1000', // Placeholder
    summary: 'Hơn 400 cán bộ thuộc lực lượng vũ trang, Khối Mặt trận Tổ quốc và các tổ chức chính trị - xã hội tham gia khóa tập huấn ứng dụng AI.',
    content: 'Chương trình nhằm nâng cao năng lực truyền thông số, ứng dụng trí tuệ nhân tạo vào việc sáng tạo nội dung tuyên truyền...'
  },
  {
    id: 'news-uef',
    title: 'Chia sẻ cho Giảng viên & Đồng hành cùng UEF',
    category: 'Giáo Dục',
    date: '2024-03-15',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1000', // Placeholder
    summary: 'Đào tạo AI ứng dụng trong giảng dạy, phản biện nội dung bài giảng và chuẩn hóa thông tin cho đội ngũ giảng viên trường Đại học UEF (Đã ký MOU).',
    content: 'Nội dung xoay quanh việc sử dụng AI để soạn giáo án, tích hợp công cụ thực tiễn vào lớp học...'
  },
  {
    id: 'news-hiephoi-hcm',
    title: 'Chia sẻ tại Hiệp hội Doanh nghiệp TP.HCM (HUBA)',
    category: 'Doanh Nghiệp',
    date: '2024-03-10',
    imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1000', // Placeholder
    summary: 'Chủ đề: ChatGPT, Website & Ứng dụng AI cho sản xuất, xuất khẩu. Chương trình kết hợp 1 ngày offline và hỗ trợ online.',
    content: 'Gặp gỡ và chia sẻ giải pháp công nghệ cho các doanh nghiệp thành viên hiệp hội...'
  },
  {
    id: 'news-ai-hero',
    title: 'Cộng đồng AI Hero - Kết nối đam mê công nghệ',
    category: 'Cộng Đồng',
    date: '2024-03-05',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000', // Placeholder
    summary: 'Hỗ trợ xây dựng cộng đồng AI Hero trên nền tảng Skool, nơi quy tụ các chuyên gia và người yêu thích trí tuệ nhân tạo.',
    content: 'Tổ chức các buổi Webinar chia sẻ kiến thức, cập nhật xu hướng công nghệ mới nhất...'
  },
  {
    id: 'news-tayninh-biz',
    title: 'Tọa đàm Doanh nghiệp tỉnh Tây Ninh',
    category: 'Sự Kiện',
    date: '2024-02-28',
    imageUrl: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1000', // Placeholder
    summary: 'Đồng hành chia sẻ & triển khai chuyên sâu với các doanh nghiệp thực tế về Chuyển đổi số & Trí tuệ nhân tạo.',
    content: 'Sự kiện thu hút hơn 200 doanh nghiệp tỉnh Tây Ninh tham gia...'
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