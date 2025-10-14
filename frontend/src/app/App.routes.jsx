import { Routes , Route } from "react-router-dom"
import HomeLayout from "../pages/HomeLayout"
import ExploreLayout from "../pages/Explore/ExploreLayout.jsx"
import LibraryLayout from "../pages/LibraryLayout"
import ProfileLayout from '../pages/ProfileLayout'
import PlaylistLayout from "../pages/playlist/PlaylistLayout"
import PublishLayout from "../pages/create/PublishLayout.jsx"
import Login from "../pages/auth/Login.jsx";
import Test from "../pages/Test"
import Signup from "../pages/auth/Signup.jsx"
import TrackLayout from "../pages/playlist/TrackLayout.jsx"
import SelfProfilePage from "../pages/auth/SelfProfilePage.jsx"
import PlayerLayout from "../pages/Player/PlayerLayout.jsx"

const AppRoutes = () => {
	return (
		<Routes>
			{/* for test */}
			<Route path="/test" element={ <Test /> } />

			<Route path="/" element={ <HomeLayout /> } />
			<Route path="/explore" element={ <ExploreLayout /> } />
			<Route path="/library" element={<LibraryLayout />} />
			<Route path="/player" element={<PlayerLayout />} />

			{/* Auth */}
			<Route path="/login" element={ <Login /> } />
			<Route path="/signup" element={<Signup />} />
			<Route path="/me" element={<SelfProfilePage />} />

			
			{/* UPLOAD ROUTES */}
			<Route path="/publish" element={ <PublishLayout /> } />

			{/* DYNAMIC ROUTES */}
			<Route path="/playlist/:id" element={ <PlaylistLayout /> } />
			<Route path="/track/:id" element={<TrackLayout />} />
			<Route path="/profile/:slug" element={ <ProfileLayout /> } />

		</Routes>
	)
}

export default AppRoutes