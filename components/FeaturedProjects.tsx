import React, { useState, useRef } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight, X, ArrowRight } from 'lucide-react';
import FadeIn from './FadeIn';
import { Project } from '../types';
import ProjectModal from './ProjectModal';
import { createPortal } from 'react-dom';

interface FeaturedProjectsProps {
    projects: Project[];
}

const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isViewAllOpen, setIsViewAllOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -400 : 400;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // View All Overlay Component
  const ViewAllOverlay = () => {
    if (!isViewAllOpen) return null;
    
    // Prevent background scroll
    React.useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => { document.body.style.overflow = ''; };
    }, []);

    return createPortal(
        <div className="fixed inset-0 z-[9990] bg-brand-black overflow-y-auto animate-in fade-in duration-300">
            <div className="container mx-auto px-6 py-12">
                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h2 className="text-brand-yellow font-bold tracking-widest uppercase mb-2">Thư Viện Dự Án</h2>
                        <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                            Tất Cả <span className="text-gray-600">Dự Án</span>
                        </h3>
                    </div>
                    <button 
                        onClick={() => setIsViewAllOpen(false)}
                        className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-yellow hover:text-black transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
                    {projects.map((project, index) => (
                        <div 
                            key={project.id}
                            className="group cursor-pointer relative animate-in slide-in-from-bottom-4 fade-in duration-500"
                            style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'backwards' }}
                            onClick={() => setSelectedProject(project)}
                        >
                             <div className="relative overflow-hidden rounded-lg aspect-[4/3] mb-4 border border-gray-800">
                                <div className="absolute inset-0 bg-brand-yellow/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col items-center justify-center p-6 text-center">
                                    <span className="text-black font-black text-xl uppercase mb-2">{project.title}</span>
                                    <span className="text-black/70 font-bold text-xs uppercase border border-black/30 px-3 py-1 rounded">{project.category}</span>
                                    <div className="mt-4 bg-black text-brand-yellow px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2">
                                        Xem Chi Tiết <ArrowRight size={14} />
                                    </div>
                                </div>
                                <img 
                                    src={project.imageUrl} 
                                    alt={project.title} 
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur text-white text-[10px] font-bold px-2 py-1 rounded z-0">
                                    {project.result}
                                </div>
                            </div>
                            <h4 className="text-lg font-bold text-white group-hover:text-brand-yellow transition-colors">{project.title}</h4>
                            <p className="text-gray-500 text-sm">{project.client}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>,
        document.body
    );
  };

  return (
    <>
        <section id="projects" className="bg-black py-24 border-t border-gray-900 overflow-hidden">
        <div className="container mx-auto px-6">
            <FadeIn>
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h2 className="text-brand-yellow font-bold tracking-widest uppercase mb-2">Dự Án Tiêu Biểu</h2>
                        <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                        Chúng Tôi Nói <span className="text-gray-600">Bằng Kết Quả</span>
                        </h3>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        {/* Navigation Buttons */}
                        <div className="flex gap-2">
                            <button onClick={() => scroll('left')} className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-white hover:text-black transition-colors"><ChevronLeft size={20}/></button>
                            <button onClick={() => scroll('right')} className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-white hover:text-black transition-colors"><ChevronRight size={20}/></button>
                        </div>
                        
                        <button 
                            onClick={() => setIsViewAllOpen(true)}
                            className="text-white border-b border-brand-yellow pb-1 hover:text-brand-yellow transition-colors flex items-center gap-2 ml-4 font-bold text-sm uppercase tracking-wider"
                        >
                            Xem tất cả <ArrowUpRight size={18} />
                        </button>
                    </div>
                </div>
            </FadeIn>

            {/* Slider Container */}
            <div 
                ref={scrollRef}
                className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory hide-scrollbar -mx-6 px-6 md:mx-0 md:px-0"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {projects.map((project, index) => (
                    <div 
                        key={project.id} 
                        className="min-w-[85vw] md:min-w-[450px] snap-center group cursor-pointer relative"
                        onClick={() => setSelectedProject(project)}
                    >
                         <div className="relative overflow-hidden rounded-xl aspect-[16/9] mb-6 border border-gray-800">
                            {/* Hover Effect */}
                            <div className="absolute inset-0 bg-brand-yellow/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex flex-col items-center justify-center">
                                <span className="text-black font-black text-2xl uppercase border-2 border-black px-6 py-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Xem Chi Tiết</span>
                            </div>
                            
                            <img 
                                src={project.imageUrl} 
                                alt={project.title} 
                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute top-4 right-4 bg-brand-black/80 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded z-20 border border-gray-700 shadow-xl">
                                {project.result}
                            </div>
                            <div className="absolute top-4 left-4 bg-brand-yellow text-black text-xs font-bold px-3 py-1 rounded z-20 shadow-xl uppercase tracking-wider">
                                {project.category}
                            </div>
                        </div>
                        
                        <div className="space-y-1 pl-2 border-l-2 border-brand-yellow/50">
                            <div className="text-gray-500 text-xs font-bold uppercase tracking-wider">{project.client}</div>
                            <h4 className="text-2xl font-bold text-white group-hover:text-brand-yellow transition-colors leading-tight">
                                {project.title}
                            </h4>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </section>

        <ViewAllOverlay />
        
        <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
        />
    </>
  );
};

export default FeaturedProjects;