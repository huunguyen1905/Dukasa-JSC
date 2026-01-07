
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ContactModal from './ContactModal';
import { Project } from '../types';
import { Layers, ArrowUpRight, Zap, Filter, Search } from 'lucide-react';
import FadeIn from './FadeIn';
import WorldClassBackground from './WorldClassBackground';

interface ProjectsPageProps {
  projects: Project[];
  onOpenAdmin?: () => void;
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({ projects, onOpenAdmin }) => {
  const navigate = useNavigate();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Extract categories
  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

  // Filter Logic
  const filteredProjects = projects.filter(p => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            p.client.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
  });

  useEffect(() => {
      window.scrollTo(0, 0);
      document.title = "Dự Án Tiêu Biểu - DUHAVA Agency";
  }, []);

  return (
    <div className="bg-brand-black min-h-screen text-white font-sans selection:bg-brand-yellow selection:text-black">
      <WorldClassBackground />
      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      {/* HEADER SECTION */}
      <section className="pt-40 pb-20 px-6 relative border-b border-gray-800">
          <div className="container mx-auto text-center relative z-10">
              <FadeIn>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-yellow/10 border border-brand-yellow/20 text-brand-yellow text-[10px] font-bold uppercase tracking-widest mb-6">
                    <Layers size={12} />
                    <span>Our Portfolio</span>
                </div>
                <h1 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6">
                    Kiệt Tác <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-white">Số Hóa</span>
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                    Tuyển tập những dự án chuyển đổi số và branding thành công nhất của DUHAVA. Nơi chiến lược gặp gỡ nghệ thuật.
                </p>
              </FadeIn>
          </div>
      </section>

      {/* CONTROLS BAR (Sticky) */}
      <section className="sticky top-20 z-40 bg-brand-black/90 backdrop-blur-xl border-b border-white/5 py-4 transition-all">
          <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
              
              {/* Categories */}
              <div className="flex overflow-x-auto hide-scrollbar gap-2 w-full md:w-auto pb-2 md:pb-0">
                  {categories.map(cat => (
                      <button 
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`
                            px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all duration-300 border
                            ${activeCategory === cat 
                                ? 'bg-brand-yellow text-black border-brand-yellow shadow-[0_0_15px_rgba(250,204,21,0.4)]' 
                                : 'bg-gray-900 border-gray-800 text-gray-400 hover:text-white hover:border-gray-600'}
                        `}
                      >
                          {cat}
                      </button>
                  ))}
              </div>

              {/* Search Box */}
              <div className="relative w-full md:w-72 group">
                  <input 
                    type="text" 
                    placeholder="Tìm kiếm dự án..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-900 border border-gray-800 rounded-full py-2.5 pl-10 pr-4 text-sm text-white focus:border-brand-yellow focus:outline-none transition-colors"
                  />
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-yellow transition-colors" />
              </div>
          </div>
      </section>

      {/* PROJECTS GRID */}
      <section className="py-20 px-6 min-h-[50vh]">
          <div className="container mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                  {filteredProjects.map((project, index) => (
                      <FadeIn key={project.id} delay={index * 50}>
                          <div 
                            onClick={() => navigate(`/project/${project.id}`)}
                            className="group cursor-pointer relative aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-3xl bg-gray-900 border border-gray-800 hover:border-brand-yellow/50 transition-all duration-500 shadow-2xl hover:shadow-brand-yellow/10"
                          >
                              {/* Image Layer */}
                              <div className="w-full h-full overflow-hidden">
                                  <img 
                                      src={project.imageUrl} 
                                      alt={project.title} 
                                      className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110 filter brightness-[0.7] group-hover:brightness-100"
                                  />
                              </div>

                              {/* Overlay Gradient */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90 group-hover:opacity-80 transition-opacity"></div>

                              {/* Top Tags */}
                              <div className="absolute top-6 left-6 z-20 flex gap-2">
                                  <span className="bg-brand-yellow text-black px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider shadow-lg flex items-center gap-1">
                                      <Zap size={12} /> {project.result}
                                  </span>
                              </div>

                              {/* Bottom Content */}
                              <div className="absolute bottom-0 left-0 w-full p-8 z-20 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                  <div className="overflow-hidden">
                                      <div className="text-brand-yellow text-[10px] font-bold uppercase tracking-[0.2em] mb-2 opacity-0 group-hover:opacity-100 transition-opacity delay-100 translate-y-2 group-hover:translate-y-0 duration-300">
                                          {project.category}
                                      </div>
                                  </div>
                                  
                                  <h3 className="text-3xl md:text-4xl font-black text-white uppercase leading-[0.9] mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                                      {project.title}
                                  </h3>
                                  
                                  <div className="flex justify-between items-center border-t border-white/10 pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                                      <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">{project.client}</span>
                                      <div className="flex items-center gap-2 text-white font-bold text-xs uppercase tracking-wider group-hover:text-brand-yellow transition-colors">
                                          Xem Case Study <ArrowUpRight size={16} />
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </FadeIn>
                  ))}
              </div>

              {/* Empty State */}
              {filteredProjects.length === 0 && (
                  <div className="text-center py-32 border border-dashed border-gray-800 rounded-3xl bg-gray-900/20">
                      <Filter className="mx-auto text-gray-600 mb-4" size={48} />
                      <h4 className="text-xl font-bold text-gray-400 mb-2">Không tìm thấy dự án nào.</h4>
                      <p className="text-gray-500 text-sm">Vui lòng thử từ khóa khác hoặc chọn danh mục "All".</p>
                  </div>
              )}
          </div>
      </section>

      <Footer onOpenAdmin={onOpenAdmin || (() => navigate('/admin-login'))} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
};

export default ProjectsPage;
