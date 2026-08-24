import { create } from "zustand";

export const useUIStore = create((set) => ({
  sidebarOpen: true,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),

  statusFilter: "all",
  setStatusFilter: (status) => set({ statusFilter: status }),

  sortKey: "title",
  setSortKey: (key) => set({ sortKey: key }),
}));
