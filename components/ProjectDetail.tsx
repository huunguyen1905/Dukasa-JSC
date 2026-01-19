
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Zap, ArrowRight, Layers, Cpu, Globe, User, Calendar, Trophy, ExternalLink } from 'lucide-react';
import { Project, Service } from '../types';
import FadeIn from './FadeIn';
import MagneticButton from './MagneticButton';
import SEOHead from './SEOHead';

interface ProjectDetailProps {
  projects: Project[];
  onCtaClick: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ projects, onCtaClick }) => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [nextProject, setNextProject] = useState<Project | null>(null);
  
  const project = projects.find(p => p.id === projectId);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (project) {
        const currentIndex = projects.findIndex(p => p.id === project.id);
        const nextIndex = (currentIndex + 1) % projects.length;
        setNextProject(projects[nextIndex]);
    }
  }, [projectId, project, projects]);

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
    <div className="bg-brand-black min-h-screen relative overflow-x-hidden selection:bg-brand-yellow selection:text-black">
      <SEOHead 
        title={`${project.title} - Case Study | DUHAVA`}
        description={`Khám phá cách DUHAVA giúp ${project.client} đạt ${project.result} với dịch vụ ${project.category}. ${project.description.substring(0, 100)}...`}
        image={project.imageUrl}
        schema={{
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            "name": project.title,
            "creator": {
                "@type": "Organization",
                "name": "DUHAVA Agency"
            },
            "image": project.imageUrl,
            "description": project.description,
            "about": project.category,
            "provider": {
                "@type": "Organization",
                "name": project.client
            }
        }}
      />
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[85vh] flex items-end pb-20 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
              <img 
                src={project.imageUrl} 
                alt={`${project.title} - Case Study bởi DUHAVA`}
                className="w-full h-full object-cover opacity-60 filter brightness-75 scale-105 animate-pulse-slow" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/40 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-brand-black/80 via-transparent to-transparent"></div>
          </div>

          {/* Navigation */}
          <div className="absolute top-24 left-0 w-full z-50 px-6 md:px-12 flex justify-between items-center">
               <button 
                onClick={() => navigate('/du-an')}
                className="group flex items-center gap-3 text-white/70 hover:text-white transition-colors uppercase text-xs font-bold tracking-widest bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 hover:border-brand-yellow"
              >
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform"/> Quay lại Thư Viện
              </button>
              <div className="text-brand-yellow font-mono text-xs font-bold tracking-widest hidden md:block">
                  CASE STUDY / {project.category.toUpperCase()}
              </div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
              <FadeIn>
                  <div className="max-w-5xl">
                      <div className="flex flex-wrap gap-4 mb-6">
                          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-yellow text-brand-black text-xs font-black uppercase tracking-wider shadow-[0_0_20px_rgba(250,204,21,0.4)]">
                              {project.client}
                          </span>
                          <span className="inline-block px-4 py-1.5 rounded-full border border-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                              {project.category}
                          </span>
                      </div>
                      <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase leading-[0.9] tracking-tighter mb-8 drop-shadow-2xl">
                          {project.title}
                      </h1>
                  </div>
              </FadeIn>
          </div>
      </section>

      {/* 2. KEY METRICS STRIP */}
      <div className="border-y border-white/10 bg-gray-900/50 backdrop-blur-xl relative z-20">
          <div className="container mx-auto px-6">
              <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
                  <div className="py-8 px-6 group hover:bg-white/5 transition-colors">
                      <span className="text-gray-500 text-xs font-bold uppercase tracking-widest block mb-2">Kết Quả (Key Result)</span>
                      <span className="text-2xl md:text-3xl font-black text-brand-yellow">{project.result}</span>
                  </div>
                  <div className="py-8 px-6 group hover:bg-white/5 transition-colors">
                      <span className="text-gray-500 text-xs font-bold uppercase tracking-widest block mb-2">Dịch Vụ</span>
                      <span className="text-white font-bold text-sm md:text-base">{project.category}</span>
                  </div>
                  <div className="py-8 px-6 group hover:bg-white/5 transition-colors">
                      <span className="text-gray-500 text-xs font-bold uppercase tracking-widest block mb-2">Khách Hàng</span>
                      <span className="text-white font-bold text-sm md:text-base">{project.client}</span>
                  </div>
                  <div className="py-8 px-6 group hover:bg-white/5 transition-colors flex items-center justify-center">
                      <button onClick={onCtaClick} className="w-full h-full flex items-center justify-center gap-2 text-white hover:text-brand-yellow font-bold uppercase text-xs tracking-widest transition-colors">
                          Xem Website <ExternalLink size={16} />
                      </button>
                  </div>
              </div>
          </div>
      </div>

      {/* 3. CASE STUDY CONTENT */}
      <section className="py-24 relative">
          <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                  
                  {/* Left: Project Description */}
                  <div className="lg:col-span-8">
                      <FadeIn>
                        <h3 className="text-3xl font-black text-white uppercase mb-8 flex items-center gap-3">
                            <span className="w-12 h-[2px] bg-brand-yellow"></span> Câu Chuyện Dự Án
                        </h3>
                        <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed font-light">
                            <p className="whitespace-pre-line">{project.description}</p>
                            <p>
                                Trong bối cảnh thị trường cạnh tranh khốc liệt, {project.client} đã tìm đến DUHAVA với mong muốn tạo ra một cú hích đột phá về mặt hình ảnh và hiệu suất kinh doanh. 
                                Chúng tôi đã tiếp cận bài toán này bằng tư duy "Data-Driven Creativity" - Sáng tạo dựa trên dữ liệu.
                            </p>
                            <h4 className="text-white font-bold text-xl mt-8 mb-4">Thách Thức</h4>
                            <p>
                                Thị trường đã bão hòa với các thông điệp truyền thông cũ kỹ. Khách hàng mục tiêu ngày càng khó tính và có xu hướng lờ đi các quảng cáo truyền thống. 
                                Yêu cầu đặt ra là phải xây dựng một trải nghiệm số (Digital Experience) hoàn toàn mới lạ để thu hút và giữ chân họ.
                            </p>
                            <h4 className="text-white font-bold text-xl mt-8 mb-4">Giải Pháp Của DUHAVA</h4>
                            <ul className="list-none pl-0 space-y-4">
                                <li className="flex items-start gap-3">
                                    <Check className="text-brand-yellow mt-1 shrink-0" size={20}/>
                                    <span>Tái định vị thương hiệu với ngôn ngữ thiết kế hiện đại, tối giản nhưng sang trọng.</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="text-brand-yellow mt-1 shrink-0" size={20}/>
                                    <span>Xây dựng hệ thống Website/Landing Page tối ưu hóa UX/UI để tăng tỷ lệ chuyển đổi (CRO).</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="text-brand-yellow mt-1 shrink-0" size={20}/>
                                    <span>Triển khai chiến dịch Performance Marketing đa kênh nhắm mục tiêu chính xác vào tệp khách hàng tiềm năng.</span>
                                </li>
                            </ul>
                        </div>
                      </FadeIn>
                  </div>

                  {/* Right: Sticky Sidebar */}
                  <div className="lg:col-span-4">
                      <div className="sticky top-32 space-y-8">
                          <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl">
                              <h4 className="text-white font-bold uppercase mb-6 text-sm tracking-widest border-b border-gray-800 pb-4">Công Nghệ Sử Dụng</h4>
                              <div className="flex flex-wrap gap-2">
                                  {['ReactJS', 'NodeJS', 'Google Ads', 'Facebook Pixel', 'GA4', 'Figma'].map(tech => (
                                      <span key={tech} className="px-3 py-1 bg-black border border-gray-700 rounded text-xs text-gray-400 font-mono">
                                          {tech}
                                      </span>
                                  ))}
                              </div>
                          </div>

                          <div className="bg-brand-yellow p-8 rounded-2xl text-center relative overflow-hidden group">
                              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                              <h4 className="text-brand-black font-black text-2xl mb-2 uppercase leading-tight">Bạn muốn kết quả tương tự?</h4>
                              <p className="text-brand-black/70 text-sm mb-6 font-medium">Hãy để DUHAVA giúp bạn bứt phá doanh số ngay hôm nay.</p>
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

      {/* 4. NEXT PROJECT NAVIGATION */}
      {nextProject && (
          <section 
            onClick={() => navigate(`/project/${nextProject.id}`)}
            className="relative h-[60vh] flex items-center justify-center bg-gray-900 cursor-pointer group overflow-hidden border-t border-gray-800"
          >
              <div className="absolute inset-0 opacity-40 group-hover:opacity-60 transition-opacity duration-700">
                  <img 
                    src={nextProject.imageUrl} 
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-105" 
                    alt={`Dự án tiếp theo: ${nextProject.title}`} 
                  />
              </div>
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors"></div>
              
              <div className="relative z-10 text-center px-6">
                  <span className="text-brand-yellow text-xs font-bold uppercase tracking-[0.3em] mb-4 block animate-in slide-in-from-bottom-4">Dự Án Tiếp Theo</span>
                  <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter group-hover:scale-110 transition-transform duration-500">
                      {nextProject.title}
                  </h2>
                  <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                      <span className="inline-flex items-center gap-2 text-white border-b border-brand-yellow pb-1 font-bold uppercase tracking-widest text-sm">
                          Xem Ngay <ArrowRight size={16}/>
                      </span>
                  </div>
              </div>
          </section>
      )}

    </div>
  );
};

export default ProjectDetail;
