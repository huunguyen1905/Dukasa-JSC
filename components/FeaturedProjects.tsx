
import React, { useState, useMemo, useEffect } from 'react';
import { ArrowUpRight, ArrowDown, Filter, Layers, Zap, Eye } from 'lucide-react';
import FadeIn from './FadeIn';
import { Project } from '../types';
import { useParams, useNavigate } from 'react-router-dom';

interface FeaturedProjectsProps {
    projects: Project[];
}

const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ projects }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(6); // Show 6 items initially for cleaner grid
  const [isAnimating, setIsAnimating] = useState(false);
  
  // URL Params handling
  const { projectId } = useParams();
  const navigate = useNavigate();

  // Extract unique categories
  const categories = useMemo(() => ['All', ...Array.from(new Set(projects.map(p => p.category)))], [projects]);

  // Handle Deep Linking
  useEffect(() => {
    if (projectId && projects.length > 0) {
        const found = projects.find(p => p.id === projectId);
        if (found) {
            const element = document.getElementById('du-an');
            if(element) element.scrollIntoView({ behavior: 'smooth' });
        }
    }
  }, [projectId, projects]);

  const handleProjectClick = (project: Project) => {
      navigate(`/project/${project.id}`);
  };

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
          setVisibleCount(prev => prev + 6);
          setIsAnimating(false);
      }, 500); 
  };

  const handleCategoryChange = (cat: string) => {
      setActiveCategory(cat);
      setVisibleCount(6); 
  };

  return (
    <section id="du-an" className="bg-brand-black py-32 border-t border-gray-900 relative">
        {/* Ambient Background */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-gray-900 via-brand-black to-brand-black pointer-events-none"></div>
        <div className="absolute right-0 top-1/4 w-[500px] h-[500px] bg-brand-yellow/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="container mx-auto px-6 relative z-10">
            
            {/* 1. SECTION HEADER */}
            <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-10">
                <FadeIn>
                    <div className="relative">
                        <div className="absolute -left-6 top-0 w-1 h-full bg-brand-yellow hidden md:block"></div>
                        <h2 className="text-brand-yellow font-bold tracking-[0.2em] uppercase text-xs mb-3 flex items-center gap-2">
                            <Layers size={14} /> Selected Works
                        </h2>
                        <h3 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9]">
                            Dấu Ấn <br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600">Kiến Tạo.</span>
                        </h3>
                    </div>
                </FadeIn>
                
                <FadeIn direction="left" delay={200}>
                    <p className="text-gray-400 max-w-md text-base leading-relaxed text-right lg:text-left">
                        Hơn 50+ thương hiệu đã bứt phá nhờ chiến lược số của DUHAVA. Mỗi dự án là một câu chuyện thành công độc bản.
                    </p>
                </FadeIn>
            </div>

            {/* 2. STICKY FILTER BAR */}
            <div className="sticky top-20 z-40 mb-12 -mx-6 md:mx-0">
                <div className="bg-brand-black/80 backdrop-blur-xl border-y border-white/10 py-4 px-6 md:rounded-full md:border md:inline-block md:w-auto overflow-x-auto hide-scrollbar">
                    <div className="flex items-center gap-2 md:gap-4 w-max">
                        {categories.map((cat, idx) => (
                            <button
                                key={cat}
                                onClick={() => handleCategoryChange(cat)}
                                className={`
                                    relative px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300
                                    ${activeCategory === cat 
                                        ? 'text-black bg-brand-yellow shadow-[0_0_20px_rgba(250,204,21,0.4)]' 
                                        : 'text-gray-400 hover:text-white hover:bg-white/10'
                                    }
                                `}
                            >
                                {cat}
                                {activeCategory === cat && (
                                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-black"></span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* 3. CINEMATIC GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {visibleProjects.map((project, index) => (
                    <FadeIn key={project.id} delay={(index % 3) * 100} className="h-full">
                        <div 
                            onClick={() => handleProjectClick(project)}
                            className="group relative h-[450px] md:h-[550px] w-full cursor-pointer overflow-hidden rounded-3xl bg-gray-900 border border-gray-800 hover:border-brand-yellow/50 transition-all duration-500"
                        >
                            {/* Full Height Image */}
                            <img 
                                src={project.imageUrl} 
                                alt={project.title} 
                                loading="lazy"
                                className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110 group-hover:rotate-1 filter brightness-[0.8] group-hover:brightness-100"
                            />
                            
                            {/* Cinematic Vignette */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>

                            {/* Floating Stats Badge (Top Left) */}
                            <div className="absolute top-6 left-6 z-20 opacity-0 transform -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                                <div className="bg-brand-yellow text-black px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2">
                                    <Zap size={14} fill="black" /> {project.result}
                                </div>
                            </div>

                            {/* Action Button (Center - appears on hover) */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-out">
                                <div className="w-20 h-20 bg-white/10 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white">
                                    <Eye size={32} />
                                </div>
                            </div>

                            {/* Text Content (Bottom) */}
                            <div className="absolute bottom-0 left-0 w-full p-8 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="overflow-hidden mb-2">
                                    <span className="text-brand-yellow text-[10px] font-bold uppercase tracking-[0.2em] block mb-2">
                                        {project.category}
                                    </span>
                                </div>
                                
                                <h3 className="text-3xl font-black text-white uppercase leading-none mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
                                    {project.title}
                                </h3>
                                
                                <div className="h-[1px] w-12 bg-gray-600 group-hover:w-full group-hover:bg-brand-yellow transition-all duration-700 my-4"></div>

                                <div className="flex justify-between items-center opacity-70 group-hover:opacity-100 transition-opacity">
                                    <span className="text-xs font-bold text-gray-300 uppercase">{project.client}</span>
                                    <ArrowUpRight size={20} className="text-white transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"/>
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
                    <h4 className="text-xl font-bold text-gray-400">Không tìm thấy dự án nào trong mục này.</h4>
                </div>
            )}
            
            {/* 4. Load More Button */}
            {hasMore && (
                <div className="mt-24 text-center">
                   <button 
                        onClick={handleLoadMore}
                        disabled={isAnimating}
                        className="relative overflow-hidden group bg-transparent border border-gray-700 text-white font-bold py-4 px-12 rounded-full hover:border-brand-yellow transition-colors"
                    >
                        <div className={`absolute inset-0 bg-brand-yellow transition-transform duration-500 origin-left ${isAnimating ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></div>
                        <span className="relative z-10 flex items-center gap-3 uppercase tracking-widest text-xs group-hover:text-black transition-colors">
                            {isAnimating ? 'Đang tải...' : `Xem Thêm (${filteredProjects.length - visibleCount})`} 
                            {!isAnimating && <ArrowDown size={16} />}
                        </span>
                    </button>
                </div>
            )}
        </div>
    </section>
  );
};

export default FeaturedProjects;
