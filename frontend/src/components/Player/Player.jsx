import TrackController from "./TrackController"
import TrackSeeker from "./TrackSeeker"
import "./player.css";

const Player = () => {
	return (
		<div className="flex flex-col gap-1 items-center justify-center" >
			<TrackController />
			<TrackSeeker />
		</div>
	)
}

export default Player