import usePlayer from "../../hooks/usePlayer.jsx";
import usePlaylistStore from "../../store/playlist.store";
import Play from "../icons/Play";
import usePlayerStore from "../../store/player.store.js";

const PlayBtn = () => {
  
  const visitingPlaylist = usePlaylistStore(state => state.visitingPlaylist);

  const { setTrackList } = usePlayerStore.getState();
  const { loadTrack, playTrack } = usePlayer();

  const handlePlayClick = async () => {
    console.log("Handling Play Click");

    const trackList = visitingPlaylist.type === "track" ? [visitingPlaylist] : visitingPlaylist.trackList;

    console.log("Setting in trackList; ",trackList);

    setTrackList(trackList);
    loadTrack(trackList[0]);
    await playTrack();
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