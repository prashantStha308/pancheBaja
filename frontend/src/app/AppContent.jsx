import BottomPlayer from "../components/Player/BottomPlayer.jsx"
import NavbarBottom from "../components/Navbar/NavbarBottom"
import NavbarPlaylist from "../components/Navbar/NavbarPlaylist"
import Navbar from "../components/Navbar/NavbarPrimary"
import AppRoutes from "./App.routes"
import { useLocation } from "react-router-dom"

const AppContent = () => {
	const location = useLocation();
	// display background image on page only if path has elements of this array
	const playerPages=[ '/playlist', '/album' ];
	const isPlaylistPage = playerPages.some( path => location.pathname.startsWith(path) );

	return (
		<main className=" min-h-screen flex flex-col gap-2 justify-between" >

			{ isPlaylistPage ? <NavbarPlaylist /> : <Navbar /> }

			<div className="flex justify-center justify-items-center items-start min-h-screen max-w-screen z-10" >
				<AppRoutes />
			</div>


			<div className="sticky bottom-0 left-0 right-0 bg-black-secondary z-40" >
				<BottomPlayer />
				<div className="block md:hidden" >
					<NavbarBottom />
				</div>
			</div>
		</main>
	)
}

export default AppContent