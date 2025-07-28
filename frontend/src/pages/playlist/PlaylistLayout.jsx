import { useParams } from "react-router-dom"
import usePlaylistStore from "../../store/playlist.store";
import { useEffect } from "react";
import { useState } from "react";
import { setError } from "../../services/utils.services";
import Loader from "../../components/Loader";
import { getPlaylistByid } from "../../services/playlist.services";
import ListLayout from "../../components/List/ListLayout.jsx";
import TopDetails from "../../components/TopDetails.jsx";
import Background from "../../components/Background";
import transition from "../../utils/transition";

const PlaylistLayout = () => {
	
	const { id } = useParams();
	const { setVisitingPlaylist , visitingPlaylist } = usePlaylistStore();
	const [ loading , setLoading ] = useState(false);

	useEffect(() => {
		document.title = visitingPlaylist?.title ? `${visitingPlaylist?.title } | Panche Baja` : "Panche Baja";
		return( ()=> document.title = "Panche Baja")
	}, [visitingPlaylist?.title]);

	useEffect( ()=>{
		const fetchPlaylist = async()=>{
			try {
				setLoading(true);
				const res = await getPlaylistByid(id);
				if( !res.success ){
					throw new Error(res.message);
				}
				setVisitingPlaylist(res.data);
			} catch (error) {
				setError(error);
			}finally{
				setLoading(false);
			}
		}

		if (visitingPlaylist?._id !== id) {
			fetchPlaylist();
		}

	} , [id] );

	if( loading || !(visitingPlaylist?._id) ){
		return <Loader />;
	}
	
	return (
		<>
			<section className="flex flex-col min-h-screen w-full md:mt-8  gap-2 z-40" >
				{/* Top */}
				<TopDetails visitingPage={visitingPlaylist} />
				<ListLayout tracks={visitingPlaylist?.type === 'track' ? [visitingPlaylist] : visitingPlaylist?.trackList } />
			</section>

			<Background src={visitingPlaylist?.coverArt?.src} />
		</>
	)
}

const PageTransition = transition(PlaylistLayout);
export default PageTransition;