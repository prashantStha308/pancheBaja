import usePlayerServices from "../../services/player.services.js";
import usePlaylistStore from "../../store/playlist.store";
import usePlayerStore from "../../store/player.store";
import Play from "../icons/Play";

const PlayBtn = () => {
  const { visitingPlaylist, currentPlaylist, setCurrentPlaylist } = usePlaylistStore();
  const { loadAndPlayTrack } = usePlayerServices();
  const { currentTrack , audioElementRef } = usePlayerStore();
  
  const handlePlayClick = () => {

    if (visitingPlaylist !== currentPlaylist) {

      console.log("Setting current Playlist");
      setCurrentPlaylist(visitingPlaylist);
      console.log("CurrentPlaylist: ", currentPlaylist);
    
    }

    if (visitingPlaylist?.trackList?.length > 0) {

      console.log("Loading track");
      console.log(visitingPlaylist.trackList[0]);
    
      loadAndPlayTrack(visitingPlaylist.trackList[0], visitingPlaylist);
    
      console.log("Current Track: ", currentTrack);
      console.log("Element ref: ", audioElementRef);
    
    }
  }

  return (
    <button type="button" className="flex items-center cursor-pointer gap-1 bg-white text-black-primary p-2 md:px-4 md:py-1.5 hover:bg-red-primary hover:text-white rounded-full md:rounded-md transition-all duration-100 ease-in active:bg-red-secondary font-extralight" onClick={handlePlayClick} >
        <div className="hidden md:block" > <Play size={20} /> </div>
        <div className="md:hidden" > <Play size={30} /> </div>
        <span className="hidden md:block text-sm capitalize font-normal"> Play </span>
    </button>
  )
}

export default PlayBtn