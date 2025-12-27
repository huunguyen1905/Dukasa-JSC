import React from 'react';
import { Code2, PenTool, BarChart3, Database, Layers, Cpu } from 'lucide-react';
import FadeIn from './FadeIn';

const stacks = [
  {
    category: "Design & Creative",
    icon: <PenTool className="text-brand-yellow" />,
    tools: ["Figma", "Adobe Photoshop", "After Effects", "Cinema 4D", "Blender"]
  },
  {
    category: "Development",
    icon: <Code2 className="text-brand-yellow" />,
    tools: ["React / Next.js", "TypeScript", "Node.js", "Supabase", "AWS Cloud"]
  },
  {
    category: "Growth & Data",
    icon: <BarChart3 className="text-brand-yellow" />,
    tools: ["Google Analytics 4", "Google Ads", "Meta Business", "HubSpot CRM", "Semrush"]
  }
];

const TechStack: React.FC = () => {
  return (
    <section className="bg-brand-black py-24 border-t border-gray-900 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <FadeIn>
            <div className="text-center mb-16">
                <h2 className="text-brand-yellow font-bold tracking-widest uppercase mb-2">Công Nghệ & Công Cụ</h2>
                <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter">
                    Hệ Sinh Thái <span className="text-gray-600">Đột Phá</span>
                </h3>
                <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                    Chúng tôi kết hợp tư duy sáng tạo với sức mạnh của công nghệ hiện đại nhất để tối ưu hóa hiệu suất cho doanh nghiệp của bạn.
                </p>
            </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stacks.map((stack, index) => (
            <FadeIn key={index} delay={index * 150} direction="up">
                <div className="bg-gray-900/40 border border-gray-800 p-8 rounded-2xl hover:border-brand-yellow/30 transition-all duration-300 group h-full">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-12 rounded-lg bg-brand-yellow/10 flex items-center justify-center border border-brand-yellow/20 group-hover:bg-brand-yellow group-hover:text-black transition-all duration-300">
                            {React.cloneElement(stack.icon as React.ReactElement<any>, { size: 24 })}
                        </div>
                        <h4 className="text-xl font-bold text-white uppercase">{stack.category}</h4>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                        {stack.tools.map((tool, tIndex) => (
                            <span 
                                key={tIndex} 
                                className="px-3 py-1.5 rounded bg-black border border-gray-700 text-gray-300 text-sm font-medium hover:text-brand-yellow hover:border-brand-yellow/50 transition-colors cursor-default"
                            >
                                {tool}
                            </span>
                        ))}
                    </div>
                </div>
            </FadeIn>
          ))}
        </div>

        {/* Floating Icons Animation (Visual Only) */}
        <div className="hidden md:flex justify-center gap-16 mt-20 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
            <Layers size={40} className="animate-bounce" style={{ animationDuration: '3s' }} />
            <Database size={40} className="animate-bounce" style={{ animationDuration: '4s', animationDelay: '0.5s' }} />
            <Cpu size={40} className="animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1s' }} />
        </div>
      </div>
    </section>
  );
};

export default TechStack;