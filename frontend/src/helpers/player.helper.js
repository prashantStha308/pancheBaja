import usePlayerStore from "../store/player.store";
import usePlaylistStore from "../store/playlist.store";

const usePlayerHelper = () => {
    const { currentPlaylist } = usePlaylistStore();

    const { currentTrack, setCurrentTrack,
        audioElementRef,setIsPlaying,
        currentIndex, setCurrentIndex,
        audioIntervalTimer, setAudioIntervalTimer, updateAllSliders ,
        setCurrentTime , setTotalDuration
    } = usePlayerStore();

    const normalizeTime = (seconds) => {
        const hrs =  Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
        
        return hrs > 0
        ? `${hrs.toString().padStart(2, '0')}:${mins}:${secs}`
        : `${mins}:${secs}`;
    }

    const seekUpdate = () => {
        let seekPosition = 0;
        const ref = audioElementRef?.current;
        
        if (ref && !isNaN(ref.duration)) {
            seekPosition = ref.currentTime * (100 / ref.duration);
            updateAllSliders(seekPosition);

            setTotalDuration(normalizeTime(ref.duration));
            setCurrentTime(normalizeTime(ref.currentTime));
        }

    }

    const initializeAudio = (track, nextTrack) => {
        console.log("Initializing audio",track);

        if (audioElementRef?.current) {
            audioElementRef.current.removeEventListener('ended', nextTrack);
            audioElementRef.current.src = track.audio.streamUrl;
            audioElementRef.current.load();
            audioElementRef.current.addEventListener('ended', nextTrack);
        } else {
            throw new Error("Initialization failed");
        }
    }

    const clearSeekerInterval = () => {
        if (audioIntervalTimer) {
            clearInterval(audioIntervalTimer);
            setAudioIntervalTimer(null); 
        }
    }

    const selectTrack = (track) => {
        setCurrentTrack(track);
        setCurrentIndex(0);
    }

    const selectTrackInPlaylist = (track, playlist) => {
        const targetIndex = playlist.trackList.findIndex(item => item._id === track._id);
        if (targetIndex == -1) {
            throw new Error("Track not present in playlist");
        }
        console.log(track);
        setCurrentTrack(track);        
        setCurrentIndex(targetIndex);
    }

    const playTrack = () => {
        const ref = audioElementRef.current;
        if (ref === null) {
            return;
        }
        ref.play();
        startSeekerInterval();
        setIsPlaying(true);
    }

    const pauseTrack = () => {
        const ref = audioElementRef?.current;
        if (ref === null) {
            return;
        }
        ref.pause();
        clearSeekerInterval();
        setIsPlaying(false);
    }

    const resetPlayer = () => {
        clearSeekerInterval();
        setCurrentTime("00:00");
        setTotalDuration("00:00");
        // Update all sliders to 0
        updateAllSliders(0);
    }

    const isSameTrackLoaded = (track) => {
        const ref = audioElementRef?.current;
        return currentTrack._id === track._id && ref?.src === track.streamUrl;
    }

    const validateTrackOrThrow = (track) => {
        if (!track) {
            throw new Error("Track Validation failed. Cannot load track");
        }
    }
    
    const getNextIndex = () => {
        console.log(currentPlaylist);
        
        return (currentIndex < currentPlaylist.length - 1) ? currentIndex + 1 : 0
    }
    
    const getPrevIndex = ()=> (currentIndex !== 0) ? currentIndex - 1 : currentPlaylist.length - 1;

    const startSeekerInterval = ()=> setAudioIntervalTimer(setInterval(seekUpdate, 1000));


    return ({
        selectTrackInPlaylist, selectTrack,
        isSameTrackLoaded,
        validateTrackOrThrow,
        startSeekerInterval,
        initializeAudio,
        resetPlayer,
        clearSeekerInterval,
        getNextIndex, getPrevIndex,
        playTrack, pauseTrack,
    })
}

export default usePlayerHelper;