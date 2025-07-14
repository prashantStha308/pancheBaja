import { useState } from "react"

const ArtistTile = ({ item }) => {
    const [ isLoaded , setIsLoaded ] = useState(false);

  return (
    <div className="flex flex-col items-center gap-2 w-40 h-60 rounded-md cursor-pointer hover:bg-hover-primary active:bg-black-tersery transition-all duration-100 ease-in p-2 md:p-4 flex-shrink-0 font-text">
        {/* Cover art */}
        {item && (
            <div className="w-36 flex justify-center aspect-square">
                <img 
                    src={item?.profilePicture?.src} 
                    alt={item?.username || "Unnamed Artist"}
                    className={`w-36 h-36 object-cover transition-opacity duration-300 aspect-square ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setIsLoaded(true)}
                />
            </div>
        )}
        
        <div className="flex flex-col gap-0.5 mt-2 w-full">
            <h3 className="text-left font-bold text-sm text-white line-clamp-1 leading-tight whitespace-normal break-words">
                {item?.username || "Unnamed Artist"}
            </h3>
            <p className="text-xs font-medium text-gray-300 truncate max-w-full">
                Artist
            </p>
        </div>
    </div>
  )
}

export default ArtistTile