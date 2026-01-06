
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ArrowRight, Trophy, User, Share2, Check } from 'lucide-react';
import { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [copied, setCopied] = useState(false);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setCopied(false);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  if (!project) return null;

  const handleCopyLink = () => {
    // Construct the URL. Using hash router format
    const url = `${window.location.origin}/#/project/${project.id}`;
    navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    });
  };

  // Use Portal to render outside of the SmoothScroll container (fixes "moving modal" issue)
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity duration-300" 
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="relative bg-brand-dark border border-gray-800 w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-300 flex flex-col md:flex-row">
        
        {/* Controls */}
        <div className="absolute top-4 right-4 flex gap-2 z-50">
            <button 
                onClick={handleCopyLink} 
                className="text-white bg-black/50 p-2 rounded-full hover:bg-brand-yellow hover:text-black transition-colors"
                title="Sao chép liên kết"
            >
                {copied ? <Check size={20} /> : <Share2 size={20} />}
            </button>
            <button 
                onClick={onClose} 
                className="text-white bg-black/50 p-2 rounded-full hover:bg-brand-yellow hover:text-black transition-colors"
            >
                <X size={20} />
            </button>
        </div>

        {/* Scrollable Container */}
        <div className="flex flex-col md:flex-row w-full overflow-y-auto h-full max-h-[90vh]">
            {/* Left Image Section */}
            <div className="w-full md:w-1/2 min-h-[300px] md:min-h-full relative sticky top-0">
                <img 
                    src={project.imageUrl} 
                    alt={project.title} 
                    className="w-full h-full object-cover absolute inset-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent md:bg-gradient-to-r opacity-80 md:opacity-50"></div>
            </div>

            {/* Right Content Section */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col bg-brand-dark">
                <div className="mb-8">
                    <span className="inline-block py-1 px-3 rounded bg-brand-yellow/10 text-brand-yellow text-xs font-bold uppercase tracking-widest mb-4 border border-brand-yellow/20">
                        {project.category}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-2">
                        {project.title}
                    </h2>
                    <div className="h-1 w-20 bg-brand-yellow mt-4"></div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-gray-800/50 p-4 rounded border border-gray-700">
                        <div className="flex items-center gap-2 text-gray-400 mb-1 text-xs uppercase font-bold">
                            <User size={14} /> Khách Hàng
                        </div>
                        <div className="text-white font-bold">{project.client}</div>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded border border-gray-700">
                        <div className="flex items-center gap-2 text-gray-400 mb-1 text-xs uppercase font-bold">
                            <Trophy size={14} /> Kết Quả
                        </div>
                        <div className="text-brand-yellow font-black text-lg">{project.result}</div>
                    </div>
                </div>

                <div className="prose prose-invert prose-sm max-w-none mb-10 text-gray-300 leading-relaxed">
                    <h4 className="text-white font-bold uppercase text-sm mb-2">Chi Tiết Dự Án</h4>
                    <p className="whitespace-pre-line">{project.description}</p>
                </div>

                <div className="mt-auto pt-6 border-t border-gray-800">
                    <button className="w-full py-4 bg-white text-black font-bold uppercase tracking-wider hover:bg-brand-yellow transition-colors flex items-center justify-center gap-2 rounded shadow-lg">
                        Xem Website Thực Tế <ArrowRight size={18} />
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ProjectModal;
