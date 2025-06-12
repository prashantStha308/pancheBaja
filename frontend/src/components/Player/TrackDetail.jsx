import {Link} from "react-router-dom";
import useTrackStore from "../../store/track.store";

const TrackDetail = () => {

    const { currentTrack } = useTrackStore();

    return (
        <section className="flex items-center gap-4" >
            <div className="bg-white rounded-xs p-2" >
                <img src={ currentTrack.imageUrl || "/assets/aadiiItyadii.jpg"} alt={ currentTrack.title || "" + "'s Cover art" } width={25} height={25} />
            </div>
            <div className="grid content-evenly gap-0" >
                <span className=" p-0 m-0 text-left text-xs hover:underline cursor-pointer" > <Link to={ currentTrack._id ? `/player/${currentTrack._id}` : "/" } > { currentTrack.title || "Unknown Title"} </Link>  </span>
                <span className="p-0 m-0 text-xs text-left hover:underline cursor-pointer">
                    {currentTrack.artists && currentTrack.artists.length > 0
                        ? currentTrack.artists.slice(0, 2).join(', ') + "..."
                        : "Unknown Artist"}
                </span>
            </div>
        </section>
    )
}

export default TrackDetail