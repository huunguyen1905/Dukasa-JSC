import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ArrowRight, CheckCircle, Target, Briefcase, Clock } from 'lucide-react';

interface StrategyQuizProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void; // Could open contact form with pre-filled data
}

const questions = [
  {
    id: 1,
    question: "Mục tiêu ưu tiên nhất của bạn trong 3 tháng tới?",
    icon: <Target className="w-6 h-6 text-brand-yellow" />,
    options: [
      { label: "Tăng nhận diện thương hiệu (Branding)", value: "branding" },
      { label: "Tăng trưởng doanh số bán hàng (Sales)", value: "performance" },
      { label: "Tối ưu hóa quy trình/Website", value: "optimization" }
    ]
  },
  {
    id: 2,
    question: "Quy mô hiện tại của doanh nghiệp?",
    icon: <Briefcase className="w-6 h-6 text-blue-500" />,
    options: [
      { label: "Start-up / Mới thành lập", value: "startup" },
      { label: "SME (Đang tăng trưởng)", value: "sme" },
      { label: "Tập đoàn / Doanh nghiệp lớn", value: "enterprise" }
    ]
  },
  {
    id: 3,
    question: "Bạn mong muốn thấy kết quả trong bao lâu?",
    icon: <Clock className="w-6 h-6 text-green-500" />,
    options: [
      { label: "Ngay lập tức (Paid Ads)", value: "fast" },
      { label: "3 - 6 tháng (Bền vững)", value: "medium" },
      { label: "Dài hạn > 1 năm", value: "long" }
    ]
  }
];

const StrategyQuiz: React.FC<StrategyQuizProps> = ({ isOpen, onClose, onComplete }) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  if (!isOpen) return null;

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  };

  const getRecommendation = () => {
    // Simple logic logic for recommendation
    const [goal, size, time] = answers;
    
    if (size === 'enterprise') return {
        package: "Gói DOMINANCE (Enterprise)",
        desc: "Giải pháp tổng thể: Tư vấn chiến lược, Branding cao cấp và đội ngũ In-house thuê ngoài.",
        icon: "👑"
    };

    if (goal === 'branding' || size === 'startup') return {
        package: "Gói ESSENTIAL (Khởi Tạo)",
        desc: "Tập trung xây dựng nền móng thương hiệu vững chắc và hiện diện số chuyên nghiệp.",
        icon: "🚀"
    };

    return {
        package: "Gói GROWTH (Tăng Trưởng)",
        desc: "Tối ưu Performance Marketing đa kênh để bứt phá doanh số nhanh chóng.",
        icon: "⚡"
    };
  };

  const recommendation = showResult ? getRecommendation() : null;

  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative bg-brand-dark border border-gray-800 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white"><X size={24} /></button>

        {!showResult ? (
          <div className="p-8 md:p-10">
            {/* Progress */}
            <div className="flex gap-2 mb-8">
                {questions.map((_, idx) => (
                    <div key={idx} className={`h-1 flex-1 rounded-full transition-colors duration-300 ${idx <= step ? 'bg-brand-yellow' : 'bg-gray-800'}`}></div>
                ))}
            </div>

            <div className="mb-8">
                <div className="inline-flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-full text-xs font-bold text-gray-400 uppercase mb-4">
                    Câu hỏi {step + 1}/{questions.length}
                </div>
                <h3 className="text-2xl font-bold text-white flex gap-3 items-start">
                    {questions[step].icon}
                    {questions[step].question}
                </h3>
            </div>

            <div className="space-y-3">
                {questions[step].options.map((opt) => (
                    <button
                        key={opt.value}
                        onClick={() => handleAnswer(opt.value)}
                        className="w-full text-left p-4 rounded-xl border border-gray-700 bg-gray-800/30 hover:bg-brand-yellow hover:text-black hover:border-brand-yellow transition-all duration-200 group flex justify-between items-center"
                    >
                        <span className="font-medium">{opt.label}</span>
                        <ArrowRight size={18} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    </button>
                ))}
            </div>
          </div>
        ) : (
          <div className="p-8 md:p-10 text-center">
            <div className="w-20 h-20 bg-brand-yellow/10 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl border border-brand-yellow/20 animate-bounce">
                {recommendation?.icon}
            </div>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">DUHAVA Đề Xuất Cho Bạn</h2>
            <h3 className="text-3xl font-black text-white mb-4 text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-white">
                {recommendation?.package}
            </h3>
            <p className="text-gray-400 mb-8 leading-relaxed">
                {recommendation?.desc}
            </p>

            <button 
                onClick={onComplete}
                className="w-full py-4 bg-brand-yellow text-black font-black uppercase rounded-xl hover:bg-white transition-all shadow-lg hover:shadow-brand-yellow/20 mb-3"
            >
                Nhận Tư Vấn Gói Này
            </button>
            <button onClick={onClose} className="text-gray-500 text-sm hover:text-white transition-colors">
                Làm lại trắc nghiệm
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default StrategyQuiz;