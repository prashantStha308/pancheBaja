import Play from "../icons/Play.jsx";
import { SkipBack , SkipForward } from "lucide-react";

const TrackController = () => {
  return (
    <div className="flex gap-2 items-center" >

      <button className="cursor-pointer p-1 hover:text-red-primary bg-transparent rounded-full hover:bg-hover-primary transition duration-150 ease-in-out" >
        <SkipBack size={20} />
      </button>

      <button className="bg-white-secondary rounded-full p-1 text-black-secondary hover:bg-red-primary hover:text-white-secondary cursor-pointer transition duration-150 ease-in-out " >
        <Play size={25} />
      </button>

      <button className="cursor-pointer p-1 hover:text-red-primary bg-transparent rounded-full hover:bg-hover-primary transition duration-150 ease-in-out" >
        <SkipForward size={20} />
      </button>

    </div>
  )
}

export default TrackController