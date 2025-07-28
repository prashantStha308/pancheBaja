import usePlayerHelper from "../helpers/player.helper.js";
import usePlayerStore from "../store/player.store.js";
import usePlaylistStore from "../store/playlist.store.js";

const usePlayerServices = () => {

    const {
        currentPlaylist
    } = usePlaylistStore();

    const {
        playTrack, pauseTrack,
        getNextIndex, getPrevIndex,
        initializeAudio, selectTrackInPlaylist,
        resetPlayer, seekUpdate,
        isSameTrackLoaded,
        clearSeekerInterval,
     } = usePlayerHelper();

    const {
        currentTrack, setCurrentIndex,
        isPlaying, setIsPlaying,
        audioElementRef,
        audioIntervalTimer , setAudioIntervalTimer, updateAllSliders,
    } = usePlayerStore();

    function loadTrack(track, playlist) {
        try {
            if ( currentTrack && isSameTrackLoaded(track)) {
                return;
            }
            setIsPlaying(false);

            selectTrackInPlaylist(track, playlist);
            resetPlayer();
            initializeAudio(track, nextTrack);
            playTrack();
            // update seeker every 1 second
            setAudioIntervalTimer(setInterval(seekUpdate, 1000));
        } catch (error) {
            console.error("Error in loadTrack: ", error);
        }
    }

    function nextTrack() {
        console.log("Clearing: ", audioIntervalTimer);
        clearSeekerInterval();
        const nextIndex = getNextIndex();
        console.log(nextIndex);
        const nextTrack = currentPlaylist.trackList[nextIndex];

        if (nextTrack) {
            setCurrentIndex(nextIndex);  
            loadTrack(nextTrack);
            playTrack();
        }
    }

    function prevTrack() {
        clearSeekerInterval();
        const prevIndex = getPrevIndex();
        const nextTrack = currentPlaylist.trackList[prevIndex];

        if (nextTrack) {
            setCurrentIndex(prevIndex);  
            loadTrack(nextTrack);
            playTrack();
        }
    }

    function togglePlayPause() {
        if (isPlaying) {
            console.log("Pausing");
            pauseTrack();
        } else {
            console.log("Playing");
            playTrack();
        }
    }

    function seekTo(e) {
        if (audioElementRef?.current) {
            const percentage = parseFloat(e.target.value);
            const duration = audioElementRef.current.duration;
            
            if (!isNaN(duration)) {
                const seekTime = duration * (percentage / 100);
                audioElementRef.current.currentTime = seekTime;
                
                // Update all sliders to reflect this change
                updateAllSliders(percentage);
            }
        }
    }

    function loadAndPlayTrack(track, playlist) {
        loadTrack(track, playlist);
        playTrack();
    }

    return {
        loadTrack,
        togglePlayPause,
        nextTrack, prevTrack,
        seekTo,
        loadAndPlayTrack
    }
}

export default usePlayerServices;