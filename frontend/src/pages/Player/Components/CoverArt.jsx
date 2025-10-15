import React from 'react'

const CoverArt = ({src, alt}) => {
    return (
        <div className=" aspect-square bg-hover-primary/15 rounded-lg backdrop-blur-lg border border-black-tersery border-b-white-tersery/15 p-2 " >
            <img
                src= {src || "" }
                alt={alt || "Cover Art"}
                className=' w-60 h-60 md:w-72 md:h-72 aspect-square object-cover rounded-lg'
            />
        </div>
    )
}

export default CoverArt