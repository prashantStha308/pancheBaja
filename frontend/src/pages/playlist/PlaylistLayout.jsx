import { useParams } from "react-router-dom"
import usePlaylistStore from "../../store/playlist.store";
import { useEffect } from "react";
import { useState } from "react";
import { setError } from "../../services/utils.services";
import Loader from "../../components/Loader";
import { getPlaylistByid } from "../../services/playlist.services";
import List from "../../components/List";
import TopDetails from "../../components/TopDetails";
import Background from "../../components/Background";

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
		if( !visitingPlaylist?._id ){
			fetchPlaylist();
		}
	} , [visitingPlaylist , id ] );

	if( loading ){
		return <Loader />;
	}
	
	return (
		<>
			<section className="flex flex-col w-full px-4 md:px-16 gap-2 z-40" >
				{/* Top */}
				<TopDetails visitingPage={visitingPlaylist} />
				<List tracks={visitingPlaylist?.trackList} />
			</section>

			<Background page={visitingPlaylist} />
		</>
	)
}

export default PlaylistLayout