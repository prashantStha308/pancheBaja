const TrackSeeker = () => {


  return (
    <div className="md:w-sm flex justify-center items-center">
        <div className="px-2 text-xs"> 00:00 </div>
        <input
            type="range"
            min="0"
            max="100"
            className="track-seeker accent-red-primary"
        />
        <div className="px-2 text-sm"> 00:00 </div>
    </div>
  )
}

export default TrackSeeker;