import { Link, useNavigate } from "react-router-dom";
import StackedFrames from "./StackedFrames";
import usePlaylistStore from "../../store/playlist.store";

const PlaylistTile = ({ item }) => {
	// console.log(item);

	const navigator = useNavigate();
	const { setVisitingPlaylist } = usePlaylistStore();

	const handleLink = ()=>{
		setVisitingPlaylist(item);
		navigator(`/playlist/${item._id}`);
	}

	return (
		<div onClick={handleLink} className="flex flex-col items-center gap-2 w-40 h-60 rounded-md cursor-pointer hover:bg-hover-primary active:bg-black-tersery transition-all duration-100 ease-in p-2 md:p-4 flex-shrink-0 font-text">
			{/* Cover art */}
			<StackedFrames imageSrc={ item.image.src} />
			
			<div className="flex flex-col gap-0.5 mt-2 w-full ">
				<h3 className="text-left font-bold text-sm text-white line-clamp-1 leading-tight whitespace-normal break-words">
					{item.title}
				</h3>
				<p className="text-[0.65rem] font-medium text-gray-300 line-clamp-1 leading-tight whitespace-normal break-words">
					Created by {item.createdBy || "Popsicle "}
				</p>
				<p className="text-[0.65rem] text-gray-400">
					{item.totalTracks || ""} Tracks
				</p>
			</div>
		</div>
	);
};

export default PlaylistTile;