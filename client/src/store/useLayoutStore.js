const useLayoutStore = create((set) => ({
    isSidebarOpen: window.innerWidth >= 768, 
    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));