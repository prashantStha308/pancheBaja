import { Volume , Volume1 , Volume2 } from "lucide-react"
import usePlayerStore from "../../store/player.store.js"
import { useEffect, useRef } from "react";

const VolumeSeeker = () => {	
	const volume = usePlayerStore(state => state.volume);
	const setVolume = usePlayerStore(state => state.setVolume);

    const seekerRef = useRef();

    const handleVolumeChange = (e)=>{
      setVolume(e.target.value);
      console.log(e.target.value);
    }

  useEffect(() => {
		const seeker = seekerRef.current;
		if (!seeker) return;
	  
		const updateSliderBackground = () => {
			const value = seeker.value;
			seeker.style.background = `linear-gradient(to right, #fd4b4e 0%, #fd4b4e ${value}%, #dbdbdb ${value}%, #dbdbdb 100%)`;
		}

		if( seeker !== null ){
			seeker.addEventListener('input' , updateSliderBackground);
		}
		return () => {
			if (seeker) {
			seeker.removeEventListener('input', updateSliderBackground);
			}
		}
	},[]);

  return (
    <div className="flex gap-4 items-center w-fit" >
        <Volume2 size={20} />
        <input ref={seekerRef} type="range" name="volume" id="volume" min={0} max={100} value={volume} onChange={handleVolumeChange} className="volume-seeker w-24" />
    </div>
  )
}

export default VolumeSeeker