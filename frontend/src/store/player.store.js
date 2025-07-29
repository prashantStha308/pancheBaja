import { create } from "zustand";

const PlayerStore = create( ( set , get )=>({
    // states
    currentTrack: null,
    currentIndex: 0,
    currentTime: "00:00",
    totalDuration: "00:00",
    seekPosition: 0,
    volume: 100,
    isPlaying: false,
    hasLoadedTrack: false,

    // refs
    seekSliderRefs: [],
    seekVolumeRef: null, //volume control garna lai
    audioElementRef: null,
    // misc
    audioIntervalTimer: null, //setInterval ID ko lagi
    
    // setters
    setCurrentTrack: ( track ) => { set({currentTrack: track}) },
    setCurrentIndex: (index)=> set({currentIndex: index}),
    setCurrentTime: (curr_time)=>{set({currentTime: curr_time})},
    setTotalDuration: (duration)=>{set({totalDuration: duration})},
    setSeekPosition: (position) => set({ seekPosition: position }),
    setVolume: (vol)=>{ set({volume: vol}) },
    setIsPlaying: (bool) => { set({ isPlaying: bool }) },
    setHasLoadedTrack: (bool) => {set({hasLoadedTrack: bool})},
    
    // ref setters
    setSeekSliderRefs: (ref) => set(state => {
        if (typeof ref === 'function') {
            return { seekSliderRefs: ref(state.seekSliderRefs) };
        } else {
            return { seekSliderRefs: [ref] };
        }
    }),
    setSeekVolumeRef: (volume)=>{set({seekVolumeRef: volume})},
    setAudioElementRef: (ref)=>{set({audioElementRef: ref})},

    // misc
    setAudioIntervalTimer: (intervalId)=>{set({updateTimer: intervalId})},

    updateAllSliders: (value) => {
        const { seekSliderRefs } = get();
        seekSliderRefs.forEach(ref => {
            if (ref && ref.current) {
                ref.current.value = value;
            }
        });
        set({ seekPosition: value });
    },

    
}) );

const usePlayerStore = ()=> PlayerStore();
export default usePlayerStore;