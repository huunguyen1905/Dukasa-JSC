import React, { useState } from 'react';
import { ArrowUpRight, ArrowRight, Filter, Trophy } from 'lucide-react';
import FadeIn from './FadeIn';
import { Project } from '../types';
import ProjectModal from './ProjectModal';

interface FeaturedProjectsProps {
    projects: Project[];
}

const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  // Extract unique categories from projects + 'All'
  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <>
        <section id="projects" className="bg-black py-24 border-t border-gray-900 overflow-hidden relative">
             {/* Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#111_1px,transparent_1px),linear-gradient(to_bottom,#111_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                
                {/* Header & Filter */}
                <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
                    <FadeIn>
                        <div>
                            <h2 className="text-brand-yellow font-bold tracking-widest uppercase mb-2">Thư Viện Dự Án</h2>
                            <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                                Chúng Tôi Nói <span className="text-gray-600">Bằng Kết Quả</span>
                            </h3>
                        </div>
                    </FadeIn>
                    
                    <FadeIn direction="left" delay={200} className="w-full lg:w-auto overflow-hidden">
                        {/* Scrollable Filters for Mobile */}
                        <div className="flex flex-nowrap md:flex-wrap gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`
                                        whitespace-nowrap px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wide transition-all duration-300 border
                                        ${activeCategory === cat 
                                            ? 'bg-brand-yellow text-black border-brand-yellow shadow-[0_0_15px_rgba(250,204,21,0.4)]' 
                                            : 'bg-transparent text-gray-400 border-gray-800 hover:border-gray-600 hover:text-white'
                                        }
                                    `}
                                >
                                    {cat === 'All' ? 'Tất Cả' : cat}
                                </button>
                            ))}
                        </div>
                    </FadeIn>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[500px]">
                    {filteredProjects.map((project, index) => (
                        <FadeIn key={project.id} delay={index * 100} className="h-full">
                            <div 
                                className="group relative h-full rounded-2xl overflow-hidden border border-gray-800 bg-gray-900 cursor-pointer shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
                                onClick={() => setSelectedProject(project)}
                            >
                                {/* Image Container */}
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <img 
                                        src={project.imageUrl} 
                                        alt={project.title} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 will-change-transform"
                                    />
                                    
                                    {/* Overlay Gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                                    
                                    {/* Result Badge (The Hook) */}
                                    <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md border border-brand-yellow/30 text-brand-yellow px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-lg transform translate-y-0 transition-transform duration-300">
                                        <Trophy size={14} className="text-brand-yellow fill-brand-yellow animate-pulse-slow" />
                                        <span className="text-xs font-black uppercase tracking-wider">{project.result}</span>
                                    </div>

                                    {/* View Button Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                                        <div className="bg-brand-yellow text-black px-6 py-3 rounded-full font-bold uppercase tracking-wider transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-xl flex items-center gap-2">
                                            Xem Chi Tiết <ArrowRight size={18} />
                                        </div>
                                    </div>
                                </div>

                                {/* Content Body */}
                                <div className="p-6 relative">
                                    {/* Decorative Line */}
                                    <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent group-hover:via-brand-yellow/50 transition-colors duration-500"></div>

                                    <div className="flex justify-between items-start mb-2 mt-2">
                                        <span className="text-brand-yellow text-xs font-bold uppercase tracking-widest border border-brand-yellow/20 px-2 py-0.5 rounded bg-brand-yellow/5">
                                            {project.category}
                                        </span>
                                    </div>
                                    
                                    <h4 className="text-2xl font-black text-white mb-1 group-hover:text-brand-yellow transition-colors line-clamp-1">
                                        {project.title}
                                    </h4>
                                    
                                    <p className="text-gray-500 text-sm font-bold uppercase tracking-wide mb-4">
                                        Client: {project.client}
                                    </p>
                                    
                                    {/* Hover Reveal Details */}
                                    <div className="h-0 group-hover:h-auto overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-500">
                                        <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
                                            {project.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                </div>

                {/* Empty State */}
                {filteredProjects.length === 0 && (
                    <div className="text-center py-20 border border-dashed border-gray-800 rounded-2xl">
                        <Filter className="mx-auto text-gray-600 mb-4" size={48} />
                        <h4 className="text-xl font-bold text-gray-400">Không tìm thấy dự án nào trong mục này.</h4>
                    </div>
                )}
                
                {/* View All CTA (Footer) */}
                <div className="mt-16 text-center">
                   <button className="group inline-flex items-center gap-2 text-white border-b border-brand-yellow pb-1 hover:text-brand-yellow transition-colors uppercase tracking-widest text-sm font-bold">
                        <span className="group-hover:mr-2 transition-all">Đặt Hẹn Tư Vấn Dự Án</span> <ArrowUpRight size={16} />
                    </button>
                </div>
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