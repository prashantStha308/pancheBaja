// Libraries
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
// Stores and Hooks
import usePlayerStore from "../../../store/player.store.js";
import usePlayer from "../../../hooks/usePlayer.jsx";
// Helper
import { normalizeTime } from "../../../helpers/player.helper.js";


// Component
const Seeker = () => {
    // React Hooks
    const seekerRef = useRef();
    const intervalId = useRef();

    // States
    const [isDragging, setIsDragging] = useState(false);
    const [glowWidth, setGlowWidth] = useState(0);

    // Store Subscriptions
    const { setSeekerRef } = usePlayerStore.getState();
    const currentTime = usePlayerStore(state => state.currentTime);
    const currentTrack = usePlayerStore(state => state.currentTrack);
    const isPlaying = usePlayerStore(state => state.isPlaying);
    // Hooks
    const { seekTo, updateSeek } = usePlayer();

    // Main Body

    // Functions

    const updateSliderBackground = (value) => {
        const seeker = seekerRef.current;
        if (!seeker) return;

        const min = parseFloat(seeker.min) || 0;
        const max = parseFloat(seeker.max) || 100;
        const percentage = ((value - min) / (max - min)) * 100;
        setGlowWidth(percentage);

        seeker.style.background = `linear-gradient(to right, #FD4B4E 0%, #FD4B4E ${percentage}%, #ddd ${percentage}%, #ddd 100%)`;
        seeker.style.transition = "all 0.15s ease-in-out";
    }

    const handleChange = e => {
        updateSliderBackground(parseInt(e.target.value));
        seekTo(e.target.value);
    }


    const movingDiv = (animate, transition, blur= false ) => {
        
        return (
            <motion.div
                style={{
                    width: `${glowWidth}%`,
                    transformOrigin: 'left'
                }}
                className={`absolute bg-white rounded-full h-1 pointer-events-none z-30 ${blur && "blur-sm"} `}
                animate={animate}
                transition={transition}
            ></motion.div>
        )
    }

    // Use Effects

    useEffect(() => {
        setSeekerRef(seekerRef.current);
    },[])

    // Update the red bacground on every render
    useEffect(() => {
        if(!isDragging) updateSliderBackground(currentTime);
    }, [currentTime, isDragging])

    // Start/Stop setInterval
    useEffect(() => {
        if (isPlaying ) {
            intervalId.current = setInterval(updateSeek, 1000);

        } else if( !isPlaying && intervalId.current ) {
            clearInterval(intervalId.current);
            intervalId.current = null;
        }

        return () => {
            if (intervalId.current) {
                clearInterval(intervalId.current);
                intervalId.current = null;
            }
        };
    },[isPlaying, updateSeek])

    return (
        <div className="max-w-80 flex justify-center items-center gap-1.5 ">
            <div className="text-xs">{normalizeTime(currentTime) || "00:00"}</div>
            <div className="relative w-65 flex justify-start items-center isolate " >
                <input
                    ref={seekerRef}
                    type="range"
                    min={0}
                    max={Math.floor(currentTrack?.totalDuration ?? 0 ) || 100 }
                    value={currentTime || 0}
                    className="track-seeker w-65 accent-red-primary z-20"
                    onMouseDown={() => setIsDragging(true)}
                    onMouseUp={() => setIsDragging(false)}
                    onInput={handleChange}
                />

                {
                    // Render the moving divs
                    [1, 2, 3, 4].map((item) => {
                        // apply blur to even valued elements only
                        const blur = item % 2 == 0;
                        return movingDiv(
                            {
                                opacity: [0, 0.8, 0],
                                scaleX: [ item < 2 ? 0 :0.2  , 0.9]
                            },
                            {
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "linear",
                                repeatDelay: 0.15
                            },
                            blur
                        )
                    } )
                }

                <div
                    className="absolute rounded-full bg-red-secondary h-1 blur-xs pointer-events-none z-10"
                    style={{
                        width: `${glowWidth}%`
                    }}
                >
                    
                </div>
            </div>
            <div className="text-xs">{normalizeTime(Math.floor(currentTrack?.totalDuration ?? 0)) || "00:00"}</div>
        </div>
    );
};

export default Seeker;
