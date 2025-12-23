// Libraries
import { useLocation } from "react-router-dom"
// Route
import AppRoutes from "./App.routes"
// Stores
import usePlayerStore from "../store/player.store.js"
import useNavbarStore from "../store/navbar.store.js"
// Components
import BottomPlayer from "../components/Player/BottomPlayer.jsx"
import NavbarBottom from "../components/Navbar/NavbarBottom"
import NavbarPrimary from "../components/Navbar/NavbarPrimary.jsx"
import AudioRef from "../components/Player/AudioRef.jsx";

const AppContent = () => {

	const location = useLocation();
	// Store Subscriptions
	const isTrackLoaded = usePlayerStore(store => store.isTrackLoaded);
	const isPlaying = usePlayerStore(store => store.isPlaying);
	const navbarRef = useNavbarStore( store => store.navbarRef );

	// Filter where not to show player
	const BtmPlayerBlackList = [ '/player' , '/login' , '/signup' ];
	const dontShowPlayer = BtmPlayerBlackList.some(path => location.pathname.startsWith(path));

	const isBottomPlayerShown = (!dontShowPlayer && (isTrackLoaded || isPlaying));

	return (
		<main className="min-h-screen bg-black-primary flex flex-col gap-2" >

			{
				![].some(path => location.pathname.startsWith(path)) && <NavbarPrimary />
			}

			<div className={`flex px-5 min-h-[calc( 100dvh - ${navbarRef && navbarRef.current !== null ? navbarRef?.current?.offsetHeight : 0}px)] max-w-screen z-10 md:px-18 ${isBottomPlayerShown && "pb-16"} `} >
				<AppRoutes />
			</div>


			<div >
				{isBottomPlayerShown  && (
					<div id="bottom-player" className={`fixed bottom-0 left-0 right-0 ${ (isTrackLoaded || isPlaying) ? "opacity-100" : "opacity-0" } bg-black-secondary/55 backdrop-blur-3xl z-40 transition-all duration-200 ease-in-out `} >
						<BottomPlayer />
					</div>
				)}
				
				<div id="bottom-navbar" className="block md:hidden fixed bottom-0 left-0 right-0 bg-black-secondary/85 backdrop-blur-2xl z-40 transition-all duration-200 ease-in-out" >
					<NavbarBottom />
				</div>
			</div>

			<AudioRef />

		</main>
	)
}

export default AppContent