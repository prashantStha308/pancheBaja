import TrackController from "./TrackController"
import TrackSeeker from "./TrackSeeker"

const Player = () => {
	return (
		<div className="flex flex-col gap-1 items-center justify-center max-h-14" >
			<TrackController />
			<TrackSeeker />
		</div>
	)
}

export default Player;