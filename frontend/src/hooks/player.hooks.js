import usePlaylistStore from "../store/playlist.store";
import useTrackStore from "../store/track.store";

const TrackPlayer = ()=>{
    const {
        currentTrack={}, setCurrentTrack,
        currentIndex, setCurrentIndex,
        setCurrentTime,
        setTotalDuration,
        // seekPosition, setSeekPosition,
        isPlaying, setIsPlaying,
        seekVolumeRef,
        audioElementRef,
        updateTimer, setUpdateTimer,
        updateAllSliders
    } = useTrackStore();

    const { currentPlaylist = {} } = usePlaylistStore();

    const seekTo = (e)=>{
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

    const resetPlayer = ()=>{
        setCurrentTime("00:00");
        setTotalDuration("00:00");
    }

    const playTrack = () => {
        if (audioElementRef?.current && currentTrack.audioUrl) {
            audioElementRef.current.play();
            setIsPlaying(true);
        }
    }    
    
    const pauseTrack = () => {
        if (audioElementRef?.current && currentTrack.audioUrl) {
            audioElementRef.current.pause();
            setIsPlaying(false);
        }
        if (updateTimer) {
            clearInterval(updateTimer);
        }
    }

    const nextTrack = ()=>{
        const nextIndex = (currentIndex < currentPlaylist.length) ? currentIndex + 1 : 0 ;
        const nextTrack = currentPlaylist[nextIndex];
        
        if (nextTrack) {
            setCurrentIndex(nextIndex);
            loadTrack(nextTrack);
            playTrack();
        }
    }
    
    const prevTrack = () => {
        const prevIndex = (currentIndex !== 0) ? currentIndex - 1 : currentPlaylist.length - 1;
        const prevTrack = currentPlaylist[prevIndex];

        if (prevTrack) {
            setCurrentIndex(prevIndex);
            setCurrentTrack(prevTrack);
            playTrack();
        }
    }

    const playPauseTrack = () => {
        if (isPlaying) {
            pauseTrack();
        } else {
            playTrack();
        }
    }

    const seekUpdate = () => {
         let seekPosition = 0;
        if (audioElementRef?.current) {
            if (!isNaN(audioElementRef.current.duration)) {
                const curr_track = audioElementRef.current;
                seekPosition = curr_track.currentTime * (100 / curr_track.duration);

                updateAllSliders(seekPosition);

                // Calculate the time left and the total duration
                let currentMinutes = Math.floor(curr_track.currentTime / 60);
                let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
                let durationMinutes = Math.floor(curr_track.duration / 60);
                let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

                // Add a zero to the single digit  time values
                if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
                if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
                if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
                if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

                setCurrentTime(`${currentMinutes}:${currentSeconds}`);
                setTotalDuration(`${durationMinutes}:${durationSeconds}`);
            }
        }  
    }

    const loadTrack = ((track)=>{
        if( track._id === currentTrack._id && audioElementRef.current.src === track.audio.src ){
            return; //if currently playing track === to passed track, do nothing and return
        }
        setIsPlaying(false);

        const targetIndex = currentPlaylist.findIndex(item=> item._id === track._id );
        if( targetIndex !== -1 ){
            setCurrentTrack(track);
            setCurrentIndex(targetIndex);
        }

        if(updateTimer){
            clearInterval(updateTimer);
        }
        // resetPlayer();
        if( audioElementRef.current !== null ){
            audioElementRef.current.src = track.audio.src;
            audioElementRef.current.load();
            audioElementRef.current.addEventListener('ended', nextTrack);
        }

        setUpdateTimer(setInterval(seekUpdate,1000));
    })

    const updateVolume = () => {
        if (seekVolumeRef?.current && audioElementRef?.current) {
            audioElementRef.current.volume = seekVolumeRef.current.value / 100;
        }
    }

    return{
        seekTo,
        loadTrack,
        nextTrack,
        prevTrack,
        resetPlayer,
        playPauseTrack,
        playTrack,
        pauseTrack,
        updateVolume,
        seekUpdate,
    }
}

const useTrackPlayer = () => TrackPlayer();
export default useTrackPlayer;