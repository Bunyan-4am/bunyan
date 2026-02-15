import { create } from "zustand";

// Auth Store
export const useAuthStore = create((set) => ({
  user: null,
  profile: null,
  isLoading: true,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user, isLoading: false }),
  setProfile: (profile) => set({ profile }),
  logout: () => set({ user: null, profile: null, isAuthenticated: false }),
}));

// Projects Store
export const useProjectsStore = create((set, get) => ({
  projects: [],
  selectedProject: null,
  isLoading: false,
  setProjects: (projects) => set({ projects }),
  addProject: (project) => set((s) => ({ projects: [project, ...s.projects] })),
  updateProject: (id, updates) =>
    set((s) => ({
      projects: s.projects.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    })),
  removeProject: (id) =>
    set((s) => ({ projects: s.projects.filter((p) => p.id !== id) })),
  selectProject: (project) => set({ selectedProject: project }),
  setLoading: (isLoading) => set({ isLoading }),
}));

// Chat Store
export const useChatStore = create((set) => ({
  messages: [],
  isTyping: false,
  activePanel: null, // current right-panel content
  addMessage: (msg) => set((s) => ({ messages: [...s.messages, msg] })),
  setTyping: (isTyping) => set({ isTyping }),
  setActivePanel: (panel) => set({ activePanel: panel }),
  clearChat: () => set({ messages: [], activePanel: null }),
}));

// Cart Store
export const useCartStore = create((set) => ({
  items: [],
  compareList: [],
  addItem: (item) =>
    set((s) => {
      const exists = s.items.find((i) => i.id === item.id);
      if (exists) {
        return {
          items: s.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { items: [...s.items, { ...item, quantity: 1 }] };
    }),
  removeItem: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
  updateQuantity: (id, quantity) =>
    set((s) => ({
      items: s.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
    })),
  clearCart: () => set({ items: [] }),
  toggleCompare: (item) =>
    set((s) => {
      const exists = s.compareList.find((i) => i.id === item.id);
      if (exists) {
        return { compareList: s.compareList.filter((i) => i.id !== item.id) };
      }
      if (s.compareList.length >= 3) return s;
      return { compareList: [...s.compareList, item] };
    }),
  clearCompare: () => set({ compareList: [] }),
}));

// UI Store
export const useUIStore = create((set) => ({
  sidebarCollapsed: false,
  sidebarMobileOpen: false,
  toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
  setSidebarMobileOpen: (open) => set({ sidebarMobileOpen: open }),
}));
