
import React from 'react';
import { Linkedin, Twitter, Mail, ArrowUpRight } from 'lucide-react';
import FadeIn from './FadeIn';
import { TeamMember } from '../types';
import { useNavigate } from 'react-router-dom';

interface TeamProps {
    members?: TeamMember[];
}

const Team: React.FC<TeamProps> = ({ members = [] }) => {
  const navigate = useNavigate();

  // If no members are passed (e.g. still loading or empty DB), don't render or render placeholder
  if (!members || members.length === 0) return null;

  return (
    <section className="bg-brand-black py-24 border-t border-gray-800 overflow-hidden relative">
      {/* Background Decor - Minimalist & Dark */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-yellow/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen"></div>

      <div className="container mx-auto px-6 relative z-10">
        <FadeIn>
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                <div>
                    <h2 className="text-brand-yellow font-bold tracking-widest uppercase mb-2">Đội Ngũ Chuyên Gia</h2>
                    <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                        Những Bộ Óc <span className="text-gray-600">Kiến Tạo</span>
                    </h3>
                </div>
                <div className="hidden md:block max-w-sm text-right text-gray-400 text-sm leading-relaxed">
                    Hội tụ những chuyên gia hàng đầu với khát vọng định hình lại bản đồ Digital Marketing tại Việt Nam.
                </div>
            </div>
        </FadeIn>

        {/* 
            Grid Layout Decision:
            - Mobile: 1 column (Focus on individual connection)
            - Tablet: 2 columns
            - Desktop: 4 columns (Overview of the core team)
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {members.map((member, index) => (
            <FadeIn key={member.id} delay={index * 100} direction="up">
                <div className="group relative cursor-pointer h-full">
                    {/* Image Container - The Card Body */}
                    <div className="relative overflow-hidden rounded-lg aspect-[3/4] bg-gray-900 border border-gray-800 group-hover:border-brand-yellow/50 transition-colors duration-500">
                        {/* 
                           Design Decision: Grayscale by default, Color on Hover 
                           This creates a "Cinematic Reveal" effect.
                        */}
                        <img 
                            src={member.imageUrl} 
                            alt={member.name} 
                            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 filter grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100"
                        />
                        
                        {/* Gradient Overlay for Text Readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
                        
                        {/* Content Overlay - Positioned at bottom */}
                        <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                            
                            {/* Name & Role */}
                            <div className="mb-4">
                                <h4 className="text-2xl font-black text-white mb-1 uppercase leading-none group-hover:text-brand-yellow transition-colors">{member.name}</h4>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest border-l-2 border-brand-yellow pl-2">{member.role}</p>
                            </div>

                            {/* Bio Reveal - Slides up / Fades in */}
                            <div className="h-0 group-hover:h-auto overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                                <p className="text-sm text-gray-300 font-light leading-relaxed line-clamp-3 mb-4 border-t border-gray-700/50 pt-3">
                                    {member.bio}
                                </p>
                                
                                {/* Social Links - Minimalist Icons */}
                                <div className="flex gap-3">
                                    <a href="#" className="text-white hover:text-brand-yellow transition-colors"><Linkedin size={18}/></a>
                                    <a href="#" className="text-white hover:text-brand-yellow transition-colors"><Twitter size={18}/></a>
                                    <a href="#" className="text-white hover:text-brand-yellow transition-colors"><Mail size={18}/></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </FadeIn>
          ))}
        </div>
        
        {/* Recruitment CTA */}
        <div className="mt-20 flex flex-col items-center justify-center text-center animate-in slide-in-from-bottom-8 fade-in duration-700 delay-300">
             <p className="text-gray-500 mb-4 font-medium">Bạn có tố chất của một người dẫn đầu?</p>
             <button 
                onClick={() => navigate('/lien-he')}
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-transparent border border-gray-700 rounded-full hover:border-brand-yellow hover:bg-brand-yellow/10 transition-all duration-300"
             >
                <span className="text-white font-bold uppercase tracking-widest text-sm group-hover:text-brand-yellow transition-colors">Gia nhập DUHAVA</span>
                <ArrowUpRight size={18} className="text-gray-500 group-hover:text-brand-yellow group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"/>
             </button>
        </div>
      </div>
    </section>
  );
};

export default Team;
