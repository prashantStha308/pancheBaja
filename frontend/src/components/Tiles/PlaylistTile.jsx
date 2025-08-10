import { Link, useNavigate } from "react-router-dom";
import StackedFrames from "./StackedFrames";
import usePlaylistStore from "../../store/playlist.store";

const PlaylistTile = ({ item }) => {

	const navigator = useNavigate();
	const { setVisitingPlaylist } = usePlaylistStore();

	const handleLink = ()=>{
		setVisitingPlaylist(item);
		const route = item.type === "track" ? 'track' : 'playlist' ;
		navigator(`/${route}/${item._id}`);
	}

	return (
		<div onClick={handleLink} id="playlistTile" className="flex flex-col items-center gap-2 w-40 h-60 rounded-md cursor-pointer hover:bg-hover-primary active:bg-black-tersery transition-all duration-100 ease-in p-2 md:p-4 flex-shrink-0 font-text">
			{/* Cover art */}
			<StackedFrames imageSrc={ item.coverArt.src} />
			
			<div className="flex flex-col gap-0.5 mt-2 w-full ">
				<h3 className="text-left font-bold text-sm text-white line-clamp-1 leading-tight whitespace-normal break-words">
					{item.name || "Unnamed Playlist"}
				</h3>
				<p className="text-sm text-gray-300">
					{ item.type !== 'track' ? item?.createdBy?.username || "Unknown User" : item?.primaryArtist?.username || "Unknown User" }
				</p>
				<p className="text-xs text-gray-400">
					{
						item.type !== 'track' && (item?.trackList.length || 0) + " Tracks" 
					}
				</p>
			</div>
		</div>
	);
};

export default PlaylistTile;