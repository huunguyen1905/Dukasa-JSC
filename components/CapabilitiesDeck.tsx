
import React, { useState } from 'react';
import { 
  Zap, Layers, Cpu, ArrowRight, CheckCircle2, 
  Search, Map, TrendingUp, Code2, PenTool, BarChart3, 
  Database, ShieldCheck, Monitor 
} from 'lucide-react';
import FadeIn from './FadeIn';
import { MOCK_SERVICES } from '../data/mockData';
import { useNavigate } from 'react-router-dom';

// --- Local Data for Process (Copied from Process.tsx) ---
const PROCESS_STEPS = [
  {
    id: 0,
    num: '01',
    title: 'Khám Phá & Thấu Hiểu',
    icon: <Search className="w-5 h-5" />,
    description: 'Data Mining & Audit sức khỏe thương hiệu để tìm "điểm nghẽn".',
  },
  {
    id: 1,
    num: '02',
    title: 'Chiến Lược May Đo',
    icon: <Map className="w-5 h-5" />,
    description: 'Lộ trình Omnichannel độc bản, tối ưu hóa mọi điểm chạm.',
  },
  {
    id: 2,
    num: '03',
    title: 'Thực Thi Thần Tốc',
    icon: <Zap className="w-5 h-5" />,
    description: 'Triển khai Content, Visual, Ads với tốc độ ánh sáng.',
  },
  {
    id: 3,
    num: '04',
    title: 'Tăng Trưởng & Mở Rộng',
    icon: <TrendingUp className="w-5 h-5" />,
    description: 'Tối ưu CRO, Scale-up quy mô và báo cáo Real-time.',
  }
];

// --- Local Data for TechStack (Copied from TechStack.tsx) ---
const TECH_STACKS = [
  {
    category: "Design",
    icon: <PenTool size={18} />,
    tools: ["Figma", "Adobe Ps", "Ae", "C4D", "Blender"]
  },
  {
    category: "Dev",
    icon: <Code2 size={18} />,
    tools: ["React", "Next.js", "Node.js", "Supabase", "AWS"]
  },
  {
    category: "Data",
    icon: <BarChart3 size={18} />,
    tools: ["GA4", "Google Ads", "Meta Biz", "HubSpot", "Semrush"]
  }
];

type TabId = 'services' | 'process' | 'tech';

const CapabilitiesDeck: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabId>('services');
  const navigate = useNavigate();

  const tabs: { id: TabId; label: string; subtitle: string; icon: React.ReactNode }[] = [
    { id: 'services', label: 'Dịch Vụ Toàn Diện', subtitle: 'Core Services', icon: <Zap size={20} /> },
    { id: 'process', label: 'Quy Trình 4.0', subtitle: 'Workflow', icon: <Layers size={20} /> },
    { id: 'tech', label: 'Hệ Sinh Thái Tech', subtitle: 'Technology', icon: <Cpu size={20} /> },
  ];

  return (
    <section className="bg-brand-black py-24 relative overflow-hidden border-t border-gray-900">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-yellow/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <FadeIn>
          <div className="mb-16">
             <h2 className="text-brand-yellow font-bold tracking-[0.2em] uppercase text-xs mb-3 flex items-center gap-2">
                <span className="w-8 h-[1px] bg-brand-yellow"></span> Capabilities Deck
            </h2>
            <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-tight">
                Năng Lực <span className="text-gray-600">Thực Thi</span>
            </h3>
          </div>
        </FadeIn>

        <div className="flex flex-col lg:flex-row gap-12 min-h-[600px]">
          
          {/* LEFT COLUMN: NAVIGATION */}
          <div className="lg:w-1/3 flex flex-col gap-4">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    group flex items-center gap-6 p-6 rounded-2xl border transition-all duration-500 text-left relative overflow-hidden
                    ${isActive 
                      ? 'bg-brand-yellow border-brand-yellow shadow-[0_0_30px_rgba(250,204,21,0.2)]' 
                      : 'bg-gray-900/40 border-gray-800 hover:border-gray-600 hover:bg-gray-900'
                    }
                  `}
                >
                  <div className={`
                    w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300
                    ${isActive ? 'bg-black text-brand-yellow' : 'bg-gray-800 text-gray-400 group-hover:text-white'}
                  `}>
                    {tab.icon}
                  </div>
                  
                  <div>
                    <span className={`text-[10px] font-bold uppercase tracking-widest block mb-1 transition-colors ${isActive ? 'text-black/60' : 'text-gray-500'}`}>
                      {tab.subtitle}
                    </span>
                    <h4 className={`text-xl font-black uppercase transition-colors ${isActive ? 'text-black' : 'text-white'}`}>
                      {tab.label}
                    </h4>
                  </div>

                  {isActive && (
                    <ArrowRight className="absolute right-6 text-black animate-pulse" size={20} />
                  )}
                </button>
              );
            })}
            
            {/* CTA Box */}
            <div className="mt-auto p-6 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 text-center">
                <p className="text-gray-400 text-sm mb-4">Bạn cần tư vấn giải pháp riêng biệt?</p>
                <button 
                    onClick={() => document.getElementById('contact-trigger')?.click()}
                    className="w-full py-3 bg-white/5 hover:bg-white hover:text-black text-white border border-white/10 rounded-xl font-bold text-sm uppercase tracking-wider transition-all"
                >
                    Liên Hệ Ngay
                </button>
            </div>
          </div>

          {/* RIGHT COLUMN: CONTENT DISPLAY */}
          <div className="lg:w-2/3 bg-gray-900/20 border border-gray-800 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
            
            {/* TAB CONTENT: SERVICES */}
            <div className={`transition-all duration-700 absolute inset-0 p-8 md:p-12 overflow-y-auto ${activeTab === 'services' ? 'opacity-100 translate-y-0 z-10' : 'opacity-0 translate-y-10 z-0 pointer-events-none'}`}>
                <h4 className="text-2xl font-black text-white uppercase mb-8 flex items-center gap-3">
                    <Zap className="text-brand-yellow" /> Dịch Vụ Cốt Lõi
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {MOCK_SERVICES.map((service, idx) => (
                        <div 
                            key={idx} 
                            onClick={() => navigate(`/service/${service.id}`)}
                            className="group p-5 rounded-xl bg-black/40 border border-gray-800 hover:border-brand-yellow/50 transition-all cursor-pointer flex gap-4 items-start"
                        >
                            <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 group-hover:bg-brand-yellow group-hover:text-black transition-colors shrink-0">
                                {idx === 0 && <Zap size={18}/>}
                                {idx === 1 && <Monitor size={18}/>}
                                {idx === 2 && <TrendingUp size={18}/>}
                                {idx === 3 && <Search size={18}/>}
                            </div>
                            <div>
                                <h5 className="text-white font-bold mb-2 group-hover:text-brand-yellow transition-colors">{service.title}</h5>
                                <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed">{service.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* TAB CONTENT: PROCESS */}
            <div className={`transition-all duration-700 absolute inset-0 p-8 md:p-12 overflow-y-auto ${activeTab === 'process' ? 'opacity-100 translate-y-0 z-10' : 'opacity-0 translate-y-10 z-0 pointer-events-none'}`}>
                <h4 className="text-2xl font-black text-white uppercase mb-8 flex items-center gap-3">
                    <Layers className="text-brand-yellow" /> Quy Trình 4 Bước
                </h4>
                <div className="space-y-6 relative">
                    {/* Vertical Line */}
                    <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-gray-800"></div>
                    
                    {PROCESS_STEPS.map((step, idx) => (
                        <div key={idx} className="relative flex items-start gap-6 group">
                            <div className="w-10 h-10 rounded-full bg-gray-900 border border-gray-700 flex items-center justify-center text-gray-400 z-10 group-hover:border-brand-yellow group-hover:text-brand-yellow transition-colors shrink-0">
                                <span className="font-mono text-xs font-bold">{step.num}</span>
                            </div>
                            <div className="flex-1 bg-black/40 p-5 rounded-xl border border-gray-800 group-hover:border-gray-700 transition-colors">
                                <h5 className="text-white font-bold mb-1 flex items-center gap-2">
                                    {step.title}
                                </h5>
                                <p className="text-gray-500 text-xs">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* TAB CONTENT: TECH STACK */}
            <div className={`transition-all duration-700 absolute inset-0 p-8 md:p-12 overflow-y-auto ${activeTab === 'tech' ? 'opacity-100 translate-y-0 z-10' : 'opacity-0 translate-y-10 z-0 pointer-events-none'}`}>
                <h4 className="text-2xl font-black text-white uppercase mb-8 flex items-center gap-3">
                    <Cpu className="text-brand-yellow" /> Công Nghệ & Công Cụ
                </h4>
                <div className="space-y-8">
                    {TECH_STACKS.map((stack, idx) => (
                        <div key={idx}>
                            <div className="flex items-center gap-3 mb-4 text-gray-300 font-bold uppercase text-sm tracking-wider">
                                <span className="text-brand-yellow">{stack.icon}</span> {stack.category}
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {stack.tools.map((tool, tIdx) => (
                                    <span 
                                        key={tIdx}
                                        className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-xs font-mono text-gray-400 hover:text-white hover:border-brand-yellow/30 hover:bg-brand-yellow/5 transition-all cursor-default"
                                    >
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                    
                    <div className="mt-8 p-6 bg-brand-yellow/5 border border-brand-yellow/20 rounded-xl">
                        <div className="flex items-start gap-4">
                            <ShieldCheck className="text-brand-yellow shrink-0 mt-1" />
                            <div>
                                <h5 className="text-white font-bold text-sm mb-1">Bảo Mật & Hiệu Năng</h5>
                                <p className="text-gray-500 text-xs leading-relaxed">
                                    Chúng tôi cam kết sử dụng các công nghệ mới nhất để đảm bảo hệ thống vận hành ổn định, bảo mật dữ liệu tuyệt đối và tốc độ tối ưu.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesDeck;
