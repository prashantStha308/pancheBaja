// Stores
import { Loader } from "lucide-react";
import { useGetUserById } from "../../queries/user.queries.js";
import usePlayerStore from "../../store/player.store.js"
// Components
import Player from "./Player"
import TrackDetail from "./TrackDetail";
import VolumeSeeker from "./VolumeSeeker";
import LoadingBottomPlayer from "../Loaders/Player/LoadingBottomPlayer.jsx";

const BottomPlayer = () => {

  const { currentTrack } = usePlayerStore();
  const { isLoading, data, isError, error } = useGetUserById(currentTrack?.artists?.[0] || undefined );

  console.log(currentTrack?.artists?.[0], data);

  return (
    <>
      {
        isLoading ? (
          <LoadingBottomPlayer />
        ) :
          (<div className={`hidden md:flex z-40 justify-between py-2 px-5`} >
            <TrackDetail currentTrack={currentTrack} />
            <Player />
            <VolumeSeeker />
          </div>)
      }
    </>
  )
}

export default BottomPlayer