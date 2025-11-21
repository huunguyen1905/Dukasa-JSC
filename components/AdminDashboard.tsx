
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Service, Lead, Project, NewsItem, AdminView, LeadStatus } from '../types';
import { getServices, saveServices, getProjects, saveProjects, getNews, saveNews, getLeads, updateLead } from '../services/storage';
import { updateCloudServices, updateCloudProjects, updateCloudNews } from '../services/googleSheetService';
import { generateServiceDescription } from '../services/geminiService';
import { Trash2, Edit, Plus, X, Sparkles, LogOut, Loader2, Home, Users, Briefcase, FileText, RefreshCw, Calendar, Image as ImageIcon, CheckCircle, XCircle, Clock } from 'lucide-react';

interface AdminDashboardProps {
  onLogout: () => void;
}

const SkeletonRow = () => (
  <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 animate-pulse h-full flex flex-col mb-4">
    <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
    <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
  </div>
);

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const [view, setView] = useState<AdminView>(AdminView.LEADS);
  
  // Data States
  const [services, setServices] = useState<Service[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  
  // UI States
  const [isEditing, setIsEditing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  
  // Edit Form States
  const [editingType, setEditingType] = useState<'SERVICE' | 'PROJECT' | 'NEWS' | null>(null);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setServices(getServices());
      setProjects(getProjects());
      setNews(getNews());
      setLeads(getLeads());
      setIsLoading(false);
    };
    loadData();
  }, []);

  // --- Handlers ---

  const handleDelete = async (type: 'SERVICE' | 'PROJECT' | 'NEWS', id: string) => {
    if (!confirm('Bạn có chắc muốn xóa mục này? Hành động này sẽ đồng bộ lên Cloud.')) return;
    
    setIsSyncing(true);

    if (type === 'SERVICE') {
      const updated = services.filter(s => s.id !== id);
      setServices(updated);
      saveServices(updated);
      await updateCloudServices(updated);
    } else if (type === 'PROJECT') {
      const updated = projects.filter(p => p.id !== id);
      setProjects(updated);
      saveProjects(updated);
      await updateCloudProjects(updated);
    } else if (type === 'NEWS') {
      const updated = news.filter(n => n.id !== id);
      setNews(updated);
      saveNews(updated);
      await updateCloudNews(updated);
    }

    setIsSyncing(false);
  };

  const openModal = (type: 'SERVICE' | 'PROJECT' | 'NEWS', item?: any) => {
    setEditingType(type);
    setFormData(item || {}); 
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsEditing(false); 
    setIsSyncing(true);

    try {
        if (editingType === 'SERVICE') {
            const newService: Service = {
                id: formData.id || Date.now().toString(),
                title: formData.title,
                description: formData.description,
                icon: 'Star',
                imageUrl: formData.imageUrl || `https://picsum.photos/800/600?random=${Date.now()}`
            };
            const updated = formData.id 
                ? services.map(s => s.id === formData.id ? newService : s)
                : [...services, newService];
            setServices(updated);
            saveServices(updated);
            await updateCloudServices(updated);

        } else if (editingType === 'PROJECT') {
            const newProject: Project = {
                id: formData.id || Date.now().toString(),
                title: formData.title,
                client: formData.client,
                category: formData.category,
                result: formData.result,
                description: formData.description,
                imageUrl: formData.imageUrl || `https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800`
            };
            const updated = formData.id
                ? projects.map(p => p.id === formData.id ? newProject : p)
                : [...projects, newProject];
            setProjects(updated);
            saveProjects(updated);
            await updateCloudProjects(updated);

        } else if (editingType === 'NEWS') {
            const newNews: NewsItem = {
                id: formData.id || Date.now().toString(),
                title: formData.title,
                category: formData.category,
                summary: formData.summary,
                content: formData.content || formData.summary, // Save full content
                date: formData.date || new Date().toISOString().split('T')[0],
                imageUrl: formData.imageUrl || `https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800`
            };
            const updated = formData.id
                ? news.map(n => n.id === formData.id ? newNews : n)
                : [newNews, ...news];
            setNews(updated);
            saveNews(updated);
            await updateCloudNews(updated);
        }
    } catch (error) {
        console.error("Error saving/syncing:", error);
        alert("Lỗi đồng bộ Cloud. Dữ liệu đã được lưu cục bộ.");
    } finally {
        setIsSyncing(false);
        setFormData({});
        setEditingType(null);
    }
  };

  const handleGenerateAI = async () => {
    if (!formData.title) {
      alert("Vui lòng nhập tiêu đề trước.");
      return;
    }
    setIsGenerating(true);
    const desc = await generateServiceDescription(formData.title);
    if (editingType === 'NEWS') {
        setFormData((prev: any) => ({ ...prev, summary: desc })); 
    } else {
        setFormData((prev: any) => ({ ...prev, description: desc }));
    }
    setIsGenerating(false);
  };

  const handleStatusChange = (leadId: string, newStatus: LeadStatus) => {
      const lead = leads.find(l => l.id === leadId);
      if (lead) {
          const updatedLead = { ...lead, status: newStatus };
          updateLead(updatedLead);
          setLeads(prev => prev.map(l => l.id === leadId ? updatedLead : l));
      }
  };

  const newLeadsCount = leads.filter(l => l.status === LeadStatus.NEW).length;

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans cursor-default">
      {/* Sync Indicator */}
      {isSyncing && (
          <div className="fixed bottom-4 right-4 bg-brand-yellow text-black px-4 py-2 rounded shadow-lg z-50 flex items-center gap-2 font-bold animate-in slide-in-from-bottom-5">
              <RefreshCw className="animate-spin" size={16} /> Đang đồng bộ Cloud...
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
          <div className="md:hidden flex justify-end mb-4">
               <button onClick={onLogout} className="text-red-500 flex items-center gap-1 font-bold border border-red-900 p-2 rounded bg-red-900/20"><LogOut size={16} /> Logout</button>
          </div>

          {/* --- SERVICES VIEW --- */}
          {view === AdminView.SERVICES && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-black text-white">Quản Lý Dịch Vụ</h1>
                <button onClick={() => openModal('SERVICE')} className="bg-brand-yellow text-black px-4 py-2 rounded font-bold flex items-center gap-2"><Plus size={18}/> Thêm Mới</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {isLoading ? Array(3).fill(0).map((_,i) => <SkeletonRow key={i}/>) : services.map(s => (
                    <div key={s.id} className="bg-gray-800/50 p-5 rounded-xl border border-gray-700 hover:border-brand-yellow/50 transition-all">
                        <div className="h-32 rounded-lg bg-gray-700 mb-4 overflow-hidden"><img src={s.imageUrl} className="w-full h-full object-cover"/></div>
                        <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{s.description}</p>
                        <div className="flex gap-2">
                            <button onClick={() => openModal('SERVICE', s)} className="flex-1 bg-gray-700 hover:bg-blue-600 py-2 rounded text-xs font-bold">Sửa</button>
                            <button onClick={() => handleDelete('SERVICE', s.id)} className="flex-1 bg-gray-700 hover:bg-red-600 py-2 rounded text-xs font-bold">Xóa</button>
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
                <button onClick={() => openModal('PROJECT')} className="bg-brand-yellow text-black px-4 py-2 rounded font-bold flex items-center gap-2"><Plus size={18}/> Thêm Mới</button>
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
                                <button onClick={() => openModal('PROJECT', p)} className="px-3 py-1 bg-gray-700 hover:bg-blue-600 rounded text-xs font-bold">Sửa</button>
                                <button onClick={() => handleDelete('PROJECT', p.id)} className="px-3 py-1 bg-gray-700 hover:bg-red-600 rounded text-xs font-bold">Xóa</button>
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
                            <button onClick={() => handleDelete('NEWS', n.id)} className="px-3 py-1 bg-gray-700 hover:bg-red-600 rounded text-xs font-bold text-center">Xóa</button>
                        </div>
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
                                                ${lead.status === LeadStatus.NEW ? 'bg-red-500/20 text-red-500' : ''}
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
                                    <td className="p-4 text-xs text-gray-500">{new Date(lead.createdAt).toLocaleDateString('vi-VN')}</td>
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
                        {formData.id ? 'Chỉnh Sửa' : 'Thêm Mới'} {editingType === 'SERVICE' ? 'Dịch Vụ' : editingType === 'PROJECT' ? 'Dự Án' : 'Tin Tức'}
                    </h2>
                    <button onClick={() => setIsEditing(false)}><X className="text-gray-500 hover:text-white" /></button>
                </div>

                <div className="space-y-4">
                    {/* Common: Title */}
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Tiêu Đề</label>
                        <input className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-brand-yellow outline-none"
                            value={formData.title || ''}
                            onChange={e => setFormData({...formData, title: e.target.value})}
                        />
                    </div>

                    {/* Common: Image URL */}
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase mb-1 flex justify-between">
                            <span>Link Ảnh</span>
                            <a href="https://unsplash.com/" target="_blank" className="text-brand-yellow hover:underline lowercase font-normal">tìm ảnh đẹp</a>
                        </label>
                        <div className="flex gap-2">
                            <input className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-brand-yellow outline-none"
                                value={formData.imageUrl || ''}
                                onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                                placeholder="https://..."
                            />
                            {formData.imageUrl && <img src={formData.imageUrl} className="w-12 h-12 rounded object-cover border border-gray-700" />}
                        </div>
                    </div>

                    {/* Specific: PROJECT Fields */}
                    {editingType === 'PROJECT' && (
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

                    {/* Description / Summary (Supports AI) */}
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label className="block text-xs font-bold text-gray-500 uppercase">
                                {editingType === 'NEWS' ? 'Mô Tả Ngắn (Summary)' : 'Mô Tả (Description)'}
                            </label>
                            <button onClick={handleGenerateAI} disabled={isGenerating} className="text-brand-yellow text-xs font-bold flex items-center gap-1 hover:bg-brand-yellow/10 px-2 py-1 rounded transition-colors">
                                {isGenerating ? <Loader2 className="animate-spin" size={12}/> : <Sparkles size={12} />}
                                {isGenerating ? 'Đang viết...' : 'Viết bằng AI'}
                            </button>
                        </div>
                        <textarea className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-brand-yellow outline-none h-24"
                            value={editingType === 'NEWS' ? (formData.summary || '') : (formData.description || '')}
                            onChange={e => editingType === 'NEWS' ? setFormData({...formData, summary: e.target.value}) : setFormData({...formData, description: e.target.value})}
                        />
                    </div>

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

                    <button onClick={handleSave} className="w-full bg-brand-yellow text-black font-black uppercase py-3 rounded hover:bg-white transition-colors mt-4">
                        Lưu Lại
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
