// Libraries
import { useEffect, useRef, useState } from "react";
// Stores and Hooks
import usePlayerStore from "../../store/player.store.js";
import usePlayer from "../../hooks/usePlayer.jsx";
// Helper
import { normalizeTime } from "../../helpers/player.helper.js";


// Component
const TrackSeeker = () => {
  // React Hooks
  const seekerRef = useRef();
  const intervalId = useRef();
  const [isDragging, setIsDragging] = useState(false);

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

    seeker.style.background = `linear-gradient(to right, #fd4b4e 0%, #fd4b4e ${percentage}%, #ddd ${percentage}%, #ddd 100%)`;
    seeker.style.transition = "all 12s ease-in-out";
  }

  const handleChange = e => {
    updateSliderBackground(parseInt(e.target.value));
    seekTo(e.target.value);
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
    <div className="md:w-sm flex justify-center items-center">
      <div className="px-2 text-xs">{normalizeTime(currentTime) || "00:00" }</div>
      <input
        ref={seekerRef}
        type="range"
        min={0}
        max={Math.floor(currentTrack?.totalDuration ?? 0 ) || 0 }
        value={currentTime || 0}
        className="track-seeker accent-red-primary"
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onInput={handleChange}
      />
      <div className="px-2 text-xs">{normalizeTime(Math.floor(currentTrack?.totalDuration ?? 0 )) || "00:00" }</div>
    </div>
  );
};

export default TrackSeeker;
