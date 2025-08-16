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
        <div className='opacity-0 translate-x-[9999rem] translate-y-[9999rem]' >
            <audio ref={audioRef} ></audio>
        </div>
    )
}

export default AudioRef