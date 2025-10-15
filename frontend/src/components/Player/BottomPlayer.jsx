// Store
import usePlayerStore from "../../store/player.store";
// Components
import Player from "./Player"
import TrackDetail from "./TrackDetail";
import VolumeSeeker from "./VolumeSeeker";
import LoadingBottomPlayer from "../Loaders/Player/LoadingBottomPlayer";
import SecondaryActions from "./SecondaryActions";

const BottomPlayer = () => {

  const currentTrack = usePlayerStore(store => store.currentTrack);
  console.log("Re-rendering?");

  return (
    <>
      {
        currentTrack ?
          <div className={`hidden md:flex z-40 justify-between py-2 px-5`} >
            <TrackDetail currentTrack={currentTrack} />
            <Player />
            <SecondaryActions />
          </div> 
          :
          <LoadingBottomPlayer />
      }
    </>
  )
}

export default BottomPlayer