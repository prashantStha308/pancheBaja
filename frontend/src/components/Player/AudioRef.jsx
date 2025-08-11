import { useEffect, useRef } from 'react';
import usePlayerStore from '../../store/player.store';

const AudioRef = () => {

    const audioRef = useRef();
    const { setAudioElementRef } = usePlayerStore();

    useEffect(() => {
        if (audioRef.current !== null) {
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