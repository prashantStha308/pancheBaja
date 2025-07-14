import { useEffect, useRef, useState } from "react";
import useTrackStore from "../../store/track.store";
import usePlayerServices from "../../services/player.services";

const TrackSeeker = () => {
  const seekerRef = useRef();
  const {setSeekSliderRefs ,currentTime , totalDuration , seekPosition } = useTrackStore();
  const { seekTo } = usePlayerServices(); 
  const [sliderValue, setSliderValue] = useState(0);

  console.log("Current Time:" , currentTime);
  console.log("Total Duration:" , totalDuration);


  useEffect(()=>{
    const updateSliderBackground = (seeker) => {
      const value = seeker.value;
      seeker.style.background = `linear-gradient(to right, #fd4b4e 0%, #fd4b4e ${value}%, #ddd ${value}%, #ddd 100%)`;
    }

    if( seekerRef.current !== null ){
      seekerRef.current.addEventListener('input' , ()=> updateSliderBackground(seekerRef.current));
    }
    return(
        seekerRef.current.removeEventListener('input' , updateSliderBackground)
    )
  })

    // Register this slider with the music store
    useEffect(() => {
        if (seekerRef.current !== null) {
            setSeekSliderRefs(prev => [...(Array.isArray(prev) ? prev : []), seekerRef]);
        }
        
        // Cleanup function to remove this ref when component unmounts
        return () => {
            setSeekSliderRefs(prev => 
                Array.isArray(prev) ? prev.filter(ref => ref !== seekerRef) : prev
            );
        };
    }, [setSeekSliderRefs]);

    // Subscribe to the global seek position
    useEffect(() => {
        if (typeof seekPosition === 'number') {
            setSliderValue(seekPosition);
        }
    }, [seekPosition]);


  return (
    <div className="md:w-sm flex justify-center items-center">
        <div className="px-2 text-xs"> { currentTime }</div>
        <input
          ref={seekerRef}
          type="range"
          min="0"
          max="100"
          value={sliderValue}
          className="track-seeker accent-red-primary"
          onChange={(e) => {
            const newValue = parseFloat(e.target.value);
            setSliderValue(newValue);
            seekTo(e);
          }}
        />
        <div className="px-2 text-xs"> { totalDuration } </div>
    </div>
  )
}

export default TrackSeeker;