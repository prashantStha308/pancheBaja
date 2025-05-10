import BottomPlayer from "../components/BottomPlayer"
import Navbar from "../components/Navbar"
import Navbar2 from "../components/Navbar2"
import AppRoutes from "./App.routes"

const AppContent = () => {
  return (
    <main className=" min-h-screen flex flex-col gap-16 " >
        <Navbar2 />
        <div className="flex justify-center h-max" >
            <AppRoutes />
        </div>
        <div className="fixed bottom-0 left-0 right-0" >
          <BottomPlayer />
        </div>
    </main>
  )
}

export default AppContent