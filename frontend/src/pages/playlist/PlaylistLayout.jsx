// Libraries
import { useEffect } from "react";
import { useParams } from "react-router-dom"
// Stores and Queries
import usePlaylistStore from "../../store/playlist.store";
import { usePlaylistByIdQuery } from "../../queries/playlist.queries.js";
// Components
import ListLayout from "../../components/List/ListLayout.jsx";
import TopDetails from "../../components/TopDetails.jsx";
import Background from "../../components/Background";
import transition from "../../utils/transition";
import LoadingPlaylist from "../../components/Loaders/LoadingPlaylist.jsx";

const PlaylistLayout = () => {
	const { id } = useParams();
	const { setVisitingPlaylist, visitingPlaylist } = usePlaylistStore();

	useEffect(() => {
		document.title = visitingPlaylist?.name ? `${visitingPlaylist?.name } | Panche Baja` : "Panche Baja";
		return( ()=> document.title = "Panche Baja")
	}, [visitingPlaylist?.name]);

	const { isPending, isLoading, data, isError, error } = usePlaylistByIdQuery(id);

	useEffect(() => {
        if (data && data.success) {
            setVisitingPlaylist(data.data);
        }
    },[data , setVisitingPlaylist])


	if (isError) {
		return (
			<p>
				Error occured: {error}
			</p>
		)
	}
	
	return (
		<>
			{
				isPending || isLoading ?
					<LoadingPlaylist />
					:
					<>
						<section className="flex flex-col w-full mt-8 gap-2 z-40" >
							{/* Top */}
							<TopDetails visitingPage={data} />
							<ListLayout tracks={data?.trackList } />
						</section>

						<Background src={data?.coverArt?.src} />
					</>
			}
		</>
	)
}

const PageTransition = transition(PlaylistLayout);
export default PageTransition;