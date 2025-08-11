import { create } from "zustand";

const globalStore = create((set) => ({
    navbarRef: null,
    navbarHeight: 0,

    setNavbarRef: (ref) => set({ navbarRef: ref }),
    setNavbarHeight: (height) => set({navbarHeight: height}),
}));

const useGlobalStore = () => globalStore();
export default useGlobalStore;