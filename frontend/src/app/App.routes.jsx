import { Routes , Route } from "react-router-dom"
import HomeLayout from "../pages/HomeLayout"
import SearchLayout from "../pages/SearchLayout"
import LibraryLayout from "../pages/LibraryLayout"
import ProfileLayout from '../pages/ProfileLayout'
import PlaylistLayout from "../pages/playlist/PlaylistLayout"
import UploadTrack from "../pages/create/UploadTrack"
import Login from "../pages/user/Login.jsx";
import Test from "../pages/Test"
import Signup from "../pages/user/Signup.jsx"
import TrackLayout from "../pages/playlist/TrackLayout.jsx"

const AppRoutes = () => {
	return (
		<Routes>
			{/* for test */}
			<Route path="/test" element={ <Test /> } />

			<Route path="/" element={ <HomeLayout /> } />
			<Route path="/search" element={ <SearchLayout /> } />
			<Route path="/library" element={ <LibraryLayout /> } />

			<Route path="/login" element={ <Login /> } />
			<Route path="/signup" element={ <Signup /> } />

			
			{/* UPLOAD ROUTES */}
			<Route path="/upload/track" element={ <UploadTrack /> } />

			{/* DYNAMIC ROUTES */}
			<Route path="/playlist/:id" element={ <PlaylistLayout /> } />
			<Route path="/track/:id" element={<TrackLayout />} />
			<Route path="/profile/:slug" element={ <ProfileLayout /> } />

		</Routes>
	)
}

export default AppRoutes