import { useEffect, useRef } from 'react';
import usePlayerStore from '../../store/player.store';

const AudioRef = () => {

    const audioRef = useRef();
    const { setAudioElementRef , currentTrack } = usePlayerStore();

    useEffect(() => {
        if (audioRef.current !== null) {
            console.log("Log in audio Ref",currentTrack);
            setAudioElementRef(audioRef);
        }
    }, []);

    return (
        <>
            <audio ref={audioRef} ></audio>
        </>
    )
}

export default AudioRef