import AudioRef from "./AudioRef"
import TrackController from "./TrackController"
import TrackSeeker from "./TrackSeeker"

const Player = () => {
	return (
		<div className="flex flex-col gap-1 items-center justify-center" >
			<TrackController />
			<TrackSeeker />
			<AudioRef />
		</div>
	)
}

export default Player