const Tile = ({ item }) => {
  return (
    <div className="flex flex-col gap-3" >
        {/* cover art */}
        <div className="aspect-square w-30 h-30 object-cover object-center" style={{backgroundImage: "url('/assets/attiBhayo.jpeg')", backgroundSize: "8rem", backgroundRepeat: "no-repeat"}} ></div>
        <div className="flex flex-col gap-1 justify-start
        " >
            <h3 className="text-left font-bold text-lg text-white-primary " > Rock Hits </h3>
            <h5 className="text-sm font-medium text-white-secondary" > Created by Panche Baja </h5>
            <h6 className="text-xs text-white-tersery" > 50 Tracks </h6>
        </div>
    </div>
  )
}

export default Tile