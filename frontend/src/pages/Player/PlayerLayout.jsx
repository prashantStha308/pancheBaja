import Background from "../../components/Background";
// import Add from "../../components/icons/Add";
import Seeker from './Components/Seeker';
import Controller from './Components/Controllers';
import TrackDetails from './Components/TrackDetails';
import usePlayerStore from '../../store/player.store';
import transition from "../../utils/transition";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PlayerLayout = () => {

    const navigate = useNavigate();

    const currentTrack = usePlayerStore(store => store.currentTrack);
    const isPlaying = usePlayerStore(store => store.isPlaying);
    const isTrackLoaded = usePlayerStore(store => store.isTrackLoaded);


    useEffect(() => {
        if (!isPlaying && !isTrackLoaded ) navigate("/");
    }, [isPlaying, isTrackLoaded, navigate])

    // if(!isPlaying)


    return (
        <>
            <section
                id='player'
                className='w-full h-[calc(100dvh-75px)] flex justify-center items-center z-50'
            >
                <div className=' flex flex-col gap-6 items-center justify-center w-60 md:w-80' >
                    <div>
                        <img
                            src= {currentTrack?.coverArt?.src || "" }
                            alt={currentTrack?.title || "Cover Art"}
                            className=' w-60 h-60 md:w-80 md:h-80 aspect-square object-cover rounded-lg'
                        />
                    </div>

                    {/* Track Details */}
                    <TrackDetails track={currentTrack} />

                    <div
                        className='flex flex-col justify-center items-center gap-1'
                    >
                        <Controller />
                        <Seeker />
                    </div>

                </div>
            </section>

            <Background src={currentTrack?.coverArt?.src || "" } blur={true} />
        </>
    )
}

const PageTransition = transition(PlayerLayout);

export default PageTransition;