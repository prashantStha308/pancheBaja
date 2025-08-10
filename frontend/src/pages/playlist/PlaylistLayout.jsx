import { useParams } from "react-router-dom"
import usePlaylistStore from "../../store/playlist.store";
import { useEffect } from "react";
import Loader from "../../components/Loader";
import ListLayout from "../../components/List/ListLayout.jsx";
import TopDetails from "../../components/TopDetails.jsx";
import Background from "../../components/Background";
import transition from "../../utils/transition";
import { usePlaylistByIdQuery } from "../../queries/playlist.queries.js";

const PlaylistLayout = () => {
	const { id } = useParams();
	const { setVisitingPlaylist, visitingPlaylist } = usePlaylistStore();

	useEffect(() => {
		document.title = visitingPlaylist?.name ? `${visitingPlaylist?.name } | Panche Baja` : "Panche Baja";
		return( ()=> document.title = "Panche Baja")
	}, [visitingPlaylist?.name]);


	console.log(id);
	const { isPending, isLoading, data, isError, error } = usePlaylistByIdQuery(id);

	useEffect(() => {
        if (data && data.success) {
            setVisitingPlaylist(data.data);
        }
    },[data , setVisitingPlaylist])

	if( isPending || isLoading ){
		return <Loader />;
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
				<TopDetails visitingPage={visitingPlaylist} />
				<ListLayout tracks={visitingPlaylist?.type === 'track' ? [visitingPlaylist] : visitingPlaylist?.trackList } />
			</section>

			<Background src={visitingPlaylist.coverArt.src} />
		</>
	)
}

const PageTransition = transition(PlaylistLayout);
export default PageTransition;