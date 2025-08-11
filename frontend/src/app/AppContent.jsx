import BottomPlayer from "../components/Player/BottomPlayer.jsx"
import NavbarBottom from "../components/Navbar/NavbarBottom"
import NavbarPrimary from "../components/Navbar/NavbarPrimary.jsx"
import AppRoutes from "./App.routes"
import { useLocation } from "react-router-dom"
import usePlayerStore from "../store/player.store.js"
import useGlobalStore from "../store/global.store.js"
import { useEffect, useRef } from "react"

const AppContent = () => {

	const location = useLocation();
	const { hasLoadedTrack } = usePlayerStore();
	const { navbarHeight, setNavbarHeight } = useGlobalStore();
	const navbarRef = useRef();

	useEffect(() => {
		if (navbarRef?.current !== null) {
			setNavbarHeight(navbarRef?.current?.offsetHeight);
		}
	},[ setNavbarHeight, navbarRef ])

	const noBottomPlayerPages = [ '/player' , '/login' , '/signup' ];
	const dontShowPlayer = noBottomPlayerPages.some( path => location.pathname.startsWith(path) );

	return (
		<main className=" min-h-screen bg-black-primary flex flex-col gap-2 md:justify-between" >

			<NavbarPrimary />

			<div className={`flex px-5 min-h-[calc( 100dvh - ${navbarHeight}px )] max-w-screen z-10 md:px-18`} >
				<AppRoutes />
			</div>


			<div >
				{!dontShowPlayer && (
					<div className={`fixed bottom-0 left-0 right-0 ${ hasLoadedTrack ? "opacity-100" : "opacity-0" } bg-black-secondary/55 backdrop-blur-3xl z-40 transition-all duration-200 ease-in-out`} >
						<BottomPlayer />
					</div>
				)}
				
				<div className="block md:hidden fixed bottom-0 left-0 right-0 bg-black-secondary/55 backdrop-blur-3xl z-40 transition-all duration-200 ease-in-out" >
					<NavbarBottom />
				</div>
			</div>
		</main>
	)
}

export default AppContent