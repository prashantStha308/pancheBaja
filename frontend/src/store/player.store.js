import { create } from "zustand";

const usePlayerStore = create((set) => ({
    trackList: [],
    setTrackList: (list) => set({ trackList: Array.isArray(list) ? list : [list] }),

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

// Pseudo code

/*

1. User starts the player, in a playlist page(for now)
2. The trackList of the playlist is loaded to usePlayerStore().trackList;
3. The first track in the trackList is loaded in currentTrack state.
4. Upon doing so, the seeker's current Track and totalDuration is updated.
5. Use the totalDuration as the max value in the seeker

Note: Only after setting up the seeker, setup the audio element.

6. Use a useEffect with the currentTrack in it's dependency array to set the src of the audio.
7. Add a onEnded lilstener to audio ele with nextTrack

*/