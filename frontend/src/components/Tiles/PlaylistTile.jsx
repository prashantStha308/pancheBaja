import React from 'react'

const PlaylistTile = ({ item }) => {
  return (
    <div className="flex flex-col gap-3" >
        {/* cover art */}
        <div className={`aspect-square w-40 lg:w-50 rounded-xs bg-no-repeat bg-center bg-[length:10rem] lg:bg-[length:15rem] object-cover`} style={{backgroundImage: `url(${item.imgSrc})`}} />
        <div className="flex flex-col gap-1 justify-start
        " >
            <h3 className="text-left font-bold text-lg text-white-primary " > { item.title } </h3>
            <h5 className="text-sm font-medium text-white-secondary" > Created by {item.createdBy} </h5>
            <h6 className="text-xs text-white-tersery" > {item.numberOfTracks} Tracks </h6>
        </div>
    </div>
  )
}

export default PlaylistTile