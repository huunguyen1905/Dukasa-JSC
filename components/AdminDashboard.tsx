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
import { Trash2, Plus, X, Sparkles, LogOut, Loader2, Home, Users, Briefcase, FileText, RefreshCw, Database, UserCheck, Columns, Target, Upload, CheckCircle, AlertTriangle } from 'lucide-react';
import { MOCK_SERVICES, MOCK_PROJECTS, MOCK_NEWS, MOCK_TEAM } from '../data/mockData';

interface AdminDashboardProps {
  onLogout: () => void;
}

const SkeletonRow = () => (
  <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 animate-pulse h-full flex flex-col mb-4">
    <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
  </div>
);

// Simple Toast Notification Component
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
  const [view, setView] = useState<AdminView>(AdminView.LEADS);
  
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
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  
  // Edit Form States
  const [editingType, setEditingType] = useState<keyof typeof AdminView | null>(null);
  const [formData, setFormData] = useState<any>({});

  const showToast = (message: string, type: 'success' | 'error') => {
      setToast({ message, type });
  };

  // Fetch all data
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

  // --- Handlers ---

  const handleSeedData = async () => {
    if (!confirm('CẢNH BÁO: Bạn có muốn "bơm" dữ liệu mẫu vào Database không?')) return;
    
    setIsSyncing(true);
    try {
        // Seed Services
        for (const s of MOCK_SERVICES) { const { id, ...rest } = s; await upsertService(rest); }
        // Seed Projects
        for (const p of MOCK_PROJECTS) { const { id, ...rest } = p; await upsertProject(rest); }
        // Seed News
        for (const n of MOCK_NEWS) { const { id, ...rest } = n; await upsertNews(rest); }
        // Seed Team
        for (const t of MOCK_TEAM) { const { id, ...rest } = t; await upsertTeamMember(rest); }

        showToast("Khôi phục dữ liệu mẫu thành công!", 'success');
        await refreshData();
    } catch (e) {
        console.error(e);
        showToast("Có lỗi khi seed data.", 'error');
    } finally {
        setIsSyncing(false);
    }
  };

  const handleDelete = async (type: keyof typeof AdminView, id: string) => {
    if (!confirm('Bạn có chắc muốn xóa mục này?')) return;
    
    setIsSyncing(true);
    try {
        if (type === 'SERVICES') {
            await deleteService(id);
            setServices(prev => prev.filter(item => item.id !== id));
        } else if (type === 'PROJECTS') {
            await deleteProject(id);
            setProjects(prev => prev.filter(item => item.id !== id));
        } else if (type === 'NEWS') {
            await deleteNews(id);
            setNews(prev => prev.filter(item => item.id !== id));
        } else if (type === 'TEAM') {
            await deleteTeamMember(id);
            setTeamMembers(prev => prev.filter(item => item.id !== id));
        } else if (type === 'COMPARISON') {
            await deleteComparison(id);
            setComparisons(prev => prev.filter(item => item.id !== id));
        } else if (type === 'PERSONAS') {
            await deletePersona(id);
            setPersonas(prev => prev.filter(item => item.id !== id));
        }
        showToast("Đã xóa thành công", 'success');
    } catch (e) {
        showToast("Lỗi khi xóa dữ liệu", 'error');
        console.error(e);
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
              showToast("Upload thất bại. Vui lòng tạo Bucket 'content' public.", 'error');
          }
      } catch (error) {
          console.error(error);
          showToast("Lỗi khi upload ảnh", 'error');
      } finally {
          setIsUploading(false);
      }
  };

  const handleSave = async () => {
    setIsSyncing(true);

    try {
        if (editingType === 'SERVICES') {
            const newService: Partial<Service> = {
                title: formData.title,
                description: formData.description,
                icon: 'Star',
                imageUrl: formData.imageUrl || `https://picsum.photos/800/600?random=${Date.now()}`
            };
            if (formData.id) newService.id = formData.id;
            await upsertService(newService);

        } else if (editingType === 'PROJECTS') {
            const newProject: Partial<Project> = {
                title: formData.title,
                client: formData.client,
                category: formData.category,
                result: formData.result,
                description: formData.description,
                imageUrl: formData.imageUrl || `https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800`
            };
            if (formData.id) newProject.id = formData.id;
            await upsertProject(newProject);

        } else if (editingType === 'NEWS') {
            const newNews: Partial<NewsItem> = {
                title: formData.title,
                category: formData.category,
                summary: formData.summary,
                content: formData.content || formData.summary,
                date: formData.date || new Date().toISOString().split('T')[0],
                imageUrl: formData.imageUrl || `https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800`
            };
            if (formData.id) newNews.id = formData.id;
            await upsertNews(newNews);

        } else if (editingType === 'TEAM') {
             const newMember: Partial<TeamMember> = {
                name: formData.name,
                role: formData.role,
                imageUrl: formData.imageUrl || `https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800`,
                bio: formData.bio
            };
            if (formData.id) newMember.id = formData.id;
            await upsertTeamMember(newMember);

        } else if (editingType === 'COMPARISON') {
            const newComp: Partial<ComparisonItem> = {
                criterion: formData.criterion,
                duhavaValue: formData.duhavaValue,
                agencyValue: formData.agencyValue,
                freelanceValue: formData.freelanceValue,
                sortOrder: parseInt(formData.sortOrder) || 0
            };
            if (formData.id) newComp.id = formData.id;
            await upsertComparison(newComp);

        } else if (editingType === 'PERSONAS') {
            const newPersona: Partial<Persona> = {
                keyName: formData.keyName,
                title: formData.title,
                description: formData.description,
                focusTags: Array.isArray(formData.focusTags) ? formData.focusTags : (formData.focusTags || '').split(',').map((s: string) => s.trim()),
                ctaText: formData.ctaText,
                iconName: formData.iconName || 'Star'
            };
            if (formData.id) newPersona.id = formData.id;
            await upsertPersona(newPersona);
        }
        
        showToast("Lưu thành công!", 'success');
        setIsEditing(false); 
        setFormData({});
        setEditingType(null);
        refreshData(); 

    } catch (error: any) {
        console.error("Error saving:", error);
        let errorMessage = "Đã có lỗi xảy ra.";
        if (error instanceof Error) {
            errorMessage = error.message;
        } else if (typeof error === 'object' && error !== null) {
            errorMessage = error.message || error.error_description || JSON.stringify(error);
        } else {
            errorMessage = String(error);
        }
        showToast(errorMessage, 'error');
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
    if (editingType === 'NEWS') {
        setFormData((prev: any) => ({ ...prev, summary: desc })); 
    } else if (editingType === 'TEAM') {
        setFormData((prev: any) => ({ ...prev, bio: desc }));
    } else {
        setFormData((prev: any) => ({ ...prev, description: desc }));
    }
    setIsGenerating(false);
  };

  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
      setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
      try {
          await updateLeadStatus(leadId, newStatus);
          showToast("Đã cập nhật trạng thái", 'success');
      } catch (e) {
          console.error("Failed to update status", e);
          refreshData();
          showToast("Lỗi cập nhật trạng thái", 'error');
      }
  };

  const newLeadsCount = leads.filter(l => l.status === LeadStatus.NEW || !l.status).length;

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans cursor-default">
      {/* Toast Notification Container */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Sync Indicator */}
      {isSyncing && (
          <div className="fixed bottom-4 right-4 bg-brand-yellow text-black px-4 py-2 rounded shadow-lg z-50 flex items-center gap-2 font-bold animate-in slide-in-from-bottom-5">
              <RefreshCw className="animate-spin" size={16} /> Đang xử lý...
          </div>
      )}

      <div className="flex h-screen flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-black border-r border-gray-800 flex flex-col shrink-0 z-20">
          <div className="p-6 border-b border-gray-800">
            <h2 className="text-2xl font-black text-brand-yellow flex items-center gap-2">
               DUHAVA <span className="text-xs bg-gray-800 text-gray-400 px-1 rounded">ADMIN</span>
            </h2>
          </div>
          <nav className="flex-1 p-4 space-y-2 overflow-x-auto md:overflow-visible flex md:flex-col gap-2">
            <button onClick={() => navigate('/')} className="w-full text-left px-4 py-3 rounded font-bold text-white hover:bg-gray-800 flex items-center gap-3 mb-4 border border-gray-700 shrink-0">
              <Home size={20} className="text-brand-yellow" /> <span className="hidden md:inline">Về Trang Chủ</span>
            </button>

            <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider hidden md:block">Quản Lý</div>

            <button onClick={() => setView(AdminView.LEADS)} className={`w-full text-left px-4 py-3 rounded font-bold shrink-0 flex justify-between items-center ${view === AdminView.LEADS ? 'bg-brand-yellow text-black shadow-glow' : 'text-gray-400 hover:bg-gray-800'}`}>
              <div className="flex items-center gap-3"><Users size={18} /> <span>Leads</span></div>
              {newLeadsCount > 0 && <span className="bg-red-500 text-white text-[10px] px-1.5 rounded-full animate-pulse">{newLeadsCount}</span>}
            </button>
            
            <button onClick={() => setView(AdminView.SERVICES)} className={`w-full text-left px-4 py-3 rounded font-bold shrink-0 flex items-center gap-3 ${view === AdminView.SERVICES ? 'bg-brand-yellow text-black' : 'text-gray-400 hover:bg-gray-800'}`}>
              <Sparkles size={18} /> Dịch Vụ
            </button>

            <button onClick={() => setView(AdminView.PROJECTS)} className={`w-full text-left px-4 py-3 rounded font-bold shrink-0 flex items-center gap-3 ${view === AdminView.PROJECTS ? 'bg-brand-yellow text-black' : 'text-gray-400 hover:bg-gray-800'}`}>
              <Briefcase size={18} /> Dự Án
            </button>

            <button onClick={() => setView(AdminView.NEWS)} className={`w-full text-left px-4 py-3 rounded font-bold shrink-0 flex items-center gap-3 ${view === AdminView.NEWS ? 'bg-brand-yellow text-black' : 'text-gray-400 hover:bg-gray-800'}`}>
              <FileText size={18} /> Tin Tức
            </button>

            <button onClick={() => setView(AdminView.TEAM)} className={`w-full text-left px-4 py-3 rounded font-bold shrink-0 flex items-center gap-3 ${view === AdminView.TEAM ? 'bg-brand-yellow text-black' : 'text-gray-400 hover:bg-gray-800'}`}>
              <UserCheck size={18} /> Đội Ngũ
            </button>

             <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider hidden md:block mt-6">Cấu Hình</div>
            
             <button onClick={() => setView(AdminView.COMPARISON)} className={`w-full text-left px-4 py-3 rounded font-bold shrink-0 flex items-center gap-3 ${view === AdminView.COMPARISON ? 'bg-brand-yellow text-black' : 'text-gray-400 hover:bg-gray-800'}`}>
              <Columns size={18} /> So Sánh
            </button>
             <button onClick={() => setView(AdminView.PERSONAS)} className={`w-full text-left px-4 py-3 rounded font-bold shrink-0 flex items-center gap-3 ${view === AdminView.PERSONAS ? 'bg-brand-yellow text-black' : 'text-gray-400 hover:bg-gray-800'}`}>
              <Target size={18} /> Personas
            </button>

            <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider hidden md:block mt-6">Hệ Thống</div>
            <button onClick={handleSeedData} className="w-full text-left px-4 py-3 rounded font-bold text-blue-400 hover:bg-blue-900/20 hover:text-blue-300 flex items-center gap-3 border border-dashed border-blue-900/50">
                <Database size={18} /> Khôi Phục Dữ Liệu
            </button>

          </nav>
          <div className="p-4 border-t border-gray-800 hidden md:block">
            <button onClick={onLogout} className="flex items-center gap-2 text-red-500 hover:text-red-400 font-bold w-full px-4 py-2 bg-red-500/5 hover:bg-red-500/10 rounded transition-colors">
              <LogOut size={18} /> Đăng Xuất
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative bg-gradient-to-br from-gray-900 to-black">
          {/* Mobile Logout */}
          <div className="md:hidden flex justify-end gap-2 mb-4">
               <button onClick={handleSeedData} className="text-blue-400 flex items-center gap-1 font-bold border border-blue-900 p-2 rounded bg-blue-900/20"><Database size={16} /></button>
               <button onClick={onLogout} className="text-red-500 flex items-center gap-1 font-bold border border-red-900 p-2 rounded bg-red-900/20"><LogOut size={16} /> Logout</button>
          </div>

          {/* ... (Existing Views Code remains largely the same, just rendering logic) ... */}
          {/* --- SERVICES VIEW --- */}
          {view === AdminView.SERVICES && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-black text-white">Quản Lý Dịch Vụ</h1>
                <button onClick={() => openModal('SERVICES')} className="bg-brand-yellow text-black px-4 py-2 rounded font-bold flex items-center gap-2"><Plus size={18}/> Thêm Mới</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {isLoading ? Array(3).fill(0).map((_,i) => <SkeletonRow key={i}/>) : services.map(s => (
                    <div key={s.id} className="bg-gray-800/50 p-5 rounded-xl border border-gray-700 hover:border-brand-yellow/50 transition-all">
                        <div className="h-32 rounded-lg bg-gray-700 mb-4 overflow-hidden relative group">
                            <img src={s.imageUrl} className="w-full h-full object-cover transition-transform group-hover:scale-110"/>
                        </div>
                        <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{s.description}</p>
                        <div className="flex gap-2">
                            <button onClick={() => openModal('SERVICES', s)} className="flex-1 bg-gray-700 hover:bg-blue-600 py-2 rounded text-xs font-bold">Sửa</button>
                            <button onClick={() => handleDelete('SERVICES', s.id)} className="flex-1 bg-gray-700 hover:bg-red-600 py-2 rounded text-xs font-bold flex items-center justify-center gap-1"><Trash2 size={12}/> Xóa</button>
                        </div>
                    </div>
                ))}
              </div>
            </div>
          )}

          {/* --- PROJECTS VIEW --- */}
          {view === AdminView.PROJECTS && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-black text-white">Quản Lý Dự Án</h1>
                <button onClick={() => openModal('PROJECTS')} className="bg-brand-yellow text-black px-4 py-2 rounded font-bold flex items-center gap-2"><Plus size={18}/> Thêm Mới</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {isLoading ? Array(2).fill(0).map((_,i) => <SkeletonRow key={i}/>) : projects.map(p => (
                    <div key={p.id} className="bg-gray-800/50 p-5 rounded-xl border border-gray-700 hover:border-brand-yellow/50 transition-all flex gap-4">
                        <div className="w-32 h-32 rounded-lg bg-gray-700 overflow-hidden shrink-0"><img src={p.imageUrl} className="w-full h-full object-cover"/></div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-xl font-bold">{p.title}</h3>
                                <span className="text-xs bg-brand-yellow text-black px-2 py-1 rounded font-bold">{p.result}</span>
                            </div>
                            <p className="text-gray-500 text-xs mb-2 uppercase font-bold">{p.client} • {p.category}</p>
                            <p className="text-gray-400 text-sm mb-4 line-clamp-2">{p.description}</p>
                            <div className="flex gap-2">
                                <button onClick={() => openModal('PROJECTS', p)} className="px-3 py-1 bg-gray-700 hover:bg-blue-600 rounded text-xs font-bold">Sửa</button>
                                <button onClick={() => handleDelete('PROJECTS', p.id)} className="px-3 py-1 bg-gray-700 hover:bg-red-600 rounded text-xs font-bold flex items-center justify-center gap-1"><Trash2 size={12}/> Xóa</button>
                            </div>
                        </div>
                    </div>
                ))}
              </div>
            </div>
          )}

          {/* --- NEWS VIEW --- */}
          {view === AdminView.NEWS && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-black text-white">Quản Lý Tin Tức</h1>
                <button onClick={() => openModal('NEWS')} className="bg-brand-yellow text-black px-4 py-2 rounded font-bold flex items-center gap-2"><Plus size={18}/> Thêm Mới</button>
              </div>
              <div className="space-y-4">
                {isLoading ? Array(3).fill(0).map((_,i) => <SkeletonRow key={i}/>) : news.map(n => (
                    <div key={n.id} className="bg-gray-800/50 p-5 rounded-xl border border-gray-700 hover:border-brand-yellow/50 transition-all flex gap-4 items-center">
                        <div className="w-24 h-24 rounded-lg bg-gray-700 overflow-hidden shrink-0"><img src={n.imageUrl} className="w-full h-full object-cover"/></div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-brand-yellow text-xs font-bold uppercase border border-brand-yellow/30 px-2 rounded">{n.category}</span>
                                <span className="text-gray-500 text-xs">{n.date}</span>
                            </div>
                            <h3 className="text-lg font-bold mb-1">{n.title}</h3>
                            <p className="text-gray-400 text-sm line-clamp-1">{n.summary}</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button onClick={() => openModal('NEWS', n)} className="px-3 py-1 bg-gray-700 hover:bg-blue-600 rounded text-xs font-bold text-center">Sửa</button>
                            <button onClick={() => handleDelete('NEWS', n.id)} className="px-3 py-1 bg-gray-700 hover:bg-red-600 rounded text-xs font-bold text-center flex items-center justify-center gap-1"><Trash2 size={12}/> Xóa</button>
                        </div>
                    </div>
                ))}
              </div>
            </div>
          )}

           {/* --- TEAM VIEW --- */}
           {view === AdminView.TEAM && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-black text-white">Quản Lý Đội Ngũ</h1>
                <button onClick={() => openModal('TEAM')} className="bg-brand-yellow text-black px-4 py-2 rounded font-bold flex items-center gap-2"><Plus size={18}/> Thêm Mới</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {isLoading ? Array(4).fill(0).map((_,i) => <SkeletonRow key={i}/>) : teamMembers.map(t => (
                    <div key={t.id} className="bg-gray-800/50 p-5 rounded-xl border border-gray-700 hover:border-brand-yellow/50 transition-all text-center">
                        <div className="w-24 h-24 rounded-full bg-gray-700 mx-auto mb-4 overflow-hidden border-2 border-gray-600">
                            <img src={t.imageUrl} className="w-full h-full object-cover"/>
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1">{t.name}</h3>
                        <p className="text-brand-yellow text-xs font-bold uppercase tracking-wider mb-2">{t.role}</p>
                        <p className="text-gray-400 text-xs mb-4 line-clamp-3">{t.bio}</p>
                        <div className="flex gap-2">
                            <button onClick={() => openModal('TEAM', t)} className="flex-1 bg-gray-700 hover:bg-blue-600 py-2 rounded text-xs font-bold">Sửa</button>
                            <button onClick={() => handleDelete('TEAM', t.id)} className="flex-1 bg-gray-700 hover:bg-red-600 py-2 rounded text-xs font-bold flex items-center justify-center gap-1"><Trash2 size={12}/> Xóa</button>
                        </div>
                    </div>
                ))}
              </div>
            </div>
          )}
          
          {/* --- COMPARISON VIEW --- */}
           {view === AdminView.COMPARISON && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-black text-white">Bảng So Sánh</h1>
                <button onClick={() => openModal('COMPARISON')} className="bg-brand-yellow text-black px-4 py-2 rounded font-bold flex items-center gap-2"><Plus size={18}/> Thêm Mới</button>
              </div>
              <div className="overflow-x-auto bg-gray-800/50 rounded-xl border border-gray-700">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-800 text-gray-400 text-xs uppercase">
                            <th className="p-4">Tiêu Chí</th>
                            <th className="p-4 text-brand-yellow">DUHAVA</th>
                            <th className="p-4">Agency Khác</th>
                            <th className="p-4">Freelancer</th>
                            <th className="p-4 text-center">Thứ tự</th>
                            <th className="p-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                        {comparisons.map(c => (
                            <tr key={c.id} className="hover:bg-gray-700/30">
                                <td className="p-4 font-bold">{c.criterion}</td>
                                <td className="p-4 text-brand-yellow font-bold">{c.duhavaValue === 'TRUE' ? <div className="flex items-center gap-1"><Sparkles size={14}/> Có</div> : c.duhavaValue}</td>
                                <td className="p-4 text-gray-400">{c.agencyValue}</td>
                                <td className="p-4 text-gray-500">{c.freelanceValue}</td>
                                <td className="p-4 text-center">{c.sortOrder}</td>
                                <td className="p-4 text-right flex justify-end gap-2">
                                    <button onClick={() => openModal('COMPARISON', c)} className="p-1 bg-gray-700 hover:bg-blue-600 rounded"><Sparkles size={14}/></button>
                                    <button onClick={() => handleDelete('COMPARISON', c.id)} className="p-1 bg-gray-700 hover:bg-red-600 rounded"><Trash2 size={14}/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
              </div>
            </div>
          )}

          {/* --- PERSONAS VIEW --- */}
           {view === AdminView.PERSONAS && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-black text-white">Quản Lý Personas</h1>
                <button onClick={() => openModal('PERSONAS')} className="bg-brand-yellow text-black px-4 py-2 rounded font-bold flex items-center gap-2"><Plus size={18}/> Thêm Mới</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {personas.map(p => (
                    <div key={p.id} className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 relative group">
                        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => openModal('PERSONAS', p)} className="p-1 bg-blue-600 rounded text-white"><Sparkles size={14}/></button>
                            <button onClick={() => handleDelete('PERSONAS', p.id)} className="p-1 bg-red-600 rounded text-white"><Trash2 size={14}/></button>
                        </div>
                        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">{p.keyName}</div>
                        <h3 className="text-xl font-bold text-white mb-2">{p.title}</h3>
                        <p className="text-sm text-gray-400 mb-4 h-12 overflow-hidden">{p.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            {p.focusTags.map((tag, i) => (
                                <span key={i} className="text-[10px] bg-brand-yellow/10 text-brand-yellow px-2 py-1 rounded border border-brand-yellow/20">{tag}</span>
                            ))}
                        </div>
                        <div className="text-xs bg-gray-900 p-2 rounded text-center text-gray-500">CTA: {p.ctaText}</div>
                    </div>
                ))}
              </div>
            </div>
          )}


          {/* --- LEADS VIEW --- */}
          {view === AdminView.LEADS && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h1 className="text-3xl font-black text-white mb-8">Khách Hàng Tiềm Năng</h1>
              <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-800 text-gray-400 text-xs uppercase">
                                <th className="p-4">Trạng Thái</th>
                                <th className="p-4">Họ Tên</th>
                                <th className="p-4">Liên Hệ</th>
                                <th className="p-4">Nhu Cầu</th>
                                <th className="p-4">Ngày Gửi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {leads.length === 0 ? (
                                <tr><td colSpan={5} className="p-8 text-center text-gray-500">Chưa có dữ liệu khách hàng</td></tr>
                            ) : leads.map(lead => (
                                <tr key={lead.id} className="hover:bg-gray-700/30 transition-colors">
                                    <td className="p-4">
                                        <select 
                                            value={lead.status || LeadStatus.NEW}
                                            onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                                            className={`text-xs font-bold px-2 py-1 rounded border-none outline-none cursor-pointer
                                                ${lead.status === LeadStatus.NEW || !lead.status ? 'bg-red-500/20 text-red-500' : ''}
                                                ${lead.status === LeadStatus.CONTACTED ? 'bg-yellow-500/20 text-yellow-500' : ''}
                                                ${lead.status === LeadStatus.CLOSED ? 'bg-green-500/20 text-green-500' : ''}
                                                ${lead.status === LeadStatus.LOST ? 'bg-gray-500/20 text-gray-500' : ''}
                                            `}
                                        >
                                            <option value={LeadStatus.NEW}>MỚI</option>
                                            <option value={LeadStatus.CONTACTED}>ĐÃ LIÊN HỆ</option>
                                            <option value={LeadStatus.CLOSED}>CHỐT ĐƠN</option>
                                            <option value={LeadStatus.LOST}>HỦY / MẤT</option>
                                        </select>
                                    </td>
                                    <td className="p-4 font-bold">{lead.name}</td>
                                    <td className="p-4 text-sm">
                                        <div className="text-white">{lead.phone}</div>
                                        <div className="text-gray-500">{lead.email}</div>
                                    </td>
                                    <td className="p-4 text-sm text-gray-300 max-w-xs truncate">{lead.details}</td>
                                    <td className="p-4 text-xs text-gray-500">{lead.createdAt ? new Date(lead.createdAt).toLocaleDateString('vi-VN') : 'N/A'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* --- EDIT MODAL --- */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-gray-900 border border-gray-700 w-full max-w-2xl rounded-xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
                    <h2 className="text-2xl font-black uppercase text-white">
                        {formData.id ? 'Chỉnh Sửa' : 'Thêm Mới'}
                    </h2>
                    <button onClick={() => setIsEditing(false)}><X className="text-gray-500 hover:text-white" /></button>
                </div>

                <div className="space-y-4">
                    {/* Common: Title/Name */}
                    {(editingType === 'SERVICES' || editingType === 'PROJECTS' || editingType === 'NEWS' || editingType === 'TEAM' || editingType === 'PERSONAS') && (
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">{editingType === 'TEAM' ? 'Tên (Name)' : 'Tiêu Đề (Title)'}</label>
                            <input className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-brand-yellow outline-none"
                                value={editingType === 'TEAM' ? (formData.name || '') : (formData.title || '')}
                                onChange={e => (editingType === 'TEAM') ? setFormData({...formData, name: e.target.value}) : setFormData({...formData, title: e.target.value})}
                            />
                        </div>
                    )}

                    {/* Image URL logic */}
                    {(editingType === 'SERVICES' || editingType === 'PROJECTS' || editingType === 'NEWS' || editingType === 'TEAM') && (
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1 flex justify-between items-center">
                                <span>Hình Ảnh / Logo</span>
                                {isUploading && <span className="text-brand-yellow animate-pulse flex items-center gap-1"><Loader2 size={12} className="animate-spin"/> Uploading...</span>}
                            </label>
                            
                            <div className="flex gap-4 items-start">
                                {/* Preview */}
                                <div className="w-24 h-24 bg-gray-800 rounded border border-gray-700 flex items-center justify-center overflow-hidden shrink-0 relative group">
                                    {(formData.imageUrl || formData.logoUrl) ? (
                                        <img src={formData.imageUrl || formData.logoUrl} className="w-full h-full object-cover" />
                                    ) : (
                                        <span className="text-xs text-gray-500">No Image</span>
                                    )}
                                </div>

                                <div className="flex-1 space-y-2">
                                    {/* File Input */}
                                    <div className="relative">
                                        <input 
                                            type="file" 
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden" 
                                            id="file-upload"
                                            disabled={isUploading}
                                        />
                                        <label htmlFor="file-upload" className="cursor-pointer flex items-center justify-center gap-2 w-full bg-gray-800 hover:bg-gray-700 text-white py-2 rounded border border-gray-600 transition-colors text-sm font-bold">
                                            <Upload size={16} /> Tải Ảnh Lên
                                        </label>
                                    </div>

                                    {/* Manual URL Input (Fallback) */}
                                    <input className="w-full bg-black border border-gray-700 rounded p-2 text-white text-xs focus:border-brand-yellow outline-none"
                                        value={formData.imageUrl || formData.logoUrl || ''}
                                        onChange={e => {
                                            const val = e.target.value;
                                            setFormData({...formData, imageUrl: val});
                                        }}
                                        placeholder="Hoặc dán link ảnh..."
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {/* COMPARISON Specific */}
                    {editingType === 'COMPARISON' && (
                        <>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Tiêu Chí (Criterion)</label>
                                <input className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-brand-yellow outline-none"
                                    value={formData.criterion || ''}
                                    onChange={e => setFormData({...formData, criterion: e.target.value})}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-brand-yellow uppercase mb-1">Duhava (Value)</label>
                                    <input className="w-full bg-black border border-brand-yellow/50 rounded p-3 text-white focus:border-brand-yellow outline-none"
                                        value={formData.duhavaValue || ''}
                                        onChange={e => setFormData({...formData, duhavaValue: e.target.value})}
                                        placeholder="Nhập 'TRUE' nếu muốn hiện dấu tích"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Agency Khác</label>
                                    <input className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-brand-yellow outline-none"
                                        value={formData.agencyValue || ''}
                                        onChange={e => setFormData({...formData, agencyValue: e.target.value})}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Freelancer</label>
                                    <input className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-brand-yellow outline-none"
                                        value={formData.freelanceValue || ''}
                                        onChange={e => setFormData({...formData, freelanceValue: e.target.value})}
                                    />
                                </div>
                                 <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Thứ tự</label>
                                    <input type="number" className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-brand-yellow outline-none"
                                        value={formData.sortOrder || 0}
                                        onChange={e => setFormData({...formData, sortOrder: e.target.value})}
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {/* PERSONAS Specific */}
                    {editingType === 'PERSONAS' && (
                        <>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Mã (Key Name)</label>
                                    <input className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-brand-yellow outline-none"
                                        value={formData.keyName || ''}
                                        onChange={e => setFormData({...formData, keyName: e.target.value})}
                                        placeholder="STARTUP / SME / ENTERPRISE"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nút CTA</label>
                                    <input className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-brand-yellow outline-none"
                                        value={formData.ctaText || ''}
                                        onChange={e => setFormData({...formData, ctaText: e.target.value})}
                                    />
                                </div>
                            </div>
                             <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Tags (Cách nhau bằng dấu phẩy)</label>
                                <input className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-brand-yellow outline-none"
                                    value={Array.isArray(formData.focusTags) ? formData.focusTags.join(', ') : formData.focusTags || ''}
                                    onChange={e => setFormData({...formData, focusTags: e.target.value})}
                                    placeholder="SEO, Ads, Branding..."
                                />
                            </div>
                        </>
                    )}

                    {/* Specific: TEAM Fields */}
                    {editingType === 'TEAM' && (
                         <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Chức Vụ (Role)</label>
                            <input className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-brand-yellow outline-none"
                                value={formData.role || ''}
                                onChange={e => setFormData({...formData, role: e.target.value})}
                            />
                        </div>
                    )}

                    {/* Specific: PROJECT Fields */}
                    {editingType === 'PROJECTS' && (
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Khách Hàng (Client)</label>
                                <input className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-brand-yellow outline-none"
                                    value={formData.client || ''}
                                    onChange={e => setFormData({...formData, client: e.target.value})}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Kết Quả (Result)</label>
                                <input className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-brand-yellow outline-none"
                                    value={formData.result || ''}
                                    onChange={e => setFormData({...formData, result: e.target.value})}
                                    placeholder="+200% Doanh số..."
                                />
                            </div>
                             <div className="col-span-2">
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Danh Mục</label>
                                <input className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-brand-yellow outline-none"
                                    value={formData.category || ''}
                                    onChange={e => setFormData({...formData, category: e.target.value})}
                                />
                            </div>
                        </div>
                    )}

                    {/* Specific: NEWS Fields */}
                    {editingType === 'NEWS' && (
                        <div className="grid grid-cols-2 gap-4">
                             <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Danh Mục</label>
                                <input className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-brand-yellow outline-none"
                                    value={formData.category || ''}
                                    onChange={e => setFormData({...formData, category: e.target.value})}
                                />
                            </div>
                             <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Ngày Đăng</label>
                                <input type="date" className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-brand-yellow outline-none"
                                    value={formData.date || ''}
                                    onChange={e => setFormData({...formData, date: e.target.value})}
                                />
                            </div>
                        </div>
                    )}

                    {/* Description / Summary / Bio (Supports AI) */}
                    {(editingType === 'SERVICES' || editingType === 'PROJECTS' || editingType === 'NEWS' || editingType === 'TEAM' || editingType === 'PERSONAS') && (
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label className="block text-xs font-bold text-gray-500 uppercase">
                                    {editingType === 'NEWS' ? 'Mô Tả Ngắn (Summary)' : editingType === 'TEAM' ? 'Tiểu Sử (Bio)' : 'Mô Tả (Description)'}
                                </label>
                                <button onClick={handleGenerateAI} disabled={isGenerating} className="text-brand-yellow text-xs font-bold flex items-center gap-1 hover:bg-brand-yellow/10 px-2 py-1 rounded transition-colors">
                                    {isGenerating ? <Loader2 className="animate-spin" size={12}/> : <Sparkles size={12} />}
                                    {isGenerating ? 'Đang viết...' : 'Viết bằng AI'}
                                </button>
                            </div>
                            <textarea className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-brand-yellow outline-none h-24"
                                value={editingType === 'NEWS' ? (formData.summary || '') : editingType === 'TEAM' ? (formData.bio || '') : (formData.description || '')}
                                onChange={e => editingType === 'NEWS' ? setFormData({...formData, summary: e.target.value}) : editingType === 'TEAM' ? setFormData({...formData, bio: e.target.value}) : setFormData({...formData, description: e.target.value})}
                            />
                        </div>
                    )}

                     {/* Specific: NEWS Content (Long Text) */}
                     {editingType === 'NEWS' && (
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nội Dung Chi Tiết (Full Content)</label>
                            <textarea className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-brand-yellow outline-none h-64 font-mono text-sm"
                                value={formData.content || ''}
                                onChange={e => setFormData({...formData, content: e.target.value})}
                                placeholder="Viết nội dung chi tiết bài báo ở đây..."
                            />
                        </div>
                    )}

                    <button onClick={handleSave} disabled={isUploading || isSyncing} className="w-full bg-brand-yellow text-black font-black uppercase py-3 rounded hover:bg-white transition-colors mt-4 disabled:opacity-50">
                        {isSyncing ? 'Đang Lưu...' : 'Lưu Lại'}
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;