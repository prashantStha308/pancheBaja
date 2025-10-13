// Stores and Hooks
import usePlayerStore from "../../store/player.store.js";
import usePlayer from "../../hooks/usePlayer.jsx";
// Components
import Play from "../icons/Play.jsx";
import { SkipBack, SkipForward, Pause } from "lucide-react";

const TrackController = () => {

  const isPlaying = usePlayerStore(store => store.isPlaying);

  const {
    togglePlayPause,
    nextTrack, prevTrack,
   } = usePlayer();

  return (
    <div className="flex gap-2 items-center" >

      <button className="cursor-pointer p-1 hover:text-red-primary bg-transparent rounded-full hover:bg-hover-primary transition duration-150 ease-in-out" onClick={prevTrack} >
        <SkipBack size={15} />
      </button>

      <button className="bg-white-secondary rounded-full w-8 h-8 text-black-secondary hover:bg-red-primary hover:text-white-secondary cursor-pointer transition duration-150 ease-in-out flex items-center justify-center relative" onClick={togglePlayPause} >
        <Play
          className={` absolute ${isPlaying ? "opacity-0" : "opacity-100"} transition-all duration-100 ease-in-out `}
          size={25}
        />
        <Pause
          className={` absolute ${!isPlaying ? "opacity-0" : "opacity-100" } transition-all duration-100 ease-in-out `}
          size={25} strokeWidth={1}
        />
      </button>

      <button className="cursor-pointer p-1 hover:text-red-primary bg-transparent rounded-full hover:bg-hover-primary transition duration-150 ease-in-out" onClick={nextTrack} >
        <SkipForward size={15} />
      </button>

    </div>
  )
}

export default TrackController