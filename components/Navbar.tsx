
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowRight, Search, ChevronDown, Zap, Globe, Layout, BarChart, TrendingUp, Phone } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface NavbarProps {
  onOpenContact: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('trang-chu');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Navigation
  const navigate = useNavigate();
  const location = useLocation();
  
  // Admin Secret Entry Logic
  const [logoClicks, setLogoClicks] = useState(0);
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleLogoClick = () => {
    // 1. Default behavior: Go to home
    navigate('/');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // 2. Secret Admin Access Logic
    const newCount = logoClicks + 1;
    setLogoClicks(newCount);

    if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
    }

    if (newCount === 4) {
        navigate('/admin-login');
        setLogoClicks(0);
    } else {
        clickTimeoutRef.current = setTimeout(() => {
            setLogoClicks(0);
        }, 500);
    }
  };

  // Handle Scroll Effect & Active Section Detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Detect active section for highlighting
      // Map sections to their new IDs
      const sections = ['trang-chu', 've-chung-toi', 'giai-phap', 'du-an', 'tin-tuc'];
      let current = 'trang-chu';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 300 && rect.bottom >= 300) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync active section with URL path if initially loaded
  useEffect(() => {
      const path = location.pathname.replace('/', '');
      if (path && ['ve-chung-toi', 'giai-phap', 'du-an', 'tin-tuc'].includes(path)) {
          setActiveSection(path);
      }
  }, [location]);

  useEffect(() => {
    if (isMobileMenuOpen || isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen, isSearchOpen]);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isSearchOpen]);

  // Use Navigate to update URL
  const handleNavigation = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    navigate(`/${id}`);
    setIsMobileMenuOpen(false);
  };

  // Updated Submenu to point to Specific Service Detail Pages
  // Using IDs from mockData
  const servicesSubMenu = [
      { name: 'Branding Identity', icon: <Zap size={16}/>, link: '/service/svc-branding' },
      { name: 'Web & App Design', icon: <Layout size={16}/>, link: '/service/svc-web' },
      { name: 'Performance Ads', icon: <Globe size={16}/>, link: '/service/svc-ads' },
      { name: 'SEO Tổng Thể', icon: <BarChart size={16}/>, link: '/service/svc-seo' },
  ];

  const popularSearches = ["Báo giá Website", "Dịch vụ SEO", "Tuyển dụng", "Branding"];

  return (
    <>
      {/* NAVBAR WRAPPER - Changed to HEADER for Semantic SEO */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]">
        <nav 
          aria-label="Main Navigation"
          className={`
            pointer-events-auto flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]
            ${isScrolled 
              ? 'mt-4 w-[90%] md:w-auto md:min-w-[850px] bg-black/60 backdrop-blur-xl border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.5)] rounded-full py-2 pl-4 pr-2 md:py-3 md:px-8' 
              : 'w-full bg-transparent py-6 px-6 md:px-12 border-transparent mt-0'
            }
          `}
        >
            {/* Left: Brand Logo */}
            <div 
                className="flex items-center gap-3 cursor-pointer group shrink-0 select-none"
                onClick={handleLogoClick}
                title="DUHAVA Digital Agency"
            >
                <div className={`
                    flex items-center justify-center font-black text-brand-black transition-all duration-500 rounded-full bg-brand-yellow relative overflow-hidden
                    ${isScrolled ? 'w-8 h-8 text-xs' : 'w-10 h-10 text-lg'}
                `}>
                    <span className="relative z-10">D</span>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                </div>
                <span className={`
                    font-black tracking-tighter text-white transition-all duration-500 uppercase
                    ${isScrolled ? 'text-base' : 'text-xl'}
                `}>
                    Duhava
                </span>
            </div>

            {/* Center: Navigation Links (Desktop Only) */}
            <div className={`hidden md:flex items-center gap-2 mx-8 transition-opacity duration-300 ${isScrolled ? 'opacity-100' : 'opacity-90'}`}>
                {[
                    { id: 've-chung-toi', label: 'Về Chúng Tôi' },
                    { id: 'giai-phap', label: 'Dịch Vụ', hasDropdown: true },
                    { id: 'du-an', label: 'Dự Án' },
                    { id: 'tin-tuc', label: 'Tin Tức' }
                ].map((item) => (
                    <div key={item.id} className="relative group/item">
                        <a 
                            href={`/${item.id}`} 
                            onClick={(e) => handleNavigation(e, item.id)}
                            className={`
                                relative px-4 py-2 text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 rounded-full flex items-center gap-1 overflow-hidden
                                ${activeSection === item.id 
                                    ? 'text-brand-black bg-brand-yellow' 
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }
                            `}
                        >
                            {item.label}
                            {item.hasDropdown && <ChevronDown size={10} className="group-hover/item:rotate-180 transition-transform"/>}
                        </a>

                        {/* Mega Dropdown for Services */}
                        {item.hasDropdown && (
                            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-64 opacity-0 invisible group-hover/item:opacity-100 group-hover/item:visible transition-all duration-300 transform translate-y-2 group-hover/item:translate-y-0">
                                <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden p-2 backdrop-blur-3xl">
                                    {servicesSubMenu.map((sub, idx) => (
                                        <a 
                                            key={idx} 
                                            href={sub.link}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                navigate(sub.link); // Navigate to specific service
                                            }}
                                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-all group/sub"
                                        >
                                            <span className="text-brand-yellow bg-brand-yellow/5 p-1.5 rounded-lg group-hover/sub:bg-brand-yellow group-hover/sub:text-black transition-colors">{sub.icon}</span>
                                            <span className="text-xs font-bold uppercase tracking-wide">{sub.name}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 shrink-0">
                {/* Search Toggle */}
                <button 
                    onClick={() => setIsSearchOpen(true)}
                    className={`
                        p-2 rounded-full text-white transition-all duration-300 group
                        ${isScrolled ? 'hover:bg-white/10' : 'hover:bg-black/20'}
                    `}
                    aria-label="Search"
                >
                    <Search size={18} className="group-hover:scale-110 transition-transform" />
                </button>

                {/* CTA Button */}
                <button 
                    onClick={onOpenContact}
                    className={`
                        bg-white text-black font-black uppercase tracking-wide rounded-full transition-all duration-300 hover:bg-brand-yellow hover:scale-105 hover:shadow-[0_0_20px_rgba(250,204,21,0.4)] whitespace-nowrap
                        ${isScrolled ? 'px-5 py-2 text-[10px]' : 'px-6 py-3 text-xs'}
                        hidden md:flex items-center gap-2
                    `}
                >
                    <span>Nhận Tư Vấn</span>
                    {!isScrolled && <ArrowRight size={14} />}
                </button>

                {/* Mobile Menu Toggle */}
                <button 
                    className={`
                        md:hidden text-white p-2 rounded-full transition-colors relative z-50
                        ${isMobileMenuOpen ? 'fixed right-6 top-6 bg-transparent' : ''}
                        ${!isMobileMenuOpen && isScrolled ? 'hover:bg-white/10' : ''}
                    `} 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                   {isMobileMenuOpen ? null : <Menu size={24} />}
                </button>
            </div>
        </nav>
      </header>

      {/* SEARCH OVERLAY */}
      <div 
        className={`fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl transition-all duration-500 flex flex-col items-center justify-center
            ${isSearchOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
        `}
      >
         <button 
            onClick={() => setIsSearchOpen(false)} 
            className="absolute top-8 right-8 p-4 rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-all z-50"
         >
            <X size={24}/>
         </button>

         <div className="w-full max-w-3xl px-6 relative">
             <div className="relative mb-12 transform transition-all duration-700 delay-100 translate-y-0 opacity-100">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-brand-yellow w-8 h-8 md:w-12 md:h-12 opacity-80" />
                <input 
                    ref={searchInputRef}
                    type="text" 
                    placeholder="Tìm kiếm..." 
                    className="w-full bg-transparent border-b border-gray-800 text-4xl md:text-6xl font-black text-white py-6 pl-12 md:pl-20 focus:border-brand-yellow focus:outline-none placeholder-gray-800 uppercase tracking-tight transition-colors"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            setIsSearchOpen(false);
                            navigate('/lien-he');
                        }
                        if (e.key === 'Escape') setIsSearchOpen(false);
                    }}
                />
             </div>

             <div className="transform transition-all duration-700 delay-200 translate-y-0 opacity-100">
                <div className="flex items-center gap-2 mb-6 text-gray-500 text-xs font-bold uppercase tracking-widest">
                    <TrendingUp size={14} /> Xu Hướng
                </div>
                <div className="flex flex-wrap gap-3">
                    {popularSearches.map((term, index) => (
                        <button 
                            key={index}
                            className="px-5 py-2 rounded-full border border-gray-800 text-gray-400 hover:text-brand-black hover:bg-brand-yellow hover:border-brand-yellow transition-all duration-300 font-bold text-xs uppercase tracking-wide"
                            onClick={() => setIsSearchOpen(false)}
                        >
                            {term}
                        </button>
                    ))}
                </div>
             </div>
         </div>
      </div>

      {/* MOBILE MENU */}
      <>
        <div 
            className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-[90] transition-opacity duration-500 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={() => setIsMobileMenuOpen(false)}
        />
        
        <div 
            className={`fixed top-0 right-0 h-full w-[85%] max-w-md bg-[#0A0A0A] border-l border-white/5 z-[100] transform transition-transform duration-500 cubic-bezier(0.19, 1, 0.22, 1) shadow-2xl flex flex-col
            ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
            `}
        >
            <div className="flex justify-between items-center p-8 border-b border-white/5">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-brand-yellow rounded-full flex items-center justify-center font-black text-black">D</div>
                    <span className="font-bold text-white uppercase tracking-wider">Menu</span>
                </div>
                <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>
            </div>

            <div className="flex-1 flex flex-col justify-center px-8 gap-6 overflow-y-auto">
                {[
                    { id: 've-chung-toi', label: 'Về Chúng Tôi', num: '01' },
                    { id: 'giai-phap', label: 'Dịch Vụ', num: '02' },
                    { id: 'du-an', label: 'Dự Án', num: '03' },
                    { id: 'tin-tuc', label: 'Tin Tức', num: '04' }
                ].map((item, index) => (
                    <a 
                        key={item.id}
                        href={`/${item.id}`} 
                        onClick={(e) => handleNavigation(e, item.id)} 
                        className={`group flex items-center gap-6 py-2 transition-all duration-500 delay-[${index * 100}ms]
                            ${isMobileMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}
                        `}
                        style={{ transitionDelay: `${index * 50}ms` }}
                    >
                        <span className="text-xs font-bold text-gray-700 group-hover:text-brand-yellow transition-colors font-mono">{item.num}</span>
                        <span className="text-4xl font-black text-white uppercase group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-yellow group-hover:to-white transition-all">
                            {item.label}
                        </span>
                    </a>
                ))}
            </div>

            <div className="p-8 border-t border-white/5 space-y-4">
                <button 
                    onClick={() => { onOpenContact(); setIsMobileMenuOpen(false); }}
                    className="w-full bg-brand-yellow text-brand-black text-xs md:text-sm font-black py-3 md:py-4 rounded-xl uppercase hover:bg-white transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
                >
                    Nhận Tư Vấn <ArrowRight size={16} />
                </button>
                
                <div className="flex justify-center gap-6 text-gray-500 pt-4">
                     <a href="#" className="hover:text-white transition-colors text-xs font-bold uppercase">FB</a>
                     <a href="#" className="hover:text-white transition-colors text-xs font-bold uppercase">IG</a>
                     <a href="#" className="hover:text-white transition-colors text-xs font-bold uppercase">LI</a>
                </div>
            </div>
        </div>
      </>
    </>
  );
};

export default Navbar;
