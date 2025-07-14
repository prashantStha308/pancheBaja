import React from 'react'
import useTrackStore from '../../store/track.store'

const AudioRef = () => {

    const { currentTrack } = useTrackStore();

    return (
        <>
            <audio src={ currentTrack.audio.src } ></audio>
        </>
    )
}

export default AudioRef