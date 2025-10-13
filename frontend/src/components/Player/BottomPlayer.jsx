// Store
import usePlayerStore from "../../store/player.store";
// Components
import Player from "./Player"
import TrackDetail from "./TrackDetail";
import VolumeSeeker from "./VolumeSeeker";
import LoadingBottomPlayer from "../Loaders/Player/LoadingBottomPlayer";

const BottomPlayer = () => {

  const currentTrack = usePlayerStore(store => store.currentTrack);

  return (
    <>
      {
        currentTrack ?
          <div className={`hidden md:flex z-40 justify-between py-2 px-5`} >
            <TrackDetail currentTrack={currentTrack} />
            <Player />
            <VolumeSeeker />
          </div> 
          :
          <LoadingBottomPlayer />
      }
    </>
  )
}

export default BottomPlayer