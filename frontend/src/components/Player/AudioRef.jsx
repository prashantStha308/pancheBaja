import { useEffect, useRef } from 'react';
import usePlayerStore from '../../store/player.store';
import usePlayer from '../../hooks/usePlayer';

const AudioRef = () => {

    const audioRef = useRef();
    const { setAudioRef } = usePlayerStore.getState();

    const trackList = usePlayerStore(store => store.trackList);
    const currentTrackIndex = usePlayerStore(store => store.currentTrackIndex);

    const { nextTrack, pauseTrack } = usePlayer();

    useEffect(() => {

        const handleOnEnd = () => {
            console.log("In end");
            pauseTrack();
            if ( currentTrackIndex !== trackList.length - 1 ) {
                console.log("Not the last item of the trackList");
                nextTrack();
            }
        }

        const ref = audioRef.current;
        ref.addEventListener( "ended", handleOnEnd );
        setAudioRef(audioRef.current);

        return (() => {
            ref.removeEventListener( "ended", handleOnEnd );
        })

    }, [currentTrackIndex, nextTrack, pauseTrack, setAudioRef, trackList]);

    return (
        <audio 
            ref={audioRef}
            style={{ display: 'none' }}
        ></audio>
    )
}

export default AudioRef