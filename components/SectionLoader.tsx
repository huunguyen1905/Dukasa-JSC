import React from 'react';
import { Loader2 } from 'lucide-react';

const SectionLoader: React.FC = () => {
  return (
    <div className="w-full h-96 flex items-center justify-center bg-brand-black/50">
        <div className="flex flex-col items-center gap-4">
            <Loader2 className="animate-spin text-brand-yellow" size={32} />
            <span className="text-gray-600 text-xs font-bold uppercase tracking-widest">Đang tải nội dung...</span>
        </div>
    </div>
  );
};

export default SectionLoader;