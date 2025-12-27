
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Service, Lead, Project, NewsItem, AdminView, LeadStatus, TeamMember, ComparisonItem, Persona } from '../types';
import { 
    fetchServices, upsertService, deleteService,
    fetchProjects, upsertProject, deleteProject,
    fetchNews, upsertNews, deleteNews,
    fetchLeads, updateLeadStatus,
    fetchTeamMembers, upsertTeamMember, deleteTeamMember,
    fetchComparisons, upsertComparison, deleteComparison,
    fetchPersonas, upsertPersona, deletePersona,
    uploadImage
} from '../services/supabaseService';
import { generateServiceDescription } from '../services/geminiService';
import { GoogleGenAI } from "@google/genai";
import { 
    Trash2, Plus, X, Sparkles, LogOut, Loader2, Home, Users, Briefcase, 
    FileText, RefreshCw, Database, UserCheck, Columns, Target, Upload, 
    CheckCircle, AlertTriangle, Image as ImageIcon, Wand2, LayoutDashboard,
    Search, Bell, TrendingUp, DollarSign, Activity
} from 'lucide-react';
import { MOCK_SERVICES, MOCK_PROJECTS, MOCK_NEWS, MOCK_TEAM } from '../data/mockData';

interface AdminDashboardProps {
  onLogout: () => void;
}

// --- UI COMPONENTS ---

const StatCard = ({ title, value, icon: Icon, color, subtext }: { title: string, value: string | number, icon: any, color: string, subtext?: string }) => (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-6 rounded-2xl relative overflow-hidden group hover:border-brand-yellow/30 transition-all">
        <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity ${color}`}>
            <Icon size={64} />
        </div>
        <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg bg-gray-900 ${color}`}>
                    <Icon size={20} />
                </div>
                <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider">{title}</h3>
            </div>
            <div className="text-3xl font-black text-white mb-1">{value}</div>
            {subtext && <div className="text-xs text-gray-500 font-medium">{subtext}</div>}
        </div>
    </div>
);

const SkeletonRow = () => (
  <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 animate-pulse h-full flex flex-col mb-4">
    <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
  </div>
);

const Toast = ({ message, type, onClose }: { message: string, type: 'success' | 'error', onClose: () => void }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`fixed top-4 right-4 z-[1000] px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 animate-in slide-in-from-right-full transition-all border ${type === 'success' ? 'bg-gray-900 border-green-500/50 text-green-400' : 'bg-gray-900 border-red-500/50 text-red-400'}`}>
            {type === 'success' ? <CheckCircle size={20} /> : <AlertTriangle size={20} />}
            <span className="font-bold">{message}</span>
            <button onClick={onClose}><X size={16} className="opacity-50 hover:opacity-100"/></button>
        </div>
    );
};

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const [view, setView] = useState<AdminView>(AdminView.DASHBOARD); // Default to Dashboard
  
  // Data States
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [comparisons, setComparisons] = useState<ComparisonItem[]>([]);
  const [personas, setPersonas] = useState<Persona[]>([]);
  
  // UI States
  const [isEditing, setIsEditing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Edit Form States
  const [editingType, setEditingType] = useState<keyof typeof AdminView | null>(null);
  const [formData, setFormData] = useState<any>({});

  const showToast = (message: string, type: 'success' | 'error') => {
      setToast({ message, type });
  };

  const refreshData = async () => {
      setIsLoading(true);
      try {
          const [s, p, n, l, t, comp, per] = await Promise.all([
              fetchServices(),
              fetchProjects(),
              fetchNews(),
              fetchLeads(),
              fetchTeamMembers(),
              fetchComparisons(),
              fetchPersonas()
          ]);
          setServices(s);
          setProjects(p);
          setNews(n);
          setLeads(l);
          setTeamMembers(t);
          setComparisons(comp);
          setPersonas(per);
      } catch (e) {
          console.error("Error loading data", e);
          showToast("Lỗi tải dữ liệu", 'error');
      } finally {
          setIsLoading(false);
      }
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Filter Helper
  const filterData = (data: any[]) => {
      if (!searchTerm) return data;
      return data.filter(item => 
          Object.values(item).some(val => 
              String(val).toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
  };

  // --- Actions ---

  const handleSeedData = async () => {
    if (!confirm('CẢNH BÁO: Bạn có muốn "bơm" dữ liệu mẫu vào Database không?')) return;
    setIsSyncing(true);
    try {
        for (const s of MOCK_SERVICES) { const { id, ...rest } = s; await upsertService(rest); }
        for (const p of MOCK_PROJECTS) { const { id, ...rest } = p; await upsertProject(rest); }
        for (const n of MOCK_NEWS) { const { id, ...rest } = n; await upsertNews(rest); }
        for (const t of MOCK_TEAM) { const { id, ...rest } = t; await upsertTeamMember(rest); }
        showToast("Khôi phục dữ liệu mẫu thành công!", 'success');
        await refreshData();
    } catch (e) {
        showToast("Có lỗi khi seed data.", 'error');
    } finally {
        setIsSyncing(false);
    }
  };

  const handleDelete = async (type: keyof typeof AdminView, id: string) => {
    if (!confirm('Bạn có chắc muốn xóa mục này?')) return;
    setIsSyncing(true);
    try {
        if (type === 'SERVICES') await deleteService(id);
        else if (type === 'PROJECTS') await deleteProject(id);
        else if (type === 'NEWS') await deleteNews(id);
        else if (type === 'TEAM') await deleteTeamMember(id);
        else if (type === 'COMPARISON') await deleteComparison(id);
        else if (type === 'PERSONAS') await deletePersona(id);
        
        showToast("Đã xóa thành công", 'success');
        refreshData();
    } catch (e) {
        showToast("Lỗi khi xóa dữ liệu", 'error');
    } finally {
        setIsSyncing(false);
    }
  };

  const openModal = (type: keyof typeof AdminView, item?: any) => {
    setEditingType(type);
    setFormData(item || {}); 
    setIsEditing(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setIsUploading(true);
      try {
          const publicUrl = await uploadImage(file);
          if (publicUrl) {
              setFormData({ ...formData, imageUrl: publicUrl });
              showToast("Upload ảnh thành công", 'success');
          } else {
              showToast("Upload thất bại.", 'error');
          }
      } catch (error) {
          showToast("Lỗi khi upload ảnh", 'error');
      } finally {
          setIsUploading(false);
      }
  };

  const handleGenerateImageAI = async () => {
    const context = formData.title || formData.name || "Abstract Digital Art";
    if (!context) {
        showToast("Vui lòng nhập tiêu đề trước.", 'error');
        return;
    }
    setIsGeneratingImage(true);
    try {
        const apiKey = process.env.API_KEY || '';
        if (!apiKey) throw new Error("API Key not found");
        const ai = new GoogleGenAI({ apiKey });
        const prompt = `High-end professional photography or 3D render of ${context}. Style: Luxury, Cyberpunk, Futuristic, Black and Gold color palette. Quality: 8k resolution, photorealistic.`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-image-preview',
            contents: { parts: [{ text: prompt }] },
            config: { imageConfig: { aspectRatio: "16:9", imageSize: "1K" } }
        });

        let base64Image = null;
        if (response.candidates?.[0]?.content?.parts) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    base64Image = part.inlineData.data;
                    break;
                }
            }
        }

        if (base64Image) {
            const byteCharacters = atob(base64Image);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) byteNumbers[i] = byteCharacters.charCodeAt(i);
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'image/png' });
            const file = new File([blob], `ai-gen-${Date.now()}.png`, { type: 'image/png' });
            const publicUrl = await uploadImage(file);
            if (publicUrl) {
                setFormData({ ...formData, imageUrl: publicUrl });
                showToast("Đã thiết kế và upload ảnh thành công!", 'success');
            }
        }
    } catch (error) {
        showToast("Lỗi khi tạo ảnh AI.", 'error');
    } finally {
        setIsGeneratingImage(false);
    }
  };

  const handleSave = async () => {
    setIsSyncing(true);
    try {
        if (editingType === 'SERVICES') await upsertService({ ...formData, icon: 'Star', imageUrl: formData.imageUrl || `https://picsum.photos/800/600?random=${Date.now()}` });
        else if (editingType === 'PROJECTS') await upsertProject({ ...formData, imageUrl: formData.imageUrl || `https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800` });
        else if (editingType === 'NEWS') await upsertNews({ ...formData, content: formData.content || formData.summary, date: formData.date || new Date().toISOString().split('T')[0], imageUrl: formData.imageUrl || `https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800` });
        else if (editingType === 'TEAM') await upsertTeamMember({ ...formData, imageUrl: formData.imageUrl || `https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800` });
        else if (editingType === 'COMPARISON') await upsertComparison({ ...formData, sortOrder: parseInt(formData.sortOrder) || 0 });
        else if (editingType === 'PERSONAS') await upsertPersona({ ...formData, focusTags: Array.isArray(formData.focusTags) ? formData.focusTags : (formData.focusTags || '').split(',').map((s: string) => s.trim()), iconName: formData.iconName || 'Star' });
        
        showToast("Lưu thành công!", 'success');
        setIsEditing(false); 
        setFormData({});
        setEditingType(null);
        refreshData(); 
    } catch (error: any) {
        showToast("Có lỗi xảy ra khi lưu.", 'error');
    } finally {
        setIsSyncing(false);
    }
  };

  const handleGenerateAI = async () => {
    if (!formData.title && !formData.name && !formData.criterion) {
      showToast("Vui lòng nhập tiêu đề/tên trước.", 'error');
      return;
    }
    setIsGenerating(true);
    const desc = await generateServiceDescription(formData.title || formData.name || formData.criterion);
    if (editingType === 'NEWS') setFormData((prev: any) => ({ ...prev, summary: desc })); 
    else if (editingType === 'TEAM') setFormData((prev: any) => ({ ...prev, bio: desc }));
    else setFormData((prev: any) => ({ ...prev, description: desc }));
    setIsGenerating(false);
  };

  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
      setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
      try { await updateLeadStatus(leadId, newStatus); showToast("Đã cập nhật trạng thái", 'success'); } 
      catch (e) { refreshData(); showToast("Lỗi cập nhật trạng thái", 'error'); }
  };

  const newLeadsCount = leads.filter(l => l.status === LeadStatus.NEW || !l.status).length;
  const closedLeadsCount = leads.filter(l => l.status === LeadStatus.CLOSED).length;
  const conversionRate = leads.length > 0 ? ((closedLeadsCount / leads.length) * 100).toFixed(1) : 0;

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans cursor-default flex flex-col md:flex-row">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      {/* SIDEBAR */}
      <aside className="w-full md:w-72 bg-black border-r border-gray-800 flex flex-col shrink-0 z-20 h-auto md:h-screen sticky top-0">
          <div className="p-6 border-b border-gray-800 flex items-center gap-3">
             <div className="w-8 h-8 bg-brand-yellow rounded flex items-center justify-center font-black text-black">D</div>
             <div>
                <h2 className="text-lg font-black text-white leading-none">DUHAVA</h2>
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Admin Control</span>
             </div>
          </div>
          
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
             <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-4 py-2 mt-2">Tổng Quan</div>
             <button onClick={() => setView(AdminView.DASHBOARD)} className={`w-full text-left px-4 py-3 rounded-xl font-bold flex items-center gap-3 transition-all ${view === AdminView.DASHBOARD ? 'bg-brand-yellow text-black shadow-lg shadow-brand-yellow/20' : 'text-gray-400 hover:bg-gray-900 hover:text-white'}`}>
                <LayoutDashboard size={18} /> Dashboard
             </button>

             <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-4 py-2 mt-4">CRM & Dữ Liệu</div>
             <button onClick={() => setView(AdminView.LEADS)} className={`w-full text-left px-4 py-3 rounded-xl font-bold flex justify-between items-center transition-all ${view === AdminView.LEADS ? 'bg-gray-800 text-white border border-gray-700' : 'text-gray-400 hover:bg-gray-900 hover:text-white'}`}>
                <div className="flex items-center gap-3"><Users size={18} /> Leads</div>
                {newLeadsCount > 0 && <span className="bg-brand-yellow text-black text-[10px] px-2 py-0.5 rounded-full font-black animate-pulse">{newLeadsCount}</span>}
             </button>

             <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-4 py-2 mt-4">Nội Dung CMS</div>
             <button onClick={() => setView(AdminView.SERVICES)} className={`w-full text-left px-4 py-3 rounded-xl font-bold flex items-center gap-3 transition-all ${view === AdminView.SERVICES ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-900'}`}><Sparkles size={18} /> Dịch Vụ</button>
             <button onClick={() => setView(AdminView.PROJECTS)} className={`w-full text-left px-4 py-3 rounded-xl font-bold flex items-center gap-3 transition-all ${view === AdminView.PROJECTS ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-900'}`}><Briefcase size={18} /> Dự Án</button>
             <button onClick={() => setView(AdminView.NEWS)} className={`w-full text-left px-4 py-3 rounded-xl font-bold flex items-center gap-3 transition-all ${view === AdminView.NEWS ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-900'}`}><FileText size={18} /> Tin Tức</button>
             <button onClick={() => setView(AdminView.TEAM)} className={`w-full text-left px-4 py-3 rounded-xl font-bold flex items-center gap-3 transition-all ${view === AdminView.TEAM ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-900'}`}><UserCheck size={18} /> Đội Ngũ</button>

             <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-4 py-2 mt-4">Cấu Hình</div>
             <button onClick={() => setView(AdminView.COMPARISON)} className={`w-full text-left px-4 py-3 rounded-xl font-bold flex items-center gap-3 transition-all ${view === AdminView.COMPARISON ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-900'}`}><Columns size={18} /> So Sánh</button>
             <button onClick={() => setView(AdminView.PERSONAS)} className={`w-full text-left px-4 py-3 rounded-xl font-bold flex items-center gap-3 transition-all ${view === AdminView.PERSONAS ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-900'}`}><Target size={18} /> Personas</button>
          </nav>

          <div className="p-4 border-t border-gray-800 space-y-2">
             <button onClick={() => navigate('/')} className="w-full text-left px-4 py-2 rounded text-xs font-bold text-gray-400 hover:text-white flex items-center gap-2"><Home size={14} /> Về Trang Chủ</button>
             <button onClick={onLogout} className="w-full text-left px-4 py-2 rounded text-xs font-bold text-red-500 hover:bg-red-900/10 flex items-center gap-2"><LogOut size={14} /> Đăng Xuất</button>
          </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto h-screen bg-black/95 relative">
          {/* Top Header */}
          <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-md border-b border-gray-800 px-8 py-4 flex justify-between items-center">
             <div>
                <h1 className="text-xl font-black text-white uppercase tracking-tight">
                    {view === AdminView.DASHBOARD ? 'Dashboard Overview' : 
                     view === AdminView.LEADS ? 'Quản Lý Leads' :
                     view === AdminView.SERVICES ? 'Dịch Vụ' :
                     view === AdminView.PROJECTS ? 'Dự Án Tiêu Biểu' :
                     view === AdminView.NEWS ? 'Tin Tức & Blog' : 'Cấu Hình Hệ Thống'}
                </h1>
                <p className="text-xs text-gray-500 font-medium mt-1">Cập nhật lần cuối: {new Date().toLocaleDateString('vi-VN')}</p>
             </div>
             
             <div className="flex items-center gap-4">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-brand-yellow" size={16} />
                    <input 
                        type="text" 
                        placeholder="Tìm kiếm..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="bg-gray-900 border border-gray-800 rounded-full pl-10 pr-4 py-2 text-sm text-white focus:border-brand-yellow focus:outline-none w-64 transition-all"
                    />
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:text-brand-yellow cursor-pointer relative">
                    <Bell size={18} />
                    {newLeadsCount > 0 && <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-gray-800"></span>}
                </div>
                <button onClick={handleSeedData} className="p-2 text-blue-500 hover:bg-blue-900/20 rounded-full" title="Seed Data"><Database size={18}/></button>
             </div>
          </header>

          <div className="p-8">
            {/* --- DASHBOARD VIEW --- */}
            {view === AdminView.DASHBOARD && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard 
                            title="Tổng Leads" 
                            value={leads.length} 
                            subtext={`${newLeadsCount} Leads mới cần xử lý`}
                            icon={Users} 
                            color="text-blue-500" 
                        />
                        <StatCard 
                            title="Tỉ Lệ Chốt" 
                            value={`${conversionRate}%`} 
                            subtext="Dựa trên số liệu thực tế"
                            icon={TrendingUp} 
                            color="text-green-500" 
                        />
                         <StatCard 
                            title="Dự Án Active" 
                            value={projects.length} 
                            subtext="Đang hiển thị trên web"
                            icon={Briefcase} 
                            color="text-brand-yellow" 
                        />
                        <StatCard 
                            title="Doanh Thu (Est)" 
                            value={`${(closedLeadsCount * 15).toLocaleString()} Tr`} 
                            subtext="Dựa trên giá trị trung bình"
                            icon={DollarSign} 
                            color="text-purple-500" 
                        />
                    </div>

                    {/* Dashboard Sections */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Recent Leads Activity */}
                        <div className="lg:col-span-2 bg-gray-900/30 border border-gray-800 rounded-2xl p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-white flex items-center gap-2"><Activity size={18} className="text-brand-yellow"/> Hoạt Động Gần Đây</h3>
                                <button onClick={() => setView(AdminView.LEADS)} className="text-xs text-brand-yellow font-bold uppercase hover:underline">Xem Tất Cả</button>
                            </div>
                            <div className="space-y-4">
                                {leads.slice(0, 5).map(lead => (
                                    <div key={lead.id} className="flex items-center justify-between p-4 bg-gray-800/40 rounded-xl border border-gray-800/50 hover:border-brand-yellow/30 transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${lead.status === 'NEW' ? 'bg-red-500/20 text-red-500' : 'bg-gray-700 text-gray-400'}`}>
                                                {lead.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-white">{lead.name}</div>
                                                <div className="text-xs text-gray-500">{lead.phone} • {new Date(lead.createdAt).toLocaleDateString('vi-VN')}</div>
                                            </div>
                                        </div>
                                        <span className={`text-[10px] font-bold px-2 py-1 rounded border uppercase ${
                                            lead.status === 'NEW' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                                            lead.status === 'CLOSED' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                            'bg-gray-700/50 text-gray-400 border-gray-700'
                                        }`}>
                                            {lead.status || 'NEW'}
                                        </span>
                                    </div>
                                ))}
                                {leads.length === 0 && <div className="text-center text-gray-500 py-4">Chưa có dữ liệu.</div>}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-gray-900/30 border border-gray-800 rounded-2xl p-6">
                             <h3 className="text-lg font-bold text-white mb-6">Thao Tác Nhanh</h3>
                             <div className="space-y-3">
                                <button onClick={() => openModal('PROJECTS')} className="w-full p-4 bg-gray-800 hover:bg-brand-yellow hover:text-black rounded-xl text-left font-bold text-sm transition-all flex items-center justify-between group">
                                    <span>Thêm Dự Án Mới</span> <Plus size={16} className="text-gray-500 group-hover:text-black"/>
                                </button>
                                <button onClick={() => openModal('NEWS')} className="w-full p-4 bg-gray-800 hover:bg-brand-yellow hover:text-black rounded-xl text-left font-bold text-sm transition-all flex items-center justify-between group">
                                    <span>Viết Bài Blog</span> <FileText size={16} className="text-gray-500 group-hover:text-black"/>
                                </button>
                                <button onClick={() => openModal('SERVICES')} className="w-full p-4 bg-gray-800 hover:bg-brand-yellow hover:text-black rounded-xl text-left font-bold text-sm transition-all flex items-center justify-between group">
                                    <span>Tạo Dịch Vụ</span> <Sparkles size={16} className="text-gray-500 group-hover:text-black"/>
                                </button>
                             </div>
                        </div>
                    </div>
                </div>
            )}

            {/* --- LEADS VIEW --- */}
            {view === AdminView.LEADS && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-lg text-red-500 text-sm font-bold flex items-center gap-2">
                             <AlertTriangle size={16} /> {newLeadsCount} Cần xử lý
                        </div>
                        <div className="bg-green-500/10 border border-green-500/20 px-4 py-2 rounded-lg text-green-500 text-sm font-bold flex items-center gap-2">
                             <CheckCircle size={16} /> {closedLeadsCount} Đã chốt
                        </div>
                    </div>

                    <div className="bg-gray-900/50 rounded-2xl border border-gray-800 overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-950 text-gray-400 text-xs uppercase border-b border-gray-800">
                                    <th className="p-4">Khách Hàng</th>
                                    <th className="p-4">Trạng Thái</th>
                                    <th className="p-4">Nhu Cầu</th>
                                    <th className="p-4">Ngày Gửi</th>
                                    <th className="p-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {filterData(leads).map(lead => (
                                    <tr key={lead.id} className="hover:bg-gray-800/30 transition-colors">
                                        <td className="p-4">
                                            <div className="font-bold text-white text-sm">{lead.name}</div>
                                            <div className="text-xs text-gray-500">{lead.phone}</div>
                                            <div className="text-xs text-gray-600">{lead.email}</div>
                                        </td>
                                        <td className="p-4">
                                            <select 
                                                value={lead.status || LeadStatus.NEW}
                                                onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                                                className={`text-[10px] font-black uppercase px-3 py-1.5 rounded border outline-none cursor-pointer tracking-wider
                                                    ${lead.status === LeadStatus.NEW || !lead.status ? 'bg-red-500/20 text-red-500 border-red-500/30' : ''}
                                                    ${lead.status === LeadStatus.CONTACTED ? 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30' : ''}
                                                    ${lead.status === LeadStatus.CLOSED ? 'bg-green-500/20 text-green-500 border-green-500/30' : ''}
                                                    ${lead.status === LeadStatus.LOST ? 'bg-gray-500/20 text-gray-500 border-gray-600' : ''}
                                                `}
                                            >
                                                <option value={LeadStatus.NEW}>Mới</option>
                                                <option value={LeadStatus.CONTACTED}>Đã Liên Hệ</option>
                                                <option value={LeadStatus.CLOSED}>Chốt Deal</option>
                                                <option value={LeadStatus.LOST}>Thất Bại</option>
                                            </select>
                                        </td>
                                        <td className="p-4 text-sm text-gray-300 max-w-xs truncate" title={lead.details}>{lead.details}</td>
                                        <td className="p-4 text-xs text-gray-500 font-mono">{new Date(lead.createdAt).toLocaleDateString('vi-VN')}</td>
                                        <td className="p-4 text-right">
                                            <button className="text-brand-yellow hover:underline text-xs font-bold" onClick={() => { alert(lead.details) }}>Xem Chi Tiết</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* --- GENERIC LIST VIEW (Services, Projects, News, Team) --- */}
            {(view === AdminView.SERVICES || view === AdminView.PROJECTS || view === AdminView.NEWS || view === AdminView.TEAM || view === AdminView.PERSONAS) && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex justify-between items-center mb-6">
                        <div className="text-sm text-gray-500 font-bold">Hiển thị {filterData(view === 'SERVICES' ? services : view === 'PROJECTS' ? projects : view === 'NEWS' ? news : view === 'PERSONAS' ? personas : teamMembers).length} mục</div>
                        <button onClick={() => openModal(view as keyof typeof AdminView)} className="bg-brand-yellow text-black px-6 py-2.5 rounded-full font-black text-sm flex items-center gap-2 hover:bg-white transition-colors shadow-lg shadow-brand-yellow/20">
                            <Plus size={16}/> Thêm Mới
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {isLoading ? Array(4).fill(0).map((_,i) => <SkeletonRow key={i}/>) : 
                        // DYNAMIC RENDERING BASED ON VIEW
                        filterData(view === 'SERVICES' ? services : view === 'PROJECTS' ? projects : view === 'NEWS' ? news : view === 'PERSONAS' ? personas : teamMembers).map((item: any) => (
                            <div key={item.id} className="bg-gray-900/40 border border-gray-800 rounded-2xl p-5 hover:border-brand-yellow/50 transition-all group flex flex-col">
                                {item.imageUrl && (
                                    <div className="h-40 rounded-xl bg-gray-800 mb-4 overflow-hidden relative">
                                        <img src={item.imageUrl} className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700"/>
                                        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => openModal(view as any, item)} className="p-1.5 bg-black/50 backdrop-blur text-white rounded hover:bg-blue-600"><Sparkles size={14}/></button>
                                            <button onClick={() => handleDelete(view as any, item.id)} className="p-1.5 bg-black/50 backdrop-blur text-white rounded hover:bg-red-600"><Trash2 size={14}/></button>
                                        </div>
                                    </div>
                                )}
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-white line-clamp-1 text-lg" title={item.title || item.name}>{item.title || item.name}</h3>
                                        {item.category && <span className="text-[10px] px-2 py-0.5 rounded bg-gray-800 text-gray-400 border border-gray-700 uppercase font-bold">{item.category}</span>}
                                    </div>
                                    <p className="text-gray-500 text-xs line-clamp-3 mb-4 leading-relaxed">{item.description || item.summary || item.bio}</p>
                                </div>
                                {view === 'PERSONAS' && (
                                    <div className="flex flex-wrap gap-1 mt-2">
                                        {item.focusTags?.map((tag: string, i: number) => (
                                            <span key={i} className="text-[9px] bg-brand-yellow/10 text-brand-yellow px-1.5 py-0.5 rounded border border-brand-yellow/20">{tag}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
             
            {/* --- COMPARISON VIEW --- */}
            {view === AdminView.COMPARISON && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex justify-end mb-6"><button onClick={() => openModal('COMPARISON')} className="bg-brand-yellow text-black px-6 py-2.5 rounded-full font-black text-sm flex items-center gap-2 hover:bg-white transition-colors"><Plus size={16}/> Thêm Tiêu Chí</button></div>
                    <div className="bg-gray-900/50 rounded-2xl border border-gray-800 overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-950 text-gray-400 text-xs uppercase border-b border-gray-800">
                                    <th className="p-4">Tiêu Chí</th>
                                    <th className="p-4 text-brand-yellow">DUHAVA</th>
                                    <th className="p-4">Agency Khác</th>
                                    <th className="p-4">Freelancer</th>
                                    <th className="p-4 text-center">Thứ tự</th>
                                    <th className="p-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {filterData(comparisons).map(c => (
                                    <tr key={c.id} className="hover:bg-gray-800/30">
                                        <td className="p-4 font-bold">{c.criterion}</td>
                                        <td className="p-4 text-brand-yellow font-bold">{c.duhavaValue === 'TRUE' ? <CheckCircle size={16}/> : c.duhavaValue}</td>
                                        <td className="p-4 text-gray-500">{c.agencyValue}</td>
                                        <td className="p-4 text-gray-600">{c.freelanceValue}</td>
                                        <td className="p-4 text-center">{c.sortOrder}</td>
                                        <td className="p-4 text-right flex justify-end gap-2">
                                            <button onClick={() => openModal('COMPARISON', c)} className="text-blue-500 hover:text-white p-2"><Sparkles size={14}/></button>
                                            <button onClick={() => handleDelete('COMPARISON', c.id)} className="text-red-500 hover:text-white p-2"><Trash2 size={14}/></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

          </div>
      </main>

      {/* --- EDIT MODAL (Reuse logic, updated styling) --- */}
      {isEditing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-gray-900 border border-gray-700 w-full max-w-2xl rounded-2xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto relative animate-in zoom-in-95 duration-200">
                <button onClick={() => setIsEditing(false)} className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"><X size={24} /></button>
                <h2 className="text-2xl font-black uppercase text-white mb-1">{formData.id ? 'Cập Nhật Dữ Liệu' : 'Thêm Mới'}</h2>
                <p className="text-gray-500 text-sm mb-8">Điền thông tin chi tiết bên dưới. Sử dụng AI để tối ưu nội dung.</p>

                <div className="space-y-6">
                    {/* Common Fields */}
                    {(['SERVICES', 'PROJECTS', 'NEWS', 'TEAM', 'PERSONAS'].includes(editingType || '')) && (
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">{editingType === 'TEAM' ? 'Tên (Name)' : 'Tiêu Đề (Title)'}</label>
                            <input className="w-full bg-black border border-gray-800 rounded-lg p-3 text-white focus:border-brand-yellow outline-none transition-colors"
                                value={editingType === 'TEAM' ? (formData.name || '') : (formData.title || '')}
                                onChange={e => (editingType === 'TEAM') ? setFormData({...formData, name: e.target.value}) : setFormData({...formData, title: e.target.value})}
                                placeholder="Nhập tiêu đề..."
                            />
                        </div>
                    )}

                    {/* Image & AI Generation */}
                    {(['SERVICES', 'PROJECTS', 'NEWS', 'TEAM'].includes(editingType || '')) && (
                        <div className="bg-gray-800/30 p-4 rounded-xl border border-gray-800">
                            <label className="block text-xs font-bold text-brand-yellow uppercase mb-3 flex justify-between">
                                <span>Media & Visuals</span>
                                {isGeneratingImage && <span className="flex items-center gap-1 animate-pulse"><Loader2 size={12} className="animate-spin"/> AI Processing...</span>}
                            </label>
                            <div className="flex gap-4">
                                <div className="w-24 h-24 bg-black rounded-lg border border-gray-700 flex items-center justify-center overflow-hidden shrink-0">
                                    {(formData.imageUrl) ? <img src={formData.imageUrl} className="w-full h-full object-cover" /> : <ImageIcon size={24} className="text-gray-600"/>}
                                </div>
                                <div className="flex-1 flex flex-col gap-2">
                                    <div className="flex gap-2">
                                        <label className="flex-1 cursor-pointer bg-gray-700 hover:bg-gray-600 text-white text-xs font-bold py-2 rounded flex items-center justify-center gap-2 transition-colors">
                                            <Upload size={14}/> Upload
                                            <input type="file" hidden accept="image/*" onChange={handleImageUpload} disabled={isUploading}/>
                                        </label>
                                        <button onClick={handleGenerateImageAI} disabled={isGeneratingImage} className="flex-1 bg-gradient-to-r from-brand-yellow to-yellow-600 text-black text-xs font-bold py-2 rounded flex items-center justify-center gap-2 hover:brightness-110 transition-all">
                                            <Wand2 size={14}/> AI Design
                                        </button>
                                    </div>
                                    <input className="w-full bg-black border border-gray-700 rounded p-2 text-white text-xs focus:border-brand-yellow outline-none"
                                        value={formData.imageUrl || ''}
                                        onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                                        placeholder="Paste Image URL..."
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Specific Fields Logic (Reduced complexity for brevity, keeping existing logic) */}
                    {editingType === 'COMPARISON' && (
                         <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2"><label className="label-text">Tiêu Chí</label><input className="input-field" value={formData.criterion || ''} onChange={e => setFormData({...formData, criterion: e.target.value})}/></div>
                            <div><label className="label-text text-brand-yellow">Duhava</label><input className="input-field border-brand-yellow/50" value={formData.duhavaValue || ''} onChange={e => setFormData({...formData, duhavaValue: e.target.value})}/></div>
                            <div><label className="label-text">Agency Khác</label><input className="input-field" value={formData.agencyValue || ''} onChange={e => setFormData({...formData, agencyValue: e.target.value})}/></div>
                            <div><label className="label-text">Freelancer</label><input className="input-field" value={formData.freelanceValue || ''} onChange={e => setFormData({...formData, freelanceValue: e.target.value})}/></div>
                            <div><label className="label-text">Thứ tự</label><input type="number" className="input-field" value={formData.sortOrder || 0} onChange={e => setFormData({...formData, sortOrder: e.target.value})}/></div>
                         </div>
                    )}
                    
                    {/* Simplified Inputs for other types for cleaner code */}
                    {editingType === 'PROJECTS' && (
                        <div className="grid grid-cols-2 gap-4">
                             <div><label className="label-text">Khách Hàng</label><input className="input-field" value={formData.client || ''} onChange={e => setFormData({...formData, client: e.target.value})}/></div>
                             <div><label className="label-text">Kết Quả</label><input className="input-field" value={formData.result || ''} onChange={e => setFormData({...formData, result: e.target.value})}/></div>
                             <div className="col-span-2"><label className="label-text">Danh Mục</label><input className="input-field" value={formData.category || ''} onChange={e => setFormData({...formData, category: e.target.value})}/></div>
                        </div>
                    )}

                    {/* AI Text Generation Area */}
                    {(['SERVICES', 'PROJECTS', 'NEWS', 'TEAM', 'PERSONAS'].includes(editingType || '')) && (
                        <div className="relative">
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-xs font-bold text-gray-500 uppercase">
                                    {editingType === 'NEWS' ? 'Mô Tả Ngắn' : editingType === 'TEAM' ? 'Tiểu Sử' : 'Nội Dung Chi Tiết'}
                                </label>
                                <button onClick={handleGenerateAI} disabled={isGenerating} className="text-brand-yellow text-xs font-bold flex items-center gap-1 hover:underline">
                                    {isGenerating ? <Loader2 className="animate-spin" size={12}/> : <Sparkles size={12} />}
                                    {isGenerating ? 'Đang viết...' : 'Viết bằng AI'}
                                </button>
                            </div>
                            <textarea className="w-full bg-black border border-gray-800 rounded-lg p-3 text-white focus:border-brand-yellow outline-none h-32 leading-relaxed"
                                value={editingType === 'NEWS' ? (formData.summary || '') : editingType === 'TEAM' ? (formData.bio || '') : (formData.description || '')}
                                onChange={e => editingType === 'NEWS' ? setFormData({...formData, summary: e.target.value}) : editingType === 'TEAM' ? setFormData({...formData, bio: e.target.value}) : setFormData({...formData, description: e.target.value})}
                            />
                        </div>
                    )}

                    <button onClick={handleSave} disabled={isSyncing} className="w-full bg-brand-yellow text-black font-black uppercase py-4 rounded-xl hover:bg-white transition-all shadow-lg hover:shadow-brand-yellow/20 mt-4 disabled:opacity-50">
                        {isSyncing ? 'Đang Lưu...' : 'Xác Nhận & Lưu'}
                    </button>
                </div>
            </div>
            <style>{`
                .label-text { display: block; font-size: 0.75rem; font-weight: 700; color: #6b7280; text-transform: uppercase; margin-bottom: 0.5rem; }
                .input-field { width: 100%; background-color: #000; border: 1px solid #1f2937; border-radius: 0.5rem; padding: 0.75rem; color: #fff; outline: none; transition: border-color 0.2s; }
                .input-field:focus { border-color: #FACC15; }
            `}</style>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
