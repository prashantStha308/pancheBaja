import { useState } from 'react';

export default function StackedFrames({ imageSrc, altText = "Album cover" }) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <div className="relative w-40 h-40 ">
      {/* Background rectangle */}
      <div className="absolute top-1  w-full h-full rounded-sm aspect-square bg-neutral-800 shadow-md" />
      
      {/* Middle rectangle */}
      <div className="absolute top-0.5 w-full h-full rounded-sm aspect-square bg-neutral-700 shadow-md" />
      
      {/* Front rectangle with image */}
      <div className="absolute top-0  w-full h-full rounded-sm aspect-square bg-[#696969] overflow-hidden shadow-lg">
        {imageSrc && (
          <img 
            src={imageSrc} 
            alt={altText}
            className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setIsLoaded(true)}
          />
        )}
      </div>
    </div>
  );
}