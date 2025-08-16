import React from 'react'

const ExploreTile = ({topic= "Test", bgUrl="/assets/aadiiItyadii.jpg"}) => {
    return (
        <div className="relative group cursor-pointer w-52 aspect-video rounded-md overflow-hidden">
            <img 
                src={bgUrl} 
                alt={topic} 
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/25 group-hover:bg-black/5 transition-all duration-75 ease-in-out flex items-start p-4">
                <h1 className="font-black font-text text-lg group-hover:text-gray-900 text-white-secondary transition-all ease-in-out duration-200 ">{topic}</h1>
            </div>
        </div>
    )
}

export default ExploreTile