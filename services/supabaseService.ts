
import { supabase } from './supabaseClient';
import { Service, Project, NewsItem, Lead, LeadStatus, TeamMember, ClientPartner, ComparisonItem, Persona, GalleryImage } from '../types';
import { MOCK_TEAM, MOCK_SERVICES, MOCK_PROJECTS, MOCK_NEWS } from '../data/mockData';

// --- Local Storage Keys ---
const LS_KEYS = {
    SERVICES: 'duhava_ls_services_v3', // Bump version to force refresh
    PROJECTS: 'duhava_ls_projects',
    NEWS: 'duhava_ls_news',
    TEAM: 'duhava_ls_team',
    LEADS: 'duhava_ls_leads',
    PARTNERS: 'duhava_ls_partners',
    COMPARISON: 'duhava_ls_comparison',
    PERSONAS: 'duhava_ls_personas',
    GALLERY: 'duhava_ls_gallery'
};

// --- Helpers ---

const generateUUID = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

// --- Mappers (Snake_case DB -> CamelCase App) ---

const mapService = (data: any): Service => ({
    id: data.id,
    title: data.title,
    description: data.description,
    icon: data.icon || 'Star',
    imageUrl: data.image_url
});

const mapProject = (data: any): Project => ({
    id: data.id,
    title: data.title,
    client: data.client,
    category: data.category,
    imageUrl: data.image_url,
    result: data.result,
    description: data.description
});

const mapNews = (data: any): NewsItem => ({
    id: data.id,
    title: data.title,
    category: data.category,
    summary: data.summary,
    content: data.content,
    imageUrl: data.image_url,
    date: data.date
});

const mapTeamMember = (data: any): TeamMember => ({
    id: data.id,
    name: data.name,
    role: data.role,
    imageUrl: data.image_url,
    bio: data.bio
});

const mapLead = (data: any): Lead => ({
    id: data.id,
    name: data.name,
    email: data.email,
    phone: data.phone,
    details: data.details,
    status: data.status as LeadStatus,
    createdAt: data.created_at
});

const mapPartner = (data: any): ClientPartner => ({
    id: data.id,
    name: data.name,
    logoUrl: data.logo_url,
    sortOrder: data.sort_order
});

const mapComparison = (data: any): ComparisonItem => ({
    id: data.id,
    criterion: data.criterion,
    duhavaValue: data.duhava_value,
    agencyValue: data.agency_value,
    freelanceValue: data.freelance_value,
    sortOrder: data.sort_order
});

const mapPersona = (data: any): Persona => ({
    id: data.id,
    keyName: data.key_name,
    title: data.title,
    description: data.description,
    focusTags: data.focus_tags || [],
    ctaText: data.cta_text,
    iconName: data.icon_name
});

const mapGalleryImage = (data: any): GalleryImage => ({
    id: data.id,
    imageUrl: data.image_url,
    caption: data.caption,
    sortOrder: data.sort_order
});

// --- Storage Operations ---

export const uploadImage = async (file: File): Promise<string | null> => {
    try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage.from('content').upload(filePath, file);

        if (uploadError) {
            console.error('Error uploading image (Supabase):', uploadError);
            throw uploadError;
        }

        const { data } = supabase.storage.from('content').getPublicUrl(filePath);
        return data.publicUrl;
    } catch (error) {
        console.warn('Upload failed, using Fake URL for demo:', error);
        // Fallback: Create a fake local URL so the UI doesn't break
        return URL.createObjectURL(file);
    }
};

// --- GENERIC CRUD FALLBACK HELPERS ---

async function fetchWithFallback<T>(
    tableName: string, 
    lsKey: string, 
    mapper: (data: any) => T, 
    mockData: T[]
): Promise<T[]> {
    try {
        const { data, error } = await supabase.from(tableName).select('*').order('created_at', { ascending: true });
        if (error) throw error;
        // Merge strategy: If DB is empty, use Mock data. If DB has data, prefer DB.
        if (!data || data.length === 0) {
             // console.warn(`[Supabase] Table ${tableName} is empty. Using Mock Data.`);
             return mockData;
        }
        return data.map(mapper);
    } catch (error: any) {
        console.warn(`[Supabase Offline] Fetching ${tableName} from LocalStorage/Mock.`);
        const local = localStorage.getItem(lsKey);
        if (local) {
            return JSON.parse(local);
        }
        // Initialize LS with Mock Data if empty
        localStorage.setItem(lsKey, JSON.stringify(mockData));
        return mockData;
    }
}

async function upsertWithFallback<T extends { id: string }>(
    tableName: string, 
    lsKey: string, 
    item: Partial<T>, 
    payloadMapper: (i: Partial<T>) => any,
    currentDataFetcher: () => Promise<T[]>
) {
    // Ensure ID exists
    const itemWithId = { ...item, id: item.id || generateUUID() };
    const payload = payloadMapper(itemWithId);

    try {
        const { error } = await supabase.from(tableName).upsert(payload);
        if (error) throw error;
    } catch (error) {
        console.warn(`[Supabase Offline] Saving ${tableName} to LocalStorage.`);
        const currentData = await currentDataFetcher();
        const index = currentData.findIndex(d => d.id === itemWithId.id);
        
        let updatedData;
        if (index > -1) {
            // Update
            updatedData = currentData.map(d => d.id === itemWithId.id ? { ...d, ...itemWithId } : d);
        } else {
            // Insert
            updatedData = [itemWithId as T, ...currentData];
        }
        localStorage.setItem(lsKey, JSON.stringify(updatedData));
    }
}

async function deleteWithFallback(
    tableName: string, 
    lsKey: string, 
    id: string,
    currentDataFetcher: () => Promise<any[]>
) {
    try {
        const { error } = await supabase.from(tableName).delete().eq('id', id);
        if (error) throw error;
    } catch (error) {
        console.warn(`[Supabase Offline] Deleting ${id} from LocalStorage.`);
        const currentData = await currentDataFetcher();
        const updatedData = currentData.filter(d => d.id !== id);
        localStorage.setItem(lsKey, JSON.stringify(updatedData));
    }
}

// --- Services Operations ---

// SPECIAL: Customized fetchServices to ALWAYS merge MOCK_SERVICES (the new ones) 
// with whatever is in the Database. This ensures Chatbot, AI, etc always show up.
export const fetchServices = async (): Promise<Service[]> => {
    let services: Service[] = [];
    
    // 1. Try Fetch from DB
    try {
        const { data, error } = await supabase.from('services').select('*').order('created_at', { ascending: true });
        if (!error && data && data.length > 0) {
            services = data.map(mapService);
        }
    } catch (e) {
        console.warn("DB Fetch failed, checking LocalStorage");
    }

    // 2. Fallback to LocalStorage if DB failed/empty
    if (services.length === 0) {
        const local = localStorage.getItem(LS_KEYS.SERVICES);
        if (local) {
            services = JSON.parse(local);
        }
    }

    // 3. SMART MERGE: Ensure MOCK_SERVICES (especially new ones) are present
    // If a service ID in MOCK_SERVICES is missing from the fetched list, add it.
    const currentIds = new Set(services.map(s => s.id));
    const missingServices = MOCK_SERVICES.filter(m => !currentIds.has(m.id));
    
    const finalServices = [...services, ...missingServices];

    // 4. Update LocalStorage with the complete list
    localStorage.setItem(LS_KEYS.SERVICES, JSON.stringify(finalServices));

    return finalServices;
};

export const upsertService = (service: Partial<Service>) => upsertWithFallback(
    'services', LS_KEYS.SERVICES, service, 
    (s) => ({
        id: s.id,
        title: s.title,
        description: s.description,
        icon: s.icon,
        image_url: s.imageUrl
    }),
    fetchServices
);

export const deleteService = (id: string) => deleteWithFallback('services', LS_KEYS.SERVICES, id, fetchServices);

// --- Projects Operations ---

export const fetchProjects = () => fetchWithFallback('projects', LS_KEYS.PROJECTS, mapProject, MOCK_PROJECTS);

export const upsertProject = (project: Partial<Project>) => upsertWithFallback(
    'projects', LS_KEYS.PROJECTS, project,
    (p) => ({
        id: p.id,
        title: p.title,
        client: p.client,
        category: p.category,
        image_url: p.imageUrl,
        result: p.result,
        description: p.description
    }),
    fetchProjects
);

export const deleteProject = (id: string) => deleteWithFallback('projects', LS_KEYS.PROJECTS, id, fetchProjects);

// --- News Operations ---

export const fetchNews = () => fetchWithFallback('news', LS_KEYS.NEWS, mapNews, MOCK_NEWS);

export const upsertNews = (news: Partial<NewsItem>) => upsertWithFallback(
    'news', LS_KEYS.NEWS, news,
    (n) => ({
        id: n.id,
        title: n.title,
        category: n.category,
        summary: n.summary,
        content: n.content,
        image_url: n.imageUrl,
        date: n.date
    }),
    fetchNews
);

export const deleteNews = (id: string) => deleteWithFallback('news', LS_KEYS.NEWS, id, fetchNews);

// --- Team Operations ---

export const fetchTeamMembers = () => fetchWithFallback('team_members', LS_KEYS.TEAM, mapTeamMember, MOCK_TEAM);

export const upsertTeamMember = (member: Partial<TeamMember>) => upsertWithFallback(
    'team_members', LS_KEYS.TEAM, member,
    (m) => ({
        id: m.id,
        name: m.name,
        role: m.role,
        image_url: m.imageUrl,
        bio: m.bio
    }),
    fetchTeamMembers
);

export const deleteTeamMember = (id: string) => deleteWithFallback('team_members', LS_KEYS.TEAM, id, fetchTeamMembers);

// --- Leads Operations ---

export const fetchLeads = async (): Promise<Lead[]> => {
    try {
        const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
        if (error) throw error;
        return (data || []).map(mapLead);
    } catch (error) {
        console.warn('[Supabase Offline] Fetching Leads from LS');
        const local = localStorage.getItem(LS_KEYS.LEADS);
        return local ? JSON.parse(local) : [];
    }
};

export const createLead = async (lead: Partial<Lead>) => {
    const newLead = { ...lead, id: lead.id || generateUUID(), created_at: new Date().toISOString(), status: 'NEW' };
    
    try {
        const payload = {
            id: newLead.id,
            name: newLead.name,
            email: newLead.email,
            phone: newLead.phone,
            details: newLead.details,
            status: newLead.status,
            created_at: newLead.created_at
        };
        const { error } = await supabase.from('leads').insert(payload);
        if (error) throw error;
    } catch (error) {
        console.warn('[Supabase Offline] Saving Lead to LS');
        const current = await fetchLeads();
        const updated = [newLead as Lead, ...current];
        localStorage.setItem(LS_KEYS.LEADS, JSON.stringify(updated));
    }
};

export const updateLeadStatus = async (id: string, status: string) => {
    try {
        const { error } = await supabase.from('leads').update({ status }).eq('id', id);
        if (error) throw error;
    } catch (error) {
        const current = await fetchLeads();
        const updated = current.map(l => l.id === id ? { ...l, status: status as LeadStatus } : l);
        localStorage.setItem(LS_KEYS.LEADS, JSON.stringify(updated));
    }
};

// --- COMPARISON Operations ---
export const fetchComparisons = () => fetchWithFallback('comparison_items', LS_KEYS.COMPARISON, mapComparison, []);
export const upsertComparison = (item: Partial<ComparisonItem>) => upsertWithFallback(
    'comparison_items', LS_KEYS.COMPARISON, item,
    (i) => ({
        id: i.id,
        criterion: i.criterion,
        duhava_value: i.duhavaValue,
        agency_value: i.agencyValue,
        freelance_value: i.freelanceValue,
        sort_order: i.sortOrder
    }),
    fetchComparisons
);
export const deleteComparison = (id: string) => deleteWithFallback('comparison_items', LS_KEYS.COMPARISON, id, fetchComparisons);

// --- PERSONAS Operations ---
export const fetchPersonas = () => fetchWithFallback('personas', LS_KEYS.PERSONAS, mapPersona, []);
export const upsertPersona = (item: Partial<Persona>) => upsertWithFallback(
    'personas', LS_KEYS.PERSONAS, item,
    (p) => ({
        id: p.id,
        key_name: p.keyName,
        title: p.title,
        description: p.description,
        focus_tags: p.focusTags,
        cta_text: p.ctaText,
        icon_name: p.iconName
    }),
    fetchPersonas
);
export const deletePersona = (id: string) => deleteWithFallback('personas', LS_KEYS.PERSONAS, id, fetchPersonas);

// --- GALLERY Operations ---
// Define defaults locally to avoid import loop or if simple
const MOCK_GALLERY: GalleryImage[] = [
    { id: '1', imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600", sortOrder: 1 },
    { id: '2', imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=600", sortOrder: 2 },
    { id: '3', imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=600", sortOrder: 3 },
    { id: '4', imageUrl: "https://images.unsplash.com/photo-1553877615-30c73a63bbc4?auto=format&fit=crop&q=80&w=600", sortOrder: 4 },
];

export const fetchGalleryImages = () => fetchWithFallback('gallery_images', LS_KEYS.GALLERY, mapGalleryImage, MOCK_GALLERY);

export const upsertGalleryImage = (item: Partial<GalleryImage>) => upsertWithFallback(
    'gallery_images', LS_KEYS.GALLERY, item,
    (g) => ({
        id: g.id,
        image_url: g.imageUrl,
        caption: g.caption,
        sort_order: g.sortOrder
    }),
    fetchGalleryImages
);

export const deleteGalleryImage = (id: string) => deleteWithFallback('gallery_images', LS_KEYS.GALLERY, id, fetchGalleryImages);
