import { useAllTrackQuery } from '../queries/track.queries';
import Loader from "../components/Loader.jsx";
import PlaylistTile from "../components/Tiles/PlaylistTile.jsx"

const Test = () => {

	const { data  = {} , isPending , isError , error } = useAllTrackQuery();

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

	console.log(data.data);

	return (
		<section className='flex flex-col items-center gap-4' >
			<h1> Tracks </h1>
			<section className='grid grid-cols-4 gap-2' >
				{
					data.data.map( ( track , index )=> <PlaylistTile key={index} item={track} />  )
				}
			</section>
		</section>
	)
}

export default Test