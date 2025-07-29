import BottomPlayer from "../components/Player/BottomPlayer.jsx"
import NavbarBottom from "../components/Navbar/NavbarBottom"
import NavbarPlaylist from "../components/Navbar/NavbarPlaylist"
import Navbar from "../components/Navbar/NavbarPrimary"
import AppRoutes from "./App.routes"
import { useLocation } from "react-router-dom"
import usePlayerStore from "../store/player.store.js"

const AppContent = () => {
	const location = useLocation();
	const { hasLoadedTrack } = usePlayerStore();

	const noBottomPlayerPages = [ '/player' , '/login' , '/signup' ];
	const dontShowPlayer = noBottomPlayerPages.some( path => location.pathname.startsWith(path) );

	return (
		<main className=" min-h-screen flex flex-col gap-2 justify-between" >

			{/* Make NavbarPlaylist as primary */}
			<NavbarPlaylist />

			<div className="flex px-5 min-h-screen max-w-screen z-10 md:px-18 " >
				<AppRoutes />
			</div>


			<div className={`sticky bottom-0 left-0 right-0 ${hasLoadedTrack ? "opcaity-100" : "opacity-0"} bg-black-secondary/55 backdrop-blur-3xl z-40 transition-all duration-200 ease-in-out`} >
				{!dontShowPlayer && (<BottomPlayer />)}
				
				<div className="block md:hidden" >
					<NavbarBottom />
				</div>
			</div>
		</main>
	)
}

export default AppContent