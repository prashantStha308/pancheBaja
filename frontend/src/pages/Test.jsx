// import { useAllTrackQuery } from '../queries/track.queries.js';
import { useAllPlaylistQuery } from "../queries/playlist.queries.js";
import Loader from "../components/Loader.jsx";
import PlaylistTile from "../components/Tiles/PlaylistTile.jsx"
import Section from "../components/Section.jsx";

const Test = () => {

	const { data  = {} , isPending , isError , error } = useAllPlaylistQuery();

	if( isPending ){
		return <Loader />
	}

	if( isError ){
		return(
			<div>
				ERROR: {error}
			</div>
		)
	}

	console.log(data);

	return (
		// <section className="h-full w-full flex justify-center mt-4" >
			<Section data={data?.data} title={"Playlists"} Tile={PlaylistTile} />
		// </section>
	)
}

export default Test