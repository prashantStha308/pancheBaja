import React, { useState } from 'react';
import LoadingExploreTile from "../Loaders/LoadingExploreTile.jsx";

const ExploreTile = ({ topic = "Test", bgUrl = "/assets/aadiiItyadii.jpg" }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className="relative group cursor-pointer w-[clamp(3.5rem,10vw,9rem)] md:w-52 aspect-video rounded-md overflow-hidden">
            {!isLoaded && <LoadingExploreTile />}

            <img 
                src={bgUrl} 
                alt={topic}
                onLoad={() => setIsLoaded(true)}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                    isLoaded ? "opacity-100" : "opacity-0 absolute"
                }`}
            />

            {isLoaded && (
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/5 transition-all duration-75 ease-in-out flex items-start p-4">
                    <h1 className="font-black font-text text-lg group-hover:text-gray-900 text-white-secondary transition-all ease-in-out duration-200 ">
                        {topic}
                    </h1>
                </div>
            )}
        </div>
    )
}

export default ExploreTile;
