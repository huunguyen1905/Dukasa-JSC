import React from 'react';
import { Check, X, Minus } from 'lucide-react';
import FadeIn from './FadeIn';

const ComparisonTable: React.FC = () => {
  return (
    <div className="py-16 md:py-24 border-t border-gray-800 bg-black/50">
      <FadeIn>
        <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-white uppercase mb-2">Tại Sao Chọn DUHAVA?</h3>
            <p className="text-gray-400">Sự khác biệt giữa Đầu tư Chiến lược và Chi phí lãng phí.</p>
        </div>

        <div className="overflow-x-auto">
            <div className="min-w-[800px] bg-gray-900/50 rounded-2xl border border-gray-800 p-6 md:p-8">
                <div className="grid grid-cols-4 gap-4 mb-6 border-b border-gray-700 pb-6">
                    <div className="text-gray-500 font-bold uppercase text-xs pt-4">Tiêu Chí So Sánh</div>
                    <div className="text-brand-yellow font-black text-xl text-center bg-brand-yellow/10 rounded-t-xl pt-4 -mt-4 pb-2 border-t border-x border-brand-yellow/30">DUHAVA AGENCY</div>
                    <div className="text-white font-bold text-center pt-4">Agency Truyền Thống</div>
                    <div className="text-white font-bold text-center pt-4">Freelancer / In-house</div>
                </div>

                <div className="space-y-4">
                    {[
                        { criterion: "Cam kết KPI", duhave: true, agency: "Traffic (Ảo)", freelance: false },
                        { criterion: "Chiến lược May đo", duhave: true, agency: false, freelance: false },
                        { criterion: "Báo cáo Real-time", duhave: true, agency: false, freelance: false },
                        { criterion: "Hệ sinh thái (Tech+MKT)", duhave: true, agency: false, freelance: false },
                        { criterion: "Xử lý khủng hoảng", duhave: "24/7", agency: "Giờ hành chính", freelance: "Không đảm bảo" },
                        { criterion: "Tối ưu chi phí (ROI)", duhave: "Cao nhất", agency: "Trung bình", freelance: "Rủi ro cao" },
                    ].map((row, idx) => (
                        <div key={idx} className="grid grid-cols-4 gap-4 items-center py-3 border-b border-gray-800 last:border-0 hover:bg-white/5 transition-colors rounded">
                            <div className="font-bold text-gray-300 text-sm">{row.criterion}</div>
                            
                            {/* DUHAVA Column */}
                            <div className="text-center font-bold bg-brand-yellow/5 h-full flex items-center justify-center -my-3 py-3">
                                {row.duhave === true ? (
                                    <div className="flex items-center gap-1 text-brand-yellow">
                                        <Check size={18} strokeWidth={4} /> <span className="text-xs uppercase">Cam Kết</span>
                                    </div>
                                ) : (
                                    <span className="text-brand-yellow">{row.duhave}</span>
                                )}
                            </div>

                            {/* Traditional Agency */}
                            <div className="text-center text-gray-500 text-sm">
                                {row.agency === false ? <Minus size={18} className="mx-auto"/> : row.agency}
                            </div>

                            {/* Freelancer */}
                            <div className="text-center text-gray-500 text-sm">
                                {row.freelance === false ? <X size={18} className="mx-auto text-red-500/50"/> : row.freelance}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </FadeIn>
    </div>
  );
};

export default ComparisonTable;