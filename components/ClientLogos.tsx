import React from 'react';

// Danh sách logo từ người dùng cung cấp
const STATIC_PARTNERS = [
  "https://i.imgur.com/RyKqFvm.png",
  "https://i.imgur.com/778zJUh.png",
  "https://i.imgur.com/L6IRX6P.png",
  "https://i.imgur.com/bCCYHhz.png",
  "https://i.imgur.com/WKg6Aik.png",
  "https://i.imgur.com/cRuuGGT.png",
  "https://i.imgur.com/g25p4Kk.png",
  "https://i.imgur.com/HxSpImW.png",
  "https://i.imgur.com/Z4X8ks8.png",
  "https://i.imgur.com/rnfG8j2.png",
  "https://i.imgur.com/jwHjRSd.png",
  "https://i.imgur.com/fJyFehr.png",
  "https://i.imgur.com/NzPl1P9.png",
  "https://i.imgur.com/INE0DEP.png",
  "https://i.imgur.com/YaasCgc.png",
  "https://i.imgur.com/xRqUo5i.png",
  "https://i.imgur.com/f3Mv6XM.png",
  "https://i.imgur.com/i2KvaaZ.png",
  "https://i.imgur.com/sYQGDLg.png",
  "https://i.imgur.com/Zbq9H5v.png",
  "https://i.imgur.com/UXT09Vh.png",
  "https://i.imgur.com/GnjfJvi.png",
  "https://i.imgur.com/wQyoVLQ.png",
  "https://i.imgur.com/fbbGePd.png",
  "https://i.imgur.com/RrubrGb.png"
].map((url, index) => ({
  id: index,
  name: `Partner ${index + 1}`,
  url: url
}));

const LogoItem: React.FC<{ partner: { name: string, url: string } }> = ({ partner }) => {
  // Container chung: Xóa grayscale để hiện màu, giữ opacity
  const containerClass = "group relative h-24 w-40 md:w-56 flex items-center justify-center opacity-80 hover:opacity-100 transition-all duration-500 cursor-pointer mx-6 md:mx-10";

  return (
    <div className={containerClass}>
        <img 
            src={partner.url} 
            alt={partner.name} 
            referrerPolicy="no-referrer"
            // Xóa brightness-0 invert để logo hiện đúng màu gốc
            className="max-h-16 md:max-h-20 max-w-full object-contain transition-all duration-500"
        />
    </div>
  );
};

const ClientLogos: React.FC = () => {
  // Sử dụng trực tiếp danh sách tĩnh, không cần fetch DB
  const partners = STATIC_PARTNERS;

  // Chia đôi danh sách để chạy 2 hàng marquee
  const half = Math.ceil(partners.length / 2);
  const row1 = partners.slice(0, half);
  const row2 = partners.slice(half);

  return (
    <section className="bg-brand-black border-y border-gray-900 py-16 md:py-20 overflow-hidden relative z-20">
      <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-brand-black to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-brand-black to-transparent z-10 pointer-events-none"></div>

      <div className="flex flex-col gap-10 md:gap-12">
        {/* ROW 1: Scroll Left */}
        <div className="flex w-full">
            <div className="flex animate-scroll-right items-center whitespace-nowrap">
                {/* Lặp lại 3 lần để đảm bảo hiệu ứng vô tận mượt mà */}
                {[...row1, ...row1, ...row1].map((partner, index) => (
                    <LogoItem key={`r1-${index}`} partner={partner} />
                ))}
            </div>
        </div>

        {/* ROW 2: Scroll Right (Simulated via reversed content order in generic marquee logic or distinct setup) */}
        {/* Để đơn giản nhưng hiệu quả, ta dùng cùng chiều nhưng nội dung khác và duration khác */}
        <div className="flex w-full">
            <div className="flex animate-scroll-right items-center whitespace-nowrap" style={{ animationDuration: '45s' }}>
                {[...row2, ...row2, ...row2].map((partner, index) => (
                    <LogoItem key={`r2-${index}`} partner={partner} />
                ))}
            </div>
        </div>
      </div>
      
      <div className="text-center mt-12 md:mt-16">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-gray-600 font-bold px-4">
            Vinh dự đồng hành cùng <span className="text-brand-yellow">100+ Doanh nghiệp</span> hàng đầu
          </p>
      </div>
    </section>
  );
};

export default ClientLogos;