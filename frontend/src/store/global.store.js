import { create } from "zustand";

const globalStore = create((set) => ({
    navbarRef: null,

    setNavbarRef: (ref) => set({ navbarRef: ref }),
}));

const useGlobalStore = () => globalStore();
export default useGlobalStore;