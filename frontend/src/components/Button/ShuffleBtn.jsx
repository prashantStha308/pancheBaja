import { useState } from "react";
import Shuffle from "../icons/Shuffle";

const ShuffleBtn = () => {

  const [isShuffle , setIsShuffle] = useState(false);

  return (
    <button type="button" className={`flex items-center cursor-pointer gap-1 ${isShuffle ? "bg-black-tersery text-red-primary" : "text-white-secondary md:bg-black-secondary" } p-3 md:px-4 md:py-1.5 hover:bg-red-primary hover:text-white rounded-full md:rounded-md transition-all duration-100 ease-in active:bg-red-secondary`} onClick={()=> setIsShuffle(prev=>!prev)} >
        <div className="hidden md:block"> <Shuffle size={20} /> </div>
        <div className="md:hidden"> <Shuffle size={25} /> </div>
        <span className="hidden md:block text-sm capitalize font-normal"> Shuffle </span>
       
    </button>
  )
}

export default ShuffleBtn