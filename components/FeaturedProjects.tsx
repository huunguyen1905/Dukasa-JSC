
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { ArrowRight, Filter, Layers, Zap, Eye, ChevronRight, ChevronLeft } from 'lucide-react';
import FadeIn from './FadeIn';
import { Project } from '../types';
import { useParams, useNavigate } from 'react-router-dom';

interface FeaturedProjectsProps {
    projects: Project[];
}

const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ projects }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Refs for Scroll-jacking
  const containerRef = useRef<HTMLElement>(null); // The tall parent container
  const stickyRef = useRef<HTMLDivElement>(null); // The sticky viewport
  const trackRef = useRef<HTMLDivElement>(null); // The moving track
  
  const [scrollProgress, setScrollProgress] = useState(0);
  
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

  // SCROLL JACKING LOGIC
  useEffect(() => {
    const handleScroll = () => {
        if (!containerRef.current || !trackRef.current || !stickyRef.current) return;

        // Only enable scroll-jacking on Desktop (> 1024px)
        if (window.innerWidth < 1024) {
            trackRef.current.style.transform = 'translateX(0px)';
            return;
        }

        const containerTop = containerRef.current.offsetTop;
        const containerHeight = containerRef.current.offsetHeight;
        const viewportHeight = window.innerHeight;
        const scrollY = window.scrollY;

        // Calculate how much we need to scroll horizontally
        // Total horizontal width - 1 viewport width (so we stop at the right edge)
        // Add some padding-right (e.g. 200px) so the last item isn't flush against the edge
        const maxTranslate = trackRef.current.scrollWidth - window.innerWidth + 200; 
        
        // The distance user scrolls vertically to move the whole horizontal track
        const scrollDist = containerHeight - viewportHeight;

        let progress = (scrollY - containerTop) / scrollDist;
        
        // Clamp progress between 0 and 1
        progress = Math.max(0, Math.min(progress, 1));
        
        setScrollProgress(progress * 100);

        const translateX = maxTranslate * progress;
        trackRef.current.style.transform = `translateX(-${translateX}px)`;
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
    };
  }, [activeCategory, projects]); // Re-calc if category changes

  const handleProjectClick = (project: Project) => {
      navigate(`/project/${project.id}`);
  };

  // Filter Logic
  const filteredProjects = useMemo(() => {
    return activeCategory === 'All' 
        ? projects 
        : projects.filter(p => p.category === activeCategory);
  }, [activeCategory, projects]);

  const handleViewAll = () => {
      navigate('/du-an');
  };

  const handleCategoryChange = (cat: string) => {
      setActiveCategory(cat);
      // When filtering, reset transform effectively by scrolling up slightly if needed, 
      // but simpler to just let the user scroll.
  };

  return (
    // Set height to 400vh on Desktop to create "scroll room". Normal height on mobile.
    <section 
        id="du-an" 
        ref={containerRef}
        className="bg-brand-black relative h-auto lg:h-[400vh] border-t border-gray-900"
    >
        {/* Sticky Viewport: This stays fixed while parent scrolls */}
        <div 
            ref={stickyRef}
            className="lg:sticky lg:top-0 lg:h-screen lg:overflow-hidden flex flex-col justify-center py-24 md:py-0"
        >
            {/* Ambient Background (Fixed inside sticky) */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-gray-900 via-brand-black to-brand-black pointer-events-none z-0"></div>
            <div className="absolute right-0 top-1/4 w-[500px] h-[500px] bg-brand-yellow/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

            <div className="container mx-auto px-6 relative z-10 w-full">
                
                {/* 1. SECTION HEADER */}
                <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-6 md:gap-10">
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
                    
                    {/* Filter Bar - Desktop Right Aligned (SCROLLABLE) */}
                    <div className="hidden lg:flex items-center gap-2 overflow-x-auto hide-scrollbar max-w-[60%] pb-2">
                        {categories.map((cat, idx) => (
                            <button
                                key={cat}
                                onClick={() => handleCategoryChange(cat)}
                                className={`
                                    shrink-0 relative px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border whitespace-nowrap
                                    ${activeCategory === cat 
                                        ? 'text-black bg-brand-yellow border-brand-yellow shadow-[0_0_20px_rgba(250,204,21,0.4)]' 
                                        : 'text-gray-400 border-gray-800 hover:text-white hover:border-gray-600'
                                    }
                                `}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Mobile Filter Bar (Overflow Scroll) */}
                <div className="lg:hidden mb-12 overflow-x-auto hide-scrollbar -mx-6 px-6">
                    <div className="flex items-center gap-2 w-max">
                        {categories.map((cat, idx) => (
                            <button
                                key={cat}
                                onClick={() => handleCategoryChange(cat)}
                                className={`
                                    relative px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border whitespace-nowrap
                                    ${activeCategory === cat 
                                        ? 'text-black bg-brand-yellow border-brand-yellow' 
                                        : 'text-gray-400 border-gray-800 hover:text-white hover:border-gray-600'
                                    }
                                `}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 2. CINEMATIC TRACK */}
                <div className="relative w-full">
                    {/* 
                        Desktop: Flex row that transforms X.
                        Mobile: Overflow-x auto standard scroll.
                    */}
                    <div 
                        ref={trackRef}
                        className="flex flex-col md:flex-row gap-8 lg:gap-16 lg:w-max lg:will-change-transform lg:transition-transform lg:duration-100 lg:ease-linear md:overflow-x-auto md:snap-x md:snap-mandatory md:pb-8 md:hide-scrollbar md:-mx-6 md:px-6 lg:mx-0 lg:px-0 lg:overflow-visible"
                    >
                        {filteredProjects.map((project, index) => (
                            <div key={project.id} className="snap-center shrink-0 w-full md:w-[45vw] lg:w-[40vw] xl:w-[35vw]">
                                <FadeIn delay={index * 100} className="h-full">
                                    <div 
                                        onClick={() => handleProjectClick(project)}
                                        className="relative aspect-[4/3] lg:aspect-[16/10] rounded-none md:rounded-3xl overflow-hidden bg-gray-900 border-y md:border border-gray-800 cursor-pointer group transition-all duration-500 hover:shadow-[0_0_50px_rgba(250,204,21,0.1)]"
                                    >
                                        {/* Full Cover Image - UPGRADED: Brighter, Grayscale to Color Effect */}
                                        <img 
                                            src={project.imageUrl} 
                                            alt={project.title} 
                                            loading="lazy"
                                            className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out 
                                            group-hover:scale-105 
                                            filter grayscale-[20%] contrast-[0.95] brightness-[0.95] 
                                            group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-110"
                                        />
                                        
                                        {/* Cinematic Overlay - UPGRADED: Cleaner gradient, mostly bottom focus */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500"></div>
                                        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent opacity-60 pointer-events-none"></div>

                                        {/* Number Index - Subtle */}
                                        <div className="absolute top-6 left-6 z-20 text-white/20 font-black text-6xl leading-none group-hover:text-brand-yellow/20 transition-colors pointer-events-none">
                                            0{index + 1}
                                        </div>

                                        {/* Top Right Tag (Result) */}
                                        <div className="absolute top-6 right-6 z-20">
                                            <span className="bg-brand-yellow text-black px-4 py-2 rounded-full text-[10px] md:text-xs font-black uppercase tracking-wider shadow-lg flex items-center gap-2 transform translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                                <Zap size={12} fill="black" /> {project.result}
                                            </span>
                                        </div>

                                        {/* Center Action (Hover) */}
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10">
                                            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/30 flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-500 delay-100 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                                                <Eye size={32} />
                                            </div>
                                        </div>

                                        {/* Bottom Content - QUIET LUXURY STYLE */}
                                        <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 z-20 flex flex-col justify-end">
                                            
                                            {/* Category Badge - Reveal on Hover */}
                                            <div className="mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75 transform translate-y-2 group-hover:translate-y-0">
                                                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-black/30 backdrop-blur-md text-brand-yellow text-[10px] font-bold uppercase tracking-[0.2em] shadow-sm">
                                                    {project.category}
                                                </span>
                                            </div>
                                            
                                            {/* Title - Smaller, elegant font weight */}
                                            <h3 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-widest leading-tight mb-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out drop-shadow-md">
                                                {project.title}
                                            </h3>
                                            
                                            {/* Minimalist Divider */}
                                            <div className="h-[1px] w-12 group-hover:w-24 bg-white/30 group-hover:bg-brand-yellow transition-all duration-700 ease-out mb-4"></div>

                                            {/* Client Info */}
                                            <p className="text-gray-300 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150 transform translate-y-2 group-hover:translate-y-0">
                                                Client: <span className="text-white drop-shadow-sm">{project.client}</span>
                                            </p>
                                        </div>
                                    </div>
                                </FadeIn>
                            </div>
                        ))}

                        {/* View All Card (Appears at end of scroll) */}
                        <div className="snap-center shrink-0 w-full md:w-[30vw] lg:w-[25vw] flex items-center justify-center">
                             <div className="text-center group cursor-pointer" onClick={handleViewAll}>
                                <div className="w-24 h-24 rounded-full border border-gray-700 flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-yellow group-hover:border-brand-yellow group-hover:text-black transition-all duration-300">
                                    <ArrowRight size={40} className="group-hover:-rotate-45 transition-transform duration-300"/>
                                </div>
                                <h4 className="text-2xl font-black text-white uppercase mb-2">Khám Phá <br/>Toàn Bộ</h4>
                                <span className="text-gray-500 text-xs font-bold uppercase tracking-widest group-hover:text-brand-yellow transition-colors">View All Projects</span>
                             </div>
                        </div>
                    </div>
                </div>

                {/* 3. PROGRESS BAR & NAV (Fixed at bottom of sticky container) */}
                <div className="flex items-center gap-8 mt-12 border-t border-white/5 pt-8">
                    {/* Progress Bar (Desktop Only) */}
                    <div className="hidden lg:block w-full h-[2px] bg-gray-800 rounded-full overflow-hidden relative max-w-md">
                        <div 
                            className="absolute top-0 left-0 h-full bg-brand-yellow transition-all duration-100 ease-out"
                            style={{ width: `${scrollProgress}%` }}
                        ></div>
                    </div>

                    <div className="hidden lg:flex items-center gap-4 ml-auto">
                        <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">
                            Scroll Down to Explore
                        </span>
                        <div className="w-px h-8 bg-gray-800"></div>
                        <span className="text-white text-xs font-bold uppercase tracking-widest">
                            {filteredProjects.length} Projects
                        </span>
                    </div>
                    
                    {/* Mobile Hint */}
                    <div className="lg:hidden w-full text-center text-gray-500 text-[10px] font-bold uppercase tracking-widest animate-pulse">
                        Vuốt sang để xem thêm
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default FeaturedProjects;
