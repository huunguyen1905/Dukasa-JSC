
import React, { useState } from 'react';
import { ArrowUpRight, ArrowRight, Filter, Trophy, Layers } from 'lucide-react';
import FadeIn from './FadeIn';
import { Project } from '../types';
import ProjectModal from './ProjectModal';

interface FeaturedProjectsProps {
    projects: Project[];
}

const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  // Extract unique categories from projects + 'All'
  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category)))];

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  // Default active project for the accordion (first one)
  const activeId = hoveredProject || filteredProjects[0]?.id;

  return (
    <>
        <section id="projects" className="bg-brand-black py-24 border-t border-gray-900 overflow-hidden relative">
             {/* Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none"></div>

            <div className="container mx-auto px-6 relative z-10">
                
                {/* Header & Filter */}
                <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8">
                    <FadeIn>
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Layers size={16} className="text-brand-yellow" />
                                <h2 className="text-brand-yellow font-bold tracking-widest uppercase text-xs">Selected Works</h2>
                            </div>
                            <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none">
                                Kiệt Tác <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-600">Kỹ Thuật Số</span>
                            </h3>
                        </div>
                    </FadeIn>
                    
                    <FadeIn direction="left" delay={200} className="w-full lg:w-auto overflow-hidden">
                        {/* Filters */}
                        <div className="flex flex-nowrap md:flex-wrap gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`
                                        whitespace-nowrap px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-500 border relative overflow-hidden group
                                        ${activeCategory === cat 
                                            ? 'text-black border-brand-yellow' 
                                            : 'text-gray-400 border-gray-800 hover:text-white'
                                        }
                                    `}
                                >
                                    <span className={`absolute inset-0 bg-brand-yellow transition-transform duration-500 ease-out ${activeCategory === cat ? 'translate-y-0' : 'translate-y-full group-hover:translate-y-0'}`}></span>
                                    <span className="relative z-10">{cat === 'All' ? 'Tất Cả' : cat}</span>
                                </button>
                            ))}
                        </div>
                    </FadeIn>
                </div>

                {/* --- DESKTOP: INTERACTIVE ACCORDION GALLERY --- */}
                <div className="hidden lg:flex h-[600px] gap-4 w-full">
                    {filteredProjects.slice(0, 5).map((project, index) => (
                        <div 
                            key={project.id}
                            onMouseEnter={() => setHoveredProject(project.id)}
                            onClick={() => setSelectedProject(project)}
                            className={`
                                relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group
                                ${activeId === project.id ? 'flex-[3]' : 'flex-[1] grayscale hover:grayscale-0'}
                            `}
                        >
                            {/* Background Image */}
                            <img 
                                src={project.imageUrl} 
                                alt={project.title} 
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />
                            
                            {/* Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent transition-opacity duration-500 ${activeId === project.id ? 'opacity-80' : 'opacity-60'}`}></div>

                            {/* Numbering */}
                            <div className="absolute top-6 left-6 z-20">
                                <span className={`text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent transition-all duration-500 ${activeId === project.id ? 'opacity-100' : 'opacity-0'}`}>
                                    0{index + 1}
                                </span>
                            </div>

                            {/* Content for Active State */}
                            <div className={`absolute bottom-0 left-0 w-full p-10 z-20 transition-all duration-500 ${activeId === project.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                                <div className="flex justify-between items-end">
                                    <div>
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="px-3 py-1 rounded-full bg-brand-yellow/20 text-brand-yellow border border-brand-yellow/30 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md">
                                                {project.category}
                                            </span>
                                            <span className="text-gray-400 text-xs font-bold uppercase tracking-wider border-l border-gray-600 pl-3">
                                                {project.client}
                                            </span>
                                        </div>
                                        <h3 className="text-4xl font-black text-white uppercase leading-none mb-2">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm max-w-md line-clamp-2">
                                            {project.description}
                                        </p>
                                    </div>

                                    {/* Action Button */}
                                    <div className="w-16 h-16 rounded-full bg-brand-yellow flex items-center justify-center text-black transform group-hover:scale-110 group-hover:rotate-45 transition-all duration-500 shadow-[0_0_30px_rgba(250,204,21,0.4)]">
                                        <ArrowUpRight size={28} />
                                    </div>
                                </div>
                            </div>

                            {/* Vertical Text for Inactive State */}
                            <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 transition-all duration-500 ${activeId !== project.id ? 'opacity-100 rotate-0' : 'opacity-0'}`}>
                                <h3 className="text-xl font-bold text-white uppercase tracking-widest whitespace-nowrap writing-vertical-rl rotate-180">
                                    {project.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* --- MOBILE: STACKED CARDS --- */}
                <div className="lg:hidden flex flex-col gap-6">
                    {filteredProjects.map((project, index) => (
                        <FadeIn key={project.id} delay={index * 100}>
                            <div 
                                onClick={() => setSelectedProject(project)}
                                className="group relative rounded-2xl overflow-hidden aspect-[4/3] border border-gray-800"
                            >
                                <img 
                                    src={project.imageUrl} 
                                    alt={project.title} 
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
                                
                                <div className="absolute bottom-0 left-0 w-full p-6">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <span className="text-brand-yellow text-xs font-bold uppercase tracking-widest mb-2 block">{project.category}</span>
                                            <h3 className="text-2xl font-black text-white uppercase">{project.title}</h3>
                                        </div>
                                        <div className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20">
                                            <ArrowUpRight size={20} />
                                        </div>
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
                
                {/* View All CTA */}
                <div className="mt-16 text-center">
                   <button className="group inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-gray-700 rounded-full hover:border-brand-yellow hover:bg-brand-yellow/5 transition-all duration-300">
                        <span className="text-white font-bold uppercase tracking-widest text-xs group-hover:text-brand-yellow transition-colors">Khám Phá Toàn Bộ Dự Án</span>
                        <ArrowRight size={16} className="text-gray-500 group-hover:text-brand-yellow group-hover:translate-x-1 transition-transform"/>
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
