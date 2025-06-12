import { Volume , Volume1 , Volume2 } from "lucide-react"
import useTrackStore from "../../store/track.store"
import { useEffect, useRef } from "react";

const VolumeSeeker = () => {
    const { volume , setVolume } = useTrackStore();
    const seekerRef = useRef();

    const handleVolumeChange = (e)=>{
        setVolume(e.target.value);
    }

    useEffect(()=>{
        const updateSliderBackground = (seeker) => {
          const value = seeker.value;
          seeker.style.background = `linear-gradient(to right, #fd4b4e 0%, #fd4b4e ${value}%, #dbdbdb ${value}%, #dbdbdb 100%)`;
        }
    
        if( seekerRef.current !== null ){
          seekerRef.current.addEventListener('input' , ()=> updateSliderBackground(seekerRef.current));
        }
        return(
            seekerRef.current.removeEventListener('input' , updateSliderBackground)
        )
      },[]);

  return (
    <div className="flex gap-4 items-center w-fit" >
        <Volume2 />
        <input ref={seekerRef} type="range" name="volume" id="volume" min={0} max={100} value={volume} onChange={handleVolumeChange} className="volume-seeker w-24" />
    </div>
  )
}

export default VolumeSeeker