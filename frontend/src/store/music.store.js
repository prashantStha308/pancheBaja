import { create } from "zustand";

const MusicStore = create( ( set , get )=>({
    // states
    currentTrack:{},
    currentIndex: 0,
    currentTime: "00:00",
    totalDuration: "00:00",
    seekPosition: 0,
    isPlaying: false,
    // refs
    seekSliderRefs: [],
    seekVolumeRef: null, //volume controle garna lai
    audioElementRef: null,
    // misc
    updateTimer: null, //setInterval ko lagi
    
    // setters
    setCurrentTrack: ( track ) => { set({currentTrack: track}) },
    setCurrentTime: (curr_time)=>{set({currentTime: curr_time})},
    setTotalDuration: (duration)=>{set({totalDuration: duration})},
    setIsPlaying: (bool)=>{set({isPlaying: bool})},
    setSeekPosition: (position) => set({ seekPosition: position }),
    
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
    setUpdateTimer: (intervalId)=>{set({updateTimer: intervalId})},

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

const useMusicStore = ()=> MusicStore();
export default useMusicStore;