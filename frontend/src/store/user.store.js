import {create} from "zustand";

const UserStore = create( (set)=>({
    isLoggedIn: false,
    currentUser: {},

    setIsLoggedIn: (isLoggedIn)=> set({isLoggedIn}),
    setCurrentUser: (userData) => set({currentUser: userData}),
}) )

const useUserStore = ()=> UserStore();

export default useUserStore;