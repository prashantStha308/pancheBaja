import { Link, useNavigate } from "react-router-dom";
import StackedFrames from "./StackedFrames";
import usePlaylistStore from "../../store/playlist.store";

const PlaylistTile = ({ item }) => {

	const navigator = useNavigate();
	const { setVisitingPlaylist } = usePlaylistStore();

	const handleLink = ()=>{
		setVisitingPlaylist(item);
		navigator(`/playlist/${item._id}`);
	}

	return (
		<div onClick={handleLink} className="flex flex-col items-start gap-4 w-fit h-64 rounded-md cursor-pointer group hover:bg-hover-primary active:bg-black-tersery transition-all duration-100 ease-in p-4">
			{/* Cover art */}
			<StackedFrames imageSrc={ item.image} />
			
			<div className="flex flex-col gap-0.5 px-3 py-2 rounded-b-sm w-full ">
				<h3 className="text-left font-bold text-sm lg:text-base text-white line-clamp-1 leading-tight whitespace-normal break-words">
					{item.title}
				</h3>
				<p className="text-xs  font-medium text-gray-300 line-clamp-1 leading-tight whitespace-normal break-words">
					Created by {item.createdBy || "Popsicle "}
				</p>
				<p className="text-xs text-gray-400">
					{item.totalTracks || ""} Tracks
				</p>
			</div>
		</div>
	);
};

export default PlaylistTile;