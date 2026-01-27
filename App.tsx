
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
import WorldClassBackground from './components/WorldClassBackground'; 
import SEOHead from './components/SEOHead';
import { fetchServices, fetchProjects, fetchNews, fetchTeamMembers } from './services/supabaseService';
import { Service, Project, NewsItem, TeamMember } from './types';
import { ArrowLeft, Sparkles } from 'lucide-react';

// Lazy Load Heavy Components
const Services = lazy(() => import('./components/Services'));
const ServiceDetail = lazy(() => import('./components/ServiceDetail')); 
const ProjectDetail = lazy(() => import('./components/ProjectDetail')); 
const NewsDetail = lazy(() => import('./components/NewsDetail')); 
const ContactModal = lazy(() => import('./components/ContactModal'));
const AdminDashboard = lazy(() => import('./components/AdminDashboard'));
const Testimonials = lazy(() => import('./components/Testimonials'));
const Process = lazy(() => import('./components/Process'));
const Team = lazy(() => import('./components/Team'));
const CTASection = lazy(() => import('./components/CTASection'));
const FeaturedProjects = lazy(() => import('./components/FeaturedProjects'));
const NewsSection = lazy(() => import('./components/NewsSection'));
const NewsPage = lazy(() => import('./components/NewsPage')); 
const ProjectsPage = lazy(() => import('./components/ProjectsPage')); 
const ServicesPage = lazy(() => import('./components/ServicesPage')); 
const AboutPage = lazy(() => import('./components/AboutPage')); 
const FAQ = lazy(() => import('./components/FAQ'));
const TechStack = lazy(() => import('./components/TechStack'));
const Pricing = lazy(() => import('./components/Pricing'));
const Contact = lazy(() => import('./components/Contact'));
const About = lazy(() => import('./components/About'));
const StrategyQuiz = lazy(() => import('./components/StrategyQuiz'));
const PressSection = lazy(() => import('./components/PressSection'));
const GrowthSection = lazy(() => import('./components/GrowthSection')); 

// --- NEW COMPONENTS (A.I.D.A Structure) ---
const CapabilitiesDeck = lazy(() => import('./components/CapabilitiesDeck'));
const TrustBento = lazy(() => import('./components/TrustBento'));
const GrowthEngine = lazy(() => import('./components/GrowthEngine'));
const MarqueeSeparator = lazy(() => import('./components/MarqueeSeparator'));
const RealResultsGallery = lazy(() => import('./components/RealResultsGallery'));

// Admin Login Component
const AdminLogin = ({ onLogin }: { onLogin: () => void }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center p-4 relative cursor-default">
      <SEOHead title="Đăng Nhập Quản Trị" description="Hệ thống quản trị DUHAVA Agency" />
      <button onClick={() => navigate('/')} className="absolute top-8 left-8 text-white flex items-center gap-2 hover:text-brand-yellow transition-colors">
        <ArrowLeft size={20} /> Quay lại
      </button>
      <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 w-full max-w-md shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brand-yellow rounded-full flex items-center justify-center mx-auto mb-4">
            <Sparkles className="text-black" size={32} />
          </div>
          <h2 className="text-2xl font-black text-white uppercase">DUHAVA ADMIN</h2>
          <p className="text-gray-500 text-sm mt-2">Khu vực dành riêng cho quản trị viên</p>
        </div>
        <button 
          onClick={onLogin}
          className="w-full bg-brand-yellow text-black font-black uppercase py-4 rounded-xl hover:bg-white transition-all shadow-[0_0_20px_rgba(250,204,21,0.3)]"
        >
          Xác Nhận Truy Cập
        </button>
      </div>
    </div>
  );
};

const LandingPage = ({ services, projects, news, team, onOpenContact, onOpenQuiz }) => (
  <>
    <SEOHead 
      schema={{
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "DUHAVA Agency",
        "url": "https://duhava.com",
        "logo": "https://duhava.com/logo.png", 
        "description": "Đối tác chiến lược giúp doanh nghiệp tăng trưởng đột phá thông qua dữ liệu và công nghệ Marketing hiện đại.",
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+84-906-291-941",
          "contactType": "customer service",
          "areaServed": "VN",
          "availableLanguage": ["Vietnamese", "English"]
        },
        "sameAs": [
          "https://www.facebook.com/duhava",
          "https://www.linkedin.com/company/duhava"
        ]
      }}
    />
    
    {/* 1. ATTENTION */}
    <Hero onCtaClick={onOpenContact} />
    <ClientLogos />

    {/* 2. INTEREST */}
    <FeaturedProjects projects={projects} />
    
    <MarqueeSeparator />

    {/* 3. DESIRE (Logic & Emotion) */}
    <GrowthEngine />
    
    {/* Updated Services Section (Replaces CapabilitiesDeck) */}
    <Services services={services} onCtaClick={onOpenContact} />

    {/* 4. TRUST (Social Proof) */}
    <RealResultsGallery />

    {/* 5. ACTION & ENGAGEMENT */}
    {/* Only show 3 latest news items on Home */}
    <NewsSection news={news.slice(0, 3)} /> 
    
    <FAQ />
    <div id="lien-he">
      <CTASection onCtaClick={onOpenContact} />
    </div>
  </>
);

const AppContent = () => {
  const [loading, setLoading] = useState(true);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Data State
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [team, setTeam] = useState<TeamMember[]>([]);

  // Load Data
  useEffect(() => {
    const loadData = async () => {
        const [s, p, n, t] = await Promise.all([
            fetchServices(),
            fetchProjects(),
            fetchNews(),
            fetchTeamMembers()
        ]);
        setServices(s);
        setProjects(p);
        setNews(n);
        setTeam(t);
    };
    loadData();
  }, []);

  const handleAdminLogin = () => {
    setIsAdmin(true);
    // In a real app, use a secure auth token
    localStorage.setItem('duhava_admin_session', 'true');
  };

  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('duhava_admin_session');
  };

  useEffect(() => {
    const session = localStorage.getItem('duhava_admin_session');
    if (session) setIsAdmin(true);
  }, []);

  return (
    <>
      {loading && <Preloader onFinish={() => setLoading(false)} />}
      
      {!loading && (
        <div className={`transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
          <NoiseOverlay />
          <CustomCursor />
          <WorldClassBackground />
          <ScrollProgress />
          <MobileStickyBar onCtaClick={() => setIsContactOpen(true)} />
          <ExitIntent />

          <Routes>
            {/* Admin Routes */}
            <Route path="/admin-login" element={isAdmin ? <Navigate to="/admin" /> : <AdminLogin onLogin={handleAdminLogin} />} />
            <Route path="/admin/*" element={isAdmin ? <AdminDashboard onLogout={handleLogout} /> : <Navigate to="/admin-login" />} />

            {/* Public Routes */}
            <Route path="/" element={
              <>
                <Navbar onOpenContact={() => setIsContactOpen(true)} />
                <LandingPage 
                    services={services} 
                    projects={projects} 
                    news={news} 
                    team={team}
                    onOpenContact={() => setIsContactOpen(true)}
                    onOpenQuiz={() => setIsQuizOpen(true)}
                />
                <Footer onOpenAdmin={() => window.location.href = '/admin-login'} />
              </>
            } />

            {/* Detail Pages */}
            <Route path="/service/:id" element={
               <Suspense fallback={<SectionLoader/>}>
                  <ServiceDetail services={services} projects={projects} onCtaClick={() => setIsContactOpen(true)} />
               </Suspense>
            } />
            <Route path="/project/:projectId" element={
                <Suspense fallback={<SectionLoader/>}>
                   <ProjectDetail projects={projects} onCtaClick={() => setIsContactOpen(true)} />
                </Suspense>
            } />
            <Route path="/news/:newsId" element={
                <Suspense fallback={<SectionLoader/>}>
                   <NewsDetail news={news} onCtaClick={() => setIsContactOpen(true)} />
                </Suspense>
            } />

            {/* Dedicated Landing Pages */}
            <Route path="/tin-tuc" element={<Suspense fallback={<SectionLoader/>}><NewsPage news={news} /></Suspense>} />
            <Route path="/du-an" element={<Suspense fallback={<SectionLoader/>}><ProjectsPage projects={projects} /></Suspense>} />
            <Route path="/giai-phap" element={<Suspense fallback={<SectionLoader/>}><ServicesPage services={services} /></Suspense>} />
            
            {/* Updated About Page to receive Team data */}
            <Route path="/ve-chung-toi" element={<Suspense fallback={<SectionLoader/>}><AboutPage team={team} /></Suspense>} />
            
            {/* Redirects for clean URLs or old links */}
            <Route path="/lien-he" element={<Navigate to="/" replace state={{ scrollTo: 'lien-he' }} />} /> 

            {/* 404 */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
          <StrategyQuiz isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} onComplete={() => { setIsQuizOpen(false); setIsContactOpen(true); }} />
        </div>
      )}
    </>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <ErrorBoundary>
        <AppContent />
      </ErrorBoundary>
    </HashRouter>
  );
};

export default App;
