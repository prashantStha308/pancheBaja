// Libraries
import { useEffect, useRef } from 'react';
// Components
import usePlayerStore from '../../store/player.store';
import usePlayer from '../../hooks/usePlayer';

const AudioRef = () => {
    // React Hooks
    const audioRef = useRef();

    // Store Subscriptions
    const { setAudioRef } = usePlayerStore.getState();
    const trackList = usePlayerStore(store => store.trackList);
    const currentTrackIndex = usePlayerStore(store => store.currentTrackIndex);
    // Custom hooks
    const { nextTrack, pauseTrack } = usePlayer();

    // useEffect
    useEffect(() => {
        const handleOnEnd = () => {
            pauseTrack();
            if ( currentTrackIndex !== trackList.length - 1 ) {
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