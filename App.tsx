
import React, { useState, useEffect, Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import SmoothScroll from './components/SmoothScroll';
import NoiseOverlay from './components/NoiseOverlay'; 
import ScrollProgress from './components/ScrollProgress';
import ErrorBoundary from './components/ErrorBoundary';
import SectionLoader from './components/SectionLoader';
import MobileStickyBar from './components/MobileStickyBar'; 
import ExitIntent from './components/ExitIntent'; 
import ClientLogos from './components/ClientLogos';
import PersonaTabs from './components/PersonaTabs';
import WorldClassBackground from './components/WorldClassBackground'; // Import new background
import { fetchServices, fetchProjects, fetchNews, fetchTeamMembers } from './services/supabaseService';
import { Service, Project, NewsItem, TeamMember } from './types';
import { ArrowLeft, Sparkles } from 'lucide-react';

// Lazy Load Heavy Components
const Services = lazy(() => import('./components/Services'));
const ContactModal = lazy(() => import('./components/ContactModal'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Process = lazy(() => import('./components/Process'));
const Team = lazy(() => import('./components/Team'));
const CTASection = lazy(() => import('./components/CTASection'));
const FeaturedProjects = lazy(() => import('./components/FeaturedProjects'));
const NewsSection = lazy(() => import('./components/NewsSection'));
const FAQ = lazy(() => import('./components/FAQ'));
const TechStack = lazy(() => import('./components/TechStack'));
const Pricing = lazy(() => import('./components/Pricing'));
const Contact = lazy(() => import('./components/Contact'));
const About = lazy(() => import('./components/About'));
const ROICalculator = lazy(() => import('./components/ROICalculator'));
const StrategyQuiz = lazy(() => import('./components/StrategyQuiz'));
const PressSection = lazy(() => import('./components/PressSection'));
const GrowthSection = lazy(() => import('./components/GrowthSection')); // Import new component

// Admin Login Component
const AdminLogin = ({ onLogin }: { onLogin: () => void }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center p-4 relative cursor-default">
      <button 
        onClick={() => navigate('/')}
        className="absolute top-8 left-8 flex items-center gap-2 text-gray-400 hover:text-brand-yellow transition-colors font-bold uppercase tracking-wider z-50 group"
      >
        <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" /> 
        <span>Về Trang Chủ</span>
      </button>

      <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 w-full max-w-md text-center relative animate-in fade-in zoom-in duration-500 shadow-2xl z-10">
        <div className="w-20 h-20 bg-brand-yellow/10 rounded-full flex items-center justify-center mx-auto mb-8 text-brand-yellow ring-1 ring-brand-yellow/30">
           <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
        </div>
        <h2 className="text-3xl font-black text-white mb-3 uppercase tracking-tight">Khu Vực Quản Trị</h2>
        <p className="text-gray-500 text-sm mb-8">Hệ thống dành riêng cho quản trị viên DUHAVA</p>
        <LoginForm onLogin={() => {
            onLogin();
            navigate('/admin');
        }} />
      </div>
    </div>
  );
};

const LoginForm = ({ onLogin }: { onLogin: () => void }) => {
    const [pass, setPass] = useState('');
    const [error, setError] = useState(false);
    const handleLogin = () => {
        if (pass === 'Huu12345@') {
            onLogin();
        } else {
            setError(true);
            setPass('');
        }
    };
    return (
        <>
            <input 
            type="password" 
            value={pass} 
            onChange={(e) => { setPass(e.target.value); setError(false); }} 
            onKeyDown={(e) => { if(e.key === 'Enter') handleLogin(); }}
            placeholder="Nhập mật khẩu truy cập..."
            className={`w-full bg-black border ${error ? 'border-red-500' : 'border-gray-700'} p-4 rounded-lg text-white mb-4 focus:border-brand-yellow outline-none transition-all focus:shadow-[0_0_20px_rgba(250,204,21,0.15)] placeholder-gray-600 text-center tracking-widest`}
            autoFocus
            />
            {error && <p className="text-red-500 text-xs mb-4">Mật khẩu không chính xác</p>}
            <button onClick={handleLogin} className="w-full bg-brand-yellow text-black font-black py-4 rounded-lg hover:bg-white transition-all shadow-lg hover:shadow-brand-yellow/20 transform hover:scale-[1.02] uppercase tracking-wide">Đăng Nhập Hệ Thống</button>
        </>
    )
}

interface LandingPageProps {
    onUnlockAdmin: () => void;
    services: Service[];
    projects: Project[];
    news: NewsItem[];
    teamMembers: TeamMember[];
}

const LandingPage: React.FC<LandingPageProps> = ({ onUnlockAdmin, services, projects, news, teamMembers }) => {
  const navigate = useNavigate();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false); 

  const handleOpenAdmin = () => {
      onUnlockAdmin();
      navigate('/admin-login');
  };

  return (
    <div className="bg-brand-black min-h-screen text-white font-sans selection:bg-brand-yellow selection:text-black md:cursor-none relative">
      <CustomCursor />
      <NoiseOverlay />
      
      {/* THE NEW WORLD CLASS BACKGROUND */}
      <WorldClassBackground />
      
      <Navbar onOpenContact={() => setIsContactOpen(true)} />
      <ScrollProgress /> 
      
      {/* Conversion Optimization Components */}
      <MobileStickyBar onCtaClick={() => setIsContactOpen(true)} />
      <ExitIntent />

      {/* Floating Strategy Finder Button (Bottom Left) */}
      <div className="fixed bottom-8 left-8 z-[80] hidden md:block">
        <button 
            onClick={() => setIsQuizOpen(true)}
            className="group flex items-center gap-3 bg-gray-900 border border-brand-yellow/30 pl-4 pr-6 py-3 rounded-full hover:bg-brand-yellow hover:text-black hover:border-brand-yellow transition-all duration-300 shadow-2xl"
        >
            <div className="w-8 h-8 bg-brand-yellow rounded-full flex items-center justify-center text-black group-hover:bg-black group-hover:text-brand-yellow transition-colors animate-pulse">
                <Sparkles size={16} />
            </div>
            <div className="text-left">
                <div className="text-[10px] uppercase font-bold text-gray-400 group-hover:text-black/60">Bạn cần tư vấn?</div>
                <div className="text-sm font-black uppercase tracking-wide">Tìm Chiến Lược</div>
            </div>
        </button>
      </div>
      
      <SmoothScroll>
        <Hero onCtaClick={() => setIsContactOpen(true)} />
        
        {/* REPLACED: New Client Marquee instead of static text strip */}
        <ClientLogos />

        <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
                <PersonaTabs onCtaClick={() => setIsContactOpen(true)} />
            </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
                <About />
            </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
                <Services services={services} onCtaClick={() => setIsContactOpen(true)} />
            </Suspense>
        </ErrorBoundary>
        
        <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
                <FeaturedProjects projects={projects} />
            </Suspense>
        </ErrorBoundary>
        
        {/* PRESS SECTION ADDED HERE */}
        <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
                <PressSection />
            </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
                <TechStack />
            </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
                <Process />
            </Suspense>
        </ErrorBoundary>
        
        <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
                <Pricing onCtaClick={() => setIsContactOpen(true)} />
            </Suspense>
        </ErrorBoundary>
        
        <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
                <ROICalculator />
            </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
                <Team members={teamMembers} />
            </Suspense>
        </ErrorBoundary>
        
        {/* NEW GROWTH SECTION REPLACING STATIC STATS */}
        <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
                <GrowthSection />
            </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
                <Testimonials />
            </Suspense>
        </ErrorBoundary>
        
        <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
                <NewsSection news={news} />
            </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
                <FAQ />
            </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
                <Contact />
            </Suspense>
        </ErrorBoundary>

        <ErrorBoundary>
            <Suspense fallback={<SectionLoader />}>
                <CTASection onCtaClick={() => setIsContactOpen(true)} />
            </Suspense>
        </ErrorBoundary>

        <Footer onOpenAdmin={handleOpenAdmin} />
      </SmoothScroll>
      
      <Suspense fallback={null}>
        <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      </Suspense>
      
      <Suspense fallback={null}>
        <StrategyQuiz 
            isOpen={isQuizOpen} 
            onClose={() => setIsQuizOpen(false)} 
            onComplete={() => {
                setIsQuizOpen(false);
                setIsContactOpen(true);
            }}
        />
      </Suspense>
    </div>
  );
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    // Fetch data from Supabase on init
    const loadData = async () => {
        try {
            const [s, p, n, t] = await Promise.all([
                fetchServices(),
                fetchProjects(),
                fetchNews(),
                fetchTeamMembers()
            ]);
            setServices(s);
            setProjects(p);
            setNews(n);
            setTeamMembers(t);
        } catch (error) {
            console.error("Failed to load initial data", error);
        }
    };
    loadData();
  }, []);

  const handleLogin = () => {
      setIsAuthenticated(true);
  };

  const handleLogout = () => {
      setIsAuthenticated(false);
  };

  if (loading) {
      return <Preloader onFinish={() => setLoading(false)} />;
  }

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LandingPage onUnlockAdmin={() => {}} services={services} projects={projects} news={news} teamMembers={teamMembers} />} />
        <Route path="/admin-login" element={<AdminLogin onLogin={handleLogin} />} />
        <Route 
            path="/admin" 
            element={isAuthenticated ? (
                <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white"><SectionLoader/></div>}>
                    <AdminDashboard onLogout={handleLogout} />
                </Suspense>
            ) : <Navigate to="/admin-login" />} 
        />
      </Routes>
    </HashRouter>
  );
};

export default App;
