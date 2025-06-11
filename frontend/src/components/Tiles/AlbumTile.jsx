import { useState } from "react"
import VinylDisc from "./VinylDisc"


const AlbumTile = ({ item }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className="flex flex-col items-center gap-2 max-w-40 h-fit rounded-md cursor-pointer hover:bg-hover-primary active:bg-black-tersery transition-all duration-100 ease-in p-2 md:p-4 flex-shrink-0 font-text">
            {/* Cover art */}
            <div className="rounded-full w-36 flex justify-center">
                {
                    item.imgSrc || isLoaded ? (
                        <img 
                            src={item.imgSrc} 
                            alt={item.name} 
                            className={`w-36 h-36 object-cover transition-opacity duration-300 aspect-square rounded-full ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                            onLoad={() => setIsLoaded(true)}
                            onError={() => setIsLoaded(false)}
                        />
                    )
                    :
                    (
                        <div className="flex items-center justify-center" >
                            <VinylDisc size={60} />
                        </div>
                    )
                }
            </div>

            <div className="flex flex-col gap-0.5 mt-2 w-full">
                <h3 className="text-left font-bold text-sm text-white truncate max-w-full line-clamp-1 leading-tight whitespace-normal break-words"  >
                    {item.name}
                </h3>
                <p className="text-xs font-medium text-gray-300 truncate max-w-full">
                    { item.artist || "Unknown Artist" }
                </p>
            </div>
        </div>
    )
}

export default AlbumTile;
