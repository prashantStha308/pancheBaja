import { initAudio } from "../helpers/player.helper";
import usePlayerStore from "../store/player.store";


const usePlayer = () => {

    const trackList = usePlayerStore(store => store.trackList);
    const currentTrack = usePlayerStore(store => store.currentTrack);
    const isPlaying = usePlayerStore(store => store.isPlaying);
    const audioRef = usePlayerStore(store => store.audioRef);
    const currentTrackIndex = usePlayerStore(store => store.currentTrackIndex);

    const {
        setCurrentTrackIndex,
        setCurrentTrack,
        setIsPlaying,
        setCurrentTime,
        addTrackTolist,
        setIsTrackLoaded
     } = usePlayerStore.getState();

    const loadTrack = (track) => {

        if (!audioRef || !track) return;
        if (currentTrack && (track._id === currentTrack?._id)) return;
        
        pauseTrack();
        reset();

        if (!trackList.includes(track)) {
            addTrackTolist(track);
            setCurrentTrackIndex(trackList.length);
        } else {
            setCurrentTrackIndex(trackList.indexOf(track));
        }

        setCurrentTrack(track);
        initAudio(audioRef, track);
        setIsTrackLoaded(true);

        console.log("Loaded Track: ", track);
    }


    const playTrack = async () => {
        try {
            console.log(audioRef);
            
            if (!audioRef) return;
            
            await audioRef.play();
            setIsPlaying(true);
        } catch (e) {
            console.warn(e);
        }
    }

    const pauseTrack = () => {
        if (!audioRef || !isPlaying) return;

        audioRef.pause();
        setIsPlaying(false);
    }

    const togglePlayPause = async () => {
        console.log("Toggeling play state", {isPlaying});
        if (isPlaying) {
            pauseTrack();
        } else {
            await playTrack();
        }
    }

    const nextTrack = () => {
        const trackList = usePlayerStore.getState().trackList;
        const nextIndex = (currentTrackIndex < trackList.length - 1) ? currentTrackIndex + 1 : 0;
        const nextTrack = trackList[nextIndex];

        if (nextTrack) {
            console.log("Next Track:: ",nextTrack);
            loadTrack(nextTrack);
            playTrack();
        }
    }

    const prevTrack = () => {
        console.log("Inside prev Track. TrackList: ", trackList);
        const prevIndex = (currentTrackIndex !== 0) ? currentTrackIndex - 1 : trackList.length - 1;
        const prevTrack = trackList[prevIndex];

        if (prevTrack) {
            loadTrack(prevTrack);
            playTrack();
        }
    }

    const updateSeek = () => {
        setCurrentTime(audioRef ? Math.floor(audioRef.currentTime) : 0);
        console.log("Time Range Object: ", audioRef.buffered);
    }

    const seekTo = ( value ) => {
        if (value < 0) return;

        setCurrentTime(value);
        audioRef.currentTime = value;
    }

    const reset = () => {
        // needs audio ref
        setIsPlaying(false);
        setCurrentTrack(null);
        setCurrentTrackIndex(0);
        setCurrentTime(0);
    }

    return ({
        loadTrack,
        playTrack, pauseTrack,
        togglePlayPause,
        nextTrack, prevTrack,
        seekTo, reset,
        updateSeek,
    })
}

export default usePlayer;