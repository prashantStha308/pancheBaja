import usePlayerStore from "../../store/player.store.js"
import Player from "./Player"
import TrackDetail from "./TrackDetail";
import VolumeSeeker from "./VolumeSeeker";

const BottomPlayer = () => {

  const { currentTrack , isPlaying } = usePlayerStore();

  if( currentTrack && Object.keys(currentTrack).length === 0 ){
    // return;
  }

  return (
    <div className={`hidden md:flex z-40 justify-between py-2 px-5`} >
      <TrackDetail />

      <Player />

      <VolumeSeeker />

    </div>
  )
}

export default BottomPlayer