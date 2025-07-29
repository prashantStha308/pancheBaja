import {Link} from "react-router-dom";
import usePlayerStore from "../../store/player.store.js";
import { useGetUserById } from "../../queries/user.queries.js";

const TrackDetail = () => {

    const { currentTrack } = usePlayerStore();
    console.log(currentTrack);

    const { isPending, isLoading, data, isError, error } = useGetUserById( currentTrack.artists );
    


    return (
        <section className="flex items-center gap-4" >
            <div className="bg-white rounded-xs p-2" >
                <img src={ currentTrack && currentTrack.coverArt.src || "/assets/aadiiItyadii.jpg"} alt={ currentTrack && currentTrack.name || "" + "'s Cover art" } width={25} height={25} />
            </div>
            <div className="grid content-evenly gap-0" >
                <span className=" p-0 m-0 text-left text-xs hover:underline cursor-pointer" > <Link to={ currentTrack && currentTrack._id ? `/player/${ currentTrack && currentTrack._id}` : "/" } > { currentTrack && currentTrack.name || "Unknown Title"} </Link>  </span>
                <span className="p-0 m-0 text-xs text-left hover:underline cursor-pointer">
                    {currentTrack && currentTrack.artists && currentTrack.artists.length > 0
                        ? currentTrack && currentTrack.artists.slice(0, 2).join(', ') + "..."
                        : "Unknown Artist"}
                </span>
            </div>
        </section>
    )
}

export default TrackDetail