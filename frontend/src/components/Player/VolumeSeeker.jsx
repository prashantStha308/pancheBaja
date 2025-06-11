import { Volume , Volume1 , Volume2 } from "lucide-react"
import useTrackStore from "../../store/track.store"

const VolumeSeeker = () => {
    const { volume , setVolume } = useTrackStore();

    const handleVolumeChange = (e)=>{
        setVolume(e.target.value);
    }

  return (
    <div className="flex gap-4 items-center w-fit" >
        <Volume2 />
        <input type="range" name="volume" id="volume" min={0} max={100} value={volume} onChange={handleVolumeChange} className="w-24 flex flex-shrink-0 accent-red-primary" />
    </div>
  )
}

export default VolumeSeeker