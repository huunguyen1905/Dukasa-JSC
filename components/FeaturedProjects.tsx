
import React from 'react';
import { Layers, ArrowUpRight, Zap } from 'lucide-react';
import FadeIn from './FadeIn';
import { Project } from '../types';
import { useNavigate } from 'react-router-dom';

interface FeaturedProjectsProps {
  projects: Project[];
}

const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ projects }) => {
  const navigate = useNavigate();

  // Show only first 4 projects on homepage
  const displayedProjects = projects.slice(0, 4);

  return (
    <section id="du-an" className="py-24 bg-brand-black relative border-t border-gray-900">
      <div className="container mx-auto px-6">
        {/* 1. SECTION HEADER */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-6 md:gap-10">
            <FadeIn>
                <div className="relative">
                    <div className="absolute -left-6 top-0 w-1 h-full bg-brand-yellow hidden md:block"></div>
                    <h2 className="text-brand-yellow font-bold tracking-[0.2em] uppercase text-xs mb-3 flex items-center gap-2">
                        <Layers size={14} /> Selected Works
                    </h2>
                    <h3 className="text-4xl md:text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-[0.9]">
                        Dấu Ấn <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-400 to-gray-600">Kiến Tạo.</span>
                    </h3>
                </div>
            </FadeIn>
            
            <FadeIn delay={200} className="hidden lg:block">
                <button 
                    onClick={() => navigate('/du-an')}
                    className="group flex items-center gap-2 text-white border-b border-brand-yellow pb-1 hover:text-brand-yellow transition-colors uppercase tracking-widest text-sm font-bold"
                >
                    Xem Tất Cả <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
            </FadeIn>
        </div>

        {/* 2. PROJECTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {displayedProjects.map((project, index) => (
                <FadeIn key={project.id} delay={index * 100}>
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

        {/* Mobile View All Button */}
        <div className="mt-12 text-center lg:hidden">
           <button 
                onClick={() => navigate('/du-an')}
                className="inline-flex items-center gap-2 text-white border-b border-brand-yellow pb-1 hover:text-brand-yellow transition-colors uppercase tracking-widest text-sm font-bold"
            >
                Xem Tất Cả <ArrowUpRight size={16} />
            </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
