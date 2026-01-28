
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Zap, ArrowRight, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { Project } from '../types';
import FadeIn from './FadeIn';
import SEOHead from './SEOHead';

interface ProjectDetailProps {
  projects: Project[];
  onCtaClick: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ projects, onCtaClick }) => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [nextProject, setNextProject] = useState<Project | null>(null);
  const [isTechOpen, setIsTechOpen] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  
  const project = projects.find(p => p.id === projectId);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (project) {
        const currentIndex = projects.findIndex(p => p.id === project.id);
        const nextIndex = (currentIndex + 1) % projects.length;
        setNextProject(projects[nextIndex]);
    }
  }, [projectId, project, projects]);

  useEffect(() => {
    const handleScroll = () => {
        // Show sticky bar after scrolling past 100px
        setShowStickyBar(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!project) {
      return (
          <div className="min-h-screen bg-brand-black flex items-center justify-center">
              <SEOHead title="Dự án không tồn tại" />
              <div className="text-center">
                  <h2 className="text-2xl text-white font-bold mb-4">Dự án không tồn tại</h2>
                  <button onClick={() => navigate('/du-an')} className="text-brand-yellow hover:underline">Về Danh Sách Dự Án</button>
              </div>
          </div>
      );
  }

  return (
    <div className="bg-brand-black min-h-screen relative overflow-x-hidden selection:bg-brand-yellow selection:text-black pb-24 md:pb-0">
      <SEOHead 
        title={`${project.title} - Case Study | DUHAVA`}
        description={`Khám phá cách DUHAVA giúp ${project.client} đạt ${project.result}.`}
        image={project.imageUrl}
      />
      
      {/* 1. HERO SECTION - IMMERSIVE STORY (Mobile Optimized) */}
      <section className="relative h-[90vh] md:h-[85vh] flex items-end pb-12 md:pb-20 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
              <img 
                src={project.imageUrl} 
                alt={`${project.title} - Case Study`}
                className="w-full h-full object-cover opacity-80 md:opacity-60 filter brightness-75 md:brightness-75 scale-105 animate-pulse-slow" 
              />
              {/* Stronger gradient on mobile for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/20 to-transparent opacity-100 md:opacity-80"></div>
          </div>

          {/* Navigation */}
          <div className="absolute top-6 left-0 w-full z-50 px-4 md:px-12 flex justify-between items-center">
               <button 
                onClick={() => navigate('/du-an')}
                className="group flex items-center gap-2 text-white/80 hover:text-white transition-colors uppercase text-[10px] md:text-xs font-bold tracking-widest bg-black/40 backdrop-blur-md px-3 py-2 md:px-4 md:py-2 rounded-full border border-white/10"
              >
                  <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform"/> Quay lại
              </button>
          </div>

          <div className="container mx-auto px-6 relative z-10 pt-32">
              <FadeIn>
                  <div className="max-w-5xl">
                      <div className="flex flex-wrap gap-3 mb-4 md:mb-6">
                          <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-brand-yellow text-brand-black text-[10px] md:text-xs font-black uppercase tracking-wider shadow-[0_0_20px_rgba(250,204,21,0.4)]">
                              {project.client}
                          </span>
                          <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 rounded-full border border-white/20 text-white text-[10px] md:text-xs font-bold uppercase tracking-wider backdrop-blur-md bg-black/20">
                              {project.category}
                          </span>
                      </div>
                      {/* Compact Typography for Mobile */}
                      <h1 className="text-3xl md:text-6xl lg:text-7xl font-black text-white uppercase leading-tight md:leading-[1.1] tracking-tighter mb-4 md:mb-8 drop-shadow-2xl">
                          {project.title}
                      </h1>
                  </div>
              </FadeIn>
          </div>
      </section>

      {/* 2. KEY METRICS STRIP - SWIPEABLE ON MOBILE */}
      <div className="border-y border-white/10 bg-gray-900/50 backdrop-blur-xl relative z-20 overflow-x-auto hide-scrollbar">
          <div className="container mx-auto px-6 min-w-max md:min-w-0">
              <div className="flex md:grid md:grid-cols-3 divide-x divide-white/10">
                  <div className="py-6 px-6 md:py-8 w-64 md:w-auto flex-shrink-0 group hover:bg-white/5 transition-colors">
                      <span className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-widest block mb-1 md:mb-2">Kết Quả (ROI)</span>
                      <span className="text-2xl md:text-3xl font-black text-brand-yellow">{project.result}</span>
                  </div>
                  <div className="py-6 px-6 md:py-8 w-64 md:w-auto flex-shrink-0 group hover:bg-white/5 transition-colors">
                      <span className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-widest block mb-1 md:mb-2">Dịch Vụ</span>
                      <span className="text-white font-bold text-sm md:text-base">{project.category}</span>
                  </div>
                  <div className="py-6 px-6 md:py-8 w-64 md:w-auto flex-shrink-0 group hover:bg-white/5 transition-colors">
                      <span className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-widest block mb-1 md:mb-2">Khách Hàng</span>
                      <span className="text-white font-bold text-sm md:text-base">{project.client}</span>
                  </div>
              </div>
          </div>
      </div>

      {/* 3. CASE STUDY CONTENT */}
      <section className="py-16 md:py-24 relative">
          <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                  
                  {/* Left: Project Description */}
                  <div className="lg:col-span-8">
                      <FadeIn>
                        <h3 className="text-2xl md:text-3xl font-black text-white uppercase mb-6 flex items-center gap-3">
                            <span className="w-8 md:w-12 h-[2px] bg-brand-yellow"></span> Câu Chuyện
                        </h3>
                        {/* Optimized Typography for Mobile Reading */}
                        <div className="prose prose-invert prose-sm md:prose-lg max-w-none text-gray-300 leading-relaxed font-light">
                            <p className="whitespace-pre-line">{project.description}</p>
                            
                            <h4 className="text-white font-bold text-lg md:text-xl mt-8 mb-4">Thách Thức</h4>
                            <p>
                                Thị trường bão hòa, khách hàng khó tính. {project.client} cần một cú hích để vượt qua đối thủ và chiếm lĩnh tâm trí người tiêu dùng.
                            </p>
                            
                            <h4 className="text-white font-bold text-lg md:text-xl mt-8 mb-4">Giải Pháp</h4>
                            <ul className="list-none pl-0 space-y-3 md:space-y-4">
                                <li className="flex items-start gap-3">
                                    <Check className="text-brand-yellow mt-1 shrink-0" size={18}/>
                                    <span>Tái định vị thương hiệu hiện đại, sang trọng.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="text-brand-yellow mt-1 shrink-0" size={18}/>
                                    <span>Website/Landing Page tối ưu UX/UI tăng chuyển đổi.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="text-brand-yellow mt-1 shrink-0" size={18}/>
                                    <span>Performance Marketing đa kênh chính xác.</span>
                                </li>
                            </ul>
                        </div>
                      </FadeIn>
                  </div>

                  {/* Right: Sticky Sidebar (Desktop) / Accordion (Mobile) */}
                  <div className="lg:col-span-4">
                      <div className="lg:sticky lg:top-32 space-y-6 md:space-y-8">
                          
                          {/* Tech Stack Accordion for Mobile */}
                          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
                              <button 
                                onClick={() => setIsTechOpen(!isTechOpen)}
                                className="w-full flex justify-between items-center p-6 md:p-8 bg-gray-900 hover:bg-gray-800/50 transition-colors"
                              >
                                  <h4 className="text-white font-bold uppercase text-sm tracking-widest">Công Nghệ Sử Dụng</h4>
                                  <div className="md:hidden">
                                      {isTechOpen ? <ChevronUp size={18} className="text-brand-yellow"/> : <ChevronDown size={18} className="text-gray-500"/>}
                                  </div>
                              </button>
                              
                              <div className={`px-6 pb-6 md:px-8 md:pb-8 transition-all duration-300 ${isTechOpen ? 'block' : 'hidden md:block'}`}>
                                  <div className="flex flex-wrap gap-2 pt-2 md:pt-0">
                                      {['ReactJS', 'NodeJS', 'Google Ads', 'Pixel', 'GA4', 'Figma'].map(tech => (
                                          <span key={tech} className="px-3 py-1 bg-black border border-gray-700 rounded text-xs text-gray-400 font-mono">
                                              {tech}
                                          </span>
                                      ))}
                                  </div>
                              </div>
                          </div>

                          {/* Desktop CTA Card (Hidden on mobile to use sticky bar) */}
                          <div className="hidden md:block bg-brand-yellow p-8 rounded-2xl text-center relative overflow-hidden group">
                              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                              <h4 className="text-brand-black font-black text-2xl mb-2 uppercase leading-tight">Bạn muốn kết quả tương tự?</h4>
                              <p className="text-brand-black/70 text-sm mb-6 font-medium">Bứt phá doanh số ngay hôm nay.</p>
                              <button 
                                onClick={onCtaClick}
                                className="w-full bg-black text-white font-bold py-3 rounded-full hover:scale-105 transition-transform shadow-lg"
                              >
                                  Liên Hệ Tư Vấn
                              </button>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      {/* 4. NEXT PROJECT - COMPACT CARD FOR MOBILE */}
      {nextProject && (
          <section className="px-4 pb-12 md:px-0 md:pb-0">
            <div 
                onClick={() => navigate(`/project/${nextProject.id}`)}
                className="relative h-48 md:h-[60vh] flex items-center justify-center bg-gray-900 cursor-pointer group overflow-hidden border border-gray-800 md:border-t rounded-2xl md:rounded-none"
            >
                <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-700">
                    <img 
                        src={nextProject.imageUrl} 
                        className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105" 
                        alt={`Next: ${nextProject.title}`} 
                    />
                </div>
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors rounded-2xl md:rounded-none"></div>
                
                <div className="relative z-10 text-center px-6">
                    <span className="text-brand-yellow text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mb-2 md:mb-4 block">Dự Án Tiếp Theo</span>
                    <h2 className="text-2xl md:text-6xl font-black text-white uppercase tracking-tighter">
                        {nextProject.title}
                    </h2>
                    <div className="mt-4 md:mt-8 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
                        <span className="inline-flex items-center gap-2 text-white border-b border-brand-yellow pb-1 font-bold uppercase tracking-widest text-[10px] md:text-sm">
                            Xem Ngay <ArrowRight size={14}/>
                        </span>
                    </div>
                </div>
            </div>
          </section>
      )}

      {/* 5. STICKY MOBILE ACTION BAR */}
      <div 
        className={`fixed bottom-0 left-0 w-full bg-black/90 backdrop-blur-xl border-t border-gray-800 p-4 z-50 md:hidden transition-transform duration-300 ${showStickyBar ? 'translate-y-0' : 'translate-y-full'}`}
      >
          <div className="flex gap-3">
              <button 
                onClick={onCtaClick}
                className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 rounded-xl text-xs uppercase tracking-wide flex items-center justify-center gap-2"
              >
                  Xem Website <ExternalLink size={14} />
              </button>
              <button 
                onClick={onCtaClick}
                className="flex-[2] bg-brand-yellow text-black font-black py-3 rounded-xl text-xs uppercase tracking-wide shadow-[0_0_20px_rgba(250,204,21,0.3)] flex items-center justify-center gap-2"
              >
                  <Zap size={14} fill="black" /> Tư Vấn Dự Án Này
              </button>
          </div>
      </div>

    </div>
  );
};

export default ProjectDetail;
