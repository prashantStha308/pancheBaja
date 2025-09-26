import { useEffect, useRef, useState } from "react";
import usePlayerStore from "../../store/player.store.js";
import usePlayerServices from "../../services/player.services.js";

const TrackSeeker = () => {
  const seekerRef = useRef();
  const { setSeekSliderRefs, currentTime, totalDuration, seekPosition } = usePlayerStore();
  const { seekTo } = usePlayerServices();
  const [sliderValue, setSliderValue] = useState(0);


  const updateSliderBackground = (value) => {
    const seeker = seekerRef.current;
    if (!seeker) return;
    seeker.style.background = `linear-gradient(to right, #fd4b4e 0%, #fd4b4e ${value}%, #ddd ${value}%, #ddd 100%)`;
    seeker.style.transition = "all linear";
  };

  useEffect(() => {
    const seeker = seekerRef.current;
    const handleInput = () => {
      if (!seeker) return;
      updateSliderBackground(seeker.value);
    };

    if (seeker) {
      updateSliderBackground(sliderValue);
      seeker.addEventListener("input", handleInput);
    }

    return () => {
      if (seeker) {
        seeker.removeEventListener("input", handleInput);
      }
    };
  }, []);

  useEffect(() => {
    if (seekerRef.current !== null) {
      setSeekSliderRefs((prev) => [...(Array.isArray(prev) ? prev : []), seekerRef]);
    }

    return () => {
      setSeekSliderRefs((prev) =>
        Array.isArray(prev) ? prev.filter((ref) => ref !== seekerRef) : prev
      );
    };
  }, [setSeekSliderRefs]);

  useEffect(() => {
    setSliderValue(seekPosition);
    updateSliderBackground(seekPosition);
  }, [seekPosition]);

  return (
    <div className="md:w-sm flex justify-center items-center">
      <div className="px-2 text-xs">{currentTime}</div>
      <input
        ref={seekerRef}
        type="range"
        min="0"
        max="100"
        value={sliderValue}
        className="track-seeker accent-red-primary"
        onChange={(e) => {
          const newValue = parseFloat(e.target.value);
          setSliderValue(newValue);
          seekTo(e);
          updateSliderBackground(newValue);
        }}
      />
      <div className="px-2 text-xs">{totalDuration}</div>
    </div>
  );
};

export default TrackSeeker;
