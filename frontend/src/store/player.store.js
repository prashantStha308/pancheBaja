import { create } from "zustand";

const usePlayerStore = create((set) => ({
    trackList: [],
    setTrackList: (list) => {
        list = Array.isArray(list) ? list : [list];
        set({
            trackList: list,
            isTrackLoaded: list.length !== 0
        })
    },

    currentTrack: null,
    setCurrentTrack: track => set({currentTrack: track}),

    currentTrackIndex: 0,
    setCurrentTrackIndex: (index) => set({ currentTrackIndex: index }),

    isPlaying: false,
    setIsPlaying: status => set({ isPlaying: status }),
    
    isTrackLoaded: false,
    setIsTrackLoaded: status => set({ isTrackLoaded: status }),
    
    currentTime: 0,
    setCurrentTime: (time) => set({ currentTime: time }),

    // Shuffle state
    isShuffle: false,
    setIsShuffle: status => set({ isShuffle: status }),

    isRepeat: false,
    setIsRepeat: (state = "all") => set({ isRepeat: state }),

    // refs
    audioRef: null,
    setAudioRef: currentRef => set({ audioRef: currentRef }),

    seekerRef: null,
    setSeekerRef: currentRef => set({ seekerRef: currentRef }),


    // Actions
    addTrackTolist: track => set(state => [...state.trackList, track]),
    removeTrackFromlist: track => set(state => state.trackList.filter(item => item._id != track._id)),

    resetPlayer: () => {
        set({
            trackList: [],
            currentTrack: null,
            isPlaying: false,
            isTrackLoaded: false,
            currentTime: 0,
            audioRef: null,
            seekerRef: null
        })
    },

}));

export default usePlayerStore;