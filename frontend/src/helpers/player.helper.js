
export const normalizeTime = (seconds) => {
    const hrs =  Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    
    return hrs > 0
    ? `${hrs.toString().padStart(2, '0')}:${mins}:${secs}`
    : `${mins}:${secs}`;
}


export const initAudio = (audioRef, track ) => {
    console.log("Inside init audio",audioRef);

    if (!audioRef) return;
    if (audioRef.src === track.audio.streamUrl) return;


    audioRef.src = track.audio.streamUrl;
    audioRef.load();

    console.log(audioRef);
}

