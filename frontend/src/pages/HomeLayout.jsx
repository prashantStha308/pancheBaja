// Libraries
import { useEffect } from "react";
// Hooks and Helpers
import { useAllPlaylistQuery } from "../queries/playlist.queries.js";
import { useAllTrackQuery } from "../queries/track.queries.js";
import transition from "../utils/transition.jsx";
// Components
import PlaylistTile from "../components/Tiles/PlaylistTile.jsx"
import Section from "../components/Section.jsx";


const HomeLayout = () => {
	const playlistQuery = useAllPlaylistQuery();
	const trackQuery = useAllTrackQuery();

	useEffect(()=>{
		document.title = "Home | Panche Baja";
		return( ()=> document.title = "Panche Baja")
	},[])

	return (
		<div className="flex flex-col md:mt-8 gap-8 w-full justify-start md:items-center " >
			<Section query ={trackQuery} title={"Trending Songs"} Tile={PlaylistTile} />
			<Section query={playlistQuery} title={"Playlists"} Tile={PlaylistTile} />
		</div>
	)
}

const PageTransition = transition(HomeLayout);

export default PageTransition;