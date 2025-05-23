import { Routes , Route } from "react-router-dom"
import HomePage from "../pages/HomePage"
import SearchPage from "../pages/SearchPage"
import LibraryPage from "../pages/LibraryPage"
import ProfilePage from '../pages/ProfilePage'
import PlaylistPage from "../pages/playlist/PlaylistPage"
import UploadTrack from "../pages/create/UploadTrack"
import Test from "../pages/Test"

const AppRoutes = () => {
  return (
    <Routes>
      {/* for test */}
      <Route path="/test" element={ <Test /> } />


        <Route path="/" element={ <HomePage /> } />
        <Route path="/search" element={ <SearchPage /> } />
        <Route path="/library" element={ <LibraryPage /> } />

        <Route path="/playlist/:id" element={ <PlaylistPage /> } />
        
        {/* UPLOAD ROUTES */}
        <Route path="/upload/track" element={ <UploadTrack /> } />

        {/* DYNAMIC ROUTES */}
        <Route path="/profile/:slug" element={ <ProfilePage /> } />

        
    </Routes>
  )
}

export default AppRoutes