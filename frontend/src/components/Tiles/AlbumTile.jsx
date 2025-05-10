import { useState } from "react"
import VinylDisc from "./VinylDisc"

const AlbumTile = ({ item }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className="flex flex-col items-center gap-4 w-52 lg:w-56 h-72 rounded-md cursor-pointer hover:bg-hover-primary active:bg-black-tersery transition-all duration-100 ease-in p-4 flex-shrink-0">
            {/* Cover art */}
            <div className="rounded-full w-48">
                {
                    item.imgSrc || isLoaded ? (
                        <img 
                            src={item.imgSrc} 
                            alt={item.name} 
                            className={`w-48 h-48 object-cover transition-opacity duration-300 rounded-full ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
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
                <h3 className="text-left font-bold text-sm lg:text-base text-white truncate max-w-full">
                    {item.name}
                </h3>
                <p className="text-xs lg:text-sm font-medium text-gray-300 truncate max-w-full">
                    { item.artist || "Unknown Artist" }
                </p>
            </div>
        </div>
    )
}

export default AlbumTile;
