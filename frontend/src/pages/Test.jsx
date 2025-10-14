import { Pause } from "lucide-react"
import Play from "../components/icons/Play"
import { useTrackByIdQuery } from "../queries/track.queries";
import PlaylistTile from "../components/Tiles/PlaylistTile";

const Test = () => {

	const { data, isPending, isLoading, isError, error } = useTrackByIdQuery("687ba9266569d4536c17f3a0");

	if(isLoading){
		return <p> Loading... </p>
	}

	console.log(data.data);

	return (
		<div className="bg-red-500 w-56 h-56 " >

		</div>
	)
}

export default Test