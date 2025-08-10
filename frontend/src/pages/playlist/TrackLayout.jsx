import { useParams } from "react-router-dom"
import usePlaylistStore from "../../store/playlist.store";
import { useTrackByIdQuery } from "../../queries/track.queries";
import Loader from "../../components/Loader";
import TopDetails from "../../components/TopDetails";
import ListLayout from "../../components/List/ListLayout";
import Background from "../../components/Background";
import transition from "../../utils/transition";
import { useEffect } from "react";

const TrackLayout = () => {
    
    const { id } = useParams();
    const { setVisitingPlaylist, visitingPlaylist } = usePlaylistStore();

    console.log("Track Id: ", id);

    const { isPending, isLoading, data, isError, error } = useTrackByIdQuery(id);
    
    useEffect(() => {
        if (data && data.success) {
            setVisitingPlaylist(data.data);
        }
    },[data , setVisitingPlaylist])

    if (isPending || isLoading) {
        return <Loader />
    }

    if (isError) {
        return (
            <p>
				Error occured: {error}
			</p>
        )
    }
    
    return (
        <>
			<section className="flex flex-col min-h-screen w-full md:mt-8  gap-2 z-40" >
				{/* Top */}
				<TopDetails visitingPage={data.data} />
				<ListLayout tracks={ [data.data] } />
			</section>

			<Background src={data.data.coverArt.src} />
		</>
    )
}

const PageTransition = transition(TrackLayout);

export default PageTransition;