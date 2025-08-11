import usePlayerServices from "../../services/player.services.js";
import usePlaylistStore from "../../store/playlist.store";
import Play from "../icons/Play";

const PlayBtn = () => {
  const { visitingPlaylist, currentPlaylist, setCurrentPlaylist } = usePlaylistStore();
  const { loadAndPlayTrack } = usePlayerServices();
  
  const handlePlayClick = () => {

    if (visitingPlaylist !== currentPlaylist) {
      setCurrentPlaylist(visitingPlaylist);    
    }

    if (visitingPlaylist?.trackList?.length > 0) {
      loadAndPlayTrack(visitingPlaylist.trackList[0], visitingPlaylist);
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