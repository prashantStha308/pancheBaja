// Stores and Hooks
import usePlayerStore from "../../../store/player.store.js";
import usePlayer from "../../../hooks/usePlayer.jsx";
// Components
// import Play from "../../../components/icons/Play.jsx";
import { SkipBack, SkipForward, Pause, Repeat, Play } from "lucide-react";
import Shuffle from "../../../components/icons/Shuffle.jsx";
import Dot from "../../../components/icons/Dot.jsx";

const Controller = () => {

	const isPlaying = usePlayerStore(store => store.isPlaying);
	const isShuffle = usePlayerStore(store => store.isShuffle);
	const isRepeat = usePlayerStore(store => store.isRepeat);

	const { setIsShuffle, setIsRepeat } = usePlayerStore.getState();
	const {
		togglePlayPause,
		nextTrack, prevTrack,
	} = usePlayer();

	const toggleShuffle = () => setIsShuffle(!isShuffle);
	const toggleRepeat = () => setIsRepeat(!isRepeat);

	const getSecondaryActions = (Component, callback, condition) => {
		return (
			<button
				className="flex flex-col gap-0.5 items-center group cursor-pointer p-1 "
				onClick={callback}
			>
				<div className="relative flex justify-center items-center isolate" >
					<Component
						size={15}
						className="z-20"
					/>
					<Component
						size={10}
						className={`absolute bg-green-glow blur-sm z-10 ${condition ? "opacity-100" : "opacity-0 group-hover:opacity-80" } transition-opacity duration-150 ease-in-out `}
					/>
				</div>
				
				<div className={`relative opacity-0 ${condition ? "opacity-100" : "opacity-0"}`} >
					<Dot
						size={3}
						className="text-white"
					/>
					<Dot
						size={3}
						className="absolute text-green-glow blur-xs"
					/>
				</div>

			</button>
			
		)
	}

	return (
		<div className="flex items-center gap-6 max-w-80 " >

				{getSecondaryActions(Repeat, toggleRepeat, isRepeat)}

			<div className="flex gap-3 items-center" >
				<button className="cursor-pointer p-1.5 hover:text-red-primary bg-transparent rounded-full hover:bg-hover-primary transition-all duration-150 ease-in-out" onClick={prevTrack} >
					<SkipBack size={20} className="hidden md:block" />

					<SkipBack size={15} className="md:hidden" />

				</button>

				<div className="relative isolate flex justify-center items-center group " >
					<button className="relative bg-white-secondary rounded-full w-9 h-9 text-black-secondary cursor-pointer transition-all duration-150 ease-in-out flex items-center justify-center z-20 " onClick={togglePlayPause} >
						<Play
							className={` absolute ${isPlaying ? "opacity-0" : "opacity-100"} transition-all duration-100 ease-in-out ml-0.5 `}
							size={20}
						/>
						
						<Pause
							className={` absolute ${!isPlaying ? "opacity-0" : "opacity-100" } transition-all duration-100 ease-in-out `}
							size={20} strokeWidth={1}
						/>
					</button>

					<div
						className="absolute w-9 h-9 bg-red-secondary rounded-full blur-sm z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out "
					></div>
				</div>

				<button className="cursor-pointer p-1.5 hover:text-red-primary bg-transparent rounded-full hover:bg-hover-primary transition-all duration-150 ease-in-out" onClick={nextTrack} >
					<SkipForward size={20} className="hidden md:block" />

					<SkipForward size={15} className="md:hidden" />

				</button>
			</div>

			{getSecondaryActions(Shuffle, toggleShuffle, isShuffle)}
		</div>
	)
}

export default Controller