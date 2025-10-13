import { create } from "zustand";

const PlaylistStore = (set) => ({
    // states
    currentPlaylist: {},
    visitingPlaylist: {},

    setCurrentPlaylist: (playlist) => { set({ currentPlaylist: playlist }) },
    setVisitingPlaylist: (playlist) => { set({ visitingPlaylist: playlist }) },

    addTrack: (track) => {

        set((state) => { state.currentPlaylist.some(item => item._id === track._id) ? [...state.currentPlaylist.filter(item => item._id !== track._id), track] : [...state.currentPlaylist, track] });
    },
    removeTrack: (id) => { set(state => { state.currentPlaylist.filter(item => item._id !== id) }) },


});

const usePlaylistStore = create(PlaylistStore);
export default usePlaylistStore;