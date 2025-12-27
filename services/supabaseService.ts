import { supabase } from './supabaseClient';
import { Service, Project, NewsItem, Lead, LeadStatus, TeamMember, ClientPartner, ComparisonItem, Persona } from '../types';
import { MOCK_TEAM } from '../data/mockData';

// --- Helpers ---

// Tạo UUID an toàn để fix lỗi "null value in column id" khi DB không tự sinh ID
const generateUUID = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    // Fallback cho trình duyệt cũ
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

// --- Storage Operations ---

export const uploadImage = async (file: File): Promise<string | null> => {
    try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage.from('content').upload(filePath, file);

        if (uploadError) {
            console.error('Error uploading image:', uploadError);
            throw uploadError;
        }

        const { data } = supabase.storage.from('content').getPublicUrl(filePath);
        return data.publicUrl;
    } catch (error) {
        console.error('Upload failed:', error);
        return null;
    }
};

// --- Services Operations ---

export const fetchServices = async (): Promise<Service[]> => {
    const { data, error } = await supabase.from('services').select('*').order('created_at', { ascending: true });
    if (error) { console.error('Error fetching services:', error); return []; }
    return data.map(mapService);
};

export const upsertService = async (service: Partial<Service>) => {
    const payload: any = {
        title: service.title,
        description: service.description,
        icon: service.icon,
        image_url: service.imageUrl,
        id: service.id || generateUUID() // FIX: Generate ID if missing
    };
    
    const { error } = await supabase.from('services').upsert(payload);
    if (error) throw error;
};

export const deleteService = async (id: string) => {
    const { error } = await supabase.from('services').delete().eq('id', id);
    if (error) throw error;
};

// --- Projects Operations ---

export const fetchProjects = async (): Promise<Project[]> => {
    const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: true });
    if (error) { console.error('Error fetching projects:', error); return []; }
    return data.map(mapProject);
};

export const upsertProject = async (project: Partial<Project>) => {
    const payload: any = {
        title: project.title,
        client: project.client,
        category: project.category,
        image_url: project.imageUrl,
        result: project.result,
        description: project.description,
        id: project.id || generateUUID() // FIX: Generate ID if missing
    };

    const { error } = await supabase.from('projects').upsert(payload);
    if (error) throw error;
};

export const deleteProject = async (id: string) => {
    const { error } = await supabase.from('projects').delete().eq('id', id);
    if (error) throw error;
};

// --- News Operations ---

export const fetchNews = async (): Promise<NewsItem[]> => {
    const { data, error } = await supabase.from('news').select('*').order('date', { ascending: false });
    if (error) { console.error('Error fetching news:', error); return []; }
    return data.map(mapNews);
};

export const upsertNews = async (news: Partial<NewsItem>) => {
    const payload: any = {
        title: news.title,
        category: news.category,
        summary: news.summary,
        content: news.content,
        image_url: news.imageUrl,
        date: news.date,
        id: news.id || generateUUID() // FIX: Generate ID if missing
    };

    const { error } = await supabase.from('news').upsert(payload);
    if (error) throw error;
};

export const deleteNews = async (id: string) => {
    const { error } = await supabase.from('news').delete().eq('id', id);
    if (error) throw error;
};

// --- Team Operations ---

export const fetchTeamMembers = async (): Promise<TeamMember[]> => {
    const { data, error } = await supabase.from('team_members').select('*').order('created_at', { ascending: true });
    if (error) { 
        console.warn('⚠️ Could not fetch team_members from Supabase. Falling back to MOCK data.', error.message); 
        return MOCK_TEAM; 
    }
    return data.map(mapTeamMember);
};

export const upsertTeamMember = async (member: Partial<TeamMember>) => {
    const payload: any = {
        name: member.name,
        role: member.role,
        image_url: member.imageUrl,
        bio: member.bio,
        id: member.id || generateUUID() // FIX: Generate ID if missing
    };

    const { error } = await supabase.from('team_members').upsert(payload);
    if (error) throw error;
};

export const deleteTeamMember = async (id: string) => {
    const { error } = await supabase.from('team_members').delete().eq('id', id);
    if (error) throw error;
};

// --- Leads Operations ---

export const fetchLeads = async (): Promise<Lead[]> => {
    const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
    if (error) { console.error('Error fetching leads:', error); return []; }
    return data.map(mapLead);
};

export const createLead = async (lead: Partial<Lead>) => {
    const payload = {
        id: lead.id || generateUUID(), // FIX: Ensure Lead ID exists
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        details: lead.details,
        status: 'NEW',
        created_at: new Date().toISOString()
    };
    
    const { error } = await supabase.from('leads').insert(payload);
    if (error) {
        console.error("Supabase Error creating lead:", error.message, error.details);
        throw error;
    }
};

export const updateLeadStatus = async (id: string, status: string) => {
    const { error } = await supabase.from('leads').update({ status }).eq('id', id);
    if (error) throw error;
};

// --- PARTNERS Operations ---
export const fetchPartners = async (): Promise<ClientPartner[]> => {
    const { data, error } = await supabase.from('client_partners').select('*').order('sort_order', { ascending: true });
    if (error) { console.warn('Error fetching partners:', error.message); return []; }
    return data.map(mapPartner);
};
export const upsertPartner = async (item: Partial<ClientPartner>) => {
    const payload: any = {
        name: item.name,
        logo_url: item.logoUrl,
        sort_order: item.sortOrder,
        id: item.id || generateUUID() // FIX: Generate ID if missing
    };
    
    const { error } = await supabase.from('client_partners').upsert(payload);
    if (error) throw error;
};
export const deletePartner = async (id: string) => {
    const { error } = await supabase.from('client_partners').delete().eq('id', id);
    if (error) throw error;
};

// --- COMPARISON Operations ---
export const fetchComparisons = async (): Promise<ComparisonItem[]> => {
    const { data, error } = await supabase.from('comparison_items').select('*').order('sort_order', { ascending: true });
    if (error) { console.warn('Error fetching comparisons:', error.message); return []; }
    return data.map(mapComparison);
};
export const upsertComparison = async (item: Partial<ComparisonItem>) => {
    const payload: any = {
        criterion: item.criterion,
        duhava_value: item.duhavaValue,
        agency_value: item.agencyValue,
        freelance_value: item.freelanceValue,
        sort_order: item.sortOrder,
        id: item.id || generateUUID() // FIX: Generate ID if missing
    };

    const { error } = await supabase.from('comparison_items').upsert(payload);
    if (error) throw error;
};
export const deleteComparison = async (id: string) => {
    const { error } = await supabase.from('comparison_items').delete().eq('id', id);
    if (error) throw error;
};

// --- PERSONAS Operations ---
export const fetchPersonas = async (): Promise<Persona[]> => {
    const { data, error } = await supabase.from('personas').select('*').order('created_at', { ascending: true });
    if (error) { console.warn('Error fetching personas:', error.message); return []; }
    return data.map(mapPersona);
};
export const upsertPersona = async (item: Partial<Persona>) => {
    const payload: any = {
        key_name: item.keyName,
        title: item.title,
        description: item.description,
        focus_tags: item.focusTags,
        cta_text: item.ctaText,
        icon_name: item.iconName,
        id: item.id || generateUUID() // FIX: Generate ID if missing
    };

    const { error } = await supabase.from('personas').upsert(payload);
    if (error) throw error;
};
export const deletePersona = async (id: string) => {
    const { error } = await supabase.from('personas').delete().eq('id', id);
    if (error) throw error;
};