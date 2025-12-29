import { Routes , Route } from "react-router-dom"
// Layouts
// Auth
import Login from "../pages/auth/Login.jsx";
import Signup from "../pages/auth/Signup.jsx"
// Test Page
import Test from "../pages/Test"
// Page layouts
import HomeLayout from "../pages/HomeLayout"
import ExploreLayout from "../pages/Explore/ExploreLayout.jsx"
import GenreLayout from "../pages/Explore/Genre/GenreLayout.jsx"
import LibraryLayout from "../pages//Library/LibraryLayout.jsx"
import ProfileLayout from '../pages/ProfileLayout'
import PlaylistLayout from "../pages/playlist/PlaylistLayout"
import PublishLayout from "../pages/create/PublishLayout.jsx"
import TrackLayout from "../pages/playlist/TrackLayout.jsx"
import SelfProfilePage from "../pages/auth/SelfProfilePage.jsx"
import PlayerLayout from "../pages/Player/PlayerLayout.jsx"
import ConnectionError from "../pages/Error/ConnectionError.jsx"

const AppRoutes = () => {
	return (
		<Routes>
			{/* for test */}
			<Route path="/test" element={<Test />} />
			<Route path="/cerror" element={ <ConnectionError /> } />

			<Route path="/" element={ <HomeLayout /> } />

			{/* Explore Pages */}
			<Route path="/explore" element={ <ExploreLayout /> } />
			<Route path="/explore/:slug" element={<GenreLayout />} />

			<Route path="/library" element={<LibraryLayout />} />
			<Route path="/player/:id?" element={<PlayerLayout />} />

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