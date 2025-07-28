import Play from "../icons/Play.jsx";
import { SkipBack, SkipForward } from "lucide-react";
import usePlayerServices from "../../services/player.services.js";
// import usePlayerStore from "../../store/player.store.js";

const TrackController = () => {

  // const { isPlaying } = usePlayerStore();
  const {
    togglePlayPause,
    nextTrack, prevTrack,
   } = usePlayerServices();

  return (
    <div className="flex gap-2 items-center" >

      <button className="cursor-pointer p-1 hover:text-red-primary bg-transparent rounded-full hover:bg-hover-primary transition duration-150 ease-in-out" onClick={prevTrack} >
        <SkipBack size={15} />
      </button>

      <button className="bg-white-secondary rounded-full p-1 text-black-secondary hover:bg-red-primary hover:text-white-secondary cursor-pointer transition duration-150 ease-in-out" onClick={togglePlayPause} >
        <Play size={25} />
      </button>

      <button className="cursor-pointer p-1 hover:text-red-primary bg-transparent rounded-full hover:bg-hover-primary transition duration-150 ease-in-out" onClick={nextTrack} >
        <SkipForward size={15} />
      </button>

    </div>
  )
}

export default TrackController