
import React, { useState, useMemo } from 'react';
import { ArrowUpRight, ArrowDown, Filter, Layers, Zap } from 'lucide-react';
import FadeIn from './FadeIn';
import { Project } from '../types';
import ProjectModal from './ProjectModal';

interface FeaturedProjectsProps {
    projects: Project[];
}

const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(9); // Show 9 items initially
  const [isAnimating, setIsAnimating] = useState(false);

  // Extract unique categories
  const categories = useMemo(() => ['All', ...Array.from(new Set(projects.map(p => p.category)))], [projects]);

  // Filter Logic
  const filteredProjects = useMemo(() => {
    return activeCategory === 'All' 
        ? projects 
        : projects.filter(p => p.category === activeCategory);
  }, [activeCategory, projects]);

  // Pagination Logic
  const visibleProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;

  const handleLoadMore = () => {
      setIsAnimating(true);
      setTimeout(() => {
          setVisibleCount(prev => prev + 9);
          setIsAnimating(false);
      }, 500); // Fake loading delay for effect
  };

  const handleCategoryChange = (cat: string) => {
      setActiveCategory(cat);
      setVisibleCount(9); // Reset pagination on filter change
  };

  return (
    <>
        <section id="projects" className="bg-brand-black py-24 border-t border-gray-900 relative">
             {/* Background Subtle Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                
                {/* 1. Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <FadeIn>
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <span className="w-8 h-[1px] bg-brand-yellow"></span>
                                <h2 className="text-brand-yellow font-bold tracking-[0.2em] uppercase text-xs">Portfolio Showcase</h2>
                            </div>
                            <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
                                Thư Viện <br/>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-500">Dự Án Triển Khai</span>
                            </h3>
                            <p className="text-gray-400 mt-4 max-w-lg text-sm border-l border-gray-800 pl-4">
                                Khám phá hơn 50+ dự án thành công đã giúp khách hàng của chúng tôi thống trị thị trường số.
                            </p>
                        </div>
                    </FadeIn>
                    
                    {/* Total Count Badge */}
                    <div className="hidden md:block text-right">
                        <div className="text-6xl font-black text-gray-800 leading-none">{projects.length}+</div>
                        <div className="text-gray-500 text-xs font-bold uppercase tracking-widest">Dự án hoàn thành</div>
                    </div>
                </div>

                {/* 2. Filter Bar (Sticky on Mobile) */}
                <div className="sticky top-20 z-40 bg-brand-black/90 backdrop-blur-md py-4 -mx-6 px-6 md:static md:bg-transparent md:p-0 md:mx-0 mb-12 border-b border-gray-800/50 md:border-none">
                    <div className="flex flex-nowrap md:flex-wrap gap-2 overflow-x-auto hide-scrollbar">
                        {categories.map((cat, idx) => (
                            <button
                                key={cat}
                                onClick={() => handleCategoryChange(cat)}
                                className={`
                                    whitespace-nowrap px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border flex items-center gap-2
                                    ${activeCategory === cat 
                                        ? 'bg-brand-yellow text-black border-brand-yellow shadow-[0_0_15px_rgba(250,204,21,0.3)]' 
                                        : 'bg-gray-900 text-gray-400 border-gray-800 hover:border-gray-600 hover:text-white'
                                    }
                                `}
                            >
                                {cat === 'All' && <Layers size={14}/>}
                                {cat}
                                {activeCategory === cat && <span className="bg-black/20 px-1.5 rounded-full text-[10px] ml-1">{filteredProjects.length}</span>}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 3. The Mosaic Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {visibleProjects.map((project, index) => (
                        <FadeIn key={project.id} delay={(index % 3) * 100} className="h-full">
                            <div 
                                onClick={() => setSelectedProject(project)}
                                className="group relative aspect-[4/3] md:aspect-[3/2] cursor-pointer overflow-hidden rounded-xl border border-gray-800 bg-gray-900"
                            >
                                {/* Image with Zoom Effect */}
                                <img 
                                    src={project.imageUrl} 
                                    alt={project.title} 
                                    loading="lazy"
                                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
                                />
                                
                                {/* Dark Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300"></div>

                                {/* Content Overlay */}
                                <div className="absolute inset-0 p-6 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    
                                    {/* Top Right Arrow */}
                                    <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-500 delay-100">
                                        <ArrowUpRight size={18} />
                                    </div>

                                    {/* Text Info */}
                                    <div className="relative z-10">
                                        <div className="overflow-hidden mb-2">
                                            <span className="inline-block text-brand-yellow text-[10px] font-bold uppercase tracking-widest border border-brand-yellow/30 px-2 py-0.5 rounded bg-brand-yellow/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-100">
                                                {project.category}
                                            </span>
                                        </div>
                                        
                                        <h3 className="text-2xl font-black text-white uppercase leading-none mb-1 group-hover:text-brand-yellow transition-colors">
                                            {project.title}
                                        </h3>
                                        
                                        <div className="h-0 group-hover:h-auto overflow-hidden transition-all duration-300">
                                            <p className="text-gray-400 text-xs mt-2 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                                                {project.description}
                                            </p>
                                            <p className="text-white text-xs font-bold mt-2 pt-2 border-t border-gray-700/50 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
                                                <Zap size={12} className="text-brand-yellow"/> Kết quả: {project.result}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>

                {/* Empty State */}
                {filteredProjects.length === 0 && (
                    <div className="text-center py-32 border border-dashed border-gray-800 rounded-2xl bg-gray-900/20">
                        <Filter className="mx-auto text-gray-600 mb-4" size={48} />
                        <h4 className="text-xl font-bold text-gray-400">Không tìm thấy dự án nào trong mục này.</h4>
                    </div>
                )}
                
                {/* 4. Load More Button */}
                {hasMore && (
                    <div className="mt-20 text-center">
                       <button 
                            onClick={handleLoadMore}
                            disabled={isAnimating}
                            className="group relative inline-flex items-center gap-3 px-10 py-4 bg-transparent border border-gray-700 rounded-full hover:border-brand-yellow hover:bg-brand-yellow/5 transition-all duration-300 overflow-hidden"
                        >
                            {isAnimating && (
                                <div className="absolute inset-0 bg-gray-800/50 flex items-center justify-center z-10">
                                    <div className="w-5 h-5 border-2 border-brand-yellow border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            )}
                            <span className="text-white font-bold uppercase tracking-widest text-xs group-hover:text-brand-yellow transition-colors">
                                Xem Thêm Dự Án ({filteredProjects.length - visibleCount})
                            </span>
                            <ArrowDown size={16} className="text-gray-500 group-hover:text-brand-yellow group-hover:translate-y-1 transition-transform"/>
                        </button>
                    </div>
                )}
            </div>
        </section>
        
        <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
        />
    </>
  );
};

export default FeaturedProjects;
